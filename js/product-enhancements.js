// ==========================================================================
// PRODUCT CARDS ENHANCEMENT
// ==========================================================================

function enhanceProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    const categoryIcons = {
        'spices': 'fas fa-pepper-hot',
        'fruits': 'fas fa-apple-alt',
        'vegetables': 'fas fa-carrot',
        'dehydrated': 'fas fa-leaf',
        'oilseeds': 'fas fa-seedling',
        'raisins': 'fas fa-grape-cluster',
        'herbs': 'fas fa-spa',
        'roasted': 'fas fa-fire',
        'healthy-grains': 'fas fa-wheat',
        'other': 'fas fa-cube'
    };
    
    productCards.forEach((card, index) => {
        try {
            const category = card.getAttribute('data-category');
            const titleElement = card.querySelector('.product-title');
            
            if (titleElement && category) {
                // Add icon to title
                const iconClass = categoryIcons[category] || categoryIcons['other'];
                const icon = document.createElement('i');
                icon.className = iconClass;
                
                // Insert icon at the beginning of the title
                titleElement.insertBefore(icon, titleElement.firstChild);
                
                // Add animation delay based on index
                card.style.animationDelay = `${(index % 8) * 0.1}s`;
                
                // Add intersection observer for scroll animations
                if ('IntersectionObserver' in window) {
                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                entry.target.style.opacity = '1';
                                entry.target.style.transform = 'translateY(0)';
                                observer.unobserve(entry.target);
                            }
                        });
                    }, {
                        threshold: 0.1,
                        rootMargin: '0px 0px -50px 0px'
                    });
                    
                    observer.observe(card);
                }
                
                // Add hover effect for product overlay
                const productImage = card.querySelector('.product-image');
                const productOverlay = card.querySelector('.product-overlay');
                
                if (productImage && !productOverlay) {
                    // Create overlay if it doesn't exist
                    const overlay = document.createElement('div');
                    overlay.className = 'product-overlay';
                    
                    const viewBtn = document.createElement('button');
                    viewBtn.className = 'product-view-btn';
                    viewBtn.innerHTML = '<i class="fas fa-eye"></i>';
                    viewBtn.onclick = () => openProductModal(titleElement.textContent.trim());
                    
                    overlay.appendChild(viewBtn);
                    productImage.appendChild(overlay);
                }
            }
        } catch (error) {
            console.warn('Error enhancing product card:', error);
        }
    });
    
    // Add stagger animation for visible cards
    setTimeout(() => {
        const visibleCards = document.querySelectorAll('.product-card');
        visibleCards.forEach((card, index) => {
            if (index < 12) { // First 12 visible cards
                card.classList.add('animate-in');
            }
        });
    }, 100);
}

// Add CSS classes dynamically for enhanced animations
function addDynamicStyles() {
    if (document.getElementById('dynamic-product-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'dynamic-product-styles';
    style.textContent = `
        .products-section .product-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .products-section .product-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .product-title i {
            margin-right: 0.5rem;
            color: var(--primary-green);
            font-size: 1.1rem;
            transition: all 0.3s ease;
        }
        
        .product-card:hover .product-title i {
            transform: scale(1.2) rotate(10deg);
            color: var(--accent-emerald);
        }
        
        @media (max-width: 768px) {
            .product-title i {
                font-size: 1rem;
                margin-right: 0.25rem;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Initialize dynamic styles when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addDynamicStyles);
} else {
    addDynamicStyles();
}