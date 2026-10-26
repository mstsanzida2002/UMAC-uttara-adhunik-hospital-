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

const navbar = findNode(data.document, '13:1135');
console.log('NavBar node:', JSON.stringify(navbar, null, 2).substring(0, 2000));

const hero = findNode(data.document, '7:1367');
console.log('Hero node:', JSON.stringify(hero, null, 2).substring(0, 2000));
