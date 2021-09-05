// ========== LIGHT/DARK MODE ========== //

const mode = document.querySelector('.header__mode');
const variables = document.querySelector(':root');
const modeImg = document.querySelector('.header__mode-img');
const modeText = document.querySelector('.header__mode-text');

mode.addEventListener('click', () => {
    variables.classList.toggle('light-root');
    modeImg.classList.toggle('animate-mode');

    if (variables.className === 'light-root') {
        modeText.innerText = 'Dark mode';
        modeImg.src = './img/dark_mode.svg';
    } else {
        modeText.innerText = 'Light mode';
        modeImg.src = './img/light_mode.svg';
    }
});

// ========== DROPDOWN ========== //

const dropdownContent = document.querySelector('.dropdown-content');
const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownIcon = document.querySelector('.dropdown-icon');

dropdownBtn.addEventListener('click', () => {
    dropdownContent.classList.toggle('hidden');
    dropdownIcon.classList.toggle('animate-dropdown');
});

document.addEventListener('click', (e) => {
    if (e.target.className !== 'dropdown-btn') {
        dropdownContent.classList.add('hidden');
        dropdownIcon.classList.remove('animate-dropdown');
    }
});

// ========== CREATE COUNTRY CARDS ========== //

const API = 'https://restcountries.eu/rest/v2/all';
const cards = document.querySelector('.main__cards');

fetch(API)
    .then(response => response.json())
    .then(getResult);

function getResult(data) {
    data.forEach(country => {
        const card = document.createElement('div');
        card.className = 'main__card';
        card.innerHTML = `
            <img class="main__card-img" src="https://restcountries.eu/data/${country.alpha3Code.toLowerCase()}.svg">
            <div class="main__content">
                <h3 class="main__title">${country.name}</h3>
                <p class="main__subtitle">Population: ${country.population.toLocaleString()}</p>
                <p class="main__subtitle">Region: <span class="region">${country.region}</span></p>
                <p class="main__subtitle">Capital: ${country.capital}</p>
            </div>
        `;
        cards.appendChild(card);
    });
}

// ========== SEARCH COUNTRY ========== //

const searchInput = document.querySelector('.main__input');
const countryNames = cards.getElementsByClassName('main__title');

searchInput.addEventListener('input', (e) => {
    let text = e.target.value;

    for (let i = 0; i < countryNames.length; i++) {
        if (countryNames[i].innerText.toLowerCase().includes(text.toLowerCase())) {
            getParentElement(countryNames[i], 2).classList.remove('hidden');
        } else {
            getParentElement(countryNames[i], 2).classList.add('hidden');
        }
    }
});

// ========== FILTER REGION ========== //

const region = cards.getElementsByClassName('region');

function filterRegion(reg) {
    for (let i = 0; i < region.length; i++) {
        if (region[i].innerText === reg || reg === 'All') {
            getParentElement(region[i], 3).classList.remove('hidden');
        } else {
            getParentElement(region[i], 3).classList.add('hidden');
        }
    }
}

function getParentElement(element, num) {
    let parent = element;
    for (let i = 0; i < num; i++) {
        parent = parent.parentNode;
    }
    return parent;
}

//Get the button:
const mybutton = document.querySelector(".upBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = scrollFunction;

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}