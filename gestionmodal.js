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
gestionModal ('detailBestMovies0','favDialog0');
gestionModal ('detailBestMovies1','favDialog1');
gestionModal ('detailBestMovies2','favDialog2');
gestionModal ('detailBestMovies3','favDialog3');
gestionModal ('detailBestMovies4','favDialog4');
gestionModal ('detailBestMovies5','favDialog5');
gestionModal ('detailBestMovies6','favDialog6');
