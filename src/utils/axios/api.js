import axios from 'axios';

const Api = () => {
  return axios.create({
    // headers: {
    //   Authorization: 'Bearer YTBiYmU0ZDMtNjU4NS0zYTk2LWEzZmMtZDBlOTJiM2NlYWIw',
    //   slug: 'devkebunbuahsupplier18042025250418190300-pg.zahironline.com',
    // },
  });
};

export default Api;
