/* MerchStudio Editor Engine
 * Copyright (c) 2025 Michael Lewis White & MerchStudio Inc.
 * This file bundles CodeMirror and exposes a simple API.
 * @version js/editor-factory.js - 1.2 - 06-10-2025 - totaltec
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
    /**
     * Creates a new CodeMirror 6 instance.
     * @param {HTMLElement} parent_element The DOM element to attach to.
     * @param {function} on_change_callback A function to call
     * when the editor content changes.
     * @returns {EditorView} The created editor view instance.
     */
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

        let start_state = EditorState.create({
            doc: '',
            extensions: [
                core_setup,
                change_listener,
                [] // Placeholder for language
            ]
        });

        return new EditorView({
            state: start_state,
            parent: parent_element
        });
    },

    /**
     * Helper to get the language support extension.
     * We expose this so the main app doesn't need to know
     * about the language map.
     * @param {string} file_type The file extension.
     * @returns {LanguageSupport|[]}
     */
    get_language: function(file_type) {
        return get_language_support(file_type) || [];
    }
};

// We expose core CM6 objects on our API so the main app can
// use them for advanced operations like changing state.
MerchIDE_Editor.EditorState = EditorState;
MerchIDE_Editor.StateEffect = StateEffect;
MerchIDE_Editor.keymap = keymap; // Expose keymap for save shortcut

window.MerchIDE_Editor = MerchIDE_Editor;
