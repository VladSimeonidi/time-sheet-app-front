import { LazyLoadEvent } from 'primeng/api';

export abstract class BasePaginationService {
    private lastPaginationEvent: LazyLoadEvent;

    public getLastPaginationEvent(): LazyLoadEvent {
        return this.lastPaginationEvent;
    }
    public calculatePagination(event: LazyLoadEvent): {
        pageNumber: number;
        pageSize: number;
    } {
        this.lastPaginationEvent = event;

        const pageNumber = event.first / event.rows + 1;

        const pageSize = event.rows;

        return { pageNumber, pageSize };
    }
}
