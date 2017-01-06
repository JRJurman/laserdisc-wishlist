import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router'

/* action types */
const CREATE_NEW_LIST = "CREATE_NEW_LIST";
const LIST_CREATED = "LIST_CREATED";
const FETCH_LIST = "FETCH_LIST";
const LIST_DATA = "LIST_DATA";
const RENAME_LIST = "RENAME_LIST";
const ADD_LASERDISC = "ADD_LASERDISC";
const REMOVE_LASERDISC = "REMOVE_LASERDISC";
const IMPORT_LDDB_LIST = "IMPORT_LDDB_LIST";
const CONNECT_USER = "CONNECT_USER";
const DISCONNECT_USER = "DISCONNECT_USER";

const apiHost = 'http://localhost:8000';

/* action creators */
export function createNewList(dispatch) {
  fetch(`${apiHost}/newList`, {method: 'POST'})
    .then(function(res) {
      return res.text()
    })
    .then(function(listId) {
      dispatch(listCreated(listId));
    });
  return {
    type: CREATE_NEW_LIST
  };
}

export function listCreated(listId) {
  browserHistory.push(`/lists/${listId}/`);
  return {
    type: LIST_CREATED,
    listId: listId
  };
}

export function fetchList(dispatch, listId, userId) {
  fetch(`${apiHost}/lists/${listId}`, {
    headers: {
      'User': userId
    },
  })
    .then(function(res) {
      return res.text();
    })
    .then(function(list) {
      dispatch(listData(JSON.parse(list)));
    });
  return {
    type: FETCH_LIST
  };
}

export function listData(list) {
  if (list.err) {return}
  return {
    type: LIST_DATA,
    list: list
  };
}

export function renameList(dispatch, listId, listName, userId, token) {
  fetch(`${apiHost}/lists/${listId}/rename`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'User': userId,
      'Token': token
    },
    body: JSON.stringify({listName})
  })
    .then(function(res) {
      return res.text();
    })
    .then(function(list) {
      dispatch(listData(JSON.parse(list)));
    });
  return {
    type: RENAME_LIST
  };
}

export function connectUser(dispatch, listId, userId, token) {
  fetch(`${apiHost}/lists/${listId}/connectUser`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'User': userId,
      'Token': token
    }
  })
    .then(function(res) {
      return res.text();
    })
    .then(function(list) {
      dispatch(listData(JSON.parse(list)));
    });
  return {
    type: CONNECT_USER
  };
}

export function disconnectUser(dispatch, listId, userId, token) {
  fetch(`${apiHost}/lists/${listId}/disconnectUser`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'User': userId,
      'Token': token
    }
  })
    .then(function(res) {
      return res.text();
    })
    .then(function(list) {
      dispatch(listData(JSON.parse(list)));
    });
  return {
    type: DISCONNECT_USER
  };
}

export function addLaserDisc(dispatch, listId, title, lddbNumber, userId, token) {
  fetch(`${apiHost}/lists/${listId}/addLaserDisc`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'User': userId,
      'Token': token
    },
    body: JSON.stringify({title, lddbNumber})
  })
    .then(function(res) {
      return res.text()
    })
    .then(function(list) {
      dispatch(listData(JSON.parse(list)));
    });
  return {
    type: ADD_LASERDISC
  };
}

export function removeLaserDisc(dispatch, listId, title, lddbNumber, userId, token) {
  fetch(`${apiHost}/lists/${listId}/removeLaserDisc`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'User': userId,
      'Token': token
    },
    body: JSON.stringify({title, lddbNumber})
  })
    .then(function(res) {
      return res.text()
    })
    .then(function(list) {
      dispatch(listData(JSON.parse(list)));
    });
  return {
    type: REMOVE_LASERDISC
  };
}

export function importLDDBList(dispatch, listId, laserDiscs, userId, token) {
  fetch(`${apiHost}/lists/${listId}/importLDDBList`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'User': userId,
      'Token': token
    },
    body: JSON.stringify({laserDiscs})
  })
    .then(function(res) {
      return res.text()
    })
    .then(function(list) {
      dispatch(listData(JSON.parse(list)));
    });
  return {
    type: IMPORT_LDDB_LIST
  };
}

/* reducer */
export default function apiServer(apiServer = {
  creatingList: false,
  fetchingList: false
}, action) {
  switch(action.type) {
    case CREATE_NEW_LIST:
      return Object.assign({}, apiServer, {creatingList: true});
    case LIST_CREATED:
      return Object.assign({}, apiServer, {
        creatingList: false,
        listId: action.listId
      });
    case FETCH_LIST:
      return Object.assign({}, apiServer, {fetchingList: true});
    case LIST_DATA:
      return Object.assign({}, apiServer, {
        fetchingList: false,
        list: action.list
      });
    default:
      return apiServer;
  }
}
