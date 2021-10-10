import {
    addItemToPage,
    clearInputs,
    renderItemsList,
    getInputValues,
    sortItems,
    countValues,
} from "./dom_util.js";

const submitButton = document.getElementById("submit_button");
const findButton = document.getElementById("find_button");
const cancelFindButton = document.getElementById("cancel_find_button");
const findInput = document.getElementById("find_input");
const sortPropertySelector = document.getElementById("propertyForSorting");
const sortOrderSelector = document.getElementById("orderSelector");
const totalValueSelector = document.getElementById("propertyForTotalValue");
const nameInput = document.getElementById('name_input');
const priceInput = document.getElementById('price_input');
const errorName = document.getElementById("error_name");
const errorPrice = document.getElementById("error_price");

let cars = [];

const addItem = ({ name, color, weight, price }) => {
    const generatedId = uuid.v1();

    const newItem = {
        id: generatedId,
        name,
        color,
        weight,
        price,
    };

    cars.push(newItem);

    addItemToPage(newItem);
}

submitButton.addEventListener("click", (event) => {
    // Prevents default page reload on submit
    event.preventDefault();
    
    const invalidSymbols = ["@", "#", "==", "//", ".", ",", "\\", "±", "§", "!"];


    if(nameInput.value == 0){
        errorName.textContent = "Please enter a name";
        window.alert("We need to know the name of the car!");
    }
    else if(invalidSymbols.some(symbol =>nameInput.value.includes(symbol))){
        errorName.textContent = "Wrong symbols";
        window.alert("ERROR");
    }
    else if(priceInput.value == 0){
        errorPrice.textContent = "Please enter a price";
        window.alert("We need to know the price of the car!");
    }
    else if(invalidSymbols.some(symbol =>nameInput.value.includes(symbol))){
        errorPrice.textContent = "Wrong symbols";
        window.alert("ERROR");
    }
    else if(isNaN(priceInput.value)){
        errorPrice.textContent = "Please enter a number";
        window.alert("The entered value is not a number!");
    }
    else {
        const { name, color, weight, price } = getInputValues();

        clearInputs();

        addItem({
            name,
            color,
            weight,
            price,
        });

        errorPrice.textContent = "";
        errorName.textContent = "";
    }
});

findButton.addEventListener("click", () => {
    const foundCars = cars.filter(
        (car) => car.name.search(findInput.value) !== -1
    );

    renderItemsList(foundCars);
});

cancelFindButton.addEventListener("click", () => {
    renderItemsList(cars);

    findInput.value = "";
});

sortPropertySelector.addEventListener("change", () => {
    sortItems({ cars, property: sortPropertySelector.value, order: sortOrderSelector.value })
})

sortOrderSelector.addEventListener("change", () => {
    sortItems({ cars, property: sortPropertySelector.value, order: sortOrderSelector.value })
})

totalValueSelector.addEventListener("change", () => {
    console.log(totalValueSelector.value)
    countValues({ cars, property: totalValueSelector.value })
})

// main code
renderItemsList(cars);

countValues({ cars, property: "price" })
