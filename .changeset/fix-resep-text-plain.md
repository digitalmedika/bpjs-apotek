---
"@digitalmedika/bpjs-apotek": patch
---

Fix resep POST requests by sending JSON payloads as `text/plain` for `simpan` and `daftar`, matching the BPJS Apotek gateway behavior.
