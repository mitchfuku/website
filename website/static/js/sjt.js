var menuOpener = document.getElementById("menu-opener");
var menuContent = document.getElementById("menu-content");
var mainContent  = document.getElementById("main-content");
var nav  = document.getElementById("nav");

menuOpener.addEventListener('click', function() {
  menuContent.classList.toggle('menu-open');
  mainContent.classList.toggle('menu-open');
  nav.classList.toggle('menu-open');
});

mainContent.addEventListener('click', function() {
  menuContent.classList.remove('menu-open');
  mainContent.classList.remove('menu-open');
  nav.classList.remove('menu-open');
});
