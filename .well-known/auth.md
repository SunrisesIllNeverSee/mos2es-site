# Auth.md — MO§ES (mos2es.com)

## Authentication

**mos2es.com is a public static site.** No authentication is required to read any page, fetch llms.txt, access the sitemap, or use the well-known discovery endpoints.

## Agent access

AI agents and crawlers are welcome to:
- Fetch `/.well-known/agent.json` for the A2A Agent Card
- Fetch `/.well-known/api-catalog` for the API catalog (RFC 9727)
- Fetch `/.well-known/mcp/server-card.json` for the MCP Server Card
- Fetch `/llms.txt` for LLM guidance
- Fetch `/sitemap.xml` for the canonical URL set
- Fetch `/robots.txt` for crawl rules
- Request pages with `Accept: text/markdown` for Markdown content negotiation

## Contribution Exchange

mos2es.com participates in the Contribution Exchange via the hosted steward at signalaf.com. Agents proposing contributions should:
1. Discover the exchange profile at `/.well-known/exchange.json`
2. Follow the steward endpoint at `https://signalaf.com/api/exchange/steward/mos2es.com`
3. Review the agent guide at `https://signalaf.com/agents.md`

No API key or OAuth token is required for read-only discovery. Proposal and attempt operations require scope headers documented in the exchange profile.

## Contact

For commercial access, enterprise pilots, or API partnerships: contact pilots@mos2es.org
