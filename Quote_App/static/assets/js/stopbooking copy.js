const omission = document.getElementById('omission')
const wrapper = document.getElementById('wrapper')
const element = document.getElementById('inputMax')
const minPrev = document.getElementById('minPrev')
var Min = document.getElementById('Min')
var Max = document.getElementById('Max')
const minTeu = document.getElementById('MinTeu')
const minTon = document.getElementById('MinTon')

$('#wrapper').on('change', function (e) {
    e.preventDefault();
    const stopChecked = $('#stpBooking')[0].checked;

    if (stopChecked){

        element.classList.add('hidestop')
        omission.classList.remove('hidestop')   
        minPrev.classList.remove('hidestop')      
        $('#Min').attr("required", false)
        $('#Max').attr("required", false)
        $('#yes_omission').attr("required", true)
        $('#no_omission').attr("required", true)
        

    }
    else{
        element.classList.remove('hidestop')
        omission.classList.add('hidestop')
        minPrev.classList.add('hidestop')  
        $('#Min').attr("required", true)
        $('#Max').attr("required", true)
        $('#yes_omission').attr("required", false)
        $('#no_omission').attr("required", false)
        $('#MinTeu').attr("required", false)
        $('#MinTon').attr("required", false)
    }

});
$('#omission').on('change', function (e) {
    e.preventDefault();
    const omissionChecked = $('#no_omission')[0].checked;

    if (omissionChecked){

        wrapper.classList.remove('hidestop')
        minPrev.classList.remove('hidestop')
        
        $('#MinTeu').attr("required", true)
        $('#MinTon').attr("required", true)
        

        
          
        

        
        

     }
     else{
        wrapper.classList.add('hidestop')
        minPrev.classList.add('hidestop')
        $('#Min').attr("required", false)
        $('#Max').attr("required", false)
        $('#MinTeu').attr("required", false)
        $('#MinTon').attr("required", false)
    }

 });

    const checkminteu = document.querySelector('#MinTeu')
    const checkminton = document.querySelector('#MinTon')
    var listTrue = [checkminton,checkminteu]    
    document.addEventListener('click', (event) => {
        var confirmation=[]
        for (var prop in listTrue){
          confirmation.push(event.composedPath().includes(listTrue[prop]))
        }
        
      if ($.inArray(true, confirmation) !== -1){
            
      }
      else{
        $('#yes_omission').attr("required", false)
        $('#no_omission').attr("required", false)

      }   
    });     
// let saveButton = document.getElementById('btn-add-notes');
// saveButton.onclick = function() {
//     let accepted = confirm("Quer confirmar a ativação desse input?");
//     if (accepted) {
//         document.getElementById('form_active').submit();
//     }
// }   
$('#btn-add-notes').on('click', function (e) {   
e.preventDefault()
const validityMinTeu = $('#MinTeu')[0].checkValidity();
const validityMinTon = $('#MinTon')[0].checkValidity();
const validityMaxTeu = $('#Min')[0].checkValidity();
const validityMaxTon = $('#Max')[0].checkValidity();
var pol_list = document.querySelectorAll('input[name="pol"]')
var all_pod_list = document.querySelectorAll('input[name="all_pod"]')
var myLength = pol_list.length;
var arrayPolConf = []
for (var i = 0; i < myLength; ++i) {
    if (pol_list[i].checked){
      arrayPolConf.push(pol_list[i].value)
    }
    
}
console.log(arrayPolConf.length)
var voyage_list = document.querySelectorAll('input[name="voyage"]')
var myLength = voyage_list.length;
var arrayvoyageConf = []
for (var i = 0; i < myLength; ++i) {
    if (voyage_list[i].checked){
      arrayvoyageConf.push(voyage_list[i].value)
    }
    
}
var pod_list = document.querySelectorAll('input[name="pod"]')
var all_pod_list = document.querySelectorAll('input[name="all_pod"]')
var myLength = pod_list.length;

var arraypodConf = []
if (all_pod_list[0].checked){
  arraypodConf.push(all_pod_list[0].value)
}
else{
  for (var i = 0; i < myLength; ++i) {
    if (pod_list[i].checked){
      arraypodConf.push(pod_list[i].value)
    }
    
}

}


necessidades = []
$('[required]').each(function() {
  if ($(this).is(':invalid') || !$(this).val()){
      necessidades.push($(this).value)
      
  }
  else{
      
  }
  
})
  if (( arrayvoyageConf.length!==1|| arrayPolConf.length!==1 || arraypodConf.length<1 || validityMinTeu==false || validityMinTon==false || validityMaxTeu==false||validityMaxTon==false)){
    

    Swal.fire({
      title:'Atenção',
      text:'Preencha todos os campos requeridos.',
      icon:'warning',
      confirmButtonColor: '#0251D3'

    })
}
else{
  Swal.fire({
    title: 'Tem certeza?',
    text: "Deseja realmente confirmar essa mudança?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#0251D3',
    cancelButtonColor: '#3b3f5c',
    confirmButtonText: 'Sim, Ativar!',
    cancelButtonText: 'Não'
  }).then((result) => {
    if (result.isConfirmed) {
      
      document.getElementById('form_active').submit();
    }
  })
}
})



// function edicao(id_principal){
//   var id_uso = String("form:"+id_principal);

//   var elemento = document.getElementById(id_uso);

//   console.log(elemento.style.display=="none")
//   console.log(id_uso)
  
// }