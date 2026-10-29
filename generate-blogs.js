const fs = require('fs');
const path = require('path');
const https = require('https');

const SANITY_CONFIG = {
  projectId: 'x7c5k7yy',
  dataset: 'production',
  apiVersion: '2023-05-03',
  siteUrl: 'https://aura-hair-replacement-umber.vercel.app'
};

// Built-in Curated Articles (High-Value SEO & Fallbacks)
const BASE_ARTICLES = [
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
    slug: 'hair-patch-delhi-guide',
    title: 'Non-Surgical Hair Patch in Delhi: Complete 2026 Price, Types & Clinic Guide',
    category: 'Buying Guide',
    date: 'Oct 2026',
    readTime: '5 min read',
    img: 'assets/images/blog_consultation.jpg',
    author: 'Dr. Meera Sharma',
    authorRole: 'Chief Hair Specialist • Doctor Comb Lajpat Nagar',
    authorAvatar: 'Dr',
    excerpt: 'Looking for a natural hair patch in Delhi NCR? Learn about French lace, monofilament, and ultra-thin skin systems, what prices to expect, and how to avoid fake synthetic hair.',
    takeaway: 'Non-surgical hair systems give you instant, full-density natural hair in just 45 minutes without surgery, scars, or downtime. In Delhi NCR, prices range from ₹12,000 to ₹35,000 depending on base type and 100% human hair quality.',
    content: `
      <h2>Why Hair Patching is Booming in Delhi NCR</h2>
      <p>Over the last 5 years, non-surgical hair replacement (commonly called hair patching or hair systems) has surpassed traditional surgical transplants in popularity across Delhi, Gurgaon, and Noida. The reasons are clear: instant 100% density, zero medical surgery risks, and zero recovery downtime.</p>
    `
  },
  {
    slug: 'daily-styling-care',
    title: 'Daily Styling & Washing Your Hair System: Pro Tips for Indian Climate',
    category: 'Care & Styling',
    date: 'Sep 2026',
    readTime: '4 min read',
    img: 'assets/images/blog_styling_care.jpg',
    author: 'Amit Kapoor',
    authorRole: 'Master Stylist & Patch Specialist • Delhi NCR',
    authorAvatar: 'AK',
    excerpt: 'How to manage humidity, sweat, pollution, and helmet wear in Delhi NCR. Discover the right sulfate-free shampoos, leave-in serums, and brushing techniques to extend system lifespan.',
    takeaway: 'With a proper sulfate-free shampoo routine, daily leave-in hydration, and wide-tooth combing, your hair system will remain soft, shiny, and tangle-free for 8 to 14 months in Indian weather conditions.',
    content: `
      <h2>The 3 Golden Rules for Washing in Delhi Weather</h2>
      <p>Delhi's hard water and dust can strip moisture from human hair systems if you don't follow the right technique.</p>
    `
  },
  {
    slug: 'gym-swim-lifestyle',
    title: 'Can You Gym, Swim & Ride Bikes with a Hair Patch? The Honest Truth',
    category: 'Active Lifestyle',
    date: 'Sep 2026',
    readTime: '6 min read',
    img: 'assets/images/blog_lifestyle.jpg',
    author: 'Rohan Sethi',
    authorRole: 'Fitness Coach & Aura Client',
    authorAvatar: 'RS',
    excerpt: 'Worried about intense workouts or swimming pools? We break down medical-grade water-resistant bonding tapes, scalp breathability, and helmet safety with zero fear of lifting.',
    takeaway: 'Yes! Medical-grade waterproof bonding tapes (like Walker Ultra Hold) withstand heavy sweat, swimming pool chlorine, and tight helmet friction without any risk of lifting or detachment.',
    content: `
      <h2>Sweat, Humidity & Intensive Workouts</h2>
      <p>A common fear among young people is: "What happens when I sweat at the gym or play cricket?" The answer is simple: modern breathable lace bases let scalp perspiration evaporate naturally.</p>
    `
  },
  {
    slug: 'patch-vs-transplant',
    title: 'Hair Patch vs Hair Transplant in India: Which Delivers Instant Natural Volume?',
    category: 'Comparison',
    date: 'Aug 2026',
    readTime: '7 min read',
    img: 'assets/images/blog_hero.jpg',
    author: 'Dr. Meera Sharma',
    authorRole: 'Chief Hair Specialist • Doctor Comb Lajpat Nagar',
    authorAvatar: 'Dr',
    excerpt: 'Comparing surgical risks, donor area limitations, painful healing times, total costs, and final hair density between non-surgical human hair patching and FUE surgery.',
    takeaway: 'Hair transplants require painful surgery, a healthy donor area, and 9-12 months of waiting with unpredictable density. A hair patch delivers guaranteed, high-density natural volume in 45 minutes with zero surgical risks.',
    content: `
      <h2>The Surgical Reality of Hair Transplants (FUE/FUT)</h2>
      <p>While hair transplants are a permanent surgical option for minor receding hairlines, they have severe limitations for advanced baldness.</p>
    `
  },
  {
    slug: 'base-materials-guide',
    title: 'French Lace vs Mirage Skin vs Silk Base: Which Base Suits Indian Skin Tones?',
    category: 'Buying Guide',
    date: 'Aug 2026',
    readTime: '5 min read',
    img: 'assets/images/product_lace.jpg',
    author: 'Amit Kapoor',
    authorRole: 'Master Stylist & Patch Specialist • Delhi NCR',
    authorAvatar: 'AK',
    excerpt: 'Understanding base textures, knotting techniques, perimeter breathability, and which base matches warm Indian undertones for an invisible front hairline under bright lights.',
    takeaway: 'French lace is best for maximum breathability in hot summers; Mirage Skin is best for slicked-back hairlines; Silk Base is best for multi-directional parting and thick crown coverage.',
    content: `
      <h2>Matching Base Materials to Your Daily Routine</h2>
      <p>Selecting the right base depends on your hairline preference, scalp sensitivity, and lifestyle.</p>
    `
  },
  {
    slug: 'undetectable-hairline',
    title: 'How to Make Your Hair System 100% Undetectable Under Sunlight & HD Cameras',
    category: 'Care & Styling',
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
      <p>At Doctor Comb, we have fitted systems for actors, models, and wedding grooms who are filmed in 4K cameras.</p>
    `
  }
];

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

function fetchSanityPosts() {
  return new Promise((resolve) => {
    const query = encodeURIComponent(`*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      "img": mainImage.asset->url,
      "category": coalesce(categories[0]->title, "Buying Guide"),
      "date": publishedAt,
      excerpt,
      takeaway,
      "author": coalesce(author->name, "Dr. Meera Sharma"),
      "authorRole": coalesce(author->role, "Chief Hair Specialist • Doctor Comb"),
      body
    }`);

    const url = `https://${SANITY_CONFIG.projectId}.api.sanity.io/v${SANITY_CONFIG.apiVersion}/data/query/${SANITY_CONFIG.dataset}?query=${query}`;

    https.get(url, (res) => {
      let rawData = '';
      res.on('data', (chunk) => { rawData += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(rawData);
          if (parsed && parsed.result && parsed.result.length > 0) {
            console.log(`✓ Retrieved ${parsed.result.length} live posts from Sanity CMS.`);
            resolve(parsed.result);
          } else {
            console.log('ℹ No custom posts in Sanity yet, using base curated articles.');
            resolve([]);
          }
        } catch (e) {
          console.warn('⚠ Could not parse Sanity API response, using base curated articles.');
          resolve([]);
        }
      });
    }).on('error', (err) => {
      console.warn('⚠ Network error fetching Sanity, using base curated articles:', err.message);
      resolve([]);
    });
  });
}

