// The project history, published with the game (wwwroot/wiki/*.md, shown by wiki.html).
//
// The pages are Markdown because the historian appends to them after every working session, and appending to
// Markdown is a text edit where appending to HTML is surgery. So the page needs a renderer, and this is a small one
// written for exactly what the pages use -- headings, paragraphs, lists (nested by two-space indent), quotes, fenced
// code, tables, rules, links, images, bold, italic and inline code -- rather than a library pulled in for it. Text is
// escaped before any markup is added, so nothing in a page can inject HTML.

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// A link to another page (`the-port.md`, `tools.md#underpaint`) stays inside the wiki page; anything with a scheme
// or a leading slash is left alone.
export function href(url) {
  const m = /^([a-z0-9-]+)\.md(#.*)?$/i.exec(url);
  if (m) return `?page=${m[1]}${m[2] ?? ''}`;
  return url;
}

export function inline(text) {
  // Code spans first, held aside so nothing inside them is formatted.
  const codes = [];
  let s = text.replace(/`([^`]+)`/g, (_, c) => `\u0000${codes.push(c) - 1}\u0000`);
  s = esc(s);
  s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (_, alt, url) => `<img alt="${alt}" src="${esc(href(url))}">`);
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, url) => `<a href="${esc(href(url))}">${label}</a>`);
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[^*\w])\*([^*\s][^*]*?)\*(?!\w)/g, '$1<em>$2</em>');
  s = s.replace(/(^|[^_\w])_([^_\s][^_]*?)_(?!\w)/g, '$1<em>$2</em>');
  return s.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${esc(codes[Number(i)])}</code>`);
}

const slug = t => t.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export function render(md) {
  const lines = md.replace(/\r\n?/g, '\n').split('\n');
  const out = [];
  let i = 0;
  const isTableRow = l => /^\s*\|.*\|\s*$/.test(l);
  const cells = l => l.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim());
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    // A comment line is for the historian (its `<!-- through: ... -->` bookmark), not for readers.
    if (/^s*<!--.*-->s*$/.test(line)) { i++; continue; }
    // fenced code
    let m = /^```(\w*)\s*$/.exec(line);
    if (m) {
      const body = [];
      for (i++; i < lines.length && !/^```\s*$/.test(lines[i]); i++) body.push(lines[i]);
      i++;
      out.push(`<pre><code${m[1] ? ` class="lang-${m[1]}"` : ''}>${esc(body.join('\n'))}</code></pre>`);
      continue;
    }
    m = /^(#{1,6})\s+(.*)$/.exec(line);
    if (m) {
      const h = inline(m[2].trim()), n = m[1].length;
      out.push(`<h${n} id="${slug(h)}">${h}</h${n}>`);
      i++; continue;
    }
    if (/^(-{3,}|\*{3,}|_{3,})\s*$/.test(line)) { out.push('<hr>'); i++; continue; }
    if (/^>\s?/.test(line)) {
      const body = [];
      for (; i < lines.length && /^>\s?/.test(lines[i]); i++) body.push(lines[i].replace(/^>\s?/, ''));
      out.push(`<blockquote>${render(body.join('\n'))}</blockquote>`);
      continue;
    }
    // a table: a header row, a divider row of dashes, then rows
    if (isTableRow(line) && i + 1 < lines.length && /^\s*\|?\s*:?-{2,}/.test(lines[i + 1])) {
      const head = cells(line), align = cells(lines[i + 1]).map(c => (/^:-+:$/.test(c) ? 'center' : /-+:$/.test(c) ? 'right' : ''));
      const td = (tag, c, k) => `<${tag}${align[k] ? ` style="text-align:${align[k]}"` : ''}>${inline(c)}</${tag}>`;
      const rows = [];
      for (i += 2; i < lines.length && isTableRow(lines[i]); i++) rows.push(`<tr>${cells(lines[i]).map((c, k) => td('td', c, k)).join('')}</tr>`);
      out.push(`<div class="table"><table><thead><tr>${head.map((c, k) => td('th', c, k)).join('')}</tr></thead><tbody>${rows.join('')}</tbody></table></div>`);
      continue;
    }
    if (/^\s*([-*+]|\d+[.)])\s+/.test(line)) {
      const block = [];
      for (; i < lines.length && (lines[i].trim() === '' ? /^\s+([-*+]|\d+[.)])\s+|^\s{2,}\S/.test(lines[i + 1] ?? '') : /^\s*([-*+]|\d+[.)])\s+|^\s{2,}\S/.test(lines[i])); i++) block.push(lines[i]);
      out.push(list(block));
      continue;
    }
    // a paragraph: until a blank line or the start of another block
    const para = [];
    for (; i < lines.length && lines[i].trim() && !/^(#{1,6}\s|```|>|\s*([-*+]|\d+[.)])\s+|(-{3,}|\*{3,})\s*$)/.test(lines[i]) && !(isTableRow(lines[i]) && /^\s*\|?\s*:?-{2,}/.test(lines[i + 1] ?? '')); i++) para.push(lines[i].trim());
    out.push(`<p>${inline(para.join(' '))}</p>`);
  }
  return out.join('\n');
}

// A list block: items at the smallest indent, and anything indented further under an item is that item's own
// content (a nested list, or a continued line).
function list(block) {
  const indent = l => l.match(/^\s*/)[0].length;
  const base = Math.min(...block.filter(l => l.trim()).map(indent));
  const ordered = /^\s*\d+[.)]/.test(block[0]);
  const items = [];
  for (const l of block) {
    if (indent(l) === base && /^\s*([-*+]|\d+[.)])\s+/.test(l)) items.push([l.replace(/^\s*([-*+]|\d+[.)])\s+/, '')]);
    else if (items.length) items.at(-1).push(l.slice(Math.min(indent(l), base + 2)));
  }
  const li = parts => {
    const [first, ...rest] = parts;
    const sub = rest.filter(r => r.trim());
    const nested = sub.length && /^\s*([-*+]|\d+[.)])\s+/.test(sub[0]) ? list(sub) : sub.length ? ' ' + inline(sub.map(s => s.trim()).join(' ')) : '';
    return `<li>${inline(first)}${nested}</li>`;
  };
  const start = ordered ? parseInt(block[0].trim(), 10) : 1;   // a numbered list keeps its numbers (walkthrough.md's steps)
  return `<${ordered ? 'ol' : 'ul'}${start !== 1 ? ` start="${start}"` : ''}>${items.map(li).join('')}</${ordered ? 'ol' : 'ul'}>`;
}

// Every picture on a page opens larger (the sponsor, 2026-09-26: the charts' labels were too small to read in the
// column). One overlay for the whole page, made on first use: the picture as large as the window allows -- the charts
// are SVG, so they stay sharp at any size -- and, on a window narrower than the picture's own width (a phone), at its
// own width at least, to be panned by scrolling. A click or tap outside a chart, Escape, or the close button shuts it,
// and focus goes back to what opened it. Each picture is a button to the keyboard: Tab reaches it, Enter or Space
// opens it. A chart opens in it as a live chart (charts(), below). The styles are wiki.html's (.zoom, .lightbox).
const boxes = new WeakMap();
function lightbox(doc) {
  let lb = boxes.get(doc);
  if (lb) return lb;
  const box = doc.createElement('div');
  box.className = 'lightbox';
  box.hidden = true;
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.innerHTML = '<button type="button" class="close" aria-label="Close the enlarged picture">×</button>';
  let from = null, onClose = null;
  const close = () => {
    if (box.hidden) return;
    box.hidden = true;
    doc.documentElement.style.overflow = '';
    box.querySelector('.big')?.remove();
    onClose?.(); onClose = null;
    from?.focus();
  };
  box.addEventListener('click', e => { if (!e.target.closest?.('.chart')) close(); });
  box.addEventListener('keydown', e => {
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    else if (e.key === 'Tab') {   // focus stays in the overlay
      const f = [...box.querySelectorAll('button, a[href], [tabindex="0"]')].filter(el => !el.closest('[hidden], [data-off]'));
      const i = f.indexOf(doc.activeElement);
      e.preventDefault();
      f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length]?.focus();
    }
  });
  doc.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  doc.body.append(box);
  // node: what to show; w, h: its natural size, for the fit.
  const open = (node, { opener, w = 900, h = 600, label = '', closed = null } = {}) => {
    box.querySelector('.big')?.remove();
    from = opener; onClose = closed;
    node.classList.add('big');
    box.append(node);
    box.setAttribute('aria-label', label || 'Picture, enlarged');
    // As large as the window allows, keeping the picture's shape; never narrower than its own width (up to 900).
    const fit = Math.min(innerWidth - 34, (innerHeight - 72) * w / h);   // less the overlay's padding
    node.style.width = `${Math.round(Math.max(fit, Math.min(w, 900)))}px`;
    box.hidden = false;
    box.scrollTo?.(0, 0);
    doc.documentElement.style.overflow = 'hidden';
    box.querySelector('.close').focus();
  };
  lb = { open, close };
  boxes.set(doc, lb);
  return lb;
}

export function zoomable(main, doc = globalThis.document) {
  const open = img => {
    const big = doc.createElement('img');
    big.src = img.currentSrc || img.src;
    big.alt = img.alt;
    lightbox(doc).open(big, { opener: img, w: img.naturalWidth || 900, h: img.naturalHeight || 600, label: img.alt });
  };
  const target = e => { const img = e.target.closest?.('img.zoom'); return img && main.contains(img) ? img : null; };
  for (const img of main.querySelectorAll('img')) {
    if (img.closest('a')) continue;   // a picture that is a link keeps its link
    img.classList.add('zoom');
    img.tabIndex = 0;
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', `${img.alt ? `${img.alt}. ` : ''}Open larger`);
  }
  main.addEventListener('click', e => { const img = target(e); if (img) open(img); });
  main.addEventListener('keydown', e => { const img = target(e); if (img && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); open(img); } });
}

// ---- the charts ------------------------------------------------------------------------------------------------------
// The metrics charts (scripts/metrics.mjs, D21) are generated SVG files, and stay so: nothing here draws a chart from
// data. What metrics.mjs puts in each one for this page to read (scripts/lib/svgchart.mjs):
//   <svg data-csv="metrics-x.csv" [data-hover="x"]>   the chart's data file, and a crosshair chart (one mark per time)
//   <g class="m" data-s="keys" [data-v] [data-rk]><title>tip</title>...</g>   a data mark and its tooltip: the first
//        line is the value, then label lines; data-s the series it belongs to; data-rk the series of each tip line
//   <g class="lg" data-s="key">   a legend entry that shows or hides its series      <g class="sr" data-s>   a series' lines
//   <g class="st" data-dir="y|x" data-gap>...<g class="sum">   a stack, closed up when a segment is hidden
//   <g class="tx" data-kind="time|num" data-dom data-px data-th>   an x axis, redrawn for a zoomed range by timeAxis()
//   <g class="tz" data-kind data-dom data-px>   the marks over that axis, moved into a zoomed range
//   [data-round] on a playtest chart's marks, legend entries and end labels (<g class="rlab">): a round selector
// So the page inlines each chart (cleaned of anything active, cleanSvg()) and adds: a tooltip on hover, tap or keyboard
// focus (arrow keys walk the marks), a legend that toggles its series, a zoom on the time charts (drag across the plot,
// or the presets under it), a round selector on the playtest charts, and a link to the chart's CSV. The same file shows
// as a plain picture where this does not run.
export const f1 = n => (Math.round(n * 10) / 10).toFixed(1);

