import { EditorView } from '@codemirror/view';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags } from '@lezer/highlight';

// This is our base theme definition. It styles the editor's "chrome"
// (gutters, background, selection, etc.) using your CSS variables.
const merch_theme = EditorView.theme({
    // The main editor container
    '&': {
        color: 'var(--text)',
        backgroundColor: 'var(--bg)',
        border: '1px solid var(--line)',
        borderRadius: '4px', // A subtle rounding to match your style
        height: '100%' // Ensures the editor fills its container
    },
    // The part of the editor that scrolls
    '.cm-scroller': {
        fontFamily: "'Courier New', Courier, monospace",
        overflow: 'auto'
    },
    // The text content area
    '.cm-content': {
        caretColor: 'var(--highlight)'
    },
    // The cursor
    '.cm-cursor, .cm-dropCursor': {
        borderLeftColor: 'var(--highlight)'
    },
    // Text selection
    '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
        backgroundColor: 'rgba(138, 196, 255, 0.25)' // --accent_blue w/ alpha
    },
    // Line numbers and folding markers gutter
    '.cm-gutters': {
        backgroundColor: 'var(--base)',
        color: 'var(--middle_grey)',
        border: 'none'
    },
    // The currently active line
    '.cm-activeLine': {
        backgroundColor: 'var(--hover)'
    },
    '.cm-activeLineGutter': {
        backgroundColor: 'var(--hover)'
    }
}, {dark: false}); // We set dark: false because your `data-theme` attribute handles the switch.

// Here, we define the colors for the syntax highlighting itself.
// We map different code elements (tags) to your CSS variables.
const merch_highlight_style = HighlightStyle.define([
    { tag: tags.keyword,                 color: 'var(--link)' },
    { tag: [tags.name, tags.deleted, tags.character, tags.propertyName, tags.macroName], color: 'var(--accent)' },
    { tag: [tags.function(tags.variableName), tags.labelName], color: '#82AAFF' }, // A nice blue for function calls
    { tag: [tags.color, tags.constant(tags.name), tags.standard(tags.name)], color: 'var(--accent_green)' },
    { tag: tags.definition(tags.name),   color: 'var(--text)' },
    { tag: [tags.typeName, tags.className, tags.number, tags.changed, tags.annotation, tags.modifier, tags.self, tags.namespace], color: '#E5C07B'}, // Amber
    { tag: [tags.operator, tags.operatorKeyword], color: 'var(--highlight)' },
    { tag: [tags.url, tags.escape, tags.regexp, tags.link, tags.special(tags.string)], color: '#C792EA' }, // Purple
    { tag: [tags.meta, tags.comment],    color: 'var(--middle_grey)', fontStyle: 'italic' },
    { tag: tags.strong,                  fontWeight: 'bold' },
    { tag: tags.emphasis,                fontStyle: 'italic' },
    { tag: tags.strikethrough,           textDecoration: 'line-through' },
    { tag: tags.link,                    color: 'var(--middle_grey)', textDecoration: 'underline' },
    { tag: tags.heading,                 fontWeight: 'bold', color: 'var(--highlight)' },
    { tag: [tags.atom, tags.bool, tags.special(tags.variableName)], color: 'var(--accent)' },
    { tag: [tags.processingInstruction, tags.string, tags.inserted], color: 'var(--accent_green)' },
    { tag: tags.invalid,                 color: 'var(--accent_red)' },
]);

// We export our theme and the syntax highlighting style as a single,
// easy-to-use extension. This keeps the main setup clean.
export const merch_ide_theme = [
    merch_theme,
    syntaxHighlighting(merch_highlight_style)
]