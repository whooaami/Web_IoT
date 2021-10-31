import {
    addItemToPage,
    clearInputs,
    renderItemsList,
    getInputValues,
    EDIT_BUTTON_PREFIX,
} from "./dom_util.js";
import { getAllCars, postCar, editCar, deleteCar } from './api.js'

const submitButton = document.getElementById("submit_button");
const findButton = document.getElementById("find_button");
const cancelFindButton = document.getElementById("cancel_find_button");
const findInput = document.getElementById("find_input");


let cars = [];

// const addItem = ({ name, color, weight, price }) => {
//    const generatedId = uuid.v1();

//    const newItem = {
//        id: generatedId,
//        name,
//        color,
//        weight,
//        price,
//    };

//    cars.push(newItem);

//    addItemToPage(newItem);
// }

const onEditItem = (element) => {
    const id = element.target.id.replace(EDIT_BUTTON_PREFIX, "");

    const { name, color, weight, price } = getInputValues();

    clearInputs();

    editCar(id, {
        name, 
        color, 
        weight, 
        price,
    }).then(refetchAllCars);
}

const onRemoveItem = (id) => deleteCar(id).then(refetchAllCars);

export const refetchAllCars = async () => {
  const allCars = await getAllCars();

  cars = allCars;

  renderItemsList(cars, onEditItem, onRemoveItem);
};

submitButton.addEventListener("click", (event) => {
    // Prevents default page reload on submit
    event.preventDefault();

    const { name, color, weight, price } = getInputValues();

    clearInputs();

    postCar({
        name,
        color,
        weight,
        price,
    }).then(refetchAllCars);
});

findButton.addEventListener("click", () => {
    const foundCars = cars.filter(
        (car) => car.name.search(findInput.value) !== -1
    );

    renderItemsList(foundCars, onEditItem, onRemoveItem);
});

cancelFindButton.addEventListener("click", () => {
    renderItemsList(cars, onEditItem, onRemoveItem);

    findInput.value = "";
});


// main code
refetchAllCars();
