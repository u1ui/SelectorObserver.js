const observers = new Set();

// global mutation observer
const muObserver = new MutationObserver(checkMutations);
muObserver.observe(document, {
    childList: true,
    subtree: true,
    attributes: true
});
function addTree(el) {
    for (const observer of observers) observer._addTree(el);
}
function removeTree(el) {
    for (const observer of observers) observer._removeTree(el);
}
function treeModified(el) {
    for (const observer of observers) observer._treeModified(el);
}
function checkMutations(mutations) {
    for (const mutation of mutations) {
        if (mutation.type==='childList') {
            for (const target of mutation.addedNodes) {
                target.nodeType === 1 && addTree(target);
            }
            for (const target of mutation.removedNodes) {
                target.nodeType === 1 && removeTree(target);
            }
        }
        if (mutation.type==='attributes') {
            treeModified(mutation.target);
        }
    }
}


// animation observer
let animationCounter = 0;
let aObservers = new Set();
class _animationObserver {
    constructor(selector, callback) {
        this.callback = callback;
        // todo?: reuse style element if selector already exists
        this.style = document.createElement('style');
        this.animationName = `u1-selObs-${animationCounter++}`;

        this.style.innerHTML =
            `@keyframes ${this.animationName}{}\n`+
            `${selector}{animation:${this.animationName} 1ms}`;
        document.head.append(this.style);
        aObservers.add(this);
    }
    disconnect(){
        this.style.remove();
        aObservers.delete(this);
    }
}
document.addEventListener('animationstart', e => { // todo: remove/add listener by ussage
    for (const observer of aObservers) {
        if (e.animationName === observer.animationName) {
            observer.callback(e.target);
        }
    }
});






export class SelectorObserver {
    constructor({on, off}) {
        this.elements = new WeakSet(); // todo WeakRef: to be able to loop over elements
        this._on = on;
        this._off = off;
    }
    observe(selector, options={}) {
        this.selector = selector;
        this.options = options;
        const els = document.querySelectorAll(this.selector);
        for (const el of els) this._add(el);

        if (options.checkMutations!==false) {
            observers.add(this);
        }

        if (options && options.checkAnimation) {
            this.aniObserver = new _animationObserver(this.selector, el=>{
                el.matches(this.selector) ? this._add(el) : this._remove(el);
            });
        }
    }
    disconnect() {
        observers.delete(this);
        this.aniObserver && this.aniObserver.disconnect();
    }
    _add(el) {
        if (this.elements.has(el)) return;
        this.elements.add(el);
        this._on && this._on(el);
    }
    _remove(el) {
        if (!this.elements.has(el)) return;
        this.elements.delete(el);
        this._off && this._off(el);
    }

    _addTree(target) {
        target.matches(this.selector) && this._add(target);
        if (document.readyState === 'complete') { // Before domready MutationObserver reports every node, ok?
            for (const el of target.querySelectorAll(this.selector)) this._add(el);
        }
    }
    _removeTree(target) {
        //if (!this._off) return; // performance
        this._remove(target);
        for (const el of target.querySelectorAll('*')) this._remove(el);
    }
    _treeModified(target) {
        target.matches(this.selector) ? this._add(target) : this._remove(target);
        // for the moment subtree not checked
        // if (this.options.deep) {
        //     for (const el of this.elements) if (!el.matches(this.selector)) this._remove(el);
        //     for (const el of target.querySelectorAll(this.selector)) this._add(el);
        // }
    }
}





/*
var listeners = [],
    //root = document.documentElement,
    root = document,
    Observer;

onElement = function(selector, options) {
    var listener = {
        selector: selector,
		onAdd: options.onAdd,
        elements: new WeakSet(),
    };
    var els = root.querySelectorAll(listener.selector), i=0, el;
    while (el = els[i++]) {
        listener.elements.add(el);
        listener.onAdd && listener.onAdd.call(el, el);
    }

    listeners.push(listener);
    if (!Observer) {
        Observer = new MutationObserver(checkMutations);
        Observer.observe(root, {
            childList: true,
            subtree: true
        });
    }
    checkListener(listener);
};
function checkListener(listener, target) {
    var i=0, el, els = [];
    target && target.matches(listener.selector) && els.push(target);
    if (loaded) { // ok? check inside node on innerHTML - only when loaded
        Array.prototype.push.apply(els, (target||root).querySelectorAll(listener.selector));
    }
    while (el = els[i++]) {
        if (listener.elements.has(el)) continue;
        listener.elements.add(el);
        listener.onAdd    && listener.onAdd.call(el, el);
    }
}
function checkListeners(inside) {
    var i=0, listener;
    while (listener = listeners[i++]) checkListener(listener, inside);
}
function checkMutations(mutations) {
    var j=0, i, mutation, nodes, target;
    while (mutation = mutations[j++]) {
        nodes = mutation.addedNodes, i=0;
        while (target=nodes[i++]) target.nodeType === 1 && checkListeners(target);
    }
}
*/
