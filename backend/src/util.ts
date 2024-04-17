import fs from 'fs';
import path from 'path';

export const iconsDirectory = path.join(__dirname, '../public', 'icons');

export const getSvgFilesWithParentFolderNames = (directory: string): { fileName: string, parentFolderName: string }[] => {
    let svgFiles: { fileName: string, parentFolderName: string }[] = [];
    const files = fs.readdirSync(directory);

    files.forEach(file => {
        const filePath = path.join(directory, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            const subDirectoryFiles = getSvgFilesWithParentFolderNames(filePath);
            svgFiles = svgFiles.concat(subDirectoryFiles);
        } else if (stats.isFile() && file.endsWith('.svg')) {
            const parentFolderName = path.basename(directory).charAt(0).toUpperCase() + path.basename(directory).slice(1);
            svgFiles.push({ fileName: file, parentFolderName: parentFolderName });
        }
    });

    return svgFiles;
};

export const findSvgFile = (directory: string, svgName: string): string | null => {
    const files = fs.readdirSync(directory);

    for (const file of files) {
        const filePath = path.join(directory, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            const foundSvgFile = findSvgFile(filePath, svgName);
            if (foundSvgFile) {
                return foundSvgFile;
            }
        } else if (stats.isFile() && file === `${svgName}.svg`) {
            return filePath;
        }
    }

    return null;
};