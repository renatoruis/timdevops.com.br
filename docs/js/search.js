document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");

  searchInput.addEventListener("input", function () {
    const query = searchInput.value.toLowerCase();

    if (query.length === 0) {
      searchResults.style.display = "none";
      searchResults.innerHTML = ""; // Limpar os resultados
      return;
    }

    fetch("/index.json")
      .then((response) => response.json())
      .then((pages) => {
        const results = pages.filter((page) => {
          return (
            page.title.toLowerCase().includes(query) ||
            page.content.toLowerCase().includes(query)
          );
        });

        if (results.length > 0) {
          searchResults.style.display = "block";
          searchResults.innerHTML = results
            .map((result) => {
              return `<a href="${result.link}" class="block text-blue-500 hover:underline">${result.title}</a>`;
            })
            .join("");
        } else {
          searchResults.style.display = "none";
          searchResults.innerHTML = ""; // Limpar os resultados
        }
      });
  });
});
