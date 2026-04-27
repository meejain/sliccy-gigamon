export default async function decorate(block) {
  const rows = [...block.children];
  if (rows.length === 0) return;

  const row = rows[0];
  const cells = [...row.children];

  // First cell: background image — make it cover the block
  if (cells[0]) {
    const pic = cells[0].querySelector('picture');
    if (pic) {
      const img = pic.querySelector('img');
      if (img) {
        img.loading = 'eager';
      }
    }
  }
}
