import { BridgingClient } from "../core/BridgingClient";

export class Resep extends BridgingClient {
    async simpan(data: any) {
        return this.post("/sjpresep/v3/insert", data);
    }

    async hapus(data: any) {
        return this.delete("/hapusresep", data);
    }

    async daftar(data: any) {
        return this.post("/daftarresep", { kdppk: this.kdppk, ...data });
    }
}
