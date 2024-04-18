import fs from 'fs';
import path from 'path';

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

interface SvgData {
    fileName: string;
    content: string;
    path: string;
}

export const getSvgFilesWithContents = (directory: string, rootDirectory: string = directory): SvgData[] => {
    let svgFilesWithContents: { fileName: string, content: string, path: string }[] = [];
    const files = fs.readdirSync(directory);

    files.forEach(file => {
        const filePath = path.join(directory, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            const subDirectoryFiles = getSvgFilesWithContents(filePath, rootDirectory);
            svgFilesWithContents = svgFilesWithContents.concat(subDirectoryFiles);
        } else if (stats.isFile() && file.endsWith('.svg')) {
            const content = readSvgFile(filePath);
            if (content !== null) {
                const relativePath = path.relative(rootDirectory, filePath);
                svgFilesWithContents.push({ fileName: file, content: content, path: relativePath });
            }
        }
    });

    return svgFilesWithContents;
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