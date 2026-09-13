const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(path.join(__dirname, 'src'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Convert <button ... active:scale-95 ...> to <motion.button whileTap={{ scale: 0.95 }} ...>
  // Needs to handle various button structures. 
  // It's safer to just let me manually update the major components, or use Regex.
  
  // Let's use a regex to find buttons with active:scale-95
  // <button [^>]*className="[^"]*active:scale-95[^"]*"[^>]*>
  content = content.replace(/<button([^>]*)className="([^"]*)active:scale-95([^"]*)"([^>]*)>/g, (match, p1, p2, p3, p4) => {
    let cleanClass = (p2 + p3).replace(/\s+/g, ' ').trim();
    // remove transition-transform if present
    cleanClass = cleanClass.replace(/transition-transform/g, '').replace(/transition-all/g, '').trim();
    
    return `<motion.button${p1}className="${cleanClass}" whileTap={{ scale: 0.95 }}${p4}>`;
  });
  
  // Convert </button> to </motion.button> ONLY if we added framer-motion (wait, we can't just blind replace </button>)
  // Actually, a better regex is to parse the JSX, but regex on JSX is hard. 
  
});
