const fs = require('fs');

const data = JSON.parse(fs.readFileSync('figma_file.json', 'utf8'));

function findNode(n, id) {
  if (n.id === id) return n;
  if (n.children) {
    for (const c of n.children) {
      const f = findNode(c, id);
      if (f) return f;
    }
  }
  return null;
}

function extractAll(n) {
  let texts = [];
  function walk(node) {
    if (node.type === 'TEXT') {
      texts.push({ name: node.name, text: node.characters });
    }
    if (node.children) {
      node.children.forEach(walk);
    }
  }
  walk(n);
  return texts;
}

const sec = findNode(data.document, '309:3075');
console.log('Total children in Facilities Section:', sec.children.length);

for (const child of sec.children) {
  console.log(`\n==================================================`);
  console.log(`FRAME: ${child.name} (${child.id})`);
  console.log(`==================================================`);
  
  // Inspect the direct children (sections)
  for (const sub of child.children || []) {
    if (sub.name.includes('Footer') || sub.name.includes('Frame 58')) continue;
    console.log(`\n--- Sub-section: ${sub.name} (${sub.id}, ${sub.type}) layout: ${sub.layoutMode} ---`);
    if (sub.children) {
      sub.children.forEach(c => {
        console.log(`   * ${c.name} (${c.id}, ${c.type}) layout: ${c.layoutMode} bounds: ${JSON.stringify(c.absoluteBoundingBox)}`);
      });
    }
    const t = extractAll(sub);
    console.log(`   Texts (${t.length}):`);
    t.slice(0, 8).forEach(item => console.log(`     [${item.name}]: ${JSON.stringify(item.text.replace(/\n/g, ' '))}`));
  }
}
