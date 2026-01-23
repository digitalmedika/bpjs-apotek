import { BridgingClient } from "../core/BridgingClient";
import { BpjsResponse, DphoItem, ListResponse, PoliItem, FaskesItem, SpesialistikItem } from "../types";

export class Referensi extends BridgingClient {
    async dpho() {
        return this.get<BpjsResponse<ListResponse<DphoItem>>>("/referensi/dpho");
    }

    async poli(keyword: string) {
        return this.get<BpjsResponse<ListResponse<PoliItem>>>(`/referensi/poli/${keyword}`);
    }

    async faskes(jenis: '1' | '2', nama: string) {
        // jenis: 1 = Faskes 1, 2 = Faskes 2/RS
        return this.get<BpjsResponse<ListResponse<FaskesItem>>>(`/referensi/ppk/${jenis}/${nama}`);
    }

    async settingApotek(kodeApotek: string) {
        return this.get<BpjsResponse<any>>(`/referensi/settingppk/read/${kodeApotek}`);
    }

    async spesialistik() {
        return this.get<BpjsResponse<ListResponse<SpesialistikItem>>>("/referensi/spesialistik");
    }

    async obat(jenis: 'J' | 'N', tanggal: string, filter?: string) {
        // jenis: J = Obat Jadi, N = Obat Non Jadi (Racikan)
        // tanggal: format YYYY-MM-DD
        // filter: optional, usually nama obat
        let url = `/referensi/obat/${jenis}/${tanggal}`;
        if (filter) {
            url += `/${filter}`;
        }
        return this.get<BpjsResponse<ListResponse<any>>>(url);
    }
}
