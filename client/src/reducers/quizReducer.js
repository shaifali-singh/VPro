export const getQuizReducer = (state={},action)=>{
    switch(action.type){
        case 'GET_QUIZ_REQ':
            return {loading:true}

        case 'GET_QUIZ_SUCCESS':
            return {loading:false, quizInfo:action.payload}
            
        case 'GET_QUIZ_FAIL':
            return {loading:false, error:action.payload}
        default:
            return state    
    }
}


