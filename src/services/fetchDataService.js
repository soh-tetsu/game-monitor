import axios from 'axios';

const fetchData = async (url, key) => {
    try {
        const resp = await axios.get(url, {
            headers: {
                'Authorization': `${key}`
            }
        });

        if (resp.status !== 200) {
            throw new Error(`HTTP status ${resp.status}`);
        }

        return resp.data.data;
    } catch (error) {
        // console.error('Error while fetching data:', error);
        throw error;
    }
}

export default fetchData;
