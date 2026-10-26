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

const landing = findNode(data.document, '7:871');
console.log('Landing Page children count:', landing?.children?.length);
if (landing?.children) {
  landing.children.forEach(c => console.log('Landing child:', c.id, c.name, c.type));
}
