import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadEmployees, loadEmployeesSuccess } from './employee.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { EmployeeSelectApiService } from '../shared/employee-select/employee-select-api.service';
import { of } from 'rxjs';

@Injectable()
export class EmployeeEffects {
    loadEmployees$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadEmployees),
            mergeMap(() =>
                this.employeeService.getEmployees().pipe(
                    map((employees) => loadEmployeesSuccess({ employees })),
                    catchError((error) => {
                        console.log('Error fetching employees:', error);
                        return of();
                    })
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private employeeService: EmployeeSelectApiService
    ) {}
}
