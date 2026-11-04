import {
  W as Et,
  S as vt,
  A as At,
  P as xt,
  a as St,
  C as O,
  q as Mt,
  b as Ct,
  O as It,
  H as Ot,
  D as Xe,
  B as I,
  g as Ue,
  n as Fe,
  o as Be,
  V as w,
  G as ce,
  E as H,
  J as N,
  v as Je,
  h as $,
  M as U,
  i as et,
  d as de,
  k as Ve,
  u as He,
  K as Tt,
  T as ke,
  L as We,
  N as Rt,
  p as Lt,
  t as Nt,
  s as kt,
  Q as Pt,
  w as Dt,
  R as Gt,
  U as Ut,
  X as Ft,
  Y as Bt,
} from "./OrbitControls-NL7GUOCB.js";
/* empty css               */ const P = 16,
  D = 11,
  ue = 4.35,
  Ce = 28,
  tt = [-0.9, -2.35, -3.8, -5.25],
  Pe = matchMedia("(prefers-reduced-motion: reduce)").matches,
  f = [
    {
      id: "origin",
      short: "Neutral grid",
      kicker: "00 / NEUTRAL FIELD",
      title: "Start at zero.",
      summary:
        "A flat grid and a hollow kernel. No towers, rings, noise, or basin.",
      status: "OVERHEAD · Z = 0",
      stats: [
        ["0", "field height"],
        ["Hollow", "kernel at zero"],
        ["360°", "free orbit"],
      ],
      copy: "Nothing is inferred from height yet. The hollow kernel is a shadow at the common reference from which every later difference is read.",
    },
    {
      id: "scale",
      short: "Scale",
      kicker: "01 / TOWER: MODEL SCALE",
      title: "Capacity rises.",
      summary: "Compute, parameters, and context expand upward.",
      status: "TOWER 01 · MODEL SCALE",
      stats: [
        ["1M", "public context"],
        ["5", "mapped actors"],
        ["4", "model tiers"],
      ],
      copy: "Original map: OpenAI, Google, Anthropic, Meta, xAI. Public reference: Gemini 4 documents a shared 1M-token context window. Capacity is not, by itself, commitment fidelity.",
      source: [
        "Google AI · long context",
        "https://ai.google.dev/gemini-api/docs/long-context",
      ],
    },
    {
      id: "provenance",
      short: "Provenance",
      kicker: "02 / TOWER: PROVENANCE",
      title: "Origin leaves a trace.",
      summary: "Credentials, signatures, and lineage form a separate stack.",
      status: "TOWER 02 · PROVENANCE",
      stats: [
        ["500+", "C2PA members"],
        ["6,000", "affiliates"],
        ["5", "mapped actors"],
      ],
      copy: "Original map: Adobe, Microsoft, Google, BBC, Truepic. C2PA’s July 2026 guidance reports more than 500 members and over 6,000 affiliates supporting Content Credentials.",
      source: [
        "C2PA · 31 Jul 2026",
        "https://c2pa.org/a-new-implementation-guide-for-content-credentials/",
      ],
    },
    {
      id: "evaluation",
      short: "Evaluation",
      kicker: "03 / TOWER: EVALUATION",
      title: "Measurement gets a tower.",
      summary:
        "Benchmarks and safety yardsticks stand apart from the thing measured.",
      status: "TOWER 03 · EVALUATION",
      stats: [
        ["30 pt", "HLE annual gain"],
        ["42%", "max invalid items"],
        ["4", "mapped actors"],
      ],
      copy: "Original map: OpenAI, Anthropic, LMSYS, ARC. Stanford’s 2026 AI Index reports rapid benchmark saturation and invalid-question rates reaching 42% in reviewed evaluations.",
      source: [
        "Stanford HAI · 2026 AI Index",
        "https://hai.stanford.edu/ai-index/2026-ai-index-report/technical-performance",
      ],
    },
    {
      id: "deployment",
      short: "Deployment",
      kicker: "04 / TOWER: DEPLOYMENT",
      title: "Runtime needs a gate.",
      summary:
        "Cloud custody, permissions, and operating rails bound deployment.",
      status: "TOWER 04 · DEPLOYMENT",
      stats: [
        ["4", "NIST functions"],
        ["5", "mapped actors"],
        ["2", "model gates"],
      ],
      copy: "Original map: Azure, AWS, Google Cloud, Apple, Palantir. NIST organizes risk practice around Govern, Map, Measure, and Manage, with testing before deployment and monitoring in operation.",
      source: [
        "NIST · AI RMF",
        "https://airc.nist.gov/airmf-resources/airmf/5-sec-core/",
      ],
    },
    {
      id: "towers",
      short: "Map four",
      kicker: "05 / FOUR TOWERS",
      title: "Four silos. One field.",
      summary:
        "The towers remain distinct; the circuit makes their positions readable together.",
      status: "FOUR TOWERS · MAPPED",
      stats: [
        ["4", "distinct towers"],
        ["4", "circuit paths"],
        ["1", "shared substrate"],
      ],
      copy: "Scale, Provenance, Evaluation, and Deployment are not collapsed into one another. MO§ES is drawn beneath and between them—not as a fifth tower.",
    },
    {
      id: "compression",
      short: "Compression",
      kicker: "06 / RING 01",
      title: "Compression Gate.",
      summary: "Valid cognition: a boundary before transformation proceeds.",
      status: "RING 01 · COMPRESSION GATE",
      stats: [
        ["01", "ring isolated"],
        ["Layer 1", "kernel descent"],
        ["Gate", "function"],
      ],
      copy: "The first ring marks compression as a constitutional prerequisite. The visual isolates the gate; it does not disclose or depict a canonical extractor.",
    },
    {
      id: "lineage",
      short: "Lineage + metrics",
      kicker: "07 / RING 02",
      title: "Lineage meets measure.",
      summary:
        "Continuity and measurement share a ring without becoming the same thing.",
      status: "RING 02 · LINEAGE + METRICS",
      stats: [
        ["02", "ring isolated"],
        ["Layer 2", "kernel descent"],
        ["Metrics", "standard"],
      ],
      copy: "Lineage connects an artifact to its origin. Metrics evaluate what is present. The ring holds both in view while preserving their different jobs.",
    },
    {
      id: "governance",
      short: "Governance",
      kicker: "08 / RING 03",
      title: "Governance Gate.",
      summary:
        "Runtime sovereignty: custody and permission become an explicit boundary.",
      status: "RING 03 · GOVERNANCE GATE",
      stats: [
        ["03", "ring isolated"],
        ["Layer 3", "kernel descent"],
        ["Custody", "boundary"],
      ],
      copy: "The outer ring marks the point where a verified structure meets operation. Governance is shown as a boundary and circuit, not as another source of noise.",
    },
    {
      id: "threshold",
      short: "Zero threshold",
      kicker: "09 / ZERO THRESHOLD",
      title: "Zero divides the reading.",
      summary:
        "A hollow kernel at zero. Positive reaction above; negative binding below.",
      status: "THRESHOLD · +Z / 0 / −Z",
      stats: [
        ["+Z", "reaction above"],
        ["Hollow", "kernel at zero"],
        ["−Z", "binding below"],
      ],
      copy: "The zero line prevents loudness and binding from being read as one scale. The kernel is only a hollow shadow here; each descending layer makes it more defined.",
    },
    {
      id: "noise",
      short: "Noise lab",
      kicker: "10 / REACTIVE NOISE",
      title: "Noise is loud. And positive.",
      summary:
        "A whole field of green/yellow particles rising and falling independently.",
      status: "LIVE NOISE · POSITIVE FIELD",
      stats: [
        ["+Z", "observed direction"],
        ["1,400", "seeded particles"],
        ["0", "fidelity inferred"],
      ],
      copy: "Likes, votes, follows, and views record reactions. Each particle moves vertically above zero; its positive height and green-to-yellow color show reaction amplitude, not semantic fidelity.",
    },
    {
      id: "basin",
      short: "Signal basin",
      kicker: "11 / GOVERNED SIGNAL",
      title: "Binding forms below.",
      summary: "A Gaussian basin deepens as the governed kernel is acquired.",
      status: "SIGNAL BASIN · NEGATIVE FIELD",
      stats: [
        ["−Z", "binding depth"],
        ["2", "colored faces"],
        ["360°", "underneath orbit"],
      ],
      copy: "The basin represents binding depth—not anti-meaning or semantic collapse. Orbit below it: the inner profile and outer shell intentionally use different colors.",
    },
    {
      id: "assembly",
      short: "Full assembly",
      kicker: "12 / COMPLETE SEQUENCE",
      title: "Assemble the field.",
      summary:
        "Hollow zero → four layers → full activation → rise and dispersal.",
      status: "ASSEMBLY · READY AT ZERO",
      stats: [
        ["28 s", "sequence"],
        ["4", "kernel layers"],
        ["3", "MO§ES rings"],
      ],
      copy: "Each ring lowers the kernel and pulls the grid inward. The fourth layer links the towers and animates the basin; then the kernel rises, loses coherence, and disperses into the particle field.",
    },
  ],
  d = (e) => document.getElementById(e),
  oe = d("sequence-container"),
  Vt = d("sequence-labels"),
  st = d("chapter-rail");
