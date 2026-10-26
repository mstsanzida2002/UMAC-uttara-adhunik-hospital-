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

const target = findNode(data.document, '106:1282');
console.log('Target found:', !!target);
if (target) {
  console.log('Target name:', target.name, 'type:', target.type);
  console.log('Children count:', target.children?.length);
  if (target.children) {
    target.children.forEach(c => console.log('Child:', c.id, c.name, c.type));
  }
}
