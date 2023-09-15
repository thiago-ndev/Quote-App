// Setting the Access-Token header
let headers = {
  'Access-Token': tokenOplab
};

const submitButton = document.querySelector('.autocomplete-btn button');
var $_getValidationField = document.getElementsByClassName('validation-text');
var structureSearch = document.getElementById('structure_searcher');
var optionStratsModal = document.getElementById('option_strategies_modal');
var quoteBoard = document.getElementById('quote_page');
let outloook;
let profitStatus;
let lossStatus;
let creditDebit;
let legsNumber;
let availableStocks;
let formattedStockTicker;
let totalPrime;
let totalClientPrime;
let stockOptionsChain;
let actualStockPrice;
let realTimeVol = true;


// Função para atualizar a exibição dos cards com base nas caixas de seleção (checkbox)
function filterCards() {
  const checkboxes = document.querySelectorAll('.filter-checkbox');
  const selectedFilters = [];

  checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
          selectedFilters.push(checkbox.getAttribute('data-filter'));
      }
  });

  const cards = document.querySelectorAll('.card-strategies');

  cards.forEach(card => {
      const filters = card.getAttribute('data-filter').split(' ');
      const shouldDisplay = selectedFilters.every(filter => filters.includes(filter));
      const closestDiv = card.closest('.col-xxl-2');
      closestDiv.style.display = shouldDisplay ? 'block' : 'none';
  });
}

// function recommendCardsBasedOnSelection() {
//   const checkboxes = document.querySelectorAll('.filter-checkbox');
//   let noFilterSelected = true;
//   let selectedFilter = '';
//
//   checkboxes.forEach(checkbox => {
//     if (checkbox.checked) {
//       noFilterSelected = false;
//       selectedFilter = checkbox.getAttribute('data-filter');
//     }
//   });
//
//   if (noFilterSelected) {
//     const allRecommendedCards = document.querySelectorAll('.recommended');
//     allRecommendedCards.forEach(card => {
//       const cardFilter = card.querySelector('.card-strategies-recommended').getAttribute('data-filter');
//       if (cardFilter.includes(selectedFilter)) {
//         card.style.display = 'block';
//       } else {
//         card.style.display = 'none';
//       }
//     });
//   }
// }


function filterRecommendedCardsOnly() {
  const checkboxes = document.querySelectorAll('.filter-checkbox');
  const selectedFilters = [];
  const selectedRecommend = [];

  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      selectedFilters.push(checkbox.getAttribute('data-filter'));
      console.log(selectedFilters)
    }
  });


  // Ocultar todos os blocos de ação recomendados
  const allRecommendedCards = document.querySelectorAll('.recommended');
  allRecommendedCards.forEach(card => {
    card.style.display = 'none';

  });



  // Exibir apenas os blocos de ação de fatura recomendados que correspondem aos filtros selecionados
  const recommendedCards = document.querySelectorAll('.card-strategies-recommended');
  recommendedCards.forEach(card => {
  const filters = card.getAttribute('data-filter').split(' ');
  const shouldDisplay = selectedFilters.every(filter => filters.includes(filter));
  const closestDiv2 = card.closest('.recommended');

  // let title = card.querySelector('.card-title').textContent;
  // console.log(title)
  // console.log(closestDiv2)


    if (shouldDisplay) {
      // if(closestDiv2.textContent.includes(title)){
      //   closestDiv2.textContent = closestDiv2.textContent.replace(title, '');
      //   console.log(title.textContent)
      // }
      closestDiv2.style.display = 'block';
    }

  });
}
// Função para lidar com a seleção exclusiva de checkboxes (apenas uma pode ser selecionada por vez)
document.addEventListener("DOMContentLoaded", function () {
  function handleExclusiveSelection(checkbox, checkboxes) {
      if (checkbox.checked) {
          checkboxes.forEach(otherCheckbox => {
              if (otherCheckbox !== checkbox) {
                  otherCheckbox.checked = false;
              }
          });
      }
  }
  

  // Categoria: Visão
  const visaoOtimista = document.getElementById("visao-otimista-checkbox");
  const visaoPessimista = document.getElementById("visao-pessimista-checkbox");

  visaoOtimista.addEventListener("click", function () {
      handleExclusiveSelection(visaoOtimista, [visaoPessimista]);
  });

  visaoPessimista.addEventListener("click", function () {
      handleExclusiveSelection(visaoPessimista, [visaoOtimista]);
  });

  // Categoria: Lucro Potencial
  const lucroLimitado = document.getElementById("lucro-limitado-checkbox");
  const lucroIlimitado = document.getElementById("lucro-ilimitado-checkbox");

  lucroLimitado.addEventListener("click", function () {
      handleExclusiveSelection(lucroLimitado, [lucroIlimitado]);
  });

  lucroIlimitado.addEventListener("click", function () {
      handleExclusiveSelection(lucroIlimitado, [lucroLimitado]);
  });

  // Categoria: Prejuízo Potencial
  const prejuizoLimitado = document.getElementById("prejuizo-limitado-checkbox");
  const prejuizoIlimitado = document.getElementById("prejuizo-ilimitado-checkbox");

  prejuizoLimitado.addEventListener("click", function () {
      handleExclusiveSelection(prejuizoLimitado, [prejuizoIlimitado]);
  });

  prejuizoIlimitado.addEventListener("click", function () {
      handleExclusiveSelection(prejuizoIlimitado, [prejuizoLimitado]);
  });

  // Categoria: Paga ou Recebe
  const recebe = document.getElementById("recebe-checkbox");
  const paga = document.getElementById("paga-checkbox");

  recebe.addEventListener("click", function () {
      handleExclusiveSelection(recebe, [paga]);
  });

  paga.addEventListener("click", function () {
      handleExclusiveSelection(paga, [recebe]);
  });

  // Categoria: N° Pernas
  const perna1 = document.getElementById("01-perna-checkbox");
  const perna2 = document.getElementById("02-perna-checkbox");
  const perna3 = document.getElementById("03-perna-checkbox");
  const perna4 = document.getElementById("04-perna-checkbox");

  perna1.addEventListener("click", function () {
      handleExclusiveSelection(perna1, [perna2, perna3, perna4]);
  });

  perna2.addEventListener("click", function () {
      handleExclusiveSelection(perna2, [perna1, perna3, perna4]);
  });

  perna3.addEventListener("click", function () {
      handleExclusiveSelection(perna3, [perna1, perna2, perna4]);
  });

  perna4.addEventListener("click", function () {
      handleExclusiveSelection(perna4, [perna1, perna2, perna3]);
  });
});


// Adicionar um evento de mudança a todas as caixas de seleção
document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
  checkbox.addEventListener('change', filterCards);
});

document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
  checkbox.addEventListener('click', filterRecommendedCardsOnly);
});

function calculateClientPrime() {
  const tableBody = document.querySelector(".inv--product-table-section table tbody");
  let clientPrime = 0;
  // loop through all the rows in the table body
  tableBody.querySelectorAll("tr").forEach(function(row) {
    const badge = row.querySelector(".badge");
   
    const price = parseFloat(row.querySelector(".price").textContent);

    const qty = parseFloat(row.querySelector(".qty").textContent);
    
    // if the row has the specified badge type, add/subtract its price to the total
    
      if (badge.classList.contains('badge-success')) {
        
        clientPrime -= price * qty;
      } else if (badge.classList.contains('badge-danger')) {
        
        clientPrime += price * qty;
      }
      totalClientPrime = clientPrime.toFixed(2);
    
  });

  const premioQtyTotal = document.querySelector(".premio-cliente");
  premioQtyTotal.style.color = clientPrime >= 0 ? '#00ab55' : 'red';
  var totalPrimeRounded = clientPrime.toFixed(2)
  premioQtyTotal.textContent = totalPrimeRounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function normcdf(x) {
  const a1 = 0.31938153, a2 = -0.356563782, a3 = 1.781477937, a4 = -1.821255978, a5 = 1.330274429;
  const k = 1 / (1 + 0.2316419 * Math.abs(x));
  const w = ((a1 * k + a2) * k + a3) * k + ((a4 * k) + a5);
  const y = 1 / (Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x * x) * w;
  return x >= 0 ? 1 - y : y;
}

function CDF(x) {
  const A1 = 0.31938153;
  const A2 = -0.356563782;
  const A3 = 1.781477937;
  const A4 = -1.821255978;
  const A5 = 1.330274429;
  const L = Math.abs(x);
  const K = 1 / (1 + 0.2316419 * L);
  const w = 1 - 1 / (Math.sqrt(2 * Math.PI)) * Math.exp(-L * L / 2) * (A1 * K + A2 * K * K + A3 * Math.pow(K, 3) + A4 * Math.pow(K, 4) + A5 * Math.pow(K, 5));
  return x < 0 ? 1 - w : w;
}

function calculateOptionPrice() {
  // example value
  const tableRows = document.querySelectorAll(".inv--product-table-section table tbody tr");
  
  tableRows.forEach(row => {

    const selectedSymbol = row.cells[3].textContent;
    var symbolExtracted = selectedSymbol.split(" - ")[0];
    const filteredData = stockOptionsChain.filter(record => record.symbol === symbolExtracted).slice(0, 1);
    const badge = row.querySelector(".badge").textContent.toUpperCase();
    const dueDateString = row.cells[4].querySelector('.due-date-dropdown').value;
    const dueDate = new Date(dueDateString);
    

    const volBalization = volInformation.filter(item => item.symbol === formattedStockTicker && item.type === row.cells[1].textContent && item.action == badge);
    
    if (volBalization.length>0){
      const closestRecord = volBalization.reduce((prev, curr) => {
        const prevDelta = Math.abs(new Date(prev.due_date) - new Date(dueDate));
        const currDelta = Math.abs(new Date(curr.due_date) - new Date(dueDate));
        return prevDelta < currDelta ? prev : curr;
      });
      var volatility = parseFloat(closestRecord.volatility)/100;
      row.cells[6].textContent = closestRecord.volatility;
      row.cells[6].classList.add('balizated-vol')
    } else{
      row.cells[6].classList.remove('balizated-vol')
      var volatility = parseFloat(row.cells[6].textContent)/100;
    }
    
    
    


    const bid = filteredData[0]['bid']
    const ask = filteredData[0]['ask']
    const stockOptionPrice = filteredData[0]['close']
    row.setAttribute("bid-ask", `${bid} ${ask}`);



    const optionType = row.cells[1].textContent; // 'Call' or 'Put'
    const strikePrice = parseFloat(filteredData[0]['strike']);
    
    
    const timeToExpiration = (dueDate - Date.now()) / (1000 * 60 * 60 * 24 * 365); // in years
    actualFreeInterestRate = parseFloat(actualFreeInterestRate);
    const d1 = (Math.log(parseFloat(actualStockPrice) / strikePrice) + (parseFloat(actualFreeInterestRate) + volatility * volatility / 2) * timeToExpiration) / (volatility * Math.sqrt(timeToExpiration));
    const d2 = d1 - volatility * Math.sqrt(timeToExpiration);
    let optionPrice;

    if (optionType === 'CALL') {
      optionPrice = parseFloat(actualStockPrice) * CDF(d1) - strikePrice * Math.exp(-parseFloat(actualFreeInterestRate) * timeToExpiration) * CDF(d2);
    } else if (optionType === 'PUT') {
      optionPrice = strikePrice * Math.exp(-parseFloat(actualFreeInterestRate) * timeToExpiration) * CDF(-d2) - parseFloat(actualStockPrice) * CDF(-d1);
    }
    if ((((Math.abs(parseFloat(ask) - parseFloat(bid)))>0.10) & (parseFloat(actualStockPrice)<50)) || (parseFloat(ask)==0 || parseFloat(bid)==0)){
      
      row.cells[7].textContent = optionPrice.toFixed(2);

    } else if((((Math.abs(parseFloat(ask) - parseFloat(bid)))>0.20) & (parseFloat(actualStockPrice)>50)) || (parseFloat(ask)==0 || parseFloat(bid)==0)){
      
      row.cells[7].textContent = optionPrice.toFixed(2);
      }
    else {
      if (row.cells[0].textContent.includes('Buy')){
        
        row.cells[7].textContent = ask;
      } else {
        row.cells[7].textContent = bid;
      }
    
    }
  });
}



function calculateTotalPrice() {
  const tableBody = document.querySelector(".inv--product-table-section table tbody");
  let totalPrice = 0;
  // loop through all the rows in the table body
  tableBody.querySelectorAll("tr").forEach(function(row) {
    const badge = row.querySelector(".badge");
   
    const price = parseFloat(row.querySelector(".price").textContent);
    
    // if the row has the specified badge type, add/subtract its price to the total
    
      if (badge.classList.contains('badge-success')) {
        
        
        totalPrice -= price;
      } else if (badge.classList.contains('badge-danger')) {
        
        totalPrice += price;
      }
      
    
  });
  totalPrime = totalPrice.toFixed(2);
  const premioTotal = document.querySelector(".premio-total");
  premioTotal.textContent = totalPrice.toFixed(2);

  // Bloco adiionado para criação de novo recurso para exibição de cenários de alta, parcial e baixa
  // Obtem o valor do prêmio total (R$) para usar nos cenários
  const getPremioTotalToScenarios = document.querySelector(".premio-total");
  getPremioTotalToScenarios.textContent = totalPrice.toFixed(2);

  // Cálculo da diferença do strike menos o preço do prêmio total
  const partialScenarioValue = parseFloat(document.getElementById("partial-scenario").textContent);
  const premioTotalScenariosValue = parseFloat(document.querySelector(".premio-total").textContent);
  const partialResultValue = partialScenarioValue - premioTotalScenariosValue;

  // Exibir o resultado da diferença do strike menos o preço do prêmio total
  const partialResultElement = document.getElementById("partial-result");
  partialResultElement.textContent = (partialResultValue + 0.02).toFixed(2);

  // Obtem o valor calculado para o cenário de perda
  const bearishResultElement = document.getElementById("strike-bearish-scenario");
  bearishResultElement.textContent = partialResultValue.toFixed(2);
}

function recalculatePrimeEquity() {
  premioMoment = parseFloat(totalPrime)
  actualStockPrice = parseFloat(document.querySelector('.inv-title').textContent)
  const primeEquity = document.querySelector('.premio-equity');
  
  // Modificado para não exibir mais o valor negativo (exemplo: -1.43%) do prêmio equity
  const equityRatio = premioMoment / actualStockPrice;
  const absoluteEquityRatio = Math.abs(equityRatio);
  
  primeEquity.textContent = `${(absoluteEquityRatio * 100).toFixed(2)}%`;
}

function formatDateTime(dateTime) {
  var year = dateTime.getFullYear();
  var month = dateTime.getMonth() + 1;
  var day = dateTime.getDate();
  var hours = dateTime.getHours();
  var minutes = dateTime.getMinutes();
  var seconds = dateTime.getSeconds();

  // pad the month, day, hours, minutes, and seconds with a leading zero if necessary
  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  }
  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  // return the formatted date and time string
  return day + ' ' + getMonthName(month) + ' ' + year + ' - ' + hours + ':' + minutes + ':' + seconds;
}


function getMonthName(monthNumber) {
  // define an array of month names
  var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // get the month name from the array based on the month number
  return monthNames[monthNumber - 1];
}

function updateDate(){
  var today = new Date();

  // format the date and time to match the desired format
  var formattedDateTime = formatDateTime(today);

  // set the formatted date and time as the text content of the element
  document.querySelector('.inv-date').textContent = formattedDateTime;
}


// Get asset images from brapi.dev API
function loadAssetImage(assetLogoImage) {
  const assetName = formattedStockTicker;

  if (assetName === "BOVA11") {
    stop()
  } else {
    const apiUrl = `https://brapi.dev/api/quote/${assetName}?token=3KD3JSFPJ3FXizGZ3QwhT3`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const logourl = data.results[0].logourl;
        assetLogoImage.src = logourl;
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        assetLogoImage.src = ""; // Clear image source on error
      });
  }
}


const assetLogoImage = document.getElementById("asset-logo");

