/* MerchStudio Editor Engine
* @version js/editor-factory.js - 3.6 - 07-17-2025 - Gemini
*/

import {
    EditorState, StateEffect
} from '@codemirror/state';
import {
    EditorView, keymap, lineNumbers, highlightActiveLineGutter,
    ViewPlugin, Decoration, WidgetType
} from '@codemirror/view';
import {
    defaultKeymap, history, indentWithTab, undo, redo
} from '@codemirror/commands';
import {
    search, searchKeymap, highlightSelectionMatches
} from '@codemirror/search';
import {
    autocompletion, completionKeymap, closeBrackets
} from '@codemirror/autocomplete';
import {
    foldGutter, indentOnInput, bracketMatching, foldKeymap, indentUnit
} from '@codemirror/language';
// Import the linting gutter
import { lintGutter } from '@codemirror/lint';

// --- Import MergeView ---
import { MergeView } from "@codemirror/merge";

import {
    merch_ide_theme
} from './theme.js';
import {
    get_language_support
} from './languages.js';

/**
 * Creates a ViewPlugin that draws a full-height vertical ruler.
 * This dynamically adjusts the ruler's height to match the
 * editor's full scrollable content height.
 * @param {number} column The column number to draw the ruler at.
 * @returns {ViewPlugin} The CodeMirror ViewPlugin.
 */
const ruler = (column) => {
    return ViewPlugin.fromClass(class {
        constructor(view) {
            this.decorations = this.get_decos(view);
        }

        update(update) {
            // We update the ruler if the document or viewport changes.
            if (update.docChanged || update.viewportChanged) {
                this.decorations = this.get_decos(update.view);
            }
        }

        get_decos(view) {
            const char_width = view.defaultCharacterWidth;
            const left = column * char_width;
            // We get the full scrollable height of the content.
            const content_height = view.contentDOM.scrollHeight;

            const ruler_deco = Decoration.widget({
                // We pass the calculated height into our widget's constructor.
                widget: new(class extends WidgetType {
                    constructor(height) {
                        super();
                        this.height = height;
                    }
                    toDOM() {
                        const r = document.createElement("div");
                        r.className = "cm-ruler";
                        r.style.left = `${left}px`;
                        // The widget now sets its own height dynamically.
                        r.style.height = `${this.height}px`;
                        return r;
                    }
                })(content_height),
                side: -1,
            });

            const from = view.viewport.from;
            return Decoration.set([ruler_deco.range(from)]);
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
            lintGutter(),
            history(),
            foldGutter(),
            indentUnit.of("    "),
            indentOnInput(),
            bracketMatching(),
            closeBrackets(),
            autocompletion(),
            highlightSelectionMatches(),
            search(), 
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

// --- We export all necessary components on our global object ---
MerchIDE_Editor.undo = undo;
MerchIDE_Editor.redo = redo;
MerchIDE_Editor.EditorView = EditorView;
MerchIDE_Editor.EditorState = EditorState;
MerchIDE_Editor.StateEffect = StateEffect;
MerchIDE_Editor.keymap = keymap;
MerchIDE_Editor.ruler = ruler;

// --- Export MergeView from our unified bundle ---
MerchIDE_Editor.MergeView = MergeView;

window.MerchIDE_Editor = MerchIDE_Editor;
