# @digitalmedika/bpjs-apotek

## 1.0.4

### Patch Changes

- e0d0c8f: Fix resep POST requests by sending JSON payloads as `text/plain` for `simpan` and `daftar`, matching the BPJS Apotek gateway behavior.

## 1.0.3

### Patch Changes

- cd88713: Add typed request and response shapes for resep, obat, pelayanan obat, and SEP APIs.

## 1.0.2

### Patch Changes

- 7135d59: Move hardcoded `kdppk` from `/daftarresep` payload to `.env` configuration. The `kdppk` value is now read from `APOTEK_KDPPK` env variable and auto-injected into the request, so callers no longer need to pass it manually.
