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

<div class="actions">

<button onclick="toggleStatus(${index})">
👀
</button>

<button onclick="deleteDrama(${index})">
🗑️
</button>

<button onclick="openDetails(${index})">
📖
</button>

</div>

</div>

`;
});

}

function addDrama(drama){

dramas.unshift(drama);

saveData();

renderDramas();

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

function openDetails(index){

window.location.href =
`details.html?id=${index}`;

}

renderDramas();