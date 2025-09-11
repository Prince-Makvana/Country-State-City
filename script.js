const countryList = document.getElementById("countryList");
const addCountryBtn = document.getElementById("addCountry");

let data = []

function addCountry() {

    countryList.innerHTML = "";

    data.forEach((country, cIndex) => {
        const countryItem = document.createElement("li");
        countryItem.className = "list-group-item";

        countryItem.innerHTML = `
          <strong>${country.name}</strong>
          <button class="btn btn-sm btn-outline-danger float-end ms-2 delete-country">Delete</button>
          <button class="btn btn-sm btn-outline-secondary float-end ms-2 edit-country">Edit</button>
          <button class="btn btn-sm btn-outline-success float-end add-state">State</button>
          <ul class="nested-list mt-2"></ul>
        `;

        const stateList = countryItem.querySelector("ul");

        country.states.forEach((state, sIndex) => {
            const stateItem = document.createElement("li");
            stateItem.className = "list-group-item";

            stateItem.innerHTML = `
                <span>${state.name}</span>
                <button class="btn btn-sm btn-outline-danger float-end ms-2 delete-state">Delete</button>
                <button class="btn btn-sm btn-outline-secondary float-end ms-2 edit-state">Edit</button>
                <button class="btn btn-sm btn-outline-success float-end add-city">City</button>
                <ul class="nested-list mt-2"></ul>
            `;

            const cityList = stateItem.querySelector("ul");

            state.cities.forEach((city, ciIndex) => {
                const cityItem = document.createElement("li");
                cityItem.className = "list-group-item d-flex justify-content-between align-items-center";

                cityItem.innerHTML = `
                    <span>${city}</span>
                    <div>
                        <button class="btn btn-sm btn-outline-danger delete-city">Delete</button>
                        <button class="btn btn-sm btn-outline-secondary edit-city">Edit</button>
                    </div>
                `;

                cityList.appendChild(cityItem);
            });










            stateItem.querySelector(".add-city").addEventListener("click", () => {
                const cityName = prompt("Enter city name:");
                if (cityName) {
                    data[cIndex].states[sIndex].cities.push(cityName);
                    addCountry();
                }
            });

            stateList.appendChild(stateItem);
        });







        

        countryItem.querySelector(".add-state").addEventListener("click", () => {
            const stateName = prompt("Enter state name:");
            if (stateName) {
                data[cIndex].states.push({ name: stateName, cities: [] });
                addCountry();
            }
        });

        countryList.appendChild(countryItem);
    });

};








addCountryBtn.addEventListener("click", () => {
    const countryName = prompt("Enter country name:");
    if (countryName) {
        data.push({ name: countryName, states: [] });
        addCountry();
    }
});







// const data = [
//     {
//         "country1": {
//             "state1":["city1", "city2","city3"],
//             "state2":["city1", "city2","city3"],
//             "state3":["city1", "city2","city3"]
//         }
//     },
//     {
//         "country2": {
//             "state1":["city1", "city2","city3"],
//             "state2":["city1", "city2","city3"],
//             "state3":["city1", "city2","city3"]
//         }
//     },
//     {
//         "country3": {
//             "state1":["city1", "city2","city3"],
//             "state2":["city1", "city2","city3"],
//         }
//     },
//     {
//         "country4": {
//             "state1":["city1", "city2","city3"]
//         }
//     }
// ]



