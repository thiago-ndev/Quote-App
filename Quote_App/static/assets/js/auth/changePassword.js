

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



function submitFormChangePassword() {
    var password = document.getElementById("password").value
    var passwordConfirm = document.getElementById("password_confirm").value

    var hasNumber = /\d/; // expressão regular para verificar se há pelo menos um número
    var hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/; // expressão regular para verificar se há pelo menos um caractere especial
    var hasUpperCase = /[A-Z]/; 
    var hasLowerCase = /[a-z]/;
    if (hasNumber.test(passwordConfirm) && hasSpecialChar.test(passwordConfirm) && hasUpperCase.test(passwordConfirm) && hasLowerCase.test(passwordConfirm)) {
      
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
    if (password!=passwordConfirm){
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
    document.getElementById("form_change_password").submit();
    }



    function getParameterByName(name) {
        var url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
    
    var user = getParameterByName('user');
    if(user) {
        document.getElementById("email").value = user;
        document.getElementById('email').disabled = true;
    }