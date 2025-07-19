// Sample blog posts data (similar to what's in your database)
const blogPosts = [
    {
        id: 1,
        title: "The Art of Modern Web Design",
        excerpt: "Exploring the principles and practices that define modern web design, from clean aesthetics to user-centered experiences.",
        content: "Modern web design has evolved significantly over the past decade...",
        imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Design",
        author: "Diya Saha",
        publishDate: "Dec 15, 2024",
        readTime: "5 min read",
        featured: true,
        views: 1250
    },
    {
        id: 2,
        title: "Work This To Change How You Approach Development",
        excerpt: "A comprehensive guide to transforming your development workflow with modern tools and practices.",
        content: "Development practices continue to evolve...",
        imageUrl: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Development",
        author: "Diya Saha",
        publishDate: "Dec 12, 2024",
        readTime: "8 min read",
        featured: true,
        views: 980
    },
    {
        id: 3,
        title: "Building Responsive Layouts with CSS Grid",
        excerpt: "Master the power of CSS Grid to create flexible, responsive layouts that work across all devices.",
        content: "CSS Grid has revolutionized how we approach web layouts...",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "CSS",
        author: "Diya Saha",
        publishDate: "Dec 10, 2024",
        readTime: "6 min read",
        featured: false,
        views: 750
    },
    {
        id: 4,
        title: "One Simple Word To Improve Your Code Quality",
        excerpt: "Discover the single most important principle that can dramatically improve your code quality and maintainability.",
        content: "Quality code is the foundation of successful projects...",
        imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Best Practices",
        author: "Diya Saha",
        publishDate: "Dec 8, 2024",
        readTime: "4 min read",
        featured: false,
        views: 1420
    },
    {
        id: 5,
        title: "JavaScript ES6+ Features Every Developer Should Know",
        excerpt: "A comprehensive overview of modern JavaScript features that will make your code cleaner and more efficient.",
        content: "JavaScript continues to evolve with each new ECMAScript release...",
        imageUrl: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "JavaScript",
        author: "Diya Saha",
        publishDate: "Dec 5, 2024",
        readTime: "7 min read",
        featured: false,
        views: 890
    },
    {
        id: 6,
        title: "The Future of Web Development",
        excerpt: "Exploring upcoming trends and technologies that will shape the future of web development.",
        content: "The web development landscape is constantly evolving...",
        imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Trends",
        author: "Diya Saha",
        publishDate: "Dec 3, 2024",
        readTime: "9 min read",
        featured: true,
        views: 1100
    }
];

// Application State
let currentPage = 'home';
let searchQuery = '';
let searchResults = [];

// DOM Elements
const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');
const pageTitle = document.querySelector('.page-title');
const pageDescription = document.querySelector('.page-description');
const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearch');
const searchResultsContainer = document.getElementById('searchResults');
const blogGrid = document.getElementById('blogGrid');
const allBlogGrid = document.getElementById('allBlogGrid');
const popularPostsContainer = document.getElementById('popularPosts');
const recentPostsContainer = document.getElementById('recentPosts');
const blogPopularPosts = document.getElementById('blogPopularPosts');
const blogRecentPosts = document.getElementById('blogRecentPosts');
const contactForm = document.getElementById('contactForm');

// Page Configuration
const pageConfig = {
    home: {
        title: 'Home',
        description: 'Welcome to our creative space'
    },
    blog: {
        title: 'Blog',
        description: 'All our stories and insights'
    },
    stories: {
        title: 'Stories',
        description: 'Featured stories and experiences'
    },
    portfolio: {
        title: 'Portfolio',
        description: 'My creative works and projects'
    },
    about: {
        title: 'About',
        description: 'Get to know more about me'
    },
    contact: {
        title: 'Contact Us',
        description: 'Let\'s connect and collaborate'
    }
};

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeLucide();
    setupEventListeners();
    loadInitialContent();
    showPage('home');
});

