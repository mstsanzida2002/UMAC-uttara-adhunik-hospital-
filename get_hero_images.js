const fs = require('fs');
const data = JSON.parse(fs.readFileSync('figma_file.json', 'utf8'));

function findNode(node, id) {
  if (node.id === id) return node;
  if (node.children) {
    for (const child of node.children) {
      const found = findNode(child, id);
      if (found) return found;
    }
  }
  return null;
}

const hero = findNode(data.document, '7:1367');

function collectImageNodes(node, list = []) {
  if (node.fills) {
    for (const fill of node.fills) {
      if (fill.type === 'IMAGE' && fill.imageRef) {
        list.push({ id: node.id, name: node.name, imageRef: fill.imageRef });
      }
    }
  }
  if (node.children) {
    for (const child of node.children) {
      collectImageNodes(child, list);
    }
  }
  return list;
}

const images = collectImageNodes(hero);
console.log('Found image refs in Hero:', images);
console.log('Document images dict keys:', Object.keys(data.images || {}));

