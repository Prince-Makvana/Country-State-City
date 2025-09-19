const countryList = document.getElementById("countryList");
const addCountryBtn = document.getElementById("addCountry");

let data =  JSON.parse(localStorage.getItem("CountryData")) ||  []



// Main Function

function addCountry() {

    countryList.innerHTML = "";

    data.forEach((country, cIndex) => {
        const countryItem = document.createElement("li");
        countryItem.className = "list-group-item bg-secondary-subtle border border-2 border-dark";

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
            stateItem.className = "list-group-item bg-info-subtle border border-1 border-secondary";

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
                cityItem.className = "list-group-item bg-warning-subtle border border-1 border-secondary";

                cityItem.innerHTML = `
                    <span>${city.name}</span>
                    <button class="btn btn-sm btn-outline-danger float-end ms-2 delete-city">Delete</button>
                    <button class="btn btn-sm btn-outline-primary float-end ms-2  edit-city">Edit</button> 
                    <button class="btn btn-sm btn-success float-end add-area">area</button>
                    <ul class="nested-list mt-2"></ul>
                `;

                //////////////////////////////////////////////////////////////////

                const areaList = cityItem.querySelector("ul");

                city.areas.forEach((area, aIndex) => {
                    const areaItem = document.createElement("li");
                    areaItem.className = "list-group-item bg-primary-subtle border border-1 border-secondary";

                    areaItem.innerHTML = `
                    <span>${area}</span>
                    <button class="btn btn-sm btn-outline-danger float-end ms-2 delete-area">Delete</button>
                    <button class="btn btn-sm btn-outline-primary float-end  edit-area">Edit</button>
                `;

                    areaItem.querySelector(".edit-area").addEventListener("click", () => {
                        showAreaEdit(areaItem, area, aIndex, cIndex, sIndex, ciIndex);
                    });

                    areaItem.querySelector(".delete-area").addEventListener("click", () => {
                        data[cIndex].states[sIndex].cities[ciIndex].areas.splice(aIndex, 1);
                        addCountry();
                    });

                    areaList.appendChild(areaItem);
                });

                cityItem.querySelector(".add-area").addEventListener("click", () => {
                    showInput(cityItem, "", (areaName) => {
                        data[cIndex].states[sIndex].cities[ciIndex].areas.push(areaName);
                        addCountry();
                    })
                });

                ///////////////////////////////////////////////////////////////



                cityItem.querySelector(".edit-city").addEventListener("click", () => {
                    showCityEdit(cityItem, city.name, cIndex, sIndex, ciIndex);
                    // showInput(cityItem, city, (newCity)=>{
                    //     data[cIndex].states[sIndex].cities[ciIndex] = newCity;
                    //     addCountry();
                    // })
                    // const newCity = prompt("Edit city name:", data[cIndex].states[sIndex].cities[ciIndex]);
                    // if (newCity) {
                    //     data[cIndex].states[sIndex].cities[ciIndex] = newCity;
                    //     addCountry();
                    // }
                });

                cityItem.querySelector(".delete-city").addEventListener("click", () => {
                    data[cIndex].states[sIndex].cities.splice(ciIndex, 1);
                    addCountry();
                });

                cityList.appendChild(cityItem);
            });

            stateItem.querySelector(".add-city").addEventListener("click", () => {
                showInput(stateItem, "", (cityName)=>{
                    data[cIndex].states[sIndex].cities.push({name: cityName, areas: [] });
                    addCountry();
                })
                // const cityName = prompt("Enter city name:");
                // if (cityName) {
                //     data[cIndex].states[sIndex].cities.push(cityName);
                //     addCountry();
                // }
            });

            stateItem.querySelector(".edit-state").addEventListener("click", () => {
                showStateEdit(stateItem, state.name, cIndex, sIndex);
                // showInput(stateItem, state.name, (newState) =>{
                //     data[cIndex].states[sIndex].name = newState;
                //     addCountry();
                // })
                // const newState = prompt("Edit state name:", data[cIndex].states[sIndex].name);
                // if (newState) {
                //     data[cIndex].states[sIndex].name = newState;
                //     addCountry();
                // }
            });

            stateItem.querySelector(".delete-state").addEventListener("click", () => {
                data[cIndex].states.splice(sIndex, 1);
                addCountry();
            });

            stateList.appendChild(stateItem);
        });
        
        countryItem.querySelector(".add-state").addEventListener("click", () => {
            showInput(countryItem, "", (stateName)=>{
                data[cIndex].states.push({ name: stateName, cities: [] });
                addCountry();
            })
            // const stateName = prompt("Enter state name:");
            // if (stateName) {
            //     data[cIndex].states.push({ name: stateName, cities: [] });
            //     addCountry();
            // }
        });

        countryItem.querySelector(".edit-country").addEventListener("click",()=>{
            showInput(countryItem, country.name, (newCountry)=>{
                data[cIndex].name = newCountry;
                addCountry();
            })
            // const newCountry = prompt("Edit country name:", data[cIndex].name);
            // if (newCountry) {
            //     data[cIndex].name = newCountry;
            //     addCountry();
            // }
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























// Country, State, City, Area Add & Country Edit Function

function showInput(element, currentVal, callback){
    const inputDiv = document.createElement("div");
    inputDiv.className = "mt-2 d-flex";

    inputDiv.innerHTML = `
        <input type="text" class="form-control" value="${currentVal}" placeholder="Enter name">
        <button class="btn btn-info ms-2 save-btn">Save</button>
        <button class="btn btn-secondary ms-2 cancel-btn">Cancel</button>
    `;

    element.appendChild(inputDiv);


    const input = inputDiv.querySelector("input");
    input.focus();

    inputDiv.querySelector(".save-btn").addEventListener("click", ()=>{
        if(input.value){
            callback(input.value);
        }
    });

    inputDiv.querySelector(".cancel-btn").addEventListener("click",()=>{
        inputDiv.remove();
    });

}



// State Edit Function

function showStateEdit(element, currentVal, cIndex, sIndex) {
    const stateDiv = document.createElement("div");
    stateDiv.className = "mt-2";

    let cOptions = data.map((c, i) =>{
        return  `<option ${cIndex === i && "selected"} value="${i}">${c.name}</option>`
    });

    stateDiv.innerHTML = `
        <div class="d-flex">
            <input type="text" class="form-control" value="${currentVal}" placeholder="Enter state name">
            <select class="ms-2 pe-5 border border-2 border-dark rounded-3 bg-secondary">${cOptions}</select>
            <button class="btn btn-info ms-2 save-btn">Save</button>
            <button class="btn btn-secondary ms-2 cancel-btn">Cancel</button>
        </div>
    `;

    element.appendChild(stateDiv);
 
    const input = stateDiv.querySelector("input");
    input.focus();
    const select = stateDiv.querySelector("select");    

    stateDiv.querySelector(".save-btn").addEventListener("click", () => {
        const newState = input.value;
        if (!newState) return;

        const newcIndex = parseInt(select.value);
        const stateData = data[cIndex].states[sIndex];

        data[cIndex].states.splice(sIndex, 1);

        data[newcIndex].states.push({ ...stateData, name: newState });

        addCountry();
    });

    stateDiv.querySelector(".cancel-btn").addEventListener("click", () => stateDiv.remove());
}



// City Edit Function

function showCityEdit(element, currentVal, cIndex, sIndex, ciIndex){
    const cityDiv = document.createElement("div");
    cityDiv.className = "mt-2";

    let cOptions = data.map((c, i) =>{
        return  `<option ${cIndex === i && "selected"} value="${i}">${c.name}</option>`
    });
    
    

    cityDiv.innerHTML = `
        <div class="d-flex">
            <input type="text" class="form-control" value="${currentVal}" placeholder="Enter state name">
            <select id="selectCountry" class="ms-2 pe-5 border border-2 border-dark rounded-3 bg-secondary">${cOptions}</select>
            <select id="selectState" class="ms-2 pe-5 border border-2 border-dark rounded-3 bg-secondary"></select>
            <button class="btn btn-info ms-2 save-btn">Save</button>
            <button class="btn btn-secondary ms-2 cancel-btn">Cancel</button>
        </div>
    `;

    element.appendChild(cityDiv);
    
    const input = cityDiv.querySelector("input");
    input.focus();
    const selectCountry = cityDiv.querySelector("#selectCountry"); 
    const selectState = cityDiv.querySelector("#selectState"); 


    function updatesOption(){
    let selectedcIndex = parseInt(selectCountry.value);
    // console.log(selectedcIndex);
    let sOptions = data[selectedcIndex].states.map((s, i)=>{
            return `<option ${sIndex === i && "selected"} value="${i}">${s.name}</option>`
    });
    // console.log(sOptions);
    selectState.innerHTML = sOptions
    }

    updatesOption();
    selectCountry.addEventListener("change",updatesOption);


    cityDiv.querySelector(".save-btn").addEventListener("click", () => {
        const newCity = input.value;
        if (!newCity) return;

        let newcIndex = parseInt(selectCountry.value);
        let newsIndex = parseInt(selectState.value)


        data[cIndex].states[sIndex].cities.splice(ciIndex, 1);
        data[newcIndex].states[newsIndex].cities.push(newCity);

        addCountry();
    });

    cityDiv.querySelector(".cancel-btn").addEventListener("click", () => cityDiv.remove());

}



addCountryBtn.addEventListener("click", () => {
    showInput(countryList, "",(countryName)=>{
        data.push({ name: countryName, states: [] });
        addCountry();
    });
    // const countryName = prompt("Enter country name:");
    // if (countryName) {
        // data.push({ name: countryName, states: [] });
    //     addCountry();
    // }
});

addCountry()






//<>
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

// </>