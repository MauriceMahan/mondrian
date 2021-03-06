import { isBetween } from "./utils";

export default class FilterSettings {
    constructor(canvas, texture) {
        this.canvas = canvas;
        this.texture = texture;
        this.hue = 0;
        this.saturation = 0;
        this.sepia = 0;
        this.brightness = 0;
        this.contrast = 0;
        this.vgnteSize = 0;
        this.vgnteAmnt = 0;
        this.vibrance = 0;

        // Tilt Shift
        this.tiltStartX = 0;
        this.tiltStartY = 0;
        this.tiltEndX = 0;
        this.tiltEndY = 0;
        this.tiltBlurRadius = 0;
        this.tiltGradientRadius = 0;
    }

    setHue = val => {
        this.hue = Number(val);
        this.update();
    }

    setSaturation = val => {
        this.saturation = Number(val);
        this.update();
    }

    setSepia = val => {
        this.sepia = Number(val);
        this.update();
    }

    setBrightness = val => {
        this.brightness = Number(val);
        this.update();
    }

    setContrast = val => {
        this.contrast = Number(val);
        this.update();
    }

    setVignetteSize = val => {
        this.vgnteSize = Number(val);
        this.update();
    }

    setVignetteAmt = val => {
        this.vgnteAmnt = Number(val);
        this.update();
    }

    setVibrance = val => {
        this.vibrance = Number(val);
        this.update();
    }

    setTiltCoord(startX, startY, endX, endY) {
        this.tiltStartX = Number(startX);
        this.tiltStartY = Number(startY);
        this.tiltEndX = Number(endX);
        this.tiltEndY = Number(endY);
        this.update();
    }

    setTiltBlur = val => {
        this.tiltBlurRadius = Number(val);
        this.update();
    }

    setTiltGradient = val => {
        this.tiltGradientRadius = Number(val);
        this.update();
    }

    // Update the values if the values are modified
    update = () => {
        this.canvas.draw(this.texture);

        // Brightness/Contrast
        if (isBetween(this.brightness, -1, 1) || isBetween(this.contrast, -1, 1)) {
            this.canvas.brightnessContrast(this.brightness, this.contrast);
        }

        // Hue/Saturation
        if (isBetween(this.hue, -1, 1) || isBetween(this.saturation, -1, 1)) {
            this.canvas.hueSaturation(this.hue, this.saturation);
        }

        // Sepia
        if (isBetween(this.sepia, 0, 1)) {
            this.canvas.sepia(this.sepia);
        }

        // Vignette
        if (isBetween(this.vgnteSize, 0, 1) || isBetween(this.vgnteAmnt, 0, 1)) {
            this.canvas.vignette(this.vgnteSize, this.vgnteAmnt);
        }

        // Vibrance
        if (isBetween(this.vibrance, -1, 1)) {
            this.canvas.vibrance(this.vibrance);
        }

        // Tilt Shift
        if (isBetween(this.tiltBlurRadius, 0, 50) || isBetween(this.tiltGradientRadius, 0, 1000)) {
            this.canvas.tiltShift(this.tiltStartX, this.tiltStartY, this.tiltEndX, this.tiltEndY, this.tiltBlurRadius, this.tiltGradientRadius);
        }

        this.canvas.update();
    }
}