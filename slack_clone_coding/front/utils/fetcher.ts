import axios from 'axios';

//withCredentials : Font와 Back의 도메인이 달라서 Cookie가 전달되지 않는 문제를 해결하기 위한 옵션
const fetcher = (url: string) => axios.get(url, { withCredentials: true }).then((response) => response.data);

export default fetcher;
