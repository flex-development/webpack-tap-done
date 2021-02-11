import debug from 'debug'
import type { Stats } from 'webpack'

/**
 * @file Fixture - Async Callback
 * @module tests/fixtures/callback-async
 */

export default async (stats: Stats): Promise<void> => {
  return Promise.resolve(debug('fixtures/callback-async')({ stats }))
}
