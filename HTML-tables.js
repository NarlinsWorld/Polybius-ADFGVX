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

function createTable1(data) {
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

function createTable(adata, colHeaderArray, ted,newTable='newTable') { 
  //adata is an array, 
  //data is an object, 
  //ted is an object of row headers & key is h
  //newTable is an id. Use it as an html div id as well as css style id
  //if a param is missing at the call, use var _ = undefined;
  // and pass the underscore. Example createTable(anArray,_,_,'putHere')
  //console.log('newTable=',newTable);
  function rowsToObjects(headers, rows){
    return rows.reduce((acc, e, idx) =>  {
       acc.push(headers.reduce((r, h, i)=> {r[h] = e[i]; return r; }, {}))
       return acc;
    }, []);
  }
  let data;
  console.log('colHeaderArray=',colHeaderArray);
  if (colHeaderArray !== undefined){  //when defined, we will create a data object
    data = rowsToObjects(colHeaderArray,adata);
    //console.log('find me=',data)
  } else {data = adata}
  
  if(ted !== undefined){ted = ted.map((item) => { //takes the row header array, ted, and creates the needed object.
    return { h: item };
  });}

  const table = document.createElement('table');
  table.id = newTable;
  const tableHead = document.createElement('thead');
  const tBody = document.createElement('tbody');

  // Append the table head and body to table
  table.appendChild(tableHead);
  table.appendChild(tBody);

  // Creating table head
  let row = tableHead.insertRow();
  if(ted !== undefined){ //if row header array is defined do this
  let th = document.createElement('th');
  row.appendChild(th);
  }
  Object.keys(data[0]).forEach(key => {
    let th = document.createElement('th');
    th.textContent = key.toUpperCase();
    row.appendChild(th);
  });


  if (ted !== undefined) { //if the row header array is defined
    for (let ele = 0; ele < data.length; ele++) {
      
      let row = tBody.insertRow(); //adds <tr></tr> at each iteration 
      row.insertCell(0).outerHTML = "<th>" + ted[ele].h + "</th>";

      let Cello=[];
      for(let j=0; j<data.length; j++){
        Cello[j]=row.insertCell(j+1);      //now we have 2 <td></td> within each <tr></tr> pair
        Cello[j].textContent = adata[ele][j];
      }
    }
  } else {
     //Creating table body if there are no row headers
    adata.forEach(item => {
      let row = tBody.insertRow();
      Object.values(item).forEach(value => {
        let cell = row.insertCell();
        cell.textContent = value;
      });
    });
  }
console.log('newTable=',newTable);
  // Append the table to the HTML document
  document.getElementById(newTable).appendChild(table);
}


function displayHTML_Table(tablename) {
  fetch(tablename)                                  //the filename
    .then(response => response.json())
    .then(data => {
      // Call function to display table
      //createTable(data.employees);
      createTable(data.employees);                    //the arrayname
      console.table(data.employees);
    })
    .catch(error => console.error('Error:', error));
}

//createTable(adata,colHeaderArray,ted); //adata is some array for the table data.
// colHeaderArray [optional] is an array of column headers that we might want 
// ted [optional] is an array of row headers.

//displayHTML_Table("data.json");

//This function will make an array (supplied as rows) into an object
// and each column will have the key from headers
// var headers = ['A','D','F','G','X'];
// function rowsToObjects(headers, rows){
//   return rows.reduce((acc, e, idx) =>  {
//      acc.push(headers.reduce((r, h, i)=> {r[h] = e[i]; return r; }, {}))
//      return acc;
//   }, []);
// }