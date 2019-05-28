document.getElementById("themeCheck").addEventListener("click", () => {
  var switchOn = document.getElementById("themeCheck").checked;
  if (switchOn) {
    document.body.setAttribute("theme", "dark");
  } else {
    document.body.setAttribute("theme", "bright");
  }
});
