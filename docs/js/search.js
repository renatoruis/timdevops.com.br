document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");

  searchInput.addEventListener("input", function () {
    const query = searchInput.value.toLowerCase();
    fetch("/index.json")
      .then((response) => response.json())
      .then((pages) => {
        const results = pages.filter((page) => {
          return (
            page.title.toLowerCase().includes(query) ||
            page.content.toLowerCase().includes(query)
          );
        });
        searchResults.innerHTML = results
          .map((result) => {
            return `<a href="${result.link}" class="block text-blue-500 hover:underline">${result.title}</a>`;
          })
          .join("");
      });
  });
});
