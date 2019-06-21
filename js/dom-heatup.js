function CalculateHeatup(mass, cycleTime, specificHeat, latentHeatOfFusion, source, sink) {
    var heatupLoss = (mass/cycleTime) * (specificHeat * (source-sink) + latentHeatOfFusion)/(3.412);
    if (isNaN(heatupLoss)){
        return 0;
    }else{
        return heatupLoss;
    }
}

$('#heatupModal').on('show.bs.modal', function (event) {
    LoadDataObjects();
    var button = $(event.relatedTarget) // Button that triggered the modal
    var myIndex = button.data('hc-index') // Extract info from data-* attributes
    var modal = $(this)
    //
    modal.find('.modal-title').text('Heat up parameters');
    for (var i = 0; i < heatTransferElements.length; i++) {
        if (heatTransferElements[i].timestamp === myIndex) {
            
            //update title and description fields
            modal.find('.modal-body input.hc-heatup-title').val(heatTransferElements[i].title);
            modal.find('.modal-body textarea.hc-heatup-description').val(heatTransferElements[i].description);
            
            //parse data from data variable in put in appropiate fields
            var mySeparator = String.fromCharCode(30);
            var myStrings = heatTransferElements[i].data.split(mySeparator) 
            modal.find('.modal-body input.hc-heatup-mass').val(myStrings[0]);
            modal.find('.modal-body input.hc-heatup-cycleTime').val(myStrings[1]);
            modal.find('.modal-body input.hc-heatup-specificHeat').val(myStrings[2]);
            modal.find('.modal-body input.hc-heatup-latentHeatOfFusion').val(myStrings[3]);
            modal.find('.modal-body input.hc-heatup-source').val(myStrings[4]);
            modal.find('.modal-body input.hc-heatup-sink').val(myStrings[5]);
            
            //embed timestamp into my-heatup-data-div element for later use
            var mylistHTML = `<div class = "my-heatup-data-div" id = "my-heatup-data-div" data-my-timestamp="`+ myIndex +`"></div>`;
            modal.find('.modal-body div.my-heatup-data-div').html(mylistHTML);
            
            //create dropdown for material selection
            var mylistHTML = `<div class = "row hc-heatup-material-div">`;
            mylistHTML += `<p>Select Material or select None to enter your own specific heat and latent heat of fusion/vaporization</p>`
            mylistHTML += `<p><select class = "select-hc-heatup-material" id="select-hc-heatup-material" onchange="heatupDropDownChanged()"></p>`;
            mylistHTML += `<option value = "-1">None</option>`;
            for ( var j = 0; j < materials.length; j++) {
                mylistHTML += `<option value = "`+j+`">` + materials[j].name + `</option>`;
            }  
            mylistHTML += `</select>`;
            mylistHTML += `</div>`;
            modal.find('.modal-body div.hc-heatup-material').html(mylistHTML); 
            modal.find('.modal-body select.select-hc-heatup-material').val(myStrings[6]);
            break;
        }
    }
})

function heatupDropDownChanged(){
    var myIndex = (document.getElementById('select-hc-heatup-material').value);
    console.log ("User changed material option to " + myIndex + " in heatup modal");
    if (myIndex == -1){
        document.getElementById('hc-heatup-specificHeat').value="";
        document.getElementById('hc-heatup-latentHeatOfFusion').value="";
    } else {
        document.getElementById('hc-heatup-specificHeat').value=materials[myIndex].specificHeat;
        document.getElementById('hc-heatup-latentHeatOfFusion').value=materials[myIndex].latentHeatOfFusion;
    }  
}

function CloseHeatupModal() {
    var myDataDiv = document.getElementById("my-heatup-data-div");
    var myTimestamp = parseInt(myDataDiv.getAttribute("data-my-timestamp"), 10);

    var myTitle = document.getElementById('hc-heatup-title').value;
    var myDescription = document.getElementById('hc-heatup-description').value;
    
    var mass = document.getElementById('hc-heatup-mass').value;
    var cycleTime = document.getElementById('hc-heatup-cycleTime').value;
    var specificHeat = document.getElementById('hc-heatup-specificHeat').value;
    var latentHeatOfFusion = document.getElementById('hc-heatup-latentHeatOfFusion').value;
    var source = document.getElementById('hc-heatup-source').value;
    var sink = document.getElementById('hc-heatup-sink').value;
    var materialSelection = document.getElementById('select-hc-heatup-material').value;

    var myData = mass;
    myData += mySeparator + cycleTime;
    myData += mySeparator + specificHeat;
    myData += mySeparator + latentHeatOfFusion;
    myData += mySeparator + source;
    myData += mySeparator + sink;
    myData += mySeparator + materialSelection;
    
    var myResult = CalculateHeatup(mass, cycleTime, specificHeat, latentHeatOfFusion, source, sink)

    UpdateHeatTransferElement(myTimestamp, new heatTransferElement(myTitle, "", "heatup", myData, myResult, "", myDescription, myTimestamp));

    $('#heatupModal').modal('hide');
}