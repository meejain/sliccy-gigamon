export default async function decorate(block) {
  // The block has two rows:
  // Row 1: logo cell + text/CTA cell (content)
  // Row 2: badge image cell (right side image)
  // Restructure into a two-column layout: left content, right badge
  const rows = [...block.children];
  if (rows.length < 2) return;

  const contentRow = rows[0];
  const badgeRow = rows[1];

  // Create a flex container
  const container = document.createElement('div');
  container.className = 'awards-layout';

  // Left column: combine logo + text from row 1
  const leftCol = document.createElement('div');
  leftCol.className = 'awards-content';
  const cells = [...contentRow.children];
  cells.forEach((cell) => {
    while (cell.firstChild) {
      leftCol.appendChild(cell.firstChild);
    }
  });

  // Right column: badge image from row 2
  const rightCol = document.createElement('div');
  rightCol.className = 'awards-badge';
  const badgeCells = [...badgeRow.children];
  badgeCells.forEach((cell) => {
    while (cell.firstChild) {
      rightCol.appendChild(cell.firstChild);
    }
  });

  container.appendChild(leftCol);
  container.appendChild(rightCol);

  // Clear existing rows and append new layout
  block.textContent = '';
  block.appendChild(container);
}
