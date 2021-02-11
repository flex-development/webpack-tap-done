import type { Debugger } from 'debug'
import debug from 'debug'
import type { Compiler } from 'webpack'
import type { TapDoneCallback } from './types'

/**
 * @file Implementation - TapDoneWebpackPlugin
 * @module TapDoneWebpackPlugin
 * @see https://webpack.js.org/contribute/writing-a-plugin/
 */

/**
 * Injects a callback function into the Webpack compiler's `done` lifecycle
 * hook. Asynchronous callbacks supported.
 */
class TapDoneWebpackPlugin {
  /**
   * To export both CommonJS and ES Modules in TypeScript, the `default` export
   * property is required.
   *
   * @private
   * @property {TapDoneWebpackPlugin} default
   */
  static default: typeof TapDoneWebpackPlugin

  /**
   * Callback function to execute after successful Webpack compilation.
   *
   * @instance
   * @private
   * @readonly
   */
  callback: TapDoneCallback

  /**
   * @instance
   * @private
   * @readonly
   */
  debugger: Debugger = debug('webpack-tap-done')

  /**
   * Creates a new `TapDoneWebpackPlugin` instance.
   *
   * @constructor
   * @param {TapDoneCallback} [callback] - Function to execute after compilation
   */
  constructor(callback?: TapDoneCallback) {
    this.callback = callback || (stats => this.debugger(stats))
    this.debugger('initialized plugin instance.')
  }

  /**
   * Tells Webpack to call {@this callback} when compilation is complete.
   *
   * @see https://webpack.js.org/api/compiler-hooks/#done
   * @see https://webpack.js.org/contribute/writing-a-plugin/#tapasync
   *
   * @instance
   * @param {import('webpack').Compiler} compiler - Webpack compiler
   * @return {void}
   */
  apply(compiler: Compiler): void {
    compiler.hooks.done.tapAsync(this.constructor.name, (stats, acb) => {
      this.callback(stats)
      this.debugger.extend('apply')('callback complete.')
      acb()
    })
  }
}

/**
 * The syntax below is required to allow CommonJS users to default import this
 * module without appending a `default` property, and TypeScript users without
 * using the `esModuleInterop` flag.
 *
 * Fixes the following errors:
 *
 * - `TypeError: TapDoneWebpackPlugin is not a constructor`
 * - `This module is declared with using 'export =', and can only be used with a
 *   default import when using the 'esModuleInterop' flag.`
 *
 * @see https://github.com/microsoft/TypeScript/issues/2719
 * @see https://remarkablemark.org/blog/2020/05/05/typescript-export-commonjs-es6-modules/
 */
TapDoneWebpackPlugin.default = TapDoneWebpackPlugin
export = TapDoneWebpackPlugin
