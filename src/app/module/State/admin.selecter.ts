import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AdminState } from "./admin.reducer";


const getAdminstate = createFeatureSelector<AdminState>('user');

export const getuserlist = createSelector(
    getAdminstate,
    (state: AdminState) => state.users
  );