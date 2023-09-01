
// let messageWhatsapp;

// //funcao para montar texto que sera usado para vendas no whatsapp
// function montarTextoWhatsapp() {
//     // $('#modalWhatsapp #btn-add').show();
//     // $('#modalWhatsapp #btn-edit').hide();
//     $('#modalWhatsapp').modal('show');
//     const tableBody = document.querySelector(".inv--product-table-section table tbody");

//     if (optionStrategySelected=="Dividendo Sintético"){

//         const firstRow = tableBody.querySelector("tr"); // Obtém a primeira linha da tabela
    
//         // Obtém os valores das colunas
//         const symbol = firstRow.querySelectorAll("td")[2].textContent;
//         const strike = parseFloat(firstRow.querySelectorAll("td")[4].textContent).toFixed(2);
//         const price = parseFloat(firstRow.querySelectorAll("td")[7].textContent).toFixed(2);
//         const dateParts = firstRow.querySelectorAll("td")[3].textContent.split('-');
//         const year = parseInt(dateParts[0]);
//         const month = parseInt(dateParts[1]) - 1; // Months are zero-based in JavaScript
//         const day = parseInt(dateParts[2]) + 1;
//         const date = new Date(Date.UTC(year, month, day));
        
        
        
//         // Extract the day, month, and year from the date object
//         const dayDatetime = date.getDate();
//         const monthDatetime = date.getMonth() + 1; // Months are zero-based, so add 1
//         const yearDatetime = date.getFullYear();
        
//         // Format the date as "dd/mm/yyyy"
//         const formattedDate = `${dayDatetime.toString().padStart(2, '0')}/${monthDatetime.toString().padStart(2, '0')}/${yearDatetime}`;
            
        
        
//         // Monta o texto
//         const parteFixa = "*OPERAÇÕES ESTRUTURADAS*\n📚👨‍🏫 O conteúdo contido neste artigo NÃO é recomendado de compra ou venda, nosso objetivo é facilitar a vida dos investidores no mundo de operações estruturadas com opções de forma simples e didática. Os preços abaixo são apenas indicativos.\n\n";
//         const regex = /\d+(\.\d+)?/g;
    
//         const texto = `${parteFixa}\n*DIVIDENDO SINTÉTICO* | *${formattedStockTicker}* @${actualStockPrice.toString().replace(regex, match => match.replace('.', ','))} (${document.querySelector('.inv-number').innerText})\n\nVende Put Strike R$ ${strike.replace(regex, match => match.replace('.', ','))} com vencimento em ${formattedDate}\nInvestidor recebe R$ ${price.replace(regex, match => match.replace('.', ','))} por contrato\n\n📉 *Cenário de queda*: Protege contra queda de até ${(((actualStockPrice - (strike - price))/actualStockPrice) * 100).toFixed(2).toString().replace('.', ',')}%. ${formattedStockTicker} abaixo de R$ ${strike.replace(regex, match => match.replace('.', ','))} fica comprado na ação a R$ ${(strike - price).toString().replace(regex, match => match.replace('.', ','))} e acompanha a variação posterior do papel (Existe também a possibilidade de rolagem).\n\n📈 Cenário de alta: Embolsa o prêmio de R$ ${price.toString().replace(regex, match => match.replace('.', ','))} por contrato. Remunera o patrimônio em até ${((price/(strike - price)) * 100).toFixed(2).toString().replace('.', ',')}% sobre a exposição financeira no período.\n\n*Exposição financeira:* R$ ${(parseFloat((strike - price) * 1000).toFixed(2)).toString().replace(regex, match => match.replace('.', ',')).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} para cada mil quantidades.\n\n*Obs.:* As condições da estrutura podem variar de acordo com a oscilação do ativo objeto.`;
    
//         document.getElementById('textarea-copy').textContent = texto;
    
//         messageWhatsapp = encodeURIComponent(texto);
//     } else if (optionStrategySelected=="Bull Put Spread"){
        

//             const rows = tableBody.querySelectorAll("tr");

//             // Get the first row
//             const firstRow = rows[0];
//             const firstRowColumns = firstRow.querySelectorAll("td");
            
//             // Get the second row
//             const secondRow = rows[1];
//             const secondRowColumns = secondRow.querySelectorAll("td");
            
//             // Check the span text in the first column of the first row
//             const firstRowSpanText = firstRowColumns[0].querySelector("span").textContent.trim();
//             let putStrikeSell, putStrikeBuy;
            
