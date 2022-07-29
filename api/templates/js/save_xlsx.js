function getDataFromTable(tableId){
    var myTab = document.getElementById(tableId);
    var tableData = [];
    var rowData = [];
    // LOOP THROUGH EACH ROW OF THE TABLE AFTER HEADER.
    for (i = 0; i < myTab.rows.length; i++) {
        rowData=[];
        // GET THE CELLS COLLECTION OF THE CURRENT ROW.
        var objCells = myTab.rows.item(i).cells;

        // LOOP THROUGH EACH CELL OF THE CURENT ROW TO READ CELL VALUES.
        for (var j = 0; j < objCells.length; j++) {
            rowData.push(objCells.item(j).innerHTML);
            }

        tableData.push(rowData);
    }
    return tableData
}

function downloadFiles(tableId, file_name, file_type) {
    var data = getDataFromTable(tableId);
    var workbook = XLSX.utils.book_new(),
    worksheet = XLSX.utils.aoa_to_sheet(data);
    workbook.SheetNames.push("First");
    workbook.Sheets["First"] = worksheet;
    var xlsbin = XLSX.write(workbook, {
          bookType: "xlsx",
          type: "binary"
        });

    // (C4) TO BLOB OBJECT
    var buffer = new ArrayBuffer(xlsbin.length),
        array = new Uint8Array(buffer);
    for (var i=0; i<xlsbin.length; i++) {
      array[i] = xlsbin.charCodeAt(i) & 0XFF;
    }

    var file = new Blob([buffer], {type: file_type});
    if (window.navigator.msSaveOrOpenBlob)
        window.navigator.msSaveOrOpenBlob(file, file_name);
    else {
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = file_name;

        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}