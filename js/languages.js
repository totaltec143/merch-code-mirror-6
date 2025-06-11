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

import { php_keywords, php_functions, php_constants } from './php-completions.js';
import { smarty_mode } from './legacy/smarty.js';
import { apache_mode } from './legacy/apache.js';

// Create the custom completion source for PHP.
const php_completion_extension = php().language.data.of({
    autocomplete: completeFromList([
        ...php_keywords,
        ...php_functions,
        ...php_constants
    ])
});

// The language map with the final, correct configuration.
const language_map = {
    // For PHP, we provide an array of extensions: the base
    // language, and our custom completion source.
    php: [php(), php_completion_extension],

    // Other languages are unchanged.
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

export function get_language_support(file_type) {
    return language_map[file_type];
}
