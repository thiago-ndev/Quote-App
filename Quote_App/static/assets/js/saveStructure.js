const saveStructureButton = document.getElementById("save-structure");

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

saveStructureButton.addEventListener("click", function() {
const tableRows = document.querySelectorAll(".inv--product-table-section table tbody tr");
  const rowDataArray = [];

  tableRows.forEach(function(row) {
    const rowData = [];
  
    // Add optionStrategySelected and formattedStockTicker values at the beginning
    rowData.push(optionStrategySelected);
    rowData.push(formattedStockTicker);
  
    const rowCells = row.querySelectorAll("td");
  
    // Add values of the six first columns
    for (let i = 0; i < 6; i++) {
      if (i==2){
        console.log(rowCells[i].querySelector('.symbol-dropdown').value.split('-')[0].replace(' ', ''))
        rowData.push(rowCells[i].querySelector('.symbol-dropdown').value.split('-')[0].replace(' ', ''));
      } else if (i==3){
        rowData.push(rowCells[i].querySelector('.due-date-dropdown').value);

      } else{
        rowData.push(rowCells[i].textContent.trim());
      }
      
    }
  
    // Add value of the eighth column
    rowData.push(rowCells[7].textContent.trim());
  
    rowDataArray.push(rowData);
  });
  console.log(rowDataArray)


  document.getElementById('load_screen').style.display = 'block'
  const csrftoken = getCookie('csrftoken');

  fetch('/structures_lab/', {
    method: 'POST',
    body: JSON.stringify(['saveStructure', rowDataArray]),
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken
    }
  }).then(function(response) {
    document.getElementById('load_screen').style.display = 'none';
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Estrutura salva com sucesso.',
      showConfirmButton: false,
      timer: 1500,
      background: '#dee2e6',
    });
    console.log(response);
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
});
