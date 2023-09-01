// Get the submit button element
var submitButton = document.querySelector('.submit-button');

// Add a click event listener to the submit button
submitButton.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the email address value
    var emailInput = document.getElementById('defaultForm-name');
    var emailAddress = emailInput.value;

    // Get the checkbox value
    var checkboxInput = document.getElementById('defaultGridCheck');
    var isChecked = checkboxInput.checked;

    // Log the email address and checkbox value
    console.log('Email Address:', emailAddress);
    console.log('Checkbox Checked:', isChecked);

    dataArrayInfo = [emailAddress, isChecked]

    const csrftoken = getCookie('csrftoken');
        document.getElementById('loading-card').style.display = 'block'
      
        if (emailAddress!=''){
          fetch('/administrative_area/', {
            method: 'POST',
            body: ['userNew', dataArrayInfo],
            headers: { "X-CSRFToken": csrftoken }
          }).then(function(response) {
              emailInput.value = ''
              checkboxInput.checked = false
              // Simulate a click event on the button
              stepperDefault.previous();
            document.getElementById('loading-card').style.display = 'none'
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Usuário criado com sucesso.',
              showConfirmButton: false,
              timer: 1500,
              background: '#dee2e6',
          })
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
        }
        //fetch para fazer o post da pagina na hora de editar
        

    
    // Perform any further actions or validations as needed
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


  var submitButtonContato = document.querySelector('.submit-novo-contato');

  // Add a click event listener to the submit button
  submitButtonContato.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent the default form submission
  
      // Get the email address value
      var nameInput = document.getElementById('nomeContato');
      var nameContato = nameInput.value;
  
      // Get the checkbox value
      var numeroInput = document.getElementById('numeroContato');
      var numeroContato = numeroInput.value;
  
      
  
      dataArrayInfoContato = [nameContato, numeroContato]
  
      const csrftoken = getCookie('csrftoken');
          document.getElementById('loading-card').style.display = 'block'
        
          
          //fetch para fazer o post da pagina na hora de editar
          fetch('/administrative_area/', {
            method: 'POST',
            body: ['contactNew', dataArrayInfoContato],
            headers: { "X-CSRFToken": csrftoken }
          }).then(function(response) {
              nameInput.value = ''
              numeroInput.value = ''
              // Simulate a click event on the button
              v_stepperDefault.previous()
            document.getElementById('loading-card').style.display = 'none'
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Contato criado com sucesso.',
              showConfirmButton: false,
              timer: 1500,
              background: '#dee2e6',
          })
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
  
      
      // Perform any further actions or validations as needed
  });