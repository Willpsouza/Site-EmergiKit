document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.header-nav');
  
  menuBtn?.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', !expanded);
    nav.classList.toggle('active');
  });
  
  // FAQ accordion
  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.parentElement;
      const expanded = button.getAttribute('aria-expanded') === 'true';
      
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      
      if (!expanded) {
        item.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          nav?.classList.remove('active');
          menuBtn?.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });
  
  // Clipboard copy functionality
  document.querySelectorAll('.clipboard-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const textToCopy = this.dataset.text;
      if (!textToCopy) return;
      
      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalHTML = this.innerHTML;
        this.innerHTML = '✅ Copiado!';
        this.disabled = true;
        setTimeout(() => {
          this.innerHTML = originalHTML;
          this.disabled = false;
        }, 2000);
      }).catch(err => {
        console.error('Falha ao copiar:', err);
      });
    });
  });
  
  // Intersection Observer for scroll animations
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.feature-card, .testimonial-card, .impact-card, .step-card').forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      observer.observe(card);
    });
  }
});