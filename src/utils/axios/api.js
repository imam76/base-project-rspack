import axios from 'axios';

const Api = () => {
  return axios.create({
    headers: {
      Authorization: 'Bearer M2Y2ZTcwNDAtMDVmZC0zOGYyLWI2NTYtNmZlYTMzZDA5YzUx',
      slug: 'data2025250501082045-pg.zahironline.com',
    },
  });
};

export default Api;
