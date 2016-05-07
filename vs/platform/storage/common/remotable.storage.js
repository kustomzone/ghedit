var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define(["require", "exports", 'vs/base/common/winjs.base', 'vs/platform/thread/common/thread', 'vs/platform/storage/common/storage'], function (require, exports, winjs_base_1, thread_1, storage_1) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    var MainThreadStorage = (function () {
        function MainThreadStorage(storageService) {
            this._storageService = storageService;
        }
        MainThreadStorage.prototype.getValue = function (shared, key) {
            var jsonValue = this._storageService.get(key, shared ? storage_1.StorageScope.GLOBAL : storage_1.StorageScope.WORKSPACE);
            if (!jsonValue) {
                return winjs_base_1.TPromise.as(undefined);
            }
            var value;
            try {
                value = JSON.parse(jsonValue);
                return winjs_base_1.TPromise.as(value);
            }
            catch (err) {
                return winjs_base_1.TPromise.wrapError(err);
            }
        };
        MainThreadStorage.prototype.setValue = function (shared, key, value) {
            var jsonValue;
            try {
                jsonValue = JSON.stringify(value);
                this._storageService.store(key, jsonValue, shared ? storage_1.StorageScope.GLOBAL : storage_1.StorageScope.WORKSPACE);
            }
            catch (err) {
                return winjs_base_1.TPromise.wrapError(err);
            }
        };
        MainThreadStorage = __decorate([
            thread_1.Remotable.MainContext('MainThreadStorage'),
            __param(0, storage_1.IStorageService)
        ], MainThreadStorage);
        return MainThreadStorage;
    }());
    exports.MainThreadStorage = MainThreadStorage;
    var ExtHostStorage = (function () {
        function ExtHostStorage(threadService) {
            this._proxy = threadService.getRemotable(MainThreadStorage);
        }
        ExtHostStorage.prototype.getValue = function (shared, key, defaultValue) {
            return this._proxy.getValue(shared, key).then(function (value) { return value || defaultValue; });
        };
        ExtHostStorage.prototype.setValue = function (shared, key, value) {
            return this._proxy.setValue(shared, key, value);
        };
        return ExtHostStorage;
    }());
    exports.ExtHostStorage = ExtHostStorage;
});
//# sourceMappingURL=remotable.storage.js.map