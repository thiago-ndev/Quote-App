
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


function deleteUser(email) {
    const csrftoken = getCookie('csrftoken');
    document.getElementById('loading-card').style.display = 'block';
  
    // Fetch to make the POST request and pass the email value
    fetch('/manage_users/', {
      method: 'POST',
      body: ['userErase', email],  // Pass email as an array
      headers: { "X-CSRFToken": csrftoken, "Content-Type": "application/json" }
    }).then(function(response) {
        const rowToRemove = document.getElementById(email);
        if (rowToRemove) {
          rowToRemove.remove();
        }
      document.getElementById('loading-card').style.display = 'none';
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Esse usuário foi apagado com sucesso.',
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
  }
  