//             if (firstRowSpanText === "Sell") {
//             // Set putStrikeSell and putStrikeBuy based on the fifth column value of the first row
//             putStrikeSell = firstRowColumns[4].textContent.trim();
//             putStrikeBuy = secondRowColumns[4].textContent.trim();
//             } else {
//             // Set putStrikeSell and putStrikeBuy based on the fifth column value of the second row
//             putStrikeSell = secondRowColumns[4].textContent.trim();
//             putStrikeBuy = firstRowColumns[4].textContent.trim();
//             }
//             const price = parseFloat(document.querySelector(".premio-total").textContent).toFixed(2);
//             const dateParts = firstRowColumns[3].textContent.split('-');
//             const year = parseInt(dateParts[0]);
//             const month = parseInt(dateParts[1]) - 1; // Months are zero-based in JavaScript
//             const day = parseInt(dateParts[2]) + 1;
//             const date = new Date(Date.UTC(year, month, day));
            
            
            
//             // Extract the day, month, and year from the date object
//             const dayDatetime = date.getDate();
//             const monthDatetime = date.getMonth() + 1; // Months are zero-based, so add 1
//             const yearDatetime = date.getFullYear();
            
//             // Format the date as "dd/mm/yyyy"
//             const formattedDate = `${dayDatetime.toString().padStart(2, '0')}/${monthDatetime.toString().padStart(2, '0')}/${yearDatetime}`;
            
            
            
//             // // Monta o texto
//             const regex = /\d+(\.\d+)?/g;
//             const parteFixa = "*OPERAÇÕES ESTRUTURADAS*\n📚👨‍🏫O conteúdo contido neste artigo NÃO é recomendado de compra ou venda, nosso objetivo é facilitar a vida dos investidores no mundo de operações estruturadas com opções de forma simples e didática. Os preços abaixo são apenas indicativos.\n\n";
//             const texto = `${parteFixa}\n*Bull Put Spread* | *${formattedStockTicker}* @${actualStockPrice.toString().replace('.', ',')} (${document.querySelector('.inv-number').innerText})\n\nVende Put Strike ${putStrikeSell.toString().replace('.', ',')} | Compra Put Strike ${putStrikeBuy.toString().replace('.', ',')}\nVencimento: ${formattedDate}\n\nInvestidor Recebe ${price.toString().replace('.', ',')}\n\n📉 *Cenário de queda:* ${formattedStockTicker} entre ${putStrikeSell.toString().replace('.', ',')} e ${putStrikeSell.replace(regex, match => match.replace(',', '.') - price).toString().replace('.', ',')} fica no zero a zero, e de ${putStrikeSell.replace(regex, match => match.replace(',', '.') - price).toString().replace('.', ',')} até abaixo de ${putStrikeBuy.toString().replace('.', ',')} perda máxima de ${parseFloat(putStrikeSell.replace(regex, match => match.replace(',', '.') - price - putStrikeBuy.replace(',', '.'))).toFixed(2).toString().replace('.', ',')}.\n\n📈 *Ganho máximo* de até R$ ${(parseFloat(price.replace(',', '.')) * 1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} para cada 1.000 quantidades da estrutura, com o ativo objeto acima de ${putStrikeSell.toString().replace('.', ',')} no vencimento. Rentabilidade de até ${((parseFloat(price.replace(',', '.'))) / (putStrikeSell.replace(',', '.') - putStrikeBuy.replace(',', '.')) * 100).toFixed(2).replace('.', ',')}%, sobre a exposição financeira para o período.\n\n*Exposição financeira:* R$ ${(parseFloat((putStrikeSell.replace(',', '.') - putStrikeBuy.replace(',', '.')) * 1000)).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".")} p/ cada 1.000 quantidades.\n\n*Obs.:* As condições da estrutura podem variar de acordo com a oscilação do ativo objeto.`;
            
        
            
//             document.getElementById('textarea-copy').textContent = texto;
        
//             messageWhatsapp = encodeURIComponent(texto);
        

//     } else if (optionStrategySelected=="Bear Call Spread"){
//         const rows = tableBody.querySelectorAll("tr");

//             // Get the first row
//             const firstRow = rows[0];
//             const firstRowColumns = firstRow.querySelectorAll("td");
            
//             // Get the second row
//             const secondRow = rows[1];
//             const secondRowColumns = secondRow.querySelectorAll("td");
            
//             // Check the span text in the first column of the first row
//             const firstRowSpanText = firstRowColumns[0].querySelector("span").textContent.trim();
//             let callStrikeSell, callStrikeBuy;
            
