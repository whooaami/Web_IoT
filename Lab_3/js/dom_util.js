import { onDragNDrop } from "./drag_n_drop.js";

const nameInput = document.getElementById("name_input");
const colorInput = document.getElementById("color_input");
const weightInput = document.getElementById("weight_input");
const priceInput = document.getElementById("price_input");
const totalValueLabel = document.getElementById("totalValue");
const itemsContainer = document.getElementById("items_container");

// local functions
const getItemId = (id) => `item-${id}`;

const itemTemplate = ({ id, name, color, weight, price }) => `
<li id="${getItemId(id)}" class="card mb-3 item-card" draggable="true">
    <img
      src="https://www.netclipart.com/pp/m/22-227272_vehicle-clipart-big-car-black-car-clipart-png.png"
      class="item-container__image card-img-top" 
      alt="card"
    />
    <div class="card-body">
      <h4 class="card-title">${name}</h4>
      <h4 class="card-text">${color}</h4>
      <h4 class="card-text">${weight}</h4>
      <h4 class="card-text">${price}</h4>
    </div>
</li>`;

// exposed functions
export const clearInputs = () => {
  nameInput.value = "";
  colorInput.value = "";
  weightInput.value = "";
  priceInput.value = "";

};

export const addItemToPage = ({ id, name, color, weight, price }) => {
  itemsContainer.insertAdjacentHTML(
    "afterbegin",
    itemTemplate({ id, name, color, weight, price })
  );

  const element = document.getElementById(getItemId(id));

  element.onmousedown = onDragNDrop(element);
};

export const renderItemsList = (items) => {
  itemsContainer.innerHTML = "";

  for (const item of items) {
    addItemToPage(item);
  }
};

export const getInputValues = () => {
  return {
    name: nameInput.value,
    color: colorInput.value,
    weight: weightInput.value,
    price: priceInput.value,
  };
};

export const sortItems = ({cars, property, order}) => {

  function compareByWeight(a, b) {
    if (a.weight < b.weight) {
      return 1;
    }
    if (a.weight > b.weight) {
      return -1;
    }
    return 0;
  }
  function compareByPrice(a, b) {
    if (a.price < b.price) {
      return 1;
    }
    if (a.price > b.price) {
      return -1;
    }
    return 0;
  }

  if (property === "weight") {
      cars.sort(compareByWeight)
  } else if (property === "price") {
      cars.sort(compareByPrice)
  }

  if (order === "DESC") {
    cars.reverse()
  }
  itemsContainer.innerHTML = ""
  renderItemsList(cars)
}

export const countValues = ({ cars, property }) => {

  totalValueLabel.innerHTML = ""

  const totalValue = cars.reduce((sum, current) => {
    if (property === "weight") {
      return parseInt(sum, 10) + parseInt(current.weight, 10)
    }
    if (property === "price") {
      return parseInt(sum, 10) + parseInt(current.price, 10)
    }
  }, 0)

  totalValueLabel.innerHTML = totalValue
}
