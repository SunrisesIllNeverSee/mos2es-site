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
    description: 'Search the MOSES governance site for concepts, research, products and guides. Returns relevant page URLs and titles.',
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
      // Use AI Search (RAG) endpoint for semantic search
      try {
        const resp = await fetch('/api/search?q=' + encodeURIComponent(query) + '&limit=5');
        if (resp.ok) {
          const data = await resp.json();
          const live = (data.results || []).filter(r => r.url && /^(https:\/\/mos2es\.com)?\//.test(r.url));
          if (live.length > 0) {
            const results = live.map(r =>
              '- [score=' + r.score.toFixed(2) + '] ' + r.text.substring(0, 120) + '...' +
              ' (source: https://mos2es.com' + r.url.replace(/^https:\/\/mos2es\.com/, '') + ')'
            ).join('\n');
            return { content: [{ type: 'text', text: 'Results for "' + query + '":\n' + results }] };
          }
        }
      } catch (e) { /* fall through to keyword search */ }
      // Fallback: keyword matching
      const q = String(query || '').toLowerCase().trim();
      if (!q) {
        return { content: [{ type: 'text', text: 'Enter a search term. Try: research, products, governance, lineage, contact.' }] };
      }
      const words = q.split(/[^a-z0-9]+/).filter(Boolean);
      const pages = [
        { url: '/about', title: 'About', keywords: ['about', 'publisher', 'identity', 'brand', 'founder', 'timeline'] },
        { url: '/research', title: 'Research', keywords: ['paper', 'papers', 'research', 'doi', 'zenodo', 'evidence', 'conservation', 'law', 'commitment'] },
        { url: '/products', title: 'Products', keywords: ['product', 'products', 'signalaf', 'sigrank', 'signomy', 'aqua', 'services', 'pilot'] },
        { url: '/explore', title: 'Explore', keywords: ['explore', 'video', 'demo', 'walkthrough', '3d', 'deck'] },
        { url: '/faq', title: 'FAQ', keywords: ['faq', 'question', 'questions'] },
        { url: '/contact', title: 'Contact', keywords: ['contact', 'email', 'press', 'media'] },
        { url: '/concepts/governance-enforcement', title: 'Governance Enforcement', keywords: ['governance', 'enforcement', 'agent', 'agents'] },
        { url: '/concepts/origin-binding', title: 'Origin Binding', keywords: ['origin', 'binding', 'lineage', 'provenance'] },
        { url: '/concepts/signal-encoding', title: 'Signal Encoding', keywords: ['signal', 'encoding', 'integrity'] },
        { url: '/concepts/recursive-compression', title: 'Recursive Compression', keywords: ['recursive', 'compression', 'drift'] },
        { url: '/concepts/constitutional-substrate', title: 'Constitutional Substrate', keywords: ['constitutional', 'substrate', 'constitution'] },
        { url: '/guides/how-to-verify-lineage', title: 'How to Verify Lineage', keywords: ['verify', 'lineage', 'guide', 'how'] }
      ];
      const matches = pages.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.keywords.some(k => words.includes(k))
      );
      if (matches.length === 0) {
        return { content: [{ type: 'text', text: 'No results found for: ' + query + '. Try: research, products, governance, lineage, contact.' }] };
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
        'conservation-law': 'The Conservation Law of Commitment: semantic meaning must be preserved at point of execution. MOSES operationalizes this law for multi-agent AI systems. See: https://doi.org/10.5281/zenodo.20029607',
        'commitment-theory': 'Commitment Theory: a framework for tracing and enforcing commitment preservation through transformation chains. See: https://github.com/SunrisesIllNeverSee/Commitment_Theory',
        'governance-enforcement': 'Governance Enforcement: MOSES enforces governance at the execution layer, distinguishing signal-integrity governance from model alignment or output guardrails. See: https://mos2es.com/concepts/governance-enforcement',
        'lineage-binding': 'Lineage Binding: artifacts are bound to their origin and lineage, enabling provenance tracing and commitment drift detection through transformation chains. See: https://mos2es.com/concepts/origin-binding',
        'signal-integrity': 'Signal Integrity: the preservation of semantic meaning across summarization, translation, compression, delegation, or recursive AI transformation. See: https://mos2es.com/concepts/signal-encoding'
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
        { title: 'A Conservation Law for Commitment in Language', doi: 'https://doi.org/10.5281/zenodo.20029607' },
        { title: 'Experimental Record', doi: 'https://doi.org/10.5281/zenodo.19105225' },
        { title: 'Experiment Harness', doi: 'https://doi.org/10.5281/zenodo.19109397' },
        { title: 'TTEOP Interoperability Spec', doi: 'https://doi.org/10.5281/zenodo.22180349' },
        { title: 'SigRank Taxonomy v3.1', doi: 'https://doi.org/10.5281/zenodo.21900519' },
        { title: 'SSRN', doi: 'https://doi.org/10.2139/ssrn.6734283' }
      ];
      const list = papers.map(p => '- ' + p.title + ': ' + p.doi).join('\n') + '\nAll papers: https://mos2es.com/research';
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
          enum: ['home', 'about', 'products', 'research', 'explore', 'faq', 'deck', '3d', 'contact'],
          description: 'The page to navigate to'
        }
      },
      required: ['page']
    },
    async execute({ page }) {
      const pages = {
        'home': '/',
        'about': '/about',
        'products': '/products',
        'research': '/research',
        'explore': '/explore',
        'faq': '/faq',
        'deck': '/deck',
        '3d': '/3d/',
        'contact': '/contact'
      };
      const path = pages[page];
      if (!path) {
        return { content: [{ type: 'text', text: 'Unknown page: ' + page + '. Choose one of: ' + Object.keys(pages).join(', ') + '.' }] };
      }
      if (typeof window !== 'undefined') {
        setTimeout(() => { window.location.href = path; }, 0);
      }
      return { content: [{ type: 'text', text: 'Navigating to ' + page + ' (https://mos2es.com' + path + ')' }] };
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
        'Contribution Exchange: Agent contribution protocol via signalaf.com steward'
      ];
      return { content: [{ type: 'text', text: 'MOSES Ecosystem:\n' + ecosystem.join('\n') }] };
    }
  });
})();
