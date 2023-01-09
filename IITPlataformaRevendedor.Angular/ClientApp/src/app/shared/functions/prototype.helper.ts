
  
  
  export function cloneObject <T extends Object> (object : T) {
  
    const clone = { ... object};

    Object.setPrototypeOf( clone , Object.getPrototypeOf(object));

    return clone as T;
}
export function cloneArrayObject <T extends Object> (object : T[] ) {

    let cloneArray = [];
    let objectClone = [...object];
    objectClone.forEach(val => cloneArray.push( cloneObject(val)  ));

    return cloneArray as T[];

}
