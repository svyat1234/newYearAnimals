import React, { useEffect, useRef, useState } from 'react';
import { enqueueImageLoad } from '../utils/imageQueue';

const LazySvg = ({ 
  src, 
  alt = '', 
  className = '', 
  style = {}, 
  imgProps = {},
  ...rest 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        // Увеличиваем область предзагрузки в зависимости от размера экрана
        rootMargin: window.innerWidth <= 1024 ? '200px' : '300px',
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isInView && !isLoaded) {
      // Используем очередь изображений для более плавной загрузки
      enqueueImageLoad(src)
        .then(() => setIsLoaded(true))
        .catch(() => setIsLoaded(true)); // Показываем даже при ошибке
    }
  }, [isInView, src, isLoaded]);

  return (
    <div 
      ref={imgRef}
      className={className}
      style={style}
      {...rest}
    >
      {isLoaded && isInView && (
        <img
          src={src}
          alt={alt}
          style={{ width: '100%', height: 'auto' }}
          {...imgProps}
        />
      )}
    </div>
  );
};

export default LazySvg;
