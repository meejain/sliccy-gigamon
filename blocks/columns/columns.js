export default async function decorate(block) {
  const rows = [...block.children];
  rows.forEach((row) => {
    const cells = [...row.children];
    cells.forEach((cell) => {
      // Add semantic classes based on content
      const hasImg = cell.querySelector('picture, img');
      const hasText = cell.querySelector('h1, h2, h3, h4, h5, h6, p');
      if (hasImg && !hasText) {
        cell.classList.add('columns-img-col');
      } else if (hasText) {
        cell.classList.add('columns-text-col');
      }
    });
  });
}
