const params =
new URLSearchParams(
window.location.search
);

const id = params.get("id");

const dramas =
JSON.parse(
localStorage.getItem("dramas")
);

const d = dramas[id];

document.getElementById(
"details"
).innerHTML = `

<img
src="${d.poster}"
style="
width:100%;
max-width:350px;
border-radius:20px;
">

<h1>${d.title}</h1>

<p>⭐ Rating: ${d.rating}</p>
<p>🎭 Genre: ${d.genre}</p>
<p>📅 Year: ${d.year}</p>
<p>🌎 Language: ${d.language}</p>
<p>🎬 Quality: ${d.quality}</p>

<a href="${d.watchLink}" target="_blank">
Watch Now
</a>

<h2>Trailer</h2>

<iframe
width="100%"
height="300"
src="${d.trailer.replace("watch?v=","embed/")}"
allowfullscreen>
</iframe>

`;