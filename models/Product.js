class Product {
  constructor(
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type,
    id
  ) {
    this.name = name;
    this.price = price;
    this.screen = screen;
    this.backCamera = backCamera;
    this.frontCamera = frontCamera;
    this.img = img;
    this.desc = desc;
    this.type = type;
    this.id = id;
  }
  calcTotal() {
    let total =  (this.quantity) * (this.price);
    console.log(total);
    return total;
  }
}