function renderHtmlTemplate(article, allArticles) {
  const pageTitle = `${article.title} | Doctor Comb Delhi`;
  const metaDesc = article.excerpt ? article.excerpt.replace(/"/g, '&quot;') : 'Expert hair system guide by Doctor Comb Delhi';
  const pageUrl = `${SANITY_CONFIG.siteUrl}/${article.slug}.html`;
  const imgUrl = article.img.startsWith('http') ? article.img : `${SANITY_CONFIG.siteUrl}/${article.img}`;

  // Find related articles (exclude current)
  const relatedArticles = allArticles
    .filter(a => a.slug !== article.slug)
    .slice(0, 3);

  const relatedCardsHtml = relatedArticles.map(rel => `
    <a href="${rel.slug}.html" class="blog-card" data-category="${(rel.category || '').toLowerCase().replace(/[^a-z0-9]/g, '')}">
      <div class="blog-card-media">
        <img src="${rel.img}" alt="${rel.title}" class="blog-card-img" loading="lazy">
        <span class="blog-badge-tag">${rel.category}</span>
      </div>
      <div class="blog-card-body">
        <div class="blog-meta-date">${rel.date} • ${rel.readTime || '5 min read'}</div>
        <h2 class="blog-card-title">${rel.title}</h2>
        <p class="blog-card-excerpt">${rel.excerpt}</p>
        <div class="blog-card-footer">
          <span style="font-size: 0.84rem; color: #7A6652;">${rel.author}</span>
          <span class="blog-read-btn">Read Article →</span>
        </div>
      </div>
    </a>
  `).join('');

  const sidebarPopularHtml = allArticles.slice(0, 4).map(item => `
    <a href="${item.slug}.html" class="popular-post-item">
      <img src="${item.img}" alt="${item.title}" class="popular-post-thumb" loading="lazy">
      <div class="popular-post-info">
        <span class="popular-post-title">${item.title}</span>
        <span class="popular-post-date">${item.date}</span>
      </div>
    </a>
  `).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageTitle}</title>
  <meta name="description" content="${metaDesc}">
  <link rel="canonical" href="${pageUrl}">

  <!-- OpenGraph / Social Meta Tags -->
  <meta property="og:type" content="article">
  <meta property="og:title" content="${pageTitle}">
  <meta property="og:description" content="${metaDesc}">
  <meta property="og:image" content="${imgUrl}">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:site_name" content="Doctor Comb">

  <!-- Twitter Cards -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${pageTitle}">
  <meta name="twitter:description" content="${metaDesc}">
  <meta name="twitter:image" content="${imgUrl}">

  <!-- Structured Data JSON-LD (SEO) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "${article.title.replace(/"/g, '\\"')}",
    "description": "${metaDesc.replace(/"/g, '\\"')}",
    "image": "${imgUrl}",
    "author": {
      "@type": "Person",
      "name": "${article.author}"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Doctor Comb",
      "logo": {
        "@type": "ImageObject",
        "url": "${SANITY_CONFIG.siteUrl}/assets/images/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "${pageUrl}"
    }
  }
  </script>
  
  <!-- High Impact Typography -->
  <!-- Brand Favicons -->
  <link rel="icon" type="image/png" sizes="32x32" href="favicon.png">
  <link rel="icon" type="image/png" sizes="192x192" href="icon-192.png">
  <link rel="apple-touch-icon" href="apple-touch-icon.png">

  <!-- Google Fonts: Manrope & Playfair Display -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,600;1,700&display=swap" rel="stylesheet">
  
  <link rel="stylesheet" href="styles.css?v=s1">
