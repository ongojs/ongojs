 
const fs = require("fs");

const {join } = require('path');
const {Readable} = require('stream');


exports.basedDir = filePath => join(__dirname, filePath);

exports.fsDelete = async path => await fs.promises.unlink(this.basedDir(path)).catch(error => console.log('could not delete file'))


/*** 
 * @name rsCreate
 * @function
 * 
 * @description  
 * Creates a readable stream.
 *
 * Creates a readable stream, which contains all further functions for reading from and piping into other writable streams.
 * The encoding option sets the encoding for the path while opening the directory and subsequent read operations.
 *
 * @param {string|Buffer|URL} path - path or name of the directory
 * @param {Object|integer} options - options
 * @param {string | null} [options.encoding = 'utf8'] - sets the encoding for the path while opening the directory and subsequent read operations.
 * @param {number} [options.bufferSize = 32] Number of directory entries that are buffered internally when reading from the directory.Higher values lead to better performance but higher memory usage
 * @return {Object} - fs.createReadableStream()
 *
 */

// exports.rsCreate = (path ='nothing', flags = 'r', encoding = 'utf8', fd = null, mode = 0o66, autoClose = true, emitClose = false, start, end = Infinity, highWaterMark = 64 * 1024) => {
//     fs.createReadStream(this.basedDir(path), {
//         flags: flags,
//         encoding: encoding,
//         fd: fd,
//         mode: mode,
//         autoClose: autoClose,
//         emitClose: emitClose,
//         start: start,
//         end: end,
//         highWaterMark: highWaterMark
//     })
// }

/**
 * @name wsCreate
 * @function
 * 
 * @description  
 * Create a writable stream.
 *
 * Creates a writable stream, which contains all further functions for writing to the stream .
 * The encoding option sets the encoding for the path while opening the directory and subsequent read operations.
 *
 * @param {string|Buffer|URL} path - path or name of the directory
 * @param {Object|integer} options - options
 * @param {string | null} [options.encoding = 'utf8'] - sets the encoding for the path while opening the directory and subsequent read operations.
 * @param {number} [options.bufferSize = 32] Number of directory entries that are buffered internally when reading from the directory.Higher values lead to better performance but higher memory usage
 * @return {Object} - fs.createWritableStream()
 *
 */

// exports.wsCreate = (path, flags = 'w', encoding = 'utf8', fd = null, mode = 0o66, autoClose = true, emitClose = false, start)  => {
//     fs.createWriteStream(this.basedDir(path), {
//         flags: flags,
//         encoding: encoding,
//         fd: fd,
//         mode: mode,
//         autoClose: autoClose,
//         emitClose: emitClose,
//         start: start
//     })
// }
/**
 *   USING PROMISES : fs.promises
 */

// DIR (FOLDER) RELATED
/*** 
 * @name dirCreate
 * @function
 * 
 * @description  
 * Asynchronously creates a directory then resolves the Promise with no arguments upon success.
 *
 * The optional options argument can be an integer specifying mode(permission and sticky bits),
 * or an object with a mode property and a recursive property indicating whether parent folders should be created.
 * Calling fsPromises.mkdir() when path is a directory that exists results in a rejection only when recursive is false.
 *
 * @param  {string|Buffer|URL} path   - path or name of the directory
 * @param  {Object|integer} options  - options
 * @param  {boolean} [options.recursive = false]
 * @param  {string | integer} [options.mode = 0o777] Not supported on Windows.Default: 0o777.
 * @return {Promise} - The promise with no arguments upon success
 *
 */

exports.dirCreate  = async  (path, rec = false, mode = 0o777) => {return await fs.promises.mkdir(this.basedDir(path), {
        recursive: rec,
        mode: mode,
    })}


