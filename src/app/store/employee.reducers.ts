import { createReducer, on } from '@ngrx/store';
import { loadEmployeesSuccess } from './employee.actions';
import { Employee } from '../interfaces/employee';

export interface EmployeeState {
    employees: Employee[];
}

export const initialState: EmployeeState = {
    employees: [],
};

export const employeeReducer = createReducer(
    initialState,
    on(loadEmployeesSuccess, (state, { employees }) => ({
        ...state,
        employees,
    }))
);
