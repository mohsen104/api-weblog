import fs from 'fs';
import path from 'path';

const removeImage = (image) => {
    fs.unlink(path.join(process.cwd(), "public", image), (err) => {
        if (err) throw err;
        console.log('file was deleted');
    })
}

export default removeImage;