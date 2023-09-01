const checkboxes = document.querySelectorAll('input[type="checkbox"][name="pol"]');
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', (event) => {
    if (event.target.checked) {
        console.log(event.target)
        document.querySelector('#area_labeled_pol').lastChild.textContent=event.target.value
        checkboxes.forEach((otherCheckbox) => {
        if (otherCheckbox !== checkbox) {
            otherCheckbox.checked = false;
        }
        });



    } else {

        document.querySelector('#area_labeled_pol').lastChild.textContent='POL'
    }


    });
});


const checkboxes_voyage = document.querySelectorAll('input[type="checkbox"][name="voyage"]');
checkboxes_voyage.forEach((checkbox) => {
    checkbox.addEventListener('change', (event) => {
    if (event.target.checked) {
        console.log(event.target)
        document.querySelector('#area_labeled_voyage').lastChild.textContent=event.target.value
        checkboxes_voyage.forEach((otherCheckbox) => {
        if (otherCheckbox !== checkbox) {
            otherCheckbox.checked = false;
        }
        });



    } else {

        document.querySelector('#area_labeled_voyage').lastChild.textContent='Voyage'
    }


    });
});


