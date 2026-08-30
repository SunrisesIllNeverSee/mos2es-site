// WebMCP: Register browser-native tools for AI agents
// Spec: https://developer.chrome.com/docs/ai/webmcp/imperative-api
// Feature-detect both document.modelContext and navigator.modelContext

(function () {
  'use strict';

  const mc =
    (typeof document !== 'undefined' && document.modelContext) ||
    (typeof navigator !== 'undefined' && navigator.modelContext);

  if (!mc || typeof mc.registerTool !== 'function') {
    // WebMCP not supported in this browser — silently exit
    return;
  }

  // Tool: Search MOSES content
  mc.registerTool({
    name: 'search_moses',
    description: 'Search the MOSES governance site for concepts, papers, benchmarks, or legal references. Returns relevant page URLs and titles.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search query for MOSES governance content'
        }
      },
      required: ['query']
    },
    annotations: { readOnlyHint: true },
    async execute({ query }) {
      const q = String(query || '').toLowerCase();
      const pages = [
        { url: '/about', title: 'About MOSES', keywords: ['about', 'publisher', 'identity', 'brand'] },
        { url: '/papers', title: 'Research Papers', keywords: ['paper', 'research', 'doi', 'zenodo', 'evidence'] },
        { url: '/benchmarks', title: 'Benchmarks', keywords: ['benchmark', 'evidence', 'methodology', 'results'] },
        { url: '/architecture', title: 'Architecture', keywords: ['architecture', 'system', 'structure', 'design'] },
        { url: '/legal', title: 'Legal and IP', keywords: ['legal', 'trademark', 'patent', 'ip', 'filing'] },
        { url: '/governance-vacuum', title: 'The Governance Vacuum', keywords: ['governance', 'vacuum', 'problem', 'gap'] },
        { url: '/field-sheet', title: 'Field Sheet', keywords: ['field', 'sheet', 'reference', 'summary'] },
        { url: '/press', title: 'Press', keywords: ['press', 'media', 'news'] },
        { url: '/concepts/conservation-law', title: 'Conservation Law of Commitment', keywords: ['conservation', 'law', 'commitment', 'signal', 'integrity'] },
        { url: '/agent-governance', title: 'Agent Governance', keywords: ['agent', 'governance', 'ai', 'enforcement'] },
        { url: '/ai-governance', title: 'AI Governance', keywords: ['ai', 'governance', 'artificial', 'intelligence'] }
      ];
      const matches = pages.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.keywords.some(k => k.includes(q) || q.includes(k))
      );
      if (matches.length === 0) {
        return { content: [{ type: 'text', text: 'No results found for: ' + query + '. Try: conservation law, governance, papers, benchmarks, legal, architecture.' }] };
      }
      const results = matches.map(p => '- [' + p.title + '](https://mos2es.com' + p.url + ')').join('\n');
      return { content: [{ type: 'text', text: 'Results for "' + query + '":\n' + results }] };
    }
  });

  // Tool: Get MOSES concept
  mc.registerTool({
    name: 'get_concept',
    description: 'Get a MOSES governance concept definition. Available concepts: conservation-law, commitment-theory, governance-enforcement, lineage-binding, signal-integrity.',
    inputSchema: {
      type: 'object',
      properties: {
        concept: {
          type: 'string',
          enum: ['conservation-law', 'commitment-theory', 'governance-enforcement', 'lineage-binding', 'signal-integrity'],
          description: 'The concept to retrieve'
        }
      },
      required: ['concept']
    },
    annotations: { readOnlyHint: true },
    async execute({ concept }) {
      const concepts = {
        'conservation-law': 'The Conservation Law of Commitment: semantic meaning must be preserved at point of execution. MOSES operationalizes this law for multi-agent AI systems. See: https://mos2es.com/concepts/conservation-law',
        'commitment-theory': 'Commitment Theory: a framework for tracing and enforcing commitment preservation through transformation chains. See: https://github.com/SunrisesIllNeverSee/Commitment_Theory',
        'governance-enforcement': 'Governance Enforcement: MOSES enforces governance at the execution layer, distinguishing signal-integrity governance from model alignment or output guardrails. See: https://mos2es.com/agent-governance',
        'lineage-binding': 'Lineage Binding: artifacts are bound to their origin and lineage, enabling provenance tracing and commitment drift detection through transformation chains. See: https://mos2es.com/architecture',
        'signal-integrity': 'Signal Integrity: the preservation of semantic meaning across summarization, translation, compression, delegation, or recursive AI transformation. See: https://mos2es.com/governance-vacuum'
      };
      const result = concepts[concept] || 'Unknown concept: ' + concept;
      return { content: [{ type: 'text', text: result }] };
    }
  });

  // Tool: List MOSES papers
  mc.registerTool({
    name: 'list_papers',
    description: 'List MOSES research papers with DOI references. Returns titles and Zenodo DOI links.',
    inputSchema: {
      type: 'object',
      properties: {}
    },
    annotations: { readOnlyHint: true },
    async execute() {
      const papers = [
        { title: 'Conservation Law of Commitment', doi: 'https://doi.org/10.5281/zenodo.20029607' },
        { title: 'MOSES Governance Framework', url: 'https://mos2es.com/papers' }
      ];
      const list = papers.map(p => '- ' + p.title + ': ' + (p.doi || p.url)).join('\n');
      return { content: [{ type: 'text', text: 'MOSES Research Papers:\n' + list }] };
    }
  });

  // Tool: Navigate to a MOSES page
  mc.registerTool({
    name: 'navigate_to',
    description: 'Navigate the browser to a MOSES governance page. Use this when the user wants to view a specific page.',
    inputSchema: {
      type: 'object',
      properties: {
        page: {
          type: 'string',
          enum: ['home', 'about', 'papers', 'benchmarks', 'architecture', 'legal', 'governance-vacuum', 'field-sheet', 'press', 'contact'],
          description: 'The page to navigate to'
        }
      },
      required: ['page']
    },
    async execute({ page }) {
      const pages = {
        'home': '/',
        'about': '/about',
        'papers': '/papers',
        'benchmarks': '/benchmarks',
        'architecture': '/architecture',
        'legal': '/legal',
        'governance-vacuum': '/governance-vacuum',
        'field-sheet': '/field-sheet',
        'press': '/press',
        'contact': '/contact'
      };
      const path = pages[page] || '/';
      if (typeof window !== 'undefined') {
        window.location.href = path;
      }
      return { content: [{ type: 'text', text: 'Navigating to ' + page + ' (' + path + ')' }] };
    }
  });

  // Tool: Get MOSES ecosystem info
  mc.registerTool({
    name: 'get_ecosystem',
    description: 'Get information about the MOSES ecosystem: related projects, platforms, and tools.',
    inputSchema: {
      type: 'object',
      properties: {}
    },
    annotations: { readOnlyHint: true },
    async execute() {
      const ecosystem = [
        'MOSES (mos2es.com): Sovereign signal governance framework',
        'SigRank (signalaf.com): Public leaderboard and benchmark for AI operator evaluation',
        'SignalAF: Public distribution and platform brand',
        'Signomy (signomy.xyz): Governed AI agent marketplace',
        'SigEconomy (sigeconomy.com): Public LLM operator evals',
        'MCP Server (mcp.mos2es.org): Enterprise AI operator evaluation, 27 tools',
        'Contribution Exchange: Agent contribution protocol via signalaf.com steward'
      ];
      return { content: [{ type: 'text', text: 'MOSES Ecosystem:\n' + ecosystem.join('\n') }] };
    }
  });
})();
