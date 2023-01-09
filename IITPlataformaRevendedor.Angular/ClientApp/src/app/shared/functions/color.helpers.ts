export const rgbToHex = ( value: string ) : string => {
    if(value != ""){
        let valueAux = value.replace(/\x/gi, ' ');
        let listargb = valueAux.split(' ');
        let r = +listargb[0];
        let g = +listargb[1];
        let b = +listargb[2];
        // return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    else{
        return '#ffffff'
    }
}
export const hexToRgb = ( value ) =>{
    let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        value = value.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(value);
        return result ? 
            parseInt(result[1], 16)+"x"+
            parseInt(result[2], 16)+"x"+
            parseInt(result[3], 16)
         : null;
}