// A bar with a rounded data end on the baseline (the top corners only). Shared with svgchart.mjs's bar(), so a bar
// redrawn at a zoom is the bar the generator drew.
export const barPath = (x, y, w, h, r) =>
  `M${f1(x)},${f1(y + h)} V${f1(y + r)} Q${f1(x)},${f1(y)} ${f1(x + r)},${f1(y)} H${f1(x + w - r)} Q${f1(x + w)},${f1(y)} ${f1(x + w)},${f1(y + r)} V${f1(y + h)} Z`;

// A time x axis over wall-clock ms (Eastern held as if UTC): day lines, and hour labels when the span is short. The
// generator draws it (svgchart.mjs xTime) and the page redraws it for a zoomed range, from this one function.
const HOUR = 3600e3, DAY = 24 * HOUR;
const pad2 = n => String(n).padStart(2, '0');
export const timeStep = span => span <= 4 * HOUR ? HOUR / 2 : span <= 12 * HOUR ? HOUR : span <= 2 * DAY ? 3 * HOUR : span <= 5 * DAY ? 6 * HOUR : span <= 20 * DAY ? DAY : 7 * DAY;
export function timeAxis(t0, t1, p, th) {
  const x = t => p.x + p.w * (t - t0) / Math.max(1, t1 - t0);
  const every = timeStep(t1 - t0), out = [];
  for (let t = Math.ceil(t0 / every) * every; t <= t1; t += every) {
    const d = new Date(t), midnight = d.getUTCHours() === 0 && d.getUTCMinutes() === 0;
    out.push(midnight ? `<line x1="${f1(x(t))}" y1="${p.y}" x2="${f1(x(t))}" y2="${p.y + p.h}" stroke="${th.axis}" stroke-dasharray="3 3"/>`
      : `<line x1="${f1(x(t))}" y1="${p.y + p.h}" x2="${f1(x(t))}" y2="${p.y + p.h + 4}" stroke="${th.axis}"/>`);
    const label = midnight || every >= DAY ? `${pad2(d.getUTCMonth() + 1)}/${pad2(d.getUTCDate())}` : `${pad2(d.getUTCHours())}:${pad2(d.getUTCMinutes())}`;
    out.push(`<text x="${f1(x(t))}" y="${f1(p.y + p.h + 19)}" fill="${midnight ? th.ink : th.dim}" font-size="${th.size}" text-anchor="middle">${label}</text>`);
  }
  return out.join('\n');
}
// A count x axis (commands), about six round steps, with faint verticals.
export function numStep(span, n = 6) {
  const raw = Math.max(1, span) / n, mag = 10 ** Math.floor(Math.log10(raw));
  return [1, 2, 2.5, 5, 10].map(s => s * mag).filter(s => Number.isInteger(s)).find(s => s >= raw) ?? 10 * mag;
}
export function numAxis(n0, n1, p, th) {
  const x = n => p.x + p.w * (n - n0) / Math.max(1e-9, n1 - n0), step = numStep(n1 - n0), out = [];
  for (let t = Math.ceil(n0 / step) * step; t <= n1 + 1e-9; t += step) {
    if (t > n0) out.push(`<line x1="${f1(x(t))}" y1="${p.y}" x2="${f1(x(t))}" y2="${p.y + p.h}" stroke="${th.axis}" stroke-opacity="0.45" stroke-dasharray="2 4"/>`);
    out.push(`<text x="${f1(x(t))}" y="${f1(p.y + p.h + 19)}" fill="${th.dim}" font-size="${th.size}" text-anchor="${t <= n0 ? 'start' : t >= n1 ? 'end' : 'middle'}">${t}</text>`);
  }
  return out.join('\n');
}

// A path's absolute x coordinates moved by f (M, L, Q, C and H; V and relative steps keep their shape).
export function remapPath(d, f) {
  return d.replace(/([MLHVQCZmlhvqcz])([^MLHVQCZmlhvqcz]*)/g, (_, c, args) => {
    const n = args.trim() ? args.trim().split(/[\s,]+/).map(Number) : [];
    if (c === 'H') return `H${n.map(v => f1(f(v))).join(' ')} `;
    if ('MLQC'.includes(c)) { const out = []; for (let i = 0; i + 1 < n.length; i += 2) out.push(`${f1(f(n[i]))},${f1(n[i + 1])}`); return `${c}${out.join(' ')} `; }
    return c + args;
  }).trim();
}

