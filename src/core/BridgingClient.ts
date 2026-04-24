import { createHmac, createHash, createDecipheriv } from "node:crypto";
import lzString from "lz-string";

export interface BridgingConfig {
    consId: string;
    secretKey: string;
    userKey: string;
    baseUrl: string;
    kdppk: string;
}

export class BridgingClient {
    protected consId: string;
    protected secretKey: string;
    protected userKey: string;
    protected baseUrl: string;
    protected kdppk: string;

    constructor(config: BridgingConfig) {
        this.consId = config.consId;
        this.secretKey = config.secretKey;
        this.userKey = config.userKey;
        this.baseUrl = config.baseUrl;
        this.kdppk = config.kdppk;
    }

    private generateSignature(timestamp: string): string {
        const data = `${this.consId}&${timestamp}`;
        const signature = createHmac("sha256", this.secretKey)
            .update(data)
            .digest("base64");
        return signature;
    }

    private decrypt(encryptedText: string, timestamp: string): any {
        try {
            const key = createHash("sha256")
                .update(this.consId + this.secretKey + timestamp)
                .digest();
            const iv = key.subarray(0, 16);

            const decipher = createDecipheriv("aes-256-cbc", key, iv);
            let decrypted = decipher.update(encryptedText, "base64", "utf8");
            decrypted += decipher.final("utf8");

            const decompressed = lzString.decompressFromEncodedURIComponent(decrypted);
            if (!decompressed) return decrypted;
            try {
                return JSON.parse(decompressed);
            } catch {
                return decompressed; // Return string if json parse fails
            }
        } catch (error) {
            console.error("Decryption failed:", error);
            // In case of error (maybe it wasn't encrypted/compressed as expected), return original or null
            return encryptedText;
        }
    }

    protected async request<T = any>(
        endpoint: string,
        method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
        data?: any,
        requestOptions?: {
            contentType?: string;
        },
    ): Promise<T> {
        const timestamp = Math.floor(Date.now() / 1000).toString();
        const signature = this.generateSignature(timestamp);

        const headers: any = {
            "X-cons-id": this.consId,
            "X-timestamp": timestamp,
            "X-signature": signature,
            "user_key": this.userKey,
            "Content-Type": requestOptions?.contentType ?? "application/json",
        };

        const url = `${this.baseUrl}${endpoint}`;

        // request options
        const options: RequestInit = {
            method,
            headers,
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(url, options);
            const text = await response.text();

            try {
                const json = JSON.parse(text);

                // BPJS API usually returns a 'response' field that is encrypted
                if (json.response && typeof json.response === 'string') {
                    const decrypted = this.decrypt(json.response, timestamp);
                    return { ...json, response: decrypted } as T;
                }

                return json as T;
            } catch {
                // Return text if not JSON
                return text as unknown as T;
            }
        } catch (error) {
            console.error(`Error in request to ${url}:`, error);
            throw error;
        }
    }

    protected async get<T = any>(endpoint: string) {
        return this.request<T>(endpoint, 'GET');
    }

    protected async post<T = any>(endpoint: string, data: any) {
        return this.request<T>(endpoint, 'POST', data);
    }

    protected async postText<T = any>(endpoint: string, data: any) {
        return this.request<T>(endpoint, 'POST', data, {
            contentType: "text/plain",
        });
    }

    protected async put<T = any>(endpoint: string, data: any) {
        return this.request<T>(endpoint, 'PUT', data);
    }

    protected async delete<T = any>(endpoint: string, data?: any) {
        return this.request<T>(endpoint, 'DELETE', data);
    }
}
