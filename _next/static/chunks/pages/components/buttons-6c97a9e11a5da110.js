(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[156],{861:function(t,n,e){"use strict";e.d(n,{FT:function(){return a}});var r=e(7294),i=e(5893);let s=["as","disabled"];function a({tagName:t,disabled:n,href:e,target:r,rel:i,role:s,onClick:a,tabIndex:l=0,type:o}){t||(t=null!=e||null!=r||null!=i?"a":"button");let u={tagName:t};if("button"===t)return[{type:o||"button",disabled:n},u];let c=r=>{var i;if(!n&&("a"!==t||(i=e)&&"#"!==i.trim())||r.preventDefault(),n){r.stopPropagation();return}null==a||a(r)},d=t=>{" "===t.key&&(t.preventDefault(),c(t))};return"a"===t&&(e||(e="#"),n&&(e=void 0)),[{role:null!=s?s:"button",disabled:void 0,tabIndex:n?void 0:l,href:e,target:"a"===t?r:void 0,"aria-disabled":n||void 0,rel:"a"===t?i:void 0,onClick:c,onKeyDown:d},u]}let l=r.forwardRef((t,n)=>{let{as:e,disabled:r}=t,l=function(t,n){if(null==t)return{};var e,r,i={},s=Object.keys(t);for(r=0;r<s.length;r++)e=s[r],n.indexOf(e)>=0||(i[e]=t[e]);return i}(t,s),[o,{tagName:u}]=a(Object.assign({tagName:e,disabled:r},l));return(0,i.jsx)(u,Object.assign({},l,o,{ref:n}))});l.displayName="Button",n.ZP=l},6383:function(t,n,e){"use strict";var r,i=e(7294);function s(){return(s=Object.assign?Object.assign.bind():function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])}return t}).apply(this,arguments)}n.Z=function(t){return i.createElement("svg",s({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 22.6 22.6"},t),r||(r=i.createElement("path",{d:"m1.9 5.4 9.4 9.4 9.4-9.4 1.9 1.9-11.3 11.3L0 7.3l1.9-1.9z"})))}},3646:function(t,n,e){"use strict";var r,i=e(7294);function s(){return(s=Object.assign?Object.assign.bind():function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])}return t}).apply(this,arguments)}n.Z=function(t){return i.createElement("svg",s({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"},t),r||(r=i.createElement("path",{d:"M8.671.025a8.671 8.671 0 1 0 0 17.343 8.571 8.571 0 0 0 4.113-1.016 2.478 2.478 0 0 0 .322.322l2.478 2.478a2.527 2.527 0 1 0 3.568-3.568l-2.478-2.478a2.478 2.478 0 0 0-.4-.322 8.555 8.555 0 0 0 1.09-4.113A8.681 8.681 0 0 0 8.7 0zm0 2.478a6.165 6.165 0 0 1 6.194 6.194 6.213 6.213 0 0 1-1.635 4.261l-.074.074a2.478 2.478 0 0 0-.322.322 6.2 6.2 0 0 1-4.187 1.561 6.194 6.194 0 1 1 0-12.388z"})))}},4184:function(t,n){var e;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/!function(){"use strict";var r={}.hasOwnProperty;function i(){for(var t=[],n=0;n<arguments.length;n++){var e=arguments[n];if(e){var s=typeof e;if("string"===s||"number"===s)t.push(e);else if(Array.isArray(e)){if(e.length){var a=i.apply(null,e);a&&t.push(a)}}else if("object"===s){if(e.toString!==Object.prototype.toString&&!e.toString.toString().includes("[native code]")){t.push(e.toString());continue}for(var l in e)r.call(e,l)&&e[l]&&t.push(l)}}}return t.join(" ")}t.exports?(i.default=i,t.exports=i):void 0!==(e=(function(){return i}).apply(n,[]))&&(t.exports=e)}()},922:function(t,n,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/buttons",function(){return e(9243)}])},9243:function(t,n,e){"use strict";e.r(n),e.d(n,{default:function(){return l}});var r=e(5893),i=e(5005),s=e(3646),a=e(6383);function l(){return(0,r.jsxs)("div",{className:"container my-4",children:[(0,r.jsx)("h1",{children:"Buttons"}),(0,r.jsx)(i.Z,{className:"mb-2",children:"Button"}),(0,r.jsx)("br",{}),(0,r.jsx)(i.Z,{className:"mb-2",variant:"outline-primary",children:"Button"}),(0,r.jsx)("br",{}),(0,r.jsx)(i.Z,{className:"mb-2",children:"Button a tag"}),(0,r.jsx)("br",{}),(0,r.jsxs)(i.Z,{className:"mb-2",children:["Button With icon ",(0,r.jsx)(s.Z,{className:"svg font-size-xs",fill:"white"})]}),(0,r.jsx)("br",{}),(0,r.jsxs)(i.Z,{className:"mb-2",children:["Shop ",(0,r.jsx)(a.Z,{className:"svg font-size-xs",fill:"white"})]}),(0,r.jsx)("br",{}),(0,r.jsx)(i.Z,{className:"mb-2",size:"lg",children:"Button Large"}),(0,r.jsx)("br",{}),(0,r.jsx)(i.Z,{className:"mb-2",size:"lg",children:(0,r.jsx)("span",{className:"spinner-border spinner-border-sm"})}),(0,r.jsx)("br",{}),(0,r.jsx)(i.Z,{className:"mb-2",variant:"outline-primary",size:"lg",children:"Button Large"}),(0,r.jsx)("br",{}),(0,r.jsx)("div",{className:"d-grid gap-2",children:(0,r.jsx)(i.Z,{variant:"primary",children:"Button"})}),(0,r.jsx)("br",{}),(0,r.jsx)("div",{className:"d-grid gap-2",children:(0,r.jsx)(i.Z,{variant:"outline-primary",children:"Button"})}),(0,r.jsx)("br",{}),(0,r.jsx)("div",{className:"d-grid gap-2",children:(0,r.jsx)(i.Z,{variant:"primary",size:"lg",children:"Button"})}),(0,r.jsx)("br",{}),(0,r.jsx)("div",{className:"d-grid gap-2",children:(0,r.jsx)(i.Z,{variant:"outline-primary",size:"lg",children:"Button"})})]})}},5005:function(t,n,e){"use strict";var r=e(4184),i=e.n(r),s=e(7294),a=e(861),l=e(6792),o=e(5893);let u=s.forwardRef(({as:t,bsPrefix:n,variant:e,size:r,active:s,className:u,...c},d)=>{let f=(0,l.vE)(n,"btn"),[p,{tagName:x}]=(0,a.FT)({tagName:t,...c});return(0,o.jsx)(x,{...p,...c,ref:d,className:i()(u,f,s&&"active",e&&`${f}-${e}`,r&&`${f}-${r}`,c.href&&c.disabled&&"disabled")})});u.displayName="Button",u.defaultProps={variant:"primary",active:!1,disabled:!1},n.Z=u},6792:function(t,n,e){"use strict";e.d(n,{Hz:function(){return s},SC:function(){return p},cs:function(){return a},pi:function(){return d},vE:function(){return c},zG:function(){return f}});var r=e(7294),i=e(5893);let s=["xxl","xl","lg","md","sm","xs"],a="xs",l=r.createContext({prefixes:{},breakpoints:s,minBreakpoint:a}),{Consumer:o,Provider:u}=l;function c(t,n){let{prefixes:e}=(0,r.useContext)(l);return t||e[n]||n}function d(){let{breakpoints:t}=(0,r.useContext)(l);return t}function f(){let{minBreakpoint:t}=(0,r.useContext)(l);return t}function p(){let{dir:t}=(0,r.useContext)(l);return"rtl"===t}n.ZP=function({prefixes:t={},breakpoints:n=s,minBreakpoint:e=a,dir:l,children:o}){let c=(0,r.useMemo)(()=>({prefixes:{...t},breakpoints:n,minBreakpoint:e,dir:l}),[t,n,e,l]);return(0,i.jsx)(u,{value:c,children:o})}}},function(t){t.O(0,[774,888,179],function(){return t(t.s=922)}),_N_E=t.O()}]);