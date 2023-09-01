let optionStrategySelected;


document.querySelectorAll('.card-strategies').forEach(card => {
    card.addEventListener('click', ()=> {
        optionStrategySelected = card.querySelector('.card-title').textContent;
        document.getElementById('loading-card').style.display = 'block';

        fetch('https://api.oplab.com.br/v3/market/stocks', {headers})
        .then(response => response.json())
        .then(data => {
        availableStocks = data;
        $(".card-stocks").each(function () {
            var symbol = $(this).find(".card-title").text().trim();
            var stock = availableStocks.find(function (item){
                    return item.symbol === symbol;
            });

            if (stock){
                $(this).find(".price-stock").text(stock.close)

                var  badge = $(this).find(".badge");
                var variation = stock.variation;

                if (typeof variation === "number" && !isNaN(variation)){
                    badge.text(variation + "%");

                    if (variation >= 0) {
                        badge.removeClass("badge-danger").addClass("badge-light-success");
                    }else {
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

        })
        .catch(error => console.error(error));

        });

});

document.querySelector('.action-print').addEventListener('click', function(event) {
  event.preventDefault();
  /* Act on the event */
  window.print();
});

const cards = document.querySelectorAll('.card-stocks')

cards.forEach(card => {
    card.addEventListener('click', (event) => {
        event.preventDefault();
        document.getElementById('loading-card').style.display = 'block';

        formattedStockTicker = event.currentTarget.querySelector('.card-title').textContent;
        const symbols = avaliableStocks.map(item => item.symbol);
        if (symbols.includes(formattedStockTicker)){

            const heading = document.querySelector('.in-heading');

            heading.textContent = formattedStockTicker;


        fetch(`https://api.oplab.com.br/v3/market/stocks/${formattedStockTicker}`, { headers })
            .then(response => response.json())
            .then(data=> {
              const name = data.name;
              const sector = data.sector;
              const price = data.close;
              const variation = data.variation;
              const volatility = data.iv_current;

              const companyStockPrice = document.querySelector('.inv-title');

              companyStockPrice.textContent = price;
              const symbolsWithVol = []
              if (symbolsWithVol.includes(formattedStockTicker)) {
              const companyStockVolatility = document.querySelector('.principal-table-volatility');
              const filteredArray = volInformation
              .filter(item => item.stock === formattedStockTicker).map(item=>{
                      return {
                          volatility: parseFloat(item.volatility).toFixed(2)
                      };
                      });
              companyStockVolatility.textContent = `${parseFloat(filteredArray[0].volatility).toFixed(2)}%`;
              } else {
                  const companyStockVolatility = document.querySelector('.principal-table-volatility');
                  companyStockVolatility.textContent = `${volatility.toFixed(2)}%`;
              }
              const companyStockVolatility = document.querySelector('.inv-number');
              if (variation>=0){
                  companyStockDailyVariation.style.color = 'green';
              } else {
                  companyStockDailyVariation.style.color = 'red';
              }
              companyStockDailyVariation.textContent = `${variation}%`;

              var today = new Date();

              var formattedDateTime = formattedDateTime(today);

              document.querySelector('.inv-date').textContent = formattedDateTime;
              document.querySelector('.inv-email-operation').textContent = optionStrategySelected;


              loadAssetImage(assetLogoImage);

              if(optionStrategySelected === "Dividendo sintético"){
                  const tableBody = document.querySelector('.inv--product-table-section table tbody');
                  fetch(`https://api.oplab.com.br/v3/market/options/${formattedStockTicker}`, {headers})
                      .then(response=> response.json())
                      .then(data =>{
                          stockOptionsChain = data;
                      })
              }

            })
        }

    })
})





























