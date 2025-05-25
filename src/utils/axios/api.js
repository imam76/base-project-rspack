import axios from 'axios';

const Api = () => {
  return axios.create({
    headers: {
      Authorization: 'Bearer OWIyNTJhYTMtMzMzOS0zZWJkLWExZTgtMDMxM2YwM2IwNjUz',
      slug: 'data2025250501082045-pg.zahironline.com',
    },
  });
};

export default Api;
