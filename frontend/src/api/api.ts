export const fetchAllSvgIcons = async () => {
    try {
        const response = await fetch('http://localhost:3010/api/icons/retrieve/all/');

        if (!response.ok) {
            throw new Error('Failed to fetch SVG icons');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching SVG icons:', error);
    }
}