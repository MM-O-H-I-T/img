const accessKey = "v9UuR5KBtwEJ31eXO-p-xHSK48ALJSw6MJ-mrTQiFwA";
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");
const errorMessage = document.getElementById("error-message");
let keyword = "";
let page = 1;

async function searchImage() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();

        const results = data.results;

        results.forEach((result) => {
            const image = document.createElement("img");
            image.src = result.urls.small;
            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";

            imageLink.appendChild(image);
            searchResult.appendChild(imageLink);
        });

        showMoreBtn.style.display = "block";
        errorMessage.style.display = "none";
    } catch (error) {
        console.error(error);
        errorMessage.textContent = "An error occurred while fetching the images.";
        errorMessage.style.display = "block";
    }
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchResult.innerHTML = "";
    searchImage();
});

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImage();
});