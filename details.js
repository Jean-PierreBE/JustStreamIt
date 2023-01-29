let updateButton = document.getElementById('updateDetails');
let favDialog = document.getElementById('favDialog');
let outputBox = document.querySelector('output');
let selectEl = document.querySelector('select');
let confirmBtn = document.getElementById('confirmBtn');

// Le bouton "Mettre à jour les détails" ouvre le <dialogue> ; modulaire
updateButton.addEventListener('click', function onOpen() {
  if (typeof favDialog.showModal === "function") {
    favDialog.showModal();
  } else {
    console.error("L'API <dialog> n'est pas prise en charge par ce navigateur.");
  }
});
// L'entrée "Animal favori" définit la valeur du bouton d'envoi.
selectEl.addEventListener('change', function onSelect(e) {
  confirmBtn.value = selectEl.value;
});
// Le bouton "Confirmer" du formulaire déclenche la fermeture
// de la boîte de dialogue en raison de [method="dialog"]
favDialog.addEventListener('close', function onClose() {
  outputBox.value = favDialog.returnValue + " bouton cliqué - " + (new Date()).toString();
});
