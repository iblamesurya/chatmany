const fs = require('fs');
const glob = require('fs').readdirSync('test').filter(f => f.endsWith('.test.ts')).map(f => 'test/' + f);
for (const file of glob) {
  let c = fs.readFileSync(file, 'utf8');
  // It looks like 
ew Engine(db, client as never, fast()) or 
ew Engine(db, client.asClient(), fastQueue())
  // We can just regex 
ew Engine\(([^)]+)\) but wait, parentheses can be nested!
  // Simple hack: just replace 
ew Engine(db, client as never, fast()) specifically.
  c = c.replace(/new Engine\(db, client as never, fast\(\)\)/g, 'new Engine(db, client as never, fast(), {} as any)');
  c = c.replace(/new Engine\(db, client, /g, 'new Engine(db, client as never, ');
  
  // also fix client.asClient()
  c = c.replace(/new Engine\(db, client as never, fastQueue\(\)\)/g, 'new Engine(db, client as never, fastQueue(), {} as any)');
  
  c = c.replace(/new Engine\(db, client as never, queue\)/g, 'new Engine(db, client as never, queue, {} as any)');

  fs.writeFileSync(file, c);
}
