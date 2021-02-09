
import config from '../../config';
import { LocalFileRepo } from './LocalFileRepo';

const fileRepo = new LocalFileRepo(config.baseDir, config.baseHost, config.fileStorageName);

export {
    fileRepo,
}