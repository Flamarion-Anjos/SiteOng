// ui.js - adiciona suporte a submenu dropdown
document.addEventListener('DOMContentLoaded', function(){
  const menuBtn = document.querySelector('.menu-toggle');
  const panel = document.querySelector('.menu-panel');
  const panelClose = document.querySelector('.menu-panel .close-panel');

  if(menuBtn && panel){
    menuBtn.addEventListener('click', () => {
      panel.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }
  if(panelClose){
    panelClose.addEventListener('click', () => {
      panel.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
  panel.addEventListener('click', (e) => {
    if(e.target === panel){
      panel.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // Submenu toggle no mobile
  panel.querySelectorAll('.has-submenu > a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const submenu = link.nextElementSibling;
      submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
    });
  });
});

/* ui.js - Menu mobile, toasts e modal */
document.addEventListener('DOMContentLoaded', function(){
  // MENU HAMBURGER
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('.site-nav');
  if(menuToggle && siteNav){
    menuToggle.addEventListener('click', () => {
      siteNav.classList.toggle('show'); // classe para mobile
      siteNav.classList.toggle('mobile'); // faz com que o nav troque para mobile
    });
    // Close on click outside
    document.addEventListener('click', (e) => {
      if(!siteNav.contains(e.target) && !menuToggle.contains(e.target) && siteNav.classList.contains('show')){
        siteNav.classList.remove('show');
      }
    });
  }

  // TOASTS
  window.UI = window.UI || {};
  UI.toastContainer = UI.toastContainer || (function(){
    let cont = document.querySelector('.toast-container');
    if(!cont){
      cont = document.createElement('div');
      cont.className = 'toast-container';
      document.body.appendChild(cont);
    }
    return cont;
  })();

  UI.toast = function(message, type='info', timeout=4000){
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.setAttribute('role','status');
    el.textContent = message;
    UI.toastContainer.appendChild(el);
    setTimeout(()=> el.classList.add('visible'), 50);
    setTimeout(()=> {
      el.classList.remove('visible');
      el.addEventListener('transitionend', ()=> el.remove(), {once:true});
      // fallback remove
      setTimeout(()=> el.remove(), 300);
    }, timeout);
  };

  // MODAL (simple)
  UI.openModal = function(htmlContent){
    let backdrop = document.querySelector('.modal-backdrop');
    if(!backdrop){
      backdrop = document.createElement('div');
      backdrop.className = 'modal-backdrop';
      backdrop.innerHTML = `<div class="modal" role="dialog" aria-modal="true"></div>`;
      document.body.appendChild(backdrop);
    }
    const modal = backdrop.querySelector('.modal');
    modal.innerHTML = htmlContent + `<div style="margin-top:16px;text-align:right"><button class="btn btn--ghost" id="closeModal">Fechar</button></div>`;
    backdrop.classList.add('show');
    document.getElementById('closeModal').addEventListener('click', ()=> backdrop.classList.remove('show'));
    backdrop.addEventListener('click', (e)=> { if(e.target === backdrop) backdrop.classList.remove('show');});
  };
});
