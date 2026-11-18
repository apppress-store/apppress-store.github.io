// App Press Store — theme switch, floating dock, app mode tabs
(function () {
  var root = document.documentElement;

  // ---------- theme: follow the system unless the visitor picks one ----------
  var sw = document.getElementById('themeSwitch');
  var media = window.matchMedia('(prefers-color-scheme: dark)');

  function saved() { try { return localStorage.getItem('apppress-theme'); } catch (e) { return null; } }
  function apply(t) {
    root.setAttribute('data-theme', t);
    sw.setAttribute('aria-checked', t === 'dark' ? 'true' : 'false');
  }
  apply(root.getAttribute('data-theme') || (media.matches ? 'dark' : 'light'));

  sw.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    apply(next);
    try { localStorage.setItem('apppress-theme', next); } catch (e) {}
  });
  var onSystem = function (e) { if (!saved()) apply(e.matches ? 'dark' : 'light'); };
  if (media.addEventListener) media.addEventListener('change', onSystem); else if (media.addListener) media.addListener(onSystem);

  // ---------- floating dock: pressed indicator slides to the active section ----------
  var dock = document.querySelector('.dock');
  var indicator = dock.querySelector('.dock-indicator');
  var items = Array.prototype.slice.call(dock.querySelectorAll('.dock-item'));

  function moveTo(item) {
    items.forEach(function (i) { i.classList.toggle('is-active', i === item); });
    indicator.style.width = item.offsetWidth + 'px';
    indicator.style.transform = 'translateX(' + (item.offsetLeft - indicator.offsetLeft) + 'px)';
  }
  // place it without animating on first load
  indicator.style.transition = 'none';
  moveTo(items[0]);
  indicator.offsetWidth; // reflow
  indicator.style.transition = '';
  window.addEventListener('resize', function () {
    var a = dock.querySelector('.dock-item.is-active') || items[0];
    indicator.style.transition = 'none'; moveTo(a); indicator.offsetWidth; indicator.style.transition = '';
  });

  items.forEach(function (item) { item.addEventListener('click', function () { moveTo(item); }); });

  // scroll-spy: whichever section fills the middle of the screen
  var sections = items.map(function (i) { return document.getElementById(i.getAttribute('data-section')); });
  function spy() {
    var mid = window.innerHeight * 0.45, best = 0;
    sections.forEach(function (s, idx) { if (s && s.getBoundingClientRect().top <= mid) best = idx; });
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight - 4) best = sections.length - 1;
    if (!items[best].classList.contains('is-active')) moveTo(items[best]);
  }
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(function () { spy(); ticking = false; }); }
  }, { passive: true });

  // ---------- app search ----------
  var form = document.getElementById('searchForm');
  var input = document.getElementById('appSearch');
  var searchBtn = document.getElementById('searchBtn');
  var countPill = document.getElementById('appCount');
  var soon = document.getElementById('soonTile');
  var none = document.getElementById('noResults');
  var noneTerm = document.getElementById('noResultsTerm');
  var tiles = Array.prototype.slice.call(document.querySelectorAll('#shelf a.app-tile'));
  var total = tiles.length;
  var defaultCount = countPill.textContent;

  function haystack(t) {
    return (t.textContent + ' ' + (t.getAttribute('data-search') || '')).toLowerCase();
  }
  function filter() {
    var q = input.value.trim().toLowerCase();
    var words = q.split(/\s+/).filter(Boolean);
    var shown = 0;
    tiles.forEach(function (t) {
      var hay = haystack(t);
      var ok = words.every(function (w) { return hay.indexOf(w) !== -1; });
      t.hidden = !ok;
      t.classList.toggle('is-match', ok && words.length > 0);
      if (ok) shown++;
    });
    soon.hidden = words.length > 0;
    none.hidden = !(words.length > 0 && shown === 0);
    noneTerm.textContent = input.value.trim();
    countPill.textContent = words.length ? (shown + (shown === 1 ? ' result' : ' results')) : defaultCount;
    return shown;
  }
  function openSearch() {
    document.getElementById('home').scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(function () { input.focus({ preventScroll: true }); input.select(); }, 350);
  }

  input.addEventListener('input', filter);
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (filter() > 0) {
      var first = tiles.filter(function (t) { return !t.hidden; })[0];
      if (first) first.click();   // jump to that app's details
    }
  });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { input.value = ''; filter(); input.blur(); }
  });
  document.getElementById('clearSearch').addEventListener('click', function () { input.value = ''; filter(); input.focus(); });
  searchBtn.addEventListener('click', openSearch);
  document.addEventListener('keydown', function (e) {
    var tag = (e.target.tagName || '').toLowerCase();
    if (e.key === '/' && tag !== 'input' && tag !== 'textarea' && !e.ctrlKey && !e.metaKey) { e.preventDefault(); openSearch(); }
  });

  // ---------- app mode tabs swap the screenshot ----------
  var captions = {
    per:  'Pick a different image for each screen. Left and right are detected from how your monitors are arranged.',
    same: 'One image, every screen. Choose Wallpaper A once and it lands on monitor 1 and monitor 2.',
    span: 'One picture stretched across all displays as a single wide scene — best with ultra-wide images.'
  };
  var shot = document.getElementById('modeShot');
  var caption = document.getElementById('modeCaption');
  var modes = Array.prototype.slice.call(document.querySelectorAll('.mode'));
  var imgs = shot.querySelectorAll('img');
  // preload
  ['per', 'same', 'span'].forEach(function (m) { ['light', 'dark'].forEach(function (t) { new Image().src = 'assets/' + m + '-' + t + '.webp'; }); });

  modes.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var m = btn.getAttribute('data-shot');
      modes.forEach(function (b) {
        var on = b === btn;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      shot.classList.add('is-swapping');
      setTimeout(function () {
        imgs[0].src = 'assets/' + m + '-light.webp';
        imgs[1].src = 'assets/' + m + '-dark.webp';
        caption.textContent = captions[m];
        shot.classList.remove('is-swapping');
      }, 180);
    });
  });
})();
