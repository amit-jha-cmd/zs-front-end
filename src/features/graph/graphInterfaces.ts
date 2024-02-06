import GetOverviewResponseInterface from "../../lib/interfaces/responses/getOverviewResponseInterface";

export interface GraphState {
    status: "idle" | "done",
    data: GetOverviewResponseInterface[],
    error: string | undefined,
    isLoading: boolean
}
