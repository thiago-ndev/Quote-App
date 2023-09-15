function extractTableData() {

    if (document.getElementById('quote_page').style.display == 'block'){
    // Get the table element
    var table = document.querySelector('.table');
  
    // Get all the rows in the table
    var rows = table.getElementsByTagName('tr');
  
    // Create an array to hold the extracted data
    var jsonData = [];
  
    // Get the column headers from the first row
    var headers = rows[0].getElementsByTagName('th');
  
    // Loop through each row (skip the first row as it contains the column headers)
    for (var i = 1; i < rows.length; i++) {
      var row = rows[i];
  
      // Get the cells in the current row
      var cells = row.getElementsByTagName('td');
  
      // Create an object to hold the data for the current row
      var rowData = {};
  
      // Loop through each cell and extract the values
      for (var j = 0; j < cells.length; j++) {
        var columnName = headers[j].innerText;
        var cellValue = cells[j].innerText;
  
        // Assign the value to the corresponding field in the rowData object
        
        if (columnName=='Strike'){
          rowData[columnName] = cells[j-2].innerText.split(' - ')[1];

        } else {
          rowData[columnName] = cellValue;
        }
      }
  
      // Add the rowData object to the jsonData array
      jsonData.push(rowData);
    }
    console.log(jsonData)
  
    // Convert the jsonData array to JSON string
    
    for (var i = 0; i < jsonData.length; i++) {
        var obj = jsonData[i];
        
        // Delete the specified properties from the object
        delete obj.Ticker;
        delete obj["Vencimento"];
        delete obj.Remove;
      }
    
    



    const stockPriceRange = { start: actualStockPrice*0.5, end: actualStockPrice*1.5, increment: 0.5 };
    

// Calculate the payoff for each option
    


    const stockPrices = Array.from({ length: (stockPriceRange.end - stockPriceRange.start) / stockPriceRange.increment + 1 }, (_, i) => stockPriceRange.start + i * stockPriceRange.increment);

    // Create the data array for Plotly.js
    let combinedPayoff = Array.from({ length: stockPrices.length }, () => 0);
let totalCashAmount = 0;

for (let i = 0; i < jsonData.length; i++) {
    const option = jsonData[i];
    const action = option.Ação.toLowerCase();
    const optionType = option["Tipo"].toLowerCase();
    const strike = parseFloat(option.Strike);
    const price = parseFloat(option.Price);
    const qty = parseFloat(option.Quantidade);

    if (optionStrategySelected == 'Financiamento'){
      for (let j = 0; j < stockPrices.length; j++) {
        const stockPrice = stockPrices[j];
        let payoff = 0;

        if (action === "compra" || action === "buy") {
          if (optionType === "put") {
              payoff += Math.max(strike - stockPrice, -price) * qty;
          } else if (optionType === "call") {
              payoff += Math.max(stockPrice - strike, -price) * qty;
          }
      } else if (action === "venda" || action === "sell") {
          if (optionType === "put") {
              payoff += Math.min(stockPrice - strike, price) * qty;
          } else if (optionType === "call") {
              // payoff += Math.min(strike - stockPrice, price) * qty;
              if (stockPrice>strike){
                payoff += (price) * qty

              } else if (stockPrice> (strike-price)){
                payoff += (stockPrice - (strike + price)) * qty

              } else {
                payoff += (stockPrice - (strike + price)) * qty

              }
              
          }
      }

        combinedPayoff[j] += payoff;
      }
    } else{
      for (let j = 0; j < stockPrices.length; j++) {
        const stockPrice = stockPrices[j];
        let payoff = 0;

        if (action === "compra" || action === "buy") {
          if (optionType === "put") {
              payoff += Math.max(strike - stockPrice, -price) * qty;
          } else if (optionType === "call") {
              payoff += Math.max(stockPrice - strike, -price) * qty;
          }
      } else if (action === "venda" || action === "sell") {
          if (optionType === "put") {
              payoff += Math.min(stockPrice - strike, price) * qty;
          } else if (optionType === "call") {
              payoff += Math.min(strike - stockPrice, price) * qty;
              
              
          }
      }

        combinedPayoff[j] += payoff;
      }
    }

    

    totalCashAmount += price * qty;
}



// Create the data array for Plotly.js
const data = [
  {
      x: stockPrices,
      y: combinedPayoff,
      type: 'scatter',
      name: 'Combined Payoff',
      line: {
          dash: 'solid',
          width: 5,
          color: 'black'
      },
      font: {
          family: 'Nunito',
          size: 10,
          color: 'black'
      },
      showlegend: false,
  }
];

// Determine the indices where combinedPayoff is below zero
const belowZeroIndices = combinedPayoff.map((value, index) => value < 0 ? index : null).filter(index => index !== null);

// Determine the indices where combinedPayoff is above zero
const aboveZeroIndices = combinedPayoff.map((value, index) => value > 0 ? index : null).filter(index => index !== null);

// Configure the layout
const layout = {
  title: `${optionStrategySelected} Payoff`,
  xaxis: { title: 'Preço da Ação' },
  yaxis: { title: 'Valor em R$' },
  shapes: [
      {
          type: 'rect',
          xref: 'paper',
          yref: 'y',
          x0: 0,
          x1: 1,
          y0: Math.min(...combinedPayoff),
          y1: 0,
          fillcolor: 'red',
          opacity: 0.3,
          line: {
              width: 0
          }
      },
      {
          type: 'rect',
          xref: 'paper',
          yref: 'y',
          x0: 0,
          x1: 1,
          y0: 0,
          y1: Math.max(...combinedPayoff),
          fillcolor: 'green',
          opacity: 0.3,
          line: {
              width: 0
          }
      },
      
  ]
};

// Create the plot

// Plotly.newPlot('payoff-diagram', data, layout);
Plotly.newPlot('payoff-diagram', data, layout);

    }
  }
  
  // Attach event listener to page click
  
  setInterval(extractTableData, 400);


  function calculateOptionDelta(stockPrice, strikePrice, timeToExpiration, riskFreeRate, volatility) {
    // Calculate d1 for the Black-Scholes formula
    const d1 =
      (Math.log(stockPrice / strikePrice) +
        (riskFreeRate + Math.pow(volatility, 2) / 2) * timeToExpiration) /
      (volatility * Math.sqrt(timeToExpiration));
  
    // Calculate the option delta
    const optionDelta = Math.exp(-riskFreeRate * timeToExpiration) * normcdf(d1);
  
    return optionDelta;
  }
  
  // Cumulative distribution function for the standard normal distribution
  function normcdf(x) {
    const b1 = 0.31938153;
    const b2 = -0.356563782;
    const b3 = 1.781477937;
    const b4 = -1.821255978;
    const b5 = 1.330274429;
    const p = 0.2316419;
    const c = 0.39894228;
  
    const t = 1.0 / (1.0 + p * Math.abs(x));
    const t2 = t * t;
    const t3 = t2 * t;
    const t4 = t3 * t;
    const t5 = t4 * t;
  
    const val =
      1 -
      c *
        Math.exp(
          -x * x / 2.0) *
        (b1 * t +
          b2 * t2 +
          b3 * t3 +
          b4 * t4 +
          b5 * t5);
  
    return x < 0 ? 1 - val : val;
  }
  
  

  // function calculateDeltaColumn() {
  //   // example value
  //   const tableRows = document.querySelectorAll(".inv--product-table-section table tbody tr");
  //   if ((tableRows.length>0) && (document.getElementById('quote_page').style.display == 'block')){
  //   tableRows.forEach(row => {
  
  //     const selectedSymbol = row.cells[2].querySelector('.symbol-dropdown').value;
  //     var symbolExtracted = selectedSymbol.split(" - ")[0];
  //     const filteredData = stockOptionsChain.filter(record => record.symbol === symbolExtracted).slice(0, 1);
      
      
  
  
  //     const bid = filteredData[0]['bid']
  //     const ask = filteredData[0]['ask']
  //     const stockOptionPrice = filteredData[0]['close']
  //     row.setAttribute("bid-ask", `${bid} ${ask}`);
  
  
  
  //     const optionType = row.cells[1].textContent; // 'Call' or 'Put'
  //     row.cells[4].textContent = filteredData[0]['strike']
  //     const strikePrice = parseFloat(row.cells[4].textContent);
  //     const volatility = parseFloat(row.cells[6].textContent)/100;
  //     const dueDateString = row.cells[3].querySelector('.due-date-dropdown').value;
  //     const dueDate = new Date(dueDateString);
  //     const timeToExpiration = (dueDate - Date.now()) / (1000 * 60 * 60 * 24 * 365); // in years
  //     actualFreeInterestRate = parseFloat(actualFreeInterestRate);
  //     const d1 = (Math.log(parseFloat(actualStockPrice) / strikePrice) + (parseFloat(actualFreeInterestRate) + volatility * volatility / 2) * timeToExpiration) / (volatility * Math.sqrt(timeToExpiration));
  //     const d2 = d1 - volatility * Math.sqrt(timeToExpiration);

  //     const optionDelta = calculateOptionDelta(parseFloat(actualStockPrice), strikePrice, timeToExpiration, actualFreeInterestRate, volatility);
  //     row.cells[8].textContent = optionDelta.toFixed(2); 
      
  //   });
  //   }
  // }

  // setInterval(calculateDeltaColumn, 10);