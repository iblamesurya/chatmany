const fs = require('fs');
let c = fs.readFileSync('src/engine/engine.ts', 'utf8');

c = c.replace('State,', 'State,\n  Env,');
c = c.replace('isCommentProcessed,', 'isCommentProcessed,\n  kvGet,\n  kvSet,');
c = c.replace('import type { ConversationRow } from "../db";', 'import type { ConversationRow } from "../db";\nimport { generateSmartReply } from "./ai";');

c = c.replace('export class Engine {', 'export class Engine {\n  constructor(private readonly db: D1Database, private readonly client: InstagramClient, private readonly queue: SendQueue, private readonly env: Env) {}\n');
c = c.replace(/constructor\(\r?\n\s+private readonly db: D1Database,\r?\n\s+private readonly client: InstagramClient,\r?\n\s+private readonly queue: SendQueue,\r?\n\s+\) \{\}/, '');

fs.writeFileSync('src/engine/engine.ts', c);
