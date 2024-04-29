import axios from 'axios';
import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';

axios.defaults.headers.common["x-api-key"] = "live_KeanBOLGaa3nd7qPrrzTftzpTggDHNbNgieuRDE3qhO4w6XMQ3MpbrVD6sA60ND9";

const catList = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loadText = document.querySelector('.loader');
const errorText = document.querySelector('.error');

loadText.hidden = false;
errorText.hidden = true;
catList.hidden = true;

document.addEventListener("DOMContentLoaded", ev => {
    fetchBreeds()
    .then(breeds => {
        fillBreedSelect(breeds);
        catList.hidden = false;
        loadText.hidden = true;
    })
    .catch(error => {
        errorText.hidden = false;
        loadText.hidden = true;
    })
    
});

function fillBreedSelect(breeds) {
    breeds.forEach(breed => {
        const option = document.createElement("option");
        option.value = breed.id;
        option.textContent = breed.name;
        catList.appendChild(option);
    });
}

catList.addEventListener("change", ev => {
    const selectedBreedId = catList.value;
    fetchCatByBreed(selectedBreedId)
    loadText.hidden = false;
    catList.hidden = true;

    fetchCatByBreed(selectedBreedId)
    .then(cat => {
        displayCatInfo(cat)
    })
    .catch(error => {
        errorText.hidden = false;
    })
    .finally(() => {
        loadText.hidden = true;
        catList.hidden = false;
    });
});

function displayCatInfo(cat) {
    catInfo.innerHTML = `
        <img src="${cat.url}" alt="Cat Image">
        <p><strong>Breed:</strong> ${cat.breeds[0].name}</p>
        <p><strong>Description:</strong> ${cat.breeds[0].description}</p>
        <p><strong>Temperament:</strong> ${cat.breeds[0].temperament}</p>
        `;
}