var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import LocalForage from 'localforage';
import CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
/**
 * Storage is an easy way to store key/value pairs and JSON objects.
 * Storage uses a variety of storage engines underneath, picking the best one available
 * depending on the platform.
 *
 * When running in a native app context, Storage will prioritize using SQLite, as it's one of
 * the most stable and widely used file-based databases, and avoids some of the
 * pitfalls of things like localstorage and IndexedDB, such as the OS deciding to clear out such
 * data in low disk-space situations.
 *
 * When running in the web or as a Progressive Web App, Storage will attempt to use
 * IndexedDB, WebSQL, and localstorage, in that order.
 *
 * @usage
 * First, if you'd like to use SQLite, install the cordova-sqlite-storage plugin:
 * ```bash
 * cordova plugin add cordova-sqlite-storage --save
 * ```
 *
 * Next, install the package (comes by default for Ionic 2 apps >= RC.0)
 *
 * ```bash
 * npm install --save @ionic/storage
 * ```
 *
 * Next, add it to the providers list in your `NgModule` declaration (for example, in `src/app.module.ts`):
 *
 * ```typescript
 * import { Storage } from '@ionic/storage';
 *
 * @NgModule({
 *   declarations: [
 *     // ...
 *   ],
 *   imports: [
 *     IonicModule.forRoot(MyApp)
 *   ],
 *   bootstrap: [IonicApp],
 *   entryComponents: [
 *     // ...
 *   ],
 *   providers: [
 *     Storage
 *   ]
 * })
 * export class AppModule {}
 *```
 *
 * Finally, inject it into any of your components or pages:
 * ```typescript
 * import { Storage } from '@ionic/storage';

 * export class MyApp {
 *   constructor(storage: Storage) {
 *
 *      storage.ready().then(() => {
 *
 *        // set a key/value
 *        storage.set('name', 'Max');
 *
 *        // Or to get a key/value pair
 *        storage.get('age').then((val) => {
 *          console.log('Your age is', val);
 *        })
 *      });
 *   }
 * }
 * ```
 *
 * ### Configuring Storage
 *
 * The Storage engine can be configured both with specific storage engine priorities, or custom configuration
 * options to pass to localForage. See the localForage config docs for possible options: https://github.com/localForage/localForage#configuration
 *
 *
 * ```typescript
 * import { Storage } from '@ionic/storage';
 *
 * export function provideStorage() {
 *   return new Storage(['sqlite', 'websql', 'indexeddb'], { name: '__mydb' });
 * }
 *
 * @NgModule({
 *   declarations: ...,
 *   imports: ...,
 *   bootstrap: ...,
 *   entryComponents: ...,
 *    providers: [
 *      { provide: Storage, useFactory: provideStorage }
 *    ]
 * })
 * export class AppModule {}
 * ```
 */
export var Storage = (function () {
    /**
     * Create a new Storage instance using the order of drivers and any additional config
     * options to pass to LocalForage.
     *
     * Possible driver options are: ['sqlite', 'indexeddb', 'websql', 'localstorage'] and the
     * default is that exact ordering.
     */
    function Storage(driverOrder, config) {
        var _this = this;
        if (driverOrder === void 0) { driverOrder = ['sqlite', 'indexeddb', 'websql', 'localstorage']; }
        this._driver = null;
        this._dbPromise = new Promise(function (resolve, reject) {
            var db;
            var dbConfig = {
                name: '_ionicstorage',
                storeName: '_ionickv'
            };
            // Merge any custom config options they have
            if (config) {
                for (var k in config) {
                    dbConfig[k] = config[k];
                }
            }
            LocalForage.defineDriver(CordovaSQLiteDriver).then(function () {
                db = LocalForage.createInstance(dbConfig);
            })
                .then(function () { return db.setDriver(_this._getDriverOrder(driverOrder)); })
                .then(function () {
                _this._driver = db.driver();
                resolve(db);
            })
                .catch(function (reason) { return reject(reason); });
        });
    }
    Object.defineProperty(Storage.prototype, "driver", {
        /**
         * Get the name of the driver being used.
         * @return Name of the driver
         */
        get: function () {
            return this._driver;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Reflect the readiness of the store.
     * @return Promise that resolves when the store is ready
     */
    Storage.prototype.ready = function () {
        return this._dbPromise;
    };
    Storage.prototype._getDriverOrder = function (driverOrder) {
        return driverOrder.map(function (driver) {
            switch (driver) {
                case 'sqlite':
                    return CordovaSQLiteDriver._driver;
                case 'indexeddb':
                    return LocalForage.INDEXEDDB;
                case 'websql':
                    return LocalForage.WEBSQL;
                case 'localstorage':
                    return LocalForage.LOCALSTORAGE;
            }
        });
    };
    /**
     * Get the value associated with the given key.
     * @param key the key to identify this value
     * @return Promise that resolves with the value
     */
    Storage.prototype.get = function (key) {
        return this._dbPromise.then(function (db) { return db.getItem(key); });
    };
    /**
     * Set the value for the given key.
     * @param key the key to identify this value
     * @param value the value for this key
     * @return Promise that resolves when the value is set
     */
    Storage.prototype.set = function (key, value) {
        return this._dbPromise.then(function (db) { return db.setItem(key, value); });
    };
    /**
     * Remove any value associated with this key.
     * @param key the key to identify this value
     * @return Promise that resolves when the value is removed
     */
    Storage.prototype.remove = function (key) {
        return this._dbPromise.then(function (db) { return db.removeItem(key); });
    };
    /**
     * Clear the entire key value store. WARNING: HOT!
     * @return Promise that resolves when the store is cleared
     */
    Storage.prototype.clear = function () {
        return this._dbPromise.then(function (db) { return db.clear(); });
    };
    /**
     * @return Promise that resolves with the number of keys stored.
     */
    Storage.prototype.length = function () {
        return this._dbPromise.then(function (db) { return db.length(); });
    };
    /**
     * @return Promise that resolves with the keys in the store.
     */
    Storage.prototype.keys = function () {
        return this._dbPromise.then(function (db) { return db.keys(); });
    };
    /**
     * Iterate through each key,value pair.
     * @param iteratorCallback a callback of the form (value, key, iterationNumber)
     * @return Promise that resolves when the iteration has finished.
     */
    Storage.prototype.forEach = function (iteratorCallback) {
        return this._dbPromise.then(function (db) { return db.iterate(iteratorCallback); });
    };
    Storage = __decorate([
        Injectable()
    ], Storage);
    return Storage;
}());