/**
 * @name dirOpen
 * @function
 * 
 * @description  
 * Asynchronously open a directory.
 *
 * Creates an fs.Dir, which contains all further functions for reading from and cleaning up the directory.
 * The encoding option sets the encoding for the path while opening the directory and subsequent read operations.
 *
 * @param {string|Buffer|URL} path - path or name of the directory
 * @param {Object|integer} options - options
 * @param {string | null} [options.encoding = 'utf8'] - sets the encoding for the path while opening the directory and subsequent read operations.
 * @param {number} [options.bufferSize = 32] Number of directory entries that are buffered internally when reading from the directory.Higher values lead to better performance but higher memory usage
 * @return {Promise} - The promise containing fs.Dir
 *
 */

exports.dirOpen =  async(path = 'default', encoding = 'utf8', bufferSize = 32)  => await fs.promises.opendir(this.basedDir(path), {
        encoding: encoding,
        bufferSize: bufferSize,
    })


/**
 * @name dirRead
 * @function
 * 
 * @description  
 * Reads the contents of a directory then resolves the Promise with an array of the names of the files
 * in the directory excluding '.' and '..'.
 *
 * The optional options argument can be a string specifying an encoding, or an object with an encoding property
 * specifying the character encoding to use for the filenames.If the encoding is set to 'buffer',
 * the filenames returned will be passed as Buffer objects.
 *
 * If options.withFileTypes is set to true, the resolved array will contain fs.Dirent objects
 *
 * @param {string|Buffer|URL} path - path or name of the directory
 * @param {Object|integer} options - options
 * @param {string | null} [options.encoding = 'utf8'] - sets the encoding for the path while opening the directory and subsequent read operations.
 * @param {number} [options.bufferSize = 32] Number of directory entries that are buffered internally when reading from the directory.Higher values lead to better performance but higher memory usage
 * @return {Promise} - The resolved Promise with an array of the names of the files in the directory excluding '.' and '..'.
 *
 */

exports.dirRead = async(path = 'default', encoding = 'utf8', withFileTypes = true) => await fs.promises.readdir(this.basedDir(path), {
        encoding: encoding,
        withFileTypes: withFileTypes,
    })


/**
 * @name dirUpdate
 * @function
 * 
 * @description  
 * Renames oldPath to newPath and resolves the Promise with no arguments upon success.
 *
 * @param  {string|Buffer|URL} oldPath - path or name of the directory
 * @param  {string|Buffer|URL}  newPath - options
 * @return {Promise} - The promise with no arguments upon success
 *
 */

exports.dirUpdate = async (oldPath, newPath)  => await fs.promises.rename(this.basedDir(oldPath), this.basedDir(newPath));



/**
 * @name dirDelete
 * @function
 * 
 * @description  
 * Removes the directory identified by path then resolves the Promise with no arguments upon success.
 *
 * maxReties: If an EBUSY, EMFILE, ENFILE, ENOTEMPTY, or EPERM error is encountered, Node.js will retry the operation
 * with a linear back off wait of retryDelay ms longer on each try.This option represents the number of retries.
 * This option is ignored if the recursive option is not true
 * recursive: If true, perform a recursive directory removal.In recursive mode, errors are not reported
 * if path does not exist, and operations are retried on failure.
 * retryDelay: The amount of time in milliseconds to wait between retries.
 * This option is ignored if the recursive option is not true
 *
 * @param  {string|Buffer|URL} path - path or name of the directory
 * @param  {Object|integer} options - options
 * @param {integer} [options.maxRetries = 0] - the number of retries.
 * @param  {boolean} [options.recursive = false] -  perform a recursive directory removal
 * @param  {integer} [options.retryDelay = 100] - The amount of time in milliseconds to wait between retries
 * @return {Promise} - The promise with no arguments upon success
 *
 */

exports.dirDelete = async (path = 'default', max = 5) => await fs.promises.rmdir(this.basedDir(path), {
        maxRetries: max,
    })


// FILE RELATED

