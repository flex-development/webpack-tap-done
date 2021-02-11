import type { Stats } from 'webpack'

/**
 * @file Type Definitions
 * @module types
 */

/**
 * Callback function to execute after Webpack build.
 *
 * @see https://webpack.js.org/api/stats/#structure
 *
 * @param stats - Webpack stats object
 */
export type TapDoneCallback = (stats: Stats) => any | Promise<any>
