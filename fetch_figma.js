const https = require('https');
const token = process.env.FIGMA_TOKEN || '';
const options = {
  hostname: 'api.figma.com',
  path: '/v1/files/5T2kktqm71jSmYz9jylFC6',
  headers: { 'X-Figma-Token': token }
};

https.get(options, res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    require('fs').writeFileSync('figma_file.json', d);
    console.log('Saved figma_file.json successfully, bytes:', d.length);
  });
}).on('error', e => console.error(e));
