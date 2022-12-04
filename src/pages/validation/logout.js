import axios from 'axios';
 
const Logout = () => {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.clear()
    window.location.href = '/sign-in'  
}

export default Logout