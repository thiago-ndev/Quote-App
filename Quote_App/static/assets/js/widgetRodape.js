var bookadoTeus = document.getElementById('bookado_teus')
var bookadoTons = document.getElementById('bookado_tons')
var predictTeusPOLPOD = document.getElementById('predict_teus_pol_pod')
var predictTonsPOLPOD = document.getElementById('predict_tons_pol_pod')
var deltaTeus = document.getElementById('delta_teus')
var deltaTons = document.getElementById('delta_tons')
var deltaHistTeus = document.getElementById('delta_hist_teus')
var deltaHistTons = document.getElementById('delta_hist_tons')


window.addEventListener('load', function() {
    bookadoTeus.innerText = soma_bookado_teus;
    bookadoTons.innerText = soma_bookado_tons;
    predictTeusPOLPOD.innerText = soma_predict_teus_pol_pod;
    predictTonsPOLPOD.innerText = soma_predict_tons_pol_pod;
    deltaTeus.innerText = soma_delta_teus;
    deltaTons.innerText = soma_delta_tons;
    deltaHistTeus.innerText = soma_delta_hist_teus;
    deltaHistTons.innerText = soma_delta_hist_tons;
  });
  
