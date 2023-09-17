import React, { useState } from 'react';
import { storage } from './firebase';
import DisplayImages from './DisplayImages';
import { db } from './firebase';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [downloadURL, setDownloadURL] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const storageRef = storage.ref(`images/${selectedFile.name}`);
      const uploadTask = storageRef.put(selectedFile);
  
      // Monitor the upload progress (optional)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Handle progress (optional)
        },
        (error) => {
          // Handle errors during upload
          console.error('Upload error:', error);
        },
        () => {
          // Upload completed successfully; continue with further actions
          console.log('Upload completed successfully');
  
          // Retrieve the download URL
          storageRef.getDownloadURL().then((downloadURL) => {
            // Save the downloadURL in your database or perform other actions
            console.log('Image URL:', downloadURL);
            db.ref('images').push({
              imageUrl: downloadURL,
            });
            setDownloadURL(downloadURL);
          });
        }
      );
    }
  };
  

  return (
    <div className='page-container'>

<div className="upload-container">
  <div className="image-box">
    {/* Render the selected image here */}
    <img src={downloadURL} alt="Selected Img" />
  </div>
  <input type="file" onChange={handleFileChange} />
  <button onClick={handleUpload}>Upload</button>
</div>

      {/* <div>

      <img src={downloadURL} alt="test-img" />

      </div> */}
      
      <DisplayImages />
    </div>
  );
}

export default App;

