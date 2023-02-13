import axios from 'axios';

const buildClient = ({ req }: any) => {
  if (typeof window === 'undefined') {
    return axios.create({
      headers: req.headers,
    });
  } else {
    return axios.create({});
  }
};

export default buildClient;
