(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7093],{2092:function(e,n,t){"use strict";t.d(n,{Z:function(){return u}});var r=t(7294);function u(){return(0,r.useState)(null)}},2029:function(e,n,t){"use strict";var r=t(7294);n.Z=function(e){var n=(0,r.useRef)(e);return(0,r.useEffect)(function(){n.current=e},[e]),n}},8146:function(e,n,t){"use strict";t.d(n,{Z:function(){return i}});var r=t(7294),u=t(2029);function i(e){var n=(0,u.Z)(e);return(0,r.useCallback)(function(){return n.current&&n.current.apply(n,arguments)},[n])}},5111:function(e,n,t){"use strict";t.d(n,{Z:function(){return i}});var r=t(7294),u=t(8146);function i(e,n,t,i){void 0===i&&(i=!1);var o=(0,u.Z)(t);(0,r.useEffect)(function(){var t="function"==typeof e?e():e;return t.addEventListener(n,o,i),function(){return t.removeEventListener(n,o,i)}},[e])}},4357:function(e,n,t){"use strict";t.d(n,{Z:function(){return u}});var r=t(7294);function u(){return(0,r.useReducer)(function(e){return!e},!1)[1]}},9585:function(e,n,t){"use strict";var r=t(7294),u=void 0!==t.g&&t.g.navigator&&"ReactNative"===t.g.navigator.product;n.Z="undefined"!=typeof document||u?r.useLayoutEffect:r.useEffect},5654:function(e,n,t){"use strict";var r=t(7294),u=function(e){return e&&"function"!=typeof e?function(n){e.current=n}:e};n.Z=function(e,n){return(0,r.useMemo)(function(){var t,r;return t=u(e),r=u(n),function(e){t&&t(e),r&&r(e)}},[e,n])}},6454:function(e,n,t){"use strict";t.d(n,{Z:function(){return u}});var r=t(7294);function u(){var e=(0,r.useRef)(!0),n=(0,r.useRef)(function(){return e.current});return(0,r.useEffect)(function(){return e.current=!0,function(){e.current=!1}},[]),n.current}},8833:function(e,n,t){"use strict";t.d(n,{Z:function(){return u}});var r=t(7294);function u(e){var n=(0,r.useRef)(null);return(0,r.useEffect)(function(){n.current=e}),n.current}},3551:function(e,n,t){"use strict";t.d(n,{Z:function(){return s}});var r=t(7294);t(2092),t(2029);var u=t(8146);t(5111),t(6454),t(8833),t(9585),new WeakMap;var i=t(861),o=t(5893);let c=["onKeyDown"],a=r.forwardRef((e,n)=>{var t;let{onKeyDown:r}=e,a=function(e,n){if(null==e)return{};var t,r,u={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(u[t]=e[t]);return u}(e,c),[s]=(0,i.FT)(Object.assign({tagName:"a"},a)),f=(0,u.Z)(e=>{s.onKeyDown(e),null==r||r(e)});return(t=a.href)&&"#"!==t.trim()&&"button"!==a.role?(0,o.jsx)("a",Object.assign({ref:n},a,{onKeyDown:r})):(0,o.jsx)("a",Object.assign({ref:n},a,s,{onKeyDown:f}))});a.displayName="Anchor";var s=a},861:function(e,n,t){"use strict";t.d(n,{FT:function(){return o}});var r=t(7294),u=t(5893);let i=["as","disabled"];function o({tagName:e,disabled:n,href:t,target:r,rel:u,role:i,onClick:o,tabIndex:c=0,type:a}){e||(e=null!=t||null!=r||null!=u?"a":"button");let s={tagName:e};if("button"===e)return[{type:a||"button",disabled:n},s];let f=r=>{var u;if(!n&&("a"!==e||(u=t)&&"#"!==u.trim())||r.preventDefault(),n){r.stopPropagation();return}null==o||o(r)},l=e=>{" "===e.key&&(e.preventDefault(),f(e))};return"a"===e&&(t||(t="#"),n&&(t=void 0)),[{role:null!=i?i:"button",disabled:void 0,tabIndex:n?void 0:c,href:t,target:"a"===e?r:void 0,"aria-disabled":n||void 0,rel:"a"===e?u:void 0,onClick:f,onKeyDown:l},s]}let c=r.forwardRef((e,n)=>{let{as:t,disabled:r}=e,c=function(e,n){if(null==e)return{};var t,r,u={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(u[t]=e[t]);return u}(e,i),[a,{tagName:s}]=o(Object.assign({tagName:t,disabled:r},c));return(0,u.jsx)(s,Object.assign({},c,a,{ref:n}))});c.displayName="Button",n.ZP=c},2747:function(e,n,t){"use strict";function r(e){return`data-rr-ui-${e}`}function u(e){return`rrUi${e}`}t.d(n,{$F:function(){return u},PB:function(){return r}})},6056:function(e,n,t){"use strict";var r=t(7294);let u=r.createContext(null);u.displayName="NavContext",n.Z=u},7126:function(e,n,t){"use strict";t.d(n,{h:function(){return i}});var r=t(7294);let u=r.createContext(null),i=(e,n=null)=>null!=e?String(e):n||null;n.Z=u},4184:function(e,n){var t;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/!function(){"use strict";var r={}.hasOwnProperty;function u(){for(var e=[],n=0;n<arguments.length;n++){var t=arguments[n];if(t){var i=typeof t;if("string"===i||"number"===i)e.push(t);else if(Array.isArray(t)){if(t.length){var o=u.apply(null,t);o&&e.push(o)}}else if("object"===i){if(t.toString!==Object.prototype.toString&&!t.toString.toString().includes("[native code]")){e.push(t.toString());continue}for(var c in t)r.call(t,c)&&t[c]&&e.push(c)}}}return e.join(" ")}e.exports?(u.default=u,e.exports=u):void 0!==(t=(function(){return u}).apply(n,[]))&&(e.exports=t)}()},9351:function(e,n,t){"use strict";var r=t(3004),u=!1,i=!1;try{var o={get passive(){return u=!0},get once(){return i=u=!0}};r.Z&&(window.addEventListener("test",o,o),window.removeEventListener("test",o,!0))}catch(c){}n.ZP=function(e,n,t,r){if(r&&"boolean"!=typeof r&&!i){var o=r.once,c=r.capture,a=t;!i&&o&&(a=t.__once||function e(r){this.removeEventListener(n,e,c),t.call(this,r)},t.__once=a),e.addEventListener(n,a,u?r:c)}e.addEventListener(n,t,r)}},3004:function(e,n){"use strict";n.Z=!!("undefined"!=typeof window&&window.document&&window.document.createElement)},2950:function(e,n,t){"use strict";var r=t(9351),u=t(99);n.Z=function(e,n,t,i){return(0,r.ZP)(e,n,t,i),function(){(0,u.Z)(e,n,t,i)}}},7216:function(e,n,t){"use strict";function r(e){return e&&e.ownerDocument||document}t.d(n,{Z:function(){return r}})},930:function(e,n,t){"use strict";t.d(n,{Z:function(){return u}});var r=Function.prototype.bind.call(Function.prototype.call,[].slice);function u(e,n){return r(e.querySelectorAll(n))}},99:function(e,n){"use strict";n.Z=function(e,n,t,r){var u=r&&"boolean"!=typeof r?r.capture:r;e.removeEventListener(n,t,u),t.__once&&e.removeEventListener(n,t.__once,u)}},2365:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/dropdowns",function(){return t(7331)}])},7331:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return f}});var r=t(5893),u=t(682),i=t(7294),o=t(9331);let c=i.forwardRef((e,n)=>{let{children:t,onClick:u}=e;return(0,r.jsx)("a",{href:"",ref:n,onClick:e=>{e.preventDefault(),u(e)},className:"fw-bold text-primary dropdown-toggle",children:t})}),a=e=>{let[n,t]=(0,i.useState)("USA");return(0,r.jsxs)(o.Z,{children:[(0,r.jsx)(o.Z.Toggle,{as:c,id:"dropdown-basic",children:"USA (USD)"}),(0,r.jsxs)(o.Z.Menu,{children:[(0,r.jsx)(o.Z.Item,{href:"#/action-1",className:"py-1",children:"United Kingdom (GBP)"}),(0,r.jsx)(o.Z.Item,{href:"#/action-2",className:"py-1",active:"USA"===n,children:"USA (USD)"}),(0,r.jsx)(o.Z.Item,{href:"#/action-3",className:"py-1",children:"Australia (AUD)"}),(0,r.jsx)(o.Z.Item,{href:"#/action-2",className:"py-1",children:"Canada (CAD)"}),(0,r.jsx)(o.Z.Item,{href:"#/action-2",className:"py-1",children:"Europe (EUR)"}),(0,r.jsx)(o.Z.Item,{href:"#/action-2",className:"py-1",children:"Rest of the World (USD)"})]})]})},s=e=>(0,r.jsxs)(u.Z,{className:"mt-4",children:[(0,r.jsx)("h1",{children:"Dropdown"}),(0,r.jsx)(a,{})]});var f=s},4819:function(e,n,t){"use strict";var r=t(7294);let u=r.createContext(null);u.displayName="NavbarContext",n.Z=u},6611:function(e,n,t){"use strict";t.d(n,{Z:function(){return f}});var r=t(4184),u=t.n(r),i=/-(.)/g,o=t(7294),c=t(6792),a=t(5893);let s=e=>e[0].toUpperCase()+e.replace(i,function(e,n){return n.toUpperCase()}).slice(1);function f(e,{displayName:n=s(e),Component:t,defaultProps:r}={}){let i=o.forwardRef(({className:n,bsPrefix:r,as:i=t||"div",...o},s)=>{let f=(0,c.vE)(r,e);return(0,a.jsx)(i,{ref:s,className:u()(n,f),...o})});return i.defaultProps=r,i.displayName=n,i}},3366:function(e,n,t){"use strict";function r(e,n){if(null==e)return{};var t,r,u={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(u[t]=e[t]);return u}t.d(n,{Z:function(){return r}})},6769:function(e,n,t){"use strict";t.d(n,{HK:function(){return o},gP:function(){return f}});var r=t(7294);let u={prefix:String(Math.round(1e10*Math.random())),current:0},i=r.createContext(u);function o(e){let n=(0,r.useContext)(i),t=s(n===u),o=(0,r.useMemo)(()=>({prefix:n===u?"":`${n.prefix}-${t}`,current:0}),[n,t]);return r.createElement(i.Provider,{value:o},e.children)}let c=Boolean("undefined"!=typeof window&&window.document&&window.document.createElement),a=new WeakMap;function s(e=!1){let n=(0,r.useContext)(i),t=(0,r.useRef)(null);if(null===t.current&&!e){var u,o;let c=null===(u=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)||void 0===u?void 0:null===(o=u.ReactCurrentOwner)||void 0===o?void 0:o.current;if(c){let s=a.get(c);null==s?a.set(c,{id:n.current,state:c.memoizedState}):c.memoizedState!==s.state&&(n.current=s.id,a.delete(c))}t.current=++n.current}return t.current}function f(e){let n=(0,r.useContext)(i);n!==u||c||console.warn("When server rendering, you must wrap your application in an <SSRProvider> to ensure consistent ids are generated between the client and server.");let t=s(!!e);return e||`react-aria${n.prefix}-${t}`}}},function(e){e.O(0,[3686,6752,9774,2888,179],function(){return e(e.s=2365)}),_N_E=e.O()}]);