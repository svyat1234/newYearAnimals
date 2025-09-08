import React, { useEffect, useState } from 'react';
import { enqueueImageLoad } from '../utils/imageQueue';

const QueuedImage = ({ src, alt = '', imgProps = {}, style }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setReady(false);
    enqueueImageLoad(src)
      .then(() => { if (!cancelled) setReady(true); })
      .catch(() => { if (!cancelled) setReady(true); });
    return () => { cancelled = true; };
  }, [src]);

  if (!ready) {
    // Reserve layout to reduce shifts if width/height provided via style
    return <div style={style} aria-hidden="true" />;
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      fetchpriority={imgProps.fetchpriority || 'auto'}
      style={style}
      {...imgProps}
    />
  );
};

export default QueuedImage;
