
export const searchImages = (search) => {
    const API_KEY = "47398520-23b63bacec280c041aa8780c5";
    const BASE_URL = "https://pixabay.com/api/";

    const params = new URLSearchParams({
        key: API_KEY,
        q: search,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
    })

    return fetch(`${BASE_URL}?${params}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statustex);
            }
            return response.json();
        })

}
