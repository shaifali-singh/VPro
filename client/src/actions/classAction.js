import axios from 'axios';

export const createClass = (className) => async (dispatch) => {
    try {
      dispatch({
        type: 'CREATE_CLASS_REQ',
      })
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          "Authorization":"Bearer "+ localStorage.getItem("jwt")
        },
      }
  
      const { data } = await axios.post(
        '/api/class/create',
        { className},
        config
      )
  
      dispatch({
        type: 'CREATE_CLASS_SUCCESS',
        payload: data,
      })

      console.log(data) //testing
      localStorage.setItem('newClassInfo', JSON.stringify(data))

    } catch (error) {
      dispatch({
        type: 'CREATE_CLASS_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

