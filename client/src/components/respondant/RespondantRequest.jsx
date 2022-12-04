import React from "react";
import { useNavigate } from "react-router-dom";
import respondantServices from "../Services/RespondantServices";
import authServices from "../Services/AuthServices";
import axios from "axios";
import alert from "../Services/Alert";

const RespondantRequest = ({ request ,getData,showButton}) => {
  console.log(request);
  const navigate=useNavigate();
  const accept = async ()=>{
  const d =  await axios.post("https://ar-medicare-backend.herokuapp.com/api/respondant/accept/"+authServices.getLoggedInUser()._id,{patientId:request.patientId});
  if(d){
    alert.showSuccessAlert("Successfully Accepted");
    navigate('/acceptedPatients');
  }else{
    alert.showErrorAlert("There is some Error!!");
  }
  
  }

const reject  = ()=>{
  axios.post("https://ar-medicare-backend.herokuapp.com/api/respondant/reject/"+authServices.getLoggedInUser()._id,{patientId:request.patientId}).then(response=>{
    alert.showSuccessAlert("Successfully Rejected !!")
    navigate('/respondantRequests');
  }).catch(error=>{
    //need modification err
    alert.showErrorAlert("Error: " + error.message);
  })
}
  return (
    <div>
      
      <div class="card my-3 shadow-lg" style={{ maxWidth: "540px" }}>
        <div className="row">
          <div class="col-3 d-inline my-4">
            <img
              src={request.img}
              class="img-fluid rounded-circle ms-2"
              alt="..."
            />
          </div>
          <div class="col-8">
            <div class="card-body">
              <h5 class="card-title">{request.username}</h5>
              <p class="card-text mb-0">
                Disease
              </p>
              <p class="card-text mb-0 text-muted">
                {request.data.disease}
              </p>
              <hr className="m-0"/>
              <p class="card-text mb-0">
                Purpose
              </p>
              {request.data.purposes.map((value,key) => <p class="card-text mb-0 text-muted">
               {value}
              </p>)}
              <hr className="m-0"/>
              <p class="card-text mb-0 text-muted">
              {request.data.address}
              </p>
              <hr className="m-0"/>
             
             
              <p class="card-text mb-0 text-muted">
               {request.data.datetime}
              </p>
              <hr className="mt-0"/>
              <div className="col-lg-12 d-flex justify-content-center">
           {showButton?<> <button className="btn btn-primary mx-3 " onClick={accept}>Accept</button>
            <button className="btn btn-danger mx-3 " onClick={reject}>Delete</button>
</>:<></>}     
             </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RespondantRequest;