submitButton.addEventListener('click', (event) => {


  event.preventDefault(); // prevent the default form submission behavior
  document.getElementById('loading-card').style.display = 'block'


  const searchValue = document.getElementById('submit_stock').value;
  formattedStockTicker = searchValue.replace(/\s+/g, '').toUpperCase();
  // include the Access-Token header
  
    const symbols = availableStocks.map(item => item.symbol);
      if (symbols.includes(formattedStockTicker)) {
        
        
        const heading = document.querySelector('.in-heading');


    // Set its text content to the formatted search value
        heading.textContent = formattedStockTicker;
      
        fetch(`https://api.oplab.com.br/v3/market/stocks/${formattedStockTicker}`, { headers })
        .then(response => response.json())
        .then(data => {
          const price = data.close;
          const variation = data.variation;
          const volatility = data.iv_current;
          const companyStockPrice = document.querySelector('.inv-title'); // get the p element
          companyStockPrice.textContent = price;
          const symbolsWithVol = []
          if (symbolsWithVol.includes(formattedStockTicker)) {
          const companyStockVolatility = document.querySelector('.principal-table-volatility'); // get the p element
          const filteredArray = volInformation 
          .filter(item => item.stock === formattedStockTicker)
          .map(item => {
            return {
              
              volatility: parseFloat(item.volatility).toFixed(2)
            };
          });
          companyStockVolatility.textContent = `${parseFloat(filteredArray[0].volatility).toFixed(2)}%`;
          } else{
            const companyStockVolatility = document.querySelector('.principal-table-volatility'); // get the p element
            companyStockVolatility.textContent = `${volatility.toFixed(2)}%`;
          }
          const companyStockVolatility = document.querySelector('.principal-table-volatility');
          const companyStockDailyVariation = document.querySelector('.inv-number'); // get the p element
          if (variation>=0){
            companyStockDailyVariation.style.color = 'green';
          } else {
            companyStockDailyVariation.style.color = 'red';
          }
          companyStockDailyVariation.textContent = `${variation}%`;

          var today = new Date();

          // format the date and time to match the desired format
          var formattedDateTime = formatDateTime(today);


          // set the formatted date and time as the text content of the element
          document.querySelector('.inv-date').textContent = formattedDateTime;
          document.querySelector('.inv-email-operation').textContent = optionStrategySelected;

          loadAssetImage(assetLogoImage);

          if (optionStrategySelected=="Bull Put Spread"){

            const tableBody = document.querySelector(".inv--product-table-section table tbody");
            fetch(`https://api.oplab.com.br/v3/market/options/${formattedStockTicker}`, { headers })
            .then(response => response.json())
            .then(data => {
            stockOptionsChain = data;
            const filteredData = data.filter(record =>
              record.category === "PUT" &&
              parseFloat(record.strike) < actualStockPrice &&
              ((new Date(record.due_date) - Date.now()) / (1000 * 60 * 60 * 24)) > 25)
              .sort((a, b) => b.strike - a.strike);
          
            const firstRecord = filteredData[0];
            const secondRecord = filteredData.find(record => parseFloat(record.strike) < firstRecord.strike * 0.93 && record.due_date === firstRecord.due_date);
          
            const result = [firstRecord, secondRecord].filter(record => record !== undefined);
          
            const maxStrike = Math.max(...result.map(record => record.strike));
            const minStrike = Math.min(...result.map(record => record.strike));
          
            result.forEach((record, index) => {
                const action = (record.strike === maxStrike) ? "Sell" : "Buy";
                const badgeClass = (action === "Sell") ? "badge-danger" : "badge-success";
          
                const newRow = document.createElement("tr");
                newRow.setAttribute("bid-ask", `${record.bid} ${record.ask}`);
                newRow.innerHTML = `
                    <td><span class="badge ${badgeClass}" style="cursor: pointer;">${action}</span></td>
                    <td>${record.category}</td>
                    <td class="text-end qty">1000</td>
                    <td>${record.symbol} - ${record.strike.toFixed(2)}</td>
                    <td>
                      <select class="due-date-dropdown" onchange="handleDueDateDropdownChange(this)">
                        ${getDueDateOptions(record.due_date)}
                      </select>
                    </td>
                    <td>
                      <select class="strike-percentage-dropdown" onchange="handleStrikePercentageDropdownChange(this, ${record.strike.toFixed(2)}, actualStockPrice)">
                        ${generateStrikePercentageOptions(record.strike.toFixed(2), actualStockPrice)}
                      </select>
                    </td>
                    <td class="text-end vol-column" style="display: none;">${parseFloat((companyStockVolatility.textContent).replace('%', '').trim())}</td>
                    <td class="text-end price" style="display: none;">${(record.close).toFixed(2)}</td>
                    <td class="text-center"><svg style="color: red;margin-left: 30px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></td>
                `;
                tableBody.appendChild(newRow);
            });
          
          
            })
            .catch(error => console.error(error));




          } else if (optionStrategySelected=="Bear Call Spread"){
          
            const tableBody = document.querySelector(".inv--product-table-section table tbody");
            fetch(`https://api.oplab.com.br/v3/market/options/${formattedStockTicker}`, { headers })
            .then(response => response.json())
            .then(data => {
            stockOptionsChain = data;
            const filteredData = data.filter(record =>
              record.category === "CALL" &&
              parseFloat(record.strike) > actualStockPrice &&
              ((new Date(record.due_date) - Date.now()) / (1000 * 60 * 60 * 24)) > 28)
              .sort((a, b) => a.strike - b.strike);
          
            const firstRecord = filteredData[0];
            const secondRecord = filteredData.find(record => parseFloat(record.strike) > firstRecord.strike * 1.07 && record.due_date === firstRecord.due_date);
          
            const result = [firstRecord, secondRecord].filter(record => record !== undefined);
          
            const maxStrike = Math.max(...result.map(record => record.strike));
            const minStrike = Math.min(...result.map(record => record.strike));
          
            result.forEach((record, index) => {
                const action = (record.strike === minStrike) ? "Sell" : "Buy";
                const badgeClass = (action === "Sell") ? "badge-danger" : "badge-success";
          
                const newRow = document.createElement("tr");
                newRow.setAttribute("bid-ask", `${record.bid} ${record.ask}`);
                newRow.innerHTML = `
                    <td><span class="badge ${badgeClass}" style="cursor: pointer;">${action}</span></td>
                    <td>${record.category}</td>
                    <td class="text-end qty">1000</td>
                    <td>${record.symbol} - ${record.strike.toFixed(2)}</td>
                    <td>
                      <select class="due-date-dropdown" onchange="handleDueDateDropdownChange(this)">
                        ${getDueDateOptions(record.due_date)}
                      </select>
                    </td>
                    <td>
                      <select class="strike-percentage-dropdown" onchange="handleStrikePercentageDropdownChange(this, ${record.strike.toFixed(2)}, actualStockPrice)">
                        ${generateStrikePercentageOptions(record.strike.toFixed(2), actualStockPrice)}
                      </select>
                    </td>
                    
                    <td class="text-end vol-column" style="display: none;">${parseFloat((companyStockVolatility.textContent).replace('%', '').trim())}</td>
                    <td class="text-end price" style="display: none;">${(record.close).toFixed(2)}</td>
                    <td class="text-center"><svg style="color: red;margin-left: 30px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></td>
                `;
                tableBody.appendChild(newRow);
            });
          
          
            })
            .catch(error => console.error(error));


          } else if (optionStrategySelected=="Dividendo Sintético"){



            const tableBody = document.querySelector(".inv--product-table-section table tbody");

            // verifica se ja tem alguma linha na tabela e remove
            const existingRows = tableBody.querySelectorAll("tr");
            for (let i = 0; i < existingRows.length; i++) {
              tableBody.removeChild(existingRows[i]);
            }

            fetch(`https://api.oplab.com.br/v3/market/options/${formattedStockTicker}`, { headers })
            .then(response => response.json())
            .then(data => {
            stockOptionsChain = data;
            // Lista com todas as DueDates
            const uniqueDueDates = [...new Set(stockOptionsChain.map(option => option.due_date))];

            const filteredData = data.filter(record =>
              record.category === "PUT" &&
              parseFloat(record.strike) < 0.95* actualStockPrice &&
              record.due_date === uniqueDueDates[0]
              )
            .sort((a, b) => b.strike - a.strike)
            .slice(0, 1);

            for (let i = 0; i < filteredData.length; i++) {
              const dueDate = filteredData[i].due_date;
              console.log(`Due Date ${i + 1}: ${dueDate}`);
            }

          
            filteredData.forEach((record, index) => {
                const action = 'Sell';
                const badgeClass = (action === "Sell") ? "badge-danger" : "badge-success";
          
                const newRow = document.createElement("tr");
                newRow.setAttribute("bid-ask", `${record.bid} ${record.ask}`);
                newRow.innerHTML = `
                    <td><span class="badge ${badgeClass}" style="cursor: pointer;">${action}</span></td>
                    <td>${record.category}</td>
                    <td class="text-end qty">1000</td>
                    <td>${record.symbol} - ${record.strike.toFixed(2)}</td>
                    <td>
                      <select class="due-date-dropdown" onchange="handleDueDateDropdownChange(this)">
                        ${getDueDateOptions(record.due_date)}
                      </select>
                    </td>
                    <td>
                      <select class="strike-percentage-dropdown" onchange="handleStrikePercentageDropdownChange(this, ${record.strike.toFixed(2)}, actualStockPrice)">
                        ${generateStrikePercentageOptions(record.strike.toFixed(2), actualStockPrice)}
                      </select>
                    </td>
                    <td class="text-end vol-column" style="display: none;">${parseFloat((companyStockVolatility.textContent).replace('%', '').trim())}</td>
                    <td class="text-end price" style="display: none;">${(record.close).toFixed(2)}</td>
                    <!--<td class="text-center"><svg style="color: red;margin-left: 30px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></td>-->
                `;
                tableBody.appendChild(newRow);
            });
          
          
            })
            .catch(error => console.error(error));




          } else if (optionStrategySelected=="Fence"){
            const fence = document.getElementById('fence')
            fence.style.display = 'none'

            const tableBody = document.querySelector(".inv--product-table-section table tbody");

            // verifica se ja tem alguma linha na tabela e remove
            const existingRows = tableBody.querySelectorAll("tr");
            for (let i = 0; i < existingRows.length; i++) {
              tableBody.removeChild(existingRows[i]);
            }

            fetch(`https://api.oplab.com.br/v3/market/options/${formattedStockTicker}`, { headers })
            .then(response => response.json())
            .then(data => {
            stockOptionsChain = data;
            const filteredDataCall = data.filter(record =>
              record.category === "CALL" &&
              parseFloat(record.strike) > actualStockPrice * 1.05 &&
              ((new Date(record.due_date) - Date.now()) / (1000 * 60 * 60 * 24)) > 25
            )
            .sort((a, b) => a.strike - b.strike)
            .slice(0, 1);
            const dueDateFence = filteredDataCall[0].due_date;
          
          
            filteredDataCall.forEach((record, index) => {
                const action = 'Sell';
                const badgeClass = (action === "Sell") ? "badge-danger" : "badge-success";
          
                const newRow = document.createElement("tr");
                newRow.setAttribute("bid-ask", `${record.bid} ${record.ask}`);
                newRow.innerHTML = `
                    <td><span class="badge ${badgeClass}" style="cursor: pointer;">${action}</span></td>
                    <td>${record.category}</td>
                    <td class="text-end qty">1000</td>
                    <td>${record.symbol} - ${record.strike.toFixed(2)}</td>
                    <td>
                      <select class="due-date-dropdown" onchange="handleDueDateDropdownChange(this)">
                        ${getDueDateOptions(record.due_date)}
                      </select>
                    </td>
                    <td>
                      <select class="strike-percentage-dropdown" onchange="handleStrikePercentageDropdownChange(this, ${record.strike.toFixed(2)}, actualStockPrice)">
                        ${generateStrikePercentageOptions(record.strike.toFixed(2), actualStockPrice)}
                      </select>
                    </td>
                    <td class="text-end vol-column" style="display: none;">${parseFloat((companyStockVolatility.textContent).replace('%', '').trim())}</td>
                    <td class="text-end price" style="display: none;">${(record.close).toFixed(2)}</td>
                    <td class="text-center"><svg style="color: red;margin-left: 30px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></td>
                `;
                tableBody.appendChild(newRow);
            });


            const filteredData = data.filter(record =>
              record.category === "PUT" &&
              parseFloat(record.strike) < actualStockPrice &&
              (record.due_date==dueDateFence))
              .sort((a, b) => b.strike - a.strike);
          
            const firstRecord = filteredData[0];
            const secondRecord = filteredData.find(record => parseFloat(record.strike) < firstRecord.strike * 0.93 && record.due_date === firstRecord.due_date);
          
            const result = [firstRecord, secondRecord].filter(record => record !== undefined);
          
            const maxStrike = Math.max(...result.map(record => record.strike));
            const minStrike = Math.min(...result.map(record => record.strike));
          
            result.forEach((record, index) => {
                const action = (record.strike === minStrike) ? "Sell" : "Buy";
                const badgeClass = (action === "Sell") ? "badge-danger" : "badge-success";
          
                const newRow = document.createElement("tr");
                newRow.setAttribute("bid-ask", `${record.bid} ${record.ask}`);
                newRow.innerHTML = `
                    <td><span class="badge ${badgeClass}" style="cursor: pointer;">${action}</span></td>
                    <td>${record.category}</td>
                    <td class="text-end qty">1000</td>
                    <td>${record.symbol} - ${record.strike.toFixed(2)}</td>
                    <td>
                      <select class="due-date-dropdown" onchange="handleDueDateDropdownChange(this)">
                        ${getDueDateOptions(record.due_date)}
                      </select>
                    </td>
                    <td>
                      <select class="strike-percentage-dropdown" onchange="handleStrikePercentageDropdownChange(this, ${record.strike.toFixed(2)}, actualStockPrice)">
                        ${generateStrikePercentageOptions(record.strike.toFixed(2), actualStockPrice)}
                      </select>
                    </td>
                    <td class="text-end vol-column" style="display: none;">${parseFloat((companyStockVolatility.textContent).replace('%', '').trim())}</td>
                    <td class="text-end price" style="display: none;">${(record.close).toFixed(2)}</td>
                    <td class="text-center"><svg style="color: red;margin-left: 30px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></td>
                `;
                tableBody.appendChild(newRow);
            });
          
          
            })
            .catch(error => console.error(error));
          } else if (optionStrategySelected=="Financiamento"){

            const financ = document.getElementById('financiamento')
            financ.style.display = 'none'


            const tableBody = document.querySelector(".inv--product-table-section table tbody");

            // Verifica se a tabela ja tem alguma linha
            const existingRows = tableBody.querySelectorAll("tr");
            for (let i = 0; i < existingRows.length; i++) {
              tableBody.removeChild(existingRows[i]);
            }

            fetch(`https://api.oplab.com.br/v3/market/options/${formattedStockTicker}`, { headers })
            .then(response => response.json())
            .then(data => {
            stockOptionsChain = data;
            const filteredDataCall = data.filter(record =>
              record.category === "CALL" &&
              parseFloat(record.strike) > (actualStockPrice * 1.05) &&
              ((new Date(record.due_date) - Date.now()) / (1000 * 60 * 60 * 24)) > 55
            )
            .sort((a, b) => b.volume - a.volume)
            .slice(0, 1);
            const dueDateFence = filteredDataCall[0].due_date;
          
          
            filteredDataCall.forEach((record, index) => {
                const action = 'Sell';
                const badgeClass = (action == "Sell") ? "badge-danger" : "badge-success";
          
                const newRow = document.createElement("tr");
                newRow.setAttribute("bid-ask", `${record.bid} ${record.ask}`);
                newRow.innerHTML = `
                    <td><span class="badge ${badgeClass}" style="cursor: pointer;">${action}</span></td>
                    <td>${record.category}</td>
                    <td class="text-end qty">1000</td>
                    <td>${record.symbol} - ${record.strike.toFixed(2)}</td>
                    <td>
                      <select class="due-date-dropdown" onchange="handleDueDateDropdownChange(this)">
                        ${getDueDateOptions(record.due_date)}
                      </select>
                    </td>
                    <td>
                      <select class="strike-percentage-dropdown" onchange="handleStrikePercentageDropdownChange(this, ${record.strike.toFixed(2)}, actualStockPrice)">
                        ${generateStrikePercentageOptions(record.strike.toFixed(2), actualStockPrice)}
                      </select>
                    </td>
                    <td class="text-end vol-column" style="display: none;">${parseFloat((companyStockVolatility.textContent).replace('%', '').trim())}</td>
                    <td class="text-end price" style="display: none;">${(record.close).toFixed(2)}</td>
                    <td class="text-center"><svg style="color: red;margin-left: 30px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></td>
                `;
                tableBody.appendChild(newRow);
            });


          
          
          
            })
            .catch(error => console.error(error));


          } else if (optionStrategySelected=="Booster (Double Up)"){
            const tableBody = document.querySelector(".inv--product-table-section table tbody");
            fetch(`https://api.oplab.com.br/v3/market/options/${formattedStockTicker}`, { headers })
            .then(response => response.json())
            .then(data => {
            stockOptionsChain = data;
            const filteredDataCall = data.filter(record =>
              record.category === "CALL" &&
              parseFloat(record.strike) > (actualStockPrice * 1.05) &&
              ((new Date(record.due_date) - Date.now()) / (1000 * 60 * 60 * 24)) > 32
            )
            .sort((a, b) => b.volume - a.volume)
            .slice(0, 1);
            const dueDateFence = filteredDataCall[0].due_date;
            const callBuyBoosterStrike = filteredDataCall[0].strike;
          
          
            filteredDataCall.forEach((record, index) => {
                const action = 'Buy';
                const badgeClass = (action == "Sell") ? "badge-danger" : "badge-success";
          
                const newRow = document.createElement("tr");
                newRow.setAttribute("bid-ask", `${record.bid} ${record.ask}`);
                newRow.innerHTML = `
                    <td><span class="badge ${badgeClass}" style="cursor: pointer;">${action}</span></td>
                    <td>${record.category}</td>
                    <td class="text-end qty">1000</td>
                    <td>${record.symbol} - ${record.strike.toFixed(2)}</td>
                    <td>
                      <select class="due-date-dropdown" onchange="handleDueDateDropdownChange(this)">
                        ${getDueDateOptions(record.due_date)}
                      </select>
                    </td>
                    <td>
                      <select class="strike-percentage-dropdown" onchange="handleStrikePercentageDropdownChange(this, ${record.strike.toFixed(2)}, actualStockPrice)">
                        ${generateStrikePercentageOptions(record.strike.toFixed(2), actualStockPrice)}
                      </select>
                    </td>
                    <td class="text-end vol-column" style="display: none;">${parseFloat((companyStockVolatility.textContent).replace('%', '').trim())}</td>
                    <td class="text-end price" style="display: none;">${(record.close).toFixed(2)}</td>
                    <td class="text-center"><svg style="color: red;margin-left: 30px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></td>
                `;
                tableBody.appendChild(newRow);
            });


            const filteredDataPutSpread = data.filter(record =>
              record.category === "CALL" &&
              parseFloat(record.strike) > (actualStockPrice*1.12) &&
              record.due_date == dueDateFence && record.strike > callBuyBoosterStrike)
            
              .slice(0, 1);
          
          
          
            filteredDataPutSpread.forEach((record, index) => {
                const action = "Sell";
                const badgeClass = (action === "Sell") ? "badge-danger" : "badge-success";
          
                const newRow = document.createElement("tr");
                newRow.setAttribute("bid-ask", `${record.bid} ${record.ask}`);
                newRow.innerHTML = `
                    <td><span class="badge ${badgeClass}" style="cursor: pointer;">${action}</span></td>
                    <td>${record.category}</td>
                    <td class="text-end qty">2000</td>
                    <td>${record.symbol} - ${record.strike.toFixed(2)}</td>
                    <td>
                      <select class="due-date-dropdown" onchange="handleDueDateDropdownChange(this)">
                        ${getDueDateOptions(record.due_date)}
                      </select>
                    </td>
                    <td>
                      <select class="strike-percentage-dropdown" onchange="handleStrikePercentageDropdownChange(this, ${record.strike.toFixed(2)}, actualStockPrice)">
                        ${generateStrikePercentageOptions(record.strike.toFixed(2), actualStockPrice)}
                      </select>
                    </td>
                    <td class="text-end vol-column" style="display: none;">${parseFloat((companyStockVolatility.textContent).replace('%', '').trim())}</td>
                    <td class="text-end price" style="display: none;">${(record.close).toFixed(2)}</td>
                    <td class="text-center"><svg style="color: red;margin-left: 30px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></td>
                `;
                tableBody.appendChild(newRow);
            });
          
          
            })
            .catch(error => console.error(error));


          } else if (optionStrategySelected=="Call Backspread"){
            const tableBody = document.querySelector(".inv--product-table-section table tbody");
            fetch(`https://api.oplab.com.br/v3/market/options/${formattedStockTicker}`, { headers })
            .then(response => response.json())
            .then(data => {
            stockOptionsChain = data;
            const filteredDataCall = data.filter(record =>
              record.category === "CALL" &&
              parseFloat(record.strike) < (actualStockPrice  * 0.96) &&
              ((new Date(record.due_date) - Date.now()) / (1000 * 60 * 60 * 24)) > 32
            )
            .sort((a, b) => b.volume - a.volume)
            .slice(0, 1);
            const dueDateFence = filteredDataCall[0].due_date;
            const callBuyBoosterStrike = filteredDataCall[0].strike;
          
          
            filteredDataCall.forEach((record, index) => {
                const action = 'Sell';
                const badgeClass = (action == "Sell") ? "badge-danger" : "badge-success";
          
                const newRow = document.createElement("tr");
                newRow.setAttribute("bid-ask", `${record.bid} ${record.ask}`);
                newRow.innerHTML = `
                    <td><span class="badge ${badgeClass}" style="cursor: pointer;">${action}</span></td>
                    <td>${record.category}</td>
                    <td class="text-end qty">1000</td>
                    <td>${record.symbol} - ${record.strike.toFixed(2)}</td>
                    <td>
                      <select class="due-date-dropdown" onchange="handleDueDateDropdownChange(this)">
                        ${getDueDateOptions(record.due_date)}
                      </select>
                    </td>
                    <td>
                      <select class="strike-percentage-dropdown" onchange="handleStrikePercentageDropdownChange(this, ${record.strike.toFixed(2)}, actualStockPrice)">
                        ${generateStrikePercentageOptions(record.strike.toFixed(2), actualStockPrice)}
                      </select>
                    </td>
                    <td class="text-end vol-column" style="display: none;">${parseFloat((companyStockVolatility.textContent).replace('%', '').trim())}</td>
                    <td class="text-end price" style="display: none;">${(record.close).toFixed(2)}</td>
                    <td class="text-center"><svg style="color: red;margin-left: 30px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></td>
                `;
                tableBody.appendChild(newRow);
            });


            const filteredDataPutSpread = data.filter(record =>
              record.category === "CALL" &&
              parseFloat(record.strike) > actualStockPrice &&
              record.due_date == dueDateFence )
            
              .slice(0, 1);
          
          
          
            filteredDataPutSpread.forEach((record, index) => {
                const action = "Buy";
                const badgeClass = (action === "Sell") ? "badge-danger" : "badge-success";
          
                const newRow = document.createElement("tr");
                newRow.setAttribute("bid-ask", `${record.bid} ${record.ask}`);
                newRow.innerHTML = `
                    <td><span class="badge ${badgeClass}" style="cursor: pointer;">${action}</span></td>
                    <td>${record.category}</td>
                    <td class="text-end qty">2000</td>
                    <td>${record.symbol} - ${record.strike.toFixed(2)}</td>
                    <td>
                      <select class="due-date-dropdown" onchange="handleDueDateDropdownChange(this)">
                        ${getDueDateOptions(record.due_date)}
                      </select>
                    </td>
                    <td>
                      <select class="strike-percentage-dropdown" onchange="handleStrikePercentageDropdownChange(this, ${record.strike.toFixed(2)}, actualStockPrice)">
                        ${generateStrikePercentageOptions(record.strike.toFixed(2), actualStockPrice)}
                      </select>
                    </td>
                    <td class="text-end vol-column" style="display: none;">${parseFloat((companyStockVolatility.textContent).replace('%', '').trim())}</td>
                    <td class="text-end price" style="display: none;">${(record.close).toFixed(2)}</td>
                    <td class="text-center"><svg style="color: red;margin-left: 30px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></td>
                `;
                tableBody.appendChild(newRow);
            });
          
          
            })
            .catch(error => console.error(error));


          } else if (optionStrategySelected=="Long Call"){
            const tableBody = document.querySelector(".inv--product-table-section table tbody");
            fetch(`https://api.oplab.com.br/v3/market/options/${formattedStockTicker}`, { headers })
            .then(response => response.json())
            .then(data => {
            stockOptionsChain = data;
            const filteredDataCall = data.filter(record =>
              record.category === "CALL" &&
              parseFloat(record.strike) > (actualStockPrice  * 1.08) &&
              ((new Date(record.due_date) - Date.now()) / (1000 * 60 * 60 * 24)) > 40
            )
            .sort((a, b) => b.volume - a.volume)
            .slice(0, 1);
          
          
            filteredDataCall.forEach((record, index) => {
                const action = 'Buy';
                const badgeClass = (action == "Sell") ? "badge-danger" : "badge-success";
          
                const newRow = document.createElement("tr");
                newRow.setAttribute("bid-ask", `${record.bid} ${record.ask}`);
                newRow.innerHTML = `
                    <td><span class="badge ${badgeClass}" style="cursor: pointer;">${action}</span></td>
                    <td>${record.category}</td>
                    <td class="text-end qty">1000</td>
                    <td>${record.symbol} - ${record.strike.toFixed(2)}</td>
                    <td>
                      <select class="due-date-dropdown" onchange="handleDueDateDropdownChange(this)">
                        ${getDueDateOptions(record.due_date)}
                      </select>
                    </td>
                    <td>
                      <select class="strike-percentage-dropdown" onchange="handleStrikePercentageDropdownChange(this, ${record.strike.toFixed(2)}, actualStockPrice)">
                        ${generateStrikePercentageOptions(record.strike.toFixed(2), actualStockPrice)}
                      </select>
                    </td>
                    <td class="text-end vol-column" style="display: none;">${parseFloat((companyStockVolatility.textContent).replace('%', '').trim())}</td>
                    <td class="text-end price"style="display: none;">${(record.close).toFixed(2)}</td>
                    <td class="text-center"><svg style="color: red;margin-left: 30px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></td>
                `;
                tableBody.appendChild(newRow);
            });


           
          
          
            })
            .catch(error => console.error(error));


          } else if (optionStrategySelected=="Zero Cost Collar"){
            const tableBody = document.querySelector(".inv--product-table-section table tbody");
            fetch(`https://api.oplab.com.br/v3/market/options/${formattedStockTicker}`, { headers })
            .then(response => response.json())
            .then(data => {
            stockOptionsChain = data;
            const filteredDataCall = data.filter(record =>
              record.category === "CALL" &&
              parseFloat(record.strike) > (actualStockPrice * 1.08) &&
              ((new Date(record.due_date) - Date.now()) / (1000 * 60 * 60 * 24)) > 50
            )
            .sort((a, b) => b.volume - a.volume)
            .slice(0, 1);
            const dueDateFence = filteredDataCall[0].due_date;
            const callBuyBoosterStrike = filteredDataCall[0].strike;
          
          
            filteredDataCall.forEach((record, index) => {
                const action = 'Sell';
                const badgeClass = (action == "Sell") ? "badge-danger" : "badge-success";
          
                const newRow = document.createElement("tr");
                newRow.setAttribute("bid-ask", `${record.bid} ${record.ask}`);
                newRow.innerHTML = `
                    <td><span class="badge ${badgeClass}" style="cursor: pointer;">${action}</span></td>
                    <td>${record.category}</td>
                    <td class="text-end qty">1000</td>
                    <td>${record.symbol} - ${record.strike.toFixed(2)}</td>
                    <td>
                      <select class="due-date-dropdown" onchange="handleDueDateDropdownChange(this)">
                        ${getDueDateOptions(record.due_date)}
                      </select>
                    </td>
                    <td>
                      <select class="strike-percentage-dropdown" onchange="handleStrikePercentageDropdownChange(this, ${record.strike.toFixed(2)}, actualStockPrice)">
                        ${generateStrikePercentageOptions(record.strike.toFixed(2), actualStockPrice)}
                      </select>
                    </td>
                    <td class="text-end vol-column" style="display: none;">${parseFloat((companyStockVolatility.textContent).replace('%', '').trim())}</td>
                    <td class="text-end price"style="display: none;">${(record.close).toFixed(2)}</td>
                    <td class="text-center"><svg style="color: red;margin-left: 30px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></td>
                `;
                tableBody.appendChild(newRow);
            });
    
    
            const filteredDataPutSpread = data.filter(record =>
              record.category === "PUT" &&
              parseFloat(record.strike) < (actualStockPrice) &&
              record.due_date == dueDateFence)
              .sort((a, b) => b.volume - a.volume)
              .slice(0, 1);
          
          
          
            filteredDataPutSpread.forEach((record, index) => {
                const action = "Buy";
                const badgeClass = (action === "Sell") ? "badge-danger" : "badge-success";
          
                const newRow = document.createElement("tr");
                newRow.setAttribute("bid-ask", `${record.bid} ${record.ask}`);
                newRow.innerHTML = `
                    <td><span class="badge ${badgeClass}" style="cursor: pointer;">${action}</span></td>
                    <td>${record.category}</td>
                    <td class="text-end qty">1000</td>
                    <td>${record.symbol} - ${record.strike.toFixed(2)}</td>
                    <td>
                      <select class="due-date-dropdown" onchange="handleDueDateDropdownChange(this)">
                        ${getDueDateOptions(record.due_date)}
                      </select>
                    </td>
                    <td>
                      <select class="strike-percentage-dropdown" onchange="handleStrikePercentageDropdownChange(this, ${record.strike.toFixed(2)}, actualStockPrice)">
                        ${generateStrikePercentageOptions(record.strike.toFixed(2), actualStockPrice)}
                      </select>
                    </td>
                    <td class="text-end vol-column" style="display: none;">${parseFloat((companyStockVolatility.textContent).replace('%', '').trim())}</td>
                    <td class="text-end price"style="display: none;">${(record.close).toFixed(2)}</td>
                    <td class="text-center"><svg style="color: red;margin-left: 30px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></td>
                `;
                tableBody.appendChild(newRow);
            });
          
          
            })
            .catch(error => console.error(error));
    
    
          }


          calculateTotalPrice();


          setInterval(calculateTotalPrice, 400);
        
          setTimeout(() => {
            document.getElementById('stock_searcher').style.display = 'none';
            document.getElementById('stocks_modal').style.display = 'none';
            document.getElementById('loading-card').style.display = 'none';
            document.getElementById('quote_page').style.display = 'block';
        }, 1200);
        
        })
        .catch(error => console.error(error));


        function fetchData() {
          
      
          fetch(`https://api.oplab.com.br/v3/market/stocks/${formattedStockTicker}`, { headers })
            .then(response => response.json())
            .then(data => {
              const price = data.close;
              const variation = data.variation;
              const volatility = data.iv_current;
              
              const companyStockPrice = document.querySelector('.inv-title'); // get the p element
              companyStockPrice.textContent = price;
              if ((realTimeVol==false) && (document.querySelector('.principal-table-volatility').textContent=='')){
                const symbolsWithVol = []
                if (symbolsWithVol.includes(formattedStockTicker)) {
                const companyStockVolatility = document.querySelector('.principal-table-volatility'); // get the p element
                const filteredArray = volInformation 
                .filter(item => item.stock === formattedStockTicker)
                .map(item => {
                  return {
                    
                    volatility: parseFloat(item.volatility).toFixed(2)
                  };
                });
                companyStockVolatility.textContent = `${parseFloat(filteredArray[0].volatility).toFixed(2)}%`;
                } else{
                  const companyStockVolatility = document.querySelector('.principal-table-volatility'); // get the p element
                  companyStockVolatility.textContent = `${volatility.toFixed(2)}%`;
                }
                realTimeVol = true;
              
              } else if (realTimeVol){
                const symbolsWithVol = []
                if (symbolsWithVol.includes(formattedStockTicker)) {
                const companyStockVolatility = document.querySelector('.principal-table-volatility'); // get the p element
                const filteredArray = volInformation 
                .filter(item => item.stock === formattedStockTicker)
                .map(item => {
                  return {
                    
                    volatility: parseFloat(item.volatility).toFixed(2)
                  };
                });
                companyStockVolatility.textContent = `${parseFloat(filteredArray[0].volatility).toFixed(2)}%`;
                } else{
                  const companyStockVolatility = document.querySelector('.principal-table-volatility'); // get the p element
                  companyStockVolatility.textContent = `${volatility.toFixed(2)}%`;
                }
              
              }
            
              const companyStockDailyVariation = document.querySelector('.inv-number'); // get the p element
              if (variation>=0){
                companyStockDailyVariation.style.color = 'green';
              } else {
                companyStockDailyVariation.style.color = 'red';
              }
              companyStockDailyVariation.textContent = `${variation}%`;


            
          
            })
            .catch(error => console.error(error));




            fetch(`https://api.oplab.com.br/v3/market/options/${formattedStockTicker}`, { headers })
            .then(response => response.json())
            .then(data => {
            stockOptionsChain = data;
          
            })
            .catch(error => console.error(error));
        }
      
        // call the function once to update the UI initially
        fetchData();
        updateDate();
        recalculatePrimeEquity();
        calculateClientPrime();
        calculateOptionPrice();
      
        // set an interval to call the fetchData function every 10 seconds
        setInterval(fetchData, 12000);
        setInterval(recalculatePrimeEquity, 10);
        setInterval(calculateClientPrime, 10);
        setInterval(updateDate, 1000);
        setInterval(calculateOptionPrice, 10);
        
        
      } else {
        var $_getValidationField = document.getElementsByClassName('validation-text');
        $_getValidationField[1].style.display = 'block'
        $_getValidationField[1].innerHTML = 'Essa ativo é invalido e/ou não possui opções em aberto.';
        document.getElementById('loading-card').style.display = 'none'
      }
  
  // send an API request with the headers
  
});



