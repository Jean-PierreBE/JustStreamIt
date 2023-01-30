let updateButton = document.getElementById('detailBestMovie');
let favDialog = document.getElementById('favDialog');

// Le bouton "Mettre à jour les détails" ouvre le <dialogue> ; modulaire
updateButton.addEventListener('click', function onOpen() {
  if (typeof favDialog.showModal === "function") {
    favDialog.showModal();
  } else {
    console.error("L'API <dialog> n'est pas prise en charge par ce navigateur.");
  }
});

