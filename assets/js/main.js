/**
 * Calmionix - Main JavaScript
 * Modern Premium Agency Website
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all modules
  initTheme();
  initMobileMenu();
  initNavbarScroll();
  initScrollReveal();
  initAccordion();
  initActiveNavLink();
});

/**
 * Theme Toggle (Dark/Light Mode)
 */
function initTheme() {
  const themeToggle = document.querySelector('.theme-toggle');
  const html = document.documentElement;
  
  // Check for saved theme preference or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Add transition class for smooth theme change
      html.classList.add('theme-transition');
      setTimeout(() => html.classList.remove('theme-transition'), 300);
    });
  }
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navbarNav = document.querySelector('.navbar-nav');
  
  if (menuToggle && navbarNav) {
    menuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      navbarNav.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      document.body.style.overflow = navbarNav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking on a nav link
    const navLinks = navbarNav.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        navbarNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!menuToggle.contains(e.target) && !navbarNav.contains(e.target)) {
        menuToggle.classList.remove('active');
        navbarNav.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
}

/**
 * Navbar Scroll Effect
 */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  
  if (navbar) {
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;
      
      // Add shadow when scrolled
      if (currentScroll > 10) {
        navbar.style.boxShadow = 'var(--shadow-md)';
      } else {
        navbar.style.boxShadow = 'none';
      }
      
      // Hide/show navbar on scroll (optional)
      if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
      } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
      }
      
      lastScroll = currentScroll;
    });
  }
}

/**
 * Scroll Reveal Animation
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  if (revealElements.length === 0) return;
  
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;
    
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < windowHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  };
  
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Check on load
}

/**
 * Accordion (FAQ)
 */
function initAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    
    if (header) {
      header.addEventListener('click', function() {
        const isActive = item.classList.contains('active');
        
        // Close all other items
        accordionItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });
        
        // Toggle current item
        item.classList.toggle('active', !isActive);
      });
    }
  });
}

/**
 * Active Navigation Link
 */
function initActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    
    if (linkPage === currentPage || 
        (currentPage === '' && linkPage === 'index.html') ||
        (currentPage === '/' && linkPage === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Format Date to Indonesian
 */
function formatDate(date) {
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  
  return {
    dayName: days[date.getDay()],
    day: date.getDate(),
    month: months[date.getMonth()],
    monthShort: months[date.getMonth()].substring(0, 3),
    year: date.getFullYear(),
    fullDate: `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
  };
}

/**
 * Generate WhatsApp Link
 */
function generateWhatsAppLink(date, time = '19:00') {
  const phone = '6282130570915';
  const formattedDate = formatDate(date);
  const message = `Halo, saya ingin ambil slot tanggal ${formattedDate.fullDate} jam ${time}`;
  
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/**
 * Debounce Function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Smooth Scroll to Element
 */
function scrollToElement(elementId, offset = 80) {
  const element = document.getElementById(elementId);
  
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

/**
 * Copy to Clipboard
 */
function copyToClipboard(text, successCallback, errorCallback) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(successCallback)
      .catch(errorCallback);
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      if (successCallback) successCallback();
    } catch (err) {
      if (errorCallback) errorCallback(err);
    }
    
    document.body.removeChild(textArea);
  }
}

/**
 * Show Toast Notification
 */
function showToast(message, type = 'success', duration = 3000) {
  // Remove existing toast
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
    <span>${message}</span>
  `;
  
  // Add styles
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 20px;
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    z-index: 9999;
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(toast);
  
  // Remove after duration
  setTimeout(() => {
    toast.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// Export functions for use in other scripts
window.Calmionix = {
  formatDate,
  generateWhatsAppLink,
  debounce,
  scrollToElement,
  copyToClipboard,
  showToast
};
