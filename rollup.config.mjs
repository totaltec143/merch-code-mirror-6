import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

// Banner for the main bundle
const banner_content = `/**
 * @preserve
 * MerchStudio CodeMirror 6 Bundle
 *
 * Copyright (c) 2025 Michael Lewis White and MerchStudio Inc.
 * <mike@bestsignsupply.com> <hello@merchstudio.app>
 *
 * This bundle contains CodeMirror, distributed under the MIT license,
 * and other third-party software with their own licenses.
 *
 * @link    https://github.com/totaltec143/merch-code-mirror-6
 * @version 1.0.0
 * @built   ${new Date().toUTCString()}
 * @license Proprietary / MIT (see licenses of bundled software)
 */`;

// We now export an array to define two separate builds
export default [
    // Build #1: The Main Editor Bundle
    {
        input: 'js/editor-factory.js',
        output: {
            banner: banner_content,
            file: 'dist/codemirror.bundle.js',
            format: 'iife'
        },
        plugins: [
            resolve(),
            terser()
        ]
    },
    // Build #2: The JavaScript Linter Worker
    {
        input: 'js/guardian.js',
        output: {
            file: 'dist/guardian.bundle.js', // We'll give it a new name
            format: 'iife' // The worker needs to be a self-contained script
        },
        plugins: [
            resolve(),
            terser()
        ]
    }
];
