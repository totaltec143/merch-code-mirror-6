/* MerchStudio Code Languages
 * @version js/languages.js - 0.2 - 07-11-2025 - Gemini
 */
import { php } from '@codemirror/lang-php';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { json } from '@codemirror/lang-json';
import { sql } from '@codemirror/lang-sql';
import { markdown } from '@codemirror/lang-markdown';
import { xml } from '@codemirror/lang-xml';
import { yaml } from '@codemirror/lang-yaml';
import { StreamLanguage } from '@codemirror/language';
import { completeFromList } from '@codemirror/autocomplete';
// Import the main linter function
import { linter } from '@codemirror/lint';

import { php_keywords, php_functions, php_constants } from './php-completions.js';
import { smarty_mode } from './legacy/smarty.js';

// Create a Web Worker for JavaScript linting using our new file.
const js_linter_worker = new Worker(new URL('./guardian.bundle.js', import.meta.url), { type: 'module' });

// Create the JavaScript linter extension.
// This function creates a "promise" that waits for the worker to send back linting results.
const js_linter = linter(view => {
    return new Promise(resolve => {
        const listener = (event) => {
            // When the worker sends a message, stop listening to avoid duplicates
            js_linter_worker.removeEventListener("message", listener);
            // The data from the worker is an array of ESLint messages.
            // We need to convert them into the format CodeMirror expects.
            const diagnostics = event.data.map(e => ({
                from: view.state.doc.line(e.line).from + e.column - 1,
                to: view.state.doc.line(e.line).from + e.column,
                severity: e.severity === 2 ? "error" : "warning",
                message: e.message,
            }));
            resolve(diagnostics);
        };
        js_linter_worker.addEventListener("message", listener);
        // Send the current editor content to the worker.
        js_linter_worker.postMessage({ code: view.state.doc.toString() });
    });
}, {
    delay: 500 // Wait 500ms after the user stops typing to run the linter
});

// Create the PHP linter extension.
// This sends the code to a server endpoint for validation.
const php_linter = linter(async view => {
    const content = view.state.doc.toString();
    const diagnostics = [];

    // We only run the linter if there is content to check.
    if (content.length > 0) {
        try {
            // We use your existing merch_core.merch_fetch to call the linter.
            const response = await merch_core.merch_fetch(
                'lint_php', 
                { code: content },
                true // Bypass the default success message popup
            );

            // We check for the specific response format from your linter function.
            if (response && response.is_valid === false) {
                const line_num = response.line || 1; // Default to line 1
                const line = view.state.doc.line(line_num);

                diagnostics.push({
                    from: line.from,
                    to: line.to,
                    severity: "error",
                    message: response.error,
                });
            }
        } catch (err) {
            console.error("MerchIDE: PHP Linting request failed.", err);
        }
    }
    return diagnostics;
}, {
    delay: 750 // Wait 750ms after the user stops typing
});


// Create the custom completion source for PHP.
const php_completion_extension = php().language.data.of({
    autocomplete: completeFromList([
        ...php_keywords,
        ...php_functions,
        ...php_constants
    ])
});

// The language map with the correct configuration.
const language_map = {
    // For PHP, we provide an array of extensions: the base
    // language, our custom completion source, and the linter.
    php: [php(), php_completion_extension, php_linter],

    // Add the JavaScript linter to the JS language support
    js: [javascript(), js_linter],

    // Other languages are unchanged.
    css: css(),
    html: html(),
    json: json(),
    sql: sql(),
    md: markdown(),
    xml: xml(),
    svg: xml(),
    yml: yaml(),
    tpl: StreamLanguage.define(smarty_mode)
};

export function get_language_support(file_type) {
    return language_map[file_type];
}
