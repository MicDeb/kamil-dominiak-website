import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

const PreviewCompatibleImage = ({ imageInfo }) => {
  const { alt = '', childImageSharp, image } = imageInfo;

  if (!!image && !!image.childImageSharp) {
    return (
      <Img
        fluid={image.childImageSharp.fluid}
        alt={alt}
      />
    );
  }

  if (childImageSharp) {
    return (
      <Img
        fluid={childImageSharp.fluid}
        alt={alt}
      />
    );
  }

  if (!!image && typeof image === 'string') {
    return (
      <img
        src={image}
        alt={alt}
      />
    );
  }

  return null;
};

PreviewCompatibleImage.propTypes = {
  imageInfo: PropTypes.shape({
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
    alt: PropTypes.string,
    childImageSharp: PropTypes.object,
    style: PropTypes.object,
  }).isRequired,
};

export default PreviewCompatibleImage;
