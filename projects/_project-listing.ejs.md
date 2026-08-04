::: {.list .quarto-listing-default .projects-listing}

<% for (const item of items) { %>

::: {.quarto-post .project-entry}

```{=html}
<div class="project-period"><%= item.period %></div>
<div class="project-entry-body">
  <h3 class="no-anchor listing-title"><%= item.title %></h3>
  <div class="project-funder"><%= item.funder %></div>
</div>
```

:::

<% } %>

:::
