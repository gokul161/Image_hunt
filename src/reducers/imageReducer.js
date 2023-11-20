const initialState = {
    loading: false,
    images: [],
    error: null,
  };
  
  const imageReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_IMAGES_REQUEST':
      case 'SEARCH_IMAGES_REQUEST':
        return { ...state, loading: true, error: null };
      case 'FETCH_IMAGES_SUCCESS':
      case 'SEARCH_IMAGES_SUCCESS':
        return { ...state, loading: false, images: action.payload, error: null };
      case 'FETCH_IMAGES_FAILURE':
      case 'SEARCH_IMAGES_FAILURE':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default imageReducer;
  