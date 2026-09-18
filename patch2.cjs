const fs = require('fs');
let c = fs.readFileSync('src/engine/engine.ts', 'utf8');

c = c.replace(/const button = \{\r?\n\s+type: "postback" as const,\r?\n\s+title: buttonTitle\(campaign\.copy\.opening_button, "Continue"\),\r?\n\s+payload: taggedPayload\(OPENING_PAYLOAD, campaign\.campaign_id\),\r?\n\s+\};\r?\n\s+const ok = await this\.trySend\(\r?\n\s+\(\) => this\.client\.privateReplyWithButtons\(evt\.comment_id, campaign\.copy\.opening, \[button\]\),/,
'const ok = await this.trySend(\n      () => this.client.privateReplyText(evt.comment_id, campaign.copy.opening),');

c = c.replace(/if \(!confirmsFollow\(evt, title\)\) \{\r?\n\s+return false; \/\/ not the press — stay at the gate, silently\r?\n\s+\}/,
'if (!confirmsFollow(evt, title)) {\n      return false; // not the press — stay at the gate, silently\n    }\n\n    if (campaign.verify_follow_count && !followRetriesExhausted(retries)) {\n      const isFollowing = await this.client.isUserFollowingBusiness(evt.igsid);\n      if (!isFollowing) {\n        await this.resendFollowGate(campaign, evt.igsid, retries);\n        return true;\n      }\n    }');

let smartReplyCode = 
    if (!acted && open.length === 0) {
      await this.handleSmartReply(evt);
    }
  }

  private async handleSmartReply(evt: NormalizedMessage): Promise<void> {
    if (!evt.text) return;
    
    // Deduplicate AI replies for the same message across repolls
    const lastAiTs = await kvGet(this.db, \\\i_reply_ts:\\\\);
    if (lastAiTs && evt.timestamp <= Number(lastAiTs)) return;
    
    // Set first so we don't spam if generation takes a long time
    await kvSet(this.db, \\\i_reply_ts:\\\\, String(evt.timestamp));

    const reply = await generateSmartReply(this.env, evt.text);
    if (!reply) return;

    await this.trySend(
      () => this.client.sendText(evt.igsid, reply),
      "ai_reply",
      \\\i_reply:\:\\\\
    );
  }
;

c = c.replace(/break;\r?\n\s+default:\r?\n\s+break; \/\/ NEW \/ DELIVER \/ DONE — nothing to do\r?\n\s+\}\r?\n\s+\}\r?\n\s+\}/,
'break;\n        default:\n          break; // NEW / DELIVER / DONE — nothing to do\n      }\n    }\n' + smartReplyCode);

fs.writeFileSync('src/engine/engine.ts', c);
