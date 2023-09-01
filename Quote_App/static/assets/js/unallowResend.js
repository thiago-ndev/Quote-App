//if para n permitir reenvio de formulario na hora de logar ou mudar senha
if ( window.history.replaceState ) {
    window.history.replaceState( null, null, window.location.href );
  }