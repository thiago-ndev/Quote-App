


$('#edit_voyage_button').on('click', function (e) {

    var checkboxs_inputs = document.querySelectorAll('input[name="checkbox_input_voyage"]')
    var inboxCheckboxParents = $(".todochkbox:checked").parents('.checkbox_row_voyage'); 


    var actualVoyage = inboxCheckboxParents.find('.vessel_table_voyage')[0];
    var actualPOL = inboxCheckboxParents.find('.pol_table_voyage')[0];
    var actualCEfetivaTEU = inboxCheckboxParents.find('.c_efetiva_teu_table_voyage')[0];
    var actualCEfetivaTON = inboxCheckboxParents.find('.c_efetiva_ton_table_voyage')[0];
    var actualCDesejadaTEU = inboxCheckboxParents.find('.c_desejada_teu_table_voyage')[0];
    var actualCDesejadaTON = inboxCheckboxParents.find('.c_desejada_ton_table_voyage')[0];
    var actualComment = inboxCheckboxParents.find('.comentario_table_voyage')[0];

    var myLength = checkboxs_inputs.length;
    var arraycheckboxs_inputs_test = []
for (var i = 0; i < myLength; ++i) {
    if (checkboxs_inputs[i].checked){
        arraycheckboxs_inputs_test.push(i)
    }
}
console.log(arraycheckboxs_inputs_test)

if (arraycheckboxs_inputs_test.length==1) {
    var getModal = $('#editModalVoyage');

    var $_getModalNameInput = getModal.find('#vessel_name_voyage_management');
    var $_getModalPOLInput = getModal.find('#pol_voyage_management');
    var $_getModal_c_efetiva_teuInput = getModal.find('#capacidade_efetiva_teu_voyage_management');
    var $_getModal_c_efetiva_tonInput = getModal.find('#capacidade_efetiva_ton_voyage_management');
    var $_getModal_c_desejada_teuInput = getModal.find('#capacidade_desejada_teu_voyage_management');
    var $_getModal_c_desejada_tonInput = getModal.find('#capacidade_desejada_ton_voyage_management');
    var $_getModalCommentInput = getModal.find('#comentario');
    

    var $_setModalVesselValue = $_getModalNameInput.val(actualVoyage.textContent);
    var $_setModalPOLValue = $_getModalPOLInput.val(actualPOL.textContent);
    var $_setModal_c_efetiva_teuValue = $_getModal_c_efetiva_teuInput.val(actualCEfetivaTEU.textContent);
    var $_setModal_c_efetiva_tonValue = $_getModal_c_efetiva_tonInput.val(actualCEfetivaTON.textContent);
    var $_setModal_c_desejada_teuValue = $_getModal_c_desejada_teuInput.val(actualCDesejadaTEU.textContent);
    var $_setModal_c_desejada_tonValue = $_getModal_c_desejada_tonInput.val(actualCDesejadaTON.textContent);
    var $_setModal_commentValue = $_getModalCommentInput.val(actualComment.textContent);





    var elemento = document.getElementById('editModalVoyage')
    
    elemento.style.backgroundColor="transparent";
    elemento.classList.add('show')
    elemento.style.display = "block"
    window.setTimeout(function(){
      elemento.style.opacity = 1;
      elemento.style.transform = 'scale(1)';
    },0);

    window.setTimeout(function(){
        let opacity = 0;

      function fadeIn() {
        opacity += 0.01;
        elemento.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
        if (opacity < 0.75) {
          setTimeout(fadeIn, 10);
        }
      }
      fadeIn()
        
      },500);


      $('#submit-voyage-edit').on('click', function (e) {
        actualCDesejadaTEU.textContent = $_getModal_c_desejada_teuInput[0].value;
        actualCDesejadaTON.textContent = $_getModal_c_desejada_tonInput[0].value;
        actualComment.textContent = $_getModalCommentInput[0].value;


        const csrftoken = getCookie('csrftoken');
        document.getElementById('loading-card').style.display = 'block'
        
        var dataArrayInsert = [actualVoyage.textContent,actualPOL.textContent,$_getModal_c_desejada_teuInput[0].value,$_getModal_c_desejada_tonInput[0].value,$_getModalCommentInput[0].value,arraycheckboxs_inputs_test[0]].join('|');
        console.log(dataArrayInsert)
        //fetch para fazer o post da pagina na hora de editar
        fetch('/General/voyage_management/', {
            method: 'POST',
            body: ['insercao', dataArrayInsert],
            headers: { "X-CSRFToken": csrftoken }
        }).then(function(response) {
            document.getElementById('loading-card').style.display = 'none'
            console.log(response)
        }).catch(function(error) {
            console.log('Error :', error);
        });



        var elemento = document.getElementById('editModalVoyage')
    window.setTimeout(function(){
        elemento.style.opacity = 0;
        elemento.style.transform = 'scale(0)';
        
        },350); 
    window.setTimeout(function(){
    
    elemento.classList.remove('show')
      elemento.style.display = 'none';
    },520); 
    window.setTimeout(function(){
        let opacity = 0.75;

      function fadeOut() {
        console.log(opacity)
        opacity -= 0.05;
        elemento.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
        if (opacity > 0) {
          setTimeout(fadeOut, 10);
        }
      }
      fadeOut()
        
      },0);


      });

} else if (arraycheckboxs_inputs_test.length==0) {
    const eraseScript = "Selecione Algum Input para poder editar!"
    Swal.fire({
        title: 'Sem itens a serem editados!',
        text: eraseScript,
        icon:'error',
        showConfirmButton: false,
        timer: 5000,
        position : 'top'
    })
    
} 


})
 







