import { appConstants } from '../helpers/app-constants';

export function loader(state = {}, action) {
  switch (action.type) {
    case appConstants.FADEIN:
      return {
        type: true,
        message: action.message
      };
    case appConstants.FADEOUT:
      return {
        type: false,
        message: action.message
      };
    default:
      return state
  }
}