define(["require", "exports"], function (require, exports) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    var DiffComputer = (function () {
        function DiffComputer(originalLines, modifiedLines, shouldPostProcessCharChanges, shouldIgnoreTrimWhitespace) {
        }
        DiffComputer.prototype.computeDiff = function () {
            return [];
        };
        return DiffComputer;
    }());
    exports.DiffComputer = DiffComputer;
});
//# sourceMappingURL=nullDiffComputer.js.map