import producer from "immer";
const INITIAL_STATE = {
  user: null,
  company: null,
  menu: null,
  handlerMenu: false,
  handlerModal: false
};

export default function user(state = INITIAL_STATE, action) {
  return producer(state, draft => {
    switch (action.type) {
      case "@user/UPDATE_PROFILE_SUCCESS": {
        draft.user = action.payload.profile.profile;
        draft.company = action.payload.profile.company;
        break;
      }
      case "@auth/SIGN_IN_SUCCESS": {
        draft.user = action.payload.user.userConfig.user;
        draft.company = action.payload.user.company;
        draft.menu = action.payload.menu;
        break;
      }
      case "@auth/SIGN_OUT_REQUEST": {
        draft.user = null;
        draft.menu = null;
        break;
      }
      case "@user/HANDLER_MENU": {
        draft.handlerMenu = !draft.handlerMenu;
        break;
      }
      case "@user/HANDLER_MODAL": {
        draft.handlerModal = !draft.handlerModal;
        break;
      }
      case "@user/SET_ME": {
        draft.company = action.payload.company;
        break;
      }
      default: {
        // A ser implementado
      }
    }
  });
}
