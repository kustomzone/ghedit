define(["require", "exports", 'assert', 'vs/base/test/browser/mockDom'], function (require, exports, assert, MockDom) {
    /*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
    'use strict';
    suite('MockDom', function () {
        test('Create Element', function () {
            var doc = new MockDom.MockDocument();
            var div = doc.createElement('div');
            div.textContent = 'test';
            assert.strictEqual(div.textContent, 'test');
            assert.strictEqual(div.tagName, 'div');
        });
        test('Events', function () {
            var doc = new MockDom.MockDocument();
            var div = doc.createElement('div');
            var fakeEvent = { type: 'test' };
            var count = 0;
            var callback = function (event) {
                assert.strictEqual(event, fakeEvent);
                count++;
            };
            div.addEventListener('test', callback);
            div.dispatchEvent(fakeEvent);
            assert.strictEqual(count, 1);
            div.removeEventListener('test', callback);
            div.dispatchEvent(fakeEvent);
            assert.strictEqual(count, 1);
        });
        test('Create elements via innerHTML', function () {
            var doc = new MockDom.MockDocument();
            var div = doc.createElement('div');
            div.innerHTML = '<div id="testId"><span class="testClass">test</span></div>';
            assert.strictEqual(div.children.length, 1);
            assert.strictEqual(div.childNodes[0], div.children[0]);
            assert.strictEqual(div.children[0], div.firstElementChild);
            assert.strictEqual(div.firstElementChild, div.firstChild);
            var child = div.children[0];
            assert.strictEqual(child.id, 'testId');
            assert.strictEqual(child.getAttribute('id'), 'testId');
            assert.strictEqual(child.childElementCount, 1);
            var grandchild = child.firstElementChild;
            assert.strictEqual(grandchild.tagName, 'span');
            assert.strictEqual(grandchild.className, 'testClass');
            assert.strictEqual(grandchild.textContent, 'test');
        });
        test('Convert elements to innerHTML', function () {
            var doc = new MockDom.MockDocument();
            var div = doc.createElement('div');
            var child = doc.createElement('div');
            child.id = 'testId';
            var grandchild = doc.createElement('span');
            grandchild.className = 'testClass';
            grandchild.textContent = 'test';
            child.appendChild(grandchild);
            div.appendChild(child);
            assert.strictEqual(div.innerHTML, '<div id="testId"><span class="testClass">test</span></div>');
            assert.strictEqual(div.outerHTML, '<div><div id="testId"><span class="testClass">test</span></div></div>');
        });
    });
});
//# sourceMappingURL=mockDom.test.js.map