// Initialize Lucide icons
function initializeLucide() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Setup event listeners
function setupEventListeners() {
    // Navigation
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            showPage(page);
        });
    });

    // Search functionality
    searchInput.addEventListener('input', function() {
        searchQuery = this.value;
        if (searchQuery.length > 2) {
            performSearch();
            showSearchResults();
        } else {
            hideSearchResults();
        }
        
        clearSearchBtn.style.display = searchQuery ? 'block' : 'none';
    });

    clearSearchBtn.addEventListener('click', function() {
        searchInput.value = '';
        searchQuery = '';
        hideSearchResults();
        clearSearchBtn.style.display = 'none';
    });

    // Contact form
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactFormSubmit();
        });
    }

    // Close search results when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-container')) {
            hideSearchResults();
        }
    });
}

// Show page function
function showPage(pageName) {
    // Update navigation
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-page') === pageName) {
            item.classList.add('active');
        }
    });

    // Update pages
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    const targetPage = document.getElementById(`${pageName}Page`);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Update header
    const config = pageConfig[pageName];
    if (config) {
        pageTitle.textContent = config.title;
        pageDescription.textContent = config.description;
    }

    // Update current page
    currentPage = pageName;

    // Load page-specific content
    loadPageContent(pageName);
}

// Load page content
function loadPageContent(pageName) {
    switch (pageName) {
        case 'home':
            loadHomePage();
            break;
        case 'blog':
            loadBlogPage();
            break;
        case 'stories':
            loadStoriesPage();
            break;
        default:
            break;
    }
}

// Load initial content
function loadInitialContent() {
    loadPopularPosts();
    loadRecentPosts();
}

// Load home page
function loadHomePage() {
    const featuredPosts = blogPosts.filter(post => post.featured);
    displayBlogPosts(featuredPosts, blogGrid);
}

// Load blog page
function loadBlogPage() {
    displayBlogPosts(blogPosts, allBlogGrid);
    loadPopularPosts(blogPopularPosts);
    loadRecentPosts(blogRecentPosts);
}

// Load stories page
function loadStoriesPage() {
    const featuredPosts = blogPosts.filter(post => post.featured);
    const storiesGrid = document.querySelector('#storiesPage .blog-grid');
    if (storiesGrid) {
        displayBlogPosts(featuredPosts, storiesGrid);
    }
}

// Display blog posts
function displayBlogPosts(posts, container) {
    if (!container) return;
    
    if (posts.length === 0) {
        container.innerHTML = '<div class="loading">No posts found.</div>';
        return;
    }

    const postsHTML = posts.map(post => createBlogCardHTML(post)).join('');
    container.innerHTML = postsHTML;
}

// Create blog card HTML
function createBlogCardHTML(post) {
    return `
        <article class="blog-card" data-post-id="${post.id}">
            <img src="${post.imageUrl}" alt="${post.title}" class="blog-card-image" loading="lazy">
            <div class="blog-card-content">
                <span class="blog-card-category">${post.category}</span>
                <h3 class="blog-card-title">${post.title}</h3>
                <p class="blog-card-excerpt">${post.excerpt}</p>
                <div class="blog-card-meta">
                    <div class="blog-card-author">
                        <div class="blog-card-avatar"></div>
                        <span>${post.author}</span>
                    </div>
                    <div class="blog-card-details">
                        <span>${post.publishDate}</span>
                        <span>•</span>
                        <span>${post.readTime}</span>
                    </div>
                </div>
            </div>
        </article>
    `;
}

