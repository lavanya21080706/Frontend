import axios from "axios";


const backendUrl = 'https://backend-production-a777.up.railway.app';

export const createBoard = async ({title,priority,checklist,dueDate,cb}) => {
    try {
        const reqUrl = `${backendUrl}/api/ver1/boardDetails/boardCreate`;
        const reqpayload={title,priority,checklist,dueDate,cb}
        const token = localStorage.getItem("token");
      
        axios.defaults.headers.common["Authorization"] = token;

        const response = await axios.post(reqUrl,reqpayload);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch analytics data"); // You can customize the error message
    }
};

export const getAnalytics = async () => {
    try {
        const reqUrl = `${backendUrl}/api/ver1/boardDetails/getAnalytics`;
        const token = localStorage.getItem("token");
      
        axios.defaults.headers.common["Authorization"] = token;

        const response = await axios.get(reqUrl);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch analytics data"); // You can customize the error message
    }
};

export const getdata =async(duration,status)=>{
    try {
      const reqUrl = `${backendUrl}/api/ver1/boardDetails/getCardData?duration=${duration}&status=${status}`;
        // const reqUrl = `${backendUrl}/api/ver1/boardDetails/getCardData?duration=${duration}&section=${status}`;
        const token = localStorage.getItem("token");
        
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get(reqUrl);
        console.log(reqUrl)
        return response;
        

    } catch (error) {
        
    console.log(error)
    }


};
export const updateStatus =async({id,newStatus})=>{
    try {
        const reqUrl = `${backendUrl}/api/ver1/boardDetails/updateStatus`;
        const reqpayload={id,newStatus}
        const token = localStorage.getItem("token");

        
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.put(reqUrl,reqpayload);
        return response.data;
        

    } catch (error) {
        
    console.log(error)
    }


};
export const getUserData = async (_id)=>{
    try {
        console.log(_id)
        const reqUrl = `${backendUrl}/api/ver1/boardDetails/edit/${_id}`;
        // const token = localStorage.getItem("token");

        
        // axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get (reqUrl);
        console.log(response)
        return response

       

    } catch (error) {
        console.log(error)
        
    }
}
export const getshareData = async (id)=>{
  try {
    
      const reqUrl = `${backendUrl}/api/ver1/boardDetails/edit/${id}`;
      const token = localStorage.getItem("token");

        
        axios.defaults.headers.common["Authorization"] = token;

      const response = await axios.get (reqUrl);
     return response;

     

  } catch (error) {
      console.log(error)
      
  }
}

export const updateduetask = async ({ date }) => {
  try {
    const reqUrl = `${backendUrl}/api/ver1/boardDetails/updateduetask`;
    console.log(reqUrl);
    const reqPayload = { date };
    console.log(`date is coming ${date}`);

    const response = await axios.put(reqUrl, reqPayload);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const updateEditData = async ({ _id }, { title, priority, checklist, dueDate, cb }) => {
    try {
      const reqUrl = `${backendUrl}/api/ver1/boardDetails/edit/${_id}`;
      const reqPayload = { title, priority, checklist, dueDate, cb };
      const token = localStorage.getItem("token");
  
      axios.defaults.headers.common["Authorization"] = token;
  
      const response = await axios.put(reqUrl, reqPayload);
  
      if (response.status === 200) {
        console.log("Data updated successfully:", response.data);
        return response.data;
      } else {
        console.error("Failed to update data. Server returned:", response.status, response.data);
        throw new Error("Failed to update data");
      }
    } catch (error) {
      console.error("Failed to fetch analytics data", error);
      throw new Error("Failed to fetch analytics data"); // You can customize the error message
    }
  };
  export const deleteData = async ( {_id }) => {
    try {
      const reqUrl = `${backendUrl}/api/ver1/boardDetails/delete/${_id}`;
      
      const token = localStorage.getItem("token");
  
      axios.defaults.headers.common["Authorization"] = token;
  
      const response = await axios.delete(reqUrl);
  
      if (response.status === 200) {
        console.log("Data deleted successfully:");
        return response.data;
      } else {
        console.error("Failed to update data. Server returned:", response.status);
        throw new Error("Failed to update data");
      }
    } catch (error) {
      console.error("Failed to fetch analytics data", error);
      throw new Error("Failed to fetch analytics data"); // You can customize the error message
    }
  };
// Notice the change in the function signature: parameters are now directly destructured
export const updatecb = async ({ id }, cb) => {
  try {
    const reqUrl = `${backendUrl}/api/ver1/boardDetails/checkboxes/${id}`;
    const reqPayload = { cb };
    const token = localStorage.getItem("token");

    axios.defaults.headers.common["Authorization"] = token;

    const response = await axios.put(reqUrl, reqPayload);

    if (response.status === 200) {
      console.log("Data updated successfully:", response.data);
      return response.data;
    } else {
      console.error("Failed to update data. Server returned:", response.status, response.data);
      throw new Error("Failed to update data");
    }
  } catch (error) {
    console.error("Failed to fetch analytics data", error);
    throw new Error("Failed to fetch analytics data"); // You can customize the error message
  }
};