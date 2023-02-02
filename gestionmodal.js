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
// Modal liste meilleurs films categorie 1
gestionModal ('detailCategory10','Cat1Dialog0');
gestionModal ('detailCategory11','Cat1Dialog1');
gestionModal ('detailCategory12','Cat1Dialog2');
gestionModal ('detailCategory13','Cat1Dialog3');
gestionModal ('detailCategory14','Cat1Dialog4');
gestionModal ('detailCategory15','Cat1Dialog5');
gestionModal ('detailCategory16','Cat1Dialog6');
// Modal liste meilleurs films categorie 2
gestionModal ('detailCategory20','Cat2Dialog0');
gestionModal ('detailCategory21','Cat2Dialog1');
gestionModal ('detailCategory22','Cat2Dialog2');
gestionModal ('detailCategory23','Cat2Dialog3');
gestionModal ('detailCategory24','Cat2Dialog4');
gestionModal ('detailCategory25','Cat2Dialog5');
gestionModal ('detailCategory26','Cat2Dialog6');
// Modal liste meilleurs films categorie 3
gestionModal ('detailCategory30','Cat3Dialog0');
gestionModal ('detailCategory31','Cat3Dialog1');
gestionModal ('detailCategory32','Cat3Dialog2');
gestionModal ('detailCategory33','Cat3Dialog3');
gestionModal ('detailCategory34','Cat3Dialog4');
gestionModal ('detailCategory35','Cat3Dialog5');
gestionModal ('detailCategory36','Cat3Dialog6');
