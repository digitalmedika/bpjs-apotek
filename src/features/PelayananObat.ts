import { BridgingClient } from "../core/BridgingClient";

export class PelayananObat extends BridgingClient {
    async hapus(data: any) {
        return this.delete("/pelayanan/obat/hapus/", data);
    }

    async daftar(nomorSep: string) {
        return this.get(`/pelayanan/obat/daftar/${nomorSep}`);
    }

    async riwayat(awal: string, akhir: string, nomorKartu: string) {
        // awal, akhir: YYYY-MM-DD
        return this.get(`/riwayatobat/${awal}/${akhir}/${nomorKartu}`);
    }
}
