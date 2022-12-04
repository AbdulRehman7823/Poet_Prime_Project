import { id } from "date-fns/locale";
import GenericService from "./GenericService";
class ReaderServices extends GenericService {
  constructor() {
    super();
  }

  getDoctors = () => this.get("admin/doctors");
  getRespondants = () => this.get("admin/respondant");
  getProducts = () => this.get("admin/products");
  requestDoctor = (_id, data) =>
    this.post("patient/request/doctor/" + _id, data);
  requestRespondant = (_id, data) =>
    this.post("patient/request/respondant/" + _id, data);

  addToCart = (_id, userId) => this.post("products/cart/" + _id, userId);
  removeItem = (_id) => this.get("products/cart/remove/" + _id);
  getCartItems = () => this.get("products/cart");
  checkout = (data) => this.post("checkout/create-checkout", data);
  validateRequest = (id, data) =>
    this.post("/patient/checkdoctor/availability/" + id, data);
}
let readerServices = new ReaderServices();
export default readerServices;
