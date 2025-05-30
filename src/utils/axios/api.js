import axios from 'axios';

const Api = () => {
  return axios.create({
    headers: {
      Authorization: 'Bearer HklpCzsp67Rs7deUHU0uw5QR69FJVJEHJrXJ4wk6',
      slug: 'hahahihiclinic230104093838-pg.zahironline.com',
    },
  });
};

export default Api;
