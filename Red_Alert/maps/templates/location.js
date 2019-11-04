var map;
var urlxml;
var xmlreq;

function getLocations(searchtext)
{
    //search only at least if there are 2 chars
    if(searchtext.length>1){
        if (xmlreq != undefined) {
            xmlreq.abort();
        };
        $("#results").html('<br /><div id="progress"><p>Geocoding ' + searchtext + '...</p></div>');
        outxml = urlxml + searchtext;
        //read xml
        xmlreq = $.ajax({
            type: "GET",
            data: '',
            url: outxml,
            dataType: "xml",
            success: parseXml
        });
    }
    else{
        $("#results").html('No results.');
    }
}

function setResources(ol_map,geocoded_xml){
    map = ol_map;
    urlxml = geocoded_xml + '?address=';
}

function setMapCenter(lon, lat)
{
    var proj = new OpenLayers.Projection("EPSG:4326");
    var point = new OpenLayers.LonLat(lon, lat);
    map.setCenter(point.transform(proj, map.getProjectionObject()));
}

function parseXml(xml)
{
    $("#results").html('<br />');
    var searchtext = $("#txtAddress").val();
    //for each service (Google, Yahoo, Geonames...)
    $(xml).find("service").each(function()
    {
        var service_name = $(this).attr("name");
        $("#results").append('<strong>Results for "' + searchtext + '" from ' + service_name + "</strong>:<br />");
        //for each location result in that service
        $(this).find("location").each(function()
        {
            var loc_name = $(this).attr("name");
            var lon = $(this).attr("lon");
            var lat = $(this).attr("lat");
            html_location = '<a href="" OnClick="javascript:setMapCenter(' + lon + ',' + lat + ');return false;">' + loc_name + '</a>';
            $("#results").append(html_location + "<br />");
        });
        $("#results").append('<br />');
    });
};

$.fx.speeds._default = 700;
$(function() {
    var search_form = " \
        <div class='search-id'> \
            <div id='dialog' title='Geolocated results'> \
                <form> \
                    <input id='txtAddress' type='text' name='txtAddress' /> \
                </form> \
            </div> \
            <div id='results'></div> \
        </div> \
        <script> \
            $('#txtAddress').keyup(function(e) { \
                getLocations($('#txtAddress').val()); \
            }); \
        </script>"
    // dialog
    $("#search-dialog").dialog({
        autoOpen: false,
        autoClose: true,
    show: 'blind',
    hide: 'explode',
    height: 300,
    width: 400,
    zIndex: 4000
    });
    $('#search-dialog').html(search_form);
  });