(() => {
  const groupPublications = () => {
    const list = document.querySelector(
      ".publications-page .quarto-listing-default"
    );

    if (!list || list.dataset.yearGroups === "true") {
      return;
    }

    const posts = Array.from(list.children).filter((element) =>
      element.classList.contains("quarto-post")
    );

    if (posts.length === 0) {
      return;
    }

    const fragment = document.createDocumentFragment();
    let currentYear = "";
    let currentItems = null;

    posts.forEach((post) => {
      const year = post.querySelector(".listing-date")?.textContent.trim();

      if (!year) {
        return;
      }

      if (year !== currentYear) {
        currentYear = year;

        const group = document.createElement("section");
        const label = document.createElement("div");
        currentItems = document.createElement("div");
        const labelId = `publication-year-${year}`;

        group.className = "publication-year-group";
        group.setAttribute("aria-labelledby", labelId);
        label.className = "publication-year-label";
        label.id = labelId;
        label.textContent = year;
        currentItems.className = "publication-year-items";

        group.append(label, currentItems);
        fragment.append(group);
      }

      currentItems.append(post);
    });

    list.replaceChildren(fragment);
    list.dataset.yearGroups = "true";

    const syncVisibleGroups = () => {
      list.querySelectorAll(".publication-year-group").forEach((group) => {
        const hasVisiblePost = Array.from(
          group.querySelectorAll(".quarto-post")
        ).some((post) => !post.hidden);

        group.hidden = !hasVisiblePost;
      });
    };

    const originalFilter = document.querySelector(
      ".publications-page .quarto-listing-filter input"
    );

    if (originalFilter) {
      const filter = originalFilter.cloneNode(true);
      originalFilter.replaceWith(filter);

      filter.addEventListener("input", () => {
        const query = filter.value.trim().toLocaleLowerCase();

        posts.forEach((post) => {
          post.hidden =
            query.length > 0 &&
            !post.textContent.toLocaleLowerCase().includes(query);
        });

        syncVisibleGroups();
      });
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      window.requestAnimationFrame(groupPublications);
    });
  } else {
    window.requestAnimationFrame(groupPublications);
  }
})();
