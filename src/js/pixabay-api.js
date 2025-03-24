import axios from 'axios';

export async function fetchImages(searchQuery, currentPage = 1) {
    const API_KEY = "49456082-a9826f5e30a55e93368b2873a";
    const BASE_URL = "https://pixabay.com/api/";
    const PER_PAGE = 15;
    const params = {
        key: API_KEY,
        q: searchQuery,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        per_page: PER_PAGE,
        page: currentPage,
    };

    try {
const response = await axios.get(`${BASE_URL}`, {
        params
})
        return { images: response.data.hits, totalHits: response.data.totalHits };
    }
    catch (error) {
        console.error('Error fetching images', error);
        throw error;
    };
}

