var LINKS = {
    github: "https://github.com/SreeSowmya08",
    linkedin: "https://www.linkedin.com/in/sree-sowmya-b27642335/",
    linktrackRepo: "https://github.com/SreeSowmya08/LinkTrack",
    linktrackDemo: "https://link-track-delta.vercel.app/",
    adopetsRepo: "https://github.com/SreeSowmya08/AdoPet",
    adopetsDemo: "https://adopet-silk-eta.vercel.app/"
  };
  document.querySelectorAll("[data-link]").forEach(function (el) {
    var url = LINKS[el.getAttribute("data-link")];
    if (url) {
      el.setAttribute("href", url);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
      el.hidden = false;
    }
  });

  var copyBtn = document.getElementById("copy-email");
  var note = document.getElementById("copy-note");
  var emailEl = document.getElementById("email-text");
  copyBtn.addEventListener("click", function () {
    var text = emailEl.textContent.trim();
    function selectText() {
      var range = document.createRange();
      range.selectNodeContents(emailEl);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      note.textContent = "Address selected. Press Ctrl+C or Cmd+C to copy.";
    }
    try {
      navigator.clipboard.writeText(text).then(function () {
        note.textContent = "Copied to clipboard.";
      }, selectText);
    } catch (e) { selectText(); }
  });

  // Typing line in the sidebar.
  (function () {
    var el = document.getElementById("role");
    var words = ["REST APIs", "secure logins with JWT", "React interfaces", "Dockerized apps", "full-stack projects"];
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { el.textContent = words[0]; return; }
    var w = 0, c = words[0].length, del = true;
    function tick() {
      var word = words[w];
      if (del) { c--; } else { c++; }
      el.textContent = word.slice(0, c);
      var wait = del ? 35 : 70;
      if (!del && c === word.length) { del = true; wait = 1600; }
      else if (del && c === 0) { del = false; w = (w + 1) % words.length; wait = 300; }
      setTimeout(tick, wait);
    }
    setTimeout(tick, 1800);
  })();

  // Scroll progress bar.
  (function () {
    var bar = document.getElementById("progress");
    function update() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0) + "%";
    }
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  })();

  // Soft purple glow that follows the pointer (mouse devices only).
  (function () {
    if (!window.matchMedia || !window.matchMedia("(hover: hover)").matches) return;
    var g = document.getElementById("glow");
    window.addEventListener("pointermove", function (e) {
      g.style.transform = "translate(" + e.clientX + "px," + e.clientY + "px)";
      g.classList.add("on");
    });
    document.addEventListener("mouseleave", function () { g.classList.remove("on"); });
  })();

  // Click a skill to highlight the projects that use it.
  (function () {
    var note = document.getElementById("skill-note");
    var skillChips = document.querySelectorAll(".skills .chips li");
    var projects = document.querySelectorAll("#projects .entry");
    var active = null;
    function clear() {
      skillChips.forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
      projects.forEach(function (p) {
        p.classList.remove("dim");
        p.querySelectorAll(".chips li").forEach(function (c) { c.classList.remove("hit"); });
      });
    }
    function pick(chip) {
      var name = chip.textContent.trim();
      if (active === chip) { active = null; clear(); note.textContent = "Click a skill to see which project uses it."; return; }
      active = chip; clear();
      chip.setAttribute("aria-pressed", "true");
      var used = [];
      projects.forEach(function (p) {
        var hit = false;
        p.querySelectorAll(".chips li").forEach(function (c) {
          if (c.textContent.trim().toLowerCase() === name.toLowerCase()) { c.classList.add("hit"); hit = true; }
        });
        if (hit) { used.push(p.querySelector("h3").childNodes[0].textContent.trim()); } else { p.classList.add("dim"); }
      });
      if (used.length) {
        note.innerHTML = "<b>" + name + "</b> is used in " + used.join(" and ") + ".";
        document.getElementById("projects").scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        note.innerHTML = "<b>" + name + "</b> is not tagged on a specific project.";
        projects.forEach(function (p) { p.classList.remove("dim"); });
      }
    }
    skillChips.forEach(function (chip) {
      chip.setAttribute("tabindex", "0");
      chip.setAttribute("role", "button");
      chip.setAttribute("aria-pressed", "false");
      chip.addEventListener("click", function () { pick(chip); });
      chip.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(chip); }
      });
    });
  })();

  // Jump menu: press / or Ctrl+K (Cmd+K on Mac).
  (function () {
    var pal = document.getElementById("pal");
    var input = document.getElementById("pal-in");
    var list = document.getElementById("pal-list");
    var items = [
      { t: "About", k: "Section", href: "#about" },
      { t: "Projects", k: "Section", href: "#projects" },
      { t: "LinkTrack", k: "Project", href: "#projects" },
      { t: "AdoPets", k: "Project", href: "#projects" },
      { t: "Skills", k: "Section", href: "#skills" },
      { t: "Education", k: "Section", href: "#education" },
      { t: "Certifications", k: "Section", href: "#certifications" },
      { t: "Contact", k: "Section", href: "#contact" },
      { t: "LinkTrack live demo", k: "Open", href: LINKS.linktrackDemo, ext: true },
      { t: "AdoPets live demo", k: "Open", href: LINKS.adopetsDemo, ext: true },
      { t: "GitHub profile", k: "Open", href: LINKS.github, ext: true },
      { t: "LinkedIn profile", k: "Open", href: LINKS.linkedin, ext: true },
      { t: "Copy email address", k: "Action", action: true }
    ];
    var shown = [], idx = 0;
    function render() {
      var q = input.value.trim().toLowerCase();
      shown = items.filter(function (i) { return !q || i.t.toLowerCase().indexOf(q) !== -1 || i.k.toLowerCase().indexOf(q) !== -1; });
      if (idx >= shown.length) idx = 0;
      list.innerHTML = "";
      if (!shown.length) { list.innerHTML = '<li class="pal-empty">Nothing matches that.</li>'; return; }
      shown.forEach(function (it, n) {
        var li = document.createElement("li");
        var el = document.createElement(it.action ? "button" : "a");
        if (it.action) { el.type = "button"; } else {
          el.href = it.href;
          if (it.ext) { el.target = "_blank"; el.rel = "noopener"; }
        }
        el.innerHTML = "<span></span><span class='k'></span>";
        el.children[0].textContent = it.t;
        el.children[1].textContent = it.k;
        el.addEventListener("click", function () {
          if (it.action) { document.getElementById("copy-email").click(); }
          close();
        });
        el.addEventListener("mouseenter", function () { idx = n; mark(); });
        li.appendChild(el);
        if (n === idx) li.className = "sel";
        list.appendChild(li);
      });
    }
    function mark() {
      Array.prototype.forEach.call(list.children, function (li, n) { li.classList.toggle("sel", n === idx); });
    }
    function open() { pal.hidden = false; input.value = ""; idx = 0; render(); input.focus(); }
    function close() { pal.hidden = true; }
    document.getElementById("open-pal").addEventListener("click", open);
    pal.addEventListener("click", function (e) { if (e.target === pal) close(); });
    input.addEventListener("input", function () { idx = 0; render(); });
    document.addEventListener("keydown", function (e) {
      var typing = document.activeElement === input;
      if ((e.key === "k" || e.key === "K") && (e.ctrlKey || e.metaKey)) { e.preventDefault(); pal.hidden ? open() : close(); return; }
      if (e.key === "/" && pal.hidden && !typing) { e.preventDefault(); open(); return; }
      if (pal.hidden) return;
      if (e.key === "Escape") { close(); }
      else if (e.key === "ArrowDown") { e.preventDefault(); if (shown.length) { idx = (idx + 1) % shown.length; mark(); } }
      else if (e.key === "ArrowUp") { e.preventDefault(); if (shown.length) { idx = (idx - 1 + shown.length) % shown.length; mark(); } }
      else if (e.key === "Enter") {
        e.preventDefault();
        var sel = list.children[idx];
        if (sel && sel.firstChild && sel.firstChild.click) sel.firstChild.click();
      }
    });
  })();

  // Highlight the section in view in both menus.
  try {
    var links = document.querySelectorAll(".menu a, .tabbar a");
    var sections = document.querySelectorAll("main section");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (a) { a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id); });
        }
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    sections.forEach(function (s) { io.observe(s); });
  } catch (e) {}
