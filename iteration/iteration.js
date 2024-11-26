const obj = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
  };
  
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    console.log(key, value);
    /*  a 1
        b 2
        c 3
        d 4
        e 5
        f 6 */
  }