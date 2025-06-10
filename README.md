# merch-code-mirror-6
The self-contained CodeMirror 6 editor component for the MerchStudio IDE, including all language packs and custom themes.

# MerchStudio IDE - Editor Engine

Source code and build configuration for the MerchIDE editor engine. Packages CodeMirror 6 with bespoke MerchStudio theming and full language support.

## Overview

This repository contains the development source and build process for the core code editor component used within the main MerchStudio application.

It follows a "library bundle" approach. The code in this repository is bundled into a single, optimized JavaScript file (`dist/codemirror.bundle.js`). This bundle is the "engine," which is then loaded and controlled by the main application's JavaScript (`tpl/core/admin/js/merchide.js`).

This separation allows the core editor library to be stable and rarely touched, while the IDE's feature logic can be iterated on rapidly within the main application's codebase.

## Prerequisites

To work with this repository, you will need the following installed on your local development machine:
* [Node.js](https://nodejs.org/) (LTS version 20.x or higher is recommended)
* [npm](https://www.npmjs.com/) (comes bundled with Node.js)

## Workflow

### 1. Install Dependencies

After cloning the repository, navigate to the project directory in your terminal and run the following command to install all the required development tools and libraries:

```bash
npm install
```

### 2. Development

For active development, you can use the `watch` script. This will automatically rebuild the `codemirror.bundle.js` file every time you save a change to any of the source files in the `js/` directory.

To start the watcher, run:
```bash
npm run watch
```
*(Note: To enable this, you may need to add the `"watch": "rollup -c -w"` script to your `package.json` file.)*

### 3. Production Build

When you have finished development and are ready to create the final, minified file for the production server, run the `build` command:

```bash
npm run build
```

## Output & Integration

The build process generates a single file: **`dist/codemirror.bundle.js`**.

This file is the only artifact that needs to be deployed to the production server. It exposes a global object, `window.MerchIDE_Editor`, which provides an API for the main MerchStudio application to create and interact with the editor instance.

## Technology Stack

* **Editor:** [CodeMirror 6](https://codemirror.net/)
* **Bundler:** [Rollup](https://rollupjs.org/)
* **Minifier:** [Terser](https://terser.org/)

---

## Copyright

Copyright (c) 2025 Michael Lewis White and MerchStudio Inc.
<mike@bestsignsupply.com> <hello@merchstudio.app>

This software is the proprietary information of MerchStudio App Inc. Unauthorized copying or distribution is strictly prohibited.
The bundled output contains third-party libraries under their own respective licenses (e.g., MIT for CodeMirror).
