(function () {
  'use strict';

  var SVG = 'http://www.w3.org/2000/svg';
  var TAU = Math.PI * 2;

  /* Sample forecast: spending index per month (1.00 = a typical month).
     Illustrative only; the real forecast comes from the user's records. */
  var YEAR = [
    { m: 'January', s: 'JAN', v: 1.05, why: 'After-holiday bills and back-to-work costs' },
    { m: 'February', s: 'FEB', v: 0.9, why: 'Usually one of the quieter months' },
    { m: 'March', s: 'MAR', v: 0.94, why: 'Summer starts and electricity use climbs' },
    { m: 'April', s: 'APR', v: 1.04, why: 'Summer heat, higher Meralco bills, Holy Week trips' },
    { m: 'May', s: 'MAY', v: 1.12, why: 'Peak electricity use and fiesta season', hot: true },
    { m: 'June', s: 'JUN', v: 1.22, why: 'School enrollment, uniforms and supplies', hot: true },
    { m: 'July', s: 'JUL', v: 1.0, why: 'Spending settles after enrollment' },
    { m: 'August', s: 'AUG', v: 0.96, why: 'Rainy season, steadier spending' },
    { m: 'September', s: 'SEP', v: 0.98, why: 'The -ber months begin' },
    { m: 'October', s: 'OCT', v: 1.0, why: 'Early Christmas shopping starts' },
    { m: 'November', s: 'NOV', v: 1.1, why: 'Undas, then the Christmas run-up' },
    { m: 'December', s: 'DEC', v: 1.5, why: 'Christmas, Noche Buena, gifts and family', hot: true }
  ];

  var pct = function (v) {
    var d = Math.round((v - 1) * 100);
    return d === 0 ? 'About a typical month' : (d > 0 ? '+' : '−') + Math.abs(d) + '% vs. a typical month';
  };

  /* Month i peaks at clock position i + 1, so December sits at 12 o'clock. */
  function amp(t) {
    var p = ((t / TAU) * 12 + 11) % 12;
    var i = Math.floor(p);
    var f = p - i;
    var a = YEAR[i].v;
    var b = YEAR[(i + 1) % 12].v;
    return a + (b - a) * ((1 - Math.cos(Math.PI * f)) / 2);
  }

  function ringPath(o, k, from, to, steps) {
    var d = '';
    for (var j = 0; j <= steps; j++) {
      var t = from + ((to - from) * j) / steps;
      var a = o.lobe ? amp(t) : 0;
      var r =
        o.base +
        k * o.gap +
        (o.lobe ? (a - 0.88) * o.lobe + o.petal * a * (0.5 + 0.5 * Math.cos(12 * t)) : 0) +
        o.w1 * Math.sin(o.f1 * t + k * 0.42) +
        o.w2 * Math.sin(o.f2 * t - k * 0.3);
      d += (j ? 'L' : 'M') + (r * Math.sin(t)).toFixed(1) + ' ' + (-r * Math.cos(t)).toFixed(1);
    }
    return d;
  }

  function el(name, attrs, parent) {
    var n = document.createElementNS(SVG, name);
    for (var a in attrs) n.setAttribute(a, attrs[a]);
    if (parent) parent.appendChild(n);
    return n;
  }

  var OUTER = { base: 205, gap: 6.5, lobe: 165, petal: 34, w1: 5, f1: 48, w2: 2.5, f2: 17 };
  var RINGS = 20;

  /* ── Rosette ── */
  var svg = document.getElementById('rosetteSvg');
  var hotGroup;
  var labels = [];
  var wedges = [];
  var selected = 11;

  function monthSpan(i) {
    var c = ((i + 1) % 12) / 12 * TAU;
    return [c - TAU / 24, c + TAU / 24];
  }

  function drawHot(i, animate) {
    while (hotGroup.firstChild) hotGroup.removeChild(hotGroup.firstChild);
    var span = monthSpan(i);
    for (var k = 0; k < RINGS; k++) {
      var p = el('path', { class: 'hot', d: ringPath(OUTER, k, span[0], span[1], 90), pathLength: 1 }, hotGroup);
      if (animate) p.style.setProperty('--i', k + 6);
    }
  }

  function buildRosette() {
    if (!svg) return;
    var frag = document.createDocumentFragment();
    var g = el('g', {}, null);
    frag.appendChild(g);

    for (var k = 0; k < RINGS; k++) {
      var cls = 'ring' + (k % 4 === 1 ? ' ring--leaf' : k % 4 === 3 ? ' ring--sun' : '');
      var p = el('path', { class: cls, d: ringPath(OUTER, k, 0, TAU, 720) + 'Z', pathLength: 1 }, g);
      p.style.setProperty('--i', k);
    }
    var inner = { base: 118, gap: 4, lobe: 0, w1: 5, f1: 36, w2: 0, f2: 0 };
    for (var n = 0; n < 12; n++) {
      var q = el('path', { class: 'ring ring--inner', d: ringPath(inner, n, 0, TAU, 360) + 'Z', pathLength: 1 }, g);
      q.style.setProperty('--i', n);
    }

    hotGroup = el('g', {}, g);

    YEAR.forEach(function (mo, i) {
      var c = ((i + 1) % 12) / 12 * TAU;
      var t = el('text', { class: 'label', x: (530 * Math.sin(c)).toFixed(1), y: (-530 * Math.cos(c)).toFixed(1), 'aria-hidden': 'true' }, g);
      t.textContent = mo.s;
      labels.push(t);

      var span = monthSpan(i);
      var r0 = 150;
      var r1 = 580;
      var d =
        'M' + (r0 * Math.sin(span[0])).toFixed(1) + ' ' + (-r0 * Math.cos(span[0])).toFixed(1) +
        'L' + (r1 * Math.sin(span[0])).toFixed(1) + ' ' + (-r1 * Math.cos(span[0])).toFixed(1) +
        'A' + r1 + ' ' + r1 + ' 0 0 1 ' + (r1 * Math.sin(span[1])).toFixed(1) + ' ' + (-r1 * Math.cos(span[1])).toFixed(1) +
        'L' + (r0 * Math.sin(span[1])).toFixed(1) + ' ' + (-r0 * Math.cos(span[1])).toFixed(1) +
        'A' + r0 + ' ' + r0 + ' 0 0 0 ' + (r0 * Math.sin(span[0])).toFixed(1) + ' ' + (-r0 * Math.cos(span[0])).toFixed(1) + 'Z';
      var w = el('path', {
        class: 'wedge',
        d: d,
        tabindex: '0',
        role: 'button',
        'aria-label': mo.m + ': ' + pct(mo.v) + '. ' + mo.why
      }, g);
      w.addEventListener('mouseenter', function () { select(i); });
      w.addEventListener('click', function () { select(i); });
      w.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(i); }
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); wedges[(i + 1) % 12].focus(); select((i + 1) % 12); }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); wedges[(i + 11) % 12].focus(); select((i + 11) % 12); }
      });
      wedges.push(w);
    });

    var motionOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (motionOK) document.documentElement.classList.add('js-draw');
    svg.appendChild(frag);

    /* Keep month labels at least 11px on screen as the dial scales */
    if ('ResizeObserver' in window) {
      new ResizeObserver(function (entries) {
        var w = entries[0].contentRect.width || 1120;
        svg.style.setProperty('--label', Math.max(19, (11 * 1120) / w).toFixed(1) + 'px');
      }).observe(svg);
    }
    drawHot(selected, motionOK);
    labels[selected].classList.add('is-on');
  }

  /* ── Readout + ledger ── */
  var readMonth = document.getElementById('readMonth');
  var readValue = document.getElementById('readValue');
  var readWhy = document.getElementById('readWhy');
  var ledgerMonth = document.getElementById('ledgerMonth');
  var ledgerValue = document.getElementById('ledgerValue');
  var ledgerWhy = document.getElementById('ledgerWhy');
  var ledgerButtons = [];

  function select(i) {
    if (i === selected) return;
    if (labels[selected]) labels[selected].classList.remove('is-on');
    if (ledgerButtons[selected]) ledgerButtons[selected].setAttribute('aria-pressed', 'false');
    selected = i;
    if (labels[i]) labels[i].classList.add('is-on');
    if (ledgerButtons[i]) ledgerButtons[i].setAttribute('aria-pressed', 'true');
    if (hotGroup) {
      document.documentElement.classList.remove('js-draw');
      drawHot(i, false);
    }
    [[readMonth, ledgerMonth], [readValue, ledgerValue], [readWhy, ledgerWhy]].forEach(function (pair, n) {
      var text = n === 0 ? YEAR[i].m : n === 1 ? pct(YEAR[i].v) : YEAR[i].why;
      pair.forEach(function (node) {
        if (node) node.textContent = text;
      });
    });
  }

  function buildLedger() {
    var ledger = document.getElementById('ledger');
    if (!ledger) return;
    var max = 1.5;
    YEAR.forEach(function (mo, i) {
      var li = document.createElement('li');
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'month' + (mo.hot ? ' month--hot' : '');
      b.setAttribute('aria-pressed', i === selected ? 'true' : 'false');
      b.setAttribute('aria-label', mo.m + ': ' + pct(mo.v) + '. ' + mo.why);
      b.style.setProperty('--h', Math.round(((mo.v - 0.7) / (max - 0.7)) * 100) + '%');
      b.innerHTML = '<span class="month__bar" aria-hidden="true"></span><span class="month__name" aria-hidden="true">' + mo.s + '</span>';
      b.addEventListener('click', function () {
        select(i);
      });
      li.appendChild(b);
      ledger.appendChild(li);
      ledgerButtons.push(b);
    });
  }

  /* ── Microprint: the sample figures as fine line ── */
  function buildMicroprint() {
    var line = YEAR.map(function (mo) {
      return mo.s + ' ' + mo.v.toFixed(2);
    }).join(' · ');
    var text = ('BUDGIE SAMPLE FORECAST · ' + line + ' · ').repeat(8);
    document.querySelectorAll('[data-microprint]').forEach(function (n) {
      n.textContent = text;
    });
  }

  /* ── Seal on the closing section ── */
  function buildSeal() {
    var seal = document.getElementById('sealSvg');
    if (!seal) return;
    var o = { base: 150, gap: 7, lobe: 0, w1: 7, f1: 24, w2: 3, f2: 12 };
    for (var k = 0; k < 14; k++) {
      el('path', { d: ringPath(o, k, 0, TAU, 360) + 'Z' }, seal);
    }
  }

  /* ── Guilloche bands framing the green note ── */
  function buildGuilloche() {
    var colors = ['#2f9e44', '#efebe3', '#e8b400', '#2f9e44', '#efebe3'];
    document.querySelectorAll('[data-guilloche]').forEach(function (host) {
      var band = el('svg', { viewBox: '0 0 1200 28', preserveAspectRatio: 'none' }, null);
      colors.forEach(function (c, k) {
        var d = '';
        for (var x = 0; x <= 1200; x += 4) {
          var y = 14 + 9 * Math.sin(x / 22 + k * 1.26) * Math.cos(x / 140 - k * 0.6);
          d += (x ? 'L' : 'M') + x + ' ' + y.toFixed(1);
        }
        el('path', { d: d, stroke: c, 'stroke-opacity': k % 2 ? 0.35 : 0.6 }, band);
      });
      host.appendChild(band);
    });
  }

  /* ── Nav ── */
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');

  function closeNav() {
    links.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  }

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeNav);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && links.classList.contains('is-open')) {
        closeNav();
        toggle.focus();
      }
    });
  }

  buildRosette();
  buildLedger();
  buildMicroprint();
  buildSeal();
  buildGuilloche();
})();
