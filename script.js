let map = L.map("map").setView([23.5, 89.5], 9);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
}).addTo(map);

let currentOverlay = null;
let boundsData = {};

fetch("data/bounds.json")
  .then((res) => res.json())
  .then((json) => {
    boundsData = json;
  });

function updateLayer() {
  const quarter = document.getElementById("quarter").value;
  const index = document.getElementById("indexType").value;
  const fileName = `Padma_${quarter}_2022_${index}.png`;
  const bounds = boundsData[fileName];

  if (!bounds) {
    alert("Bounds not found for: " + fileName);
    return;
  }

  if (currentOverlay) {
    map.removeLayer(currentOverlay);
  }

  currentOverlay = L.imageOverlay(`data/${fileName}`, [[bounds[1], bounds[0]], [bounds[3], bounds[2]]], {
    opacity: 0.8,
  }).addTo(map);

  map.fitBounds([[bounds[1], bounds[0]], [bounds[3], bounds[2]]]);
}
