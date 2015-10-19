// inject fix para Javascript do host page (original não funciona em phantomjs)

var input;
var form = document.getElementById('form');
input = document.createElement("input");
input.type = "hidden";
input.name = "__EVENTTARGET";
input.id = "__EVENTTARGET";
form.appendChild(input);
input = document.createElement("input");
input.type = "hidden";
input.name = "__EVENTARGUMENT";
input.id = "__EVENTARGUMENT";
form.appendChild(input);

function __doPostBack(eventTarget, eventArgument) {
  form.__EVENTTARGET.value = eventTarget;
  form.__EVENTARGUMENT.value = eventArgument;
  form.submit();
}
