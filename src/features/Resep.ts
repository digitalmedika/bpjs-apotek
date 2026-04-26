import { BridgingClient } from "../core/BridgingClient";
import { BpjsResponse, ResepSimpanRequest, ResepHapusRequest, ResepHapusResponse, ResepDaftarRequest, ResepItem } from "../types";

export class Resep extends BridgingClient {
    async simpan(data: ResepSimpanRequest) {
        return this.postText<BpjsResponse<any>>("/sjpresep/v3/insert", data);
    }

    async hapus(data: ResepHapusRequest) {
        return this.delete<BpjsResponse<ResepHapusResponse>>("/hapusresep", data, "application/x-www-form-urlencoded");
    }

    async daftar(data: ResepDaftarRequest) {
        return this.postText<BpjsResponse<{ resep: ResepItem | ResepItem[] }>>("/daftarresep", { kdppk: this.kdppk, ...data });
    }
}
