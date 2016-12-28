import { fetchList } from './apiServer';

/* action types */
const INIT_API = "INIT_API";
const USER_STATUS = "USER_STATUS";
const USER_DATA = "USER_DATA";
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const FETCH_USER_DATA = "FETCH_USER_DATA";

/* action creators */
export function initAPI(dispatch, FB, listId) {
  FB.getLoginStatus((authResponse) => {
    dispatch(userStatus(authResponse.status));
    if (authResponse.status === 'connected') {
      dispatch(fetchUserData(dispatch, FB, listId));
    }
  });
  return {
    type: INIT_API,
    FB
  };
}

export function userStatus(status) {
  return {
    type: USER_STATUS,
    status
  };
}

export function login(dispatch, FB, listId) {
  FB.login((authResponse) => {
    if(authResponse) {
      dispatch(userStatus(authResponse.status));
      dispatch(fetchUserData(dispatch, FB, listId));
    }
  });
  return {
    type: LOGIN
  };
}

export function logout(dispatch, FB, listId) {
  FB.logout(() => {
    if (listId) {
      dispatch(fetchList(dispatch, listId));
    }
  });
  return {
    type: LOGOUT
  };
}

export function fetchUserData(dispatch, FB, listId) {
  FB.api("/me?fields=id,name,picture{url}", (response) => {
    if (!response || response.error) { /* handle error */ }
    dispatch(userData(response.id,
                      response.name,
                      response.picture.data.url));
    if (listId) {
      dispatch(fetchList(dispatch, listId, response.id));
    }
  });
  return {
    type: FETCH_USER_DATA
  };
}

export function userData(id, name, picture) {
  return {
    type: USER_DATA,
    id,
    name,
    picture
  };
}

/* reducer */
export default function facebookAPI(
    facebookAPI = {
      FB: null,
      status: null, name: null, id: null, picture: null
    }, action
  ) {
  switch(action.type) {
    case INIT_API:
      return Object.assign({}, facebookAPI, {FB: action.FB});
    case USER_STATUS:
      return Object.assign({}, facebookAPI, {status: action.status});
    case USER_DATA:
      return Object.assign({}, facebookAPI, {
        id: action.id, name: action.name, picture: action.picture
      });
    case LOGOUT:
      return Object.assign({}, facebookAPI, {
        id:null, name:null, picture:null, status:null
      });
    default:
      return facebookAPI;
  }
}
