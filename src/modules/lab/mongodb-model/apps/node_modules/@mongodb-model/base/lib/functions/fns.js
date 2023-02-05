/**
    * @name promisify
     * @function
     *
     * @param {Function|Object} fn the function or object to be promisified
     *  
     * @description promisified functions or objects
     * @return {Function|Object} fn, the promisified function
     * 
*/
exports.promisify  = fn => {
    return (...args) => new Promise((resolve, reject) => fn(...args), (err, data) => (err ? reject(err) : resolve(data)))
}


/**
 * @name getField
 * @function
 *
 * @param {String|Object} attribute the attribute to extract
 *  
 * @description Receive the name of an attribute  and produce a new function that will be able to extract  an attribute from an object
 * 
 * @return {Function|Object} object, the function that will be able to extract an attribute from an object
 * 
 */
exports.getField =  attribute => {
    return object => object[attribute]
}

/**
 * @name pluckOff
 * @function
 *
 * @param {Function|Object} fn  the function to bind to object method
 *  
 * @description plucks off a method from ANY object and makes that method a completely independent standalone reusable  function.
 * 
 *  For instance, if I wanted to make Array.prototype.map method an independent standalone reusable function, I would do something like this: const myArrayMap = pluckOff(Array.prototype.map). Then I would use it like this:
 * 
 * const array = [1,2,3,4,5]; const result = myArrayMap(array, x => x * 2); result = [2,4,6,8,10]
 * 
 * @return {Function|Object} fn.bind(...args)(), the completely independent standalone reusable function
 * 
 */

exports.pluckOff = fn => {
    return (...args) => fn.bind(...args)()
}

 /**
 * @name callOnlyNTimes
 * @function
 *
 * @param {Function|Object} f the function to be called only n times

 * @param {Number} n number of time the function f() should be called
 *  
 * @description creates a function that calls and runs the function f() n times and only n times no matter how many times the function is called or used in the loop. It calls f() exactly n times. For instance if n = 1 and the function is called 200 times, it would call or execute f() only once (no more than once). If n = 5 and the function is called 200 times, it would call or execute f() exactly 5 times and no more than 5 times.
 * 
 * @return {Function|Object} a function that calls fn() only n times
 * 
 */
exports.callOnlyNTimes =  (fn, n = 1)  => {
    let done = false
    return (...args) => {
        if (!done) {
            done = true
            for (let i = 0; i < Math.abs(n); i++) {
                fn(...args)
            }
        }
    }
}

 /**
 * @name callFirstOnlyNTimes
 * @function
 *
 * @param {Function|Object} f the function to be called only n times
 * @param {Function|Object} g  the function to be called as many times as left after f() is called n times
 * @param {Number} n number of time the function f() should be called
 *  
 * @description creates a function that calls and runs the first argument function f() n times and only n times no matter how many times the function is called or used in the loop. It calls f() exactly n times and the rest of the times it calls g(). For instance if n = 1 and the function is called 200 times, it would call or execute f() only once and g() 199 times. If n = 5 and the function is called 200 times, it would call or execute f() exactly 5 times and g() 195 times.
 * 
 * @return {Function|Object} a function that calls fn() only n times and g() afterward
 * 
 */
exports.callFirstOnlyNTimes = (f = () => {}, g = () => {}, n = 1)  =>{
    let done = false
    return (...args) => {
      if (!done) {
        done = true
        if (typeof n !== 'number' || n % 1 !== 0) {
          f(...args)
        } else {
          for (let i = 1; i <= Math.abs(n); i++) {
            f(...args)
          }
        }
      } else {
        g(...args)
      }
    }
  }

/**
 * @name inputsValid
 * @function
 *
 * @param {Function} arr  the array to validate
 * @param {Function} fn  the call back function to validate
 * @param {Number} flat arr flattening depth to validate
 *  
 * @description validates inputs
 * 
 * @return {Boolean} true if inputs are valid and false if inputs are invalid
 * 
 */
  exports.inputsValid = (arr = [], fn = () => {}, flat = 1) =>{
    if (!Array.isArray(arr)) return false
    if (typeof fn !== 'function') return false;
    if (typeof flat !== 'number' || flat < 0 || (flat % 1 !== 0 && flat !== Infinity)) return false;
    return true
  }

 /**
 * @name none
 * @function
 *
 * @param {Array|Object} arr the array to filter
 * @param {Function|Object} fn the predicate
 * @param {Number} flat  the array to filter flattening depth
 *  
 * @description filters an array
 * 
 * @return {Array|Object} array, the filtered array for which the predicate is true
 * 
 */
  exports.none  = (arr = [], fn = () => false, flat = 0) => {
   return this.inputsValid(arr, fn, flat) ? arr.flat(flat).every(v => !fn(v)) : false
};

 /**
 * @name forEachAsync
 * @function
 *
 * @param {Array|Object} arr the array to filter
 * @param {Function|Object} fn the callback function
 * @param {Number} flat  the array to filter flattening depth
 *  
 * @description asynchronously  loops an array
 * 
 * @return {Promise}  a promise if promise is fulfilled and successful
 * 
 */
