/* ═══════════════════════════════════════
   CONFIG
═══════════════════════════════════════ */
const JB_BIN = '69f4b454aaba8821975cfb18';
const JB_KEY = '$2a$10$neHi9aR/f.k8W0UFHTSmv.gteEMpUY7uEmGL.WqWGe7Id6CAKV08m';
const JB_URL = 'https://api.jsonbin.io/v3/b/' + JB_BIN;

const EJ_PK  = 'JGHqc3eLYvttdI1PN';
const EJ_SVC = 'service_ugbiib4';
const EJ_OWN = 'template_ht63zt8';
const EJ_CLT = 'template_g9rpdv9';
emailjs.init(EJ_PK);

/* ═══════════════════════════════════════
   MOUSE TRACKING
═══════════════════════════════════════ */
const cg = document.getElementById('cg');
const o1 = document.getElementById('o1');
const o2 = document.getElementById('o2');
const o3 = document.getElementById('o3');
const o4 = document.getElementById('o4');

document.addEventListener('mousemove', function(e) {
  cg.style.left = e.clientX + 'px';
  cg.style.top  = e.clientY + 'px';
  var xF = (e.clientX / window.innerWidth  - 0.5);
  var yF = (e.clientY / window.innerHeight - 0.5);
  o1.style.transform = 'translate(' + (xF * 45) + 'px,' + (yF * 32) + 'px)';
  o2.style.transform = 'translate(' + (-xF * 38) + 'px,' + (-yF * 28) + 'px)';
  o3.style.transform = 'translate(' + (xF * 30) + 'px,' + (-yF * 35) + 'px)';
  o4.style.transform = 'translate(' + (-xF * 24) + 'px,' + (yF * 30) + 'px)';
});

