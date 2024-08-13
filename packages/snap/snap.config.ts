import type { SnapConfig } from '@metamask/snaps-cli';
import { resolve } from 'path';

const config: SnapConfig = {
  bundler: 'webpack',
  input: resolve(__dirname, 'src/index.tsx'),
  server: {
    port: 8080,
  },
  polyfills: {
    buffer: true,
  },
  customizeWebpackConfig: (snapConfig) => {
    return {
      ...snapConfig,
      optimization: {
        usedExports: false, // Disable tree shaking by not marking used exports
        providedExports: false, // Disable tree shaking by not marking provided exports
      },
    };
  },
};

export default config;
