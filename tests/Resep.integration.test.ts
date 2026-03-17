import { afterEach, describe, expect, test } from "bun:test";
import { ApotekOnline } from "../src/ApotekOnline";

const TEST_RESEP_REFERENCE = "1202R0010318V000092";
const TEST_RESEP_POLIRSP = "IPD";
const TEST_RESEP_KDJNSOBAT = "3";
const TEST_RESEP_IDUSERSJP = "USR-01";
const TEST_RESEP_KDDOKTER = "0";
const TEST_RESEP_ITERASI = "0";
const originalFetch = globalThis.fetch;

afterEach(() => {
    globalThis.fetch = originalFetch;
});

function formatDateTime(date: Date): string {
    const pad = (value: number) => String(value).padStart(2, "0");

    return [
        date.getFullYear(),
        pad(date.getMonth() + 1),
        pad(date.getDate()),
    ].join("-") + ` ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function buildPayload() {
    const now = new Date();
    const timestamp = Date.now().toString();
    const formattedNow = formatDateTime(now);

    return {
        TGLSJP: formattedNow,
        REFASALSJP: TEST_RESEP_REFERENCE,
        POLIRSP: TEST_RESEP_POLIRSP,
        KDJNSOBAT: TEST_RESEP_KDJNSOBAT,
        NORESEP: `TEST${timestamp}`,
        IDUSERSJP: TEST_RESEP_IDUSERSJP,
        TGLRSP: formattedNow,
        TGLPELRSP: formattedNow,
        KdDokter: TEST_RESEP_KDDOKTER,
        iterasi: TEST_RESEP_ITERASI,
    };
}

describe("Resep integration tests", () => {
    test("simpan should call BPJS dev endpoint and return success", async () => {
        const apotek = new ApotekOnline();
        const payload = buildPayload();
        let capturedUrl = "";
        let capturedMethod = "";
        let capturedBody = "";
        let responseStatus = 0;
        let responseContentType = "";
        let responsePreview = "";

        globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
            capturedUrl = input.toString();
            capturedMethod = init?.method || "GET";
            capturedBody = typeof init?.body === "string" ? init.body : "";

            const response = await originalFetch(input, init);
            const responseText = await response.text();

            responseStatus = response.status;
            responseContentType = response.headers.get("Content-Type") || "";
            responsePreview = responseText.slice(0, 400);

            return new Response(responseText, {
                status: response.status,
                statusText: response.statusText,
                headers: Array.from(response.headers.entries()),
            });
        }) as typeof fetch;

        const result = await apotek.resep.simpan(payload);

        if (typeof result === "string") {
            throw new Error([
                "BPJS returned non-JSON response.",
                `Request URL: ${capturedUrl}`,
                `Request method: ${capturedMethod}`,
                `HTTP status: ${responseStatus}`,
                `Content-Type: ${responseContentType || "-"}`,
                `Payload: ${JSON.stringify(payload)}`,
                `Request body: ${capturedBody}`,
                `Response preview: ${responsePreview || result.slice(0, 400)}`,
            ].join("\n"));
        }

        expect(result).toBeDefined();
        expect(result.metaData).toBeDefined();
        expect(result.metaData.code).toBe("200");
    }, 30000);
});
