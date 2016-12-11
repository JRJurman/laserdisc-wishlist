import { renameList, addLaserdisc } from './apiServer';

/* action types */
const EDIT_LIST_NAME = "EDIT_LIST_NAME";
const SAVE_LIST_NAME = "SAVE_LIST_NAME";
const ADDING_LASERDISC = "ADDING_LASERDISC";
const FINISH_ADDING_LASERDISC = "FINISH_ADDING_LASERDISC";

/* action creators */
export function editListName() {
  return {
    type: EDIT_LIST_NAME,
    editAction: 'listName'
  };
}

export function saveListName(dispatch, listId, listName) {
  dispatch(renameList(dispatch, listId, listName));
  return {
    type: SAVE_LIST_NAME
  };
}

export function addingLaserdisc() {
  return {
    type: ADDING_LASERDISC
  }
}

export function finishAddingLaserdisc(dispatch, listId, title, lddbNumber) {
  dispatch(addLaserdisc(dispatch, listId, title, lddbNumber));
  return {
    type: FINISH_ADDING_LASERDISC
  }
}

/* reducer */
export default function listState(
    listState = {
      addingLaserdisc: false,
      editAction: null
    }, action
  ) {
  switch(action.type) {
    case EDIT_LIST_NAME:
      return Object.assign({}, listState, {
        editAction: action.editAction
      });
    case SAVE_LIST_NAME:
      return Object.assign({}, listState, {
        editAction: null
      });
    case ADDING_LASERDISC:
      return Object.assign({}, listState, {
        addingLaserdisc: true
      });
    case FINISH_ADDING_LASERDISC:
      return Object.assign({}, listState, {
        addingLaserdisc: false
      });
    default:
      return listState;
  }
}
