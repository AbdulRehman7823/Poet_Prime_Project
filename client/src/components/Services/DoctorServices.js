import GenericService from "./GenericService";
class DoctorServices extends GenericService {
  constructor() {
    super();
  }

  getPatients = (_id) => this.get("doctor/patients/" + _id);
  addPatientDetails = (_id, patientId, data) =>
    this.post("doctor/patientDetail/" + _id, {
      patientId: patientId,
      data: data,
    });
  updatePatientDetails = (_id, patientId, data) =>
    this.put("doctor/patientDetail/update/" + _id, {
      patientId: patientId,
      data: data,
    });
}
let doctorServices = new DoctorServices();
export default doctorServices;
