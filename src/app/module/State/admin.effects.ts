// admin.effects.ts

import { Injectable } from '@angular/core';
import {  Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import * as adminActions from './admin.action';
import { UserService } from '../../Service/user.service';
import { loadUsersSuccess ,updateUserSuccess ,updateUserFailure } from './admin.action';


@Injectable()
export class AdminEffects {

  loadUsers$ = createEffect(() => 
  this.actions$.pipe(
    ofType(adminActions.loadUsers),
    exhaustMap((action) => 
      this.userService.getAllUser().pipe(
        map((data) => loadUsersSuccess({ users: data })),
        catchError((_error) => of(adminActions.loadUsersFail({ errormessage: _error.message })))
      )
    )
  )
);

updateUser$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(adminActions.updateUser),
    exhaustMap((action) => {
      return this.userService.updateUser(action.user).pipe(
        map((updatedUser) => adminActions.updateUserSuccess({ user: updatedUser })),
        catchError((error) => of(adminActions.updateUserFailure({ error })))
      );
    })
  );
});

deleteUsers$ = createEffect(() =>
this.actions$.pipe(
  ofType(adminActions.deleteUser),
  exhaustMap(action =>
    this.userService.deleteUser(action.userId).pipe(
      map(() => adminActions.deleteUserSuccess({ userId: action.userId })),
      catchError(error => of(adminActions.deleteUserFailure({ error })))
    )
  )
)
);

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
}
// function loadUserFail(arg0: { errormessage: any; }): any {
//   throw new Error('Function not implemented.');
// }

