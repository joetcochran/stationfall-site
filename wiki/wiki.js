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

// The page itself: ?page=<name> (index by default), with the contents from index.md down the side.
export async function show(doc = globalThis.document) {
  const params = new URLSearchParams(location.search);
  const name = /^[a-z0-9-]+$/i.test(params.get('page') ?? '') ? params.get('page') : 'index';
  const main = doc.getElementById('page'), nav = doc.getElementById('contents');
  const get = async p => { const r = await fetch(`wiki/${p}.md`); if (!r.ok) throw new Error(`${p}.md: ${r.status}`); return r.text(); };
  try {
    const [page, index] = await Promise.all([get(name), name === 'index' ? null : get('index').catch(() => '')]);
    main.innerHTML = render(page);
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
    if (location.hash) doc.getElementById(location.hash.slice(1))?.scrollIntoView();
  } catch (e) {
    main.innerHTML = `<h1>Not found</h1><p>${esc(e.message)}</p><p><a href="?page=index">Back to the overview</a></p>`;
  }
}
