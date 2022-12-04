import axios from 'axios';
 
const setAuthToken = token => {
   if (token) {
       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;  
       return
   }
   else{
    delete axios.defaults.headers.common["Authorization"];
    window.location.href = '/sign-in'
   }

}
export default setAuthToken