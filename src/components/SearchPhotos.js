// SearchPhotos.js
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { searchImages } from '../actions/imageActions';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { FiDownload, FiMail, FiFacebook, FiTwitter } from 'react-icons/fi'; // Import icons
import { EmailShareButton, FacebookShareButton, TwitterShareButton } from 'react-share'; // Import share buttons

const SearchPhotos = (props) => {
  const { pics, searchImages } = props;
  const [query, setQuery] = useState('');

  const searchPhotos = async (e) => {
    e.preventDefault();
    searchImages(query);
  };

  const downloadImage = (url, name) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <form className="form" onSubmit={searchPhotos}>
        <label className="label" htmlFor="query">
          {" "}
          📷
        </label>
        <input
          type="text"
          name="query"
          className="input"
          placeholder={`Type to search`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="button">
          Search
        </button>
      </form>
      <div className="card-list">
        {pics.map((pic) => (
          <div className="card" key={pic.id}>
            <Link to={`/photos/${pic.id}`}>
              <img
                className="card--image"
                alt={pic.alt_description}
                src={pic.urls.full}
                width="100%"
                height="100%"
              />
            </Link>
            <div className="card-info">
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div>
                  <FaHeart style={{ color: 'red', fontWeight: 'bolder' }} />
                  <span className="info" style={{ marginLeft: '4px', marginRight: '8px', fontWeight: 'bolder' , color : 'white'}}>
                    {pic.likes}
                  </span>
                </div>
                <button
                  className="download-button"
                  onClick={() => downloadImage(pic.urls.full, pic.id)}
                  style={{ fontWeight: 'bolder' }}
                >
                  <FiDownload /> 
                </button>
                <div style={{ marginLeft: '10px' }}>
                  <EmailShareButton url={pic.urls.full} subject="Check out this image!">
                    <FiMail style={{ fontSize: '16px' }} />
                  </EmailShareButton>
                  <FacebookShareButton url={pic.urls.full}>
                    <FiFacebook style={{ fontSize: '16px' }} />
                  </FacebookShareButton>
                  <TwitterShareButton url={pic.urls.full}>
                    <FiTwitter style={{ fontSize: '16px' }} />
                  </TwitterShareButton>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    pics: state.image.images,
  };
};

const mapDispatchToProps = {
  searchImages,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPhotos);
