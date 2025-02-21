import { Employee } from './employee';

export interface SummaryEmployee {
    date: Date;
    day_of_week: string;
    type: 'Work' | 'Leave' | null;
    start_time?: Date | null;
    end_time?: Date | null;
    total_hours?: number | null;
    status: string | null;
    leave_type?: string | null;
}

export interface EmployeeSummaryResponse {
    weeklySummary: SummaryEmployee[];
    employee: Employee;
}
