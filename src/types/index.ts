export interface MetaData {
    code: string;
    message: string;
}

export interface BpjsResponse<T = any> {
    response: T;
    metaData: MetaData;
}

export interface DphoItem {
    kodeobat: string;
    namaobat: string;
    prb: string;
    kronis: string;
    kemo: string;
    harga: string;
    restriksi: string;
    generik: string;
    aktif: string | null;
    sedia: string;
    stok: string | null;
}

export interface PoliItem {
    kode: string;
    nama: string;
}

export interface FaskesItem {
    kode: string;
    nama: string;
    alamat: string;
    telp: string;
}

export interface SpesialistikItem {
    kode: string;
    nama: string;
}

export interface ListResponse<T> {
    list: T[];
}

export interface PrbItem {
    No: number;
    NamaPeserta: string;
    NomorKaPst: string;
    Alamat: string;
    TglSRB: string;
    Diagnosa: string;
    Obat: string;
    DPJP: string;
    AsalFaskes: string;
}

export interface SepData {
    noSep: string;
    faskesasalresep: string;
    nmfaskesasalresep: string;
    nokartu: string;
    namapeserta: string;
    jnskelamin: string;
    tgllhr: string;
    pisat: string;
    kdjenispeserta: string;
    nmjenispeserta: string;
    kodebu: string;
    namabu: string;
    tglsep: string;
    tglplgsep: string;
    jnspelayanan: string;
    nmdiag: string;
    poli: string;
    flagprb: string;
    namaprb: string;
    kodedokter: string;
    namadokter: string | null;
}

export interface ResepItem {
    NORESEP: string;
    NOAPOTIK: string;
    NOSEP_KUNJUNGAN: string;
    NOKARTU: string;
    NAMA: string;
    TGLENTRY: string;
    TGLRESEP: string;
    TGLPELRSP: string;
    BYTAGRSP: string;
    BYVERRSP: string;
    KDJNSOBAT: string;
    FASKESASAL: string;
}

export interface ResepSimpanRequest {
    TGLSJP: string;
    REFASALSJP: string;
    POLIRSP: string;
    KDJNSOBAT: string;
    NORESEP: string;
    IDUSERSJP: string;
    TGLRSP: string;
    TGLPELRSP: string;
    KdDokter: string;
    iterasi: string;
}

export interface ResepHapusRequest {
    nosjp: string;
    refasalsjp: string;
    noresep: string;
}

export interface ResepHapusResponse {
    noSjp: string;
    noResep: string;
    refAsalSjp: string;
}

export interface ResepDaftarRequest {
    KdJnsObat: string;
    JnsTgl: "TGLPELSJP" | "TGLRSP";
    TglMulai: string;
    TglAkhir: string;
}

export interface ObatNonRacikanItem {
    kdobat: string;
    nmobat: string;
    jumlah: string;
    signa: string;
    harga: string;
    catatan?: string;
}

export interface ObatRacikanKomponen {
    kdobat: string;
    nmobat: string;
    jumlah: string;
    signa: string;
    harga: string;
}

export interface ObatRacikanItem {
    namaracikan: string;
    obat: ObatRacikanKomponen[];
}

export interface ObatNonRacikanSimpanRequest {
    /** Nomor SJP. */
    NOSJP: string;
    /** Nomor resep. */
    NORESEP: string;
    /** Kode obat. */
    KDOBT: string;
    /** Nama obat. */
    NMOBAT: string;
    /** Signa obat bagian pertama. */
    SIGNA1OBT: number;
    /** Signa obat bagian kedua. */
    SIGNA2OBT: number;
    /** Jumlah obat. */
    JMLOBT: number;
    /** Jumlah hari obat. */
    JHO: number;
    /** Catatan khusus obat. */
    CatKhsObt: string;
}

export interface ObatRacikanSimpanRequest {
    nosjp: string;
    noresep: string;
    namadokter: string;
    kodedokter: string;
    obat: ObatRacikanItem[];
}

export interface ObatUpdateStokRequest {
    kdppk: string;
    listobat: Array<{
        kdobat: string;
        stok: string;
    }>;
}

export interface PelayananObatHapusRequest {
    nosjp: string;
    noresep: string;
}