$('#close_input_edit_voyage').on('click', function (e) {
    var elemento = document.getElementById('editModalVoyage')
    window.setTimeout(function(){
        elemento.style.opacity = 0;
        elemento.style.transform = 'scale(0)';
        
        },350); 
    window.setTimeout(function(){
    
    elemento.classList.remove('show')
      elemento.style.display = 'none';
    },520); 
    window.setTimeout(function(){
        let opacity = 0.75;

      function fadeOut() {
        console.log(opacity)
        opacity -= 0.05;
        elemento.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
        if (opacity > 0) {
          setTimeout(fadeOut, 10);
        }
      }
      fadeOut()
        
      },0);


})
$('#cancel_input_edit_voyage').on('click', function (e) {
    var elemento = document.getElementById('editModalVoyage')
    window.setTimeout(function(){
        elemento.style.opacity = 0;
        elemento.style.transform = 'scale(0)';
        
        },350); 
    window.setTimeout(function(){
    
    elemento.classList.remove('show')
      elemento.style.display = 'none';
    },520); 
    window.setTimeout(function(){
        let opacity = 0.75;

      function fadeOut() {
        console.log(opacity)
        opacity -= 0.05;
        elemento.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
        if (opacity > 0) {
          setTimeout(fadeOut, 10);
        }
      }
      fadeOut()
        
      },0);


})
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
 




$('#select_all_voyage').on('click', function (e) {
var checkboxs_inputs = document.querySelectorAll('input[name="checkbox_input_voyage"]')

var myLength = checkboxs_inputs.length;
if (document.getElementById('select_all_voyage').checked){


for (var i = 0; i < myLength; ++i) {
        checkboxs_inputs[i].checked = true
        
    
}


    } else {
    
    for (var i = 0; i < myLength; ++i) {
        
        checkboxs_inputs[i].checked = false
            
        
    }


    }
})
//preenchendo o background das linhas selecionadas com azul e adcionando ao input erase os indices que estao selecionado
// document.onclick = function(e){
    
//     var checkboxs_inputs_original = document.querySelectorAll('input[name="checkbox_input"]')
//     var checkboxs_rows_original = document.querySelectorAll('tr[name="checkbox_row"]')

