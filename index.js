const inputSlider = document.querySelector("[length-slider]");
const lengthDisplay = document.querySelector("[data-lengthNum]");
const indicator  = document.querySelector("[data-indicator]")
let password = "";
let passLength = 10;
let checkCount = 1;

handle_slider();
function handle_slider(){
    inputSlider.value = passLength;
    lengthDisplay.innerText = passLength;
}
function handle_slider_decremnt(){
    
}

function set_Indicator(color){
    indicator.style.backgroundColor = color;
    //shadow
}