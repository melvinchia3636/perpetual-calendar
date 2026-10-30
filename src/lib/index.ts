#!/usr/bin/env bun

import { findGoodDays, getDay, parseDay } from './core';
import type { MatchScope, YijiType } from './core';

const args = Bun.argv.slice(2);

let input: string | undefined;
let yi: string | undefined;
let ji: string | undefined;
let scope: MatchScope = 'day';

for (let i = 0; i < args.length; i++) {
  const arg = args[i]!;

  if (arg === '--yi') yi = args[++i];
  else if (arg === '--ji') ji = args[++i];
  else if (arg === '--hour') scope = 'hour';
  else if (arg === '--both') scope = 'both';
  else if (!arg.startsWith('-')) input = arg;
}

const usage = [
  'Usage:',
  '  bun run src/index.ts YYYY-MM-DD',
  '  bun run src/index.ts YYYY-MM --yi 嫁娶',
  '  bun run src/index.ts YYYY-MM --yi 嫁娶 --hour',
  '  bun run src/index.ts YYYY-MM --ji 开市 --both',
].join('\n');

if (!input || (yi && ji)) {
  console.error(usage);
  process.exit(1);
}

const isMonth = /^\d{4}-\d{1,2}$/.test(input);

if ((yi || ji) && !isMonth) {
  console.error('--yi/--ji require a month, e.g. 2026-10');
  process.exit(1);
}

if (!yi && !ji && isMonth) {
  console.error('Month input requires --yi <activity> or --ji <activity>');
  process.exit(1);
}

try {
  if (yi || ji) {
    const type: YijiType = yi ? 'yi' : 'ji';
    const result = findGoodDays(input, (yi ?? ji)!, { type, scope });
    console.log(JSON.stringify(result, null, 2));
  } else {
    const details = getDay(parseDay(input));
    console.log(JSON.stringify(details, null, 2));
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
