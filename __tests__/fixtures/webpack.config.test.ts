import { resolve } from 'path'
import type webpack from 'webpack'

/**
 * @file Mock Webpack Configuration
 * @module tests/fixtures/webpack-config-test
 */

const config: webpack.Configuration = {
  mode: 'development',
  entry: './webpack-source-file.ts',
  output: {
    path: resolve(__dirname, '../dist'),
    filename: 'webpack-source-file.js'
  }
}

export default config
