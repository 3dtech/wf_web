# 3D Wayfinder Minimal Web Frontend

A minimal website frontend for 3D Wayfinder, including a location list, search,
floor controls, POI popups, and route actions.

## Setup

The frontend lives in `wf_svelte`:

```sh
cd wf_svelte
npm install
cp env.example .env
```

Edit `.env` to set the default build configuration:

```dotenv
VITE_WF_MOBILE=false
VITE_WF_SCRIPTS=cdn
VITE_WF_MAPTYPE=3d
VITE_WF_PROJECT=demo
VITE_WF_API=cdn
VITE_WF_LANGUAGE=en
VITE_WF_MENU=true
VITE_WF_ALIGN=right
VITE_WF_GROUP=
VITE_WF_CLASSES=
VITE_WF_HEIGHT=100
VITE_WF_PATH_BUTTON=false
VITE_WF_WEBSITE_URL_BUTTON=true
VITE_WF_ACCESSIBILITY_PATH_BUTTON=false
VITE_WF_SHOW_YAH=false
VITE_WF_COMPASS_BUTTON=false
VITE_WF_NAVIGATE_BUTTON=true

```

At build time, `VITE_WF_*` values are converted to lowercase option names and
written to the `data-wf-options` attribute on `#wf_app`. Values prefixed with
`VITE_WF_SETTINGS_` are written to `data-wf-settings`. The application reads
both attributes as JSON, so it does not depend on inline `WF_OPTIONS` or
`WF_SETTINGS` global variables.

Common UI options are:

- `maptype`: `2d` or `3d`
- `project`: 3D Wayfinder project ID
- `api`: `cdn` or `live`
- `language`: initial language code
- `menu`: whether to display the side menu
- `align`: `left` or `right`
- `group`: only show locations below this group slug
- `classes`: extra CSS classes added to the application container
- `height`: maximum application height in viewport-height units
- `kiosk`: starting navigation-node ID
- `path_button`: whether to show the standard route button
- `accessibility_path_button`: whether to show the accessible-route button
- `navigate_button`: whether to show mobile-app navigation controls

Settings override matching values from **Admin panel > Advanced > Settings**.
For example, `{"mouse.enable-moving": false}` disables moving the map.

## Client templates

Each client template has its own directory under `wf_svelte/custom`:

```text
custom/CLIENT_NAME/
├── index.html       # template markup
├── config.json      # optional build configuration
├── index.css        # optional client styles
└── index.js         # optional client initializer
```

Select a template when running or building the frontend:

```sh
npm run dev --template=CLIENT_NAME
npm run build --template=CLIENT_NAME
npm run build-wordpress --template=CLIENT_NAME
```

Template names may contain letters, numbers, underscores, and hyphens. If
`custom/CLIENT_NAME/index.html` does not exist, the build falls back to the
legacy `html/CLIENT_NAME.html` path.

### HTML

The HTML template must load the application entry point and provide one
`#wf_app` element. Use the configuration placeholders as attribute values:

```html
<script type="module" src="/src/main.js"></script>
<div
    id="wf_app"
    data-wf-options="%WF_OPTIONS%"
    data-wf-settings="%WF_SETTINGS%"
></div>
```

Add `%EMBED%` in the document head when the template must support locally
embedded Wayfinder scripts (`VITE_WF_SCRIPTS=local`). Vite processes the entry
point and asset URLs during the build, so keep `/src/main.js` as shown.

### Configuration

For standalone builds, an optional `config.json` overrides the matching `.env`
values for just that template:

```json
{
    "options": {
        "project": "PROJECT_ID",
        "language": "en",
        "menu": true
    },
    "settings": {
        "mouse.enable-moving": false
    }
}
```

Both `options` and `settings` must be JSON objects. Option values are normalized
to strings for compatibility with environment variables; setting values retain
their JSON types. WordPress builds receive options and settings from shortcode
attributes at runtime instead.

### CSS and JavaScript

`index.css` is processed by Vite and emitted after the shared application
styles.

`index.js` must default-export an initializer. It receives the Svelte app, the
`#wf_app` root element, and an `openPOI` helper:

```js
export default function initializeClient({ app, root, openPOI }) {
    root.addEventListener("wf:data-loaded", (event) => {
        const wayfinder = event.detail.wayfinder;
        const poi = wayfinder.pois[123];

        if (poi) {
            openPOI(poi);
        }
    });
}
```

The initializer may be synchronous or return a promise. Errors are logged
without preventing the main application from starting.

`openPOI` accepts a Wayfinder POI object or POI ID and follows the same UI flow
as selecting a POI from the menu, including opening its popup. The helper is
also available as `app.openPOI(...)` and as `event.detail.openPOI` on
`wf:mounted`.

The root element emits these bubbling lifecycle events:

- `wf:mounted`: the Svelte app has mounted; detail contains `app` and `openPOI`
- `wf:data-loaded`: Wayfinder project data is ready; detail contains `wayfinder`
- `wf:map-ready`: the map is ready; detail contains `wayfinder` and the original
  Wayfinder event as `event`

Client CSS and JavaScript are included in the generated external assets. They
do not require inline scripts or an `unsafe-inline` CSP rule. The deployed site
must still allow its own asset origin and the configured Wayfinder CDN/API
origins.

## Build

Run all commands from `wf_svelte`.

Start the development server:

```sh
npm run dev
```

Build a standalone application into `wf_svelte/dist`:

```sh
npm run build
```

The standalone build uses relative asset URLs, so deploy the complete `dist`
directory at any URL path.

Build the WordPress application into `wfmap/app`:

```sh
npm run build-wordpress
```

When no template is specified, the WordPress build uses
`wf_svelte/html/wordpress.html`.

## WordPress

Build the WordPress application, zip the `wfmap` directory, and upload it as a
WordPress plugin. Add the shortcode to a page:

```text
[wfmap project="PROJECT_ID" maptype="2d" align="right" language="et" kiosk="1003"]
```

Shortcode attributes supply the runtime `WF_OPTIONS`. Pass advanced settings as
JSON with the `wf_settings` attribute.
