$(document).ready(function() {
  var partnerObj;

  var doesAnyCountryMatch = function(array, iso_code) {
    for(var i = 0; i < array.length; i++) {
      if(array[i]["iso_code"] === iso_code) {
        return true;
      }
    }
    return false;
  }

  $.ajax({
    type: "GET",
    url: "http://api.kivaws.org/v1/partners.json",
    success: function(data) {
      partnerObj = data.partners;
      partnerObj.forEach(function(partner) {
        var countries = "";
        partner.countries.forEach(function(partnerCountry) {
          countries += "<td>" + partnerCountry.name + ", " + partnerCountry.region + "</td>";
          iso = partnerCountry.iso_code
          $("#country-select").append('<option value="'+ partnerCountry.iso_code + '">' + partnerCountry.name + '</option>')
        });
        $("table > tbody").append("<tr><td>" + partner.name + "</td>" + countries + "</tr>");
      });
    }
  });

  $('select[name="country"]').on("change", function() {
    $("table > tbody").empty();
    selectedIsoCode = $(this).val();
    partnerObj.forEach(function(elem) {
      if(doesAnyCountryMatch(elem["countries"], selectedIsoCode)) {
        $("table > tbody").append("<tr><td>" + elem.name + "</td>");
      }
    })
  });

});