//             if (firstRowSpanText === "Sell") {
//             // Set callStrikeSell and callStrikeBuy based on the fifth column value of the first row
//             callStrikeSell = firstRowColumns[4].textContent.trim();
//             callStrikeBuy = secondRowColumns[4].textContent.trim();
//             } else {
//             // Set callStrikeSell and callStrikeBuy based on the fifth column value of the second row
//             callStrikeSell = secondRowColumns[4].textContent.trim();
//             callStrikeBuy = firstRowColumns[4].textContent.trim();
//             }
//             const price = parseFloat(document.querySelector(".premio-total").textContent).toFixed(2);
//             const dateParts = firstRowColumns[3].textContent.split('-');
//             const year = parseInt(dateParts[0]);
//             const month = parseInt(dateParts[1]) - 1; // Months are zero-based in JavaScript
//             const day = parseInt(dateParts[2]) + 1;
//             const date = new Date(Date.UTC(year, month, day));
            
            
            
//             // Extract the day, month, and year from the date object
//             const dayDatetime = date.getDate();
//             const monthDatetime = date.getMonth() + 1; // Months are zero-based, so add 1
//             const yearDatetime = date.getFullYear();
            
//             // Format the date as "dd/mm/yyyy"
//             const formattedDate = `${dayDatetime.toString().padStart(2, '0')}/${monthDatetime.toString().padStart(2, '0')}/${yearDatetime}`;
            
            
            
//             // // Monta o texto
//             const regex = /\d+(\.\d+)?/g;
//             const parteFixa = "*OPERAÇÕES ESTRUTURADAS*\n📚👨‍🏫O conteúdo contido neste artigo NÃO é recomendado de compra ou venda, nosso objetivo é facilitar a vida dos investidores no mundo de operações estruturadas com opções de forma simples e didática. Os preços abaixo são apenas indicativos.\n\n";
//             const texto = `${parteFixa}\n*Bear Call Spread* | *${formattedStockTicker}* @${actualStockPrice.toString().replace('.', ',')} (${document.querySelector('.inv-number').innerText})\n\nVende Call Strike ${callStrikeSell.toString().replace('.', ',')} | Compra Call Strike ${callStrikeBuy.toString().replace('.', ',')}\nVencimento: ${formattedDate}\n\nInvestidor Recebe ${price.toString().replace('.', ',')}\n\n📉 *Cenário de queda:* Ganho máximo de até R$ ${(price * 1000).toFixed(2).toString().replace('.',',')} para cada 1.000 quantidades da estrutura, com o ativo objeto abaixo de ${callStrikeSell.toString().replace('.',',')} no vencimento. Rentabilidade de até ${((parseFloat(price.replace(',', '.'))) / (callStrikeBuy.replace(',', '.') - callStrikeSell.replace(',', '.')) * 100).toFixed(2).replace('.','.')}%, sobre a exposição financeira.\n\n📈 *Cenário de Alta:* ${formattedStockTicker} até ${(parseFloat(callStrikeSell) + parseFloat(price)).toFixed(2).toString().replace('.', ',')} cliente fica no zero a zero, e acima de ${callStrikeBuy.toString().replace('.','.')} tem a perda máxima de ${parseFloat(callStrikeBuy.replace(regex, match => match.replace(',', '.') - price - callStrikeSell.replace(',', '.'))).toFixed(2).toString().replace('.',',')}.\n\n*Exposição financeira:* R$ ${(parseFloat((callStrikeBuy.replace(',', '.') - callStrikeSell.replace(',', '.')) * 1000)).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".")} p/ cada 1.000 quantidades.\n\n*Obs.:* As condições da estrutura podem variar de acordo com a oscilação do ativo objeto.`;
        
            
//             document.getElementById('textarea-copy').textContent = texto;
        
//             messageWhatsapp = encodeURIComponent(texto);
        

//     } else if (optionStrategySelected=="Fence"){

//             const rows = Array.from(tableBody.querySelectorAll("tr"));

//             let callStrikeSell;
            
//             rows.forEach((row, index) => {
//                 const columns = row.querySelectorAll("td");
//                 const secondColumnValue = columns[1].innerText;
            
//                 if (secondColumnValue === "CALL") {
//                 callStrikeSell = parseFloat(columns[4].innerText);
                
//                 rows.splice(index, 1);
//                 }
//             });




//             // Get the first row
//             const firstRow = rows[0];
//             const firstRowColumns = firstRow.querySelectorAll("td");
            
