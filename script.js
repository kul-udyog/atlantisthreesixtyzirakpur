(function(){
  "use strict";

  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------------- Scroll reveal ---------------- */
  (function(){
    var targets = document.querySelectorAll('.section-title, .section-lede, .ring-wrap, .why-grid, .amenity-grid, .masterplan-frame, .gallery-grid, .location-grid, .price-table, .video-frame, .split-video-grid');
    if (!('IntersectionObserver' in window)){
      targets.forEach(function(t){ t.classList.add('reveal','in-view'); });
      return;
    }
    var obs = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting){ e.target.classList.add('in-view'); obs.unobserve(e.target); }
      });
    }, {threshold:0.12, rootMargin:'0px 0px -40px 0px'});
    targets.forEach(function(t){ t.classList.add('reveal'); obs.observe(t); });
  })();

  /* ---------------- Header scroll state ---------------- */
  var header = document.getElementById('site-header');
  var stickyBar = document.getElementById('sticky-bar');
  var heroH = window.innerHeight;
  function onScroll(){
    var y = window.scrollY;
    header.classList.toggle('scrolled', y > 40);
    if (stickyBar){
      var enquireSection = document.getElementById('enquire');
      var enquireTop = enquireSection ? enquireSection.getBoundingClientRect().top + window.scrollY : Infinity;
      var pastHero = y > heroH * 0.5;
      var reachedForm = (y + window.innerHeight) > enquireTop + 60;
      stickyBar.classList.toggle('visible', pastHero && !reachedForm && !document.body.classList.contains('nav-open'));
    }
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  /* ---------------- Mobile nav (back-button safe) ---------------- */
  var hamburger = document.getElementById('hamburger');
  var mobileNav = document.getElementById('mobile-nav');
  var navOpen = false;
  function openNav(){
    navOpen = true;
    mobileNav.classList.add('open');
    hamburger.setAttribute('aria-expanded','true');
    document.body.classList.add('nav-open');
    history.pushState({navOpen:true}, '');
  }
  function closeNav(fromPop){
    navOpen = false;
    mobileNav.classList.remove('open');
    hamburger.setAttribute('aria-expanded','false');
    document.body.classList.remove('nav-open');
    if (!fromPop && history.state && history.state.navOpen) history.back();
  }
  hamburger.addEventListener('click', function(){ navOpen ? closeNav(false) : openNav(); });
  mobileNav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      navOpen = false;
      mobileNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded','false');
      document.body.classList.remove('nav-open');
    });
  });

  /* ---------------- Tower tabs ---------------- */
  var tabs = document.querySelectorAll('.tower-tab');
  var panels = document.querySelectorAll('.tower-panel');
  tabs.forEach(function(tab){
    tab.addEventListener('click', function(){
      tabs.forEach(function(t){ t.classList.remove('active'); t.setAttribute('aria-selected','false'); });
      panels.forEach(function(p){ p.classList.remove('active'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected','true');
      document.querySelector('.tower-panel[data-panel="'+tab.dataset.tower+'"]').classList.add('active');
    });
  });

  /* ---------------- Ring animation on view ---------------- */
  var ringProgress = document.querySelector('.ring-progress');
  if (ringProgress && 'IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting){ ringProgress.classList.add('animate'); io.disconnect(); }
      });
    }, {threshold:0.4});
    io.observe(ringProgress);
  } else if (ringProgress){
    ringProgress.classList.add('animate');
  }

  /* ---------------- Lightbox ---------------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  function openLightbox(src, alt){
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden','false');
    history.pushState({lightbox:true}, '');
  }
  function closeLightbox(fromPop){
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden','true');
    if (!fromPop && history.state && history.state.lightbox) history.back();
  }
  document.querySelectorAll('[data-lightbox]').forEach(function(el){
    el.addEventListener('click', function(){
      var img = el.querySelector('img');
      openLightbox(el.getAttribute('data-lightbox'), img ? img.alt : '');
    });
  });
  document.querySelectorAll('[data-close-lightbox]').forEach(function(el){
    el.addEventListener('click', function(){ closeLightbox(false); });
  });

  /* ---------------- Enquiry modal (back-button safe) ---------------- */
  var modal = document.getElementById('enquiry-modal');
  var modalSourceInput = document.getElementById('modal-source');
  var modalOpen = false;
  function openModal(source){
    modalOpen = true;
    modalSourceInput.value = source || 'unknown';
    resetModalForm();
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    history.pushState({modalOpen:true}, '');
    document.getElementById('md-name').focus({preventScroll:true});
    pushDL('atlantis360_modal_open', {source: source||'unknown'});
  }
  function closeModal(fromPop){
    modalOpen = false;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    if (!fromPop && history.state && history.state.modalOpen) history.back();
  }
  document.querySelectorAll('[data-open-modal]').forEach(function(btn){
    btn.addEventListener('click', function(){ openModal(btn.getAttribute('data-source')); });
  });
  document.querySelectorAll('[data-close-modal]').forEach(function(el){
    el.addEventListener('click', function(){ closeModal(false); });
  });

  window.addEventListener('popstate', function(){
    if (modalOpen) closeModal(true);
    else if (lightbox.classList.contains('open')) closeLightbox(true);
    else if (navOpen) closeNav(true);
  });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape'){
      if (modalOpen) closeModal(false);
      if (lightbox.classList.contains('open')) closeLightbox(false);
      if (navOpen) closeNav(false);
    }
  });

  function resetModalForm(){
    var form = document.getElementById('modal-form');
    var body = document.getElementById('modal-body');
    if (body.dataset.success === '1'){
      body.dataset.success = '0';
      body.innerHTML = modalFormOriginal;
      attachFormHandler(document.getElementById('modal-form'), document.getElementById('md-status'));
    }
  }
  var modalFormOriginal = document.getElementById('modal-body').innerHTML;

  /* ---------------- Lead submission ---------------- */
  var ENDPOINT = 'https://script.google.com/macros/s/AKfycbzNC3OJcfzy2rOKHTqT0m3OGmWZ_R_OlMIv0X-ImnHhgk_4OnMsJ3Fzv6cnblgMjrM2-g/exec';

  /* Call / WhatsApp quick-contact — number reconstructed at runtime so it
     never appears as plain text in the page source. */
  var QC_DIGITS = ['7','6','9','6','2','9','1','8','2','7'];
  var QC_LOCAL = QC_DIGITS.join('');
  var QC_CC = '91'; // India — confirmed correct
  var QC_TEL = 'tel:+' + QC_CC + QC_LOCAL;
  var QC_WA = 'https://wa.me/' + QC_CC + QC_LOCAL;

  function pushDL(event, data){
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({event: event}, data || {}));
  }

  function sanitizePhone(v){
    return (v || '').replace(/[^0-9]/g,'').replace(/^91/,'').slice(-10);
  }

  function submitLead(payload){
    var body = new URLSearchParams(payload);
    try{
      fetch(ENDPOINT, {method:'POST', mode:'no-cors', body: body});
    }catch(e){ /* fire and forget */ }
  }

  function showSuccess(container, statusEl){
    var wrap = document.createElement('div');
    wrap.className = 'form-success';
    wrap.innerHTML = '<div class="check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg></div>' +
      '<h4>Thank you!</h4><p>We\'ve received your details. Our team will contact you shortly with the price list and floor plans.</p>';
    container.innerHTML = '';
    container.appendChild(wrap);
  }

  function attachFormHandler(form, statusEl){
    if (!form || form.dataset.bound === '1') return;
    form.dataset.bound = '1';
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var name = form.querySelector('[name="name"]').value.trim();
      var phoneRaw = form.querySelector('[name="phone"]').value.trim();
      var phone = sanitizePhone(phoneRaw);
      var source = (form.querySelector('[name="source"]') || {}).value || 'unknown';
      var configEl = form.querySelector('[name="configuration"]');

      if (name.length < 2){ statusEl.textContent = 'Please enter your name.'; statusEl.className='form-status error'; return; }
      if (phone.length !== 10){ statusEl.textContent = 'Please enter a valid 10-digit mobile number.'; statusEl.className='form-status error'; return; }

      statusEl.textContent = '';
      var payload = {
        project: 'Atlantis Three Sixty',
        name: name,
        phone: phone,
        source: source,
        page: window.location.pathname,
        timestamp: new Date().toISOString()
      };
      if (configEl) payload.configuration = configEl.value;

      submitLead(payload);
      pushDL('atlantis360_form_submit', {source: source, configuration: payload.configuration || ''});

      /* Quick-contact buttons: lead is captured above like any other
         enquiry, then the visitor is carried through to the real call
         or WhatsApp chat. */
      if (source === 'whatsapp_widget'){
        var waMsg = "Hi, I'm " + name + ". I'm interested in Atlantis Three Sixty, Zirakpur — please share the price list and floor plans.";
        window.open(QC_WA + '?text=' + encodeURIComponent(waMsg), '_blank', 'noopener');
      } else if (source === 'call_widget'){
        window.location.href = QC_TEL;
      }

      var isModal = form.id === 'modal-form';
      if (isModal){
        var body = document.getElementById('modal-body');
        body.dataset.success = '1';
        showSuccess(body, statusEl);
      } else {
        showSuccess(form.parentElement, statusEl);
      }
    });
  }

  attachFormHandler(document.getElementById('main-enquiry-form'), document.getElementById('mf-status'));
  attachFormHandler(document.getElementById('modal-form'), document.getElementById('md-status'));

})();
