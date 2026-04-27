export default async function decorate(block) {
  const rows = [...block.children];

  // Build tab navigation and panels
  const nav = document.createElement('ul');
  nav.className = 'tab-nav';
  nav.setAttribute('role', 'tablist');

  const panels = [];

  rows.forEach((row, i) => {
    const cells = [...row.children];
    // cell 0 = tab label text, cell 1 = background image, cell 2 = content (h3, p, CTA)
    const labelCell = cells[0];
    const imageCell = cells[1];
    const contentCell = cells[2];

    const label = labelCell ? labelCell.textContent.trim() : `Tab ${i + 1}`;

    // Create tab button
    const li = document.createElement('li');
    li.setAttribute('role', 'presentation');
    const btn = document.createElement('button');
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    btn.setAttribute('tabindex', i === 0 ? '0' : '-1');
    btn.id = `tab-${i}`;
    btn.setAttribute('aria-controls', `panel-${i}`);
    btn.textContent = label;
    li.appendChild(btn);
    nav.appendChild(li);

    // Create panel
    const panel = document.createElement('div');
    panel.className = `tab-panel${i === 0 ? ' active' : ''}`;
    panel.setAttribute('role', 'tabpanel');
    panel.id = `panel-${i}`;
    panel.setAttribute('aria-labelledby', `tab-${i}`);

    // Background image
    if (imageCell) {
      const bgDiv = document.createElement('div');
      bgDiv.className = 'tab-bg';
      const pic = imageCell.querySelector('picture');
      if (pic) {
        bgDiv.appendChild(pic.cloneNode(true));
      }
      panel.appendChild(bgDiv);
    }

    // Content
    if (contentCell) {
      const contentDiv = document.createElement('div');
      contentDiv.className = 'tab-content';
      contentDiv.innerHTML = contentCell.innerHTML;
      panel.appendChild(contentDiv);
    }

    panels.push(panel);
  });

  // Clear block and rebuild
  block.textContent = '';
  block.appendChild(nav);
  panels.forEach((p) => block.appendChild(p));

  // Tab switching
  nav.addEventListener('click', (e) => {
    const btn = e.target.closest('button[role="tab"]');
    if (!btn) return;

    // Deactivate all
    nav.querySelectorAll('button[role="tab"]').forEach((b) => {
      b.setAttribute('aria-selected', 'false');
      b.setAttribute('tabindex', '-1');
    });
    block.querySelectorAll('.tab-panel').forEach((p) => p.classList.remove('active'));

    // Activate clicked
    btn.setAttribute('aria-selected', 'true');
    btn.setAttribute('tabindex', '0');
    const panelId = btn.getAttribute('aria-controls');
    const panel = block.querySelector(`#${panelId}`);
    if (panel) panel.classList.add('active');
  });

  // Keyboard navigation
  nav.addEventListener('keydown', (e) => {
    const tabs = [...nav.querySelectorAll('button[role="tab"]')];
    const current = tabs.findIndex((t) => t === document.activeElement);
    if (current < 0) return;

    let next = -1;
    if (e.key === 'ArrowRight') next = (current + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') next = (current - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabs.length - 1;

    if (next >= 0) {
      e.preventDefault();
      tabs[next].click();
      tabs[next].focus();
    }
  });
}
