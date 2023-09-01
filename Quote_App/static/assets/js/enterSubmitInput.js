// Get references to the input field and the submit button
const inputFieldStock = document.getElementById("submit_stock");
const submitButtonStock = document.getElementById("submit_button");

// Add an event listener to the input field
inputFieldStock.addEventListener("keyup", function(event) {
    // Check if the Enter key (key code 13) was pressed
    if (event.keyCode === 13) {
        // Trigger a click on the submit button
        submitButtonStock.click();
    }
});