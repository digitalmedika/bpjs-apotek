import { BridgingConfig } from "./core/BridgingClient";
import { Referensi } from "./features/Referensi";
import { Resep } from "./features/Resep";
import { Obat } from "./features/Obat";
import { PelayananObat } from "./features/PelayananObat";
import { SEP } from "./features/SEP";
import { Monitoring } from "./features/Monitoring";
import { Prb } from "./features/Prb";

export class ApotekOnline {
    public referensi: Referensi;
    public resep: Resep;
    public obat: Obat;
    public pelayananObat: PelayananObat;
    public sep: SEP;
    public monitoring: Monitoring;
    public prb: Prb;

    constructor(config?: Partial<BridgingConfig>) {
        const finalConfig: BridgingConfig = {
            consId: config?.consId || process.env.APOTEK_CONS_ID || "",
            secretKey: config?.secretKey || process.env.APOTEK_SECRET_KEY || "",
            userKey: config?.userKey || process.env.APOTEK_USER_KEY || "",
            baseUrl: config?.baseUrl || process.env.APOTEK_BASE_URL || "https://apijkn-dev.bpjs-kesehatan.go.id/apotek-rest-dev",
            kdppk: config?.kdppk || process.env.APOTEK_KDPPK || "",
        };

        // Basic validation
        if (!finalConfig.consId || !finalConfig.secretKey || !finalConfig.userKey) {
            throw new Error("Missing BPJS Bridging Configuration. Provide it in constructor or .env file.");
        }

        this.referensi = new Referensi(finalConfig);
        this.resep = new Resep(finalConfig);
        this.obat = new Obat(finalConfig);
        this.pelayananObat = new PelayananObat(finalConfig);
        this.sep = new SEP(finalConfig);
        this.monitoring = new Monitoring(finalConfig);
        this.prb = new Prb(finalConfig);
    }
}
