/* This file will display any json array as an HTML table.
You need to tell it where, which is done in the last line
of functin createTable().  The id='showHere' can be bound
to a <div id=showHere></div> and then styled and positioned 
however you want. 

Here is an example style
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
*/

function createTable(data) {
  const table = document.createElement('table');
  const tableHead = document.createElement('thead');
  const tableBody = document.createElement('tbody');

  // Append the table head and body to table
  table.appendChild(tableHead);
  table.appendChild(tableBody);

  // Creating table head
  let row = tableHead.insertRow();
  Object.keys(data[0]).forEach(key => {
    let th = document.createElement('th');
    th.textContent = key.toUpperCase();
    row.appendChild(th);
  });

  // Creating table body
  data.forEach(item => {
    let row = tableBody.insertRow();
    Object.values(item).forEach(value => {
      let cell = row.insertCell();
      cell.textContent = value;
    });
  });
  // Append the table to the HTML document
  document.getElementById('showHere').appendChild(table);
}


function displayHTML_Table(tablename) {
  fetch(tablename)                                  //the filename
    .then(response => response.json())
    .then(data => {
      // Call function to display table
      //createTable(data.employees);
      createTable(data.jsonff);                    //the arrayname
    })
    .catch(error => console.error('Error:', error));
}