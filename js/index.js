let productList = [];
let productInCart = [];
let getData = function () {
  axios({
    url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products",
    method: "GET",
  })
    .then(function (res) {
      console.log(res);
      productList = mapData(res.data);
      renderProduct(productList);
    })
    .catch(function (err) {
      console.log(err);
    });
};
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
      item.id,
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
          <button onclick=showDetail(${item.id}) class="btn btn-primary">Detail</button>
        </div>
      </div>
    </div>
  </div>`;
  }
  document.getElementById("product-list").innerHTML = productHTML;
};
let renderProductInCart = function (list) {
  let productHTML = "";
  for (const item of list) {
    productHTML += `
    <tr>
    <td><img src=${item.img} /></td>
    <td>${item.name}</td>
    <td>${item.price}</td>
    <td>${item.quantity}</td>
    <td>${item.calcTotal()}</td>
    </tr>
    `;
  }
  document.getElementById("cart").innerHTML = productHTML;
};
getData();
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
  let product = productList.find((item) => item.id === id);
  console.log(product);
  let newProduct = { ...product, quantity: 1 };
  for (item of productInCart) {
    if (item.id === newProduct.id) {
      item.quantity++;
      renderProductInCart(productInCart);
      return;
    }
  }
  productInCart.push(newProduct);
  console.log(newProduct);
  renderProductInCart(productInCart);
};
