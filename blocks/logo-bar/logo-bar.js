export default async function decorate(block) {
  const rows = [...block.children];
  if (rows.length === 0) return;

  // First row is the heading text
  const headingRow = rows[0];
  const headingText = headingRow.querySelector('p') || headingRow;

  // Remaining rows are logo images
  const logoImages = [];
  for (let i = 1; i < rows.length; i++) {
    const img = rows[i].querySelector('img');
    if (img) logoImages.push(img);
  }

  // Clear block
  block.innerHTML = '';

  // Build inner container
  const inner = document.createElement('div');
  inner.className = 'logo-bar-inner';

  // Heading section
  const heading = document.createElement('div');
  heading.className = 'logo-bar-heading';
  heading.appendChild(headingText.cloneNode(true));
  inner.appendChild(heading);

  // Logos container with scrolling track
  const logosContainer = document.createElement('div');
  logosContainer.className = 'logo-bar-logos';

  const track = document.createElement('div');
  track.className = 'logo-bar-track';

  // Add logos twice for seamless infinite scroll
  for (let repeat = 0; repeat < 2; repeat++) {
    logoImages.forEach((img) => {
      const clone = img.cloneNode(true);
      clone.loading = 'lazy';
      track.appendChild(clone);
    });
  }

  logosContainer.appendChild(track);
  inner.appendChild(logosContainer);
  block.appendChild(inner);
}
