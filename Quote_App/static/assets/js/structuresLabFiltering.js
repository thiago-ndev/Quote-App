// Get all the dropdown buttons by their IDs
const dropdownButtons = document.querySelectorAll('[id^="btndefault"]');

// Iterate over each dropdown button
dropdownButtons.forEach((button) => {
  // Get the associated dropdown menu
  const dropdownMenu = button.nextElementSibling;

  // Get all the dropdown items within the menu
  const dropdownItems = dropdownMenu.querySelectorAll('.dropdown-item');

  // Store the initial value and SVG icon of the button
  const initialText = button.getAttribute('data-initial-value');
  const svgIcon = button.querySelector('svg').outerHTML;

  // Update the button's text with the initial value and SVG icon
  button.innerHTML = initialText + ' ' + svgIcon;

  // Add click event listeners to each dropdown item
  dropdownItems.forEach((item) => {
    item.addEventListener('click', () => {
      // Get the text content of the clicked item
      const selectedValue = item.textContent.trim();

      // Update the button's text with the selected value and SVG icon
      button.innerHTML = selectedValue;

      // If "None" is selected, set the button back to its initial value and SVG icon
      if (selectedValue === 'None') {
        button.innerHTML = initialText + ' ' + svgIcon;
      }
    });
  });
});



// Get references to the dropdown button and menu
