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

// We now import our own local, reliable legacy mode files.
import { smarty_mode } from './legacy/smarty.js';
import { apache_mode } from './legacy/apache.js';


const language_map = {
    php: php(),
    css: css(),
    js: javascript(),
    html: html(),
    json: json(),
    sql: sql(),
    md: markdown(),
    xml: xml(),
    svg: xml(),
    yml: yaml(),
    
    // We now use our directly imported mode objects.
    htaccess: StreamLanguage.define(apache_mode),
    tpl: StreamLanguage.define(smarty_mode)
};

/**
 * Gets the CodeMirror language extension for a given file type.
 * This function provides a clean, readable way to get the correct
 * syntax highlighter from our map.
 * @param {string} file_type - The file extension (e.g., 'php', 'tpl').
 * @returns {LanguageSupport | undefined}
 */
export function get_language_support(file_type) {
    return language_map[file_type];
}