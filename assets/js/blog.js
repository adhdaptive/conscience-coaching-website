(() => {
  const grid = document.querySelector("[data-blog-grid]");
  const filterGroup = document.querySelector("[data-blog-filters]");

  if (!grid || !filterGroup) return;

  const cards = Array.from(grid.querySelectorAll("[data-tags]"));
  const tags = [...new Set(
    cards.flatMap(card =>
      card.dataset.tags
        .split("|")
        .map(tag => tag.trim())
        .filter(Boolean)
    )
  )].sort((a, b) => a.localeCompare(b));

  const counts = new Map(
    tags.map(tag => [
      tag,
      cards.filter(card =>
        card.dataset.tags.split("|").map(value => value.trim()).includes(tag)
      ).length
    ])
  );

  const makeButton = (label, value, count) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "blog-filter";
    button.dataset.filter = value;
    button.setAttribute("aria-pressed", value === "all" ? "true" : "false");
    button.textContent = count === null ? label : `${label} (${count})`;
    return button;
  };

  filterGroup.append(makeButton("All articles", "all", cards.length));
  tags.forEach(tag => filterGroup.append(makeButton(tag, tag, counts.get(tag))));
  filterGroup.hidden = false;

  const status = document.querySelector("[data-blog-status]");

  const applyFilter = selected => {
    const button = Array.from(filterGroup.querySelectorAll("[data-filter]"))
      .find(item => item.dataset.filter === selected);
    if (!button) return;

    filterGroup.querySelectorAll("[data-filter]").forEach(item => {
      item.setAttribute("aria-pressed", String(item === button));
    });

    let visible = 0;
    cards.forEach(card => {
      const cardTags = card.dataset.tags.split("|").map(value => value.trim());
      const show = selected === "all" || cardTags.includes(selected);
      card.hidden = !show;
      if (show) visible += 1;
    });

    if (status) {
      status.textContent = selected === "all"
        ? `Showing all ${visible} articles.`
        : `Showing ${visible} article${visible === 1 ? "" : "s"} tagged ${selected}.`;
    }
  };

  filterGroup.addEventListener("click", event => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;

    applyFilter(button.dataset.filter);
  });

  const requestedTopic = new URLSearchParams(window.location.search).get("topic");
  if (requestedTopic) applyFilter(requestedTopic);
})();
