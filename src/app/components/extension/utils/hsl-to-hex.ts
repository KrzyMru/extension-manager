const hslToHex = (hsl: string) => {
    const match = hsl.match(/hsl\(\s*(\d+),\s*(\d+)%?,\s*(\d+)%?\s*\)/);
    if (!match) 
        return "#ffffffff";

    const h = parseInt(match[1], 10);
    const s = parseInt(match[2], 10);
    const l = parseInt(match[3], 10);
    
    const normL = l / 100;
    const a = s * Math.min(normL, 1 - normL) / 100;
    const f = (n: number) => {
        const k = (n + h / 30) % 12;
        const color = normL - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
};

export default hslToHex;