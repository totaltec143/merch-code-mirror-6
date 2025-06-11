// A partial list of PHP keywords for autocompletion.
export const php_keywords = [
    "abstract", "and", "array", "as", "break", "callable", "case",
    "catch", "class", "clone", "const", "continue", "declare",
    "default", "do", "echo", "else", "elseif", "enddeclare",
    "endfor", "endforeach", "endif", "endswitch", "endwhile",
    "enum", "extends", "final", "finally", "fn", "for", "foreach",
    "function", "global", "goto", "if", "implements", "include",
    "include_once", "instanceof", "insteadof", "interface",
    "isset", "list", "match", "namespace", "new", "or", "print",
    "private", "protected", "public", "readonly", "require",
    "require_once", "return", "static", "switch", "throw",
    "trait", "try", "unset", "use", "var", "while", "xor", "yield",
    "yield from"
].map(l => ({label: l, type: "keyword"}));

// A partial list of common PHP functions.
export const php_functions = [
    "array_map", "array_filter", "array_reduce", "array_key_exists",
    "count", "in_array", "is_array", "implode", "explode",
    "json_encode", "json_decode", "isset", "empty", "unset",
    "str_replace", "strlen", "strtolower", "strtoupper", "substr",
    "date", "time", "microtime", "phpinfo", "header", "session_start",
    "setcookie", "password_hash", "password_verify", "htmlspecialchars"
].map(l => ({label: l, type: "function"}));

// A partial list of PHP constants and superglobals.
export const php_constants = [
    "__DIR__", "__FILE__", "__LINE__", "__FUNCTION__", "__CLASS__",
    "__METHOD__", "__NAMESPACE__", "true", "false", "null",
    "$_GET", "$_POST", "$_REQUEST", "$_SERVER", "$_SESSION",
    "$_COOKIE", "$_FILES", "$_ENV"
].map(l => ({label: l, type: "constant"}));