//             // Get the second row
//             const secondRow = rows[1];
//             const secondRowColumns = secondRow.querySelectorAll("td");
            
//             // Check the span text in the first column of the first row
//             const firstRowSpanText = firstRowColumns[0].querySelector("span").textContent.trim();
//             let putStrikeSell, putStrikeBuy;
            
//             if (firstRowSpanText === "Sell") {
//             // Set putStrikeSell and putStrikeBuy based on the fifth column value of the first row
//             putStrikeSell = firstRowColumns[4].textContent.trim();
//             putStrikeBuy = secondRowColumns[4].textContent.trim();
//             } else {
//             // Set putStrikeSell and putStrikeBuy based on the fifth column value of the second row
//             putStrikeSell = secondRowColumns[4].textContent.trim();
//             putStrikeBuy = firstRowColumns[4].textContent.trim();
//             }

            
//             const price = parseFloat(document.querySelector(".premio-total").textContent).toFixed(2);
//             const dateParts = firstRowColumns[3].textContent.split('-');
//             const year = parseInt(dateParts[0]);
//             const month = parseInt(dateParts[1]) - 1; // Months are zero-based in JavaScript
//             const day = parseInt(dateParts[2]) + 1;
//             const date = new Date(Date.UTC(year, month, day));
            
            
            
//             // Extract the day, month, and year from the date object
//             const dayDatetime = date.getDate();
//             const monthDatetime = date.getMonth() + 1; // Months are zero-based, so add 1
//             const yearDatetime = date.getFullYear();
            
//             // Format the date as "dd/mm/yyyy"
//             const formattedDate = `${dayDatetime.toString().padStart(2, '0')}/${monthDatetime.toString().padStart(2, '0')}/${yearDatetime}`;
            
            
            
//             // // Monta o texto
//             const regex = /\d+(\.\d+)?/g;
//             const parteFixa = "*OPERAÇÕES ESTRUTURADAS*\n📚👨‍🏫O conteúdo contido neste artigo NÃO é recomendado de compra ou venda, nosso objetivo é facilitar a vida dos investidores no mundo de operações estruturadas com opções de forma simples e didática. Os preços abaixo são apenas indicativos.\n\n";
//             const texto = `${parteFixa}\n*Fence* | *${formattedStockTicker}* @${actualStockPrice.toString().replace('.', ',')} (${document.querySelector('.inv-number').innerText})\n\nVende Put Strike ${putStrikeSell.toString().replace('.', ',')} | Compra Put Strike ${putStrikeBuy.toString().replace('.', ',')} | Vende Call Strike ${callStrikeSell.toString().replace('.', ',')}\nConpra a Ação à mercado (ou já possuir em custódia).\nVencimento: ${formattedDate}\n\nInvestidor Recebe ${price.toString().replace('.', ',')}\n\n📉 *Cenário de queda:* Ganho máximo de até R$ ${(price * 1000).toString().replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".")} para cada 1.000 quantidades da estrutura, com ativo abaixo de ${putStrikeSell.toString().replace('.', ',')} no vencimento.\n\n📈 *Cenário de Alta (Taxa de exercício):* Até ${(((parsefloat(callStrikeSell) - actualStockPrice)/actualStockPrice)*100).toFixed(2).toString().replace('.',',')}% no período.\n\n*Exposição financeira:* R$ ${actualStockPrice.toString().replace('.', ',')} p/ cada 1.000 quantidades.\n\n*Obs.:* As condições da estrutura podem variar de acordo com a oscilação do ativo objeto.`;
            
        
            
//             document.getElementById('textarea-copy').textContent = texto;
        
//             messageWhatsapp = encodeURIComponent(texto);
//     } else if (optionStrategySelected=="Financiamento"){
//         const firstRow = tableBody.querySelector("tr"); // Obtém a primeira linha da tabela
    
//         // Obtém os valores das colunas
//         const symbol = firstRow.querySelectorAll("td")[2].textContent;
//         const strike = parseFloat(firstRow.querySelectorAll("td")[4].textContent).toFixed(2);
//         const price = parseFloat(firstRow.querySelectorAll("td")[7].textContent).toFixed(2);
//         const dateParts = firstRow.querySelectorAll("td")[3].textContent.split('-');
//         const year = parseInt(dateParts[0]);
//         const month = parseInt(dateParts[1]) - 1; // Months are zero-based in JavaScript
//         const day = parseInt(dateParts[2]) + 1;
//         const date = new Date(Date.UTC(year, month, day));
        
        
        
