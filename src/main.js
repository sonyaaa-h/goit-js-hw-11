import { searchImages } from "./js/pixabay-api";
import { createMarkup } from "./js/render-functions";
import iconReject from "./img/error.svg";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";



const form = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery-list");
const loader = document.querySelector(".loader")


iziToast.settings({
    timeout: 2000,
    position: 'topRight',
    transitionIn: 'flipInX',
    transitionOut: 'flipOutX',
});

const lightbox = new SimpleLightbox('.gallery-list a', {
    captions: true,
    captionsData: "alt",
    captionDelay: 250,
});

form.addEventListener("submit", handleSearch);

function handleSearch(event) {
    event.preventDefault();

    const { input } = event.target.elements;

    if (!input.value.trim()) {
        gallery.innerHTML = "";

        iziToast.warning({
            title: 'Caution',
            message: "The field is empty, please type your request",
            iconUrl: iconReject,
            titleColor: "#fff",
            titleSize: "16px",
            messageColor: "#fff",
            messageSize: "16px",
            backgroundColor: "#ef4040",
        })

        return;
    }

    loader.classList.remove("hidden");

    searchImages(input.value)
        .then(data => {
            if (data.total === 0) {
                throw new Error();
            }
            console.log(data)
            gallery.innerHTML = createMarkup(data.hits);
            //console.log(data.hits.total.length);
            lightbox.refresh();
        })
        .catch(error => {
            gallery.innerHTML = "";

            iziToast.error({
                title: 'Error',
                message: "Sorry, there are no images matching your search query. Please try again!",
                iconUrl: iconReject,
                titleColor: "#fff",
                titleSize: "16px",
                messageColor: "#fff",
                messageSize: "16px",
                backgroundColor: "#ef4040",
            })
        })
        .finally(() => {
            loader.classList.add("hidden")
            event.target.reset()
        })
}

