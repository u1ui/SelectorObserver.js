# SelectorObserver.js

Monitor DOM elements that match a CSS selector

## Ussage

```javascript

import { SelectorObserver } from 'https://cdn.jsdelivr.net/gh/u1ui/SelectorObserver.js@x.x.x/SelectorObserver.min.js';

let o = new SelectorObserver({
    on : el => console.log('added',el) ,
    off : el => console.log('removed',el) ,
});
o.observe('[data-trigger]');
    
```

## Options - "checkAnimation" (beta)
    
```javascript
o.observer('.el', {checkAnimation: true});
    
```

Like this, you can event watch selectors like `.el:has(img:hover) > tr:nth-child(2)`  
Trigger only `on` and not `off` right now.

## Demo
https://raw.githack.com/u1ui/SelectorObserver.js/main/tests/test.html  
