import axios from 'axios';

const Api = () => {
  return axios.create({
    headers: {
      Authorization: 'Bearer ZGYxNjBiNjItZmRlNi0zOTlkLTlhY2YtODg3MDY3MWM2OTZi',
      slug: 'data2025250501082045-pg.zahironline.com',
    },
  });
};

export default Api;
