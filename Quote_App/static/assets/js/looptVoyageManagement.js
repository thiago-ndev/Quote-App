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

      $('#dropdownMenuButton').text("Comentário");
  
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
      document.getElementById('addContactModalTitleLabel1').innerText = 'Edit Voyage'
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
      var $_c_desejada_teu = getParentItem.find('.usr-c-desejada-teu');
      var $_c_desejada_ton = getParentItem.find('.usr-c-desejada-ton');
      var $_comment = getParentItem.find('.usr-comment');
     
  
      // Get Attributes
      var $_vessel_nameAttrValue = $_vessel_name[0].innerText;
      var $_polAttrValue = $_pol[0].innerText;
      var $_podAttrValue = $_pod[0].innerText;
      var $_c_efetiva_teuAttrValue = $_c_efetiva_teu[0].innerText;
      var $_c_efetiva_tonAttrValue = $_c_efetiva_ton[0].innerText;
      var $_c_desejada_teuAttrValue = $_c_desejada_teu[0].innerText;
      var $_c_desejada_tonAttrValue = $_c_desejada_ton[0].innerText;
      var $_commentAttrValue = $_comment[0].innerText;
  
      // Get Modal Attributes
      var $_getModalNameInput = getModal.find('#vessel-name');
      var $_getModalPOLInput = getModal.find('#pol-name');
      var $_getModalPODInput = getModal.find('#pod-name');
      var $_getModal_c_efetiva_teuInput = getModal.find('#c-efetiva-teu');
      var $_getModal_c_efetiva_tonInput = getModal.find('#c-efetiva-ton');
      var $_getModal_c_desejada_teuInput = getModal.find('#c-desejada-teu');
      var $_getModal_c_desejada_tonInput = getModal.find('#c-desejada-ton');
      var $_getModal_commentInput = getModal.find('#comment');
  
      // Set Modal Field's Value
      var $_setModalVesselValue = $_getModalNameInput.val($_vessel_nameAttrValue);
      var $_setModalPOLValue = $_getModalPOLInput.val($_polAttrValue);
      var $_setModalPODValue = $_getModalPODInput.val($_podAttrValue);
      var $_setModal_c_efetiva_teuValue = $_getModal_c_efetiva_teuInput.val($_c_efetiva_teuAttrValue);
      var $_setModal_c_efetiva_tonValue = $_getModal_c_efetiva_tonInput.val($_c_efetiva_tonAttrValue);
      var $_setModal_c_desejada_teuValue = $_getModal_c_desejada_teuInput.val($_c_desejada_teuAttrValue);
      var $_setModal_c_desejada_tonValue = $_getModal_c_desejada_tonInput.val($_c_desejada_tonAttrValue);
      if ($_commentAttrValue!='-'){
        var $_setModal_commentValue = $('#dropdownMenuButton').text($_commentAttrValue);
      }
  
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
        var $_getInputModal_c_desejada_teu = getParent.find('#c-desejada-teu');
        var $_getInputModal_c_desejada_ton = getParent.find('#c-desejada-ton');
        // var $_getInputModal_comment = getParent.find('#comment');
  
  
        var $_vessel_nameValue = $_getInputModalvessel_name.val();
        var $_polValue = $_getInputModalPOL.val();
        var $_podValue = $_getInputModalPOD.val();
        var $_c_efetiva_teuValue = $_getInputModal_c_efetiva_teu.val();
        var $_c_efetiva_tonValue = $_getInputModal_c_efetiva_ton.val();
        var $_c_desejada_teuValue = $_getInputModal_c_desejada_teu.val();
        var $_c_desejada_tonValue = $_getInputModal_c_desejada_ton.val();
        var $_commentValue = $('#dropdownMenuButton').text();


        if (($_c_desejada_teuValue == "") | ($_c_desejada_teuValue == 0)) {
          $_c_desejada_teuValue = 0
            
          } else {
            $_getValidationField[4].style.display = 'none';
          }
      
          if (($_c_desejada_tonValue == "") | ($_c_desejada_tonValue == 0)) {
            $_c_desejada_tonValue = 0
            
          }  else {
            $_getValidationField[5].style.display = 'none';
          }
      
          if (($_commentValue == "") | ($_commentValue == '-') | ($_commentValue == 'Action')) {
            $_getValidationField[6].innerHTML = 'Insira um Comentário';
            $_getValidationField[6].style.display = 'block';
            return false
          }  else {
            $_getValidationField[6].style.display = 'none';
          }
        
  
  
        var  setUpdatedVesselNameValue = $_vessel_name.text($_vessel_nameValue);
        var  setUpdatedPOLValue = $_pol.text($_polValue);
        var  setUpdatedPODValue = $_pod.text($_podValue);
        var  setUpdatedCEfetivaTEUValue = $_c_efetiva_teu.text($_c_efetiva_teuValue);
        var  setUpdatedCEfetivaTONValue = $_c_efetiva_ton.text($_c_efetiva_tonValue);
        var  setUpdatedCdesejadaTEUValue = $_c_desejada_teu.text($_c_desejada_teuValue);
        var  setUpdatedCdesejadaTONValue = $_c_desejada_ton.text($_c_desejada_tonValue);
        var  setUpdatedCommentValue = $_comment.text($_commentValue);
  
       
        var dataArrayInsert = [$_vessel_nameValue, $_polValue, $_podValue, $_c_desejada_teuValue, $_c_desejada_tonValue, $_commentValue, indexEdition].join('|');
  
  
        const csrftoken = getCookie('csrftoken');
        document.getElementById('loading-card').style.display = 'block'
      
        
        //fetch para fazer o post da pagina na hora de editar
        fetch('/General/voyage_management/', {
          method: 'POST',
          body: ['insercao', dataArrayInsert],
          headers: { "X-CSRFToken": csrftoken }
        }).then(function(response) {
          document.getElementById('loading-card').style.display = 'none'
          console.log(response)
          $('#addContactModal').modal('hide');
        }).catch(function(error) {
          console.log('Error :', error);
      });
        
      });
    })
  }
  
  
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
  $('.dropdown-item').click(function() {
    var selectedOption = $(this).text();
    $('#dropdownMenuButton').text(selectedOption);
  });