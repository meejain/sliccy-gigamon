export default async function decorate(block) {
  // Each row is a quote card with two cells: [logo, text]
  // Restructure each row into a self-contained card
  const rows = [...block.children];
  rows.forEach((row) => {
    row.classList.add('quote-card');
    const cells = [...row.children];
    if (cells.length >= 2) {
      cells[0].classList.add('quote-logo');
      cells[1].classList.add('quote-body');
    }
  });
}
