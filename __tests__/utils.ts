import WEBPACK_CONFIG_TEST from '@fixtures/webpack.config.test'
import TapDoneWebpackPlugin from '@webpack-tap-done'
import type { TapDoneCallback } from '@webpack-tap-done/types'
import * as webpack from 'webpack'
import merge from 'webpack-merge'

/**
 * @file Testing Utilities
 * @module tests/utils
 */

/**
 * Creates a Webpack compiler.
 *
 * @param {TapDoneCallback} cb - Callback to initialize TapDoneWebpackPlugin
 * @return {webpack.Compiler}
 */
export const createCompiler = (cb: TapDoneCallback): webpack.Compiler => {
  const Plugin = new TapDoneWebpackPlugin(cb)
  const compiler = webpack(merge(WEBPACK_CONFIG_TEST, { plugins: [Plugin] }))

  Plugin.apply(compiler)
  return compiler
}
