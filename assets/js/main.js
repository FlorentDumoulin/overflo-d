function cardListItems(list){
  return `
  ${list.map(list => `<li>${list}</li>`).join('')}
  `
};

function cardTemplate(card){
  return `
  <div class="card">
    <i class="${card.icon}"></i>
    <h3><a href="${card.link}" title="${card.linkTitle}">${card.title}</a></h3>
    <hr>
    <ul>
    ${cardListItems(card.list)}
    </ul>
  </div>
  `
};

var cardsData = new XMLHttpRequest();
cardsData.open('GET', 'assets/json/cards-data.json');
cardsData.onload = function(){
  var card = JSON.parse(cardsData.responseText);
  document.getElementById('cards').innerHTML = `${card.map(cardTemplate).join('')}`;
};
cardsData.send();
