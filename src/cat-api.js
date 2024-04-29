import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_KeanBOLGaa3nd7qPrrzTftzpTggDHNbNgieuRDE3qhO4w6XMQ3MpbrVD6sA60ND9";

export function fetchBreeds() {
    return axios
    .get("https://api.thecatapi.com/v1/breeds")
    .then((response) => {
        return response.data;
    });
}

export function fetchCatByBreed(breedId) {
    return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data[0]);
}