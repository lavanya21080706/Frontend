import axios from "axios";

const backendUrl = 'https://backend-production-a777.up.railway.app';


export const userRegistration = async ({ name, email, password, confirmPassword }) => {
  try {
    const reqUrl = `${backendUrl}/api/ver1/auth/register`;  // Corrected the URL
    const reqPayload = { name, email, confirmPassword, password };  // Corrected the payload
    const response = await axios.post(reqUrl, reqPayload);
    console.log(response)
    return response.data;
   
  } 
  catch (error) {
    console.error(error);
    // Handle the error or throw it for the calling code to handle
    throw error;
  }
};


export const userLogin= async({email,password})=>{
  try {
    const reqUrl = `${backendUrl}/api/ver1/auth/login`; 
    const reqPayload={email,password};
    const response = await axios.post(reqUrl, reqPayload);
    console.log(response.data)
   
   return response.data;
  } catch (error) {
    console.error(error);
   
    throw error;
    
  }

}

export const  passwordUpdation= async({name,oldPassword,newPassword})=> {

 try {
  const reqUrl = `${backendUrl}/api/ver1/auth/passwordUpdation`; 
  const reqPayload={name,oldPassword,newPassword};
  const token = localStorage.getItem("token");
      
  axios.defaults.headers.common["Authorization"] = token;
  const response = await axios.put(reqUrl, reqPayload);
  console.log(response);
  return response;

  
  
 } catch (error) {
  console.error(error);
  
 }

}
