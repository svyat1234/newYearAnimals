import React, { useEffect, useRef, useState } from 'react';

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
        rootMargin: '50px', // Начинаем загрузку за 50px до появления в viewport
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
      const img = new Image();
      img.onload = () => setIsLoaded(true);
      img.onerror = () => setIsLoaded(true); // Показываем даже при ошибке
      img.src = src;
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
