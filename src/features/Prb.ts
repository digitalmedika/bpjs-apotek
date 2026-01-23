import { BridgingClient } from "../core/BridgingClient";
import { BpjsResponse, ListResponse, PrbItem } from "../types";

export class Prb extends BridgingClient {
    async rekapPeserta(tahun: string, bulan: string) {
        return this.get<BpjsResponse<ListResponse<PrbItem>>>(`/Prb/rekappeserta/tahun/${tahun}/bulan/${bulan}`);
    }
}
