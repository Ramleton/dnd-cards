import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';

export const iconsDirectory = path.join(__dirname, '../public', 'icons');

// Function to read SVG file contents
const readSvgFile = (filePath: string): string | null => {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
        console.error('Error reading SVG file:', error);
        return null;
    }
};

interface SvgFileInfo {
    fileName: string;
    path: string;
}

export const getSvgFilesInfo = (directory: string, rootDirectory: string = directory): SvgFileInfo[] => {
    let svgFilesInfo: SvgFileInfo[] = [];
    const files = fs.readdirSync(directory);

    files.forEach(file => {
        const filePath = path.join(directory, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            const subDirectoryFiles = getSvgFilesInfo(filePath, rootDirectory);
            svgFilesInfo = svgFilesInfo.concat(subDirectoryFiles);
        } else if (stats.isFile() && file.endsWith('.svg')) {
            const relativePath = path.relative(rootDirectory, filePath);
            svgFilesInfo.push({ fileName: file, path: relativePath });
        }
    });

    return svgFilesInfo;
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