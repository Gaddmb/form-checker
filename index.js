//*********************** Les Variable 1° */
const form = document.querySelector("form");

// selectionne tout mes input
const inputs = document.querySelectorAll(
  'input[type="text"], input[type="password"]'
);
// variable pour ma barre de progression
const progressBar = document.getElementById("progress-bar");
// j'ai enfermer ma regex dans une variable
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const pseudoRegex = /^[a-zA-Z0-9_.-]*$/;
const emailRegex = /^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i;
// je veux stocker "dans une boite ce qui a etait tapé par mon utilisateur"
let pseudo, email, password, confirmPass;

//************************************************************   function d'affichage d'error **************************************************************************/

const errorDisplay = (tag, message, valid) => {
  // Sélectionne un élément avec la classe qui combine "toto"(tag) et "container" Par exemple, si tag = "pseudo", cela sélectionnera un élément avec la classe "pseudocontainer"
  const container = document.querySelector("." + tag + "-container");

  // Sélectionne le <span> qui est un enfant direct de l'élément avec la classe "tagcontainer"  Par exemple, si "toto"(tag) = "pseudo", cela sélectionnera le <span> dans "pseudocontainer"
  const span = document.querySelector("." + tag + "-container > span");

  if (!valid) {
    container.classList.add("error");
    span.textContent = message;
  } else {
    container.classList.remove("error");
    span.textContent = message;
  }
};

//****************************************************************** 3° function pour chaque input *********************************************************************/

//*************************************** function Pseudo *******************************/

const pseudoChecker = (value) => {
  // La fonction pseudoChecker vérifie la validité du pseudo en fonction de sa longueur et de son contenu
  // Si la longueur est incorrecte (moins de 3 ou plus de 20 caractères), elle affiche un message d'erreur
  // Si des caractères spéciaux sont présents, elle affiche un message d'erreur
  // Si le pseudo est valide, elle enlève l'erreur et vide le message d'erreur
  // Si le pseudo est trop court ou trop long
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay(
      "pseudo",
      "Le pseudo doit avoir faire entre 3 et 20 caractères"
    );
    // si le pseudo et erroné
    pseudo = null;
  } else if (!value.match(pseudoRegex)) {
    errorDisplay(
      "pseudo",
      "Le pseudo ne doit pas contenir de caractère spéciaux"
    );
    pseudo = null;
  } else {
    errorDisplay("pseudo", "", true);
    // je passe la value qui est e.target.value
    pseudo = value;
  }
};
//*************************************** function Email *******************************/

const emailChecker = (value) => {
  if (!value.match(emailRegex)) {
    errorDisplay("email", "Le mail n'est pas valide");
    email = null;
  } else {
    errorDisplay("email", "", true);
    email = value;
  }
};

//*************************************** function Password *******************************/

const passwordChecker = (value) => {
  progressBar.classList = "";
  if (!value.match(passwordRegex)) {
    errorDisplay(
      "password",
      " Minimum 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial."
    );
    progressBar.classList.add("progressRed");
    password = null;
  } else if (value.length < 12) {
    progressBar.classList.add("progressBlue");
    errorDisplay("password", "", true);
    password = value;
  } else {
    progressBar.classList.add("progressGreen");
    errorDisplay("password", "", true);
    password = value;
  }
  // si jamais il y a quelque chose dans confirmPass ( ca veut dire que ya true ) alors tu peux me lancer le confirmeChecker
  if (confirmPass) confirmChecker(confirmPass);
};

//*************************************** function Confirm *******************************/

const confirmChecker = (value) => {
  // je vais comparer les deux mots de passe en faisant un comparaison grace a la variable password
  if (value !== password) {
    errorDisplay("confirm", "les mots de passe ne correspondent pas");
    confirmPass = false;
  } else {
    errorDisplay("confirm", "", true);
    confirmPass = true;
  }
};

//******  boucle sur tout mes input pour leurs ajouter un event 2°
for (const input of inputs) {
  input.addEventListener("input", (e) => {
    // switch va tester la valeur e.target
    switch (e.target.id) {
      case "pseudo":
        // les function un besoin d'analyser quelque choses pour cela je met en parametre e.target
        pseudoChecker(e.target.value);
        break;
      case "email":
        emailChecker(e.target.value);
        break;
      case "password":
        passwordChecker(e.target.value);
        break;
      case "confirm":
        confirmChecker(e.target.value);
        break;
      default:
        nul;
    }
  });
}

//************************************************************ pour mon formulaire il faut quelque chose qui check ****************************************************/
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // si les 4 son true je veux que tu envoies tous les elements dans un objet
  // pour envoyer des données a un serveur ou a un aAPI on regroupe tout dans un objet
  if (pseudo && email && password && confirmPass) {
    const data = {
      // en JS moder je suis pas obliger de faire dans mon objet pseudo: pseudo je peux faire comme ci-dessous
      pseudo,
      email,
      password,
    };
    // apres avoir envoyé tout la data je veux que tout les input se vide
    for (const input of inputs) {
      input.value = "";
      progressBar.classList = "";
    }

    console.log(data); // ( je vais "un POST")
    // je repasse tout a null une fois les formulaires rempli
    pseudo = null;
    email = null;
    password = null;
    confirmPass = null;
    alert("Inscription validée");
  } else {
    alert("Veuillez remplir correctement les champs");
  }
});
