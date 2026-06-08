const container = document.getElementById("details");
const topBtn = document.getElementById("topBtn");

const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

let stored = JSON.parse(localStorage.getItem("dramas"));
const dramas = stored && stored.length ? stored : window.dramas;

const item = dramas.find(d => d.id === id);

if (!item) {
  container.innerHTML = "<h2 style='text-align:center; margin-top:50px;'>Drama not found 😔</h2>";
} else {
  const isFavorite = item.favorites || false;
  
  container.innerHTML = `
  <div class="details-page">
    <div class="details-container">
      <div class="details-left">
        <img src="${item.image}" 
          onerror="this.src='https://via.placeholder.com/350x600?text=No+Image'"
          alt="${item.title}">
      </div>
      
      <div class="details-right">
        <h1>${item.title}</h1>
        
        <div class="details-meta">
          <span class="details-badge">${item.category}</span>
          <span class="details-badge">⭐ ${item.rating}</span>
          <span class="details-badge">${item.year}</span>
          <span class="details-badge">${item.status}</span>
        </div>
        
        <p><b>Genre:</b> ${item.genre}</p>
        <p><b>Episodes:</b> ${item.episodes}</p>
        
        <div style="margin: 20px 0;">
          <button class="like-btn ${isFavorite ? 'active' : ''}" 
            onclick="toggleFavorite(${item.id})" style="padding: 12px 24px; margin-right: 10px;">
            <i class="fa-solid fa-${isFavorite ? 'heart' : 'heart'}"></i> 
            ${isFavorite ? 'Favorite' : 'Add to Favorites'}
          </button>
          <button class="watch-btn" 
            onclick="addToWatchlist(${item.id})" style="padding: 12px 24px;">
            <i class="fa-solid fa-play"></i> Watch Now
          </button>
        </div>
        
        <div class="desc-box">
          <h3>📝 Description</h3>
          <p>${item.description}</p>
        </div>
        
        <div class="desc-box">
          <h3>🎬 About</h3>
          <p>${item.about}</p>
        </div>
        
        <a href="index.html" class="back-btn">
          <i class="fa-solid fa-arrow-left"></i> Back to Home
        </a>
      </div>
    </div>
  </div>
  `;
}

function toggleFavorite(id) {
  let dramas = JSON.parse(localStorage.getItem("dramas")) || [];
  const item = dramas.find(d => d.id === id);
  
  if (item) {
    item.favorites = !item.favorites;
    localStorage.setItem("dramas", JSON.stringify(dramas));
    location.reload();
  }
}

function addToWatchlist(id) {
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  
  if (!watchlist.includes(id)) {
    watchlist.push(id);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    alert("Added to Watchlist! ▶️");
  } else {
    alert("Already in Watchlist!");
  }
}

// Back to top
window.addEventListener("scroll", () => {
  topBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});