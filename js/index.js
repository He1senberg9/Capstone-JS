let mapData = function (data) {
  return data.map((item) => {
    return new Product(
      item.name,
      item.price,
      item.screen,
      item.backCamera,
      item.frontCamera,
      item.img,
      item.desc,
      item.type,
      item.id
    );
  });
};
let renderProduct = function (list) {
  let productHTML = "";
  for (const item of list) {
    productHTML += `     
    <div class="col-sm-4 col_">
    <div class="card">
      <img
        class="w-100"
        src=${item.img}
        alt=""
      />
      <div class="card-body">
        <h5 class="card-title fs-5">${item.name}</h5>
        <p class="card-text" id=${item.id}>${item.desc}</p>
        <div class="footer_">
          <button onclick=addToCart("${item.id}") class="btn btn-success">Cart</button>
          <button onclick=showDetail("${item.id}") class="btn btn-primary">Detail</button>
        </div>
      </div>
    </div>
  </div>`;
  }
  document.getElementById("product-list").innerHTML = productHTML;
};
let renderCart = function (list) {
  let productHTML = "";
  let total = 0;
  for (const item of list) {
    total += item.quantity * +item.product.price;
    let isDisabled = item.quantity === 1 ? "disabled" : "";
    productHTML += `
    <tr>
    <td><img src=${item.product.img} /></td>
    <td>${item.product.name}</td>
    <td>${item.product.price}</td>
    <td>
      <button onclick=changeQuantity("${
        item.product.id
      }",-1) class="btn btn-success" ${isDisabled}>-</button>
      <span class="mx-1">
        ${item.quantity}
      </span>
      <button onclick=changeQuantity("${
        item.product.id
      }",1) class="btn btn-success">+</button>
    </td>
    <td>${item.quantity * +item.product.price}</td>
    <td>
      <button onclick=removeProduct("${
        item.product.id
      }") class="btn btn-danger">Delete
      </button>
    </td>
    </tr>
    `;
  }
  document.getElementById("cart").innerHTML = productHTML;
  document.getElementById("totalPrice").innerText = total;
};
let showDetail = function (id) {
  document.getElementById(id).classList.toggle("show_detail");
};
let filterPhone = function () {
  let value = document.getElementById("selectPhone").value;
  if (value === "All") {
    renderProduct(productList);
    return;
  }
  let selectedList = productList.filter((item) => item.type === value);
  renderProduct(selectedList);
};
let addToCart = function (id) {
  let returnProduct = productInCart.find((item) => item.product.id === id);
  if (returnProduct) {
    returnProduct.quantity++;
  } else {
    let product = productList.find((item) => item.id === id);
    let cartItem = { product: { ...product }, quantity: 1 };
    productInCart.push(cartItem);
  }
  setLocalStorage();
};
let changeQuantity = function (id, amount) {
  for (let item of productInCart) {
    if (item.product.id === id) {
      item.quantity += +amount;
      setLocalStorage();
      return;
    }
  }
};
let setLocalStorage = function () {
  let dataLocal = JSON.stringify(productInCart);
  localStorage.setItem("cart", dataLocal);
  renderCart(productInCart);
};
let getLocalStorage = function () {
  let dataLocal = localStorage.getItem("cart");
  if (dataLocal) {
    productInCart = JSON.parse(dataLocal);
    renderCart(productInCart);
  }
};
let pay = function () {
  productInCart = [];
  setLocalStorage();
};
let removeProduct = function (id) {
  productInCart = productInCart.filter((item) => item.product.id !== id);
  setLocalStorage();
};
let productList = [];
let display = function () {
  let result = getData();
  result.then((res) => {
    productList = mapData(res.data);
    renderProduct(productList);
  });
};
display();
let productInCart = [];
getLocalStorage();