//     var myLengthOriginal = checkboxs_inputs_original.length;
//     var arraycheckboxs_inputs_original = []
// for (var i = 0; i < myLengthOriginal; ++i) {
//     if (checkboxs_inputs_original[i].checked){
//     checkboxs_rows_original[i].style.background = "#ADD8E6"
//     arraycheckboxs_inputs_original.push(checkboxs_rows_original[i].rowIndex)
//     } else {
//     checkboxs_rows_original[i].style.background = "#fff"
//     }
// }
// if (arraycheckboxs_inputs_original.length>0){
//     if (arraycheckboxs_inputs_original.length==1) {
//         var index_to_edit = arraycheckboxs_inputs_original[0]-1
        
//         var vessel_table = document.querySelectorAll('p[name="vessel_table"]')[index_to_edit].lastChild.textContent
//         var pol_table = document.querySelectorAll('p[name="pol_table"]')[index_to_edit].lastChild.textContent
//         var c_efetiva_teu_table = document.querySelectorAll('p[name="c_efetiva_teu_table"]')[index_to_edit].lastChild.textContent
//         var c_efetiva_ton_table = document.querySelectorAll('p[name="c_efetiva_ton_table"]')[index_to_edit].lastChild.textContent


//         var vessel_name_edit = document.getElementById('vessel_name_edit')
//         var pol_edit = document.getElementById('pol_edit')
//         var c_efetiva_teu_edit = document.getElementById('capacidade_efetiva_teu_edit')
//         var c_efetiva_ton_edit = document.getElementById('capacidade_efetiva_ton_edit')
//         var index_edit_insert = document.getElementById('index_edit')

//         vessel_name_edit.setAttribute("value", vessel_table);
//         pol_edit.setAttribute("value", pol_table);
//         c_efetiva_teu_edit.setAttribute("value", c_efetiva_teu_table);
//         c_efetiva_ton_edit.setAttribute("value", c_efetiva_ton_table);
//         index_edit_insert.setAttribute("value", index_to_edit);
        
//         document.getElementById('edit_principal_button').style.display = 'block'
//     } else{
//         document.getElementById('edit_principal_button').style.display = 'none'
//     }
//     // document.getElementById('insight_select').style.display = 'inline'
//     // console.log(document.getElementById('insight_select').value)
//     document.querySelector('#insight_select').lastChild.textContent = `${arraycheckboxs_inputs_original.length} selecionado(s)`
//     // document.getElementById('erase_button').style.display = 'block'
    
//     document.querySelector('#input_erase').value = arraycheckboxs_inputs_original
    
    

    
// } else{
//     // document.getElementById('insight_select').style.display = 'none'
//     // document.getElementById('erase_button').style.display = 'none'
//     // document.getElementById('edit_principal_button').style.display = 'none'
//     document.querySelector('#insight_select').lastChild.textContent = `${arraycheckboxs_inputs_original.length} selecionado(s)`
// }



// //////parte de insercao dos dados na tabela voyage




//     var checkboxs_rows = document.querySelectorAll('tr[name="checkbox_row_voyage"]')

//     var myLength = checkboxs_inputs.length;
//     var arraycheckboxs_inputs = []
// for (var i = 0; i < myLength; ++i) {
//     if (checkboxs_inputs[i].checked){
//     checkboxs_rows[i].style.background = "#ADD8E6"
//     arraycheckboxs_inputs.push(checkboxs_rows[i].rowIndex)
//     } else {
//     checkboxs_rows[i].style.background = "#fff"
//     }
// }
// if (arraycheckboxs_inputs.length>0){
//     if (arraycheckboxs_inputs.length==1) {
//         var index_to_edit = arraycheckboxs_inputs[0]-1
        
//         var vessel_table = document.querySelectorAll('p[name="vessel_table_voyage"]')[index_to_edit].lastChild.textContent
//         var pol_table = document.querySelectorAll('p[name="pol_table_voyage"]')[index_to_edit].lastChild.textContent
//         var c_desejada_teu_table = document.querySelectorAll('p[name="c_desejada_teu_table_voyage"]')[index_to_edit].lastChild.textContent
//         var c_efetiva_teu_table = document.querySelectorAll('p[name="c_efetiva_teu_table_voyage"]')[index_to_edit].lastChild.textContent
//         var c_desejada_ton_table = document.querySelectorAll('p[name="c_desejada_ton_table_voyage"]')[index_to_edit].lastChild.textContent
//         var c_efetiva_ton_table = document.querySelectorAll('p[name="c_efetiva_ton_table_voyage"]')[index_to_edit].lastChild.textContent
//         var comentario_table = document.querySelectorAll('p[name="comentario_table_voyage"]')[index_to_edit].lastChild.textContent

