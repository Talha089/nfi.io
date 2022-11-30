import { PURGE } from "redux-persist";

let initialState = {
  publicAddress: '',
}

const Auth = (state = initialState, { type, payload }) => {
  switch (type) {

    case 'LOGIN':
      return {
        ...state,
        publicAddress: payload,
      };

    case 'LOGOUT':
      return {
        ...state,
        publicAddress: '',
      };

    default:
      return state;
  }
};

export default Auth;