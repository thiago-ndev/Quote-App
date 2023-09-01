const columnsTeu = [4, 6, 8, 10];
const columnsTon = [5, 7, 9, 11];

setTimeout(() => {
    
    document.getElementById('teu_content_widget').style.display = 'none'
    document.getElementById('voyage_management_title').innerHTML= `Voyage ${list_voyages_active[0]} Follow-Up`
   
    

}, 800);
          

$('#togBtn').on('change', function (e) {
    e.preventDefault();
    const teusChecked = $('#togBtn')[0].checked;
    setTimeout(() => {


    if (teusChecked) {
        
        document.getElementById('teu_content_widget').style.display = 'block'
        document.getElementById('ton_content_widget').style.display = 'none'

    } else {
        
        
        document.getElementById('teu_content_widget').style.display = 'none'
        document.getElementById('ton_content_widget').style.display = 'block'
        

    }

        
    }, 500);
    
}); 