import OverviewEntryInterface from 'lib/interfaces/overviewEntryInterface';

export interface GraphState {
    status: 'idle' | 'done',
    data: OverviewEntryInterface[],
    error: string | undefined,
    isLoading: boolean
}
