import { php } from '@codemirror/lang-php';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { json } from '@codemirror/lang-json';
import { sql } from '@codemirror/lang-sql';
import { markdown } from '@codemirror/lang-markdown';
import { xml } from '@codemirror/lang-xml';
import { yaml } from '@codemirror/lang-yaml';
import { StreamLanguage, languageData } from '@codemirror/language';
import { completeFromList } from '@codemirror/autocomplete';

// Import our new custom completion lists
import {
    php_keywords, php_functions, php_constants
} from './php-completions.js';

// Import our manually created legacy modes
import smarty_mode from './legacy/smarty.js';
import apache_mode from './legacy/apache.js';

// Create a single, powerful completion source for PHP
const php_completion_source = completeFromList([
    ...php_keywords,
    ...php_functions,
    ...php_constants
]);

// We now create a map to associate file extensions with their
// corresponding CodeMirror language support function.
const language_map = {
    php: php({
        // We attach our custom completion source to the PHP language data.
        languageData: {
            autocomplete: php_completion_source
        }
    }),
    css: css(),
    js: javascript(),
    html: html(),
    json: json(),
    sql: sql(),
    md: markdown(),
    xml: xml(),
    svg: xml(),
    yml: yaml(),
    
    htaccess: StreamLanguage.define(apache_mode),
    tpl: StreamLanguage.define(smarty_mode)
};

/**
 * Gets the CodeMirror language extension for a given file type.
 * @param {string} file_type - The file extension (e.g., 'php', 'tpl').
 * @returns {LanguageSupport | undefined}
 */
export function get_language_support(file_type) {
    return language_map[file_type];
}
