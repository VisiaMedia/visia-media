# Visia WordPress Theme Instructions

## Project purpose
This repository contains the custom hand-built WordPress theme for Visia Media.
The theme is maintained primarily by the original developer, so code must stay readable, traceable, and consistent with the existing style.
Do not optimize for novelty, clever abstractions, broad reuse, or generic WordPress best practices when the repository already has a local convention.

## Non-negotiable architecture rule: static live site
The WordPress installation is used only as the staging/CMS/rendering environment.
The live website is exported with Simply Static and deployed as static output to Netlify.

Therefore, front-end behavior on the live site must never depend on PHP, WordPress, AJAX, REST, or server-side WordPress execution at runtime.

Do not add or rely on:
- `admin-ajax.php`, `wp_ajax_*`, `wp_ajax_nopriv_*`, or WordPress AJAX handlers for public front-end behavior;
- `wp-json`, `register_rest_route(...)`, `apiFetch`, REST API calls, or WordPress REST endpoints for public front-end behavior;
- PHP form handlers, custom endpoint PHP files, query-string actions, nonces, or server-generated runtime responses;
- JavaScript that expects WordPress/PHP to respond after the static export;
- inline page scripts that need to execute after Swup page changes.

Allowed:
- PHP templates, ACF calls, WordPress functions, hooks, filters, and queries that run while WordPress renders pages on staging or during the Simply Static export;
- static HTML, CSS, JS, images, fonts, and pre-generated static routes on Netlify;
- existing Netlify form patterns already present in the theme;
- explicitly approved third-party front-end services such as analytics or tracking scripts already used by the project.

When adding functionality, ask: “Will this still work when the page is plain static HTML on Netlify?”
If the answer is no, do not implement it that way.

## Core working rule
Before editing, inspect nearby existing files and copy the local pattern exactly.
Existing local convention wins over generic recommendations.
Keep the change as small as possible and do not touch unrelated files.

Before making changes:
- run or inspect `git status --short`;
- identify the closest existing section/module pattern;
- inspect the related PHP, SCSS, JS, and `assets/js/app.js` registration;
- do not overwrite unrelated work already present in the tree.

## Repository structure
Important theme structure:

- Root PHP templates: `index.php`, `home.php`, `single-*.php`, `archive*.php`, `header.php`, `footer.php`, `functions.php`.
- Flexible content section templates: `template-parts/sections/block-*.php`.
- Flexible content module templates: `template-parts/modules/*.php`.
- Shared form templates: `template-parts/forms/*.php`.
- Section SCSS: `assets/css/block-*.scss`.
- Module SCSS: `assets/css/module-*.scss`.
- Reset/global SCSS: `assets/css/reset/*.scss`.
- Main JS entrypoint: `assets/js/app.js`.
- Section JS modules: `assets/js/template-parts/*.mjs`.
- Reusable/page modules: `assets/js/modules/*.mjs`, `assets/js/global/*.mjs`, `assets/js/blog/*.mjs`.
- Build output: `dist/`.

Do not assume one naming transformation is always correct.
Some PHP layout names use underscores, while SCSS and JS may use translated, shortened, or hyphenated names.
Examples in the current codebase include:

- `block-tekstcarousel.php` -> `block-textcarousel.scss` -> `textcarousel.mjs`.
- `block-perspective_gallery.php` -> `block-perspectiefgalerij.scss` -> `perspectivegallery.mjs`.
- `block-cta_leadform.php` -> `block-cta-leadform.scss` -> `ctaleadform.mjs`.

Always inspect comparable existing files before choosing file names, selectors, block names, or module names.

## WordPress and ACF conventions
This is a classic PHP/ACF theme, not a block theme.
Flexible content is rendered through the existing `secties` loop and `get_template_part(...)` pattern.

When adding or modifying a section:
- follow the existing flexible content layout pattern;
- use ACF field access the same way nearby files do, such as `get_sub_field(...)`, `have_rows(...)`, `the_row()`, and `get_field(...)`;
- preserve existing Dutch field names and layout names;
- do not invent field names without checking comparable sections and `acf.php` first;
- do not silently rename ACF fields, layouts, selectors, PHP files, SCSS files, or JS modules;
- if new ACF fields are needed, list the required layout name and field names clearly in the final summary.

If uncertainty about ACF fields could break existing admin data, stop and ask before changing the field structure.

## PHP style
Match nearby PHP style exactly, including indentation, spacing, comments, and inline template structure.

Rules:
- keep templates straightforward and close to the markup;
- do not introduce service layers, controllers, registries, render classes, or generic helpers unless explicitly requested;
- do not add new public front-end runtime PHP endpoints;
- do not add PHP logic that is required after Simply Static has exported the site;
- use existing helper functions such as `global_button(...)` and `global_color_change_trigger(...)` where comparable sections use them;
- preserve BEM classes, `css-*` utility classes, and `js-*` hooks as used locally;
- keep comments in the same short, descriptive style as existing files.

Escaping and output style should match nearby existing files. Do not mass-convert templates to a different escaping or formatting style unless explicitly requested.

## SCSS style
Follow the existing SCSS structure.

Rules:
- import reset core with the local pattern, usually `@use './reset/core' as *;`;
- use existing CSS custom properties such as `--offset-vertical`, `--offset-side`, `--offset-block`, `--offset-boxed`, `--current-color`, and `--current-background`;
- use existing variables such as `$bold-weight`, `$semibold-weight`, `$blue`, and `$pink`;
- use the same nesting style, breakpoint style, spacing scale, typography utilities, and BEM depth as nearby sections;
- keep styling scoped to the relevant block unless existing code does otherwise;
- do not introduce Tailwind, Bootstrap, CSS-in-JS, utility frameworks, or new global design tokens;
- do not create broad global styles for a local section problem.

