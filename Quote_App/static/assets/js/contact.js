$(document).ready(function() {

  //acionando funcao de selecionar todos linkandd o checkbox do cabecalho da tabela ao restante
  checkall('contact-check-all', 'contact-chkbox');

  //input para buscar registros na pagina
  $('#input-search').on('keyup', function() {
    var rex = new RegExp($(this).val(), 'i');
      $('.searchable-items .items:not(.items-header-section)').hide();
      $('.searchable-items .items:not(.items-header-section)').filter(function() {
          return rex.test($(this).text());
      }).show();
  });

  //funcao para mudar a tabela para formato de card
  $('.view-grid').on('click', function(event) {
    event.preventDefault();
    /* Act on the event */

    $(this).parents('.switch').find('.view-list').removeClass('active-view');
    $(this).addClass('active-view');

    $(this).parents('.searchable-container').removeClass('list');
    $(this).parents('.searchable-container').addClass('grid');

    $(this).parents('.searchable-container').find('.searchable-items').removeClass('list');
    $(this).parents('.searchable-container').find('.searchable-items').addClass('grid');

  });
  //funcao para retornar ao formato de tabela na visualizacao dos inputs
  $('.view-list').on('click', function(event) {
    event.preventDefault();
    /* Act on the event */
    $(this).parents('.switch').find('.view-grid').removeClass('active-view');
    $(this).addClass('active-view');

    $(this).parents('.searchable-container').removeClass('grid');
    $(this).parents('.searchable-container').addClass('list');

    $(this).parents('.searchable-container').find('.searchable-items').removeClass('grid');
    $(this).parents('.searchable-container').find('.searchable-items').addClass('list');
  });
  //botao baseado no svg que abre o modal para adcionar um input
  $('#btn-add-contact').on('click', function(event) {
    document.getElementById('addContactModalTitleLabel1').innerText = 'Add Vessel'
    $('#addContactModal #btn-add').show();
    $('#addContactModal #btn-edit').hide();
    $('#addContactModal').modal('show');
  })
//funcao para deletar um input que é acionada quando é clicado o svg vermelho contido na coluna/carta
function deleteContact() {
  $(".delete").on('click', function(event) {
    event.preventDefault();
    /* Act on the event */
    var arrayExcludeIndex = $(this).parents('.items').index() - 1;
    list_vessels.splice(arrayExcludeIndex, 1);
    list_pols.splice(arrayExcludeIndex, 1);
    list_pods.splice(arrayExcludeIndex, 1);
  
  
    const csrftoken = getCookie('csrftoken');
    document.getElementById('loading-card').style.display = 'block'
    $(this).parents('.items').remove();
    fetch('/General/vessel_management/', {
      method: 'POST',
      body: ['apagamento', arrayExcludeIndex],
      headers: { "X-CSRFToken": csrftoken }
    }).then(function(response) {
      document.getElementById('loading-card').style.display = 'none'
      console.log(response)
    }).catch(function(error) {
      console.log('Error :', error);
  });
    
  });
}
//funcao para submitar form com as infos a serem inseridas
function addContact() {
  $("#btn-add").click(function() {
    var getParent = $(this).parents('.modal-content');

    var $_vessel_name = getParent.find('#vessel-name');
    var $_pol = getParent.find('#pol-name');
    var $_pod = getParent.find('#pod-name');
    var $_c_efetiva_teu = getParent.find('#c-efetiva-teu');
    var $_c_efetiva_ton = getParent.find('#c-efetiva-ton');

    var $_getValidationField = document.getElementsByClassName('validation-text');
   

    var $_vessel_nameValue = $_vessel_name.val();
    var $_polValue = $_pol.val();
    var $_podValue = $_pod.val();
    var $_c_efetiva_teuValue = $_c_efetiva_teu.val();
    var $_c_efetiva_tonValue = $_c_efetiva_ton.val();

    if ($_vessel_nameValue == "") {
      $_getValidationField[0].innerHTML = 'Insira um Vessel.';
      $_getValidationField[0].style.display = 'block';
    } else {
      $_getValidationField[0].style.display = 'none';
    }

    if ($_polValue == "") {
      $_getValidationField[1].innerHTML = 'Insira um POL.';
      $_getValidationField[1].style.display = 'block';
    }  else {
      $_getValidationField[1].style.display = 'none';
    }
    if ($_podValue == "") {
      $_getValidationField[2].innerHTML = 'Insira um POD.';
      $_getValidationField[2].style.display = 'block';
    }  else {
      $_getValidationField[2].style.display = 'none';
    }
    if ($_c_efetiva_teuValue == "") {
      $_getValidationField[3].innerHTML = 'Insira uma C. Efetiva (TEU)';
      $_getValidationField[3].style.display = 'block';
    }  else {
      $_getValidationField[3].style.display = 'none';
    }
    if ($_c_efetiva_tonValue == "") {
      $_getValidationField[4].innerHTML = 'Insira uma C. Efetiva (TON)';
      $_getValidationField[4].style.display = 'block';
    }  else {
      $_getValidationField[4].style.display = 'none';
    }

    if ($_vessel_nameValue == "" || $_polValue == ""  || $_c_efetiva_tonValue == "" || $_c_efetiva_teuValue == "" || $_podValue == "") {
      return false;
    }
    var myLength = list_vessels.length;
    var arrayTrueInput = []

    for (var i = 0; i < myLength; ++i) {
        if ((list_vessels[i]==$_vessel_nameValue.toUpperCase())&&(list_pols[i].toUpperCase()==$_polValue.toUpperCase())&&(list_pods[i].toUpperCase()==$_podValue.toUpperCase())){
            arrayTrueInput.push(true)
            
        } 
    }
    if (arrayTrueInput.length>0) {
        const eraseScript = `O Vessel ${$_vessel_nameValue.toUpperCase()}, POL ${$_polValue} e POD ${$_podValue} já possui um input aplicado!`
        $_getValidationField[4].innerHTML = eraseScript;
        $_getValidationField[4].style.display = 'block';
        return false;
    }
    list_vessels.push($_vessel_nameValue.toUpperCase())
    list_pols.push($_polValue)
    list_pods.push($_podValue)

    $html = `<div class="items">
              <div class="item-content" id="added-item-content">
                  <div class="user-profile">
                      <div class="n-chk align-self-center text-center">
                          <div class="form-check form-check-primary me-0 mb-0">
                              <input class="form-check-input inbox-chkbox contact-chkbox" onclick="document.getElementById('added-item-content').classList.toggle('selected')" type="checkbox">
                          </div>
                      </div>
                      <img src="/static/assets/img/vessel_image.png" alt="avatar">
                      <div class="user-meta-info" style="width: 200px;text-align: left;">
                          <p class="user-name" data-name="Alan Green">${$_vessel_nameValue}</p>
                          <p class="user-work" data-occupation="Web Developer">Vessel Name</p>
                      </div>
                  </div>
                  <div class="user-email" style="width: 200px;text-align: center;">
                      <p class="info-title">POL: </p>
                      <p class="usr-email-addr" data-email="alan@mail.com">${$_polValue}</p>
                  </div>
                  <div class="user-email" style="width: 200px;text-align: center;margin-top: 0px">
                      <p class="info-title">POD: </p>
                      <p class="usr-pod-addr" data-email="alan@mail.com">${$_podValue}</p>
                  </div>
                  <div class="user-location" style="width: 200px;text-align: center;">
                      <p class="info-title">C. Efetiva(TEU) </p>
                      <p class="usr-location" data-location="Boston, USA">${$_c_efetiva_teuValue}</p>
                  </div>
                  <div class="user-phone" style="width: 200px;text-align: center;">
                      <p class="info-title">C. Efetiva(TON) </p>
                      <p class="usr-ph-no" data-phone="+1 (070) 123-4567">${$_c_efetiva_tonValue}</p>
                  </div>
                  <div class="action-btn">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 edit"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>

                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user-minus delete"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                  </div>
              </div>
          </div>`


          var dataArrayInsert = [$_vessel_nameValue,$_polValue,$_podValue,$_c_efetiva_teuValue,$_c_efetiva_tonValue].join('-')

          const csrftoken = getCookie('csrftoken');
          document.getElementById('loading-card').style.display = 'block'
          
          
          fetch('/General/vessel_management/', {
            method: 'POST',
            body: ['insercao', dataArrayInsert],
            headers: { "X-CSRFToken": csrftoken }
          }).then(function(response) {
            document.getElementById('loading-card').style.display = 'none'
            console.log(response)
          }).catch(function(error) {
            console.log('Error :', error);
        });

      const itemsElements = document.getElementsByClassName("items");
      const lastClassElement = itemsElements[itemsElements.length - 1];
      lastClassElement.insertAdjacentHTML("afterend", $html);
      $('#addContactModal').modal('hide');

      var $_setvessel_nameValueEmpty = $_vessel_name.val('');
      var $_setpolValueEmpty = $_pol.val('');
      var $_setpodValueEmpty = $_pod.val('');
      var $_setc_efetiva_teuValueEmpty = $_c_efetiva_teu.val('');
      var $_setc_efetiva_tonValueEmpty = $_c_efetiva_ton.val('');

    deleteContact();
    editContact();
    checkall('contact-check-all', 'contact-chkbox');
  });  
}
//funcao para que assim que o modal for fechado, seja pra editar ou adcionar, sejam limpos os campos
$('#addContactModal').on('hidden.bs.modal', function (e) {
    var $_vesselName = document.getElementById('vessel-name');
    var $_polName = document.getElementById('pol-name');
    var $_podName = document.getElementById('pod-name');
    var $_c_efetiva_teu = document.getElementById('c-efetiva-teu');
    var $_c_efetiva_ton = document.getElementById('c-efetiva-ton');
    var $_getValidationField = document.getElementsByClassName('validation-text');
    

    var $_setVesselNameValueEmpty = $_vesselName.value = '';
    var $_setpolNameValueEmpty = $_polName.value = '';
    var $_setpodNameValueEmpty = $_podName.value = '';
    var $_setCEfetivaTEUValueEmpty = $_c_efetiva_teu.value = '';
    var $_setCEfetivaTONValueEmpty = $_c_efetiva_ton.value = '';

    for (var i = 0; i < $_getValidationField.length; i++) {
      e.preventDefault();
      $_getValidationField[i].style.display = 'none';
    }
})
//funcao para editar um input
//se inicia com um jquery para que no click no botao de editar o modal seja expandido e os dados daquela linha/carta sejam colocados no modal

function editContact() {
  $('.edit').on('click', function(event) {
    $('#addContactModal #btn-add').hide();
    $('#addContactModal #btn-edit').show();
    document.getElementById('addContactModalTitleLabel1').innerText = 'Edit Vessel'
    // Get Parents
    var getParentItem = $(this).parents('.items');
    var indexEdition = $(this).parents('.items').index() - 1;
    var getModal = $('#addContactModal');

    // Get List Item Fields
    var $_vessel_name = getParentItem.find('.user-name');
    var $_pol = getParentItem.find('.usr-email-addr');
    var $_pod = getParentItem.find('.usr-pod-addr');
    var $_c_efetiva_teu = getParentItem.find('.usr-location');
    var $_c_efetiva_ton = getParentItem.find('.usr-ph-no');
   

    // Get Attributes
    var $_vessel_nameAttrValue = $_vessel_name[0].innerText;
    var $_polAttrValue = $_pol[0].innerText;
    var $_podAttrValue = $_pod[0].innerText;
    var $_c_efetiva_teuAttrValue = $_c_efetiva_teu[0].innerText;
    var $_c_efetiva_tonAttrValue = $_c_efetiva_ton[0].innerText;

    // Get Modal Attributes
    var $_getModalNameInput = getModal.find('#vessel-name');
    var $_getModalPOLInput = getModal.find('#pol-name');
    var $_getModalPODInput = getModal.find('#pod-name');
    var $_getModal_c_efetiva_teuInput = getModal.find('#c-efetiva-teu');
    var $_getModal_c_efetiva_tonInput = getModal.find('#c-efetiva-ton');

    // Set Modal Field's Value
    var $_setModalVesselValue = $_getModalNameInput.val($_vessel_nameAttrValue);
    var $_setModalPOLValue = $_getModalPOLInput.val($_polAttrValue);
    var $_setModalPODValue = $_getModalPODInput.val($_podAttrValue);
    var $_setModal_c_efetiva_teuValue = $_getModal_c_efetiva_teuInput.val($_c_efetiva_teuAttrValue);
    var $_setModal_c_efetiva_tonValue = $_getModal_c_efetiva_tonInput.val($_c_efetiva_tonAttrValue);

    $('#addContactModal').modal('show');
    //botao para submitar a edicao
    $("#btn-edit").off('click').click(function(){

      var getParent = $(this).parents('.modal-content');
      var $_getValidationField = document.getElementsByClassName('validation-text');

     

      
      var $_getInputModalvessel_name = getParent.find('#vessel-name');
      var $_getInputModalPOL = getParent.find('#pol-name');
      var $_getInputModalPOD = getParent.find('#pod-name');
      var $_getInputModal_c_efetiva_teu = getParent.find('#c-efetiva-teu');
      var $_getInputModal_c_efetiva_ton = getParent.find('#c-efetiva-ton');


      var $_vessel_nameValue = $_getInputModalvessel_name.val();
      var $_polValue = $_getInputModalPOL.val();
      var $_podValue = $_getInputModalPOD.val();
      var $_c_efetiva_teuValue = $_getInputModal_c_efetiva_teu.val();
      var $_c_efetiva_tonValue = $_getInputModal_c_efetiva_ton.val();

      //loop para checar se o input que esta sendo editado é repetido, excluindo, obviamente, a propria combinacao do input
      var myLength = list_vessels.length;
      var arrayTrueInput = []

      for (var i = 0; i < myLength; ++i) {
          if ((list_vessels[i]==$_vessel_nameValue.toUpperCase())&&(list_pols[i].toUpperCase()==$_polValue.toUpperCase())&&(list_pods[i].toUpperCase()==$_podValue.toUpperCase())){
              arrayTrueInput.push(true)
              var indexRepeat = i
              
          } 
      }
      if (arrayTrueInput.length>0) {
        if (indexRepeat!=indexEdition){
          const eraseScript = `O Vessel ${$_vessel_nameValue.toUpperCase()}, POL ${$_polValue} e POD ${$_podValue} já possui um input aplicado!`
          $_getValidationField[4].innerHTML = eraseScript;
          $_getValidationField[4].style.display = 'block';
          return false;

        }
          
      }


      var  setUpdatedVesselNameValue = $_vessel_name.text($_vessel_nameValue);
      var  setUpdatedPOLValue = $_pol.text($_polValue);
      var  setUpdatedPODValue = $_pod.text($_podValue);
      var  setUpdatedCEfetivaTEUValue = $_c_efetiva_teu.text($_c_efetiva_teuValue);
      var  setUpdatedCEfetivaTONValue = $_c_efetiva_ton.text($_c_efetiva_tonValue);

     
      

      list_vessels[indexEdition] = $_vessel_nameValue.toUpperCase();
      list_pols[indexEdition] = $_polValue;
      list_pods[indexEdition] = $_podValue;

      const csrftoken = getCookie('csrftoken');
      document.getElementById('loading-card').style.display = 'block'
    
      var dataArrayInsert = [$_vessel_nameValue,$_polValue,$_podValue,$_c_efetiva_teuValue,$_c_efetiva_tonValue,indexEdition].join('-');
      
      //fetch para fazer o post da pagina na hora de editar
      fetch('/General/vessel_management/', {
        method: 'POST',
        body: ['edicao', dataArrayInsert],
        headers: { "X-CSRFToken": csrftoken }
      }).then(function(response) {
        document.getElementById('loading-card').style.display = 'none'
        console.log(response)
      }).catch(function(error) {
        console.log('Error :', error);
    });
      $('#addContactModal').modal('hide');
    });
  })
}
//funcao para fazer a delecao multipla de inputs presentes na tabela
$(".delete-multiple").on("click", function() {
    var inboxCheckboxParents = $(".contact-chkbox:checked").parents('.items');  
    var inboxCheckboxAll = $(".contact-chkbox");
    var arrayExcludeIndex = []
    for (var i = 0; i < inboxCheckboxAll.length; i++) {
      if (inboxCheckboxAll[i].checked){
        arrayExcludeIndex.push(i)

      }
    }
    
    if (arrayExcludeIndex.length>0){

      for (let i = arrayExcludeIndex.length - 1; i >= 0; i--) {
        list_vessels.splice(arrayExcludeIndex[i], 1);
        list_pols.splice(arrayExcludeIndex[i], 1);
      }
    arrayExcludeIndex = arrayExcludeIndex.join('-')
    
    
  
      const csrftoken = getCookie('csrftoken');
      document.getElementById('loading-card').style.display = 'block'
      
      //post passando como body o verbo de acao e a lista de indices a serem removidos do df no backend
      fetch('/General/vessel_management/', {
        method: 'POST',
        body: ['apagamento',arrayExcludeIndex],
        headers: { "X-CSRFToken": csrftoken }
      }).then(function(response) {
        document.getElementById('loading-card').style.display = 'none'
        console.log(response)
        inboxCheckboxParents.remove();
      }).catch(function(error) {
        console.log('Error :', error);
    });
  }


});

deleteContact();
addContact();
editContact();

})



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


$(".contact-chkbox").change(function() {
  $(this).parents('.item-content').toggleClass("selected", this.checked);
});


$("#contact-check-all").change(function() {
  $(".contact-chkbox").each(function() {
    if (this.checked) {
      $(this).parents('.item-content').addClass("selected");
    } else {
      $(this).parents('.item-content').removeClass("selected");

    }
  });

})

