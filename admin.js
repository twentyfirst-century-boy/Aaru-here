function addDrama() {
  const title = document.getElementById("title").value.trim();
  const category = document.getElementById("category").value.trim();
  const rating = document.getElementById("rating").value;
  const year = document.getElementById("year").value;
  const episodes = document.getElementById("episodes").value;
  const image = document.getElementById("image").value.trim();
  const genre = document.getElementById("genre").value.trim();
  const status = document.getElementById("status").value.trim();
  const desc = document.getElementById("desc").value.trim();
  const about = document.getElementById("about").value.trim();

  // Validation
  if (!title || !category || !rating || !image || !desc) {
    alert("Please fill all required fields!");
    return;
  }

  if (rating < 1 || rating > 10) {
    alert("Rating must be between 1-10!");
    return;
  }

  let dramas = JSON.parse(localStorage.getItem("dramas")) || [];

  const newDrama = {
    id: Date.now(),
    title,
    category,
    rating,
    year,
    episodes,
    image,
    genre,
    status,
    description: desc,
    about,
    favorites: false,
    watchHistory: false
  };

  dramas.push(newDrama);
  localStorage.setItem("dramas", JSON.stringify(dramas));

  alert("Drama Added Successfully! ✅");
  
  // Reset form
  document.getElementById("addForm").reset();
  
  window.location.reload();
}