import GenericService from "./GenericService";
class PoetServices extends GenericService {
  constructor() {
    super();
  }

  getPoetries = (id) => this.get(`poet/poetries/${id}`);
  requestPoet = (_id, data) => this.post("reader/request/poet/" + _id, data);

  addToCart = (_id, userId) => this.post("products/cart/" + _id, userId);
  removeItem = (_id) => this.get("products/cart/remove/" + _id);
  getCartItems = () => this.get("products/cart");
  checkout = (data) => this.post("checkout/create-checkout", data);
  validateRequest = (id, data) =>
    this.post("/patient/checkdoctor/availability/" + id, data);
}
let poetServices = new PoetServices();
export default poetServices;
