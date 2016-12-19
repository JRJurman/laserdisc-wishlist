import { renameList, addLaserDisc } from './apiServer';

/* action types */
const EDIT_LIST_NAME = "EDIT_LIST_NAME";
const SAVE_LIST_NAME = "SAVE_LIST_NAME";
const ENTER_LASERDISC = "ENTER_LASERDISC";

const OPEN_SHARE_MODAL = "OPEN_SHARE_MODAL";
const OPEN_ADD_MODAL = "OPEN_ADD_MODAL";
const CLOSE_MODAL = "CLOSE_MODAL";

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

export function enterLaserDisc(dispatch, listId, title, lddbNumber) {
  dispatch(addLaserDisc(dispatch, listId, title, lddbNumber));
  return {
    type: ENTER_LASERDISC
  }
}

export function openAddModal() {
  return {
    type: OPEN_ADD_MODAL
  }
}

export function openShareModal() {
  return {
    type: OPEN_SHARE_MODAL
  }
}

export function closeModal() {
  return {
    type: CLOSE_MODAL
  }
}

/* reducer */
export default function listState(
    listState = {
      editAction: null,
      modal: null
    }, action
  ) {
  switch(action.type) {
    case EDIT_LIST_NAME:
      return Object.assign({}, listState, {editAction: action.editAction});
    case SAVE_LIST_NAME:
      return Object.assign({}, listState, {editAction: null});
    case ENTER_LASERDISC:
      return Object.assign({}, listState, {modal: null});
    case OPEN_SHARE_MODAL:
      return Object.assign({}, listState, {modal: 'share'});
    case OPEN_ADD_MODAL:
      return Object.assign({}, listState, {modal: 'add'});
    case CLOSE_MODAL:
      return Object.assign({}, listState, {modal: null});
    default:
      return listState;
  }
}