exports.forEachAsync =  (arr = [], fn = () => false, flat = 0) => {
    if(this.inputsValid(arr, fn, flat)){
        return arr.flat(flat).reduce((promise, value) => promise.then(() => fn(value)), Promise.resolve());
    }else{
        return undefined
    }
   
}
    
/**
 * @name mapAsync
 * @function
 *
 * @param {Array|Object} arr the array to loop through
 * @param {Function|Object} fn the callback function
 * @param {Number} flat  the array to filter flattening depth
 *  
 * @description asynchronously  maps an array
 * 
 * @return {Promise}  a promise if promise is fulfilled and successful
 * 
 */
exports.mapAsync = (arr = [],fn = () => [], flat = 0) => {
    return  this.inputsValid(arr, fn, flat)? Promise.all(arr.flat(flat).map(fn)): []
}

/**
 * @name filterAsync
 * @function
 *
 * @param {Array|Object} arr the array to filter
 * @param {Function|Object} fn the callback function
 * @param {Number} flat  the array to filter flattening depth
 *  
 * @description asynchronously  filters an array
 * 
 * @return {Promise}  a promise if promise is fulfilled and successful
 * 
 */

exports.filterAsync  = async (arr = [], fn = () => [], flat = 0) => {
    if(this.inputsValid(arr, fn, flat)){
        return this.mapAsync(fn, flat).then(array => arr.flat(flat).filter((v, i) => Boolean(array[i])));
    }else{
        return []
    }
}

/**
 * @name reduceAsync
 * @function
 *
 * @param {Array|Object} arr the array to filter
 * @param {Function|Object} fn the callback function
 * @param {Number} flat  the array to filter flattening depth
 *  
 * @description asynchronously  reduces an array
 * 
 * @return {Promise}  a promise if promise is fulfilled and successful
 * 
 */

exports.reduceAsync = async (arr =[], fn = () => {}, init, flat = 0) => {
   if(this.inputsValid(arr, fn, flat)){
    return Promise.resolve(init).then(accumulator => this.forEachAsync(arr.flat(flat), async (v, i) => {
        accumulator = fn(accumulator, v, i)
    }).then(() => accumulator));
   }else{
       return 0
   }
}
/**
 * @name filter
 * @function
 *
 * @param {Array|Object} arr the array to filter
 * @param {Function|Object} fn the call back function
 * @param {Number} flat  the array to filter flattening depth
 *  
 * @description filters an array
 * 
 * @return {Array|Object} array, the filtered array
 * 
 */
exports.filtered = (arr = [], fn = () => [], flat = 1) => {
    return this.inputsValid(arr, fn, flat) ? arr.flat(flat).filter(x => fn(x)) : []
}

/**
 * @name filterItems
 * @function
 * 
 * @param {Array|Object} arr the array to filter
 * @param {String} query any filtering query
 *  
 * @description asynchronously read a query and filter arrays according to the query
 * 
 * @return {Array}  the query filtered array
 * 
 */
exports.filterItems = (query, arr = []) => {
    if (!Array.isArray(arr)) return []
    return arr.filter(el => el.toLowerCase().indexOf(query.toLowerCase()) !== -1);
} 

 /**
 * @name some
 * @function
 *
 * @param {Array} arr the array to filter
 * @param {Function} fn the predicate
 * @param {Number} flat  the array to filter flattening depth
 *  
 * @description filters an array according to the truthiness of the predicate
 * 
 * @return {Boolean} true if at least one of the array items for which the predicate is true if found. false otherwise
 * 
 */
exports.some = (arr = [], fn = () => false, flat = 0) =>{
    return this.inputsValid(arr, fn, flat) ? arr.flat(flat).reduce((x, y) => x || fn(y), false) : false
} 

/**
 * @name every
 * @function
 *
 * @param {Array} arr the array to filter
 * @param {Function} fn the predicate
 * @param {Number} flat  the array to filter flattening depth
 *  
 * @description filters an array according to the truthiness of the predicate
 * 
 * @return {Boolean} true if each one of the array items for which the predicate is true if found. false otherwise
 * 
 */
exports.every = (arr = [], fn = () => false, flat = 0) => {
   if(this.inputsValid(arr, fn, flat)){
    let result = [];
    arr.flat(flat).reduce((x, y) => (x === false && fn(y) ? result.push(y) : result.pop()), false);
    return result.length === arr.flat(flat).length ? true : false;
   }else{
       return false
   }
}

/**
 * @name forEach
 * @function
 *
 * @param {Array} arr the array to filter
 * @param {Function} fn the call back function
 * @param {Number} flat  the array to filter flattening depth
 *  
 * @description performs fn() operation for each of the array elements
 * 
 * @return {Function|Object} the resulting object or array or element from the fn() operation 
 * 
 */

