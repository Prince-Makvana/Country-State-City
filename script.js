const countryList = document.getElementById("countryList");
const addCountryBtn = document.getElementById("addCountry");

let data =  JSON.parse(localStorage.getItem("CountryData")) ||  []

function addCountry() {

    countryList.innerHTML = "";

    data.forEach((country, cIndex) => {
        const countryItem = document.createElement("li");
        countryItem.className = "list-group-item";

        countryItem.innerHTML = `
          <strong>${country.name}</strong>
          <button class="btn btn-sm btn-outline-danger float-end ms-2 delete-country">Delete</button>
          <button class="btn btn-sm btn-outline-primary float-end ms-2 edit-country">Edit</button>
          <button class="btn btn-sm btn-success float-end add-state">State</button>
          <ul class="nested-list mt-2"></ul>
        `;

        const stateList = countryItem.querySelector("ul");

        country.states.forEach((state, sIndex) => {
            const stateItem = document.createElement("li");
            stateItem.className = "list-group-item";

            stateItem.innerHTML = `
                <span>${state.name}</span>
                <button class="btn btn-sm btn-outline-danger float-end ms-2 delete-state">Delete</button>
                <button class="btn btn-sm btn-outline-primary float-end ms-2 edit-state">Edit</button>
                <button class="btn btn-sm btn-success float-end add-city">City</button>
                <ul class="nested-list mt-2"></ul>
            `;

            const cityList = stateItem.querySelector("ul");

            state.cities.forEach((city, ciIndex) => {
                const cityItem = document.createElement("li");
                cityItem.className = "list-group-item";

                cityItem.innerHTML = `
                    <span>${city}</span>
                    <button class="btn btn-sm btn-outline-danger float-end ms-2 delete-city">Delete</button>
                    <button class="btn btn-sm btn-outline-primary float-end  edit-city">Edit</button>
                    
                `;

                cityItem.querySelector(".edit-city").addEventListener("click", () => {
                    const newCity = prompt("Edit city name:", data[cIndex].states[sIndex].cities[ciIndex]);
                    if (newCity) {
                        data[cIndex].states[sIndex].cities[ciIndex] = newCity;
                        addCountry();
                    }
                });

                cityItem.querySelector(".delete-city").addEventListener("click", () => {
                    data[cIndex].states[sIndex].cities.splice(ciIndex, 1);
                    addCountry();
                });

                cityList.appendChild(cityItem);
            });

            stateItem.querySelector(".add-city").addEventListener("click", () => {
                const cityName = prompt("Enter city name:");
                if (cityName) {
                    data[cIndex].states[sIndex].cities.push(cityName);
                    addCountry();
                }
            });

            stateItem.querySelector(".edit-state").addEventListener("click", () => {
                const newState = prompt("Edit state name:", data[cIndex].states[sIndex].name);
                if (newState) {
                    data[cIndex].states[sIndex].name = newState;
                    addCountry();
                }
            });

            stateItem.querySelector(".delete-state").addEventListener("click", () => {
                data[cIndex].states.splice(sIndex, 1);
                addCountry();
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

        countryItem.querySelector(".edit-country").addEventListener("click",()=>{
            const newCountry = prompt("Edit country name:", data[cIndex].name);
            if (newCountry) {
                data[cIndex].name = newCountry;
                addCountry();
            }
        });

        countryItem.querySelector(".delete-country").addEventListener("click", () => {
            data.splice(cIndex, 1);
            addCountry();
        });
   
        countryList.appendChild(countryItem);
    });

    console.log({data})
    /**
     * In local storage on string can be store so we are parsing as a string
     */
    localStorage.setItem("CountryData", JSON.stringify(data))
    
};

addCountryBtn.addEventListener("click", () => {
    const countryName = prompt("Enter country name:");
    if (countryName) {
        data.push({ name: countryName, states: [] });
        addCountry();
    }
});

addCountry()







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



