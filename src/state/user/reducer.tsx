/* eslint-disable @typescript-eslint/no-explicit-any */
import { Actions } from './@types/actions';

const userReducer = (state: any, action: any) => {
  switch (action.type) {
    case Actions.SET_USER_DATA:
      return {
        ...state,
        user: {
          ...state.user,
          id: action.payload.id,
          role: action.payload.role,
          email: action.payload.email,
          avatar: action.payload.avatar,
          username: action.payload.username
        }
      };

    default:
      return {};
  }
};

export default userReducer;
