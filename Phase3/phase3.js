let map;
let directionsService;
let directionsRenderer;
const start_latitude = 34.68216;
const start_longitude = 135.18851;

function init_map(latitude, longitude) {
    let MyLatLng = new google.maps.LatLng(latitude, longitude);
    var Options = {
    zoom: 15,      //地図の縮尺値
    center: MyLatLng,    //地図の中心座標
    mapTypeId: 'roadmap'   //地図の種類
    };
    map = new google.maps.Map(document.getElementById('shelter_map'), Options);
};

function update_date(){
    let date = new Date();
    let dates = (date.getMonth() + 1) + "/" + date.getDate() + " " + date.getHours() + ":" + ("0" + date.getMinutes()).slice(-2);
    $("#current_date").html(dates);
}

const period_time = 30000;

function phase3() {
    init_map(start_latitude, start_longitude);
    update_date();
    setInterval(function() {
        update_date();
    }, period_time);
}

phase3();