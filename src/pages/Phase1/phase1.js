const default_quake_time = 10.03;
const MILLISECOND = 0.001;

function quake_count_down() {
    let quake_time = default_quake_time;
    const quake_time_element = document.getElementById('quake_time');

    let first_interval_id = setInterval(function() {
        quake_time_element.innerText = quake_time.toFixed(2);
        quake_time -= 10*MILLISECOND;
        if(quake_time < 0) {
            clearInterval(first_interval_id);
        }
      }, 10); 
}

function phase1 () {
    quake_count_down();
}
phase1();