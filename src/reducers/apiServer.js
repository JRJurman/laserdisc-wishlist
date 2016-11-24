import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router'

/* action types */
const CREATE_NEW_LIST = "CREATE_NEW_LIST";
const LIST_CREATED = "LIST_CREATED";
const FETCH_LIST = "FETCH_LIST";
const LIST_DATA = "LIST_DATA";
const RENAME_LIST = "RENAME_LIST";

/* action creators */
export function createNewList(dispatch) {
  fetch('http://localhost:8000/newList', {method: 'POST'})
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

export function fetchList(dispatch, listId) {
  fetch(`http://localhost:8000/lists/${listId}`)
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
  return {
    type: LIST_DATA,
    list: list
  };
}

export function renameList(dispatch, listId, listName) {
  fetch(`http://localhost:8000/lists/${listId}/rename`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
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

/* reducer */
export default function apiServer(apiServer = {}, action) {
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