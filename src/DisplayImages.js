import React, { useState, useEffect } from 'react';
import { db } from './firebase';

function DisplayImages() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const databaseRef = db.ref('images');

    databaseRef.on('value', (snapshot) => {
      const imageList = [];
      snapshot.forEach((childSnapshot) => {
        const imageData = childSnapshot.val();
        imageList.push(imageData.imageUrl);
      });
      setImages(imageList);
    });

    // Cleanup the listener when the component unmounts
    return () => {
      databaseRef.off('value');
    };
  }, []);

  return (
    <div className='image-container'>

    
      {images.map((imageUrl, index) => (
        <div key={index} className='card'>
          <img id='user-img' src={imageUrl} alt={`img ${index}`} />
        </div>
      ))}

 
     
    </div>
  );
}

export default DisplayImages;
