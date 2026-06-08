const dramaGrid = document.querySelector(".grid");

let dramas =
JSON.parse(localStorage.getItem("genzhub")) || [];

function saveData() {
localStorage.setItem(
"genzhub",
JSON.stringify(dramas)
);
}

function renderDramas(data = dramas) {

dramaGrid.innerHTML = "";

data.forEach((drama,index)=>{

dramaGrid.innerHTML += `

<div class="card">

<div class="poster">

<img src="${drama.poster}">

<div class="badge rating-badge">
⭐ ${drama.rating}
</div>

<div class="badge quality">
${drama.quality}
</div>

<div class="badge lang">
${drama.language}
</div>

</div>

<h3>${drama.title}</h3>

<div class="meta">
<span>${drama.year}</span>

<span class="pill">
${drama.status}
</span>
</div>

<p style="margin-top:8px;">
🎭 ${drama.genre}
</p>

<div class="actions">

<button onclick="toggleStatus(${index})">
👀
</button>

<button onclick="toggleFavorite(${index})">
❤️
</button>

<button onclick="deleteDrama(${index})">
🗑️
</button>

</div>

</div>

`;
});

updateStats();
}

function addDrama(drama){

dramas.unshift(drama);

saveData();

renderDramas();
}

function saveDrama(){

const drama = {

title:
document.getElementById("title").value,

poster:
document.getElementById("poster").value,

genre:
document.getElementById("genre").value,

rating:
document.getElementById("rating").value,

year:
document.getElementById("year").value,

language:
document.getElementById("language").value,

quality:
document.getElementById("quality").value,

watch:
document.getElementById("watch").value,

trailer:
document.getElementById("trailer").value,

type:
document.getElementById("type").value,

status:"Watching",

favorite:false

};

addDrama(drama);

document.getElementById(
"addModal"
).style.display="none";

}

function deleteDrama(index){

if(confirm("Delete Drama?")){

dramas.splice(index,1);

saveData();

renderDramas();

}
}

function toggleStatus(index){

dramas[index].status =
dramas[index].status === "Watching"
?
"Watched"
:
"Watching";

saveData();

renderDramas();
}

function toggleFavorite(index){

dramas[index].favorite =
!dramas[index].favorite;

saveData();

renderDramas();
}

function showFavorites(){

const favs =
dramas.filter(
d => d.favorite
);

renderDramas(favs);
}

function showWatching(){

const watching =
dramas.filter(
d => d.status === "Watching"
);

renderDramas(watching);
}

function showWatched(){

const watched =
dramas.filter(
d => d.status === "Watched"
);

renderDramas(watched);
}

function showAll(){
renderDramas();
}

function filterType(type){

const filtered =
dramas.filter(
d => d.type === type
);

renderDramas(filtered);
}

function openMenu(){

document
.getElementById("sidebar")
.classList.add("show");

}

function closeMenu(){

document
.getElementById("sidebar")
.classList.remove("show");

}

function openModal(){

document
.getElementById("addModal")
.style.display="flex";

}

function updateStats(){

const total =
document.getElementById(
"totalDramas"
);

const watching =
document.getElementById(
"watchingCount"
);

const watched =
document.getElementById(
"watchedCount"
);

if(total)
total.innerText = dramas.length;

if(watching)
watching.innerText =
dramas.filter(
d=>d.status==="Watching"
).length;

if(watched)
watched.innerText =
dramas.filter(
d=>d.status==="Watched"
).length;
}

const searchInput =
document.querySelector(
".search-box input"
);

if(searchInput){

searchInput.addEventListener(
"input",
(e)=>{

const keyword =
e.target.value.toLowerCase();

const filtered =
dramas.filter(
drama =>
drama.title
.toLowerCase()
.includes(keyword)
);

renderDramas(filtered);

});

}

renderDramas();