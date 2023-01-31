import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const API_KYE = '31934563-bfdfc3e562fca017f9814bb5d';

axios.defaults.baseURL = BASE_URL;

export const searchApi = (searchRequest, page = 1, per_page = 12) => {
  return axios.get('/', {
    params: {
      q: searchRequest,
      page,
      key: API_KYE,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page,
    },
  });
};

// const instance = axios.create({
//   pageURL: 'https://pixabay.com/api',
//   params: {
//     key: '31934563-bfdfc3e562fca017f9814bb5d',
//     image_type: 'photo',
//     orientation: 'horizontal',
//     per_page: 12,
//   },
// });

// export const searchApi = async (q, page = 1) => {
//   const data = await instance.get('/', {
//     params: {
//       q,
//       page,
//     },
//   });
//   return data;
// };
