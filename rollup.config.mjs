import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

// We define the banner content here.
// Using backticks (`) allows for a multi-line string.
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
 * @version 1.0.0
 * @built ${new Date().toUTCString()}
 * @license Proprietary / MIT (see licenses of bundled software)
 */`;


export default {
    input: 'js/editor-factory.js',

    output: {
        // This is the new property we are adding.
        banner: banner_content,

        file: 'dist/codemirror.bundle.js',
        format: 'iife'
    },

    plugins: [
        resolve(),
        terser()
    ]
};
