import axios from 'axios';

const Api = () => {
  return axios.create({
    headers: {
      Authorization: 'Bearer MGRlN2M5ZTgtZTNkNS0zYzM0LWExMDctMjJjZGNhODNmODA0',
      slug: 'data2025250501082045-pg.zahironline.com',
    },
  });
};

export default Api;
