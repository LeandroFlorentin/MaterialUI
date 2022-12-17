import axios from 'axios'

export const SUMAR = "SUMAR";
export const RESTAR = "RESTAR";
export const PERSONAJES = "PERSONAJES"
export const MODO = "MODO";

export const sumar = (cambio) => (dispatch) => {
    return dispatch({ type: MODO, payload: !cambio })
}

export const restar = () => dispatch => {
    return dispatch({ type: RESTAR, payload: 1 })
}

export const traerPersonajes = () => async dispatch => {
    let personajes = await axios.get('http://ddragon.leagueoflegends.com/cdn/12.23.1/data/es_MX/champion.json')
    let arrayPersonajes = Object.keys(personajes.data.data).map(function (key) { return personajes.data.data[key] })
    let arrayConImagen = arrayPersonajes.map(ele => ({ ...ele, imagen: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${ele.id}_0.jpg` }))
    return dispatch({ type: PERSONAJES, payload: arrayConImagen })
}