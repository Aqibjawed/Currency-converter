const base_url = "https://v6.exchangerate-api.com/v6/da2c96eb60f256498b5664a2/latest"

const select_from = document.querySelector('.select-container-from select');
const select_to = document.querySelector('.select-container-to select');
 

for(currency_code in countryList){
    let new_option = document.createElement("option");
    new_option.value = currency_code;
    new_option.innerText = currency_code;
    if(new_option.innerText === 'USD'){
        new_option.selected = 'select';
    }
    select_from.append(new_option);
}

for(currency_code in countryList){
    let new_option = document.createElement("option");
    new_option.value = currency_code;
    new_option.innerText = currency_code;
    if(new_option.innerText === 'INR'){
        new_option.selected = 'select';
    }
    select_to.append(new_option);
}

const updateimage = (element)=>{
    let curr_code = element.value;
    let country_code = countryList[curr_code].toLowerCase();
    
    let img = element.parentElement.querySelector('img');
    
    let newsrc = `https://flagcdn.com/48x36/${country_code}.png`;
    img.src = newsrc;
}

select_to.addEventListener("change" , (e)=>{
    console.log(e);
    updateimage(e.target);
});
select_from.addEventListener("change" , (e)=>{
    updateimage(e.target);
});



const updateresult = async (e)=>{
    let input = document.querySelector('.amount input');
    let amount = input.value;
    if(amount === "" || amount < 0){
        amount = 1;
    }

    const new_url = `${base_url}/${select_from.value}`;
     
    let response = await fetch(new_url);
    let jsonresponse = await response.json();

    let ratelist = jsonresponse.conversion_rates;

    let rate = ratelist[select_to.value];

    let finalamount = rate*amount;
    let message = document.querySelector('.result');
    message.innerText = `${amount} ${select_from.value} = ${finalamount} ${select_to.value}`;
    
}

let btn = document.querySelector('.btn');
btn.addEventListener('click' , (e)=>{
    e.preventDefault();
    updateresult(e);
})

window.addEventListener("DOMContentLoaded" , (e)=>{
    updateresult(e);
})