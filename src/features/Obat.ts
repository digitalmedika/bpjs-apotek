import { BridgingClient } from "../core/BridgingClient";

export class Obat extends BridgingClient {
    async simpanNonRacikan(data: any) {
        return this.post("/obatnonracikan/v3/insert", data);
    }

    async simpanRacikan(data: any) {
        return this.post("/obatracikan/v3/insert", data);
    }

    async updateStok(data: any) {
        return this.post("/UpdateStokObat/updatestok", data);
    }
}
