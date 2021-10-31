import { onDragNDrop } from "./drag_n_drop.js";

export const EDIT_BUTTON_PREFIX = 'edit-button-';

const nameInput = document.getElementById("name_input");
const colorInput = document.getElementById("color_input");
const weightInput = document.getElementById("weight_input");
const priceInput = document.getElementById("price_input");
const itemsContainer = document.getElementById("items_container");

// local functions

const itemTemplate = ({ id, name, color, weight, price }) => `
<li id="${id}" class="card mb-3 item-card" draggable="true">
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
      <button id="${EDIT_BUTTON_PREFIX}${id}" type="button" class="btn btn-info">
        Edit
      </button>
    </div>
</li>`;

// exposed functions
export const clearInputs = () => {
  nameInput.value = "";
  colorInput.value = "";
  weightInput.value = "";
  priceInput.value = "";

};

export const addItemToPage = ({ id, name, color, weight, price }, onEditItem, onRemoveItem) => {
  itemsContainer.insertAdjacentHTML(
    "afterbegin",
    itemTemplate({ id, name, color, weight, price })
  );

  const element = document.getElementById(id);
  const editButton = document.getElementById(`${EDIT_BUTTON_PREFIX}${id}`);

  element.onmousedown = onDragNDrop(element, onRemoveItem);

  editButton.addEventListener("click", onEditItem);
  
  // VERY IMPORTANT
  editButton.onmousedown = e => e.stopPropagation();
};

export const renderItemsList = (items, onEditItem, onRemoveItem) => {
  itemsContainer.innerHTML = "";

  for (const item of items) {
    addItemToPage(item, onEditItem, onRemoveItem);
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
