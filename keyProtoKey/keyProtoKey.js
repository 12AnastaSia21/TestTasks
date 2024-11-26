function allKeys(obj) {
    const keys = [];
    for (const key in obj) {
        keys.push(key);
    }
    return keys;
}

const proto = { a: 0, b: 1 };
const obj = Object.create(proto);
obj.c = 2;

console.log(allKeys(obj)); // [ c, a, b ]