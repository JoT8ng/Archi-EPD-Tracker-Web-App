import axios from 'axios'

const backendUrl = process.env.REACT_APP_BACKEND_URL

const getAll = (sessionID) => {
  const request = axios.get(`${backendUrl}/tracker?session_id=${sessionID}`)
  return request.then(response => {
     console.log('received data from backend');
     return response.data;
  })
}

const add = async (formData) => {
    const request = axios.post(`${backendUrl}/tracker`, formData)
    return request.then(response => {
        console.log('Submitted data to backend');
        return response.data;
    })
}

const deleteRow = async (rowData) => {
    const request = axios.delete(`${backendUrl}/delete`, {
        data: rowData,
        headers: { 'Content-Type': 'application/json' }
    })
    return request.then(response => {
    	console.log('deleted row data from backend');
     	return response.data;
    })
}

const clear = async (sessionID) => {
    const request = axios.post(`${backendUrl}/clearsession?session_id=${sessionID}`)
    return request.then(response => {
    	console.log('Session data deleted successfully');
        return response.data;
    })
}

const trackerService = {
    getAll,
    add,
    deleteRow,
    clear
}

export default trackerService;