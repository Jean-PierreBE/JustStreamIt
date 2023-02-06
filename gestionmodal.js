function gestionModal (button, dialogue) {
  let updateButton = document.getElementById(button);
  let favDialog = document.getElementById(dialogue);
  // Le bouton "Mettre à jour les détails" ouvre le <dialogue> ; modulaire
  updateButton.addEventListener('click', function onOpen() {
    if (typeof favDialog.showModal === "function") {
      favDialog.showModal();
    } else {
      console.error("L'API <dialog> n'est pas prise en charge par ce navigateur.");
    }
  });
}
// Modal meilleur film
gestionModal ('detailBestMovie','favDialog');
// Modal liste meilleurs films
for (let icat = 0; icat < 4; icat++) { 
  for (let idial = 0; idial < 7; idial++) { 
    let detcatdiag = 'detailCategory' + icat + idial;
    let catdiag = 'Cat' + icat + 'Dialog' + idial;
    gestionModal (detcatdiag,catdiag);
  }
};
