function validateForm(path_to_img)
{
    var phone_number = document.getElementById("phone_number"),
     identify_number = document.getElementById("identify_number"),
     abs_number = document.getElementById("abs_number");

    var bool_result = ((phone_number.value == null || phone_number.value == "") &&
                        (identify_number.value == "" || identify_number.value == null) &&
                        (abs_number.value == "" || abs_number.value == null));

    if (bool_result){
        phone_number.style.outline='2px ridge red';
        identify_number.style.outline='2px ridge red';
        abs_number.style.outline='2px ridge red';
    } else{phone_number.style.outline='none';
        identify_number.style.outline='none';
        abs_number.style.outline='none';
        }

    if (!bool_result){
        var img = document.createElement('img');
        var div = document.getElementById("report1");

        while (div.firstChild){
        div.removeChild(div.firstChild);
        }

        img.src = path_to_img;
        img.style.margin = "auto";
        img.style.display = "block";
        img.style.width = "15%";
        img.style.height = "15%";

        div.appendChild(img);
    }
return !(bool_result);
}


function validateInputPhone(evt) {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode( key );
  var regex = /[0-9]/;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}

function validateInputPNumber(evt) {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode( key );
  var regex = /^[A-Z\d]+$/i;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}

function validateInputABC(evt) {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode( key );
  var regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}