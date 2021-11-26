// GET A CLASS PROFILE
export const getAQuiz = (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'GET_QUIZ_REQ',
      })
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          "Authorization":"Bearer "+ localStorage.getItem("jwt")
        },
      }
  
      const { data } = await axios.get(
        `/api/quiz/${id}`,config )
  
      dispatch({
        type: 'GET_QUIZ_SUCCESS',
        payload: data,
      })
      
    } catch (error) {
      dispatch({
        type: 'GET_QUIZ_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }  
  