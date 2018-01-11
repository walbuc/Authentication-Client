import ax from 'axios'
import { browserHistory } from 'react-router'//cambiar
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from './types'
const ROOT_URL = "https://server-vtlrdjlhgt.now.sh"

export function signinUser({ email, password }) {
  return function(dispatch) {
    //Submit pass and Email
    const request = ax.post(`${ROOT_URL}/signin`, { email, password })
    request
      .then(response => {
        //Case good, update state user auth
        dispatch({ type: AUTH_USER })
        //- Save the jwt token
        localStorage.setItem('token', response.data.token)
        //- Redirect to /feature
        browserHistory.push("/feature")

      })
      .catch(error => {
        //Case is bad
        //- Show error to user
        dispatch(authError("Invalid info"))
      })
  }
}

//replace browserHistory
export function signUpUser({ email, password }) {
  return function (dispatch)  {
    const request = ax.post(`${ROOT_URL}/signup`, { email, password })
    request.then(response => {
      dispatch({ type: AUTH_USER })
      localStorage.setItem('token', response.data.token)
      browserHistory.push('/feature')
    })
    .catch(({response: { data }}) => dispatch(authError(data.error)))
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signOutUser() {
  localStorage.removeItem('token')
  return { type: UNAUTH_USER }
}

//usar redux promise aca
export function fetchMessage() {
  return (dispatch) => {
    ax.get(ROOT_URL, { headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {
      dispatch({
        type: FETCH_MESSAGE,
        payload: response.data.message
      })
      console.log(response)
    })
  }
}
