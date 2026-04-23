import { BridgingClient } from "../core/BridgingClient";
import { BpjsResponse } from "../types";

export class Monitoring extends BridgingClient {
    async dataKlaim(bulan: string, tahun: string, jenisObat: string, status: string) {
        return this.get<BpjsResponse<any>>(`/monitoring/klaim/${bulan}/${tahun}/${jenisObat}/${status}`);
    }
}
