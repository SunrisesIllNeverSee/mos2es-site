import {
  W as vt,
  S as At,
  A as Dt,
  a as St,
  C as N,
  q as Ct,
  b as Rt,
  O as Nt,
  H as Pt,
  D as ke,
  Z as Lt,
  M as g,
  t as Bt,
  d as P,
  r as Ot,
  G as H,
  h as W,
  V as c,
  k as ce,
  l as Ut,
  m as ze,
  _ as Gt,
  $ as Ht,
  i as le,
  B as j,
  E as Ee,
  u as We,
  I as Fe,
  e as _e,
  J as Me,
  a0 as $e,
  a1 as kt,
  a2 as zt,
  a3 as Wt,
  L as de,
  Y as Ve,
  Q as Ft,
  T as Xe,
  g as Ze,
  s as _t,
  p as $t,
  X as Vt,
  z as Xt,
} from "./OrbitControls-NL7GUOCB.js";
/* empty css               */ const Ye =
  document.getElementById("world-container");
Ye && Zt();
function Zt() {
  const qe = Math.PI * 2,
    L = document.getElementById("world"),
    ue = document.getElementById("timeline"),
    je = document.getElementById("timeline-output"),
    K = document.getElementById("play-toggle"),
    F = document.getElementById("world-status"),
    Q = document.getElementById("phase-kicker"),
    J = document.getElementById("phase-title"),
    ee = document.getElementById("phase-detail"),
    pe = document.getElementById("noise-intensity"),
    me = document.getElementById("binding-depth"),
    Ke = document.getElementById("noise-output"),
    Qe = document.getElementById("depth-output"),
    Je = document.getElementById("shape-equation"),
    et = document.getElementById("scene-labels");
  let E = "combined",
    A = "gaussian",
    B = Number(pe.value),
    k = Number(me.value),
    S = !0,
    fe = "overview",
    l = 0,
    M = !0,
    _ = !0,
    Ie = 0,
    w;
  try {
    w = new vt({ antialias: !0, powerPreference: "high-performance" });
  } catch {
    F.textContent = "WEBGL UNAVAILABLE";
    return;
  }
  w.setPixelRatio(Math.min(devicePixelRatio, 1.5)),
    (w.outputColorSpace = At),
    (w.toneMapping = Dt),
    (w.toneMappingExposure = 1.04),
    Ye.appendChild(w.domElement),
    w.domElement.setAttribute("role", "img"),
    w.domElement.setAttribute(
      "aria-label",
      "A rectangular zero plane transforms into reactive positive noise and a governed negative binding well, surrounded by the Four Towers",
    );
  const p = new St();
  (p.background = new N(529947)), (p.fog = new Ct(529947, 0.0045));
  const O = new Rt(42, 1, 0.1, 180),
    C = new Nt(O, w.domElement);
  (C.enableDamping = !1),
    (C.enablePan = !0),
    (C.minDistance = 8),
    (C.maxDistance = 90),
    (C.maxPolarAngle = Math.PI * 0.49),
    C.addEventListener("change", () => {
      _ = !0;
    }),
    p.add(new Pt(12117467, 1120808, 1.35));
  const Te = new ke(16766624, 2);
  Te.position.set(-10, 18, 11), p.add(Te);
  const ve = new ke(7839712, 1);
  ve.position.set(14, 7, -12), p.add(ve);
  const Ae = new Lt(5492155, 22, 24, 2);
  Ae.position.set(0, -5.8, 0), p.add(Ae);
  const we = new g(
    new Bt(80, 80),
    new P({ color: 529176, roughness: 1, metalness: 0 }),
  );
  (we.rotation.x = -Math.PI / 2), (we.position.y = -7.25), p.add(we);
  const te = new Ot(70, 35, 2704973, 1913401);
  (te.position.y = -7.2),
    (te.material.transparent = !0),
    (te.material.opacity = 0.18),
    p.add(te);
  const tt = rt();
  p.add(tt);
  const he = new H(),
    $ = new H();
  p.add(he, $);
  const U = new P({
      color: 6131601,
      emissive: 1060403,
      emissiveIntensity: 0.7,
      roughness: 0.38,
      metalness: 0.55,
      transparent: !0,
      opacity: 0.86,
    }),
    nt = new W({ color: 10209213, transparent: !0, opacity: 0.38 }),
    ot = new P({ color: 1519929, roughness: 0.6, metalness: 0.65 }),
    De = [
      {
        id: "scale",
        name: "MODEL SCALE",
        detail: "CAPACITY / CONTEXT",
        position: new c(-9, 0, 6.8),
      },
      {
        id: "provenance",
        name: "PROVENANCE",
        detail: "ORIGIN / LINEAGE",
        position: new c(9, 0, 6.8),
      },
      {
        id: "evaluation",
        name: "EVALUATION",
        detail: "TESTS / MEASURES",
        position: new c(-9, 0, -6.8),
      },
      {
        id: "deployment",
        name: "DEPLOYMENT",
        detail: "CUSTODY / RUNTIME",
        position: new c(9, 0, -6.8),
      },
    ],
    V = {};
  for (const [e, t] of De.entries()) {
    const n = it(t.id);
    n.position.copy(t.position), he.add(n);
    const o = xe(`TOWER 0${e + 1}`, t.name, t.detail);
    V[t.id] = {
      element: o,
      anchor: t.position.clone().add(new c(0, 5.65, 0)),
      kind: "tower",
    };
  }
  const ge = new ce({ color: 5818808, transparent: !0, opacity: 0.14 }),
    be = new c(0, -6.15, 0);
  for (const e of De) {
    const t = e.position,
      n = Math.sign(t.x),
      o = Math.sign(t.z),
      s = new Ut([
        t.clone().add(new c(0, 0.08, 0)),
        new c(n * 7.15, -0.15, o * 5.15),
        new c(n * 5.2, -2.5, o * 3.6),
        be,
      ]),
      a = new g(new ze(s, 48, 0.025, 5, !1), ge);
    $.add(a);
  }
  const Se = new Gt(),
    ne = [
      new c(-7.65, 0.075, -5.65),
      new c(7.65, 0.075, -5.65),
      new c(7.65, 0.075, 5.65),
      new c(-7.65, 0.075, 5.65),
    ];
  for (let e = 0; e < ne.length; e++)
    Se.add(new Ht(ne[e], ne[(e + 1) % ne.length]));
  $.add(new g(new ze(Se, 96, 0.035, 5, !0), ge));
  const oe = new H(),
    st = new g(
      new le(0.82, 0),
      new P({
        color: 6674116,
        emissive: 3058331,
        emissiveIntensity: 1.4,
        roughness: 0.28,
        metalness: 0.45,
      }),
    ),
    Ce = new g(
      new le(1.28, 0),
      new ce({ color: 9430744, wireframe: !0, transparent: !0, opacity: 0.28 }),
    );
  oe.add(st, Ce),
    oe.position.copy(be),
    $.add(oe),
    (V.substrate = {
      element: xe(
        "SHARED BINDING SUBSTRATE",
        "MO§ES CORE",
        "LINEAGE / CUSTODY / PERMISSION",
        "substrate",
      ),
      anchor: be.clone().add(new c(0, -0.7, 0)),
      kind: "tower",
    });
  const at = ct();
  p.add(at);
  const h = lt(),
    se = h.mesh;
  p.add(se);
  const ye = [];
  for (let e = 0; e < 3; e++) {
    const t = new j();
    t.setAttribute("position", new Ee(new Float32Array(384), 3));
    const n = new We(
      t,
      new W({
        color: 15912331,
        transparent: !0,
        opacity: 0.38,
        depthWrite: !1,
      }),
    );
    (n.visible = !1), p.add(n), ye.push(n);
  }
  const y = dt();
  p.add(y.group),
    (V.kernel = {
      element: xe(
        "IDENTITY-PRESERVING STRUCTURE",
        "GOVERNED KERNEL",
        "FORM EMERGES / WELL DEEPENS",
        "kernel",
      ),
      anchor: new c(0, 2, 0),
      kind: "kernel",
    });
  const X = ut(20260123),
    Z = [];
  for (let e = 0; e < 14; e++) {
    let t, n;
    do (t = (X() - 0.5) * (14 - 1.2)), (n = (X() - 0.5) * (10 - 1.2));
    while (Math.hypot(t, n) < 3);
    Z.push({
      x: t,
      z: n,
      period: 4.2 + X() * 0.25,
      offset: e * 0.37,
      amplitude: 0.48 + X() * 0.52,
      sigma: 0.38 + X() * 0.32,
    });
  }
  const Y = new Fe(
    new _e(0.07, 6, 6),
    new ce({ color: 15766384, transparent: !0, opacity: 0.78 }),
    Z.length,
  );
  Y.instanceMatrix.setUsage(Me), p.add(Y);
  const ae = new $e();
  function rt() {
    const e = new kt();
    e.moveTo(-12, -9),
      e.lineTo(12, -9),
      e.lineTo(12, 9),
      e.lineTo(-12, 9),
      e.closePath();
    const t = new zt();
    t.moveTo(-7.3, -5.3),
      t.lineTo(-7.3, 5.3),
      t.lineTo(7.3, 5.3),
      t.lineTo(7.3, -5.3),
      t.closePath(),
      e.holes.push(t);
    const n = new Wt(e, { depth: 0.38, bevelEnabled: !1, curveSegments: 1 });
    n.rotateX(Math.PI / 2);
    const o = new g(
        n,
        new P({ color: 1124913, roughness: 0.52, metalness: 0.72 }),
      ),
      s = new de(
        new Ve(n, 25),
        new W({ color: 4287856, transparent: !0, opacity: 0.38 }),
      ),
      a = new H();
    return a.add(o, s), a;
  }
  function x(e, t, n, o = U, s = !0) {
    const a = new Vt(...t),
      r = new g(a, o);
    if ((r.position.set(...n), e.add(r), s)) {
      const i = new de(new Ve(a), nt);
      i.position.copy(r.position), e.add(i);
    }
    return r;
  }
  function it(e) {
    const t = new H();
    if ((x(t, [2.5, 0.32, 2.5], [0, 0.16, 0], ot), e === "scale")) {
      for (let n = 0; n < 4; n++) {
        const o = 2 - n * 0.34;
        x(t, [o, 0.88, o], [0, 0.82 + n * 1.08, 0]);
      }
      x(t, [0.26, 1.1, 0.26], [0, 4.75, 0]);
    } else if (e === "provenance") {
      const n = new g(new Ft(0.13, 0.13, 4.5, 10), U);
      (n.position.y = 2.55), t.add(n);
      for (let o = 0; o < 5; o++) {
        const s = new g(new Xe(0.86 - o * 0.055, 0.065, 6, 32), U);
        (s.rotation.x = Math.PI / 2),
          (s.position.y = 0.75 + o * 0.88),
          t.add(s),
          x(
            t,
            [0.32, 0.16, 0.32],
            [o % 2 ? -0.86 : 0.86, 0.75 + o * 0.88, 0],
            U,
            !1,
          );
      }
    } else if (e === "evaluation") {
      const n = [2.6, 4.4, 3.5, 4.9],
        o = [
          [-0.68, -0.68],
          [0.68, -0.68],
          [-0.68, 0.68],
          [0.68, 0.68],
        ];
      for (let a = 0; a < 4; a++) {
        const [r, i] = o[a];
        x(t, [0.46, n[a], 0.46], [r, 0.32 + n[a] / 2, i]);
      }
      const s = new g(new Xe(1.05, 0.055, 6, 40), U);
      (s.rotation.x = Math.PI / 2), (s.position.y = 3.75), t.add(s);
    } else
      x(t, [0.5, 4.35, 0.72], [-0.78, 2.5, 0]),
        x(t, [0.5, 4.35, 0.72], [0.78, 2.5, 0]),
        x(t, [2.05, 0.42, 0.9], [0, 4.65, 0]),
        x(t, [0.82, 0.82, 0.82], [0, 2.55, 0]),
        x(t, [2.1, 0.12, 0.16], [0, 1.15, 0.72], U, !1),
        x(t, [2.1, 0.12, 0.16], [0, 1.15, -0.72], U, !1);
    return t;
  }
  function xe(e, t, n, o = "") {
    const s = document.createElement("div");
    return (
      (s.className = `scene-label ${o}`.trim()),
      (s.innerHTML = `<span>${e}</span><b>${t}</b><span>${n}</span>`),
      et.appendChild(s),
      s
    );
  }
  function ct() {
    const e = new H(),
      t = [];
    for (let r = -14 / 2; r <= 14 / 2 + 0.001; r += 1)
      t.push(r, 0.028, -10 / 2, r, 0.028, 10 / 2);
    for (let r = -10 / 2; r <= 10 / 2 + 0.001; r += 1)
      t.push(-14 / 2, 0.028, r, 14 / 2, 0.028, r);
    const n = new j();
    n.setAttribute("position", new Ze(t, 3));
    const o = new de(
      n,
      new W({ color: 7056036, transparent: !0, opacity: 0.2 }),
    );
    e.add(o);
    const s = [
        new c(-14 / 2, 0.035, -10 / 2),
        new c(14 / 2, 0.035, -10 / 2),
        new c(14 / 2, 0.035, 10 / 2),
        new c(-14 / 2, 0.035, 10 / 2),
      ],
      a = new We(
        new j().setFromPoints(s),
        new W({ color: 8246983, transparent: !0, opacity: 0.7 }),
      );
    return e.add(a), e;
  }
  function lt() {
    const e = new Float32Array(26973),
      t = new Float32Array(e.length),
      n = new Float32Array(8991 * 2),
      o = [];
    let s = 0,
      a = 0;
    for (let d = 0; d <= 80; d++) {
      const b = -5 + (d / 80) * 10;
      for (let f = 0; f <= 110; f++) {
        const T = -7 + (f / 110) * 14;
        (e[s] = T),
          (e[s + 1] = 0),
          (e[s + 2] = b),
          (n[a++] = T),
          (n[a++] = b),
          (s += 3);
      }
    }
    for (let d = 0; d < 80; d++)
      for (let b = 0; b < 110; b++) {
        const f = d * 111 + b,
          T = f + 1,
          m = f + 110 + 1,
          D = m + 1;
        o.push(f, m, T, T, m, D);
      }
    const r = new j();
    r.setAttribute("position", new Ee(e, 3).setUsage(Me)),
      r.setAttribute("color", new Ee(t, 3).setUsage(Me)),
      r.setIndex(o);
    const i = new P({
      vertexColors: !0,
      roughness: 0.66,
      metalness: 0.12,
      side: _t,
      transparent: !0,
      opacity: 0.96,
    });
    return { mesh: new g(r, i), positions: e, colors: t, xz: n };
  }
  function dt() {
    const e = new H();
    e.position.set(0, 0.9, 0);
    const t = new P({
        color: 15251816,
        emissive: 10118188,
        emissiveIntensity: 0.8,
        roughness: 0.35,
        transparent: !0,
        opacity: 0,
      }),
      n = new Fe(new _e(0.09, 8, 8), t, 27),
      o = new $e(),
      s = [];
    let a = 0;
    for (let m = -1; m <= 1; m++)
      for (let D = -1; D <= 1; D++)
        for (let G = -1; G <= 1; G++) {
          const v = new c(m * 0.38, D * 0.38, G * 0.38);
          o.position.copy(v),
            o.scale.setScalar(1),
            o.updateMatrix(),
            n.setMatrixAt(a++, o.matrix),
            m < 1 &&
              s.push(
                ...v.toArray(),
                ...v
                  .clone()
                  .add(new c(0.38, 0, 0))
                  .toArray(),
              ),
            D < 1 &&
              s.push(
                ...v.toArray(),
                ...v
                  .clone()
                  .add(new c(0, 0.38, 0))
                  .toArray(),
              ),
            G < 1 &&
              s.push(
                ...v.toArray(),
                ...v
                  .clone()
                  .add(new c(0, 0, 0.38))
                  .toArray(),
              );
        }
    const r = new j();
    r.setAttribute("position", new Ze(s, 3));
    const i = new W({ color: 9492937, transparent: !0, opacity: 0 }),
      u = new de(r, i),
      d = new P({
        color: 15776608,
        emissive: 12876331,
        emissiveIntensity: 1.1,
        roughness: 0.28,
        transparent: !0,
        opacity: 0,
      }),
      b = new g(new le(0.28, 0), d),
      f = new ce({
        color: 6804417,
        wireframe: !0,
        transparent: !0,
        opacity: 0,
      }),
      T = new g(new le(0.9, 1), f);
    return (
      e.add(n, u, b, T),
      (e.visible = !1),
      {
        group: e,
        nodeMaterial: t,
        edgeMaterial: i,
        coreMaterial: d,
        boundaryMaterial: f,
        boundary: T,
      }
    );
  }
  function ut(e) {
    return function () {
      e = (e + 1831565813) | 0;
      let t = e,
        n = Math.imul(t ^ (t >>> 15), 1 | t);
      return (
        (n = (n + Math.imul(n ^ (n >>> 7), 61 | n)) ^ n),
        ((n ^ (n >>> 14)) >>> 0) / 4294967296
      );
    };
  }
  function Re(e) {
    return Math.max(0, Math.min(1, e));
  }
  function re(e, t, n) {
    const o = Re((n - e) / (t - e));
    return o * o * (3 - 2 * o);
  }
  function pt(e, t, n) {
    if (n <= 0) return 0;
    const o = Math.hypot(e, t);
    if (o >= 4.2) return 0;
    const s = o / 4.2;
    if (A === "cone") return -n * (1 - s);
    if (A === "bowl") return -n * (1 - s * s);
    const a = 1.55,
      r = Math.exp(-17.64 / (2 * a * a));
    return (-n * (Math.exp(-(o * o) / (2 * a * a)) - r)) / (1 - r);
  }
  const mt = new N(1523011),
    ft = new N(15252327),
    Ne = new N(12083056),
    wt = new N(5260664),
    ht = new N(15435107),
    z = new N(),
    Pe = new N();
  function gt(e) {
    return e < 0.5
      ? Pe.copy(ft).lerp(Ne, e * 2)
      : Pe.copy(Ne).lerp(wt, (e - 0.5) * 2);
  }
  function bt(e, t) {
    const n = se.geometry.getAttribute("position"),
      o = se.geometry.getAttribute("color"),
      s = E === "noise" ? 0 : k * t,
      a = E === "signal" || B <= 0 ? 0 : re(0, 0.7, e),
      r = [];
    if (a > 0)
      for (const i of Z) {
        const u = (e + i.offset) % i.period;
        if (u < 0.9) {
          const d = Math.pow(Math.sin((Math.PI * u) / 0.9), 1.35);
          r.push({ source: i, amplitude: i.amplitude * B * a * d });
        }
      }
    (h.activeBurstCount = r.length), (h.noiseGate = a);
    for (let i = 0; i < h.xz.length / 2; i++) {
      const u = h.xz[i * 2],
        d = h.xz[i * 2 + 1],
        b = pt(u, d, s);
      let f = 0;
      for (const m of r) {
        const D = u - m.source.x,
          G = d - m.source.z,
          v = m.source.sigma * m.source.sigma,
          He = D * D + G * G;
        He < v * 12 && (f += m.amplitude * Math.exp(-He / (2 * v)));
      }
      const T = b + Math.min(f, B * 1.65);
      if (((h.positions[i * 3 + 1] = T), z.copy(mt), b < 0 && k > 0)) {
        const m = Re(-b / k);
        z.lerp(gt(m), 0.35 + t * 0.65);
      }
      f > 0 && z.lerp(ht, Math.min(0.88, f / Math.max(B, 0.2))),
        (h.colors[i * 3] = z.r),
        (h.colors[i * 3 + 1] = z.g),
        (h.colors[i * 3 + 2] = z.b);
    }
    return (
      (n.needsUpdate = !0),
      (o.needsUpdate = !0),
      se.geometry.computeVertexNormals(),
      xt(s, t),
      Et(e, a),
      s
    );
  }
  function yt(e) {
    if (A === "cone") return 4.2 * (1 - e);
    if (A === "bowl") return 4.2 * Math.sqrt(Math.max(0, 1 - e));
    const t = 1.55,
      n = Math.exp(-17.64 / (2 * t * t));
    return Math.sqrt(-2 * t * t * Math.log(e * (1 - n) + n));
  }
  function xt(e, t) {
    for (let n = 0; n < ye.length; n++) {
      const o = ye[n];
      if (((o.visible = e > 0.04 && t > 0.02), !o.visible)) continue;
      const s = (n + 1) / 4,
        a = yt(s),
        r = -e * s + 0.025,
        i = o.geometry.getAttribute("position");
      for (let u = 0; u < 128; u++) {
        const d = (u / 128) * qe;
        i.setXYZ(u, Math.cos(d) * a, r, Math.sin(d) * a);
      }
      i.needsUpdate = !0;
    }
  }
  function Et(e, t) {
    Y.visible = t > 0;
    for (let n = 0; n < Z.length; n++) {
      const o = Z[n],
        s = (e + o.offset) % o.period,
        a = 1.15,
        r = s > o.period - a,
        i = r ? (s - (o.period - a)) / a : 0;
      ae.position.set(o.x, r ? 0.1 + 3.8 * Math.pow(1 - i, 1.35) : 0, o.z);
      const u = r ? t : 0;
      ae.scale.set(0.72 * u, 7.5 * u, 0.72 * u),
        ae.updateMatrix(),
        Y.setMatrixAt(n, ae.matrix);
    }
    Y.instanceMatrix.needsUpdate = !0;
  }
  function Mt(e, t) {
    const n = E !== "noise" && t > 0.003;
    if (((y.group.visible = n), (V.kernel.element.hidden = !n), !n)) return;
    const o = 0.22 + t * 0.78;
    y.group.scale.setScalar(o),
      (y.group.rotation.y = e * 0.09),
      (y.nodeMaterial.opacity = t),
      (y.edgeMaterial.opacity = t * 0.48),
      (y.coreMaterial.opacity = t),
      (y.boundaryMaterial.opacity = t * 0.22),
      (y.boundary.rotation.y = -e * 0.12);
  }
  function It(e, t) {
    (ue.value = l.toFixed(2)),
      (je.value = `${l.toFixed(1).padStart(4, "0")} / 16.0 s`),
      l < 0.005
        ? ((Q.textContent = "00 / NEUTRAL ORIGIN"),
          (J.textContent = "Signal = 0 · Noise = 0"),
          (ee.textContent =
            "A flat rectangular field. Run the transformation to introduce both regimes."),
          (F.textContent = "NEUTRAL START · Z = 0"))
        : E === "noise"
          ? ((Q.textContent = "UNGOVERNED / REACTIVE FIELD"),
            (J.textContent = "Transient positive bursts"),
            (ee.textContent =
              "Droplets impact the zero plane; amplitude rises, then reaction subsides."),
            (F.textContent = "NOISE FIELD · POSITIVE Z"))
          : e < 0.995
            ? ((Q.textContent = `KERNEL ACQUISITION / ${Math.round(e * 100)}%`),
              (J.textContent =
                E === "signal"
                  ? "Binding geometry is forming"
                  : "Two fields diverge from zero"),
              (ee.textContent =
                "As the governed kernel coheres, binding depth increases. Noise remains additive and transient."),
              (F.textContent = `KERNEL ${Math.round(e * 100)}% · DEPTH −${t.toFixed(1)}`))
            : ((Q.textContent = `GOVERNED / ${A.toUpperCase()} GEOMETRY`),
              (J.textContent = `Binding depth −${t.toFixed(1)}`),
              (ee.textContent =
                E === "signal"
                  ? "The kernel is coherent; the selected binding surface is fully formed."
                  : "The governed well persists while reactive noise continues above the reference."),
              (F.textContent = `${A.toUpperCase()} · DEPTH −${t.toFixed(1)}`));
  }
  function R(e) {
    const t = re(0.55, 11.8, e),
      n = bt(e, t);
    Mt(e, t),
      (ge.opacity = E === "noise" ? 0.12 : 0.12 + t * 0.5),
      (oe.rotation.y = e * 0.08),
      (Ce.rotation.y = -e * 0.1),
      It(t, n);
  }
  function Tt() {
    const e = L.clientWidth,
      t = L.clientHeight;
    for (const n of Object.values(V)) {
      if (n.kind === "tower" && (!S || fe === "surface")) {
        n.element.hidden = !0;
        continue;
      }
      if (n.kind === "kernel" && !y.group.visible) {
        n.element.hidden = !0;
        continue;
      }
      const o = n.anchor.clone().project(O),
        s = (o.x * 0.5 + 0.5) * e,
        a = (-o.y * 0.5 + 0.5) * t,
        r = o.z > 1 || s < -80 || s > e + 80 || a < -50 || a > t + 50;
      if (((n.element.hidden = r), !r)) {
        const i = Math.min(e < 760 ? 58 : 80, e / 2),
          u = Math.max(i, Math.min(e - i, s)),
          d = Math.max(28, Math.min(t - 28, a));
        n.element.style.transform = `translate(-50%, -50%) translate(${u.toFixed(1)}px, ${d.toFixed(1)}px)`;
      }
    }
  }
  function I() {
    w.render(p, O), Tt(), (_ = !1);
    let e = 1 / 0,
      t = -1 / 0;
    for (let n = 1; n < h.positions.length; n += 3) {
      const o = h.positions[n];
      o < e && (e = o), o > t && (t = o);
    }
    window.__MODELS_METRICS__ = {
      time: l,
      field: E,
      shape: A,
      acquisition: re(0.55, 11.8, l),
      bindingDepth: E === "noise" ? 0 : k * re(0.55, 11.8, l),
      noiseIntensity: B,
      towersVisible: S,
      paused: M,
      surfaceMin: e,
      surfaceMax: t,
      kernelVisible: y.group.visible,
      activeBurstCount: h.activeBurstCount,
      noiseGate: h.noiseGate,
      drawCalls: w.info.render.calls,
      triangles: w.info.render.triangles,
    };
  }
  function q() {
    K.setAttribute("aria-pressed", String(!M)),
      K.setAttribute(
        "aria-label",
        M ? "Play transformation" : "Pause transformation",
      ),
      (K.querySelector("span").textContent = M
        ? l >= 16
          ? "Replay"
          : "Run"
        : "Pause");
  }
  function ie(e) {
    const t = Number(e);
    (l = Number.isFinite(t) ? Xt.clamp(t, 0, 16) : 0), (M = !0), R(l), q(), I();
  }
  function Le() {
    l >= 16 - 0.001 && (l = 0), (M = !1), Ue.getDelta(), q();
  }
  function Be(e) {
    fe = e;
    for (const a of document.querySelectorAll("[data-camera]")) {
      const r = a.dataset.camera === e;
      a.classList.toggle("active", r),
        a.setAttribute("aria-pressed", String(r));
    }
    const t = Math.max(L.clientWidth / Math.max(L.clientHeight, 1), 0.35),
      n =
        e === "surface"
          ? new c(0, -1.15, 0)
          : e === "towers"
            ? new c(0, 0.4, 0)
            : new c(0, -0.8, 0),
      o =
        e === "surface"
          ? new c(10, 10.5, 13.5)
          : e === "towers"
            ? new c(23, 11, 3)
            : new c(22, 15, 9),
      s = e === "surface" ? Math.max(1, 0.84 / t) : Math.max(1, 1.22 / t);
    o.multiplyScalar(s),
      C.target.copy(n),
      O.position.copy(n).add(o),
      O.lookAt(n),
      C.update(),
      (_ = !0),
      I();
  }
  function Oe() {
    const e = L.clientWidth,
      t = L.clientHeight;
    w.setSize(e, t, !1),
      (O.aspect = e / Math.max(t, 1)),
      O.updateProjectionMatrix(),
      Be(fe);
  }
  for (const e of document.querySelectorAll("[data-field]"))
    e.addEventListener("click", () => {
      E = e.dataset.field;
      for (const t of document.querySelectorAll("[data-field]")) {
        const n = t === e;
        t.classList.toggle("active", n),
          t.setAttribute("aria-pressed", String(n));
      }
      R(l), I();
    });
  for (const e of document.querySelectorAll("[data-shape]"))
    e.addEventListener("click", () => {
      A = e.dataset.shape;
      for (const t of document.querySelectorAll("[data-shape]")) {
        const n = t === e;
        t.classList.toggle("active", n),
          t.setAttribute("aria-pressed", String(n));
      }
      (Je.textContent = `Z = Z${A} + Znoise`), R(l), I();
    });
  for (const e of document.querySelectorAll("[data-camera]"))
    e.addEventListener("click", () => Be(e.dataset.camera));
  K.addEventListener("click", () => {
    M ? Le() : ((M = !0), (_ = !0), q());
  }),
    document
      .getElementById("neutral-reset")
      .addEventListener("click", () => ie(0)),
    ue.addEventListener("input", () => ie(ue.value)),
    pe.addEventListener("input", () => {
      (B = Number(pe.value)), (Ke.value = B.toFixed(1)), R(l), I();
    }),
    me.addEventListener("input", () => {
      (k = Number(me.value)), (Qe.value = `−${k.toFixed(1)}`), R(l), I();
    }),
    document.getElementById("towers-toggle").addEventListener("click", (e) => {
      (S = !S),
        (he.visible = S),
        ($.visible = S),
        e.currentTarget.classList.toggle("active", S),
        e.currentTarget.setAttribute("aria-pressed", String(S)),
        I();
    });
  const Ue = new $t();
  w.setAnimationLoop((e) => {
    const t = Math.min(Ue.getDelta(), 0.25);
    if (M) _ && (R(l), I());
    else {
      l = Math.min(16, l + t);
      const n = l >= 16;
      (e - Ie >= 33 || n) && (R(l), I(), (Ie = e)), n && ((M = !0), q());
    }
  }),
    (window.__seek = ie),
    (window.__play = Le),
    (window.__MODELS_READY__ = !1),
    new ResizeObserver(Oe).observe(L),
    R(0),
    Oe(),
    q(),
    I();
  const Ge = new URLSearchParams(location.search).get("t");
  Ge !== null && ie(Ge), (window.__MODELS_READY__ = !0);
}
