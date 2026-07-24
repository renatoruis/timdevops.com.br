(function () {
  "use strict";

  const PAGE_SIZE = 8;
  const SNIPPET_RADIUS = 70;
  const DEBOUNCE_MS = 220;

  function escapeHTML(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function makeSnippet(content, query) {
    if (!content) return "";
    const lower = content.toLowerCase();
    const idx = lower.indexOf(query);
    if (idx === -1) {
      return escapeHTML(content.slice(0, SNIPPET_RADIUS * 2)) + (content.length > SNIPPET_RADIUS * 2 ? "…" : "");
    }
    const start = Math.max(0, idx - SNIPPET_RADIUS);
    const end = Math.min(content.length, idx + query.length + SNIPPET_RADIUS);
    const before = start > 0 ? "…" : "";
    const after = end < content.length ? "…" : "";
    const slice = content.slice(start, end);
    const escaped = escapeHTML(slice);
    const escapedQuery = escapeHTML(query);
    return before + escaped.replace(new RegExp(escapeRegExp(escapedQuery), "gi"), (m) => `<mark>${m}</mark>`) + after;
  }

  function highlightTitle(title, query) {
    const escaped = escapeHTML(title);
    if (!query) return escaped;
    const escapedQuery = escapeHTML(query);
    return escaped.replace(new RegExp(escapeRegExp(escapedQuery), "gi"), (m) => `<mark>${m}</mark>`);
  }

  function debounce(fn, ms) {
    let t;
    return function (...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), ms);
    };
  }

  document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("search-modal");
    const searchInput = document.getElementById("search-input");
    const searchResults = document.getElementById("search-results");
    if (!modal || !searchInput || !searchResults) return;

    let cache = null;
    let visibleCount = PAGE_SIZE;
    let lastResults = [];
    let lastQuery = "";
    let isOpen = false;

    function render() {
      if (!lastQuery) {
        searchResults.innerHTML = '<p class="search-empty">Comece a digitar para buscar posts…</p>';
        return;
      }

      if (lastResults.length === 0) {
        searchResults.innerHTML = `<p class="search-empty">Nenhum resultado para "${escapeHTML(lastQuery)}"</p>`;
        return;
      }

      const visible = lastResults.slice(0, visibleCount);
      const items = visible
        .map((r) => {
          const title = highlightTitle(r.title, lastQuery);
          const snippet = makeSnippet(r.content, lastQuery);
          return `<a class="search-result-link" href="${escapeHTML(r.link)}">
            <span class="search-result-title">${title}</span>
            <span class="search-result-snippet">${snippet}</span>
          </a>`;
        })
        .join("");

      const more = lastResults.length > visibleCount
        ? `<button type="button" class="search-more" id="search-more">Ver mais (${lastResults.length - visibleCount})</button>`
        : "";

      searchResults.innerHTML = items + more;

      const btn = document.getElementById("search-more");
      if (btn) {
        btn.addEventListener("click", () => {
          visibleCount += PAGE_SIZE;
          render();
        });
      }
    }

    function filterPages(pages, query) {
      const q = query.toLowerCase();
      return pages.filter((p) => {
        return (
          (p.title && p.title.toLowerCase().includes(q)) ||
          (p.content && p.content.toLowerCase().includes(q))
        );
      });
    }

    const runSearch = debounce(function () {
      const query = searchInput.value.trim();

      if (query.length === 0) {
        lastQuery = "";
        lastResults = [];
        render();
        return;
      }

      const finish = (pages) => {
        lastResults = filterPages(pages, query);
        lastQuery = query;
        visibleCount = PAGE_SIZE;
        render();
      };

      if (cache) {
        finish(cache);
        return;
      }

      searchResults.innerHTML = '<p class="search-empty">Carregando…</p>';

      fetch("/index.json")
        .then((response) => {
          if (!response.ok) throw new Error("Network error");
          return response.json();
        })
        .then((pages) => {
          cache = pages;
          finish(pages);
        })
        .catch(() => {
          searchResults.innerHTML =
            '<p class="search-empty">Não foi possível carregar a busca.</p>';
        });
    }, DEBOUNCE_MS);

    function openModal() {
      if (isOpen) return;
      isOpen = true;
      modal.hidden = false;
      requestAnimationFrame(() => modal.classList.add("is-open"));
      document.documentElement.classList.add("search-open");
      render();
      setTimeout(() => searchInput.focus(), 30);
    }

    function closeModal() {
      if (!isOpen) return;
      isOpen = false;
      modal.classList.remove("is-open");
      document.documentElement.classList.remove("search-open");
      searchInput.value = "";
      lastQuery = "";
      lastResults = [];
      visibleCount = PAGE_SIZE;
      setTimeout(() => {
        if (!isOpen) modal.hidden = true;
      }, 180);
    }

    searchInput.addEventListener("input", runSearch);

    document.addEventListener("click", (e) => {
      const opener = e.target.closest && e.target.closest("[data-search-open]");
      if (opener) {
        e.preventDefault();
        openModal();
        return;
      }
      const closer = e.target.closest && e.target.closest("[data-search-close]");
      if (closer && isOpen) {
        e.preventDefault();
        closeModal();
      }
    });

    document.addEventListener("keydown", (e) => {
      const isCmdK = (e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K");
      if (isCmdK) {
        e.preventDefault();
        if (isOpen) closeModal();
        else openModal();
        return;
      }
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        closeModal();
      }
    });

    searchResults.addEventListener("click", (e) => {
      const link = e.target.closest && e.target.closest("a.search-result-link");
      if (link) {
        closeModal();
      }
    });

    // Sitelinks searchbox: abre o modal ja preenchido quando a URL tem ?q=
    try {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("q");
      if (q && q.trim().length > 0) {
        openModal();
        searchInput.value = q;
        runSearch();
      }
    } catch (_) {}
  });
})();
