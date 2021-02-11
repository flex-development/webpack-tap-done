import debug from 'debug'
import type { Stats } from 'webpack'

/**
 * @file Fixture - Synchronous Callback
 * @module tests/fixtures/callback
 */

export default (stats: Stats): void => debug('fixtures/callback')({ stats })
