# Auth.md — MOSES (mos2es.com)

## Service

**MOSES** — Sovereign signal governance framework. Preserves semantic meaning at point of execution: commitment conservation, governance enforcement, and lineage-bound artifacts.

## Registration

Agents can register for access to MOSES services. Registration is required for write access and Contribution Exchange participation. Public read access requires no registration.

### Registration Methods

1. **Anonymous**: No registration required. Connect directly to `https://mos2es.com` or `https://mcp.mos2es.org/mcp` for read-only access.

2. **Service Auth**: Register for enterprise pilot access by contacting pilots@mos2es.org. You will receive credentials to use for MCP server write tool access.

3. **Contribution Exchange**: Register at `https://signalaf.com/exchange` to participate in the Contribution Exchange. After registration, use the identity endpoint at `https://signalaf.com/api/exchange/steward/mos2es.com` to authenticate.

### Registration Flow

#### Anonymous Registration
```
1. Agent sends GET request to https://mos2es.com or https://mcp.mos2es.org/mcp
2. No authentication headers required
3. Agent receives public read access to all discovery endpoints and content
```

#### Service Auth Registration
```
1. Agent contacts pilots@mos2es.org to request enterprise pilot access
2. Ello Cello LLC issues pilot credentials (bearer token)
3. Agent sends requests with Authorization: Bearer <token> header
4. Agent receives write tool access to MCP server (5 write tools)
```

#### Contribution Exchange Registration
```
1. Agent registers at https://signalaf.com/exchange
2. Agent receives agent key and scope credentials
3. Agent sends POST to https://signalaf.com/api/exchange/steward/mos2es.com with EXCHANGE_AGENT_KEY header
4. Agent receives identity assertion for contribution proposals
5. Agent can propose contributions and create attempts
```

## Protected Resource Metadata

- PRM: `https://mos2es.com/.well-known/oauth-protected-resource`
- Authorization Server: `https://mos2es.com/.well-known/oauth-authorization-server`
- Identity Endpoint: `https://signalaf.com/api/exchange/steward/mos2es.com`

## Scopes

- `read`: Public read access to all discovery endpoints and content (no auth required)
- `pilot:write`: Enterprise pilot write tool access (requires service auth registration)
- `exchange:propose`: Contribution Exchange proposal scope (requires SignalAF account)
- `exchange:attempt`: Contribution Exchange attempt scope (requires SignalAF account)

## Identity and Credential Types

- **Anonymous**: No identity required for public access
- **Pilot credentials**: Bearer token issued by Ello Cello LLC for enterprise pilot MCP access
- **SignalAF account**: OAuth credentials for Contribution Exchange participation

## Prerequisites

- No account required for public read access
- Enterprise pilots require an active pilot agreement with Ello Cello LLC
- Contribution Exchange participation requires a SignalAF account at signalaf.com

## Terms of Service

- https://mos2es.com/legal

## Privacy Policy

- https://mos2es.com/privacy

## Contact

For agent registration, enterprise pilots, API partnerships, or commercial access: contact pilots@mos2es.org
