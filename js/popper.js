/**
 * Bundled by jsDelivr using Rollup v2.79.1 and Terser v5.19.2.
 * Original file: /npm/@floating-ui/dom@1.5.4/dist/floating-ui.dom.mjs
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
import {
  autoPlacement as t,
  shift as e,
  flip as n,
  size as i,
  hide as o,
  arrow as r,
  inline as s,
  limitShift as l,
  computePosition as c,
  rectToClientRect as f,
} from "/npm/@floating-ui/core@1.5.3/+esm";
export { detectOverflow, offset } from "/npm/@floating-ui/core@1.5.3/+esm";
import {
  createCoords as u,
  round as h,
  max as a,
  min as d,
  floor as p,
} from "/npm/@floating-ui/utils@0.2.0/+esm";
import {
  getDocumentElement as g,
  isElement as m,
  getOverflowAncestors as x,
  isHTMLElement as y,
  getWindow as w,
  getComputedStyle as v,
  getNodeName as b,
  isOverflowElement as L,
  getNodeScroll as R,
  isTableElement as T,
  isContainingBlock as E,
  getContainingBlock as F,
  isWebKit as O,
  getParentNode as W,
  isLastTraversableNode as H,
} from "/npm/@floating-ui/utils@0.2.0/dom/+esm";
export { getOverflowAncestors } from "/npm/@floating-ui/utils@0.2.0/dom/+esm";
function z(t) {
  const e = v(t);
  let n = parseFloat(e.width) || 0,
    i = parseFloat(e.height) || 0;
  const o = y(t),
    r = o ? t.offsetWidth : n,
    s = o ? t.offsetHeight : i,
    l = h(n) !== r || h(i) !== s;
  return l && ((n = r), (i = s)), { width: n, height: i, $: l };
}
function A(t) {
  return m(t) ? t : t.contextElement;
}
function C(t) {
  const e = A(t);
  if (!y(e)) return u(1);
  const n = e.getBoundingClientRect(),
    { width: i, height: o, $: r } = z(e);
  let s = (r ? h(n.width) : n.width) / i,
    l = (r ? h(n.height) : n.height) / o;
  return (
    (s && Number.isFinite(s)) || (s = 1),
    (l && Number.isFinite(l)) || (l = 1),
    { x: s, y: l }
  );
}
const P = u(0);
function B(t) {
  const e = w(t);
  return O() && e.visualViewport
    ? { x: e.visualViewport.offsetLeft, y: e.visualViewport.offsetTop }
    : P;
}
function D(t, e, n, i) {
  void 0 === e && (e = !1), void 0 === n && (n = !1);
  const o = t.getBoundingClientRect(),
    r = A(t);
  let s = u(1);
  e && (i ? m(i) && (s = C(i)) : (s = C(t)));
  const l = (function (t, e, n) {
    return void 0 === e && (e = !1), !(!n || (e && n !== w(t))) && e;
  })(r, n, i)
    ? B(r)
    : u(0);
  let c = (o.left + l.x) / s.x,
    h = (o.top + l.y) / s.y,
    a = o.width / s.x,
    d = o.height / s.y;
  if (r) {
    const t = w(r),
      e = i && m(i) ? w(i) : i;
    let n = t.frameElement;
    for (; n && i && e !== t; ) {
      const t = C(n),
        e = n.getBoundingClientRect(),
        i = v(n),
        o = e.left + (n.clientLeft + parseFloat(i.paddingLeft)) * t.x,
        r = e.top + (n.clientTop + parseFloat(i.paddingTop)) * t.y;
      (c *= t.x),
        (h *= t.y),
        (a *= t.x),
        (d *= t.y),
        (c += o),
        (h += r),
        (n = w(n).frameElement);
    }
  }
  return f({ width: a, height: d, x: c, y: h });
}
function V(t) {
  return D(g(t)).left + R(t).scrollLeft;
}
function S(t, e, n) {
  let i;
  if ("viewport" === e)
    i = (function (t, e) {
      const n = w(t),
        i = g(t),
        o = n.visualViewport;
      let r = i.clientWidth,
        s = i.clientHeight,
        l = 0,
        c = 0;
      if (o) {
        (r = o.width), (s = o.height);
        const t = O();
        (!t || (t && "fixed" === e)) && ((l = o.offsetLeft), (c = o.offsetTop));
      }
      return { width: r, height: s, x: l, y: c };
    })(t, n);
  else if ("document" === e)
    i = (function (t) {
      const e = g(t),
        n = R(t),
        i = t.ownerDocument.body,
        o = a(e.scrollWidth, e.clientWidth, i.scrollWidth, i.clientWidth),
        r = a(e.scrollHeight, e.clientHeight, i.scrollHeight, i.clientHeight);
      let s = -n.scrollLeft + V(t);
      const l = -n.scrollTop;
      return (
        "rtl" === v(i).direction && (s += a(e.clientWidth, i.clientWidth) - o),
        { width: o, height: r, x: s, y: l }
      );
    })(g(t));
  else if (m(e))
    i = (function (t, e) {
      const n = D(t, !0, "fixed" === e),
        i = n.top + t.clientTop,
        o = n.left + t.clientLeft,
        r = y(t) ? C(t) : u(1);
      return {
        width: t.clientWidth * r.x,
        height: t.clientHeight * r.y,
        x: o * r.x,
        y: i * r.y,
      };
    })(e, n);
  else {
    const n = B(t);
    i = { ...e, x: e.x - n.x, y: e.y - n.y };
  }
  return f(i);
}
function I(t, e) {
  const n = W(t);
  return !(n === e || !m(n) || H(n)) && ("fixed" === v(n).position || I(n, e));
}
function q(t, e, n) {
  const i = y(e),
    o = g(e),
    r = "fixed" === n,
    s = D(t, !0, r, e);
  let l = { scrollLeft: 0, scrollTop: 0 };
  const c = u(0);
  if (i || (!i && !r))
    if ((("body" !== b(e) || L(o)) && (l = R(e)), i)) {
      const t = D(e, !0, r, e);
      (c.x = t.x + e.clientLeft), (c.y = t.y + e.clientTop);
    } else o && (c.x = V(o));
  return {
    x: s.left + l.scrollLeft - c.x,
    y: s.top + l.scrollTop - c.y,
    width: s.width,
    height: s.height,
  };
}
function M(t, e) {
  return y(t) && "fixed" !== v(t).position ? (e ? e(t) : t.offsetParent) : null;
}
function N(t, e) {
  const n = w(t);
  if (!y(t)) return n;
  let i = M(t, e);
  for (; i && T(i) && "static" === v(i).position; ) i = M(i, e);
  return i &&
    ("html" === b(i) ||
      ("body" === b(i) && "static" === v(i).position && !E(i)))
    ? n
    : i || F(t) || n;
}
const $ = {
  convertOffsetParentRelativeRectToViewportRelativeRect: function (t) {
    let { rect: e, offsetParent: n, strategy: i } = t;
    const o = y(n),
      r = g(n);
    if (n === r) return e;
    let s = { scrollLeft: 0, scrollTop: 0 },
      l = u(1);
    const c = u(0);
    if (
      (o || (!o && "fixed" !== i)) &&
      (("body" !== b(n) || L(r)) && (s = R(n)), y(n))
    ) {
      const t = D(n);
      (l = C(n)), (c.x = t.x + n.clientLeft), (c.y = t.y + n.clientTop);
    }
    return {
      width: e.width * l.x,
      height: e.height * l.y,
      x: e.x * l.x - s.scrollLeft * l.x + c.x,
      y: e.y * l.y - s.scrollTop * l.y + c.y,
    };
  },
  getDocumentElement: g,
  getClippingRect: function (t) {
    let { element: e, boundary: n, rootBoundary: i, strategy: o } = t;
    const r = [
        ...("clippingAncestors" === n
          ? (function (t, e) {
              const n = e.get(t);
              if (n) return n;
              let i = x(t, [], !1).filter((t) => m(t) && "body" !== b(t)),
                o = null;
              const r = "fixed" === v(t).position;
              let s = r ? W(t) : t;
              for (; m(s) && !H(s); ) {
                const e = v(s),
                  n = E(s);
                n || "fixed" !== e.position || (o = null),
                  (
                    r
                      ? !n && !o
                      : (!n &&
                          "static" === e.position &&
                          o &&
                          ["absolute", "fixed"].includes(o.position)) ||
                        (L(s) && !n && I(t, s))
                  )
                    ? (i = i.filter((t) => t !== s))
                    : (o = e),
                  (s = W(s));
              }
              return e.set(t, i), i;
            })(e, this._c)
          : [].concat(n)),
        i,
      ],
      s = r[0],
      l = r.reduce((t, n) => {
        const i = S(e, n, o);
        return (
          (t.top = a(i.top, t.top)),
          (t.right = d(i.right, t.right)),
          (t.bottom = d(i.bottom, t.bottom)),
          (t.left = a(i.left, t.left)),
          t
        );
      }, S(e, s, o));
    return {
      width: l.right - l.left,
      height: l.bottom - l.top,
      x: l.left,
      y: l.top,
    };
  },
  getOffsetParent: N,
  getElementRects: async function (t) {
    let { reference: e, floating: n, strategy: i } = t;
    const o = this.getOffsetParent || N,
      r = this.getDimensions;
    return {
      reference: q(e, await o(n), i),
      floating: { x: 0, y: 0, ...(await r(n)) },
    };
  },
  getClientRects: function (t) {
    return Array.from(t.getClientRects());
  },
  getDimensions: function (t) {
    const { width: e, height: n } = z(t);
    return { width: e, height: n };
  },
  getScale: C,
  isElement: m,
  isRTL: function (t) {
    return "rtl" === v(t).direction;
  },
};
function _(t, e, n, i) {
  void 0 === i && (i = {});
  const {
      ancestorScroll: o = !0,
      ancestorResize: r = !0,
      elementResize: s = "function" == typeof ResizeObserver,
      layoutShift: l = "function" == typeof IntersectionObserver,
      animationFrame: c = !1,
    } = i,
    f = A(t),
    u = o || r ? [...(f ? x(f) : []), ...x(e)] : [];
  u.forEach((t) => {
    o && t.addEventListener("scroll", n, { passive: !0 }),
      r && t.addEventListener("resize", n);
  });
  const h =
    f && l
      ? (function (t, e) {
          let n,
            i = null;
          const o = g(t);
          function r() {
            clearTimeout(n), i && i.disconnect(), (i = null);
          }
          return (
            (function s(l, c) {
              void 0 === l && (l = !1), void 0 === c && (c = 1), r();
              const {
                left: f,
                top: u,
                width: h,
                height: g,
              } = t.getBoundingClientRect();
              if ((l || e(), !h || !g)) return;
              const m = {
                rootMargin:
                  -p(u) +
                  "px " +
                  -p(o.clientWidth - (f + h)) +
                  "px " +
                  -p(o.clientHeight - (u + g)) +
                  "px " +
                  -p(f) +
                  "px",
                threshold: a(0, d(1, c)) || 1,
              };
              let x = !0;
              function y(t) {
                const e = t[0].intersectionRatio;
                if (e !== c) {
                  if (!x) return s();
                  e
                    ? s(!1, e)
                    : (n = setTimeout(() => {
                        s(!1, 1e-7);
                      }, 100));
                }
                x = !1;
              }
              try {
                i = new IntersectionObserver(y, {
                  ...m,
                  root: o.ownerDocument,
                });
              } catch (t) {
                i = new IntersectionObserver(y, m);
              }
              i.observe(t);
            })(!0),
            r
          );
        })(f, n)
      : null;
  let m,
    y = -1,
    w = null;
  s &&
    ((w = new ResizeObserver((t) => {
      let [i] = t;
      i &&
        i.target === f &&
        w &&
        (w.unobserve(e),
        cancelAnimationFrame(y),
        (y = requestAnimationFrame(() => {
          w && w.observe(e);
        }))),
        n();
    })),
    f && !c && w.observe(f),
    w.observe(e));
  let v = c ? D(t) : null;
  return (
    c &&
      (function e() {
        const i = D(t);
        !v ||
          (i.x === v.x &&
            i.y === v.y &&
            i.width === v.width &&
            i.height === v.height) ||
          n();
        (v = i), (m = requestAnimationFrame(e));
      })(),
    n(),
    () => {
      u.forEach((t) => {
        o && t.removeEventListener("scroll", n),
          r && t.removeEventListener("resize", n);
      }),
        h && h(),
        w && w.disconnect(),
        (w = null),
        c && cancelAnimationFrame(m);
    }
  );
}
const j = t,
  k = e,
  G = n,
  J = i,
  K = o,
  Q = r,
  U = s,
  X = l,
  Y = (t, e, n) => {
    const i = new Map(),
      o = { platform: $, ...n },
      r = { ...o.platform, _c: i };
    return c(t, e, { ...o, platform: r });
  };
export {
  Q as arrow,
  j as autoPlacement,
  _ as autoUpdate,
  Y as computePosition,
  G as flip,
  K as hide,
  U as inline,
  X as limitShift,
  $ as platform,
  k as shift,
  J as size,
};
export default null;
//# sourceMappingURL=/sm/d0e7221f6e5a2cfa62154f31347694796c04f874a602a09381f619943216d1a3.map
