const columnsTeu = [4, 6, 8, 10];
const columnsTon = [5, 7, 9, 11];

setTimeout(() => {
    
    document.getElementById('historic_pol_voyage').style.display = 'none'
    document.getElementById('title_historic_pol').innerHTML= 'POL Last 3 Voyages Follow-Up in TONs'
    

}, 800);
          

$('#togBtn').on('change', function (e) {
    e.preventDefault();
    const teusChecked = $('#togBtn')[0].checked;
    setTimeout(() => {
        var dataTable = $('#individual-col-search').DataTable();


    if (teusChecked) {
        
        
        dataTable.columns(columnsTon).visible(false);
        dataTable.columns(columnsTeu).visible(true);
        document.getElementById('historic_pol_voyage').style.display = 'block'
        document.getElementById('historic_pol_voyage_ton').style.display = 'none'
        document.getElementById('title_historic_pol').innerHTML= 'POL Last 3 Voyages Follow-Up in TEUs'

    } else {
        
        dataTable.columns(columnsTon).visible(true);
        dataTable.columns(columnsTeu).visible(false);
        document.getElementById('historic_pol_voyage').style.display = 'none'
        document.getElementById('historic_pol_voyage_ton').style.display = 'block'
        document.getElementById('title_historic_pol').innerHTML= 'POL Last 3 Voyages Follow-Up in TONs'
        

    }

        
    }, 500);
    
}); 