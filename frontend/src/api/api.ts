export const fetchAllSvgIcons = async () => {
    try {
        const response = await fetch('http://localhost:3010/api/icons/retrieve/all/');
        console.log(response);
        console.log(response.headers.get('Content-Type'));

        if (!response.ok) {
            throw new Error('Failed to fetch SVG icons');
        }

        const svgIcons = await response.json();

        console.log(svgIcons);
    } catch (error) {
        console.error('Error fetching SVG icons:', error);
    }
}