/**!
    Source: https://github.com/nextapps-de/snowflake
    License: Apache License 2.0
*/

(function(){

    "use strict";

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const dpi = window.devicePixelRatio || 1;
    const image = new Image();
    const base64 = window["dRg4!"] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAGFBMVEXk7PTk7PTk7PTk7PTk7PTk7PQAAADk7PQLtLMUAAAAB3RSTlO18FHbI4YAkU+M0QAAAVVJREFUeF7F1T1PwzAQgGGGouwg5B8QEWaioqyVSsNKoXL2KPYcE6L371PLcp1GjU7A0IztI53Pvo8bK3y/BnkpgGoQAFwXmPvCg/ZZL4A3hg94rPheBOFbBCaCiyHqo9gpAHc44m4Ots6L9h1uC/+/Ws/AE3qapuFrBpo5GCdgX14G+UMAHaxsRjEFLb3dQB0BB0U9BR1uRwS2Acdw/hYVCkYbQJcB4zlogL6OWbQV9OchMhiKlKYBxinYA9omsAW4SyAHWCfQKgagjGADVLgUogGdA6sAdh4bGCMw0PuwOO2BCQlmoBPQ8eAQUzIJdKo8JQunBHN3uodXa8NZAfCRbPg5glnN6eW+2BBy+RtIIQ4JSIcU0xQvSrxq6bHE5xYLRi45uWjlspcbR249uXnl9pcHiDyC0hD7hJc0xMQxKA9SeRTLw1xeB9ffWfJilVfz/7f/D7vzJWHzmXRTAAAAAElFTkSuQmCC";

    let width, height, count, raf = 0, last = 0;
    let speed = 1, size = 3, density = 1, quality = 1.5, autostart = true;

    const snowflakes = [];
    const buffer = [];
    const flakes = [
        { r: 1.5, o: 0.3 },
        { r: 1.7, o: 0.4 },
        { r: 1.9, o: 0.6 },
        { r: 2.1, o: 0.8 },
        { r: 2.3, o: 1.0 },
        { r: 2.5, o: 1.0 },
        { r: 2.7, o: 0.8 },
        { r: 2.9, o: 0.6 },
        { r: 3.1, o: 0.4 },
        { r: 3.5, o: 0.3 }
    ];

    function createBuffer(index){

        const flake = flakes[index];
        const canvas = buffer[index] = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const width = Math.ceil(flake.r * dpi * quality * size);
        const blur = flake.r < 2.3
            ? (2.3 - flake.r) * 0.9 * dpi * quality
            : flake.r > 2.3
                ? (flake.r - 2.3) * 1.1 * dpi * quality
                : 0;

        canvas.height = canvas.width = width;
        ctx.globalAlpha = flake.o;
        ctx.filter = ctx.webkitFilter = "blur(" + blur + "px)";
        ctx.drawImage(
            image,
            0,
            0,
            image.width,
            image.height,
            0,
            0,
            width,
            width
        );

        ctx.globalAlpha = flake.o / 1.5;
        ctx.fillStyle = "#e4ecf4";
        ctx.beginPath();
        ctx.arc(
            width / 2,
            width / 2,
            width / 2 / 2,
            0,
            Math.PI * 2,
            false
        );
        ctx.closePath();
        ctx.fill();

        return canvas;
    }

    /**
     * @constructor
     */

    function Snowflake(y){

        let index = Math.random() * flakes.length | 0;
        let flake = flakes[index];

        this.buffer = buffer[index] || createBuffer(index);
        this.r = flake.r * dpi * quality;
        this.w = Math.ceil(flake.r * dpi * quality * size);
        this.x = randomize(width);
        this.y = y || -this.w;
        this.o = flake.o;
        this.vy = flake.r * flake.r * dpi * quality / size / 2;
        this.vx = (0.5 - randomize()) / size * dpi * quality;
        this.deg = (1 - randomize(2)) * size / dpi / quality / 180 * Math.PI;
    }

    function update(time){

        raf = window.requestAnimationFrame(update);
        //setTimeout(update, 1000 / 30, Date.now())
        if(!image.loaded) return;
        ctx.clearRect(0, 0, width, height);

        let scale = last ? (time - last) / (1000 / 60) : 1;
        scale > 100 && (scale = 1);
        last = time;

        for(let i = 0, flake, length = count * density | 0; i < length; i++) {

            flake = snowflakes[i] || (snowflakes[i] = new Snowflake(randomize(height)));
            flake.y += flake.vy * scale * speed * (size / 3);
            flake.x += flake.vx * scale + Math.sin(flake.y / speed / (size / 3) * flake.deg) / 2 * dpi * quality;

            if(flake.y >= height ||
               flake.x >= width ||
               flake.x <= -flake.w){

                snowflakes.length > length
                    ? snowflakes.splice(i--, 1)
                    : snowflakes[i] = new Snowflake(0);
            }
            else{

                ctx.drawImage(
                    flake.buffer,
                    0,
                    0,
                    flake.w,
                    flake.w,
                    flake.x,
                    flake.y,
                    flake.w,
                    flake.w
                );
            }
        }
    }

    function resize(){

        let parent = canvas.parentElement;
        !parent || parent === document.body && (parent = document.documentElement);

        if(parent){

            width = parent.clientWidth;
            height = parent.clientHeight;
        }
        else{

            width = window.innerWidth;
            height = window.innerHeight;
        }

        width = width / 3 * dpi * quality;
        height = height / 3 * dpi * quality;
        count = ((width / (dpi * quality)) * (height / (dpi * quality)) / 1500) | 0;

        canvas.width = width;
        canvas.height = height;
    }

    /**
     * @param {number=} bound
     * @returns {number}
     */

    function randomize(bound){

        return Math.random() * (bound || 1);
    }

    function style(styles){

        const style = canvas.style;

        for(const key in styles){

            style.setProperty(key, styles[key]);
        }
    }

    function init(){

        const config = window["SnowflakeConfig"];

        if(config) for(let key in config){

            key === "start"
                ? autostart = !!config[key]
              //: key === "stop" ? autostart = !config[key]
                : controls[key](config[key]);
        }

        image.loaded || image.src || (image.src = base64);
        autostart && load();
    }

    function load(){

        resize();
        update(0);

        autostart = true;
        canvas.setAttribute("id", "snowflake");
        canvas.parentElement || document.body.appendChild(canvas);
    }

    window.addEventListener("resize", resize, false);

    const controls = window["Snowflake"] = {
        "style": style,
        "speed": function(val){
            speed = val;
        },
        "size": function(val){
            size = 3 * val;
            buffer.length = 0;
        },
        "quality": function(val){
            quality = 3 / 2 * Math.min(Math.max(val, 0.1), 2);
            buffer.length = 0;
            snowflakes.length = 0;
            resize();
        },
        "density": function(val){
            density = val;
        },
        "opacity": function(val){
            style({ "opacity": val });
        },
        "index": function(val){
            style({ "z-index": val });
        },
        "image": function(src){
            image.loaded = !src;
            src && (image.src = src);
            buffer.length = 0;
        },
        "mount": function(node){
            node.appendChild(canvas);
            style({ "position": node === document.body ? "fixed" : "absolute" });
            autostart && resize();
        },
        "start": function(){
            autostart
                ? raf || update(0)
                : init() || load();
            style({ "display": "" });
        },
        "stop": function(){
            cancelAnimationFrame(raf);
            style({ "display": "none" });
            raf = last = 0;
        }
    };

    style({
        "position": "fixed",
        "top": "0",
        "left": "0",
        "width": "100%",
        "height": "100%",
        "z-index": "999999",
        "pointer-events": "none"
    });

    image.loaded = false;
    image.onload = function(){ image.loaded = true; };
    image.onerror = function(){ image.onerror = null; image.src = base64; };

    document.readyState === "complete"
        ? init()
        : window.addEventListener("load", init, false);
}());
