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
