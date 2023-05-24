import axios from 'axios';

const CancelToken = axios.CancelToken;
const REQ_TIMEOUT = 5*1000 // 5 seconds

const fetchData = async (url, key) => {
    try {
        const source = CancelToken.source();
        const timeout = setTimeout(()=>{
            source.cancel(`axios.get canceled due to timeout, which is ${REQ_TIMEOUT}.`);
        }, REQ_TIMEOUT);

        const resp = await axios.get(url, {
            headers: {
                'Authorization': `${key}`
            },
            cancelToken: source.token
        });

        clearTimeout(timeout);

        if (resp.status !== 200) {
            throw new Error(`HTTP status ${resp.status}`);
        }

        return resp.data.data;
    } catch (error) {
        console.log('Request failed:', error.message);
        throw error;
    }
}

export default fetchData;
