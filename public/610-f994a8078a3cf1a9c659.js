(self.webpackChunkmetamask_io = self.webpackChunkmetamask_io || []).push([
    [610], {
        45644: function(e, t, o) {
            const n = o(35311),
                {
                    calculateSizingOptions: r,
                    createLogoViewer: s,
                    loadModelFromJson: i,
                    createModelRenderer: a,
                    createNode: c,
                    setAttribute: f,
                    setGradientDefinitions: l,
                    setMaskDefinitions: d
                } = o(91329);
            e.exports = function(e = {}) {
                const t = e.cameraDistance || 400,
                    {
                        height: o,
                        width: p
                    } = r(e),
                    g = e.meshJson || n,
                    h = c("svg");
                f(h, "width", `${p}px`), f(h, "height", `${o}px`), document.body.appendChild(h), l(h, g.gradients), d({
                    container: h,
                    masks: g.masks,
                    height: o,
                    width: p
                });
                const u = i(g),
                    y = a(h, t, u);
                return s(h, ((e, t) => {
                    const o = h.getBoundingClientRect();
                    y(o, e, t)
                }), Object.assign({
                    cameraDistance: t
                }, e))
            }
        },
        91329: function(e, t, o) {
            const n = o(64345),
                r = o(29401),
                s = o(34727),
                i = o(64481),
                a = o(90397),
                c = o(91156),
                f = "http://www.w3.org/2000/svg";

            function l(e, t) {
                const o = t.positions;
                let n = 0;
                for (let r = 0; r < o.length; ++r) {
                    const t = o[r];
                    for (let o = 0; o < 3; ++o) e[n] = t[o], n += 1
                }
            }

            function d(e, t) {
                const o = [],
                    n = e.chunks.map(((n, r) => {
                        const {
                            faces: s
                        } = n;
                        return s.map((s => {
                            const i = new m(t(n, {
                                gradients: e.gradients,
                                index: r,
                                masks: e.masks
                            }), s);
                            return o.push(i), i
                        }))
                    }));
                return {
                    polygons: o,
                    polygonsByChunk: n
                }
            }

            function p(e, {
                gradients: t = {},
                index: o,
                masks: n
            }) {
                const r = y("polygon");
                if (e.gradient && e.color) throw new Error(`Both gradient and color for chunk '${o}'. These options are mutually exclusive.`);
                if (e.gradient) {
                    const o = e.gradient;
                    if (!t[o]) throw new Error(`Gradient ID not found: '${o}'`);
                    w(r, "fill", `url('#${o}')`), w(r, "stroke", `url('#${o}')`)
                } else {
                    const t = "string" == typeof e.color ? e.color : `rgb(${e.color})`;
                    w(r, "fill", t), w(r, "stroke", t)
                }
                if (e.mask) {
                    if (!n[e.mask]) throw new Error(`Mask ID not found: '${e.mask}'`);
                    w(r, "mask", `url('#${e.mask}')`)
                }
                return w(r, "points", "0,0, 10,0, 0,10"), r
            }

            function g(e) {
                const t = new Float32Array(3),
                    o = new Float32Array([0, 1, 0]),
                    f = new Float32Array(16),
                    l = new Float32Array(16),
                    d = s(new Float32Array(16), new Float32Array([0, 0, e]), t, o),
                    p = i(new Float32Array(16), d),
                    g = new Float32Array(16),
                    h = new Float32Array(3),
                    u = new Float32Array(16),
                    y = new Float32Array([1, 0, 0]),
                    w = new Float32Array([0, 1, 0]),
                    m = new Float32Array([0, 0, 1]);
                return (e, x, k) => {
                    const A = e.width,
                        F = e.height;
                    if (n(f, Math.PI / 4, A / F, 100, 1e3), i(g, f), h[0] = x[0], h[1] = x[1], h[2] = 1.2, c(h, h, g), c(h, h, p), s(l, t, h, o), k) {
                        const e = Date.now() / 1e3;
                        a(l, l, .1 + .2 * Math.sin(e / 3), y), a(l, l, .03 * Math.sin(e / 2) - .1, m), a(l, l, .5 + .2 * Math.sin(e / 3), w)
                    }
                    return r(u, f, d), r(u, u, l), u
                }
            }

            function h(e, t) {
                return t.zIndex - e.zIndex
            }

            function u(e, t, o) {
                const n = [];
                return r => {
                    let s;
                    const i = r.width,
                        a = r.height;
                    for (n.length = 0, s = 0; s < t.length; ++s) {
                        const e = t[s],
                            {
                                indices: r
                            } = e,
                            c = r[0],
                            f = r[1],
                            l = r[2],
                            d = o[3 * c],
                            p = o[3 * c + 1],
                            g = o[3 * f],
                            h = o[3 * f + 1],
                            u = o[3 * l];
                        if ((g - d) * (o[3 * l + 1] - p) - (h - p) * (u - d) < 0) continue;
                        const y = [];
                        let m = -1 / 0,
                            x = 1 / 0;
                        const k = e.svg;
                        for (let t = 0; t < 3; ++t) {
                            const e = r[t];
                            y.push(`${.5*i*(1-o[3*e])},${.5*a*(1-o[3*e+1])}`);
                            const n = o[3 * e + 2];
                            m = Math.max(m, n), x = Math.min(x, n)
                        }
                        e.zIndex = m + .25 * x;
                        const A = y.join(" "); - 1 === A.indexOf("NaN") && w(k, "points", A), n.push(e)
                    }
                    n.sort(h);
                    const c = n.map((e => e.svg)),
                        f = e.getElementsByTagName("defs"),
                        l = e.getElementsByTagName("mask");
                    e.replaceChildren(...f, ...l, ...c)
                }
            }

            function y(e) {
                return document.createElementNS(f, e)
            }

            function w(e, t, o) {
                e.setAttributeNS(null, t, o)
            }

            function m(e, t) {
                this.svg = e, this.indices = t, this.zIndex = 0
            }
            e.exports = {
                calculateSizingOptions: function(e = {}) {
                    let t = e.width || 400,
                        o = e.height || 400;
                    e.pxNotRatio || (t = Math.floor(window.innerWidth * (e.width || .25)), o = Math.floor(window.innerHeight * e.height || t), "minWidth" in e && t < e.minWidth && (t = e.minWidth, o = Math.floor(e.minWidth * e.height / e.width)));
                    return {
                        width: t,
                        height: o
                    }
                },
                createLogoViewer: function(e, t, {
                    followMouse: o = !1,
                    followMotion: n = !1,
                    slowDrift: r = !1,
                    lazyRender: s = !0
                } = {}) {
                    let i = !0;
                    const a = {
                            x: 0,
                            y: 0
                        },
                        c = [0, 0],
                        f = .3,
                        l = () => {
                            ! function() {
                                const e = .7;
                                c[0] = e * c[0] + f * a.x, c[1] = e * c[1] + f * a.y + .085
                            }(), t(c, r)
                        };

                    function d(t) {
                        const o = e.getBoundingClientRect();
                        a.x = 1 - 2 * (t.x - o.left) / o.width, a.y = 1 - 2 * (t.y - o.top) / o.height
                    }

                    function p() {
                        i = !0
                    }
                    window.addEventListener("mousemove", (function(e) {
                        i || p(), o && (d({
                            x: e.clientX,
                            y: e.clientY
                        }), l())
                    })), window.addEventListener("deviceorientation", (function(e) {
                        if (i || p(), n) {
                            const t = 10;
                            d({
                                x: 200 + e.gamma * t,
                                y: -300 + e.beta * t
                            }), l()
                        }
                    })), s ? l() : function e() {
                        i && (window.requestAnimationFrame(e), l())
                    }();
                    return {
                        container: e,
                        lookAt: d,
                        setFollowMouse: function(e) {
                            o = e
                        },
                        setFollowMotion: function(e) {
                            n = e
                        },
                        stopAnimation: function() {
                            i = !1
                        },
                        startAnimation: p,
                        lookAtAndRender: function(e) {
                            d(e), c[0] = a.x, c[1] = a.y + .085 / f, l()
                        },
                        renderCurrentScene: l
                    }
                },
                createModelRenderer: function(e, t, o) {
                    const {
                        updatePositions: n,
                        transformed: r,
                        polygons: s
                    } = o;
                    for (const c of s) e.appendChild(c.svg);
                    const i = g(t),
                        a = u(e, s, r);
                    return (t, o, c) => {
                        const f = i(t, o, c);
                        n(f), a(t, e, s, r)
                    }
                },
                loadModelFromJson: function(e, t = p) {
                    const o = e.positions.length,
                        n = new Float32Array(3 * o),
                        r = new Float32Array(3 * o),
                        {
                            polygons: s,
                            polygonsByChunk: i
                        } = d(e, t);
                    l(n, e);
                    const a = function(e, t, o) {
                        return n => {
                            const r = n[0],
                                s = n[1],
                                i = n[2],
                                a = n[3],
                                c = n[4],
                                f = n[5],
                                l = n[6],
                                d = n[7],
                                p = n[8],
                                g = n[9],
                                h = n[10],
                                u = n[11],
                                y = n[12],
                                w = n[13],
                                m = n[14],
                                x = n[15];
                            for (let k = 0; k < o; ++k) {
                                const o = e[3 * k],
                                    n = e[3 * k + 1],
                                    A = e[3 * k + 2],
                                    F = o * a + n * d + A * u + x;
                                t[3 * k] = (o * r + n * c + A * p + y) / F, t[3 * k + 1] = (o * s + n * f + A * g + w) / F, t[3 * k + 2] = (o * i + n * l + A * h + m) / F
                            }
                        }
                    }(n, r, o);
                    return {
                        updatePositions: a,
                        positions: n,
                        transformed: r,
                        polygons: s,
                        polygonsByChunk: i
                    }
                },
                positionsFromModel: l,
                createPolygonsFromModelJson: d,
                createStandardModelPolygon: p,
                createMatrixComputer: g,
                compareZ: h,
                createFaceUpdater: u,
                createNode: y,
                setAttribute: w,
                setGradientDefinitions: function(e, t) {
                    if (!t || 0 === Object.keys(t).length) return;
                    const o = y("defs"),
                        n = ["x1", "x2", "y1", "y2"],
                        r = ["cx", "cy", "fr", "fx", "fy", "r"],
                        s = ["gradientTransform", "gradientUnits", "spreadMethod", "stops", "type"],
                        i = [...n, ...s],
                        a = [...r, ...s];
                    for (const [c, f] of Object.entries(t)) {
                        let e;
                        if ("linear" === f.type) {
                            e = y("linearGradient");
                            const t = Object.keys(f).find((e => !i.includes(e)));
                            if (t) throw new Error(`Unsupported linear gradient attribute: '${t}'`);
                            if (n.some((e => void 0 !== f[e]))) {
                                const t = n.filter((e => void 0 === f[e]));
                                if (t.length > 0) throw new Error(`Missing coordinate attributes: '${t.join(", ")}'`);
                                for (const o of n) {
                                    if ("string" != typeof f[o]) throw new Error(`Type of '${o}' option expected to be 'string'. Instead received type '${typeof f[o]}'`);
                                    w(e, o, f[o])
                                }
                            }
                        } else {
                            if ("radial" !== f.type) throw new Error(`Unsupported gradient type: '${f.type}'`); {
                                e = y("radialGradient");
                                const t = r.filter((e => void 0 !== f[e])),
                                    o = Object.keys(f).find((e => !a.includes(e)));
                                if (o) throw new Error(`Unsupported radial gradient attribute: '${o}'`);
                                if (t.length > 0)
                                    for (const n of t) {
                                        if ("string" != typeof f[n]) throw new Error(`Type of '${n}' option expected to be 'string'. Instead received type '${typeof f[n]}'`);
                                        w(e, n, f[n])
                                    }
                            }
                        }
                        if (w(e, "id", c), void 0 !== f.gradientUnits) {
                            if (!["userSpaceOnUse", "objectBoundingBox"].includes(f.gradientUnits)) throw new Error(`Unrecognized value for 'gradientUnits' attribute: '${f.gradientUnits}'`);
                            w(e, "gradientUnits", f.gradientUnits)
                        }
                        if (void 0 !== f.gradientTransform) {
                            if ("string" != typeof f.gradientTransform) throw new Error(`Type of 'gradientTransform' option expected to be 'string'. Instead received type '${typeof f.gradientTransform}'`);
                            w(e, "gradientTransform", f.gradientTransform)
                        }
                        if (void 0 !== f.spreadMethod) {
                            if (!["pad", "reflect", "repeat"].includes(f.spreadMethod)) throw new Error(`Unrecognized value for 'spreadMethod' attribute: '${f.spreadMethod}'`);
                            w(e, "spreadMethod", f.spreadMethod)
                        }
                        if (void 0 !== f.stops) {
                            if (!Array.isArray(f.stops)) throw new Error("The 'stop' attribute must be an array");
                            for (const t of f.stops) {
                                if ("object" != typeof t) throw new Error(`Each entry in the 'stop' attribute must be an object. Instead received type '${typeof t}'`);
                                const o = y("stop");
                                void 0 !== t.offset && w(o, "offset", t.offset), void 0 !== t["stop-color"] && w(o, "stop-color", t["stop-color"]), void 0 !== t["stop-opacity"] && w(o, "stop-opacity", t["stop-opacity"]), e.appendChild(o)
                            }
                        }
                        o.appendChild(e)
                    }
                    e.appendChild(o)
                },
                setMaskDefinitions: function({
                    container: e,
                    masks: t,
                    height: o,
                    width: n
                }) {
                    if (!t || 0 === Object.keys(t).length) return;
                    for (const [r, s] of Object.entries(t)) {
                        const t = y("mask");
                        w(t, "id", r);
                        const i = y("rect");
                        w(i, "width", 1.5 * n), w(i, "height", 1.5 * o), w(i, "x", `-${Math.floor(n/4)}`), w(i, "y", `-${Math.floor(o/4)}`), w(i, "fill", s.color), t.appendChild(i), e.appendChild(t)
                    }
                },
                svgElementToSvgImageContent: function(e) {
                    const t = e.innerHTML;
                    return `<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"> <svg width="521px" height="521px" version="1.1" baseProfile="full" xmlns="${f}" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ev="http://www.w3.org/2001/xml-events">` + t + "</svg>"
                },
                Polygon: m
            }
        },
        79610: function(e, t, o) {
            "use strict";
            o.r(t);
            var n = o(67294);
            t.default = function(e) {
                var t = e.logoType,
                    r = n.useState(!1),
                    s = r[0],
                    i = r[1],
                    a = function() {
                        window.innerWidth < 768 && 1 === document.getElementsByClassName("metaMaskUninstalled").length ? i(!0) : i(!1)
                    };
                return n.useEffect((function() {
                    var e;
                    if (window.addEventListener("resize", a), "undefined" != typeof window && window.document) {
                        var n, r = o(45644);
                        if ("flask" === t) n = o(83625);
                        e = window.innerWidth < 768 && 1 === document.getElementsByClassName("metaMaskUninstalled").length ? r({
                            pxNotRatio: !0,
                            width: 130,
                            height: 130,
                            followMouse: !0,
                            meshJson: n
                        }) : r({
                            pxNotRatio: !0,
                            width: 230,
                            height: 230,
                            followMouse: !0,
                            meshJson: n
                        });
                        var s = document.getElementById("logo-container");
                        s.replaceChildren(""), s.appendChild(e.container)
                    }
                    return function() {
                        window.removeEventListener("resize", a)
                    }
                }), [t, s]), n.createElement("div", {
                    id: "logo-container"
                })
            }
        },
        36312: function(e) {
            e.exports = function(e) {
                return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = 1, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 1, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e
            }
        },
        64481: function(e) {
            e.exports = function(e, t) {
                var o = t[0],
                    n = t[1],
                    r = t[2],
                    s = t[3],
                    i = t[4],
                    a = t[5],
                    c = t[6],
                    f = t[7],
                    l = t[8],
                    d = t[9],
                    p = t[10],
                    g = t[11],
                    h = t[12],
                    u = t[13],
                    y = t[14],
                    w = t[15],
                    m = o * a - n * i,
                    x = o * c - r * i,
                    k = o * f - s * i,
                    A = n * c - r * a,
                    F = n * f - s * a,
                    U = r * f - s * c,
                    v = l * u - d * h,
                    E = l * y - p * h,
                    M = l * w - g * h,
                    b = d * y - p * u,
                    B = d * w - g * u,
                    C = p * w - g * y,
                    O = m * C - x * B + k * b + A * M - F * E + U * v;
                if (!O) return null;
                return O = 1 / O, e[0] = (a * C - c * B + f * b) * O, e[1] = (r * B - n * C - s * b) * O, e[2] = (u * U - y * F + w * A) * O, e[3] = (p * F - d * U - g * A) * O, e[4] = (c * M - i * C - f * E) * O, e[5] = (o * C - r * M + s * E) * O, e[6] = (y * k - h * U - w * x) * O, e[7] = (l * U - p * k + g * x) * O, e[8] = (i * B - a * M + f * v) * O, e[9] = (n * M - o * B - s * v) * O, e[10] = (h * F - u * k + w * m) * O, e[11] = (d * k - l * F - g * m) * O, e[12] = (a * E - i * b - c * v) * O, e[13] = (o * b - n * E + r * v) * O, e[14] = (u * x - h * A - y * m) * O, e[15] = (l * A - d * x + p * m) * O, e
            }
        },
        34727: function(e, t, o) {
            var n = o(36312);
            e.exports = function(e, t, o, r) {
                var s, i, a, c, f, l, d, p, g, h, u = t[0],
                    y = t[1],
                    w = t[2],
                    m = r[0],
                    x = r[1],
                    k = r[2],
                    A = o[0],
                    F = o[1],
                    U = o[2];
                if (Math.abs(u - A) < 1e-6 && Math.abs(y - F) < 1e-6 && Math.abs(w - U) < 1e-6) return n(e);
                d = u - A, p = y - F, g = w - U, h = 1 / Math.sqrt(d * d + p * p + g * g), s = x * (g *= h) - k * (p *= h), i = k * (d *= h) - m * g, a = m * p - x * d, (h = Math.sqrt(s * s + i * i + a * a)) ? (s *= h = 1 / h, i *= h, a *= h) : (s = 0, i = 0, a = 0);
                c = p * a - g * i, f = g * s - d * a, l = d * i - p * s, (h = Math.sqrt(c * c + f * f + l * l)) ? (c *= h = 1 / h, f *= h, l *= h) : (c = 0, f = 0, l = 0);
                return e[0] = s, e[1] = c, e[2] = d, e[3] = 0, e[4] = i, e[5] = f, e[6] = p, e[7] = 0, e[8] = a, e[9] = l, e[10] = g, e[11] = 0, e[12] = -(s * u + i * y + a * w), e[13] = -(c * u + f * y + l * w), e[14] = -(d * u + p * y + g * w), e[15] = 1, e
            }
        },
        29401: function(e) {
            e.exports = function(e, t, o) {
                var n = t[0],
                    r = t[1],
                    s = t[2],
                    i = t[3],
                    a = t[4],
                    c = t[5],
                    f = t[6],
                    l = t[7],
                    d = t[8],
                    p = t[9],
                    g = t[10],
                    h = t[11],
                    u = t[12],
                    y = t[13],
                    w = t[14],
                    m = t[15],
                    x = o[0],
                    k = o[1],
                    A = o[2],
                    F = o[3];
                return e[0] = x * n + k * a + A * d + F * u, e[1] = x * r + k * c + A * p + F * y, e[2] = x * s + k * f + A * g + F * w, e[3] = x * i + k * l + A * h + F * m, x = o[4], k = o[5], A = o[6], F = o[7], e[4] = x * n + k * a + A * d + F * u, e[5] = x * r + k * c + A * p + F * y, e[6] = x * s + k * f + A * g + F * w, e[7] = x * i + k * l + A * h + F * m, x = o[8], k = o[9], A = o[10], F = o[11], e[8] = x * n + k * a + A * d + F * u, e[9] = x * r + k * c + A * p + F * y, e[10] = x * s + k * f + A * g + F * w, e[11] = x * i + k * l + A * h + F * m, x = o[12], k = o[13], A = o[14], F = o[15], e[12] = x * n + k * a + A * d + F * u, e[13] = x * r + k * c + A * p + F * y, e[14] = x * s + k * f + A * g + F * w, e[15] = x * i + k * l + A * h + F * m, e
            }
        },
        64345: function(e) {
            e.exports = function(e, t, o, n, r) {
                var s = 1 / Math.tan(t / 2),
                    i = 1 / (n - r);
                return e[0] = s / o, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = s, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = (r + n) * i, e[11] = -1, e[12] = 0, e[13] = 0, e[14] = 2 * r * n * i, e[15] = 0, e
            }
        },
        90397: function(e) {
            e.exports = function(e, t, o, n) {
                var r, s, i, a, c, f, l, d, p, g, h, u, y, w, m, x, k, A, F, U, v, E, M, b, B = n[0],
                    C = n[1],
                    O = n[2],
                    S = Math.sqrt(B * B + C * C + O * O);
                if (Math.abs(S) < 1e-6) return null;
                B *= S = 1 / S, C *= S, O *= S, r = Math.sin(o), s = Math.cos(o), i = 1 - s, a = t[0], c = t[1], f = t[2], l = t[3], d = t[4], p = t[5], g = t[6], h = t[7], u = t[8], y = t[9], w = t[10], m = t[11], x = B * B * i + s, k = C * B * i + O * r, A = O * B * i - C * r, F = B * C * i - O * r, U = C * C * i + s, v = O * C * i + B * r, E = B * O * i + C * r, M = C * O * i - B * r, b = O * O * i + s, e[0] = a * x + d * k + u * A, e[1] = c * x + p * k + y * A, e[2] = f * x + g * k + w * A, e[3] = l * x + h * k + m * A, e[4] = a * F + d * U + u * v, e[5] = c * F + p * U + y * v, e[6] = f * F + g * U + w * v, e[7] = l * F + h * U + m * v, e[8] = a * E + d * M + u * b, e[9] = c * E + p * M + y * b, e[10] = f * E + g * M + w * b, e[11] = l * E + h * M + m * b, t !== e && (e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]);
                return e
            }
        },
        91156: function(e) {
            e.exports = function(e, t, o) {
                var n = t[0],
                    r = t[1],
                    s = t[2],
                    i = o[3] * n + o[7] * r + o[11] * s + o[15];
                return i = i || 1, e[0] = (o[0] * n + o[4] * r + o[8] * s + o[12]) / i, e[1] = (o[1] * n + o[5] * r + o[9] * s + o[13]) / i, e[2] = (o[2] * n + o[6] * r + o[10] * s + o[14]) / i, e
            }
        },
        35311: function(e) {
            "use strict";
            e.exports = JSON.parse('{"positions":[[111.024597,52.604599,46.225899],[114.025002,87.673302,58.9818],[66.192001,80.898003,55.394299],[72.113297,35.491798,30.871401],[97.804497,116.560997,73.978798],[16.7623,58.010899,58.078201],[52.608898,30.3641,42.556099],[106.881401,31.945499,46.9133],[113.484596,38.6049,49.121498],[108.6633,43.2332,46.315399],[101.216599,15.9822,46.308201],[16.6605,-16.2883,93.618698],[40.775002,-10.2288,85.276398],[23.926901,-2.5103,86.736504],[11.1691,-7.0037,99.377602],[9.5692,-34.393902,141.671997],[12.596,7.1655,88.740997],[61.180901,8.8142,76.996803],[39.719501,-28.927099,88.963799],[13.7962,-68.575699,132.057007],[15.2674,-62.32,129.688004],[14.8446,-52.6096,140.113007],[12.8917,-49.771599,144.740997],[35.604198,-71.758003,81.063904],[47.462502,-68.606102,63.369701],[38.2486,-64.730202,38.909901],[-12.8917,-49.771599,144.740997],[-13.7962,-68.575699,132.057007],[17.802099,-71.758003,81.063904],[19.1243,-69.0168,49.420101],[38.2486,-66.275597,17.776199],[12.8928,-36.703499,141.671997],[109.283997,-93.589897,27.824301],[122.117996,-36.8894,35.025002],[67.7668,-30.197001,78.417801],[33.180698,101.851997,25.3186],[9.4063,-35.589802,150.722],[-9.5692,-34.393902,141.671997],[-9.4063,-35.589802,150.722],[11.4565,-37.899399,150.722],[-12.596,7.1655,88.740997],[-11.1691,-7.0037,99.377602],[70.236504,62.836201,-3.9475],[47.263401,54.293999,-27.414801],[28.7302,91.731102,-24.972601],[69.167603,6.5862,-12.7757],[28.7302,49.1003,-48.3596],[31.903,5.692,-47.821999],[35.075802,-34.432899,-16.280899],[115.284103,48.681499,48.684101],[110.842796,28.4821,49.176201],[-19.1243,-69.0168,49.420101],[-38.2486,-66.275597,17.776199],[-111.024597,52.604599,46.225899],[-72.113297,35.491798,30.871401],[-66.192001,80.898003,55.394299],[-114.025002,87.673302,58.9818],[-97.804497,116.560997,73.978798],[-52.608898,30.3641,42.556099],[-16.7623,58.010899,58.078201],[-106.881401,31.945499,46.9133],[-108.6633,43.2332,46.315399],[-113.484596,38.6049,49.121498],[-101.216599,15.9822,46.308201],[-16.6605,-16.2883,93.618698],[-23.926901,-2.5103,86.736504],[-40.775002,-10.2288,85.276398],[-61.180901,8.8142,76.996803],[-39.719501,-28.927099,88.963799],[-14.8446,-52.6096,140.113007],[-15.2674,-62.32,129.688004],[-47.462502,-68.606102,63.369701],[-35.604198,-71.758003,81.063904],[-38.2486,-64.730202,38.909901],[-17.802099,-71.758003,81.063904],[-12.8928,-36.703499,141.671997],[-67.7668,-30.197001,78.417801],[-122.117996,-36.8894,35.025002],[-109.283997,-93.589897,27.824301],[-33.180698,101.851997,25.3186],[-11.4565,-37.899399,150.722],[-70.236504,62.836201,-3.9475],[-28.7302,91.731102,-24.972601],[-47.263401,54.293999,-27.414801],[-69.167603,6.5862,-12.7757],[-28.7302,49.1003,-48.3596],[-31.903,5.692,-47.821999],[-35.075802,-34.432899,-16.280899],[-115.284103,48.681499,48.684101],[-110.842796,28.4821,49.176201]],"chunks":[{"color":[119,57,0],"faces":[[0,1,2],[2,3,0],[4,5,2],[6,3,2],[2,5,6],[7,8,9],[10,3,6],[10,50,7],[7,3,10],[7,9,3],[49,0,9],[3,9,0],[53,54,55],[55,56,53],[57,56,55],[58,59,55],[55,54,58],[60,61,62],[63,58,54],[63,60,89],[60,63,54],[60,54,61],[88,61,53],[54,53,61],[2,1,4],[55,59,57]]},{"color":[36,51,67],"faces":[[11,12,13],[64,65,66]]},{"color":[228,116,36],"faces":[[14,15,11],[11,16,14],[17,12,18],[41,64,37],[67,68,66]]},{"color":[192,172,157],"faces":[[19,20,21],[21,22,19],[20,19,23],[23,24,20],[23,25,24],[19,22,26],[26,27,19],[23,28,29],[23,29,30],[25,23,30],[29,51,52],[52,30,29],[27,26,69],[69,70,27],[70,71,72],[72,27,70],[72,71,73],[51,74,72],[52,51,72],[73,52,72],[19,27,74],[74,28,19],[51,29,28],[28,74,51],[74,27,72],[28,23,19]]},{"color":[214,194,178],"faces":[[21,20,24],[24,31,21],[69,71,70],[71,69,75]]},{"color":[228,119,25],"faces":[[31,24,18],[6,5,16],[16,17,6],[24,32,33],[33,34,24],[5,4,35],[75,68,71],[58,67,40],[40,59,58],[71,76,77],[77,78,71]]},{"color":[205,98,0],"faces":[[24,34,18],[16,13,12],[12,17,16],[13,16,11],[71,68,76],[40,67,66],[66,65,40],[65,64,40]]},{"color":[0,0,0],"faces":[[36,15,37],[37,38,36],[31,39,22],[22,21,31],[31,15,36],[36,39,31],[75,69,26],[26,80,75],[75,80,38],[38,37,75],[38,80,39],[39,36,38],[39,80,26],[26,22,39]]},{"color":[247,132,25],"faces":[[17,33,10],[17,18,34],[34,33,17],[10,6,17],[11,15,31],[31,18,11],[18,12,11],[14,16,40],[40,41,14],[59,5,35],[35,79,59],[67,63,77],[67,77,76],[76,68,67],[63,67,58],[64,68,75],[75,37,64],[68,64,66],[14,41,37],[37,15,14],[5,59,40],[40,16,5]]},{"color":[225,119,25],"faces":[[35,4,42],[4,1,42],[42,43,44],[44,35,42],[45,43,42],[42,10,45],[30,32,24],[24,25,30],[30,33,32],[33,30,10],[44,43,46],[43,45,47],[47,46,43],[48,47,45],[45,30,48],[30,45,10],[49,42,0],[8,7,42],[50,42,7],[50,10,42],[1,0,42],[42,9,8],[42,49,9],[64,41,40],[57,59,79],[79,81,57],[57,81,56],[82,79,35],[35,44,82],[81,79,82],[82,83,81],[84,63,81],[81,83,84],[44,46,85],[85,82,44],[52,73,71],[71,78,52],[52,78,77],[77,63,52],[82,85,83],[83,85,86],[86,84,83],[87,52,84],[84,86,87],[52,63,84],[88,53,81],[62,81,60],[89,60,81],[89,81,63],[56,81,53],[81,62,61],[81,61,88],[48,87,86],[86,47,48],[47,86,85],[85,46,47],[48,30,52],[52,87,48]]}]}')
        },
        83625: function(e) {
            "use strict";
            e.exports = JSON.parse('{"positions":[[111.024597,52.604599,46.225899],[114.025002,87.673302,58.9818],[66.192001,80.898003,55.394299],[72.113297,35.491798,30.871401],[97.804497,116.560997,73.978798],[16.7623,58.010899,58.078201],[52.608898,30.3641,42.556099],[106.881401,31.945499,46.9133],[113.484596,38.6049,49.121498],[108.6633,43.2332,46.315399],[101.216599,15.9822,46.308201],[16.6605,-16.2883,93.618698],[40.775002,-10.2288,85.276398],[23.926901,-2.5103,86.736504],[11.1691,-7.0037,99.377602],[9.5692,-34.393902,141.671997],[12.596,7.1655,88.740997],[61.180901,8.8142,76.996803],[39.719501,-28.927099,88.963799],[13.7962,-68.575699,132.057007],[15.2674,-62.32,129.688004],[14.8446,-52.6096,140.113007],[12.8917,-49.771599,144.740997],[35.604198,-71.758003,81.063904],[47.462502,-68.606102,63.369701],[38.2486,-64.730202,38.909901],[-12.8917,-49.771599,144.740997],[-13.7962,-68.575699,132.057007],[17.802099,-71.758003,81.063904],[19.1243,-69.0168,49.420101],[38.2486,-66.275597,17.776199],[12.8928,-36.703499,141.671997],[109.283997,-93.589897,27.824301],[122.117996,-36.8894,35.025002],[67.7668,-30.197001,78.417801],[33.180698,101.851997,25.3186],[9.4063,-35.589802,150.722],[-9.5692,-34.393902,141.671997],[-9.4063,-35.589802,150.722],[11.4565,-37.899399,150.722],[-12.596,7.1655,88.740997],[-11.1691,-7.0037,99.377602],[70.236504,62.836201,-3.9475],[47.263401,54.293999,-27.414801],[28.7302,91.731102,-24.972601],[69.167603,6.5862,-12.7757],[28.7302,49.1003,-48.3596],[31.903,5.692,-47.821999],[35.075802,-34.432899,-16.280899],[115.284103,48.681499,48.684101],[110.842796,28.4821,49.176201],[-19.1243,-69.0168,49.420101],[-38.2486,-66.275597,17.776199],[-111.024597,52.604599,46.225899],[-72.113297,35.491798,30.871401],[-66.192001,80.898003,55.394299],[-114.025002,87.673302,58.9818],[-97.804497,116.560997,73.978798],[-52.608898,30.3641,42.556099],[-16.7623,58.010899,58.078201],[-106.881401,31.945499,46.9133],[-108.6633,43.2332,46.315399],[-113.484596,38.6049,49.121498],[-101.216599,15.9822,46.308201],[-16.6605,-16.2883,93.618698],[-23.926901,-2.5103,86.736504],[-40.775002,-10.2288,85.276398],[-61.180901,8.8142,76.996803],[-39.719501,-28.927099,88.963799],[-14.8446,-52.6096,140.113007],[-15.2674,-62.32,129.688004],[-47.462502,-68.606102,63.369701],[-35.604198,-71.758003,81.063904],[-38.2486,-64.730202,38.909901],[-17.802099,-71.758003,81.063904],[-12.8928,-36.703499,141.671997],[-67.7668,-30.197001,78.417801],[-122.117996,-36.8894,35.025002],[-109.283997,-93.589897,27.824301],[-33.180698,101.851997,25.3186],[-11.4565,-37.899399,150.722],[-70.236504,62.836201,-3.9475],[-28.7302,91.731102,-24.972601],[-47.263401,54.293999,-27.414801],[-69.167603,6.5862,-12.7757],[-28.7302,49.1003,-48.3596],[-31.903,5.692,-47.821999],[-35.075802,-34.432899,-16.280899],[-115.284103,48.681499,48.684101],[-110.842796,28.4821,49.176201]],"chunks":[{"faces":[[0,1,2],[2,3,0],[4,5,2],[6,3,2],[2,5,6],[7,8,9],[10,3,6],[10,50,7],[7,3,10],[7,9,3],[49,0,9],[3,9,0],[2,1,4]],"name":"left ear","gradient":"left-ear-gradient"},{"faces":[[53,54,55],[55,56,53],[57,56,55],[58,59,55],[55,54,58],[60,61,62],[63,58,54],[63,60,89],[60,63,54],[60,54,61],[88,61,53],[54,53,61],[55,59,57]],"name":"right ear","gradient":"right-ear-gradient"},{"color":[22,22,22],"faces":[[11,12,13]],"name":"left eye"},{"color":[22,22,22],"faces":[[64,65,66]],"name":"right eye"},{"faces":[[14,15,11],[11,16,14]],"name":"left inner eye","gradient":"left-inner-eye-gradient"},{"faces":[[17,12,18]],"name":"left outer eye","gradient":"left-outer-eye-gradient"},{"faces":[[41,64,37]],"name":"right lower inner eye","gradient":"right-inner-eye-gradient"},{"faces":[[67,68,66]],"name":"right outer eye","gradient":"right-outer-eye-gradient"},{"color":[223,117,84],"faces":[[19,20,21],[21,22,19],[20,19,23],[23,24,20],[23,25,24],[19,22,26],[26,27,19],[23,28,29],[23,29,30],[25,23,30],[29,51,52],[52,30,29],[27,26,69],[69,70,27],[70,71,72],[72,27,70],[72,71,73],[51,74,72],[52,51,72],[73,52,72],[19,27,74],[74,28,19],[51,29,28],[28,74,51],[74,27,72],[28,23,19]],"name":"lower chin"},{"color":[255,159,90],"faces":[[21,20,24],[24,31,21]],"name":"left lower snout"},{"color":[255,159,90],"faces":[[69,71,70],[71,69,75]],"name":"right lower snout"},{"color":[147,131,250],"faces":[[31,24,18]],"name":"left upper snout"},{"faces":[[6,5,16],[16,17,6]],"name":"left forehead","gradient":"left-forehead-gradient"},{"faces":[[24,32,33],[33,34,24]],"name":"left lower cheek","gradient":"left-lower-cheek-gradient"},{"faces":[[5,4,35]],"name":"left top ear","gradient":"left-top-ear-gradient"},{"color":[147,131,250],"faces":[[75,68,71]],"name":"right upper snout"},{"faces":[[58,67,40],[40,59,58]],"name":"right forhead","gradient":"right-forehead-gradient"},{"faces":[[71,76,77],[77,78,71]],"name":"right lower cheek","gradient":"right-lower-cheek-gradient"},{"faces":[[24,34,18]],"name":"left middle cheek","gradient":"left-middle-cheek-gradient"},{"color":[156,90,221],"faces":[[16,13,12],[12,17,16],[13,16,11]],"name":"left above eye"},{"faces":[[71,68,76]],"name":"right middle cheek","gradient":"right-middle-cheek-gradient"},{"color":[156,90,221],"faces":[[40,67,66],[66,65,40],[65,64,40]],"name":"right above eye"},{"color":[22,22,22],"faces":[[36,15,37],[37,38,36],[31,39,22],[22,21,31],[31,15,36],[36,39,31],[75,69,26],[26,80,75],[75,80,38],[38,37,75],[38,80,39],[39,36,38],[39,80,26],[26,22,39]],"name":"nose"},{"faces":[[17,33,10],[17,18,34],[34,33,17],[10,6,17]],"name":"left upper cheek","gradient":"left-upper-cheek-gradient"},{"faces":[[11,15,31],[31,18,11],[18,12,11]],"name":"left below eye","gradient":"left-below-eye-gradient"},{"faces":[[14,16,40],[40,41,14],[59,5,35],[35,79,59],[14,41,37],[37,15,14],[5,59,40],[40,16,5]],"name":"forehead","gradient":"forehead-gradient"},{"faces":[[67,63,77],[67,77,76],[76,68,67],[63,67,58]],"name":"right upper cheek","gradient":"right-upper-cheek-gradient"},{"faces":[[64,68,75],[75,37,64],[68,64,66]],"name":"right below eye","gradient":"right-below-eye-gradient"},{"faces":[[35,4,42],[4,1,42],[42,43,44],[44,35,42],[45,43,42],[42,10,45],[30,32,24],[24,25,30],[30,33,32],[33,30,10],[44,43,46],[43,45,47],[47,46,43],[48,47,45],[45,30,48],[30,45,10],[49,42,0],[8,7,42],[50,42,7],[50,10,42],[1,0,42],[42,9,8],[42,49,9],[79,81,57],[57,81,56],[82,79,35],[35,44,82],[81,79,82],[82,83,81],[84,63,81],[81,83,84],[44,46,85],[85,82,44],[52,73,71],[71,78,52],[52,78,77],[77,63,52],[82,85,83],[83,85,86],[86,84,83],[87,52,84],[84,86,87],[52,63,84],[88,53,81],[62,81,60],[89,60,81],[89,81,63],[56,81,53],[81,62,61],[81,61,88],[48,87,86],[86,47,48],[47,86,85],[85,46,47],[48,30,52],[52,87,48]],"name":"back","gradient":"back-gradient"},{"faces":[[57,59,79]],"name":"right top ear","gradient":"right-top-ear-gradient"},{"faces":[[64,41,40]],"name":"right inner upper eye","gradient":"right-inner-eye-gradient"}],"gradients":{"left-inner-eye-gradient":{"type":"linear","x1":"41.97721822541966%","y1":"67.79239690721649%","x2":"44.56654676258992%","y2":"67.79239690721649%","gradientUnits":"userSpaceOnUse","stops":[{"stop-color":"#BA86F3"},{"offset":"0.5281","stop-color":"#B786F4"},{"offset":"0.8987","stop-color":"#AE86F5"},{"offset":"1","stop-color":"#AA86F6"}]},"right-inner-eye-gradient":{"type":"linear","x1":"56.72805755395684%","y1":"81.08904639175258%","x2":"56.72805755395684%","y2":"54.49574742268041%","gradientUnits":"userSpaceOnUse","stops":[{"stop-color":"#BA86F3"},{"offset":"0.5281","stop-color":"#B786F4"},{"offset":"0.8987","stop-color":"#AE86F5"},{"offset":"1","stop-color":"#AA86F6"}]},"left-middle-cheek-gradient":{"type":"linear","x1":"25.107913669064747%","y1":"72.68865979381442%","x2":"25.107913669064747%","y2":"89.44690721649484%","gradientUnits":"userSpaceOnUse","stops":[{"stop-color":"#6848BA"},{"offset":"0.3363","stop-color":"#6356D5"}]},"right-middle-cheek-gradient":{"type":"linear","x1":"74.89208633093526%","y1":"51.32938144329896%","x2":"74.89208633093526%","y2":"94.76301546391753%","gradientUnits":"userSpaceOnUse","stops":[{"stop-color":"#6848BA"},{"offset":"0.3363","stop-color":"#6356D5"}]},"right-forehead-gradient":{"type":"linear","x1":"67.00671462829736%","y1":"30.13930412371134%","x2":"67.00671462829736%","y2":"54.49561855670103%","gradientUnits":"userSpaceOnUse","stops":[{"stop-color":"#DC69E6"},{"offset":"1","stop-color":"#C289F3"}]},"left-forehead-gradient":{"type":"linear","x1":"32.99340527577938%","y1":"30.13930412371134%","x2":"32.99340527577938%","y2":"54.49561855670103%","gradientUnits":"userSpaceOnUse","stops":[{"stop-color":"#DC69E6"},{"offset":"1","stop-color":"#C289F3"}]},"right-top-ear-gradient":{"type":"linear","x1":"95.056858513189448%","y1":"15.06958762886598%","x2":"57.31654676258992%","y2":"15.06958762886598%","gradientUnits":"userSpaceOnUse","stops":[{"stop-color":"#BB65ED"},{"offset":"1","stop-color":"#E560E3"}]},"left-top-ear-gradient":{"type":"linear","x1":"4.943141486810552%","y1":"15.06958762886598%","x2":"42.68345323741008%","y2":"15.06958762886598%","gradientUnits":"userSpaceOnUse","stops":[{"stop-color":"#BB65ED"},{"offset":"1","stop-color":"#E560E3"}]},"left-lower-cheek-gradient":{"type":"linear","x1":"15.103956834532372%","y1":"72.6889175257732%","x2":"15.103956834532372%","y2":"96.03221649484537%","gradientUnits":"userSpaceOnUse","stops":[{"stop-color":"#906EF7"},{"offset":"1","stop-color":"#575ADE"}]},"right-lower-cheek-gradient":{"type":"linear","x1":"84.91570743405276%","y1":"72.6889175257732%","x2":"84.91570743405276%","y2":"96.03221649484537%","gradientUnits":"userSpaceOnUse","stops":[{"stop-color":"#906EF7"},{"offset":"1","stop-color":"#575ADE"}]},"right-outer-eye-gradient":{"type":"linear","x1":"68.7720623501199%","y1":"63.14909793814433%","x2":"78.03057553956835%","y2":"63.14909793814433%","gradientUnits":"userSpaceOnUse","stops":[{"stop-color":"#BA86F3"},{"offset":"0.5281","stop-color":"#B786F4"},{"offset":"0.8987","stop-color":"#AE86F5"},{"offset":"1","stop-color":"#AA86F6"}]},"left-outer-eye-gradient":{"type":"linear","x1":"21.969424460431654%","y1":"63.14909793814433%","x2":"31.227937649880094%","y2":"63.14909793814433%","gradientUnits":"userSpaceOnUse","stops":[{"stop-color":"#BA86F3"},{"offset":"0.5281","stop-color":"#B786F4"},{"offset":"0.8987","stop-color":"#AE86F5"},{"offset":"1","stop-color":"#AA86F6"}]},"left-ear-gradient":{"type":"linear","x1":"50%","y1":"30%","x2":"4%","y2":"4%","gradientUnits":"userSpaceOnUse","stops":[{"stop-color":"#541758"},{"offset":"0.4286","stop-color":"#4F206C"},{"offset":"0.62","stop-color":"#4D2577"},{"offset":"1","stop-color":"#8B45B6"}]},"right-ear-gradient":{"type":"linear","x1":"50%","y1":"30%","x2":"96%","y2":"4%","gradientUnits":"userSpaceOnUse","stops":[{"stop-color":"#541758"},{"offset":"0.4286","stop-color":"#4F206C"},{"offset":"0.62","stop-color":"#4D2577"},{"offset":"1","stop-color":"#8B45B6"}]},"left-below-eye-gradient":{"type":"linear","x1":"30.914028776978412%","y1":"72.83646907216496%","x2":"44.56654676258992%","y2":"72.83646907216496%","gradientUnits":"userSpaceOnUse","stops":[{"stop-color":"#C8A8F7"},{"offset":"1","stop-color":"#BAAAFB"}]},"right-below-eye-gradient":{"type":"linear","x1":"55.43345323741007%","y1":"72.83646907216496%","x2":"69.12517985611511%","y2":"72.83646907216496%","gradientUnits":"userSpaceOnUse","stops":[{"stop-color":"#C8A8F7"},{"offset":"1","stop-color":"#BAAAFB"}]},"left-upper-cheek-gradient":{"type":"linear","x1":"16.02589928057554%","y1":"43.35154639175258%","x2":"16.02589928057554%","y2":"72.85773195876288%","gradientUnits":"userSpaceOnUse","stops":[{"stop-color":"#B65FE5"},{"offset":"1","stop-color":"#ADA2FC"}]},"right-upper-cheek-gradient":{"type":"linear","x1":"83.99364508393285%","y1":"43.35154639175258%","x2":"83.99364508393285%","y2":"72.85773195876288%","gradientUnits":"userSpaceOnUse","stops":[{"stop-color":"#B65FE5"},{"offset":"1","stop-color":"#ADA2FC"}]},"forehead-gradient":{"type":"linear","x1":"50%","y1":"12.790180412371136%","x2":"50%","y2":"81.08904639175258%","gradientUnits":"userSpaceOnUse","stops":[{"stop-color":"#FB7FE4"},{"offset":"1","stop-color":"#BCABFB"}]},"back-gradient":{"type":"linear","x1":"50%","y1":"12.790180412371136%","x2":"50%","y2":"81.08904639175258%","gradientUnits":"userSpaceOnUse","stops":[{"stop-color":"#FB7FE4"},{"offset":"1","stop-color":"#5C5CE0"}]}}}')
        }
    }
]);
//# sourceMappingURL=610-f994a8078a3cf1a9c659.js.map