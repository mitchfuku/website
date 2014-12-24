var menuOpener = document.getElementById("menu-opener");
var menuContent = document.getElementById("menu-content");
var mainContent  = document.getElementById("main-content");
var menuOpenClass = 'menu-open';

menuOpener.addEventListener('click', function() {
  menuOpener.classList.toggle(menuOpenClass);
  menuContent.classList.toggle(menuOpenClass);
  mainContent.classList.toggle(menuOpenClass);
  document.body.classList.toggle(menuOpenClass);
});