/* ═══════════════════════════════════════
   ROUTER
═══════════════════════════════════════ */
function showPage(id, scrollTo) {
  document.querySelectorAll('.page').forEach(function(p) {
    p.classList.remove('active');
  });
  var pg = document.getElementById('page-' + id);
  if (!pg) return;
  pg.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.querySelectorAll('.tab').forEach(function(t) {
    t.classList.toggle('active', t.dataset.page === id);
  });
  setTimeout(initReveal, 60);
  if (scrollTo) {
    setTimeout(function() {
      var el = document.getElementById(scrollTo);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
  }
}

document.addEventListener('click', function(e) {
  var el = e.target.closest('[data-page]');
  if (!el) return;
  e.preventDefault();
  showPage(el.dataset.page || 'home', el.dataset.scroll || null);
  if (el.dataset.pkg) {
    setTimeout(function() {
      var sel = document.getElementById('fp');
      if (sel) sel.value = el.dataset.pkg;
    }, 250);
  }
  document.getElementById('mob').classList.remove('open');
  document.getElementById('ham').classList.remove('open');
  document.body.style.overflow = '';
});

/* ═══════════════════════════════════════
   HAMBURGER
═══════════════════════════════════════ */
document.getElementById('ham').addEventListener('click', function() {
  var h = document.getElementById('ham');
  var m = document.getElementById('mob');
  h.classList.toggle('open');
  m.classList.toggle('open');
  document.body.style.overflow = m.classList.contains('open') ? 'hidden' : '';
});

/* ═══════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════ */
var ro;
function initReveal() {
  if (ro) ro.disconnect();
  ro = new IntersectionObserver(function(es) {
    es.forEach(function(e) {
      if (e.isIntersecting) e.target.classList.add('vis');
    });
  }, { threshold: 0.07 });
  document.querySelectorAll('.page.active .rev').forEach(function(el) {
    el.classList.remove('vis');
    ro.observe(el);
  });
}
initReveal();

/* ═══════════════════════════════════════
   TOAST
═══════════════════════════════════════ */
function toast(msg, type) {
  type = type || 'success';
  var t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast ' + type + ' show';
  setTimeout(function() { t.classList.remove('show'); }, 4200);
}

/* ═══════════════════════════════════════
   SANITIZE
═══════════════════════════════════════ */
function sanitize(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}

/* ═══════════════════════════════════════
   CONTACT METHOD TOGGLE
═══════════════════════════════════════ */
var contactMethod = 'email';

function switchContact(method) {
  contactMethod = method;
  document.getElementById('contact-email-fields').style.display = method === 'email' ? 'block' : 'none';
  document.getElementById('contact-wa-fields').style.display    = method === 'wa'    ? 'block' : 'none';
  document.getElementById('tog-email').classList.toggle('active', method === 'email');
  document.getElementById('tog-wa').classList.toggle('active',    method === 'wa');
}

/* ═══════════════════════════════════════
   EMAIL FIELD VALIDATION
═══════════════════════════════════════ */
document.getElementById('fe').addEventListener('blur', function() {
  var email = this.value.trim();
  var valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  var msg = document.getElementById('email-msg');
  if (email && !valid) {
    this.style.borderColor = 'rgba(239,68,68,.6)';
    this.style.boxShadow   = '0 0 0 3px rgba(239,68,68,.1)';
    msg.textContent = '⚠️ Please enter a valid email address.';
    msg.style.color = '#dc2626';
  } else if (email && valid) {
    this.style.borderColor = 'rgba(34,197,94,.5)';
    this.style.boxShadow   = '0 0 0 3px rgba(34,197,94,.1)';
    msg.textContent = '✅ Looks good!';
    msg.style.color = '#16a34a';
  }
});

document.getElementById('fe').addEventListener('focus', function() {
  this.style.borderColor = '';
  this.style.boxShadow   = '';
  document.getElementById('email-msg').textContent = '';
});

document.getElementById('fe2').addEventListener('blur', function() {
  var e1  = document.getElementById('fe').value.trim();
  var e2  = this.value.trim();
  var msg = document.getElementById('email-msg2');
  if (e2 && e1 !== e2) {
    this.style.borderColor = 'rgba(239,68,68,.6)';
    this.style.boxShadow   = '0 0 0 3px rgba(239,68,68,.1)';
    msg.textContent = '⚠️ Emails do not match.';
    msg.style.color = '#dc2626';
  } else if (e2 && e1 === e2) {
    this.style.borderColor = 'rgba(34,197,94,.5)';
    this.style.boxShadow   = '0 0 0 3px rgba(34,197,94,.1)';
    msg.textContent = '✅ Emails match!';
    msg.style.color = '#16a34a';
  }
});

document.getElementById('fe2').addEventListener('focus', function() {
  this.style.borderColor = '';
  this.style.boxShadow   = '';
  document.getElementById('email-msg2').textContent = '';
});

/* ═══════════════════════════════════════
   WHATSAPP FIELD VALIDATION
═══════════════════════════════════════ */
document.getElementById('fwa').addEventListener('blur', function() {
  var num = this.value.trim();
  var msg = document.getElementById('wa-msg');
  if (!num) return;
  if (!/^\d{4,15}$/.test(num)) {
    this.style.borderColor = 'rgba(239,68,68,.6)';
    this.style.boxShadow   = '0 0 0 3px rgba(239,68,68,.1)';
    msg.textContent = '⚠️ Enter a valid phone number.';
    msg.style.color = '#dc2626';
  } else {
    this.style.borderColor = 'rgba(34,197,94,.5)';
    this.style.boxShadow   = '0 0 0 3px rgba(34,197,94,.1)';
    msg.textContent = '✅ Looks good!';
    msg.style.color = '#16a34a';
  }
});

document.getElementById('fwa').addEventListener('focus', function() {
  this.style.borderColor = '';
  this.style.boxShadow   = '';
  document.getElementById('wa-msg').textContent = '';
});

document.getElementById('fwa2').addEventListener('blur', function() {
  var n1  = document.getElementById('fwa').value.trim();
  var n2  = this.value.trim();
  var msg = document.getElementById('wa-msg2');
  if (!n2) return;
  if (n1 !== n2) {
    this.style.borderColor = 'rgba(239,68,68,.6)';
    this.style.boxShadow   = '0 0 0 3px rgba(239,68,68,.1)';
    msg.textContent = '⚠️ Numbers do not match.';
    msg.style.color = '#dc2626';
  } else {
    this.style.borderColor = 'rgba(34,197,94,.5)';
    this.style.boxShadow   = '0 0 0 3px rgba(34,197,94,.1)';
    msg.textContent = '✅ Numbers match!';
    msg.style.color = '#16a34a';
  }
});

document.getElementById('fwa2').addEventListener('focus', function() {
  this.style.borderColor = '';
  this.style.boxShadow   = '';
  document.getElementById('wa-msg2').textContent = '';
});

/* ═══════════════════════════════════════
   CHAR COUNTER
═══════════════════════════════════════ */
document.getElementById('fm').addEventListener('input', function() {
  var count = this.value.length;
  var el = document.getElementById('charcount');
  el.textContent = count + ' / 500';
  el.style.color = count > 450 ? '#dc2626' : count > 350 ? '#f59e0b' : '#b5aace';
});

/* ═══════════════════════════════════════
   RATE LIMIT
═══════════════════════════════════════ */
var lastSubmit = 0;
var COOLDOWN   = 60000;

/* ═══════════════════════════════════════
   PLAN DETAILS
═══════════════════════════════════════ */
var planDetails = {
  'Starter — ₹4,999': {
    plan_name: 'Starter', plan_price: '₹4,999',
    plan_features: '• Up to 2-page website\n• Mobile responsive\n• Contact form\n• Glassmorphism design\n• Basic animations\n• Netlify deployment\n• 6-day delivery\n• 2 revisions included',
    plan_delivery: '6 days', plan_revisions: '2',
    plan_payment: '50% upfront (₹2,500) · 50% on delivery (₹2,499)'
  },
  'Pro Portfolio — ₹10,999': {
    plan_name: 'Pro Portfolio', plan_price: '₹10,999',
    plan_features: '• Up to 5-page website\n• Mobile responsive\n• Contact form\n• Glassmorphism / 3D design\n• Projects showcase\n• Testimonials section\n• Netlify deployment\n• 12-day delivery\n• 4 revisions included',
    plan_delivery: '12 days', plan_revisions: '4',
    plan_payment: '50% upfront (₹5,500) · 50% on delivery (₹5,499)'
  },
  'Custom / Not Sure': {
    plan_name: 'Custom / Not Sure', plan_price: 'To be discussed',
    plan_features: 'Custom scope — Ashwin will reach out with a proposal.',
    plan_delivery: 'To be discussed', plan_revisions: 'To be discussed',
    plan_payment: 'To be discussed after scoping'
  }
};

/* ═══════════════════════════════════════
   CONTACT FORM SUBMIT
═══════════════════════════════════════ */
document.getElementById('sbtn').addEventListener('click', async function() {

  var n = sanitize(document.getElementById('fn').value);
  var p = sanitize(document.getElementById('fp').value);
  var m = sanitize(document.getElementById('fm').value);
  var contactValue = '';

  /* — validate contact method — */
  if (contactMethod === 'email') {
    var e  = sanitize(document.getElementById('fe').value);
    var e2 = sanitize(document.getElementById('fe2').value);
    if (!e || !e2) { toast('⚠️ Please fill in all fields.', 'error'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) { toast('⚠️ Enter a valid email.', 'error'); return; }
    if (e !== e2) { toast('⚠️ Emails do not match.', 'error'); return; }
    contactValue = e;
  } else {
    var wa    = document.getElementById('fwa').value.trim();
    var wa2   = document.getElementById('fwa2').value.trim();
    var code  = document.getElementById('fwa-code').value;
    var code2 = document.getElementById('fwa2-code').value;
    if (!wa || !wa2) { toast('⚠️ Please fill in all fields.', 'error'); return; }
    if (!/^\d{4,15}$/.test(wa)) { toast('⚠️ Enter a valid phone number.', 'error'); return; }
    if (wa !== wa2 || code !== code2) { toast('⚠️ Numbers do not match.', 'error'); return; }
    contactValue = '+' + code + wa;
  }

  /* — validate other fields — */
  if (!n || !p || !m) { toast('⚠️ Please fill in all fields.', 'error'); return; }

  /* — honeypot — */
  if (document.getElementById('honey').value !== '') return;

  /* — rate limit — */
  var now = Date.now();
  if (now - lastSubmit < COOLDOWN) {
    var wait = Math.ceil((COOLDOWN - (now - lastSubmit)) / 1000);
    toast('⏳ Please wait ' + wait + ' seconds before sending again.', 'error');
    return;
  }

  this.textContent = 'Sending...';
  this.disabled = true;

  var pd = planDetails[p] || { plan_name: p, plan_price: '-', plan_features: '-', plan_delivery: '-', plan_revisions: '-', plan_payment: '-' };

  try {
    if (contactMethod === 'wa') {
      /* WhatsApp flow */
      var waMsg = encodeURIComponent(
        'Hi Ashwin, I want to discuss a project!\nName: ' + n +
        '\n' + pd.plan_name + '\n' + pd.plan_price +
        '\nMessage: ' + m
      );
      var clients = JSON.parse(localStorage.getItem('ashwin_clients') || '{}');
      clients[contactValue.toLowerCase()] = p;
      localStorage.setItem('ashwin_clients', JSON.stringify(clients));
      lastSubmit = Date.now();
      document.getElementById('fn').value  = '';
      document.getElementById('fm').value  = '';
      document.getElementById('fp').value  = '';
      document.getElementById('fwa').value = '';
      document.getElementById('fwa2').value= '';
      toast('✅ Opening WhatsApp...');
      window.location.href = 'https://wa.me/9021224212?text=' + waMsg;

    } else {
      /* Email flow */
      var params = { from_name: n, from_email: contactValue, package: p, message: m };
      var clientParams = {
        from_name: n, from_email: contactValue, package: p, message: m,
        plan_name: pd.plan_name, plan_price: pd.plan_price,
        plan_features: pd.plan_features, plan_delivery: pd.plan_delivery,
        plan_revisions: pd.plan_revisions, plan_payment: pd.plan_payment
      };
      await emailjs.send(EJ_SVC, EJ_OWN, params);
      await emailjs.send(EJ_SVC, EJ_CLT, clientParams);
      lastSubmit = Date.now();
      var clients = JSON.parse(localStorage.getItem('ashwin_clients') || '{}');
      clients[contactValue.toLowerCase()] = p;
      localStorage.setItem('ashwin_clients', JSON.stringify(clients));
      toast('✅ Message sent! Check your inbox.');
      ['fn','fe','fe2','fm'].forEach(function(id) { document.getElementById(id).value = ''; });
      document.getElementById('fp').value = '';
    }
  } catch(err) {
    toast('❌ Error. Please email helloepicgrowth@outlook.com', 'error');
  }

  this.textContent = 'Send Message 🚀';
  this.disabled = false;
});

/* ═══════════════════════════════════════
   LOAD & RENDER REVIEWS
═══════════════════════════════════════ */
async function loadReviews() {
  try {
    var res  = await fetch(JB_URL + '/latest', { headers: { 'X-Master-Key': JB_KEY } });
    var data = await res.json();
    renderReviews(data.record.reviews || []);
  } catch(err) {
    console.log('Could not load reviews:', err);
  }
}

function renderReviews(reviews) {
  var grid = document.getElementById('reviews-grid');
  if (!grid || reviews.length === 0) return;
  var html = reviews.map(function(r, i) {
    var planBadge = r.plan && r.plan.includes('Pro') ? '🚀 Pro Plan' : '⚡ Starter Plan';
    var stars     = parseInt(r.stars) || 0;
    var filled    = '★'.repeat(stars);
    var empty     = '☆'.repeat(5 - stars);
    var initial   = r.name ? r.name.charAt(0).toUpperCase() : '?';
    return '<div class="gl tc rev d' + ((i % 3) + 1) + '">' +
      '<div class="review-plan">' + planBadge + '</div>' +
      '<div class="tst">' + filled + empty + '</div>' +
      '<p class="ttx">"' + r.message + '"</p>' +
      '<div class="tau">' +
        '<div class="tav">' + initial + '</div>' +
        '<div><div class="tnm">' + r.name + '</div><div class="trl">' + r.skill + '</div></div>' +
      '</div></div>';
  }).join('');
  grid.insertAdjacentHTML('beforeend', html);
  setTimeout(initReveal, 100);
}

loadReviews();
showPage('home');

/* ═══════════════════════════════════════
   REVIEW MODAL
═══════════════════════════════════════ */
var reviewContactMethod = 'email';

function switchReviewContact(method) {
  reviewContactMethod = method;
  document.getElementById('rv-email-wrap').style.display = method === 'email' ? 'block' : 'none';
  document.getElementById('rv-wa-wrap').style.display    = method === 'wa'    ? 'block' : 'none';
  document.getElementById('rv-tog-email').classList.toggle('active', method === 'email');
  document.getElementById('rv-tog-wa').classList.toggle('active',    method === 'wa');
  document.getElementById('rv-fields').style.display = 'none';
  document.getElementById('rv-email-msg').textContent = '';
  var wamsg = document.getElementById('rv-wa-msg');
  if (wamsg) wamsg.textContent = '';
}

document.getElementById('openReviewBtn').addEventListener('click', function() {
  document.getElementById('reviewModal').classList.add('open');
  document.body.style.overflow = 'hidden';
});

document.getElementById('closeReviewBtn').addEventListener('click', function() {
  document.getElementById('reviewModal').classList.remove('open');
  document.body.style.overflow = '';
});

document.getElementById('reviewModal').addEventListener('click', function(e) {
  if (e.target === this) {
    this.classList.remove('open');
    document.body.style.overflow = '';
  }
});

/* — verify contact for review — */
function verifyReviewContact(value, msgId) {
  var key     = value.trim().toLowerCase();
  var clients = JSON.parse(localStorage.getItem('ashwin_clients') || '{}');
  var msg     = document.getElementById(msgId);
  var fields  = document.getElementById('rv-fields');
  if (!key) return;
  if (clients[key]) {
    msg.textContent = '✅ Verified! You can now leave a review.';
    msg.style.color = '#16a34a';
    document.getElementById('rv-plan').value = clients[key];
    fields.style.display = 'block';
  } else {
    msg.textContent = '❌ No order found. Use the same contact you used in the form.';
    msg.style.color = '#dc2626';
    fields.style.display = 'none';
  }
}

document.getElementById('rv-email').addEventListener('blur', function() {
  verifyReviewContact(this.value, 'rv-email-msg');
});

document.getElementById('rv-email').addEventListener('focus', function() {
  this.style.borderColor = '';
  this.style.boxShadow   = '';
  document.getElementById('rv-email-msg').textContent = '';
});

document.getElementById('rv-wa').addEventListener('blur', function() {
  var num = this.value.trim();
  if (!num) return;
  var msgEl = document.getElementById('rv-wa-msg');
  if (!/^\d{4,15}$/.test(num)) {
    msgEl.textContent = '⚠️ Enter a valid phone number.';
    msgEl.style.color = '#dc2626';
    return;
  }
  var rvCode = document.getElementById('rv-wa-code') ? document.getElementById('rv-wa-code').value : '91';
  verifyReviewContact('+' + rvCode + num, 'rv-wa-msg');
});

/* ═══════════════════════════════════════
   STAR RATING
═══════════════════════════════════════ */
var selectedStars = 0;

document.querySelectorAll('.star').forEach(function(star) {
  star.addEventListener('click', function() {
    selectedStars = parseInt(this.dataset.v);
    document.getElementById('rv-stars').value = selectedStars;
    document.querySelectorAll('.star').forEach(function(s, i) {
      s.classList.toggle('active', i < selectedStars);
    });
  });
  star.addEventListener('mouseover', function() {
    var v = parseInt(this.dataset.v);
    document.querySelectorAll('.star').forEach(function(s, i) {
      s.style.opacity = i < v ? '1' : '.35';
    });
  });
  star.addEventListener('mouseout', function() {
    document.querySelectorAll('.star').forEach(function(s, i) {
      s.style.opacity = i < selectedStars ? '1' : '.35';
    });
  });
});

/* ═══════════════════════════════════════
   REVIEW CHAR COUNTER
═══════════════════════════════════════ */
document.getElementById('rv-msg').addEventListener('input', function() {
  var count = this.value.length;
  var el    = document.getElementById('rv-count');
  el.textContent = count + ' / 1000';
  el.style.color = count > 900 ? '#dc2626' : count > 700 ? '#f59e0b' : '#b5aace';
});

/* ═══════════════════════════════════════
   SUBMIT REVIEW
═══════════════════════════════════════ */
document.getElementById('rv-submit').addEventListener('click', async function() {
  var rvCode  = document.getElementById('rv-wa-code') ? document.getElementById('rv-wa-code').value : '91';
  var email   = reviewContactMethod === 'email'
    ? document.getElementById('rv-email').value.trim()
    : '+' + rvCode + document.getElementById('rv-wa').value.trim();
  var name    = sanitize(document.getElementById('rv-name').value);
  var plan    = document.getElementById('rv-plan').value;
  var skill   = sanitize(document.getElementById('rv-skill').value);
  var stars   = document.getElementById('rv-stars').value;
  var msg     = sanitize(document.getElementById('rv-msg').value);

  if (!name || !skill || stars === '0' || !msg) {
    toast('⚠️ Please fill in all fields and select a rating.', 'error');
    return;
  }

  this.textContent = 'Submitting...';
  this.disabled = true;

  try {
    var getRes  = await fetch(JB_URL + '/latest', { headers: { 'X-Master-Key': JB_KEY } });
    var getData = await getRes.json();
    var existing = getData.record.reviews || [];
    existing.push({
      name: name, email: email, plan: plan,
      skill: skill, stars: stars, message: msg,
      date: new Date().toLocaleDateString('en-IN')
    });
    await fetch(JB_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'X-Master-Key': JB_KEY },
      body: JSON.stringify({ reviews: existing })
    });
    toast('🌟 Review submitted! Thank you.');
    loadReviews();
    document.getElementById('reviewModal').classList.remove('open');
    document.body.style.overflow = '';
    ['rv-email','rv-name','rv-skill','rv-msg'].forEach(function(id) {
      document.getElementById(id).value = '';
    });
    document.getElementById('rv-stars').value = '0';
    document.getElementById('rv-fields').style.display = 'none';
    document.querySelectorAll('.star').forEach(function(s) {
      s.classList.remove('active');
      s.style.opacity = '.35';
    });
    selectedStars = 0;
  } catch(err) {
    toast('❌ Error submitting review. Try again.', 'error');
  }

  this.textContent = 'Submit Review 🌟';
  this.disabled = false;
});

/* ═══════════════════════════════════════
   COPY EMAIL
═══════════════════════════════════════ */
document.getElementById('copyemail').addEventListener('click', function() {
  navigator.clipboard.writeText('helloepicgrowth@outlook.com');
  var orig = this.textContent;
  this.textContent = '✅ Copied!';
  this.style.color = '#7C3AED';
  var self = this;
  setTimeout(function() {
    self.textContent = orig;
    self.style.color = '';
  }, 2000);
});