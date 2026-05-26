// Initialize Lucide Icons
lucide.createIcons();

// Mobile Navigation Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIconOpen = document.getElementById('menu-icon-open');
const menuIconClose = document.getElementById('menu-icon-close');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    menuIconOpen.classList.toggle('hidden');
    menuIconClose.classList.toggle('hidden');
});

// Smooth scroll and mobile menu close
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
            // Close mobile menu if open
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                menuIconOpen.classList.remove('hidden');
                menuIconClose.classList.add('hidden');
            }
        }
    });
});

// Gallery Modal
const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.getElementById('gallery-modal');
const modalImg = document.getElementById('modal-img');
const closeModal = document.getElementById('close-modal');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.getAttribute('data-img');
        modalImg.src = imgSrc;
        modal.classList.remove('hidden');
        // Small delay to allow display:flex to apply before changing opacity for smooth transition
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modalImg.classList.remove('scale-95');
        }, 10);
    });
});

closeModal.addEventListener('click', closeGalleryModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeGalleryModal();
    }
});

function closeGalleryModal() {
    modal.classList.add('opacity-0');
    modalImg.classList.add('scale-95');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

// Reservation WhatsApp Submit
const form = document.getElementById('reservation-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('res-name').value;
    const phone = document.getElementById('res-phone').value;
    const date = document.getElementById('res-date').value;
    const time = document.getElementById('res-time').value;
    const guests = document.getElementById('res-guests').value;
    
    if (!name || !phone || !date || !time) {
        alert('Please fill out all fields before submitting.');
        return;
    }
    
    const message = `*New Reservation Request*\nName: ${name}\nPhone: ${phone}\nDate: ${date}\nTime: ${time}\nGuests: ${guests}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "919348779657"; // Extracted from data.ts
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
});

// Expandable Menu and Search Logic
document.addEventListener('DOMContentLoaded', () => {
    const menuGrid = document.getElementById('menu-grid');
    if (menuGrid) {
        const categories = menuGrid.querySelectorAll('.bg-brand-bg\\/50');
        
        categories.forEach(category => {
            category.classList.remove('hover:-translate-y-1');
            const header = category.querySelector('h3');
            const content = category.querySelector('.space-y-6');
            
            // Setup accordion structure
            header.classList.add('cursor-pointer', 'select-none', 'transition-colors', 'hover:text-red-800');
            header.innerHTML += '<i data-lucide="chevron-down" class="w-6 h-6 transition-transform duration-300"></i>';
            
            // Hide by default unless we want them open
            content.classList.add('hidden');
            
            header.addEventListener('click', () => {
                const isHidden = content.classList.contains('hidden');
                const icon = header.querySelector('svg');
                if (isHidden) {
                    content.classList.remove('hidden');
                    if (icon) icon.style.transform = 'rotate(180deg)';
                    header.classList.replace('mb-8', 'mb-6');
                } else {
                    content.classList.add('hidden');
                    if (icon) icon.style.transform = 'rotate(0deg)';
                    header.classList.replace('mb-6', 'mb-8');
                }
            });
        });
        
        // Re-initialize Lucide icons for the newly added chevrons
        lucide.createIcons();

        // Search functionality
        const searchInput = document.getElementById('menu-search');
        const clearBtn = document.getElementById('clear-search');
        
        if (searchInput && clearBtn) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase().trim();
                
                if (query.length > 0) {
                    clearBtn.style.display = 'block';
                } else {
                    clearBtn.style.display = 'none';
                }
                
                categories.forEach(category => {
                    let categoryMatches = false;
                    const items = category.querySelectorAll('.group'); // Each item is wrapped in .group
                    const header = category.querySelector('h3');
                    const content = category.querySelector('.space-y-6');
                    const icon = header.querySelector('svg');
                    
                    // Check category title
                    const titleMatch = header.textContent.toLowerCase().includes(query);
                    
                    items.forEach(item => {
                        const itemNameElement = item.querySelector('h4');
                        if (!itemNameElement) return;
                        const itemName = itemNameElement.textContent.toLowerCase();
                        if (itemName.includes(query) || titleMatch) {
                            item.style.display = '';
                            categoryMatches = true;
                        } else {
                            item.style.display = 'none';
                        }
                    });
                    
                    if (categoryMatches) {
                        category.style.display = '';
                        // Auto-expand if searching and not empty query
                        if (query.length > 0) {
                            content.classList.remove('hidden');
                            if (icon) icon.style.transform = 'rotate(180deg)';
                            header.classList.replace('mb-8', 'mb-6');
                        } else {
                            // Collapse when search cleared
                            content.classList.add('hidden');
                            if (icon) icon.style.transform = 'rotate(0deg)';
                            header.classList.replace('mb-6', 'mb-8');
                        }
                    } else {
                        category.style.display = 'none';
                    }
                });
            });
            
            clearBtn.addEventListener('click', () => {
                searchInput.value = '';
                searchInput.dispatchEvent(new Event('input'));
            });
        }
    }
});
