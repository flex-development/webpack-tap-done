import callbackSync from '@fixtures/callback'
import callbackAsync from '@fixtures/callback-async'
import { createCompiler as compiler } from '@test-utils'

/**
 * @file Unit Tests - TapDoneWebpackPlugin
 * @module tests/specs/TapDoneWebpackPlugin
 */

describe('TapDoneWebpackPlugin', () => {
  it('executes asynchronous callback with stats object', async () => {
    const mockCallback = jest.fn(callbackAsync)

    compiler(mockCallback).run((err, stats) => {
      if (err) {
        console.error(err)
        throw err
      }

      expect(mockCallback).toHaveBeenCalledWith(stats)
    })
  })

  it('executes synchronous callback with stats object', async () => {
    const mockCallback = jest.fn(callbackSync)

    compiler(mockCallback).run((err, stats) => {
      if (err) {
        console.error(err)
        throw err
      }

      expect(mockCallback).toHaveBeenCalledWith(stats)
    })
  })
})
