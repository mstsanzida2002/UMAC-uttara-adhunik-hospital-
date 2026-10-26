const https = require('https');
const fs = require('fs');
const path = require('path');

const mapData = JSON.parse(fs.readFileSync('figma_images_map.json', 'utf8'));
const images = mapData.meta?.images || {};

const targetDownloads = {
  'about-1.jpg': 'b653c9fe6fce7f8732c822f5531d3cdb2ace19d4',
  'about-2.jpg': '7618134ba6d9b3fcec92351fecc0c08813168f13',
  'uamc-logo-round.png': '1301baab424b977d9b9d2958caff752a9811e324',
  'metrics-bg.jpg': '1cfa5d2268bdb8404957da672487eace75a3df97',
  'finddept-bg.jpg': 'f6d95559454f7a96fd6df30bce0670856dc1ef18',
  'finddept-student1.jpg': 'cf2c09c01c60586beb654358503ccdf7e14364f3',
  'finddept-student2.jpg': 'a14ee05d6da5fd0802d3dc93fec79117aa54c5a0',
  'finddept-doctor.jpg': 'f2157313eb21b72f305050790220b6d13c89ae7d',
  'admission-bg.jpg': '7618134ba6d9b3fcec92351fecc0c08813168f13',
  'facility-hostel.jpg': 'e2fbed7662c798afd52a2d086cb72e393aaad0a7',
  'footer-post-1.webp': '38d5b44eb123ff5d550c62c1f2a0f28085dc7dbf',
  'footer-post-2.webp': '467d542c319e9cdc5543b13935e551311ed63cfe',
};

async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      const stream = fs.createWriteStream(dest);
      res.pipe(stream);
      stream.on('finish', () => {
        stream.close();
        console.log('Downloaded', dest);
        resolve();
      });
      stream.on('error', reject);
    }).on('error', reject);
  });
}

async function run() {
  for (const [filename, hash] of Object.entries(targetDownloads)) {
    const url = images[hash];
    if (url) {
      const dest = path.join('public', 'images', filename);
      await downloadFile(url, dest);
    } else {
      console.warn('URL not found for hash:', hash);
    }
  }
  console.log('All downloads completed!');
}

run().catch(console.error);
