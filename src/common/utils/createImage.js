import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const createImage = (file, folder) => {
    const ext = path.extname(file.originalname);
    const uploadFilePath = path.join(process.cwd(), 'public', 'uploads', folder);
    const fileName = crypto.randomBytes(16).toString('hex') + ext;

    fs.mkdirSync(uploadFilePath, { recursive: true });

    const finalPath = path.join(uploadFilePath, fileName);
    fs.writeFileSync(finalPath, file.buffer);

    return fileName;
}

export default createImage;