</head>
<body>

  <!-- BIG CRISP NAVBAR -->
  <header class="navbar" id="navbar">
    <div class="container nav-container">
      <a href="index.html" class="nav-logo" aria-label="Doctor Comb">
        <div class="nav-logo-icon">
          <img src="assets/brand/Submark.png" alt="Doctor Comb Submark" class="nav-logo-submark">
        </div>
        <div class="nav-logo-text">
          <span class="nav-logo-title">DOCTOR COMB</span>
        </div>
      </a>

      <nav aria-label="Main Navigation">
        <ul class="nav-links">
          <li><a href="index.html" class="nav-link">Home</a></li>
          <li><a href="services.html" class="nav-link">Services</a></li>
          <li><a href="products.html" class="nav-link">Products</a></li>
          <li><a href="blogs.html" class="nav-link active">Blogs</a></li>
          <li><a href="contact.html" class="nav-link">Contact Us</a></li>
        </ul>
      </nav>

      <div class="nav-actions">
        <a href="tel:+919811234567" class="btn btn-outline btn-md" style="font-weight: 800;">
          <span>📞 +91 98112 34567</span>
        </a>

        <a href="https://wa.me/919811234567?text=Hello%20Doctor%20Comb%2C%20I%20have%20a%20question%20regarding%20hair%20patch%20systems" target="_blank" rel="noopener" class="btn btn-whatsapp btn-md">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.77.814 2.796.814 3.181 0 5.767-2.586 5.768-5.768zm7.398 5.766c0 4.079-3.32 7.399-7.399 7.399-1.24 0-2.433-.314-3.486-.889l-4.544 1.192 1.217-4.444c-.66-1.121-1.026-2.404-1.026-3.738 0-4.079 3.32-7.399 7.399-7.399 4.079 0 7.399 3.32 7.399 7.399z"/></svg>
          <span>WhatsApp</span>
        </a>

        <button class="mobile-menu-btn" id="mobileMenuToggle" aria-label="Toggle Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
        </button>
      </div>
    </div>

    <!-- Mobile Dropdown -->
    <div class="mobile-nav-panel" id="mobileNavPanel">
      <ul>
        <li><a href="index.html" class="mobile-link">Home</a></li>
        <li><a href="services.html" class="mobile-link">Services</a></li>
        <li><a href="products.html" class="mobile-link">Products</a></li>
        <li><a href="blogs.html" class="mobile-link active">Blogs</a></li>
        <li><a href="contact.html" class="mobile-link">Contact Us</a></li>
      </ul>
    </div>
  </header>

  <!-- INNER BLOG ARTICLE CONTAINER -->
  <main class="blog-post-page">
    <div class="container">
      
      <!-- Breadcrumbs -->
      <nav class="blog-breadcrumbs" aria-label="Breadcrumb">
        <a href="index.html">Home</a>
        <span>›</span>
        <a href="blogs.html">Blogs</a>
        <span>›</span>
        <span class="crumb-current">${article.title}</span>
      </nav>

      <!-- Article Header -->
      <header class="blog-post-header">
        <div class="blog-post-meta-row">
          <span class="blog-badge-tag">${article.category || 'Buying Guide'}</span>
          <span style="color: #7A6652; font-size: 0.88rem;">${article.date || 'Recent'}</span>
          <span style="color: #7A6652; font-size: 0.88rem;">• ${article.readTime || '5 min read'}</span>
          <span style="color: var(--brand-primary-ink); font-size: 0.88rem; font-weight: 700;">• Medical Review by Trichologist</span>
        </div>

        <h1 class="blog-post-title">
          ${article.title}
        </h1>

        <!-- Author & Share Bar -->
        <div class="blog-post-author-bar">
          <div class="author-bar-left">
            <div class="author-large-avatar">${(article.authorAvatar || article.author || 'Dr').slice(0, 2)}</div>
            <div class="author-bar-details">
              <div class="author-name">${article.author || 'Dr. Meera Sharma'}</div>
              <div class="author-meta">${article.authorRole || 'Chief Hair Specialist • Doctor Comb Lajpat Nagar'}</div>
            </div>
          </div>

          <div class="blog-share-actions">
            <button class="btn-share" onclick="handleSharePost('whatsapp')">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.77.814 2.796.814 3.181 0 5.767-2.586 5.768-5.768zm7.398 5.766c0 4.079-3.32 7.399-7.399 7.399-1.24 0-2.433-.314-3.486-.889l-4.544 1.192 1.217-4.444c-.66-1.121-1.026-2.404-1.026-3.738 0-4.079 3.32-7.399 7.399-7.399 4.079 0 7.399 3.32 7.399 7.399z"/></svg>
              <span>Share</span>
            </button>
            <button class="btn-share" onclick="handleSharePost('copy')">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              <span id="copyLinkText">Copy Link</span>
            </button>
          </div>
        </div>
      </header>

      <!-- Featured Image Hero -->
      ${/blog_card_/.test(article.img) ? '' : `<div class="blog-featured-media">
        <img src="${article.img}" alt="${article.title}" class="blog-featured-img">
      </div>`}

      <!-- Main 2-Column Content Grid -->
      <div class="blog-main-layout">
        
        <!-- Main Article Content (Left) -->
        <article class="blog-article-content">
          
          <!-- Key Takeaway Box -->
          <div class="blog-takeaway-box">
            <h2>💡 KEY TAKEAWAY AT A GLANCE</h2>
            <p>
              ${article.takeaway || 'Non-surgical hair systems give you instant, full-density natural hair in just 45 minutes without surgery, scars, or downtime.'}
            </p>
          </div>

          <!-- Article Body Prose -->
          <div class="blog-prose">
            ${article.content}
          </div>

          <!-- Quote Highlight -->
          <blockquote class="blog-quote-highlight">
            "A hair system is not just about covering baldness—it is about waking up every single morning with the confidence to meet clients, attend weddings, and look in the mirror with pride."
          </blockquote>

          <!-- Author Bio Card -->
          <div class="blog-author-bio-card">
            <div class="author-bio-avatar">${(article.authorAvatar || article.author || 'Dr').slice(0, 2)}</div>
            <div class="author-bio-text">
              <h3>${article.author || 'Dr. Meera Sharma'}</h3>
              <span class="bio-title">${article.authorRole || 'Chief Hair Specialist & Trichology Consultant'}</span>
              <p>
                Over 12 years of clinical experience in non-surgical hair restoration and custom hairline design in Delhi NCR. Specializes in invisible micro-lace integration and natural scalp blending.
              </p>
            </div>
          </div>

          <!-- Mid-Article WhatsApp Banner -->
          <div class="blog-cta-banner-card">
            <h3>Want a Free Scalp Analysis in Delhi NCR?</h3>
            <p>Visit our private VIP cabins at Lajpat Nagar II or send your photos on WhatsApp for an instant confidential quote.</p>
            <a href="https://wa.me/919811234567?text=Hello%20Doctor%20Comb%2C%20I%20want%20to%20get%20a%20free%20scalp%20analysis" target="_blank" rel="noopener" class="btn btn-whatsapp btn-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.77.814 2.796.814 3.181 0 5.767-2.586 5.768-5.768zm7.398 5.766c0 4.079-3.32 7.399-7.399 7.399-1.24 0-2.433-.314-3.486-.889l-4.544 1.192 1.217-4.444c-.66-1.121-1.026-2.404-1.026-3.738 0-4.079 3.32-7.399 7.399-7.399 4.079 0 7.399 3.32 7.399 7.399z"/></svg>
              <span>Book Free Confidential Consultation</span>
            </a>
          </div>

        </article>

        <!-- Sticky Sidebar (Right) -->
        <aside class="blog-sidebar">
          
          <!-- VIP Consult Widget -->
          <div class="sidebar-widget sidebar-consult-card">
            <span class="sidebar-consult-badge">⚡ 1-HOUR TRANSFORMATION</span>
            <h3 class="sidebar-consult-title">Ready for Your New Hair?</h3>
            <p class="sidebar-consult-desc">
              Walk in bald, walk out with 100% natural, undetectable human hair. 100% private VIP cabins.
            </p>
            <a href="https://wa.me/919811234567?text=Hello%20Doctor%20Comb%2C%20I%20want%20to%20book%20a%201-hour%20transformation%20appointment" target="_blank" rel="noopener" class="btn btn-whatsapp btn-md" style="width: 100%; justify-content: center; margin-bottom: 10px;">
              <span>Chat on WhatsApp</span>
            </a>
            <a href="tel:+919811234567" class="btn btn-outline btn-md" style="width: 100%; justify-content: center; font-weight: 800;">
              <span>Call: +91 98112 34567</span>
            </a>
          </div>

          <!-- Popular Guides List -->
          <div class="sidebar-widget">
            <h3 class="sidebar-widget-title">
              <span>🔥 Popular Hair Guides</span>
            </h3>
            <div class="popular-posts-list">
              ${sidebarPopularHtml}
            </div>
          </div>

          <!-- Clinic Location Card -->
          <div class="sidebar-widget">
            <h3 class="sidebar-widget-title">
              <span>📍 Visit Our Clinic</span>
            </h3>
            <p style="color: #374151; font-size: 0.95rem; line-height: 1.5; margin-bottom: 12px;">
              <strong style="color: #111827;">Doctor Comb</strong><br>
              B-24, Central Market, Lajpat Nagar II, New Delhi 110024
            </p>
            <p class="clinic-timing" style="color: #4B5563; font-size: 0.85rem; margin-bottom: 16px;">
              ⏱ Open Tuesday – Sunday: 10:30 AM – 8:00 PM (Monday Closed)
            </p>
            <a href="https://www.google.com/maps/dir/?api=1&destination=B-24,+Central+Market,+Lajpat+Nagar+II,+New+Delhi+110024" target="_blank" rel="noopener" class="btn btn-outline btn-sm" style="width: 100%; justify-content: center;">
              <span>Get Google Directions ↗</span>
            </a>
          </div>

        </aside>

      </div>

      <!-- Related Articles Section -->
      <section class="related-articles-section">
        <div class="related-section-title">
          <span>Related Articles & Stories</span>
          <a href="blogs.html" class="btn btn-outline btn-sm" style="font-weight: 800;">View All Blogs →</a>
        </div>
        <div class="blog-grid">
          ${relatedCardsHtml}
        </div>
      </section>

    </div>
  </main>

  <!-- ==========================================================================
       GLOBAL FOOTER (DOCTOR COMB REPLACEMENT)
       ========================================================================== -->
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        
        <div class="footer-brand">
          <a href="index.html" class="nav-logo" style="margin-bottom: 16px; text-decoration: none;">
            <div class="nav-logo-icon">
              <img src="assets/brand/Submark.png" alt="Doctor Comb Submark" class="nav-logo-submark">
            </div>
            <div class="nav-logo-text">
              <span class="nav-logo-title">DOCTOR COMB</span>
            </div>
          </a>
          <p>
            Natural, non-surgical hair replacement in under 60 minutes. 100% natural human hair systems customized to your hairline, skin tone, and lifestyle.
          </p>
          <div style="font-weight: 800; color: #FFFFFF; font-size: 1.15rem; margin-top: 14px;">
            📞 Helpline: <a href="tel:+919811234567" style="color: #FFFFFF; text-decoration: none;">+91 98112 34567</a>
          </div>
        </div>

        <div>
          <h3 class="footer-col-title">Quick Links</h3>
          <ul class="footer-links">
            <li><a href="index.html">Home</a></li>
            <li><a href="services.html">Services & Methods</a></li>
            <li><a href="products.html">Hair Systems & Products</a></li>
            <li><a href="blogs.html">Expert Hair Journal</a></li>
            <li><a href="contact.html">Contact Us</a></li>
            <li><a href="index.html#reviews">Client Reviews</a></li>
          </ul>
        </div>

        <div>
          <h3 class="footer-col-title">Our Clinic Location</h3>
          <ul class="footer-links">
            <li style="color: #FFFFFF; font-weight: 600; line-height: 1.5;">Doctor Comb<br>B-24, Central Market, Lajpat Nagar II,<br>New Delhi 110024</li>
            <li><a href="https://www.google.com/maps/dir/?api=1&destination=B-24,+Central+Market,+Lajpat+Nagar+II,+New+Delhi+110024" target="_blank" rel="noopener" style="color: var(--brand-primary-ink); font-weight: 700;">Get Google Directions ↗</a></li>
            <li style="margin-top: 10px; color: #94A3B8; font-size: 0.88rem;">
              Tue – Sun: 10:30 AM – 8:00 PM<br>(Monday Closed)
            </li>
          </ul>
        </div>

      </div>

      <div class="footer-bottom">
        <div>© 2026 Doctor Comb. All Rights Reserved.</div>
        <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
          <span>100% Confidential VIP Care</span>
          <span>•</span>
          <a href="contact.html" style="color: #94A3B8; text-decoration: none;">Book Consultation</a>
        </div>
      </div>
    </div>
  </footer>

  <script src="app.js"></script>
