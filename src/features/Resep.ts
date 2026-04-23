import { BridgingClient } from "../core/BridgingClient";
import { BpjsResponse, ResepSimpanRequest, ResepHapusRequest, ResepDaftarRequest, ResepItem } from "../types";

export class Resep extends BridgingClient {
    async simpan(data: ResepSimpanRequest) {
        return this.post<BpjsResponse<any>>("/sjpresep/v3/insert", data);
    }

    async hapus(data: ResepHapusRequest) {
        return this.delete<BpjsResponse<any>>("/hapusresep", data);
    }

    async daftar(data: ResepDaftarRequest) {
        return this.post<BpjsResponse<{ resep: ResepItem | ResepItem[] }>>("/daftarresep", { kdppk: this.kdppk, ...data });
    }
}
