/* MerchStudio Editor Engine
 * @version js/editor-factory.js - 3.3 - 06-12-2025 - Gemini
 */

import {
    EditorState, StateEffect
} from '@codemirror/state';
import {
    EditorView, keymap, lineNumbers, highlightActiveLineGutter,
    ViewPlugin, Decoration
} from '@codemirror/view';
import {
    defaultKeymap, history, indentWithTab, undo, redo
} from '@codemirror/commands';
import {
    searchKeymap, highlightSelectionMatches
} from '@codemirror/search';
import {
    autocompletion, completionKeymap, closeBrackets
} from '@codemirror/autocomplete';
import {
    foldGutter, indentOnInput, bracketMatching, foldKeymap, indentUnit
} from '@codemirror/language';
import {
    merch_ide_theme
} from './theme.js';
import {
    get_language_support
} from './languages.js';

/**
 * Creates a ViewPlugin that draws a vertical ruler at a given column.
 * This is our own simple, reusable extension.
 * @param {number} column The column number to draw the ruler at.
 * @returns {ViewPlugin} The CodeMirror ViewPlugin.
 */
const ruler = (column) => {
    return ViewPlugin.fromClass(class {
        constructor(view) {
            this.view = view;
            this.decorations = this.get_decos();
        }
        update(update) {
            if (update.docChanged || update.viewportChanged) {
                this.decorations = this.get_decos();
            }
        }
        get_decos() {
            const {
                doc,
                state
            } = this.view;
            const builder = new state.facet(Decoration.builder);
            const char_width = this.view.defaultCharacterWidth;
            const left = column * char_width;

            const ruler_deco = Decoration.widget({
                widget: new class extends Decoration.Widget {
                    toDOM() {
                        const r = document.createElement("div");
                        r.className = "cm-ruler";
                        r.style.left = `${left}px`;
                        return r;
                    }
                }(),
                side: -1
            });

            // We add the ruler widget to the first visible line.
            // CodeMirror will handle positioning it correctly for the view.
            if (this.view.viewport.to > 0) {
                const first_line = this.view.state.doc.lineAt(
                    this.view.viewport.from
                );
                builder.add(first_line.from, first_line.from, ruler_deco);
            }

            return builder.finish();
        }
    }, {
        decorations: v => v.decorations
    });
};

const MerchIDE_Editor = {
    create_core_setup: function() {
        return [
            lineNumbers(),
            highlightActiveLineGutter(),
            history(),
            foldGutter(),
            indentUnit.of("    "),
            indentOnInput(),
            bracketMatching(),
            closeBrackets(),
            autocompletion(),
            highlightSelectionMatches(),
            merch_ide_theme,
            EditorView.lineWrapping,
            keymap.of([
                ...defaultKeymap, ...searchKeymap, ...foldKeymap,
                ...completionKeymap, indentWithTab
            ])
        ];
    },

    create: function(parent_element, extensions) {
        let start_state = EditorState.create({
            doc: '# Welcome to the MerchStudio IDE!\n# Select a file to begin.',
            extensions: extensions
        });
        return new EditorView({
            state: start_state,
            parent: parent_element
        });
    },

    get_language: function(file_type) {
        return get_language_support(file_type) || [];
    }
};

MerchIDE_Editor.undo = undo;
MerchIDE_Editor.redo = redo;
MerchIDE_Editor.EditorView = EditorView;
MerchIDE_Editor.EditorState = EditorState;
MerchIDE_Editor.StateEffect = StateEffect;
MerchIDE_Editor.keymap = keymap;
MerchIDE_Editor.ruler = ruler; // We export our new function

window.MerchIDE_Editor = MerchIDE_Editor;
