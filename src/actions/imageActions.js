import axios from 'axios';

export const fetchImages = () => async (dispatch) => {
  try {
    dispatch({ type: 'FETCH_IMAGES_REQUEST' });

    const response = await axios.get('https://api.unsplash.com/photos/?per_page=50&client_id=K67EJLz8oKz7FeQiWLmdVFouPnqRcNswQkv55zwX5X8');
    const images = response.data;

    dispatch({ type: 'FETCH_IMAGES_SUCCESS', payload: images });
  } catch (error) {
    dispatch({ type: 'FETCH_IMAGES_FAILURE', payload: error.message });
  }
};

export const searchImages = (query) => async (dispatch) => {
  try {
    dispatch({ type: 'SEARCH_IMAGES_REQUEST' });

    const response = await axios.get(`https://api.unsplash.com/search/photos/?per_page=50&query=${query}&client_id=K67EJLz8oKz7FeQiWLmdVFouPnqRcNswQkv55zwX5X8`);
    const images = response.data.results;

    dispatch({ type: 'SEARCH_IMAGES_SUCCESS', payload: images });
  } catch (error) {
    dispatch({ type: 'SEARCH_IMAGES_FAILURE', payload: error.message });
  }
};