let m = 0,
  nt = "overhead",
  p = 0,
  q = !1,
  pe = !Pe,
  ie = 0,
  W = 1.2,
  _ = 1.4,
  V = "reactions",
  Re = !1,
  z = 0,
  L = 0;
function Ht(e) {
  return function () {
    e = (e + 1831565813) | 0;
    let t = e;
    return (
      (t = Math.imul(t ^ (t >>> 15), 1 | t)),
      (t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t),
      ((t ^ (t >>> 14)) >>> 0) / 4294967296
    );
  };
}
const G = (e, t, s) => {
    const n = Math.max(0, Math.min(1, (s - e) / (t - e)));
    return n * n * (3 - 2 * n);
  },
  S = new Et({ antialias: !0, powerPreference: "high-performance" });
S.setPixelRatio(Math.min(devicePixelRatio, 1.5));
S.outputColorSpace = vt;
S.toneMapping = At;
S.toneMappingExposure = 1.05;
S.shadowMap.enabled = !0;
S.shadowMap.type = xt;
oe.appendChild(S.domElement);
const b = new St();
b.background = new O(463126);
b.fog = new Mt(463126, 0.018);
const v = new Ct(42, 1, 0.1, 180);
v.position.set(0, 24, 0.01);
const h = new It(v, S.domElement);
h.target.set(0, 0, 0);
h.enableDamping = !0;
h.dampingFactor = 0.075;
h.enablePan = !0;
h.screenSpacePanning = !0;
h.minDistance = 4.5;
h.maxDistance = 48;
h.minPolarAngle = 0;
h.maxPolarAngle = Math.PI;
h.autoRotateSpeed = 0.85;
h.addEventListener("start", () => {
  Re = !0;
});
b.add(new Ot(11065552, 1052697, 1.35));
const j = new Xe(16769456, 3.2);
j.position.set(-8, 16, 10);
j.castShadow = !0;
j.shadow.mapSize.set(1024, 1024);
j.shadow.camera.left = -15;
j.shadow.camera.right = 15;
j.shadow.camera.top = 15;
j.shadow.camera.bottom = -15;
b.add(j);
const ot = new Xe(5935056, 2.2);
ot.position.set(12, 4, -12);
b.add(ot);
const A = Ht(20261103),
  it = [];
for (let e = 0; e < 280; e++)
  it.push((A() - 0.5) * 70, (A() - 0.5) * 34, (A() - 0.5) * 70);
