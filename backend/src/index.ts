import express, { Request, Response } from 'express';

import fs from 'fs';
import path from 'path';
import { findSvgFile, getSvgFilesInfo, iconsDirectory } from './util';
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

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
        const allSvgFilesInfo = getSvgFilesInfo(iconsDirectory);
        res.status(200)
        res.json(allSvgFilesInfo);
    } catch (error) {
        console.error('Error retrieving SVG files:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/api/icons/retrieve/', (req: Request, res: Response) => {
    const { filePath } = req.body;
    const fullPath = path.join(iconsDirectory, filePath); // Assuming the SVG files are in a folder named "public"

    // Check if the file exists
    if (fs.existsSync(fullPath)) {
        // Set the content type to SVG
        res.setHeader('Content-Type', 'image/svg+xml');
        
        // Read the file and send it in the response
        fs.createReadStream(fullPath).pipe(res);
    } else {
        // Return a 404 if the file does not exist
        res.status(404).send('SVG file not found');
    }
});