import React from 'react';
import LazySvg from './LazySvg';

const QueuedImage = ({ src, alt = '', imgProps = {}, style }) => {
  return (
    <LazySvg
      src={src}
      alt={alt}
      className={imgProps.className}
      style={style}
      imgProps={{
        ...imgProps,
        fetchPriority: imgProps.fetchPriority || imgProps.fetchpriority || 'auto'
      }}
    />
  );
};

export default QueuedImage;
