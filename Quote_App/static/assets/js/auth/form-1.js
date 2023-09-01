

var eyeOff = document.getElementById("eye-off");
var eyeOn = document.getElementById("eye-on");


	
	eyeOff.addEventListener('click', function() {
		eyeOff.style.display = 'none'
		eyeOn.style.display = 'block'
	  var x = document.getElementById("password");
	  if (x.type === "password") {
	    x.type = "text";
	  } else {
	    x.type = "password";
	  }
	});

	eyeOn.addEventListener('click', function() {
		eyeOff.style.display = 'block'
		eyeOn.style.display = 'none'
		var x = document.getElementById("password");
		if (x.type === "password") {
		  x.type = "text";
		} else {
		  x.type = "password";
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