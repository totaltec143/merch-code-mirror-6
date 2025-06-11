// A comprehensive list of PHP keywords for autocompletion.
export const php_keywords = [
    "abstract", "and", "array", "as", "break", "callable", "case",
    "catch", "class", "clone", "const", "continue", "declare",
    "default", "die", "do", "echo", "else", "elseif", "empty",
    "enddeclare", "endfor", "endforeach", "endif", "endswitch",
    "endwhile", "enum", "eval", "exit", "extends", "final", "finally",
    "fn", "for", "foreach", "function", "global", "goto", "if",
    "implements", "include", "include_once", "instanceof",
    "insteadof", "interface", "isset", "list", "match", "namespace",
    "new", "or", "print", "private", "protected", "public",
    "readonly", "require", "require_once", "return", "static",
    "switch", "throw", "trait", "try", "unset", "use", "var",
    "while", "xor", "yield", "yield from"
].map(l => ({label: l, type: "keyword"}));

// An expanded list of common PHP functions, grouped by category.
export const php_functions = [
    // Array Functions
    "array_change_key_case", "array_chunk", "array_column", "array_combine",
    "array_count_values", "array_diff", "array_diff_assoc", "array_diff_key",
    "array_filter", "array_flip", "array_intersect", "array_intersect_key",
    "array_key_exists", "array_keys", "array_map", "array_merge",
    "array_merge_recursive", "array_multisort", "array_pad", "array_pop",
    "array_push", "array_rand", "array_reduce", "array_replace",
    "array_reverse", "array_search", "array_shift", "array_slice",
    "array_sum", "array_unique", "array_unshift", "array_values", "arsort",
    "asort", "count", "current", "each", "end", "in_array", "is_array",
    "key", "krsort", "ksort", "natcasesort", "natsort", "next", "pos",
    "prev", "range", "reset", "rsort", "shuffle", "sizeof", "sort",

    // String Functions
    "addslashes", "bin2hex", "chr", "chunk_split", "convert_uudecode",
    "convert_uuencode", "crypt", "echo", "explode", "fprintf", "get_html_translation_table",
    "hex2bin", "html_entity_decode", "htmlentities", "htmlspecialchars",
    "htmlspecialchars_decode", "implode", "join", "lcfirst", "ltrim",
    "md5", "money_format", "nl2br", "number_format", "ord", "parse_str",
    "print", "printf", "rtrim", "sha1", "soundex", "sprintf", "sscanf",
    "str_ireplace", "str_pad", "str_repeat", "str_replace", "str_rot13",
    "str_shuffle", "str_split", "str_word_count", "strip_tags",
    "stripslashes", "strcasecmp", "strcmp", "strpos", "strtolower",
    "strtoupper", "strstr", "strtok", "strtr", "substr", "trim",
    "ucfirst", "ucwords", "vfprintf", "vprintf", "vsprintf", "wordwrap",

    // Filesystem Functions
    "basename", "chmod", "chown", "copy", "dirname", "disk_free_space",
    "disk_total_space", "fclose", "feof", "file_exists", "file_get_contents",
    "file_put_contents", "fileatime", "filectime", "filemtime", "filesize",
    "filetype", "flock", "fopen", "fread", "fseek", "is_dir", "is_file",
    "is_readable", "is_writable", "is_executable", "link", "mkdir",
    "move_uploaded_file", "pathinfo", "pclose", "popen", "readfile",
    "realpath", "rename", "rmdir", "stat", "unlink",

    // Date/Time Functions
    "checkdate", "date_create", "date_format", "date", "getdate",
    "gmdate", "gmmktime", "gmstrftime", "idate", "localtime",
    "microtime", "mktime", "strftime", "strtotime", "time",

    // JSON Functions
    "json_decode", "json_encode", "json_last_error", "json_last_error_msg",

    // Other common functions
    "abs", "ceil", "floor", "round", "sqrt", "rand", "mt_rand",
    "password_hash", "password_verify", "error_log", "phpinfo",
    "session_start", "session_destroy", "setcookie", "header", "mail"
].map(l => ({label: l, type: "function"}));

// An expanded list of PHP constants and superglobals.
export const php_constants = [
    // Magic Constants
    "__DIR__", "__FILE__", "__LINE__", "__FUNCTION__", "__CLASS__",
    "__METHOD__", "__NAMESPACE__", "__TRAIT__",
    
    // Superglobals
    "$_GET", "$_POST", "$_REQUEST", "$_SERVER", "$_SESSION",
    "$_COOKIE", "$_FILES", "$_ENV", "$GLOBALS",
    
    // Predefined Constants
    "true", "false", "null", "PHP_EOL", "PHP_VERSION",
    "PHP_INT_MAX", "PHP_INT_MIN", "PHP_INT_SIZE",
    "DEFAULT_INCLUDE_PATH", "E_ALL", "E_ERROR", "E_WARNING",
    "E_NOTICE", "E_STRICT"
].map(l => ({label: l, type: "constant"}));
