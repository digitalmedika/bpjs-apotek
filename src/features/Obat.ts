import { BridgingClient } from "../core/BridgingClient";
import { BpjsResponse, ObatNonRacikanSimpanRequest, ObatRacikanSimpanRequest, ObatUpdateStokRequest } from "../types";

export class Obat extends BridgingClient {
    async simpanNonRacikan(data: ObatNonRacikanSimpanRequest) {
        return this.post<BpjsResponse<any>>("/obatnonracikan/v3/insert", data);
    }

    async simpanRacikan(data: ObatRacikanSimpanRequest) {
        return this.post<BpjsResponse<any>>("/obatracikan/v3/insert", data);
    }

    async updateStok(data: ObatUpdateStokRequest) {
        return this.post<BpjsResponse<any>>("/UpdateStokObat/updatestok", data);
    }
}