/**
 * @name fileCreate
 * @function
 * 
 * @description  
 * Asynchronously writes data to a file, replacing the file if it already exists
 * data can be a string or a buffer.
 *
 *
 * The encoding option is ignored if data is a buffer.
 * If options is a string, then it specifies the encoding.
 * Any specified FileHandle has to support writing.
 * It is unsafe to use promises.writeFile() multiple times on the same file without waiting
 * for the Promise to be resolved(or rejected).
 *
 * @param  {string|Buffer|URL|FileHandle} file - filename or FileHandle
 * @param  {string|Buffer|Unit8Array} data - data to write to file
 * @param  {Object|string} options - options
 * @param  {string|null} [options.encoding = 'utf8'] - the number of retries
 * @param  {integer} [options.mode = 0o666] -  perform a recursive directory removal
 * @param  {string} [options.flag = 'w'] - The amount of time in milliseconds to wait between retries
 * @return {Promise} - The Promise will be resolved with no arguments upon success
 *
 */
exports.fileCreate = async (file = 'nothing', data = {}, encoding = 'utf8', mode = 0o666, flag = 'w') =>await fs.promises.writeFile(this.basedDir(file), JSON.stringify(data), encoding, mode, flag)


/**
 * @name fileOpen
 * @function
 * 
 * @description  
 * Asynchronous file open that returns a Promise that, when resolved, yields a FileHandle object
 *
 * mode sets the file mode(permission and sticky bits), but only if the file was created.
 * Some characters( < >: " / \ | ? *) are reserved under Windows as documented by Naming Files,
 * Paths, and Namespaces. Under NTFS, if the filename contains a colon, Node.js will open a file system stream,
 * as described by the MSDN page.
 *
 * @param  {string|Buffer|URL} path - filename or file path or FileHandle
 * @param  {string|number} [flags = 'r'] -
 * @param  {string|integer} [mode = 0o666] - sets the file mode (permission and sticky bits), but only if the file was created.
 * @return {Promise} - The Promise that, when resolved, yields a FileHandle object.
 *
 */
exports.fileOpen = async (path = 'nothing', flags = 'r', mode = 0o666) => await fs.promises.open(this.basedDir(path), flags, mode)


/**
 * @name fileRead
 * @function
 * 
 * @description  
 * Asynchronously reads the entire contents of a file.
 *
 * The Promise is resolved with the contents of the file.If no encoding is specified(using options.encoding),
 * the data is returned as a Buffer object.Otherwise, the data will be a string.
 * If options is a string, then it specifies the encoding.
 * When the path is a directory, the behavior of promises.readFile() is platform - specific.On macOS, Linux, and Windows,
 * the promise will be rejected with an error.On FreeBSD, a representation of the directory 's contents will be returned.
 * Any specified FileHandle has to support reading.
 *
 * @param {string|Buffer|URL|FileHandle} path - filename or FileHandle
 * @param {Object|string} options - options
 * @param {string | null} [options.encoding = null] - sets the encoding for the path while opening the directory and subsequent read operations.
 * @param {string} [options.flag = 'r']
 * @return {Promise} - The Promise is resolved with the contents of the file.
 *                     If no encoding is specified(using options.encoding),
 *                     the data is returned as a Buffer object.Otherwise,
 *                     the data will be a string.
 *
 */

exports.fileRead = (path = 'default', encoding = 'utf8', flag = 'r') => fs.promises.readFile(this.basedDir(path), encoding, flag)


/**
 * @name fileUpdateMore
 * @function
 * 
 * @description  
 * Asynchronously append data to a file, creating the file if it does not yet exist.
 *
 * The path may be specified as a FileHandle that has been opened for appending(using fsPromise.open())
 * If options is a string, then it specifies the encoding.
 *
 * @param  {string|Buffer|URL|FileHandle} file - filename or FileHandle
 * @param  {string|Buffer} data - data to append to file
 * @param  {Object|string} options - options
 * @param  {string|null} [options.encoding = 'utf8'] - the number of retries
 * @param  {integer} [options.mode = 0o666] -  perform a recursive directory removal
 * @param  {string} [options.flags = 'a'] - The amount of time in milliseconds to wait between retries
 * @return {Promise} - The Promise will be resolved with no arguments upon success
 *
 */

exports.fileUpdateMore = async (path = 'default', data = {}, encoding = 'utf8', flags = 'a')  => await fs.promises.appendFile(this.basedDir(path), JSON.stringify(data) + '\n', encoding, flags)


