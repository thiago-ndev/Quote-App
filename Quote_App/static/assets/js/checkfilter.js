var weeks = document.getElementsByName('week');
var services = document.getElementsByName('service');
var voyages = document.getElementsByName('voyage');
var shippers = document.getElementsByName('shipper');
var shippers_s_all = document.getElementById('shipper_select_all');
var pols = document.getElementsByName('pol');
var pods = document.getElementsByName('pod');
function showCheckboxes(id) {
  var checkboxes = document.getElementById(id);
  if (checkboxes.style.display=="none") {
    checkboxes.style.display = "block";
  } else {
    checkboxes.style.display = "none";
  }
}
$('#week_select_all').on('change', function () {
    const statusSelectAllweek = $('#week_select_all')[0].checked;
    if(statusSelectAllweek){
        weeks.forEach(week => {
        week.checked=true
        document.querySelector('#area_labeled_week').lastChild.textContent="Week"
        
    });
    } else {
      weeks.forEach(week => {
        week.checked=false
        document.querySelector('#area_labeled_week').lastChild.textContent="Week"
        
    });
      }
});
$('#shipper_select_all').on('change', function () {
  const statusSelectAllshipper = $('#shipper_select_all')[0].checked;
  
  if(statusSelectAllshipper){
      
      shippers.forEach(shipper => {
      
      shipper.checked=true
      
      document.querySelector('#area_labeled_shipper').lastChild.textContent="Cliente"
      

  });
  } else {
    shippers.forEach(shipper => {
      shipper.checked=false
      document.querySelector('#area_labeled_shipper').lastChild.textContent="Cliente"
      

  });
    }
});
$('#service_select_all').on('change', function () {
  const statusSelectAllservice = $('#service_select_all')[0].checked;
  if(statusSelectAllservice){
      services.forEach(service => {
      service.checked=true
      document.querySelector('#area_labeled_service').lastChild.textContent="Service"
  });
  } else {
    services.forEach(service => {
      service.checked=false
      document.querySelector('#area_labeled_service').lastChild.textContent="Service"
  });
    }
});

$('#voyages_select_all').on('change', function () {
  const statusSelectAllvoyages = $('#voyages_select_all')[0].checked;
  if(statusSelectAllvoyages){
      voyages.forEach(voyage => {
      voyage.checked=true
      
      document.querySelector('#area_labeled_voyage').lastChild.textContent="Voyage"
  });
  } else {
    voyages.forEach(voyage => {
      voyage.checked=false
      document.querySelector('#area_labeled_voyage').lastChild.textContent="Voyage"
  });
    }
});

$('#pol_select_all').on('change', function () {
  const statusSelectAllpols = $('#pol_select_all')[0].checked;
  if(statusSelectAllpols){
      pols.forEach(pol => {
      pol.checked=true
      document.querySelector('#area_labeled_pol').lastChild.textContent="POL"
  });
  } else {
    pols.forEach(pol => {
      pol.checked=false
      document.querySelector('#area_labeled_pol').lastChild.textContent="POL"
  });
    }
});
$('#pod_select_all').on('change', function () {
  const statusSelectAllpods = $('#pod_select_all')[0].checked;
  if(statusSelectAllpods){
      pods.forEach(pod => {
      pod.checked=true
      document.querySelector('#area_labeled_pod').lastChild.textContent="POD"
  });
  } else {
    pods.forEach(pod => {
      pod.checked=false
      document.querySelector('#area_labeled_pod').lastChild.textContent="POD"
  });
    }
});

// const boxweek = document.querySelector('#boxweek')
// const boxservice = document.querySelector('#boxservice')
// const boxvoyage = document.querySelector('#boxvoyage')
// const boxpol = document.querySelector('#boxpol')
// const boxpod = document.querySelector('#boxpod')
// const checkservice = document.querySelector('#checkboxesservice')
// const checkvoyage = document.querySelector('#checkboxesvoyages')
// const checkpol = document.querySelector('#checkboxespol')
// const checkpod = document.querySelector('#checkboxespod')
// var listTrue = [checkpol,checkpod,checkvoyage,checkservice,boxvoyage,boxservice,boxpod,boxpol]

// document.addEventListener('click', (event) => {
//   var confirmation=[]
//   for (var prop in listTrue){
//     confirmation.push(event.composedPath().includes(listTrue[prop]))
//   }
// if ($.inArray(true, confirmation) !== -1){
      
// }
// else{
//   document.getElementById('checkboxesservice').style.display = "none";
//   document.getElementById('checkboxesvoyages').style.display = "none";
//   document.getElementById('checkboxespol').style.display = "none";
//   document.getElementById('checkboxespod').style.display = "none";
// }
 
// });


