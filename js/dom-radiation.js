function CalculateRadiation(emissivity, area, source, sink) {
    var sourceRankins = parseFloat(source) + 460;
    var sinkRankins =  parseFloat(sink) + 460;
    var radiationLoss = emissivity * area * (0.1713e-8)*(Math.pow(sourceRankins,4)-Math.pow(sinkRankins,4))/(3.412);
    if (isNaN(radiationLoss)){
        return 0;
    }else{
        return radiationLoss;
    }
}

$('#radiationModal').on('show.bs.modal', function (event) {
    LoadDataObjects();
    var button = $(event.relatedTarget) // Button that triggered the modal
    var myIndex = button.data('hc-index') // Extract info from data-* attributes
    var modal = $(this)
    //
    modal.find('.modal-title').text('Radiation parameters');
    for (var i = 0; i < heatTransferElements.length; i++) {
        if (heatTransferElements[i].timestamp === myIndex) {
            
            //update title and description fields
            modal.find('.modal-body input.hc-radiation-title').val(heatTransferElements[i].title);
            modal.find('.modal-body textarea.hc-radiation-description').val(heatTransferElements[i].description);
            
            //parse data from data variable in put in appropiate fields
            var mySeparator = String.fromCharCode(30);
            var myStrings = heatTransferElements[i].data.split(mySeparator) 
            modal.find('.modal-body input.hc-radiation-area').val(myStrings[0]);
            modal.find('.modal-body input.hc-radiation-source').val(myStrings[1]);
            modal.find('.modal-body input.hc-radiation-sink').val(myStrings[2]);
            modal.find('.modal-body input.hc-radiation-emissivity').val(myStrings[3]);
            
            //embed timestamp into my-radiation-data-div element for later use
            var mylistHTML = `<div class = "my-radiation-data-div" id = "my-radiation-data-div" data-my-timestamp="`+ myIndex +`"></div>`;
            modal.find('.modal-body div.my-radiation-data-div').html(mylistHTML);
            
            //create dropdown for material selection
            var mylistHTML = `<div class = "row hc-radiation-material-div">`;
            mylistHTML += `<p>Select Material or select None to enter your own emissivity</p>`
            mylistHTML += `<p><select class = "select-hc-radiation-material" id="select-hc-radiation-material" onchange="radiationDropDownChanged()"></p>`;
            mylistHTML += `<option value = "-1">None</option>`;
            for ( var j = 0; j < materialsEmissivity.length; j++) {
                mylistHTML += `<option value = "`+j+`">` + materialsEmissivity[j].name + `</option>`;
            }  
            mylistHTML += `</select>`;
            mylistHTML += `</div>`;
            modal.find('.modal-body div.hc-radiation-material').html(mylistHTML); 
            modal.find('.modal-body select.select-hc-radiation-material').val(myStrings[4]);
            break;
        }
    }
})

function radiationDropDownChanged(){
    var myIndex = (document.getElementById('select-hc-radiation-material').value);
    console.log ("User changed material option to " + myIndex + " in radiation modal");
    if (myIndex == -1){
        document.getElementById('hc-radiation-emissivity').value="";
    } else {
        document.getElementById('hc-radiation-emissivity').value=materialsEmissivity[myIndex].emissivity;
    }  
}

function CloseRadiationModal() {
    var myDataDiv = document.getElementById("my-radiation-data-div");
    var myTimestamp = parseInt(myDataDiv.getAttribute("data-my-timestamp"), 10);

    var myTitle = document.getElementById('hc-radiation-title').value;
    var myDescription = document.getElementById('hc-radiation-description').value;
    
    var area = document.getElementById('hc-radiation-area').value;
    var source = document.getElementById('hc-radiation-source').value;
    var sink = document.getElementById('hc-radiation-sink').value;
    var emissivity = document.getElementById('hc-radiation-emissivity').value;
    var materialSelection = document.getElementById('select-hc-radiation-material').value;

    var myData = area;
    myData += mySeparator + source;
    myData += mySeparator + sink;
    myData += mySeparator + emissivity;
    myData += mySeparator + materialSelection;
    
    console.log(myData);

    var myResult = CalculateRadiation(emissivity, area, source, sink)

    UpdateHeatTransferElement(myTimestamp, new heatTransferElement(myTitle, "", "radiation", myData, myResult, "", myDescription, myTimestamp));

    $('#radiationModal').modal('hide');
}