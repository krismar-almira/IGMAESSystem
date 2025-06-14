/*! DataTables 2.0.7
 * © SpryMedia Ltd - datatables.net/license
 */
!(function (n) {
  'use strict';
  var a;
  'function' == typeof define && define.amd
    ? define(['jquery'], function (t) {
        return n(t, window, document);
      })
    : 'object' == typeof exports
    ? ((a = require('jquery')),
      'undefined' == typeof window
        ? (module.exports = function (t, e) {
            return (t = t || window), (e = e || a(t)), n(e, t, t.document);
          })
        : (module.exports = n(a, window, window.document)))
    : (window.DataTable = n(jQuery, window, document));
})(function (V, q, _) {
  'use strict';
  function g(t) {
    var e = parseInt(t, 10);
    return !isNaN(e) && isFinite(t) ? e : null;
  }
  function o(t, e, n) {
    var a = typeof t,
      r = 'string' == a;
    return (
      'number' == a ||
      'bigint' == a ||
      !!y(t) ||
      (e && r && (t = R(t, e)),
      n && r && (t = t.replace(P, '')),
      !isNaN(parseFloat(t)) && isFinite(t))
    );
  }
  function l(t, e, n) {
    var a;
    return (
      !!y(t) ||
      (('string' != typeof t || !t.match(/<(input|select)/i)) &&
        (y((a = t)) || 'string' == typeof a) &&
        !!o(I(t), e, n)) ||
      null
    );
  }
  function m(t, e, n, a) {
    var r = [],
      o = 0,
      i = e.length;
    if (void 0 !== a) for (; o < i; o++) t[e[o]][n] && r.push(t[e[o]][n][a]);
    else for (; o < i; o++) t[e[o]] && r.push(t[e[o]][n]);
    return r;
  }
  function h(t, e) {
    var n,
      a = [];
    void 0 === e ? ((e = 0), (n = t)) : ((n = e), (e = t));
    for (var r = e; r < n; r++) a.push(r);
    return a;
  }
  function b(t) {
    for (var e = [], n = 0, a = t.length; n < a; n++) t[n] && e.push(t[n]);
    return e;
  }
  var C,
    U,
    e,
    t,
    $ = function (t, H) {
      var W, X, B;
      return $.factory(t, H)
        ? $
        : this instanceof $
        ? V(t).DataTable(H)
        : ((X = void 0 === (H = t)),
          (B = (W = this).length),
          X && (H = {}),
          (this.api = function () {
            return new U(this);
          }),
          this.each(function () {
            var n = 1 < B ? Zt({}, H, !0) : H,
              a = 0,
              t = this.getAttribute('id'),
              r = !1,
              e = $.defaults,
              o = V(this);
            if ('table' != this.nodeName.toLowerCase())
              Z(
                null,
                0,
                'Non-table node initialisation (' + this.nodeName + ')',
                2
              );
            else {
              V(this).trigger('options.dt', n),
                nt(e),
                at(e.column),
                z(e, e, !0),
                z(e.column, e.column, !0),
                z(e, V.extend(n, o.data()), !0);
              for (var i = $.settings, a = 0, l = i.length; a < l; a++) {
                var s = i[a];
                if (
                  s.nTable == this ||
                  (s.nTHead && s.nTHead.parentNode == this) ||
                  (s.nTFoot && s.nTFoot.parentNode == this)
                ) {
                  var E = (void 0 !== n.bRetrieve ? n : e).bRetrieve,
                    k = (void 0 !== n.bDestroy ? n : e).bDestroy;
                  if (X || E) return s.oInstance;
                  if (k) {
                    new $.Api(s).destroy();
                    break;
                  }
                  return void Z(s, 0, 'Cannot reinitialise DataTable', 3);
                }
                if (s.sTableId == this.id) {
                  i.splice(a, 1);
                  break;
                }
              }
              (null !== t && '' !== t) ||
                ((t = 'DataTables_Table_' + $.ext._unique++), (this.id = t));
              var u = V.extend(!0, {}, $.models.oSettings, {
                  sDestroyWidth: o[0].style.width,
                  sInstance: t,
                  sTableId: t,
                  colgroup: V('<colgroup>').prependTo(this),
                  fastData: function (t, e, n) {
                    return G(u, t, e, n);
                  },
                }),
                t =
                  ((u.nTable = this),
                  (u.oInit = n),
                  i.push(u),
                  (u.api = new U(u)),
                  (u.oInstance = 1 === W.length ? W : o.dataTable()),
                  nt(n),
                  n.aLengthMenu &&
                    !n.iDisplayLength &&
                    (n.iDisplayLength = Array.isArray(n.aLengthMenu[0])
                      ? n.aLengthMenu[0][0]
                      : V.isPlainObject(n.aLengthMenu[0])
                      ? n.aLengthMenu[0].value
                      : n.aLengthMenu[0]),
                  (n = Zt(V.extend(!0, {}, e), n)),
                  Q(u.oFeatures, n, [
                    'bPaginate',
                    'bLengthChange',
                    'bFilter',
                    'bSort',
                    'bSortMulti',
                    'bInfo',
                    'bProcessing',
                    'bAutoWidth',
                    'bSortClasses',
                    'bServerSide',
                    'bDeferRender',
                  ]),
                  Q(u, n, [
                    'ajax',
                    'fnFormatNumber',
                    'sServerMethod',
                    'aaSorting',
                    'aaSortingFixed',
                    'aLengthMenu',
                    'sPaginationType',
                    'iStateDuration',
                    'bSortCellsTop',
                    'iTabIndex',
                    'sDom',
                    'fnStateLoadCallback',
                    'fnStateSaveCallback',
                    'renderer',
                    'searchDelay',
                    'rowId',
                    'caption',
                    'layout',
                    ['iCookieDuration', 'iStateDuration'],
                    ['oSearch', 'oPreviousSearch'],
                    ['aoSearchCols', 'aoPreSearchCols'],
                    ['iDisplayLength', '_iDisplayLength'],
                  ]),
                  Q(u.oScroll, n, [
                    ['sScrollX', 'sX'],
                    ['sScrollXInner', 'sXInner'],
                    ['sScrollY', 'sY'],
                    ['bScrollCollapse', 'bCollapse'],
                  ]),
                  Q(u.oLanguage, n, 'fnInfoCallback'),
                  K(u, 'aoDrawCallback', n.fnDrawCallback),
                  K(u, 'aoStateSaveParams', n.fnStateSaveParams),
                  K(u, 'aoStateLoadParams', n.fnStateLoadParams),
                  K(u, 'aoStateLoaded', n.fnStateLoaded),
                  K(u, 'aoRowCallback', n.fnRowCallback),
                  K(u, 'aoRowCreatedCallback', n.fnCreatedRow),
                  K(u, 'aoHeaderCallback', n.fnHeaderCallback),
                  K(u, 'aoFooterCallback', n.fnFooterCallback),
                  K(u, 'aoInitComplete', n.fnInitComplete),
                  K(u, 'aoPreDrawCallback', n.fnPreDrawCallback),
                  (u.rowIdFn = J(n.rowId)),
                  u),
                c =
                  ($.__browser ||
                    ((P = {}),
                    ($.__browser = P),
                    (j = V('<div/>')
                      .css({
                        position: 'fixed',
                        top: 0,
                        left: -1 * q.pageXOffset,
                        height: 1,
                        width: 1,
                        overflow: 'hidden',
                      })
                      .append(
                        V('<div/>')
                          .css({
                            position: 'absolute',
                            top: 1,
                            left: 1,
                            width: 100,
                            overflow: 'scroll',
                          })
                          .append(
                            V('<div/>').css({ width: '100%', height: 10 })
                          )
                      )
                      .appendTo('body')),
                    (p = j.children()),
                    (O = p.children()),
                    (P.barWidth = p[0].offsetWidth - p[0].clientWidth),
                    (P.bScrollbarLeft = 1 !== Math.round(O.offset().left)),
                    j.remove()),
                  V.extend(t.oBrowser, $.__browser),
                  (t.oScroll.iBarWidth = $.__browser.barWidth),
                  u.oClasses),
                d =
                  (V.extend(c, $.ext.classes, n.oClasses),
                  o.addClass(c.table),
                  u.oFeatures.bPaginate || (n.iDisplayStart = 0),
                  void 0 === u.iInitDisplayStart &&
                    ((u.iInitDisplayStart = n.iDisplayStart),
                    (u._iDisplayStart = n.iDisplayStart)),
                  u.oLanguage),
                f =
                  (V.extend(!0, d, n.oLanguage),
                  d.sUrl
                    ? (V.ajax({
                        dataType: 'json',
                        url: d.sUrl,
                        success: function (t) {
                          z(e.oLanguage, t),
                            V.extend(!0, d, t, u.oInit.oLanguage),
                            tt(u, null, 'i18n', [u], !0),
                            Et(u);
                        },
                        error: function () {
                          Z(u, 0, 'i18n file loading error', 21), Et(u);
                        },
                      }),
                      (r = !0))
                    : tt(u, null, 'i18n', [u]),
                  []),
                h = this.getElementsByTagName('thead'),
                p = It(u, h[0]);
              if (n.aoColumns) f = n.aoColumns;
              else if (p.length)
                for (l = p[(a = 0)].length; a < l; a++) f.push(null);
              for (a = 0, l = f.length; a < l; a++) rt(u);
              var g,
                v,
                m,
                b,
                y,
                D,
                x,
                S = u,
                T = n.aoColumnDefs,
                w = f,
                M = p,
                _ = function (t, e) {
                  ot(u, t, e);
                },
                C = S.aoColumns;
              if (w)
                for (g = 0, v = w.length; g < v; g++)
                  w[g] && w[g].name && (C[g].sName = w[g].name);
              if (T)
                for (g = T.length - 1; 0 <= g; g--) {
                  var I =
                    void 0 !== (x = T[g]).target
                      ? x.target
                      : void 0 !== x.targets
                      ? x.targets
                      : x.aTargets;
                  for (
                    Array.isArray(I) || (I = [I]), m = 0, b = I.length;
                    m < b;
                    m++
                  ) {
                    var A = I[m];
                    if ('number' == typeof A && 0 <= A) {
                      for (; C.length <= A; ) rt(S);
                      _(A, x);
                    } else if ('number' == typeof A && A < 0)
                      _(C.length + A, x);
                    else if ('string' == typeof A)
                      for (y = 0, D = C.length; y < D; y++)
                        '_all' === A
                          ? _(y, x)
                          : -1 !== A.indexOf(':name')
                          ? C[y].sName === A.replace(':name', '') && _(y, x)
                          : M.forEach(function (t) {
                              t[y] &&
                                ((t = V(t[y].cell)),
                                A.match(/^[a-z][\w-]*$/i) && (A = '.' + A),
                                t.is(A)) &&
                                _(y, x);
                            });
                  }
                }
              if (w) for (g = 0, v = w.length; g < v; g++) _(g, w[g]);
              var L,
                F,
                N,
                j,
                P = o.children('tbody').find('tr').eq(0),
                R =
                  (P.length &&
                    ((L = function (t, e) {
                      return null !== t.getAttribute('data-' + e) ? e : null;
                    }),
                    V(P[0])
                      .children('th, td')
                      .each(function (t, e) {
                        var n,
                          a = u.aoColumns[t];
                        a || Z(u, 0, 'Incorrect column count', 18),
                          a.mData === t &&
                            ((n = L(e, 'sort') || L(e, 'order')),
                            (e = L(e, 'filter') || L(e, 'search')),
                            (null === n && null === e) ||
                              ((a.mData = {
                                _: t + '.display',
                                sort: null !== n ? t + '.@data-' + n : void 0,
                                type: null !== n ? t + '.@data-' + n : void 0,
                                filter: null !== e ? t + '.@data-' + e : void 0,
                              }),
                              (a._isArrayHost = !0),
                              ot(u, t)));
                      })),
                  u.oFeatures),
                O = function () {
                  if (void 0 === n.aaSorting) {
                    var t = u.aaSorting;
                    for (a = 0, l = t.length; a < l; a++)
                      t[a][1] = u.aoColumns[a].asSorting[0];
                  }
                  Yt(u),
                    K(u, 'aoDrawCallback', function () {
                      (u.bSorted || 'ssp' === et(u) || R.bDeferRender) && Yt(u);
                    });
                  var e = o.children('caption'),
                    e =
                      (u.caption &&
                        (e =
                          0 === e.length
                            ? V('<caption/>').appendTo(o)
                            : e).html(u.caption),
                      e.length &&
                        ((e[0]._captionSide = e.css('caption-side')),
                        (u.captionNode = e[0])),
                      0 === h.length && (h = V('<thead/>').appendTo(o)),
                      (u.nTHead = h[0]),
                      V('tr', h).addClass(c.thead.row),
                      o.children('tbody')),
                    e =
                      (0 === e.length && (e = V('<tbody/>').insertAfter(h)),
                      (u.nTBody = e[0]),
                      o.children('tfoot'));
                  if (
                    (0 === e.length && (e = V('<tfoot/>').appendTo(o)),
                    (u.nTFoot = e[0]),
                    V('tr', e).addClass(c.tfoot.row),
                    n.aaData)
                  )
                    for (a = 0; a < n.aaData.length; a++) Y(u, n.aaData[a]);
                  else 'dom' == et(u) && ut(u, V(u.nTBody).children('tr'));
                  (u.aiDisplay = u.aiDisplayMaster.slice()),
                    !(u.bInitialised = !0) === r && Et(u);
                };
              K(u, 'aoDrawCallback', Gt),
                n.bStateSave
                  ? ((R.bStateSave = !0),
                    (N = O),
                    (F = u).oFeatures.bStateSave
                      ? void 0 !==
                          (j = F.fnStateLoadCallback.call(
                            F.oInstance,
                            F,
                            function (t) {
                              Jt(F, t, N);
                            }
                          )) && Jt(F, j, N)
                      : N())
                  : O();
            }
          }),
          (W = null),
          this);
    },
    c =
      (($.ext = C =
        {
          buttons: {},
          classes: {},
          builder: '-source-',
          errMode: 'alert',
          feature: [],
          features: {},
          search: [],
          selector: { cell: [], column: [], row: [] },
          legacy: { ajax: null },
          pager: {},
          renderer: { pageButton: {}, header: {} },
          order: {},
          type: {
            className: {},
            detect: [],
            render: {},
            search: {},
            order: {},
          },
          _unique: 0,
          fnVersionCheck: $.fnVersionCheck,
          iApiIndex: 0,
          sVersion: $.version,
        }),
      V.extend(C, {
        afnFiltering: C.search,
        aTypes: C.type.detect,
        ofnSearch: C.type.search,
        oSort: C.type.order,
        afnSortData: C.order,
        aoFeatures: C.feature,
        oStdClasses: C.classes,
        oPagination: C.pager,
      }),
      V.extend($.ext.classes, {
        container: 'dt-container',
        empty: { row: 'dt-empty' },
        info: { container: 'dt-info' },
        length: { container: 'dt-length', select: 'dt-input' },
        order: {
          canAsc: 'dt-orderable-asc',
          canDesc: 'dt-orderable-desc',
          isAsc: 'dt-ordering-asc',
          isDesc: 'dt-ordering-desc',
          none: 'dt-orderable-none',
          position: 'sorting_',
        },
        processing: { container: 'dt-processing' },
        scrolling: {
          body: 'dt-scroll-body',
          container: 'dt-scroll',
          footer: { self: 'dt-scroll-foot', inner: 'dt-scroll-footInner' },
          header: { self: 'dt-scroll-head', inner: 'dt-scroll-headInner' },
        },
        search: { container: 'dt-search', input: 'dt-input' },
        table: 'dataTable',
        tbody: { cell: '', row: '' },
        thead: { cell: '', row: '' },
        tfoot: { cell: '', row: '' },
        paging: {
          active: 'current',
          button: 'dt-paging-button',
          container: 'dt-paging',
          disabled: 'disabled',
        },
      }),
      {}),
    d = /[\r\n\u2028]/g,
    L = /<([^>]*>)/g,
    F = Math.pow(2, 28),
    N =
      /^\d{2,4}[./-]\d{1,2}[./-]\d{1,2}([T ]{1}\d{1,2}[:.]\d{2}([.:]\d{2})?)?$/,
    j = new RegExp(
      '(\\' +
        [
          '/',
          '.',
          '*',
          '+',
          '?',
          '|',
          '(',
          ')',
          '[',
          ']',
          '{',
          '}',
          '\\',
          '$',
          '^',
          '-',
        ].join('|\\') +
        ')',
      'g'
    ),
    P = /['\u00A0,$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfkɃΞ]/gi,
    y = function (t) {
      return !t || !0 === t || '-' === t;
    },
    R = function (t, e) {
      return (
        c[e] || (c[e] = new RegExp(Pt(e), 'g')),
        'string' == typeof t && '.' !== e
          ? t.replace(/\./g, '').replace(c[e], '.')
          : t
      );
    },
    f = function (t, e, n) {
      var a = [],
        r = 0,
        o = t.length;
      if (void 0 !== n)
        for (; r < o; r++) t[r] && t[r][e] && a.push(t[r][e][n]);
      else for (; r < o; r++) t[r] && a.push(t[r][e]);
      return a;
    },
    I = function (t) {
      if (t.length > F) throw new Error('Exceeded max str len');
      var e;
      for (t = t.replace(L, ''); (t = (e = t).replace(/<script/i, '')) !== e; );
      return e;
    },
    u = function (t) {
      return 'string' == typeof (t = Array.isArray(t) ? t.join(',') : t)
        ? t
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
        : t;
    },
    O = function (t, e) {
      var n;
      return 'string' != typeof t
        ? t
        : (n = t.normalize('NFD')).length !== t.length
        ? (!0 === e ? t + ' ' : '') + n.replace(/[\u0300-\u036f]/g, '')
        : n;
    },
    x = function (t) {
      if (Array.from && Set) return Array.from(new Set(t));
      if (
        (function (t) {
          if (!(t.length < 2))
            for (
              var e = t.slice().sort(), n = e[0], a = 1, r = e.length;
              a < r;
              a++
            ) {
              if (e[a] === n) return !1;
              n = e[a];
            }
          return !0;
        })(t)
      )
        return t.slice();
      var e,
        n,
        a,
        r = [],
        o = t.length,
        i = 0;
      t: for (n = 0; n < o; n++) {
        for (e = t[n], a = 0; a < i; a++) if (r[a] === e) continue t;
        r.push(e), i++;
      }
      return r;
    },
    E = function (t, e) {
      if (Array.isArray(e)) for (var n = 0; n < e.length; n++) E(t, e[n]);
      else t.push(e);
      return t;
    };
  function D(e, t) {
    t &&
      t.split(' ').forEach(function (t) {
        t && e.classList.add(t);
      });
  }
  function k(e) {
    var n,
      a,
      r = {};
    V.each(e, function (t) {
      (n = t.match(/^([^A-Z]+?)([A-Z])/)) &&
        -1 !== 'a aa ai ao as b fn i m o s '.indexOf(n[1] + ' ') &&
        ((a = t.replace(n[0], n[2].toLowerCase())), (r[a] = t), 'o' === n[1]) &&
        k(e[t]);
    }),
      (e._hungarianMap = r);
  }
  function z(e, n, a) {
    var r;
    e._hungarianMap || k(e),
      V.each(n, function (t) {
        void 0 === (r = e._hungarianMap[t]) ||
          (!a && void 0 !== n[r]) ||
          ('o' === r.charAt(0)
            ? (n[r] || (n[r] = {}), V.extend(!0, n[r], n[t]), z(e[r], n[r], a))
            : (n[r] = n[t]));
      });
  }
  $.util = {
    diacritics: function (t, e) {
      if ('function' != typeof t) return O(t, e);
      O = t;
    },
    debounce: function (n, a) {
      var r;
      return function () {
        var t = this,
          e = arguments;
        clearTimeout(r),
          (r = setTimeout(function () {
            n.apply(t, e);
          }, a || 250));
      };
    },
    throttle: function (a, t) {
      var r,
        o,
        i = void 0 !== t ? t : 200;
      return function () {
        var t = this,
          e = +new Date(),
          n = arguments;
        r && e < r + i
          ? (clearTimeout(o),
            (o = setTimeout(function () {
              (r = void 0), a.apply(t, n);
            }, i)))
          : ((r = e), a.apply(t, n));
      };
    },
    escapeRegex: function (t) {
      return t.replace(j, '\\$1');
    },
    set: function (a) {
      var f;
      return V.isPlainObject(a)
        ? $.util.set(a._)
        : null === a
        ? function () {}
        : 'function' == typeof a
        ? function (t, e, n) {
            a(t, 'set', e, n);
          }
        : 'string' != typeof a ||
          (-1 === a.indexOf('.') &&
            -1 === a.indexOf('[') &&
            -1 === a.indexOf('('))
        ? function (t, e) {
            t[a] = e;
          }
        : ((f = function (t, e, n) {
            for (
              var a,
                r,
                o,
                i,
                l = ft(n),
                n = l[l.length - 1],
                s = 0,
                u = l.length - 1;
              s < u;
              s++
            ) {
              if ('__proto__' === l[s] || 'constructor' === l[s])
                throw new Error('Cannot set prototype values');
              if (((a = l[s].match(dt)), (r = l[s].match(p)), a)) {
                if (
                  ((l[s] = l[s].replace(dt, '')),
                  (t[l[s]] = []),
                  (a = l.slice()).splice(0, s + 1),
                  (i = a.join('.')),
                  Array.isArray(e))
                )
                  for (var c = 0, d = e.length; c < d; c++)
                    f((o = {}), e[c], i), t[l[s]].push(o);
                else t[l[s]] = e;
                return;
              }
              r && ((l[s] = l[s].replace(p, '')), (t = t[l[s]](e))),
                (null !== t[l[s]] && void 0 !== t[l[s]]) || (t[l[s]] = {}),
                (t = t[l[s]]);
            }
            n.match(p) ? t[n.replace(p, '')](e) : (t[n.replace(dt, '')] = e);
          }),
          function (t, e) {
            return f(t, e, a);
          });
    },
    get: function (r) {
      var o, f;
      return V.isPlainObject(r)
        ? ((o = {}),
          V.each(r, function (t, e) {
            e && (o[t] = $.util.get(e));
          }),
          function (t, e, n, a) {
            var r = o[e] || o._;
            return void 0 !== r ? r(t, e, n, a) : t;
          })
        : null === r
        ? function (t) {
            return t;
          }
        : 'function' == typeof r
        ? function (t, e, n, a) {
            return r(t, e, n, a);
          }
        : 'string' != typeof r ||
          (-1 === r.indexOf('.') &&
            -1 === r.indexOf('[') &&
            -1 === r.indexOf('('))
        ? function (t) {
            return t[r];
          }
        : ((f = function (t, e, n) {
            var a, r, o;
            if ('' !== n)
              for (var i = ft(n), l = 0, s = i.length; l < s; l++) {
                if (((d = i[l].match(dt)), (a = i[l].match(p)), d)) {
                  if (
                    ((i[l] = i[l].replace(dt, '')),
                    '' !== i[l] && (t = t[i[l]]),
                    (r = []),
                    i.splice(0, l + 1),
                    (o = i.join('.')),
                    Array.isArray(t))
                  )
                    for (var u = 0, c = t.length; u < c; u++)
                      r.push(f(t[u], e, o));
                  var d = d[0].substring(1, d[0].length - 1);
                  t = '' === d ? r : r.join(d);
                  break;
                }
                if (a) (i[l] = i[l].replace(p, '')), (t = t[i[l]]());
                else {
                  if (null === t || null === t[i[l]]) return null;
                  if (void 0 === t || void 0 === t[i[l]]) return;
                  t = t[i[l]];
                }
              }
            return t;
          }),
          function (t, e) {
            return f(t, e, r);
          });
    },
    stripHtml: function (t) {
      var e = typeof t;
      if ('function' != e) return 'string' == e ? I(t) : t;
      I = t;
    },
    escapeHtml: function (t) {
      var e = typeof t;
      if ('function' != e) return 'string' == e || Array.isArray(t) ? u(t) : t;
      u = t;
    },
    unique: x,
  };
  var r = function (t, e, n) {
    void 0 !== t[e] && (t[n] = t[e]);
  };
  function nt(t) {
    r(t, 'ordering', 'bSort'),
      r(t, 'orderMulti', 'bSortMulti'),
      r(t, 'orderClasses', 'bSortClasses'),
      r(t, 'orderCellsTop', 'bSortCellsTop'),
      r(t, 'order', 'aaSorting'),
      r(t, 'orderFixed', 'aaSortingFixed'),
      r(t, 'paging', 'bPaginate'),
      r(t, 'pagingType', 'sPaginationType'),
      r(t, 'pageLength', 'iDisplayLength'),
      r(t, 'searching', 'bFilter'),
      'boolean' == typeof t.sScrollX && (t.sScrollX = t.sScrollX ? '100%' : ''),
      'boolean' == typeof t.scrollX && (t.scrollX = t.scrollX ? '100%' : '');
    var e = t.aoSearchCols;
    if (e)
      for (var n = 0, a = e.length; n < a; n++)
        e[n] && z($.models.oSearch, e[n]);
    t.serverSide && !t.searchDelay && (t.searchDelay = 400);
  }
  function at(t) {
    r(t, 'orderable', 'bSortable'),
      r(t, 'orderData', 'aDataSort'),
      r(t, 'orderSequence', 'asSorting'),
      r(t, 'orderDataType', 'sortDataType');
    var e = t.aDataSort;
    'number' != typeof e || Array.isArray(e) || (t.aDataSort = [e]);
  }
  function rt(t) {
    var e = $.defaults.column,
      n = t.aoColumns.length,
      e = V.extend({}, $.models.oColumn, e, {
        aDataSort: e.aDataSort || [n],
        mData: e.mData || n,
        idx: n,
        searchFixed: {},
        colEl: V('<col>').attr('data-dt-column', n),
      }),
      e = (t.aoColumns.push(e), t.aoPreSearchCols);
    e[n] = V.extend({}, $.models.oSearch, e[n]);
  }
  function ot(t, e, n) {
    function a(t) {
      return 'string' == typeof t && -1 !== t.indexOf('@');
    }
    var r = t.aoColumns[e],
      o =
        (null != n &&
          (at(n),
          z($.defaults.column, n, !0),
          void 0 === n.mDataProp || n.mData || (n.mData = n.mDataProp),
          n.sType && (r._sManualType = n.sType),
          n.className && !n.sClass && (n.sClass = n.className),
          (e = r.sClass),
          V.extend(r, n),
          Q(r, n, 'sWidth', 'sWidthOrig'),
          e !== r.sClass && (r.sClass = e + ' ' + r.sClass),
          void 0 !== n.iDataSort && (r.aDataSort = [n.iDataSort]),
          Q(r, n, 'aDataSort')),
        r.mData),
      i = J(o);
    r.mRender &&
      Array.isArray(r.mRender) &&
      ((n = (e = r.mRender.slice()).shift()),
      (r.mRender = $.render[n].apply(q, e))),
      (r._render = r.mRender ? J(r.mRender) : null);
    (r._bAttrSrc =
      V.isPlainObject(o) && (a(o.sort) || a(o.type) || a(o.filter))),
      (r._setter = null),
      (r.fnGetData = function (t, e, n) {
        var a = i(t, e, void 0, n);
        return r._render && e ? r._render(a, e, t, n) : a;
      }),
      (r.fnSetData = function (t, e, n) {
        return v(o)(t, e, n);
      }),
      'number' == typeof o || r._isArrayHost || (t._rowReadObject = !0),
      t.oFeatures.bSort || (r.bSortable = !1);
  }
  function M(t) {
    var e = t;
    if (e.oFeatures.bAutoWidth) {
      var n,
        a,
        r = e.nTable,
        o = e.aoColumns,
        i = e.oScroll,
        l = i.sY,
        s = i.sX,
        i = i.sXInner,
        u = X(e, 'bVisible'),
        c = r.getAttribute('width'),
        d = r.parentNode,
        f = r.style.width,
        f =
          (f && -1 !== f.indexOf('%') && (c = f),
          tt(e, null, 'column-calc', { visible: u }, !1),
          V(r.cloneNode()).css('visibility', 'hidden').removeAttr('id')),
        h = (f.append('<tbody>'), V('<tr/>').appendTo(f.find('tbody')));
      for (
        f.append(V(e.nTHead).clone()).append(V(e.nTFoot).clone()),
          f.find('tfoot th, tfoot td').css('width', ''),
          f.find('thead th, thead td').each(function () {
            var t = lt(e, this, !0, !1);
            t
              ? ((this.style.width = t),
                s &&
                  V(this).append(
                    V('<div/>').css({
                      width: t,
                      margin: 0,
                      padding: 0,
                      border: 0,
                      height: 1,
                    })
                  ))
              : (this.style.width = '');
          }),
          n = 0;
        n < u.length;
        n++
      ) {
        (p = u[n]), (a = o[p]);
        var p = (function (t, e) {
            var n = t.aoColumns[e];
            if (!n.maxLenString) {
              for (
                var a, r = '', o = -1, i = 0, l = t.aiDisplayMaster.length;
                i < l;
                i++
              ) {
                var s = t.aiDisplayMaster[i],
                  s = mt(t, s)[e],
                  s =
                    s && 'object' == typeof s && s.nodeType
                      ? s.innerHTML
                      : s + '';
                (s = s.replace(/id=".*?"/g, '').replace(/name=".*?"/g, '')),
                  (a = I(s).replace(/&nbsp;/g, ' ')).length > o &&
                    ((r = s), (o = a.length));
              }
              n.maxLenString = r;
            }
            return n.maxLenString;
          })(e, p),
          g = C.type.className[a.sType],
          v = p + a.sContentPadding,
          p = -1 === p.indexOf('<') ? _.createTextNode(v) : v;
        V('<td/>').addClass(g).addClass(a.sClass).append(p).appendTo(h);
      }
      V('[name]', f).removeAttr('name');
      var m = V('<div/>')
          .css(
            s || l
              ? {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: 1,
                  right: 0,
                  overflow: 'hidden',
                }
              : {}
          )
          .append(f)
          .appendTo(d),
        b =
          (s && i
            ? f.width(i)
            : s
            ? (f.css('width', 'auto'),
              f.removeAttr('width'),
              f.width() < d.clientWidth && c && f.width(d.clientWidth))
            : l
            ? f.width(d.clientWidth)
            : c && f.width(c),
          0),
        y = f.find('tbody tr').eq(0).children();
      for (n = 0; n < u.length; n++) {
        var D = y[n].getBoundingClientRect().width;
        (b += D), (o[u[n]].sWidth = A(D));
      }
      (r.style.width = A(b)),
        m.remove(),
        c && (r.style.width = A(c)),
        (!c && !s) ||
          e._reszEvt ||
          (V(q).on(
            'resize.DT-' + e.sInstance,
            $.util.throttle(function () {
              e.bDestroying || M(e);
            })
          ),
          (e._reszEvt = !0));
    }
    for (var x = t, S = x.aoColumns, T = 0; T < S.length; T++) {
      var w = lt(x, [T], !1, !1);
      S[T].colEl.css('width', w);
    }
    i = t.oScroll;
    ('' === i.sY && '' === i.sX) || Xt(t), tt(t, null, 'column-sizing', [t]);
  }
  function H(t, e) {
    t = X(t, 'bVisible');
    return 'number' == typeof t[e] ? t[e] : null;
  }
  function T(t, e) {
    t = X(t, 'bVisible').indexOf(e);
    return -1 !== t ? t : null;
  }
  function W(t) {
    var e = t.aoHeader,
      n = t.aoColumns,
      a = 0;
    if (e.length)
      for (var r = 0, o = e[0].length; r < o; r++)
        n[r].bVisible && 'none' !== V(e[0][r].cell).css('display') && a++;
    return a;
  }
  function X(t, n) {
    var a = [];
    return (
      t.aoColumns.map(function (t, e) {
        t[n] && a.push(e);
      }),
      a
    );
  }
  function B(t) {
    for (
      var e,
        n,
        a,
        r,
        o,
        i,
        l,
        s = t.aoColumns,
        u = t.aoData,
        c = $.ext.type.detect,
        d = 0,
        f = s.length;
      d < f;
      d++
    ) {
      if (((l = []), !(o = s[d]).sType && o._sManualType))
        o.sType = o._sManualType;
      else if (!o.sType) {
        for (e = 0, n = c.length; e < n; e++) {
          for (a = 0, r = u.length; a < r; a++)
            if (u[a]) {
              if (
                (void 0 === l[a] && (l[a] = G(t, a, d, 'type')),
                !(i = c[e](l[a], t)) && e !== c.length - 2)
              )
                break;
              if ('html' === i && !y(l[a])) break;
            }
          if (i) {
            o.sType = i;
            break;
          }
        }
        o.sType || (o.sType = 'string');
      }
      var h = C.type.className[o.sType],
        h =
          (h && (it(t.aoHeader, d, h), it(t.aoFooter, d, h)),
          C.type.render[o.sType]);
      if (h && !o._render) {
        (o._render = $.util.get(h)), (p = b = m = v = g = void 0);
        for (var p, g = t, v = d, m = g.aoData, b = 0; b < m.length; b++)
          m[b].nTr &&
            ((p = G(g, b, v, 'display')),
            (m[b].displayData[v] = p),
            ct(m[b].anCells[v], p));
      }
    }
  }
  function it(t, e, n) {
    t.forEach(function (t) {
      t[e] && t[e].unique && D(t[e].cell, n);
    });
  }
  function lt(t, e, n, a) {
    Array.isArray(e) || (e = st(e));
    for (var r, o = 0, i = t.aoColumns, l = 0, s = e.length; l < s; l++) {
      var u = i[e[l]],
        c = n ? u.sWidthOrig : u.sWidth;
      if (a || !1 !== u.bVisible) {
        if (null == c) return null;
        'number' == typeof c
          ? ((r = 'px'), (o += c))
          : (u = c.match(/([\d\.]+)([^\d]*)/)) &&
            ((o += +u[1]), (r = 3 === u.length ? u[2] : 'px'));
      }
    }
    return o + r;
  }
  function st(t) {
    t = V(t).closest('[data-dt-column]').attr('data-dt-column');
    return t
      ? t.split(',').map(function (t) {
          return +t;
        })
      : [];
  }
  function Y(t, e, n, a) {
    for (
      var r = t.aoData.length,
        o = V.extend(!0, {}, $.models.oRow, {
          src: n ? 'dom' : 'data',
          idx: r,
        }),
        i = ((o._aData = e), t.aoData.push(o), t.aoColumns),
        l = 0,
        s = i.length;
      l < s;
      l++
    )
      i[l].sType = null;
    t.aiDisplayMaster.push(r);
    e = t.rowIdFn(e);
    return (
      void 0 !== e && (t.aIds[e] = o),
      (!n && t.oFeatures.bDeferRender) || bt(t, r, n, a),
      r
    );
  }
  function ut(n, t) {
    var a;
    return (t = t instanceof V ? t : V(t)).map(function (t, e) {
      return (a = vt(n, e)), Y(n, a.data, e, a.cells);
    });
  }
  function G(t, e, n, a) {
    'search' === a ? (a = 'filter') : 'order' === a && (a = 'sort');
    var r = t.aoData[e];
    if (r) {
      var o = t.iDraw,
        i = t.aoColumns[n],
        r = r._aData,
        l = i.sDefaultContent,
        s = i.fnGetData(r, a, { settings: t, row: e, col: n });
      if (
        void 0 ===
        (s =
          'display' !== a && s && 'object' == typeof s && s.nodeName
            ? s.innerHTML
            : s)
      )
        return (
          t.iDrawError != o &&
            null === l &&
            (Z(
              t,
              0,
              'Requested unknown parameter ' +
                ('function' == typeof i.mData
                  ? '{function}'
                  : "'" + i.mData + "'") +
                ' for row ' +
                e +
                ', column ' +
                n,
              4
            ),
            (t.iDrawError = o)),
          l
        );
      if ((s !== r && null !== s) || null === l || void 0 === a) {
        if ('function' == typeof s) return s.call(r);
      } else s = l;
      return null === s && 'display' === a
        ? ''
        : (s =
            'filter' === a && (e = $.ext.type.search)[i.sType]
              ? e[i.sType](s)
              : s);
    }
  }
  function ct(t, e) {
    e && 'object' == typeof e && e.nodeName
      ? V(t).empty().append(e)
      : (t.innerHTML = e);
  }
  var dt = /\[.*?\]$/,
    p = /\(\)$/;
  function ft(t) {
    return (t.match(/(\\.|[^.])+/g) || ['']).map(function (t) {
      return t.replace(/\\\./g, '.');
    });
  }
  var J = $.util.get,
    v = $.util.set;
  function ht(t) {
    return f(t.aoData, '_aData');
  }
  function pt(t) {
    (t.aoData.length = 0),
      (t.aiDisplayMaster.length = 0),
      (t.aiDisplay.length = 0),
      (t.aIds = {});
  }
  function gt(t, e, n, a) {
    var r,
      o,
      i = t.aoData[e];
    if (
      ((i._aSortData = null),
      (i._aFilterData = null),
      (i.displayData = null),
      'dom' !== n && ((n && 'auto' !== n) || 'dom' !== i.src))
    ) {
      var l = i.anCells,
        s = mt(t, e);
      if (l)
        if (void 0 !== a) ct(l[a], s[a]);
        else for (r = 0, o = l.length; r < o; r++) ct(l[r], s[r]);
    } else i._aData = vt(t, i, a, void 0 === a ? void 0 : i._aData).data;
    var u = t.aoColumns;
    if (void 0 !== a) (u[a].sType = null), (u[a].maxLenString = null);
    else {
      for (r = 0, o = u.length; r < o; r++)
        (u[r].sType = null), (u[r].maxLenString = null);
      yt(t, i);
    }
  }
  function vt(t, e, n, a) {
    function r(t, e) {
      var n;
      'string' == typeof t &&
        -1 !== (n = t.indexOf('@')) &&
        ((n = t.substring(n + 1)), v(t)(a, e.getAttribute(n)));
    }
    function o(t) {
      (void 0 !== n && n !== d) ||
        ((l = f[d]),
        (s = t.innerHTML.trim()),
        l && l._bAttrSrc
          ? (v(l.mData._)(a, s),
            r(l.mData.sort, t),
            r(l.mData.type, t),
            r(l.mData.filter, t))
          : h
          ? (l._setter || (l._setter = v(l.mData)), l._setter(a, s))
          : (a[d] = s)),
        d++;
    }
    var i,
      l,
      s,
      u = [],
      c = e.firstChild,
      d = 0,
      f = t.aoColumns,
      h = t._rowReadObject;
    a = void 0 !== a ? a : h ? {} : [];
    if (c)
      for (; c; )
        ('TD' != (i = c.nodeName.toUpperCase()) && 'TH' != i) ||
          (o(c), u.push(c)),
          (c = c.nextSibling);
    else for (var p = 0, g = (u = e.anCells).length; p < g; p++) o(u[p]);
    var e = e.firstChild ? e : e.nTr;
    return (
      e && (e = e.getAttribute('id')) && v(t.rowId)(a, e), { data: a, cells: u }
    );
  }
  function mt(t, e) {
    var n = t.aoData[e],
      a = t.aoColumns;
    if (!n.displayData) {
      n.displayData = [];
      for (var r = 0, o = a.length; r < o; r++)
        n.displayData.push(G(t, e, r, 'display'));
    }
    return n.displayData;
  }
  function bt(t, e, n, a) {
    var r,
      o,
      i,
      l,
      s,
      u,
      c = t.aoData[e],
      d = c._aData,
      f = [],
      h = t.oClasses.tbody.row;
    if (null === c.nTr) {
      for (
        r = n || _.createElement('tr'),
          c.nTr = r,
          c.anCells = f,
          D(r, h),
          r._DT_RowIndex = e,
          yt(t, c),
          l = 0,
          s = t.aoColumns.length;
        l < s;
        l++
      ) {
        (i = t.aoColumns[l]),
          (o = (u = !n || !a[l]) ? _.createElement(i.sCellType) : a[l]) ||
            Z(t, 0, 'Incorrect column count', 18),
          (o._DT_CellIndex = { row: e, column: l }),
          f.push(o);
        var p = mt(t, e);
        (!u &&
          ((!i.mRender && i.mData === l) ||
            (V.isPlainObject(i.mData) && i.mData._ === l + '.display'))) ||
          ct(o, p[l]),
          i.bVisible && u
            ? r.appendChild(o)
            : i.bVisible || u || o.parentNode.removeChild(o),
          i.fnCreatedCell &&
            i.fnCreatedCell.call(t.oInstance, o, G(t, e, l), d, e, l);
      }
      tt(t, 'aoRowCreatedCallback', 'row-created', [r, d, e, f]);
    } else D(c.nTr, h);
  }
  function yt(t, e) {
    var n = e.nTr,
      a = e._aData;
    n &&
      ((t = t.rowIdFn(a)) && (n.id = t),
      a.DT_RowClass &&
        ((t = a.DT_RowClass.split(' ')),
        (e.__rowc = e.__rowc ? x(e.__rowc.concat(t)) : t),
        V(n).removeClass(e.__rowc.join(' ')).addClass(a.DT_RowClass)),
      a.DT_RowAttr && V(n).attr(a.DT_RowAttr),
      a.DT_RowData) &&
      V(n).data(a.DT_RowData);
  }
  function Dt(t, e) {
    var n,
      a = t.oClasses,
      r = t.aoColumns,
      o = 'header' === e ? t.nTHead : t.nTFoot,
      i = 'header' === e ? 'sTitle' : e;
    if (o) {
      if (
        ('header' === e || f(t.aoColumns, i).join('')) &&
        1 === (n = (n = V('tr', o)).length ? n : V('<tr/>').appendTo(o)).length
      )
        for (var l = V('td, th', n).length, s = r.length; l < s; l++)
          V('<th/>')
            .html(r[l][i] || '')
            .appendTo(n);
      var u = It(t, o, !0);
      'header' === e ? (t.aoHeader = u) : (t.aoFooter = u),
        V(o).children('tr').attr('role', 'row'),
        V(o)
          .children('tr')
          .children('th, td')
          .each(function () {
            te(t, e)(t, V(this), a);
          });
    }
  }
  function xt(t, e, n) {
    var a,
      r,
      o,
      i,
      l,
      s = [],
      u = [],
      c = t.aoColumns,
      t = c.length;
    if (e) {
      for (
        n =
          n ||
          h(t).filter(function (t) {
            return c[t].bVisible;
          }),
          a = 0;
        a < e.length;
        a++
      )
        (s[a] = e[a].slice().filter(function (t, e) {
          return n.includes(e);
        })),
          u.push([]);
      for (a = 0; a < s.length; a++)
        for (r = 0; r < s[a].length; r++)
          if (((l = i = 1), void 0 === u[a][r])) {
            for (
              o = s[a][r].cell;
              void 0 !== s[a + i] && s[a][r].cell == s[a + i][r].cell;

            )
              (u[a + i][r] = null), i++;
            for (
              ;
              void 0 !== s[a][r + l] && s[a][r].cell == s[a][r + l].cell;

            ) {
              for (var d = 0; d < i; d++) u[a + d][r + l] = null;
              l++;
            }
            var f = V('span.dt-column-title', o);
            u[a][r] = {
              cell: o,
              colspan: l,
              rowspan: i,
              title: (f.length ? f : V(o)).html(),
            };
          }
      return u;
    }
  }
  function St(t, e) {
    for (var n, a, r = xt(t, e), o = 0; o < e.length; o++) {
      if ((n = e[o].row)) for (; (a = n.firstChild); ) n.removeChild(a);
      for (var i = 0; i < r[o].length; i++) {
        var l = r[o][i];
        l &&
          V(l.cell)
            .appendTo(n)
            .attr('rowspan', l.rowspan)
            .attr('colspan', l.colspan);
      }
    }
  }
  function S(t, e) {
    if (
      ((r = 'ssp' == et((s = t))),
      void 0 !== (i = s.iInitDisplayStart) &&
        -1 !== i &&
        ((s._iDisplayStart = !r && i >= s.fnRecordsDisplay() ? 0 : i),
        (s.iInitDisplayStart = -1)),
      -1 !== tt(t, 'aoPreDrawCallback', 'preDraw', [t]).indexOf(!1))
    )
      w(t, !1);
    else {
      var l,
        n = [],
        a = 0,
        r = 'ssp' == et(t),
        o = t.aiDisplay,
        i = t._iDisplayStart,
        s = t.fnDisplayEnd(),
        u = t.aoColumns,
        c = V(t.nTBody);
      if (((t.bDrawing = !0), r)) {
        if (!t.bDestroying && !e)
          return (
            0 === t.iDraw && c.empty().append(Tt(t)),
            (l = t).iDraw++,
            w(l, !0),
            void At(
              l,
              (function (e) {
                function n(t, e) {
                  return 'function' == typeof a[t][e] ? 'function' : a[t][e];
                }
                var a = e.aoColumns,
                  t = e.oFeatures,
                  r = e.oPreviousSearch,
                  o = e.aoPreSearchCols;
                return {
                  draw: e.iDraw,
                  columns: a.map(function (e, t) {
                    return {
                      data: n(t, 'mData'),
                      name: e.sName,
                      searchable: e.bSearchable,
                      orderable: e.bSortable,
                      search: {
                        value: o[t].search,
                        regex: o[t].regex,
                        fixed: Object.keys(e.searchFixed).map(function (t) {
                          return { name: t, term: e.searchFixed[t].toString() };
                        }),
                      },
                    };
                  }),
                  order: $t(e).map(function (t) {
                    return {
                      column: t.col,
                      dir: t.dir,
                      name: n(t.col, 'sName'),
                    };
                  }),
                  start: e._iDisplayStart,
                  length: t.bPaginate ? e._iDisplayLength : -1,
                  search: {
                    value: r.search,
                    regex: r.regex,
                    fixed: Object.keys(e.searchFixed).map(function (t) {
                      return { name: t, term: e.searchFixed[t].toString() };
                    }),
                  },
                };
              })(l),
              function (t) {
                var e = l,
                  n = Lt(e, (t = t)),
                  a = Ft(e, 'draw', t),
                  r = Ft(e, 'recordsTotal', t),
                  t = Ft(e, 'recordsFiltered', t);
                if (void 0 !== a) {
                  if (+a < e.iDraw) return;
                  e.iDraw = +a;
                }
                (n = n || []),
                  pt(e),
                  (e._iRecordsTotal = parseInt(r, 10)),
                  (e._iRecordsDisplay = parseInt(t, 10));
                for (var o = 0, i = n.length; o < i; o++) Y(e, n[o]);
                (e.aiDisplay = e.aiDisplayMaster.slice()),
                  S(e, !0),
                  kt(e),
                  w(e, !1);
              }
            )
          );
      } else t.iDraw++;
      if (0 !== o.length)
        for (var d = r ? t.aoData.length : s, f = r ? 0 : i; f < d; f++) {
          for (
            var h = o[f],
              p = t.aoData[h],
              g = (null === p.nTr && bt(t, h), p.nTr),
              v = 0;
            v < u.length;
            v++
          ) {
            var m = u[v],
              b = p.anCells[v];
            D(b, C.type.className[m.sType]),
              D(b, m.sClass),
              D(b, t.oClasses.tbody.cell);
          }
          tt(t, 'aoRowCallback', null, [g, p._aData, a, f, h]), n.push(g), a++;
        }
      else n[0] = Tt(t);
      tt(t, 'aoHeaderCallback', 'header', [
        V(t.nTHead).children('tr')[0],
        ht(t),
        i,
        s,
        o,
      ]),
        tt(t, 'aoFooterCallback', 'footer', [
          V(t.nTFoot).children('tr')[0],
          ht(t),
          i,
          s,
          o,
        ]),
        c[0].replaceChildren
          ? c[0].replaceChildren.apply(c[0], n)
          : (c.children().detach(), c.append(V(n))),
        V(t.nTableWrapper).toggleClass(
          'dt-empty-footer',
          0 === V('tr', t.nTFoot).length
        ),
        tt(t, 'aoDrawCallback', 'draw', [t], !0),
        (t.bSorted = !1),
        (t.bFiltered = !1),
        (t.bDrawing = !1);
    }
  }
  function s(t, e, n) {
    var a = t.oFeatures,
      r = a.bSort,
      a = a.bFilter;
    (void 0 !== n && !0 !== n) ||
      (r && zt(t),
      a ? Nt(t, t.oPreviousSearch) : (t.aiDisplay = t.aiDisplayMaster.slice())),
      !0 !== e && (t._iDisplayStart = 0),
      (t._drawHold = e),
      S(t),
      (t._drawHold = !1);
  }
  function Tt(t) {
    var e = t.oLanguage,
      n = e.sZeroRecords,
      a = et(t);
    return (
      (t.iDraw < 1 && 'ssp' === a) || (t.iDraw <= 1 && 'ajax' === a)
        ? (n = e.sLoadingRecords)
        : e.sEmptyTable && 0 === t.fnRecordsTotal() && (n = e.sEmptyTable),
      V('<tr/>').append(
        V('<td />', { colSpan: W(t), class: t.oClasses.empty.row }).html(n)
      )[0]
    );
  }
  function wt(t, e, n) {
    for (
      var i = {},
        a =
          (V.each(e, function (t, e) {
            if (null !== e) {
              var t = t.replace(/([A-Z])/g, ' $1').split(' '),
                n =
                  (i[t[0]] || (i[t[0]] = {}),
                  1 === t.length ? 'full' : t[1].toLowerCase()),
                a = i[t[0]],
                r = function (e, n) {
                  V.isPlainObject(n)
                    ? Object.keys(n).map(function (t) {
                        e.push({ feature: t, opts: n[t] });
                      })
                    : e.push(n);
                };
              if (
                ((a[n] && a[n].contents) || (a[n] = { contents: [] }),
                Array.isArray(e))
              )
                for (var o = 0; o < e.length; o++) r(a[n].contents, e[o]);
              else r(a[n].contents, e);
              Array.isArray(a[n].contents) || (a[n].contents = [a[n].contents]);
            }
          }),
          Object.keys(i)
            .map(function (t) {
              return 0 !== t.indexOf(n) ? null : { name: t, val: i[t] };
            })
            .filter(function (t) {
              return null !== t;
            })),
        r =
          (a.sort(function (t, e) {
            t = +t.name.replace(/[^0-9]/g, '');
            return +e.name.replace(/[^0-9]/g, '') - t;
          }),
          'bottom' === n && a.reverse(),
          []),
        o = 0,
        l = a.length;
      o < l;
      o++
    )
      a[o].val.full &&
        (r.push({ full: a[o].val.full }),
        _t(t, r[r.length - 1]),
        delete a[o].val.full),
        Object.keys(a[o].val).length &&
          (r.push(a[o].val), _t(t, r[r.length - 1]));
    return r;
  }
  function _t(o, i) {
    function l(t, e) {
      return (
        C.features[t] || Z(o, 0, 'Unknown feature: ' + t),
        C.features[t].apply(this, [o, e])
      );
    }
    V.each(i, function (t) {
      for (var e, n = i[t].contents, a = 0, r = n.length; a < r; a++)
        n[a] &&
          ('string' == typeof n[a]
            ? (n[a] = l(n[a], null))
            : V.isPlainObject(n[a])
            ? (n[a] = l(n[a].feature, n[a].opts))
            : 'function' == typeof n[a].node
            ? (n[a] = n[a].node(o))
            : 'function' == typeof n[a] &&
              ((e = n[a](o)),
              (n[a] = 'function' == typeof e.node ? e.node() : e)));
    });
  }
  function Ct(e) {
    var a,
      t = e.oClasses,
      n = V(e.nTable),
      r = V('<div/>')
        .attr({ id: e.sTableId + '_wrapper', class: t.container })
        .insertBefore(n);
    if (((e.nTableWrapper = r[0]), e.sDom))
      for (
        var o,
          i,
          l,
          s,
          u,
          c,
          d = e,
          t = e.sDom,
          f = r,
          h = t.match(/(".*?")|('.*?')|./g),
          p = 0;
        p < h.length;
        p++
      )
        (o = null),
          '<' == (i = h[p])
            ? ((l = V('<div/>')),
              ("'" != (s = h[p + 1])[0] && '"' != s[0]) ||
                ((s = s.replace(/['"]/g, '')),
                (u = ''),
                -1 != s.indexOf('.')
                  ? ((c = s.split('.')), (u = c[0]), (c = c[1]))
                  : '#' == s[0]
                  ? (u = s)
                  : (c = s),
                l.attr('id', u.substring(1)).addClass(c),
                p++),
              f.append(l),
              (f = l))
            : '>' == i
            ? (f = f.parent())
            : 't' == i
            ? (o = Wt(d))
            : $.ext.feature.forEach(function (t) {
                i == t.cFeature && (o = t.fnInit(d));
              }),
          o && f.append(o);
    else {
      var n = wt(e, e.layout, 'top'),
        t = wt(e, e.layout, 'bottom'),
        g = te(e, 'layout');
      n.forEach(function (t) {
        g(e, r, t);
      }),
        g(e, r, { full: { table: !0, contents: [Wt(e)] } }),
        t.forEach(function (t) {
          g(e, r, t);
        });
    }
    var n = e,
      t = n.nTable,
      v = '' !== n.oScroll.sX || '' !== n.oScroll.sY;
    n.oFeatures.bProcessing &&
      ((a = V('<div/>', {
        id: n.sTableId + '_processing',
        class: n.oClasses.processing.container,
        role: 'status',
      })
        .html(n.oLanguage.sProcessing)
        .append('<div><div></div><div></div><div></div><div></div></div>')),
      v ? a.prependTo(V('div.dt-scroll', n.nTableWrapper)) : a.insertBefore(t),
      V(t).on('processing.dt.DT', function (t, e, n) {
        a.css('display', n ? 'block' : 'none');
      }));
  }
  function It(t, e, n) {
    for (
      var a,
        r,
        o,
        i,
        l,
        s,
        u = t.aoColumns,
        c = V(e).children('tr'),
        d = e && 'thead' === e.nodeName.toLowerCase(),
        f = [],
        h = 0,
        p = c.length;
      h < p;
      h++
    )
      f.push([]);
    for (h = 0, p = c.length; h < p; h++)
      for (r = (a = c[h]).firstChild; r; ) {
        if (
          'TD' == r.nodeName.toUpperCase() ||
          'TH' == r.nodeName.toUpperCase()
        ) {
          var g,
            v,
            m,
            b,
            y,
            D = [];
          for (
            b = (b = +r.getAttribute('colspan')) && 0 != b && 1 != b ? b : 1,
              y = (y = +r.getAttribute('rowspan')) && 0 != y && 1 != y ? y : 1,
              l = (function (t, e, n) {
                for (var a = t[e]; a[n]; ) n++;
                return n;
              })(f, h, 0),
              s = 1 == b,
              n &&
                (s &&
                  (ot(t, l, V(r).data()),
                  (g = u[l]),
                  (v = r.getAttribute('width') || null),
                  (m = r.style.width.match(/width:\s*(\d+[pxem%]+)/)) &&
                    (v = m[1]),
                  (g.sWidthOrig = g.sWidth || v),
                  d
                    ? (null === g.sTitle ||
                        g.autoTitle ||
                        (r.innerHTML = g.sTitle),
                      !g.sTitle &&
                        s &&
                        ((g.sTitle = I(r.innerHTML)), (g.autoTitle = !0)))
                    : g.footer && (r.innerHTML = g.footer),
                  g.ariaTitle ||
                    (g.ariaTitle = V(r).attr('aria-label') || g.sTitle),
                  g.className) &&
                  V(r).addClass(g.className),
                0 === V('span.dt-column-title', r).length &&
                  V('<span>')
                    .addClass('dt-column-title')
                    .append(r.childNodes)
                    .appendTo(r),
                d) &&
                0 === V('span.dt-column-order', r).length &&
                V('<span>').addClass('dt-column-order').appendTo(r),
              i = 0;
            i < b;
            i++
          ) {
            for (o = 0; o < y; o++)
              (f[h + o][l + i] = { cell: r, unique: s }), (f[h + o].row = a);
            D.push(l + i);
          }
          r.setAttribute('data-dt-column', x(D).join(','));
        }
        r = r.nextSibling;
      }
    return f;
  }
  function At(n, t, a) {
    function e(t) {
      var e = n.jqXHR ? n.jqXHR.status : null;
      (null === t || ('number' == typeof e && 204 == e)) && Lt(n, (t = {}), []),
        (e = t.error || t.sError) && Z(n, 0, e),
        (n.json = t),
        tt(n, null, 'xhr', [n, t, n.jqXHR], !0),
        a(t);
    }
    var r,
      o = n.ajax,
      i = n.oInstance,
      l =
        (V.isPlainObject(o) &&
          o.data &&
          ((l = 'function' == typeof (r = o.data) ? r(t, n) : r),
          (t = 'function' == typeof r && l ? l : V.extend(!0, t, l)),
          delete o.data),
        {
          url: 'string' == typeof o ? o : '',
          data: t,
          success: e,
          dataType: 'json',
          cache: !1,
          type: n.sServerMethod,
          error: function (t, e) {
            -1 === tt(n, null, 'xhr', [n, null, n.jqXHR], !0).indexOf(!0) &&
              ('parsererror' == e
                ? Z(n, 0, 'Invalid JSON response', 1)
                : 4 === t.readyState && Z(n, 0, 'Ajax error', 7)),
              w(n, !1);
          },
        });
    V.isPlainObject(o) && V.extend(l, o),
      (n.oAjaxData = t),
      tt(n, null, 'preXhr', [n, t, l], !0),
      'function' == typeof o
        ? (n.jqXHR = o.call(i, t, e, n))
        : '' === o.url
        ? ((i = {}), $.util.set(o.dataSrc)(i, []), e(i))
        : ((n.jqXHR = V.ajax(l)), r && (o.data = r));
  }
  function Lt(t, e, n) {
    var a = 'data';
    if (
      (V.isPlainObject(t.ajax) &&
        void 0 !== t.ajax.dataSrc &&
        ('string' == typeof (t = t.ajax.dataSrc) || 'function' == typeof t
          ? (a = t)
          : void 0 !== t.data && (a = t.data)),
      !n)
    )
      return 'data' === a ? e.aaData || e[a] : '' !== a ? J(a)(e) : e;
    v(a)(e, n);
  }
  function Ft(t, e, n) {
    var t = V.isPlainObject(t.ajax) ? t.ajax.dataSrc : null;
    return t && t[e]
      ? J(t[e])(n)
      : ((t = ''),
        'draw' === e
          ? (t = 'sEcho')
          : 'recordsTotal' === e
          ? (t = 'iTotalRecords')
          : 'recordsFiltered' === e && (t = 'iTotalDisplayRecords'),
        void 0 !== n[t] ? n[t] : n[e]);
  }
  function Nt(n, t) {
    var e = n.aoPreSearchCols;
    if ((B(n), 'ssp' != et(n))) {
      for (
        var a, r, o, i, l, s = n, u = s.aoColumns, c = s.aoData, d = 0;
        d < c.length;
        d++
      )
        if (c[d] && !(l = c[d])._aFilterData) {
          for (o = [], a = 0, r = u.length; a < r; a++)
            u[a].bSearchable
              ? 'string' !=
                  typeof (i = null === (i = G(s, d, a, 'filter')) ? '' : i) &&
                i.toString &&
                (i = i.toString())
              : (i = ''),
              i.indexOf &&
                -1 !== i.indexOf('&') &&
                ((Rt.innerHTML = i), (i = Ot ? Rt.textContent : Rt.innerText)),
              i.replace && (i = i.replace(/[\r\n\u2028]/g, '')),
              o.push(i);
          (l._aFilterData = o), (l._sFilterRow = o.join('  ')), 0;
        }
      (n.aiDisplay = n.aiDisplayMaster.slice()),
        jt(n.aiDisplay, n, t.search, t),
        V.each(n.searchFixed, function (t, e) {
          jt(n.aiDisplay, n, e, {});
        });
      for (var f = 0; f < e.length; f++) {
        var h = e[f];
        jt(n.aiDisplay, n, h.search, h, f),
          V.each(n.aoColumns[f].searchFixed, function (t, e) {
            jt(n.aiDisplay, n, e, {}, f);
          });
      }
      for (
        var p, g, v = n, m = $.ext.search, b = v.aiDisplay, y = 0, D = m.length;
        y < D;
        y++
      ) {
        for (var x = [], S = 0, T = b.length; S < T; S++)
          (g = b[S]),
            (p = v.aoData[g]),
            m[y](v, p._aFilterData, g, p._aData, S) && x.push(g);
        (b.length = 0), b.push.apply(b, x);
      }
    }
    (n.bFiltered = !0), tt(n, null, 'search', [n]);
  }
  function jt(t, e, n, a, r) {
    if ('' !== n) {
      for (
        var o = 0,
          i = [],
          l = 'function' == typeof n ? n : null,
          s =
            n instanceof RegExp
              ? n
              : l
              ? null
              : (function (t, e) {
                  var a = [],
                    e = V.extend(
                      {},
                      {
                        boundary: !1,
                        caseInsensitive: !0,
                        exact: !1,
                        regex: !1,
                        smart: !0,
                      },
                      e
                    );
                  'string' != typeof t && (t = t.toString());
                  if (((t = O(t)), e.exact))
                    return new RegExp(
                      '^' + Pt(t) + '$',
                      e.caseInsensitive ? 'i' : ''
                    );
                  {
                    var n, r, o;
                    (t = e.regex ? t : Pt(t)),
                      e.smart &&
                        ((n = (
                          t.match(/!?["\u201C][^"\u201D]+["\u201D]|[^ ]+/g) || [
                            '',
                          ]
                        ).map(function (t) {
                          var e,
                            n = !1;
                          return (
                            '!' === t.charAt(0) &&
                              ((n = !0), (t = t.substring(1))),
                            '"' === t.charAt(0)
                              ? (t = (e = t.match(/^"(.*)"$/)) ? e[1] : t)
                              : '“' === t.charAt(0) &&
                                (t = (e = t.match(/^\u201C(.*)\u201D$/))
                                  ? e[1]
                                  : t),
                            n &&
                              (1 < t.length && a.push('(?!' + t + ')'),
                              (t = '')),
                            t.replace(/"/g, '')
                          );
                        })),
                        (r = a.length ? a.join('') : ''),
                        (o = e.boundary ? '\\b' : ''),
                        (t =
                          '^(?=.*?' +
                          o +
                          n.join(')(?=.*?' + o) +
                          ')(' +
                          r +
                          '.)*$'));
                  }
                  return new RegExp(t, e.caseInsensitive ? 'i' : '');
                })(n, a),
          o = 0;
        o < t.length;
        o++
      ) {
        var u = e.aoData[t[o]],
          c = void 0 === r ? u._sFilterRow : u._aFilterData[r];
        ((l && l(c, u._aData, t[o], r)) || (s && s.test(c))) && i.push(t[o]);
      }
      for (t.length = i.length, o = 0; o < i.length; o++) t[o] = i[o];
    }
  }
  var Pt = $.util.escapeRegex,
    Rt = V('<div>')[0],
    Ot = void 0 !== Rt.textContent;
  function Et(n) {
    var a,
      t,
      e,
      r,
      o,
      i,
      l = n.iInitDisplayStart;
    n.bInitialised
      ? (Dt(n, 'header'),
        Dt(n, 'footer'),
        St(n, n.aoHeader),
        St(n, n.aoFooter),
        Ct(n),
        (e = (t = n).nTHead),
        (i = e.querySelectorAll('tr')),
        (r = t.bSortCellsTop),
        (o =
          ':not([data-dt-order="disable"]):not([data-dt-order="icon-only"])'),
        !0 === r ? (e = i[0]) : !1 === r && (e = i[i.length - 1]),
        Vt(
          t,
          e,
          e === t.nTHead
            ? 'tr' + o + ' th' + o + ', tr' + o + ' td' + o
            : 'th' + o + ', td' + o
        ),
        Ut(t, (r = []), t.aaSorting),
        (t.aaSorting = r),
        Bt(n),
        w(n, !0),
        tt(n, null, 'preInit', [n], !0),
        s(n),
        'ssp' != (i = et(n)) &&
          ('ajax' == i
            ? At(n, {}, function (t) {
                var e = Lt(n, t);
                for (a = 0; a < e.length; a++) Y(n, e[a]);
                (n.iInitDisplayStart = l), s(n), w(n, !1), kt(n);
              })
            : (kt(n), w(n, !1))))
      : setTimeout(function () {
          Et(n);
        }, 200);
  }
  function kt(t) {
    var e;
    t._bInitComplete ||
      ((e = [t, t.json]),
      (t._bInitComplete = !0),
      M(t),
      tt(t, null, 'plugin-init', e, !0),
      tt(t, 'aoInitComplete', 'init', e, !0));
  }
  function Mt(t, e) {
    e = parseInt(e, 10);
    (t._iDisplayLength = e), Kt(t), tt(t, null, 'length', [t, e]);
  }
  function Ht(t, e, n) {
    var a = t._iDisplayStart,
      r = t._iDisplayLength,
      o = t.fnRecordsDisplay();
    if (0 === o || -1 === r) a = 0;
    else if ('number' == typeof e) o < (a = e * r) && (a = 0);
    else if ('first' == e) a = 0;
    else if ('previous' == e) (a = 0 <= r ? a - r : 0) < 0 && (a = 0);
    else if ('next' == e) a + r < o && (a += r);
    else if ('last' == e) a = Math.floor((o - 1) / r) * r;
    else {
      if ('ellipsis' === e) return;
      Z(t, 0, 'Unknown paging action: ' + e, 5);
    }
    o = t._iDisplayStart !== a;
    (t._iDisplayStart = a),
      tt(t, null, o ? 'page' : 'page-nc', [t]),
      o && n && S(t);
  }
  function w(t, e) {
    tt(t, null, 'processing', [t, e]);
  }
  function Wt(t) {
    var e,
      n,
      a,
      r,
      o,
      i,
      l,
      s,
      u,
      c,
      d,
      f,
      h,
      p = V(t.nTable),
      g = t.oScroll;
    return '' === g.sX && '' === g.sY
      ? t.nTable
      : ((e = g.sX),
        (n = g.sY),
        (a = t.oClasses.scrolling),
        (o = (r = t.captionNode) ? r._captionSide : null),
        (u = V(p[0].cloneNode(!1))),
        (i = V(p[0].cloneNode(!1))),
        (c = function (t) {
          return t ? A(t) : null;
        }),
        (l = p.children('tfoot')).length || (l = null),
        (u = V((s = '<div/>'), { class: a.container })
          .append(
            V(s, { class: a.header.self })
              .css({
                overflow: 'hidden',
                position: 'relative',
                border: 0,
                width: e ? c(e) : '100%',
              })
              .append(
                V(s, { class: a.header.inner })
                  .css({
                    'box-sizing': 'content-box',
                    width: g.sXInner || '100%',
                  })
                  .append(
                    u
                      .removeAttr('id')
                      .css('margin-left', 0)
                      .append('top' === o ? r : null)
                      .append(p.children('thead'))
                  )
              )
          )
          .append(
            V(s, { class: a.body })
              .css({ position: 'relative', overflow: 'auto', width: c(e) })
              .append(p)
          )),
        l &&
          u.append(
            V(s, { class: a.footer.self })
              .css({ overflow: 'hidden', border: 0, width: e ? c(e) : '100%' })
              .append(
                V(s, { class: a.footer.inner }).append(
                  i
                    .removeAttr('id')
                    .css('margin-left', 0)
                    .append('bottom' === o ? r : null)
                    .append(p.children('tfoot'))
                )
              )
          ),
        (c = u.children()),
        (d = c[0]),
        (f = c[1]),
        (h = l ? c[2] : null),
        V(f).on('scroll.DT', function () {
          var t = this.scrollLeft;
          (d.scrollLeft = t), l && (h.scrollLeft = t);
        }),
        V('th, td', d).on('focus', function () {
          var t = d.scrollLeft;
          (f.scrollLeft = t), l && (f.scrollLeft = t);
        }),
        V(f).css('max-height', n),
        g.bCollapse || V(f).css('height', n),
        (t.nScrollHead = d),
        (t.nScrollBody = f),
        (t.nScrollFoot = h),
        t.aoDrawCallback.push(Xt),
        u[0]);
  }
  function Xt(e) {
    var t = e.oScroll.iBarWidth,
      n = V(e.nScrollHead).children('div'),
      a = n.children('table'),
      r = e.nScrollBody,
      o = V(r),
      i = V(e.nScrollFoot).children('div'),
      l = i.children('table'),
      s = V(e.nTHead),
      u = V(e.nTable),
      c = e.nTFoot && V('th, td', e.nTFoot).length ? V(e.nTFoot) : null,
      d = e.oBrowser,
      f = r.scrollHeight > r.clientHeight;
    if (e.scrollBarVis !== f && void 0 !== e.scrollBarVis)
      (e.scrollBarVis = f), M(e);
    else {
      if (
        ((e.scrollBarVis = f),
        u.children('thead, tfoot').remove(),
        (f = s.clone().prependTo(u)).find('th, td').removeAttr('tabindex'),
        f.find('[id]').removeAttr('id'),
        c && (v = c.clone().prependTo(u)).find('[id]').removeAttr('id'),
        e.aiDisplay.length)
      )
        for (
          var h = u
              .children('tbody')
              .eq(0)
              .children('tr')
              .eq(0)
              .children('th, td')
              .map(function (t) {
                return { idx: H(e, t), width: V(this).outerWidth() };
              }),
            p = 0;
          p < h.length;
          p++
        ) {
          var g = e.aoColumns[h[p].idx].colEl[0];
          g.style.width.replace('px', '') !== h[p].width &&
            (g.style.width = h[p].width + 'px');
        }
      a.find('colgroup').remove(),
        a.append(e.colgroup.clone()),
        c && (l.find('colgroup').remove(), l.append(e.colgroup.clone())),
        V('th, td', f).each(function () {
          V(this.childNodes).wrapAll('<div class="dt-scroll-sizing">');
        }),
        c &&
          V('th, td', v).each(function () {
            V(this.childNodes).wrapAll('<div class="dt-scroll-sizing">');
          });
      var s =
          Math.floor(u.height()) > r.clientHeight ||
          'scroll' == o.css('overflow-y'),
        f = 'padding' + (d.bScrollbarLeft ? 'Left' : 'Right'),
        v = u.outerWidth();
      a.css('width', A(v)),
        n.css('width', A(v)).css(f, s ? t + 'px' : '0px'),
        c &&
          (l.css('width', A(v)),
          i.css('width', A(v)).css(f, s ? t + 'px' : '0px')),
        u.children('colgroup').prependTo(u),
        o.trigger('scroll'),
        (!e.bSorted && !e.bFiltered) || e._drawHold || (r.scrollTop = 0);
    }
  }
  function A(t) {
    return null === t
      ? '0px'
      : 'number' == typeof t
      ? t < 0
        ? '0px'
        : t + 'px'
      : t.match(/\d$/)
      ? t + 'px'
      : t;
  }
  function Bt(t) {
    var e = t.aoColumns;
    for (t.colgroup.empty(), a = 0; a < e.length; a++)
      e[a].bVisible && t.colgroup.append(e[a].colEl);
  }
  function Vt(o, t, e, i, l) {
    Qt(t, e, function (t) {
      var e = !1,
        n = void 0 === i ? st(t.target) : [i];
      if (n.length) {
        for (var a = 0, r = n.length; a < r; a++)
          if (
            (!1 !==
              (function (t, e, n, a) {
                function r(t, e) {
                  var n = t._idx;
                  return (n = void 0 === n ? s.indexOf(t[1]) : n) + 1 < s.length
                    ? n + 1
                    : e
                    ? null
                    : 0;
                }
                var o,
                  i = t.aoColumns[e],
                  l = t.aaSorting,
                  s = i.asSorting;
                if (!i.bSortable) return !1;
                'number' == typeof l[0] && (l = t.aaSorting = [l]);
                (a || n) && t.oFeatures.bSortMulti
                  ? -1 !== (i = f(l, '0').indexOf(e))
                    ? null ===
                      (o = null === (o = r(l[i], !0)) && 1 === l.length ? 0 : o)
                      ? l.splice(i, 1)
                      : ((l[i][1] = s[o]), (l[i]._idx = o))
                    : (a ? l.push([e, s[0], 0]) : l.push([e, l[0][1], 0]),
                      (l[l.length - 1]._idx = 0))
                  : l.length && l[0][0] == e
                  ? ((o = r(l[0])),
                    (l.length = 1),
                    (l[0][1] = s[o]),
                    (l[0]._idx = o))
                  : ((l.length = 0), l.push([e, s[0]]), (l[0]._idx = 0));
              })(o, n[a], a, t.shiftKey) && (e = !0),
            1 === o.aaSorting.length && '' === o.aaSorting[0][1])
          )
            break;
        e &&
          (w(o, !0),
          setTimeout(function () {
            zt(o), qt(o, o.aiDisplay), w(o, !1), s(o, !1, !1), l && l();
          }, 0));
      }
    });
  }
  function qt(t, e) {
    if (!(e.length < 2)) {
      for (var n = t.aiDisplayMaster, a = {}, r = {}, o = 0; o < n.length; o++)
        a[n[o]] = o;
      for (o = 0; o < e.length; o++) r[e[o]] = a[e[o]];
      e.sort(function (t, e) {
        return r[t] - r[e];
      });
    }
  }
  function Ut(n, a, t) {
    function e(t) {
      var e;
      V.isPlainObject(t)
        ? void 0 !== t.idx
          ? a.push([t.idx, t.dir])
          : t.name &&
            -1 !== (e = f(n.aoColumns, 'sName').indexOf(t.name)) &&
            a.push([e, t.dir])
        : a.push(t);
    }
    if (V.isPlainObject(t)) e(t);
    else if (t.length && 'number' == typeof t[0]) e(t);
    else if (t.length) for (var r = 0; r < t.length; r++) e(t[r]);
  }
  function $t(t) {
    var e,
      n,
      a,
      r,
      o,
      i,
      l,
      s = [],
      u = $.ext.type.order,
      c = t.aoColumns,
      d = t.aaSortingFixed,
      f = V.isPlainObject(d),
      h = [];
    if (t.oFeatures.bSort)
      for (
        Array.isArray(d) && Ut(t, h, d),
          f && d.pre && Ut(t, h, d.pre),
          Ut(t, h, t.aaSorting),
          f && d.post && Ut(t, h, d.post),
          e = 0;
        e < h.length;
        e++
      )
        if (c[(l = h[e][0])])
          for (n = 0, a = (r = c[l].aDataSort).length; n < a; n++)
            (i = c[(o = r[n])].sType || 'string'),
              void 0 === h[e]._idx &&
                (h[e]._idx = c[o].asSorting.indexOf(h[e][1])),
              h[e][1] &&
                s.push({
                  src: l,
                  col: o,
                  dir: h[e][1],
                  index: h[e]._idx,
                  type: i,
                  formatter: u[i + '-pre'],
                  sorter: u[i + '-' + h[e][1]],
                });
    return s;
  }
  function zt(t, e, n) {
    var a,
      r,
      o,
      i,
      l,
      c,
      d = [],
      s = $.ext.type.order,
      f = t.aoData,
      u = t.aiDisplayMaster;
    for (
      B(t),
        void 0 !== e
          ? ((l = t.aoColumns[e]),
            (c = [
              {
                src: e,
                col: e,
                dir: n,
                index: 0,
                type: l.sType,
                formatter: s[l.sType + '-pre'],
                sorter: s[l.sType + '-' + n],
              },
            ]),
            (u = u.slice()))
          : (c = $t(t)),
        a = 0,
        r = c.length;
      a < r;
      a++
    ) {
      (i = c[a]), (S = x = D = g = p = h = y = b = m = v = void 0);
      var h,
        p,
        g,
        v = t,
        m = i.col,
        b = v.aoColumns[m],
        y = $.ext.order[b.sSortDataType];
      y && (h = y.call(v.oInstance, v, m, T(v, m)));
      for (
        var D = $.ext.type.order[b.sType + '-pre'], x = v.aoData, S = 0;
        S < x.length;
        S++
      )
        x[S] &&
          ((p = x[S])._aSortData || (p._aSortData = []),
          (p._aSortData[m] && !y) ||
            ((g = y ? h[S] : G(v, S, m, 'sort')),
            (p._aSortData[m] = D ? D(g, v) : g)));
    }
    if ('ssp' != et(t) && 0 !== c.length) {
      for (a = 0, o = u.length; a < o; a++) d[a] = a;
      c.length && 'desc' === c[0].dir && d.reverse(),
        u.sort(function (t, e) {
          for (
            var n,
              a,
              r,
              o,
              i = c.length,
              l = f[t]._aSortData,
              s = f[e]._aSortData,
              u = 0;
            u < i;
            u++
          )
            if (((n = l[(o = c[u]).col]), (a = s[o.col]), o.sorter)) {
              if (0 !== (r = o.sorter(n, a))) return r;
            } else if (0 !== (r = n < a ? -1 : a < n ? 1 : 0))
              return 'asc' === o.dir ? r : -r;
          return (n = d[t]) < (a = d[e]) ? -1 : a < n ? 1 : 0;
        });
    } else
      0 === c.length &&
        u.sort(function (t, e) {
          return t < e ? -1 : e < t ? 1 : 0;
        });
    return void 0 === e && ((t.bSorted = !0), tt(t, null, 'order', [t, c])), u;
  }
  function Yt(t) {
    var e,
      n,
      a,
      r = t.aLastSort,
      o = t.oClasses.order.position,
      i = $t(t),
      l = t.oFeatures;
    if (l.bSort && l.bSortClasses) {
      for (e = 0, n = r.length; e < n; e++)
        (a = r[e].src),
          V(f(t.aoData, 'anCells', a)).removeClass(o + (e < 2 ? e + 1 : 3));
      for (e = 0, n = i.length; e < n; e++)
        (a = i[e].src),
          V(f(t.aoData, 'anCells', a)).addClass(o + (e < 2 ? e + 1 : 3));
    }
    t.aLastSort = i;
  }
  function Gt(n) {
    var t;
    n._bLoadingState ||
      ((t = {
        time: +new Date(),
        start: n._iDisplayStart,
        length: n._iDisplayLength,
        order: V.extend(!0, [], n.aaSorting),
        search: V.extend({}, n.oPreviousSearch),
        columns: n.aoColumns.map(function (t, e) {
          return {
            visible: t.bVisible,
            search: V.extend({}, n.aoPreSearchCols[e]),
          };
        }),
      }),
      (n.oSavedState = t),
      tt(n, 'aoStateSaveParams', 'stateSaveParams', [n, t]),
      n.oFeatures.bStateSave &&
        !n.bDestroying &&
        n.fnStateSaveCallback.call(n.oInstance, n, t));
  }
  function Jt(n, t, e) {
    var a,
      r,
      o = n.aoColumns,
      i = ((n._bLoadingState = !0), n._bInitComplete ? new $.Api(n) : null);
    if (t && t.time) {
      var l = n.iStateDuration;
      if (0 < l && t.time < +new Date() - 1e3 * l) n._bLoadingState = !1;
      else if (
        -1 !== tt(n, 'aoStateLoadParams', 'stateLoadParams', [n, t]).indexOf(!1)
      )
        n._bLoadingState = !1;
      else if (t.columns && o.length !== t.columns.length)
        n._bLoadingState = !1;
      else {
        if (
          ((n.oLoadedState = V.extend(!0, {}, t)),
          tt(n, null, 'stateLoadInit', [n, t], !0),
          void 0 !== t.length &&
            (i ? i.page.len(t.length) : (n._iDisplayLength = t.length)),
          void 0 !== t.start &&
            (null === i
              ? ((n._iDisplayStart = t.start), (n.iInitDisplayStart = t.start))
              : Ht(n, t.start / n._iDisplayLength)),
          void 0 !== t.order &&
            ((n.aaSorting = []),
            V.each(t.order, function (t, e) {
              n.aaSorting.push(e[0] >= o.length ? [0, e[1]] : e);
            })),
          void 0 !== t.search && V.extend(n.oPreviousSearch, t.search),
          t.columns)
        ) {
          for (a = 0, r = t.columns.length; a < r; a++) {
            var s = t.columns[a];
            void 0 !== s.visible &&
              (i
                ? i.column(a).visible(s.visible, !1)
                : (o[a].bVisible = s.visible)),
              void 0 !== s.search && V.extend(n.aoPreSearchCols[a], s.search);
          }
          i && i.columns.adjust();
        }
        (n._bLoadingState = !1), tt(n, 'aoStateLoaded', 'stateLoaded', [n, t]);
      }
    } else n._bLoadingState = !1;
    e();
  }
  function Z(t, e, n, a) {
    if (
      ((n =
        'DataTables warning: ' +
        (t ? 'table id=' + t.sTableId + ' - ' : '') +
        n),
      a &&
        (n +=
          '. For more information about this error, please see https://datatables.net/tn/' +
          a),
      e)
    )
      q.console && console.log && console.log(n);
    else {
      (e = $.ext), (e = e.sErrMode || e.errMode);
      if ((t && tt(t, null, 'dt-error', [t, a, n], !0), 'alert' == e)) alert(n);
      else {
        if ('throw' == e) throw new Error(n);
        'function' == typeof e && e(t, a, n);
      }
    }
  }
  function Q(n, a, t, e) {
    Array.isArray(t)
      ? V.each(t, function (t, e) {
          Array.isArray(e) ? Q(n, a, e[0], e[1]) : Q(n, a, e);
        })
      : (void 0 === e && (e = t), void 0 !== a[t] && (n[e] = a[t]));
  }
  function Zt(t, e, n) {
    var a, r;
    for (r in e)
      Object.prototype.hasOwnProperty.call(e, r) &&
        ((a = e[r]),
        V.isPlainObject(a)
          ? (V.isPlainObject(t[r]) || (t[r] = {}), V.extend(!0, t[r], a))
          : n && 'data' !== r && 'aaData' !== r && Array.isArray(a)
          ? (t[r] = a.slice())
          : (t[r] = a));
    return t;
  }
  function Qt(t, e, n) {
    V(t)
      .on('click.DT', e, function (t) {
        n(t);
      })
      .on('keypress.DT', e, function (t) {
        13 === t.which && (t.preventDefault(), n(t));
      })
      .on('selectstart.DT', e, function () {
        return !1;
      });
  }
  function K(t, e, n) {
    n && t[e].push(n);
  }
  function tt(e, t, n, a, r) {
    var o = [];
    return (
      t &&
        (o = e[t]
          .slice()
          .reverse()
          .map(function (t) {
            return t.apply(e.oInstance, a);
          })),
      null !== n &&
        ((t = V.Event(n + '.dt')),
        (n = V(e.nTable)),
        (t.dt = e.api),
        n[r ? 'trigger' : 'triggerHandler'](t, a),
        r && 0 === n.parents('body').length && V('body').trigger(t, a),
        o.push(t.result)),
      o
    );
  }
  function Kt(t) {
    var e = t._iDisplayStart,
      n = t.fnDisplayEnd(),
      a = t._iDisplayLength;
    n <= e && (e = n - a),
      (e -= e % a),
      (t._iDisplayStart = e = -1 === a || e < 0 ? 0 : e);
  }
  function te(t, e) {
    var t = t.renderer,
      n = $.ext.renderer[e];
    return V.isPlainObject(t) && t[e]
      ? n[t[e]] || n._
      : ('string' == typeof t && n[t]) || n._;
  }
  function et(t) {
    return t.oFeatures.bServerSide ? 'ssp' : t.ajax ? 'ajax' : 'dom';
  }
  function ee(t, e, n) {
    var a = t.fnFormatNumber,
      r = t._iDisplayStart + 1,
      o = t._iDisplayLength,
      i = t.fnRecordsDisplay(),
      l = t.fnRecordsTotal(),
      s = -1 === o;
    return e
      .replace(/_START_/g, a.call(t, r))
      .replace(/_END_/g, a.call(t, t.fnDisplayEnd()))
      .replace(/_MAX_/g, a.call(t, l))
      .replace(/_TOTAL_/g, a.call(t, i))
      .replace(/_PAGE_/g, a.call(t, s ? 1 : Math.ceil(r / o)))
      .replace(/_PAGES_/g, a.call(t, s ? 1 : Math.ceil(i / o)))
      .replace(/_ENTRIES_/g, t.api.i18n('entries', '', n))
      .replace(/_ENTRIES-MAX_/g, t.api.i18n('entries', '', l))
      .replace(/_ENTRIES-TOTAL_/g, t.api.i18n('entries', '', i));
  }
  var ne = [],
    n = Array.prototype;
  (U = function (t, e) {
    if (!(this instanceof U)) return new U(t, e);
    function n(t) {
      (t = t), (e = $.settings), (a = f(e, 'nTable'));
      var n,
        e,
        a,
        r = t
          ? t.nTable && t.oFeatures
            ? [t]
            : t.nodeName && 'table' === t.nodeName.toLowerCase()
            ? -1 !== (r = a.indexOf(t))
              ? [e[r]]
              : null
            : t && 'function' == typeof t.settings
            ? t.settings().toArray()
            : ('string' == typeof t
                ? (n = V(t).get())
                : t instanceof V && (n = t.get()),
              n
                ? e.filter(function (t, e) {
                    return n.includes(a[e]);
                  })
                : void 0)
          : [];
      r && o.push.apply(o, r);
    }
    var o = [];
    if (Array.isArray(t)) for (var a = 0, r = t.length; a < r; a++) n(t[a]);
    else n(t);
    (this.context = 1 < o.length ? x(o) : o),
      e && this.push.apply(this, e),
      (this.selector = { rows: null, cols: null, opts: null }),
      U.extend(this, this, ne);
  }),
    ($.Api = U),
    V.extend(U.prototype, {
      any: function () {
        return 0 !== this.count();
      },
      context: [],
      count: function () {
        return this.flatten().length;
      },
      each: function (t) {
        for (var e = 0, n = this.length; e < n; e++)
          t.call(this, this[e], e, this);
        return this;
      },
      eq: function (t) {
        var e = this.context;
        return e.length > t ? new U(e[t], this[t]) : null;
      },
      filter: function (t) {
        t = n.filter.call(this, t, this);
        return new U(this.context, t);
      },
      flatten: function () {
        var t = [];
        return new U(this.context, t.concat.apply(t, this.toArray()));
      },
      get: function (t) {
        return this[t];
      },
      join: n.join,
      includes: function (t) {
        return -1 !== this.indexOf(t);
      },
      indexOf: n.indexOf,
      iterator: function (t, e, n, a) {
        var r,
          o,
          i,
          l,
          s,
          u,
          c,
          d,
          f = [],
          h = this.context,
          p = this.selector;
        for (
          'string' == typeof t && ((a = n), (n = e), (e = t), (t = !1)),
            o = 0,
            i = h.length;
          o < i;
          o++
        ) {
          var g = new U(h[o]);
          if ('table' === e) void 0 !== (r = n.call(g, h[o], o)) && f.push(r);
          else if ('columns' === e || 'rows' === e)
            void 0 !== (r = n.call(g, h[o], this[o], o)) && f.push(r);
          else if (
            'every' === e ||
            'column' === e ||
            'column-rows' === e ||
            'row' === e ||
            'cell' === e
          )
            for (
              c = this[o],
                'column-rows' === e && (u = he(h[o], p.opts)),
                l = 0,
                s = c.length;
              l < s;
              l++
            )
              (d = c[l]),
                void 0 !==
                  (r =
                    'cell' === e
                      ? n.call(g, h[o], d.row, d.column, o, l)
                      : n.call(g, h[o], d, o, l, u)) && f.push(r);
        }
        return f.length || a
          ? (((t = (a = new U(h, t ? f.concat.apply([], f) : f))
              .selector).rows = p.rows),
            (t.cols = p.cols),
            (t.opts = p.opts),
            a)
          : this;
      },
      lastIndexOf: n.lastIndexOf,
      length: 0,
      map: function (t) {
        t = n.map.call(this, t, this);
        return new U(this.context, t);
      },
      pluck: function (t) {
        var e = $.util.get(t);
        return this.map(function (t) {
          return e(t);
        });
      },
      pop: n.pop,
      push: n.push,
      reduce: n.reduce,
      reduceRight: n.reduceRight,
      reverse: n.reverse,
      selector: null,
      shift: n.shift,
      slice: function () {
        return new U(this.context, this);
      },
      sort: n.sort,
      splice: n.splice,
      toArray: function () {
        return n.slice.call(this);
      },
      to$: function () {
        return V(this);
      },
      toJQuery: function () {
        return V(this);
      },
      unique: function () {
        return new U(this.context, x(this.toArray()));
      },
      unshift: n.unshift,
    }),
    (q.__apiStruct = ne),
    (U.extend = function (t, e, n) {
      if (n.length && e && (e instanceof U || e.__dt_wrapper))
        for (var a, r = 0, o = n.length; r < o; r++)
          '__proto__' !== (a = n[r]).name &&
            ((e[a.name] =
              'function' === a.type
                ? (function (e, n, a) {
                    return function () {
                      var t = n.apply(e || this, arguments);
                      return U.extend(t, t, a.methodExt), t;
                    };
                  })(t, a.val, a)
                : 'object' === a.type
                ? {}
                : a.val),
            (e[a.name].__dt_wrapper = !0),
            U.extend(t, e[a.name], a.propExt));
    }),
    (U.register = e =
      function (t, e) {
        if (Array.isArray(t))
          for (var n = 0, a = t.length; n < a; n++) U.register(t[n], e);
        else
          for (var r = t.split('.'), o = ne, i = 0, l = r.length; i < l; i++) {
            var s,
              u,
              c = (function (t, e) {
                for (var n = 0, a = t.length; n < a; n++)
                  if (t[n].name === e) return t[n];
                return null;
              })(
                o,
                (u = (s = -1 !== r[i].indexOf('()'))
                  ? r[i].replace('()', '')
                  : r[i])
              );
            c ||
              o.push(
                (c = {
                  name: u,
                  val: {},
                  methodExt: [],
                  propExt: [],
                  type: 'object',
                })
              ),
              i === l - 1
                ? ((c.val = e),
                  (c.type =
                    'function' == typeof e
                      ? 'function'
                      : V.isPlainObject(e)
                      ? 'object'
                      : 'other'))
                : (o = s ? c.methodExt : c.propExt);
          }
      }),
    (U.registerPlural = t =
      function (t, e, n) {
        U.register(t, n),
          U.register(e, function () {
            var t = n.apply(this, arguments);
            return t === this
              ? this
              : t instanceof U
              ? t.length
                ? Array.isArray(t[0])
                  ? new U(t.context, t[0])
                  : t[0]
                : void 0
              : t;
          });
      });
  function ae(t, e) {
    var n, a;
    return Array.isArray(t)
      ? ((n = []),
        t.forEach(function (t) {
          t = ae(t, e);
          n.push.apply(n, t);
        }),
        n.filter(function (t) {
          return t;
        }))
      : 'number' == typeof t
      ? [e[t]]
      : ((a = e.map(function (t) {
          return t.nTable;
        })),
        V(a)
          .filter(t)
          .map(function () {
            var t = a.indexOf(this);
            return e[t];
          })
          .toArray());
  }
  function re(r, o, t) {
    var e, n;
    t &&
      (e = new U(r)).one('draw', function () {
        t(e.ajax.json());
      }),
      'ssp' == et(r)
        ? s(r, o)
        : (w(r, !0),
          (n = r.jqXHR) && 4 !== n.readyState && n.abort(),
          At(r, {}, function (t) {
            pt(r);
            for (var e = Lt(r, t), n = 0, a = e.length; n < a; n++) Y(r, e[n]);
            s(r, o), kt(r), w(r, !1);
          }));
  }
  function oe(t, e, n, a, r) {
    for (
      var o,
        i,
        l,
        s,
        u = [],
        c = typeof e,
        d = 0,
        f = (e =
          e && 'string' != c && 'function' != c && void 0 !== e.length
            ? e
            : [e]).length;
      d < f;
      d++
    )
      for (
        l = 0,
          s = (i =
            e[d] && e[d].split && !e[d].match(/[[(:]/)
              ? e[d].split(',')
              : [e[d]]).length;
        l < s;
        l++
      )
        (o = (o = n('string' == typeof i[l] ? i[l].trim() : i[l])).filter(
          function (t) {
            return null != t;
          }
        )) &&
          o.length &&
          (u = u.concat(o));
    var h = C.selector[t];
    if (h.length) for (d = 0, f = h.length; d < f; d++) u = h[d](a, r, u);
    return x(u);
  }
  function ie(t) {
    return (
      (t = t || {}).filter && void 0 === t.search && (t.search = t.filter),
      V.extend({ search: 'none', order: 'current', page: 'all' }, t)
    );
  }
  function le(t) {
    var e = new U(t.context[0]);
    return (
      t.length && e.push(t[0]),
      (e.selector = t.selector),
      e.length && 1 < e[0].length && e[0].splice(1),
      e
    );
  }
  e('tables()', function (t) {
    return null != t ? new U(ae(t, this.context)) : this;
  }),
    e('table()', function (t) {
      var t = this.tables(t),
        e = t.context;
      return e.length ? new U(e[0]) : t;
    }),
    [
      ['nodes', 'node', 'nTable'],
      ['body', 'body', 'nTBody'],
      ['header', 'header', 'nTHead'],
      ['footer', 'footer', 'nTFoot'],
    ].forEach(function (e) {
      t('tables().' + e[0] + '()', 'table().' + e[1] + '()', function () {
        return this.iterator(
          'table',
          function (t) {
            return t[e[2]];
          },
          1
        );
      });
    }),
    [
      ['header', 'aoHeader'],
      ['footer', 'aoFooter'],
    ].forEach(function (n) {
      e('table().' + n[0] + '.structure()', function (t) {
        var t = this.columns(t).indexes().flatten(),
          e = this.context[0];
        return xt(e, e[n[1]], t);
      });
    }),
    t('tables().containers()', 'table().container()', function () {
      return this.iterator(
        'table',
        function (t) {
          return t.nTableWrapper;
        },
        1
      );
    }),
    e('tables().every()', function (n) {
      var a = this;
      return this.iterator('table', function (t, e) {
        n.call(a.table(e), e);
      });
    }),
    e('caption()', function (r, o) {
      var t,
        e = this.context;
      return void 0 === r
        ? (t = e[0].captionNode) && e.length
          ? t.innerHTML
          : null
        : this.iterator(
            'table',
            function (t) {
              var e = V(t.nTable),
                n = V(t.captionNode),
                a = V(t.nTableWrapper);
              n.length ||
                ((n = V('<caption/>').html(r)), (t.captionNode = n[0]), o) ||
                (e.prepend(n), (o = n.css('caption-side'))),
                n.html(r),
                o && (n.css('caption-side', o), (n[0]._captionSide = o)),
                (a.find('div.dataTables_scroll').length
                  ? ((t = 'top' === o ? 'Head' : 'Foot'),
                    a.find('div.dataTables_scroll' + t + ' table'))
                  : e
                ).prepend(n);
            },
            1
          );
    }),
    e('caption.node()', function () {
      var t = this.context;
      return t.length ? t[0].captionNode : null;
    }),
    e('draw()', function (e) {
      return this.iterator('table', function (t) {
        'page' === e
          ? S(t)
          : s(t, !1 === (e = 'string' == typeof e ? 'full-hold' !== e : e));
      });
    }),
    e('page()', function (e) {
      return void 0 === e
        ? this.page.info().page
        : this.iterator('table', function (t) {
            Ht(t, e);
          });
    }),
    e('page.info()', function () {
      var t, e, n, a, r;
      if (0 !== this.context.length)
        return (
          (e = (t = this.context[0])._iDisplayStart),
          (n = t.oFeatures.bPaginate ? t._iDisplayLength : -1),
          (a = t.fnRecordsDisplay()),
          {
            page: (r = -1 === n) ? 0 : Math.floor(e / n),
            pages: r ? 1 : Math.ceil(a / n),
            start: e,
            end: t.fnDisplayEnd(),
            length: n,
            recordsTotal: t.fnRecordsTotal(),
            recordsDisplay: a,
            serverSide: 'ssp' === et(t),
          }
        );
    }),
    e('page.len()', function (e) {
      return void 0 === e
        ? 0 !== this.context.length
          ? this.context[0]._iDisplayLength
          : void 0
        : this.iterator('table', function (t) {
            Mt(t, e);
          });
    }),
    e('ajax.json()', function () {
      var t = this.context;
      if (0 < t.length) return t[0].json;
    }),
    e('ajax.params()', function () {
      var t = this.context;
      if (0 < t.length) return t[0].oAjaxData;
    }),
    e('ajax.reload()', function (e, n) {
      return this.iterator('table', function (t) {
        re(t, !1 === n, e);
      });
    }),
    e('ajax.url()', function (e) {
      var t = this.context;
      return void 0 === e
        ? 0 === t.length
          ? void 0
          : ((t = t[0]), V.isPlainObject(t.ajax) ? t.ajax.url : t.ajax)
        : this.iterator('table', function (t) {
            V.isPlainObject(t.ajax) ? (t.ajax.url = e) : (t.ajax = e);
          });
    }),
    e('ajax.url().load()', function (e, n) {
      return this.iterator('table', function (t) {
        re(t, !1 === n, e);
      });
    });
  function se(o, i, t, e) {
    function l(t, e) {
      var n;
      if (Array.isArray(t) || t instanceof V)
        for (var a = 0, r = t.length; a < r; a++) l(t[a], e);
      else
        t.nodeName && 'tr' === t.nodeName.toLowerCase()
          ? (t.setAttribute('data-dt-row', i.idx), s.push(t))
          : ((n = V('<tr><td></td></tr>')
              .attr('data-dt-row', i.idx)
              .addClass(e)),
            (V('td', n).addClass(e).html(t)[0].colSpan = W(o)),
            s.push(n[0]));
    }
    var s = [];
    l(t, e),
      i._details && i._details.detach(),
      (i._details = V(s)),
      i._detailsShow && i._details.insertAfter(i.nTr);
  }
  function ue(t, e) {
    var n = t.context;
    if (n.length && t.length) {
      var a = n[0].aoData[t[0]];
      if (a._details) {
        (a._detailsShow = e)
          ? (a._details.insertAfter(a.nTr), V(a.nTr).addClass('dt-hasChild'))
          : (a._details.detach(), V(a.nTr).removeClass('dt-hasChild')),
          tt(n[0], null, 'childRow', [e, t.row(t[0])]);
        var i = n[0],
          r = new U(i),
          a = '.dt.DT_details',
          e = 'draw' + a,
          t = 'column-sizing' + a,
          a = 'destroy' + a,
          l = i.aoData;
        if ((r.off(e + ' ' + t + ' ' + a), f(l, '_details').length > 0)) {
          r.on(e, function (t, e) {
            if (i !== e) return;
            r.rows({ page: 'current' })
              .eq(0)
              .each(function (t) {
                var e = l[t];
                if (e._detailsShow) e._details.insertAfter(e.nTr);
              });
          });
          r.on(t, function (t, e) {
            if (i !== e) return;
            var n,
              a = W(e);
            for (var r = 0, o = l.length; r < o; r++) {
              n = l[r];
              if (n && n._details)
                n._details.each(function () {
                  var t = V(this).children('td');
                  if (t.length == 1) t.attr('colspan', a);
                });
            }
          });
          r.on(a, function (t, e) {
            if (i !== e) return;
            for (var n = 0, a = l.length; n < a; n++)
              if (l[n] && l[n]._details) ve(r, n);
          });
        }
        ge(n);
      }
    }
  }
  function ce(t, e, n, a, r, o) {
    for (var i = [], l = 0, s = r.length; l < s; l++) i.push(G(t, r[l], e, o));
    return i;
  }
  function de(t, e, n) {
    var a = t.aoHeader;
    return a[void 0 !== n ? n : t.bSortCellsTop ? 0 : a.length - 1][e].cell;
  }
  function fe(e, n) {
    return function (t) {
      return (
        y(t) ||
          'string' != typeof t ||
          ((t = t.replace(d, ' ')), e && (t = I(t)), n && (t = O(t, !1))),
        t
      );
    };
  }
  var he = function (t, e) {
      var n,
        a = [],
        r = t.aiDisplay,
        o = t.aiDisplayMaster,
        i = e.search,
        l = e.order;
      if ('current' == e.page)
        for (u = t._iDisplayStart, c = t.fnDisplayEnd(); u < c; u++)
          a.push(r[u]);
      else if ('current' == l || 'applied' == l) {
        if ('none' == i) a = o.slice();
        else if ('applied' == i) a = r.slice();
        else if ('removed' == i) {
          for (var s = {}, u = 0, c = r.length; u < c; u++) s[r[u]] = null;
          o.forEach(function (t) {
            Object.prototype.hasOwnProperty.call(s, t) || a.push(t);
          });
        }
      } else if ('index' == l || 'original' == l)
        for (u = 0, c = t.aoData.length; u < c; u++)
          t.aoData[u] &&
            ('none' == i ||
              (-1 === (n = r.indexOf(u)) && 'removed' == i) ||
              (0 <= n && 'applied' == i)) &&
            a.push(u);
      else if ('number' == typeof l) {
        var d = zt(t, l, 'asc');
        if ('none' === i) a = d;
        else
          for (u = 0; u < d.length; u++)
            ((-1 === (n = r.indexOf(d[u])) && 'removed' == i) ||
              (0 <= n && 'applied' == i)) &&
              a.push(d[u]);
      }
      return a;
    },
    pe =
      (e('rows()', function (n, a) {
        void 0 === n ? (n = '') : V.isPlainObject(n) && ((a = n), (n = '')),
          (a = ie(a));
        var t = this.iterator(
          'table',
          function (t) {
            return (
              (e = oe(
                'row',
                (e = n),
                function (n) {
                  var t = g(n),
                    a = r.aoData;
                  if (null !== t && !o) return [t];
                  if (((i = i || he(r, o)), null !== t && -1 !== i.indexOf(t)))
                    return [t];
                  if (null == n || '' === n) return i;
                  if ('function' == typeof n)
                    return i.map(function (t) {
                      var e = a[t];
                      return n(t, e._aData, e.nTr) ? t : null;
                    });
                  if (n.nodeName)
                    return (
                      (t = n._DT_RowIndex),
                      (e = n._DT_CellIndex),
                      void 0 !== t
                        ? a[t] && a[t].nTr === n
                          ? [t]
                          : []
                        : e
                        ? a[e.row] && a[e.row].nTr === n.parentNode
                          ? [e.row]
                          : []
                        : (t = V(n).closest('*[data-dt-row]')).length
                        ? [t.data('dt-row')]
                        : []
                    );
                  if ('string' == typeof n && '#' === n.charAt(0)) {
                    var e = r.aIds[n.replace(/^#/, '')];
                    if (void 0 !== e) return [e.idx];
                  }
                  t = b(m(r.aoData, i, 'nTr'));
                  return V(t)
                    .filter(n)
                    .map(function () {
                      return this._DT_RowIndex;
                    })
                    .toArray();
                },
                (r = t),
                (o = a)
              )),
              ('current' !== o.order && 'applied' !== o.order) || qt(r, e),
              e
            );
            var r, e, o, i;
          },
          1
        );
        return (t.selector.rows = n), (t.selector.opts = a), t;
      }),
      e('rows().nodes()', function () {
        return this.iterator(
          'row',
          function (t, e) {
            return t.aoData[e].nTr || void 0;
          },
          1
        );
      }),
      e('rows().data()', function () {
        return this.iterator(
          !0,
          'rows',
          function (t, e) {
            return m(t.aoData, e, '_aData');
          },
          1
        );
      }),
      t('rows().cache()', 'row().cache()', function (n) {
        return this.iterator(
          'row',
          function (t, e) {
            t = t.aoData[e];
            return 'search' === n ? t._aFilterData : t._aSortData;
          },
          1
        );
      }),
      t('rows().invalidate()', 'row().invalidate()', function (n) {
        return this.iterator('row', function (t, e) {
          gt(t, e, n);
        });
      }),
      t('rows().indexes()', 'row().index()', function () {
        return this.iterator(
          'row',
          function (t, e) {
            return e;
          },
          1
        );
      }),
      t('rows().ids()', 'row().id()', function (t) {
        for (var e = [], n = this.context, a = 0, r = n.length; a < r; a++)
          for (var o = 0, i = this[a].length; o < i; o++) {
            var l = n[a].rowIdFn(n[a].aoData[this[a][o]]._aData);
            e.push((!0 === t ? '#' : '') + l);
          }
        return new U(n, e);
      }),
      t('rows().remove()', 'row().remove()', function () {
        return (
          this.iterator('row', function (t, e) {
            var n = t.aoData,
              a = n[e],
              r = t.aiDisplayMaster.indexOf(e),
              r =
                (-1 !== r && t.aiDisplayMaster.splice(r, 1),
                0 < t._iRecordsDisplay && t._iRecordsDisplay--,
                Kt(t),
                t.rowIdFn(a._aData));
            void 0 !== r && delete t.aIds[r], (n[e] = null);
          }),
          this
        );
      }),
      e('rows.add()', function (o) {
        var t = this.iterator(
            'table',
            function (t) {
              for (var e, n = [], a = 0, r = o.length; a < r; a++)
                (e = o[a]).nodeName && 'TR' === e.nodeName.toUpperCase()
                  ? n.push(ut(t, e)[0])
                  : n.push(Y(t, e));
              return n;
            },
            1
          ),
          e = this.rows(-1);
        return e.pop(), e.push.apply(e, t), e;
      }),
      e('row()', function (t, e) {
        return le(this.rows(t, e));
      }),
      e('row().data()', function (t) {
        var e,
          n = this.context;
        return void 0 === t
          ? n.length && this.length && this[0].length
            ? n[0].aoData[this[0]]._aData
            : void 0
          : (((e = n[0].aoData[this[0]])._aData = t),
            Array.isArray(t) && e.nTr && e.nTr.id && v(n[0].rowId)(t, e.nTr.id),
            gt(n[0], this[0], 'data'),
            this);
      }),
      e('row().node()', function () {
        var t = this.context;
        if (t.length && this.length && this[0].length) {
          t = t[0].aoData[this[0]];
          if (t && t.nTr) return t.nTr;
        }
        return null;
      }),
      e('row.add()', function (e) {
        e instanceof V && e.length && (e = e[0]);
        var t = this.iterator('table', function (t) {
          return e.nodeName && 'TR' === e.nodeName.toUpperCase()
            ? ut(t, e)[0]
            : Y(t, e);
        });
        return this.row(t[0]);
      }),
      V(_).on('plugin-init.dt', function (t, e) {
        var a = new U(e);
        a.on('stateSaveParams.DT', function (t, e, n) {
          for (
            var a = e.rowIdFn, r = e.aiDisplayMaster, o = [], i = 0;
            i < r.length;
            i++
          ) {
            var l = r[i],
              l = e.aoData[l];
            l._detailsShow && o.push('#' + a(l._aData));
          }
          n.childRows = o;
        }),
          a.on('stateLoaded.DT', function (t, e, n) {
            pe(a, n);
          }),
          pe(a, a.state.loaded());
      }),
      function (t, e) {
        e &&
          e.childRows &&
          t
            .rows(
              e.childRows.map(function (t) {
                return t.replace(/([^:\\]*(?:\\.[^:\\]*)*):/g, '$1\\:');
              })
            )
            .every(function () {
              tt(t.settings()[0], null, 'requestChild', [this]);
            });
      }),
    ge = $.util.throttle(function (t) {
      Gt(t[0]);
    }, 500),
    ve = function (t, e) {
      var n = t.context;
      n.length &&
        (e = n[0].aoData[void 0 !== e ? e : t[0]]) &&
        e._details &&
        (e._details.remove(),
        (e._detailsShow = void 0),
        (e._details = void 0),
        V(e.nTr).removeClass('dt-hasChild'),
        ge(n));
    },
    me = 'row().child',
    be = me + '()',
    ye =
      (e(be, function (t, e) {
        var n = this.context;
        return void 0 === t
          ? n.length && this.length && n[0].aoData[this[0]]
            ? n[0].aoData[this[0]]._details
            : void 0
          : (!0 === t
              ? this.child.show()
              : !1 === t
              ? ve(this)
              : n.length && this.length && se(n[0], n[0].aoData[this[0]], t, e),
            this);
      }),
      e([me + '.show()', be + '.show()'], function () {
        return ue(this, !0), this;
      }),
      e([me + '.hide()', be + '.hide()'], function () {
        return ue(this, !1), this;
      }),
      e([me + '.remove()', be + '.remove()'], function () {
        return ve(this), this;
      }),
      e(me + '.isShown()', function () {
        var t = this.context;
        return (
          (t.length && this.length && t[0].aoData[this[0]]._detailsShow) || !1
        );
      }),
      /^([^:]+):(name|title|visIdx|visible)$/),
    be =
      (e('columns()', function (n, a) {
        void 0 === n ? (n = '') : V.isPlainObject(n) && ((a = n), (n = '')),
          (a = ie(a));
        var t = this.iterator(
          'table',
          function (t) {
            return (
              (e = n),
              (l = a),
              (s = (i = t).aoColumns),
              (u = f(s, 'sName')),
              (c = f(s, 'sTitle')),
              (t = $.util.get('[].[].cell')(i.aoHeader)),
              (d = x(E([], t))),
              oe(
                'column',
                e,
                function (n) {
                  var a,
                    t = g(n);
                  if ('' === n) return h(s.length);
                  if (null !== t) return [0 <= t ? t : s.length + t];
                  if ('function' == typeof n)
                    return (
                      (a = he(i, l)),
                      s.map(function (t, e) {
                        return n(e, ce(i, e, 0, 0, a), de(i, e)) ? e : null;
                      })
                    );
                  var r = 'string' == typeof n ? n.match(ye) : '';
                  if (r)
                    switch (r[2]) {
                      case 'visIdx':
                      case 'visible':
                        var e,
                          o = parseInt(r[1], 10);
                        return o < 0
                          ? [
                              (e = s.map(function (t, e) {
                                return t.bVisible ? e : null;
                              }))[e.length + o],
                            ]
                          : [H(i, o)];
                      case 'name':
                        return u.map(function (t, e) {
                          return t === r[1] ? e : null;
                        });
                      case 'title':
                        return c.map(function (t, e) {
                          return t === r[1] ? e : null;
                        });
                      default:
                        return [];
                    }
                  return n.nodeName && n._DT_CellIndex
                    ? [n._DT_CellIndex.column]
                    : (t = V(d)
                        .filter(n)
                        .map(function () {
                          return st(this);
                        })
                        .toArray()).length || !n.nodeName
                    ? t
                    : (t = V(n).closest('*[data-dt-column]')).length
                    ? [t.data('dt-column')]
                    : [];
                },
                i,
                l
              )
            );
            var i, e, l, s, u, c, d;
          },
          1
        );
        return (t.selector.cols = n), (t.selector.opts = a), t;
      }),
      t('columns().header()', 'column().header()', function (n) {
        return this.iterator(
          'column',
          function (t, e) {
            return de(t, e, n);
          },
          1
        );
      }),
      t('columns().footer()', 'column().footer()', function (n) {
        return this.iterator(
          'column',
          function (t, e) {
            return t.aoFooter.length
              ? t.aoFooter[void 0 !== n ? n : 0][e].cell
              : null;
          },
          1
        );
      }),
      t('columns().data()', 'column().data()', function () {
        return this.iterator('column-rows', ce, 1);
      }),
      t('columns().render()', 'column().render()', function (o) {
        return this.iterator(
          'column-rows',
          function (t, e, n, a, r) {
            return ce(t, e, 0, 0, r, o);
          },
          1
        );
      }),
      t('columns().dataSrc()', 'column().dataSrc()', function () {
        return this.iterator(
          'column',
          function (t, e) {
            return t.aoColumns[e].mData;
          },
          1
        );
      }),
      t('columns().cache()', 'column().cache()', function (o) {
        return this.iterator(
          'column-rows',
          function (t, e, n, a, r) {
            return m(
              t.aoData,
              r,
              'search' === o ? '_aFilterData' : '_aSortData',
              e
            );
          },
          1
        );
      }),
      t('columns().init()', 'column().init()', function () {
        return this.iterator(
          'column',
          function (t, e) {
            return t.aoColumns[e];
          },
          1
        );
      }),
      t('columns().nodes()', 'column().nodes()', function () {
        return this.iterator(
          'column-rows',
          function (t, e, n, a, r) {
            return m(t.aoData, r, 'anCells', e);
          },
          1
        );
      }),
      t('columns().titles()', 'column().title()', function (n, a) {
        return this.iterator(
          'column',
          function (t, e) {
            'number' == typeof n && ((a = n), (n = void 0));
            e = V('span.dt-column-title', this.column(e).header(a));
            return void 0 !== n ? (e.html(n), this) : e.html();
          },
          1
        );
      }),
      t('columns().types()', 'column().type()', function () {
        return this.iterator(
          'column',
          function (t, e) {
            e = t.aoColumns[e].sType;
            return e || B(t), e;
          },
          1
        );
      }),
      t('columns().visible()', 'column().visible()', function (n, a) {
        var e = this,
          r = [],
          t = this.iterator('column', function (t, e) {
            if (void 0 === n) return t.aoColumns[e].bVisible;
            !(function (t, e, n) {
              var a,
                r,
                o = t.aoColumns,
                i = o[e],
                l = t.aoData;
              if (void 0 === n) return i.bVisible;
              if (i.bVisible === n) return !1;
              if (n)
                for (
                  var s = f(o, 'bVisible').indexOf(!0, e + 1),
                    u = 0,
                    c = l.length;
                  u < c;
                  u++
                )
                  l[u] &&
                    ((r = l[u].nTr), (a = l[u].anCells), r) &&
                    r.insertBefore(a[e], a[s] || null);
              else V(f(t.aoData, 'anCells', e)).detach();
              return (i.bVisible = n), Bt(t), !0;
            })(t, e, n) || r.push(e);
          });
        return (
          void 0 !== n &&
            this.iterator('table', function (t) {
              St(t, t.aoHeader),
                St(t, t.aoFooter),
                t.aiDisplay.length ||
                  V(t.nTBody).find('td[colspan]').attr('colspan', W(t)),
                Gt(t),
                e.iterator('column', function (t, e) {
                  r.includes(e) &&
                    tt(t, null, 'column-visibility', [t, e, n, a]);
                }),
                r.length && (void 0 === a || a) && e.columns.adjust();
            }),
          t
        );
      }),
      t('columns().widths()', 'column().width()', function () {
        var t = this.columns(':visible').count(),
          t = V('<tr>').html('<td>' + Array(t).join('</td><td>') + '</td>'),
          n =
            (V(this.table().body()).append(t),
            t.children().map(function () {
              return V(this).outerWidth();
            }));
        return (
          t.remove(),
          this.iterator(
            'column',
            function (t, e) {
              t = T(t, e);
              return null !== t ? n[t] : 0;
            },
            1
          )
        );
      }),
      t('columns().indexes()', 'column().index()', function (n) {
        return this.iterator(
          'column',
          function (t, e) {
            return 'visible' === n ? T(t, e) : e;
          },
          1
        );
      }),
      e('columns.adjust()', function () {
        return this.iterator(
          'table',
          function (t) {
            M(t);
          },
          1
        );
      }),
      e('column.index()', function (t, e) {
        var n;
        if (0 !== this.context.length)
          return (
            (n = this.context[0]),
            'fromVisible' === t || 'toData' === t
              ? H(n, e)
              : 'fromData' === t || 'toVisible' === t
              ? T(n, e)
              : void 0
          );
      }),
      e('column()', function (t, e) {
        return le(this.columns(t, e));
      }),
      e('cells()', function (g, t, v) {
        var a, r, o, i, l, s, e;
        return (
          V.isPlainObject(g) &&
            (void 0 === g.row ? ((v = g), (g = null)) : ((v = t), (t = null))),
          V.isPlainObject(t) && ((v = t), (t = null)),
          null == t
            ? this.iterator('table', function (t) {
                return (
                  (a = t),
                  (t = g),
                  (e = ie(v)),
                  (d = a.aoData),
                  (f = he(a, e)),
                  (n = b(m(d, f, 'anCells'))),
                  (h = V(E([], n))),
                  (p = a.aoColumns.length),
                  oe(
                    'cell',
                    t,
                    function (t) {
                      var e,
                        n = 'function' == typeof t;
                      if (null == t || n) {
                        for (o = [], i = 0, l = f.length; i < l; i++)
                          for (r = f[i], s = 0; s < p; s++)
                            (u = { row: r, column: s }),
                              (!n ||
                                ((c = d[r]),
                                t(
                                  u,
                                  G(a, r, s),
                                  c.anCells ? c.anCells[s] : null
                                ))) &&
                                o.push(u);
                        return o;
                      }
                      return V.isPlainObject(t)
                        ? void 0 !== t.column &&
                          void 0 !== t.row &&
                          -1 !== f.indexOf(t.row)
                          ? [t]
                          : []
                        : (e = h
                            .filter(t)
                            .map(function (t, e) {
                              return {
                                row: e._DT_CellIndex.row,
                                column: e._DT_CellIndex.column,
                              };
                            })
                            .toArray()).length || !t.nodeName
                        ? e
                        : (c = V(t).closest('*[data-dt-row]')).length
                        ? [
                            {
                              row: c.data('dt-row'),
                              column: c.data('dt-column'),
                            },
                          ]
                        : [];
                    },
                    a,
                    e
                  )
                );
                var a, e, r, o, i, l, s, u, c, d, f, n, h, p;
              })
            : ((e = v
                ? { page: v.page, order: v.order, search: v.search }
                : {}),
              (a = this.columns(t, e)),
              (r = this.rows(g, e)),
              (e = this.iterator(
                'table',
                function (t, e) {
                  var n = [];
                  for (o = 0, i = r[e].length; o < i; o++)
                    for (l = 0, s = a[e].length; l < s; l++)
                      n.push({ row: r[e][o], column: a[e][l] });
                  return n;
                },
                1
              )),
              (e = v && v.selected ? this.cells(e, v) : e),
              V.extend(e.selector, { cols: t, rows: g, opts: v }),
              e)
        );
      }),
      t('cells().nodes()', 'cell().node()', function () {
        return this.iterator(
          'cell',
          function (t, e, n) {
            t = t.aoData[e];
            return t && t.anCells ? t.anCells[n] : void 0;
          },
          1
        );
      }),
      e('cells().data()', function () {
        return this.iterator(
          'cell',
          function (t, e, n) {
            return G(t, e, n);
          },
          1
        );
      }),
      t('cells().cache()', 'cell().cache()', function (a) {
        return (
          (a = 'search' === a ? '_aFilterData' : '_aSortData'),
          this.iterator(
            'cell',
            function (t, e, n) {
              return t.aoData[e][a][n];
            },
            1
          )
        );
      }),
      t('cells().render()', 'cell().render()', function (a) {
        return this.iterator(
          'cell',
          function (t, e, n) {
            return G(t, e, n, a);
          },
          1
        );
      }),
      t('cells().indexes()', 'cell().index()', function () {
        return this.iterator(
          'cell',
          function (t, e, n) {
            return { row: e, column: n, columnVisible: T(t, n) };
          },
          1
        );
      }),
      t('cells().invalidate()', 'cell().invalidate()', function (a) {
        return this.iterator('cell', function (t, e, n) {
          gt(t, e, a, n);
        });
      }),
      e('cell()', function (t, e, n) {
        return le(this.cells(t, e, n));
      }),
      e('cell().data()', function (t) {
        var e,
          n,
          a,
          r,
          o,
          i = this.context,
          l = this[0];
        return void 0 === t
          ? i.length && l.length
            ? G(i[0], l[0].row, l[0].column)
            : void 0
          : ((e = i[0]),
            (n = l[0].row),
            (a = l[0].column),
            (r = e.aoColumns[a]),
            (o = e.aoData[n]._aData),
            r.fnSetData(o, t, { settings: e, row: n, col: a }),
            gt(i[0], l[0].row, 'data', l[0].column),
            this);
      }),
      e('order()', function (e, t) {
        var n = this.context,
          a = Array.prototype.slice.call(arguments);
        return void 0 === e
          ? 0 !== n.length
            ? n[0].aaSorting
            : void 0
          : ('number' == typeof e ? (e = [[e, t]]) : 1 < a.length && (e = a),
            this.iterator('table', function (t) {
              t.aaSorting = Array.isArray(e) ? e.slice() : e;
            }));
      }),
      e('order.listener()', function (e, n, a) {
        return this.iterator('table', function (t) {
          Vt(t, e, {}, n, a);
        });
      }),
      e('order.fixed()', function (e) {
        var t;
        return e
          ? this.iterator('table', function (t) {
              t.aaSortingFixed = V.extend(!0, {}, e);
            })
          : ((t = (t = this.context).length ? t[0].aaSortingFixed : void 0),
            Array.isArray(t) ? { pre: t } : t);
      }),
      e(['columns().order()', 'column().order()'], function (n) {
        var a = this;
        return n
          ? this.iterator('table', function (t, e) {
              t.aaSorting = a[e].map(function (t) {
                return [t, n];
              });
            })
          : this.iterator(
              'column',
              function (t, e) {
                for (var n = $t(t), a = 0, r = n.length; a < r; a++)
                  if (n[a].col === e) return n[a].dir;
                return null;
              },
              1
            );
      }),
      t('columns().orderable()', 'column().orderable()', function (n) {
        return this.iterator(
          'column',
          function (t, e) {
            t = t.aoColumns[e];
            return n ? t.asSorting : t.bSortable;
          },
          1
        );
      }),
      e('processing()', function (e) {
        return this.iterator('table', function (t) {
          w(t, e);
        });
      }),
      e('search()', function (e, n, a, r) {
        var t = this.context;
        return void 0 === e
          ? 0 !== t.length
            ? t[0].oPreviousSearch.search
            : void 0
          : this.iterator('table', function (t) {
              t.oFeatures.bFilter &&
                Nt(
                  t,
                  'object' == typeof n
                    ? V.extend(t.oPreviousSearch, n, { search: e })
                    : V.extend(t.oPreviousSearch, {
                        search: e,
                        regex: null !== n && n,
                        smart: null === a || a,
                        caseInsensitive: null === r || r,
                      })
                );
            });
      }),
      e('search.fixed()', function (e, n) {
        var t = this.iterator(!0, 'table', function (t) {
          t = t.searchFixed;
          return e
            ? void 0 === n
              ? t[e]
              : (null === n ? delete t[e] : (t[e] = n), this)
            : Object.keys(t);
        });
        return void 0 !== e && void 0 === n ? t[0] : t;
      }),
      t('columns().search()', 'column().search()', function (a, r, o, i) {
        return this.iterator('column', function (t, e) {
          var n = t.aoPreSearchCols;
          if (void 0 === a) return n[e].search;
          t.oFeatures.bFilter &&
            ('object' == typeof r
              ? V.extend(n[e], r, { search: a })
              : V.extend(n[e], {
                  search: a,
                  regex: null !== r && r,
                  smart: null === o || o,
                  caseInsensitive: null === i || i,
                }),
            Nt(t, t.oPreviousSearch));
        });
      }),
      e(
        ['columns().search.fixed()', 'column().search.fixed()'],
        function (n, a) {
          var t = this.iterator(!0, 'column', function (t, e) {
            t = t.aoColumns[e].searchFixed;
            return n
              ? void 0 === a
                ? t[n]
                : (null === a ? delete t[n] : (t[n] = a), this)
              : Object.keys(t);
          });
          return void 0 !== n && void 0 === a ? t[0] : t;
        }
      ),
      e('state()', function (t, e) {
        var n;
        return t
          ? ((n = V.extend(!0, {}, t)),
            this.iterator('table', function (t) {
              !1 !== e && (n.time = +new Date() + 100),
                Jt(t, n, function () {});
            }))
          : this.context.length
          ? this.context[0].oSavedState
          : null;
      }),
      e('state.clear()', function () {
        return this.iterator('table', function (t) {
          t.fnStateSaveCallback.call(t.oInstance, t, {});
        });
      }),
      e('state.loaded()', function () {
        return this.context.length ? this.context[0].oLoadedState : null;
      }),
      e('state.save()', function () {
        return this.iterator('table', function (t) {
          Gt(t);
        });
      }),
      ($.use = function (t, e) {
        'lib' === e || t.fn
          ? (V = t)
          : 'win' == e || t.document
          ? (_ = (q = t).document)
          : ('datetime' !== e && 'DateTime' !== t.type) || ($.DateTime = t);
      }),
      ($.factory = function (t, e) {
        var n = !1;
        return (
          t && t.document && (_ = (q = t).document),
          e && e.fn && e.fn.jquery && ((V = e), (n = !0)),
          n
        );
      }),
      ($.versionCheck = function (t, e) {
        for (
          var n,
            a,
            r = (e || $.version).split('.'),
            o = t.split('.'),
            i = 0,
            l = o.length;
          i < l;
          i++
        )
          if ((n = parseInt(r[i], 10) || 0) !== (a = parseInt(o[i], 10) || 0))
            return a < n;
        return !0;
      }),
      ($.isDataTable = function (t) {
        var r = V(t).get(0),
          o = !1;
        return (
          t instanceof $.Api ||
          (V.each($.settings, function (t, e) {
            var n = e.nScrollHead ? V('table', e.nScrollHead)[0] : null,
              a = e.nScrollFoot ? V('table', e.nScrollFoot)[0] : null;
            (e.nTable !== r && n !== r && a !== r) || (o = !0);
          }),
          o)
        );
      }),
      ($.tables = function (e) {
        var t = !1,
          n =
            (V.isPlainObject(e) && ((t = e.api), (e = e.visible)),
            $.settings
              .filter(function (t) {
                return !(e && !V(t.nTable).is(':visible'));
              })
              .map(function (t) {
                return t.nTable;
              }));
        return t ? new U(n) : n;
      }),
      ($.camelToHungarian = z),
      e('$()', function (t, e) {
        (e = this.rows(e).nodes()), (e = V(e));
        return V([].concat(e.filter(t).toArray(), e.find(t).toArray()));
      }),
      V.each(['on', 'one', 'off'], function (t, n) {
        e(n + '()', function () {
          var t = Array.prototype.slice.call(arguments),
            e =
              ((t[0] = t[0]
                .split(/\s/)
                .map(function (t) {
                  return t.match(/\.dt\b/) ? t : t + '.dt';
                })
                .join(' ')),
              V(this.tables().nodes()));
          return e[n].apply(e, t), this;
        });
      }),
      e('clear()', function () {
        return this.iterator('table', function (t) {
          pt(t);
        });
      }),
      e('error()', function (e) {
        return this.iterator('table', function (t) {
          Z(t, 0, e);
        });
      }),
      e('settings()', function () {
        return new U(this.context, this.context);
      }),
      e('init()', function () {
        var t = this.context;
        return t.length ? t[0].oInit : null;
      }),
      e('data()', function () {
        return this.iterator('table', function (t) {
          return f(t.aoData, '_aData');
        }).flatten();
      }),
      e('trigger()', function (e, n, a) {
        return this.iterator('table', function (t) {
          return tt(t, null, e, n, a);
        }).flatten();
      }),
      e('ready()', function (t) {
        var e = this.context;
        return t
          ? this.tables().every(function () {
              this.context[0]._bInitComplete
                ? t.call(this)
                : this.on('init', function () {
                    t.call(this);
                  });
            })
          : e.length
          ? e[0]._bInitComplete || !1
          : null;
      }),
      e('destroy()', function (c) {
        return (
          (c = c || !1),
          this.iterator('table', function (t) {
            var e = t.oClasses,
              n = t.nTable,
              a = t.nTBody,
              r = t.nTHead,
              o = t.nTFoot,
              i = V(n),
              a = V(a),
              l = V(t.nTableWrapper),
              s = t.aoData.map(function (t) {
                return t ? t.nTr : null;
              }),
              u = e.order,
              o =
                ((t.bDestroying = !0),
                tt(t, 'aoDestroyCallback', 'destroy', [t], !0),
                c || new U(t).columns().visible(!0),
                l.off('.DT').find(':not(tbody *)').off('.DT'),
                V(q).off('.DT-' + t.sInstance),
                n != r.parentNode &&
                  (i.children('thead').detach(), i.append(r)),
                o &&
                  n != o.parentNode &&
                  (i.children('tfoot').detach(), i.append(o)),
                t.colgroup.remove(),
                (t.aaSorting = []),
                (t.aaSortingFixed = []),
                Yt(t),
                V('th, td', r)
                  .removeClass(
                    u.canAsc + ' ' + u.canDesc + ' ' + u.isAsc + ' ' + u.isDesc
                  )
                  .css('width', ''),
                a.children().detach(),
                a.append(s),
                t.nTableWrapper.parentNode),
              r = t.nTableWrapper.nextSibling,
              u = c ? 'remove' : 'detach',
              a =
                (i[u](),
                l[u](),
                !c &&
                  o &&
                  (o.insertBefore(n, r),
                  i.css('width', t.sDestroyWidth).removeClass(e.table)),
                $.settings.indexOf(t));
            -1 !== a && $.settings.splice(a, 1);
          })
        );
      }),
      V.each(['column', 'row', 'cell'], function (t, s) {
        e(s + 's().every()', function (a) {
          var r,
            o = this.selector.opts,
            i = this,
            l = 0;
          return this.iterator('every', function (t, e, n) {
            (r = i[s](e, o)),
              'cell' === s
                ? a.call(r, r[0][0].row, r[0][0].column, n, l)
                : a.call(r, e, n, l),
              l++;
          });
        });
      }),
      e('i18n()', function (t, e, n) {
        var a = this.context[0],
          t = J(t)(a.oLanguage);
        return 'string' ==
          typeof (t = V.isPlainObject((t = void 0 === t ? e : t))
            ? void 0 !== n && void 0 !== t[n]
              ? t[n]
              : t._
            : t)
          ? t.replace('%d', n)
          : t;
      }),
      ($.version = '2.0.7'),
      ($.settings = []),
      ($.models = {}),
      ($.models.oSearch = {
        caseInsensitive: !0,
        search: '',
        regex: !1,
        smart: !0,
        return: !1,
      }),
      ($.models.oRow = {
        nTr: null,
        anCells: null,
        _aData: [],
        _aSortData: null,
        _aFilterData: null,
        _sFilterRow: null,
        src: null,
        idx: -1,
        displayData: null,
      }),
      ($.models.oColumn = {
        idx: null,
        aDataSort: null,
        asSorting: null,
        bSearchable: null,
        bSortable: null,
        bVisible: null,
        _sManualType: null,
        _bAttrSrc: !1,
        fnCreatedCell: null,
        fnGetData: null,
        fnSetData: null,
        mData: null,
        mRender: null,
        sClass: null,
        sContentPadding: null,
        sDefaultContent: null,
        sName: null,
        sSortDataType: 'std',
        sSortingClass: null,
        sTitle: null,
        sType: null,
        sWidth: null,
        sWidthOrig: null,
        maxLenString: null,
        searchFixed: null,
      }),
      ($.defaults = {
        aaData: null,
        aaSorting: [[0, 'asc']],
        aaSortingFixed: [],
        ajax: null,
        aLengthMenu: [10, 25, 50, 100],
        aoColumns: null,
        aoColumnDefs: null,
        aoSearchCols: [],
        bAutoWidth: !0,
        bDeferRender: !0,
        bDestroy: !1,
        bFilter: !0,
        bInfo: !0,
        bLengthChange: !0,
        bPaginate: !0,
        bProcessing: !1,
        bRetrieve: !1,
        bScrollCollapse: !1,
        bServerSide: !1,
        bSort: !0,
        bSortMulti: !0,
        bSortCellsTop: null,
        bSortClasses: !0,
        bStateSave: !1,
        fnCreatedRow: null,
        fnDrawCallback: null,
        fnFooterCallback: null,
        fnFormatNumber: function (t) {
          return t
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, this.oLanguage.sThousands);
        },
        fnHeaderCallback: null,
        fnInfoCallback: null,
        fnInitComplete: null,
        fnPreDrawCallback: null,
        fnRowCallback: null,
        fnStateLoadCallback: function (t) {
          try {
            return JSON.parse(
              (-1 === t.iStateDuration ? sessionStorage : localStorage).getItem(
                'DataTables_' + t.sInstance + '_' + location.pathname
              )
            );
          } catch (t) {
            return {};
          }
        },
        fnStateLoadParams: null,
        fnStateLoaded: null,
        fnStateSaveCallback: function (t, e) {
          try {
            (-1 === t.iStateDuration ? sessionStorage : localStorage).setItem(
              'DataTables_' + t.sInstance + '_' + location.pathname,
              JSON.stringify(e)
            );
          } catch (t) {}
        },
        fnStateSaveParams: null,
        iStateDuration: 7200,
        iDisplayLength: 10,
        iDisplayStart: 0,
        iTabIndex: 0,
        oClasses: {},
        oLanguage: {
          oAria: {
            orderable: ': Activate to sort',
            orderableReverse: ': Activate to invert sorting',
            orderableRemove: ': Activate to remove sorting',
            paginate: {
              first: 'First',
              last: 'Last',
              next: 'Next',
              previous: 'Previous',
            },
          },
          oPaginate: { sFirst: '«', sLast: '»', sNext: '›', sPrevious: '‹' },
          entries: { _: 'entries', 1: 'entry' },
          sEmptyTable: 'No data available in table',
          sInfo: 'Showing _START_ to _END_ of _TOTAL_ _ENTRIES-TOTAL_',
          sInfoEmpty: 'Showing 0 to 0 of 0 _ENTRIES-TOTAL_',
          sInfoFiltered: '(filtered from _MAX_ total _ENTRIES-MAX_)',
          sInfoPostFix: '',
          sDecimal: '',
          sThousands: ',',
          sLengthMenu: '_MENU_ _ENTRIES_ per page',
          sLoadingRecords: 'Loading...',
          sProcessing: '',
          sSearch: 'Search:',
          sSearchPlaceholder: '',
          sUrl: '',
          sZeroRecords: 'No matching records found',
        },
        oSearch: V.extend({}, $.models.oSearch),
        layout: {
          topStart: 'pageLength',
          topEnd: 'search',
          bottomStart: 'info',
          bottomEnd: 'paging',
        },
        sDom: null,
        searchDelay: null,
        sPaginationType: 'full_numbers',
        sScrollX: '',
        sScrollXInner: '',
        sScrollY: '',
        sServerMethod: 'GET',
        renderer: null,
        rowId: 'DT_RowId',
        caption: null,
      }),
      k($.defaults),
      ($.defaults.column = {
        aDataSort: null,
        iDataSort: -1,
        ariaTitle: '',
        asSorting: ['asc', 'desc', ''],
        bSearchable: !0,
        bSortable: !0,
        bVisible: !0,
        fnCreatedCell: null,
        mData: null,
        mRender: null,
        sCellType: 'td',
        sClass: '',
        sContentPadding: '',
        sDefaultContent: null,
        sName: '',
        sSortDataType: 'std',
        sTitle: null,
        sType: null,
        sWidth: null,
      }),
      k($.defaults.column),
      ($.models.oSettings = {
        oFeatures: {
          bAutoWidth: null,
          bDeferRender: null,
          bFilter: null,
          bInfo: !0,
          bLengthChange: !0,
          bPaginate: null,
          bProcessing: null,
          bServerSide: null,
          bSort: null,
          bSortMulti: null,
          bSortClasses: null,
          bStateSave: null,
        },
        oScroll: {
          bCollapse: null,
          iBarWidth: 0,
          sX: null,
          sXInner: null,
          sY: null,
        },
        oLanguage: { fnInfoCallback: null },
        oBrowser: { bScrollbarLeft: !1, barWidth: 0 },
        ajax: null,
        aanFeatures: [],
        aoData: [],
        aiDisplay: [],
        aiDisplayMaster: [],
        aIds: {},
        aoColumns: [],
        aoHeader: [],
        aoFooter: [],
        oPreviousSearch: {},
        searchFixed: {},
        aoPreSearchCols: [],
        aaSorting: null,
        aaSortingFixed: [],
        sDestroyWidth: 0,
        aoRowCallback: [],
        aoHeaderCallback: [],
        aoFooterCallback: [],
        aoDrawCallback: [],
        aoRowCreatedCallback: [],
        aoPreDrawCallback: [],
        aoInitComplete: [],
        aoStateSaveParams: [],
        aoStateLoadParams: [],
        aoStateLoaded: [],
        sTableId: '',
        nTable: null,
        nTHead: null,
        nTFoot: null,
        nTBody: null,
        nTableWrapper: null,
        bInitialised: !1,
        aoOpenRows: [],
        sDom: null,
        searchDelay: null,
        sPaginationType: 'two_button',
        pagingControls: 0,
        iStateDuration: 0,
        aoStateSave: [],
        aoStateLoad: [],
        oSavedState: null,
        oLoadedState: null,
        bAjaxDataGet: !0,
        jqXHR: null,
        json: void 0,
        oAjaxData: void 0,
        sServerMethod: null,
        fnFormatNumber: null,
        aLengthMenu: null,
        iDraw: 0,
        bDrawing: !1,
        iDrawError: -1,
        _iDisplayLength: 10,
        _iDisplayStart: 0,
        _iRecordsTotal: 0,
        _iRecordsDisplay: 0,
        oClasses: {},
        bFiltered: !1,
        bSorted: !1,
        bSortCellsTop: null,
        oInit: null,
        aoDestroyCallback: [],
        fnRecordsTotal: function () {
          return 'ssp' == et(this)
            ? +this._iRecordsTotal
            : this.aiDisplayMaster.length;
        },
        fnRecordsDisplay: function () {
          return 'ssp' == et(this)
            ? +this._iRecordsDisplay
            : this.aiDisplay.length;
        },
        fnDisplayEnd: function () {
          var t = this._iDisplayLength,
            e = this._iDisplayStart,
            n = e + t,
            a = this.aiDisplay.length,
            r = this.oFeatures,
            o = r.bPaginate;
          return r.bServerSide
            ? !1 === o || -1 === t
              ? e + a
              : Math.min(e + t, this._iRecordsDisplay)
            : !o || a < n || -1 === t
            ? a
            : n;
        },
        oInstance: null,
        sInstance: null,
        iTabIndex: 0,
        nScrollHead: null,
        nScrollFoot: null,
        aLastSort: [],
        oPlugins: {},
        rowIdFn: null,
        rowId: null,
        caption: '',
        captionNode: null,
        colgroup: null,
      }),
      $.ext.pager);
  V.extend(be, {
    simple: function () {
      return ['previous', 'next'];
    },
    full: function () {
      return ['first', 'previous', 'next', 'last'];
    },
    numbers: function () {
      return ['numbers'];
    },
    simple_numbers: function () {
      return ['previous', 'numbers', 'next'];
    },
    full_numbers: function () {
      return ['first', 'previous', 'numbers', 'next', 'last'];
    },
    first_last: function () {
      return ['first', 'last'];
    },
    first_last_numbers: function () {
      return ['first', 'numbers', 'last'];
    },
    _numbers: Ne,
    numbers_length: 7,
  }),
    V.extend(!0, $.ext.renderer, {
      pagingButton: {
        _: function (t, e, n, a, r) {
          var t = t.oClasses.paging,
            o = [t.button];
          return (
            a && o.push(t.active),
            r && o.push(t.disabled),
            {
              display: (a =
                'ellipsis' === e
                  ? V('<span class="ellipsis"></span>').html(n)[0]
                  : V('<button>', {
                      class: o.join(' '),
                      role: 'link',
                      type: 'button',
                    }).html(n)),
              clicker: a,
            }
          );
        },
      },
      pagingContainer: {
        _: function (t, e) {
          return e;
        },
      },
    });
  function De(t) {
    return t.replace(/[\W]/g, '_');
  }
  function xe(t, e, n, a, r) {
    return q.moment ? t[e](r) : q.luxon ? t[n](r) : a ? t[a](r) : t;
  }
  var Se = !1;
  function Te(t, e, n) {
    var a;
    if (q.moment) {
      if (!(a = q.moment.utc(t, e, n, !0)).isValid()) return null;
    } else if (q.luxon) {
      if (
        !(a =
          e && 'string' == typeof t
            ? q.luxon.DateTime.fromFormat(t, e)
            : q.luxon.DateTime.fromISO(t)).isValid
      )
        return null;
      a.setLocale(n);
    } else
      e
        ? (Se ||
            alert(
              'DataTables warning: Formatted date without Moment.js or Luxon - https://datatables.net/tn/17'
            ),
          (Se = !0))
        : (a = new Date(t));
    return a;
  }
  function we(s) {
    return function (a, r, o, i) {
      0 === arguments.length
        ? ((o = 'en'), (a = r = null))
        : 1 === arguments.length
        ? ((o = 'en'), (r = a), (a = null))
        : 2 === arguments.length && ((o = r), (r = a), (a = null));
      var l = 'datetime' + (r ? '-' + De(r) : '');
      return (
        $.ext.type.order[l] ||
          $.type(l, {
            detect: function (t) {
              return t === l && l;
            },
            order: {
              pre: function (t) {
                return t.valueOf();
              },
            },
            className: 'dt-right',
          }),
        function (t, e) {
          var n;
          return (
            null == t &&
              (t =
                '--now' === i
                  ? ((n = new Date()),
                    new Date(
                      Date.UTC(
                        n.getFullYear(),
                        n.getMonth(),
                        n.getDate(),
                        n.getHours(),
                        n.getMinutes(),
                        n.getSeconds()
                      )
                    ))
                  : ''),
            'type' === e
              ? l
              : '' === t
              ? 'sort' !== e
                ? ''
                : Te('0000-01-01 00:00:00', null, o)
              : !(
                  null === r ||
                  a !== r ||
                  'sort' === e ||
                  'type' === e ||
                  t instanceof Date
                ) || null === (n = Te(t, a, o))
              ? t
              : 'sort' === e
              ? n
              : ((t =
                  null === r
                    ? xe(n, 'toDate', 'toJSDate', '')[s]()
                    : xe(n, 'format', 'toFormat', 'toISOString', r)),
                'display' === e ? u(t) : t)
          );
        }
      );
    };
  }
  var _e = ',',
    Ce = '.';
  if (void 0 !== q.Intl)
    try {
      for (
        var Ie = new Intl.NumberFormat().formatToParts(100000.1), a = 0;
        a < Ie.length;
        a++
      )
        'group' === Ie[a].type
          ? (_e = Ie[a].value)
          : 'decimal' === Ie[a].type && (Ce = Ie[a].value);
    } catch (t) {}
  ($.datetime = function (n, a) {
    var r = 'datetime-detect-' + De(n);
    (a = a || 'en'),
      $.ext.type.order[r] ||
        $.type(r, {
          detect: function (t) {
            var e = Te(t, n, a);
            return !('' !== t && !e) && r;
          },
          order: {
            pre: function (t) {
              return Te(t, n, a) || 0;
            },
          },
          className: 'dt-right',
        });
  }),
    ($.render = {
      date: we('toLocaleDateString'),
      datetime: we('toLocaleString'),
      time: we('toLocaleTimeString'),
      number: function (r, o, i, l, s) {
        return (
          null == r && (r = _e),
          null == o && (o = Ce),
          {
            display: function (t) {
              if ('number' != typeof t && 'string' != typeof t) return t;
              if ('' === t || null === t) return t;
              var e = t < 0 ? '-' : '',
                n = parseFloat(t),
                a = Math.abs(n);
              if (1e11 <= a || (a < 1e-4 && 0 !== a))
                return (
                  (a = n.toExponential(i).split(/e\+?/))[0] +
                  ' x 10<sup>' +
                  a[1] +
                  '</sup>'
                );
              if (isNaN(n)) return u(t);
              (n = n.toFixed(i)), (t = Math.abs(n));
              (a = parseInt(t, 10)),
                (n = i ? o + (t - a).toFixed(i).substring(2) : '');
              return (
                (e = 0 === a && 0 === parseFloat(n) ? '' : e) +
                (l || '') +
                a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, r) +
                n +
                (s || '')
              );
            },
          }
        );
      },
      text: function () {
        return { display: u, filter: u };
      },
    });
  var i = $.ext.type,
    Ae =
      (($.type = function (a, t, e) {
        if (!t)
          return {
            className: i.className[a],
            detect: i.detect.find(function (t) {
              return t.name === a;
            }),
            order: {
              pre: i.order[a + '-pre'],
              asc: i.order[a + '-asc'],
              desc: i.order[a + '-desc'],
            },
            render: i.render[a],
            search: i.search[a],
          };
        function n(t, e) {
          i[t][a] = e;
        }
        function r(n) {
          function t(t, e) {
            return !0 === (t = n(t, e)) ? a : t;
          }
          Object.defineProperty(t, 'name', { value: a });
          var e = i.detect.findIndex(function (t) {
            return t.name === a;
          });
          -1 === e ? i.detect.unshift(t) : i.detect.splice(e, 1, t);
        }
        function o(t) {
          (i.order[a + '-pre'] = t.pre),
            (i.order[a + '-asc'] = t.asc),
            (i.order[a + '-desc'] = t.desc);
        }
        void 0 === e && ((e = t), (t = null)),
          'className' === t
            ? n('className', e)
            : 'detect' === t
            ? r(e)
            : 'order' === t
            ? o(e)
            : 'render' === t
            ? n('render', e)
            : 'search' === t
            ? n('search', e)
            : t ||
              (e.className && n('className', e.className),
              void 0 !== e.detect && r(e.detect),
              e.order && o(e.order),
              void 0 !== e.render && n('render', e.render),
              void 0 !== e.search && n('search', e.search));
      }),
      ($.types = function () {
        return i.detect.map(function (t) {
          return t.name;
        });
      }),
      $.type('string', {
        detect: function () {
          return 'string';
        },
        order: {
          pre: function (t) {
            return y(t)
              ? ''
              : 'string' == typeof t
              ? t.toLowerCase()
              : t.toString
              ? t.toString()
              : '';
          },
        },
        search: fe(!1, !0),
      }),
      $.type('html', {
        detect: function (t) {
          return y(t) || ('string' == typeof t && -1 !== t.indexOf('<'))
            ? 'html'
            : null;
        },
        order: {
          pre: function (t) {
            return y(t) ? '' : t.replace ? I(t).trim().toLowerCase() : t + '';
          },
        },
        search: fe(!0, !0),
      }),
      $.type('date', {
        className: 'dt-type-date',
        detect: function (t) {
          var e;
          return (!t || t instanceof Date || N.test(t)) &&
            ((null !== (e = Date.parse(t)) && !isNaN(e)) || y(t))
            ? 'date'
            : null;
        },
        order: {
          pre: function (t) {
            t = Date.parse(t);
            return isNaN(t) ? -1 / 0 : t;
          },
        },
      }),
      $.type('html-num-fmt', {
        className: 'dt-type-numeric',
        detect: function (t, e) {
          e = e.oLanguage.sDecimal;
          return l(t, e, !0) ? 'html-num-fmt' : null;
        },
        order: {
          pre: function (t, e) {
            e = e.oLanguage.sDecimal;
            return Ae(t, e, L, P);
          },
        },
        search: fe(!0, !0),
      }),
      $.type('html-num', {
        className: 'dt-type-numeric',
        detect: function (t, e) {
          e = e.oLanguage.sDecimal;
          return l(t, e) ? 'html-num' : null;
        },
        order: {
          pre: function (t, e) {
            e = e.oLanguage.sDecimal;
            return Ae(t, e, L);
          },
        },
        search: fe(!0, !0),
      }),
      $.type('num-fmt', {
        className: 'dt-type-numeric',
        detect: function (t, e) {
          e = e.oLanguage.sDecimal;
          return o(t, e, !0) ? 'num-fmt' : null;
        },
        order: {
          pre: function (t, e) {
            e = e.oLanguage.sDecimal;
            return Ae(t, e, P);
          },
        },
      }),
      $.type('num', {
        className: 'dt-type-numeric',
        detect: function (t, e) {
          e = e.oLanguage.sDecimal;
          return o(t, e) ? 'num' : null;
        },
        order: {
          pre: function (t, e) {
            e = e.oLanguage.sDecimal;
            return Ae(t, e);
          },
        },
      }),
      function (t, e, n, a) {
        var r;
        return 0 === t || (t && '-' !== t)
          ? 'number' == (r = typeof t) || 'bigint' == r
            ? t
            : +(t =
                (t = e ? R(t, e) : t).replace &&
                (n && (t = t.replace(n, '')), a)
                  ? t.replace(a, '')
                  : t)
          : -1 / 0;
      });
  V.extend(!0, $.ext.renderer, {
    footer: {
      _: function (t, e, n) {
        e.addClass(n.tfoot.cell);
      },
    },
    header: {
      _: function (d, f, h) {
        f.addClass(h.thead.cell), d.oFeatures.bSort || f.addClass(h.order.none);
        var t = d.bSortCellsTop,
          e = f.closest('thead').find('tr'),
          n = f.parent().index();
        'disable' === f.attr('data-dt-order') ||
          'disable' === f.parent().attr('data-dt-order') ||
          (!0 === t && 0 !== n) ||
          (!1 === t && n !== e.length - 1) ||
          V(d.nTable).on('order.dt.DT', function (t, e, n) {
            var a, r, o, i, l, s, u, c;
            d === e &&
              ((a = h.order),
              (c = e.api.columns(f)),
              (r = d.aoColumns[c.flatten()[0]]),
              (o = c.orderable().includes(!0)),
              (i = ''),
              (u = c.indexes()),
              (l = c.orderable(!0).flatten()),
              (s =
                ',' +
                n
                  .map(function (t) {
                    return t.col;
                  })
                  .join(',') +
                ','),
              f
                .removeClass(a.isAsc + ' ' + a.isDesc)
                .toggleClass(a.none, !o)
                .toggleClass(a.canAsc, o && l.includes('asc'))
                .toggleClass(a.canDesc, o && l.includes('desc')),
              -1 !== (l = s.indexOf(',' + u.toArray().join(',') + ',')) &&
                ((s = c.order()),
                f.addClass(
                  s.includes('asc')
                    ? a.isAsc
                    : '' + s.includes('desc')
                    ? a.isDesc
                    : ''
                )),
              0 === l
                ? ((u = n[0]),
                  (c = r.asSorting),
                  f.attr(
                    'aria-sort',
                    'asc' === u.dir ? 'ascending' : 'descending'
                  ),
                  (i = c[u.index + 1] ? 'Reverse' : 'Remove'))
                : f.removeAttr('aria-sort'),
              f.attr(
                'aria-label',
                o
                  ? r.ariaTitle + e.api.i18n('oAria.orderable' + i)
                  : r.ariaTitle
              ),
              o) &&
              (f.find('.dt-column-title').attr('role', 'button'),
              f.attr('tabindex', 0));
          });
      },
    },
    layout: {
      _: function (t, e, n) {
        var a = V('<div/>').addClass('dt-layout-row').appendTo(e);
        V.each(n, function (t, e) {
          t = e.table ? '' : 'dt-' + t + ' ';
          e.table && a.addClass('dt-layout-table'),
            V('<div/>')
              .attr({
                id: e.id || null,
                class: 'dt-layout-cell ' + t + (e.className || ''),
              })
              .append(e.contents)
              .appendTo(a);
        });
      },
    },
  }),
    ($.feature = {}),
    ($.feature.register = function (t, e, n) {
      ($.ext.features[t] = e), n && C.feature.push({ cFeature: n, fnInit: e });
    }),
    $.feature.register(
      'info',
      function (t, s) {
        var e, n, u;
        return t.oFeatures.bInfo
          ? ((e = t.oLanguage),
            (n = t.sTableId),
            (u = V('<div/>', { class: t.oClasses.info.container })),
            (s = V.extend(
              {
                callback: e.fnInfoCallback,
                empty: e.sInfoEmpty,
                postfix: e.sInfoPostFix,
                search: e.sInfoFiltered,
                text: e.sInfo,
              },
              s
            )),
            t.aoDrawCallback.push(function (t) {
              var e = s,
                n = u,
                a = t._iDisplayStart + 1,
                r = t.fnDisplayEnd(),
                o = t.fnRecordsTotal(),
                i = t.fnRecordsDisplay(),
                l = i ? e.text : e.empty;
              i !== o && (l += ' ' + e.search),
                (l += e.postfix),
                (l = ee(t, l)),
                e.callback &&
                  (l = e.callback.call(t.oInstance, t, a, r, o, i, l)),
                n.html(l),
                tt(t, null, 'info', [t, n[0], l]);
            }),
            t._infoEl ||
              (u.attr({
                'aria-live': 'polite',
                id: n + '_info',
                role: 'status',
              }),
              V(t.nTable).attr('aria-describedby', n + '_info'),
              (t._infoEl = u)),
            u)
          : null;
      },
      'i'
    );
  var Le = 0;
  function Fe(t, e, n, a) {
    var r = t.oLanguage.oPaginate,
      o = { display: '', active: !1, disabled: !1 };
    switch (e) {
      case 'ellipsis':
        (o.display = '&#x2026;'), (o.disabled = !0);
        break;
      case 'first':
        (o.display = r.sFirst), 0 === n && (o.disabled = !0);
        break;
      case 'previous':
        (o.display = r.sPrevious), 0 === n && (o.disabled = !0);
        break;
      case 'next':
        (o.display = r.sNext), (0 !== a && n !== a - 1) || (o.disabled = !0);
        break;
      case 'last':
        (o.display = r.sLast), (0 !== a && n !== a - 1) || (o.disabled = !0);
        break;
      default:
        'number' == typeof e &&
          ((o.display = t.fnFormatNumber(e + 1)), n === e) &&
          (o.active = !0);
    }
    return o;
  }
  function Ne(t, e, n, a) {
    var r = [],
      o = Math.floor(n / 2),
      i = a ? 2 : 1,
      l = a ? 1 : 0;
    return (
      e <= n
        ? (r = h(0, e))
        : 1 === n
        ? (r = [t])
        : 3 === n
        ? t <= 1
          ? (r = [0, 1, 'ellipsis'])
          : e - 2 <= t
          ? (r = h(e - 2, e)).unshift('ellipsis')
          : (r = ['ellipsis', t, 'ellipsis'])
        : t <= o
        ? ((r = h(0, n - i)).push('ellipsis'), a && r.push(e - 1))
        : e - 1 - o <= t
        ? ((r = h(e - (n - i), e)).unshift('ellipsis'), a && r.unshift(0))
        : ((r = h(t - o + i, t + o - l)).push('ellipsis'),
          r.unshift('ellipsis'),
          a && (r.push(e - 1), r.unshift(0))),
      r
    );
  }
  $.feature.register(
    'search',
    function (n, t) {
      var e, a, r, o, i, l, s, u, c, d;
      return n.oFeatures.bFilter
        ? ((e = n.oClasses.search),
          (a = n.sTableId),
          (c = n.oLanguage),
          (r = n.oPreviousSearch),
          (o = '<input type="search" class="' + e.input + '"/>'),
          -1 ===
            (t = V.extend(
              { placeholder: c.sSearchPlaceholder, text: c.sSearch },
              t
            )).text.indexOf('_INPUT_') && (t.text += '_INPUT_'),
          (t.text = ee(n, t.text)),
          (c = t.text.match(/_INPUT_$/)),
          (s = t.text.match(/^_INPUT_/)),
          (i = t.text.replace(/_INPUT_/, '')),
          (l = '<label>' + t.text + '</label>'),
          s
            ? (l = '_INPUT_<label>' + i + '</label>')
            : c && (l = '<label>' + i + '</label>_INPUT_'),
          (s = V('<div>')
            .addClass(e.container)
            .append(l.replace(/_INPUT_/, o)))
            .find('label')
            .attr('for', 'dt-search-' + Le),
          s.find('input').attr('id', 'dt-search-' + Le),
          Le++,
          (u = function (t) {
            var e = this.value;
            (r.return && 'Enter' !== t.key) ||
              (e != r.search &&
                ((r.search = e), Nt(n, r), (n._iDisplayStart = 0), S(n)));
          }),
          (c = null !== n.searchDelay ? n.searchDelay : 0),
          (d = V('input', s)
            .val(r.search)
            .attr('placeholder', t.placeholder)
            .on(
              'keyup.DT search.DT input.DT paste.DT cut.DT',
              c ? $.util.debounce(u, c) : u
            )
            .on('mouseup.DT', function (t) {
              setTimeout(function () {
                u.call(d[0], t);
              }, 10);
            })
            .on('keypress.DT', function (t) {
              if (13 == t.keyCode) return !1;
            })
            .attr('aria-controls', a)),
          V(n.nTable).on('search.dt.DT', function (t, e) {
            n === e &&
              d[0] !== _.activeElement &&
              d.val('function' != typeof r.search ? r.search : '');
          }),
          s)
        : null;
    },
    'f'
  ),
    $.feature.register(
      'paging',
      function (t, e) {
        if (!t.oFeatures.bPaginate) return null;
        (e = V.extend(
          {
            buttons: $.ext.pager.numbers_length,
            type: t.sPaginationType,
            boundaryNumbers: !0,
          },
          e
        )).numbers && (e.buttons = e.numbers);
        function n() {
          !(function t(e, n, a) {
            if (!e._bInitComplete) return;
            var r = $.ext.pager[a.type],
              o = e.oLanguage.oAria.paginate || {},
              i = e._iDisplayStart,
              l = e._iDisplayLength,
              s = e.fnRecordsDisplay(),
              u = -1 === l,
              c = u ? 0 : Math.ceil(i / l),
              d = u ? 1 : Math.ceil(s / l),
              f = r()
                .map(function (t) {
                  return 'numbers' === t
                    ? Ne(c, d, a.buttons, a.boundaryNumbers)
                    : t;
                })
                .flat();
            var h = [];
            for (var p = 0; p < f.length; p++) {
              var g = f[p],
                v = Fe(e, g, c, d),
                m = te(e, 'pagingButton')(
                  e,
                  g,
                  v.display,
                  v.active,
                  v.disabled
                );
              V(m.clicker).attr({
                'aria-controls': e.sTableId,
                'aria-disabled': v.disabled ? 'true' : null,
                'aria-current': v.active ? 'page' : null,
                'aria-label': o[g],
                'data-dt-idx': g,
                tabIndex: v.disabled ? -1 : e.iTabIndex,
              }),
                'number' != typeof g && V(m.clicker).addClass(g),
                Qt(m.clicker, { action: g }, function (t) {
                  t.preventDefault(), Ht(e, t.data.action, !0);
                }),
                h.push(m.display);
            }
            i = te(e, 'pagingContainer')(e, h);
            u = n.find(_.activeElement).data('dt-idx');
            n.empty().append(i);
            void 0 !== u && n.find('[data-dt-idx=' + u + ']').trigger('focus');
            h.length &&
              1 < a.numbers &&
              V(n).height() >= 2 * V(h[0]).outerHeight() - 10 &&
              t(e, n, V.extend({}, a, { numbers: a.numbers - 2 }));
          })(t, a, e);
        }
        var a = V('<div/>').addClass(
          t.oClasses.paging.container + ' paging_' + e.type
        );
        return (
          t.aoDrawCallback.push(n), V(t.nTable).on('column-sizing.dt.DT', n), a
        );
      },
      'p'
    );
  var je = 0;
  return (
    $.feature.register(
      'pageLength',
      function (a, t) {
        var e = a.oFeatures;
        if (!e.bPaginate || !e.bLengthChange) return null;
        t = V.extend({ menu: a.aLengthMenu, text: a.oLanguage.sLengthMenu }, t);
        var e = a.oClasses.length,
          n = a.sTableId,
          r = t.menu,
          o = [],
          i = [];
        if (Array.isArray(r[0])) (o = r[0]), (i = r[1]);
        else
          for (p = 0; p < r.length; p++)
            V.isPlainObject(r[p])
              ? (o.push(r[p].value), i.push(r[p].label))
              : (o.push(r[p]), i.push(r[p]));
        for (
          var l = t.text.match(/_MENU_$/),
            s = t.text.match(/^_MENU_/),
            u = t.text.replace(/_MENU_/, ''),
            t = '<label>' + t.text + '</label>',
            c =
              (s
                ? (t = '_MENU_<label>' + u + '</label>')
                : l && (t = '<label>' + u + '</label>_MENU_'),
              V('<div/>')
                .addClass(e.container)
                .append(t.replace('_MENU_', '<span></span>'))),
            d = [],
            f =
              (c.find('label')[0].childNodes.forEach(function (t) {
                t.nodeType === Node.TEXT_NODE &&
                  d.push({ el: t, text: t.textContent });
              }),
              function (e) {
                d.forEach(function (t) {
                  t.el.textContent = ee(a, t.text, e);
                });
              }),
            h = V('<select/>', {
              name: n + '_length',
              'aria-controls': n,
              class: e.select,
            }),
            p = 0;
          p < o.length;
          p++
        )
          h[0][p] = new Option(
            'number' == typeof i[p] ? a.fnFormatNumber(i[p]) : i[p],
            o[p]
          );
        return (
          c.find('label').attr('for', 'dt-length-' + je),
          h.attr('id', 'dt-length-' + je),
          je++,
          c.find('span').replaceWith(h),
          V('select', c)
            .val(a._iDisplayLength)
            .on('change.DT', function () {
              Mt(a, V(this).val()), S(a);
            }),
          V(a.nTable).on('length.dt.DT', function (t, e, n) {
            a === e && (V('select', c).val(n), f(n));
          }),
          f(a._iDisplayLength),
          c
        );
      },
      'l'
    ),
    (((V.fn.dataTable = $).$ = V).fn.dataTableSettings = $.settings),
    (V.fn.dataTableExt = $.ext),
    (V.fn.DataTable = function (t) {
      return V(this).dataTable(t).api();
    }),
    V.each($, function (t, e) {
      V.fn.DataTable[t] = e;
    }),
    $
  );
});
