let cardWrapper = document.querySelector('.countries-wrapper');
let darkBtn = document.querySelector('#darkbtn');
let body = document.querySelector('body');
let header2 = document.querySelector('header');
let card = document.querySelector('.country');
let search = document.querySelector('#search');
let region = document.querySelector('#region');
let countrywrapper = document.querySelector('.card');
let flagsWrapper = document.querySelector('.card-wrapper-country');
let country_name = localStorage.getItem('data-country');
let title = document.querySelector('#title');
let faviconLink = document.querySelector('#favicon');

// API STARTED

let baseURL = "https://restcountries.com/v2";

async function getPosts(reqURL){
    try{
        const response = await fetch(`${reqURL}/all`)
        if(response.status == 200){
            const result = await response.json()
            cardWrapper.innerHTML = '';
            renderData(result)
        }
    }catch(error){
        console.log(error);
    }
}

getPosts(baseURL);

// API ENDED


// COUNTRY FLAG STARTED

async function fetchCountry(country_name){
    try{
        let response = await fetch(`${baseURL}/name/${country_name}?fullText=true`)
        let result = await response.json();
        console.log(result);
        fetchRenderData(result[0])
    }catch(error){
        console.log(error);
    }
}

fetchCountry(country_name)

// COUNTRY FLAG ENDED


// COUNTRY FLAG RENDER STARTED

function fetchRenderData(smth){
        faviconLink.href = smth.flags.svg
        title.textContent = smth.name
        let div23 = document.createElement('div');
        div23.classList.add('card2','flex','gap-[146px]')

        div23.innerHTML = `
        
                                    <img src="${smth.flags.png}"
                                alt="blegium" class="w-[561px] h-[404px] rounded-[10px]" />

                            <div class="card2-title pt-[47px]">
                                <h3 class="mb-[25px] text-[32px] font-[800]">${smth.name}</h3>

                                <div class="title-info flex gap-[117px] mb-[66px]">
                                    <ul class="flex flex-col gap-[10px] items-start">
                                        <li class="flex items-center gap-2">
                                            <strong>Native Name:</strong>${smth.nativeName}
                                        </li>
                                        <li class="flex items-center gap-2">
                                            <strong>Population:</strong>${smth.population}
                                        </li>
                                        <li class="flex items-center gap-2">
                                            <strong>Region:</strong>${smth.region}
                                        </li>
                                        <li class="flex items-center gap-2">
                                            <strong>Sub Region:</strong>${smth.subregion}
                                        </li>
                                        <li class="flex items-center gap-2">
                                            <strong>Capital:</strong>${smth.capital}
                                        </li>
                                    </ul>

                                    <ul class="flex flex-col gap-[10px] items-start">
                                        <li class="flex items-center gap-2">
                                            <strong>Top Level Domain:</strong>${smth.topLevelDomain}
                                        </li>
                                        <li class="flex items-center gap-2">
                                            <strong>Currencies:</strong>${smth.currencies[0].name}
                                        </li>
                                        <li class="flex items-center gap-2">
                                            <strong>Languages:</strong>${smth.languages[0].name}
                                        </li>
                                    </ul>
                                </div>

                                <div class="flex items-center gap-[20px]">
                                    <h2>Border countries:</h2>
                                    <div
                                        class="px-[15px] py-[5px] border-[1px] border-[#00000069] rounded-[10px] w-[115px] cursor-pointer">
                                        <h3 class="text-center">France</h3>
                                    </div>
                                    <div
                                        class="px-[15px] py-[5px] border-[1px] border-[#00000069] rounded-[10px] w-[115px] cursor-pointer">
                                        <h3 class="text-center">Germany</h3>
                                    </div>
                                    <div
                                        class="px-[15px] py-[5px] border-[1px] border-[#00000069] rounded-[10px] w-[115px] cursor-pointer">
                                        <h3 class="text-center">Netherlands</h3>
                                    </div>
                                </div>
                            </div>
        
        `

        flagsWrapper.append(div23);
}



// COUNTRY FLAG RENDER ENDED



// RENDER DATA STARTED

function renderData(countries) {
    cardWrapper.innerHTML = '';
    countries.forEach((el) => {
        let div2 = document.createElement('div');
        div2.classList.add('country');
        div2.classList.add('cursor-pointer');
        div2.classList.add('bg-transparent');
        div2.classList.add('shadow-md');
        div2.classList.add('rounded-[5px]');
        div2.classList.add('w-[264px]');
        div2.classList.add('h-[336px]');

        div2.innerHTML = `
             <img src="${el.flag}"
                        alt="${el.name}" class="w-[100%] h-[160px] rounded-t-[5px]">
                <div class="card-title pt-[24px] pb-[48px] pl-[24px] pr-[24px] flex flex-col gap-[8px]">
                    <h3 class="pb-[8px] font-[800] text-[18px]">${el.name.length > 15 ? el.name.substring(0,15) + "..." : el.name}</h3>

                    <p class="flex items-center gap-2"><strong>Population:</strong>${el.population}</p>
                    <p class="flex items-center gap-2"><strong>Region:</strong>${el.region}</p>
                    <p class="flex items-center gap-2"><strong>Capital:</strong>${el.capital}</p>
                </div>
        
        `

        div2.dataset.country = el.name;

        cardWrapper.append(div2)
    })
}


// renderData(baseURL)


// RENDER DATA ENDED




// DARK MODE STARTED

function darkmode(){
    let darkmode = body.classList.toggle('dark-mode');
    localStorage.setItem('dark-mode',darkmode)
}

darkBtn.addEventListener('click',(e)=>{
    darkmode()
})

// DARK MODE ENDED





// SEARCH PROCESSING STARTED

async function searchCountry(searchtext){
    cardWrapper.innerHTML = '';
    try{
        console.log(searchtext)
        const response = await fetch(`${baseURL}/name/${searchtext}`)
        const result = await response.json()
        renderData(result)
    }catch(error){
        console.log(error)
    }
}


search.addEventListener('keyup',(e)=>{
    if(e.keyCode == 13 && e.target.value.trim().length){
        const searchText = e.target.value.trim()
        searchCountry(searchText)
    }
})


// SEARCH PROCESSING ENDED







// RENDER REGION DATA STARTED

let regionName = []

async function filterbyRegion(regionText){
    try{
        const response = await fetch(`${baseURL}/all`)
        const result = await response.json()
        const regionResult = await result.filter((el)=> el.region == regionText) 
        renderData(regionResult)
    }catch(error){
        console.log(error)
    }
}


region.addEventListener('change',(e)=>{
    let natija = e.target.value;

    filterbyRegion(natija);
})


// RENDER REGION DATA ENDED



// COUNTRY CLICK STARTED

cardWrapper.addEventListener('click',(e) =>{
    if(e.target.parentNode.classList.contains('country') || e.target.parentNode.classList.contains('card-title')){
        let data = e.target.parentNode.getAttribute('data-country');
        localStorage.setItem('data-country',data)

        if(localStorage.getItem('data-country')){
            window.location.href = './country.html';
        }
    }
})


// COUNTRY CLICK ENDED