import fs from 'node:fs';
import path from 'node:path';

/**
 * NativeWind v5 RC aliases `react-native` to `react-native-css/components`.
 * That shim re-exports most RN APIs but not `AssetRegistry`, which breaks
 * `expo-asset` (fonts, icons) with:
 *   TypeError: Cannot read property 'getAssetByID' of undefined
 *
 * Add the missing getter. Remove this patch once react-native-css ships it.
 */
const files = [
  'node_modules/react-native-css/dist/module/components/index.cjs',
  'node_modules/react-native-css/dist/commonjs/components/index.cjs',
];

let patched = 0;

for (const relative of files) {
  const file = path.resolve(relative);
  if (!fs.existsSync(file)) continue;

  const source = fs.readFileSync(file, 'utf8');
  if (source.includes('get AssetRegistry()')) continue;

  const end = source.lastIndexOf('};');
  if (end === -1) continue;

  const before = source.slice(0, end).trimEnd();
  const comma = before.endsWith(',') ? '' : ',';
  const getter =
    comma +
    '\n  get AssetRegistry() {\n' +
    '    return require("react-native").AssetRegistry;\n' +
    '  }';

  fs.writeFileSync(file, `${before}${getter}\n};${source.slice(end + 2)}`);
  patched++;
}

if (patched > 0) {
  console.log(`[patch] react-native-css: added AssetRegistry (${patched} file(s))`);
}