let optionStrategySelected;
document.querySelectorAll('.card-strategies').forEach(card => {
  card.addEventListener('click', () => {
    // Obtém o título do card clicado
    optionStrategySelected = card.querySelector('.card-title').textContent;
    document.getElementById('loading-card').style.display = 'block';
    // Faça o que quiser com o título do card clicado
    

    fetch('https://api.oplab.com.br/v3/market/stocks', { headers })
    .then(response => response.json())
    .then(data => {
      // check if the submitted value is in the field symbol of the returned JSON
      availableStocks = data;
      $(".card-stocks").each(function() {
        var symbol = $(this).find(".card-title").text().trim();
        var stock = availableStocks.find(function(item) {
            return item.symbol === symbol;
        });

        if (stock) {
            // Update close price
            $(this).find(".price-stock").text(stock.close);

            // Update variation
            var badge = $(this).find(".badge");
            var variation = stock.variation;

            if (typeof variation === "number" && !isNaN(variation)) {
                badge.text(variation + "%");

                if (variation >= 0) {
                    badge.removeClass("badge-danger").addClass("badge-light-success");
                } else {
                    badge.removeClass("badge-light-success").addClass("badge-danger");
                }
            }
        }
    });
    document.getElementById('structure_searcher').style.display = 'none';
    optionStratsModal.style.display = 'none';
    document.getElementById('stock_searcher').style.display = 'block';
    document.getElementById('stocks_modal').style.display = 'block';
    document.getElementById('loading-card').style.display = 'none';
    document.getElementById('quote_page').style.display = 'none';
    })
    .catch(error => console.error(error));
    
    
    });
});

document.querySelectorAll('.card-strategies-recommended').forEach(card => {
  card.addEventListener('click', (event) => {
    // Obtém o título do card clicado
    optionStrategySelected = card.querySelector('.card-title').textContent;
    document.getElementById('loading-card').style.display = 'block';
    // Faça o que quiser com o título do card clicado



    fetch('https://api.oplab.com.br/v3/market/stocks', { headers })
    .then(response => response.json())
    .then(data => {
      // check if the submitted value is in the field symbol of the returned JSON
      availableStocks = data;
      $(".card-stocks").each(function() {
        var symbol = $(this).find(".card-title").text().trim();
        var stock = availableStocks.find(function(item) {
            return item.symbol === symbol;
        });

        if (stock) {
            // Update close price
            $(this).find(".price-stock").text(stock.close);

            // Update variation
            var badge = $(this).find(".badge");
            var variation = stock.variation;

            if (typeof variation === "number" && !isNaN(variation)) {
                badge.text(variation + "%");

                if (variation >= 0) {
                    badge.removeClass("badge-danger").addClass("badge-light-success");
                } else {
                    badge.removeClass("badge-light-success").addClass("badge-danger");
                }
            }
        }
    });
    document.getElementById('structure_searcher').style.display = 'none';
    optionStratsModal.style.display = 'none';
    document.getElementById('stock_searcher').style.display = 'block';
    document.getElementById('stocks_modal').style.display = 'block';
    document.getElementById('loading-card').style.display = 'none';
    document.getElementById('quote_page').style.display = 'none';
    })
    .catch(error => console.error(error))


    });
});



document.querySelector('.action-print').addEventListener('click', function(event) {
  event.preventDefault();
  /* Act on the event */
  window.print();
});


// Exibe o popup personalizado
function showCustomPopup() {
  const customPopup = document.getElementById('custom-popup');
  customPopup.style.display = 'block';
}

// Oculta o popup personalizado
function hideCustomPopup() {
  const customPopup = document.getElementById('custom-popup');
  customPopup.style.display = 'none';
}

//Função para coletar os textos de todas as divs da estratégia para copiar para a área de transferência
function copyToClipboard() {
  const text1 = document.getElementById('premio-total').innerText;
  const text2 = document.getElementById('premio-equity').innerText;
  const text3 = document.getElementById('premio-cliente').innerText;
  const text4 = document.getElementById('strike-bullish-scenario').innerText;
  const text5 = document.getElementById('partial-scenario').innerText;
  const text6 = document.getElementById('partial-result').innerText;
  const text7 = document.getElementById('strike-bearish-scenario').innerText;

  const text8 = document.getElementById('copy-asset-name').innerText;
  const text9 = document.getElementById('copy-asset-price').innerText;
  const text10 = document.getElementById('copy-asset-percent').innerText;
  
  const text11 = document.getElementById('copy-option-type').innerText;
  const text12 = document.getElementById('copy-strike').innerText;
  
  const text13 = document.getElementById('copy-maturity');
  var selectedOption = text13.options[text13.selectedIndex];
  var selectedText = selectedOption.textContent;

  const text14 = document.getElementById('copy-action-name').innerText;
  const formattedText14 = (text14 === 'Venda') ? text14.replace('a', 'e') : text14;

  // Formata o texto no padrão desejado
  const formattedText = `${text8} - ${text9} (${text10})\n\n${formattedText14} ${text11} (${text12})\n\nVencimento: ${selectedText}\n\nPrêmio Total: ${text1} (${text2})\nPrêmio em (R$): ${text3}\n\nLucro Total: No vencimento, ativo maior ou igual a R$${text4}\nLucro Parcial: No vencimento, ativo entre R$${text5} e R$${text6}\nCenário de Perda: No vencimento, ativo igual ou menor que R$${text7}`;

  // Cria um elemento <textarea> temporário para armazenar o texto a ser copiado
  const tempTextarea = document.createElement('textarea');
  tempTextarea.value = formattedText;
  document.body.appendChild(tempTextarea);

  // Seleciona e copia o texto do <textarea>
  tempTextarea.select();
  document.execCommand('copy');

  // Remove o <textarea> temporário da página
  document.body.removeChild(tempTextarea);

  // Exibe a mensagem de sucesso no rodapé da div da estratégia
  const successMessage = document.getElementById('copy-success-message');
  successMessage.style.display = 'inline';

  // Define um temporizador para esconder a mensagem após algum tempo (por exemplo, 4 segundos)
  setTimeout(() => {
      successMessage.style.display = 'none';
  }, 4000);
}

const cards = document.querySelectorAll('.card-stocks');

