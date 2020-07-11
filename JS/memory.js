var nombre_image_selectionnee = 0; //contient 0 si aucune image selectionnée, 1 sinon
var premiere_image_cliquee; //image en cours
var deuxieme_image_cliquee; //image precedente
var resultat = 0; //nombre de pair trouvée
var nombre_total_de_clic = 0; //nombre de clic
var message = document.getElementById("message");
var clics = document.getElementById("clics");
var score = document.getElementById("score");

function retourne(image, recto) {
    //methode qui affiche une image ou pas en fonction du 2eme argument
    if (recto) {
        image.style.visibility = 'visible';
        image.style.width = '100%';
    } else {
        image.style.visibility = 'hidden';
        image.style.width = '0%';
    }
}

function verifPair(premiere_image_cliquee, deuxieme_image_cliquee) {
    //methode qui verifie si les 2 images passées en argument sont identiques
    if (deuxieme_image_cliquee.src == premiere_image_cliquee.src) {
        //gagné, les images sont identiques
        resultat++;
        //on ne les retourne pas
        //comme seul les cartes partys sont cliquables et quelles ne sont plus affichées, il n'y a rien à faire
    } else {
        //on cache les images cliquées
        setTimeout(function() { //le timeout permet d'attendre avant de réaliser l'action
            retourne(premiere_image_cliquee, false); //on cache l'image
            retourne(premiere_image_cliquee.parentNode.getElementsByClassName("party")[0], true); // on remet la party visible
            /*
            Pour trouver la party correspondante à l'image, 
            on remonte au parent :  premiere_image_cliquee.parentNode
            et on cherche l'premiere_image_cliquee de class party : getElementsByClassName("party")
            on prend la 1ere occurance : [0]
            */
            retourne(deuxieme_image_cliquee, false); // on cache la 2eme image
            retourne(deuxieme_image_cliquee.parentNode.getElementsByClassName("party")[0], true); // on remet la party visible de la 2eme image

        }, 800);
    }
}

function gestionClick(e) {
    // gère le clic sur une image
    nombre_image_selectionnee++; // on augmente le nombre d'images selectionnee
    if (nombre_image_selectionnee <= 2) { //evite de gérer les clics supplementaires
        imageClickee = e.target; //recupere la party cliquée
        // on cherche l'image qui correspond à la party cliquée
        premiere_image_cliquee = imageClickee.parentNode.getElementsByClassName("dessin")[0];
        retourne(imageClickee, false); //on cache la party
        retourne(premiere_image_cliquee, true); //on affiche l'image
        //test si 1er cliquée
        if (nombre_image_selectionnee == 1) {
            //on met à jour image precedente et on met a jour attente
            deuxieme_image_cliquee = premiere_image_cliquee;
        } else {
            //on compare l'image cliquée avec la precedente
            verifPair(premiere_image_cliquee, deuxieme_image_cliquee);
            nombre_image_selectionnee -= 2;
            if (resultat == 8) {
                message.innerHTML = "Vous avez gagnez";
            }
        }
        nombre_total_de_clic++;
        clics.innerHTML = nombre_total_de_clic;
        score.innerHTML = resultat;
    }
}

function initgame() {
    // on reinitialise les variables
    nombre_total_de_clic = 0;
    resultat = 0;
    nombre_image_selectionnee = 0;
    premiere_image_cliquee = null;
    impg = null;
    clics.innerHTML = nombre_total_de_clic;
    score.innerHTML = resultat;
    message.innerHTML = "";
    var images = [];
    //on prepare un tableau avec les numéros des 16 images
    index = 0;
    for (let i = 1; i <= 8; i++) {
        //la clé est un nombre aleatoire pour permettre le tri aleatoire
        images[index++] = i //numero de l'image
        images[index++] = i;
    }
    //on affecte les images aux cases
    var mespremiere_image_cliquee = document.getElementsByClassName("dessin"); // on recupere toutes les premiere_image_cliquee dessin
    var mespartys = document.getElementsByClassName("party"); // on recupere toutes les premiere_image_cliquee partys
    for (let index = 0; index < 16; index++) {

        console.log(images);
        console.log(images.length);
        //nombre aleatoire       
        alea = Math.ceil(Math.random() * images.length - 1);
        //on affecte une image au hasard
        mespremiere_image_cliquee[index].src = "../Images/" + images[alea] + ".jpg";
        console.log(alea + "  " + images[alea]);
        //on retire l'image du tableau
        images.splice(alea, 1);
        //on ajoute le listener
        mespartys[index].addEventListener("click", gestionClick);
        // on masque les images (utile pour le reinit)
        retourne(mespartys[index], true);
        retourne(mespremiere_image_cliquee[index], false)
    }
}

function solution() {
    //permet d'afficher toutes les images et cacher toutes les partys
    var mespartys = document.getElementsByClassName("party");
    for (let i = 0; i < mespartys.length; i++) {
        retourne(mespartys[i], false);
        retourne(mespartys[i].parentNode.getElementsByClassName("dessin")[0], true);

    }
}

//on crée les evenements sur les boutons
document.getElementById("Reinitialiser").addEventListener("click", initgame);
document.getElementById("Solution").addEventListener("click", solution);
//on initialise le jeu
initgame();