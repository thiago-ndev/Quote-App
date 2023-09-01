let indexToEdit;
let indexToDelete;

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




  $(document).ready(function() {
    $("#btn-add").click(function(e) {
      e.preventDefault();
     

      // Get the values from the input fields
      var stock = $("#stock-inserted").val();
      var volatility = $("#vol-inserted").val();

      // Check if the inputs are empty
      if (stock.trim() === "" || volatility.trim() === "") {
        // Display an error message or perform appropriate action
        alert("Please fill in all the fields.");
        return;
      }

      // Create a new row in the table with the input values
      var newRow =
        "<tr><td>" + stock.toUpperCase() + "</td><td>" + volatility + `</td><td class="text-center"><div class="action-btn">
        <svg style="margin-right: 5px;
        cursor: pointer;
        color: #888ea8;
        width: 20px;
        fill: rgba(136, 142, 168, 0.09);" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 edit"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
      
        <svg style="color: red;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
      </div></td></tr>`;
        dataArrayInfoVolatility = [stock.toUpperCase(), volatility]
      

        const csrftoken = getCookie('csrftoken');
          document.getElementById('loading-card').style.display = 'block'
        
          
          //fetch para fazer o post da pagina na hora de editar
          fetch('/administrative_area/', {
            method: 'POST',
            body: ['volatilityNew', dataArrayInfoVolatility],
            headers: { "X-CSRFToken": csrftoken }
          }).then(function(response) {
              
              
            document.getElementById('loading-card').style.display = 'none'
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Ação criada com sucesso.',
              showConfirmButton: false,
              timer: 1500,
              background: '#dee2e6',
            })
            $("table tbody").append(newRow);
            console.log(response)
          }).catch(function(error) {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Algo não ocorreu como esperado.',
              showConfirmButton: false,
              timer: 1500,
              background: '#dee2e6',
          })
        });

      // Append the new row to the table body
      

      // Clear the input fields
      $("#stock-inserted").val("");
      $("#vol-inserted").val("");

      // Close the modal
      $("#addContactModal").modal("hide");
    });
  });

  $("#insert-stock-button").click(function(e) {
      e.preventDefault();
      $(".add-title").show();
      $(".edit-title").hide();
      $("#btn-add").show();
      $("#btn-edit").hide();
      $("#addContactModal").modal("show");

});


$("table").on("click", ".edit", function() {
  // Get the row index
  var rowIndex = $(this).closest("tr").index();
  indexToEdit = rowIndex;
  var stockArray = $("table tbody td:first-child").map(function() {
    return $(this).text();
  }).get();

  // Create an array of column two values (Volatility) in the table
  var volatilityArray = $("table tbody td:nth-child(2)").map(function() {
    return $(this).text();
  }).get();


  var stock = stockArray[rowIndex];
  var volatility = volatilityArray[rowIndex];
  // Update the modal title and mode
  $(".add-title").hide();
  $(".edit-title").show();
  $("#btn-add").hide();
  $("#btn-edit").show();

  // Set the values of the modal inputs based on the row data (assuming you have an array of data called "volData")
  $("#stock-inserted").val(stock);
  $("#vol-inserted").val(volatility);


  

  // Show the modal
  $("#addContactModal").modal("show");
});


$("#btn-edit").click(function(e) {
  e.preventDefault();

  // Get the values from the input fields
  var newStock = $("#stock-inserted").val().toUpperCase();
  var newVolatility = $("#vol-inserted").val();
  
  // Check if the inputs are empty
  if (newStock.trim() === "" || newVolatility.trim() === "") {
    // Display an error message or perform appropriate action
    // alert("Please fill in all the fields.");
    return false;
  }
  

  // Create a new row in the table with the updated values
  var newRow = "<tr><td>" + newStock + "</td><td>" + newVolatility + `</td><td class="text-center"><div class="action-btn">
  <svg style="margin-right: 5px;
  cursor: pointer;
  color: #888ea8;
  width: 20px;
  fill: rgba(136, 142, 168, 0.09);" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 edit"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>

  <svg style="color: red;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle table-cancel"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
</div></td></tr>`;

  const csrftoken = getCookie('csrftoken');
  document.getElementById('loading-card').style.display = 'block'


  //fetch para fazer o post da pagina na hora de editar
  fetch('/administrative_area/', {
    method: 'POST',
    body: ['volatilityEdit', [newStock, newVolatility, indexToEdit]],
    headers: { "X-CSRFToken": csrftoken }
  }).then(function(response) {
      
      
    document.getElementById('loading-card').style.display = 'none'
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Ação editada com sucesso.',
      showConfirmButton: false,
      timer: 1500,
      background: '#dee2e6',
    })
    $("table tbody tr").eq(indexToEdit).replaceWith(newRow);
    console.log(response)
  }).catch(function(error) {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Algo não ocorreu como esperado.',
      showConfirmButton: false,
      timer: 1500,
      background: '#dee2e6',
  })
  });

  // Replace the row in the table with the updated values
  

  // Clear the input fields
  $("#stock-inserted").val("");
  $("#vol-inserted").val("");

  // Close the modal
  $("#addContactModal").modal("hide");
});


$("table").on("click", ".table-cancel", function() {
  // Get the row index
  var rowIndex = $(this).closest("tr").index();
  indexToDelete = rowIndex;
  const csrftoken = getCookie('csrftoken');
  document.getElementById('loading-card').style.display = 'block'


  fetch('/administrative_area/', {
    method: 'POST',
    body: ['volatilityDelete', [indexToDelete]],
    headers: { "X-CSRFToken": csrftoken }
  }).then(function(response) {
      
      
    document.getElementById('loading-card').style.display = 'none'
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Ação apagada com sucesso.',
      showConfirmButton: false,
      timer: 1500,
      background: '#dee2e6',
    })
    $("table tbody tr").eq(indexToDelete).remove();
    document.getElementById('loading-card').style.display = 'none'
    
  }).catch(function(error) {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Algo não ocorreu como esperado.',
      showConfirmButton: false,
      timer: 1500,
      background: '#dee2e6',
  })
  });
  
  
});