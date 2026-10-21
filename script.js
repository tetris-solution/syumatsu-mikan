const button = document.querySelector('#details-button');
button.addEventListener('click', () => {
  const expanded = button.getAttribute('aria-expanded') === 'true';
  button.setAttribute('aria-expanded', String(!expanded));
  document.querySelector('#details').hidden = expanded;
  button.querySelector('span').textContent = expanded ? '＋' : '−';
});
document.querySelector('#year').textContent = new Date().getFullYear();

// Keep map pins and the companion facility selector in sync.
const placeControls = [...document.querySelectorAll('[data-place]')];
function selectPlace(id) {
  const panel = document.getElementById(`spot-${id}`);
  if (!panel) return;
  placeControls.forEach(control => {
    control.setAttribute('aria-pressed', String(control.dataset.place === id));
  });
  document.querySelectorAll('.spot-panel').forEach(item => {
    item.hidden = item !== panel;
  });
}
placeControls.forEach(control => {
  control.addEventListener('click', () => selectPlace(control.dataset.place));
});

const mapQueries = {
  farm: '和歌山県海南市下津町丸田',
  sakuas: '道の駅 海南サクアス',
  pialand: 'シモツピアーランド',
  hikari: '有田川温泉 光の湯'
};
const realMapFrame = document.querySelector('#real-map iframe');
function updateRealMap(id) {
  if (!mapQueries[id]) return;
  realMapFrame.dataset.src = `https://www.google.com/maps?q=${encodeURIComponent(mapQueries[id])}&output=embed`;
  if (!document.querySelector('#real-map').hidden) {
    realMapFrame.src = realMapFrame.dataset.src;
  }
}
placeControls.forEach(control => {
  control.addEventListener('click', () => updateRealMap(control.dataset.place));
});
document.querySelectorAll('[data-map-view]').forEach(control => {
  control.addEventListener('click', () => {
    const real = control.dataset.mapView === 'real';
    document.querySelector('#real-map').hidden = !real;
    document.querySelector('#illustration-map').hidden = real;
    document.querySelectorAll('[data-map-view]').forEach(item => {
      item.setAttribute('aria-pressed', String(item === control));
    });
    if (real) realMapFrame.src = realMapFrame.dataset.src;
  });
});
