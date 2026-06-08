window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  if (!loader) return;

  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 300);
  }, 500);
});

/* ===========================
   ELEMENTS
=========================== */
const trendingList = document.getElementById("trendingList");
const latestList = document.getElementById("latestList");
const topList = document.getElementById("topList");
const favoritesList = document.getElementById("favoritesList");
const recommendedList = document.getElementById("recommendedList");

const searchInput = document.getElementById("search");
const filterButtons = document.querySelectorAll(".menu-btn");
const darkModeBtn = document.getElementById("darkModeBtn");
const userProfile = document.getElementById("userProfile");
const topBtn = document.getElementById("topBtn");

let currentFilter = "all";

/* ===========================
   GET DRAMAS FROM LOCALSTORAGE OR DEFAULT
=========================== */
function getDramas() {
  let localStorageDramas = JSON.parse(localStorage.getItem("dramas")) || [];
  
  if (localStorageDramas.length > 0) {
    return localStorageDramas;
  }
  
  return window.dramas || [];
}

/* ===========================
   CARD HTML
=========================== */
function createCard(item) {
  const isFavorite = item.favorites || false;
  
  return `
    <div class="card" onclick="openDetails(${item.id})">
      <img src="${item.image}"
        onerror="this.src='https://via.placeholder.com/300x450?text=No+Image'"
        alt="${item.title}">
      
      <div class="card-content">
        <h3>${item.title}</h3>
        
        <div>
          <span class="rating">⭐ ${item.rating}</span>
          <span class="category">${item.category}</span>
        </div>
        
        <p>${item.description ? item.description.substring(0, 80) : ''}...</p>
        
        <div class="card-actions">
          <button class="like-btn ${isFavorite ? 'active' : ''}" 
            onclick="event.stopPropagation(); toggleFavorite(${item.id})">
            <i class="fa-solid fa-heart"></i>
          </button>
          <button class="watch-btn" 
            onclick="event.stopPropagation(); addToWatchlist(${item.id})">
            <i class="fa-solid fa-play"></i> Watch
          </button>
        </div>
        
        <button onclick="event.stopPropagation(); deleteDrama(${item.id})" class="del-btn">
          🗑 Delete
        </button>
      </div>
    </div>
  `;
}

/* ===========================
   TOGGLE FAVORITE
=========================== */
function toggleFavorite(id) {
  let dramas = JSON.parse(localStorage.getItem("dramas")) || [];
  
  if (dramas.length === 0) {
    dramas = window.dramas || [];
  }
  
  const item = dramas.find(d => d.id === id);
  
  if (item) {
    item.favorites = !item.favorites;
    localStorage.setItem("dramas", JSON.stringify(dramas));
    
    if (item.favorites) {
      showNotification("Added to Favorites! ❤️");
    } else {
      showNotification("Removed from Favorites");
    }
    
    render();
  }
}

/* ===========================
   ADD TO WATCHLIST
=========================== */
function addToWatchlist(id) {
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  
  if (!watchlist.includes(id)) {
    watchlist.push(id);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    showNotification("Added to Watchlist! ▶️");
  } else {
    showNotification("Already in Watchlist!");
  }
}

/* ===========================
   NOTIFICATION SYSTEM
=========================== */
function showNotification(message) {
  const notif = document.getElementById("notification");
  const notifText = document.getElementById("notif-text");
  
  if (notif && notifText) {
    notifText.textContent = message;
    notif.classList.add("show");
    
    setTimeout(() => {
      notif.classList.remove("show");
    }, 3000);
  }
}

/* ===========================
   DARK MODE
=========================== */
if (darkModeBtn) {
  darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    const icon = darkModeBtn.querySelector("i");
    
    if (document.body.classList.contains("light-mode")) {
      icon.className = "fa-solid fa-sun";
      showNotification("Light Mode Activated!");
    } else {
      icon.className = "fa-solid fa-moon";
      showNotification("Dark Mode Activated!");
    }
  });
}

