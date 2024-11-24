export interface SickLeave {
    _id: string;
    employee: string;
    leave_type: string;
    start_date: string;
    end_date: string;
    status: 'approved' | 'pending' | 'denied';
    createdAt: string;
    updatedAt: string;
    __v: number;
}