cards.forEach(card => {
  card.addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('loading-card').style.display = 'block';

    formattedStockTicker = event.currentTarget.querySelector('.card-title').textContent;
    const symbols = availableStocks.map(item => item.symbol);
      if (symbols.includes(formattedStockTicker)) {
        
        

        const heading = document.querySelector('.in-heading');


    // Set its text content to the formatted search value
        heading.textContent = formattedStockTicker;

      
        fetch(`https://api.oplab.com.br/v3/market/stocks/${formattedStockTicker}`, { headers })
        .then(response => response.json())
        .then(data => {
          const name = data.name; // get the name field from the response
          const sector = data.sector;
          const price = data.close;
          const variation = data.variation;
          const volatility = data.iv_current;
          //const companyName = document.querySelector('.inv-street-addr'); // get the p element
          //companyName.textContent = name;
          //const companySector = document.querySelector('.inv-email-address'); // get the p element
          //companySector.textContent = sector;
          const companyStockPrice = document.querySelector('.inv-title'); // get the p element
          companyStockPrice.textContent = price;
          const symbolsWithVol = []
          if (symbolsWithVol.includes(formattedStockTicker)) {
          const companyStockVolatility = document.querySelector('.principal-table-volatility'); // get the p element
          const filteredArray = volInformation 
          .filter(item => item.stock === formattedStockTicker)
          .map(item => {
            return {
              
              volatility: parseFloat(item.volatility).toFixed(2)
            };
          });
          companyStockVolatility.textContent = `${parseFloat(filteredArray[0].volatility).toFixed(2)}%`;
          } else{
            const companyStockVolatility = document.querySelector('.principal-table-volatility'); // get the p element
            companyStockVolatility.textContent = `${volatility.toFixed(2)}%`;
          }
          const companyStockVolatility = document.querySelector('.principal-table-volatility'); // get the p element
          
          const companyStockDailyVariation = document.querySelector('.inv-number'); // get the p element
          if (variation>=0){
            companyStockDailyVariation.style.color = 'green';
          } else {
            companyStockDailyVariation.style.color = 'red';
          }
          companyStockDailyVariation.textContent = `${variation}%`;


          var today = new Date();


          // format the date and time to match the desired format
          var formattedDateTime = formatDateTime(today);


          // set the formatted date and time as the text content of the element
          document.querySelector('.inv-date').textContent = formattedDateTime;
          document.querySelector('.inv-email-operation').textContent = optionStrategySelected;

          loadAssetImage(assetLogoImage);


          if (optionStrategySelected=="Bull Put Spread"){

            const tableBody = document.querySelector(".inv--product-table-section table tbody");
            fetch(`https://api.oplab.com.br/v3/market/options/${formattedStockTicker}`, { headers })
            .then(response => response.json())
            .then(data => {
            stockOptionsChain = data;
            const filteredData = data.filter(record =>
              record.category === "PUT" &&
              parseFloat(record.strike) < actualStockPrice &&
              ((new Date(record.due_date) - Date.now()) / (1000 * 60 * 60 * 24)) > 25)
              .sort((a, b) => b.strike - a.strike);
          
            const firstRecord = filteredData[0];
            const secondRecord = filteredData.find(record => parseFloat(record.strike) < firstRecord.strike * 0.93 && record.due_date === firstRecord.due_date);
          
            const result = [firstRecord, secondRecord].filter(record => record !== undefined);
          
            const maxStrike = Math.max(...result.map(record => record.strike));
            const minStrike = Math.min(...result.map(record => record.strike));
          
            result.forEach((record, index) => {
                const action = (record.strike === maxStrike) ? "Sell" : "buy";
                const badgeClass = (action === "Sell") ? "badge-danger" : "badge-success";

                const newRow = document.createElement("tr");
                newRow.setAttribute("bid-ask", `${record.bid} ${record.ask}`);
                newRow.innerHTML = `
                    <td><span class="badge ${badgeClass}" style="cursor: pointer; width: 3.75rem; padding: 2px 3px; border-radius: 4px;">${action}</span></td>
                    <td>${record.category}</td>
                    <td class="text-end qty" style="cursor: pointer; width: 7rem;">1000</td>
                    <td>${record.symbol} - ${record.strike.toFixed(2)}</td>
                    <td>
                      <select class="due-date-dropdown" onchange="handleDueDateDropdownChange(this)">
                        ${getDueDateOptions(record.due_date)}
                      </select>
                    </td>
                    <td>
                      <select class="strike-percentage-dropdown" onchange="handleStrikePercentageDropdownChange(this, ${record.strike.toFixed(2)}, actualStockPrice)">
                        ${generateStrikePercentageOptions(record.strike.toFixed(2), actualStockPrice)}
                      </select>
                    </td>
                    
                    <td class="text-end vol-column" style="display: none;">${parseFloat((companyStockVolatility.textContent).replace('%', '').trim())}</td>
                    <td class="text-end price"style="display: none;">${(record.close).toFixed(2)}</td>
                    <!-- <td class="text-center"><svg style="color: red;margin-left: 30px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></td> -->
                `;
                tableBody.appendChild(newRow);
            });
          
          
            })
            .catch(error => console.error(error));




          } else if (optionStrategySelected=="Bear Call Spread"){
          
            const tableBody = document.querySelector(".inv--product-table-section table tbody");
            fetch(`https://api.oplab.com.br/v3/market/options/${formattedStockTicker}`, { headers })
            .then(response => response.json())
            .then(data => {
            stockOptionsChain = data;
            const filteredData = data.filter(record =>
              record.category === "CALL" &&
              parseFloat(record.strike) > actualStockPrice &&
              ((new Date(record.due_date) - Date.now()) / (1000 * 60 * 60 * 24)) > 28)
              .sort((a, b) => a.strike - b.strike);
          
            const firstRecord = filteredData[0];
            const secondRecord = filteredData.find(record => parseFloat(record.strike) > firstRecord.strike * 1.07 && record.due_date === firstRecord.due_date);
          
            const result = [firstRecord, secondRecord].filter(record => record !== undefined);
          
            const maxStrike = Math.max(...result.map(record => record.strike));
            const minStrike = Math.min(...result.map(record => record.strike));
          
            result.forEach((record, index) => {
                const action = (record.strike === minStrike) ? "Sell" : "buy";
                const badgeClass = (action === "Sell") ? "badge-danger" : "badge-success";
          
                const newRow = document.createElement("tr");
                newRow.setAttribute("bid-ask", `${record.bid} ${record.ask}`);
                newRow.innerHTML = `
                    <td><span class="badge ${badgeClass}" style="cursor: pointer; width: 3.75rem; padding: 2px 3px; border-radius: 4px;">${action}</span></td>
                    <td>${record.category}</td>
                    <td class="text-end qty" style="cursor: pointer; width: 7rem;">1000</td>
                    <td>${record.symbol} - ${record.strike.toFixed(2)}</td>
                    <td>
                      <select class="due-date-dropdown" onchange="handleDueDateDropdownChange(this)">
                        ${getDueDateOptions(record.due_date)}
                      </select>
                    </td>
                    <td>
                      <select class="strike-percentage-dropdown" onchange="handleStrikePercentageDropdownChange(this, ${record.strike.toFixed(2)}, actualStockPrice)">
                        ${generateStrikePercentageOptions(record.strike.toFixed(2), actualStockPrice)}
                      </select>
                    </td>
                    <td class="text-end vol-column" style="display: none;">${parseFloat((companyStockVolatility.textContent).replace('%', '').trim())}</td>
                    <td class="text-end price"style="display: none;">${(record.close).toFixed(2)}</td>
                    <!--<td class="text-center"><svg style="color: red;margin-left: 30px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></td>-->
                `;
                tableBody.appendChild(newRow);
            });
          
          
            })
            .catch(error => console.error(error));

          // Fazer como esse modelo
          } else if (optionStrategySelected=="Dividendo Sintético"){
            const div = document.getElementById('dividendo-sintetico')

            const tableBody = document.querySelector(".inv--product-table-section table tbody");
            // verifica se ja tem alguma linha na tabela e remove
            const existingRows = tableBody.querySelectorAll("tr");
            for (let i = 0; i < existingRows.length; i++) {
              tableBody.removeChild(existingRows[i]);
            }


            fetch(`https://api.oplab.com.br/v3/market/options/${formattedStockTicker}`, { headers })
            .then(response => response.json())
            .then(data => {
            stockOptionsChain = data;

            // Lista com todas as DueDates
            const uniqueDueDates = [...new Set(stockOptionsChain.map(option => option.due_date))];

            const filteredData = data.filter(record =>
              record.category === "PUT" &&
              parseFloat(record.strike) < 0.94*actualStockPrice &&
                record.due_date === uniqueDueDates[0]
            )
            .sort((a, b) => b.strike - a.strike)
            .slice(0, 1);

         

            filteredData.forEach((record, index) => {
                const action = 'Venda';
                const badgeClass = (action === "Venda") ? "badge-danger" : "badge-success";

                // Se o tipo for igual a PUT, adicione a imagem da bandeira europeia
                const addEuropeanImage = (record.category === "PUT") ? `<img src="https://flagcdn.com/w20/eu.png" width="18" alt="EuropeanImage" style="border-radius: 2px; margin-bottom: 2px; margin-left: 5px; opacity: 0.8">` : ``;

                const newRow = document.createElement("tr");
                newRow.setAttribute("bid-ask", `${record.bid} ${record.ask}`);
                newRow.innerHTML = `
                    <td><span id="copy-action-name" class="badge ${badgeClass}" style="background-color: #ff5a5a; font-size: .65rem; width: 3.15rem; padding: 1px 4px 0px; border-radius: 3px; pointer-events: none; margin-left: -2px; user-select: none;">${action}</span></td>
                    <td id="copy-option-type" style="font-size: .75rem; padding-top: 15px;">${record.category + addEuropeanImage}</td>
                    <td class="qty" style="font-size: .75rem; cursor: pointer; width: 7rem; padding-top: 15px;">1000</td>                
                    <td id="copy-strike" style="font-size: .75rem; padding-top: 15px;">${record.symbol} - ${record.strike.toFixed(2)}</td>
                    <td>
                      <select id="copy-maturity" style="font-size: .75rem; padding-top: 15px; height: 22px; border: 1px solid #999; color: #8882a1; border-radius: 6px; padding: 0 8px" class="due-date-dropdown" onchange="handleDueDateDropdownChange(this)">
                        ${getDueDateOptions(record.due_date)}
                      </select> 
                    </td>
                    <td>
                      <select style="font-size: .75rem; padding-top: 15px; height: 22px; border: 1px solid #999; color: #8882a1; border-radius: 6px; padding: 0 8px" class="strike-percentage-dropdown" onchange="handleStrikePercentageDropdownChange(this, ${record.strike.toFixed(2)}, actualStockPrice)">
                        ${generateStrikePercentageOptions(record.strike.toFixed(2), actualStockPrice)}
                      </select>
                    </td>
                    <td class="text-end vol-column" style="display: none;">${parseFloat((companyStockVolatility.textContent).replace('%', '').trim())}</td>
                    <td class="text-end price"style="display: none;">${(record.close).toFixed(2)}</td>
                    <!--<td class="text-center"><svg style="color: red;margin-left: 30px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></td>-->
                `;


              console.log(badgeClass)
              console.log(action)
              console.log(record.bid)
              console.log(record.ask)
                // Exibe o valor do strike do cenário de alta
                const bullishResultElement = document.getElementById("strike-bullish-scenario");
                bullishResultElement.textContent = `${record.strike.toFixed(2)}`;

                // Exibe o valor do strike do cenário parcial
                const partialResultElement = document.getElementById("partial-scenario");
                partialResultElement.textContent = `${(record.strike - 0.01).toFixed(2)}`;

                tableBody.appendChild(newRow);

            });
          
          
            })
            .catch(error => console.error(error));




          } else if (optionStrategySelected=="Fence"){


            const tableBody = document.querySelector(".inv--product-table-section table tbody");

            // verifica se ja tem alguma linha na tabela e remove
            const existingRows = tableBody.querySelectorAll("tr");
            for (let i = 0; i < existingRows.length; i++) {
              tableBody.removeChild(existingRows[i]);
            }

            fetch(`https://api.oplab.com.br/v3/market/options/${formattedStockTicker}`, { headers })
            .then(response => response.json())
            .then(data => {
            stockOptionsChain = data;
            const filteredDataCall = data.filter(record =>
              record.category === "CALL" &&
              parseFloat(record.strike) > actualStockPrice * 1.05 &&
              ((new Date(record.due_date) - Date.now()) / (1000 * 60 * 60 * 24)) > 25
            )
            .sort((a, b) => a.strike - b.strike)
            .slice(0, 1);
            const dueDateFence = filteredDataCall[0].due_date;
          
          
            filteredDataCall.forEach((record, index) => {
                const action = 'Sell';
                const badgeClass = (action === "Sell") ? "badge-danger" : "badge-success";
          
                const newRow = document.createElement("tr");
                newRow.setAttribute("bid-ask", `${record.bid} ${record.ask}`);
                newRow.innerHTML = `
                    <td><span class="badge ${badgeClass}" style="cursor: pointer; width: 3.75rem; padding: 2px 3px; border-radius: 4px;">${action}</span></td>
                    <td>${record.category}</td>
                    <td class="text-end qty" style="cursor: pointer; width: 7rem;">1000</td>
                    <td>${record.symbol} - ${record.strike.toFixed(2)}</td>
                    <td>
                      <select class="due-date-dropdown" onchange="handleDueDateDropdownChange(this)">
                        ${getDueDateOptions(record.due_date)}
                      </select>
                    </td>
                    <td>
                      <select class="strike-percentage-dropdown" onchange="handleStrikePercentageDropdownChange(this, ${record.strike.toFixed(2)}, actualStockPrice)">
                        ${generateStrikePercentageOptions(record.strike.toFixed(2), actualStockPrice)}
                      </select>
                    </td>
                    <td class="text-end vol-column" style="display: none;">${parseFloat((companyStockVolatility.textContent).replace('%', '').trim())}</td>
                    <td class="text-end price"style="display: none;">${(record.close).toFixed(2)}</td>
                    <!--<td class="text-center"><svg style="color: red;margin-left: 30px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></td>-->
                `;
                tableBody.appendChild(newRow);
            });


            const filteredData = data.filter(record =>
              record.category === "PUT" &&
              parseFloat(record.strike) < actualStockPrice &&
              (record.due_date==dueDateFence))
              .sort((a, b) => b.strike - a.strike);
          
            const firstRecord = filteredData[0];
            const secondRecord = filteredData.find(record => parseFloat(record.strike) < firstRecord.strike * 0.93 && record.due_date === firstRecord.due_date);
          
            const result = [firstRecord, secondRecord].filter(record => record !== undefined);
          
            const maxStrike = Math.max(...result.map(record => record.strike));
            const minStrike = Math.min(...result.map(record => record.strike));
          
            result.forEach((record, index) => {
                const action = (record.strike === minStrike) ? "Sell" : "buy";
                const badgeClass = (action === "Sell") ? "badge-danger" : "badge-success";
          
                const newRow = document.createElement("tr");
                newRow.setAttribute("bid-ask", `${record.bid} ${record.ask}`);
                newRow.innerHTML = `
                    <td><span class="badge ${badgeClass}" style="cursor: pointer; width: 3.75rem; padding: 2px 3px; border-radius: 4px;">${action}</span></td>
                    <td>${record.category}</td>
                    <td class="text-end qty" style="cursor: pointer; width: 7rem;">1000</td>
                    <td>${record.symbol} - ${record.strike.toFixed(2)}</td>
                    <td>
                      <select class="due-date-dropdown" onchange="handleDueDateDropdownChange(this)">
                        ${getDueDateOptions(record.due_date)}
                      </select>
                    </td>
                    <td>
                      <select class="strike-percentage-dropdown" onchange="handleStrikePercentageDropdownChange(this, ${record.strike.toFixed(2)}, actualStockPrice)">
                        ${generateStrikePercentageOptions(record.strike.toFixed(2), actualStockPrice)}
                      </select>
                    </td>
                    <td class="text-end vol-column" style="display: none;">${parseFloat((companyStockVolatility.textContent).replace('%', '').trim())}</td>
                    <td class="text-end price"style="display: none;">${(record.close).toFixed(2)}</td>
                    <!--<td class="text-center"><svg style="color: red;margin-left: 30px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></td>-->
                `;
                tableBody.appendChild(newRow);
            });
          
          
            })
            .catch(error => console.error(error));
          } else if (optionStrategySelected=="Financiamento"){

            const tableBody = document.querySelector(".inv--product-table-section table tbody");

             const existingRows = tableBody.querySelectorAll("tr");
            for (let i = 0; i < existingRows.length; i++) {
              tableBody.removeChild(existingRows[i]);
            }

            fetch(`https://api.oplab.com.br/v3/market/options/${formattedStockTicker}`, { headers })
            .then(response => response.json())
            .then(data => {
            stockOptionsChain = data;
            const filteredDataCall = data.filter(record =>
              record.category === "CALL" &&
              parseFloat(record.strike) > (actualStockPrice * 1.05) &&
              ((new Date(record.due_date) - Date.now()) / (1000 * 60 * 60 * 24)) > 55
            )
            .sort((a, b) => b.volume - a.volume)
            .slice(0, 1);
            const dueDateFence = filteredDataCall[0].due_date;
          
          
            filteredDataCall.forEach((record, index) => {
                const action = 'Sell';
                const badgeClass = (action == "Sell") ? "badge-danger" : "badge-success";
          
                const newRow = document.createElement("tr");
                newRow.setAttribute("bid-ask", `${record.bid} ${record.ask}`);
                newRow.innerHTML = `
                    <td><span class="badge ${badgeClass}" style="cursor: pointer; width: 3.75rem; padding: 2px 3px; border-radius: 4px;">${action}</span></td>
                    <td>${record.category}</td>
                    <td class="text-end qty" style="cursor: pointer; width: 7rem;">1000</td>
                    <td>${record.symbol} - ${record.strike.toFixed(2)}</td>
                    <td>
                      <select class="due-date-dropdown" onchange="handleDueDateDropdownChange(this)">
                        ${getDueDateOptions(record.due_date)}
                      </select>
                    </td>
                    <td>
                      <select class="strike-percentage-dropdown" onchange="handleStrikePercentageDropdownChange(this, ${record.strike.toFixed(2)}, actualStockPrice)">
                        ${generateStrikePercentageOptions(record.strike.toFixed(2), actualStockPrice)}
                      </select>
                    </td>
                    <td class="text-end vol-column" style="display: none;">${parseFloat((companyStockVolatility.textContent).replace('%', '').trim())}</td>
                    <td class="text-end price"style="display: none;">${(record.close).toFixed(2)}</td>
                    <!--<td class="text-center"><svg style="color: red;margin-left: 30px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></td>-->
                `;
                tableBody.appendChild(newRow);
            });


          
          
          
            })
            .catch(error => console.error(error));


          } else if (optionStrategySelected=="Booster (Double Up)"){
            const tableBody = document.querySelector(".inv--product-table-section table tbody");
            fetch(`https://api.oplab.com.br/v3/market/options/${formattedStockTicker}`, { headers })
            .then(response => response.json())
            .then(data => {
            stockOptionsChain = data;
            const filteredDataCall = data.filter(record =>
              record.category === "CALL" &&
              parseFloat(record.strike) > (actualStockPrice * 1.05) &&
              ((new Date(record.due_date) - Date.now()) / (1000 * 60 * 60 * 24)) > 32
            )
            .sort((a, b) => b.volume - a.volume)
            .slice(0, 1);
            const dueDateFence = filteredDataCall[0].due_date;
            const callBuyBoosterStrike = filteredDataCall[0].strike;
          
          
            filteredDataCall.forEach((record, index) => {
                const action = 'buy';
                const badgeClass = (action == "Sell") ? "badge-danger" : "badge-success";
          
                const newRow = document.createElement("tr");
                newRow.setAttribute("bid-ask", `${record.bid} ${record.ask}`);
                newRow.innerHTML = `
                    <td><span class="badge ${badgeClass}" style="cursor: pointer; width: 3.75rem; padding: 2px 3px; border-radius: 4px;">${action}</span></td>
                    <td>${record.category}</td>
                    <td class="text-end qty" style="cursor: pointer; width: 7rem;">1000</td>
                    <td>${record.symbol} - ${record.strike.toFixed(2)}</td>
                    <td>
                      <select class="due-date-dropdown" onchange="handleDueDateDropdownChange(this)">
                        ${getDueDateOptions(record.due_date)}
                      </select>
                    </td>
                    <td>
                      <select class="strike-percentage-dropdown" onchange="handleStrikePercentageDropdownChange(this, ${record.strike.toFixed(2)}, actualStockPrice)">
                        ${generateStrikePercentageOptions(record.strike.toFixed(2), actualStockPrice)}
                      </select>
                    </td>
                    <td class="text-end vol-column" style="display: none;">${parseFloat((companyStockVolatility.textContent).replace('%', '').trim())}</td>
                    <td class="text-end price"style="display: none;">${(record.close).toFixed(2)}</td>
                    <!--<td class="text-center"><svg style="color: red;margin-left: 30px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></td>-->
                `;
                tableBody.appendChild(newRow);
            });


            const filteredDataPutSpread = data.filter(record =>
              record.category === "CALL" &&
              parseFloat(record.strike) > (actualStockPrice*1.12) &&
              record.due_date == dueDateFence && record.strike > callBuyBoosterStrike)
            
              .slice(0, 1);
          
          
          
            filteredDataPutSpread.forEach((record, index) => {
                const action = "Sell";
                const badgeClass = (action === "Sell") ? "badge-danger" : "badge-success";
          
                const newRow = document.createElement("tr");
                newRow.setAttribute("bid-ask", `${record.bid} ${record.ask}`);
                newRow.innerHTML = `
                    <td><span class="badge ${badgeClass}" style="cursor: pointer; width: 3.75rem; padding: 2px 3px; border-radius: 4px;">${action}</span></td>
                    <td>${record.category}</td>
                    <td class="text-end qty" style="cursor: pointer; width: 7rem;">2000</td>
                    <td>${record.symbol} - ${record.strike.toFixed(2)}</td>
                    <td>
                      <select class="due-date-dropdown" onchange="handleDueDateDropdownChange(this)">
                        ${getDueDateOptions(record.due_date)}
                      </select>
                    </td>
                    <td>
                      <select class="strike-percentage-dropdown" onchange="handleStrikePercentageDropdownChange(this, ${record.strike.toFixed(2)}, actualStockPrice)">
                        ${generateStrikePercentageOptions(record.strike.toFixed(2), actualStockPrice)}
                      </select>
                    </td>
                    <td class="text-end vol-column" style="display: none;">${parseFloat((companyStockVolatility.textContent).replace('%', '').trim())}</td>
                    <td class="text-end price"style="display: none;">${(record.close).toFixed(2)}</td>
                    <!--<td class="text-center"><svg style="color: red;margin-left: 30px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></td>-->
                `;
                tableBody.appendChild(newRow);
            });
          
          
            })
            .catch(error => console.error(error));


          } else if (optionStrategySelected=="Call Backspread"){
            const tableBody = document.querySelector(".inv--product-table-section table tbody");
            fetch(`https://api.oplab.com.br/v3/market/options/${formattedStockTicker}`, { headers })
            .then(response => response.json())
            .then(data => {
            stockOptionsChain = data;
            const filteredDataCall = data.filter(record =>
              record.category === "CALL" &&
              parseFloat(record.strike) < (actualStockPrice * 0.96) &&
              ((new Date(record.due_date) - Date.now()) / (1000 * 60 * 60 * 24)) > 32
            )
            .sort((a, b) => b.volume - a.volume)
            .slice(0, 1);
            const dueDateFence = filteredDataCall[0].due_date;
            const callBuyBoosterStrike = filteredDataCall[0].strike;
          
          
            filteredDataCall.forEach((record, index) => {
                const action = 'Sell';
                const badgeClass = (action == "Sell") ? "badge-danger" : "badge-success";
          
                const newRow = document.createElement("tr");
                newRow.setAttribute("bid-ask", `${record.bid} ${record.ask}`);
                newRow.innerHTML = `
                    <td><span class="badge ${badgeClass}" style="cursor: pointer; width: 3.75rem; padding: 2px 3px; border-radius: 4px;">${action}</span></td>
                    <td>${record.category}</td>
                    <td class="text-end qty" style="cursor: pointer; width: 7rem;">1000</td>
                    <td>${record.symbol} - ${record.strike.toFixed(2)}</td>
                    <td>
                      <select class="due-date-dropdown" onchange="handleDueDateDropdownChange(this)">
                        ${getDueDateOptions(record.due_date)}
                      </select>
                    </td>
                    <td>
                      <select class="strike-percentage-dropdown" onchange="handleStrikePercentageDropdownChange(this, ${record.strike.toFixed(2)}, actualStockPrice)">
                        ${generateStrikePercentageOptions(record.strike.toFixed(2), actualStockPrice)}
                      </select>
                    </td>
                    <td class="text-end vol-column" style="display: none;">${parseFloat((companyStockVolatility.textContent).replace('%', '').trim())}</td>
                    <td class="text-end price"style="display: none;">${(record.close).toFixed(2)}</td>
                    <!--<td class="text-center"><svg style="color: red;margin-left: 30px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></td>-->
                `;
                tableBody.appendChild(newRow);
            });


            const filteredDataPutSpread = data.filter(record =>
              record.category === "CALL" &&
              parseFloat(record.strike) > actualStockPrice &&
              record.due_date == dueDateFence )
            
              .slice(0, 1);
          
          
          
            filteredDataPutSpread.forEach((record, index) => {
                const action = "buy";
                const badgeClass = (action === "Sell") ? "badge-danger" : "badge-success";
          
                const newRow = document.createElement("tr");
                newRow.setAttribute("bid-ask", `${record.bid} ${record.ask}`);
                newRow.innerHTML = `
                    <td><span class="badge ${badgeClass}" style="cursor: pointer; width: 3.75rem; padding: 2px 3px; border-radius: 4px;">${action}</span></td>
                    <td>${record.category}</td>
                    <td class="text-end qty" style="cursor: pointer; width: 7rem;">2000</td>
                    <td>${record.symbol} - ${record.strike.toFixed(2)}</td>
                    <td>
                      <select class="due-date-dropdown" onchange="handleDueDateDropdownChange(this)">
                        ${getDueDateOptions(record.due_date)}
                      </select>
                    </td>
                    <td>
                      <select class="strike-percentage-dropdown" onchange="handleStrikePercentageDropdownChange(this, ${record.strike.toFixed(2)}, actualStockPrice)">
                        ${generateStrikePercentageOptions(record.strike.toFixed(2), actualStockPrice)}
                      </select>
                    </td>
                    <td class="text-end vol-column" style="display: none;">${parseFloat((companyStockVolatility.textContent).replace('%', '').trim())}</td>
                    <td class="text-end price"style="display: none;">${(record.close).toFixed(2)}</td>
                    <!--<td class="text-center"><svg style="color: red;margin-left: 30px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></td>-->
                `;
                tableBody.appendChild(newRow);
            });
          
          
            })
            .catch(error => console.error(error));


          } else if (optionStrategySelected=="Long Call"){
            const tableBody = document.querySelector(".inv--product-table-section table tbody");
            fetch(`https://api.oplab.com.br/v3/market/options/${formattedStockTicker}`, { headers })
            .then(response => response.json())
            .then(data => {
            stockOptionsChain = data;
            const filteredDataCall = data.filter(record =>
              record.category === "CALL" &&
              parseFloat(record.strike) > (actualStockPrice  * 1.08) &&
              ((new Date(record.due_date) - Date.now()) / (1000 * 60 * 60 * 24)) > 40
            )
            .sort((a, b) => b.volume - a.volume)
            .slice(0, 1);
          
          
            filteredDataCall.forEach((record, index) => {
                const action = 'buy';
                const badgeClass = (action == "Sell") ? "badge-danger" : "badge-success";
          
                const newRow = document.createElement("tr");
                newRow.setAttribute("bid-ask", `${record.bid} ${record.ask}`);
                newRow.innerHTML = `
                    <td><span class="badge ${badgeClass}" style="cursor: pointer; width: 3.75rem; padding: 2px 3px; border-radius: 4px;">${action}</span></td>
                    <td>${record.category}</td>
                    <td class="text-end qty" style="cursor: pointer; width: 7rem;">1000</td>
                    <td>${record.symbol} - ${record.strike.toFixed(2)}</td>
                    <td>
                      <select class="due-date-dropdown" onchange="handleDueDateDropdownChange(this)">
                        ${getDueDateOptions(record.due_date)}
                      </select>
                    </td>
                    <td>
                      <select class="strike-percentage-dropdown" onchange="handleStrikePercentageDropdownChange(this, ${record.strike.toFixed(2)}, actualStockPrice)">
                        ${generateStrikePercentageOptions(record.strike.toFixed(2), actualStockPrice)}
                      </select>
                    </td>
                    <td class="text-end vol-column" style="display: none;">${parseFloat((companyStockVolatility.textContent).replace('%', '').trim())}</td>
                    <td class="text-end price"style="display: none;">${(record.close).toFixed(2)}</td>
                    <!--<td class="text-center"><svg style="color: red;margin-left: 30px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></td>-->
                `;
                tableBody.appendChild(newRow);
            });


           
          
          
            })
            .catch(error => console.error(error));


          } else if (optionStrategySelected=="Zero Cost Collar"){
            const tableBody = document.querySelector(".inv--product-table-section table tbody");
            fetch(`https://api.oplab.com.br/v3/market/options/${formattedStockTicker}`, { headers })
            .then(response => response.json())
            .then(data => {
            stockOptionsChain = data;
            const filteredDataCall = data.filter(record =>
              record.category === "CALL" &&
              parseFloat(record.strike) > (actualStockPrice * 1.08) &&
              ((new Date(record.due_date) - Date.now()) / (1000 * 60 * 60 * 24)) > 50
            )
            .sort((a, b) => b.volume - a.volume)
            .slice(0, 1);
            const dueDateFence = filteredDataCall[0].due_date;
            const callBuyBoosterStrike = filteredDataCall[0].strike;
          
          
            filteredDataCall.forEach((record, index) => {
                const action = 'Sell';
                const badgeClass = (action == "Sell") ? "badge-danger" : "badge-success";
          
                const newRow = document.createElement("tr");
                newRow.setAttribute("bid-ask", `${record.bid} ${record.ask}`);
                newRow.innerHTML = `
                    <td><span class="badge ${badgeClass}" style="cursor: pointer; width: 3.75rem; padding: 2px 3px; border-radius: 4px;">${action}</span></td>
                    <td>${record.category}</td>
                    <td class="text-end qty" style="cursor: pointer; width: 7rem;">1000</td>
                    <td>${record.symbol} - ${record.strike.toFixed(2)}</td>
                    <td>
                      <select class="due-date-dropdown" onchange="handleDueDateDropdownChange(this)">
                        ${getDueDateOptions(record.due_date)}
                      </select>
                    </td>
                    <td>
                      <select class="strike-percentage-dropdown" onchange="handleStrikePercentageDropdownChange(this, ${record.strike.toFixed(2)}, actualStockPrice)">
                        ${generateStrikePercentageOptions(record.strike.toFixed(2), actualStockPrice)}
                      </select>
                    </td>
                    <td class="text-end vol-column" style="display: none;">${parseFloat((companyStockVolatility.textContent).replace('%', '').trim())}</td>
                    <td class="text-end price"style="display: none;">${(record.close).toFixed(2)}</td>
                    <!--<td class="text-center"><svg style="color: red;margin-left: 30px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></td>-->
                `;
                tableBody.appendChild(newRow);
            });
    
    
            const filteredDataPutSpread = data.filter(record =>
              record.category === "PUT" &&
              parseFloat(record.strike) < (actualStockPrice) &&
              record.due_date == dueDateFence)
              .sort((a, b) => b.volume - a.volume)
              .slice(0, 1);
          
          
          
            filteredDataPutSpread.forEach((record, index) => {
                const action = "buy";
                const badgeClass = (action === "Sell") ? "badge-danger" : "badge-success";
          
                const newRow = document.createElement("tr");
                newRow.setAttribute("bid-ask", `${record.bid} ${record.ask}`);
                newRow.innerHTML = `
                    <td><span class="badge ${badgeClass}" style="cursor: pointer; width: 3.75rem; padding: 2px 3px; border-radius: 4px;">${action}</span></td>
                    <td>${record.category}</td>
                    <td class="text-end qty" style="cursor: pointer; width: 7rem;">1000</td>
                    <td>${record.symbol} - ${record.strike.toFixed(2)}</td>
                    <td>
                      <select class="due-date-dropdown" onchange="handleDueDateDropdownChange(this)">
                        ${getDueDateOptions(record.due_date)}
                      </select>
                    </td>
                    <td>
                      <select class="strike-percentage-dropdown" onchange="handleStrikePercentageDropdownChange(this, ${record.strike.toFixed(2)}, actualStockPrice)">
                        ${generateStrikePercentageOptions(record.strike.toFixed(2), actualStockPrice)}
                      </select>
                    </td>
                    <td class="text-end vol-column" style="display: none;">${parseFloat((companyStockVolatility.textContent).replace('%', '').trim())}</td>
                    <td class="text-end price"style="display: none;">${(record.close).toFixed(2)}</td>
                    <!--<td class="text-center"><svg style="color: red;margin-left: 30px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></td>-->
                `;
                tableBody.appendChild(newRow);
            });
          
          
            })
            .catch(error => console.error(error));
    
    
          }


          calculateTotalPrice();


          setInterval(calculateTotalPrice, 400);
        
          setTimeout(() => {
            document.getElementById('stock_searcher').style.display = 'none';
            document.getElementById('stocks_modal').style.display = 'none';
            document.getElementById('loading-card').style.display = 'none';
            document.getElementById('quote_page').style.display = 'block';
        }, 1200);
        
        })
        .catch(error => console.error(error));

        // const div = document.getElementById('dividendo-sintetico')
        // const financ = document.getElementById('financiamento')
        // const fence = document.getElementById('fence')
        // const customized = document.getElementById('customized')
        // financ.style.display = 'block'
        // div.style.display = 'block'
        // fence.style.display = 'block'
        // customized.style.display = 'block'

        function fetchData() {
      
          fetch(`https://api.oplab.com.br/v3/market/stocks/${formattedStockTicker}`, { headers })
            .then(response => response.json())
            .then(data => {
              const price = data.close;
              const variation = data.variation;
              const volatility = data.iv_current;
              const companyStockPrice = document.querySelector('.inv-title'); // get the p element
              companyStockPrice.textContent = price;
              if ((realTimeVol==false) && (document.querySelector('.principal-table-volatility').textContent=='')){
                const symbolsWithVol = []
                if (symbolsWithVol.includes(formattedStockTicker)) {
                const companyStockVolatility = document.querySelector('.principal-table-volatility'); // get the p element
                const filteredArray = volInformation 
                .filter(item => item.stock === formattedStockTicker)
                .map(item => {
                  return {
                    
                    volatility: parseFloat(item.volatility).toFixed(2)
                  };
                });
                companyStockVolatility.textContent = `${parseFloat(filteredArray[0].volatility).toFixed(2)}%`;
                } else{
                  const companyStockVolatility = document.querySelector('.principal-table-volatility'); // get the p element
                  companyStockVolatility.textContent = `${volatility.toFixed(2)}%`;
                }
                realTimeVol = true;
              
              } else if (realTimeVol){
                const symbolsWithVol = []
                if (symbolsWithVol.includes(formattedStockTicker)) {
                const companyStockVolatility = document.querySelector('.principal-table-volatility'); // get the p element
                const filteredArray = volInformation 
                .filter(item => item.stock === formattedStockTicker)
                .map(item => {
                  return {
                    
                    volatility: parseFloat(item.volatility).toFixed(2)
                  };
                });
                companyStockVolatility.textContent = `${parseFloat(filteredArray[0].volatility).toFixed(2)}%`;
                } else{
                  const companyStockVolatility = document.querySelector('.principal-table-volatility'); // get the p element
                  companyStockVolatility.textContent = `${volatility.toFixed(2)}%`;
                }
              
              }
            
              const companyStockDailyVariation = document.querySelector('.inv-number'); // get the p element
              if (variation>=0){
                companyStockDailyVariation.style.color = '#00ab55';
              } else {
                companyStockDailyVariation.style.color = 'red';
              }
              companyStockDailyVariation.textContent = `${variation}%`;


            
          
            })
            .catch(error => console.error(error));




            fetch(`https://api.oplab.com.br/v3/market/options/${formattedStockTicker}`, { headers })
            .then(response => response.json())
            .then(data => {
            stockOptionsChain = data;
          
            })
            .catch(error => console.error(error));
        }
      
        // call the function once to update the UI initially
        fetchData();
        updateDate();
        recalculatePrimeEquity();
        calculateClientPrime();
        calculateOptionPrice();
      
        // set an interval to call the fetchData function every 10 seconds
        setInterval(fetchData, 12000);
        setInterval(recalculatePrimeEquity, 10);
        setInterval(calculateClientPrime, 10);
        setInterval(updateDate, 1000);
        setInterval(calculateOptionPrice, 10);
        
        
      } else {
        var $_getValidationField = document.getElementsByClassName('validation-text');
        $_getValidationField[1].style.display = 'block'
        $_getValidationField[1].innerHTML = 'Essa ativo é invalido e/ou não possui opções em aberto.';
        document.getElementById('loading-card').style.display = 'none'
      }

    
  });
});




