import express, { Request, Response } from 'express';

import fs from 'fs';
import path from 'path';
import { findSvgFile, getSvgFilesWithParentFolderNames, iconsDirectory } from './util';
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());

const PORT = process.env.PORT || 3010;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// GET

app.get('/api/icons/retrieve/all/', (req: Request, res: Response) => {
    try {
        const allSvgFiles = getSvgFilesWithParentFolderNames(iconsDirectory);
        res.json(allSvgFiles);
    } catch (error) {
        console.error('Error retrieving SVG files:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/api/icons/retrieve/:iconName/', (req: Request, res: Response) => {
    const { svgName } = req.params;

    const iconFilePath = findSvgFile(iconsDirectory, svgName);

    if (iconFilePath) {
        fs.readFile(iconFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading SVG file:', err);
                return res.status(500).send('Internal server error');
            }

            res.set('Content-Type', 'image/svg+xml');
            res.send(data);
        });
    } else {
        res.status(404).send('SVG icon not found');
    }
});