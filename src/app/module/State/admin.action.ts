// admin.actions.ts

import { createAction, props } from '@ngrx/store';
import { User } from '../user';

export const loadUsers = createAction('[Admin] Load Users');
export const loadUsersSuccess = createAction('[Admin] Load Users Success', props<{ users: User[] }>());
export const loadUsersFail = createAction('[Admin] Load Users Fail', props<{ errormessage: string }>());
export const updateUser = createAction('[Admin] Update User', props<{ user: User }>());
export const updateUserSuccess = createAction('[Admin] Update User Success', props<{ user: User }>());
export const updateUserFailure = createAction('[Admin] Update User Failure', props<{ error: any }>());
export const deleteUser = createAction('[Admin] Delete User', props<{ userId: string }>());
export const deleteUserSuccess = createAction('[Admin] Delete User Success', props<{ userId: string }>());
export const deleteUserFailure = createAction('[Admin] Delete User Fail', props<{ error: string }>());
