import { afterEach, describe, expect, test } from "bun:test";
import { ApotekOnline } from "../src/ApotekOnline";
import { ObatNonRacikanSimpanRequest } from "../src/types";

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

describe("Obat unit tests", () => {
    test("simpanNonRacikan should post typed payload to obat non racikan insert endpoint", async () => {
        const payload: ObatNonRacikanSimpanRequest = {
            NOSJP: "0112A01704190000001",
            NORESEP: "01236",
            KDOBT: "123456",
            NMOBAT: "IVAN",
            SIGNA1OBT: 1,
            SIGNA2OBT: 1,
            JMLOBT: 1,
            JHO: 1,
            CatKhsObt: "TES",
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
        const result = await apotek.obat.simpanNonRacikan(payload);

        expect(capturedUrl).toBe("https://example.test/obatnonracikan/v3/insert");
        expect(capturedOptions?.method).toBe("POST");
        expect(capturedOptions?.headers).toMatchObject({
            "X-cons-id": config.consId,
            "X-timestamp": expect.any(String),
            "X-signature": expect.any(String),
            "user_key": config.userKey,
            "Content-Type": "application/x-www-form-urlencoded",
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
});
