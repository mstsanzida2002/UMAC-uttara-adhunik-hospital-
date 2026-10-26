const https = require('https');
const fs = require('fs');
const path = require('path');

const token = process.env.FIGMA_TOKEN || '';
const fileKey = '5T2kktqm71jSmYz9jylFC6';

const options = {
  hostname: 'api.figma.com',
  path: `/v1/files/${fileKey}/images`,
  headers: { 'X-Figma-Token': token }
};

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      const stream = fs.createWriteStream(dest);
      res.pipe(stream);
      stream.on('finish', () => {
        stream.close();
        resolve();
      });
      stream.on('error', reject);
    }).on('error', reject);
  });
}

https.get(options, res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', async () => {
    try {
      const data = JSON.parse(d);
      const images = data.meta?.images || {};
      fs.writeFileSync('figma_images_map_all.json', JSON.stringify(data, null, 2));
      console.log('Got images map with count:', Object.keys(images).length);

      const frames = JSON.parse(fs.readFileSync('facilities_deep_analysis.json', 'utf8'));
      const facilitiesImages = new Map();

      function walk(node, frameName) {
        if (node.fills) {
          node.fills.forEach(f => {
            if (f.imageRef) {
              facilitiesImages.set(f.imageRef, { nodeName: node.name, frameName, id: node.id });
            }
          });
        }
        if (node.children) {
          node.children.forEach(c => walk(c, frameName));
        }
      }

      frames.forEach(f => {
        f.sections.forEach(s => walk(s, f.name));
      });

      const outDir = path.join('public', 'images', 'facilities');
      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
      }

      const downloadedMap = {};

      for (const [hash, info] of facilitiesImages.entries()) {
        const url = images[hash];
        if (url) {
          const safeName = (info.frameName.replace(/[^a-zA-Z0-9]/g, '_') + '_' + info.nodeName.replace(/[^a-zA-Z0-9]/g, '_') + '_' + hash.slice(0, 6) + '.jpg').toLowerCase();
          const dest = path.join(outDir, safeName);
          await downloadFile(url, dest);
          downloadedMap[hash] = `/images/facilities/${safeName}`;
          console.log(`Downloaded ${safeName} (${info.frameName} -> ${info.nodeName})`);
        } else {
          console.warn('No URL for hash:', hash);
        }
      }

      fs.writeFileSync('facilities_downloaded_images.json', JSON.stringify(downloadedMap, null, 2));
      console.log('Successfully downloaded all facilities images!');
    } catch (err) {
      console.error(err);
    }
  });
}).on('error', e => console.error(e));
