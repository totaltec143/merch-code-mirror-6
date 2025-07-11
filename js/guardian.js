/* MerchStudio Linter (part of Guardian Angel Protocol)
 * @version js/guardian.js - 0.1 - 07-11-2025 - Gemini
 */
import { Linter } from "eslint-linter-browserify";

// The Linter class constructor is not used for configuration here.
const linter = new Linter();

// Listen for messages from the main editor script
self.onmessage = (event) => {
    const { code } = event.data;

    // This is the "flat config" format. It's an array of objects.
    const config = [
        {
            languageOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                // We are defining all of our application's
                // global variables here. The "readonly" value
                // tells the linter that our code can use these
                // variables, but not re-assign them.
                globals: {
                    browser: "readonly",
                    es6: "readonly",
                    document: "readonly",
                    window: "readonly",
                    console: "readonly",
                    setTimeout: "readonly",
                    confirm: "readonly",
                    getComputedStyle: "readonly",
                    parseInt: "readonly",
                    isNaN: "readonly",
                    Promise: "readonly",
                    Worker: "readonly",
                    URL: "readonly",
                    // Our application globals
                    nexus: "readonly",
                    merch_core: "readonly",
                    merch_sort: "readonly",
                    merch_images: "readonly",
                    merch_menu: "readonly",
                    merch_admin: "readonly",
                    merch_collect: "readonly",
                    merch_ide: "readonly",
                    merch_nexus: "readonly",
                    merch_users: "readonly"
                }
            },
            rules: {
                "semi": ["error", "always"],
                "no-unused-vars": "warn",
                "no-undef": "error"
            }
        }
    ];

    // The 'verify' method takes the code and the config array.
    const errors = linter.verify(code, config);

    self.postMessage(errors);
};
