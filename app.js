let dramas =
JSON.parse(
localStorage.getItem("dramas")
) || [];

function saveData(){
localStorage.setItem(
"dramas",
JSON.stringify(dramas)
);
}

function render(){

const container =
document.getElementById(
"dramaContainer"
);

container.innerHTML="";

dramas.forEach((d,index)=>{

container.innerHTML += `
<div class="card">

<a href="details.html?id=${index}">

<img src="${d.poster}">

<div class="card-content">

<h3>${d.title}</h3>

<p class="genre">${d.genre}</p>

<p>${d.year}</p>

<span class="rating">⭐ ${d.rating}</span>

</div>

</a>

<div class="actions">

<button class="watch-btn"
onclick="toggleWatch(${index})">
${d.status}
</button>

<button class="delete-btn"
onclick="deleteDrama(${index})">
Delete
</button>

</div>

</div>
`;
});
}

function addDrama(){

const drama={
title:title.value,
poster:poster.value,
genre:genre.value,
rating:rating.value,
year:year.value,
language:language.value,
quality:quality.value,
watchLink:watchLink.value,
trailer:trailer.value,
status:"Watching"
};

dramas.push(drama);

saveData();
render();

document.getElementById(
"addModal"
).style.display="none";
}

function deleteDrama(i){
dramas.splice(i,1);
saveData();
render();
}

function toggleWatch(i){

dramas[i].status =
dramas[i].status==="Watching"
?
"Watched"
:
"Watching";

saveData();
render();
}

function openAddModal(){
document.getElementById(
"addModal"
).style.display="block";
}

render();

document
.getElementById("searchInput")
.addEventListener("input",e=>{

let value =
e.target.value.toLowerCase();

document
.querySelectorAll(".card")
.forEach(card=>{

card.style.display =
card.innerText
.toLowerCase()
.includes(value)
?
"block"
:
"none";

});
});