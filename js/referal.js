
$(document).ready(function () {

  var referalName = 'referal';

  if ($.cookie(referalName)) {
    var referalCode = $.cookie(referalName)
    UpdateUrls(referalName, referalCode);
  } else {
    var referalCode = GetURLParameter(referalName);

    if (referalCode) {
      $.cookie(referalName, referalCode, { expires: 7 });
      UpdateUrls(referalName, referalCode);
    } else {
      var referalCode = document.referrer.split('/')[2];

      $.cookie(referalName, referalCode, { expires: 7 });
      UpdateUrls(referalName, referalCode);
    }
  }
});

function UpdateUrls(referalName, referalCode) {
  $("a").each(function () {
    var location = 'http://example.com/';
    $(this).attr("href", location + '?' + referalName + '=' + referalCode);
    $(this).attr("target", '_blank');
  });
}

function GetURLParameter(sParam) {
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split('&');
  for (var i = 0; i < sURLVariables.length; i++) {
    var sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] == sParam) {
      return sParameterName[1];
    }
  }
}