# 3D Wayfinder Minimal Web Frontend
This implements basic wayfinder features usually used on websites (list of shops, floor buttons, search)

## Configure while building

Copy wf_svelte/env.example to wf_svelte/.env. Change the necessary variables:

```
VITE_WF_MOBILE=false // if you need mobile device specific features (positioning etc). Works only in mobile apps.
VITE_WF_SCRIPTS=cdn //Pull JS files from CDN
VITE_WF_MAPTYPE=3d // 2d or 3d
VITE_WF_PROJECT=demo // project id
VITE_WF_API=cdn // Pull data from CDN, live or local
VITE_WF_LANGUAGE=en // initial language
VITE_WF_MENU=true // show menu
VITE_WF_ALIGN=right // align menu to left or right
VITE_WT_GROUP= // show only locations from this group
VITE_WF_CLASSES= // adds extra CSS classes to the app container
VITE_WF_HEIGHT=100 // maximum height of the map
VITE_WF_PATH_BUTTON=true // display a "Show Path"
VITE_WF_NAVIGATE_BUTTON=false // display a "Navigate" button. Works only on mobile apps
</script>
```

## Configuration after building
Prepend the following JavaScript variables to configure the user interface:
```
<script>
   	var WF_OPTIONS = {"maptype":"2d","project":"PROJECT_ID","api":"cdn","language":"en","menu":"false","align":"left","classes":"","height":"80"};
    var WF_SETTINGS = {};
</script>
```
### WF_OPTIONS
These are the user interface options:
- **maptype** - 2d or 3d
- **project** - project id
- **api** - where to pull the data. "live" - directly from our EU servers, "cdn" - from global CDN
- **menu** - display a side menu
- **align** - align menu left or right
- **classes** - extra CSS classes appended to the app container
- **height** - how heigh can the app be in vh units
- **kiosk** - starting point of your path. A navigation node ID from our editor.

### WF_SETTINGS
Override any 3D Wayfinder settings that are defined in Admin panel -> Advanced -> Settings
Example {"mouse.enable-moving": false} - disables map movement

## Build
Go into **wf_svelte** directory to build the UI

```
cd wf_svelte
```
### Run development server

```	
npm run dev
```

### Build a **standalone application** to dist folder

```	
npm run build
```
### Build a Wordpress application that is copied to **../wfmap/app/**
```	
npm run build-wordpress
```

## Wordpress

Zip wfmap folder and upload as a plugin to your wordpress site.

Include a **SHORTCODE** tag in your page.
```	
[wfmap project="PROJECT_ID" type="2d" align="right" language="et" kiosk="1003"]
```