const at = new I();
at.setAttribute("position", new Ue(it, 3));
b.add(
  new Fe(
    at,
    new Be({
      color: 5932934,
      size: 0.025,
      transparent: !0,
      opacity: 0.36,
      depthWrite: !1,
    }),
  ),
);
const rt = [];
function Le(e, t, s, n, a) {
  const r = document.createElement("div");
  (r.className = `sequence-label ${n}`),
    (r.innerHTML = `${e}<small>${t}</small>`),
    Vt.appendChild(r);
  const o = { element: r, anchor: s, kind: n, id: a, visible: !0 };
  return rt.push(o), o;
}
function Wt() {
  const e = new ce(),
    t = new U(
      new Nt(P, D, 64, 44),
      new Ve({
        color: 1520184,
        transparent: !0,
        opacity: 0.12,
        side: kt,
        depthWrite: !1,
      }),
    );
  t.geometry.attributes.position.setUsage(N),
    (t.rotation.x = -Math.PI / 2),
    e.add(t);
  const s = [];
  for (let i = -P / 2; i <= P / 2 + 0.001; i += 0.5)
    s.push(i, 0.02, -D / 2, i, 0.02, D / 2);
  for (let i = -D / 2; i <= D / 2 + 0.001; i += 0.5)
    s.push(-P / 2, 0.02, i, P / 2, 0.02, i);
  const n = new I();
  n.setAttribute("position", new Ue(s, 3).setUsage(N));
  const a = new We(
    n,
    new $({ color: 6987418, transparent: !0, opacity: 0.28 }),
  );
  e.add(a);
  const r = [
    new w(-P / 2, 0.04, -D / 2),
    new w(P / 2, 0.04, -D / 2),
    new w(P / 2, 0.04, D / 2),
    new w(-P / 2, 0.04, D / 2),
  ];
  e.add(
    new He(
      new I().setFromPoints(r),
      new $({ color: 7529165, transparent: !0, opacity: 0.9 }),
    ),
  );
  const o = new I().setFromPoints([new w(0, -7, 0), new w(0, 4, 0)]);
  return (
    e.add(new Je(o, new $({ color: 9228226, transparent: !0, opacity: 0.28 }))),
    (e.userData = { sheet: t, gridLines: a, gridBase: new Float32Array(s) }),
    e
  );
}
const ct = Wt();
b.add(ct);
const lt = {
  scale: 6859519,
  provenance: 15251052,
  evaluation: 11900136,
  deployment: 6477979,
};
function R(e, t, s, n, a = !0, r = null) {
  const o = new Ft(...t),
    i = new U(o, n);
  if (
    (i.position.set(...s),
    (i.castShadow = !0),
    (i.receiveShadow = !0),
    e.add(i),
    a)
  ) {
    const c = new We(new Bt(o), r);
    c.position.copy(i.position), e.add(c);
  }
}
function _t(e) {
  const t = new ce(),
    s = new O(lt[e]),
    n = new O(2569789),
    a = new de({
      color: n,
      emissive: s,
      emissiveIntensity: 0.02,
      roughness: 0.48,
      metalness: 0.48,
      transparent: !0,
      opacity: 0.38,
    }),
    r = new de({
      color: 1385515,
      emissive: s,
      emissiveIntensity: 0,
      roughness: 0.62,
      metalness: 0.66,
    }),
    o = new $({ color: s, transparent: !0, opacity: 0.12 });
  if (
    ((t.userData = {
      material: a,
      baseMaterial: r,
      edgeMaterial: o,
      activeColor: s,
      dormantColor: n,
    }),
    R(t, [2.35, 0.28, 2.35], [0, 0.14, 0], r, !1),
    e === "scale")
  ) {
    for (let i = 0; i < 4; i++) {
      const c = 1.95 - i * 0.32;
      R(t, [c, 0.82, c], [0, 0.77 + i, 0], a, !0, o);
    }
    R(t, [0.22, 1, 0.22], [0, 4.5, 0], a, !0, o);
  } else if (e === "provenance") {
    const i = new U(new Pt(0.12, 0.12, 4.35, 10), a);
    (i.position.y = 2.45), t.add(i);
    for (let c = 0; c < 5; c++) {
      const l = new U(new ke(0.82 - c * 0.05, 0.06, 6, 36), a);
      (l.rotation.x = Math.PI / 2),
        (l.position.y = 0.7 + c * 0.82),
        t.add(l),
        R(
          t,
          [0.28, 0.14, 0.28],
          [c % 2 ? -0.82 : 0.82, 0.7 + c * 0.82, 0],
          a,
          !1,
        );
    }
  } else if (e === "evaluation") {
    const i = [2.5, 4.2, 3.35, 4.75],
      c = [
        [-0.65, -0.65],
        [0.65, -0.65],
        [-0.65, 0.65],
        [0.65, 0.65],
      ];
    i.forEach((u, g) =>
      R(t, [0.44, u, 0.44], [c[g][0], 0.28 + u / 2, c[g][1]], a, !0, o),
    );
    const l = new U(new ke(1, 0.05, 6, 40), a);
    (l.rotation.x = Math.PI / 2), (l.position.y = 3.6), t.add(l);
  } else
    R(t, [0.46, 4.2, 0.68], [-0.75, 2.38, 0], a, !0, o),
      R(t, [0.46, 4.2, 0.68], [0.75, 2.38, 0], a, !0, o),
      R(t, [1.96, 0.38, 0.86], [0, 4.47, 0], a, !0, o),
      R(t, [0.76, 0.76, 0.76], [0, 2.42, 0], a, !0, o),
      R(t, [2, 0.1, 0.14], [0, 1.12, 0.7], a, !1),
      R(t, [2, 0.1, 0.14], [0, 1.12, -0.7], a, !1);
  return t;
}
const _e = [
    {
      id: "scale",
      name: "TOWER 01 · SCALE",
      detail: "CAPACITY / CONTEXT",
      position: new w(5.9, 0, 0),
    },
    {
      id: "provenance",
      name: "TOWER 02 · PROVENANCE",
      detail: "ORIGIN / LINEAGE",
      position: new w(0, 0, -4.35),
    },
    {
      id: "evaluation",
      name: "TOWER 03 · EVALUATION",
      detail: "TESTS / MEASURES",
      position: new w(-5.9, 0, 0),
    },
    {
      id: "deployment",
      name: "TOWER 04 · DEPLOYMENT",
      detail: "CUSTODY / RUNTIME",
      position: new w(0, 0, 4.35),
    },
  ],
  M = {};
for (const e of _e) {
  const t = _t(e.id);
  t.position.copy(e.position),
    (t.visible = !1),
    b.add(t),
    (M[e.id] = { group: t, growth: 0, activation: 0 }),
    Le(
      e.name,
      e.detail,
      e.position.clone().add(new w(0, 5.25, 0)),
      "tower",
      e.id,
    );
}
function Ie(e, t) {
  e.activation = Math.max(0, Math.min(1, t));
  const {
    material: s,
    baseMaterial: n,
    edgeMaterial: a,
    activeColor: r,
    dormantColor: o,
  } = e.group.userData;
  s.color.copy(o).lerp(r, e.activation),
    (s.emissiveIntensity = 0.02 + e.activation * 0.72),
    (s.opacity = 0.34 + e.activation * 0.66),
    (n.emissiveIntensity = e.activation * 0.32),
    (a.opacity = 0.12 + e.activation * 0.64);
}
const J = new ce();
for (const e of _e) {
  const t = new I();
  t.setAttribute("position", new H(new Float32Array(144), 3).setUsage(N));
  const s = new Je(
    t,
    new $({ color: lt[e.id], transparent: !0, opacity: 0.04 }),
  );
  (s.userData.towerId = e.id), J.add(s);
}
J.visible = !1;
b.add(J);
function zt() {
  const e = document.createElement("canvas");
  e.width = e.height = 32;
  const t = e.getContext("2d"),
    s = t.createRadialGradient(16, 16, 0, 16, 16, 16);
  return (
    s.addColorStop(0, "rgba(255,255,255,1)"),
    s.addColorStop(0.35, "rgba(255,255,255,.9)"),
    s.addColorStop(1, "rgba(255,255,255,0)"),
    (t.fillStyle = s),
    t.fillRect(0, 0, 32, 32),
    new Dt(e)
  );
}
const dt = zt(),
  E = new ce(),
  De = new U(
    new et(0.52, 0),
    new de({
      color: 15058299,
      emissive: 8279072,
      emissiveIntensity: 1.2,
      roughness: 0.28,
      metalness: 0.5,
      transparent: !0,
      opacity: 0,
    }),
  ),
  Ae = new U(
    new et(0.92, 0),
    new Ve({ color: 7901583, wireframe: !0, transparent: !0, opacity: 0.22 }),
  );
