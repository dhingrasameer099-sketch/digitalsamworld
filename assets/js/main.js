/**
 * DigitalSamWorld (digitalsamworld.com) - Main Interactive Script
 * Cross-browser compatible ES6+ with graceful fallbacks
 */

document.addEventListener('DOMContentLoaded', function () {
  // 1. Sticky Header on Scroll
  var header = document.querySelector('.site-header');
  function handleScroll() {
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Mobile Navigation Drawer & Services Submenu Toggle
  var mobileToggle = document.getElementById('mobileToggle');
  var navMenu = document.getElementById('navMenu');
  var dropdownItems = document.querySelectorAll('.nav-item.has-dropdown');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  dropdownItems.forEach(function (item) {
    var link = item.querySelector('.nav-link');
    if (link) {
      link.addEventListener('click', function (e) {
        if (window.innerWidth <= 991) {
          e.preventDefault();
          item.classList.toggle('open');
        }
      });
    }
  });

  // Close mobile menu on Escape or clicking outside
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // 3. FAQ Accordion
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var btn = item.querySelector('.faq-question');
    var answer = item.querySelector('.faq-answer');
    if (!btn || !answer) return;

    // Initialize open state if active
    if (item.classList.contains('active')) {
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }

    btn.addEventListener('click', function () {
      var isCurrentlyOpen = item.classList.contains('active');

      // Close others in same container
      faqItems.forEach(function (other) {
        if (other !== item) {
          other.classList.remove('active');
          var otherBtn = other.querySelector('.faq-question');
          var otherAns = other.querySelector('.faq-answer');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          if (otherAns) otherAns.style.maxHeight = null;
        }
      });

      if (isCurrentlyOpen) {
        item.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // 4. Interactive ROI & Growth Calculator
  var budgetSlider = document.getElementById('roiBudget');
  var industrySelect = document.getElementById('roiIndustry');
  var budgetDisplay = document.getElementById('roiBudgetVal');
  var outTraffic = document.getElementById('roiTraffic');
  var outLeads = document.getElementById('roiLeads');
  var outRevenue = document.getElementById('roiRevenue');
  var outRoas = document.getElementById('roiRoas');

  function formatINR(num) {
    return '₹' + Math.round(num).toLocaleString('en-IN');
  }

  function updateCalculator() {
    if (!budgetSlider || !industrySelect) return;
    var budget = parseFloat(budgetSlider.value) || 50000;
    var mult = parseFloat(industrySelect.value) || 4.5;

    if (budgetDisplay) budgetDisplay.textContent = formatINR(budget) + ' / mo';

    var clicks = Math.round((budget / 18) * (mult / 4));
    var leads = Math.max(12, Math.round(clicks * 0.085));
    var estRevenue = Math.round(budget * mult);

    if (outTraffic) outTraffic.textContent = clicks.toLocaleString('en-IN') + '+';
    if (outLeads) outLeads.textContent = leads.toLocaleString('en-IN') + '+';
    if (outRevenue) outRevenue.textContent = formatINR(estRevenue);
    if (outRoas) outRoas.textContent = mult.toFixed(1) + 'x';
  }

  if (budgetSlider && industrySelect) {
    budgetSlider.addEventListener('input', updateCalculator);
    industrySelect.addEventListener('change', updateCalculator);
    updateCalculator();
  }

  // 5. Lead & Contact Form Handling with Instant Feedback Toast
  var forms = document.querySelectorAll('.js-lead-form');
  var toast = document.getElementById('toastNotification');
  var toastMsg = document.getElementById('toastMessage');

  function showToast(message) {
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastNotification';
      toast.className = 'toast-notification';
      toast.innerHTML =
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>' +
        '<span id="toastMessage"></span>';
      document.body.appendChild(toast);
      toastMsg = document.getElementById('toastMessage');
    }
    if (toastMsg) toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(function () {
      toast.classList.remove('show');
    }, 5000);
  }

  forms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nameInput = form.querySelector('[name="name"]');
      var phoneInput = form.querySelector('[name="phone"]');
      var emailInput = form.querySelector('[name="email"]');
      var serviceInput = form.querySelector('[name="service"]');
      var websiteInput = form.querySelector('[name="website"]');
      var msgInput = form.querySelector('[name="message"]');

      var userName = nameInput && nameInput.value ? nameInput.value.trim() : 'Valued Client';
      var serviceName = serviceInput && serviceInput.value ? serviceInput.value : '360° Digital Marketing';

      var leadPayload = {
        name: userName,
        phone: phoneInput && phoneInput.value ? phoneInput.value.trim() : '',
        email: emailInput && emailInput.value ? emailInput.value.trim() : '',
        service: serviceName,
        website: websiteInput && websiteInput.value ? websiteInput.value.trim() : '',
        message: msgInput && msgInput.value ? msgInput.value.trim() : '',
        page: window.location.pathname.split('/').pop() || 'index.html'
      };

      if (window.SamCMS && typeof window.SamCMS.addLead === 'function') {
        window.SamCMS.addLead(leadPayload);
      } else {
        try {
          var existing = JSON.parse(localStorage.getItem('sam_digital_leads_v1') || '[]');
          leadPayload.id = 'lead_' + Date.now();
          leadPayload.date = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
          leadPayload.status = 'New';
          existing.unshift(leadPayload);
          localStorage.setItem('sam_digital_leads_v1', JSON.stringify(existing));
        } catch (err) {}
      }

      showToast(
        'Thank you, ' +
          userName +
          '! Your inquiry for ' +
          serviceName +
          ' has been received. Our Chandigarh team (8284038539) will contact you shortly.'
      );
      form.reset();
    });
  });

  // 6. Dynamic Copyright Year
  var yearSpans = document.querySelectorAll('.js-year');
  var currentYear = new Date().getFullYear();
  yearSpans.forEach(function (span) {
    span.textContent = currentYear;
  });
});
