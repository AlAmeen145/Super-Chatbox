function openSettings() { document.getElementById("settings-modal").style.display = "block"; }
function closeSettings() { document.getElementById("settings-modal").style.display = "none"; }

document.getElementById("theme-select").addEventListener("change", e => {
  if(e.target.value === "light") document.body.style.background = "#f0f0f0";
  else document.body.style.background = "linear-gradient(135deg, #0f2027, #203a43, #2c5364)";
});