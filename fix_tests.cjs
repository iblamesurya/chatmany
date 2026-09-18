const fs = require('fs');
const files = ['test/adversarial.test.ts', 'test/engine.test.ts', 'test/migration.test.ts', 'test/scenarios.test.ts', 'test/webhook.test.ts', 'test/qa.test.ts'];
for (const file of files) {
  let c = fs.readFileSync(file, 'utf8');
  c = c.replace(/new Engine\(db, client(\.asClient\(\)| as never), fastQueue\(\)\)/g, 'new Engine(db, client, fastQueue(), {} as any)');
  c = c.replace(/new Engine\(db, client(\.asClient\(\)| as never), queue\)/g, 'new Engine(db, client, queue, {} as any)');
  fs.writeFileSync(file, c);
}
