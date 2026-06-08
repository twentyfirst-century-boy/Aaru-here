const params =
new URLSearchParams(
window.location.search
);

const id = params.get("id");

const dramas =
JSON.parse(
localStorage.getItem("genzhub")
);

const drama = dramas[id];

document.getElementById(
"detailsPage"
).innerHTML = `

<div class="details-container">

<img
class="details-poster"
src="${drama.poster}"
>

<h1>${drama.title}</h1>

<div class="detail-tags">

<span>
⭐ ${drama.rating}
</span>

<span>
${drama.genre}
</span>

<span>
${drama.year}
</span>

</div>

<div class="info">

<p>
<b>Language:</b>
${drama.language}
</p>

<p>
<b>Quality:</b>
${drama.quality}
</p>

<p>
<b>Status:</b>
${drama.status}
</p>

</div>

<a
class="watch-link"
href="${drama.watch}"
target="_blank">

▶ Watch Now

</a>

<div class="trailer">

<iframe
width="100%"
height="250"
src="${drama.trailer}"
allowfullscreen>
</iframe>

</div>

</div>

`;