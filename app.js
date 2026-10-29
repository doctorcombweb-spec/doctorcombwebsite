/**
 * Doctor Comb - Interactive App Logic
 * Designed for immediate usability, touch-friendly interactions, and direct conversion.
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroCarousel();
  initMobileMenu();
  initComparisonSlider();
  initRealResultsSection();
  initProductFilter();
  initModalTriggers();
  initReviewModal();
  initSmoothScroll();
  renderHomepageBlogCards();
  initBlogSystem();
  initSingleBlogPostPage();
  initInstagramSection();
});

/* --------------------------------------------------------------------------
   0. Full Screen Hero Auto Carousel
   -------------------------------------------------------------------------- */
function initHeroCarousel() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  const prevBtn = document.getElementById('heroNavPrev');
  const nextBtn = document.getElementById('heroNavNext');
  const carousel = document.getElementById('hero');

  if (!slides.length) return;

  let currentIndex = 0;
  let autoTimer = null;
  const slideInterval = 2000; // 2.0 seconds auto interval

  function goToSlide(index) {
    slides[currentIndex].classList.remove('active');
    if (dots && dots.length > currentIndex && dots[currentIndex]) {
      dots[currentIndex].classList.remove('active');
    }

    currentIndex = (index + slides.length) % slides.length;

    slides[currentIndex].classList.add('active');
    if (dots && dots.length > currentIndex && dots[currentIndex]) {
      dots[currentIndex].classList.add('active');
    }
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoTimer = setInterval(nextSlide, slideInterval);
  }

  function stopAutoPlay() {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      nextSlide();
      startAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      prevSlide();
      startAutoPlay();
    });
  }

  if (dots && dots.length) {
    dots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetIndex = parseInt(dot.getAttribute('data-go'), 10);
        if (!isNaN(targetIndex)) {
          goToSlide(targetIndex);
          startAutoPlay();
        }
      });
    });
  }

  if (carousel) {
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoPlay();
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 40) {
        if (diff < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      startAutoPlay();
    }, { passive: true });
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
      startAutoPlay();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
      startAutoPlay();
    }
  });

  // Start rotation
  startAutoPlay();
}

/* --------------------------------------------------------------------------
   1. Mobile Menu Toggle
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const navPanel = document.getElementById('mobileNavPanel');
  const links = document.querySelectorAll('.mobile-link');

  if (!toggleBtn || !navPanel) return;

  toggleBtn.addEventListener('click', () => {
    navPanel.classList.toggle('active');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      navPanel.classList.remove('active');
    });
  });
}

/* --------------------------------------------------------------------------
   2. Interactive Draggable Before / After Comparison Slider
   -------------------------------------------------------------------------- */
function initComparisonSlider() {
  const sliderContainer = document.getElementById('comparisonSlider');
  const sliderHandle = document.getElementById('sliderHandle');
  if (!sliderContainer || !sliderHandle) return;

  let isDragging = false;

  const updateSlider = (clientX) => {
    const rect = sliderContainer.getBoundingClientRect();
    let x = clientX - rect.left;
    if (x < 20) x = 20;
    if (x > rect.width - 20) x = rect.width - 20;

    const percentage = (x / rect.width) * 100;
    sliderHandle.style.left = `${percentage}%`;
  };

  // Mouse Events
  sliderHandle.addEventListener('mousedown', () => {
    isDragging = true;
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  });

  // Touch Events (Mobile friendly)
  sliderHandle.addEventListener('touchstart', () => {
    isDragging = true;
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging || !e.touches[0]) return;
    updateSlider(e.touches[0].clientX);
  }, { passive: true });

  // Direct Click on Container to Jump
  sliderContainer.addEventListener('click', (e) => {
    updateSlider(e.clientX);
  });
}

/* --------------------------------------------------------------------------
   2B. Real People Real Results Section (Navigation & Touch Interactions)
   -------------------------------------------------------------------------- */
function initRealResultsSection() {
  const prevBtn = document.getElementById('realResultsPrev');
  const nextBtn = document.getElementById('realResultsNext');
  const wrapper = document.querySelector('.real-results-ribbon-strip');
  const track = document.getElementById('realResultsTrack');
  const ribbonImg = document.querySelector('.real-results-ribbon-img');

  if (!wrapper) return;

  const scrollAmount = 260;

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (wrapper.scrollWidth > wrapper.clientWidth + 5) {
        wrapper.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else if (track) {
        track.style.transform = 'translateX(-12px)';
        setTimeout(() => { track.style.transform = 'translateX(0)'; }, 280);
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (wrapper.scrollWidth > wrapper.clientWidth + 5) {
        wrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      } else if (track) {
        track.style.transform = 'translateX(12px)';
        setTimeout(() => { track.style.transform = 'translateX(0)'; }, 280);
      }
    });
  }

  // Click on image opens consultation modal with preselected category
  if (ribbonImg) {
    ribbonImg.style.cursor = 'pointer';
    ribbonImg.addEventListener('click', () => {
      openConsultationModal('Real Results Transformation');
    });
  }
}

/* --------------------------------------------------------------------------
   3. Product Category Filter
   -------------------------------------------------------------------------- */
function initProductFilter() {
  const filterBtns = document.querySelectorAll('.filter-pill');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      productCards.forEach(card => {
        if (filterValue === 'all') {
          card.style.display = 'flex';
        } else {
          const category = card.getAttribute('data-category');
          if (category === filterValue) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   4. Consultation Booking Modal & WhatsApp Integration
   -------------------------------------------------------------------------- */
function openConsultationModal(sourceTitle = 'General Inquiry') {
  const modal = document.getElementById('consultModal');
  const sourceInput = document.getElementById('formSource');
  if (modal) {
    if (sourceInput) sourceInput.value = sourceTitle;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeConsultationModal() {
  const modal = document.getElementById('consultModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = 'auto';
  }
}

// Global modal triggers
window.openConsultationModal = openConsultationModal;
window.closeConsultationModal = closeConsultationModal;

function initModalTriggers() {
  const modal = document.getElementById('consultModal');
  if (!modal) return;

  // Click outside to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeConsultationModal();
    }
  });

  // ESC key to close
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeConsultationModal();
    }
  });
}

function handleFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('clientName').value.trim();
  const phone = document.getElementById('clientPhone').value.trim();
  const source = document.getElementById('formSource') ? document.getElementById('formSource').value : 'Website';

  // Build clean WhatsApp message
  const message = `Hello Doctor Comb!%0A%0AI would like to book a Free VIP Consultation.%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Clinic Location:* Lajpat Nagar II, Central Market, New Delhi%0A*Interested In:* ${encodeURIComponent(source)}%0A%0APlease confirm my appointment time.`;

  // Open WhatsApp in new tab
  const waUrl = `https://wa.me/919811234567?text=${message}`;
  window.open(waUrl, '_blank');

  closeConsultationModal();
}

window.handleFormSubmit = handleFormSubmit;

/* --------------------------------------------------------------------------
   6. Write a Review Modal & Star Rating System
   -------------------------------------------------------------------------- */
function openReviewModal() {
  const modal = document.getElementById('reviewModal');
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    const formContainer = document.getElementById('reviewFormContainer');
    const successState = document.getElementById('reviewSuccessState');
    if (formContainer && successState) {
      formContainer.style.display = 'block';
      successState.style.display = 'none';
    }
  }
}

function closeReviewModal() {
  const modal = document.getElementById('reviewModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

window.openReviewModal = openReviewModal;
window.closeReviewModal = closeReviewModal;

function initReviewModal() {
  const modal = document.getElementById('reviewModal');
  if (!modal) return;

  // Click outside to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeReviewModal();
    }
  });

  // ESC key to close
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeReviewModal();
    }
  });

  // Interactive Star Selector
  const starBtns = document.querySelectorAll('#starRatingGroup .star-btn');
  const ratingInput = document.getElementById('reviewRatingInput');
  const scoreText = document.getElementById('ratingScoreText');
  const scoreLabels = {
    1: '1.0 / 5.0 (Needs Improvement)',
    2: '2.0 / 5.0 (Fair)',
    3: '3.0 / 5.0 (Good)',
    4: '4.0 / 5.0 (Very Good)',
    5: '5.0 / 5.0 (Excellent)'
  };

  starBtns.forEach((star) => {
    star.addEventListener('click', (e) => {
      e.preventDefault();
      const rating = parseInt(star.getAttribute('data-rating'), 10) || 5;
      if (ratingInput) ratingInput.value = rating;
      if (scoreText) scoreText.textContent = scoreLabels[rating] || `${rating}.0 / 5.0`;

      starBtns.forEach((s) => {
        const sRating = parseInt(s.getAttribute('data-rating'), 10) || 0;
        if (sRating <= rating) {
          s.classList.add('active');
        } else {
          s.classList.remove('active');
        }
      });
    });
  });
}

function handleReviewSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('reviewName').value.trim();
  const location = document.getElementById('reviewLocation').value.trim();
  const product = document.getElementById('reviewProduct').value;
  const comment = document.getElementById('reviewComment').value.trim();
  const rating = parseInt(document.getElementById('reviewRatingInput').value, 10) || 5;

  const starsStr = '★'.repeat(rating) + '☆'.repeat(5 - rating);
  const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'VK';

  // Prepend dynamically to reviews slider track
  const track = document.getElementById('reviewsSliderTrack');
  if (track) {
    const newCard = document.createElement('div');
    newCard.className = 'review-card';
    newCard.innerHTML = `
      <div class="review-stars" style="color: #E1AA72;">${starsStr}</div>
      <p class="review-quote">"${escapeHtml(comment)}"</p>
      <div class="review-author">
        <div class="author-avatar">${escapeHtml(initials)}</div>
        <div>
          <div class="author-name">${escapeHtml(name)}</div>
          <div class="author-city">${escapeHtml(location)} • ${escapeHtml(product)}</div>
        </div>
      </div>
    `;
    track.prepend(newCard);
  }

  // Show success message inside modal
  const formContainer = document.getElementById('reviewFormContainer');
  const successState = document.getElementById('reviewSuccessState');
  if (formContainer && successState) {
    formContainer.style.display = 'none';
    successState.style.display = 'block';
  }

  // Reset input form
  const form = document.getElementById('reviewForm');
  if (form) form.reset();
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

window.handleReviewSubmit = handleReviewSubmit;

/* --------------------------------------------------------------------------
   7. Smooth Scrolling & Active State
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.style.background = 'rgba(11, 12, 14, 0.98)';
      nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
    } else {
      nav.style.background = 'rgba(11, 12, 14, 0.92)';
      nav.style.boxShadow = 'none';
    }
  });
}

/* --------------------------------------------------------------------------
   8. Sanity.io Headless CMS Client & Blog Engine (Project: x7c5k7yy)
   -------------------------------------------------------------------------- */
const SANITY_CONFIG = {
  projectId: 'x7c5k7yy',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: true,
};

