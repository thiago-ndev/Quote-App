function wrapLongNames() {
    var tableCells = document.querySelectorAll("td[name='client-cell']");
    
    for (var i = 0; i < tableCells.length; i++) {
      var cell = tableCells[i];
      if (cell.textContent.length > 15) {
        cell.style.wordWrap = "break-word";
        cell.style.whiteSpace = "normal";
      }
    }
  }
  window.onload = wrapLongNames;