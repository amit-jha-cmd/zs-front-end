import { AxiosInstance } from 'axios';
import AppClient from 'lib/apis/appClient';
import OverviewEntryInterface from 'lib/interfaces/overviewEntryInterface';
import AttackEntryInterface from 'lib/interfaces/attackEntryInterface';
import GetOverviewPayloadInterface from 'lib/apis/attacks/getOverviewPayloadInterface';
import AppResponseInterface from 'lib/interfaces/appResponseInterface';
import GetAttacksPayloadInterface from 'lib/apis/attacks/getAttacksPayloadInterface';

class AttacksApis {
  public static overviewPath = '/attacks/overview';

  public static inDateRange = '/attacks/in-date-range';

  public static async overview(payload: GetOverviewPayloadInterface) {
    const appClient: AxiosInstance = AppClient.getInstance();

    return appClient.get<AppResponseInterface<OverviewEntryInterface[]>>(this.overviewPath, {
      params: payload,
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