/**
 *  
 * @name fileUpdate
 * @function
 * 
 * @description  
 * Asynchronously writes data to a file, replacing the file if it already exists
 * data can be a string or a buffer.
 *
 * The encoding option is ignored if data is a buffer.
 * If options is a string, then it specifies the encoding.
 * Any specified FileHandle has to support writing.
 * It is unsafe to use promises.writeFile() multiple times on the same file without waiting
 * for the Promise to be resolved(or rejected).
 *
 * @param  {string|Buffer|URL|FileHandle} file - filename or FileHandle
 * @param  {string|Buffer|Unit8Array} data - data to write to file
 * @param  {Object|string} options - options
 * @param  {string|null} [options.encoding = 'utf8'] - the number of retries
 * @param  {integer} [options.mode = 0o666] -  perform a recursive directory removal
 * @param  {string} [options.flag = 'w'] - The amount of time in milliseconds to wait between retries
 * @return {Promise} - The Promise will be resolved with no arguments upon success
 *
 */
exports.fileUpdate = async(file = 'nothing', data = {}, encoding = 'utf8', mode = 0o666, flag = 'w') => await fs.promises.writeFile(this.basedDir(file), JSON.stringify(data), encoding, mode, flag)


/**
 * @name fileRenameOrMove
 * @function
 * 
 * @description Renames oldPath to newPath and resolves the Promise with no arguments upon success.
 * 
 * @param  {string|Buffer|URL} oldPath - path or name of the directory
 * @param  {string|Buffer|URL}  newPath - options
 * 
 * @return {Promise} - The promise with no arguments upon success
 *
 */

exports.fileRenameOrMove = async (oldPath, newPath) => await fs.promises.rename(this.basedDir(oldPath), this.basedDir(newPath))


/**
 * @name fileDelete
 * @function
 * 
 * @description Delete file
 *
 * @param  {string|Buffer|URL} path - path or name of the file

 * @return {Promise} - The Promise is resolved with no arguments upon success
 *
 */

exports.fileDelete = async path => await fs.promises.unlink(this.basedDir(path))


/**
 *  USING new Promise: return new Promise((resolve, reject))
 */

/**
 * @name create
 * @function
 * 
 * @param {String}  dir the path to the directory or the directory name
 * @param {String}  file the path to the file or the name of the file
 * @param {Object}  data the data object to update
 *
 * @description create a file in a directory
 * @return {Promise}  resolves to nothing when successful
 * 
 */


// exports.create = (file, data) => {
//     return new Promise((resolve, reject) => {
//         // Open the file for writing
//         fs.open(`${this.basedDir(file)}.json`, `wx`, (err, fileDescriptor) => {
//             if (!err && fileDescriptor) {
//                 // convert data to a string
//                 const stringData = this.helper.jString(data);
//                 // Write to file and close it
//                 fs.writeFile(fileDescriptor, stringData, err => {
//                     if (err) {
//                         reject('Error writing to new file')
//                     } else {
//                         fs.close(fileDescriptor, error => {
//                             if (error) {
//                                 reject('Error new closing file')
//                             } else {
//                                 resolve()
//                             }
//                         })
//                     }
//                 })
//             } else {
//                 reject(`Could not create a new file; it may already exist.`);
//             }
//         });

//     })
// }

 /**
 * @name read
 * @function
 * 
 * @param {String}  dir the path to the directory or the directory name
 * @param {String}  file the path to the file or the name of the file
 *
 * @description reads a file in a directory
 * @return {Promise}  resolves to the content of the file read
 * 
 */


exports.readf = (file) => new Promise((resolve, reject) => {
        fs.readFile(`${this.basedDir(file)}.json`, 'utf8', (err, data) => {
            if (!err && data) {
                const parseData = this.helper.parseJSON(data);
                resolve(parseData)
            } else {
                reject(err);
            }
        });
    })


