
export interface FileSaveResult {
    URI: string,
}

export interface IFileRepo {
    save(file: Buffer, name: string, ext: string): FileSaveResult;
    exist(name: string, ext: string): boolean;
}
