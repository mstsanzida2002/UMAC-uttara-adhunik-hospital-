const fs = require('fs');

const variants = JSON.parse(fs.readFileSync('full_resolved_variants.json', 'utf8'));
const v0 = variants[0];

function printNodeTree(n, depth = 0) {
  const pad = '  '.repeat(depth);
  const layout = n.resolvedLayout || {};
  let info = `${pad}- [${n.id}] ${n.type} "${n.name || ''}"`;
  if (layout.mode) info += ` | mode: ${layout.mode}, gap: ${layout.gap || '0'}, pad: ${layout.padding || '0'}`;
  if (n.resolvedFills) info += ` | fill: ${JSON.stringify(n.resolvedFills)}`;
  if (n.resolvedStrokes) info += ` | stroke: ${JSON.stringify(n.resolvedStrokes)}`;
  if (n.text) {
    const st = n.resolvedTextStyle || {};
    info += `\n${pad}    TEXT: "${n.text.replace(/\n/g, '\\n')}" [${st.fontFamily} ${st.fontWeight} ${st.fontSize}px color:${JSON.stringify(n.resolvedFills)}]`;
  }
  console.log(info);

  if (n.resolvedChildren) {
    n.resolvedChildren.forEach(c => printNodeTree(c, depth + 1));
  }
}

console.log('=== VARIANT 0 CHILD 3 (About Hospital) ===');
printNodeTree(v0.resolvedChildren[3]);

console.log('\n=== VARIANT 0 CHILD 4 ===');
printNodeTree(v0.resolvedChildren[4]);
