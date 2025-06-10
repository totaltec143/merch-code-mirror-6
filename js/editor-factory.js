/* MerchStudio Editor Engine
 * Copyright (c) 2025 Michael Lewis White & MerchStudio Inc.
 * This file bundles CodeMirror and exposes a simple API.
 * @version js/editor-factory.js - 1.1 - 06-10-2025 - totaltec
 */

import { EditorState, StateEffect } from '@codemirror/state';
import {
    EditorView, keymap, lineNumbers,
    highlightActiveLineGutter
} from '@codemirror/view';
import {
    defaultKeymap, history, indentWithTab
} from '@codemirror/commands';
import {
    searchKeymap, highlightSelectionMatches
} from '@codemirror/search';
import {
    autocompletion, completionKeymap, closeBrackets
} from '@codemirror/autocomplete';
import {
    foldGutter, indentOnInput, bracketMatching, foldKeymap
} from '@codemirror/language';
import { merch_ide_theme } from './theme.js';
import { get_language_support } from './languages.js';

const MerchIDE_Editor = {
    create: function(parent_element, on_change_callback) {
        const core_setup = [
            lineNumbers(),
            highlightActiveLineGutter(),
            history(),
            foldGutter(),
            indentOnInput(),
            bracketMatching(),
            closeBrackets(),
            autocompletion(),
            highlightSelectionMatches(),
            merch_ide_theme,
            EditorView.lineWrapping,
            keymap.of([
                ...defaultKeymap,
                ...searchKeymap,
                ...foldKeymap,
                ...completionKeymap,
                indentWithTab
            ])
        ];

        const change_listener = EditorView.updateListener.of(
            (update) => {
                if (update.docChanged) {
                    on_change_callback();
                }
            }
        );
        
        // We add the Ctrl+S/Cmd+S keyboard shortcut for saving.
        const save_keymap = keymap.of([{
            key: "Mod-s",
            run: (view) => {
                // We reference a global save function that will be
                // defined in the main merchide.js file.
                if (typeof merch_ide !== 'undefined' &&
                    typeof merch_ide.save_active_file === 'function'
                ) {
                    // Check if the save button is enabled before saving.
                    if (!merch_ide.elements.save_button.disabled) {
                        merch_ide.save_active_file();
                    }
                }
                return true;
            }
        }]);

        let start_state = EditorState.create({
            doc: '',
            extensions: [
                core_setup,
                change_listener,
                save_keymap,
                [] // Placeholder for language
            ]
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

// FINAL CHANGE: We expose core CM6 objects on our API so the
// main merchide.js file can use them for advanced operations.
MerchIDE_Editor.EditorState = EditorState;
MerchIDE_Editor.StateEffect = StateEffect;

window.MerchIDE_Editor = MerchIDE_Editor;
