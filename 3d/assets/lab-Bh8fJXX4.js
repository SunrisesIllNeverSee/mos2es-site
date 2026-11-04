import {
  W as _e,
  S as fe,
  A as He,
  a as We,
  C as A,
  q as Ze,
  b as je,
  O as $e,
  H as Ye,
  D as he,
  r as we,
  V as u,
  G as U,
  d as Ke,
  s as ge,
  k as be,
  M as ee,
  B as v,
  t as Xe,
  c as Je,
  u as te,
  h as D,
  v as xe,
  w as Qe,
  x as et,
  y as tt,
  g as V,
  z as G,
} from "./OrbitControls-NL7GUOCB.js";
/* empty css              */ const ne =
  document.getElementById("latent-container");
ne && nt();
function nt() {
  const y = document.getElementById("latent-stage"),
    ye = document.getElementById("latent-labels"),
    _ = document.getElementById("latent-state"),
    oe = document.getElementById("latent-description"),
    se = document.getElementById("latent-equation"),
    ie = document.getElementById("latent-model-kicker"),
    H = document.getElementById("noise-amplitude"),
    W = document.getElementById("binding-depth"),
    Ee = document.getElementById("noise-amplitude-output"),
    Me = document.getElementById("binding-depth-output"),
    Z = document.getElementById("zero-plane-toggle"),
    j = document.getElementById("contour-toggle"),
    re = [...document.querySelectorAll("[data-latent-view]")],
    E = 8,
    h = 4,
    g = 72,
    Ie = 20260123,
    $ = Math.PI * 2,
    b = {};
  let B = "all",
    R = Number(H.value),
    w = Number(W.value),
    C = !0,
    S = !0;
  const O = {
    noise: {
      index: "01",
      name: "NOISE TERRAIN",
      short: "Noise",
      kicker: "POSITIVE AMPLITUDE / UNGOVERNED TRANSFORMATION",
      description:
        "Accumulated variation rises above the neutral plane. Greater amplitude means greater loudness, not necessarily greater binding signal.",
      equation: "Znoise(x, y) ≥ 0",
    },
    cone: {
      index: "02",
      name: "LITERAL BINDING CONE",
      short: "Cone",
      kicker: "LINEAR RADIAL CONSTRAINT",
      description:
        "Binding depth increases linearly toward the center. The sharp profile makes the negative axis unmistakable, but the point is geometric—not a destination or an attractor.",
      equation: "Zbind(r) = −D · max(0, 1 − r/R)",
    },
    bowl: {
      index: "03",
      name: "SMOOTH BINDING BOWL",
      short: "Bowl",
      kicker: "CONTINUOUS RADIAL CONSTRAINT",
      description:
        "A parabolic profile softens the center while preserving the same rim, semantic coordinates, and maximum binding depth as the literal cone.",
      equation: "Zbind(r) = −D · [1 − (r/R)²]",
    },
    gaussian: {
      index: "04",
      name: "GAUSSIAN BINDING WELL",
      short: "Gaussian",
      kicker: "LOCALIZED BINDING POTENTIAL",
      description:
        "A Gaussian profile concentrates the deepest constraint near the center and flattens toward the governed radius. It tests whether locality reads more clearly than a full bowl.",
      equation: "Zbind(r) = −D · normalized exp(−r²/2σ²)",
    },
  };
  let m;
  try {
    m = new _e({ antialias: !0, powerPreference: "high-performance" });
  } catch {
    (_.textContent = "WEBGL UNAVAILABLE"),
      (ne.innerHTML =
        '<p class="latent-fallback">This comparison needs a WebGL-capable browser.</p>');
    return;
  }
  m.setPixelRatio(Math.min(devicePixelRatio, 1.5)),
    (m.outputColorSpace = fe),
    (m.toneMapping = He),
    (m.toneMappingExposure = 1.08),
    ne.appendChild(m.domElement),
    m.domElement.setAttribute(
      "aria-label",
      "Orbitable three-dimensional latent geometry comparison",
    ),
    m.domElement.setAttribute("role", "img");
  const M = new We();
  (M.background = new A(595740)), (M.fog = new Ze(595740, 0.005));
  const L = new je(42, 1, 0.1, 180),
    I = new $e(L, m.domElement);
  (I.enableDamping = !1),
    (I.enablePan = !0),
    (I.minDistance = 8),
    (I.maxDistance = 85),
    (I.maxPolarAngle = Math.PI * 0.49),
    I.addEventListener("change", x),
    M.add(new Ye(12183260, 1450028, 1.55));
  const ae = new he(16766881, 2.25);
  ae.position.set(-9, 18, 12), M.add(ae);
  const ce = new he(7974632, 1.1);
  ce.position.set(14, 5, -12), M.add(ce);
  const P = new we(70, 35, 3232089, 2177086);
  (P.position.y = -7.4),
    (P.material.transparent = !0),
    (P.material.opacity = 0.16),
    M.add(P);
  const Ae = {
    noise: new u(-5.1, 0, 5.1),
    cone: new u(5.1, 0, 5.1),
    bowl: new u(-5.1, 0, -5.1),
    gaussian: new u(5.1, 0, -5.1),
  };
  for (const e of Object.keys(O)) {
    const o = new U();
    o.position.copy(Ae[e]), M.add(o);
    const t = new Ke({
        vertexColors: !0,
        roughness: 0.7,
        metalness: 0.06,
        side: ge,
      }),
      n = new be({
        color: e === "noise" ? 15773816 : 16308632,
        wireframe: !0,
        transparent: !0,
        opacity: 0.055,
        depthWrite: !1,
      }),
      s = new ee(new v(), t),
      i = new ee(s.geometry, n);
    o.add(s, i);
    const c = ve(e === "noise");
    o.add(c);
    const r = new U();
    o.add(r);
    const a = Ce(e);
    o.add(a);
    const l = e === "noise" ? Se() : Le(h);
    o.add(l);
    const d = document.createElement("div");
    (d.className = "latent-model-label"),
      (d.innerHTML = `<span>${O[e].index}</span><b>${O[e].name}</b>`),
      ye.appendChild(d),
      (b[e] = {
        group: o,
        surface: s,
        wire: i,
        zeroGroup: c,
        contours: r,
        axis: a,
        rim: l,
        label: d,
      });
  }
  function ve(e) {
    const o = new U(),
      t = e ? new Xe(E, E) : new Je(h, 96),
      n = new ee(
        t,
        new be({
          color: 6540219,
          transparent: !0,
          opacity: 0.035,
          side: ge,
          depthWrite: !1,
        }),
      );
    (n.rotation.x = -Math.PI / 2), (n.position.y = -0.025), o.add(n);
    const s = new we(E, 8, 7518642, 4547434);
    return (
      (s.material.transparent = !0), (s.material.opacity = 0.22), o.add(s), o
    );
  }
  function Se() {
    const e = E / 2,
      o = [
        new u(-e, 0.012, -e),
        new u(e, 0.012, -e),
        new u(e, 0.012, e),
        new u(-e, 0.012, e),
      ];
    return new te(
      new v().setFromPoints(o),
      new D({ color: 7508367, transparent: !0, opacity: 0.48 }),
    );
  }
  function Le(e) {
    const o = [];
    for (let t = 0; t < 128; t++) {
      const n = (t / 128) * $;
      o.push(new u(Math.cos(n) * e, 0.018, Math.sin(n) * e));
    }
    return new te(
      new v().setFromPoints(o),
      new D({ color: 14989672, transparent: !0, opacity: 0.66 }),
    );
  }
  function Y(e, o = "#9ab7b5") {
    const t = document.createElement("canvas");
    (t.width = 256), (t.height = 64);
    const n = t.getContext("2d");
    n.clearRect(0, 0, 256, 64),
      (n.fillStyle = o),
      (n.font = "28px monospace"),
      (n.textAlign = "center"),
      (n.textBaseline = "middle"),
      n.fillText(e, 128, 32);
    const s = new Qe(t);
    s.colorSpace = fe;
    const i = new et(new tt({ map: s, transparent: !0, depthTest: !1 }));
    return i.scale.set(1.7, 0.425, 1), i;
  }
  function Ce(e) {
    const o = new U(),
      t = -4.45,
      n = -4.45,
      s = new xe(
        new v().setFromPoints([new u(t, -7, n), new u(t, 3.3, n)]),
        new D({ color: 6587007, transparent: !0, opacity: 0.55 }),
      );
    o.add(s);
    for (const a of [-7, 0, 3]) {
      const l = new xe(
        new v().setFromPoints([new u(t - 0.12, a, n), new u(t + 0.12, a, n)]),
        new D({ color: 9282977, transparent: !0, opacity: 0.7 }),
      );
      o.add(l);
    }
    const i = Y("0  NEUTRAL", "#83cfc3");
    i.position.set(t, 0, n - 0.55), i.scale.set(2.25, 0.56, 1), o.add(i);
    const c = Y(e === "noise" ? "+ NOISE" : "+Z", "#df9b76");
    c.position.set(t, 3.35, n), o.add(c);
    const r = Y(e === "noise" ? "−Z" : "− BINDING", "#b39ad9");
    return r.position.set(t, -7, n), r.scale.set(2.1, 0.52, 1), o.add(r), o;
  }
  function z(e, o) {
    let t = Math.imul(e, 374761393) + Math.imul(o, 668265263) + Ie;
    return (
      (t = Math.imul(t ^ (t >>> 13), 1274126177)),
      ((t ^ (t >>> 16)) >>> 0) / 4294967295
    );
  }
  function le(e) {
    return e * e * (3 - 2 * e);
  }
  function Ne(e, o) {
    const t = Math.floor(e),
      n = Math.floor(o),
      s = le(e - t),
      i = le(o - n),
      c = z(t, n),
      r = z(t + 1, n),
      a = z(t, n + 1),
      l = z(t + 1, n + 1);
    return G.lerp(G.lerp(c, r, s), G.lerp(a, l, s), i);
  }
  function Be(e, o) {
    let t = 0,
      n = 0.55,
      s = 0.48,
      i = 0;
    for (let r = 0; r < 5; r++)
      (t += Ne(e * s + 17.2, o * s - 8.6) * n),
        (i += n),
        (n *= 0.5),
        (s *= 2.07);
    const c = t / i;
    return 0.06 + R * (0.12 + Math.pow(c, 1.35) * 1.38);
  }
  function de(e, o) {
    const t = Math.min(o / h, 1);
    if (e === "cone") return -w * (1 - t);
    if (e === "bowl") return -w * (1 - t * t);
    const n = 1.5,
      s = Math.exp(-16 / (2 * n * n)),
      i = Math.exp(-(o * o) / (2 * n * n));
    return (-w * (i - s)) / (1 - s);
  }
  const Re = new A(2178632),
    ue = new A(4426365),
    Oe = new A(15240040),
    Te = new A(15778926),
    pe = new A(12937330),
    ke = new A(5260406),
    F = new A();
  function K(e, o) {
    if (e === "noise") {
      const n = G.clamp(o / Math.max(R * 1.25, 0.01), 0, 1);
      return n < 0.55
        ? F.copy(Re).lerp(ue, n / 0.55)
        : F.copy(ue).lerp(Oe, (n - 0.55) / 0.45);
    }
    const t = G.clamp(-o / w, 0, 1);
    return t < 0.52
      ? F.copy(Te).lerp(pe, t / 0.52)
      : F.copy(pe).lerp(ke, (t - 0.52) / 0.48);
  }
  function De(e) {
    const n = [0, -w, 0],
      s = K(e, -w),
      i = [s.r, s.g, s.b],
      c = [];
    for (let a = 1; a <= 48; a++) {
      const l = (h * a) / 48;
      for (let d = 0; d < 96; d++) {
        const p = (d / 96) * $,
          f = Math.cos(p) * l,
          T = Math.sin(p) * l,
          k = de(e, l);
        n.push(f, k, T);
        const N = K(e, k);
        i.push(N.r, N.g, N.b);
      }
    }
    for (let a = 0; a < 96; a++) {
      const l = 1 + a,
        d = 1 + ((a + 1) % 96);
      c.push(0, d, l);
    }
    for (let a = 1; a < 48; a++) {
      const l = 1 + (a - 1) * 96,
        d = 1 + a * 96;
      for (let p = 0; p < 96; p++) {
        const f = (p + 1) % 96,
          T = l + p,
          k = l + f,
          N = d + p,
          Ve = d + f;
        c.push(T, k, N, k, Ve, N);
      }
    }
    const r = new v();
    return (
      r.setAttribute("position", new V(n, 3)),
      r.setAttribute("color", new V(i, 3)),
      r.setIndex(c),
      r.computeVertexNormals(),
      r.computeBoundingSphere(),
      r
    );
  }
  function Ge(e) {
    if (e !== "noise") return De(e);
    const o = [],
      t = [],
      n = [],
      s = e !== "noise";
    for (let c = 0; c <= g; c++) {
      const r = -h + (c / g) * E;
      for (let a = 0; a <= g; a++) {
        const l = -h + (a / g) * E,
          d = Math.hypot(l, r),
          p = s ? de(e, d) : Be(l, r);
        o.push(l, p, r);
        const f = K(e, p);
        t.push(f.r, f.g, f.b);
      }
    }
    for (let c = 0; c < g; c++)
      for (let r = 0; r < g; r++) {
        const a = -h + ((r + 0.5) / g) * E,
          l = -h + ((c + 0.5) / g) * E;
        if (s && Math.hypot(a, l) > h) continue;
        const d = c * (g + 1) + r,
          p = d + 1,
          f = d + g + 1,
          T = f + 1;
        n.push(d, f, p, p, f, T);
      }
    const i = new v();
    return (
      i.setAttribute("position", new V(o, 3)),
      i.setAttribute("color", new V(t, 3)),
      i.setIndex(n),
      i.computeVertexNormals(),
      i.computeBoundingSphere(),
      i
    );
  }
  function Pe(e) {
    for (const o of [...e.children])
      o.geometry.dispose(), o.material.dispose(), e.remove(o);
  }
  function ze(e, o) {
    const t = o / w;
    if (e === "cone") return h * (1 - t);
    if (e === "bowl") return h * Math.sqrt(Math.max(0, 1 - t));
    const n = 1.5,
      s = Math.exp(-16 / (2 * n * n)),
      i = t * (1 - s) + s;
    return Math.sqrt(-2 * n * n * Math.log(i));
  }
  function Fe(e) {
    const o = b[e].contours;
    if ((Pe(o), e !== "noise")) {
      for (const t of [0.25, 0.5, 0.75]) {
        const n = w * t,
          s = ze(e, n),
          i = [];
        for (let r = 0; r < 128; r++) {
          const a = (r / 128) * $;
          i.push(new u(Math.cos(a) * s, -n + 0.025, Math.sin(a) * s));
        }
        const c = new te(
          new v().setFromPoints(i),
          new D({
            color: 16045466,
            transparent: !0,
            opacity: 0.35,
            depthWrite: !1,
          }),
        );
        o.add(c);
      }
      o.visible = S;
    }
  }
  function X(e) {
    const o = b[e],
      t = o.surface.geometry,
      n = Ge(e);
    (o.surface.geometry = n), (o.wire.geometry = n), t.dispose(), Fe(e);
  }
  for (const e of Object.keys(b)) X(e);
  function qe() {
    const e = y.clientWidth,
      o = y.clientHeight;
    for (const [t, n] of Object.entries(b)) {
      if (!n.group.visible) {
        n.label.hidden = !0;
        continue;
      }
      n.label.hidden = !1;
      const s = n.group.position
        .clone()
        .add(new u(0, t === "noise" ? 3.25 : 1.1, 0));
      s.project(L);
      const i = (s.x * 0.5 + 0.5) * e,
        c = (-s.y * 0.5 + 0.5) * o;
      n.label.style.transform = `translate(-50%, -50%) translate(${i.toFixed(1)}px, ${c.toFixed(1)}px)`;
    }
  }
  function x() {
    m.render(M, L),
      qe(),
      (window.__LATENT_METRICS__ = {
        view: B,
        drawCalls: m.info.render.calls,
        triangles: m.info.render.triangles,
        noiseAmplitude: R,
        bindingDepth: w,
        showPlane: C,
        showContours: S,
      });
  }
  function J() {
    const e = B === "all",
      o = e
        ? new u(0, -1.15, 0)
        : b[B].group.position
            .clone()
            .add(new u(0, B === "noise" ? 0.6 : -1.45, 0)),
      t = Math.max(y.clientWidth / Math.max(y.clientHeight, 1), 0.35),
      n = e ? Math.max(1, 1.22 / t) : Math.max(1, 0.88 / t),
      s = e ? new u(15.5, 16.5, 21.5) : new u(9.2, 8.2, 12.4);
    s.multiplyScalar(n),
      I.target.copy(o),
      L.position.copy(o).add(s),
      L.lookAt(o),
      I.update();
  }
  function Q(e, o = !0) {
    B = e;
    for (const [t, n] of Object.entries(b))
      n.group.visible = e === "all" || t === e;
    for (const t of re) {
      const n = t.dataset.latentView === e;
      t.classList.toggle("active", n),
        t.setAttribute("aria-pressed", String(n));
    }
    if (((y.dataset.view = e), e === "all"))
      (_.textContent = "ALL SURFACES · SHARED X/Y · Z = 0"),
        (ie.textContent = "COMPARISON / FOUR PARAMETRIC SURFACES"),
        (oe.textContent =
          "One positive terrain and three negative binding geometries share the same semantic reference plane. Compare their profiles directly; no temporal morph or trajectory is implied."),
        (se.textContent =
          "+Z : noise amplitude   |   0 : neutral   |   −Z : binding depth");
    else {
      const t = O[e];
      (_.textContent = `${t.name} · SOLO VIEW`),
        (ie.textContent = `${t.index} / ${t.kicker}`),
        (oe.textContent = t.description),
        (se.textContent = t.equation);
    }
    o && J(), x();
  }
  function me() {
    const e = y.clientWidth,
      o = y.clientHeight;
    m.setSize(e, o, !1),
      (L.aspect = e / Math.max(o, 1)),
      L.updateProjectionMatrix(),
      J(),
      x();
  }
  for (const e of re)
    e.addEventListener("click", () => Q(e.dataset.latentView));
  H.addEventListener("input", () => {
    (R = Number(H.value)), (Ee.value = R.toFixed(1)), X("noise"), x();
  }),
    W.addEventListener("input", () => {
      (w = Number(W.value)), (Me.value = `−${w.toFixed(1)}`);
      for (const e of ["cone", "bowl", "gaussian"]) X(e);
      x();
    }),
    Z.addEventListener("click", () => {
      (C = !C),
        Z.setAttribute("aria-pressed", String(C)),
        Z.classList.toggle("active", C);
      for (const e of Object.values(b)) e.zeroGroup.visible = C;
      x();
    }),
    j.addEventListener("click", () => {
      (S = !S),
        j.setAttribute("aria-pressed", String(S)),
        j.classList.toggle("active", S);
      for (const e of ["cone", "bowl", "gaussian"]) b[e].contours.visible = S;
      x();
    }),
    document.getElementById("latent-reset").addEventListener("click", () => {
      J(), x();
    }),
    new ResizeObserver(me).observe(y),
    (window.__latentView = (e) => Q(e)),
    (window.__latentDraw = x);
  const q = new URLSearchParams(location.search).get("latent"),
    Ue = q && (q === "all" || O[q]) ? q : "all";
  Q(Ue, !1), me(), (window.__LATENT_READY__ = !0);
}
