const demo = [
  {
    id: 1,
    title: 'Stranger Nights',
    year: 2024,
    genre: 'Drama',
    rating: 8.4,
    stars: 'A. Khan',
    language: 'Hindi',
    quality: 'HD',
    poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80',
    watchLink: '#',
    trailer: 'https://www.youtube.com/embed/1A2K1b6d',
    status: 'watching'
  },
  {
    id: 2,
    title: 'Neon Promise',
    year: 2023,
    genre: 'Thriller',
    rating: 7.9,
    stars: 'S. Verma',
    language: 'English',
    quality: 'Full HD',
    poster: 'https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?auto=format&fit=crop&w=600&q=80',
    watchLink: '#',
    trailer: 'https://www.youtube.com/embed/2g811Eo7K8U',
    status: 'watched'
  },
  {
    id: 3,
    title: 'Midnight Notes',
    year: 2025,
    genre: 'Web Series',
    rating: 8.8,
    stars: 'R. Roy',
    language: 'Hindi',
    quality: '4K',
    poster: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=600&q=80',
    watchLink: '#',
    trailer: 'https://www.youtube.com/embed/ScMzIvxBSi4',
    status: 'watching'
  }
];

const key = 'genzhub_items';
const state = { items: JSON.parse(localStorage.getItem(key) || 'null') || demo };

const grid = document.getElementById('dramaGrid');
const tpl = document.getElementById('cardTemplate');
const dialog = document.getElementById('dramaDialog');
const form = document.getElementById('dramaForm');
const search = document.getElementById('searchInput');
const filter = document.getElementById('filterSelect');
const stats = document.getElementById('stats');

const save = () => localStorage.setItem(key, JSON.stringify(state.items));

const getFiltered = () =>
  state.items.filter(i => {
    const q = search.value.toLowerCase();
    const f = filter.value;
    return (
      (!q || [i.title, i.genre, String(i.year), i.language].join(' ').toLowerCase().includes(q)) &&
      (f === 'all' || i.status === f)
    );
  });

function render() {
  const items = getFiltered();

  stats.innerHTML = [
    `Total ${state.items.length}`,
    `Watching ${state.items.filter(i => i.status === 'watching').length}`,
    `Watched ${state.items.filter(i => i.status === 'watched').length}`
  ].map(t => `<div class="stat">${t}</div>`).join('');

  grid.innerHTML = '';

  items.forEach(item => {
    const node = tpl.content.cloneNode(true);
    node.querySelector('.poster').src = item.poster || 'https://via.placeholder.com/600x800?text=Gen+Z+Hub';
    node.querySelector('.poster').alt = item.title;
    node.querySelector('.title').textContent = item.title;
    node.querySelector('.meta').textContent = `${item.genre} • ${item.year} • ${item.language || ''}`;
    node.querySelector('.status-badge').textContent = item.status;
    node.querySelector('.rating-badge').textContent = `★ ${item.rating}`;

    const btns = node.querySelectorAll('button');
    btns[0].textContent = item.status === 'watched' ? 'Mark Watching' : 'Mark Watched';
    btns[0].onclick = () => {
      item.status = item.status === 'watched' ? 'watching' : 'watched';
      save();
      render();
    };

    btns[1].onclick = () => {
      location.href = `details.html?id=${item.id}`;
    };

    btns[2].onclick = () => {
      state.items = state.items.filter(x => x.id !== item.id);
      save();
      render();
    };

    grid.appendChild(node);
  });
}

document.getElementById('addBtn').onclick = () => dialog.showModal();
document.getElementById('cancelBtn').onclick = () => dialog.close();
document.getElementById('themeBtn').onclick = () => document.body.classList.toggle('light');

search.oninput = render;
filter.onchange = render;

form.onsubmit = e => {
  e.preventDefault();
  const fd = new FormData(form);
  const item = {
    id: Date.now(),
    title: fd.get('title'),
    year: +fd.get('year'),
    genre: fd.get('genre'),
    rating: +fd.get('rating'),
    stars: fd.get('stars'),
    language: fd.get('language'),
    quality: fd.get('quality'),
    poster: fd.get('poster'),
    watchLink: fd.get('watchLink'),
    trailer: fd.get('trailer'),
    status: fd.get('status')
  };
  state.items.unshift(item);
  save();
  form.reset();
  form.status.value = 'watching';
  dialog.close();
  render();
};

render();