//         var vessel_name_voyage_management = document.getElementById('vessel_name_voyage_management')
//         var pol_voyage_management = document.getElementById('pol_voyage_management')
//         var capacidade_desejada_teu_voyage_management = document.getElementById('capacidade_desejada_teu_voyage_management')
//         var capacidade_desejada_ton_voyage_management = document.getElementById('capacidade_desejada_ton_voyage_management')
//         var capacidade_efetiva_teu_voyage_management = document.getElementById('capacidade_efetiva_teu_voyage_management')
//         var capacidade_efetiva_ton_voyage_management = document.getElementById('capacidade_efetiva_ton_voyage_management')
//         var comentario = document.getElementById('comentario')
//         var index_voyage_management_insert = document.getElementById('index_voyage_management')

//         vessel_name_voyage_management.setAttribute("value",vessel_table);
//         pol_voyage_management.setAttribute("value",pol_table);
//         capacidade_efetiva_teu_voyage_management.setAttribute("value",c_efetiva_teu_table);
//         capacidade_efetiva_ton_voyage_management.setAttribute("value",c_efetiva_ton_table);
//         capacidade_desejada_teu_voyage_management.setAttribute("value", c_desejada_teu_table);
//         capacidade_desejada_ton_voyage_management.setAttribute("value", c_desejada_ton_table);
//         comentario.setAttribute("value", comentario_table);
//         index_voyage_management_insert.setAttribute("value", index_to_edit);
        
//         document.getElementById('edit_voyage_button').style.display = 'block'
//     } else{
//         document.getElementById('edit_voyage_button').style.display = 'none'
//     }
//     // document.getElementById('insight_select').style.display = 'inline'
//     // console.log(document.getElementById('insight_select').value)
//     // document.querySelector('#insight_select').lastChild.textContent = `${arraycheckboxs_inputs.length} selecionado(s)`
//     // document.getElementById('erase_button').style.display = 'block'
    
//     document.querySelector('#input_erase').value = arraycheckboxs_inputs
    
    

    
// } else{
//     // document.getElementById('insight_select').style.display = 'none'
//     // document.getElementById('erase_button').style.display = 'none'
//     // document.getElementById('edit_principal_button').style.display = 'none'
//     // document.querySelector('#insight_select').lastChild.textContent = `${arraycheckboxs_inputs.length} selecionado(s)`
// }

// }

// document.onclick = function editVoyage(e){
    
//     var checkboxs_inputs = document.querySelectorAll('input[name="checkbox_input_voyage"]')
//     var checkboxs_rows = document.querySelectorAll('tr[name="checkbox_row_voyage"]')

//     var myLength = checkboxs_inputs.length;
//     var arraycheckboxs_inputs = []
// for (var i = 0; i < myLength; ++i) {
//     if (checkboxs_inputs[i].checked){
//     checkboxs_rows[i].style.background = "#ADD8E6"
//     arraycheckboxs_inputs.push(checkboxs_rows[i].rowIndex)
//     } else {
//     checkboxs_rows[i].style.background = "#fff"
//     }
// }
// if (arraycheckboxs_inputs.length>0){
//     if (arraycheckboxs_inputs.length==1) {
//         var index_to_edit = arraycheckboxs_inputs[0]-1
        
