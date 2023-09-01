$( document ).ready(function() {

    if ((templateUsed=='motivos_quedas')||(templateUsed=='bookings')){
    var voyage_atualization = document.querySelectorAll('input[name="voyage"]')
    
    var myLength = voyage_atualization.length;
    var arrayVoyageAtualization = []

    for (var i = 0; i < myLength; ++i) {
        if (voyage_atualization[i].checked){
            arrayVoyageAtualization.push(voyage_atualization[i].value)
        }  
    }
    
    
    if ( arrayVoyageAtualization.length==0){
        document.querySelector('#area_labeled_voyage').lastChild.textContent="Voyage"

    }
    else if((document.querySelector('#area_labeled_voyage').lastChild.textContent!==arrayVoyageAtualization.join(',')) && (arrayVoyageAtualization.length==1)){

    document.querySelector('#area_labeled_voyage').lastChild.textContent=arrayVoyageAtualization.join(',')
    }
    else{
    var alternativeArrayVoyage = [arrayVoyageAtualization[0]]
    var textAlternancyVoyage = alternativeArrayVoyage.join(',')
    var textAlternancyVoyage = textAlternancyVoyage.concat('...')
    document.querySelector('#area_labeled_voyage').lastChild.textContent=textAlternancyVoyage
    }
    }
   
    if ((templateUsed=='score_analysis')||(templateUsed=='painel_pol')){
       
        var shipper_atualization = document.querySelectorAll('input[name="shipper"]')
    
        var myLength = shipper_atualization.length;
        var arrayShipperAtualization = []

        for (var i = 0; i < myLength; ++i) {
            if (shipper_atualization[i].checked){
                arrayShipperAtualization.push(shipper_atualization[i].value)
            }  
        }
        
        
        if ( arrayShipperAtualization.length==0){
            document.querySelector('#area_labeled_shipper').lastChild.textContent="Cliente"
            // document.getElementById('clean_filter_shipper').style.display = 'none'

        }
        else if((document.querySelector('#area_labeled_shipper').lastChild.textContent!==arrayShipperAtualization.join(',')) && (arrayShipperAtualization.length==1)){
            
            if (arrayShipperAtualization[0].length>25){
                arrayShipperAtualization[0] = arrayShipperAtualization[0].substring(0,25) +'...'
            }
        document.querySelector('#area_labeled_shipper').lastChild.textContent=arrayShipperAtualization.join(',')

        // document.getElementById('clean_filter_shipper').style.display = 'block'
        }
        else{
        var alternativeArrayShipper = [arrayShipperAtualization[0]]
        if (alternativeArrayShipper[0].length>25){
            alternativeArrayShipper[0] = alternativeArrayShipper[0].substring(0,25) +'...'
        }
        var textAlternancyShipper = alternativeArrayShipper.join(',')
        var textAlternancyShipper = textAlternancyShipper.concat('...')
        
        document.querySelector('#area_labeled_shipper').lastChild.textContent=textAlternancyShipper
    }


        var sentido_atualization = document.querySelectorAll('input[name="sentido"]')
    
        var myLength = sentido_atualization.length;
        var arraySentidoAtualization = []
    
        for (var i = 0; i < myLength; ++i) {
            if (sentido_atualization[i].checked){
                arraySentidoAtualization.push(sentido_atualization[i].value)
            }  
        }
        
        if ( arraySentidoAtualization.length==0){
            document.querySelector('#area_labeled_sentido').lastChild.textContent="Sentido"
    
        }
        else if((document.querySelector('#area_labeled_sentido').lastChild.textContent!==arraySentidoAtualization.join(',')) && (arraySentidoAtualization.length==1)){
    
        document.querySelector('#area_labeled_sentido').lastChild.textContent=arraySentidoAtualization.join(',')
        }
        else{
        var alternativeArraySentido = [arraySentidoAtualization[0]]
        var textAlternancySentido = alternativeArraySentido.join(',')
        var textAlternancySentido = textAlternancySentido.concat('...')
        document.querySelector('#area_labeled_sentido').lastChild.textContent=textAlternancySentido
        }


        var type_atualization = document.querySelectorAll('input[name="type"]')
    
        var myLength = type_atualization.length;
        var arraytypeAtualization = []
    
        for (var i = 0; i < myLength; ++i) {
            if (type_atualization[i].checked){
                arraytypeAtualization.push(type_atualization[i].value)
            }  
        }
        
        if ( arraytypeAtualization.length==0){
            document.querySelector('#area_labeled_trade').lastChild.textContent="Trade"
    
        }
        else if((document.querySelector('#area_labeled_trade').lastChild.textContent!==arraytypeAtualization.join(',')) && (arraytypeAtualization.length==1)){
    
        document.querySelector('#area_labeled_trade').lastChild.textContent=arraytypeAtualization.join(',')
        }
        else{
        var alternativeArrayType = [arraytypeAtualization[0]]
        var textAlternancytype = alternativeArrayType.join(',')
        var textAlternancytype = textAlternancytype.concat('...')
        document.querySelector('#area_labeled_trade').lastChild.textContent=textAlternancytype
        }



    }
    if (templateUsed=='booking_evolution'){

            // POD Selection
            var pod_atualization = document.querySelectorAll('input[name="pod"]')
                
                
            var myLength = pod_atualization.length;
            var arrayPodAtualization = []

            for (var i = 0; i < myLength; ++i) {
                if (pod_atualization[i].checked){
                    arrayPodAtualization.push(pod_atualization[i].value)
                }  
            }

            if ( arrayPodAtualization.length==0){
                document.querySelector('#area_labeled_pod').lastChild.textContent="POD"

            }
            else if((document.querySelector('#area_labeled_pod').lastChild.textContent!==arrayPodAtualization.join(',')) && (arrayPodAtualization.length<=2)){

                document.querySelector('#area_labeled_pod').lastChild.textContent=arrayPodAtualization.join(',')
            }
            else{
                var alternativeArray=[arrayPodAtualization[1],arrayPodAtualization[2]]
                document.querySelector('#area_labeled_pod').lastChild.textContent=alternativeArray.join(',')
            }

            var voyage_atualization = document.querySelectorAll('input[name="voyage"]')
    
    var myLength = voyage_atualization.length;
    var arrayVoyageAtualization = []

    for (var i = 0; i < myLength; ++i) {
        if (voyage_atualization[i].checked){
            arrayVoyageAtualization.push(voyage_atualization[i].value)
        }  
    }
    
    
    if ( arrayVoyageAtualization.length==0){
        document.querySelector('#area_labeled_voyage').lastChild.textContent="Voyage"

    }
    else if((document.querySelector('#area_labeled_voyage').lastChild.textContent!==arrayVoyageAtualization.join(',')) && (arrayVoyageAtualization.length==1)){

    document.querySelector('#area_labeled_voyage').lastChild.textContent=arrayVoyageAtualization.join(',')
    }
    else{
    var alternativeArrayVoyage = [arrayVoyageAtualization[0]]
    var textAlternancyVoyage = alternativeArrayVoyage.join(',')
    var textAlternancyVoyage = textAlternancyVoyage.concat('...')
    document.querySelector('#area_labeled_voyage').lastChild.textContent=textAlternancyVoyage
    }



        // POL Selection
    var pol_atualization = document.querySelectorAll('input[name="pol"]')
    var myLength = pol_atualization.length;
    var arrayPolAtualization = []
    for (var i = 0; i < myLength; ++i) {
        if (pol_atualization[i].checked){
            arrayPolAtualization.push(pol_atualization[i].value)
        }
    }

    
    if ( arrayPolAtualization.length==0){
        document.querySelector('#area_labeled_pol').lastChild.textContent="POL"
        
    }
    else if(document.querySelector('#area_labeled_pol').lastChild.textContent!==arrayPolAtualization.join(',') && (arrayPolAtualization.length==1)){

        document.querySelector('#area_labeled_pol').lastChild.textContent=arrayPolAtualization.join(',')
        

    }
    else {
    var alternativeArrayPol = [arrayPolAtualization[0]]
    var textAlternancyPol = alternativeArrayPol.join(',')
    document.querySelector('#area_labeled_pol').lastChild.textContent=textAlternancyPol
    

    }
    }
    if (templateUsed=='controle_embarque'){
        var myLength = voyage_atualization.length;
        var arrayVoyageAtualization = []
    
        for (var i = 0; i < myLength; ++i) {
            if (voyage_atualization[i].checked){
                arrayVoyageAtualization.push(voyage_atualization[i].value)
            }  
        }
        
        
        if ( arrayVoyageAtualization.length==0){
            document.querySelector('#area_labeled_voyage').lastChild.textContent="Voyage"
    
        }
        else if((document.querySelector('#area_labeled_voyage').lastChild.textContent!==arrayVoyageAtualization.join(',')) && (arrayVoyageAtualization.length==1)){
    
        document.querySelector('#area_labeled_voyage').lastChild.textContent=arrayVoyageAtualization.join(',')
        }
        else{
        var alternativeArrayVoyage = [arrayVoyageAtualization[0]]
        var textAlternancyVoyage = alternativeArrayVoyage.join(',')
        var textAlternancyVoyage = textAlternancyVoyage.concat('...')
        document.querySelector('#area_labeled_voyage').lastChild.textContent=textAlternancyVoyage
        }
    


        // POL Selection
    var pol_atualization = document.querySelectorAll('input[name="pol"]')
    var myLength = pol_atualization.length;
    var arrayPolAtualization = []
    for (var i = 0; i < myLength; ++i) {
        if (pol_atualization[i].checked){
            arrayPolAtualization.push(pol_atualization[i].value)
        }
    }

    
    if ( arrayPolAtualization.length==0){
        document.querySelector('#area_labeled_pol').lastChild.textContent="POL"
        
    }
    else if(document.querySelector('#area_labeled_pol').lastChild.textContent!==arrayPolAtualization.join(',') && (arrayPolAtualization.length==1)){

        document.querySelector('#area_labeled_pol').lastChild.textContent=arrayPolAtualization.join(',')
        

    }
    else {
    var alternativeArrayPol = [arrayPolAtualization[0]]
    var textAlternancyPol = alternativeArrayPol.join(',')
    var textAlternancyPol = textAlternancyPol.concat('...')
    document.querySelector('#area_labeled_pol').lastChild.textContent=textAlternancyPol
    

    }

    var service_atualization = document.querySelectorAll('input[name="service"]')
    
    var myLength = service_atualization.length;
    var arrayServiceAtualization = []
    for (var i = 0; i < myLength; ++i) {
        if (service_atualization[i].checked){
            arrayServiceAtualization.push(service_atualization[i].value)
        }
    }

    
    if ( arrayServiceAtualization.length==0){
        document.querySelector('#area_labeled_service').lastChild.textContent="Service"

    }
    else if((document.querySelector('#area_labeled_service').lastChild.textContent!==arrayServiceAtualization.join(',')) && (arrayServiceAtualization.length==1)){

    document.querySelector('#area_labeled_service').lastChild.textContent=arrayServiceAtualization.join(',')
    }
    else{
    var alternativeArrayService = [arrayServiceAtualization[0]]
    var textAlternancyService = alternativeArrayService.join(',')
    var textAlternancyService = textAlternancyService.concat('...')
    document.querySelector('#area_labeled_service').lastChild.textContent=textAlternancyService
    }


    }
    
});
$('#data_pod').on('click', function (e) { 
    var pod_atualization = document.querySelectorAll('input[name="pod"]')
    
    var myLength = pod_atualization.length;
    var arrayPodAtualization = []

    for (var i = 0; i < myLength; ++i) {
        if (pod_atualization[i].checked){
            arrayPodAtualization.push(pod_atualization[i].value)
        }  
    }
    
    
    if ( arrayPodAtualization.length==0){
        document.querySelector('#area_labeled_pod').lastChild.textContent="POD"

    }
    else if((document.querySelector('#area_labeled_pod').lastChild.textContent!==arrayPodAtualization.join(',')) && (arrayPodAtualization.length==1)){

    document.querySelector('#area_labeled_pod').lastChild.textContent=arrayPodAtualization.join(',')
    }
    else{
    var alternativeArray=[arrayPodAtualization[0]]
    var textAlternancy = alternativeArray.join(',')
    var textAlternancy = textAlternancy.concat('...')
    document.querySelector('#area_labeled_pod').lastChild.textContent=textAlternancy
    }
});

