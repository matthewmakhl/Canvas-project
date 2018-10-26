var valuedetect = document.getElementById("valuebox").value; // declare the global variable for the value in #valuebox

$("#valuebox").on('keyup', function (e) {  // keyup function for detecting the keyboard releasing
    valuedetect = document.getElementById("valuebox").value; // Able to change the input value for every keyup
    if (e.keyCode == 13) { // 13 is the keyboard code for buttom "enter" 
        if(isNaN(valuedetect)){ // preventing the non-number input
            alert('please enter number')
        }else{
            valuedetect = document.getElementById("valuebox").value; // execuate the new value input
        }
    }
});

