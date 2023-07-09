import axios from 'axios';

const API_KEY = '36811784-c13148b3b1c3296db8a3ae716';

export const getAllImages = async (query, page) => {
  const { data } = await axios(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  console.log(data);
  return data;
};
