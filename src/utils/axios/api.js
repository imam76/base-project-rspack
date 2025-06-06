import axios from 'axios';

const Api = () => {
  return axios.create({
    headers: {
      Authorization: 'Bearer NzQzMjYyODAtNWRhOC0zZTAyLThiN2UtZDY2ZjQ2YTJjMTlk',
      slug: 'data2025250501082045-pg.zahironline.com',
    },
  });
};

export default Api;
