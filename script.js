const input = document.querySelector("#search-input");
const results = document.querySelector("#result");
const searchBtn = document.querySelector("#search-btn");

let countryName = "";

async function searchResults() {
    countryName = input.value
    if (!countryName) {
        results.innerHTML = "<p>Please enter a country name.</p>";
        return;
    }

    let url = `http://universities.hipolabs.com/search?country=${countryName}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        
        results.innerHTML = ""; // Clear previous results

        if (data.length === 0) {
            results.innerHTML = "<p>No universities found.</p>";
            return;
        }

        // Use forEach to iterate over the university data
        data.forEach(university => {
            const universityDiv = document.createElement("div");
            universityDiv.classList.add("university");

            const name = document.createElement("h3");
            name.textContent = university.name;

            
            const stateProvince = document.createElement("p");
            stateProvince.textContent = `State/Province: ${university['state-province'] || 'N/A'}`

            const country = document.createElement("p");
            country.textContent = `Country: ${university.country}`;

            const websiteLink = document.createElement("a");
            websiteLink.href = university.web_pages[0];
            websiteLink.target = "_blank";
            websiteLink.textContent = university.web_pages[0];

            universityDiv.appendChild(name);
            universityDiv.appendChild(stateProvince);
            universityDiv.appendChild(country);
            universityDiv.appendChild(websiteLink);

            results.appendChild(universityDiv);
        });
    } catch (error) {
        console.error("Error fetching the universities: ", error);
        results.innerHTML = "<p>Error fetching the universities. Please try again later.</p>";
    }
}

searchBtn.addEventListener("click", searchResults);

input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchResults();
    }
});
