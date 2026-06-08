// Drama data storage (using localStorage)
let dramas = JSON.parse(localStorage.getItem('genZHubDramas')) || [];
let currentFilter = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderDramas();
});

// Render dramas
function renderDramas() {
    const grid = document.getElementById('dramaGrid');
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    // Filter dramas
    let filteredDramas = dramas.filter(drama => {
        // Search filter
        const matchesSearch = drama.title.toLowerCase().includes(searchTerm);
        
        // Category filter
        let matchesCategory = true;
        if (currentFilter !== 'all') {
            if (currentFilter === 'movies') matchesCategory = drama.type === 'movie';
            else if (currentFilter === 'series') matchesCategory = drama.type === 'series';
            else matchesCategory = drama.status === currentFilter;
        }
        
        return matchesSearch && matchesCategory;
    });
    
    if (filteredDramas.length === 0) {
        grid.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 2rem;">No dramas found. Add your first drama!</p>';
        return;
    }
    
    grid.innerHTML = filteredDramas.map(drama => `
        <div class="drama-card" onclick="showDramaDetails(${drama.id})">
            <div class="drama-poster">
                <img src="${drama.poster || 'https://via.placeholder.com/400x600?text=No+Poster'}" alt="${drama.title}">
                ${drama.status !== 'planned' ? `<div class="status-badge">${drama.status}</div>` : ''}
            </div>
            <div class="drama-info">
                <h3 class="drama-title">${drama.title}</h3>
                <div class="drama-meta">
                    <span class="meta-item">${drama.year}</span>
                    <span class="meta-item">${drama.genre}</span>
                    ${drama.rating ? `<span class="meta-item rating-star">⭐ ${drama.rating}</span>` : ''}
                    <span class="meta-item">${drama.type === 'movie' ? 'Movie' : 'Series'}</span>
                </div>
                <div class="drama-actions">
                    <button class="btn-small btn-watch" onclick="event.stopPropagation(); openWatchLink(${drama.id})">Watch</button>
                    <button class="btn-small btn-delete" onclick="event.stopPropagation(); deleteDrama(${drama.id})">Delete</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Add drama
function addDrama(event) {
    event.preventDefault();
    
    const formData = {
        id: Date.now(),
        title: document.getElementById('title').value,
        poster: document.getElementById('poster').value,
        year: document.getElementById('year').value,
        genre: document.getElementById('genre').value,
        rating: document.getElementById('rating').value,
        stars: document.getElementById('stars').value,
        language: document.getElementById('language').value,
        quality: document.getElementById('quality').value,
        watchLink: document.getElementById('watchLink').value,
        trailerLink: document.getElementById('trailerLink').value,
        type: document.getElementById('type').value,
        status: document.getElementById('status').value
    };
    
    dramas.push(formData);
    localStorage.setItem('genZHubDramas', JSON.stringify(dramas));
    
    hideAddForm();
    renderDramas();
    
    // Reset form
    document.getElementById('addDramaForm').reset();
}

// Delete drama
function deleteDrama(id) {
    if (!confirm('Delete this drama from your list?')) return;
    
    dramas = dramas.filter(drama => drama.id !== id);
    localStorage.setItem('genZHubDramas', JSON.stringify(dramas));
    renderDramas();
}

// Open watch link
function openWatchLink(id) {
    const drama = dramas.find(d => d.id === id);
    if (drama && drama.watchLink) {
        window.open(drama.watchLink, '_blank');
    } else {
        alert('No watch link available for this drama.');
    }
}

// Filter by category
function filterBy(category) {
    currentFilter = category;
    
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.textContent.toLowerCase().includes(category) || 
            (category === 'all' && tab.textContent === 'All')) {
            tab.classList.add('active');
        }
    });
    
    renderDramas();
}

// Search dramas
function searchDramas() {
    renderDramas();
}

// Show add form
function showAddForm() {
    document.getElementById('addFormModal').classList.add('active');
}

// Hide add form
function hideAddForm() {
    document.getElementById('addFormModal').classList.remove('active');
}

// Show drama details
function showDramaDetails(id) {
    const drama = dramas.find(d => d.id === id);
    if (!drama) return;
    
    const trailerEmbed = drama.trailerLink 
        ? drama.trailerLink.replace('watch?v=', 'embed/')
        : null;
    
    const detailsHTML = `
        <div class="details-poster">
            <img src="${drama.poster || 'https://via.placeholder.com/800x1200?text=No+Poster'}" alt="${drama.title}">
        </div>
        <div class="details-info">
            <h2 class="details-title">${drama.title}</h2>
            
            <div class="details-meta">
                <div class="meta-detail">
                    <div class="meta-detail-label">Year</div>
                    <div class="meta-detail-value">${drama.year}</div>
                </div>
                <div class="meta-detail">
                    <div class="meta-detail-label">Genre</div>
                    <div class="meta-detail-value">${drama.genre}</div>
                </div>
                <div class="meta-detail">
                    <div class="meta-detail-label">Rating</div>
                    <div class="meta-detail-value">⭐ ${drama.rating || 'N/A'}</div>
                </div>
                <div class="meta-detail">
                    <div class="meta-detail-label">Type</div>
                    <div class="meta-detail-value">${drama.type === 'movie' ? 'Movie' : 'Web Series'}</div>
                </div>
                ${drama.stars ? `
                <div class="meta-detail">
                    <div class="meta-detail-label">Stars</div>
                    <div class="meta-detail-value">${drama.stars}</div>
                </div>
                ` : ''}
                ${drama.language ? `
                <div class="meta-detail">
                    <div class="meta-detail-label">Language</div>
                    <div class="meta-detail-value">${drama.language}</div>
                </div>
                ` : ''}
                ${drama.quality ? `
                <div class="meta-detail">
                    <div class="meta-detail-label">Quality</div>
                    <div class="meta-detail-value">${drama.quality}</div>
                </div>
                ` : ''}
                <div class="meta-detail">
                    <div class="meta-detail-label">Status</div>
                    <div class="meta-detail-value">${drama.status}</div>
                </div>
            </div>
            
            ${trailerEmbed ? `
            <div class="trailer-section">
                <h4>Trailer</h4>
                <div class="trailer-container">
                    <iframe src="${trailerEmbed}" frameborder="0" allowfullscreen></iframe>
                </div>
            </div>
            ` : ''}
            
            <div class="details-actions">
                ${drama.watchLink ? `
                <button class="btn-primary" onclick="openWatchLink(${drama.id})">
                    Watch Now
                </button>
                ` : ''}
                <button class="btn-small btn-delete" onclick="deleteDrama(${drama.id})">
                    Delete from List
                </button>
            </div>
        </div>
    `;
    
    document.getElementById('dramaDetails').innerHTML = detailsHTML;
    document.getElementById('dramaDetailsModal').classList.add('active');
}

// Hide drama details
function hideDramaDetails() {
    document.getElementById('dramaDetailsModal').classList.remove('active');
}

// Close modal on outside click
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});