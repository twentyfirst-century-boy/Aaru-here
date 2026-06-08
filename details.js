const items = JSON.parse(localStorage.getItem('genzhub_items') || '[]');
const id = new URLSearchParams(location.search).get('id');
const item = items.find(x => String(x.id) === id) || items[0];

const el = document.getElementById('detail');

el.innerHTML = item ? `
  <div class="detail-wrap" style="display:grid;grid-template-columns:minmax(220px,320px) 1fr;gap:18px;align-items:start">
    <img src="${item.poster || 'https://via.placeholder.com/600x800?text=Gen+Z+Hub'}" alt="${item.title}" style="width:100%;border-radius:22px;object-fit:cover" />
    <div>
      <h1 style="margin-top:0;font-family:Orbitron,sans-serif">${item.title}</h1>
      <p>${item.year} • ${item.genre} • ${item.rating}★ • ${item.language || ''} • ${item.quality || ''}</p>
      <p><b>Stars:</b> ${item.stars || '-'}</p>
      <p><b>Status:</b> ${item.status}</p>
      <p>
        <a class="primary-btn" href="${item.watchLink || '#'}" target="_blank" rel="noreferrer">Watch Link</a>
        <a class="ghost-btn" href="${item.trailer || '#'}" target="_blank" rel="noreferrer">Trailer</a>
      </p>
    </div>
  </div>
  <div style="margin-top:18px;position:relative;padding-top:56.25%">
    <iframe src="${item.trailer || 'https://www.youtube.com/embed/ScMzIvxBSi4'}" style="position:absolute;inset:0;width:100%;height:100%;border:0;border-radius:20px" allowfullscreen></iframe>
  </div>
` : '<p>No drama found.</p>';