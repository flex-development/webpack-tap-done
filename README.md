# Webpack Tap Done Plugin

[![TypeScript](https://badgen.net/badge/-/typescript?icon=typescript&label)](https://www.typescriptlang.org/)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

## Overview

[Getting Started](#getting-started)  
[Installation](#installation)  
[Usage](#usage)  
[Built With](#built-with)  
[Contributing](docs/CONTRIBUTING.md)

## Getting Started

Execute (a)synchronous callbacks after [Webpack][1] compilations. Functions will
be called with the `stats` object.

## Installation

1. Create or edit an `.npmrc` file with the following information:

   ```utf-8
   @flex-development:registry=https://npm.pkg.github.com/
   //npm.pkg.github.com/:_authToken=${GH_PAT}
   ```

2. Add development dependencies

   ```zsh
   yarn add -D @flex-development/webpack-tap-done webpack
   ```

   If you're using TypeScript:

   ```zsh
   yarn add -D @flex-development/webpack-tap-done webpack ts-node @types/node @types/webpack
   ```

## Usage

The example below is from a [Next.js][3] project that implements an
`InlineStylesHead` component:

```javascript
const TapDoneWebpackPlugin = require('@flex-development/webpack-tap-done')
const debug = require('debug')
const fse = require('fs-extra')
const path = require('path')

/**
 * @file Next.js Configuration
 * @see https://nextjs.org/docs/api-reference/next.config.js/introduction
 */

/**
 * Copies all files in `.next/static/css` to `.next/${target}/static/css`.
 *
 * This function is required to read CSS files from the server (in Vercel
 * hosting) environments. It's used in lieu of adding a custom CSS configuration
 * to Webpack, which would disbale built-in CSS support.
 *
 * @return {boolean} True if files were succesfully copied, false otherwise
 */
const copyCSSAssets = () => {
  // Initialize logger
  const log = debug('copy-css-assets')

  // Change server directory if in Vercel environment
  const target = `server${process.env.VERCEL ? 'less' : ''}`

  // Client CSS directory
  const src = path.resolve(process.cwd(), '.next/static/css')

  // Server CSS directory
  const dest = path.resolve(process.cwd(), `.next/${target}/static/css`)

  // Copy CSS assets
  fse.copy(src, dest, err => {
    if (err) {
      log(err)
      return false
    }

    log(`Copied ${src} files to ${dest} directory.`)
    return true
  })
}

module.exports = {
  /**
   * Extends the native Webpack configuration.
   *
   * @param {import('webpack').Configuration} config - Webpack config object
   * @param {object} helpers - Next.js helpers
   * @param {boolean} helpers.dev - True if the compiling in development mode
   * @param {boolean} helpers.isServer - `true` for server-side compilation
   * @param {import('webpack')} helpers.webpack - Webpack
   * @return {import('webpack').Configuration} Altered Webpack configuration
   */
  webpack: (config, { dev, isServer }) => {
    /**
     * Callback function to hook into end of Webpack build cycle.
     *
     * In non-dev environments, CSS assets from the client will copied to the
     * server's static CSS directory.
     *
     * This allows us to inline styles via the `InlineStylesHead` component w/o
     * disabling built-in CSS support.
     *
     * @return {void}
     */
    const tapDone = () => {
      if (!dev && !isServer) copyCSSAssets()
    }

    // Add plugin to hook into end of Webpack build cycle
    config.plugins.push(new TapDoneWebpackPlugin(tapDone))
  }
}
```

The `InlineStylesHead` component:

```typescript
import { existsSync, readdirSync, readFileSync } from 'fs'
import { Head } from 'next/document'
import { resolve } from 'path'

/**
 * @file Implementation - InlineStylesHead
 * @module components/InlineStylesHead
 */

/**
 * Allows Critical CSS to be delivered via inline `<style>` tags.
 *
 * This solves the following Lighthouse warning:
 *
 * > "External stylesheets are blocking the first paint of your page.
 * > Consider delivering critical CSS via `<style>` tags and deferring
 * > non-critical styles".
 *
 * @see https://github.com/vercel/next-plugins/issues/238
 * @see https://github.com/vercel/next-plugins/issues/238#issuecomment-696623272
 *
 * @class InlineStylesHead
 * @extends Head
 */
export class InlineStylesHead extends Head {
  /**
   * Returns an array of `<style>` elements containing the styles from each file
   * in the `static/css` directory.
   *
   * @see https://github.com/vercel/vercel/issues/3083#issuecomment-654244864
   * @see https://github.com/vercel/next.js/issues/8251
   */
  getCssLinks(): JSX.Element[] | null {
    const dir = `.next/server${process.env.VERCEL ? 'less' : ''}/static/css`
    const resdir = resolve(process.cwd(), dir)

    if (!existsSync(resdir)) return []

    return readdirSync(resdir).map(file => {
      const $file = resolve(process.cwd(), dir, file)
      let __html = ''

      try {
        __html = readFileSync($file, 'utf-8')
      } catch (error) {
        console.error({ 'InlineStylesHead.getCssLinks': error })
        throw error
      }

      return (
        <style
          dangerouslySetInnerHTML={{ __html }}
          key={file}
          nonce={this.props.nonce}
          type='text/css'
        />
      )
    })
  }
}
```

## Built With

- [Webpack Compiler Hooks][4]

[1]: https://webpack.js.org/concepts/
[2]:
  https://docs.github.com/en/packages/guides/configuring-npm-for-use-with-github-packages#installing-a-package
[3]: https://nextjs.org/
[4]: https://webpack.js.org/api/compiler-hooks/
