import type { Options } from 'tsup';

export const tsup: Options = {
  sourcemap: true,
  clean: true, // rimraf dist
  dts: true, // generate dts file for main module
  format: ['cjs', 'esm'], // generate cjs and esm files
  minify: true,
  bundle: true,
  skipNodeModulesBundle: true,
  entryPoints: ['src/index.ts'],
  watch: false,
  target: 'es2020',
  outDir: 'dist',
  entry: ['src/**/*.ts'],
};
