const default_tsunami_time_m = 91;
const MINITUES = 60000;
const time_speed = 60;

function tsunami_count_down() {
    let tsunami_time_m = default_tsunami_time_m;
    const tsunami_time_element = document.getElementById('tsunami_time');

    let second_interval_id = setInterval(function() {
        tsunami_time_element.innerText = tsunami_time_m;
        tsunami_time_m -= 1;
        // if(tsunami_time_m < 20) show_em_shelter_unsafe_Park();
        if(tsunami_time_m < 0) {
            clearInterval(second_interval_id);
        }
      }, MINITUES/time_speed); 
}

let em_shelter_name_element;
let en_em_shelter_name_element;
let em_shelter_time_element;
let em_shelter_address_element;

function set_em_shelter_element() {
    em_shelter_name_element = document.getElementById('em_shelter_name');
    en_em_shelter_name_element = document.getElementById('en_em_shelter_name');
    em_shelter_time_element = document.getElementById('em_shelter_time');
    em_shelter_address_element = document.getElementById('em_shelter_address');
}

let map;

function init_map(latitude, longitude) {
    let MyLatLng = new google.maps.LatLng(latitude, longitude);
    var Options = {
    zoom: 15.3,      //地図の縮尺値
    center: MyLatLng,    //地図の中心座標
    mapTypeId: 'roadmap'   //地図の種類
    };
    map = new google.maps.Map(document.getElementById('tsunami_map'), Options);

    const imageBounds = {
        north: 34.6984965737, // 画像の北端
        south: 34.68126341222471, // 画像の南端
        east: 135.2019762759, // 画像の東端
        west: 135.17892244845066, // 画像の西端
    
    };
      const groundOverlay = new google.maps.GroundOverlay(
        "http://yxpartners.co.jp/wp-content/uploads/2025/01/area_map_2_2.png", // 重ねる画像のURL
        imageBounds
      );

      groundOverlay.setOpacity(0.5);
      groundOverlay.setMap(map);
};

function show_em_shelter_safe_Park() {
    const name = "こうべ市民福祉交流センター";
    em_shelter_name_element.innerText = name;
    em_shelter_time_element.innerText = 30;
    en_em_shelter_name_element.innerText = "Kobe Citizen Welfare Exchange Center";
    em_shelter_address_element.innerText = "神戸市中央区磯上通3丁目1-32";
}

const lat = 34.68987999295323;
const lng = 135.19044936216036

function phase2() {
    init_map(lat, lng);
    set_em_shelter_element();
    show_em_shelter_safe_Park();
    tsunami_count_down();
}

phase2();