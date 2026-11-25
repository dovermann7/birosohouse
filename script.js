document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');

  // Sticky header shadow
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 12);
  });

  // Mobile menu toggle
  mobileMenuBtn.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Program tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.program-panel');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      tabBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      panels.forEach((p) => p.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const panel = document.getElementById(`panel-${target}`);
      if (panel) panel.classList.add('active');
    });
  });

  // FAQ accordion
  document.querySelectorAll('.faq-question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });
  });

  // Application modal
  const applyModal = document.getElementById('applyModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const doneModalBtn = document.getElementById('doneModalBtn');
  const applyForm = document.getElementById('applyForm');
  const modalFormWrap = document.getElementById('modalFormWrap');
  const modalSuccessWrap = document.getElementById('modalSuccessWrap');
  const programSelect = document.getElementById('applicantProgram');
  const successSummary = document.getElementById('successSummary');

  const openModal = (programName) => {
    if (programName && programSelect) {
      programSelect.value = programName;
    }
    modalFormWrap.hidden = false;
    modalSuccessWrap.hidden = true;
    applyModal.classList.add('open');
    applyModal.setAttribute('aria-hidden', 'false');
    mobileNav.classList.remove('open');
  };

  const closeModal = () => {
    applyModal.classList.remove('open');
    applyModal.setAttribute('aria-hidden', 'true');
  };

  document.querySelectorAll('.open-apply-modal').forEach((btn) => {
    btn.addEventListener('click', () => {
      openModal(btn.dataset.program);
    });
  });

  closeModalBtn.addEventListener('click', closeModal);
  doneModalBtn.addEventListener('click', closeModal);

  applyModal.addEventListener('click', (e) => {
    if (e.target === applyModal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && applyModal.classList.contains('open')) {
      closeModal();
    }
  });

  applyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('applicantName').value.trim();
    const year = document.getElementById('applicantYear').value.trim();
    const program = programSelect.value;

    successSummary.textContent = `${name}님(${year}년생), [${program}] 신청이 정상적으로 접수되었습니다.`;
    modalFormWrap.hidden = true;
    modalSuccessWrap.hidden = false;
    applyForm.reset();
  });
});