//if para n permitir reenvio de formulario na hora de filtrar
if ( window.history.replaceState ) {
  window.history.replaceState( null, null, window.location.href );
}
// $('#boxweek').hover(function () {
//   const ele = document.getElementById('weekselect');
  
//   if (elebox.classList.contains('selecting-box')){
//     ele.classList.remove('selecting-box');
//     elebox.classList.remove('selecting-box');
//     elebox.classList.remove('selecting-label');

    
//  }
//  else{
//      ele.classList.add('selecting-box');
//      elebox.classList.add('selecting-box');
//      elebox.classList.add('selecting-label');
//  }
// });

// $('#boxservice').hover(function () {
//   const ele = document.getElementById('serviceselect');
//   const elebox = document.getElementById('checkboxesservice');
//   if (elebox.classList.contains('selecting-box')){
//     ele.classList.remove('selecting-box');
//     elebox.classList.remove('selecting-box');
//     elebox.classList.remove('selecting-label');

    
//  }
//  else{
//      ele.classList.add('selecting-box');
//      elebox.classList.add('selecting-box');
//      elebox.classList.add('selecting-label');
//  }
// });
// $('#checkboxesservice').hover(function () {
//   const ele=document.getElementById('serviceselect');
//   const elebox = document.getElementById('checkboxesservice');
//   if (elebox.classList.contains('selecting-box')){
//     ele.classList.remove('selecting-box');
//     elebox.classList.remove('selecting-box');
//     elebox.classList.remove('selecting-label');  
//  }
//  else{
//   ele.classList.add('selecting-box');
//   elebox.classList.add('selecting-box');
//   elebox.classList.add('selecting-label');
// }
// });






// $('#boxvoyage').hover(function () {
//   const ele=document.getElementById('voyagesselect');
//   const elebox = document.getElementById('checkboxesvoyages');
//   if (elebox.classList.contains('selecting-box')){
//     ele.classList.remove('selecting-box');
//     elebox.classList.remove('selecting-box');
//     elebox.classList.remove('selecting-label');

    
//  }
//  else{
//      ele.classList.add('selecting-box');
//      elebox.classList.add('selecting-box');
//      elebox.classList.add('selecting-label');
//  }
// });
// $('#checkboxesvoyages').hover(function () {
//   const ele=document.getElementById('voyagesselect');
//   const elebox = document.getElementById('checkboxesvoyages');
//   if (elebox.classList.contains('selecting-box')){
//     ele.classList.remove('selecting-box');
//     elebox.classList.remove('selecting-box');
//     elebox.classList.remove('selecting-label')    
//  }
//  else{
//   ele.classList.add('selecting-box');
//   elebox.classList.add('selecting-box');
//   elebox.classList.add('selecting-label') }
// });
// $('#boxpol').hover(function () {
//   const ele = document.getElementById('polselect');
//   const elebox = document.getElementById('checkboxespol');
//   if (elebox.classList.contains('selecting-box')){
//     ele.classList.remove('selecting-box');
//     elebox.classList.remove('selecting-box');
//     elebox.classList.remove('selecting-label');

    
//  }
//  else{
//      ele.classList.add('selecting-box');
//      elebox.classList.add('selecting-box');
//      elebox.classList.add('selecting-label');
//  }
// });
// $('#checkboxespol').hover(function () {
//   const ele=document.getElementById('polselect');
//   const elebox = document.getElementById('checkboxespol');
//   if (elebox.classList.contains('selecting-box')){
//     ele.classList.remove('selecting-box');
//     elebox.classList.remove('selecting-box');
//     elebox.classList.remove('selecting-label')    
//  }
//  else{
//   ele.classList.add('selecting-box');
//   elebox.classList.add('selecting-box');
//   elebox.classList.add('selecting-label') }
// });
// $('#boxpod').hover(function () {
//   const ele = document.getElementById('podselect');
//   const elebox = document.getElementById('checkboxespod');
//   if (elebox.classList.contains('selecting-box')){
//     ele.classList.remove('selecting-box');
//     elebox.classList.remove('selecting-box');
//     elebox.classList.remove('selecting-label');

    
//  }
//  else{
//      ele.classList.add('selecting-box');
//      elebox.classList.add('selecting-box');
//      elebox.classList.add('selecting-label');
//  }
// });
// $('#checkboxespod').hover(function () {
//   const ele=document.getElementById('podselect');
//   const elebox = document.getElementById('checkboxespod');
//   if (elebox.classList.contains('selecting-box')){
//     ele.classList.remove('selecting-box');
//     elebox.classList.remove('selecting-box');
//     elebox.classList.remove('selecting-label')    
//  }
//  else{
//   ele.classList.add('selecting-box');
//   elebox.classList.add('selecting-box');
//   elebox.classList.add('selecting-label') }
// });
