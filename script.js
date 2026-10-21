/* ==========================================================================
   JAVASCRIPT: CARTA DE CUMPLEAÑOS PRESIDENTA PATRICIA
   Interactive Envelope, Confetti (Pink, White & Gold), 3D Tilt & Wishes
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const envelopeSection = document.getElementById('envelopeSection');
  const envelopeCard = document.getElementById('envelopeCard');
  const waxSeal = document.getElementById('waxSeal');
  const mainCelebration = document.getElementById('mainCelebration');
  const quickConfettiBtn = document.getElementById('quickConfettiBtn');
  const applaudPresidentaBtn = document.getElementById('applaudPresidentaBtn');
  const applauseCount = document.getElementById('applauseCount');
  const blowCandleBtn = document.getElementById('blowCandleBtn');
  const candleFlame = document.getElementById('candleFlame');
  const smokePuff = document.getElementById('smokePuff');
  const wishSuccessMsg = document.getElementById('wishSuccessMsg');
  const customPhotoInput = document.getElementById('customPhotoInput');
  const photoGalleryContainer = document.getElementById('photoGalleryContainer');
  const uploadSlotCard = document.getElementById('uploadSlotCard');
  const replayEnvelopeBtn = document.getElementById('replayEnvelopeBtn');
  const currentYearSpan = document.getElementById('currentYear');

  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // State
  let isEnvelopeOpened = false;
  let applauseScore = 0;
  let candleBlown = false;

  // ==========================================================================
  // 1. ENVELOPE OPENING ANIMATION & TRANSITION
  // ==========================================================================
  function openPresidentialEnvelope() {
    if (isEnvelopeOpened) return;
    isEnvelopeOpened = true;

    // Wax seal breaking animation
    waxSeal.classList.add('breaking');

    // Envelope flap flip
    envelopeCard.classList.add('open');

    // Golden & pink confetti burst from center
    triggerLuxuryConfetti();

    // After brief opening delay, show main stage
    setTimeout(() => {
      envelopeSection.classList.add('hide-envelope');
      mainCelebration.classList.remove('d-none');
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Secondary celebration confetti
      setTimeout(() => {
        triggerGrandPresidentialConfetti();
      }, 350);

      // Clean up overlay display after transition
      setTimeout(() => {
        envelopeSection.style.display = 'none';
      }, 900);
    }, 900);
  }

  waxSeal.addEventListener('click', (e) => {
    e.stopPropagation();
    openPresidentialEnvelope();
  });

  envelopeCard.addEventListener('click', () => {
    openPresidentialEnvelope();
  });

  // Replay envelope function (from footer)
  if (replayEnvelopeBtn) {
    replayEnvelopeBtn.addEventListener('click', () => {
      isEnvelopeOpened = false;
      envelopeSection.style.display = 'flex';
      envelopeSection.classList.remove('hide-envelope');
      waxSeal.classList.remove('breaking');
      envelopeCard.classList.remove('open');
      mainCelebration.classList.add('d-none');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================================================
  // 2. CANVAS CONFETTI (PINK, WHITE & GOLD PALETTE)
  // ==========================================================================
  function triggerLuxuryConfetti() {
    if (typeof confetti !== 'function') return;

    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#ec407a', '#f48fb1', '#ffffff', '#ffd700', '#d4af37']
    });
  }

  function triggerGrandPresidentialConfetti() {
    if (typeof confetti !== 'function') return;

    const count = 220;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#ec407a', '#f8bbd0', '#ffffff', '#d4af37', '#ffd700']
    };

    function fire(particleRatio, opts) {
      confetti(Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio)
      }));
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }

  // Quick confetti floating button
  if (quickConfettiBtn) {
    quickConfettiBtn.addEventListener('click', () => {
      triggerGrandPresidentialConfetti();
      spawnFloatingEmojis(['💖', '👑', '✨', '🌸', '🥂', '💕']);
    });
  }

  // ==========================================================================
  // 3. HERO PORTRAIT 3D TILT & APPLAUSE
  // ==========================================================================
  const interactiveFrame = document.getElementById('interactiveFrame');
  const royalPortraitWrapper = document.getElementById('royalPortraitWrapper');

  if (royalPortraitWrapper && interactiveFrame) {
    royalPortraitWrapper.addEventListener('mousemove', (e) => {
      const rect = royalPortraitWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      interactiveFrame.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    royalPortraitWrapper.addEventListener('mouseleave', () => {
      interactiveFrame.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  }

  // Applaud Presidenta Button
  if (applaudPresidentaBtn && applauseCount) {
    applaudPresidentaBtn.addEventListener('click', (e) => {
      applauseScore++;
      applauseCount.textContent = applauseScore;

      // Spawn floating hearts & sparkles around portrait
      spawnFloatingIconAtElement(e.target, ['👑', '💖', '✨', '🌸', '💕']);

      // Micro confetti on milestones
      if (applauseScore % 5 === 0) {
        triggerLuxuryConfetti();
      }
    });
  }

  function spawnFloatingIconAtElement(el, emojiList) {
    const emoji = emojiList[Math.floor(Math.random() * emojiList.length)];
    const floater = document.createElement('div');
    floater.textContent = emoji;
    floater.style.position = 'fixed';
    
    const rect = el.getBoundingClientRect();
    const startX = rect.left + rect.width / 2 + (Math.random() * 40 - 20);
    const startY = rect.top + (Math.random() * 20 - 10);

    floater.style.left = `${startX}px`;
    floater.style.top = `${startY}px`;
    floater.style.fontSize = `${Math.random() * 1.2 + 1.2}rem`;
    floater.style.pointerEvents = 'none';
    floater.style.zIndex = '9999';
    floater.style.transition = 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.4s ease';

    document.body.appendChild(floater);

    requestAnimationFrame(() => {
      const moveX = (Math.random() - 0.5) * 120;
      const moveY = - (Math.random() * 140 + 80);
      floater.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.4) rotate(${Math.random() * 30 - 15}deg)`;
      floater.style.opacity = '0';
    });

    setTimeout(() => {
      floater.remove();
    }, 1500);
  }

  function spawnFloatingEmojis(list) {
    for (let i = 0; i < 12; i++) {
      setTimeout(() => {
        const emoji = list[Math.floor(Math.random() * list.length)];
        const floater = document.createElement('div');
        floater.textContent = emoji;
        floater.style.position = 'fixed';
        floater.style.bottom = '40px';
        floater.style.right = `${Math.random() * 80 + 20}px`;
        floater.style.fontSize = `${Math.random() * 1.5 + 1.2}rem`;
        floater.style.pointerEvents = 'none';
        floater.style.zIndex = '9999';
        floater.style.transition = 'transform 2s ease-out, opacity 2s ease';

        document.body.appendChild(floater);

        requestAnimationFrame(() => {
          const moveX = (Math.random() - 0.5) * 160;
          const moveY = - (Math.random() * 400 + 200);
          floater.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.3)`;
          floater.style.opacity = '0';
        });

        setTimeout(() => floater.remove(), 2100);
      }, i * 100);
    }
  }

  // ==========================================================================
  // 4. INTERACTIVE CANDLE (BLOW THE WISH)
  // ==========================================================================
  if (blowCandleBtn && candleFlame && smokePuff && wishSuccessMsg) {
    blowCandleBtn.addEventListener('click', () => {
      if (!candleBlown) {
        candleBlown = true;
        candleFlame.classList.add('blown-out');
        smokePuff.classList.remove('d-none');
        wishSuccessMsg.classList.remove('d-none');
        
        triggerGrandPresidentialConfetti();

        blowCandleBtn.innerHTML = '<i class="fa-solid fa-fire-flame-curved me-2"></i> ¡Volver a encender la vela!';
        blowCandleBtn.classList.remove('btn-candle-blow');
        blowCandleBtn.classList.add('btn', 'btn-outline-secondary', 'rounded-pill', 'px-4');
      } else {
        candleBlown = false;
        candleFlame.classList.remove('blown-out');
        smokePuff.classList.add('d-none');
        wishSuccessMsg.classList.add('d-none');

        blowCandleBtn.innerHTML = '<i class="fa-solid fa-wind me-2"></i> ¡Soplar la Vela y Pedir Deseo!';
        blowCandleBtn.classList.remove('btn-outline-secondary');
        blowCandleBtn.classList.add('btn-candle-blow');
      }
    });
  }

  // ==========================================================================
  // 5. PHOTO GALLERY LIVE UPLOAD (ADDS USER PHOTOS TO POLAROID GRID)
  // ==========================================================================
  if (customPhotoInput && photoGalleryContainer && uploadSlotCard) {
    customPhotoInput.addEventListener('change', (e) => {
      const files = e.target.files;
      if (!files || files.length === 0) return;

      Array.from(files).forEach((file) => {
        if (!file.type.startsWith('image/')) return;

        const reader = new FileReader();
        reader.onload = (event) => {
          const imgSrc = event.target.result;
          const fileName = file.name.replace(/\.[^/.]+$/, "");

          // Create new polaroid item
          const col = document.createElement('div');
          col.className = 'col-12 col-md-6 col-lg-4 gallery-item-wrapper';
          col.innerHTML = `
            <div class="polaroid-card" onclick="openLightbox('${imgSrc}', 'Foto agregada: ${fileName}')">
              <div class="polaroid-pin">💖</div>
              <div class="polaroid-img-wrapper">
                <img src="${imgSrc}" alt="${fileName}" class="polaroid-img">
              </div>
              <div class="polaroid-caption">
                <h4 class="polaroid-title">${fileName.substring(0, 22)}</h4>
                <p class="polaroid-note">"Un recuerdo especial añadido al álbum de la Presidenta."</p>
                <div class="polaroid-footer">
                  <span class="polaroid-date">Nueva Foto</span>
                  <span class="polaroid-likes"><i class="fa-solid fa-heart text-pink"></i> Agregada</span>
                </div>
              </div>
            </div>
          `;

          // Insert right before the upload slot card
          photoGalleryContainer.insertBefore(col, uploadSlotCard);
          triggerLuxuryConfetti();
        };
        reader.readAsDataURL(file);
      });

      customPhotoInput.value = '';
    });
  }

  // ==========================================================================
  // 6. AMBIENT SPARKLES BACKGROUND CANVAS (GOLD & SOFT PINK)
  // ==========================================================================
  const canvas = document.getElementById('ambientSparklesCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 40;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.5 + 1.0,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: - (Math.random() * 0.4 + 0.2),
        alpha: Math.random() * 0.7 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        color: Math.random() > 0.5 ? '212, 175, 55' : '236, 64, 122' // Gold or pink
      });
    }

    function renderParticles() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.alpha += Math.sin(Date.now() * p.pulseSpeed) * 0.015;

        // Reset if drifted off screen
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const clampedAlpha = Math.max(0.1, Math.min(0.85, p.alpha));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${clampedAlpha})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = `rgba(${p.color}, 0.6)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      requestAnimationFrame(renderParticles);
    }

    renderParticles();
  }

  // Expose confetti functions globally
  window.triggerLuxuryConfetti = triggerLuxuryConfetti;
  window.triggerGrandPresidentialConfetti = triggerGrandPresidentialConfetti;

});

// Global Lightbox Handler
window.openLightbox = function(imageSrc, caption) {
  const modalImg = document.getElementById('lightboxModalImg');
  const modalCaption = document.getElementById('lightboxModalCaption');
  const modalElement = document.getElementById('photoLightboxModal');

  if (modalImg && modalCaption && modalElement) {
    modalImg.src = imageSrc;
    modalCaption.textContent = caption || '';
    
    const bsModal = bootstrap.Modal.getOrCreateInstance(modalElement);
    bsModal.show();
  }
};

// Global Hero Portrait Photo Switcher
window.switchHeroPhoto = function(imageSrc, caption, watermarkText) {
  const heroImg = document.getElementById('mainPresidentaPhoto');
  const watermark = document.querySelector('.portrait-watermark span');
  const buttons = document.querySelectorAll('.btn-hero-thumb');

  if (heroImg) {
    heroImg.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
    heroImg.style.opacity = '0.15';
    heroImg.style.transform = 'scale(0.96)';

    setTimeout(() => {
      heroImg.src = imageSrc;
      heroImg.alt = caption || 'Retrato de la Presidenta';
      if (watermark && watermarkText) {
        watermark.textContent = watermarkText;
      }
      heroImg.style.opacity = '1';
      heroImg.style.transform = 'scale(1)';
    }, 220);
  }

  buttons.forEach((btn) => {
    if (btn.getAttribute('data-img') === imageSrc) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  if (typeof window.triggerLuxuryConfetti === 'function') {
    window.triggerLuxuryConfetti();
  }
};

