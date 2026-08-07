(() => {
  const vw = document.documentElement.clientWidth;
  const problems = [];
  document.querySelectorAll('body *').forEach((el) => {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') return;
    if (cs.overflowX === 'auto' || cs.overflowX === 'scroll') return;
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return;
    const label = el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).join('.') : '');
    if (r.right > vw + 1 || r.left < -1) {
      problems.push({ kind: 'viewport', el: label, left: Math.round(r.left), right: Math.round(r.right) });
    } else if (el.scrollWidth > el.clientWidth + 1 && cs.overflowX === 'visible' && el.clientWidth > 0) {
      problems.push({ kind: 'self', el: label, scrollW: el.scrollWidth, clientW: el.clientWidth });
    }
  });
  const seen = new Set();
  return { vw, docScrollW: document.documentElement.scrollWidth, problems: problems.filter(p => {
    const k = p.kind + p.el; if (seen.has(k)) return false; seen.add(k); return true;
  }).slice(0, 25) };
})()
