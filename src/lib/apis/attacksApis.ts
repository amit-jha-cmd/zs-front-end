import GetOverviewPayloadInterface from "../interfaces/payloads/getOverviewPayloadInterface";
import AppClient from "./appClient";
import {AxiosInstance, AxiosResponse} from "axios";
import GetOverviewResponseInterface from "../interfaces/responses/getOverviewResponseInterface";
import AppResponseInterface from "../interfaces/responses/appResponseInterface";

class AttacksApis {
    public static overviewPath = "/attacks/overview";

    public static async overview(payload: GetOverviewPayloadInterface) {
        const appClient: AxiosInstance = AppClient.getInstance();

        return appClient.get<AppResponseInterface<GetOverviewResponseInterface[]>>(this.overviewPath, {
            params: payload
        });
    }

}

export default AttacksApis;