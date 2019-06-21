function CalculateProcessload(mass, cycleTime, specificHeat, latentHeatOfFusion, source, sink) {
    var processloadLoss = (mass/cycleTime) * (specificHeat * (source-sink) + latentHeatOfFusion)/(3.412);
    if (isNaN(processloadLoss)){
        return 0;
    }else{
        return processloadLoss;
    }
}

$('#processloadModal').on('show.bs.modal', function (event) {
    LoadDataObjects();
    var button = $(event.relatedTarget) // Button that triggered the modal
    var myIndex = button.data('hc-index') // Extract info from data-* attributes
    var modal = $(this)
    //
    modal.find('.modal-title').text('Process load parameters');
    for (var i = 0; i < heatTransferElements.length; i++) {
        if (heatTransferElements[i].timestamp === myIndex) {
            
            //update title and description fields
            modal.find('.modal-body input.hc-processload-title').val(heatTransferElements[i].title);
            modal.find('.modal-body textarea.hc-processload-description').val(heatTransferElements[i].description);
            
            //parse data from data variable in put in appropiate fields
            var mySeparator = String.fromCharCode(30);
            var myStrings = heatTransferElements[i].data.split(mySeparator) 
            modal.find('.modal-body input.hc-processload-mass').val(myStrings[0]);
            modal.find('.modal-body input.hc-processload-cycleTime').val(myStrings[1]);
            modal.find('.modal-body input.hc-processload-specificHeat').val(myStrings[2]);
            modal.find('.modal-body input.hc-processload-latentHeatOfFusion').val(myStrings[3]);
            modal.find('.modal-body input.hc-processload-source').val(myStrings[4]);
            modal.find('.modal-body input.hc-processload-sink').val(myStrings[5]);
            
            //embed timestamp into my-processload-data-div element for later use
            var mylistHTML = `<div class = "my-processload-data-div" id = "my-processload-data-div" data-my-timestamp="`+ myIndex +`"></div>`;
            modal.find('.modal-body div.my-processload-data-div').html(mylistHTML);
            
            //create dropdown for material selection
            var mylistHTML = `<div class = "row hc-processload-material-div">`;
            mylistHTML += `<p>Select Material or select None to enter your own specific heat and latent heat of fusion/vaporization</p>`
            mylistHTML += `<p><select class = "select-hc-processload-material" id="select-hc-processload-material" onchange="processloadDropDownChanged()"></p>`;
            mylistHTML += `<option value = "-1">None</option>`;
            for ( var j = 0; j < materials.length; j++) {
                mylistHTML += `<option value = "`+j+`">` + materials[j].name + `</option>`;
            }  
            mylistHTML += `</select>`;
            mylistHTML += `</div>`;
            modal.find('.modal-body div.hc-processload-material').html(mylistHTML); 
            modal.find('.modal-body select.select-hc-processload-material').val(myStrings[6]);
            break;
        }
    }
})

function processloadDropDownChanged(){
    var myIndex = (document.getElementById('select-hc-processload-material').value);
    console.log ("User changed material option to " + myIndex + " in processload modal");
    if (myIndex == -1){
        document.getElementById('hc-processload-specificHeat').value="";
        document.getElementById('hc-processload-latentHeatOfFusion').value="";
    } else {
        document.getElementById('hc-processload-specificHeat').value=materials[myIndex].specificHeat;
        document.getElementById('hc-processload-latentHeatOfFusion').value=materials[myIndex].latentHeatOfFusion;
    }  
}

function CloseProcessloadModal() {
    var myDataDiv = document.getElementById("my-processload-data-div");
    var myTimestamp = parseInt(myDataDiv.getAttribute("data-my-timestamp"), 10);

    var myTitle = document.getElementById('hc-processload-title').value;
    var myDescription = document.getElementById('hc-processload-description').value;
    
    var mass = document.getElementById('hc-processload-mass').value;
    var cycleTime = document.getElementById('hc-processload-cycleTime').value;
    var specificHeat = document.getElementById('hc-processload-specificHeat').value;
    var latentHeatOfFusion = document.getElementById('hc-processload-latentHeatOfFusion').value;
    var source = document.getElementById('hc-processload-source').value;
    var sink = document.getElementById('hc-processload-sink').value;
    var materialSelection = document.getElementById('select-hc-processload-material').value;

    var myData = mass;
    myData += mySeparator + cycleTime;
    myData += mySeparator + specificHeat;
    myData += mySeparator + latentHeatOfFusion;
    myData += mySeparator + source;
    myData += mySeparator + sink;
    myData += mySeparator + materialSelection;
    
    var myResult = CalculateProcessload(mass, cycleTime, specificHeat, latentHeatOfFusion, source, sink)

    UpdateHeatTransferElement(myTimestamp, new heatTransferElement(myTitle, "", "processload", myData, myResult, "", myDescription, myTimestamp));

    $('#processloadModal').modal('hide');
}