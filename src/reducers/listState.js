import { renameList, addLaserdisc } from './apiServer';

/* action types */
const EDIT_LIST_NAME = "EDIT_LIST_NAME";
const SAVE_LIST_NAME = "SAVE_LIST_NAME";
const ADDING_LASERDISC = "ADDING_LASERDISC";
const FINISH_ADDING_LASERDISC = "FINISH_ADDING_LASERDISC";


/* action creators */
export function editListName() {
  return {
    type: EDIT_LIST_NAME
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
      editingList: false,
      addingLaserdisc: false
    }, action
  ) {
  switch(action.type) {
    case EDIT_LIST_NAME:
      return Object.assign({}, listState, {editingList: true});
    case SAVE_LIST_NAME:
      return Object.assign({}, listState, {
        editingList: false,
        listId: action.listId
      });
    case ADDING_LASERDISC:
      return Object.assign({}, listState, {
        editingList: false,
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
