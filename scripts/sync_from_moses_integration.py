#!/usr/bin/env python3
"""
Sync MOSES Framework + Schema outputs from moses-integration into the site.

Pulls:
  - JSON-LD files → /ontology/jsonld/
  - Turtle files → /ontology/ttl/
  - Entity data → _data/moses.json (for Eleventy templates)

Usage:
  python3 scripts/sync_from_moses_integration.py --check   # report what would change
  python3 scripts/sync_from_moses_integration.py --sync     # apply changes

Path resolution:
  1. MOSES_INTEGRATION_PATH env var
  2. ~/Developer/_control/moses-integration (fallback)
"""

import json
import os
import shutil
import sys
import yaml
from pathlib import Path
from datetime import datetime, timezone


def now_iso():
    return datetime.now(timezone.utc).astimezone().isoformat()


def resolve_integration_path():
    p = os.environ.get("MOSES_INTEGRATION_PATH")
    if p and Path(p).exists():
        return Path(p)
    fallback = Path.home() / "Developer" / "_control" / "moses-integration"
    if fallback.exists():
        return fallback
    return None


def main():
    import argparse
    ap = argparse.ArgumentParser(description="Sync MOSES schema outputs into mos2es-site")
    ap.add_argument("--check", action="store_true", help="Report changes (read-only)")
    ap.add_argument("--sync", action="store_true", help="Apply changes")
    args = ap.parse_args()

    if not args.check and not args.sync:
        ap.print_help()
        return 1

    site_root = Path(__file__).resolve().parent.parent
    integration = resolve_integration_path()

    if not integration:
        print("ERROR: moses-integration not found. Set MOSES_INTEGRATION_PATH.", file=sys.stderr)
        return 1

    print(f"Source:  {integration}")
    print(f"Target:  {site_root}")
    print()

    # Source paths
    schema_generated = integration / "schema" / "generated" / "schema"
    schema_source_ontology = integration / "schema" / "source" / "ontology"
    schema_source_data = integration / "schema" / "source" / "data"
    framework_source = integration / "framework" / "source"

    # Target paths
    target_jsonld = site_root / "ontology" / "jsonld"
    target_ttl = site_root / "ontology" / "ttl"
    target_data = site_root / "_data" / "moses.json"

    changes = []
    copied = 0

    # 1. Copy JSON-LD files
    if schema_generated.exists():
        jsonld_files = sorted(schema_generated.glob("*.jsonld"))
        for f in jsonld_files:
            dest = target_jsonld / f.name
            if args.sync:
                dest.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(f, dest)
                copied += 1
            changes.append(f"  JSON-LD: {f.name}")
    else:
        print("WARNING: No generated JSON-LD found. Run generate_semantic_outputs.py first.", file=sys.stderr)

    # 2. Copy Turtle files
    if schema_source_ontology.exists():
        ttl_files = sorted(schema_source_ontology.glob("*.ttl"))
        for f in ttl_files:
            dest = target_ttl / f.name
            if args.sync:
                dest.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(f, dest)
                copied += 1
            changes.append(f"  TTL:     {f.name}")

        # Also copy context.jsonld
        ctx = schema_source_ontology / "context.jsonld"
        if ctx.exists():
            dest = target_jsonld / "context.jsonld"
            if args.sync:
                dest.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(ctx, dest)
                copied += 1
            changes.append(f"  CTX:     context.jsonld")

    # 3. Build _data/moses.json from entity + claims data
    if schema_source_data.exists():
        entities_path = schema_source_data / "entities.yaml"
        claims_path = schema_source_data / "claims.yaml"
        relationships_path = schema_source_data / "relationships.yaml"
        concepts_path = schema_source_data / "concepts.yaml"

        moses_data = {
            "synced_at": now_iso(),
            "source": str(integration),
            "entities": [],
            "claims": [],
            "relationships": [],
            "concepts": [],
        }

        if entities_path.exists():
            with open(entities_path) as f:
                data = yaml.safe_load(f) or []
            moses_data["entities"] = data if isinstance(data, list) else data.get("entities", [])

        if claims_path.exists():
            with open(claims_path) as f:
                data = yaml.safe_load(f) or []
            moses_data["claims"] = data if isinstance(data, list) else data.get("claims", [])

        if relationships_path.exists():
            with open(relationships_path) as f:
                data = yaml.safe_load(f) or []
            moses_data["relationships"] = data if isinstance(data, list) else data.get("relationships", [])

        if concepts_path.exists():
            with open(concepts_path) as f:
                data = yaml.safe_load(f) or []
            moses_data["concepts"] = data if isinstance(data, list) else data.get("concepts", [])

        if args.sync:
            target_data.parent.mkdir(parents=True, exist_ok=True)
            with open(target_data, "w") as f:
                json.dump(moses_data, f, indent=2, default=str)
            copied += 1
        changes.append(f"  DATA:    _data/moses.json ({len(moses_data['entities'])} entities, {len(moses_data['claims'])} claims)")

    # Report
    print(f"Changes ({len(changes)}):")
    for c in changes:
        print(c)

    if args.sync:
        print(f"\nSynced: {copied} files copied")
        # Write sync state
        state = {
            "last_sync": now_iso(),
            "source": str(integration),
            "files_copied": copied,
        }
        state_path = site_root / ".moses-sync-state.json"
        with open(state_path, "w") as f:
            json.dump(state, f, indent=2)
        print(f"State: {state_path.name}")
    else:
        print(f"\n(check mode — {len(changes)} changes would be applied)")

    return 0


if __name__ == "__main__":
    sys.exit(main())