E.add(De, Ae);
E.position.y = 0.55;
E.visible = !0;
b.add(E);
const $e = Le(
    "MO§ES CORE",
    "HOLLOW / ZERO THRESHOLD",
    new w(0, 1.7, 0),
    "core",
    "core",
  ),
  ae = [15251052, 6674116, 10127048, 15332805].map((e) => new O(e)),
  ut = tt.map((e, t) => {
    const s = [],
      n = 0.82 + t * 0.2;
    for (let r = 0; r < 96; r++) {
      const o = (r / 96) * Math.PI * 2;
      s.push(new w(Math.cos(o) * n, 0, Math.sin(o) * n));
    }
    const a = new He(
      new I().setFromPoints(s),
      new $({ color: ae[t], transparent: !0, opacity: 0 }),
    );
    return (a.position.y = e), (a.visible = !1), b.add(a), a;
  }),
  le = 320,
  xe = new Float32Array(le * 3),
  Se = new Float32Array(le * 3),
  te = new Float32Array(le * 3),
  se = new Float32Array(le * 3);
for (let e = 0; e < le; e++) {
  const t = A() * Math.PI * 2,
    s = Math.cbrt(A()) * 0.62,
    n = (A() - 0.5) * 1.1;
  (te[e * 3] = Math.cos(t) * s),
    (te[e * 3 + 1] = n),
    (te[e * 3 + 2] = Math.sin(t) * s),
    (se[e * 3] = (A() - 0.5) * 4.2),
    (se[e * 3 + 1] = A() * 2.4),
    (se[e * 3 + 2] = (A() - 0.5) * 4.2);
}
const me = new I();
me.setAttribute("position", new H(xe, 3).setUsage(N));
me.setAttribute("color", new H(Se, 3).setUsage(N));
const he = new Fe(
  me,
  new Be({
    map: dt,
    vertexColors: !0,
    size: 0.13,
    transparent: !0,
    opacity: 0.88,
    depthWrite: !1,
    blending: Tt,
  }),
);
he.visible = !1;
b.add(he);
const Ge = [
    {
      id: "compression",
      name: "01 · COMPRESSION GATE",
      detail: "VALID COGNITION",
      radius: 2.2,
      color: 15251052,
    },
    {
      id: "lineage",
      name: "02 · LINEAGE + METRICS",
      detail: "CONTINUITY / MEASURE",
      radius: 3.05,
      color: 6674116,
    },
    {
      id: "governance",
      name: "03 · GOVERNANCE GATE",
      detail: "RUNTIME SOVEREIGNTY",
      radius: 3.9,
      color: 10127048,
    },
  ],
  k = {};
for (const e of Ge) {
  const t = new ce(),
    s = new de({
      color: e.color,
      emissive: e.color,
      emissiveIntensity: 0.5,
      roughness: 0.38,
      metalness: 0.65,
      transparent: !0,
      opacity: 0.88,
    }),
    n = new U(new ke(e.radius, 0.055, 8, 128), s);
  (n.rotation.x = Math.PI / 2), t.add(n);
  const a = [];
  for (let i = 0; i < 48; i++) {
    const c = (i / 48) * Math.PI * 2,
      l = e.radius - (i % 4 === 0 ? 0.15 : 0.08),
      u = e.radius + (i % 4 === 0 ? 0.15 : 0.08);
    a.push(
      Math.cos(c) * l,
      0,
      Math.sin(c) * l,
      Math.cos(c) * u,
      0,
      Math.sin(c) * u,
    );
  }
  const r = new I();
  r.setAttribute("position", new Ue(a, 3)),
    t.add(new We(r, new $({ color: e.color, transparent: !0, opacity: 0.5 }))),
    (t.position.y = 0.12),
    (t.visible = !1),
    b.add(t),
    (k[e.id] = { group: t, growth: 0 });
  const o =
    e.id === "compression"
      ? new w(e.radius, 0.55, 0)
      : e.id === "lineage"
        ? new w(-e.radius * 0.7, 0.55, e.radius * 0.7)
        : new w(0, 0.55, -e.radius);
  Le(e.name, e.detail, o, "ring", e.id);
}
const K = 1400,
  ne = new Float32Array(K * 3),
  Me = new Float32Array(K * 3),
  pt = new Float32Array(K),
  mt = new Float32Array(K),
  ht = new Float32Array(K);
for (let e = 0; e < K; e++)
  (ne[e * 3] = (A() - 0.5) * (P - 0.35)),
    (ne[e * 3 + 1] = 0),
    (ne[e * 3 + 2] = (A() - 0.5) * (D - 0.35)),
    (pt[e] = A() * Math.PI * 2),
    (mt[e] = 0.55 + A() * 1.65),
    (ht[e] = 0.3 + A() * 1.45);
const fe = new I();
fe.setAttribute("position", new H(ne, 3).setUsage(N));
fe.setAttribute("color", new H(Me, 3).setUsage(N));
const re = new Fe(
  fe,
  new Be({
    map: dt,
    vertexColors: !0,
    size: 0.18,
    transparent: !0,
    opacity: 0.95,
    depthWrite: !1,
    blending: Rt,
    toneMapped: !1,
  }),
);
re.visible = !1;
b.add(re);
const ft = new O(3791242),
  gt = new O(16767070),
  x = new O(),
  qt = new O(7356783),
  Ze = new O(12347486),
  Yt = new O(14728053),
  $t = new O(3313302),
  ve = new O();
