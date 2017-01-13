import { renameList, addLaserDisc } from './apiServer';

/* action types */
const EDIT_LIST_NAME = "EDIT_LIST_NAME";
const SAVE_LIST_NAME = "SAVE_LIST_NAME";
const ENTER_LASERDISC = "ENTER_LASERDISC";

const OPEN_ADD_MODAL = "OPEN_ADD_MODAL";
const OPEN_IMPORT_MODAL = "OPEN_IMPORT_MODAL";
const OPEN_SHARE_MODAL = "OPEN_SHARE_MODAL";
const CLOSE_MODAL = "CLOSE_MODAL";

const RESIZE_WINDOW = "RESIZE_WINDOW";

/* action creators */
export function editListName() {
  return {
    type: EDIT_LIST_NAME,
    editAction: 'listName'
  };
}

export function saveListName(dispatch, listId, listName, userId, token) {
  dispatch(renameList(dispatch, listId, listName, userId, token));
  return {
    type: SAVE_LIST_NAME
  };
}

export function enterLaserDisc(dispatch, listId, title, lddbNumber, userId, token) {
  dispatch(addLaserDisc(dispatch, listId, title, lddbNumber, userId, token));
  return {
    type: ENTER_LASERDISC
  }
}

export function openAddModal() {
  return {
    type: OPEN_ADD_MODAL
  }
}

export function openImportModal() {
  return {
    type: OPEN_IMPORT_MODAL
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

export function resizeWindow(width) {
  return {
    type: RESIZE_WINDOW,
    size: Math.floor(width/200)
  }
}

/* reducer */
export default function listState(
    listState = {
      editAction: null,
      modal: null,
      size: 3
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
    case OPEN_IMPORT_MODAL:
      return Object.assign({}, listState, {modal: 'import'});
    case CLOSE_MODAL:
      return Object.assign({}, listState, {modal: null});
    case RESIZE_WINDOW:
      return Object.assign({}, listState, {size: action.size});
    default:
      return listState;
  }
}
