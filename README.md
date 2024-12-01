# Snowflake Animation (Web Canvas-based, 2Kb)
### Usage

Download the library or insert this snippet into `<HEAD>` or `<BODY>` tag of your html page:

```html
<script src="https://cdn.jsdelivr.net/gh/nextapps-de/snowflake@master/snowflake.min.js"></script>
```

### Demo

[https://nextapps-de.github.io/snowflake/demo/index.html](https://nextapps-de.github.io/snowflake/demo/index.html)

### Custom Configuration

Apply a config object to `window.SnowflakeConfig` __before__ loading the library:

```js
window.SnowflakeConfig = {
    size: 1.0,
    speed: 0.65,
    opacity: 0.2,
    density: 0.5,
    quality: 2.0,
    index: 9,
    mount: document.body,
    image: "path-to-file.png",
    style: {
        position: "fixed",
        width: "100%",
        height: "100%",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
};
```

### Disable Autostart

```js
window.SnowflakeConfig = { 
    start: false
};
```

Or

```js
window.SnowflakeConfig = { 
    stop: true
};
```

## Controls

### Show/Start Snowflake

```js
Snowflake.start();
```

> The library will automatically start by default when loading the library. Just when autostart was disabled you'll need to initially call `Snowflake.start()`.

### Hide/Stop Snowflake

```js
Snowflake.stop();
```

### Set Flake Speed

```js
// twice
Snowflake.speed(2);
// half
Snowflake.speed(0.5);
// standard
Snowflake.speed(1);
```

### Set Flake Density

```js
// twice
Snowflake.density(2);
// half
Snowflake.density(0.5);
// standard
Snowflake.density(1);
```

> The total amount of flakes auto-scales accordingly to the available viewport.

### Set Flake Size

```js
// twice
Snowflake.size(2);
// half
Snowflake.size(0.5);
// standard
Snowflake.size(1);
```

### Set Flake Quality

```js
// Best
Snowflake.quality(2);
// Low
Snowflake.quality(0.5);
// Standard
Snowflake.quality(1);
```

> Higher quality consumes more performance, lower quality will instead gain performance.

### Custom Mount Canvas

```js
const element = document.querySelector("#custom-lement");
Snowflake.mount(element);
```

> The mount element should have one of these positions: `relative`, `absolute` or `fixed`.

You can change the css position of the canvas element:

```js
Snowflake.style({ position: "absolute" });
```

### Adjust Opacity:

```js
Snowflake.opacity(0.5);
```

### Adjust Z-Index:

```js
Snowflake.index(1);
```

> If you have issues to place the snowflake as background behind other elements try using a negative z-index value e.g. `Snowflake.index(-1);`.

### Adjust Position

```js
Snowflake.style({ 
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
});
```

### Custom Flake Image-Source

```js
 // SVG is not supported
Snowflake.image("path-to-file.png");
```

Or

```js
Snowflake.image("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAgMAAADXB5lNAAAADFBMVEXk7PTk7PTk7PQAAAAAkx47AAAABHRSTlOQSfwAyZGfwAAAAdRJREFUeF6Fk7FOhEAQhvcNrHwCO+xteQfj5hKfQHmAa6m0sCGxv5soiSxcQWd5lJprzcWExt7KUIzJBRh3djYIWEgCu/kIP//M/qNIrr7yGw++EI4m4LBdZxPQ3N6XE9AWRTUBFBQ0BbvNCLShFSl5FfCOQCT3uwPXv+DKgWjpAa5yB+o1ULOEknCbOoCPIE7xLnGgK4Cap/uEsIgdWATATkNCs7eA94l1aojQUgGZdWr1agGkL3Lr1OpFx9rXEsXUA3VmKK4GNobpADBjUCcD6HIGUShARBBEwoMaEDAdAcwQrIQAEUEQCVKv1LKn5Yq9V3SiPsOeXa+3/KzajTokLI+P3IsobjLVpvQZ2p7YXnQb2lVqb3R9oxeB2evzVAcLVcyuv2Bf6MsbrQOj9fkDf9JaJWuJRd1WHUqS3wJREDel2lVi7Jkby8Z21LOlMz7GpqJT9U1kLRmEyC5EH778FKGGcYMSBMxGIAoRunwAVsI1OR4ApgxERIkEAxFRIuGOMvdAa+MPW2ufD/bu4yCA3/4GhnQA1EmkfD4K4PIldLNYwhDcw3JVEnJPFPdiFu2refhfGPQOvI0GKOF1PGIpzYbQTAGHfwJ4PP4ZdYRyAtiHgB9fc1w25BtOVgAAAABJRU5ErkJggg==");
```

Disable flake image and just draw a basic circle:

```js
Snowflake.image(false);
```

### Custom CSS

```css
#snowflake{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 1;
    z-index: 99;
}
```

### License:

Apache License 2.0