const tableBody = document.querySelector(".inv--product-table-section table tbody");

// add an event listener to the table's <tbody> element that handles badge clicks using event delegation
tableBody.addEventListener('click', function(event) {
  // check if the clicked element is a badge
  if (event.target.classList.contains('badge')) {
    const badge = event.target;
    if (badge.classList.contains('badge-success')) {
      badge.classList.remove('badge-success');
      badge.classList.add('badge-danger');
      badge.textContent = 'Sell';
    } else {
      badge.classList.remove('badge-danger');
      badge.classList.add('badge-success');
      badge.textContent = 'Buy';
    }
  }

  // get all <td> elements with class "qty"
const qtyTds = document.querySelectorAll(".qty");

// add an event listener to each <td> element with class "qty"
qtyTds.forEach(function(qtyTd) {
  qtyTd.addEventListener("click", function() {
    // create a new <input> element
    const inputEl = document.createElement("input");
    inputEl.classList.add('form-control');
    inputEl.style.padding = "0px 2px";
    inputEl.style.borderRadius = "3px";
    // set the input element's value to the current content of the <td>
    inputEl.value = qtyTd.textContent;
    // replace the <td> element's content with the <input> element
    qtyTd.innerHTML = "";
    qtyTd.appendChild(inputEl);
    // focus on the input element
    inputEl.focus();

    // add an event listener to the input element that listens for a "keyup" event
    inputEl.addEventListener("keyup", function(event) {
      // if the user pressed the "Enter" key
      if (event.key === "Enter") {
        // get the new value from the input element
        const newQty = inputEl.value;
        // set the <td> element's content to the new value
        qtyTd.textContent = newQty;
      // if the user pressed the "Escape" key
      } else if (event.key === "Escape") {
        // set the <td> element's content back to the original value
        qtyTd.innerHTML = qtyTd.dataset.originalValue;
      }
    });
  });

  // store the original content of the <td> element in a "data-original-value" attribute
  qtyTd.dataset.originalValue = qtyTd.textContent;
});

});