// Built-in Default Articles (Fallback & Instant Display)
let BLOG_ARTICLES = {
  'hair-bonding-vs-hair-taping': {
    slug: 'hair-bonding-vs-hair-taping',
    title: 'Hair Bonding vs Hair Taping',
    category: 'HAIR SOLUTIONS',
    date: 'Oct 2026',
    readTime: '5 min read',
    img: 'assets/images/blog_card_1.jpg',
    author: 'Amit Kapoor',
    authorRole: 'Master Stylist & Patch Specialist • Delhi NCR',
    authorAvatar: 'AK',
    excerpt: 'Understand the key differences, benefits and which option may be better for you.',
    takeaway: 'Hair bonding uses medical liquid adhesives for 4-6 weeks of uninterrupted security, whereas hair taping uses gentle hypoallergenic double-sided strips lasting 2-4 weeks, ideal for simple at-home removal and sensitive scalps.',
    content: `
      <h2>The Core Difference: Liquid Bond vs Adhesive Tape</h2>
      <p>When selecting a non-surgical hair replacement system, attachment method is everything. Both bonding and taping provide an undetectable, secure hold, but they cater to very different daily routines and scalp types.</p>
      
      <h2>1. Hair Bonding (Medical Liquid Acrylics & Silicones)</h2>
      <p>In hair bonding, a medical-grade liquid adhesive (such as Ghost Bond or Ultra Hold) is applied evenly along the shaved perimeter or scalp area. Once cured transparent, the lace or poly base is locked down firmly.</p>
      <ul>
        <li><strong>Lifespan of Hold:</strong> 4 to 6 weeks before requiring service.</li>
        <li><strong>Best For:</strong> High-energy active individuals, gym-goers, swimmers, and heavy sweaters in Delhi's summer heat.</li>
        <li><strong>Feel:</strong> Feels like a permanent part of your scalp with zero perimeter movement.</li>
      </ul>

      <h2>2. Hair Taping (Medical Double-Sided Strips)</h2>
      <p>Taping uses pre-cut contoured hypoallergenic tape rolls (such as Walker No-Shine or Supertape) placed around the perimeter base borders.</p>
      <ul>
        <li><strong>Lifespan of Hold:</strong> 2 to 4 weeks.</li>
        <li><strong>Best For:</strong> First-time wearers, clients with sensitive scalps, and individuals who want the option of easy home maintenance.</li>
        <li><strong>Ease of Removal:</strong> Releases in under 2 minutes with medical citrus solvent without sticky residue.</li>
      </ul>

      <h2>Which One Should You Choose?</h2>
      <p>If you prefer visiting our salon once a month for a full luxury wash and re-fitting, <strong>Hair Bonding</strong> is your gold standard. If you want maximum breathability and lower maintenance overhead, <strong>Hair Taping</strong> is unbeatable.</p>
    `
  },
  'how-to-care-for-your-hair-system': {
    slug: 'how-to-care-for-your-hair-system',
    title: 'How to Care for Your Hair System',
    category: 'CARE TIPS',
    date: 'Oct 2026',
    readTime: '4 min read',
    img: 'assets/images/blog_card_2.jpg',
    author: 'Dr. Meera Sharma',
    authorRole: 'Chief Hair Specialist • Doctor Comb Lajpat Nagar',
    authorAvatar: 'Dr',
    excerpt: 'Simple daily and weekly care tips to keep your hair system clean, natural and long lasting.',
    takeaway: 'With cool or lukewarm water, sulfate-free moisturizing cleansers, and downward gliding motions, your hair system will retain its softness, shine, and knot strength for 10 to 14 months.',
    content: `
      <h2>The Golden Rules of Hair System Longevity</h2>
      <p>Unlike natural hair attached to sebaceous glands, hair replacement systems do not receive natural scalp sebum. This means you must nourish the 100% human hair cuticles externally with the right products and techniques.</p>

      <h2>1. The Correct Washing Technique</h2>
      <ul>
        <li><strong>Always Use Lukewarm or Cool Water:</strong> Hot water can soften the acrylic bonding polymer and loosen delicate lace hand-tied knots.</li>
        <li><strong>Never Scrub in Circles:</strong> Apply sulfate-free shampoo to wet palms and gently smooth downward from crown to ends. Circular rubbing causes tangling.</li>
        <li><strong>Deep Condition the Mid-Lengths:</strong> Keep heavy conditioner 0.5 inches away from the base mesh to prevent loosening the knot adhesives.</li>
      </ul>

      <h2>2. Daily Detangling & Brushing</h2>
      <p>Always use a wide-tooth comb or loop brush specifically engineered for hair systems. Start combing gently from the tips and work your way up toward the roots while supporting the hair base with your free hand.</p>

      <h2>3. Night Care & Silk Pillowcases</h2>
      <p>Cotton pillowcases create friction that can cause static and split ends. Switching to a mulberry silk or satin pillowcase preserves cuticle moisture and keeps the hairline intact through the night.</p>
    `
  },
  'choosing-the-right-hair-replacement-method': {
    slug: 'choosing-the-right-hair-replacement-method',
    title: 'Choosing the Right Hair Replacement Method',
    category: 'GUIDES',
    date: 'Sep 2026',
    readTime: '6 min read',
    img: 'assets/images/blog_card_3.jpg',
    author: 'Amit Kapoor',
    authorRole: 'Master Stylist & Patch Specialist • Delhi NCR',
    authorAvatar: 'AK',
    excerpt: 'A practical guide to help you choose the best method based on your lifestyle and needs.',
    takeaway: 'Choose Hair Clipping if you want night-time removal, Hair Bonding for 100% security during sports and swimming, Hair Taping for sensitive scalps, and Hair Weaving for zero chemicals on your head.',
    content: `
      <h2>Finding Your Perfect Match</h2>
      <p>No two hair loss patterns or lifestyles are identical. Whether you are a corporate executive in Gurgaon, a fitness trainer in South Delhi, or an active college student, here is the clear roadmap to picking your fixing method.</p>

      <h2>Comparison of the 4 Main Fixing Methods</h2>
      <ul>
        <li><strong>Hair Bonding:</strong> Best for full-time active wearers. Zero movement, completely waterproof, lasts 4-6 weeks between services.</li>
        <li><strong>Hair Clipping:</strong> Best for clients who don't want to shave their bald spot or want to remove their system before sleeping. Uses silicone-padded micro-clips that snap onto existing hair.</li>
        <li><strong>Hair Taping:</strong> Best for clients wanting DIY maintenance at home. Strong hold for 2-3 weeks, hypoallergenic, and clean peeling.</li>
        <li><strong>Hair Weaving:</strong> Completely chemical-free and tape-free. The system base is woven directly into a micro-braid track of your existing perimeter hair.</li>
      </ul>

      <h2>Consultation is Crucial</h2>
      <p>During your free private consultation at our Lajpat Nagar clinic, we evaluate your scalp oiliness, workout frequency, and natural hair density to recommend the ideal combination of base and fixing method.</p>
    `
  },
  'how-often-does-a-hair-patch-need-maintenance': {
    slug: 'how-often-does-a-hair-patch-need-maintenance',
    title: 'How Often Does a Hair Patch Need Maintenance?',
    category: 'CARE TIPS',
    date: 'Sep 2026',
    readTime: '4 min read',
    img: 'assets/images/blog_card_4.jpg',
    author: 'Dr. Meera Sharma',
    authorRole: 'Chief Hair Specialist • Doctor Comb Lajpat Nagar',
    authorAvatar: 'Dr',
    excerpt: 'Find out how often you should service your hair system and what it involves.',
    takeaway: 'Hair systems require servicing every 3 to 4 weeks. In a 45-minute clinic session, the base is sanitized and refreshed, your biological hair underneath is trimmed, and new medical bonding is applied.',
    content: `
      <h2>Why Regular Servicing Matters</h2>
      <p>Even though hair systems do not grow, your biological hair underneath continues its natural growth cycle of roughly half an inch per month. Over 3 to 4 weeks, this natural growth, combined with sweat and daily washes, gently loosens perimeter adhesives.</p>

      <h2>What Happens During a 45-Minute Maintenance Session?</h2>
      <ul>
        <li><strong>Gentle System Detachment:</strong> Safe release sprays dissolve the perimeter bond painlessly without pulling a single strand of hair.</li>
        <li><strong>Scalp Cleansing & Exfoliation:</strong> Your scalp is thoroughly shampooed, exfoliated, and massaged with botanical tonics to prevent dandruff and itchiness.</li>
        <li><strong>Natural Hair Grooming:</strong> Your side and back biological hair is neatly trimmed and blended to match your desired fade or sideburn length.</li>
        <li><strong>Base Deep Sanitization:</strong> The base mesh is deep-cleansed, adhesive residue is removed, and hair strands receive a keratin conditioning treatment.</li>
        <li><strong>Fresh Re-Attachment & Styling:</strong> New medical adhesive or tapes are applied, precision-aligned to your natural front hairline, and styled to perfection.</li>
      </ul>
    `
  },
  'can-you-remove-a-hair-system': {
    slug: 'can-you-remove-a-hair-system',
    title: 'Can You Remove a Hair System?',
    category: 'HAIR SOLUTIONS',
    date: 'Aug 2026',
    readTime: '5 min read',
    img: 'assets/images/blog_card_5.jpg',
    author: 'Rohan Sethi',
    authorRole: 'Client Consultant • Doctor Comb',
    authorAvatar: 'RS',
    excerpt: 'Yes, a hair system can be removed. Here\'s how the process works and what to keep in mind.',
    takeaway: 'Yes! A hair system can be safely removed anytime in under 60 seconds with medical adhesive release solvents. It causes zero scalp pain and zero damage to existing hair follicles.',
    content: `
      <h2>Zero Commitment, 100% Reversibility</h2>
      <p>One of the greatest advantages of non-surgical hair replacement over surgical hair transplants is complete reversibility. If you ever want to change your style, remove it for a few days, or take a break, you can do so instantly with zero scarring.</p>

      <h2>The Safe Removal Process</h2>
      <ul>
        <li><strong>Step 1 - Apply Release Solvent:</strong> Spray medical citrus solvent (like C-22 or Pure solvent) along the perimeter hairline and let it penetrate for 60 seconds.</li>
        <li><strong>Step 2 - Lift Gently From Back to Front:</strong> Using fingertip pads (never fingernails), gently roll back the base from the crown forward. The adhesive will release smoothly like tape off glass.</li>
        <li><strong>Step 3 - Cleanse Residue:</strong> Wipe any residual adhesive from the scalp with a soft cotton pad and wash with balancing clarifying shampoo.</li>
      </ul>

      <h2>What NOT to Do</h2>
      <p>Never yank or pull a system off without applying release solvent, as dry pulling can stretch poly skin bases or rip delicate Swiss lace meshes.</p>
    `
  },
  'what-to-ask-before-getting-a-hair-patch': {
    slug: 'what-to-ask-before-getting-a-hair-patch',
    title: 'What to Ask Before Getting a Hair Patch',
    category: 'GUIDES',
    date: 'Aug 2026',
    readTime: '6 min read',
    img: 'assets/images/blog_card_6.jpg',
    author: 'Dr. Meera Sharma',
    authorRole: 'Chief Hair Specialist • Doctor Comb Lajpat Nagar',
    authorAvatar: 'Dr',
    excerpt: 'The most important questions to ask so you can make an informed and confident decision.',
    takeaway: 'Before investing in a hair system, ask 5 essential questions: Is the hair 100% Remy Human Hair? What is the base breathability? Are consultations private? What are the recurring service charges? And is there a trial guarantee?',
    content: `
      <h2>Be an Informed Buyer in Delhi NCR</h2>
      <p>With hundreds of roadside salons advertising hair patches at unrealistic prices, asking the right technical questions protects you from synthetic fiber traps and poor hairline knotting.</p>

      <h2>The 5 Vital Questions to Ask Any Clinic</h2>
      <ul>
        <li><strong>1. Is the hair 100% Remy Virgin Human Hair?</strong> Cheap salons often blend 30-50% synthetic fiber that turns brittle and shiny after two washes. Always demand 100% human cuticle-aligned Remy hair.</li>
        <li><strong>2. Which Base Material Suits Indian Climates?</strong> In Delhi's 45°C summers, French Lace or Silk Base provides vital scalp ventilation, whereas standard thick poly bases can trap perspiration.</li>
        <li><strong>3. Does the Front Hairline Feature Bleached Knots?</strong> Bleached single-knot front hairlines mimic hairs growing directly out of your scalp pores under bright sunlight and HD cameras.</li>
        <li><strong>4. Do You Provide 100% Private Cabins?</strong> Privacy is paramount. Ensure your measurements, fitting, and haircut occur in a dedicated, soundproof private room.</li>
        <li><strong>5. What Are the Exact Monthly Service Costs?</strong> Clarify maintenance fees upfront. At Doctor Comb, routine 4-week servicing is transparent with zero hidden costs.</li>
      </ul>
    `
  },
  // Previous SEO guides preserved for direct links
  'hair-patch-delhi-guide': {
    slug: 'hair-patch-delhi-guide',
    title: 'Non-Surgical Hair Patch in Delhi: Complete 2026 Price, Types & Clinic Guide',
    category: 'GUIDES',
    date: 'Oct 2026',
    readTime: '5 min read',
    img: 'assets/images/blog_consultation.jpg',
    author: 'Dr. Meera Sharma',
    authorRole: 'Chief Hair Specialist • Doctor Comb Lajpat Nagar',
    authorAvatar: 'Dr',
    excerpt: 'Looking for a natural hair patch in Delhi NCR? Learn about French lace, monofilament, and ultra-thin skin systems, what prices to expect, and how to avoid fake synthetic hair.',
    takeaway: 'Non-surgical hair systems give you instant, full-density natural hair in just 45 minutes without surgery, scars, or downtime. In Delhi NCR, prices range from ₹12,000 to ₹35,000 depending on base type and 100% human hair quality.',
    content: `<h2>Why Hair Patching is Booming in Delhi NCR</h2><p>Over the last 5 years, non-surgical hair replacement has surpassed traditional surgical transplants in popularity across Delhi, Gurgaon, and Noida.</p>`
  },
  'daily-styling-care': {
    slug: 'daily-styling-care',
    title: 'Daily Styling & Washing Your Hair System: Pro Tips for Indian Climate',
    category: 'CARE TIPS',
    date: 'Sep 2026',
    readTime: '4 min read',
    img: 'assets/images/blog_styling_care.jpg',
    author: 'Amit Kapoor',
    authorRole: 'Master Stylist & Patch Specialist • Delhi NCR',
    authorAvatar: 'AK',
    excerpt: 'How to manage humidity, sweat, pollution, and helmet wear in Delhi NCR. Discover the right sulfate-free shampoos, leave-in serums, and brushing techniques.',
    takeaway: 'With a proper sulfate-free shampoo routine, daily leave-in hydration, and wide-tooth combing, your hair system will remain soft, shiny, and tangle-free for 8 to 14 months.',
    content: `<h2>The 3 Golden Rules for Washing in Delhi Weather</h2><p>Delhi's hard water and dust can strip moisture from human hair systems if you don't follow the right technique.</p>`
  },
  'gym-swim-lifestyle': {
    slug: 'gym-swim-lifestyle',
    title: 'Can You Gym, Swim & Ride Bikes with a Hair Patch? The Honest Truth',
    category: 'CARE TIPS',
    date: 'Sep 2026',
    readTime: '6 min read',
    img: 'assets/images/blog_lifestyle.jpg',
    author: 'Rohan Sethi',
    authorRole: 'Fitness Coach & Doctor Comb Client',
    authorAvatar: 'RS',
    excerpt: 'Worried about intense workouts or swimming pools? We break down medical-grade water-resistant bonding tapes, scalp breathability, and helmet safety.',
    takeaway: 'Yes! Medical-grade waterproof bonding tapes withstand heavy sweat, swimming pool chlorine, and tight helmet friction without any risk of lifting.',
    content: `<h2>Sweat, Humidity & Intensive Workouts</h2><p>Modern breathable lace bases let scalp perspiration evaporate naturally while the medical acrylic bond remains locked in place.</p>`
  },
  'patch-vs-transplant': {
    slug: 'patch-vs-transplant',
    title: 'Hair Patch vs Hair Transplant in India: Which Delivers Instant Natural Volume?',
    category: 'HAIR SOLUTIONS',
    date: 'Aug 2026',
    readTime: '7 min read',
    img: 'assets/images/blog_hero.jpg',
    author: 'Dr. Meera Sharma',
    authorRole: 'Chief Hair Specialist • Doctor Comb Lajpat Nagar',
    authorAvatar: 'Dr',
    excerpt: 'Comparing surgical risks, donor area limitations, painful healing times, total costs, and final hair density between non-surgical human hair patching and FUE surgery.',
    takeaway: 'Hair transplants require painful surgery, a healthy donor area, and 9-12 months of waiting with unpredictable density. A hair patch delivers guaranteed, high-density natural volume in 45 minutes.',
    content: `<h2>The Surgical Reality of Hair Transplants (FUE/FUT)</h2><p>While hair transplants are a permanent surgical option for minor receding hairlines, they have severe limitations for advanced baldness.</p>`
  },
  'undetectable-hairline': {
    slug: 'undetectable-hairline',
    title: 'How to Make Your Hair System 100% Undetectable Under Sunlight & HD Cameras',
    category: 'CARE TIPS',
    date: 'Jul 2026',
    readTime: '4 min read',
    img: 'assets/images/what_is_hair_patching.jpg',
    author: 'Dr. Meera Sharma',
    authorRole: 'Chief Hair Specialist • Doctor Comb Lajpat Nagar',
    authorAvatar: 'Dr',
    excerpt: 'Graduated front hairline density, bleached knots, custom texture blending, and matte adhesives: the 4 golden rules our master stylists use for wedding and television clients.',
    takeaway: 'Achieving an undetectable hairline relies on graduated density at the front rim, bleached micro-knots, and exact hair color undertone matching by an experienced stylist.',
    content: `
      <h2>The 4 Secrets of an Undetectable Hairline</h2>
      <p>At Doctor Comb, we have fitted systems for actors, models, and wedding grooms who are filmed in 4K cameras. Here is how we guarantee an invisible result:</p>
      <ul>
        <li><strong>Graduated Front Density:</strong> Natural hairlines do not start with a solid wall of thick hair. We hand-knot lighter density at the front edge that gradually builds into full density.</li>
        <li><strong>Bleached Knots:</strong> The tiny black knots holding the hair to the lace are chemically lightened so they disappear completely against your scalp.</li>
        <li><strong>Precise Texture & Wave Blending:</strong> We match the exact curl percentage (straight, 28mm body wave, or light wave) of your side and back hair.</li>
      </ul>
    `
  }
};