Base new section SCSS on the closest existing section, not on a fresh methodology.

## JavaScript and Swup lifecycle
The theme uses Swup. Page navigation does not perform a full browser refresh after the first load.
All front-end modules that may be needed after navigation must be available through the first-loaded JS entrypoint and its async chunks.

Rules:
- register section and module JS only through `assets/js/app.js`;
- add conditional dynamic imports inside the existing `swupInit()` pattern, based on the relevant `.js-*` selector;
- keep new JS modules inside the webpack import graph so generated chunks are available from the static build;
- do not change the `functions.php` `dist/*.js` enqueue/dependency mechanism unless explicitly requested;
- do not add separate script tags from PHP templates for section behavior;
- do not rely on scripts printed inside PHP templates or swapped page content;
- do not add inline `<script>` blocks for section behavior;
- do not add new entrypoints unless explicitly requested;
- do not add jQuery, Alpine, React, Vue, or another framework;
- do not add new dependencies unless explicitly requested;
- remove all debug output before finishing.

For modules that create persistent instances, timers, observers, window/document listeners, third-party libraries, Masonry/Swiper/InfiniteScroll instances, or similar state:
- add an `unload(...)` function when needed;
- register that unload function in `loadedModules` from `assets/js/app.js`;
- follow the existing `swupUnload()` cleanup model;
- avoid duplicate event listeners on repeated Swup navigations.

If adding load-more or infinite-loading behavior, it may only request pre-generated static HTML routes that will exist after Simply Static export.
Do not implement load-more via WordPress AJAX, REST API, or live PHP queries.

## Animation style
The theme uses GSAP, ScrollTrigger, SplitText, and internal helper functions.
Use the existing animation helpers and timing style.

Rules:
- use existing helpers such as `tlSetup`, `tlTextReveal`, `tlFadeIn`, `stFadeIn`, `buildTlAfterResize`, and `callAfterResize`;
- preserve `data-st-count` and `refreshPriority` patterns;
- do not create a second animation system;
- do not duplicate helper logic;
- keep animations subtle and consistent with existing sections;
- add `ScrollTrigger.refresh(true)` only where comparable modules do so.

If a requested design requires animation, inspect the closest animated section first and copy that structure.

## Forms
The current front-end form approach is static-compatible.
Forms use regular HTML form markup with Netlify attributes and Swup form transitions.

When adding or modifying public forms:
- follow existing form markup and classes;
- use `data-netlify="true"` when matching the existing Netlify pattern;
- use `data-swup-form="true"` only where the existing Swup form flow should apply;
- use a static thank-you page URL generated at render/export time;
- use existing front-end validation patterns in `assets/js/global/forms.mjs`;
- do not add PHP form processing, AJAX submission to WordPress, REST submission to WordPress, or nonce-based WordPress handlers.

## New section workflow
When adding a new flexible content section:

1. Identify the closest existing section by structure, styling, and behavior.
2. Inspect its PHP, SCSS, JS, selector naming, ACF fields, and `app.js` registration.
3. Add the PHP file in the existing `template-parts/sections/block-*.php` pattern.
4. Add the SCSS file using the closest existing `assets/css/block-*.scss` pattern.
5. Add JS only when the section needs behavior or animation beyond existing CSS/HTML.
6. If JS is required, create the `.mjs` module and register it in `assets/js/app.js` using the existing selector-based dynamic import pattern.
7. Add unload handling only when the module creates persistent state or listeners that survive Swup navigation.
8. Document any required new ACF fields in the final summary.
9. Run validation.

Do not touch unrelated sections or modules.

## Scope control
For every task:
- make the smallest change that satisfies the request;
- do not refactor unrelated code;
- do not reformat unrelated files;
- do not rename existing files, classes, functions, variables, fields, selectors, or handles unless explicitly requested;
- do not “clean up” unrelated code;
- do not modernize the stack without permission;
- do not alter visual style beyond the requested design change.

If unrelated issues are noticed, mention them in the final summary instead of fixing them automatically.

## Build and validation
Use commands that actually exist in `package.json`.

Current commands:
- `npm run build` — production JS build with webpack and SCSS build with gulp.
- `npm run watch` — development watcher.
- `npm run analyze` — webpack bundle analysis.

Before finishing code changes, run:

```bash
npm run build
```

Only run `npm install` when dependencies are missing or `package-lock.json` / `package.json` has intentionally changed.
Do not edit `node_modules/`.
Do not manually edit compiled files in `dist/`.
If build output is required by the deployment workflow, generate it through the build command and mention generated files separately.

If validation fails, report:
- the command;
- the relevant error;
- whether the failure appears related to the change;
- the likely fix.

Do not claim the build passed if it was not run or failed.

## Definition of Done
A task is complete only when:
- the change is limited to the requested scope;
- the code matches nearby existing style;
- static-export compatibility has been preserved;
- no public front-end runtime PHP, WordPress AJAX, or WordPress REST dependency was introduced;
- Swup navigation still has a valid init path through `assets/js/app.js`;
- persistent JS state has cleanup where needed;
- new section files follow existing naming after checking comparable files;
- no unnecessary abstraction was introduced;
- no new dependency was added without permission;
- no debug output remains;
- validation was run when applicable;
- changed files are summarized;
- assumptions and unresolved items are listed.

When unsure, do not guess silently.
Choose the most conservative implementation and state the assumption clearly.
Ask before changing anything that could cause data loss, break existing ACF data, or make the static export depend on live WordPress/PHP.
