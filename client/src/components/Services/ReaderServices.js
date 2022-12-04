import GenericService from "./GenericService";
class ReaderServices extends GenericService {
  constructor() {
    super();
  }

  getPoets = () => this.get("admin/poets");
  getPoetries = () => this.get("admin/poetries");
  requestPoet = (_id, data) => this.post("reader/request/poet/" + _id, data);
  buySubscription = (data) => this.post("checkout/create-checkout", data);
  addToCart = (_id, userId) => this.post("products/cart/" + _id, userId);
  removeItem = (_id) => this.get("products/cart/remove/" + _id);
  getCartItems = () => this.get("products/cart");
  checkout = (data) => this.post("checkout/create-checkout", data);
  validateRequest = (id, data) =>
    this.post("/patient/checkdoctor/availability/" + id, data);
}
let readerServices = new ReaderServices();
export default readerServices;