function Zt() {
  const s = new Float32Array(17808),
    n = new Float32Array(s.length),
    a = new Float32Array(s.length),
    r = new Float32Array(5936),
    o = [];
  let i = 0;
  for (let T = 0; T <= 52; T++) {
    const B = T / 52;
    for (let Q = 0; Q < 112; Q++) {
      const be = (Q / 112) * Math.PI * 2,
        Ee = T * 112 + Q;
      (s[i] = Math.cos(be) * B * ue),
        (s[i + 1] = 0),
        (s[i + 2] = Math.sin(be) * B * ue),
        (r[Ee] = B),
        (i += 3);
    }
  }
  for (let T = 0; T < 52; T++)
    for (let B = 0; B < 112; B++) {
      const Q = (B + 1) % 112,
        be = T * 112 + B,
        Ee = (T + 1) * 112 + B,
        bt = (T + 1) * 112 + Q,
        Ye = T * 112 + Q;
      o.push(be, Ee, Ye, Ee, bt, Ye);
    }
  const c = new I(),
    l = new H(s, 3).setUsage(N);
  c.setAttribute("position", l),
    c.setAttribute("color", new H(n, 3).setUsage(N)),
    c.setIndex(o),
    c.computeVertexNormals();
  const u = new I();
  u.setAttribute("position", l),
    u.setAttribute("color", new H(a, 3).setUsage(N)),
    u.setIndex(o);
  const g = new U(
      c,
      new de({
        vertexColors: !0,
        emissive: 2364700,
        emissiveIntensity: 0.3,
        roughness: 0.48,
        metalness: 0.25,
        side: Gt,
        transparent: !0,
        opacity: 0.96,
      }),
    ),
    C = new U(
      u,
      new Ve({ vertexColors: !0, side: Ut, transparent: !0, opacity: 0.94 }),
    );
  g.receiveShadow = !0;
  const ee = new ce();
  return (
    ee.add(C, g),
    (ee.visible = !1),
    {
      group: ee,
      geometry: c,
      outerGeometry: u,
      radii: r,
      inner: g,
      outer: C,
      depth: 0,
      layers: 0,
    }
  );
}
const y = Zt();
b.add(y.group);
Le(
  "GOVERNED SIGNAL",
  "NEGATIVE BINDING / GAUSSIAN",
  new w(0, 1.5, 0),
  "basin",
  "basin",
);
const yt = [];
for (let e = 0; e < 4; e++) {
  const t = new I();
  t.setAttribute("position", new H(new Float32Array(336), 3).setUsage(N));
  const s = new He(
    t,
    new $({ color: ae[3 - e], transparent: !0, opacity: 0.32, depthWrite: !1 }),
  );
  (s.visible = !1), b.add(s), yt.push(s);
}
function jt(e) {
  const t = Math.exp(-3.4);
  return (Math.exp(-3.4 * e * e) - t) / (1 - t);
}
function ge(e, t, s, n = L, a = z) {
  const r = Math.hypot(e, t) / ue;
  if (r >= 1 || s <= 0) return 0;
  const i = 1 + G(3.75, 4, n) * 0.045 * Math.sin(a * 2.2 - r * 9);
  return -s * jt(r) * i;
}
function Kt(e, t = L, s = z) {
  const { sheet: n, gridLines: a, gridBase: r } = ct.userData,
    o = n.geometry.attributes.position.array;
  for (let c = 0; c < o.length; c += 3) o[c + 2] = ge(o[c], -o[c + 1], e, t, s);
  n.geometry.attributes.position.needsUpdate = !0;
  const i = a.geometry.attributes.position.array;
  for (let c = 0; c < i.length; c += 3)
    (i[c] = r[c]),
      (i[c + 1] = 0.025 + ge(r[c], r[c + 2], e, t, s)),
      (i[c + 2] = r[c + 2]);
  a.geometry.attributes.position.needsUpdate = !0;
}
function X(e, t = L, s = z) {
  (y.depth = e), (y.layers = t), (y.group.visible = e > 0.001);
  const n = y.geometry.attributes.position.array,
    a = y.geometry.attributes.color.array,
    r = y.outerGeometry.attributes.color.array;
  for (let o = 0; o < y.radii.length; o++) {
    const i = y.radii[o],
      c = n[o * 3],
      l = n[o * 3 + 2];
    n[o * 3 + 1] = ge(c, l, e, t, s);
    const u = i < 0.32 ? 3 : i < 0.58 ? 2 : i < 0.8 ? 1 : 0,
      g = Math.max(0, Math.min(1, t - u));
    i < 0.55
      ? x.copy(qt).lerp(Ze, i / 0.55)
      : x.copy(Ze).lerp(Yt, (i - 0.55) / 0.45),
      x.lerp(ae[u], g * 0.86),
      ve.copy($t).lerp(ae[u], g * 0.92),
      (a[o * 3] = x.r),
      (a[o * 3 + 1] = x.g),
      (a[o * 3 + 2] = x.b),
      (r[o * 3] = ve.r),
      (r[o * 3 + 1] = ve.g),
      (r[o * 3 + 2] = ve.b);
  }
  (y.geometry.attributes.position.needsUpdate = !0),
    (y.geometry.attributes.color.needsUpdate = !0),
    (y.outerGeometry.attributes.color.needsUpdate = !0),
    y.geometry.computeVertexNormals(),
    Kt(e, t, s),
    yt.forEach((o, i) => {
      const c = 0.25 + i * 0.18,
        l = o.geometry.attributes.position.array;
      for (let u = 0; u < 112; u++) {
        const g = (u / 112) * Math.PI * 2,
          C = Math.cos(g) * c * ue,
          ee = Math.sin(g) * c * ue;
        (l[u * 3] = C),
          (l[u * 3 + 1] = 0.025 + ge(C, ee, e, t, s)),
          (l[u * 3 + 2] = ee);
      }
      (o.geometry.attributes.position.needsUpdate = !0),
        (o.visible = e > 0.15),
        (o.material.opacity =
          0.08 + 0.38 * Math.max(0, Math.min(1, t - (3 - i))));
    });
}
let Oe = [];
function Z(e, t, s, n = 1) {
  Oe = [];
  const a = V === "votes" ? 0.78 : V === "follows" ? 0.58 : 1.12,
    r = V === "votes" ? 1.18 : V === "follows" ? 0.72 : 1,
    o = V === "reactions" ? 3 : V === "votes" ? 2.2 : 1.65;
  let i = 1 / 0,
    c = -1 / 0;
  for (let l = 0; l < K; l++) {
    const u = Math.pow(0.5 + 0.5 * Math.sin(e * mt[l] * s * a + pt[l]), o),
      g = Math.max(0, t * r * n * ht[l] * u);
    (ne[l * 3 + 1] = g),
      (i = Math.min(i, g)),
      (c = Math.max(c, g)),
      g > t * r * n * 0.42 && Oe.push(l);
    const C = Math.min(1, g / Math.max(0.08, t * r * n * 0.9));
    x.copy(ft).lerp(gt, C),
      (Me[l * 3] = x.r),
      (Me[l * 3 + 1] = x.g),
      (Me[l * 3 + 2] = x.b);
  }
  return (
    (fe.attributes.position.needsUpdate = !0),
    (fe.attributes.color.needsUpdate = !0),
    { min: i, max: c }
  );
}
function Te(e, t = 0) {
  L = Math.max(0, Math.min(4, e));
  const s = L / 4,
    n = 0.55 + (tt[3] - 0.55) * s;
  E.position.y = n + (4.2 - n) * G(0, 1, t);
  const a = G(0.08, 1, t);
  if (
    (E.scale.setScalar((0.5 + s * 0.5) * (1 - a * 0.35)),
    (E.visible = a < 0.995),
    (De.material.opacity = s * (1 - G(0.05, 0.72, t))),
    (De.material.emissiveIntensity = 0.25 + s * 1.25),
    (Ae.material.opacity = (0.2 + s * 0.62) * (1 - a)),
    L > 0.01
      ? Ae.material.color.copy(ae[Math.min(3, Math.ceil(L) - 1)])
      : Ae.material.color.set(7901583),
    ut.forEach((r, o) => {
      const i = Math.max(0, Math.min(1, L - o));
      (r.visible = i > 0.001),
        (r.material.opacity = i * 0.68),
        r.scale.setScalar(0.82 + i * 0.18);
    }),
    $e.anchor.set(0, E.position.y + 1.35, 0),
    ($e.element.querySelector("small").textContent =
      t > 0
        ? "RISE / DISPERSAL"
        : L === 0
          ? "HOLLOW / ZERO THRESHOLD"
          : `DEFINITION / LAYER ${Math.min(4, Math.floor(L + 0.999))}`),
    (he.visible = t > 0.001),
    he.visible)
  ) {
    for (let r = 0; r < le; r++) {
      const o = r * 3,
        i = 1 + a * 2.2;
      (xe[o] = E.position.x + te[o] * i + se[o] * a),
        (xe[o + 1] = E.position.y + te[o + 1] * i + se[o + 1] * a),
        (xe[o + 2] = E.position.z + te[o + 2] * i + se[o + 2] * a),
        x.copy(ae[3]).lerp(r % 2 ? ft : gt, a * 0.9),
        (Se[o] = x.r),
        (Se[o + 1] = x.g),
        (Se[o + 2] = x.b);
    }
    (me.attributes.position.needsUpdate = !0),
      (me.attributes.color.needsUpdate = !0);
  }
}
function ze(e, t, s) {
  J.children.forEach((n) => {
    const a = M[n.userData.towerId],
      r = a.group.position,
      o = n.geometry.attributes.position.array;
    for (let i = 0; i < 48; i++) {
      const c = i / 47,
        l = r.x * (1 - c),
        u = r.z * (1 - c);
      (o[i * 3] = l),
        (o[i * 3 + 1] = 0.08 + ge(l, u, e, t, s)),
        (o[i * 3 + 2] = u);
    }
    (n.geometry.attributes.position.needsUpdate = !0),
      (n.material.opacity = 0.035 + a.activation * 0.82);
  });
}
let F = { min: 0, max: 0 };
Z(0, _, W);
X(0);
function wt() {
  Object.values(M).forEach((e) => {
    (e.growth = 0),
      e.group.scale.set(1, 1, 1),
      (e.group.visible = !1),
      Ie(e, 0);
  }),
    Object.values(k).forEach((e) => {
      (e.growth = 0), e.group.scale.setScalar(1), (e.group.visible = !1);
    }),
    (J.visible = !1),
    (re.visible = !1),
    (Oe = []),
    (F = { min: 0, max: 0 }),
    Te(0),
    X(0, 0);
}
function Ne(e) {
  (p = Math.max(0, Math.min(Ce, e))), wt();
  const t = Ge.map((l, u) => G(8.5 + u * 2.5, 10.3 + u * 2.5, p)),
    s = G(16.2, 18.2, p),
    n = t[0] + t[1] + t[2] + s,
    a = G(19.2, 27.6, p);
  _e.forEach((l, u) => {
    const g = G(1 + u * 1.25, 2.8 + u * 1.25, p),
      C = M[l.id];
    (C.growth = g),
      (C.group.visible = g > 0.001),
      C.group.scale.set(1, Math.max(0.001, g), 1),
      Ie(C, s);
  }),
    Ge.forEach((l, u) => {
      (k[l.id].growth = t[u]),
        (k[l.id].group.visible = t[u] > 0.001),
        k[l.id].group.scale.setScalar(Math.max(0.001, t[u]));
    });
  const r = G(5.4, 7, p),
    o = 1 - 0.9 * G(8.5, 18.2, p);
  (F = Z(p * 1.15, 1.55 * r, 1.2, o)), (re.visible = r > 0.001);
  const i = (5.8 * n) / 4;
  Te(n, a),
    X(i, n, z),
    (J.visible = p > 6.4),
    ze(i, n, z),
    (d("assembly-time").value = p),
    (d("assembly-phase-value").textContent =
      `${p.toFixed(1).padStart(4, "0")} / 28.0 s`);
  const c =
    p < 1
      ? "HOLLOW AT ZERO"
      : p < 5.4
        ? "DORMANT TOWERS"
        : p < 8.5
          ? "DISTRIBUTED NOISE"
          : p < 16.2
            ? "KERNEL DESCENDS"
            : p < 18.2
              ? "FOUR TOWERS LINK"
              : p < 19.2
                ? "BASIN ACTIVATED"
                : p < 27.6
                  ? "KERNEL RISES"
                  : "DISPERSED INTO NOISE";
  (d("assembly-phase-label").textContent = c),
    (d("sequence-status").innerHTML = `<i></i>${c} · ${p.toFixed(1)} S`),
    p >= Ce && ((q = !1), we());
}
function Qt() {
  const e = f[m];
  if (
    (wt(),
    (q = !1),
    ["scale", "provenance", "evaluation", "deployment"].includes(e.id))
  )
    (M[e.id].growth = 1), (M[e.id].group.visible = !0), Ie(M[e.id], 0.45);
  else if (e.id === "towers")
    Object.values(M).forEach((t) => {
      (t.growth = 1), (t.group.visible = !0), Ie(t, 0.45);
    }),
      (J.visible = !0),
      ze(0, 0, z);
  else if (["compression", "lineage", "governance"].includes(e.id)) {
    const t = ["compression", "lineage", "governance"].indexOf(e.id) + 1;
    (k[e.id].growth = 1),
      (k[e.id].group.visible = !0),
      Te(t),
      X((5.8 * t) / 4, t);
  } else
    e.id === "threshold"
      ? ((re.visible = !0), (F = Z(2.2, 0.82, 0.9, 1)), X(2.6, 0))
      : e.id === "noise"
        ? ((E.visible = !1), (re.visible = !0), (F = Z(ie, _, W, 1)))
        : e.id === "basin"
          ? (Te(4), X(5.8, 4))
          : e.id === "assembly" && Ne(p);
}
function Xt() {
  const e = f[m];
  (d("chapter-kicker").textContent = e.kicker),
    (d("chapter-title").textContent = e.title),
    (d("chapter-summary").textContent = e.summary),
    (d("panel-kicker").textContent =
      e.id === "noise"
        ? "INTERACTIVE NOISE"
        : e.id === "basin"
          ? "TWO-SIDED BASIN"
          : e.source
            ? "MODEL STATS + PUBLIC SIGNAL"
            : "MODEL STATE"),
    (d("chapter-count").textContent = `${String(m).padStart(2, "0")} / 12`),
    (d("panel-copy").textContent = e.copy);
  const t = d("panel-stats");
  t.replaceChildren(),
    e.stats.forEach(([n, a]) => {
      const r = document.createElement("div");
      r.className = "panel-stat";
      const o = document.createElement("strong");
      o.textContent = n;
      const i = document.createElement("span");
      (i.textContent = a), r.append(o, i), t.appendChild(r);
    });
  const s = d("public-source");
  (s.hidden = !e.source),
    e.source && ((s.textContent = `${e.source[0]} ↗`), (s.href = e.source[1])),
    (d("noise-lab").hidden = e.id !== "noise"),
    (d("basin-key").hidden = e.id !== "basin"),
    (d("assembly-phase").hidden = e.id !== "assembly"),
    (d("assembly-timeline").hidden = e.id !== "assembly"),
    (d("chapter-play").hidden = !["noise", "assembly"].includes(e.id)),
    (d("chapter-prev").disabled = m === 0),
    (d("chapter-next").disabled = m === f.length - 1),
    (d("transport-index").textContent =
      `CHAPTER ${String(m).padStart(2, "0")}`),
    (d("transport-note").textContent = e.source
      ? "PUBLIC REFERENCE · CHECKED 03 NOV 2026"
      : "CONCEPTUAL MODEL · NOT EXPERIMENTAL EVIDENCE"),
    (d("sequence-status").innerHTML = `<i></i>${e.status}`),
    st.querySelectorAll("button").forEach((n, a) => {
      n.classList.toggle("active", a === m),
        n.setAttribute("aria-current", a === m ? "step" : "false");
    }),
    we();
}
function Jt(e) {
  return e === "origin" || e === "assembly" ? "overhead" : "orbit";
}
function ye(e) {
  (nt = e), (Re = !1);
  const t = f[m];
  if (e === "overhead") h.target.set(0, 0, 0), v.position.set(0, 24, 0.01);
  else if (e === "under") h.target.set(0, -2.2, 0), v.position.set(12, -10, 15);
  else if (["scale", "provenance", "evaluation", "deployment"].includes(t.id)) {
    const s = M[t.id].group.position;
    h.target.copy(s).add(new w(0, 2.1, 0)),
      v.position.copy(s).add(new w(7.2, 6.4, 8.4));
  } else
    t.id === "threshold"
      ? (h.target.set(0, -0.7, 0), v.position.set(14, 3.2, 0.01))
      : (h.target.set(0, t.id === "basin" ? -1.6 : 0.3, 0),
        v.position.set(13.5, t.id === "basin" ? 7.5 : 11.5, 15.5));
  v.lookAt(h.target),
    h.update(),
    document.querySelectorAll("[data-sequence-view]").forEach((s) => {
      const n = s.dataset.sequenceView === e;
      s.classList.toggle("active", n),
        s.setAttribute("aria-pressed", String(n));
    });
}
function Y(e, t = !0) {
  (m = Math.max(0, Math.min(f.length - 1, e))),
    f[m].id === "assembly" && (p = 0),
    history.replaceState(null, "", `#${f[m].id}`),
    Xt(),
    Qt(),
    t && ye(Jt(f[m].id));
}
f.forEach((e, t) => {
  const s = document.createElement("button");
  (s.type = "button"),
    (s.innerHTML = `<span>${String(t).padStart(2, "0")}</span>${e.short}`),
    s.setAttribute("aria-label", `Chapter ${t}: ${e.short}`),
    s.addEventListener("click", () => Y(t)),
    st.appendChild(s);
});
d("chapter-prev").addEventListener("click", () => Y(m - 1));
d("chapter-next").addEventListener("click", () => Y(m + 1));
document
  .querySelectorAll("[data-sequence-view]")
  .forEach((e) =>
    e.addEventListener("click", () => ye(e.dataset.sequenceView)),
  );