// Load popular posts
function loadPopularPosts(container = popularPostsContainer) {
    if (!container) return;
    
    const popular = [...blogPosts].sort((a, b) => b.views - a.views).slice(0, 5);
    const popularHTML = popular.map(post => `
        <div class="popular-post-item" data-post-id="${post.id}">
            <img src="${post.imageUrl}" alt="${post.title}" class="popular-post-image" loading="lazy">
            <div class="popular-post-content">
                <h4 class="popular-post-title">${post.title}</h4>
                <p class="popular-post-date">${post.publishDate}</p>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = popularHTML;
}

// Load recent posts
function loadRecentPosts(container = recentPostsContainer) {
    if (!container) return;
    
    const recent = [...blogPosts].slice(0, 3);
    const recentHTML = recent.map((post, index) => `
        <div class="recent-post-item" data-post-id="${post.id}">
            <h4 class="recent-post-title">${post.title}</h4>
            <p class="recent-post-date">${post.publishDate}</p>
        </div>
    `).join('');
    
    container.innerHTML = recentHTML;
}

// Search functionality
function performSearch() {
    const query = searchQuery.toLowerCase();
    searchResults = blogPosts.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query)
    );
}

function showSearchResults() {
    if (searchResults.length === 0) {
        searchResultsContainer.innerHTML = `
            <div class="p-4 text-center text-secondary">
                No results found for "${searchQuery}"
            </div>
        `;
    } else {
        const resultsHTML = `
            <div class="py-2">
                <div class="px-4 py-2 text-sm font-medium text-secondary border-b border-gray">
                    Found ${searchResults.length} result${searchResults.length > 1 ? 's' : ''}
                </div>
                ${searchResults.map(post => `
                    <div class="search-result-item" data-post-id="${post.id}">
                        <div class="font-medium text-primary">${post.title}</div>
                        <div class="text-sm text-secondary mt-1">${post.excerpt}</div>
                        <div class="text-xs text-secondary mt-1">
                            ${post.category} • ${post.publishDate}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        searchResultsContainer.innerHTML = resultsHTML;
    }
    
    searchResultsContainer.style.display = 'block';
}

function hideSearchResults() {
    searchResultsContainer.style.display = 'none';
}

// Handle contact form submission
function handleContactFormSubmit() {
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Show loading state
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i data-lucide="loader"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        alert('Thank you for your message! I will get back to you within 24-48 hours.');
        contactForm.reset();
        
        // Restore button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Reinitialize icons
        initializeLucide();
    }, 1500);
}

// Handle post clicks
document.addEventListener('click', function(e) {
    const blogCard = e.target.closest('.blog-card, .popular-post-item, .recent-post-item, .search-result-item');
    if (blogCard) {
        const postId = blogCard.getAttribute('data-post-id');
        const post = blogPosts.find(p => p.id == postId);
        if (post) {
            // Simulate navigation to post detail
            alert(`Opening post: "${post.title}"\n\nIn a real application, this would navigate to the full post page.`);
            hideSearchResults();
        }
    }
});

// Utility functions
function showLoading(container) {
    if (container) {
        container.innerHTML = '<div class="loading">Loading...</div>';
    }
}

function hideLoading() {
    const loadingElements = document.querySelectorAll('.loading');
    loadingElements.forEach(el => el.remove());
}

// Handle responsive menu (for mobile)
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('mobile-open');
}

// Add smooth scrolling
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Initialize tooltips and other UI enhancements
function initializeUIEnhancements() {
    // Add hover effects
    document.addEventListener('mouseover', function(e) {
        if (e.target.closest('.blog-card')) {
            e.target.closest('.blog-card').style.transform = 'translateY(-4px)';
        }
    });
    
    document.addEventListener('mouseout', function(e) {
        if (e.target.closest('.blog-card')) {
            e.target.closest('.blog-card').style.transform = 'translateY(0)';
        }
    });
}

// Call UI enhancements after DOM load
document.addEventListener('DOMContentLoaded', function() {
    initializeUIEnhancements();
});

// Handle keyboard navigation
document.addEventListener('keydown', function(e) {
    // Escape key closes search results
    if (e.key === 'Escape') {
        hideSearchResults();
    }
    
    // Enter key in search performs search
    if (e.key === 'Enter' && e.target === searchInput) {
        if (searchResults.length > 0) {
            // Focus first result
            const firstResult = document.querySelector('.search-result-item');
            if (firstResult) {
                firstResult.click();
            }
        }
    }
});

// Performance optimization - Lazy load images
function setupLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
    // You could show a user-friendly error message here
});

// Service Worker registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment to register service worker
        // navigator.serviceWorker.register('/sw.js');
    });
}