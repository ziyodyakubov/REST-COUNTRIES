let cardWrapper = document.querySelector('.countries-wrapper');
let darkBtn = document.querySelector('#darkbtn');
let body = document.querySelector('body');
let header2 = document.querySelector('header');
let card = document.querySelector('.country');
let search = document.querySelector('#search');
let region = document.querySelector('#region');



function renderData(term) {
    cardWrapper.innerHTML = '';
    term.forEach((el) => {
        let div = document.createElement('div');
        div.classList.add('country');
        div.classList.add('cursor-pointer');
        div.classList.add('bg-[#fff]');
        div.classList.add('shadow-md');
        div.classList.add('rounded-[5px]');
        div.classList.add('w-[264px]');
        div.classList.add('h-[336px]');

        div.innerHTML = `
             <img src="${el.flag}"
                        alt="${el.name}" class="w-[100%] h-[160px] rounded-t-[5px]">
                <div class="card-title pt-[24px] pb-[48px] pl-[24px] pr-[24px] flex flex-col gap-[8px]">
                    <h3 class="pb-[8px] font-[800] text-[18px]">${el.name.length > 7 ? el.name.substring(0,7) + "..." : el.name}</h3>

                    <p class="flex items-center gap-2"><strong>Population:</strong>${el.population}</p>
                    <p class="flex items-center gap-2"><strong>Region:</strong>${el.region}</p>
                    <p class="flex items-center gap-2"><strong>Capital:</strong>${el.capital}</p>
                </div>
        
        
        
        `

        cardWrapper.appendChild(div)
    })
}


renderData(countries)

// DARK MODE STARTED

function darkmode(){
    body.classList.toggle('dark-mode');
    card.classList.toggle('dark-mode');
    header2.classList.toggle('dark-mode');

}

darkBtn.addEventListener('click',(e)=>{
    darkmode()
})

// DARK MODE ENDED


// SEARCH PROCESSING STARTED

function searchCountry(country2){
    const searchResult = countries.filter((el) => el.name.toLowerCase().includes(country2.toLowerCase()));
    cardWrapper.innerHTML = '';

    renderData(searchResult)
}


search.addEventListener('keyup',(e)=>{
    searchCountry(e.target.value)
})

// SEARCH PROCESSING ENDED


// RENDER REGION DATA STARTED

let regionName = []

countries.forEach((el)=>{
    
    let option = document.createElement('option')
    if(!regionName.includes(el.region)){
        regionName.push(el.region)

    regionName.forEach((el)=>{
        option.innerHTML=`
        ${el}
    `
    })
        
    region.appendChild(option)
    
}

    
})



region.addEventListener('change',(e)=>{
    let natija = countries.filter((el) => el.region.includes(e.target.value))

    renderData(natija)
})


// RENDER REGION DATA ENDED