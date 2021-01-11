import { appConstants } from '../helpers/app-constants';

export function collapsed(state = { visible: false }, action) {
    switch (action.type) {
        case "SHOW":
            console.log("show"); 
            return { ...state, visible: true };
        case "HIDE":
            console.log("hide");
            return { ...state, visible: false };
     default:
        return state;
      }
}