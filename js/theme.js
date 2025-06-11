import { EditorView } from '@codemirror/view';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags } from '@lezer/highlight';

// Base theme styles for the editor's chrome, using our CSS variables.
const merch_theme = EditorView.theme({
    '&': {
        color: 'var(--ide_text)',
        backgroundColor: 'var(--ide_bg)',
        border: '1px solid var(--line)',
        borderRadius: '4px',
        height: '100%'
    },
    '.cm-scroller': {
        fontFamily: "'Courier New', Courier, monospace",
        overflow: 'auto'
    },
    '.cm-content': {
        caretColor: 'var(--highlight)'
    },
    '.cm-cursor, .cm-dropCursor': {
        borderLeftColor: 'var(--highlight)'
    },
    '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
        backgroundColor: 'var(--ide_selection)'
    },
    '.cm-gutters': {
        backgroundColor: 'var(--ide_gutter_bg)',
        color: 'var(--ide_gutter)',
        border: 'none'
    },
    '.cm-activeLine': {
        backgroundColor: 'var(--hover)'
    },
    '.cm-activeLineGutter': {
        backgroundColor: 'var(--ide_active_gutter)'
    }
}, {dark: false});

// Syntax highlighting styles, fully driven by our CSS variables.
const merch_highlight_style = HighlightStyle.define([
    { tag: tags.keyword,                    color: 'var(--ide_keyword)' },
    { tag: tags.atom,                       color: 'var(--ide_atom)' },
    { tag: tags.bool,                       color: 'var(--ide_atom)' },
    { tag: tags.number,                     color: 'var(--ide_number)' },
    { tag: [tags.string, tags.inserted],    color: 'var(--ide_string)' },
    { tag: [tags.comment, tags.meta],       color: 'var(--ide_comment)', fontStyle: 'italic' },
    { tag: tags.variableName,               color: 'var(--ide_variable)' },
    { tag: [tags.propertyName, tags.attributeName], color: 'var(--ide_property)' },
    { tag: [tags.className, tags.tagName],  color: 'var(--ide_tag)' },
    { tag: [tags.link, tags.url],           color: 'var(--ide_link)' },
    { tag: tags.invalid,                    color: 'var(--ide_error)' },
    { tag: tags.heading,                    fontWeight: 'bold', color: 'var(--highlight)' },
    { tag: tags.strong,                     fontWeight: 'bold' },
    { tag: tags.emphasis,                   fontStyle: 'italic' },
    { tag: tags.strikethrough,              textDecoration: 'line-through' }
]);

// We export our theme and the syntax highlighting style as a single,
// easy-to-use extension.
export const merch_ide_theme = [
    merch_theme,
    syntaxHighlighting(merch_highlight_style)
]