//         // Extract the day, month, and year from the date object
//         const dayDatetime = date.getDate();
//         const monthDatetime = date.getMonth() + 1; // Months are zero-based, so add 1
//         const yearDatetime = date.getFullYear();
        
//         // Format the date as "dd/mm/yyyy"
//         const formattedDate = `${dayDatetime.toString().padStart(2, '0')}/${monthDatetime.toString().padStart(2, '0')}/${yearDatetime}`;
            
        
        
//         // Monta o texto
//         const parteFixa = "*OPERAÇÕES ESTRUTURADAS*\n📚👨‍🏫 O conteúdo contido neste artigo NÃO é recomendado de compra ou venda, nosso objetivo é facilitar a vida dos investidores no mundo de operações estruturadas com opções de forma simples e didática. Os preços abaixo são apenas indicativos.\n\n";
//         const regex = /\d+(\.\d+)?/g;
    
//         const texto = `${parteFixa.replace(/\n\n/g, '\n')}\n*VENDA COBERTA (FINANCIAMENTO)* | *${formattedStockTicker}* @${actualStockPrice.toString().replace(regex, match => match.replace('.', ','))} (${document.querySelector('.inv-number').innerText.replace(regex, match => match.replace('.', ','))})\n\nCompra a Ação á mercado (Ou já possuir em custodia)\nVende Call Strike R$ *${strike.replace(regex, match => match.replace('.', ','))}* com vencimento em *${formattedDate}*\nInvestidor recebe R$ *${price.replace(regex, match => match.replace('.', ','))}* por contrato\n\n📉 *Cenário de queda*: Embolsa o prêmio de R$ ${price.replace(regex, match => match.replace('.', ','))} por contrato. Protege o patrimônio em até *${((price/actualStockPrice) * 100).toFixed(2).toString().replace('.', ',')}%* no período.\n\n📈 *Cenário de alta (Taxa de Exercício):* *${formattedStockTicker}* acima de R$ *${strike.replace(regex, match => match.replace('.', ','))}* remunera o patrimônio em até *${(((parseFloat(price) + parseFloat(strike) - parseFloat(actualStockPrice))/parseFloat(actualStockPrice)) * 100).toFixed(2).toString().replace('.', ',')}%* no período.\n\n*Margem exigida:* Coberta pelo ativo em custódia.\n\n*Custos:* Corretagem e emolumentos.\n\n*Obs.:* As condições da estrutura podem variar de acordo com a oscilação do ativo objeto.`;
    
//         document.getElementById('textarea-copy').textContent = texto;
    
//         messageWhatsapp = encodeURIComponent(texto);

//     } else if (optionStrategySelected=="Booster (Double Up)"){

//         const rows = Array.from(tableBody.querySelectorAll("tr"));

        
        
        




//         // Get the first row
//         const firstRow = rows[0];
//         const firstRowColumns = firstRow.querySelectorAll("td");
        
//         // Get the second row
//         const secondRow = rows[1];
//         const secondRowColumns = secondRow.querySelectorAll("td");
        
//         // Check the span text in the first column of the first row
//         const firstRowSpanText = firstRowColumns[0].querySelector("span").textContent.trim();
//         let callStrikeSellDouble, callStrikeBuy, totalPrimeBooster;
        
//         if (firstRowSpanText === "Sell") {
//         // Set callStrikeSellDouble and callStrikeBuy based on the fifth column value of the first row
//         callStrikeSellDouble = firstRowColumns[4].textContent.trim();
//         callStrikeBuy = secondRowColumns[4].textContent.trim();
//         totalPrimeBooster = (- 2 *parseFloat(firstRowColumns[7].textContent.trim())) + parseFloat(secondRowColumns[7].textContent.trim())
//         } else {
//         // Set callStrikeSellDouble and callStrikeBuy based on the fifth column value of the second row
//         callStrikeSellDouble = secondRowColumns[4].textContent.trim();
//         callStrikeBuy = firstRowColumns[4].textContent.trim();
//         totalPrimeBooster = (- 2 *parseFloat(secondRowColumns[7].textContent.trim())) + parseFloat(firstRowColumns[7].textContent.trim())
        
//         }
        
        
        
//         const dateParts = firstRowColumns[3].textContent.split('-');
//         const year = parseInt(dateParts[0]);
//         const month = parseInt(dateParts[1]) - 1; // Months are zero-based in JavaScript
//         const day = parseInt(dateParts[2]) + 1;
//         const date = new Date(Date.UTC(year, month, day));
        
        
        
