function CalculateConvection(length, area, source, sink, averageAirVelocity) {
    var HFactor = 0.675 * Math.pow(averageAirVelocity/length, 0.5)
    var convectionLoss = HFactor * area * (source-sink)/3.412;
    if (isNaN(convectionLoss)){
        return 0;
    }else{
        return convectionLoss;
    }
}

$('#convectionModal').on('show.bs.modal', function (event) {
    LoadDataObjects();
    var button = $(event.relatedTarget) // Button that triggered the modal
    var myIndex = button.data('hc-index') // Extract info from data-* attributes
    var modal = $(this)
    //
    modal.find('.modal-title').text('Convection parameters');
    for (var i = 0; i < heatTransferElements.length; i++) {
        if (heatTransferElements[i].timestamp === myIndex) {
            
            //update title and description fields
            modal.find('.modal-body input.hc-convection-title').val(heatTransferElements[i].title);
            modal.find('.modal-body textarea.hc-convection-description').val(heatTransferElements[i].description);
            
            //parse data from data variable in put in appropiate fields
            var mySeparator = String.fromCharCode(30);
            var myStrings = heatTransferElements[i].data.split(mySeparator) 
            modal.find('.modal-body input.hc-convection-length').val(myStrings[0]);
            modal.find('.modal-body input.hc-convection-area').val(myStrings[1]);
            modal.find('.modal-body input.hc-convection-source').val(myStrings[2]);
            modal.find('.modal-body input.hc-convection-sink').val(myStrings[3]);
            modal.find('.modal-body input.hc-convection-averageAirVelocity').val(myStrings[4]);
            
            //embed timestamp into my-convection-data-div element for later use
            var mylistHTML = `<div class = "my-convection-data-div" id = "my-convection-data-div" data-my-timestamp="`+ myIndex +`"></div>`;
            modal.find('.modal-body div.my-convection-data-div').html(mylistHTML);
            
            break;
        }
    }
})

function CloseConvectionModal() {
    var myDataDiv = document.getElementById("my-convection-data-div");
    var myTimestamp = parseInt(myDataDiv.getAttribute("data-my-timestamp"), 10);

    var myTitle = document.getElementById('hc-convection-title').value;
    var myDescription = document.getElementById('hc-convection-description').value;
    
    var length = document.getElementById('hc-convection-length').value;
    var area = document.getElementById('hc-convection-area').value;
    var source = document.getElementById('hc-convection-source').value;
    var sink = document.getElementById('hc-convection-sink').value;
    var averageAirVelocity = document.getElementById('hc-convection-averageAirVelocity').value;

    var myData = length;
    myData += mySeparator + area;
    myData += mySeparator + source;
    myData += mySeparator + sink;
    myData += mySeparator + averageAirVelocity;
    
    var myResult = CalculateConvection(length, area, source, sink, averageAirVelocity)

    UpdateHeatTransferElement(myTimestamp, new heatTransferElement(myTitle, "", "convection", myData, myResult, "", myDescription, myTimestamp));

    $('#convectionModal').modal('hide');
}