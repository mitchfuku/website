$(document).ready(function() {
  var scm = (new ColorScheme)
    .from_hue(21)
    .scheme('triade')
    .distance(0.75)
    .add_complement(false)
    .web_safe(true);
  var colors = scm.colors();
  var numColors = colors.length;
  $.each($('.circle'), function(i, circle) {
    circle.style.background = "#" + colors[i % numColors];
  });
});
