import {_Axios} from "../services/_Axios";
const handleAxiosStatus = (status, msg) => {
  console.log("status", status);
  console.log("msg", msg);
    // if (status === 401) return window.location.href = "/"
    if (status === 401) return console.log(status)
    if (status === 403) return console.log(msg)
    return msg
  }
const getToken = async(id)=>{
  const {data} = await _Axios.get(`/devices/me`)
  console.log("GETTOKEN",data)
    return session
}

const exports = {
    handleAxiosStatus,
    getToken
}
export default exports;