// The chart file, parsed and cleaned: no script, no event handler, no outside reference, no style; its ids made
// unique to this copy (the page shows several charts, and the lightbox a second copy of one).
let uid = 0;
export function cleanSvg(text, doc = globalThis.document) {
  const parsed = new DOMParser().parseFromString(text, 'image/svg+xml');
  const svg = parsed.documentElement;
  if (!svg || svg.localName !== 'svg' || parsed.getElementsByTagName('parsererror').length) return null;
  for (const el of [...svg.querySelectorAll('script, foreignObject, iframe, image, use, a, animate, animateMotion, animateTransform, set, style')]) el.remove();
  const tag = `c${++uid}-`;
  for (const el of [svg, ...svg.querySelectorAll('*')]) for (const a of [...el.attributes]) {
    if (/^on/i.test(a.name) || /href$/i.test(a.name) || a.name === 'style') el.removeAttribute(a.name);
    else if (a.name === 'id') el.setAttribute('id', tag + a.value);
    else if (/url\(/i.test(a.value)) { const m = /^url\(#([\w-]+)\)$/.exec(a.value.trim()); if (m) el.setAttribute(a.name, `url(#${tag}${m[1]})`); else el.removeAttribute(a.name); }
  }
  return doc.importNode(svg, true);
}

const NS = 'http://www.w3.org/2000/svg';
// A playtest session's outcome (scripts/lib/playtest-outcome.mjs OUTCOMES, in its order), as the filters and the
// playtests page name it.
export const OUTCOME_ORDER = ['won', 'stuck', 'cap', 'budget', 'died', 'cutoff', 'playing'];
export const OUTCOME_NAMES = { won: 'won', stuck: 'stuck', cap: 'cap reached', budget: 'budget spent', died: 'died', cutoff: 'cut off', playing: 'still playing' };
// Whether a run's mark (its data-* attributes: round, sub, outcome) matches every filter row's pick ({ attr: value or
// null }). A value is one of the attribute's space-separated tokens, so the pick "click" matches "click click-a".
export const matchesFilter = (data, pick) => Object.entries(pick).every(([attr, v]) => v == null || String(data[attr] ?? '').split(' ').includes(v));
// The type row's buttons, in order, from the subtype tokens a chart holds: typed, then click for A and B together
// (only when there are two letters or none), then each letter.
export function subtypeRow(tokens) {
  const letters = tokens.filter(v => /^click-./.test(v)).sort();
  return [...tokens.filter(v => v === 'typed'), ...(letters.length !== 1 ? tokens.filter(v => v === 'click') : []), ...letters, ...tokens.filter(v => !/^(typed|click)(-.)?$/.test(v)).sort()];
}
const CHART_SRC = /(^|\/)metrics-[a-z0-9-]+\.svg$/i;
const nums = s => String(s ?? '').trim().split(/\s+/).map(Number);
const COLOR = /^#[0-9a-f]{3,8}$/i;
const stamp = t => { const d = new Date(t); return `${pad2(d.getUTCMonth() + 1)}/${pad2(d.getUTCDate())} ${pad2(d.getUTCHours())}:${pad2(d.getUTCMinutes())}`; };
const PLACED = ['x', 'width', 'cx', 'x1', 'x2', 'points', 'd', 'transform'];

// One live copy of a chart: in the page, or (large) in the lightbox. `shared` holds what both copies show -- the
// hidden series and the zoomed range -- so the enlarged chart opens as the page's stands, and its changes stay.
function chartView(text, shared, doc, { large = false, enlarge = null } = {}) {
  const svg = cleanSvg(text, doc);
  if (!svg) return null;
  const [, , W, H] = nums(svg.getAttribute('viewBox'));
  const title = svg.getAttribute('aria-label') || shared.alt || 'Chart';
  svg.removeAttribute('width'); svg.removeAttribute('height');
  svg.classList.add('plot');
  const fig = doc.createElement('figure'), wrap = doc.createElement('div'), tip = doc.createElement('div'), tools = doc.createElement('div');
  fig.className = 'chart'; wrap.className = 'plotwrap'; tip.className = 'tip'; tools.className = 'tools';
  tip.hidden = true;
  tip.setAttribute('role', 'status');
  wrap.append(svg, tip);
  fig.append(wrap, tools);

  const tzs = [...svg.querySelectorAll('.tz')], txs = [...svg.querySelectorAll('.tx')];
  const zoomKind = tzs[0]?.dataset.kind ?? null, xMode = svg.dataset.hover === 'x';
  const dom = tzs.length ? nums(tzs[0].dataset.dom) : null;
  if (zoomKind) svg.classList.add('zoomable');
  // The tooltips, out of the <title>s (which would show a second, native tooltip).
  for (const m of svg.querySelectorAll('.m')) { const t = m.querySelector(':scope > title'); m.dataset.tip = t?.textContent ?? ''; t?.remove(); }
  // A line's hit area is wider than the line.
  for (const m of svg.querySelectorAll('.m.ln')) for (const el of m.querySelectorAll('path, polyline')) {
    const hit = el.cloneNode(false);
    for (const a of ['stroke-dasharray', 'stroke-opacity']) hit.removeAttribute(a);
    hit.setAttribute('stroke', 'transparent'); hit.setAttribute('stroke-width', '14'); hit.setAttribute('fill', 'none');
    hit.setAttribute('class', 'hit');
    el.before(hit);
  }
  // Each series' colour, from its legend key, for the tooltip's line keys.
  const colors = {};
  for (const lg of svg.querySelectorAll('.lg')) {
    const c = [...lg.querySelectorAll('*')].map(el => el.getAttribute('stroke') ?? el.getAttribute('fill')).find(c => COLOR.test(c ?? ''));
    if (c) colors[lg.dataset.s] = c;
    lg.setAttribute('tabindex', '0');
    lg.setAttribute('role', 'button');
    lg.setAttribute('aria-label', `${lg.textContent.trim()}: show or hide`);
  }
  svg.setAttribute('tabindex', '0');
  svg.setAttribute('role', 'group');
  svg.setAttribute('aria-label', `${title}. Arrow keys read the values${large ? '' : '; Enter opens it larger'}.`);

  // ---- the tooltip
  let cur = null, pinned = false;
  const off = el => !!el.closest('[data-off], .rfade');   // hidden by its legend, or faded by the round selector
  const ctm = () => svg.getScreenCTM();
  const toClientX = x => { const m = ctm(); return m ? m.a * x + m.e : x; };
  const fromClientX = cx => { const m = ctm(); return m ? (cx - m.e) / m.a : cx; };
  const plotOf = tz => { const [x, y, w, h] = nums(tz.dataset.px), m = ctm(); return m ? { l: m.a * x + m.e, r: m.a * (x + w) + m.e, t: m.d * y + m.f, b: m.d * (y + h) + m.f } : null; };
  const inView = m => {
    if (!shared.range) return true;
    const tz = m.closest('.tz');
    if (!tz) return true;
    const p = plotOf(tz), r = m.getBoundingClientRect(), cx = (r.left + r.right) / 2;
    return !p || (cx >= p.l - 1 && cx <= p.r + 1);
  };
  const marks = () => [...svg.querySelectorAll('.m')].filter(m => !off(m) && inView(m));
  const hide = () => { cur?.classList.remove('on'); cur = null; pinned = false; tip.hidden = true; };
  const show = (m, at = null) => {
    cur?.classList.remove('on');
    cur = m; m.classList.add('on');
    const rows = [], keys = (m.dataset.rk ?? '').split(' ');
    m.dataset.tip.split('\n').forEach((line, i) => {
      const k = keys[i] && keys[i] !== '-' ? keys[i] : null;
      if (k && shared.hidden.has(k)) return;
      const row = doc.createElement('div');
      row.className = i ? 'row' : 'head';
      if (k && colors[k]) { const key = doc.createElement('span'); key.className = 'key'; key.style.background = colors[k]; row.append(key); }
      const cut = i ? line.lastIndexOf(': ') : -1;
      if (cut > 0) { const b = doc.createElement('b'); b.textContent = line.slice(cut + 2); row.append(`${line.slice(0, cut)}: `, b); }
      else row.append(line);
      rows.push(row);
    });
    tip.replaceChildren(...rows);
    tip.hidden = false;
    const fr = wrap.getBoundingClientRect(), r = m.getBoundingClientRect();
    const wide = m.classList.contains('ln') || m.classList.contains('xh');
    const ax = wide && at ? at.x : (r.left + r.right) / 2, top = wide && at ? at.y : r.top, bottom = wide && at ? at.y : r.bottom;
    const tw = tip.offsetWidth, th = tip.offsetHeight;
    tip.style.left = `${Math.round(Math.max(4, Math.min(fr.width - tw - 4, ax - fr.left - tw / 2)))}px`;
    let y = top - fr.top - th - 10;
    if (y < 0) y = bottom - fr.top + 12;
    tip.style.top = `${Math.round(Math.min(y, fr.height - th - 2))}px`;
  };
  // The mark under the pointer, or failing that the nearest within reach (a dot is small; a finger is not). A
  // crosshair chart takes the mark nearest the pointer's x anywhere over its plot.
  const pick = (cx, cy, target, touch) => {
    const direct = target?.closest?.('.m');
    if (direct && svg.contains(direct) && !off(direct) && !xMode) return direct;
    let best = null, bd = touch ? 24 : 14, ba = Infinity;
    if (xMode) {
      const tz = tzs.find(t => { const p = plotOf(t); return p && cx >= p.l - 8 && cx <= p.r + 8 && cy >= p.t - 8 && cy <= p.b + 8; });
      if (!tz) return null;
      bd = Infinity;
      for (const m of marks()) { const r = m.getBoundingClientRect(), d = Math.abs((r.left + r.right) / 2 - cx); if (d < bd) { bd = d; best = m; } }
      return best;
    }
    for (const m of marks()) {
      if (m.classList.contains('ln')) continue;
      const r = m.getBoundingClientRect();
      const d = Math.hypot(Math.max(r.left - cx, 0, cx - r.right), Math.max(r.top - cy, 0, cy - r.bottom)), a = r.width * r.height;
      if (d < bd || (d === bd && a < ba)) { bd = d; ba = a; best = m; }
    }
    return best;
  };

  // ---- series: hide, show, and close up a stack
  const restack = st => {
    const dir = st.dataset.dir, gap = +st.dataset.gap || 0;
    // A segment too thin to draw (bar() draws nothing under a pixel: round 13's scale left round 2's high-severity
    // sliver empty) has no shape to move, and is skipped rather than failing the page.
    const segs = [...st.querySelectorAll(':scope > .m')].filter(s => s.querySelector('[data-b], rect, path'));
    const geo = s => { const el = s.querySelector('[data-b]'); if (el) { const [x, y, w, h] = nums(el.dataset.b); return { x, y, w, h }; } const r = s.querySelector('rect, path'); const o = orig.get(r) ?? {}; return { x: +(o.x ?? r.getAttribute('x')), y: +r.getAttribute('y'), w: +(o.width ?? r.getAttribute('width')), h: +r.getAttribute('height') }; };
    if (!segs.length) return;
    const g0 = geo(segs[0]);
    let pos = dir === 'x' ? g0.x : g0.y + g0.h, j = 0, total = 0;
    for (const s of segs) {
      if (s.hasAttribute('data-off')) continue;
      const g = geo(s);
      if (dir === 'x') { if (j) pos += gap; s.setAttribute('transform', `translate(${f1(pos - g.x)},0)`); pos += g.w; }
      else { if (j) pos -= gap; s.setAttribute('transform', `translate(0,${f1(pos - g.y - g.h)})`); pos -= g.h; }
      j++; total += +(s.dataset.v ?? 0);
    }
    const sum = st.querySelector(':scope > .sum');
    if (sum) {
      const t = sum.querySelector('text');
      t.dataset.was ??= t.textContent;
      sum.toggleAttribute('data-off', !j);
      sum.setAttribute('transform', `translate(0,${f1(pos - Math.min(...segs.map(s => geo(s).y)))})`);
      t.textContent = segs.every(s => !s.hasAttribute('data-off')) ? t.dataset.was : sum.dataset.fmt === 'f1' ? f1(total) : String(Math.round(total * 100) / 100);
    }
  };
  const series = () => {
    for (const el of svg.querySelectorAll('[data-s]:not(.lg)')) el.toggleAttribute('data-off', el.dataset.s.split(' ').some(k => shared.hidden.has(k)));
    for (const lg of svg.querySelectorAll('.lg')) { const hid = shared.hidden.has(lg.dataset.s); lg.classList.toggle('off', hid); lg.setAttribute('aria-pressed', String(!hid)); }
    for (const st of svg.querySelectorAll('.st')) restack(st);
  };

  // ---- zoom: every mark over a zoomed axis moved into the range; extents (bars, lines) stretched, points kept
  const orig = new WeakMap();
  const clips = new Map();
  const place = (el, f) => {
    let o = orig.get(el);
    if (!o) { o = {}; for (const a of PLACED) if (el.hasAttribute(a)) o[a] = el.getAttribute(a); orig.set(el, o); }
    if (!f) { for (const a of PLACED) { if (a in o) el.setAttribute(a, o[a]); else el.removeAttribute(a); } return; }
    const shift = () => {
      if (o.ax == null) { if (el.dataset.ax) o.ax = +el.dataset.ax; else if (el.localName === 'circle') o.ax = +o.cx; else if (el.localName === 'text') o.ax = +o.x; else { const b = el.getBBox(); o.ax = b.x + b.width / 2; } }
      el.setAttribute('transform', `translate(${f1(f(o.ax) - o.ax)},0)${o.transform ? ` ${o.transform}` : ''}`);
    };
    const inLine = !!el.closest('.ln');
    if (el.localName === 'g') shift();
    else if (el.localName === 'rect') { const a = +o.x, b = a + +o.width; el.setAttribute('x', f1(f(a))); el.setAttribute('width', f1(Math.max(1, f(b) - f(a)))); }
    else if (el.localName === 'polyline' || el.localName === 'polygon') el.setAttribute('points', o.points.trim().split(/\s+/).map(p => { const [x, y] = p.split(','); return `${f1(f(+x))},${y}`; }).join(' '));
    else if (el.localName === 'line' && (inLine || o.x1 === o.x2)) { el.setAttribute('x1', f1(f(+o.x1))); el.setAttribute('x2', f1(f(+o.x2))); }
    else if (el.localName === 'path' && el.dataset.b) { const [x, y, w, h] = nums(el.dataset.b), a = f(x), b = f(x + w); el.setAttribute('d', barPath(a, y, b - a, h, Math.min(3, (b - a) / 2, h))); }
    else if (el.localName === 'path' && inLine) el.setAttribute('d', remapPath(o.d, f));
    else shift();
  };
  const visit = (node, f) => {
    for (const el of node.children) {
      if (el.localName === 'title') continue;
      if (el.localName === 'g' && !el.classList.contains('pt')) visit(el, f);
      else place(el, f);
    }
  };
  const zoom = () => {
    const range = shared.range;
    for (const el of svg.querySelectorAll('.zoff')) el.toggleAttribute('data-zoff', !!range);   // labels placed for the whole span
    for (const tz of tzs) {
      const [d0, d1] = nums(tz.dataset.dom), [px, , pw] = nums(tz.dataset.px);
      let f = null;
      if (range) {
        const a = Math.max(d0, range[0]), b = Math.min(d1, range[1]);
        const xa = px + pw * (a - d0) / (d1 - d0), xb = px + pw * (b - d0) / (d1 - d0), k = pw / Math.max(1e-6, xb - xa);
        f = X => px + (X - xa) * k;
        if (!clips.has(tz)) {
          const cp = doc.createElementNS(NS, 'clipPath'), r = doc.createElementNS(NS, 'rect');
          cp.id = `zc${++uid}`;
          for (const [a, v] of [['x', px], ['y', 0], ['width', pw], ['height', H]]) r.setAttribute(a, v);
          cp.append(r);
          (svg.querySelector('defs') ?? svg.insertBefore(doc.createElementNS(NS, 'defs'), svg.firstChild)).append(cp);
          clips.set(tz, cp.id);
        }
        tz.setAttribute('clip-path', `url(#${clips.get(tz)})`);
      } else tz.removeAttribute('clip-path');
      visit(tz, f);
    }
    for (const tx of txs) {
      const [d0, d1] = nums(tx.dataset.dom), [x, y, w, h] = nums(tx.dataset.px), [axis, ink, dim, size] = (tx.dataset.th ?? '').split(' ');
      if (![axis, ink, dim].every(c => COLOR.test(c ?? '')) || !(+size > 0)) continue;
      const a = range ? Math.max(d0, range[0]) : d0, b = range ? Math.min(d1, range[1]) : d1;
      tx.innerHTML = (tx.dataset.kind === 'num' ? numAxis : timeAxis)(a, b, { x, y, w, h }, { axis, ink, dim, size: +size });
    }
  };

  // ---- the tools under the chart: zoom presets and state, enlarge, the data
  const label = (a, b) => zoomKind === 'time' ? `${stamp(a)} to ${stamp(b)}` : `${Math.round(a)} to ${Math.round(b)}`;
  const presets = zoomKind === 'time' ? [['All', null], ['Last 24 h', DAY], ['Last 7 days', 7 * DAY]].filter(([, n]) => !n || dom[1] - dom[0] > n * 1.15) : [['All', null]];
  const btn = (text, fn, cls = '') => { const b = doc.createElement('button'); b.type = 'button'; b.textContent = text; if (cls) b.className = cls; b.addEventListener('click', fn); return b; };
  const zoomBtns = [];
  let showing = null;
  if (zoomKind) {
    const group = doc.createElement('span');
    group.className = 'zoombar';
    for (const [text, n] of presets) {
      const b = btn(text, () => { shared.range = n ? [dom[1] - n, dom[1]] : null; shared.update(); });
      b.dataset.n = n ?? '';
      zoomBtns.push(b); group.append(b);
    }
    showing = doc.createElement('span');
    showing.className = 'showing';
    tools.append(group, showing);
  }
  const spacer = doc.createElement('span'); spacer.className = 'spacer'; tools.append(spacer);
  if (!large && enlarge) tools.append(btn('Enlarge', () => enlarge()));
  const csv = svg.dataset.csv;
  if (/^[a-z0-9-]+\.(csv|json)$/i.test(csv ?? '')) {
    const a = doc.createElement('a');
    a.href = shared.src.replace(/[^/]*$/, csv); a.textContent = 'Data (CSV)'; a.className = 'data';
    if (/\.json$/i.test(csv)) a.textContent = 'Data (JSON)';
    tools.append(a);
  }
  const toolsState = () => {
    if (!zoomKind) return;
    const r = shared.range;
    for (const b of zoomBtns) { const n = b.dataset.n ? +b.dataset.n : null; b.setAttribute('aria-pressed', String(n ? !!r && Math.abs(r[1] - dom[1]) < 1 && Math.abs(r[1] - r[0] - n) < 1 : !r)); }
    showing.textContent = r ? `Showing ${label(Math.max(dom[0], r[0]), Math.min(dom[1], r[1]))}. Drag across the plot to zoom further.` : 'Drag across the plot to zoom.';
  };

  // ---- filters: a playtest chart whose marks carry their round (data-round) gets a row of buttons above it, "All" and
  // one per round; a full-run chart's marks also carry their subtype (data-sub: "typed", or "click click-a") and their
  // outcome (data-outcome), and get a row each for those (the sponsor, 28 September). The rows combine: a run is shown
  // at full strength, drawn over the rest and named at its line end (the chart's .rlab labels, hidden in the file but
  // for the latest round's) when it matches every row's pick; every other run is faded, not removed, so the scale
  // stays. Faded marks give no tooltip. "All" on every row restores the chart as drawn. A row shows only when its
  // chart has more than one value for it.
  const tagged = [...svg.querySelectorAll('[data-round]')];
  const values = attr => [...new Set(tagged.flatMap(el => (el.dataset[attr] ?? '').split(' ').filter(Boolean)))];
  const subs = values('sub'), letters = subs.filter(v => /^click-./.test(v));
  const filters = [
    { attr: 'round', label: 'Round:', what: 'round', values: values('round').sort((a, b) => (parseFloat(a) - parseFloat(b)) || a.localeCompare(b)), name: v => `r${v}`, long: v => `round ${v}` },
    // typed, click (A and B together, when there are two or more), then each click letter
    { attr: 'sub', label: 'Type:', what: 'type', values: subtypeRow(subs),
      name: v => v === 'click' && letters.length > 1 ? 'click (A+B)' : v.replace(/^click-(.)$/, (_, l) => `click ${l.toUpperCase()}`), long: v => v === 'click' ? 'the click runs' : v === 'typed' ? 'the typed runs' : `the ${v.replace(/^click-(.)$/, (_, l) => `click ${l.toUpperCase()}`)} runs` },
    { attr: 'outcome', label: 'Outcome:', what: 'outcome', values: values('outcome').sort((a, b) => OUTCOME_ORDER.indexOf(a) - OUTCOME_ORDER.indexOf(b)), name: v => OUTCOME_NAMES[v] ?? v, long: v => `runs that ended ${OUTCOME_NAMES[v] ?? v}` },
  ].filter(f => f.values.length > 1);
  shared.filter ??= {};
  const matches = el => matchesFilter(el.dataset, Object.fromEntries(filters.map(f => [f.attr, shared.filter[f.attr] ?? null])));
  const active = () => filters.some(f => shared.filter[f.attr] != null);
  const filterBtns = [], stacking = new Map();   // each mark group's children in the order they were drawn
  for (const p of new Set(tagged.filter(el => el.classList.contains('m')).map(el => el.parentNode))) stacking.set(p, [...p.children]);
  let shownNote = null;
  if (filters.length) {
    const box = doc.createElement('div');
    box.className = 'filters';
    for (const f of filters) {
      const bar = doc.createElement('div');
      bar.className = 'roundbar';
      bar.setAttribute('role', 'group');
      bar.setAttribute('aria-label', `Show one ${f.what}`);
      const lbl = doc.createElement('span'); lbl.className = 'lbl'; lbl.textContent = f.label;
      bar.append(lbl);
      for (const v of [null, ...f.values]) {
        const b = btn(v == null ? 'All' : f.name(v), () => { shared.filter[f.attr] = v; shared.update(); });
        b.setAttribute('aria-label', v == null ? `Any ${f.what}` : `Show ${f.long(v)}, the others faded`);
        b.dataset.attr = f.attr; b.dataset.v = v ?? '';
        filterBtns.push(b); bar.append(b);
      }
      box.append(bar);
    }
    if (filters.length > 1) { shownNote = doc.createElement('div'); shownNote.className = 'shown'; shownNote.setAttribute('role', 'status'); box.append(shownNote); }
    fig.prepend(box);
  }
  const runsOf = els => new Set(els.map(el => el.dataset.session ?? el.dataset.s).filter(Boolean));
  const roundsState = () => {
    if (!tagged.length) return;
    for (const f of filters) if (!f.values.includes(shared.filter[f.attr])) shared.filter[f.attr] = null;
    const on = active();
    for (const el of tagged) el.classList.toggle('rfade', on && !matches(el));
    for (const el of svg.querySelectorAll('.rlab')) el.setAttribute('visibility', (on ? matches(el) : el.dataset.default === '1') ? 'visible' : 'hidden');
    for (const [p, kids] of stacking) { p.append(...kids); if (on) p.append(...kids.filter(k => k.dataset?.round != null && matches(k))); }
    for (const b of filterBtns) b.setAttribute('aria-pressed', String((b.dataset.v || null) === (shared.filter[b.dataset.attr] ?? null)));
    if (shownNote) {
      const all = runsOf(tagged.filter(el => el.classList.contains('lg'))), shown = runsOf(tagged.filter(el => el.classList.contains('lg') && matches(el)));
      shownNote.textContent = on ? (shown.size ? `${shown.size} of ${all.size} runs shown; the rest are faded.` : `No run matches every pick (of ${all.size}).`) : `${all.size} runs. The rows combine: pick in more than one.`;
    }
  };

  const apply = () => { series(); roundsState(); zoom(); toolsState(); if (cur && (off(cur) || !inView(cur))) hide(); else if (cur) show(cur); };

  // ---- pointer: hover (mouse), tap or click (pins the tooltip), drag across a zoomable plot (a range)
  let drag = null, brush = null;
  const plotAt = (cx, cy) => tzs.find(t => { const p = plotOf(t); return p && cx >= p.l && cx <= p.r && cy >= p.t - 4 && cy <= p.b + 4; });
  svg.addEventListener('pointerdown', e => {
    if (e.button !== 0 || e.target.closest('.lg')) return;
    drag = { x: e.clientX, y: e.clientY, tz: zoomKind ? plotAt(e.clientX, e.clientY) : null, moved: false };
  });
  svg.addEventListener('pointermove', e => {
    if (drag?.tz && (drag.moved || Math.abs(e.clientX - drag.x) > 6)) {
      if (!drag.moved) { drag.moved = true; try { svg.setPointerCapture(e.pointerId); } catch { } hide(); }
      const p = plotOf(drag.tz), a = Math.max(p.l, Math.min(drag.x, e.clientX)), b = Math.min(p.r, Math.max(drag.x, e.clientX));
      const ys = tzs.map(t => nums(t.dataset.px)), y0 = Math.min(...ys.map(q => q[1])), y1 = Math.max(...ys.map(q => q[1] + q[3]));
      if (!brush) { brush = doc.createElementNS(NS, 'rect'); brush.setAttribute('class', 'brush'); svg.append(brush); }
      for (const [k, v] of [['x', fromClientX(a)], ['y', y0], ['width', Math.max(0, fromClientX(b) - fromClientX(a))], ['height', y1 - y0]]) brush.setAttribute(k, f1(v));
      return;
    }
    if (e.pointerType !== 'mouse' || pinned || drag) return;
    const m = pick(e.clientX, e.clientY, e.target, false);
    if (m) show(m, { x: e.clientX, y: e.clientY }); else if (cur) hide();
  });
  svg.addEventListener('pointerleave', () => { if (!pinned && !drag) hide(); });
  svg.addEventListener('pointercancel', () => { drag = null; brush?.remove(); brush = null; });
  svg.addEventListener('pointerup', e => {
    const d = drag; drag = null;
    brush?.remove(); brush = null;
    if (!d) return;
    if (d.moved) {
      const [px, , pw] = nums(d.tz.dataset.px), [d0, d1] = nums(d.tz.dataset.dom), [a, b] = shared.range ?? [d0, d1];
      const at = cx => { const X = Math.max(px, Math.min(px + pw, fromClientX(cx))); return a + (b - a) * (X - px) / pw; };
      let lo = at(Math.min(d.x, e.clientX)), hi = at(Math.max(d.x, e.clientX));
      const least = zoomKind === 'time' ? HOUR : 10;
      if (hi - lo < least) { const mid = (lo + hi) / 2; lo = mid - least / 2; hi = mid + least / 2; }
      shared.range = lo <= d0 && hi >= d1 ? null : [Math.max(d0, lo), Math.min(d1, hi)];
      shared.update();
      return;
    }
    if (e.target.closest('.lg')) return;
    const m = pick(e.clientX, e.clientY, e.target, e.pointerType !== 'mouse');
    if (m) { if (pinned && cur === m) hide(); else { show(m, { x: e.clientX, y: e.clientY }); pinned = true; } }
    else if (pinned || (cur && e.pointerType !== 'mouse')) hide();
    else if (!large && enlarge) enlarge();
  });
  svg.addEventListener('dblclick', e => { if (zoomKind && shared.range && !e.target.closest('.lg')) { shared.range = null; shared.update(); } });
  svg.addEventListener('click', e => {
    const lg = e.target.closest('.lg');
    if (!lg) return;
    shared.hidden.has(lg.dataset.s) ? shared.hidden.delete(lg.dataset.s) : shared.hidden.add(lg.dataset.s);
    shared.update();
  });

  // ---- keyboard: the chart is one stop; arrows walk its marks, left to right
  const order = () => marks().map(m => ({ m, r: m.getBoundingClientRect() })).sort((p, q) => (p.r.left + p.r.right) - (q.r.left + q.r.right) || p.r.top - q.r.top).map(p => p.m);
  svg.addEventListener('keydown', e => {
    const lg = e.target.closest?.('.lg');
    if (lg) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); lg.dispatchEvent(new MouseEvent('click', { bubbles: true })); } return; }
    if (['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) {
      e.preventDefault();
      const list = order();
      if (!list.length) return;
      const i = list.indexOf(cur);
      const j = e.key === 'Home' ? 0 : e.key === 'End' ? list.length - 1 : i < 0 ? 0 : Math.max(0, Math.min(list.length - 1, i + (e.key === 'ArrowRight' ? 1 : -1)));
      show(list[j]); pinned = true;
    } else if (e.key === 'Escape' && cur) { e.stopPropagation(); hide(); }
    else if ((e.key === 'Enter' || e.key === ' ') && !large && enlarge && e.target === svg) { e.preventDefault(); enlarge(); }
  });
  svg.addEventListener('focus', () => { if (!cur && svg.matches(':focus-visible')) { const l = order(); if (l.length) { show(l[0]); pinned = true; } } });
  svg.addEventListener('focusout', e => { if (!svg.contains(e.relatedTarget)) hide(); });

  // After the chart is in the page and drawn: a hit area behind each legend entry (its text alone is a poor target).
  const mount = () => {
    for (const lg of svg.querySelectorAll('.lg')) {
      if (lg.querySelector('.lghit')) continue;
      const b = lg.getBBox(), r = doc.createElementNS(NS, 'rect');
      for (const [k, v] of [['x', b.x - 5], ['y', b.y - 4], ['width', b.width + 10], ['height', b.height + 8], ['rx', 4]]) r.setAttribute(k, f1(v));
      r.setAttribute('class', 'lghit'); r.setAttribute('fill', 'transparent');
      lg.prepend(r);
    }
    apply();
  };
  const view = { fig, svg, apply, mount, W, H };
  shared.views.add(view);
  return view;
}

// Every metrics chart on the page (an <img> of wiki/metrics-*.svg) replaced by its live copy. A chart that cannot be
// fetched stays a picture, and opens larger as before (zoomable).
export async function charts(main, doc = globalThis.document) {
  const imgs = [...main.querySelectorAll('img')].filter(i => CHART_SRC.test(i.getAttribute('src') ?? '') && !i.closest('a'));
  await Promise.all(imgs.map(async img => {
    const src = img.getAttribute('src');
    let text;
    try { const r = await fetch(src); if (!r.ok) return; text = await r.text(); } catch { return; }
    const shared = { hidden: new Set(), range: null, filter: {}, views: new Set(), src, alt: img.alt };
    shared.update = () => shared.views.forEach(v => v.apply());
    let view = null;
    const enlarge = () => {
      const big = chartView(text, shared, doc, { large: true });
      if (!big) return;
      lightbox(doc).open(big.fig, { opener: view.svg, w: big.W, h: big.H + 56, label: img.alt, closed: () => shared.views.delete(big) });
      big.mount();
    };
    view = chartView(text, shared, doc, { enlarge });
    if (!view) return;
    const host = img.parentElement?.localName === 'p' && img.parentElement.childNodes.length === 1 ? img.parentElement : img;
    host.replaceWith(view.fig);
    view.mount();
  }));
}

// ---- diffs -------------------------------------------------------------------------------------------------------
// A line diff of two texts (arrays of lines): the common head and tail kept aside, the longest common subsequence of
// the rest (the contract is some 300 lines, so the table is small). Each op: ' ' kept, '-' only in a (line a), '+'
// only in b (line b), line numbers from 0. Within a changed run, the removed lines come before the added ones.
export function lineDiff(a, b) {
  let s = 0; while (s < a.length && s < b.length && a[s] === b[s]) s++;
  let e = 0; while (e < a.length - s && e < b.length - s && a[a.length - 1 - e] === b[b.length - 1 - e]) e++;
  const A = a.slice(s, a.length - e), B = b.slice(s, b.length - e), n = A.length, m = B.length;
  const L = Array.from({ length: n + 1 }, () => new Uint32Array(m + 1));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) L[i][j] = A[i] === B[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
  const ops = [];
  for (let i = 0; i < s; i++) ops.push({ t: ' ', a: i, b: i, text: a[i] });
  for (let i = 0, j = 0; i < n || j < m;) {
    if (i < n && j < m && A[i] === B[j]) { ops.push({ t: ' ', a: s + i, b: s + j, text: A[i] }); i++; j++; }
    else if (i < n && (j >= m || L[i + 1][j] >= L[i][j + 1])) { ops.push({ t: '-', a: s + i, text: A[i] }); i++; }
    else { ops.push({ t: '+', b: s + j, text: B[j] }); j++; }
  }
  for (let k = 0; k < e; k++) ops.push({ t: ' ', a: a.length - e + k, b: b.length - e + k, text: a[a.length - e + k] });
  return ops;
}
// The changed stretches with `context` kept lines around each: [{ ops, a0, b0 }] (a0, b0: first line numbers, from 0).
export function hunks(ops, context = 3) {
  const spans = [];
  ops.forEach((o, k) => {
    if (o.t === ' ') return;
    const from = Math.max(0, k - context), to = Math.min(ops.length, k + context + 1), last = spans.at(-1);
    if (last && from <= last.to) last.to = Math.max(last.to, to); else spans.push({ from, to });
  });
  return spans.map(({ from, to }) => { const hs = ops.slice(from, to); return { ops: hs, a0: hs.find(o => o.a != null)?.a ?? null, b0: hs.find(o => o.b != null)?.b ?? null }; });
}
// Words changed within a removed line and the added line that replaced it: [{ t: ' '|'-'|'+', text }], or null when
// the lines are too long to compare word by word.
export function wordDiff(x, y) {
  const tok = s => s.match(/\s+|[^\s]+/g) ?? [];
  const a = tok(x), b = tok(y);
  if (a.length * b.length > 400000) return null;
  const ops = lineDiff(a, b), out = [];
  for (const o of ops) { const last = out.at(-1); if (last && last.t === o.t) last.text += o.text; else out.push({ t: o.t, text: o.text }); }
  // A line mostly rewritten reads better whole: marking every other word only speckles it.
  const kept = out.filter(w => w.t === ' ' && w.text.trim()).reduce((n, w) => n + w.text.length, 0);
  return kept < 0.5 * Math.max(x.length, y.length) ? null : out;
}

// ---- the generated pages (apps) ---------------------------------------------------------------------------------
// A page whose Markdown holds `<!-- app: name -->` gets that app mounted at its end: the playtests browser and the
// contract's versions, drawn from the data scripts/wiki-data.mjs generates (wiki/playtests*.json and
// wiki/contract-versions.json). Everything shown is set as text or rendered by render(), which escapes it.
const make = (doc, tag, attrs = {}, ...kids) => {
  const e = doc.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === 'class') e.className = v; else if (k === 'text') e.textContent = v;
    else if (k.startsWith('on')) e.addEventListener(k.slice(2), v); else e.setAttribute(k, v === true ? '' : String(v));
  }
  e.append(...kids.flat(Infinity).filter(x => x != null && x !== false));
  return e;
};
// Markdown shown inside an app: rendered (and so escaped), its headings two levels down and without ids.
const mdBlock = (doc, text, cls = 'md') => { const d = make(doc, 'div', { class: cls }); d.innerHTML = render(text).replace(/<h([1-6]) id="[^"]*">/g, '<h$1>').replace(/<(\/?)h([1-6])>/g, (_, sl, n) => `<${sl}h${Math.min(6, +n + 2)}>`); return d; };
const num = n => n == null ? '–' : Number(n).toLocaleString('en-US');
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const dayName = d => { const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(d ?? ''); return m ? `${+m[3]} ${MONTHS[+m[2] - 1]}` : d ?? ''; };
const timeOf = iso => /T(\d{2}:\d{2})/.exec(iso ?? '')?.[1] ?? '';
const getJson = async url => { const r = await fetch(url); if (!r.ok) throw new Error(`${url}: ${r.status}`); return r.json(); };
const hashParam = (k) => new URLSearchParams(location.hash.slice(1)).get(k);
const setHash = (k, v) => { try { history.replaceState(null, '', `${location.pathname}${location.search}#${k}=${encodeURIComponent(v)}`); } catch { /* a file: page */ } };
// Tabs: [label, build()] -> the tab bar and its panel; a panel is built when first shown.
function tabs(doc, list, { selected = 0, label = 'Views' } = {}) {
  const bar = make(doc, 'div', { class: 'tabs', role: 'tablist', 'aria-label': label }), panel = make(doc, 'div', { class: 'tabpanel', role: 'tabpanel', tabindex: '0' });
  const btns = list.map(([text], i) => make(doc, 'button', { type: 'button', role: 'tab', text, onclick: () => pick(i) }));
  const pick = i => {
    btns.forEach((b, k) => { b.setAttribute('aria-selected', String(k === i)); b.tabIndex = k === i ? 0 : -1; });
    panel.replaceChildren(list[i][1]());
  };
  bar.addEventListener('keydown', e => {
    const i = btns.indexOf(doc.activeElement); if (i < 0) return;
    const j = e.key === 'ArrowRight' ? (i + 1) % btns.length : e.key === 'ArrowLeft' ? (i - 1 + btns.length) % btns.length : -1;
    if (j >= 0) { e.preventDefault(); btns[j].focus(); pick(j); }
  });
  bar.append(...btns);
  pick(Math.min(selected, list.length - 1));
  return [bar, panel];
}
// The side list of an app: a panel that folds away on a phone once something is picked.
function sideBox(doc, title) {
  const box = make(doc, 'details', { class: 'side', open: true }, make(doc, 'summary', { class: 'sidehead', text: title }));
  const narrow = () => globalThis.matchMedia?.('(max-width: 1000px)').matches;
  return { box, picked: (view) => { if (narrow()) { box.open = false; view.scrollIntoView?.({ block: 'start' }); } } };
}
const outcomeChip = (doc, key, outcomes) => { const o = outcomes.find(x => x.key === key); return make(doc, 'span', { class: `oc oc-${key}`, title: o?.help ?? null, text: o?.name ?? OUTCOME_NAMES[key] ?? key ?? '?' }); };

// The playtests page: rounds, then session types, then sessions; each session's diary, friction rows, and its round's
// triage document and stats.
export async function playtestsApp(host, doc = globalThis.document) {
  const index = await getJson('wiki/playtests.json');
  const rounds = [...index.rounds].reverse();   // the latest first
  const outcomes = index.outcomes ?? [];
  const cache = new Map();
  const detail = r => { if (!cache.has(r.round)) cache.set(r.round, getJson(`wiki/${r.file}`)); return cache.get(r.round); };
  const sessionOf = name => { for (const r of rounds) { const s = r.sessions.find(x => x.session === name); if (s) return [r, s]; } return [null, null]; };
  const root = make(doc, 'div', { class: 'app2 pt' });
  const { box, picked } = sideBox(doc, 'Rounds and sessions');
  const view = make(doc, 'section', { class: 'view', 'aria-live': 'polite' });
  const items = [];
  const item = (text, extra, onpick, key) => { const a = make(doc, 'a', { class: 'item', href: `#${key}`, onclick: e => { e.preventDefault(); onpick(); } }, make(doc, 'span', { class: 'nm', text }), extra); a.dataset.key = key; items.push(a); return a; };
  const typeName = m => m === 'typed' ? 'typed' : m === 'click' ? 'click' : m ?? 'other';
  for (const r of rounds) {
    const types = [...new Set(r.sessions.map(s => s.mode))];
    const rd = make(doc, 'details', { class: 'rd' },
      make(doc, 'summary', {}, make(doc, 'span', { class: 'nm', text: `Round ${r.round}` }), make(doc, 'span', { class: 'meta', text: `${r.kind === 'full' ? 'full runs' : 'segmented'} · ${r.dates.map(d => dayName(d).replace(/ (\w{3})\w*$/, ' $1')).join(', ')}` })),
      item('Triage and stats', null, () => showRound(r), `r=${r.round}`),
      types.map(t => {
        const ss = r.sessions.filter(s => s.mode === t);
        return make(doc, 'details', { class: 'ty', open: true }, make(doc, 'summary', {}, make(doc, 'span', { class: 'nm', text: typeName(t) }), make(doc, 'span', { class: 'meta', text: String(ss.length) })),
          ss.map(s => item(s.label, outcomeChip(doc, s.outcome, outcomes), () => showSession(s.session), `s=${s.session}`)));
      }));
    rd.dataset.round = r.round;
    box.append(rd);
  }
  root.append(box, view);
  host.append(root);
  const mark = key => {
    for (const a of items) { const on = a.dataset.key === key; a.classList.toggle('here', on); if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); if (on) for (let d = a.closest('details'); d; d = d.parentElement?.closest('details')) if (d !== box) d.open = true; }
  };
  const statsView = (r, here = null) => {
    const s = r.stats, wrap = make(doc, 'div', { class: 'stats' });
    wrap.append(make(doc, 'p', { class: 'note', text: 'From playtests/stats.json (scripts/playtest-stats.mjs), which counts the harness\'s records; nothing is read from a diary.' }));
    if (!s) { wrap.append(make(doc, 'p', { text: 'No stats for this round yet.' })); return wrap; }
    const kv = rows => make(doc, 'div', { class: 'table' }, make(doc, 'table', {}, make(doc, 'tbody', {}, rows.map(([k, v]) => make(doc, 'tr', {}, make(doc, 'th', { text: k }), make(doc, 'td', { text: v }))))));
    const f = s.friction ?? {};
    wrap.append(make(doc, 'h3', { text: `Round ${r.round}` }), kv([
      ['Sessions', `${r.sessions.length}`], ['Commands', num(s.commands)], ['Best score', `${s.bestScore}${index.winScore ? ` of ${index.winScore}` : ''}`], ['Deaths', num(s.deaths)], ['Wins', num(s.wins)],
      ['With the playtest UNDO', s.undoSessions ? `${s.undoSessions} session(s), ${s.undos} undo(s)` : 'none (blind)'],
      ['Friction rows', `${num(f.rows)} (${num(f.negative)} not praise)`], ['Per 100 commands', `${f.per100 ?? '–'} all, ${f.negativePer100 ?? '–'} not praise, ${f.weightedPer100 ?? '–'} weighted by severity`],
      ['Issues touched', s.issues ? `${s.issues.touched} (${s.issues.linkedRows} rows linked, ${s.issues.unlinkedRows} not)` : '–'], ['Repeat rate', s.issues?.repeatRate == null ? '–' : `${Math.round(s.issues.repeatRate * 100)}% of linked rows were first seen in an earlier round`],
    ]));
    const kinds = Object.entries(f.byKind ?? {});
    if (kinds.length) wrap.append(make(doc, 'h3', { text: 'Friction by kind and severity' }), make(doc, 'div', { class: 'table' }, make(doc, 'table', {},
      make(doc, 'thead', {}, make(doc, 'tr', {}, ['Kind', 'Rows', 'Per 100'].map(t => make(doc, 'th', { text: t })))),
      make(doc, 'tbody', {}, kinds.map(([k, n]) => make(doc, 'tr', {}, make(doc, 'td', { text: k }), make(doc, 'td', { style: 'text-align:right', text: num(n) }), make(doc, 'td', { style: 'text-align:right', text: String(f.byKindPer100?.[k] ?? '–') }))),
        Object.entries(f.bySeverity ?? {}).map(([k, n]) => make(doc, 'tr', { class: 'sev' }, make(doc, 'td', { text: `severity ${k} (not praise)` }), make(doc, 'td', { style: 'text-align:right', text: num(n) }), make(doc, 'td', { style: 'text-align:right', text: String(f.bySeverityPer100?.[k] ?? '–') })))))));
    wrap.append(make(doc, 'h3', { text: 'Sessions' }), make(doc, 'div', { class: 'table' }, make(doc, 'table', {},
      make(doc, 'thead', {}, make(doc, 'tr', {}, ['Session', 'Outcome', 'Commands', 'Best', 'Deaths', 'Friction'].map(t => make(doc, 'th', { text: t })))),
      make(doc, 'tbody', {}, r.sessions.map(x => make(doc, 'tr', { class: x.session === here ? 'here' : null },
        make(doc, 'td', {}, make(doc, 'a', { href: `#s=${x.session}`, text: x.session, onclick: e => { e.preventDefault(); showSession(x.session); } })), make(doc, 'td', {}, outcomeChip(doc, x.outcome, outcomes)),
        make(doc, 'td', { style: 'text-align:right', text: num(x.commands) }), make(doc, 'td', { style: 'text-align:right', text: num(x.bestScore) }), make(doc, 'td', { style: 'text-align:right', text: num(x.deaths) }), make(doc, 'td', { style: 'text-align:right', text: num(x.friction) })))))));
    return wrap;
  };
  const triageView = async (r, d) => {
    if (!r.triage) return make(doc, 'p', { text: `Round ${r.round} has no triage document yet.` });
    if (!d.triage?.text) return make(doc, 'p', { class: 'note', text: `The triage document is withheld: the privacy gate found ${d.triage?.withheld ?? 'something'} it may not publish.` });
    return make(doc, 'div', {}, make(doc, 'p', { class: 'note', text: `${d.triage.name}, written by scripts/playtest-registry.mjs when the round was triaged: each issue with its tier and evidence.` }), mdBlock(doc, d.triage.text));
  };
  const deferred = fn => () => { const box2 = make(doc, 'div', {}, make(doc, 'p', { class: 'note', text: 'Loading…' })); Promise.resolve(fn()).then(n => box2.replaceChildren(n)).catch(e => box2.replaceChildren(make(doc, 'p', { text: `Unable to load: ${e.message}` }))); return box2; };
  const frictionView = rows => {
    const wrap = make(doc, 'div', { class: 'friction' });
    if (!rows.length) { wrap.append(make(doc, 'p', { text: 'No friction rows were filed.' })); return wrap; }
    const list = make(doc, 'ol', { class: 'fr' });
    const draw = which => list.replaceChildren(...rows.filter(x => which === 'all' || (which === 'nice' ? x.kind === 'nice' : x.kind !== 'nice')).map(x => make(doc, 'li', { class: `k-${x.kind}` },
      make(doc, 'div', { class: 'top' }, make(doc, 'span', { class: `badge kind k-${x.kind}`, text: x.kind ?? '?' }), make(doc, 'span', { class: `badge sev sev-${x.severity}`, text: x.severity ?? '?' }),
        make(doc, 'span', { class: 'where', text: [`#${x.n}`, x.turn != null ? `command ${x.turn}` : null, x.room].filter(Boolean).join(' · ') })),
      x.withheld ? make(doc, 'p', { class: 'note', text: 'Withheld: the privacy gate found something in this row it may not publish.' })
        : [make(doc, 'div', { class: 'cmd' }, x.command ? [make(doc, 'code', { text: x.command }), ' → '] : null, make(doc, 'span', { text: x.result })), make(doc, 'div', { class: 'why', text: x.why })])));
    const n = { all: rows.length, problems: rows.filter(x => x.kind !== 'nice').length, nice: rows.filter(x => x.kind === 'nice').length };
    const bar = make(doc, 'div', { class: 'chips', role: 'group', 'aria-label': 'Which rows' });
    const chips = [['all', `All ${n.all}`], ['problems', `Problems ${n.problems}`], ['nice', `Praise ${n.nice}`]].map(([k, t]) => make(doc, 'button', { type: 'button', text: t, onclick: () => { chips.forEach(c => c.setAttribute('aria-pressed', String(c === chips.find(b => b.dataset.k === k)))); draw(k); } }));
    chips.forEach((c, i) => { c.dataset.k = ['all', 'problems', 'nice'][i]; c.setAttribute('aria-pressed', String(i === 0)); });
    bar.append(...chips);
    wrap.append(make(doc, 'p', { class: 'note', text: 'Filed by the tester through the harness the moment it happened; the harness adds the command count and the room.' }), bar, list);
    draw('all');
    return wrap;
  };
  function showRound(r) {
    mark(`r=${r.round}`); setHash('r', r.round);
    const head = make(doc, 'header', { class: 'vhead' }, make(doc, 'h2', { text: `Round ${r.round}` }),
      make(doc, 'p', { class: 'sub', text: `${r.kind === 'full' ? 'Full runs from the opening' : 'Segmented: each session from a checkpoint'} · ${r.dates.map(dayName).join(', ')} · ${r.sessions.length} sessions` }));
    const [bar, panel] = tabs(doc, [['Triage', deferred(async () => triageView(r, await detail(r)))], ['Stats', () => statsView(r)]], { label: `Round ${r.round}` });
    view.replaceChildren(head, bar, panel);
    picked(view);
  }
  function showSession(name) {
    const [r, s] = sessionOf(name);
    if (!s) return showRound(rounds[0]);
    mark(`s=${name}`); setHash('s', name);
    const fact = (k, v, title) => make(doc, 'span', { title }, `${k} `, make(doc, 'b', {}, v));
    const head = make(doc, 'header', { class: 'vhead' }, make(doc, 'h2', { text: s.session }),
      make(doc, 'p', { class: 'sub', text: `Round ${r.round} · ${s.subLabel} · ${s.kind === 'full' ? 'from the opening' : s.label} · ${dayName(s.date)}` }),
      make(doc, 'div', { class: 'facts' },
        make(doc, 'span', {}, 'Outcome ', outcomeChip(doc, s.outcome, outcomes)),
        fact('Commands', `${num(s.commands)}${s.kind === 'full' ? ' of 1,500' : ''}`), fact('Legs', num(s.legs)), fact('Best score', `${num(s.bestScore)}${index.winScore ? ` of ${index.winScore}` : ''}`),
        fact('Deaths', num(s.deaths)), fact('Friction rows', `${num(s.friction)} (${num(s.frictionNegative)} not praise)`), fact('UNDO', s.undo ? `on (${s.undos} used)` : 'off')),
      s.persona ? make(doc, 'p', { class: 'persona' }, make(doc, 'span', { class: 'k', text: 'Persona: ' }), s.persona) : null);
    const [bar, panel] = tabs(doc, [
      ['Diary', deferred(async () => { const d = await detail(r), x = d.sessions[name]; return x?.diary ? mdBlock(doc, x.diary) : make(doc, 'p', { class: 'note', text: x?.diaryWithheld ? `The diary is withheld: the privacy gate found ${x.diaryWithheld} thing(s) it may not publish.` : 'No diary was written.' }); })],
      [`Friction rows (${num(s.friction)})`, deferred(async () => frictionView((await detail(r)).sessions[name]?.friction ?? []))],
      [`Round ${r.round} triage`, deferred(async () => triageView(r, await detail(r)))],
      [`Round ${r.round} stats`, () => statsView(r, name)],
    ], { label: `Session ${name}` });
    view.replaceChildren(head, bar, panel);
    picked(view);
  }
  const want = hashParam('s'), wantR = hashParam('r');
  if (want && sessionOf(want)[1]) showSession(want);
  else if (wantR && rounds.find(r => r.round === wantR)) showRound(rounds.find(r => r.round === wantR));
  else if (rounds[0]?.sessions[0]) { const s0 = rounds[0].sessions[0].session; mark(`s=${s0}`); showSession(s0); box.open = true; }
  for (const d of box.querySelectorAll('details.rd')) if (d.dataset.round !== rounds[0]?.round && !d.querySelector('.here')) d.open = false; else d.open = true;
}

