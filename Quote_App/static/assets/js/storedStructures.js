  window.addEventListener('load', function() {
    // Select all tables on the page (assuming they have a common class name)
    const tables = document.querySelectorAll('.volatility-product-table-section table');
    
    // Iterate over each table
    tables.forEach(function(table) {
      // Select the table rows excluding the header row
      const tableRows = table.querySelectorAll('tbody tr');
      const tableIndex = Array.from(tables).indexOf(table);
      let actualBoardTable = document.querySelectorAll('.invoice-actions-btn')[tableIndex];
      
      
      
      
      let actualSum = 0;
      let executedSum = 0;
      
      // Iterate over the table rows and calculate the sum
      tableRows.forEach(function(row) {
        const action = row.cells[2].textContent.trim();
        const actualPrice = parseFloat(row.cells[9].textContent.trim());
        const executedPrice = parseFloat(row.cells[8].textContent.trim());
        
        if (action === 'Buy') {
        executedSum -= executedPrice;
        actualSum -= actualPrice;
        } else if (action === 'Sell') {
        executedSum += executedPrice;
        actualSum += actualPrice;
        }
      });
      
      // Get the footer cells for the current table
      const footerCells = table.querySelectorAll('tfoot tr td');
      
      // Update the footer cells with the calculated sums
      footerCells[8].textContent = executedSum.toFixed(2);  // 8th footer cell
      footerCells[9].textContent = actualSum.toFixed(2);  // 9th footer cell
      

      if ((actualSum/executedSum)<0.3){
        actualBoardTable.style.backgroundColor = '#90EE90';
      } else if ((actualSum/executedSum)>2.5){
        actualBoardTable.style.backgroundColor = '#FFC0CB';
      } else{
        actualBoardTable.style.backgroundColor = '#fff';
      }
    });
  });

  function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }

 function eraseStructure(id_structure, button){


    document.getElementById('load_screen').style.display = 'block'
  const csrftoken = getCookie('csrftoken');

  fetch('/stored_structures/', {
    method: 'POST',
    body: ['eraseStructure', id_structure],
    headers: {
      "X-CSRFToken": csrftoken
    }
  }).then(function(response) {
    var invoiceActionsBtn = button.closest('.invoice-actions-btn');
    invoiceActionsBtn.remove();
    document.getElementById('load_screen').style.display = 'none';
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Estrutura removida com sucesso.',
      showConfirmButton: false,
      timer: 1500,
      background: '#dee2e6',
    });
    
  }).catch(function(error) {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Algo não ocorreu como esperado.',
      showConfirmButton: false,
      timer: 1500,
      background: '#dee2e6',
    });
  });
 }