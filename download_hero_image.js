const https = require('https');
const fs = require('fs');

const token = process.env.FIGMA_TOKEN || '';
const fileKey = '5T2kktqm71jSmYz9jylFC6';
const imageRef = '1cfa5d2268bdb8404957da672487eace75a3df97';

const options = {
  hostname: 'api.figma.com',
  path: `/v1/images/${fileKey}?ids=7:1367&format=jpg`,
  headers: { 'X-Figma-Token': token }
};

https.get(options, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Images API response:', data);
    try {
      const parsed = JSON.parse(data);
      const url = parsed.images && parsed.images['7:1367'];
      if (url) {
        https.get(url, imgRes => {
          const fileStream = fs.createWriteStream('public/images/hero-bg.jpg');
          imgRes.pipe(fileStream);
          fileStream.on('finish', () => {
            fileStream.close();
            console.log('Downloaded hero-bg.jpg successfully!');
          });
        });
      }
    } catch(e) {
      console.error('Error parsing JSON:', e);
    }
  });
});
