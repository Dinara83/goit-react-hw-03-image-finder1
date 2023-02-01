import axios from 'axios';

const instance = axios.create({
  pageURL: 'https://pixabay.com/api',
  params: {
    key: '31934563-bfdfc3e562fca017f9814bb5d',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  },
});

export const searchApi = async (q, page = 1) => {
  const data = await instance.get('/', {
    params: {
      q,
      page,
    },
  });
  return data;
};
