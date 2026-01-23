import { describe, test, expect } from "bun:test";
import { ApotekOnline } from "../src/ApotekOnline";

// Config loaded from .env automatically by Bun
const apotek = new ApotekOnline();

describe("ApotekOnline Integration Tests", () => {

    // --- Referensi Tests ---
    describe("Referensi", () => {
        test("should fetch referensi dpho", async () => {
            const res = await apotek.referensi.dpho();
            expect(res).toBeDefined();
            expect(res.metaData.code).toBe("200");
            expect(res.metaData.message).toBe("OK");
        });

        test("should fetch referensi poli", async () => {
            const res = await apotek.referensi.poli("ICU");
            expect(res).toBeDefined();
            expect(res.metaData.code).toBe("200");
            expect(res.metaData.message).toBe("OK");
            expect(res.response).toBeDefined();
        });

        test("should fetch referensi spesialistik", async () => {
            const res = await apotek.referensi.spesialistik();
            expect(res).toBeDefined();
            expect(res.metaData.code).toBe("200");
            expect(res.metaData.message).toBe("OK");
        });
    });

    // --- SEP Tests ---
    // describe("SEP", () => {
    //     test("should search SEP (mock data)", async () => {
    //         // We probably don't have a valid SEP in dev environment that persists forever, 
    //         // but we can test the request goes through.
    //         const res = await apotek.sep.cari("0000000000000000000"); // invalid SEP
    //         expect(res).toBeDefined();
    //         // Expecting 201 or 404/Not Found logic from BPJS usually
    //     });
    // });

    // --- Resep Tests ---
    // Note: POST/DELETE tests might fail or create garbage data if run against real dev server without specific mocking IDs.
    // We will simple check if the method exists and helps structure the call.
    // describe("Resep", () => {
    //     test("should be able to validete daftar resep structure", async () => {
    //         // Just a basic connectivity test or "bad request" expectation
    //         const res = await apotek.resep.daftar({
    //             kdppk: "0193A008",
    //             // other required params usually needed
    //         });
    //         expect(res).toBeDefined();
    //     });
    // });

    // --- PRB Tests ---
    // describe("PRB", () => {
    //     test("should fetch rekap peserta prb", async () => {
    //         // Example params: 2024, 01. Expecting OK response structure.
    //         const res = await apotek.prb.rekapPeserta("2026", "01");
    //         console.log(res);
    //         expect(res).toBeDefined();

    //         // Depends on BPJS Sandbox data availability, might return code 201 (empty) or 200.
    //         // But we check that we got a valid response object.
    //         expect(res.metaData).toBeDefined();
    //         expect(res.metaData.code).toBe("200");
    //         expect(res.metaData.message).toBe("OK");
    //     });
    // });
});
