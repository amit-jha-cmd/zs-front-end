import {AxiosInstance, AxiosResponse} from "axios";
import AppClient from "../appClient";
import OverviewEntryInterface from "../../interfaces/overviewEntryInterface";
import AttackEntryInterface from "../../interfaces/attackEntryInterface";
import GetOverviewPayloadInterface from "./getOverviewPayloadInterface";
import AppResponseInterface from "./appResponseInterface";
import GetAttacksPayloadInterface from "./getAttacksPayloadInterface";

class AttacksApis {
    public static overviewPath = "/attacks/overview";
    public static inDateRange = "/attacks/in-date-range";

    public static async overview(payload: GetOverviewPayloadInterface) {
        const appClient: AxiosInstance = AppClient.getInstance();

        return appClient.get<AppResponseInterface<OverviewEntryInterface[]>>(this.overviewPath, {
            params: payload
        });
    }


    public static async fetch(payload: GetAttacksPayloadInterface) {
        const appClient: AxiosInstance = AppClient.getInstance();

        return appClient.get<AppResponseInterface<AttackEntryInterface[]>>(this.inDateRange, {
            params: payload,
        });
    }
}

export default AttacksApis;