const table = document.querySelector(".inv--product-table-section table");

table.addEventListener("click", function(event) {
  if (event.target.tagName === "svg") {
    const row = event.target.closest("tr");
    row.remove();
  }
});

$('#add-option').on('click', function(event) {
  document.getElementById('addContactModalTitleLabel1').innerText = 'Add Option'
  $('#addContactModal #btn-add').show();
  $('#addContactModal #btn-edit').hide();
  $('#addContactModal').modal('show');
})

const optionSearch = document.getElementById("option-search");
const optionList = document.getElementById("options-list");
const dropdownToggle = document.querySelector(".dropdown-toggle");

// Filter the options based on user input
function filterOptions() {
  // Get the user input
  const inputValue = optionSearch.value.toUpperCase();

  // Clear the previous options
  optionList.innerHTML = "";

  // Generate new options based on the search query
  const filteredOptions = stockOptionsChain.filter(option => option.name.toUpperCase().includes(inputValue));

  // Add the filtered options to the list
  filteredOptions.forEach(option => {
    const newOption = document.createElement("a");
    newOption.classList.add("dropdown-item");
    newOption.innerHTML = option.name + `, ${option.category}`;
    newOption.addEventListener("click", () => {
      dropdownToggle.innerHTML = option.name;
      
      document.getElementById("option-field").innerHTML = option.symbol;
    });
    optionList.appendChild(newOption);
  });
}

// Add event listener for key up events
optionSearch.addEventListener("keyup", filterOptions);



