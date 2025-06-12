/* MerchStudio Editor Engine
 * @version js/editor-factory.js - 3.0 - 06-10-2025 - totaltec
 */

import { EditorState, StateEffect } from '@codemirror/state';
import { EditorView, keymap, lineNumbers, highlightActiveLineGutter } from '@codemirror/view';
import { defaultKeymap, history, indentWithTab } from '@codemirror/commands';
import { searchKeymap, highlightSelectionMatches } from '@codemirror/search';
import { autocompletion, completionKeymap, closeBrackets } from '@codemirror/autocomplete';
import { foldGutter, indentOnInput, bracketMatching, foldKeymap, indentUnit } from '@codemirror/language';
import { merch_ide_theme } from './theme.js';
import { get_language_support } from './languages.js';

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
            // The autocomplete extension is now simple. The language
            // itself will provide the source.
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
        return new EditorView({ state: start_state, parent: parent_element });
    },

    get_language: function(file_type) {
        return get_language_support(file_type) || [];
    }
};

MerchIDE_Editor.EditorView = EditorView; 
MerchIDE_Editor.EditorState = EditorState;
MerchIDE_Editor.StateEffect = StateEffect;
MerchIDE_Editor.keymap = keymap

window.MerchIDE_Editor = MerchIDE_Editor;
