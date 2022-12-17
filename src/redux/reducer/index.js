import {
    SUMAR,
    RESTAR,
    PERSONAJES,
    MODO
} from '../actions/index.js'

const initialState = {
    numero: 0,
    personajes: [],
    arrayRecortado: [],
    modo: true
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case MODO:
            return {
                ...state,
                modo: action.payload
            }
        case SUMAR:
            return {
                ...state,
                numero: state.numero + action.payload
            }
        case RESTAR:
            return {
                ...state,
                numero: state.numero - action.payload
            }
        case PERSONAJES:
            return {
                ...state,
                personajes: action.payload
            }
        default:
            return state
    }
}

export default rootReducer;
