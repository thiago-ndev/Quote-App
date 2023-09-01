// Setting the Access-Token header
let headers = {
    'Access-Token': tokenOplab
  };

// Get references to the input and button elements
const inputSearch = document.getElementById('input-search');
const searchButton = document.querySelector('.submit-stock');

// Add click event listener to the button
searchButton.addEventListener('click', function() {
  // Get the value from the input field
  const searchValue = inputSearch.value;
  searchValue.replace(/\s+/g, '').toUpperCase()

  document.getElementById('load_screen').style.display = 'block'
  // Fetch the API with the search value
  fetch(`https://api.oplab.com.br/v3/market/options/${searchValue}`, { headers })
    .then(response => response.json())
    .then(data => {
      // Handle the API response
    const stockOptionsChain = data;
      // Assuming you have an HTML table body element with the ID 'options-chain-tbody'
      const dataTable = $('#style-2').DataTable();
      dataTable.clear().draw();

      // Assuming you have stored the API response in the variable 'stockOptionsChain'
      stockOptionsChain.forEach(option => {
        // Extract the desired values
        const symbol = option.symbol;
        const category = option.category;
        const strike = option.strike;
        const vencimento = option.due_date;
        const ask = option.ask;
        const bid = option.bid;
      
        // Add the new row to the DataTable
        dataTable.row.add([symbol, category, strike, vencimento, ask, bid]).draw(false);
      });
      
      // Remove the "No data available" message
      if (dataTable.data().count() === 0) {
        dataTable.clear().draw();
      }
      
      // Enable sorting for the new data
    //   dataTable.columns().every(function () {
    //     this.data().unique().sort().each(function (value) {
    //       if (value !== '') {
    //         $(this.footer()).html(value);
    //       }
    //     });
    //   });

      const justifyContentSmEnd = document.querySelector('.justify-content-sm-end');
      justifyContentSmEnd.innerHTML = '';

// Create the HTML code for the dropdown menu
    const dropdownHtml = `
    <div class="btn-group mb-2 me-4" role="group">
        <button id="btndefault1" type="button" class="btn btn-info dropdown-toggle _effect--ripple waves-effect waves-light" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Filtrar Vencimento
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down">
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
        </button>
        <div class="dropdown-menu filter-date-options-chain" aria-labelledby="btndefault1">
        </div>
    </div>
    `;
    justifyContentSmEnd.innerHTML += dropdownHtml;

    const uniqueDueDates = [...new Set(stockOptionsChain.map(option => option.due_date))];
     
    // Create the HTML code for the dropdown menu options
    const dropdownOptionsHtml = uniqueDueDates.map(dueDate => `<a href="javascript:void(0);" class="dropdown-item">${dueDate}</a>`).join('');
    
    // Append the dropdown menu options to the dropdown menu
    const dropdownMenu = document.querySelector('.filter-date-options-chain');
    
    dropdownMenu.innerHTML = dropdownOptionsHtml;
    const dropdownOptions = document.querySelectorAll('.filter-date-options-chain .dropdown-item');
    dropdownOptions.forEach(option => {
    option.addEventListener('click', function() {
        // Update button text with selected option
        const buttonText = option.textContent;
        const button = document.getElementById('btndefault1');
        button.textContent = buttonText;

        // Filter DataTable based on selected option
        const selectedDueDate = option.textContent;
        dataTable.column(3).search(selectedDueDate).draw();
    });
    });

    document.getElementById('load_screen').style.display = 'none'
    })

    
    .catch(error => {console.error(error); document.getElementById('load_screen').style.display = 'none'} );
});


