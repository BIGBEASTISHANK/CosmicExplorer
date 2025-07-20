export type VantaBase = {
    el: HTMLElement | string | null;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    backgroundColor?: number;
};

export type VantaGlobe = VantaBase & {
    color?: number;
    size?: number;
};

export type VantaDots = VantaBase & {
    color?: number;
    color2?: number;
    size?: number;
    spacing?: number;
    showLines?: boolean;
};