//         // Extract the day, month, and year from the date object
//         const dayDatetime = date.getDate();
//         const monthDatetime = date.getMonth() + 1; // Months are zero-based, so add 1
//         const yearDatetime = date.getFullYear();
        
//         // Format the date as "dd/mm/yyyy"
//         const formattedDate = `${dayDatetime.toString().padStart(2, '0')}/${monthDatetime.toString().padStart(2, '0')}/${yearDatetime}`;
        
        
        
//         // // Monta o texto
//         const regex = /\d+(\.\d+)?/g;
//         const parteFixa = "*OPERAÇÕES ESTRUTURADAS*\n📚👨‍🏫O conteúdo contido neste artigo NÃO é recomendado de compra ou venda, nosso objetivo é facilitar a vida dos investidores no mundo de operações estruturadas com opções de forma simples e didática. Os preços abaixo são apenas indicativos.\n\n";
//         const texto = `${parteFixa}\n*BOOSTER (DOUBLE UP) | ${formattedStockTicker}* @${actualStockPrice.toString().replace(regex, match => match.replace('.', ','))} (${document.querySelector('.inv-number').innerText.replace(regex, match => match.replace('.', ','))})\n\nCompra a Ação á mercado (Ou já possuir em custodia)\nCompra Call Strike *R$ ${callStrikeBuy.replace(regex, match => match.replace('.', ','))}* | Vende 2x Call Strike *R$ ${callStrikeSellDouble.replace(regex, match => match.replace('.', ','))}*\nVencimento em *${formattedDate}*\n\nInvestidor (Recebe / NÃO paga / PAGA).\n\n📉 Cenário de queda: Investidor segue comprado na ação e acompanha a variação linear do ativo.\n\n📈 Cenário de alta: Investidor ganha dobrado com o ativo acima de ${callStrikeSellDouble.replace(regex, match => match.replace('.', ','))} para cada 1.000 quantidades no período. Rentabiliza o patrimônio em até ${((((parseFloat(callStrikeSellDouble) + parseFloat(totalPrimeBooster))-parseFloat(actualStockPrice))/parseFloat(actualStockPrice))*100).toFixed(2).toString().replace(regex, match => match.replace('.', ','))}% no período.\n\nMargem exigida: Coberta pelo ativo objeto\n\nExposição financeira: R$ ${(parseFloat(actualStockPrice) * 1000).toFixed(2).toString().replace(regex, match => match.replace('.', ',')).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} para cada 1.000 quantidades.\n\nObs.: As condições da estrutura podem variar de acordo com a oscilação do ativo objeto.`;
        
//         document.getElementById('textarea-copy').textContent = texto;
    
//         messageWhatsapp = encodeURIComponent(texto);
//     }

    
    
  
//   }
  
//   // botão para gerar o texto e abrir o modal
// const botaoGenerateText = document.querySelector("#invite-whatsapp-text"); // Substitua "seu-botao" pelo ID do seu botão
// botaoGenerateText.addEventListener("click", montarTextoWhatsapp);
  
  
// //funcao que sera executada no carregamento da pagina para popular o dropdown de contatos com o dataframe de contatos
// function populateDropdown() {
// var dropdownMenu = document.getElementById("dropdown-menu");
// var dropdownButton = document.getElementById("dropdown-button");

// // Clear existing options
// dropdownMenu.innerHTML = "";

// // Create options from records array
// contactsInformation.forEach(function(record) {
//     var option = document.createElement("a");
//     option.classList.add("dropdown-item");
//     option.href = "javascript:void(0);";
//     option.textContent = record.contato;

//     // Add click event listener to update selected option and phone number
//     option.addEventListener("click", function() {
//     dropdownButton.textContent = record.contato;
//     document.getElementById("phone-number-selected").value = record.phone_number;
//     });

//     dropdownMenu.appendChild(option);
// });
// }
// window.addEventListener('load', function() {
// populateDropdown();
// });


// //butao para enviar a mensagem por whatsapp e funcao para execucao do encaminhamento para o whatsapp
// const submitButtonWhatsapp = document.getElementById("submit-whatsapp-invitation");

// // Function to be executed on button click
// function submitFunctionWhatsapp() {
// number = '+55' + document.getElementById("phone-number-selected").value;



// if (number!='+55'){
//     window.open(`https://web.whatsapp.com/send?phone=${number}&text=${messageWhatsapp}`, '_blank');
// }

// }

// // Add event listener to the button
// submitButtonWhatsapp.addEventListener("click", submitFunctionWhatsapp);