// The contract's versions: a menu of every version by day, the selected version's text, and what changed from the
// version before it.
export async function contractApp(host, doc = globalThis.document) {
  const data = await getJson('wiki/contract-versions.json');
  const versions = data.versions ?? [];
  const root = make(doc, 'div', { class: 'app2 cv' });
  const { box, picked } = sideBox(doc, `Versions (${versions.length})`);
  const view = make(doc, 'section', { class: 'view', 'aria-live': 'polite' });
  const items = [];
  const days = [...new Set(versions.map(v => v.at.slice(0, 10)))];
  for (const d of days) {
    const vs = versions.filter(v => v.at.startsWith(d));
    box.append(make(doc, 'details', { class: 'rd' }, make(doc, 'summary', {}, make(doc, 'span', { class: 'nm', text: dayName(d) }), make(doc, 'span', { class: 'meta', text: `${vs[0].label}${vs.length > 1 ? ` to ${vs.at(-1).label}` : ''}` })),
      vs.map(v => { const a = make(doc, 'a', { class: 'item', href: `#v=${v.version}`, onclick: e => { e.preventDefault(); show2(v); } }, make(doc, 'span', { class: 'nm', text: v.label }), make(doc, 'span', { class: 'meta', text: `${timeOf(v.at)}${v.decisions.length ? ` · ${v.decisions.join(', ')}` : ''}` })); a.dataset.v = v.version; items.push(a); return a; })));
  }
  root.append(box, view);
  host.append(root);
  const diffView = (prev, v, all) => {
    const ops = lineDiff(prev.text.replace(/\r\n?/g, '\n').split('\n'), v.text.replace(/\r\n?/g, '\n').split('\n'));
    const added = ops.filter(o => o.t === '+').length, removed = ops.filter(o => o.t === '-').length;
    const newLines = v.text.split('\n');
    const sectionAt = b => { for (let k = Math.min(b ?? 0, newLines.length - 1); k >= 0; k--) if (/^#{1,3}\s/.test(newLines[k])) return newLines[k].replace(/^#+\s*/, ''); return null; };
    const wrap = make(doc, 'div', {});
    const hs = all ? [{ ops, a0: 0, b0: 0 }] : hunks(ops, 3);
    const sections = [...new Set(hs.map(h => sectionAt(h.b0 ?? 0)).filter(Boolean))];
    wrap.append(make(doc, 'p', { class: 'dsum' }, make(doc, 'span', { class: 'plus', text: `+${added}` }), ' ', make(doc, 'span', { class: 'minus', text: `−${removed}` }), ` lines from ${prev.label} to ${v.label}`,
      sections.length ? `, in: ${sections.join(' · ')}` : '', '.'));
    if (!added && !removed) { wrap.append(make(doc, 'p', { text: 'The text is the same; only the version changed.' })); return wrap; }
    const diff = make(doc, 'div', { class: 'diff', role: 'region', 'aria-label': `Changes from ${prev.label} to ${v.label}` });
    for (const h of hs) {
      if (!all) diff.append(make(doc, 'div', { class: 'hh', text: `Line ${(h.b0 ?? 0) + 1} of ${v.label}${sectionAt(h.b0) ? `, in ${sectionAt(h.b0)}` : ''}` }));
      // Pair each run of removed lines with the added run after it, line by line, for the words changed within them.
      const pairs = new Map();
      for (let k = 0; k < h.ops.length;) {
        if (h.ops[k].t !== '-') { k++; continue; }
        let d = k; while (d < h.ops.length && h.ops[d].t === '-') d++;
        let p = d; while (p < h.ops.length && h.ops[p].t === '+') p++;
        for (let q = 0; q < Math.min(d - k, p - d); q++) { const w = wordDiff(h.ops[k + q].text, h.ops[d + q].text); if (w) { pairs.set(h.ops[k + q], w.filter(x => x.t !== '+')); pairs.set(h.ops[d + q], w.filter(x => x.t !== '-')); } }
        k = p;
      }
      for (const o of h.ops) {
        const cls = o.t === '+' ? 'add' : o.t === '-' ? 'del' : 'ctx';
        const words = pairs.get(o);
        const tx = make(doc, 'span', { class: 'tx' }, words ? words.map(w => w.t === ' ' ? w.text : make(doc, w.t === '+' ? 'ins' : 'del', { text: w.text })) : o.text || ' ');
        diff.append(make(doc, 'div', { class: `dl ${cls}` }, make(doc, 'span', { class: 'ln', text: String((o.t === '-' ? o.a : o.b) + 1) }), make(doc, 'span', { class: 'sg', 'aria-label': o.t === '+' ? 'added' : o.t === '-' ? 'removed' : null, text: o.t === ' ' ? '' : o.t === '-' ? '−' : '+' }), tx));
      }
    }
    wrap.append(diff);
    return wrap;
  };
  function show2(v) {
    for (const a of items) { const on = a.dataset.v === v.version; a.classList.toggle('here', on); if (on) { a.setAttribute('aria-current', 'true'); a.closest('details').open = true; } else a.removeAttribute('aria-current'); }
    setHash('v', v.version);
    const i = versions.indexOf(v), prev = versions[i - 1] ?? null, current = i === versions.length - 1;
    const head = make(doc, 'header', { class: 'vhead' },
      make(doc, 'h2', { text: `${v.label}${current ? ' (current)' : ''}` }),
      make(doc, 'p', { class: 'sub', text: `${dayName(v.at)} ${timeOf(v.at)} (New York) · commit ${v.commit}${v.decisions.length ? ` · ${v.decisions.join(', ')}` : ''}` }),
      make(doc, 'p', { class: 'made' }, make(doc, 'span', { class: 'k', text: 'Made by: ' }), v.subject),
      v.change ? make(doc, 'p', { class: 'made' }, make(doc, 'span', { class: 'k', text: 'The contract\'s own note: ' }), v.change) : null,
      v.revisions.length ? make(doc, 'p', { class: 'made' }, make(doc, 'span', { class: 'k', text: `Revised without a new version in ${v.revisions.length} later commit${v.revisions.length > 1 ? 's' : ''}: ` }), v.revisions.map((r, k) => `${k ? '; ' : ''}${r.commit} (${dayName(r.at)} ${timeOf(r.at)}) ${r.subject}`).join('')) : null,
      v.history ? make(doc, 'p', { class: 'made' }, make(doc, 'a', { href: `?page=contract-history#${v.history}`, text: `Why ${v.label} was made, and whether it helped` })) : null,
      v.withheld ? make(doc, 'p', { class: 'note', text: 'This version\'s text is withheld: the privacy gate found something in it that may not be published.' }) : null);
    let all = false;
    const changes = () => {
      if (!prev) return make(doc, 'p', { text: `${v.label} is the first version: there is nothing before it to compare. Its text is under "The text".` });
      if (!prev.text || !v.text) return make(doc, 'p', { class: 'note', text: 'One of the two texts is withheld, so there is no diff.' });
      const holder = make(doc, 'div', {});
      const toggle = make(doc, 'button', { type: 'button', class: 'toggle', 'aria-pressed': 'false', text: 'Show the whole text with the changes', onclick: () => { all = !all; toggle.setAttribute('aria-pressed', String(all)); toggle.textContent = all ? 'Show only the changes' : 'Show the whole text with the changes'; holder.replaceChildren(diffView(prev, v, all)); } });
      holder.append(diffView(prev, v, all));
      return make(doc, 'div', {}, make(doc, 'div', { class: 'chips' }, toggle), holder);
    };
    const [bar, panel] = tabs(doc, [[prev ? `What changed from ${prev.label}` : 'What changed', changes], [`The text of ${v.label}`, () => v.text ? mdBlock(doc, v.text, 'md contract') : make(doc, 'p', { text: 'Withheld.' })]], { label: v.label, selected: prev ? 0 : 1 });
    view.replaceChildren(head, bar, panel);
    picked(view);
  }
  const want = versions.find(v => v.version === hashParam('v')) ?? versions.at(-1);
  if (want) show2(want);
  box.open = true;
}
// The blind playtesters' leaderboard (the sponsor, 8 October): the full runs ranked several ways, the generated
// persona-against-friction findings, and every run in one table that sorts by any column. All from
// wiki/playtest-leaderboard.json (scripts/wiki-data.mjs, scripts/lib/playtest-leaderboard.mjs).
export const LB_COLUMNS = [
  ['label', 'Run'], ['persona', 'Persona'], ['host', 'Host'], ['bestScore', 'Best'], ['furthestStage', 'Furthest stage'], ['outcome', 'Outcome'],
  ['deaths', 'Deaths'], ['restores', 'Restores'], ['backToZero', 'Back to 0'], ['commands', 'Commands'], ['rows', 'Friction rows'], ['kinds', 'Kinds (of 7)'],
  ['negativePer100', 'Negative / 100'], ['weightedPer100', 'Weighted / 100'], ['high', 'High severity'], ['blocked', 'Blocked'], ['praiseShare', 'Praise'],
];
const LB_HELP = {
  bestScore: 'best score of 80', restores: 'RESTORE commands sent', backToZero: 'times the score fell back to 0: a restart, or a save from the opening restored',
  kinds: 'how many of the seven negative kinds it filed (blocked, bug, parse, not-understood, confusing, tedious, other)', negativePer100: 'rows that were not praise, per 100 commands',
  weightedPer100: 'negative rows weighted by severity (low 1, medium 2, high 3), per 100 commands: the frustration measure', blocked: 'rows of the kind "blocked"', praiseShare: 'the share of its rows that were praise ("nice")',
};
// The value a column sorts and shows by: numbers as numbers, the host as its hosts joined.
export const lbValue = (r, k) => k === 'host' ? (r.hosts ?? []).join(' then ') : k === 'label' ? `${String(r.round).padStart(4, '0')} ${r.label}` : r[k];
export function sortRuns(runs, key, dir = -1) {
  return [...runs].sort((a, b) => {
    const x = lbValue(a, key), y = lbValue(b, key);
    const d = typeof x === 'number' && typeof y === 'number' ? x - y : String(x ?? '').localeCompare(String(y ?? ''));
    return (d * dir) || a.session.localeCompare(b.session);
  });
}
export async function leaderboardApp(host, doc = globalThis.document) {
  const data = await getJson('wiki/playtest-leaderboard.json');
  const runs = data.runs ?? [], bySession = new Map(runs.map(r => [r.session, r]));
  const outcomes = data.outcomes ?? [];
  const root = make(doc, 'div', { class: 'lb' });
  const runLink = r => make(doc, 'a', { href: `?page=playtests#s=${encodeURIComponent(r.session)}`, title: `${r.session}: its diary, friction rows and triage`, text: r.label });
  const fmt = (k, v) => v == null ? '–' : k === 'praiseShare' ? `${Math.round(v * 100)}%` : typeof v === 'number' ? (Number.isInteger(v) ? num(v) : v.toFixed(2)) : String(v);
  const cell = (r, k) => k === 'label' ? make(doc, 'td', { class: 'nm' }, runLink(r), r.undo ? make(doc, 'span', { class: 'flag', title: 'UNDO was on in this round', text: ' UNDO' }) : null)
    : k === 'persona' ? make(doc, 'td', { class: 'persona' }, make(doc, 'span', { text: r.persona ?? '–' }), make(doc, 'span', { class: 'tags', text: `${data.experience?.[r.experience] ?? r.experience} · ${data.pace?.[r.pace] ?? r.pace}` }))
    : k === 'host' ? make(doc, 'td', { class: 'nm' }, make(doc, 'span', { text: (r.hosts ?? []).join(' → ') || 'not recorded' }), r.models?.length ? make(doc, 'span', { class: 'tags', text: r.models.join(', then ') }) : null)
    : k === 'outcome' ? make(doc, 'td', {}, outcomeChip(doc, r.outcome, outcomes))
    : make(doc, 'td', { class: typeof r[k] === 'number' ? 'n' : null, text: fmt(k, r[k]) });

  // Which runs are ranked and listed: all, or the runs of one host (the chips; round 13's host fills the friction
  // rankings, so the persona question reads best within one host).
  const hostKey = r => (r.hosts ?? []).join(' → ') || 'not recorded';
  const hostKeys = [...new Set(runs.map(hostKey))];
  let only = null;
  const shown = () => only ? runs.filter(r => hostKey(r) === only) : runs;
  const chipBar = make(doc, 'div', { class: 'chips', role: 'group', 'aria-label': 'Which runs, by host' });
  const chips = [[null, `All hosts (${runs.length})`], ...hostKeys.map(k => [k, `${k} (${runs.filter(r => hostKey(r) === k).length})`])].map(([k, t]) => {
    const b = make(doc, 'button', { type: 'button', text: t, 'aria-pressed': String(k === only), onclick: () => { only = k; chips.forEach(c => c.setAttribute('aria-pressed', String(c === b))); drawRanks(); draw(); } });
    return b;
  });
  chipBar.append(make(doc, 'span', { class: 'lbl', text: 'Runs: ' }), ...chips);
  // The rankings: the top five of each.
  const TOP = 5;
  const grid = make(doc, 'div', { class: 'ranks' });
  const drawRanks = () => { grid.replaceChildren(); const keep = new Set(shown().map(r => r.session)); for (const R0 of data.rankings ?? []) { const R = { ...R0, order: R0.order.filter(s => keep.has(s)) };
    const cols = R.show ?? [];
    grid.append(make(doc, 'section', { class: 'rank' }, make(doc, 'h3', { text: R.title }), make(doc, 'p', { class: 'note', text: `By ${R.note}.` }),
      make(doc, 'div', { class: 'table' }, make(doc, 'table', {},
        make(doc, 'thead', {}, make(doc, 'tr', {}, make(doc, 'th', { text: '#' }), make(doc, 'th', { text: 'Run' }), cols.map(k => make(doc, 'th', { title: LB_HELP[k] ?? null, text: LB_COLUMNS.find(c => c[0] === k)?.[1] ?? k })))),
        make(doc, 'tbody', {}, R.order.slice(0, TOP).map((s, i) => { const r = bySession.get(s); return r ? make(doc, 'tr', {}, make(doc, 'td', { class: 'n', text: String(i + 1) }),
          make(doc, 'td', { class: 'nm' }, runLink(r), make(doc, 'span', { class: 'tags', text: r.persona ?? '' })), cols.map(k => k === 'outcome' ? make(doc, 'td', {}, outcomeChip(doc, r.outcome, outcomes)) : make(doc, 'td', { class: typeof r[k] === 'number' ? 'n' : null, text: fmt(k, r[k]) }))) : null; }))))));
  } };
  root.append(make(doc, 'h2', { id: 'rankings', text: 'The rankings' }), make(doc, 'p', { class: 'note', text: `The top ${TOP} of the ${runs.length} full runs each way. A run's name opens its diary and friction rows on the playtests page. Pick a host to rank only its runs: round 13's Copilot runs top every friction ranking.` }), chipBar, grid);

  // The findings, as generated from the numbers.
  const A = data.analysis ?? {};
  root.append(make(doc, 'h2', { id: 'what-the-numbers-say', text: 'What the numbers say' }),
    make(doc, 'p', { class: 'note', text: 'Each sentence below is written by the generator from the runs as they stand, so it follows new rounds. "Spread explained" is the share of the run-to-run variation (sum of squares) that the grouping accounts for.' }),
    make(doc, 'ul', { class: 'findings' }, (A.findings ?? []).map(f => make(doc, 'li', { text: f }))));
  const groupTable = (title, rows, first = 'Group') => rows?.length ? make(doc, 'div', { class: 'table' }, make(doc, 'table', { 'aria-label': title },
    make(doc, 'caption', { text: title }),
    make(doc, 'thead', {}, make(doc, 'tr', {}, [first, 'Runs', 'Mean best', 'Negative / 100', 'Weighted / 100', 'Blocked / 100', 'Kinds'].map(t => make(doc, 'th', { text: t })))),
    make(doc, 'tbody', {}, rows.map(g => make(doc, 'tr', {}, make(doc, 'td', { title: (g.sessions ?? []).join(', '), text: g.label }), ['runs', 'bestScore', 'negativePer100', 'weightedPer100', 'blockedPer100', 'kinds'].map(k => make(doc, 'td', { class: 'n', text: fmt(k, g[k]) }))))))) : null;
  const C = A.clean;
  if (C?.runs) root.append(make(doc, 'h3', { text: `Persona kinds, in the ${C.runs} runs played wholly in ${C.host} with UNDO off (rounds ${C.rounds.join(', ')})` }),
    make(doc, 'p', { class: 'note', text: 'The tags are read from each persona\'s own words by fixed patterns (scripts/lib/playtest-leaderboard.mjs): what it says of text-adventure experience, and of pace. Hover a group for its runs.' }),
    groupTable('By mode', C.byMode, 'Mode'), groupTable('By experience', C.byExperience, 'Experience'), groupTable('By pace', C.byPace, 'Pace'));
  if (A.byHost?.length) root.append(make(doc, 'h3', { text: 'By host, leg by leg' }),
    make(doc, 'p', { class: 'note', text: 'Each leg counted under the host decisions/work.jsonl gives it, and the model its entry names, if any. A leg the log does not place is "host not recorded".' }),
    make(doc, 'div', { class: 'table' }, make(doc, 'table', {},
      make(doc, 'thead', {}, make(doc, 'tr', {}, ['Host (model, where named)', 'Rounds', 'Runs', 'Legs', 'Commands', 'All rows / 100', 'Negative / 100', 'Weighted / 100'].map(t => make(doc, 'th', { text: t })))),
      make(doc, 'tbody', {}, A.byHost.map(h => make(doc, 'tr', {}, make(doc, 'td', { text: h.host }), make(doc, 'td', { text: h.rounds.join(', ') }),
        ['runs', 'legs', 'commands', 'per100', 'negativePer100', 'weightedPer100'].map(k => make(doc, 'td', { class: 'n', text: fmt(k, h[k]) }))))))));
  // The same legs by the model they ran on (metrics.mjs chart 17; the sponsor, 9 October). The page's charts were made
  // live before this app mounted, so this one is made live here.
  if (A.byHost?.length) {
    const fig = make(doc, 'p', {}, make(doc, 'img', { src: 'wiki/metrics-playtest-models.svg', alt: 'Negative friction rows per 100 commands by the model the tester ran on: the round 13 Copilot legs where GPT-6 Luna played filed 11.0, every Claude Opus 5.5 group 1.5 to 3.0' }));
    root.append(make(doc, 'p', { class: 'note', text: 'By model: the negative friction came mostly from the Copilot legs where GPT-6 Luna played (hatched: Opus and Luna mixed, which legs is not recorded). Every group of legs on Claude Opus 5.5, in either host, filed 1.5 to 3.0 negative rows per 100 commands.' }), fig);
    charts(fig, doc);
  }

  // Every run, sortable by any column.
  let key = 'label', dir = 1;
  const tbody = make(doc, 'tbody', {});
  const heads = LB_COLUMNS.map(([k, t]) => {
    const b = make(doc, 'button', { type: 'button', class: 'sort', title: LB_HELP[k] ? `${LB_HELP[k]}. Sort by this column.` : 'Sort by this column.', text: t, onclick: () => { if (key === k) dir = -dir; else { key = k; dir = ['label', 'persona', 'host', 'furthestStage', 'outcome'].includes(k) ? 1 : -1; } draw(); } });
    const th = make(doc, 'th', { scope: 'col' }, b); th.dataset.k = k; return th;
  });
  const draw = () => {
    for (const th of heads) { const on = th.dataset.k === key; if (on) th.setAttribute('aria-sort', dir > 0 ? 'ascending' : 'descending'); else th.removeAttribute('aria-sort'); }
    tbody.replaceChildren(...sortRuns(shown(), key, dir).map(r => make(doc, 'tr', {}, LB_COLUMNS.map(([k]) => cell(r, k)))));
  };
  root.append(make(doc, 'h2', { id: 'every-full-run', text: 'Every full run' }),
    make(doc, 'p', { class: 'note', text: 'Click a column\'s heading to sort by it, and again to reverse. Hover a heading for what it counts. The host chips above pick the runs here too. The same table is metrics-playtest-testers.csv.' }),
    make(doc, 'div', { class: 'table' }, make(doc, 'table', { class: 'all' }, make(doc, 'thead', {}, make(doc, 'tr', {}, heads)), tbody)));
  drawRanks();
  draw();
  host.append(root);
}
const APPS = { playtests: playtestsApp, 'contract-versions': contractApp, leaderboard: leaderboardApp };

// The page itself: ?page=<name> (index by default), with the contents from index.md down the side.
export async function show(doc = globalThis.document) {
  const params = new URLSearchParams(location.search);
  const name = /^[a-z0-9-]+$/i.test(params.get('page') ?? '') ? params.get('page') : 'index';
  const main = doc.getElementById('page'), nav = doc.getElementById('contents');
  const get = async p => { const r = await fetch(`wiki/${p}.md`); if (!r.ok) throw new Error(`${p}.md: ${r.status}`); return r.text(); };
  try {
    const [page, index] = await Promise.all([get(name), name === 'index' ? null : get('index').catch(() => '')]);
    main.innerHTML = render(page);
    // A generated page (playtests, contract-versions) mounts its app at the end, from its data.
    const app = /<!--\s*app:\s*([a-z-]+)\s*-->/.exec(page)?.[1];
    const mounted = app && APPS[app] ? APPS[app](main, doc).catch(e => { main.append(make(doc, 'p', { class: 'note', text: `Unable to load this page's data: ${e.message}` })); }) : null;
    zoomable(main, doc);
    const live = charts(main, doc);   // the metrics charts, made live (they keep their place: same size as the picture)
    const contents = render(index ?? page);
    // The side contents are the overview's contents list -- the links that begin a list item -- not every page link
    // in it: the overview's table and prose link pages too, and taking those as well listed every page twice. Each
    // page once, and Overview only as the fixed first entry.
    const parsed = new DOMParser().parseFromString(contents, 'text/html');
    const listed = [...parsed.querySelectorAll('li > a[href^="?page="]:first-child')];
    const seen = new Set(['?page=index']);
    const links = (listed.length ? listed : [...parsed.querySelectorAll('a[href^="?page="]')])
      .filter(a => { const page = a.getAttribute('href').split('#')[0]; return !seen.has(page) && seen.add(page); });
    // A page listed in a nested item of the contents (the Conference Room table under the journal, the diaries under
    // Playing it) is a subpage of the top-level page whose item holds it, and is drawn indented beneath it. A page with
    // subpages is a group that folds: the user (2026-09-24) wanted Playing it's 35 diaries folded away by default. A
    // group of more than FOLD subpages starts folded, unless one of its subpages is on screen; a smaller one starts open.
    const FOLD = 5;
    const sub = a => !!a.parentElement?.parentElement?.closest('li');
    const top = links.filter(a => !sub(a));
    const parentOf = a => { for (let li = a.parentElement?.parentElement?.closest('li'); li; li = li.parentElement?.closest('li')) { const first = li.querySelector(':scope > a:first-child'); if (first && top.includes(first)) return first; } return null; };
    const here = a => a.getAttribute('href').split('#')[0] === `?page=${name}`;
    const link = (a, child) => `<a href="${a.getAttribute('href')}"${[child && 'sub', here(a) && 'here'].filter(Boolean).length ? ` class="${[child && 'sub', here(a) && 'here'].filter(Boolean).join(' ')}"` : ''}${child ? ' style="padding-left:1.6rem;font-size:.88rem"' : ''}>${a.textContent}</a>`;
    nav.innerHTML = `<a href="?page=index"${name === 'index' ? ' class="here"' : ''}>Overview</a>`
      + top.map(a => {
        const kids = links.filter(k => sub(k) && parentOf(k) === a);
        if (!kids.length) return link(a, false);
        const open = kids.length <= FOLD || kids.some(here);
        return `<div class="group${open ? ' open' : ''}"><div class="head"><button type="button" class="fold" aria-expanded="${open}" title="Show or hide its ${kids.length} pages"></button>${link(a, false)}<span class="count">${kids.length}</span></div><div class="kids"${open ? '' : ' hidden'}>${kids.map(k => link(k, true)).join('')}</div></div>`;
      }).join('');
    for (const g of nav.querySelectorAll('.group')) g.querySelector('.fold').addEventListener('click', () => {
      const open = !g.classList.contains('open');
      g.classList.toggle('open', open); g.querySelector('.kids').hidden = !open; g.querySelector('.fold').setAttribute('aria-expanded', String(open));
    });
    doc.title = `${main.querySelector('h1')?.textContent ?? 'History'} · Stationfall`;
    await live;
    await mounted;
    if (location.hash) doc.getElementById(location.hash.slice(1))?.scrollIntoView();
  } catch (e) {
    main.innerHTML = `<h1>Not found</h1><p>${esc(e.message)}</p><p><a href="?page=index">Back to the overview</a></p>`;
  }
}
