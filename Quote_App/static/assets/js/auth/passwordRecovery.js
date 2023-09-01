function getConfCode() {
    //pegar o email inserido pelo usuario 
    var email = document.getElementById('email').value
    if (email==''){
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Insira um Email para Continuar',
            showConfirmButton: false,
            timer: 1500,
            background: '#dee2e6'
        })
        return;
    } else if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
		Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Insira um Email válido.',
            showConfirmButton: false,
            timer: 1500,
            background: '#dee2e6',
        })
        return;
	  }
    
    var loadScreen = document.getElementById('load_screen')
    loadScreen.style.display = 'block'

    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    const csrftoken = getCookie('csrftoken');
           
            
            
    fetch('/conf_code/', {
        method: 'POST',
        body: ['get_code',email],
        headers: { "X-CSRFToken": csrftoken }
    }).then(function(response) {
        loadScreen.style.display = 'none'
        var preConfCode = document.getElementById('pre_conf_code')
        preConfCode.style.display = 'none'

        var postConfCode = document.getElementById('post_conf_code')
        postConfCode.style.display = 'block'

        document.getElementById('email_confirm').value = email
        
    }).catch(function(error) {
        console.log('Error :', error);
    });
          
    


    
    




}
    var emailInput = document.getElementById("email");
	var errorMessage = document.getElementById("errorMessage");
	
	emailInput.addEventListener("keyup", validateEmail);
	emailInput.addEventListener("change", validateEmail);
  
	function validateEmail() {
	  if (!this.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
		errorMessage.innerHTML = "Digite um endereço de email válido";
	  } else {
		errorMessage.innerHTML = "";
	  }
	}

function confirmNewPassword() {
    var confirmEmail = document.getElementById('email_confirm').value
    var confirmPassword = document.getElementById('password').value
    var passwordDuo = document.getElementById('password_confirm').value
    var confCodeBrackets = document.querySelectorAll("input[name='conf_code_bracket']");
    var confCodeArray = Array.from(confCodeBrackets).map(function(element) {
    return element.value;
    });
    var confCode = confCodeArray.join('');


    var hasNumber = /\d/; // expressão regular para verificar se há pelo menos um número
    var hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/; // expressão regular para verificar se há pelo menos um caractere especial
    var hasUpperCase = /[A-Z]/; 
    var hasLowerCase = /[a-z]/;

    if (hasNumber.test(confirmPassword) && hasSpecialChar.test(confirmPassword) && hasUpperCase.test(confirmPassword) && hasLowerCase.test(confirmPassword)) {
      
    } else {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Insira uma senha válida.',
            showConfirmButton: false,
            timer: 1500,
            background: '#dee2e6',
        })
      return;
    }
    if (confirmPassword!=passwordDuo){
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'A confirmação de senha não está igual a senha.',
            showConfirmButton: false,
            timer: 1500,
            background: '#dee2e6',
        })
      return;
    }

  
    var loadScreen = document.getElementById('load_screen')
    loadScreen.style.display = 'block'

    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    const csrftoken = getCookie('csrftoken');
    var arrayInfos = [confirmEmail,confCode,confirmPassword].join('-')
           
    loadScreen.style.display = 'block'
            
    fetch('/conf_code/', {
        method: 'POST',
        body: ['confirm_change',arrayInfos],
        headers: { "X-CSRFToken": csrftoken }
    }).then(function(response) {
        loadScreen.style.display = 'none'
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Senha alterada com sucesso',
            showConfirmButton: false,
            timer: 1000,
            background: '#dee2e6',
        })
        window.setTimeout(function(){
        window.location.href = "/"
        },1200)
    }).catch(function(error) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Código Incorreto',
            showConfirmButton: false,
            timer: 1500,
            background: '#dee2e6',
        })
      return;
    });
    



}



var eyeOff = document.getElementById("eye-off");
var eyeOn = document.getElementById("eye-on");


	
	eyeOff.addEventListener('click', function() {
		eyeOff.style.display = 'none'
		eyeOn.style.display = 'block'
	  var x = document.getElementById("password");
      var y = document.getElementById("password_confirm");
	  if (x.type === "password") {
	    x.type = "text";
        y.type = "text";
	  } else {
	    x.type = "password";
        y.type = "password";
	  }
	});

	eyeOn.addEventListener('click', function() {
		eyeOff.style.display = 'block'
		eyeOn.style.display = 'none'
		var x = document.getElementById("password");
        var y = document.getElementById("password_confirm");
		if (x.type === "password") {
		  x.type = "text";
          y.type = "text";
		} else {
		  x.type = "password";
          y.type = "password";
		}
	  });