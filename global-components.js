/**
 * Doctor Comb - Global Layout Components (Header & Footer)
 * Single source of truth for the site-wide Navbar and Footer.
 */

(function() {
  function getActiveNavKey() {
    var path = window.location.pathname.toLowerCase();
    var hash = window.location.hash.toLowerCase();
    if (path.indexOf('services') !== -1) return 'services';
    if (path.indexOf('product') !== -1) return 'products';
    if (path.indexOf('blog') !== -1 || path.indexOf('-guide') !== -1 || path.indexOf('hair-') !== -1 || path.indexOf('patch-') !== -1 || path.indexOf('how-') !== -1 || path.indexOf('can-you-') !== -1 || path.indexOf('what-to-') !== -1 || path.indexOf('daily-') !== -1 || path.indexOf('gym-') !== -1 || path.indexOf('undetectable') !== -1) return 'blogs';
    if (path.indexOf('contact') !== -1) return 'contact';
    return 'home';
  }

  function getHeaderHtml(activeKey) {
    var isHome = activeKey === 'home' ? ' active' : '';
    var isServices = activeKey === 'services' ? ' active' : '';
    var isProducts = activeKey === 'products' ? ' active' : '';
    var isBlogs = activeKey === 'blogs' ? ' active' : '';
    var isContact = activeKey === 'contact' ? ' active' : '';

    return `
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
          <li><a href="index.html" class="nav-link${isHome}">Home</a></li>
          <li><a href="services.html" class="nav-link${isServices}">Services</a></li>
          <li><a href="products.html" class="nav-link${isProducts}">Products</a></li>
          <li><a href="blogs.html" class="nav-link${isBlogs}">Blogs</a></li>
          <li><a href="contact.html" class="nav-link${isContact}">Contact Us</a></li>
        </ul>
      </nav>

      <div class="nav-actions">
        <a href="tel:+919717114138" class="btn btn-outline btn-md" style="font-weight: 800;">
          <span>📞 +91 97171 14138</span>
        </a>

        <a href="https://wa.me/919717114138?text=Hello%20Doctor%20Comb%2C%20I%20have%20a%20question%20regarding%20hair%20patch%20systems"
          target="_blank" rel="noopener" class="btn btn-whatsapp btn-md">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          <span>WhatsApp</span>
        </a>

        <button class="mobile-menu-btn" id="mobileMenuToggle" aria-label="Toggle Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Dropdown -->
    <div class="mobile-nav-panel" id="mobileNavPanel">
      <ul>
        <li><a href="index.html" class="mobile-link${isHome}">Home</a></li>
        <li><a href="services.html" class="mobile-link${isServices}">Services</a></li>
        <li><a href="products.html" class="mobile-link${isProducts}">Products</a></li>
        <li><a href="blogs.html" class="mobile-link${isBlogs}">Blogs</a></li>
        <li><a href="contact.html" class="mobile-link${isContact}">Contact Us</a></li>
      </ul>
      <div class="mobile-nav-drawer-actions">
        <a href="tel:+919717114138" class="btn btn-outline">📞 Call Helpline</a>
        <a href="https://wa.me/919717114138?text=Hello%20Doctor%20Comb%2C%20I%20have%20a%20question%20regarding%20hair%20patch%20systems"
          target="_blank" rel="noopener" class="btn btn-whatsapp">WhatsApp</a>
      </div>
    </div>`;
  }

  function getFooterHtml() {
    return `
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
            📞 Helpline: <a href="tel:+919717114138" style="color: #FFFFFF; text-decoration: none;">+91 97171 14138</a>
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
            <li style="color: #FFFFFF; font-weight: 600; line-height: 1.5;">Doctor Comb<br>48, First Floor, Gurudwara Road,<br>Opp. Radhu Palace, West Guru Angad Nagar,<br>Nearest Metro Nirman Vihar, Delhi – 110092</li>
            <li><a href="https://maps.app.goo.gl/L9i6q9FUrxUS6i3t8" target="_blank" rel="noopener" style="color: var(--brand-primary-ink); font-weight: 700;">Get Google Directions ↗</a></li>
            <li style="margin-top: 10px; color: #94A3B8; font-size: 0.88rem;">
              Mon – Sun: 10:00 AM – 8:00 PM<br>(Tuesday Closed)
            </li>
          </ul>
        </div>

      </div>

      <div class="footer-bottom">
        <div>This website is owned and managed by Doctor Comb</div>
        <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
          <span>100% Confidential VIP Care</span>
          <span>•</span>
          <a href="contact.html" style="color: #94A3B8; text-decoration: none;">Book Consultation</a>
        </div>
      </div>
    </div>`;
  }

  function getMobileStickyBarHtml() {
    return `
    <a href="tel:+919717114138" class="sticky-btn sticky-call">
      <span>📞 Call Clinic</span>
    </a>
    <a href="https://wa.me/919717114138?text=Hi%2C%20I%20want%20to%20know%20more%20about%20hair%20patch%20systems" target="_blank" rel="noopener" class="sticky-btn sticky-whatsapp">
      <svg class="wa-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
      <span>WhatsApp</span>
    </a>`;
  }

  function initGlobalLayout() {
    var activeKey = getActiveNavKey();

    // 1. Mount Global Header
    var headerEl = document.getElementById('navbar') || document.querySelector('header.navbar') || document.getElementById('global-header');
    if (headerEl) {
      if (!headerEl.classList.contains('navbar')) headerEl.classList.add('navbar');
      headerEl.id = 'navbar';
      headerEl.innerHTML = getHeaderHtml(activeKey);
    }

    // 2. Mount Global Footer
    var footerEl = document.querySelector('footer.footer') || document.getElementById('global-footer') || document.getElementById('site-footer');
    if (footerEl) {
      if (!footerEl.classList.contains('footer')) footerEl.classList.add('footer');
      footerEl.innerHTML = getFooterHtml();
    }

    // 3. Mount Global Mobile Sticky Bar
    var stickyBar = document.querySelector('.mobile-sticky-bar');
    if (!stickyBar) {
      stickyBar = document.createElement('div');
      stickyBar.className = 'mobile-sticky-bar';
      document.body.appendChild(stickyBar);
    }
    stickyBar.innerHTML = getMobileStickyBarHtml();
  }

  // Run immediately if DOM ready, or on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlobalLayout);
  } else {
    initGlobalLayout();
  }

  window.initGlobalLayout = initGlobalLayout;
})();

