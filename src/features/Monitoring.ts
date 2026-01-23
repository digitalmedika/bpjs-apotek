import { BridgingClient } from "../core/BridgingClient";

export class Monitoring extends BridgingClient {
    async dataKlaim(bulan: string, tahun: string, jenisObat: string, status: string) {
        // bulan: 01-12
        // tahun: YYYY
        // jenisObat: 0 = all, 1 = obat jadi, 2 = racikan (sample guess, check docs if specific codes needed)
        // status: 1 = delivered? (Need specific BPJS codes for status)
        return this.get(`/monitoring/klaim/${bulan}/${tahun}/${jenisObat}/${status}`);
    }
}
