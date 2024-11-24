import { TimeSheetStatus } from '../enums/timesheet-status.enum';

export interface TimeSheet {
    _id: string;
    employee: string;
    date: Date;
    start_time: Date;
    end_time: Date;
    breaks: boolean;
    total_hours_worked: number;
    timesheet_status: TimeSheetStatus | '';
    createdAt: string;
    updatedAt: string;
    __v: number;
}