/**
 * Fetch Live Articles from Sanity CMS
 */
async function loadSanityBlogs() {
  const query = encodeURIComponent(`*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    "img": mainImage.asset->url,
    "category": coalesce(categories[0]->title, "Guide"),
    "date": publishedAt,
    excerpt,
    takeaway,
    "author": coalesce(author->name, "Dr. Meera Sharma"),
    "authorRole": coalesce(author->role, "Hair Specialist"),
    body
  }`);

  const url = `https://${SANITY_CONFIG.projectId}.api.sanity.io/v${SANITY_CONFIG.apiVersion}/data/query/${SANITY_CONFIG.dataset}?query=${query}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data && data.result && data.result.length > 0) {
      console.log(`[Sanity CMS] Loaded ${data.result.length} live articles from project ${SANITY_CONFIG.projectId}`);
      
      // Transform and merge Sanity posts into BLOG_ARTICLES
      data.result.forEach(post => {
        const slug = post.slug || post._id;
        const formattedDate = post.date ? new Date(post.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Recent';
        
        BLOG_ARTICLES[slug] = {
          slug: slug,
          title: post.title,
          category: post.category || 'Guide',
          date: formattedDate,
          readTime: '5 min read',
          img: post.img || 'assets/images/blog_hero.jpg',
          author: post.author || 'Dr. Meera Sharma',
          authorRole: post.authorRole || 'Hair Specialist',
          authorAvatar: (post.author || 'Dr').slice(0, 2),
          excerpt: post.excerpt || (post.title + ' - Read the full guide.'),
          takeaway: post.takeaway || 'Instant, natural non-surgical hair restoration at Doctor Comb.',
          content: portableTextToHtml(post.body)
        };
      });

      // Refresh UI with live Sanity data
      renderDynamicBlogCards();
      renderHomepageBlogCards();
      initSingleBlogPostPage();
    }
  } catch (err) {
    console.warn('[Sanity CMS] Fetch skipped (offline/CORS/no posts yet). Showing default curated articles.', err);
  }
}

/**
 * Converts Sanity's Portable Text block array to clean HTML
 */
function portableTextToHtml(blocks) {
  if (!blocks || !Array.isArray(blocks)) return '<p>Full story coming soon.</p>';
  return blocks.map(block => {
    if (block._type === 'block') {
      const text = (block.children || []).map(child => {
        let content = child.text || '';
        if (child.marks && child.marks.includes('strong')) content = `<strong>${content}</strong>`;
        if (child.marks && child.marks.includes('em')) content = `<em>${content}</em>`;
        return content;
      }).join('');

      if (block.style === 'h2') return `<h2>${text}</h2>`;
      if (block.style === 'h3') return `<h3>${text}</h3>`;
      if (block.style === 'blockquote') return `<blockquote>${text}</blockquote>`;
      if (block.listItem === 'bullet') return `<li>${text}</li>`;
      return `<p>${text}</p>`;
    }
    return '';
  }).join('');
}

/**
 * Re-render blog grid on blogs.html or index.html if live Sanity articles arrive
 */
function renderDynamicBlogCards() {
  const container = document.getElementById('blogGridContainer');
  if (!container) return;

  // Preserve pre-rendered curated cards on blogs.html unless container is explicitly marked dynamic
  if (container.children.length > 0 && !container.hasAttribute('data-dynamic')) {
    initBlogSystem();
    return;
  }

  const articleKeys = Object.keys(BLOG_ARTICLES);
  container.innerHTML = articleKeys.map(key => {
    const item = BLOG_ARTICLES[key];
    const rawCat = (item.category || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    let normCat = 'guides';
    if (rawCat.includes('solut') || rawCat.includes('bond') || rawCat.includes('patch')) normCat = 'hair-solutions';
    else if (rawCat.includes('care') || rawCat.includes('style') || rawCat.includes('mainten')) normCat = 'care-tips';
    else normCat = 'guides';

    return `
      <a href="${item.slug}.html" class="editorial-blog-card" data-category="${normCat}">
        <div class="editorial-card-media">
          <img src="${item.img}" alt="${item.title}" class="editorial-card-img" loading="lazy">
        </div>
        <div class="editorial-card-body">
          <span class="editorial-card-tag">${item.category}</span>
          <h2 class="editorial-card-title">${item.title}</h2>
          <p class="editorial-card-excerpt">${item.excerpt}</p>
          <span class="editorial-card-link">READ MORE →</span>
        </div>
      </a>
    `;
  }).join('');

  // Re-bind filters
  initBlogSystem();
}

/**
 * Render top 3 latest articles on homepage (index.html)
 */
function renderHomepageBlogCards() {
  const container = document.getElementById('homeBlogGrid');
  if (!container) return;

  const articleKeys = Object.keys(BLOG_ARTICLES).slice(0, 3);
  if (!articleKeys.length) return;

  container.innerHTML = articleKeys.map(key => {
    const item = BLOG_ARTICLES[key];
    const linkHref = `${item.slug}.html`;
    return `
      <a href="${linkHref}" class="blog-card">
        <div class="blog-card-media">
          <img src="${item.img || 'assets/images/blog_hero.jpg'}" alt="${item.title}" class="blog-card-img" loading="lazy">
          <span class="blog-badge-tag">${item.category || 'Guide'}</span>
        </div>
        <div class="blog-card-body">
          <div class="blog-meta-date">${item.date || 'Recent'} • ${item.readTime || '5 min read'}</div>
          <h3 class="blog-card-title">${item.title}</h3>
          <p class="blog-card-excerpt">${item.excerpt || ''}</p>
          <div class="blog-card-footer">
            <span style="font-size: 0.84rem; color: #7A6652;">${item.author || 'Dr. Meera Sharma'}</span>
            <span class="blog-read-btn">Read Article →</span>
          </div>
        </div>
      </a>
    `;
  }).join('');
}


function initBlogSystem() {
  const filterPills = document.querySelectorAll('#categoryFilterPills .blog-tab-btn, #categoryFilterPills .category-pill');
  if (!filterPills.length) return;

  filterPills.forEach(pill => {
    // Avoid double-binding listeners
    if (pill._filterBound) return;
    pill._filterBound = true;

    pill.addEventListener('click', (e) => {
      e.preventDefault();
      filterPills.forEach(p => {
        p.classList.remove('active');
        p.setAttribute('aria-selected', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-selected', 'true');

      const selectedCat = pill.getAttribute('data-category');
      applyBlogFilters(selectedCat);
    });
  });

  const searchInput = document.getElementById('blogSearchInput');
  if (searchInput && !searchInput._searchBound) {
    searchInput._searchBound = true;
    searchInput.addEventListener('input', (e) => {
      const activePill = document.querySelector('#categoryFilterPills .active');
      const activeCat = activePill ? activePill.getAttribute('data-category') : 'all';
      applyBlogFilters(activeCat, e.target.value);
    });
  }

  function applyBlogFilters(category, searchQuery) {
    const cards = document.querySelectorAll('#blogGridContainer .editorial-blog-card, #blogGridContainer .blog-card');
    const query = searchQuery ? searchQuery.trim().toLowerCase() : (searchInput ? searchInput.value.trim().toLowerCase() : '');
    const normSelected = (category || 'all').toLowerCase().replace(/[^a-z0-9]/g, '');

    cards.forEach(card => {
      const cardCat = card.getAttribute('data-category') || '';
      const normCardCat = cardCat.toLowerCase().replace(/[^a-z0-9]/g, '');
      const title = (card.querySelector('.editorial-card-title, .blog-card-title')?.textContent || '').toLowerCase();
      const excerpt = (card.querySelector('.editorial-card-excerpt, .blog-card-excerpt')?.textContent || '').toLowerCase();

      let matchesCat = (normSelected === 'all');
      if (!matchesCat) {
        if (normSelected.includes('solut')) {
          matchesCat = normCardCat.includes('solut');
        } else if (normSelected.includes('care')) {
          matchesCat = normCardCat.includes('care');
        } else if (normSelected.includes('guide')) {
          matchesCat = normCardCat.includes('guide');
        } else {
          matchesCat = (normCardCat === normSelected);
        }
      }

      const matchesSearch = !query || title.includes(query) || excerpt.includes(query);

      if (matchesCat && matchesSearch) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeBlogModal();
    }
  });
}

/* --------------------------------------------------------------------------
   9. Single Blog Post Inner Page Renderer (blog-post.html?slug=...)
   -------------------------------------------------------------------------- */
function initSingleBlogPostPage() {
  const mainTitleEl = document.getElementById('postMainTitle');
  if (!mainTitleEl) return; // Not on the inner post page

  const params = new URLSearchParams(window.location.search);
  let requestedSlug = params.get('slug');
  
  if (!requestedSlug) {
    const pathSlug = window.location.pathname
      .split('/')
      .pop()
      .replace(/\.html$/, '')
      .trim();
    if (pathSlug && !['blog-post', 'blogs', 'index', ''].includes(pathSlug)) {
      requestedSlug = pathSlug;
    }
  }

  if (!requestedSlug) requestedSlug = 'hair-patch-delhi-guide';

  const article = BLOG_ARTICLES[requestedSlug] || BLOG_ARTICLES['hair-patch-delhi-guide'];
  if (!article) return;

  // Update Page Metadata & Headings
  document.title = `${article.title} | Doctor Comb Hair Journal`;
  const metaDesc = document.getElementById('postMetaDesc');
  if (metaDesc) metaDesc.setAttribute('content', article.excerpt);

  const breadcrumbEl = document.getElementById('breadcrumbPostTitle');
  if (breadcrumbEl) breadcrumbEl.textContent = article.title;

  mainTitleEl.textContent = article.title;

  const categoryBadge = document.getElementById('postCategoryBadge');
  if (categoryBadge) categoryBadge.textContent = article.category;

  const dateEl = document.getElementById('postDate');
  if (dateEl) dateEl.textContent = article.date;

  const readTimeEl = document.getElementById('postReadTime');
  if (readTimeEl) readTimeEl.textContent = '• ' + article.readTime;

  // Author details
  const authorName = document.getElementById('authorName');
  if (authorName) authorName.textContent = article.author;

  const authorRole = document.getElementById('authorRole');
  if (authorRole) authorRole.textContent = article.authorRole;

  const authorAvatar = document.getElementById('authorAvatar');
  if (authorAvatar) authorAvatar.textContent = article.authorAvatar;

  const bioAvatar = document.getElementById('bioAvatar');
  if (bioAvatar) bioAvatar.textContent = article.authorAvatar;

  const bioName = document.getElementById('bioName');
  if (bioName) bioName.textContent = article.author;

  // Hero Image
  const featuredImg = document.getElementById('postFeaturedImg');
  if (featuredImg) {
    featuredImg.src = article.img;
    featuredImg.alt = article.title;
    // 227px card thumbnails look blurry stretched to hero size; hide until a real hero exists.
    if (/blog_card_/.test(article.img)) featuredImg.closest('.blog-featured-media')?.remove();
  }

  // Key Takeaway & Prose Body
  const takeawayText = document.getElementById('postTakeawayText');
  if (takeawayText) takeawayText.textContent = article.takeaway;

  const proseBody = document.getElementById('postBodyProse');
  if (proseBody) proseBody.innerHTML = article.content;

  // Populate Sidebar Popular Posts
  const sidebarList = document.getElementById('popularPostsSidebar');
  if (sidebarList) {
    const otherArticles = Object.keys(BLOG_ARTICLES)
      .filter(key => key !== requestedSlug)
      .slice(0, 4);

    sidebarList.innerHTML = otherArticles.map(key => {
      const item = BLOG_ARTICLES[key];
      return `
        <a href="blog-post.html?slug=${item.slug}" class="popular-post-item">
          <img src="${item.img}" alt="${item.title}" class="popular-post-thumb" loading="lazy">
          <div>
            <div class="popular-post-title">${item.title}</div>
            <div class="popular-post-date">${item.date} • ${item.readTime}</div>
          </div>
        </a>
      `;
    }).join('');
  }

  // Populate Related Articles Grid
  const relatedGrid = document.getElementById('relatedPostsGrid');
  if (relatedGrid) {
    const relatedKeys = Object.keys(BLOG_ARTICLES)
      .filter(key => key !== requestedSlug)
      .slice(0, 3);

    relatedGrid.innerHTML = relatedKeys.map(key => {
      const item = BLOG_ARTICLES[key];
      return `
        <a href="blog-post.html?slug=${item.slug}" class="blog-card">
          <div class="blog-card-media">
            <img src="${item.img}" alt="${item.title}" class="blog-card-img" loading="lazy">
            <span class="blog-badge-tag">${item.category}</span>
          </div>
          <div class="blog-card-body">
            <div class="blog-meta-date">${item.date} • ${item.readTime}</div>
            <h3 class="blog-card-title">${item.title}</h3>
            <p class="blog-card-excerpt">${item.excerpt}</p>
            <div class="blog-card-footer">
              <span style="font-size: 0.84rem; color: #7A6652;">${item.author}</span>
              <span class="blog-read-btn">Read Article →</span>
            </div>
          </div>
        </a>
      `;
    }).join('');
  }
}

function handleSharePost(type) {
  const currentUrl = window.location.href;
  const currentTitle = document.title;

  if (type === 'whatsapp') {
    const text = encodeURIComponent(`Read this helpful guide on hair replacement: "${currentTitle}" - ${currentUrl}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  } else if (type === 'copy') {
    navigator.clipboard.writeText(currentUrl).then(() => {
      const copyTextSpan = document.getElementById('copyLinkText');
      if (copyTextSpan) {
        copyTextSpan.textContent = 'Link Copied! ✓';
        setTimeout(() => {
          copyTextSpan.textContent = 'Copy Link';
        }, 2500);
      }
    }).catch(() => {
      prompt('Copy this link:', currentUrl);
    });
  }
}

