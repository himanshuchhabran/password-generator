const inputSlider = document.querySelector("[length-slider]");
const lengthDisplay = document.querySelector("[data-lengthNum]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyMsg = document.querySelector("[copymsg]");
const copyBtn = document.querySelector("[data-copy]");
const indicator  = document.querySelector("[data-indicator]");
const symbols = '~`!@#$%^&*()_-+={[}]|\:;<,>.?/';
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#number");
const symbolCheck = document.querySelector("#symbols");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const generateBtn = document.querySelector(".generate-btn");
let password = "";
let passLength = 10;
let checkCount = 0;

set_Indicator('#ccc')
handle_slider();
function handle_slider(){
    inputSlider.value = passLength;
    lengthDisplay.innerText = passLength;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ((passLength-min)*100/(max-min))+'% 100%'
}


function shufflePassword(array){
    //Fisher Yates Method   
    for(let i = array.length -1;i>0;i--)
    {
        const j = Math.floor(Math.random() *(i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str ="";
    array.forEach((el)=>(str+=el));
    return str;

}

function set_Indicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getRanInt(min,max){
   return Math.floor(Math.random()* (max-min)) + min;
}

function generateRanNum(){
    return getRanInt(0,9);
}

function generateLowCase(){
    return String.fromCharCode(getRanInt(97,123));
}

function generateUppCase(){
    return String.fromCharCode(getRanInt(65,91));
}

function generateSymbol(){
    const randNum = getRanInt(0,symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numberCheck.checked) hasNum = true;
    if(symbolCheck.checked) hasSym = true;

    if(hasUpper && hasLower && (hasNum|| hasSym) && passLength >=8){
        set_Indicator("#0f0");
    }
    else if((hasLower || hasUpper) && (hasNum || hasSym) && passLength >= 6)
    {
        set_Indicator("#ff0");
    }
    else{
        set_Indicator("#f00");
    }
}
async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied"; 
    }
    catch(e){
        copyMsg.innerText = "Failed";
        console.log('failed');
    }
    //to make copied visible
    copyMsg.classList.add("active");

    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000);
    
}

function handleCheckBoxChange(){
    checkCount = 0;
    allCheckBox.forEach((checkbox)=>
    {
        if(checkbox.checked)
        checkCount++;
    });

    //special condition 
    if(passLength<checkCount){
        passLength = checkCount;
        handle_slider();
    }
}

allCheckBox.forEach((checkbox)=>
{
    checkbox.addEventListener('change',handleCheckBoxChange);
})

inputSlider.addEventListener('input',(e)=>
{
    passLength = e.target.value;
    handle_slider();
})

copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value);
    copyContent();
})

generateBtn.addEventListener('click',()=>
{
    //none of the checkbox are selected 
    if(checkCount <=0)
    return;

    if(passLength<checkCount){
        passLength = checkCount;
        handle_slider();
    }

    console.log("Statring the journey");
    //remove old password
    password = "";

    //let's put the stuff mentioned by checkboxes

    // if(uppercaseCheck.checked){
    //     password += generateUppCase();
    // }
    // if(lowercaseCheck.checked){
    //     password += generateLowCase();
    // }
    // if(symbolCheck.checked){
    //     password += generateSymbol();
    // }
    // if(numberCheck.checked){
    //     password += generateRanNum();
    // }

    let funcArr = [];

    if(uppercaseCheck.checked)
    funcArr.push(generateUppCase);

    if(lowercaseCheck.checked)
    funcArr.push(generateLowCase);

    if(numberCheck.checked)
    funcArr.push(generateRanNum);
    
    if(symbolCheck.checked)
    funcArr.push(generateSymbol);

    for(let i=0;i<funcArr.length;i++){
        password+= funcArr[i]();
    }

    console.log("Compulsary addition done");
    for(let i=0;i<passLength-funcArr.length;i++){
        let randIndex = getRanInt(0,funcArr.length);
        console.log("randIndex" + randIndex);
        password += funcArr[randIndex]();
    } 
    console.log("remaining addition done");
    //shuffle the password 
    password = shufflePassword(Array.from(password));
    console.log("Shuffling done");
    passwordDisplay.value = password;
    console.log("Ui addition done");
    //calculate strength
    calcStrength();
})