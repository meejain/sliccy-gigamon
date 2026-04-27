export default async function decorate(block) {
  const rows = [...block.children];
  if (rows.length < 1) return;

  const row = rows[0];
  const cells = [...row.children];

  // Cell 0: main image
  // Cell 1: eyebrow + logo
  // Cell 2: quote + attribution + CTA

  const imageCell = cells[0];
  const metaCell = cells[1];
  const textCell = cells[2];

  // Build image wrapper
  if (imageCell) {
    imageCell.classList.add('fc-image');
  }

  // Build content wrapper from meta + text cells
  const content = document.createElement('div');
  content.classList.add('fc-content');

  if (metaCell) {
    // Eyebrow paragraph
    const eyebrowP = metaCell.querySelector('p');
    if (eyebrowP) {
      eyebrowP.classList.add('fc-eyebrow');
      content.appendChild(eyebrowP);
    }

    // Logo image
    const logoPic = metaCell.querySelector('picture');
    if (logoPic) {
      const logoWrapper = document.createElement('div');
      logoWrapper.classList.add('fc-logo');
      logoWrapper.appendChild(logoPic);
      content.appendChild(logoWrapper);
    }
  }

  if (textCell) {
    const paragraphs = [...textCell.querySelectorAll('p')];
    paragraphs.forEach((p, i) => {
      if (p.querySelector('a')) {
        // CTA link
        p.classList.add('fc-cta');
        content.appendChild(p);
      } else if (i === 0) {
        // Quote
        p.classList.add('fc-quote');
        content.appendChild(p);
      } else {
        // Attribution
        p.classList.add('fc-attribution');
        content.appendChild(p);
      }
    });
  }

  // Clear row and rebuild with image + content
  row.innerHTML = '';
  if (imageCell) row.appendChild(imageCell);
  row.appendChild(content);

  // Remove extra rows
  rows.slice(1).forEach((r) => r.remove());
}
