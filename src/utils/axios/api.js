import axios from 'axios';

const Api = () => {
  return axios.create({
    headers: {
      Authorization: 'Bearer MjI1MDY1ODAtYTExMC0zNDk0LWJmZmItNzg4NmZkODMwNTll',
      slug: 'data2025250501082045-pg.zahironline.com',
    },
  });
};

export default Api;
