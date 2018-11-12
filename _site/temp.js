function l(e) {
  console.log(e)
}

function updateTitle(e) {
  document.title = e.match(/<title>(.*?)<\/title>/)[1].trim()
}

function Site() {
  this.init = function() {
    "projects" == window.location.pathname.split("/")[1] && (menu.showProjects(), $b.addClass("show-single")), setTimeout(function() {
      $("a.logo span:not(.alt)").addClass("remove")
    }, 1e4), setTimeout(function() {
      $b.removeClass("not-loaded"), site.transIn()
    }, 500)
  }, this.doneLoading = function() {
    l("loaded")
  }, this.router = function(e) {
    l(e), e.indexOf("projects") > -1 ? site.single() : e.indexOf("home") > -1 ? site.home() : site.info()
  }, this.loadPage = function(e) {
    $.ajax(e, {
      beforeSend: function() {
        $(".images").addClass("out")
      },
      success: function(e) {
        setTimeout(function() {
          updateTitle(e), $(".images").html($(e).find(".images > *")), $(".images").removeClass("out"), $("html, body").animate({
            scrollTop: 0
          }, 500)
        }, 600)
      },
      error: function() {
        console.log("error")
      }
    })
  }, this.home = function() {
    l("site.home")
  }, this.info = function() {
    l("site.info")
  }, this.single = function() {
    l("site.single"), $b.addClass("show-single")
  }, this.updateImage = function(e) {
    l("site.updateImage");
    var t = $(e.target).parent().index();
    $(".slider .slide").removeClass("active"), setTimeout(function() {
      $(".slider .slide").eq(t).addClass("active")
    }, 0)
  }, this.closeProject = function(e) {
    l("site.closeProject"), e.preventDefault(), $(".menu-item").removeClass("is-active"), $b.removeClass("show-single")
  }, this.transIn = function() {
    setTimeout(function() {
      $(".transin").each(function(e) {
        var t = $(this);
        setTimeout(function() {
          l(t), t.removeClass("transin")
        }, 75 * e)
      })
    }, 450)
  }
}

