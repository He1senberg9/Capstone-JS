let getData = async function () {
  try {
    return axios({
      url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products",
      method: "GET",
    });
  } catch (error) {
    console.log(error);
  }
};
let getDataByID = async function (id) {
  try {
    return axios({
      url: `https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products/${id}`,
      method: "GET",
    });
  } catch (err) {
    console.log(err);
  }
};
let postData = async function (product) {
  try {
    await axios({
      url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products/",
      method: "POST",
      data: product,
    });
    console.log("Post thành công");
  } catch (err) {
    console.log(err);
  }
};
let putData = async function (id, product) {
  try {
    await axios({
      url: `https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products/${id}`,
      method: "PUT",
      data: product,
    });
    console.log("Put thành công");
  } catch (err) {
    console.log(err);
  }
};
let removeData = async function (id) {
  try {
    await axios({
      url: `https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products/${id}`,
      method: "DELETE",
    });
    console.log("Delete thành công");
  } catch (err) {
    console.log(err);
  }
};
