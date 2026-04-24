import { afterEach, describe, expect, test } from "bun:test";
import { ApotekOnline } from "../src/ApotekOnline";

const config = {
    consId: "test-cons-id",
    secretKey: "test-secret-key",
    userKey: "test-user-key",
    baseUrl: "https://example.test",
    kdppk: "0112A017",
};

const originalFetch = globalThis.fetch;

afterEach(() => {
    globalThis.fetch = originalFetch;
});

describe("Resep unit tests", () => {
    test("simpan should post resep payload to sjpresep endpoint", async () => {
        const payload = {
            TGLSJP: "2021-08-05 18:13:11",
            REFASALSJP: "1202R0010318V000092",
            POLIRSP: "IPD",
            KDJNSOBAT: "3",
            NORESEP: "12346",
            IDUSERSJP: "USR-01",
            TGLRSP: "2021-08-05 00:00:00",
            TGLPELRSP: "2021-08-05 00:00:00",
            KdDokter: "0",
            iterasi: "0",
        };

        let capturedUrl: string | undefined;
        let capturedOptions: RequestInit | undefined;

        globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
            capturedUrl = input.toString();
            capturedOptions = init;

            return new Response(
                JSON.stringify({
                    metaData: {
                        code: "200",
                        message: "OK",
                    },
                    response: null,
                }),
                {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );
        }) as typeof fetch;

        const apotek = new ApotekOnline(config);
        const result = await apotek.resep.simpan(payload);

        expect(capturedUrl).toBe("https://example.test/sjpresep/v3/insert");
        expect(capturedOptions?.method).toBe("POST");
        expect(capturedOptions?.headers).toMatchObject({
            "X-cons-id": config.consId,
            "X-timestamp": expect.any(String),
            "X-signature": expect.any(String),
            "user_key": config.userKey,
            "Content-Type": "text/plain",
        });
        expect(capturedOptions?.body).toBe(JSON.stringify(payload));
        expect(result).toEqual({
            metaData: {
                code: "200",
                message: "OK",
            },
            response: null,
        });
    });

    test("daftar should post filter payload to daftarresep endpoint", async () => {
        const payload = {
            KdJnsObat: "0",
            JnsTgl: "TGLPELSJP",
            TglMulai: "2019-03-01 08:49:45",
            TglAkhir: "2019-03-31 06:18:33",
        };

        const daftarResep = [
            {
                NOSJP: "20210805181311",
                NORESEP: "12346",
                TGLSJP: "2021-08-05 18:13:11",
                TGLPELRSP: "2021-08-05 00:00:00",
                KDJNSOBAT: "3",
            },
        ];

        let capturedUrl: string | undefined;
        let capturedOptions: RequestInit | undefined;

        globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
            capturedUrl = input.toString();
            capturedOptions = init;

            return new Response(
                JSON.stringify({
                    metaData: {
                        code: "200",
                        message: "OK",
                    },
                    response: {
                        list: daftarResep,
                    },
                }),
                {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );
        }) as typeof fetch;

        const apotek = new ApotekOnline(config);
        const result = await apotek.resep.daftar(payload);

        expect(capturedUrl).toBe("https://example.test/daftarresep");
        expect(capturedOptions?.method).toBe("POST");
        expect(capturedOptions?.headers).toMatchObject({
            "X-cons-id": config.consId,
            "X-timestamp": expect.any(String),
            "X-signature": expect.any(String),
            "user_key": config.userKey,
            "Content-Type": "text/plain",
        });
        expect(capturedOptions?.body).toBe(JSON.stringify({ kdppk: config.kdppk, ...payload }));
        expect(result).toEqual({
            metaData: {
                code: "200",
                message: "OK",
            },
            response: {
                list: daftarResep,
            },
        });
    });
});
