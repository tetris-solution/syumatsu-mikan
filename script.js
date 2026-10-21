const button = document.querySelector('#details-button');
button.addEventListener('click', () => {
  const expanded = button.getAttribute('aria-expanded') === 'true';
  button.setAttribute('aria-expanded', String(!expanded));
  document.querySelector('#details').hidden = expanded;
  button.querySelector('span').textContent = expanded ? '＋' : '−';
});
document.querySelector('#year').textContent = new Date().getFullYear();
