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
    prb: string; // "True" | "False"
    kronis: string; // "True" | "False"
    kemo: string; // "True" | "False"
    harga: string;
    restriksi: string; // "Null" or string
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
    telp: string; // check actual response if possible, assume string for now
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
