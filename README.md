# Projet 6 OpenClassRoom : Développez une interface utilisateur pour une application web Python
## Présentation du projet
Le but de ce projet est de créer site web de référencement de films de cinémas. Le but de ce site est de donner différents informations sur plus ou moins 85000 films. Les informations comprennet le titre , une image de film , un résumé , son classement imdb etc..
Ce site a pour but d'aider les cinéphiles lors de l'achat de dvd ou choix de programmes télé.
Ce site sera développé en html ,css et javascript( vanilla javascript).
Il devra fonctionner sous Edge , Firefox et Chrome.

## composition
Tous les fichiers necessaires au site web se trouvent dans le répertoire JustStreamIt.
Ces fichiers sont :
- main.html,mentions_legales.html : partie html du site
- main.css : fichier css 
- CategoryBestMovies.js , combocategory.js, gestionmodal.js : javascript pour animer le site 
- image-blank.png, image-not-found.png : images pour la gestion du site

## Lancement du site
Mettez l'adresse main.html dans le navigateur de votre choix .
Auparavant , assurez-vous que l'api d'accès à la base de données de films fonctionne.

## Présentation du site
Un bandeau gris apparaît en haut de l'écran , avec le nom du site , un lien accueil et un combobox avec les différentes catégories de films.
- si on clique sur Accueil la page se rafraichit
- si on sélectionne une catégorie dans la combobox , un message apparait 'option non operationnele pour le moment'.
La présentation des films se fait en 5 parties.
Tout en haut , on voit le film avec le meilleur score imdb toute catégorie confondues
Ensuite on a un bandeau avec les 7 films suivants triés selon le scrore imdb , également toutes catégories. Une flècche à droite permet d'afficher 7 films suivants , si on arrive au bout de la sélection , un messge apparaît indiquant qu'il n'y a plus de films et la fèche de gauche permet de revenir en arrière. Si on arrive au début , un message 'on est revenu au début apparît'.
on a ensuite 3 bandeaux pour 3 catégories prédéfinies. Le fonctionnement de ces 3 bandeaux est similaire à celui des films les mieux notés.
Les 3 catégories sont
- Animation
- Série noire
- Western

Si on clique sur chaque image du film , une fenêtre s'affiche indquant les informations sur le film , un bouton permet de fermer la fenêtre. Il se peut que l'image du film ne soit pas présente , une image indiquant , image non disponible apparaît mais si on clique dessu , les informations apparaissent quand même.
