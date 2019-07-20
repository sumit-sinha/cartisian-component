import { useReducer } from 'react'

const SET = 'SET'
const RESET = 'RESET'

function formReducer(state, action) {
    if(action.type === SET) {
        return { ...state, [action.field]: action.payload }
    }

    if(action.type === RESET) {
        return {}
    }
}

export default (initialData = {}) => {
    const [formData, dispatch] = useReducer(formReducer, initialData)

    const updateField = ({ target }) => dispatch({
        type: SET,
        field: target.name,
        payload: target.value,
    })

    const resetForm = () => dispatch({ type: RESET })

    return { formData, updateField, resetForm }
}
