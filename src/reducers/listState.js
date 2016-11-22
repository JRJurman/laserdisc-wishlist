import { renameList } from './apiServer';

/* action types */
const EDIT_LIST_NAME = "EDIT_LIST_NAME";
const SAVE_LIST_NAME = "SAVE_LIST_NAME";

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

/* reducer */
export default function listState(listState = {editingList: false}, action) {
  switch(action.type) {
    case EDIT_LIST_NAME:
      return Object.assign({}, listState, {editingList: true});
    case SAVE_LIST_NAME:
      return Object.assign({}, listState, {
        editingList: false,
        listId: action.listId
      });
    default:
      return listState;
  }
}
