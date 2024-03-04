import { Action, createReducer, on } from "@ngrx/store";
import { loadUsers, loadUsersSuccess } from "./admin.action";
import { User } from "../user";
import * as adminActions from './admin.action';

export interface AdminState {
    [x: string]: any;
    users: User[];
  }
  
  export const initialState: AdminState = {
    users: [],
  };
  
  const AdminReducer = createReducer(initialState,
    on(adminActions.loadUsersSuccess, (state, { users }) => {
    //   console.log('State before update:', state);
    //   console.log('Action payload:', users);
      return {
        ...state,
        users: [...users],
      };
    }),
    on(adminActions.updateUserSuccess, (state, { user }) => {
        const index = state.users.findIndex(u => u.userName === user.userName);
        if (index !== -1) {
          const updatedUsers = [...state.users];
          updatedUsers[index] = user;
    
          return {
            ...state,
            users: updatedUsers
          };
        }
    
        return state;
      }),
      on(adminActions.deleteUserSuccess, (state, { userId }) => {
        return {
          ...state,
          users: state.users.filter(user => user.userName !== userId),
        };
      })
  );
  


export function adminReducer(state: any, action:any) {
    return AdminReducer(state, action);
}