//         var vessel_table = document.querySelectorAll('p[name="vessel_table_voyage"]')[index_to_edit].lastChild.textContent
//         var pol_table = document.querySelectorAll('p[name="pol_table_voyage"]')[index_to_edit].lastChild.textContent
//         var c_desejada_table = document.querySelectorAll('p[name="c_desejada_table_voyage"]')[index_to_edit].lastChild.textContent
//         var c_efetiva_table = document.querySelectorAll('p[name="c_efetiva_table_voyage"]')[index_to_edit].lastChild.textContent
//         var comentario_table = document.querySelectorAll('p[name="comentario_table_voyage"]')[index_to_edit].lastChild.textContent

//         var vessel_name_voyage_management = document.getElementById('vessel_name_voyage_management')
//         var pol_voyage_management = document.getElementById('pol_voyage_management')
//         var capacidade_desejada_voyage_management = document.getElementById('capacidade_desejada_voyage_management')
//         var capacidade_efetiva_voyage_management = document.getElementById('capacidade_efetiva_voyage_management')
//         var comentario = document.getElementById('comentario')
//         var index_voyage_management_insert = document.getElementById('index_voyage_management')

//         vessel_name_voyage_management.setAttribute("value",vessel_table);
//         pol_voyage_management.setAttribute("value",pol_table);
//         capacidade_efetiva_voyage_management.setAttribute("value",c_efetiva_table);
//         capacidade_desejada_voyage_management.setAttribute("value", c_desejada_table);
//         comentario.setAttribute("value", comentario_table);
//         index_voyage_management_insert.setAttribute("value", index_to_edit);
        
//         document.getElementById('edit_voyage_button').style.display = 'block'
//     } else{
//         document.getElementById('edit_voyage_button').style.display = 'none'
//     }
//     // document.getElementById('insight_select').style.display = 'inline'
//     // console.log(document.getElementById('insight_select').value)
//     // document.querySelector('#insight_select').lastChild.textContent = `${arraycheckboxs_inputs.length} selecionado(s)`
//     // document.getElementById('erase_button').style.display = 'block'
    
//     document.querySelector('#input_erase').value = arraycheckboxs_inputs
    
    

    
// } else{
//     // document.getElementById('insight_select').style.display = 'none'
//     // document.getElementById('erase_button').style.display = 'none'
//     // document.getElementById('edit_principal_button').style.display = 'none'
//     // document.querySelector('#insight_select').lastChild.textContent = `${arraycheckboxs_inputs.length} selecionado(s)`
// }
// }

if ( window.history.replaceState ) {
    window.history.replaceState( null, null, window.location.href );
  }


function validateForm() {
    var form_vessel = document.forms["form_vessel"]["vessel_name"].value;
    var form_pol = document.forms["form_vessel"]["pol"].value;


    
    var myLength = list_vessels.length;
    var arrayTrueInput = []

    for (var i = 0; i < myLength; ++i) {
        if ((list_vessels[i]==form_vessel.toUpperCase())&&(list_pols[i].toUpperCase()==form_pol.toUpperCase())){
            arrayTrueInput.push(true)
            
        } 
    }
    if (arrayTrueInput.length>0) {
        const eraseScript = `O par Vessel ${form_vessel.toUpperCase()} e POL ${form_pol} já possui um input aplicado!`
        Swal.fire({
            title: 'Ops!',
            text: eraseScript,
            icon:'error',
            showConfirmButton: true,
            confirmButtonColor: '#0251D3',
            position : 'center'
        })
        return false;
    }
    
}




let intervalId;

function showLoadingPopup() {
  document.getElementById('loading-card').style.display = 'block'
  document.body.style.overflow = 'hidden';
}

function hideLoadingPopup() {
    document.getElementById('loading-card').style.display = 'none'
    document.body.style.overflow = 'visible';
  // esconde o pop-up de carregamento
  clearInterval(intervalId);
}
document.querySelector(".validate-input").addEventListener("input", function (event) {
    if (isNaN(event.target.value)) {
      event.target.value = "";
    }
  });

  document.querySelector(".validate-input").addEventListener("keyup", function (event) {
    if (isNaN(event.target.value)) {
      event.target.value = "";
    }
  });
  document.querySelector(".validate-input").addEventListener("change", function (event) {
    if (isNaN(event.target.value)) {
      event.target.value = "";
    }
  });
  