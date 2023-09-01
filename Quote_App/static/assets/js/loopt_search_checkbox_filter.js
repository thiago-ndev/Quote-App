//funcao para localizar as informacoes nos inputs de checkbox do filtro, atraves de um input de texto.
function SearchShipper() {
        var input, filter, ul, li, a, i, txtValue;
        input = document.getElementById("search_input_shipper");
        filter = input.value.toUpperCase();
        ul = document.getElementById("data_shipper");
        li = ul.getElementsByTagName("li");
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("input")[0];
            
            txtValue = a.value.toUpperCase();
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
                if (filter==''){
                    document.getElementById('data_shipper').style.display = 'none'
                } else{
                document.getElementById('data_shipper').style.display = 'block'
                }

            } else {
                li[i].style.display = "none";
                
            }
        }
    }
    //funcao colocado na pagina ao carregar para monitorar os cliques do usuario, ao clicar fora do filtro, a caixa de filtro irá fechar.
    window.onload = 
    function(){
    var elementsulShipper = document.getElementsByName('shipper');
    var elementsLabelShipper = document.getElementsByName('label_shipper_checkbox');
    for (var i = 0; i < elementsulShipper.length; ++i) {
    if (elementsulShipper[i].value.length>25){
        // var contentShipper = elementsulShipper[i].value.substring(0,25) +'...'
        var contentNormal = elementsulShipper[i].value;
        
        elementsLabelShipper[i].insertAdjacentText('beforeend', contentNormal);
    } else{
        var contentNormal = elementsulShipper[i].value;
        elementsLabelShipper[i].insertAdjacentText('beforeend', contentNormal);
    }


    }
	var button_input_shipper = document.getElementById('button_input_shipper');
    var area_labeled_shipper = document.getElementById('area_labeled_shipper');
    var data_shipper = document.getElementById('data_shipper');
    var svg_erase_filter = document.getElementById('svg_erase_filter');
    // var clean_filter_shipper = document.getElementById('clean_filter_shipper');
    var general_input = data_shipper.getElementsByTagName('input');
    var general_input = Array.prototype.slice.call( general_input );
    var general_label = data_shipper.getElementsByTagName('label');
    var general_label = Array.prototype.slice.call( general_label )
    
    var search_input_shipper = document.getElementById('search_input_shipper');


    document.onclick = function(e){
        if  (!(e.target === button_input_shipper)&& !(e.target === svg_erase_filter) && !(e.target === area_labeled_shipper) && !(e.target.tagName == 'line' ) && !(e.target.tagName == 'polyline' ) && !(e.target.tagName == 'path' ) && !(e.target === data_shipper) && !(e.target === search_input_shipper) && !(general_input.includes(e.target)) && !(general_label.includes(e.target))) {
            document.getElementById('data_shipper').style.display = 'none'
            document.getElementById('search_input_shipper').style.display = 'none'
        } 
        
    };
};
$('#button_input_shipper').on('click', function (e) {
var inputAppear = document.getElementById('search_input_shipper').style.display
if (inputAppear=='none'){
    document.getElementById('search_input_shipper').style.display = 'block'
}


});