d("rotate-360").addEventListener("click", () => {
  (h.autoRotate = !h.autoRotate),
    d("rotate-360").classList.toggle("active", h.autoRotate),
    d("rotate-360").setAttribute("aria-pressed", String(h.autoRotate));
});
function we() {
  const e = f[m].id,
    t = d("chapter-play"),
    s = e === "assembly" ? q : pe;
  (t.querySelector("span").textContent = s
    ? "Pause"
    : e === "assembly" && p >= Ce
      ? "Replay"
      : "Run"),
    t.setAttribute("aria-pressed", String(s)),
    t.setAttribute("aria-label", s ? "Pause chapter" : "Play chapter");
}
d("chapter-play").addEventListener("click", () => {
  f[m].id === "assembly"
    ? (p >= Ce && ((p = 0), ye("overhead")), (q = !q), (Re = !1))
    : (pe = !pe),
    we();
});
d("assembly-time").addEventListener("input", (e) => {
  (q = !1), Ne(Number(e.target.value)), we();
});
d("noise-rate").addEventListener("input", (e) => {
  (W = Number(e.target.value)),
    (d("noise-rate-output").textContent = `${W.toFixed(1)}×`),
    f[m].id === "noise" && (F = Z(ie, _, W, 1));
});
d("noise-amp").addEventListener("input", (e) => {
  (_ = Number(e.target.value)),
    (d("noise-amp-output").textContent = _.toFixed(1)),
    f[m].id === "noise" && (F = Z(ie, _, W, 1));
});
const es = {
  reactions:
    "Fast, shallow bursts: something was clicked. The count is positive; commitment is not thereby established.",
  votes:
    "Clustered, stronger events: a preference was registered. Vote height remains reaction amplitude, not proof of invariant meaning.",
  follows:
    "Broad, persistent activity: attention accumulated. A larger positive count still does not identify binding depth.",
};
document.querySelectorAll("[data-noise-preset]").forEach((e) =>
  e.addEventListener("click", () => {
    (V = e.dataset.noisePreset),
      (d("noise-description").textContent = es[V]),
      f[m].id === "noise" && (F = Z(ie, _, W, 1)),
      document.querySelectorAll("[data-noise-preset]").forEach((t) => {
        const s = t === e;
        t.classList.toggle("active", s),
          t.setAttribute("aria-pressed", String(s));
      });
  }),
);
addEventListener("keydown", (e) => {
  e.target instanceof HTMLInputElement ||
    (e.key === "ArrowRight" && Y(m + 1), e.key === "ArrowLeft" && Y(m - 1));
});
function ts() {
  const e = oe.clientWidth,
    t = oe.clientHeight;
  for (const s of rt) {
    let n = !1;
    if (
      (s.kind === "tower"
        ? (n = M[s.id].group.visible && M[s.id].growth > 0.55)
        : s.kind === "ring"
          ? (n = k[s.id].group.visible && k[s.id].growth > 0.5)
          : s.kind === "core"
            ? (n = E.visible && f[m].id !== "assembly")
            : s.kind === "basin" &&
              (n = y.group.visible && f[m].id === "basin"),
      e < 600 && s.kind === "ring" && f[m].id === "assembly" && (n = !1),
      (s.element.hidden = !n),
      !n)
    )
      continue;
    const a = s.anchor.clone().project(v);
    if (a.z < -1 || a.z > 1) {
      s.element.hidden = !0;
      continue;
    }
    const r = Math.max(68, Math.min(e - 68, (a.x * 0.5 + 0.5) * e)),
      o = Math.max(120, Math.min(t - 100, (-a.y * 0.5 + 0.5) * t));
    (s.element.style.left = `${r}px`), (s.element.style.top = `${o}px`);
  }
}
function qe() {
  const e = Math.max(1, oe.clientWidth),
    t = Math.max(1, oe.clientHeight);
  (v.aspect = e / t), v.updateProjectionMatrix(), S.setSize(e, t, !1);
}
new ResizeObserver(qe).observe(oe);
addEventListener("resize", qe);
qe();
const ss = new Lt();
let je = 0,
  Ke = !1;
