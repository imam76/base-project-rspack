import axios from 'axios';

const Api = () => {
  return axios.create({
    headers: {
      Authorization: 'Bearer OWJmM2I3YWEtNDhmNS0zZmIxLTk2MTItN2VmOTUzOWE1ZTc1',
      slug: 'data2025250501082045-pg.zahironline.com',
    },
  });
};

export default Api;
