import { BridgingClient } from "../core/BridgingClient";
import { BpjsResponse, SepData } from "../types";

export class SEP extends BridgingClient {
    async cari(nomorSep: string) {
        return this.get<BpjsResponse<SepData>>(`/sep/${nomorSep}`);
    }
}
