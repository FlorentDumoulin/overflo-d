function cardListItems(aList){
  return `
  ${aList.map(list => `<li>${list}</li>`).join('')}
  `
  /* Pour récup les valeurs d'un tableau [] dans un objet {} : (cléJSON, CléJSON2) => ${cléJSON} + ${cléJSON2} */

};

function cardTemplate(aCard){
  return `
  <div class="card">
    <i class="${aCard.icon}"></i>
    <h3><a href="${aCard.link}" title="${aCard.linkTitle}">${aCard.title}</a></h3>
    <hr>
    <ul>
    ${cardListItems(aCard.list)}
    </ul>
  </div>
  `
  /* Avec les ` (backtick) je peux structurer mon HTML comme je veux et récup des valeurs de mon JSON avec ${argument.cléJSON} */

};

var container = document.getElementById('cards'); /* Récup mon container pour les cartes */
var cardsData = new XMLHttpRequest(); /* Instancie l'objet pour pouvoir envoyer mes requêtes ajax */

cardsData.open('GET', 'assets/json/cards-data.json'); /* Je veux recevoir des données venant de cet url */

cardsData.onload = function(){ /* Appel de ma fonction à la fin de l'appel ajax */
  if (cardsData.status >= 200 && cardsData.status < 400){ /* Si tout s'est bien passé */
    var aData = JSON.parse(cardsData.responseText); /* Je dois parser pour que le fichier soit bien traité au format JSON */
    container.innerHTML = `${aData.map(cardTemplate).join('')}`;
    /* La méthode map() crée un nouveau tableau avec les résultats de l'appel de la fonction sur chaque élément du tableau appelant, ça fait comme une boucle.
    Puis je join() sur rien pour transformer mon tableau en chaîne de caractères et l'injecter dans mon HTML. */
  } else { /* Si la récup des données échoue */
    container.innerHTML = `<p class="alert-error">La connexion au serveur a réussie mais la récupération des données a échoué.</p>`;
  }
  
};

/* Gestion erreur si connection a l'adresse après le open échoue */
cardsData.onerror = function(){
  container.innerHTML = `<p class="alert-error">La connexion au serveur a échouée.</p>`;
}

cardsData.send(); /* Envoi de ma requête ajax */
