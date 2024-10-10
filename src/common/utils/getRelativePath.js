import path from 'path';

const getRelativePath = (filePath) => {
    return path.relative(path.join(process.cwd(), 'public'), filePath);
};

export default getRelativePath;