function Menu() {
  this.infoHeight = $(".projects").outerHeight(), this.open = function(e) {
    $b.addClass("show-menu")
  }, this.close = function() {
    $(".info").animate({
      scrollTop: 0
    }, 500).removeClass("scrollable"), $(".show-projects, .show-info").removeClass("active"), $b.hasClass("show-info") ? ($b.removeClass("show-menu show-projects show-single"), $(".nav").css("bottom", "0px"), $(".show-projects, .show-info").removeClass("active"), setTimeout(function() {
      $b.removeClass("show-info")
    }, 600)) : ($b.removeClass("show-menu show-info show-projects show-single"), $(".nav").css("bottom", "0px"), $(".show-projects, .show-info").removeClass("active"))
  }, this.showInfo = function(e) {
    e.preventDefault(), l("menu.showInfo"), $b.hasClass("show-single") && ($b.removeClass("show-single"), site.loadPage("/"), $(".menu-item").removeClass("is-active"), history.pushState({}, "", "/")), $b.hasClass("show-menu") && $b.hasClass("show-info") ? menu.close() : ($(".show-info").addClass("active"), $(".show-projects").removeClass("active"), menu.open(), $b.removeClass("show-projects"), $b.addClass("show-info"), $(".info").addClass("scrollable"), $(".nav").css("bottom", "70vh"))
  }, this.showProjects = function(e) {
    l("menu.showProjects"), void 0 !== e && e.preventDefault(), $b.hasClass("show-single") ? ($b.removeClass("show-single"), site.loadPage("/"), $(".menu-item").removeClass("is-active"), history.pushState({}, "", "/")) : ($(".info").animate({
      scrollTop: 0
    }, 500).removeClass("scrollable"), $b.hasClass("show-menu") && $b.hasClass("show-projects") ? menu.close() : ($(".show-info").removeClass("active"), $(".show-projects").addClass("active"), menu.open(), $b.removeClass("show-info"), $b.addClass("show-projects"), $(".projects").css("height", $(".bio").outerHeight()), $(".nav").css("bottom", menu.infoHeight)))
  }, this.showSingle = function(e) {
    l("menu.showSingle"), e.preventDefault(), history.pushState({}, "", this.href);
    var t = $(e.target).attr("href");
    site.loadPage(t), $(".menu-item").removeClass("is-active"), $(e.target).parent().addClass("is-active"), $b.hasClass("show-single") || $b.addClass("show-single")
  }
}! function(e, t) {
  var s = function(e, t) {
    "use strict";
    if (t.getElementsByClassName) {
      var s, o, n = t.documentElement,
        i = e.Date,
        a = e.HTMLPictureElement,
        l = "addEventListener",
        r = "getAttribute",
        c = e[l],
        u = e.setTimeout,
        d = e.requestAnimationFrame || u,
        f = e.requestIdleCallback,
        h = /^picture$/i,
        m = ["load", "error", "lazyincluded", "_lazyloaded"],
        v = {},
        g = Array.prototype.forEach,
        p = function(e, t) {
          return v[t] || (v[t] = new RegExp("(\\s|^)" + t + "(\\s|$)")), v[t].test(e[r]("class") || "") && v[t]
        },
        C = function(e, t) {
          p(e, t) || e.setAttribute("class", (e[r]("class") || "").trim() + " " + t)
        },
        w = function(e, t) {
          var s;
          (s = p(e, t)) && e.setAttribute("class", (e[r]("class") || "").replace(s, " "))
        },
        $ = function(e, t, s) {
          var o = s ? l : "removeEventListener";
          s && $(e, t), m.forEach(function(s) {
            e[o](s, t)
          })
        },
        b = function(e, o, n, i, a) {
          var l = t.createEvent("CustomEvent");
          return n || (n = {}), n.instance = s, l.initCustomEvent(o, !i, !a, n), e.dispatchEvent(l), l
        },
        y = function(t, s) {
          var n;
          !a && (n = e.picturefill || o.pf) ? n({
            reevaluate: !0,
            elements: [t]
          }) : s && s.src && (t.src = s.src)
        },
        z = function(e, t) {
          return (getComputedStyle(e, null) || {})[t]
        },
        A = function(e, t, s) {
          for (s = s || e.offsetWidth; s < o.minSize && t && !e._lazysizesWidth;) s = t.offsetWidth, t = t.parentNode;
          return s
        },
        j = function() {
          var e, s, o = [],
            n = [],
            i = o,
            a = function() {
              var t = i;
              for (i = o.length ? n : o, e = !0, s = !1; t.length;) t.shift()();
              e = !1
            },
            l = function(o, n) {
              e && !n ? o.apply(this, arguments) : (i.push(o), s || (s = !0, (t.hidden ? u : d)(a)))
            };
          return l._lsFlush = a, l
        }(),
        E = function(e, t) {
          return t ? function() {
            j(e)
          } : function() {
            var t = this,
              s = arguments;
            j(function() {
              e.apply(t, s)
            })
          }
        },
        T = function(e) {
          var t, s, o = function() {
              t = null, e()
            },
            n = function() {
              var e = i.now() - s;
              99 > e ? u(n, 99 - e) : (f || o)(o)
            };
          return function() {
            s = i.now(), t || (t = u(n, 99))
          }
        };
      ! function() {
        var t, s = {
          lazyClass: "lazyload",
          loadedClass: "lazyloaded",
          loadingClass: "lazyloading",
          preloadClass: "lazypreload",
          errorClass: "lazyerror",
          autosizesClass: "lazyautosizes",
          srcAttr: "data-src",
          srcsetAttr: "data-srcset",
          sizesAttr: "data-sizes",
          minSize: 40,
          customMedia: {},
          init: !0,
          expFactor: 1.5,
          hFac: .8,
          loadMode: 2,
          loadHidden: !0,
          ricTimeout: 300
        };
        o = e.lazySizesConfig || e.lazysizesConfig || {};
        for (t in s) t in o || (o[t] = s[t]);
        e.lazySizesConfig = o, u(function() {
          o.init && S()
        })
      }();
      var M = function() {
          var a, d, m, v, A, M, S, x, N, _, k, I, W, H, B = /^img$/i,
            D = /^iframe$/i,
            F = "onscroll" in e && !/glebot/.test(navigator.userAgent),
            L = 0,
            O = 0,
            R = -1,
            q = function(e) {
              O--, e && e.target && $(e.target, q), (!e || 0 > O || !e.target) && (O = 0)
            },
            G = function(e, s) {
              var o, i = e,
                a = "hidden" == z(t.body, "visibility") || "hidden" != z(e, "visibility");
              for (x -= s, k += s, N -= s, _ += s; a && (i = i.offsetParent) && i != t.body && i != n;)(a = (z(i, "opacity") || 1) > 0) && "visible" != z(i, "overflow") && (o = i.getBoundingClientRect(), a = _ > o.left && N < o.right && k > o.top - 1 && x < o.bottom + 1);
              return a
            },
            J = function() {
              var e, i, l, c, u, f, h, m, g, p = s.elements;
              if ((v = o.loadMode) && 8 > O && (e = p.length)) {
                i = 0, R++, null == W && ("expand" in o || (o.expand = n.clientHeight > 500 && n.clientWidth > 500 ? 500 : 370), I = o.expand, W = I * o.expFactor), W > L && 1 > O && R > 2 && v > 2 && !t.hidden ? (L = W, R = 0) : L = v > 1 && R > 1 && 6 > O ? I : 0;
                for (; e > i; i++)
                  if (p[i] && !p[i]._lazyRace)
                    if (F)
                      if ((m = p[i][r]("data-expand")) && (f = 1 * m) || (f = L), g !== f && (M = innerWidth + f * H, S = innerHeight + f, h = -1 * f, g = f), l = p[i].getBoundingClientRect(), (k = l.bottom) >= h && (x = l.top) <= S && (_ = l.right) >= h * H && (N = l.left) <= M && (k || _ || N || x) && (o.loadHidden || "hidden" != z(p[i], "visibility")) && (d && 3 > O && !m && (3 > v || 4 > R) || G(p[i], f))) {
                        if (Z(p[i]), u = !0, O > 9) break
                      } else !u && d && !c && 4 > O && 4 > R && v > 2 && (a[0] || o.preloadAfterLoad) && (a[0] || !m && (k || _ || N || x || "auto" != p[i][r](o.sizesAttr))) && (c = a[0] || p[i]);
                else Z(p[i]);
                c && !u && Z(c)
              }
            },
            K = function(e) {
              var t, s = 0,
                n = o.ricTimeout,
                a = function() {
                  t = !1, s = i.now(), e()
                },
                l = f && o.ricTimeout ? function() {
                  f(a, {
                    timeout: n
                  }), n !== o.ricTimeout && (n = o.ricTimeout)
                } : E(function() {
                  u(a)
                }, !0);
              return function(e) {
                var o;
                (e = !0 === e) && (n = 33), t || (t = !0, 0 > (o = 125 - (i.now() - s)) && (o = 0), e || 9 > o && f ? l() : u(l, o))
              }
            }(J),
            Q = function(e) {
              C(e.target, o.loadedClass), w(e.target, o.loadingClass), $(e.target, V), b(e.target, "lazyloaded")
            },
            U = E(Q),
            V = function(e) {
              U({
                target: e.target
              })
            },
            X = function(e) {
              var t, s = e[r](o.srcsetAttr);
              (t = o.customMedia[e[r]("data-media") || e[r]("media")]) && e.setAttribute("media", t), s && e.setAttribute("srcset", s)
            },
            Y = E(function(e, t, s, n, i) {
              var a, l, c, d, f, v;
              (f = b(e, "lazybeforeunveil", t)).defaultPrevented || (n && (s ? C(e, o.autosizesClass) : e.setAttribute("sizes", n)), l = e[r](o.srcsetAttr), a = e[r](o.srcAttr), i && (c = e.parentNode, d = c && h.test(c.nodeName || "")), v = t.firesLoad || "src" in e && (l || a || d), f = {
                target: e
              }, v && ($(e, q, !0), clearTimeout(m), m = u(q, 2500), C(e, o.loadingClass), $(e, V, !0)), d && g.call(c.getElementsByTagName("source"), X), l ? e.setAttribute("srcset", l) : a && !d && (D.test(e.nodeName) ? function(e, t) {
                try {
                  e.contentWindow.location.replace(t)
                } catch (s) {
                  e.src = t
                }
              }(e, a) : e.src = a), i && (l || d) && y(e, {
                src: a
              })), e._lazyRace && delete e._lazyRace, w(e, o.lazyClass), j(function() {
                (!v || e.complete && e.naturalWidth > 1) && (v ? q(f) : O--, Q(f))
              }, !0)
            }),
            Z = function(e) {
              var t, s = B.test(e.nodeName),
                n = s && (e[r](o.sizesAttr) || e[r]("sizes")),
                i = "auto" == n;
              (!i && d || !s || !e[r]("src") && !e.srcset || e.complete || p(e, o.errorClass) || !p(e, o.lazyClass)) && (t = b(e, "lazyunveilread").detail, i && P.updateElem(e, !0, e.offsetWidth), e._lazyRace = !0, O++, Y(e, t, i, n, s))
            },
            ee = function() {
              if (!d) {
                if (i.now() - A < 999) return void u(ee, 999);
                var e = T(function() {
                  o.loadMode = 3, K()
                });
                d = !0, o.loadMode = 3, K(), c("scroll", function() {
                  3 == o.loadMode && (o.loadMode = 2), e()
                }, !0)
              }
            };
          return {
            _: function() {
              A = i.now(), s.elements = t.getElementsByClassName(o.lazyClass), a = t.getElementsByClassName(o.lazyClass + " " + o.preloadClass), H = o.hFac, c("scroll", K, !0), c("resize", K, !0), e.MutationObserver ? new MutationObserver(K).observe(n, {
                childList: !0,
                subtree: !0,
                attributes: !0
              }) : (n[l]("DOMNodeInserted", K, !0), n[l]("DOMAttrModified", K, !0), setInterval(K, 999)), c("hashchange", K, !0), ["focus", "mouseover", "click", "load", "transitionend", "animationend", "webkitAnimationEnd"].forEach(function(e) {
                t[l](e, K, !0)
              }), /d$|^c/.test(t.readyState) ? ee() : (c("load", ee), t[l]("DOMContentLoaded", K), u(ee, 2e4)), s.elements.length ? (J(), j._lsFlush()) : K()
            },
            checkElems: K,
            unveil: Z
          }
        }(),
        P = function() {
          var e, s = E(function(e, t, s, o) {
              var n, i, a;
              if (e._lazysizesWidth = o, o += "px", e.setAttribute("sizes", o), h.test(t.nodeName || ""))
                for (n = t.getElementsByTagName("source"), i = 0, a = n.length; a > i; i++) n[i].setAttribute("sizes", o);
              s.detail.dataAttr || y(e, s.detail)
            }),
            n = function(e, t, o) {
              var n, i = e.parentNode;
              i && (o = A(e, i, o), (n = b(e, "lazybeforesizes", {
                width: o,
                dataAttr: !!t
              })).defaultPrevented || (o = n.detail.width) && o !== e._lazysizesWidth && s(e, i, n, o))
            },
            i = T(function() {
              var t, s = e.length;
              if (s)
                for (t = 0; s > t; t++) n(e[t])
            });
          return {
            _: function() {
              e = t.getElementsByClassName(o.autosizesClass), c("resize", i)
            },
            checkElems: i,
            updateElem: n
          }
        }(),
        S = function() {
          S.i || (S.i = !0, P._(), M._())
        };
      return s = {
        cfg: o,
        autoSizer: P,
        loader: M,
        init: S,
        uP: y,
        aC: C,
        rC: w,
        hC: p,
        fire: b,
        gW: A,
        rAF: j
      }
    }
  }(e, e.document);
  e.lazySizes = s, "object" == typeof module && module.exports && (module.exports = s)
}(window);
var $b = $("body"),
  $d = $(document),
  $w = $(window),
  menu = new Menu,
  site = new Site;
$d.ready(site.init).on("click", "a.show-projects", menu.showProjects).on("click", "a.show-info", menu.showInfo).on("click", "a.show-single", menu.showSingle).on("mouseover", "a.show-single", site.updateImage).on("click", "a.back", site.closeProject), $w.on("popstate", function(e) {
  null !== e.originalEvent.state && site.loadPage(location.href)
});
