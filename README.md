# SelectorObserver.js
Monitor elements by CSS selector

## Usage

```js
import {SelectorObserver} from '../SelectorObserver.js';
new SelectorObserver({
    on: el => el.innerHTML = 'found!' ,
    off: el => el.innerHTML = 'lost!' ,
}).observe('#SOTargets div');
```

```html
<div class=container id=SOTargets contenteditable>
    Find all bold divs (press enter)
</div>
```

[doc](https://doc.deno.land/https://cdn.jsdelivr.net/gh/u1ui/SelectorObserver.js@x/SelectorObserver.js)

## Install

```js
import * as module from "https://cdn.jsdelivr.net/gh/u1ui/SelectorObserver.js@x.x.x/SelectorObserver.min.js"
```

## Demos

[minimal.html](http://gcdn.li/u1ui/SelectorObserver.js@main/tests/minimal.html)  
[test.html](http://gcdn.li/u1ui/SelectorObserver.js@main/tests/test.html)  
[tests.html](http://gcdn.li/u1ui/SelectorObserver.js@main/tests/tests.html)  

## Options - "checkAnimation" (beta)

```javascript
o.observer('.el', {checkAnimation: true});
    
```

Like this, you can event watch selectors like `.el:has(img:hover) > tr:nth-child(2)`  
Trigger only `on` and not `off` right now.
-->

## About

- MIT License, Copyright (c) 2022 <u1> (like all repositories in this organization) <br>
- Suggestions, ideas, finding bugs and making pull requests make us very happy. ♥