S.setAnimationLoop((e) => {
  // frame gate first, then read the delta, so skipped frames don't lose time (was ~2-4x slow on 60/120Hz)
  if (e - je < 32) return;
  const t = Math.min(ss.getDelta(), 0.1);
  (je = e), Pe || (z += t);
  const s = f[m].id;
  if (s === "assembly" && q) {
    const n = p;
    Ne(p + t), n < 10.8 && p >= 10.8 && !Re && ye("orbit");
  } else
    s === "noise" && pe
      ? ((ie += t), (F = Z(ie, _, W, 1)))
      : (s === "basin" || (s === "assembly" && y.depth > 0)) &&
        (X(y.depth, y.layers, z), ze(y.depth, y.layers, z));
  Pe ||
    ((E.rotation.y += t * 0.3),
    Object.values(k).forEach((n, a) => {
      n.group.visible && (n.group.rotation.y += t * (0.025 + a * 0.012));
    }),
    ut.forEach((n, a) => {
      n.visible && (n.rotation.y += t * (0.08 + a * 0.025));
    })),
    h.update(),
    S.render(b, v),
    ts(),
    (window.__SEQUENCE_METRICS__ = {
      chapter: s,
      chapterIndex: m,
      view: nt,
      cameraX: v.position.x,
      cameraY: v.position.y,
      cameraZ: v.position.z,
      targetY: h.target.y,
      autoRotate: h.autoRotate,
      towerCount: Object.values(M).filter((n) => n.group.visible).length,
      ringCount: Object.values(k).filter((n) => n.group.visible).length,
      activeBursts: Oe.length,
      noiseMin: F.min,
      noiseMax: F.max,
      noiseSampleY: ne[1],
      basinDepth: y.depth,
      basinCenterY: y.geometry.attributes.position.array[1],
      kernelLayer: L,
      kernelY: E.position.y,
      kernelVisible: E.visible,
      kernelParticlesVisible: he.visible,
      towerActivation: Object.fromEntries(
        Object.entries(M).map(([n, a]) => [n, a.activation]),
      ),
      noiseParticles: K,
      assemblyTime: p,
      assemblyPlaying: q,
      noisePlaying: pe,
      noisePreset: V,
      noiseRate: W,
      noiseAmplitude: _,
      drawCalls: S.info.render.calls,
      triangles: S.info.render.triangles,
    }),
    Ke ||
      ((Ke = !0),
      (window.__SEQUENCE_READY__ = !0),
      (window.__SCENE_READY__ = !0));
});
window.__sequenceChapter = (e) => {
  const t = f.findIndex((s) => s.id === e);
  t >= 0 && Y(t);
};
window.__sequenceView = ye;
window.__seek = (e) => {
  f[m].id !== "assembly" && Y(f.length - 1), (q = !1), Ne(Number(e) || 0), we();
};
const ns = location.hash.slice(1),
  Qe = f.findIndex((e) => e.id === ns);
