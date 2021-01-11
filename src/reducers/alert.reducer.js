import { appConstants } from '../helpers/app-constants';

export function alert(state = {}, action) {
  switch (action.type) {
    case appConstants.SUCCESS:
      return {
        class: 'alert-success',
        action_type:action.action_type,
        type:action.type,
        mode:action.mode,
        message: action.message
      };
    case appConstants.ERROR:
      return {
        class: 'alert-danger',
        action_type:action.action_type,
        mode:action.mode,
        type:action.type,
        message: action.message
      };
    case appConstants.CLEAR:
      return {};
    default:
      return state
  }
}