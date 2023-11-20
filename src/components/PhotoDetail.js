import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PhotoDetail = () => {
  const { id } = useParams();

  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await axios.get(`https://api.unsplash.com/photos/${id}?client_id=K67EJLz8oKz7FeQiWLmdVFouPnqRcNswQkv55zwX5X8`, {
        });
       
        setPhoto(response.data);
      } catch (error) {
        console.error('Error fetching photo details:', error);
      }
    };

    fetchPhoto();
  }, [id]);

  return (
    <div>
   
      {photo && (
        <>
          <img src={photo.urls.full} alt={photo.description} style={{ maxWidth: '100%' }} />
        
        </>
      )}
    </div>
  );
};

export default PhotoDetail;
