import { BridgingClient } from "../core/BridgingClient";

export class SEP extends BridgingClient {
    async cari(nomorSep: string) {
        return this.get(`/sep/${nomorSep}`);
    }
}
