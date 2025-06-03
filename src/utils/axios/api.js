import axios from 'axios';

const Api = () => {
  return axios.create({
    headers: {
      Authorization: 'Bearer MmY2MGMxZjItNDllYi0zNGU4LWJlNmEtYjQ2OGU3MTM0Nzgx',
      slug: 'data2025250501082045-pg.zahironline.com',
    },
  });
};

export default Api;
