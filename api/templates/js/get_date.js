document.getElementById("identify_number").addEventListener('input', function() {
  this.value = this.value.toUpperCase()
});

let date = new Date();
document.getElementById("data_to").max =  date.toISOString().slice(0,16);
document.getElementById("data_from").max = document.getElementById("data_to").value;


if (document.getElementById("data_to").value == "" || document.getElementById("data_to").value == null ||
    document.getElementById("data_from").value == "" || document.getElementById("data_from").value == null)
{
    date.setHours(2, 59);
    document.getElementById("data_to").value = date.toISOString().slice(0,16);

    date.setHours(3,0);
    date.setDate(date.getDate() - 1);
    document.getElementById("data_from").value = date.toISOString().slice(0,16);
}


var inp = document.getElementById("data_to");
inp.oninput = function() {
    document.getElementById("data_from").max = document.getElementById("data_to").value;
  };