/* ===========================
   USER PROFILE DROPDOWN
=========================== */
if (userProfile) {
  userProfile.addEventListener("click", () => {
    userProfile.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (!userProfile.contains(e.target)) {
      userProfile.classList.remove("active");
    }
  });
}

/* ===========================
   RENDER
=========================== */
function render() {
  const dramas = getDramas();
  
  if (!trendingList || !latestList || !topList) return;

  if (dramas.length === 0) {
    trendingList.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: #888; padding: 40px;'>No dramas added yet. Use Admin panel to add! ➕</p>";
    latestList.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: #888; padding: 40px;'>No dramas added yet. Use Admin panel to add! ➕</p>";
    topList.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: #888; padding: 40px;'>No dramas added yet. Use Admin panel to add! ➕</p>";
    return;
  }

  let keyword = searchInput.value.toLowerCase();

  let filtered = dramas.filter(item => {
    return (
      item.title && item.title.toLowerCase().includes(keyword) &&
      (currentFilter === "all" || item.category === currentFilter)
    );
  });

  trendingList.innerHTML = "";
  latestList.innerHTML = "";
  topList.innerHTML = "";

  filtered.slice(0, 8).forEach(item => {
    trendingList.innerHTML += createCard(item);
  });

  [...filtered].reverse().slice(0, 8).forEach(item => {
    latestList.innerHTML += createCard(item);
  });

  [...filtered]
    .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
    .slice(0, 8)
    .forEach(item => {
      topList.innerHTML += createCard(item);
    });

  if (favoritesList) {
    favoritesList.innerHTML = "";
    const favorites = filtered.filter(item => item.favorites);
    
    if (favorites.length === 0) {
      favoritesList.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: #888; padding: 40px;'>No favorites yet. Add some! ❤️</p>";
    } else {
      favorites.forEach(item => {
        favoritesList.innerHTML += createCard(item);
      });
    }
  }

  if (recommendedList) {
    recommendedList.innerHTML = "";
    const recommended = [...filtered]
      .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
      .slice(0, 8);
    
    recommended.forEach(item => {
      recommendedList.innerHTML += createCard(item);
    });
  }
}

/* ===========================
   SEARCH & FILTER
=========================== */
if (searchInput) {
  searchInput.addEventListener("input", render);
}

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    render();
    showNotification(`Showing: ${currentFilter === "all" ? "All" : currentFilter}`);
  });
});

/* ===========================
   DETAILS
=========================== */
function openDetails(id) {
  window.location.href = `details.html?id=${id}`;
}

/* ===========================
   DELETE
=========================== */
function deleteDrama(id) {
  let dramas = JSON.parse(localStorage.getItem("dramas")) || [];

  if (dramas.length === 0) {
    dramas = window.dramas || [];
  }

  dramas = dramas.filter(item => item.id !== id);

  localStorage.setItem("dramas", JSON.stringify(dramas));

  showNotification("Drama Deleted! 🗑");

  render();
}

/* ===========================
   SLIDE BUTTONS
=========================== */
document.querySelectorAll(".slide-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const section = btn.dataset.section;
    const container = document.getElementById(section);
    
    if (container) {
      const cards = container.querySelectorAll(".card");
      const cardsArray = Array.from(cards);
      
      if (btn.classList.contains("prev")) {
        cardsArray.forEach(card => {
          card.style.transform = "translateX(-100%)";
          setTimeout(() => {
            card.style.transform = "translateX(0)";
          }, 100);
        });
      } else {
        cardsArray.forEach(card => {
          card.style.transform = "translateX(100%)";
          setTimeout(() => {
            card.style.transform = "translateX(0)";
          }, 100);
        });
      }
    }
  });
});

/* ===========================
   BACK TO TOP
=========================== */
if (topBtn) {
  window.addEventListener("scroll", () => {
    topBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ===========================
   INIT
=========================== */
render();