/**!
    Source: https://github.com/nextapps-de/snowflake
    License: Apache License 2.0
*/

(function(window, document) {

    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var style = canvas.style;
    var width, height, count;
    var snowflakes, snowflake;

    style.position = "fixed";
    style.top = "0";
    style.left = "0";
    style.width = "100%";
    style.height = "100%";
    style.zIndex = "999999";
    style.pointerEvents = "none";

    /**
     * @constructor
     */

    function Snowflake(){

        this.x = randomize(width);
        this.y = randomize(height * -1);
        this.r = 0.5 + randomize(3);
        this.o = 0.3 + randomize(0.7);
        this.vy = 1 + randomize(3);
        this.vx = 0.5 - randomize();
    }

    function init(){

        snowflakes = new Array(count);

        for(var i = 0; i < count; i++) {

            snowflakes[i] = new Snowflake();
        }
    }

    function update(){

        window.requestAnimationFrame(update);

        ctx.clearRect(0, 0, width, height);

        for(var i = 0; i < count; i++) {

            snowflake = snowflakes[i];
            snowflake.y += snowflake.vy;
            snowflake.x += snowflake.vx;

            if((snowflake.y > height) ||
               (snowflake.x > width) ||
               (snowflake.x < 0)){

                snowflakes[i] = new Snowflake();
            }
            else if(snowflake.y > 0){

                ctx.globalAlpha = snowflake.o;
                ctx.beginPath();
                ctx.arc(snowflake.x, snowflake.y, snowflake.r, 0, Math.PI * 2, false);
                ctx.closePath();
                ctx.fill();
            }
        }
    }

    function resize(){

        var element = document.documentElement,
            body = document.body;

        width = window.innerWidth || element.clientWidth || body.clientWidth;
        height = window.innerHeight || element.clientHeight || body.clientHeight;
        count = (width * height / 7500) >> 0;

        canvas.width = width;
        canvas.height = height;
        ctx.fillStyle = "#FFF";

        init();
    }

    /**
     * @param {number=} bound
     * @returns {number}
     */

    function randomize(bound){

        return Math.random() * (bound || 1)
    }

    function load(){

        resize();
        update();

        document.body.appendChild(canvas);
    }

    function addEvent(element, eventName, fn) {

        if(element.addEventListener){

            element.addEventListener(eventName, fn, false);
        }
        else{

            element.attachEvent("on" + eventName, fn);
        }
    }

    addEvent(window, "load", load);
    addEvent(window, "resize", resize);

})(window, document);
