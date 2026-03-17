# BPJS Apotek Online Bridging API (Unofficial)

Library TypeScript/Bun untuk melakukan bridging dengan layanan **Apotek Online (Apon)** dari BPJS Kesehatan. Library ini menangani seluruh proses otentikasi (Signature), enkripsi/dekripsi data, dan kompresi (LZ-String) secara otomatis.

## Fitur Utama

*   ✅ **Otentikasi Otomatis**: Generate `X-cons-id`, `X-timestamp`, `X-signature` secara otomatis.
*   ✅ **Auto Decryption**: Respon terenkripsi dari BPJS langsung didekripsi (AES + LZ-String) sehingga siap pakai.
*   ✅ **Type-Safe**: Menggunakan TypeScript dengan interface yang didefinisikan untuk response API.
*   ✅ **Modular**: Terbagi berdasarkan modul fungsi (Referensi, Resep, SEP, dll).
*   ✅ **Tests Included**: Dilengkapi dengan Integration Test menggunakan Bun Test Runner.

## Prasyarat

*   [Bun](https://bun.sh/) runtime environment.

## Instalasi

Install package dari npm registry:

```bash
bun add @digitalmedika/bpjs-apotek
```

## Konfigurasi

Buat file `.env` pada root project Anda dan isi dengan kredensial bridging Apotek Online:

```env
APOTEK_CONS_ID=no_cons_id_anda
APOTEK_SECRET_KEY=secret_key_anda
APOTEK_USER_KEY=user_key_anda
APOTEK_BASE_URL=https://apijkn-dev.bpjs-kesehatan.go.id/apotek-rest-dev
```

## Cara Penggunaan

Library ini dirancang agar mudah digunakan tanpa perlu memikirkan proses enkripsi/dekripsi.

### Inisialisasi

```typescript
import { ApotekOnline } from "@digitalmedika/bpjs-apotek";

// Opsi 1: Otomatis load dari .env
const apotek = new ApotekOnline();

// Opsi 2: Manual Configuration
const apotek = new ApotekOnline({
    consId: "12345",
    secretKey: "secret",
    userKey: "userkey",
    baseUrl: "https://api.bpjs..."
});
```

### Contoh Request

Setiap method mengembalikan Promise yang berisi object response BPJS yang sudah didekripsi.

```typescript
// 1. Cek Referensi Poli
const response = await apotek.referensi.poli("ICU");

if (response.metaData.code === "200") {
    console.log("Daftar Poli:", response.response.list);
} else {
    console.error("Error:", response.metaData.message);
}

// 2. Cek Referensi DPHO
const dpho = await apotek.referensi.dpho();

// 3. Cari SEP
const sep = await apotek.sep.cari("1234567890123456789");
```

## Daftar Modul API

Library ini mencakup modul-modul berikut sesuai dokumentasi BPJS Apotek Online:

### 1. Referensi (`apotek.referensi`)
*   `dpho()`: Ambil daftar obat DPHO.
*   `poli(keyword)`: Cari poli.
*   `faskes(jenis, nama)`: Cari Faskes 1 atau RS.
*   `settingApotek(kodeApotek)`: Baca setting PPK.
*   `spesialistik()`: Referensi spesialistik.
*   `obat(jenis, tanggal, filter)`: Cari referensi obat (Jadi/Racikan).

### 2. Resep (`apotek.resep`)
*   `simpan(data)`: Bridging simpan resep.
*   `hapus(data)`: Hapus resep.
*   `daftar(data)`: Lihat daftar resep.

### 3. Obat (`apotek.obat`)
*   `simpanNonRacikan(data)`: Simpan obat non racikan.
*   `simpanRacikan(data)`: Simpan obat racikan.
*   `updateStok(data)`: Update stok obat.

### 4. Pelayanan Obat (`apotek.pelayananObat`)
*   `daftar(nomorSep)`: Daftar pelayanan obat by SEP.
*   `hapus(data)`: Hapus pelayanan obat.
*   `riwayat(awal, akhir, noKartu)`: Riwayat obat pasien.

### 5. SEP (`apotek.sep`)
*   `cari(nomorSep)`: Cari data SEP.

### 6. Monitoring (`apotek.monitoring`)
*   `dataKlaim(bulan, tahun, jenisObat, status)`: Monitoring data klaim.

### 7. PRB (`apotek.prb`)
*   `rekapPeserta(tahun, bulan)`: Rekap Peserta PRB yang baru dilakukan PRB oleh RS.

## Testing

Project ini menggunakan library testing bawaan **Bun**.

Pastikan dependencies sudah terpasang dan file `.env` terisi dengan kredensial Development (Dev) yang valid sebelum menjalankan test.

```bash
bun install
bun test
```

## Struktur Project

```
├── src/
│   ├── core/           # Logic utama (Signature, HTTP Client, Decryption)
│   ├── features/       # Modul API individual (Referensi, Resep, dll)
│   ├── types/          # TypeScript Interfaces
│   └── ApotekOnline.ts # Class utama (Main entry point)
├── tests/              # Integration tests
├── .env                # File konfigurasi (credential)
└── README.md           # Dokumentasi
```