</body>
</html>
`;
}

async function runGenerator() {
  console.log('🚀 Starting Doctor Comb Static Blog Generator...');
  
  // 1. Fetch from Sanity
  const sanityPosts = await fetchSanityPosts();
  
  // 2. Format Sanity articles
  const liveArticles = sanityPosts.map(post => {
    const slug = post.slug || post._id;
    const formattedDate = post.date ? new Date(post.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Recent';
    return {
      slug: slug,
      title: post.title,
      category: post.category || 'Buying Guide',
      date: formattedDate,
      readTime: '5 min read',
      img: post.img || 'assets/images/blog_hero.jpg',
      author: post.author || 'Dr. Meera Sharma',
      authorRole: post.authorRole || 'Chief Hair Specialist • Doctor Comb',
      authorAvatar: (post.author || 'Dr').slice(0, 2),
      excerpt: post.excerpt || (post.title + ' - Read the complete hair restoration guide.'),
      takeaway: post.takeaway || 'Non-surgical hair systems give you instant, natural hair in 45 minutes without surgery.',
      content: portableTextToHtml(post.body)
    };
  });

  // 3. Merge: Live posts take priority, followed by base curated articles
  const articlesMap = new Map();
  BASE_ARTICLES.forEach(a => articlesMap.set(a.slug, a));
  liveArticles.forEach(a => articlesMap.set(a.slug, a));

  const allArticles = Array.from(articlesMap.values());
  console.log(`📝 Total articles to build: ${allArticles.length}`);

  // 4. Generate standalone .html file for each article
  allArticles.forEach(article => {
    const fileName = `${article.slug}.html`;
    const filePath = path.join(__dirname, fileName);
    const htmlContent = renderHtmlTemplate(article, allArticles);
    
    fs.writeFileSync(filePath, htmlContent, 'utf8');
    console.log(`  ✓ Generated: ${fileName}`);
  });

  // 5. Auto-Generate Dynamic sitemap.xml
  const today = new Date().toISOString().split('T')[0];
  const sitemapUrls = [
    `  <url>
    <loc>${SANITY_CONFIG.siteUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`,
    `  <url>
    <loc>${SANITY_CONFIG.siteUrl}/blogs.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`,
    ...allArticles.map(article => `  <url>
    <loc>${SANITY_CONFIG.siteUrl}/${article.slug}.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`)
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemapXml, 'utf8');
  console.log('  ✓ Generated: sitemap.xml (with all new article URLs)');

  // 6. Auto-Generate robots.txt
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${SANITY_CONFIG.siteUrl}/sitemap.xml
`;
  fs.writeFileSync(path.join(__dirname, 'robots.txt'), robotsTxt, 'utf8');
  console.log('  ✓ Generated: robots.txt (pointing crawlers to sitemap.xml)');

  console.log('🎉 All standalone blog HTML pages & sitemap generated successfully!');
}

runGenerator();