/**
 * @name update
 * @function
 * 
 * @param {String}  dir the path to the directory or the directory name
 * @param {String}  file the path to the file or the name of the file
 * @param {Object}  data the data object to update
 *
 * @description updates a file in a directory
 * @return {Promise}  resolves to nothing when successful
 * 
 */

exports.update = (file, data) => new Promise((resolve, reject) => {
        fs.open(`${this.basedDir(file)}.json`, `r+`, (err, fileDescriptor) => {
            if (!err && fileDescriptor) {
                // convert data to a string
                const stringData = this.helper.jString(data);

                // Truncate the content of the file and close it

                fs.ftruncate(fileDescriptor, (err) =>
                    err ?
                    reject('Error Editing file') :
                    fs.writeFile(fileDescriptor, stringData, (err) =>
                        err ?
                        reject('Error writing to file') :
                        fs.close(fileDescriptor, (error) =>
                            error ? reject('Error closing file') : resolve()
                        )
                    )
                );
            } else {
                reject(`Could not open the file for updating; file may not exist yet.`);
            }
        });
    })


/**
 * @name delete
 * @function
 * 
 * @param {String}  dir the path to the directory or the directory name
 * @param {String}  file the path to the file or the name of the file
 *
 * @description deletes a file from a directory
 * @return {Promise}  resolves to nothing when successful
 * 
 */

exports.delete = (file) => new Promise((resolve, reject) => {
        fs.unlink(`${this.basedDir(file)}.json`, (err) =>
            err ? reject('Error deleting file; File may not exist.') : resolve()
        );
    })

/**
 * @name all
 * @function
 * 
 * @param {String}  dir the path to the directory or the directory name
 *
 * @description list all file names in the corresponding directory
 * @return {Promise}  trimmedFileNames the list of file names found in the directory
 * 
 */

exports.all = (dir) => new Promise((resolve, reject) => {
        fs.readdir(this.basedDir(dir), (err, itemList) => {
            if (!err && itemList && Array.isArray(itemList)) {
                if (itemList.length > 0) {
                    const trimmedFileNames = [];
                    itemList.forEach((filename) => {
                        trimmedFileNames.push(filename.replace('.json', ''));
                    });
                    resolve(trimmedFileNames)
                } else {
                    reject('Not data found')
                }
            } else {
                reject(err)
            }
        });
    })

 /**
 * @name track
 * @function
 * 
 * @param {String}  filename the path to the file
 * @param {Boolean}  persistent  true or false
 * @param {Boolean} recursive true or false
 * @param {String} encoding 'utf-8' by default
 * @param {Function} fn the callback response function
 *
 * @description watches and track file for changes
 * @return {Function} fn the callback function with eventType and listener
 * 
 */

exports.track = (filename, persistent = false, recursive = false, encoding = 'utf8', fn) => {
    fs.watch(filename, {
        persistent,
        recursive,
        encoding
    }, fn(evenType, listener))
}


exports.readdirRecursive = async(dirPath, files = []) => {
    try{
        const allFiles = await fs.promises.readdir(dirPath);
        if(allFiles){
            for await(let file of allFiles){
                if((await fs.promises.stat(dirPath + "/" + file)).isDirectory()){
                    files = this.readdirRecursive(dirPath + "/" + file, files);
                }else{
                    files.push(join(__dirname, dirPath, "/", file)) 
                }
            }
        }
        return files;
    }catch(error){
        return error;
    }
  }
// exports.writeToFile = (path, data = {}, jsonStringify = false, options = {encoding: 'utf-8', objectMode: true} ) => jsonStringify ? Readable.from(JSON.stringify(data)).pipe(fs.createWriteStream(path,options)): Readable.from(data).pipe(fs.createWriteStream(path,options ))
// exports.readFromFile = (path, options = {encoding: 'utf-8', objectMode: true}, data = []) => {
//  const readable = fs.createReadStream(path, options);
//  readable.on('data', chunk => data.push(chunk.toString));
//  readable.on('error', error =>  this.emit('error', error));
//  readable.on('end', () => this.emit('success', data.join('')));
// }