function openBlogArticle(key) {
  // Direct navigation to the dedicated inner page
  window.location.href = `blog-post.html?slug=${encodeURIComponent(key)}`;
}

function closeBlogModal() {
  const modal = document.getElementById('blogReaderModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

window.openBlogArticle = openBlogArticle;
window.closeBlogModal = closeBlogModal;
window.handleSharePost = handleSharePost;

/* --------------------------------------------------------------------------
   Instagram Reels Showcase Logic
   -------------------------------------------------------------------------- */
function initInstagramSection() {
  const section = document.getElementById('instagram');
  if (!section) return;

  const reelImg = document.getElementById('instaReelImg');
  const reelCaption = document.getElementById('reelCaption');
  const reelAudioName = document.getElementById('reelAudioName');
  const reelAudioDiscImg = document.getElementById('reelAudioDiscImg');
  const reelLikeBtn = document.getElementById('reelLikeBtn');
  const reelLikeCount = document.getElementById('reelLikeCount');
  const reelCommentCount = document.getElementById('reelCommentCount');
  const reelHeartPop = document.getElementById('reelHeartPop');
  const reelProgressFill = document.getElementById('reelProgressFill');
  const selectorPills = document.querySelectorAll('.reel-select-pill');
  const reelMedia = document.getElementById('instaReelMedia');

  const reelsData = [
    {
      img: 'assets/images/insta_reel_main.jpg',
      caption: 'Real hair. Real confidence. 100% natural undetectable hairline in under 60 mins. 💈✨',
      audio: 'Original Audio • Doctor Comb',
      likes: 1842,
      comments: 128
    },
    {
      img: 'assets/images/insta_reel_consult.jpg',
      caption: 'Behind the scenes: Finding the perfect base match for every client with our senior specialist. ✂️🔥',
      audio: 'Original Audio • Behind The Chairs',
      likes: 2410,
      comments: 215
    },
    {
      img: 'assets/images/insta_reel_after.jpg',
      caption: 'Crown covered, look natural. 60-minute non-surgical transformation in Delhi NCR. Walk in bald, walk out confident. 💈',
      audio: 'Original Audio • Transformation Day',
      likes: 3195,
      comments: 342
    }
  ];

  let currentReelIndex = 0;
  let isLiked = false;
  let autoTimer = null;

  function setReel(index) {
    if (index < 0 || index >= reelsData.length) return;
    currentReelIndex = index;
    const data = reelsData[index];

    // Reset like state for new reel
    isLiked = false;
    if (reelLikeBtn) reelLikeBtn.classList.remove('liked');

    // Smooth image transition
    if (reelImg) {
      reelImg.style.opacity = '0.3';
      setTimeout(() => {
        reelImg.src = data.img;
        reelImg.style.opacity = '1';
      }, 180);
    }

    if (reelAudioDiscImg) reelAudioDiscImg.src = data.img;
    if (reelCaption) reelCaption.textContent = data.caption;
    if (reelAudioName) reelAudioName.textContent = data.audio;
    if (reelLikeCount) reelLikeCount.textContent = data.likes.toLocaleString();
    if (reelCommentCount) reelCommentCount.textContent = data.comments.toLocaleString();

    // Reset and replay progress animation
    if (reelProgressFill) {
      reelProgressFill.style.animation = 'none';
      void reelProgressFill.offsetWidth; // trigger reflow
      reelProgressFill.style.animation = 'reelProgressRun 7s linear infinite';
    }

    // Update active pill
    selectorPills.forEach((pill, idx) => {
      const active = idx === index;
      pill.classList.toggle('active', active);
      pill.setAttribute('aria-selected', active ? 'true' : 'false');
    });
  }

  // Handle Selector Pills
  selectorPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const idx = parseInt(pill.getAttribute('data-reel'), 10);
      if (!isNaN(idx)) {
        setReel(idx);
        startAutoRotation();
      }
    });
  });

  // Handle Like Interaction
  function triggerLike() {
    isLiked = !isLiked;
    const baseLikes = reelsData[currentReelIndex].likes;
    const displayLikes = isLiked ? baseLikes + 1 : baseLikes;
    
    if (reelLikeCount) reelLikeCount.textContent = displayLikes.toLocaleString();
    if (reelLikeBtn) reelLikeBtn.classList.toggle('liked', isLiked);

    if (isLiked && reelHeartPop) {
      reelHeartPop.classList.remove('active');
      void reelHeartPop.offsetWidth;
      reelHeartPop.classList.add('active');
      setTimeout(() => {
        reelHeartPop.classList.remove('active');
      }, 700);
    }
  }

  if (reelLikeBtn) {
    reelLikeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      triggerLike();
    });
  }

  // Double tap or click on media to like
  let lastTap = 0;
  if (reelMedia) {
    reelMedia.addEventListener('click', () => {
      const now = Date.now();
      if (now - lastTap < 350) {
        if (!isLiked) triggerLike();
      }
      lastTap = now;
    });
  }

  // Auto rotation
  function startAutoRotation() {
    stopAutoRotation();
    autoTimer = setInterval(() => {
      const nextIdx = (currentReelIndex + 1) % reelsData.length;
      setReel(nextIdx);
    }, 7000);
  }

  function stopAutoRotation() {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  const phoneWrap = document.querySelector('.insta-phone-wrap');
  if (phoneWrap) {
    phoneWrap.addEventListener('mouseenter', stopAutoRotation);
    phoneWrap.addEventListener('mouseleave', startAutoRotation);
  }

  startAutoRotation();
}



