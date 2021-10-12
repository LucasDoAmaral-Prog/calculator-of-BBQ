var Active = []

var image_Active;

var number   = 0.1;

let input_Declaration, get_Inputs, input_Value, input_Name;

let image_Declaration, image_Groups, images_Names;

let TimeOut, Interval, Interval_2, TimeOut_2;

let store_beer, store_beef, store_soda;

const content_Page = document.getElementsByClassName('calculator-BBQ')[0];
const secound_Page = document.getElementsByClassName('secound')[0];

const image_beef  = document.querySelector('img');
const image_soda  = image_beef.parentElement.children[1];
const image_beer  = image_soda.parentElement.children[2];
const image_arrow = document.getElementsByClassName('arrow')[0];

const button_Calc  = document.getElementsByTagName('button')[0];
const button_Print = document.getElementsByClassName('print')[0];

button_Calc .addEventListener("click", executeCalc);
button_Print.addEventListener("click", function() { print() });

image_beef .addEventListener("click", addStyle);
image_soda .addEventListener("click", addStyle);
image_beer .addEventListener("click", addStyle);
image_arrow.addEventListener("click", hideResults)

function executeCalc(){   

    input_Declaration = document.getElementById('inputs');
    get_Inputs        = input_Declaration.children;

    for( let i = 0; i < get_Inputs.length; i++ ){
        
        input_Value = get_Inputs[i].value;
        input_Name  = get_Inputs[i].getAttribute('name');

        var verify_contentInput = input_Value === '' || input_Value === ' ' ?
        alert(`O campo de ${input_Name} tem que ser preenchido!`) && false : true;
        
    }

    if ( verify_contentInput ){

        if( image_Active ){

            let QCalc = calcFood();
            hidePanel(QCalc);

        }

        else{

            alert("Por favor, selecione algum item que você irá levar para o churrasco.");

        }
    }
}

function calcFood(){
    
    const Quantity_Men      = parseInt(get_Inputs[0].value);
    const Quantity_Women    = parseInt(get_Inputs[1].value);
    const Quantity_Kids     = parseInt(get_Inputs[2].value);
    const Quantity_Duration = parseInt(get_Inputs[3].value);

    const QBeef_Men   = Quantity_Duration >= 6 ? 700 : 500;
    const QBeef_Women = Quantity_Duration >= 6 ? 700 : 500;
    const QBeef_Kid   = Quantity_Duration >= 6 ? 350 : 250;

    const QBeer  = Quantity_Duration >= 6 ? 2000 : 1200;
    const QDrink = Quantity_Duration >= 6 ? 1500 : 1000;

    for (let i of Active ){

        if (i == 'beef')
            store_beef = (Quantity_Men * QBeef_Men) + (Quantity_Women * QBeef_Women) + (Quantity_Kids * QBeef_Kid);

        if (i == 'soda')
            store_soda = (Quantity_Men * QDrink) + (Quantity_Women * QDrink) + ((Quantity_Kids * QDrink) / 2);


        if (i == 'beer')     
            store_beer = (QBeer * Quantity_Men) + (QBeer/400 * Quantity_Women);

    }

    store_beef = `<span>${(store_beef / 1000)}</span> Kg de Carne`;
    store_soda = `<span>${Math.round((store_soda / 1000) / 2)}</span> Garrafas de refrigerantes de 2L`;
    store_beer = `<span>${Math.round((store_beer / 1000) / 0.350)}</span> Latinhas de Cerveja`;

    var Quantity = [store_beef, store_soda, store_beer];

    return Quantity;

}

function hidePanel(result){

    Interval = setInterval(function(){

        number += 0.1;

        content_Page.style.opacity = '1' - number;
    
    },30);

    TimeOut = setTimeout(function(){

        content_Page.style.display = 'none'
        secound_Page.style.display = 'block'
        secound_Page.style.opacity = '1'
        clearInterval(Interval)

    }, 300)

    const group_IDs    = document.getElementById('inputs-2');
    const mensur_Group = group_IDs.children; 

    for ( let i = 0; i < mensur_Group.length; i++ ){

        if (!result[i].includes('NaN')) 

        mensur_Group[i].children[0].innerHTML = result[i]

        else

        mensur_Group[i].children[0].innerHTML = '<b>Não definido</b';

    }    
}

function hideResults(){

    Interval_2 = setInterval(function(){

        number -= 0.1;

        secound_Page.style.opacity = 0 + number;
    
    },30);

    TimeOut_2 = setTimeout(function(){

        secound_Page.style.display = 'none'; 
        content_Page.style.display = 'block';
        content_Page.style.opacity = '1';
        resetValues();
    
        clearInterval(Interval_2);

        
    }, 300);

}

function addStyle(e){

    e.target.style = `border-style: solid; border-width: 3px; border-color: rgb(143, 76, 0); transition: all .2s ease; background-color: rgba(134, 128, 120, 0.603); transform: rotate(370deg)`;

    image_Active   = e.target.id;

    Active.push(image_Active);

    e.target.removeEventListener(e.type, arguments.callee);
    e.target.addEventListener(e.type, remStyle);
    console.log(Active)

}

function remStyle(e){

    e.target.style = "border: none; transition: all .2s ease; rgba(255, 255, 255, 0.863)";
    image_Active   = undefined;

    Active.splice(e.target.id, 1);
    
    e.target.removeEventListener(e.type, arguments.callee);
    e.target.addEventListener(e.type, addStyle);
    console.log(Active)

}

function resetValues(){

    input_Declaration = document.getElementById('inputs');
    get_Inputs        = input_Declaration.children;

    for( let i = 0; i < get_Inputs.length; i++ ) get_Inputs[i].value = '';

    const pictures_Group       = document.getElementById('pictures');
    const pictures_Declaration = pictures_Group.children;

    for ( let i = 0; i < pictures_Declaration.length; i++ ){
        
        pictures_Declaration[i].removeEventListener('click', remStyle);
        pictures_Declaration[i].addEventListener('click', addStyle);
        pictures_Declaration[i].style = "border: none; transition: all .2s ease; rgba(255, 255, 255, 0.863)";

        Active = []

    }
}
