import { createSelector, createFeatureSelector } from '@ngrx/store';
import { EmployeeState } from './employee.reducers';

export const selectEmployeeState =
    createFeatureSelector<EmployeeState>('employees');

export const selectEmployees = createSelector(
    selectEmployeeState,
    (state) => state.employees
);
