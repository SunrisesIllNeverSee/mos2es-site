import {
  W as xe,
  C as re,
  P as be,
  A as ve,
  S as Se,
  a as Pe,
  F as Ee,
  b as _e,
  O as Ie,
  H as Ce,
  D as ie,
  M as h,
  c as Ae,
  d as A,
  G as ce,
  e as de,
  I as Re,
  f as Ge,
  B as O,
  g as q,
  L as ke,
  h as ze,
  i as Be,
  j as Le,
  k as R,
  T as le,
  l as De,
  m as Te,
  n as ue,
  o as pe,
  p as Fe,
  V as me,
} from "./OrbitControls-NL7GUOCB.js";
/* empty css              */ const Ne = 20261101;
function We(c) {
  return function () {
    c = (c + 1831565813) | 0;
    let a = Math.imul(c ^ (c >>> 15), 1 | c);
    return (
      (a = (a + Math.imul(a ^ (a >>> 7), 61 | a)) ^ a),
      ((a ^ (a >>> 14)) >>> 0) / 4294967296
    );
  };
}
const f = We(Ne),
  x = document.getElementById("scene-container");
let s;
try {
  s = new xe({
    antialias: !0,
    preserveDrawingBuffer: !1,
    powerPreference: "high-performance",
  });
} catch {
  (x.style.display = "none"),
    (window.__SCENE_READY__ = !0),
    (window.__seek = () => {}),
    (window.__play = () => {});
}
if (s) {
  let ye = function (t, e) {
      const n = t === "governed",
        o = e * Math.PI * 3.6 + (n ? 0.4 : 2.1),
        p = n
          ? 2.7 - 1.65 * e + 0.1 * Math.sin(e * Math.PI * 4)
          : 2.25 + 3.65 * e;
      return new me(
        Math.cos(o) * p + (n ? 0 : 0.35 * e),
        2.15 - 4.1 * e + 0.24 * Math.sin(o * 1.5),
        Math.sin(o) * p,
      );
    },
    L = function () {
      for (const e of ["governed", "ungoverned"]) {
        const n = u === "compare" || u === e;
        (B[e].tube.visible = n),
          (y[e].visible = n),
          y[e].position.copy(B[e].curve.getPoint(_ / 10));
      }
      const t = u === "ungoverned" ? 14973799 : 6540219;
      $.color.setHex(t),
        X.material.color.setHex(u === "ungoverned" ? 14973799 : 10799556),
        (E.material.opacity = u === "governed" ? 0.2 : 0.46),
        (document.getElementById("scene-shell").dataset.regime = u),
        (document.getElementById("scene-state").textContent =
          `${u.toUpperCase()} · RECURSION ${_}/10`);
    },
    D = function (t) {
      const e = ((((t % I) + I) % I) / I) * Math.PI * 2;
      (w.rotation.y = 0.13 * Math.sin(e)),
        (w.position.y = 0.07 * (1 - Math.cos(e))),
        (P.rotation.y = 0.045 * Math.sin(e)),
        (E.rotation.y = e),
        (E.rotation.x = 0.035 * Math.sin(e));
      const n = 1 + 0.07 * (1 - Math.cos(e * 3));
      y.governed.scale.setScalar(n), y.ungoverned.scale.setScalar(n);
    },
    N = function () {
      const t = Math.max(1, x.clientWidth),
        e = Math.max(1, x.clientHeight);
      (g.aspect = t / e), g.updateProjectionMatrix(), s.setSize(t, e, !1);
    },
    m = function () {
      l.update(),
        s.render(a, g),
        (F = !1),
        (window.__ATLAS_METRICS__ = {
          drawCalls: s.info.render.calls,
          triangles: s.info.render.triangles,
          pixelRatio: s.getPixelRatio(),
        });
    },
    ae = function () {
      W.setAttribute("aria-pressed", String(i)),
        W.setAttribute(
          "aria-label",
          i ? "Play ambient motion" : "Pause ambient motion",
        );
    };
  const c = new re(661533);
  s.setPixelRatio(Math.min(devicePixelRatio, 1.5)),
    (s.shadowMap.enabled = !0),
    (s.shadowMap.type = be),
    (s.toneMapping = ve),
    (s.toneMappingExposure = 1.05),
    (s.outputColorSpace = Se),
    x.appendChild(s.domElement);
  const a = new Pe();
  (a.background = c), (a.fog = new Ee(c, 22, 72));
  const g = new _e(44, 1, 0.1, 180);
  g.position.set(10.5, 6.8, 13.5);
  const l = new Ie(g, s.domElement);
  l.target.set(0, 0.2, 0),
    (l.enableDamping = !0),
    (l.dampingFactor = 0.07),
    (l.minDistance = 8),
    (l.maxDistance = 28),
    (l.maxPolarAngle = Math.PI * 0.76),
    a.add(new Ce(12183007, 1450794, 1.25));
  const d = new ie(16769968, 2.35);
  d.position.set(8, 13, 9),
    (d.castShadow = !0),
    d.shadow.mapSize.set(1024, 1024),
    (d.shadow.camera.left = -8),
    (d.shadow.camera.right = 8),
    (d.shadow.camera.top = 8),
    (d.shadow.camera.bottom = -8),
    (d.shadow.normalBias = 0.025),
    a.add(d);
  const H = new ie(7711177, 0.85);
  H.position.set(-10, 3, -8), a.add(H);
  const G = new h(
    new Ae(160, 64).rotateX(-Math.PI / 2),
    new A({ color: 728097, roughness: 1, metalness: 0 }),
  );
  (G.position.y = -4.4), (G.receiveShadow = !0), a.add(G);
  const w = new ce(),
    he = new de(0.105, 12, 10),
    we = new A({
      color: 16777215,
      roughness: 0.32,
      metalness: 0.25,
      emissive: 2825736,
      emissiveIntensity: 0.28,
    }),
    fe = 27,
    b = new Re(he, we, fe),
    U = new Ge(),
    Y = new re(),
    v = [],
    k = 0.78,
    S = (t, e, n) => new me(t * k, e * k, n * k);
  let z = 0;
  for (let t = -1; t <= 1; t++)
    for (let e = -1; e <= 1; e++)
      for (let n = -1; n <= 1; n++) {
        const o = S(t, e, n);
        U.makeTranslation(o.x, o.y, o.z), b.setMatrixAt(z, U);
        const p = (t + 2 * e + 3 * n + 12) % 5;
        if (
          (Y.set(p === 0 ? 6609093 : p === 1 ? 11117784 : 15709023),
          b.setColorAt(z, Y),
          z++,
          t < 1)
        ) {
          const r = S(t + 1, e, n);
          v.push(o.x, o.y, o.z, r.x, r.y, r.z);
        }
        if (e < 1) {
          const r = S(t, e + 1, n);
          v.push(o.x, o.y, o.z, r.x, r.y, r.z);
        }
        if (n < 1) {
          const r = S(t, e, n + 1);
          v.push(o.x, o.y, o.z, r.x, r.y, r.z);
        }
      }
  (b.castShadow = !0), w.add(b);
  const j = new O();
  j.setAttribute("position", new q(v, 3));
  const ge = new ke(
    j,
    new ze({ color: 14209208, transparent: !0, opacity: 0.52 }),
  );
  w.add(ge), a.add(w);
  const V = new h(
    new Be(0.34, 1),
    new A({
      color: 15840608,
      emissive: 10905373,
      emissiveIntensity: 0.65,
      roughness: 0.28,
      metalness: 0.35,
    }),
  );
  (V.castShadow = !0), w.add(V);
  const P = new ce(),
    X = new h(
      new Le(3.2, 2),
      new R({
        color: 10799556,
        wireframe: !0,
        transparent: !0,
        opacity: 0.105,
        depthWrite: !1,
      }),
    );
  P.add(X);
  const $ = new R({
    color: 6540219,
    transparent: !0,
    opacity: 0.22,
    depthWrite: !1,
  });
  for (let t = 0; t < 3; t++) {
    const e = new h(new le(3.22, 0.009, 4, 160), $);
    e.rotation.set(
      (Math.PI / 2) * (t === 0 ? 1 : 0.5),
      (t * Math.PI) / 3,
      (t * Math.PI) / 4,
    ),
      P.add(e);
  }
  a.add(P);
  const B = {},
    y = {};
  for (const t of ["governed", "ungoverned"]) {
    const e = Array.from({ length: 81 }, (Oe, Me) => ye(t, Me / 80)),
      n = new De(e),
      o = t === "governed" ? 6674116 : 14973799,
      p = new h(
        new Te(n, 120, 0.026, 6, !1),
        new R({ color: o, transparent: !0, opacity: 0.85 }),
      );
    a.add(p), (B[t] = { curve: n, tube: p });
    const r = new h(
      new de(0.145, 18, 14),
      new A({
        color: o,
        emissive: o,
        emissiveIntensity: 0.48,
        roughness: 0.25,
      }),
    );
    a.add(r), (y[t] = r);
  }
  const K = [];
  for (let t = 0; t < 340; t++) {
    const e = f() * Math.PI * 2,
      n = Math.acos(2 * f() - 1),
      o = 3.65 + f() * 2.8;
    K.push(
      o * Math.sin(n) * Math.cos(e),
      o * Math.cos(n) * 0.72,
      o * Math.sin(n) * Math.sin(e),
    );
  }
  const J = new O();
  J.setAttribute("position", new q(K, 3));
  const E = new ue(
    J,
    new pe({
      color: 9352884,
      size: 0.028,
      transparent: !0,
      opacity: 0.46,
      sizeAttenuation: !0,
      depthWrite: !1,
    }),
  );
  a.add(E);
  const Q = [];
  for (let t = 0; t < 100; t++) {
    const e = f() * Math.PI * 2,
      n = 15 + f() * 35;
    Q.push(Math.cos(e) * n, -3 + f() * 18, Math.sin(e) * n);
  }
  const Z = new O();
  Z.setAttribute("position", new q(Q, 3)),
    a.add(
      new ue(
        Z,
        new pe({ color: 3233629, size: 0.07, transparent: !0, opacity: 0.5 }),
      ),
    );
  const ee = new h(
    new le(4.5, 0.018, 5, 180).rotateX(Math.PI / 2),
    new R({ color: 2639692, transparent: !0, opacity: 0.55 }),
  );
  (ee.position.y = -4.32), a.add(ee);
  let u = "compare",
    _ = 6;
  document.querySelectorAll("[data-mode]").forEach((t) => {
    t.addEventListener("click", () => {
      (u = t.dataset.mode),
        document.querySelectorAll("[data-mode]").forEach((e) => {
          const n = e === t;
          e.classList.toggle("active", n),
            e.setAttribute("aria-pressed", String(n));
        }),
        L(),
        m();
    });
  });
  const te = document.getElementById("depth");
  te.addEventListener("input", () => {
    (_ = Number(te.value)),
      (document.getElementById("depth-output").textContent = String(_)),
      L(),
      m();
  });
  const I = 12,
    ne = new Fe(),
    T = 1 / 60;
  let C = 0,
    M = 0,
    F = !0,
    oe = 0,
    i = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  l.addEventListener("change", () => {
    F = !0;
  }),
    s.setAnimationLoop((t) => {
      const e = Math.min(ne.getDelta(), 0.1);
      if (!i) {
        for (C += e; C >= T; ) (C -= T), (M += T);
        D(M);
      }
      ((!i && t - oe >= 33) || (i && F)) && (m(), (oe = t));
    }),
    (window.__seek = (t) => {
      const e = Number(t);
      (i = !0), (C = 0), (M = Number.isFinite(e) && e > 0 ? e : 0), D(M), m();
    }),
    (window.__play = () => {
      (i = !1), ne.getDelta();
    });
  const W = document.getElementById("motion-toggle");
  W.addEventListener("click", () => {
    i ? window.__play() : (i = !0), ae();
  }),
    ae(),
    new ResizeObserver(() => {
      N(), i && m();
    }).observe(x),
    addEventListener("resize", () => {
      N(), i && m();
    }),
    N(),
    L(),
    D(M),
    m();
  const se = new URLSearchParams(location.search).get("t");
  se !== null && window.__seek(se), (window.__SCENE_READY__ = !0);
}