const btnAdd = document.querySelector("#btn-add");
btnAdd.addEventListener("click", function() {
  const optionField = document.querySelector("#option-field");
  const qtyInserted = document.querySelector("#qty-inserted");

  if (optionField.textContent !== "" && qtyInserted.value.trim() !== "") {
    const option = stockOptionsChain.filter(item => item.symbol === optionField.textContent)[0];
    const companyStockVolatility = document.querySelector(".principal-table-volatility");
    const tableBody = document.querySelector(".inv--product-table-section table tbody");
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td><span class="badge badge-success" style="cursor: pointer;">Buy</span></td>
      <td>${option.category}</td>
      <td>${record.symbol} - ${record.strike.toFixed(2)}</td>
      <td>
        <select class="due-date-dropdown" onchange="handleDueDateDropdownChange(this)">
          ${getDueDateOptions(record.due_date)}
        </select>
      </td>
      <td>
        <select class="strike-percentage-dropdown" onchange="handleStrikePercentageDropdownChange(this, ${option.strike}, actualStockPrice)">
          ${generateStrikePercentageOptions(option.strike, actualStockPrice)}
        </select>
      </td>
      <td class="text-end qty">${qtyInserted.value}</td>
      <td class="text-end vol-column" style="display: none;">${parseFloat((companyStockVolatility.textContent).replace('%', '').trim())}</td>
      <td class="text-end price"style="display: none;">${(option.close).toFixed(2)}</td>
      <td class="text-center"><svg style="color: red;margin-left: 30px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></td>
    `;
    tableBody.appendChild(newRow);

    optionField.textContent = "";
    qtyInserted.value = "";
    $('#addContactModal').modal('hide');
  }
});






const boardVolatility = document.querySelector(".principal-table-volatility")
boardVolatility.addEventListener("click", function() {
  // create a new <input> element
  realTimeVol = false;
  const inputEl = document.createElement("input");
  inputEl.classList.add('form-control');
  inputEl.style.padding = "2px 3px";
  // set the input element's value to the current content of the <td>
  inputEl.value = boardVolatility.textContent;
  // replace the <td> element's content with the <input> element
  boardVolatility.innerHTML = "";
  boardVolatility.appendChild(inputEl);
  // focus on the input element
  inputEl.focus();

  // add an event listener to the input element that listens for a "keyup" event
  inputEl.addEventListener("keyup", function(event) {
    // if the user pressed the "Enter" key
    if (event.key === "Enter") {
      // get the new value from the input element
      const newQty = inputEl.value;
      // set the <td> element's content to the new value
      boardVolatility.textContent = newQty;
    // if the user pressed the "Escape" key
    } else if (event.key === "Escape") {
      // set the <td> element's content back to the original value
      boardVolatility.innerHTML = boardVolatility.dataset.originalValue;
    }
  });
});


setInterval(function() {
  var principalVol = document.querySelector('.principal-table-volatility').innerText;
  var volColumns = document.querySelectorAll('.vol-column');
  
  volColumns.forEach(function(volColumn) {
    if (volColumn.classList.contains('balizated-vol')){

    } else{
      volColumn.innerText = principalVol.replace('%', '');
    }
    
  });
}, 10);






// Get the necessary elements from the DOM
const addCallButton = document.getElementById("add-call");
const addPutButton = document.getElementById("add-put");
const tableBodyCallInsert =  document.querySelector(".inv--product-table-section table tbody");
const tableBodyPutInsert =  document.querySelector(".inv--product-table-section table tbody");
// Add a click event listener to the "Add Call" button
// addCallButton.addEventListener("click", addNewCall);

// Function to add a new row for the call option
// function addNewCall() {
//   const calls = stockOptionsChain.filter(record => record.category === "CALL");


//   const existingSymbols = Array.from(tableBody.querySelectorAll("td:nth-child(3)")).map(td => td.textContent);

//   // Filter for the closest value of actualStockPrice and symbol not already present
//   const filteredCalls = calls.filter(call =>
//     !existingSymbols.includes(call.symbol) &&
//     parseFloat(call.strike) < actualStockPrice 
//   ).sort((a, b) => b.strike - a.strike)
//   .slice(0, 1);

//   if (filteredCalls.length === 0) {
//     alert("No suitable call options found.");
//     return;
//   }

//   // Create a new row and populate it with data from the filtered call options
//   const newRow = document.createElement("tr");
//   const actionNew = 'Buy';
//   const badgeClassNew = 'badge-success';
//   const record = filteredCalls[0]; // Use the first filtered call option
//   newRow.setAttribute("bid-ask", `${record.bid} ${record.ask}`);
//   newRow.innerHTML = `
//     <td><span class="badge ${badgeClassNew}" style="cursor: pointer;">${actionNew}</span></td>
//     <td>${record.category}</td>
//     <td>${record.symbol}</td>
//     <td>${record.due_date}</td>
//     <td>${record.strike.toFixed(2)}</td>
//     <td class="text-end qty">1000</td>
//     <td class="text-end vol-column" style="display: none;">${parseFloat(document.querySelector('.principal-table-volatility').textContent.replace('%', '').trim())}</td>
//     <td class="text-end price"style="display: none;">${record.close.toFixed(2)}</td>
//     <td class="text-center">
//       <svg style="color: red; margin-left: 30px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel">
//         <circle cx="12" cy="12" r="10"></circle>
//         <line x1="15" y1="9" x2="9" y2="15"></line>
//         <line x1="9" y1="9" x2="15" y2="15"></line>
//       </svg>
//     </td>
//   `;

//   tableBodyCallInsert.appendChild(newRow);
// }

// addPutButton.addEventListener("click", addNewPut);

// Function to add a new row for the Put option
function addNewPut() {
  const puts = stockOptionsChain.filter(record => record.category === "PUT");

  const existingSymbols = Array.from(tableBody.querySelectorAll("td:nth-child(4)")).map(td => td.textContent.split('-')[0].replace(' ', ''));

  // Filter for the closest value of actualStockPrice and symbol not already present
  const filteredputs = puts.filter(put =>
    !existingSymbols.includes(put.symbol) &&
    parseFloat(put.strike) < actualStockPrice 
  ).sort((a, b) => b.strike - a.strike)
  .slice(0, 1);
  

  if (filteredputs.length === 0) {
    alert("No suitable put options found.");
    return;
  }

  // Create a new row and populate it with data from the filtered put options
  const newRow = document.createElement("tr");
  const actionNew = 'Buy';
  const badgeClassNew = 'badge-success';
  const record = filteredputs[0]; // Use the first filtered put option
  newRow.setAttribute("bid-ask", `${record.bid} ${record.ask}`);
  newRow.innerHTML = `
    <td><span class="badge ${badgeClassNew}" style="cursor: pointer;">${actionNew}</span></td>
    <td>${record.category}</td>
    <td class="text-end qty">1000</td>
    <td>${record.symbol} - ${record.strike.toFixed(2)}</td>
    <td>
      <select class="due-date-dropdown" onchange="handleDueDateDropdownChange(this)">
        ${getDueDateOptions(record.due_date)}
      </select>
    </td>
    <td>
      <select class="strike-percentage-dropdown" onchange="handleStrikePercentageDropdownChange(this, ${record.strike.toFixed(2)}, actualStockPrice)">
        ${generateStrikePercentageOptions(record.strike.toFixed(2), actualStockPrice)}
      </select>
    </td>

    
    <td class="text-end vol-column" style="display: none;">${parseFloat(document.querySelector('.principal-table-volatility').textContent.replace('%', '').trim())}</td>
    <td class="text-end price"style="display: none;">${record.close.toFixed(2)}</td>
    <td class="text-center">
      <svg style="color: red; margin-left: 30px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
      </svg>
    </td>
  `;

  tableBodyPutInsert.appendChild(newRow);
}


function addNewCall() {
    const calls = stockOptionsChain.filter(record => record.category === "CALL");
  
  
    const existingSymbols = Array.from(tableBody.querySelectorAll("td:nth-child(4)")).map(td => td.textContent.split('-')[0].replace(' ', ''));
    
    // Filter for the closest value of actualStockPrice and symbol not already present
    const filteredCalls = calls.filter(call =>
      !existingSymbols.includes(call.symbol) &&
      parseFloat(call.strike) < actualStockPrice 
    ).sort((a, b) => b.strike - a.strike)
    .slice(0, 1);
  
    if (filteredCalls.length === 0) {
      alert("No suitable call options found.");
      return;
    }
  
    // Create a new row and populate it with data from the filtered call options
    const newRow = document.createElement("tr");
    const actionNew = 'Buy';
    const badgeClassNew = 'badge-success';
    const record = filteredCalls[0]; // Use the first filtered call option
    newRow.setAttribute("bid-ask", `${record.bid} ${record.ask}`);
    newRow.innerHTML = `
  <td><span class="badge ${badgeClassNew}" style="cursor: pointer;">${actionNew}</span></td>
  <td>${record.category}</td>
  <td class="text-end qty">1000</td>
  <td>${record.symbol} - ${record.strike.toFixed(2)}</td>
  <td>
    <select class="due-date-dropdown" onchange="handleDueDateDropdownChange(this)">
      ${getDueDateOptions(record.due_date)}
    </select>
  </td>
  <td>
    <select class="strike-percentage-dropdown" onchange="handleStrikePercentageDropdownChange(this, ${record.strike.toFixed(2)}, actualStockPrice)">
      ${generateStrikePercentageOptions(record.strike.toFixed(2), actualStockPrice)}
    </select>
  </td>
  <td class="text-end vol-column" style="display: none;">${parseFloat(document.querySelector('.principal-table-volatility').textContent.replace('%', '').trim())}</td>
  <td class="text-end price"style="display: none;">${record.close.toFixed(2)}</td>
  <td class="text-center">
    <svg style="color: red; margin-left: 30px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="15" y1="9" x2="9" y2="15"></line>
      <line x1="9" y1="9" x2="15" y2="15"></line>
    </svg>
  </td>
`;
  
    tableBodyCallInsert.appendChild(newRow);
  }


  
  function getSymbolOptions(category, due_date, selectedSymbol) {
  // Filter the stockOptionsChain array based on category and due_date
  const filteredOptions = stockOptionsChain.filter(option => option.category === category && option.due_date === due_date);

  // Generate the option elements for the dropdown, and set the selected option
  const optionElements = filteredOptions.map(option => {
    if (option.symbol === selectedSymbol) {
      return `<option value="${option.symbol} - ${option.strike}" selected>${option.symbol} - ${option.strike}</option>`;
    } else {
      return `<option value="${option.symbol} - ${option.strike}">${option.symbol} - ${option.strike}</option>`;
    }
  }).join('');

  return optionElements;
}


function getDueDateOptions(selectedDueDate) {
  // Extract unique due_date values from the stockOptionsChain array
  const uniqueDueDates = [...new Set(stockOptionsChain.map(option => option.due_date))];

  // Generate the option elements for the dropdown, and set the selected option
  const optionElements = uniqueDueDates.map(dueDate => {
    if (dueDate === selectedDueDate) {
      return `<option value="${dueDate}" selected>${dueDate}</option>`;
    } else {
      return `<option value="${dueDate}">${dueDate}</option>`;
    }
  }).join('');

  return optionElements;
}

function handleDueDateChange(selectElement) {
  const selectedDueDate = selectElement.value;
  const row = selectElement.closest('tr');
  const symbolDropdown = row.querySelector('.symbol-dropdown');

  // Get the selected symbol, if any
  var selectedSymbol = symbolDropdown.value;
  var selectedSymbol = selectedSymbol.splt('-')[0].replace(' ', '');

  // Update the symbol dropdown options based on the selected due_date
  const category = row.cells[1].textContent;
  const newOptions = getSymbolOptions(category, selectedDueDate, selectedSymbol);
  const StrikePercentageDropdown = row.querySelector('.strike-percentage-dropdown');

  // Get the selected StrikePercentage, if any
  var selectedStrikePercentage = parseInt(StrikePercentageDropdown.value);
  let closestRecord;
  let closestPercentageDiff = Number.MAX_VALUE;
  newOptions.forEach(record => {
    const percentage = record.strike / actualStockPrice * 100;
    const percentageDiff = Math.abs(percentage - selectedStrikePercentage);
    if (percentageDiff < closestPercentageDiff) {
      closestPercentageDiff = percentageDiff;
      closestRecord = record;
    }
  });
  
  // Set the text content of the 3rd column with the closest record information
 
  row.cells[3].textContent = `${closestRecord.symbol} - ${closestRecord.strike.toFixed(2)}`;
}

function handleDueDateDropdownChange(selectElement) {
  const selectedDueDate = selectElement.value;
  const row = selectElement.closest('tr');
  const symbolDropdown = row.querySelector('.symbol-dropdown');

  // Update the symbol dropdown options based on the selected due_date
  const category = row.cells[1].textContent;
  const newOptions = getSymbolSelect(category, selectedDueDate);
  const StrikePercentageDropdown = row.querySelector('.strike-percentage-dropdown');

  // Get the selected StrikePercentage, if any
  var selectedStrikePercentage = parseInt(StrikePercentageDropdown.value);
  console.log(selectedStrikePercentage)
  let closestRecord;
  let closestPercentageDiff = Number.MAX_VALUE;
  newOptions.forEach(record => {
    const percentage = record.strike / actualStockPrice * 100;
    const percentageDiff = Math.abs(percentage - selectedStrikePercentage);

    if (percentageDiff < closestPercentageDiff) {
      closestPercentageDiff = percentageDiff;
      closestRecord = record;
    }
  });

  // Set the text content of the 3rd column with the closest record information
 
  row.cells[3].textContent = `${closestRecord.symbol} - ${closestRecord.strike.toFixed(2)}`;

  // Atualize a <p class="strike-bullish-scenario"> com base no valor do strike
  const newValueStrikeScenarios = `${closestRecord.strike.toFixed(2)}`;
  updateValueStrikeScenarios(newValueStrikeScenarios);

}


function getSymbolSelect(category, due_date) {
  // Filter the stockOptionsChain array based on category and due_date
  const filteredOptions = stockOptionsChain.filter(option => option.category === category && option.due_date === due_date);
  
  // Generate the option elements for the dropdown
  const optionElements = filteredOptions.map(option => `${option.symbol} - ${option.strike}`);
  
  return filteredOptions;
}

function switchStock(){
  
  document.getElementById('loading-card').style.display = 'block'
  const inputValue = document.querySelector('.in-heading').textContent;
  testStockTicker = inputValue.replace(/\s+/g, '').toUpperCase();
  // include the Access-Token header
  const symbols = availableStocks.map(item => item.symbol);
      
  if (symbols.includes(testStockTicker)) {
    

  var tableBodyInitial = document.querySelector(".inv--product-table-section table tbody");

  while (tableBodyInitial.firstChild) {
    tableBodyInitial.firstChild.remove();
  }

  


  const searchValue = document.querySelector('.in-heading').textContent;
  formattedStockTicker = searchValue.replace(/\s+/g, '').toUpperCase();
  document.querySelector('.in-heading').textContent = formattedStockTicker;  
    

    
  
    fetch(`https://api.oplab.com.br/v3/market/stocks/${formattedStockTicker}`, { headers })
    .then(response => response.json())
    .then(data => {
      const name = data.name; // get the name field from the response
      const sector = data.sector;
      const price = data.close;
      const variation = data.variation;
      const volatility = data.iv_current;
      // const companyName = document.querySelector('.inv-street-addr'); // get the p element
      // companyName.textContent = name;
      // const companySector = document.querySelector('.inv-email-address'); // get the p element
      // companySector.textContent = sector;
      const companyStockPrice = document.querySelector('.inv-title'); // get the p element
      companyStockPrice.textContent = price;
      const companyStockVolatility = document.querySelector('.principal-table-volatility'); // get the p element
      companyStockVolatility.textContent = `${volatility.toFixed(2)}%`;
      const companyStockDailyVariation = document.querySelector('.inv-number'); // get the p element
      if (variation>=0){
        companyStockDailyVariation.style.color = 'green';
      } else {
        companyStockDailyVariation.style.color = 'red';
      }
      companyStockDailyVariation.textContent = `${variation}%`;


      var today = new Date();


      // format the date and time to match the desired format
      var formattedDateTime = formatDateTime(today);


      // set the formatted date and time as the text content of the element
      document.querySelector('.inv-date').textContent = formattedDateTime;
      document.querySelector('.inv-email-operation').textContent = optionStrategySelected;


      if (optionStrategySelected=="Bull Put Spread"){

        const tableBody = document.querySelector(".inv--product-table-section table tbody");
        fetch(`https://api.oplab.com.br/v3/market/options/${formattedStockTicker}`, { headers })
        .then(response => response.json())
        .then(data => {
        stockOptionsChain = data;
        const filteredData = data.filter(record =>
          record.category === "PUT" &&
          parseFloat(record.strike) < actualStockPrice &&
          ((new Date(record.due_date) - Date.now()) / (1000 * 60 * 60 * 24)) > 25)
          .sort((a, b) => b.strike - a.strike);
      
        const firstRecord = filteredData[0];
        const secondRecord = filteredData.find(record => parseFloat(record.strike) < firstRecord.strike * 0.93 && record.due_date === firstRecord.due_date);
      
        const result = [firstRecord, secondRecord].filter(record => record !== undefined);
      
        const maxStrike = Math.max(...result.map(record => record.strike));
        const minStrike = Math.min(...result.map(record => record.strike));
      
        result.forEach((record, index) => {
            const action = (record.strike === maxStrike) ? "Sell" : "Buy";
            const badgeClass = (action === "Sell") ? "badge-danger" : "badge-success";
      
            const newRow = document.createElement("tr");
            newRow.setAttribute("bid-ask", `${record.bid} ${record.ask}`);
            newRow.innerHTML = `
                <td><span class="badge ${badgeClass}" style="cursor: pointer;">${action}</span></td>
                <td>${record.category}</td>
                <td class="text-end qty">1000</td>
                <td>${record.symbol} - ${record.strike.toFixed(2)}</td>
                <td>
                  <select class="due-date-dropdown" onchange="handleDueDateDropdownChange(this)">
                    ${getDueDateOptions(record.due_date)}
                  </select>
                </td>
                <td>
                  <select class="strike-percentage-dropdown" onchange="handleStrikePercentageDropdownChange(this, ${record.strike.toFixed(2)}, actualStockPrice)">
                    ${generateStrikePercentageOptions(record.strike.toFixed(2), actualStockPrice)}
                  </select>
                </td>
                
                <td class="text-end vol-column" style="display: none;">${parseFloat((companyStockVolatility.textContent).replace('%', '').trim())}</td>
                <td class="text-end price"style="display: none;">${(record.close).toFixed(2)}</td>
                <td class="text-center"><svg style="color: red;margin-left: 30px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></td>
            `;
            tableBody.appendChild(newRow);
        });
      
      
        })
        .catch(error => console.error(error));




      } else if (optionStrategySelected=="Bear Call Spread"){
      
        const tableBody = document.querySelector(".inv--product-table-section table tbody");
        fetch(`https://api.oplab.com.br/v3/market/options/${formattedStockTicker}`, { headers })
        .then(response => response.json())
        .then(data => {
        stockOptionsChain = data;
        const filteredData = data.filter(record =>
          record.category === "CALL" &&
          parseFloat(record.strike) > actualStockPrice &&
          ((new Date(record.due_date) - Date.now()) / (1000 * 60 * 60 * 24)) > 28)
          .sort((a, b) => a.strike - b.strike);
      
        const firstRecord = filteredData[0];
        const secondRecord = filteredData.find(record => parseFloat(record.strike) > firstRecord.strike * 1.07 && record.due_date === firstRecord.due_date);
      
        const result = [firstRecord, secondRecord].filter(record => record !== undefined);
      
        const maxStrike = Math.max(...result.map(record => record.strike));
        const minStrike = Math.min(...result.map(record => record.strike));
      
        result.forEach((record, index) => {
            const action = (record.strike === minStrike) ? "Sell" : "Buy";
            const badgeClass = (action === "Sell") ? "badge-danger" : "badge-success";
      
            const newRow = document.createElement("tr");
            newRow.setAttribute("bid-ask", `${record.bid} ${record.ask}`);
            newRow.innerHTML = `
                <td><span class="badge ${badgeClass}" style="cursor: pointer;">${action}</span></td>
                <td>${record.category}</td>
                <td class="text-end qty">1000</td>
                <td>${record.symbol} - ${record.strike.toFixed(2)}</td>
                <td>
                  <select class="due-date-dropdown" onchange="handleDueDateDropdownChange(this)">
                    ${getDueDateOptions(record.due_date)}
                  </select>
                </td>
                <td>
                  <select class="strike-percentage-dropdown" onchange="handleStrikePercentageDropdownChange(this, ${record.strike.toFixed(2)}, actualStockPrice)">
                    ${generateStrikePercentageOptions(record.strike.toFixed(2), actualStockPrice)}
                  </select>
                </td>
                <td class="text-end vol-column" style="display: none;">${parseFloat((companyStockVolatility.textContent).replace('%', '').trim())}</td>
                <td class="text-end price"style="display: none;">${(record.close).toFixed(2)}</td>
                <td class="text-center"><svg style="color: red;margin-left: 30px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></td>
            `;
            tableBody.appendChild(newRow);
        });
      
      
        })
        .catch(error => console.error(error));


      } else if (optionStrategySelected=="Dividendo Sintético"){
        // esconde o card recomendado da propria estrutura
        const dividendo = document.getElementById('dividendo-sintetico')
        dividendo.style.display = 'none'

        const tableBody = document.querySelector(".inv--product-table-section table tbody");
        // verifica se ja tem alguma linha na tabela e remove
            const existingRows = tableBody.querySelectorAll("tr");
            for (let i = 0; i < existingRows.length; i++) {
              tableBody.removeChild(existingRows[i]);
            }

        fetch(`https://api.oplab.com.br/v3/market/options/${formattedStockTicker}`, { headers })
        .then(response => response.json())
        .then(data => {
        stockOptionsChain = data;

        // Lista com todas as DueDates
        const uniqueDueDates = [...new Set(stockOptionsChain.map(option => option.due_date))];

        const filteredData = data.filter(record =>
          record.category === "PUT" &&
          parseFloat(record.strike) < 0.95*actualStockPrice &&
          record.due_date === uniqueDueDates[0]
        )
        .sort((a, b) => b.strike - a.strike)
        .slice(0, 1);

      

        filteredData.forEach((record, index) => {
            const action = 'Sell';
            const badgeClass = (action === "Sell") ? "badge-danger" : "badge-success";
      
            const newRow = document.createElement("tr");
            newRow.setAttribute("bid-ask", `${record.bid} ${record.ask}`);
            newRow.innerHTML = `
                <td><span class="badge ${badgeClass}" style="cursor: pointer;">${action}</span></td>
                <td>${record.category}</td>
                <td class="text-end qty">1000</td>
                <td>${record.symbol} - ${record.strike.toFixed(2)}</td>
                <td>
                  <select class="due-date-dropdown" onchange="handleDueDateDropdownChange(this)">
                    ${getDueDateOptions(record.due_date)}
                  </select>
                </td>
                <td>
                  <select class="strike-percentage-dropdown" onchange="handleStrikePercentageDropdownChange(this, ${record.strike.toFixed(2)}, actualStockPrice)">
                    ${generateStrikePercentageOptions(record.strike.toFixed(2), actualStockPrice)}
                  </select>
                </td>
                <td class="text-end vol-column" style="display: none;">${parseFloat((companyStockVolatility.textContent).replace('%', '').trim())}</td>
                <td class="text-end price"style="display: none;">${(record.close).toFixed(2)}</td>
                <!--<td class="text-center"><svg style="color: red;margin-left: 30px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></td>-->
            `;
            tableBody.appendChild(newRow);
        });
      
      
        })
        .catch(error => console.error(error));




      } else if (optionStrategySelected=="Fence"){

        const fence = document.getElementById('fence')
        fence.style.display = 'none'

        const tableBody = document.querySelector(".inv--product-table-section table tbody");

        // verifica se ja tem alguma linha na tabela e remove
        const existingRows = tableBody.querySelectorAll("tr");
        for (let i = 0; i < existingRows.length; i++) {
              tableBody.removeChild(existingRows[i]);
            }

        fetch(`https://api.oplab.com.br/v3/market/options/${formattedStockTicker}`, { headers })
        .then(response => response.json())
        .then(data => {
        stockOptionsChain = data;
        const filteredDataCall = data.filter(record =>
          record.category === "CALL" &&
          parseFloat(record.strike) > actualStockPrice * 1.05 &&
          ((new Date(record.due_date) - Date.now()) / (1000 * 60 * 60 * 24)) > 25
        )
        .sort((a, b) => a.strike - b.strike)
        .slice(0, 1);
        const dueDateFence = filteredDataCall[0].due_date;
      
      
        filteredDataCall.forEach((record, index) => {
            const action = 'Sell';
            const badgeClass = (action === "Sell") ? "badge-danger" : "badge-success";
      
            const newRow = document.createElement("tr");
            newRow.setAttribute("bid-ask", `${record.bid} ${record.ask}`);
            newRow.innerHTML = `
                <td><span class="badge ${badgeClass}" style="cursor: pointer;">${action}</span></td>
                <td>${record.category}</td>
                <td class="text-end qty">1000</td>
                <td>
                  <select class="symbol-dropdown"  onchange="handleDueDateChange(this)">
                    ${getSymbolOptions(record.category, record.due_date, record.symbol)}
                  </select>
                </td>
                <td>
                  <select class="due-date-dropdown" onchange="handleDueDateDropdownChange(this)">
                    ${getDueDateOptions(record.due_date)}
                  </select>
                </td>
                <td>${(record.strike).toFixed(2)}</td>
                <td class="text-end vol-column" style="display: none;">${parseFloat((companyStockVolatility.textContent).replace('%', '').trim())}</td>
                <td class="text-end price"style="display: none;">${(record.close).toFixed(2)}</td>
                <td class="text-center"><svg style="color: red;margin-left: 30px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></td>
            `;
            tableBody.appendChild(newRow);
        });


        const filteredData = data.filter(record =>
          record.category === "PUT" &&
          parseFloat(record.strike) < actualStockPrice &&
          (record.due_date==dueDateFence))
          .sort((a, b) => b.strike - a.strike);
      
        const firstRecord = filteredData[0];
        const secondRecord = filteredData.find(record => parseFloat(record.strike) < firstRecord.strike * 0.93 && record.due_date === firstRecord.due_date);
      
        const result = [firstRecord, secondRecord].filter(record => record !== undefined);
      
        const maxStrike = Math.max(...result.map(record => record.strike));
        const minStrike = Math.min(...result.map(record => record.strike));
      
        result.forEach((record, index) => {
            const action = (record.strike === minStrike) ? "Sell" : "Buy";
            const badgeClass = (action === "Sell") ? "badge-danger" : "badge-success";
      
            const newRow = document.createElement("tr");
            newRow.setAttribute("bid-ask", `${record.bid} ${record.ask}`);
            newRow.innerHTML = `
                <td><span class="badge ${badgeClass}" style="cursor: pointer;">${action}</span></td>
                <td>${record.category}</td>
                <td class="text-end qty">1000</td>
                <td>${record.symbol} - ${record.strike.toFixed(2)}</td>
                <td>
                  <select class="due-date-dropdown" onchange="handleDueDateDropdownChange(this)">
                    ${getDueDateOptions(record.due_date)}
                  </select>
                </td>
                <td>
                  <select class="strike-percentage-dropdown" onchange="handleStrikePercentageDropdownChange(this, ${record.strike.toFixed(2)}, actualStockPrice)">
                    ${generateStrikePercentageOptions(record.strike.toFixed(2), actualStockPrice)}
                  </select>
                </td>
                <td class="text-end vol-column" style="display: none;">${parseFloat((companyStockVolatility.textContent).replace('%', '').trim())}</td>
                <td class="text-end price"style="display: none;">${(record.close).toFixed(2)}</td>
                <td class="text-center"><svg style="color: red;margin-left: 30px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></td>
            `;
            tableBody.appendChild(newRow);
        });
      
      
        })
        .catch(error => console.error(error));
      } else if (optionStrategySelected=="Financiamento"){

        const financ = document.getElementById('financiamento')
        financ.style.display = 'none'

        const tableBody = document.querySelector(".inv--product-table-section table tbody");


        const existingRows = tableBody.querySelectorAll("tr");
        for (let i = 0; i < existingRows.length; i++) {
              tableBody.removeChild(existingRows[i]);
            }
        fetch(`https://api.oplab.com.br/v3/market/options/${formattedStockTicker}`, { headers })
        .then(response => response.json())
        .then(data => {
        stockOptionsChain = data;
        const filteredDataCall = data.filter(record =>
          record.category === "CALL" &&
          parseFloat(record.strike) > (actualStockPrice * 1.05) &&
          ((new Date(record.due_date) - Date.now()) / (1000 * 60 * 60 * 24)) > 55
        )
        .sort((a, b) => b.volume - a.volume)
        .slice(0, 1);
        const dueDateFence = filteredDataCall[0].due_date;
      
      
        filteredDataCall.forEach((record, index) => {
            const action = 'Sell';
            const badgeClass = (action == "Sell") ? "badge-danger" : "badge-success";
      
            const newRow = document.createElement("tr");
            newRow.setAttribute("bid-ask", `${record.bid} ${record.ask}`);
            newRow.innerHTML = `
                <td><span class="badge ${badgeClass}" style="cursor: pointer;">${action}</span></td>
                <td>${record.category}</td>
                <td class="text-end qty">1000</td>
                <td>${record.symbol} - ${record.strike.toFixed(2)}</td>
                <td>
                  <select class="due-date-dropdown" onchange="handleDueDateDropdownChange(this)">
                    ${getDueDateOptions(record.due_date)}
                  </select>
                </td>
                <td>
                  <select class="strike-percentage-dropdown" onchange="handleStrikePercentageDropdownChange(this, ${record.strike.toFixed(2)}, actualStockPrice)">
                    ${generateStrikePercentageOptions(record.strike.toFixed(2), actualStockPrice)}
                  </select>
                </td>
                <td class="text-end vol-column" style="display: none;">${parseFloat((companyStockVolatility.textContent).replace('%', '').trim())}</td>
                <td class="text-end price"style="display: none;">${(record.close).toFixed(2)}</td>
                <td class="text-center"><svg style="color: red;margin-left: 30px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></td>
            `;
            tableBody.appendChild(newRow);
        });


      
      
      
        })
        .catch(error => console.error(error));


      } else if (optionStrategySelected=="Booster (Double Up)"){
        const tableBody = document.querySelector(".inv--product-table-section table tbody");
        fetch(`https://api.oplab.com.br/v3/market/options/${formattedStockTicker}`, { headers })
        .then(response => response.json())
        .then(data => {
        stockOptionsChain = data;
        const filteredDataCall = data.filter(record =>
          record.category === "CALL" &&
          parseFloat(record.strike) > (actualStockPrice * 1.05) &&
          ((new Date(record.due_date) - Date.now()) / (1000 * 60 * 60 * 24)) > 32
        )
        .sort((a, b) => b.volume - a.volume)
        .slice(0, 1);
        const dueDateFence = filteredDataCall[0].due_date;
        const callBuyBoosterStrike = filteredDataCall[0].strike;
      
      
        filteredDataCall.forEach((record, index) => {
            const action = 'Buy';
            const badgeClass = (action == "Sell") ? "badge-danger" : "badge-success";
      
            const newRow = document.createElement("tr");
            newRow.setAttribute("bid-ask", `${record.bid} ${record.ask}`);
            newRow.innerHTML = `
                <td><span class="badge ${badgeClass}" style="cursor: pointer;">${action}</span></td>
                <td>${record.category}</td>
                <td class="text-end qty">1000</td>
                <td>${record.symbol} - ${record.strike.toFixed(2)}</td>
                <td>
                  <select class="due-date-dropdown" onchange="handleDueDateDropdownChange(this)">
                    ${getDueDateOptions(record.due_date)}
                  </select>
                </td>
                <td>
                  <select class="strike-percentage-dropdown" onchange="handleStrikePercentageDropdownChange(this, ${record.strike.toFixed(2)}, actualStockPrice)">
                    ${generateStrikePercentageOptions(record.strike.toFixed(2), actualStockPrice)}
                  </select>
                </td>
                <td class="text-end vol-column" style="display: none;">${parseFloat((companyStockVolatility.textContent).replace('%', '').trim())}</td>
                <td class="text-end price"style="display: none;">${(record.close).toFixed(2)}</td>
                <td class="text-center"><svg style="color: red;margin-left: 30px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></td>
            `;
            tableBody.appendChild(newRow);
        });


        const filteredDataPutSpread = data.filter(record =>
          record.category === "CALL" &&
          parseFloat(record.strike) > (actualStockPrice*1.12) &&
          record.due_date == dueDateFence && record.strike > callBuyBoosterStrike)
        
          .slice(0, 1);
      
      
      
        filteredDataPutSpread.forEach((record, index) => {
            const action = "Sell";
            const badgeClass = (action === "Sell") ? "badge-danger" : "badge-success";
      
            const newRow = document.createElement("tr");
            newRow.setAttribute("bid-ask", `${record.bid} ${record.ask}`);
            newRow.innerHTML = `
                <td><span class="badge ${badgeClass}" style="cursor: pointer;">${action}</span></td>
                <td>${record.category}</td>
                <td class="text-end qty">2000</td>
                <td>${record.symbol} - ${record.strike.toFixed(2)}</td>
                <td>
                  <select class="due-date-dropdown" onchange="handleDueDateDropdownChange(this)">
                    ${getDueDateOptions(record.due_date)}
                  </select>
                </td>
                <td>
                  <select class="strike-percentage-dropdown" onchange="handleStrikePercentageDropdownChange(this, ${record.strike.toFixed(2)}, actualStockPrice)">
                    ${generateStrikePercentageOptions(record.strike.toFixed(2), actualStockPrice)}
                  </select>
                </td>
                <td class="text-end vol-column" style="display: none;">${parseFloat((companyStockVolatility.textContent).replace('%', '').trim())}</td>
                <td class="text-end price"style="display: none;">${(record.close).toFixed(2)}</td>
                <td class="text-center"><svg style="color: red;margin-left: 30px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></td>
            `;
            tableBody.appendChild(newRow);
        });
      
      
        })
        .catch(error => console.error(error));


      } else if (optionStrategySelected=="Call Backspread"){
        const tableBody = document.querySelector(".inv--product-table-section table tbody");
        fetch(`https://api.oplab.com.br/v3/market/options/${formattedStockTicker}`, { headers })
        .then(response => response.json())
        .then(data => {
        stockOptionsChain = data;
        const filteredDataCall = data.filter(record =>
          record.category === "CALL" &&
          parseFloat(record.strike) < (actualStockPrice * 0.96) &&
          ((new Date(record.due_date) - Date.now()) / (1000 * 60 * 60 * 24)) > 32
        )
        .sort((a, b) => b.volume - a.volume)
        .slice(0, 1);
        const dueDateFence = filteredDataCall[0].due_date;
        const callBuyBoosterStrike = filteredDataCall[0].strike;
      
      
        filteredDataCall.forEach((record, index) => {
            const action = 'Sell';
            const badgeClass = (action == "Sell") ? "badge-danger" : "badge-success";
      
            const newRow = document.createElement("tr");
            newRow.setAttribute("bid-ask", `${record.bid} ${record.ask}`);
            newRow.innerHTML = `
                <td><span class="badge ${badgeClass}" style="cursor: pointer;">${action}</span></td>
                <td>${record.category}</td>
                <td class="text-end qty">1000</td>
                <td>${record.symbol} - ${record.strike.toFixed(2)}</td>
                <td>
                  <select class="due-date-dropdown" onchange="handleDueDateDropdownChange(this)">
                    ${getDueDateOptions(record.due_date)}
                  </select>
                </td>
                <td>
                  <select class="strike-percentage-dropdown" onchange="handleStrikePercentageDropdownChange(this, ${record.strike.toFixed(2)}, actualStockPrice)">
                    ${generateStrikePercentageOptions(record.strike.toFixed(2), actualStockPrice)}
                  </select>
                </td>
                <td class="text-end vol-column" style="display: none;">${parseFloat((companyStockVolatility.textContent).replace('%', '').trim())}</td>
                <td class="text-end price"style="display: none;">${(record.close).toFixed(2)}</td>
                <td class="text-center"><svg style="color: red;margin-left: 30px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></td>
            `;
            tableBody.appendChild(newRow);
        });


        const filteredDataPutSpread = data.filter(record =>
          record.category === "CALL" &&
          parseFloat(record.strike) > actualStockPrice &&
          record.due_date == dueDateFence)
        
          .slice(0, 1);
      
      
      
        filteredDataPutSpread.forEach((record, index) => {
            const action = "Buy";
            const badgeClass = (action === "Sell") ? "badge-danger" : "badge-success";
      
            const newRow = document.createElement("tr");
            newRow.setAttribute("bid-ask", `${record.bid} ${record.ask}`);
            newRow.innerHTML = `
                <td><span class="badge ${badgeClass}" style="cursor: pointer;">${action}</span></td>
                <td>${record.category}</td>
                <td class="text-end qty">2000</td>
                <td>${record.symbol} - ${record.strike.toFixed(2)}</td>
                <td>
                  <select class="due-date-dropdown" onchange="handleDueDateDropdownChange(this)">
                    ${getDueDateOptions(record.due_date)}
                  </select>
                </td>
                <td>
                  <select class="strike-percentage-dropdown" onchange="handleStrikePercentageDropdownChange(this, ${record.strike.toFixed(2)}, actualStockPrice)">
                    ${generateStrikePercentageOptions(record.strike.toFixed(2), actualStockPrice)}
                  </select>
                </td>
                <td class="text-end vol-column" style="display: none;">${parseFloat((companyStockVolatility.textContent).replace('%', '').trim())}</td>
                <td class="text-end price"style="display: none;">${(record.close).toFixed(2)}</td>
                <td class="text-center"><svg style="color: red;margin-left: 30px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></td>
            `;
            tableBody.appendChild(newRow);
        });
      
      
        })
        .catch(error => console.error(error));


      } else if (optionStrategySelected=="Long Call"){
        const tableBody = document.querySelector(".inv--product-table-section table tbody");
        fetch(`https://api.oplab.com.br/v3/market/options/${formattedStockTicker}`, { headers })
        .then(response => response.json())
        .then(data => {
        stockOptionsChain = data;
        const filteredDataCall = data.filter(record =>
          record.category === "CALL" &&
          parseFloat(record.strike) > (actualStockPrice  * 1.08) &&
          ((new Date(record.due_date) - Date.now()) / (1000 * 60 * 60 * 24)) > 40
        )
        .sort((a, b) => b.volume - a.volume)
        .slice(0, 1);
      
      
        filteredDataCall.forEach((record, index) => {
            const action = 'Buy';
            const badgeClass = (action == "Sell") ? "badge-danger" : "badge-success";
      
            const newRow = document.createElement("tr");
            newRow.setAttribute("bid-ask", `${record.bid} ${record.ask}`);
            newRow.innerHTML = `
                <td><span class="badge ${badgeClass}" style="cursor: pointer;">${action}</span></td>
                <td>${record.category}</td>
                <td class="text-end qty">1000</td>
                <td>${record.symbol} - ${record.strike.toFixed(2)}</td>
                <td>
                  <select class="due-date-dropdown" onchange="handleDueDateDropdownChange(this)">
                    ${getDueDateOptions(record.due_date)}
                  </select>
                </td>
                <td>
                  <select class="strike-percentage-dropdown" onchange="handleStrikePercentageDropdownChange(this, ${record.strike.toFixed(2)}, actualStockPrice)">
                    ${generateStrikePercentageOptions(record.strike.toFixed(2), actualStockPrice)}
                  </select>
                </td>
                <td class="text-end vol-column" style="display: none;">${parseFloat((companyStockVolatility.textContent).replace('%', '').trim())}</td>
                <td class="text-end price"style="display: none;">${(record.close).toFixed(2)}</td>
                <td class="text-center"><svg style="color: red;margin-left: 30px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></td>
            `;
            tableBody.appendChild(newRow);
        });


       
      
      
        })
        .catch(error => console.error(error));


      } else if (optionStrategySelected=="Zero Cost Collar"){
        const tableBody = document.querySelector(".inv--product-table-section table tbody");
        fetch(`https://api.oplab.com.br/v3/market/options/${formattedStockTicker}`, { headers })
        .then(response => response.json())
        .then(data => {
        stockOptionsChain = data;
        const filteredDataCall = data.filter(record =>
          record.category === "CALL" &&
          parseFloat(record.strike) > (actualStockPrice * 1.08) &&
          ((new Date(record.due_date) - Date.now()) / (1000 * 60 * 60 * 24)) > 50
        )
        .sort((a, b) => b.volume - a.volume)
        .slice(0, 1);
        const dueDateFence = filteredDataCall[0].due_date;
        const callBuyBoosterStrike = filteredDataCall[0].strike;
      
      
        filteredDataCall.forEach((record, index) => {
            const action = 'Sell';
            const badgeClass = (action == "Sell") ? "badge-danger" : "badge-success";
      
            const newRow = document.createElement("tr");
            newRow.setAttribute("bid-ask", `${record.bid} ${record.ask}`);
            newRow.innerHTML = `
                <td><span class="badge ${badgeClass}" style="cursor: pointer;">${action}</span></td>
                <td>${record.category}</td>
                <td class="text-end qty">1000</td>
                <td>${record.symbol} - ${record.strike.toFixed(2)}</td>
                <td>
                  <select class="due-date-dropdown" onchange="handleDueDateDropdownChange(this)">
                    ${getDueDateOptions(record.due_date)}
                  </select>
                </td>
                <td>
                  <select class="strike-percentage-dropdown" onchange="handleStrikePercentageDropdownChange(this, ${record.strike.toFixed(2)}, actualStockPrice)">
                    ${generateStrikePercentageOptions(record.strike.toFixed(2), actualStockPrice)}
                  </select>
                </td>
                <td class="text-end vol-column" style="display: none;">${parseFloat((companyStockVolatility.textContent).replace('%', '').trim())}</td>
                <td class="text-end price"style="display: none;">${(record.close).toFixed(2)}</td>
                <td class="text-center"><svg style="color: red;margin-left: 30px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></td>
            `;
            tableBody.appendChild(newRow);
        });


        const filteredDataPutSpread = data.filter(record =>
          record.category === "PUT" &&
          parseFloat(record.strike) < (actualStockPrice) &&
          record.due_date == dueDateFence)
          .sort((a, b) => b.volume - a.volume)
          .slice(0, 1);
      
      
      
        filteredDataPutSpread.forEach((record, index) => {
            const action = "Buy";
            const badgeClass = (action === "Sell") ? "badge-danger" : "badge-success";
      
            const newRow = document.createElement("tr");
            newRow.setAttribute("bid-ask", `${record.bid} ${record.ask}`);
            newRow.innerHTML = `
                <td><span class="badge ${badgeClass}" style="cursor: pointer;">${action}</span></td>
                <td>${record.category}</td>
                <td class="text-end qty">1000</td>
                <td>${record.symbol} - ${record.strike.toFixed(2)}</td>
                <td>
                  <select class="due-date-dropdown" onchange="handleDueDateDropdownChange(this)">
                    ${getDueDateOptions(record.due_date)}
                  </select>
                </td>
                <td>
                  <select class="strike-percentage-dropdown" onchange="handleStrikePercentageDropdownChange(this, ${record.strike.toFixed(2)}, actualStockPrice)">
                    ${generateStrikePercentageOptions(record.strike.toFixed(2), actualStockPrice)}
                  </select>
                </td>
                <td class="text-end vol-column" style="display: none;">${parseFloat((companyStockVolatility.textContent).replace('%', '').trim())}</td>
                <td class="text-end price"style="display: none;">${(record.close).toFixed(2)}</td>
                <td class="text-center"><svg style="color: red;margin-left: 30px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></td>
            `;
            tableBody.appendChild(newRow);
        });
      
      
        })
        .catch(error => console.error(error));


      }


      calculateTotalPrice();


      setInterval(calculateTotalPrice, 400);
    
      setInterval(() => {
        document.getElementById('loading-card').style.display = 'none';
      }, 3500);
    
    })
    .catch(error => console.error(error));


    function fetchData() {
  
      fetch(`https://api.oplab.com.br/v3/market/stocks/${formattedStockTicker}`, { headers })
        .then(response => response.json())
        .then(data => {
          const price = data.close;
          const variation = data.variation;
          const volatility = data.iv_current;
          const companyStockPrice = document.querySelector('.inv-title'); // get the p element
          companyStockPrice.textContent = price;
          if ((realTimeVol==false) && (document.querySelector('.principal-table-volatility').textContent=='')){
            const symbolsWithVol = []
            if (symbolsWithVol.includes(formattedStockTicker)) {
            const companyStockVolatility = document.querySelector('.principal-table-volatility'); // get the p element
            const filteredArray = volInformation 
            .filter(item => item.stock === formattedStockTicker)
            .map(item => {
              return {
                
                volatility: parseFloat(item.volatility).toFixed(2)
              };
            });
            companyStockVolatility.textContent = `${parseFloat(filteredArray[0].volatility).toFixed(2)}%`;
            } else{
              const companyStockVolatility = document.querySelector('.principal-table-volatility'); // get the p element
              companyStockVolatility.textContent = `${volatility.toFixed(2)}%`;
            }
            realTimeVol = true;
          
          } else if (realTimeVol){
            const symbolsWithVol = []
            if (symbolsWithVol.includes(formattedStockTicker)) {
            const companyStockVolatility = document.querySelector('.principal-table-volatility'); // get the p element
            const filteredArray = volInformation 
            .filter(item => item.stock === formattedStockTicker)
            .map(item => {
              return {
                
                volatility: parseFloat(item.volatility).toFixed(2)
              };
            });
            companyStockVolatility.textContent = `${parseFloat(filteredArray[0].volatility).toFixed(2)}%`;
            } else{
              const companyStockVolatility = document.querySelector('.principal-table-volatility'); // get the p element
              companyStockVolatility.textContent = `${volatility.toFixed(2)}%`;
            }
          }
        
          const companyStockDailyVariation = document.querySelector('.inv-number'); // get the p element
          if (variation>=0){
            companyStockDailyVariation.style.color = 'green';
          } else {
            companyStockDailyVariation.style.color = 'red';
          }
          companyStockDailyVariation.textContent = `${variation}%`;


        
      
        })
        .catch(error => console.error(error));




        fetch(`https://api.oplab.com.br/v3/market/options/${formattedStockTicker}`, { headers })
        .then(response => response.json())
        .then(data => {
        stockOptionsChain = data;
      
        })
        .catch(error => console.error(error));
    }
  
    // call the function once to update the UI initially
    fetchData();
    updateDate();
    recalculatePrimeEquity();
    calculateClientPrime();
    calculateOptionPrice();
  
    // set an interval to call the fetchData function every 10 seconds
    setInterval(fetchData, 12000);
    setInterval(recalculatePrimeEquity, 10);
    setInterval(calculateClientPrime, 10);
    setInterval(updateDate, 1000);
    setInterval(calculateOptionPrice, 10);
    
    
  } else {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Esse ativo não existe ou não possui opções em aberto.',
      showConfirmButton: false,
      timer: 1500,
      background: '#dee2e6',
    });
    document.getElementById('loading-card').style.display = 'none'
    document.querySelector('.in-heading').textContent = formattedStockTicker
  }
  
  // send an API request with the headers
  
}


const headings = document.querySelectorAll('.in-heading');

function handleClick(event) {
  const heading = event.target;
  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('value', heading.textContent);
  input.classList.add('in-heading');
  input.style.marginLeft = '0';
  input.style.fontSize = '26px';

  heading.parentNode.replaceChild(input, heading);
  input.focus();

  input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const newHeading = document.createElement('h3');
      newHeading.classList.add('in-heading', 'align-self-center');
      newHeading.style.marginLeft = '0';
      newHeading.style.fontSize = '26px';
      newHeading.textContent = input.value;

      input.parentNode.replaceChild(newHeading, input);
      switchStock();
      newHeading.addEventListener('click', handleClick); // Reset the event listener
    }
  });

  input.removeEventListener('click', handleClick); // Remove the event listener temporarily
}