$('#data_shipper').on('click', function (e) { 
    var shipper_atualization = document.querySelectorAll('input[name="shipper"]')
    
    var myLength = shipper_atualization.length;
    var arrayShipperAtualization = []

    for (var i = 0; i < myLength; ++i) {
        if (shipper_atualization[i].checked){
            arrayShipperAtualization.push(shipper_atualization[i].value)
        }  
    }
    
    
    if ( arrayShipperAtualization.length==0){
        document.querySelector('#area_labeled_shipper').lastChild.textContent="Cliente"
        // document.getElementById('clean_filter_shipper').style.display = 'none'

    }
    else if((document.querySelector('#area_labeled_shipper').lastChild.textContent!==arrayShipperAtualization.join(',')) && (arrayShipperAtualization.length==1)){
        
        if (arrayShipperAtualization[0].length>25){
            arrayShipperAtualization[0] = arrayShipperAtualization[0].substring(0,25) +'...'
        }
    document.querySelector('#area_labeled_shipper').lastChild.textContent=arrayShipperAtualization.join(',')

    // document.getElementById('clean_filter_shipper').style.display = 'block'
    }
    else{
    var alternativeArrayShipper = [arrayShipperAtualization[0]]
    if (alternativeArrayShipper[0].length>25){
        alternativeArrayShipper[0] = alternativeArrayShipper[0].substring(0,25) +'...'
    }
    var textAlternancyShipper = alternativeArrayShipper.join(',')
    var textAlternancyShipper = textAlternancyShipper.concat('...')
    
    document.querySelector('#area_labeled_shipper').lastChild.textContent=textAlternancyShipper
    // document.getElementById('clean_filter_shipper').style.display = 'block'

    }
});
$('#data_sentido').on('click', function (e) {
var sentido_atualization = document.querySelectorAll('input[name="sentido"]')
    
var myLength = sentido_atualization.length;
var arraySentidoAtualization = []

for (var i = 0; i < myLength; ++i) {
    if (sentido_atualization[i].checked){
        arraySentidoAtualization.push(sentido_atualization[i].value)
    }  
}

if ( arraySentidoAtualization.length==0){
    document.querySelector('#area_labeled_sentido').lastChild.textContent="Sentido"

}
else if((document.querySelector('#area_labeled_sentido').lastChild.textContent!==arraySentidoAtualization.join(',')) && (arraySentidoAtualization.length==1)){

document.querySelector('#area_labeled_sentido').lastChild.textContent=arraySentidoAtualization.join(',')
}
else{
var alternativeArraySentido = [arraySentidoAtualization[0]]
var textAlternancySentido = alternativeArraySentido.join(',')
var textAlternancySentido = textAlternancySentido.concat('...')
document.querySelector('#area_labeled_sentido').lastChild.textContent=textAlternancySentido
}
});
$('#data_trade').on('click', function (e) {
    var type_atualization = document.querySelectorAll('input[name="trade"]')
        
    var myLength = type_atualization.length;
    var arraytypeAtualization = []
    
    for (var i = 0; i < myLength; ++i) {
        if (type_atualization[i].checked){
            arraytypeAtualization.push(type_atualization[i].value)
        }  
    }
    
    if ( arraytypeAtualization.length==0){
        document.querySelector('#area_labeled_trade').lastChild.textContent="Trade"
    
    }
    else if((document.querySelector('#area_labeled_trade').lastChild.textContent!==arraytypeAtualization.join(',')) && (arraytypeAtualization.length==1)){
    
    document.querySelector('#area_labeled_trade').lastChild.textContent=arraytypeAtualization.join(',')
    }
    else{
    var alternativeArrayType = [arraytypeAtualization[0]]
    var textAlternancyType = alternativeArrayType.join(',')
    var textAlternancyType = textAlternancyType.concat('...')
    document.querySelector('#area_labeled_trade').lastChild.textContent=textAlternancyType
    }
});

