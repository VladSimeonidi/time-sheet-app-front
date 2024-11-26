export interface Leave {
    _id: string;
    employee: string;
    leave_type: string;
    start_date: Date;
    end_date: Date;
    status: 'approved' | 'pending' | 'denied' | '';
    createdAt: string;
    updatedAt: string;
    __v: number;
}