headings.forEach(heading => {
  heading.addEventListener('click', handleClick);
});



function generateStrikePercentageOptions(strikeValue, actualStockPrice) {
  const minPercentage = 5;
  const maxPercentage = 200;
  const interval = 1;
  
  // Calculate the ratio
  const ratio = strikeValue / actualStockPrice;
  
  // Calculate the closest percentage option
  const closestOption = Math.round(ratio * 100 / interval) * interval;

  // Generate the options
  let optionsHtml = '';
  for (let percentage = minPercentage; percentage <= maxPercentage; percentage += interval) {
    optionsHtml += `<option value="${percentage}" ${percentage === closestOption ? 'selected' : ''}>${percentage}%</option>`;
  }

  return optionsHtml;
}

function handleStrikePercentageDropdownChange(selectElement, strikeValue, actualStockPrice) {
  // Get the selected percentage value from the dropdown
  const selectedPercentage = parseInt(selectElement.value);
  
  // Calculate the corresponding strike value based on the selected percentage
  const selectedStrikeValue = actualStockPrice * (selectedPercentage / 100);
  
  // Do something with the selectedStrikeValue (e.g., update the UI or perform further calculations)
  console.log(`Selected Strike Value: ${selectedStrikeValue.toFixed(2)}`);
  const row = selectElement.closest('tr');
  const DueDateDropdown = row.querySelector('.due-date-dropdown');

  // Get the selected DueDate, if any
  var selectedDueDate = DueDateDropdown.value;

  const filteredRecords = stockOptionsChain.filter(record => (record.due_date === selectedDueDate) && (record.category == row.cells[1].textContent));
  
  // Find the record with the closest percentage to the selected percentage
  let closestRecord;
  let closestPercentageDiff = Number.MAX_VALUE;
  filteredRecords.forEach(record => {
    const percentage = record.strike / actualStockPrice * 100;
    const percentageDiff = Math.abs(percentage - selectedPercentage);
    if (percentageDiff < closestPercentageDiff) {
      closestPercentageDiff = percentageDiff;
      closestRecord = record;
    }
  });
  
  // Set the text content of the 3rd column with the closest record information
 
  row.cells[3].textContent = `${closestRecord.symbol} - ${closestRecord.strike.toFixed(2)}`;

  // Atualize a <p class="strike-bullish-scenario"> com base no valor do strike
  const newValueStrikeScenarios = `${closestRecord.strike.toFixed(2)}`;
  updateValueStrikeScenarios(newValueStrikeScenarios);

}

// Função para atualizar dinamicamente os valores do strike nos cenários
function updateValueStrikeScenarios(novoValor) {
  const valueStrikeScenariosBullishElement = document.getElementById("strike-bullish-scenario");
  valueStrikeScenariosBullishElement.textContent = novoValor;

  const valueStrikeScenariosPartialElement = document.getElementById("partial-scenario");
  valueStrikeScenariosPartialElement.textContent = (novoValor - 0.01).toFixed(2);
}

document.getElementById("view-structure-board").addEventListener("click", function() {
  var quotePresentation = document.getElementById("quote_presentation");
  var quotePage = document.getElementById("quote_page");

  if (document.querySelector('.inv-email-operation').textContent == 'Dividendo Sintético'){
    quotePresentation.style.display = "block";
    quotePresentation.style.transform = "translateY(100%)";
    setTimeout(function() {
      quotePresentation.style.transform = "translateY(0)";
    }, 50);

    // Hide the quote_page
    quotePage.style.display = "none";
    document.getElementById("structure_presentation_title").textContent = `${document.querySelector('.inv-email-operation').textContent} em ${formattedStockTicker}`
    document.getElementById("price-reference").textContent = actualStockPrice;
    document.getElementById("moment-reference").textContent = document.querySelector('.inv-date').textContent;
    document.getElementById("ativo-reference").textContent = document.querySelector('.inv-street-addr').textContent;
    
    const tableBody = document.querySelector(".inv--product-table-section table tbody")
    const firstRow = tableBody.querySelector("tr"); // Obtém a primeira linha da tabela
    
    // Obtém os valores das colunas
    const symbol = firstRow.querySelectorAll("td")[3].textContent.split(' - ')[0];
    const strike = parseFloat(firstRow.querySelectorAll("td")[3].textContent.split(' - ')[1]).toFixed(2);
    const price = parseFloat(firstRow.querySelectorAll("td")[7].textContent).toFixed(2);
    const dateParts = firstRow.querySelectorAll("td")[4].querySelector('.due-date-dropdown').value.split('-');
    console.log(dateParts)
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; // Months are zero-based in JavaScript
    const day = parseInt(dateParts[2]) + 1;
    const date = new Date(Date.UTC(year, month, day));

    const dayDatetime = date.getDate();
    const monthDatetime = date.getMonth() + 1; // Months are zero-based, so add 1
    const yearDatetime = date.getFullYear();
    console.log(price, strike)
    // Format the date as "dd/mm/yyyy"
    const formattedDate = `${dayDatetime.toString().padStart(2, '0')}/${monthDatetime.toString().padStart(2, '0')}/${yearDatetime}`;
    document.getElementById("vencimento-estrategia").textContent = formattedDate;
    document.getElementById("strategy-structure-description").textContent = 'Otimização de Carteira | Proteção Parcial';
    document.getElementById("strategy-max-profit").textContent = ((price/(strike-price))* 100).toFixed(2).toString() + '%';
    document.getElementById("risk-scenario-strategy").textContent = `${formattedStockTicker} abaixo de ${strike} fica comprado na ação a ${(strike-price).toFixed(2)} e acompanha posterior variação do ativo.`;
    document.getElementById("gain-scenario").textContent = `Com o ativo ${formattedStockTicker} acima de ${strike} remunera o patrimônio em até ${((price/(strike-price))* 100).toFixed(2).toString() + '%'} sobre a exposição financeira no período.`;
    document.getElementById("loss-scenario").textContent = `Protege contra queda de até ${(price*100/actualStockPrice).toFixed(2).toString() + '%'}. ${formattedStockTicker} abaixo de ${strike} fica comprado na ação a ${(strike-price).toFixed(2)} e acompanha posterior variação do ativo.`;
  }

  
});

document.getElementById("back-to-quote-page").addEventListener("click", function() {
  var quotePresentation = document.getElementById("quote_presentation");
  var quotePage = document.getElementById("quote_page");

  
    quotePage.style.display = "block";
    quotePage.style.transform = "translateY(100%)";
    setTimeout(function() {
      quotePage.style.transform = "translateY(0)";
    }, 50);

    // Hide the quote_page
    quotePresentation.style.display = "none";
    

  
});