exports.forEach  = (arr = [], fn = () => false, flat = 0) => {
    if(this.inputsValid(arr, fn, flat)){
        for (let i = 0; i < arr.flat(flat).length; i++) {
            fn(arr.flat(flat)[i]);
        }
    }else{
        return undefined
    }
};

/**
 * @name filter
 * @function
 *
 * @param {Array} arr the array to filter
 * @param {Function} fn the call back function
 * @param {Number} flat  the array to filter flattening depth
 *  
 * @description filters an array according to the truthiness of the predicate
 * 
 * @return {Array} the resulting array
 * 
 */

exports.filter = (arr = [], fn = () => false, flat = 0) =>{
   if(this.inputsValid(arr, fn, flat)){
    let result = [];
    for (let i = 0; i < this.flat(flat).length; i++) {
        fn(arr.flat(flat)[i]) ? result.push(arr.flat(flat)[i]) : [];
    }
    return result.length > 0 ? result : [];
   }else{
       return []
   }
};

/**
 * @name flatten
 * @function
 *
 * @param {Array} arr the array to flatten
 *  
 * @description flatten an array to whatsoever depth or level it has
 * 
 * @return {Array} the resulting flattened array
 * 
 */

exports.flatten  = (arr =[])  => {
    const result = [];
    arr.forEach(el => (Array.isArray(el) ? result.push(...flatten(el)) : result.push(el)));
    return result;
};

 /**
 * @name findIndex
 * @function
 *
 * @param {Array} arr the array to filter
 * @param {Function} fn the call back function
 * @param {Number} flat  the array to filter flattening depth
 *  
 * @description find the index of an array element
 * 
 * @return {Array} the resulting array element
 * 
 */
exports.findIndex  = (arr = [], fn = () => false, flat = 0)  => {
    if(this.inputsValid(arr, fn, flat)){
        return arr.flat(flat).reduce((x, y, z) => (x === -1 && fn(y) ? z : x), -1);
    }else{
        return undefined
    }

    
};

/**
 * @name map
 * @function
 *
 * @param {Array} arr the array to filter
 * @param {Function} fn the call back function
 * @param {Number} flat  the array to filter flattening depth
 *  
 * @description maps each element with the resulting operation of the callback function
 * 
 * @return {Array} the resulting array 
 * 
 */
exports.map =  (arr = [], fn = () => [], flat = 0) => {
    return this.inputsValid(arr, fn, flat) ? arr.flat(flat).reduce((x, y) => x.concat(fn(y)), []) : []
};

/**
 * @name find
 * @function
 *
 * @param {Array} arr the array to filter
 * @param {Function} fn the predicate
 * @param {Number} flat  the array to filter flattening depth
 *  
 * @description find the first array element for which the predicate is true
 * 
 * @return {Array} the resulting array element
 * 
 */
exports.find  = (arr = [], fn = () => false, flat = 0)  => {
     if(this.inputsValid(arr,fn,flat)){
        return arr.flat(flat).reduce((x, y) => (x === undefined && fn(y) ? y : x), undefined);
     }else{
         return undefined
     }
};

 /**
 * @name billOnceAndOnlyOnce
 * @function
 *
 * @param {Function|Object} bill the function to call for billing

 * @param {Function|Object} doNotBill the function to call to avoid billing
 *  
 * @description creates a function that is called and runs only onces no matter how many times the function is called or used in the loop. For instance if the function is called 200 times, it would be called or executed only the first round (no more than once); that is it would 1 time and not run the rest of 199 times.
 * 
 * @return {Function|Object} a function that bills only once not matter what
 * 
 */

exports.billOnceAndOnlyOnce = (bill, doNotBill) =>{
  let timeToBill = bill
  return (...args) => {
    let result = timeToBill(...args)
    timeToBill = doNotBill
    return result
  }
}



  /**
   * @name callFirstOnlyNTimes
   * @function
   *
   * @param {Function|Object} f the function to be called only n times
   * @param {Function|Object} g  the function to be called as many times as left after f() is called n times
   * @param {Number} n number of time the function f() should be called
   *  
   * @description creates a function that calls and runs the first argument function f() n times and only n times no matter how many times the function is called or used in the loop. It calls f() exactly n times and the rest of the times it calls g(). For instance if n = 1 and the function is called 200 times, it would call or execute f() only once and g() 199 times. If n = 5 and the function is called 200 times, it would call or execute f() exactly 5 times and g() 195 times.
   * 
   * @return {Function|Object} a function that calls fn() only n times and g() afterward
   * 
   */
exports.callFirstOnlyNTimes = (f, g = () => {}, n = 1)  =>{
  let done = false
  return (...args) => {
    if (!done) {
      done = true
      if (typeof n !== 'number' || n % 1 !== 0) {
        f(...args)
      } else {
        for (let i = 1; i <= Math.abs(n); i++) {
          f(...args)
        }
      }
    } else {
      g(...args)
    }
  }
}
