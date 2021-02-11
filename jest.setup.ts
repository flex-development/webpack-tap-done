import * as execa from 'execa'

/**
 * @file Jest Global Setup Configuration
 * @see https://jestjs.io/docs/en/configuration#setupfilesafterenv-array
 */

// Remove test Webpack output directory
execa.commandSync('rm -rf __tests__/dist || true')
