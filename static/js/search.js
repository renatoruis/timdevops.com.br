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
    const re = new RegExp(escapeRegExp(query), "gi");
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
    const searchInput = document.getElementById("search-input");
    const searchResults = document.getElementById("search-results");
    if (!searchInput || !searchResults) return;

    let cache = null;
    let visibleCount = PAGE_SIZE;
    let lastResults = [];
    let lastQuery = "";

    function showResults(query) {
      visibleCount = PAGE_SIZE;
      lastQuery = query;
      render();
    }

    function render() {
      if (!lastQuery) {
        searchResults.hidden = true;
        searchResults.innerHTML = "";
        return;
      }

      if (lastResults.length === 0) {
        searchResults.hidden = false;
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

      searchResults.hidden = false;
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
        searchResults.hidden = true;
        searchResults.innerHTML = "";
        return;
      }

      const finish = (pages) => {
        lastResults = filterPages(pages, query);
        showResults(query);
      };

      if (cache) {
        finish(cache);
        return;
      }

      searchResults.hidden = false;
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
          searchResults.hidden = false;
          searchResults.innerHTML =
            '<p class="search-empty">Não foi possível carregar a busca.</p>';
        });
    }, DEBOUNCE_MS);

    searchInput.addEventListener("input", runSearch);

    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        searchInput.value = "";
        lastQuery = "";
        lastResults = [];
        searchResults.hidden = true;
        searchResults.innerHTML = "";
        searchInput.blur();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key !== "/") return;
      const tag = (e.target && e.target.tagName) || "";
      const editable = e.target && e.target.isContentEditable;
      if (editable || tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
    });
  });
})();
