import React, { useState } from 'react';
import { connect } from 'react-redux';
import { searchImages } from '../actions/imageActions';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { FiDownload, FiMail, FiFacebook, FiTwitter } from 'react-icons/fi';
import { EmailShareButton, FacebookShareButton, TwitterShareButton } from 'react-share';

const SearchPhotos = (props) => {
  const { pics, searchImages } = props;
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 10;

  const searchPhotos = async (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to the first page when searching
    searchImages(query);
  };

  const downloadImage = async (url, name) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `${name}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = pics.slice(indexOfFirstImage, indexOfLastImage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
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
        {currentImages.map((pic) => (
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
                  <span className="info" style={{ marginLeft: '4px', marginRight: '8px', fontWeight: 'bolder', color: 'white' }}>
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

      {pics.length > imagesPerPage && (
        <div className="pagination-container">
          <div className="pagination">
            {Array.from({ length: Math.ceil(pics.length / imagesPerPage) }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
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
