const { toParam } = require("./toParam");

module.exports = {
    csvToJson: ({ id, e, options }) => {
        
        var reader = new FileReader();
        reader.onload = function () {
            var result = []
            
            // xlsx
            if (e.target.files[0].name.includes(".xlsx")) {

                let data = reader.result
                let workbook = XLSX.read(data,{type:"binary"})
                
                workbook.SheetNames.forEach(sheet => {
                    result = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                    console.log(result);
                })

            } else if (e.target.files[0].name.includes(".csv")) {

                // csv
                var lines = reader.result.split("\n")
                var headers=lines[0].split(",").map(header => header.replace(/\r?\n|\r/g, ""))
                console.log(headers);
                
                for(var i=1; i<lines.length; i++) {

                    var obj = {}
                    var currentline=lines[i].split(",")

                    for(var j=0; j < headers.length; j++){
                        if (currentline[j] !== undefined) obj[headers[j]] = currentline[j].toString().replace(/\r?\n|\r/g, "")
                    }

                    result.push(obj)
                }
            }

            /* Convert the final array to JSON */
            console.log(result)
            window.views[id].file = { data: result, message: "Data converted successfully!" }
            toParam({ id, e, string: options.loaded, mount: true })
        };

        // start reading the file. When it is done, calls the onload event defined above.
        reader.readAsBinaryString(e.target.files[0]);
    }
}