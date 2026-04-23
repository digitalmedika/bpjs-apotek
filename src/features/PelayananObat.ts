import { BridgingClient } from "../core/BridgingClient";
import { BpjsResponse, PelayananObatHapusRequest } from "../types";

export class PelayananObat extends BridgingClient {
    async hapus(data: PelayananObatHapusRequest) {
        return this.delete<BpjsResponse<any>>("/pelayanan/obat/hapus/", data);
    }

    async daftar(nomorSep: string) {
        return this.get<BpjsResponse<any>>(`/pelayanan/obat/daftar/${nomorSep}`);
    }

    async riwayat(awal: string, akhir: string, nomorKartu: string) {
        return this.get<BpjsResponse<any>>(`/riwayatobat/${awal}/${akhir}/${nomorKartu}`);
    }
}
