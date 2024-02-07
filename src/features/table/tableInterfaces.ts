import AttackEntryInterface from 'lib/interfaces/attackEntryInterface';

export interface TableState {
    status: 'idle' | 'done',
    data: AttackEntryInterface[],
    error: string | undefined,
    isLoading: boolean,
    pageNumber: number;
    sortBy: string | undefined,
    selectedColumns: string[],
}
