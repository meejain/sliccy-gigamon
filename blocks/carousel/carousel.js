export default async function decorate(block) {
  const rows = [...block.children];

  // Create carousel track
  const track = document.createElement('div');
  track.classList.add('carousel-track');

  rows.forEach((row) => {
    const cells = [...row.children];
    const slide = document.createElement('div');
    slide.classList.add('carousel-slide');

    // First cell: image
    const imgCell = cells[0];
    const img = imgCell ? imgCell.querySelector('img') : null;
    if (img) {
      const imgWrap = document.createElement('div');
      imgWrap.classList.add('card-image');
      const picture = imgCell.querySelector('picture') || document.createElement('picture');
      if (picture.parentElement !== imgWrap) imgWrap.appendChild(picture);
      slide.appendChild(imgWrap);
    }

    // Second cell: content (category, title, description, CTA)
    const contentCell = cells[1];
    if (contentCell) {
      const cardContent = document.createElement('div');
      cardContent.classList.add('card-content');

      const paragraphs = contentCell.querySelectorAll('p');
      const h3 = contentCell.querySelector('h3');

      // Category (first p with strong text, not a link)
      if (paragraphs.length > 0) {
        const firstP = paragraphs[0];
        const categoryText = firstP.textContent.trim();
        if (categoryText && !firstP.querySelector('a')) {
          const cat = document.createElement('p');
          cat.classList.add('card-category');
          cat.textContent = categoryText;
          cardContent.appendChild(cat);
        }
      }

      // Heading
      if (h3) {
        const heading = document.createElement('h3');
        heading.textContent = h3.textContent;
        cardContent.appendChild(heading);
      }

      // Description (p without link, not first p)
      for (let i = 1; i < paragraphs.length; i += 1) {
        const p = paragraphs[i];
        if (!p.querySelector('a') && p.textContent.trim()) {
          const desc = document.createElement('p');
          desc.classList.add('card-desc');
          desc.textContent = p.textContent.trim();
          cardContent.appendChild(desc);
          break;
        }
      }

      // CTA link
      const link = contentCell.querySelector('a');
      if (link) {
        const cta = document.createElement('a');
        cta.classList.add('card-cta');
        cta.href = link.href;
        cta.textContent = link.textContent.trim();
        cardContent.appendChild(cta);
      }

      slide.appendChild(cardContent);
    }

    track.appendChild(slide);
    row.remove();
  });

  block.appendChild(track);

  // Navigation arrows
  const prevBtn = document.createElement('button');
  prevBtn.classList.add('carousel-nav', 'prev');
  prevBtn.setAttribute('aria-label', 'Previous');
  prevBtn.textContent = '‹';

  const nextBtn = document.createElement('button');
  nextBtn.classList.add('carousel-nav', 'next');
  nextBtn.setAttribute('aria-label', 'Next');
  nextBtn.textContent = '›';

  block.appendChild(prevBtn);
  block.appendChild(nextBtn);

  // Carousel logic
  let currentIndex = 0;
  const slides = track.querySelectorAll('.carousel-slide');
  const totalSlides = slides.length;

  function getVisibleCount() {
    const w = block.offsetWidth;
    if (w >= 1200) return 3;
    if (w >= 900) return 2;
    return 1;
  }

  function updateTrack() {
    const visibleCount = getVisibleCount();
    const maxIndex = Math.max(0, totalSlides - visibleCount);
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    const slideWidth = 100 / visibleCount;
    const offset = currentIndex * slideWidth;
    track.style.transform = `translateX(-${offset}%)`;
  }

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex -= 1;
      updateTrack();
    }
  });

  nextBtn.addEventListener('click', () => {
    const visibleCount = getVisibleCount();
    const maxIndex = Math.max(0, totalSlides - visibleCount);
    if (currentIndex < maxIndex) {
      currentIndex += 1;
      updateTrack();
    }
  });

  updateTrack();
  window.addEventListener('resize', updateTrack);
}
