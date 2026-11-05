/* =========================================================
   공통 스크립트 (모든 페이지)
   - 헤더 그림자, 메뉴 패널(dialog), Top 버튼
   - 스크롤 등장 효과(.reveal)
   - 가로 스크롤 줄(data-rail) 이전/다음 버튼
   - 메인 배너 슬라이더(data-hero) — 메인에서만 동작
   ========================================================= */
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 헤더 그림자 + Top 버튼 */
  const header = document.querySelector('.site-header');
  const toTop = document.querySelector('[data-to-top]');
  const onScroll = () => {
    const y = window.scrollY;
    header?.classList.toggle('is-scrolled', y > 8);
    toTop?.classList.toggle('is-visible', y > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toTop?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  /* 메뉴 패널 */
  const panel = document.getElementById('menu-panel');
  document.querySelector('[data-menu-open]')?.addEventListener('click', () => panel?.showModal());
  panel?.querySelector('[data-menu-close]')?.addEventListener('click', () => panel.close());
  panel?.addEventListener('click', (e) => { if (e.target === panel) panel.close(); });
  panel?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => panel.close()));

  /* 스크롤 등장 */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    reveals.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 3) * 0.08}s`;
      io.observe(el);
    });
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  /* 가로 스크롤 줄 */
  document.querySelectorAll('[data-rail]').forEach((rail) => {
    const nav = document.querySelector(`[data-rail-nav="${rail.dataset.rail}"]`);
    if (!nav) return;
    const prev = nav.querySelector('[data-rail-prev]');
    const next = nav.querySelector('[data-rail-next]');
    const step = () => {
      const item = rail.firstElementChild;
      const gap = parseFloat(getComputedStyle(rail).columnGap) || 0;
      return item ? item.getBoundingClientRect().width + gap : rail.clientWidth;
    };
    const update = () => {
      const max = rail.scrollWidth - rail.clientWidth - 2;
      prev.disabled = rail.scrollLeft <= 2;
      next.disabled = rail.scrollLeft >= max;
    };
    prev.addEventListener('click', () => rail.scrollBy({ left: -step(), behavior: reduceMotion ? 'auto' : 'smooth' }));
    next.addEventListener('click', () => rail.scrollBy({ left: step(), behavior: reduceMotion ? 'auto' : 'smooth' }));
    rail.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  });

  /* 메인 배너 슬라이더 */
  const hero = document.querySelector('[data-hero]');
  if (hero) {
    const slides = [...hero.querySelectorAll('.hero__slide')];
    const visuals = [...hero.querySelectorAll('.hero__media')];
    const current = hero.querySelector('[data-hero-current]');
    const pauseBtn = hero.querySelector('[data-hero-pause]');
    const DELAY = 6500;
    let index = 0;
    let timer = null;
    let paused = reduceMotion; // 움직임 줄이기 설정이면 자동 넘김 안 함

    const loadVisual = async (target) => {
      const image = visuals[target]?.querySelector('img[data-src]');
      if (!image) return;
      if (image.dataset.srcset) {
        image.srcset = image.dataset.srcset;
        image.removeAttribute('data-srcset');
      }
      image.src = image.dataset.src;
      image.removeAttribute('data-src');
      try { await image.decode(); } catch { /* 실패하면 브라우저의 기본 대체 표시를 사용 */ }
    };
    const go = async (n) => {
      const target = (n + slides.length) % slides.length;
      await loadVisual(target);
      index = target;
      slides.forEach((s, i) => {
        const on = i === index;
        s.classList.toggle('is-active', on);
        s.setAttribute('aria-hidden', String(!on));
      });
      visuals.forEach((v, i) => {
        const on = i === index;
        v.classList.toggle('is-active', on);
        v.setAttribute('aria-hidden', String(!on));
      });
      if (current) current.textContent = String(index + 1).padStart(2, '0');
    };
    const stop = () => { clearTimeout(timer); timer = null; };
    const start = () => {
      stop();
      if (!paused) timer = setTimeout(async () => { await go(index + 1); start(); }, DELAY);
    };

    hero.querySelector('[data-hero-prev]')?.addEventListener('click', async () => { stop(); await go(index - 1); start(); });
    hero.querySelector('[data-hero-next]')?.addEventListener('click', async () => { stop(); await go(index + 1); start(); });
    pauseBtn?.addEventListener('click', () => {
      paused = !paused;
      pauseBtn.setAttribute('aria-pressed', String(paused));
      pauseBtn.querySelector('.sr-only').textContent = paused ? '자동 넘김 시작' : '자동 넘김 멈추기';
      start();
    });
    if (pauseBtn && paused) pauseBtn.setAttribute('aria-pressed', 'true');

    // 마우스를 올리거나 키보드로 들어오면 잠시 멈춤
    hero.addEventListener('mouseenter', stop);
    hero.addEventListener('mouseleave', start);
    hero.addEventListener('focusin', stop);
    hero.addEventListener('focusout', start);

    // 손가락으로 밀어서 넘기기
    let startX = null;
    hero.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener('touchend', (e) => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) { stop(); void go(index + (dx < 0 ? 1 : -1)).then(start); }
      startX = null;
    });

    void go(0);
    start();
  }

  /* 목록 필터 (성공사례 등)
     <div data-filter-group="이름"> 안의 <button data-filter="all|food|other" aria-pressed>
     항목: [data-filter-item="이름"][data-cat="food"]
     묶음: [data-filter-section="이름"] — 보이는 항목이 없으면 묶음째 숨김 */
  document.querySelectorAll('[data-filter-group]').forEach((group) => {
    const name = group.dataset.filterGroup;
    const buttons = [...group.querySelectorAll('[data-filter]')];
    const items = [...document.querySelectorAll(`[data-filter-item="${name}"]`)];
    const sections = [...document.querySelectorAll(`[data-filter-section="${name}"]`)];
    const status = document.querySelector(`[data-filter-status="${name}"]`);
    const apply = (value) => {
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === value)));
      let count = 0;
      items.forEach((item) => {
        const show = value === 'all' || item.dataset.cat === value;
        item.hidden = !show;
        if (show) { count += 1; item.classList.add('is-visible'); }
      });
      sections.forEach((sec) => {
        sec.hidden = !sec.querySelector(`[data-filter-item="${name}"]:not([hidden])`);
        sec.classList.toggle('is-filtered', value !== 'all');
      });
      if (status) status.textContent = `${count}곳`;
    };
    buttons.forEach((b) => b.addEventListener('click', () => apply(b.dataset.filter)));
  });

  /* 상담 신청 폼 (/contact)
     data-endpoint 에 구글 앱스 스크립트 배포 주소를 넣으면 구글 시트 저장 + 이메일 알림.
     설정: docs/FORM-SETUP.md */
  document.querySelectorAll('[data-consult-form]').forEach((form) => {
    const status = form.querySelector('[data-form-status]');
    const button = form.querySelector('button[type="submit"]');
    const say = (msg, isError) => { status.textContent = msg; status.classList.toggle('is-error', !!isError); };

    // "직접 적기"를 고르면 입력 칸을 보여 준다
    form.querySelectorAll('input[name="budget"]').forEach((r) => r.addEventListener('change', () => {
      const custom = form.querySelector('#f-budget-custom');
      if (!custom) return;
      custom.hidden = r.value !== '직접 적기' || !r.checked;
      if (!custom.hidden) custom.focus();
    }));

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      form.querySelectorAll('[aria-invalid]').forEach((el) => el.removeAttribute('aria-invalid'));
      const invalid = [...form.querySelectorAll('input, textarea, select')].filter((el) => !el.checkValidity());
      if (invalid.length) {
        invalid.forEach((el) => el.setAttribute('aria-invalid', 'true'));
        invalid[0].focus();
        const first = invalid[0];
        say(first.name === 'agree' ? '개인정보 수집·이용에 동의해 주세요.'
          : first.name === 'phone' && first.value ? '휴대폰 번호를 숫자로 적어 주세요.'
          : '필수 칸을 채워 주세요.', true);
        return;
      }
      const endpoint = form.dataset.endpoint;
      if (!endpoint) { say('지금은 온라인 접수를 준비하고 있습니다. 카카오톡이나 전화(010-7538-5083)로 연락 주세요.', true); return; }
      button.disabled = true;
      say('보내는 중입니다…');
      try {
        await fetch(endpoint, { method: 'POST', mode: 'no-cors', body: new URLSearchParams(new FormData(form)) });
        form.reset();
        const custom = form.querySelector('#f-budget-custom');
        if (custom) custom.hidden = true;
        say('상담 신청이 접수됐습니다. 영업시간에 전화드리겠습니다.');
      } catch (err) {
        say('보내지 못했습니다. 카카오톡이나 전화(010-7538-5083)로 연락 주세요.', true);
      } finally {
        button.disabled = false;
      }
    });
  });

  /* 홍보 영상: 주소가 들어오면 새 창으로 연다 (주소 넣기 전에는 아무 일도 하지 않음) */
  document.querySelectorAll('[data-video-src]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const src = btn.dataset.videoSrc;
      if (src) window.open(src, '_blank', 'noopener');
    });
  });
})();
