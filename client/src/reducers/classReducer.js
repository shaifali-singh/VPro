export const createClassReducer = (state={},action)=>{
    switch(action.type){
        case 'CREATE_CLASS_REQ':
            return {loading:true}

        case 'CREATE_CLASS_SUCCESS':
            return {loading:false, newClassInfo:action.payload}
            
        case 'CREATE_CLASS_FAIL':
            return {loading:false, error:action.payload}
        default:
            return state    
    }
}
