const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function fetchAndStoreImage(topic, orientation) {
  const accessKey = 'ZGShNRpaRb_20MXeTxMMXEY7NUetlNPeYGLcgMm2tM0';
  const apiUrl = 'https://api.unsplash.com/photos/random';
  
  const params = {
    query: topic,
    orientation: orientation,
    client_id: accessKey
  };
  
  try {
    const response = await axios.get(apiUrl, { params });
    const imageUrl = response.data.urls.regular;
    const imageFilename = `${topic}_${orientation}.jpg`;
    const imagePath = path.join(__dirname, imageFilename);
  
    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    fs.writeFileSync(imagePath, imageResponse.data);
  
    console.log(`Image saved as ${imageFilename}`);
  } catch (error) {
    console.error('Something went wrong', error);
  }
}

const topics = process.argv.slice(2);
const orientation = 'landscape'; // Default orientation

topics.forEach(topic => {
  fetchAndStoreImage(topic, orientation);
});