Y(Qe >= 0 ? Qe : 0);
addEventListener("hashchange", () => {
  const e = f.findIndex((t) => t.id === location.hash.slice(1));
  e >= 0 && e !== m && Y(e);
});

// ---- Cinema hook (used by the promo recorder; the live page never calls it) ----
// window.__cinema({ p, towers:[g0..g3], glow, spiral, flow, cam:{pos:[x,y,z], tgt:[x,y,z]} })
{
  const ox = Float32Array.from(ne);
  const seed = new Float32Array(K);
  for (let l = 0; l < K; l++) seed[l] = Math.abs((Math.sin((l + 1) * 12.9898) * 43758.5453) % 1);
  const lerp = (a, b, t) => a + (b - a) * t;
  window.__cinema = (o) => {
    if (f[m].id !== "assembly") Y(f.length - 1, !1);
    q = !1;
    h.enabled = !1;
    h.enableDamping = !1;
    h.autoRotate = !1;
    Ne(o.p);
    const link = G(16.2, 18.2, p);
    _e.forEach((t, u) => {
      const C = M[t.id];
      if (o.towers) {
        const g = o.towers[u];
        C.growth = g;
        C.group.visible = g > 0.001;
        C.group.scale.set(1, Math.max(0.001, g), 1);
      }
      // brighter while introduced; link lines still key off the real link time
      Ie(C, Math.max(link, (o.glow ?? 0) * Math.min(1, C.growth * 1.4)));
      C.activation = link;
    });
    const k = o.spiral || 0;
    if (k > 0 && re.visible) {
      const flow = o.flow || 0;
      for (let l = 0; l < K; l++) {
        const kl = Math.max(0, Math.min(1, k * 1.5 - seed[l] * 0.5));
        const x0 = ox[l * 3], z0 = ox[l * 3 + 2];
        const r0 = Math.hypot(x0, z0), t0 = Math.atan2(z0, x0);
        const arm = l % 5;
        let u = (seed[l] * 7.31 - flow * 0.07) % 1;
        if (u < 0) u += 1;
        const rt = ue * (0.05 + 0.93 * u);
        const tt = (arm / 5) * Math.PI * 2 + (1 - u) * Math.PI * 2.4 + flow * 0.32;
        let d = (tt - t0) % (Math.PI * 2);
        if (d < 0) d += Math.PI * 2;
        const r = lerp(r0, rt, kl), th = t0 + d * kl;
        const xx = Math.cos(th) * r, zz = Math.sin(th) * r;
        ne[l * 3] = xx;
        ne[l * 3 + 2] = zz;
        ne[l * 3 + 1] = lerp(ne[l * 3 + 1], ge(xx, zz, y.depth) + 0.07, kl);
        const fade = 1 - kl * (1 - G(0, 0.1, u) * (1 - G(0.92, 1, u)));
        x.setRGB(Me[l * 3], Me[l * 3 + 1], Me[l * 3 + 2]).lerp(ae[arm % 4], kl * 0.75).multiplyScalar(fade);
        Me[l * 3] = x.r;
        Me[l * 3 + 1] = x.g;
        Me[l * 3 + 2] = x.b;
      }
      fe.attributes.position.needsUpdate = !0;
      fe.attributes.color.needsUpdate = !0;
    } else if (re.visible) {
      for (let l = 0; l < K; l++) {
        ne[l * 3] = ox[l * 3];
        ne[l * 3 + 2] = ox[l * 3 + 2];
      }
      fe.attributes.position.needsUpdate = !0;
    }
    if (o.cam) {
      h.target.set(...o.cam.tgt);
      v.position.set(...o.cam.pos);
      v.lookAt(h.target);
    }
    return { kernelY: E.position.y, p };
  };
}
