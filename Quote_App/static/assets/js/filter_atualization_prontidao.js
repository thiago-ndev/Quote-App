$( document ).ready(function() {

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
        var alternativeArray=[arrayPodAtualization[1],arrayPodAtualization[2],'...']
        document.querySelector('#area_labeled_pod').lastChild.textContent=alternativeArray.join(',')
    }

    // Voyage Selection
    
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
$('#data_week').on('click', function (e) { 
    var week_atualization = document.querySelectorAll('input[name="week"]')
    
    var myLength = week_atualization.length;
    var arrayweekAtualization = []

    for (var i = 0; i < myLength; ++i) {
        if (week_atualization[i].checked){
            arrayweekAtualization.push(week_atualization[i].value)
        }  
    }
    
    
    if ( arrayweekAtualization.length==0){
        document.querySelector('#area_labeled_week').lastChild.textContent="Week"

    }
    else if((document.querySelector('#area_labeled_week').lastChild.textContent!==arrayweekAtualization.join(',')) && (arrayweekAtualization.length==1)){

    document.querySelector('#area_labeled_week').lastChild.textContent=arrayweekAtualization.join(',')
    }
    else{
    var alternativeArrayweek = [arrayweekAtualization[0]]
    var textAlternancyweek = alternativeArrayweek.join(',')
    var textAlternancyweek = textAlternancyweek.concat('...')
    document.querySelector('#area_labeled_week').lastChild.textContent=textAlternancyweek
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


$('#unselect_all_input').on('click', function (e) { 
    window.location.reload();
});