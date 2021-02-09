
import { FileSaveResult, IFileRepo } from "./IFileRepo";

import path from 'path';
import fs from 'fs';

export class LocalFileRepo implements IFileRepo {
    constructor(
        private readonly basePath: string,
        private readonly baseHost: string,
        private readonly fileStorageName: string) { }

    save(file: Buffer, name: string, ext: string): FileSaveResult {

        const dirToSave: string = path.join(this.basePath, this.fileStorageName);
        const fileAndExt: string = `${name}.${ext}`;
        const fullPathAndFile: string = path.join(dirToSave, fileAndExt);

        fs.writeFileSync(fullPathAndFile, file);

        return {
            URI: path.join(this.baseHost, this.fileStorageName, fileAndExt)
        }
    }

    exist(name: string, ext: string): boolean {
        throw new Error("Method not implemented.");
    }

}