$('#data_voyage').on('click', function (e) { 
    var voyage_atualization = document.querySelectorAll('input[name="voyage"]')
    
    var myLength = voyage_atualization.length;
    var arrayVoyageAtualization = []

    for (var i = 0; i < myLength; ++i) {
        if (voyage_atualization[i].checked){
            arrayVoyageAtualization.push(voyage_atualization[i].value)
        }  
    }
    
    
    if ( arrayVoyageAtualization.length==0){
        document.querySelector('#area_labeled_voyage').lastChild.textContent="Voyage"

    }
    else if((document.querySelector('#area_labeled_voyage').lastChild.textContent!==arrayVoyageAtualization.join(',')) && (arrayVoyageAtualization.length==1)){

    document.querySelector('#area_labeled_voyage').lastChild.textContent=arrayVoyageAtualization.join(',')
    }
    else{
    var alternativeArrayVoyage = [arrayVoyageAtualization[0]]
    var textAlternancyVoyage = alternativeArrayVoyage.join(',')
    var textAlternancyVoyage = textAlternancyVoyage.concat('...')
    document.querySelector('#area_labeled_voyage').lastChild.textContent=textAlternancyVoyage
    }
});

$('#data_pol').on('click', function (e) { 
    var pol_atualization = document.querySelectorAll('input[name="pol"]')
    
    var myLength = pol_atualization.length;
    var arrayPolAtualization = []
    for (var i = 0; i < myLength; ++i) {
        if (pol_atualization[i].checked){
            arrayPolAtualization.push(pol_atualization[i].value)
        }
    }

    
    if ( arrayPolAtualization.length==0){
        document.querySelector('#area_labeled_pol').lastChild.textContent="POL"

    }
    else if((document.querySelector('#area_labeled_pol').lastChild.textContent!==arrayPolAtualization.join(',')) && (arrayPolAtualization.length==1)){

    document.querySelector('#area_labeled_pol').lastChild.textContent=arrayPolAtualization.join(',')
    }
    else{
    var alternativeArrayPol = [arrayPolAtualization[0]]
    var textAlternancyPol = alternativeArrayPol.join(',')
    var textAlternancyPol = textAlternancyPol.concat('...')
    document.querySelector('#area_labeled_pol').lastChild.textContent=textAlternancyPol
    }
});
$('#data_service').on('click', function (e) { 
    var service_atualization = document.querySelectorAll('input[name="service"]')
    
    var myLength = service_atualization.length;
    var arrayServiceAtualization = []
    for (var i = 0; i < myLength; ++i) {
        if (service_atualization[i].checked){
            arrayServiceAtualization.push(service_atualization[i].value)
        }
    }

    
    if ( arrayServiceAtualization.length==0){
        document.querySelector('#area_labeled_service').lastChild.textContent="Service"

    }
    else if((document.querySelector('#area_labeled_service').lastChild.textContent!==arrayServiceAtualization.join(',')) && (arrayServiceAtualization.length==1)){

    document.querySelector('#area_labeled_service').lastChild.textContent=arrayServiceAtualization.join(',')
    }
    else{
    var alternativeArrayService = [arrayServiceAtualization[0]]
    var textAlternancyService = alternativeArrayService.join(',')
    var textAlternancyService = textAlternancyService.concat('...')
    document.querySelector('#area_labeled_service').lastChild.textContent=textAlternancyService
    }
});
$('#data_motivos_quedas').on('click', function (e) { 
    var service_atualization = document.querySelectorAll('input[name="motivos_quedas"]')
    
    var myLength = service_atualization.length;
    var arrayServiceAtualization = []
    for (var i = 0; i < myLength; ++i) {
        if (service_atualization[i].checked){
            arrayServiceAtualization.push(service_atualization[i].value)
        }
    }

    
    if ( arrayServiceAtualization.length==0){
        document.querySelector('#m_quedas').lastChild.textContent="M. Quedas"

    }
    else if((document.querySelector('#m_quedas').lastChild.textContent!==arrayServiceAtualization.join(',')) && (arrayServiceAtualization.length==1)){

    document.querySelector('#m_quedas').lastChild.textContent=arrayServiceAtualization.join(',')
    }
    else{
    var alternativeArrayService = [arrayServiceAtualization[0]]
    var textAlternancyService = alternativeArrayService.join(',')
    var textAlternancyService = textAlternancyService.concat('...')
    document.querySelector('#m_quedas').lastChild.textContent=textAlternancyService
    }
});

$('#unselect_all_input').on('click', function (e) { 
    window.location.reload();
});