import GenericService from "./GenericService";
class RespondantServices extends GenericService {
  constructor() {
    super();
  }

  getPatients = (_id) => this.get("respondant/patients/" + _id);


   acceptRequest = (_id,patientId)=>{
    this.post("respondant/accept/"+_id,patientId);}

 rejectRequest  = (_id,patientId)=>{
 this.post("respondant/reject/"+_id,patientId)

 
   
}
getAccepted =(_id)=>this.get("respondant/acceptedPatients/"+_id)
}
let respondantServices = new RespondantServices();
export default respondantServices;
