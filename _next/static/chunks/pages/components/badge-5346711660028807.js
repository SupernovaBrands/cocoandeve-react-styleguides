(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[899],{4184:function(e,t){var n;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/!function(){"use strict";var r={}.hasOwnProperty;function s(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var l=typeof n;if("string"===l||"number"===l)e.push(n);else if(Array.isArray(n)){if(n.length){var i=s.apply(null,n);i&&e.push(i)}}else if("object"===l){if(n.toString!==Object.prototype.toString&&!n.toString.toString().includes("[native code]")){e.push(n.toString());continue}for(var a in n)r.call(n,a)&&n[a]&&e.push(a)}}}return e.join(" ")}e.exports?(s.default=s,e.exports=s):void 0!==(n=(function(){return s}).apply(t,[]))&&(e.exports=n)}()},4036:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/badge",function(){return n(2176)}])},2176:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return c}});var r=n(5893),s=n(1785),l=n(682),i=n(4051),a=n(1555),u=n(7977);function c(){return(0,r.jsx)("div",{className:"mobile-wrapper",children:(0,r.jsxs)(l.Z,{className:"mt-4",children:[(0,r.jsx)("h1",{children:"Badges"}),(0,r.jsxs)("div",{className:"d-flex flex-column align-items-start",children:[(0,r.jsx)(u.Z,{bg:"sh-purple",className:"mb-1 mt-1",children:"Tan"}),(0,r.jsx)(u.Z,{bg:"secondary",className:"mb-1 mt-1",children:"Hair"}),(0,r.jsx)(u.Z,{bg:"bali-bod-blue",className:"mb-1 mt-1",children:"Body"})]}),(0,r.jsx)("p",{className:"my-4",children:"Circle Badge with svg"}),(0,r.jsx)(i.Z,{children:(0,r.jsx)(a.Z,{xs:9,lg:3,className:"pt-4 position-relative",children:(0,r.jsx)(s.Z,{children:(0,r.jsx)("img",{alt:"25% Off",className:"w-100",src:"../badge-25.svg"})})})})]})})}},1785:function(e,t,n){"use strict";var r=n(5893);let s=e=>(0,r.jsx)("picture",{className:"circle-badge position-absolute rounded-circle bg-primary d-flex p-1 ".concat(e.className),children:e.children});t.Z=s},7977:function(e,t,n){"use strict";var r=n(4184),s=n.n(r),l=n(7294),i=n(6792),a=n(5893);let u=l.forwardRef(({bsPrefix:e,bg:t,pill:n,text:r,className:l,as:u="span",...c},o)=>{let f=(0,i.vE)(e,"badge");return(0,a.jsx)(u,{ref:o,...c,className:s()(l,f,n&&"rounded-pill",r&&`text-${r}`,t&&`bg-${t}`)})});u.displayName="Badge",u.defaultProps={bg:"primary",pill:!1},t.Z=u},1555:function(e,t,n){"use strict";n.d(t,{r:function(){return u}});var r=n(4184),s=n.n(r),l=n(7294),i=n(6792),a=n(5893);function u({as:e,bsPrefix:t,className:n,...r}){t=(0,i.vE)(t,"col");let l=(0,i.pi)(),a=(0,i.zG)(),u=[],c=[];return l.forEach(e=>{let n,s,l;let i=r[e];delete r[e],"object"==typeof i&&null!=i?{span:n,offset:s,order:l}=i:n=i;let o=e!==a?`-${e}`:"";n&&u.push(!0===n?`${t}${o}`:`${t}${o}-${n}`),null!=l&&c.push(`order${o}-${l}`),null!=s&&c.push(`offset${o}-${s}`)}),[{...r,className:s()(n,...u,...c)},{as:e,bsPrefix:t,spans:u}]}let c=l.forwardRef((e,t)=>{let[{className:n,...r},{as:l="div",bsPrefix:i,spans:c}]=u(e);return(0,a.jsx)(l,{...r,ref:t,className:s()(n,!c.length&&i)})});c.displayName="Col",t.Z=c},682:function(e,t,n){"use strict";var r=n(4184),s=n.n(r),l=n(7294),i=n(6792),a=n(5893);let u=l.forwardRef(({bsPrefix:e,fluid:t,as:n="div",className:r,...l},u)=>{let c=(0,i.vE)(e,"container"),o="string"==typeof t?`-${t}`:"-fluid";return(0,a.jsx)(n,{ref:u,...l,className:s()(r,t?`${c}${o}`:c)})});u.displayName="Container",u.defaultProps={fluid:!1},t.Z=u},4051:function(e,t,n){"use strict";var r=n(4184),s=n.n(r),l=n(7294),i=n(6792),a=n(5893);let u=l.forwardRef(({bsPrefix:e,className:t,as:n="div",...r},l)=>{let u=(0,i.vE)(e,"row"),c=(0,i.pi)(),o=(0,i.zG)(),f=`${u}-cols`,d=[];return c.forEach(e=>{let t;let n=r[e];delete r[e],null!=n&&"object"==typeof n?{cols:t}=n:t=n;let s=e!==o?`-${e}`:"";null!=t&&d.push(`${f}${s}-${t}`)}),(0,a.jsx)(n,{ref:l,...r,className:s()(t,u,...d)})});u.displayName="Row",t.Z=u},6792:function(e,t,n){"use strict";n.d(t,{Hz:function(){return l},SC:function(){return p},cs:function(){return i},pi:function(){return f},vE:function(){return o},zG:function(){return d}});var r=n(7294),s=n(5893);let l=["xxl","xl","lg","md","sm","xs"],i="xs",a=r.createContext({prefixes:{},breakpoints:l,minBreakpoint:i}),{Consumer:u,Provider:c}=a;function o(e,t){let{prefixes:n}=(0,r.useContext)(a);return e||n[t]||t}function f(){let{breakpoints:e}=(0,r.useContext)(a);return e}function d(){let{minBreakpoint:e}=(0,r.useContext)(a);return e}function p(){let{dir:e}=(0,r.useContext)(a);return"rtl"===e}t.ZP=function({prefixes:e={},breakpoints:t=l,minBreakpoint:n=i,dir:a,children:u}){let o=(0,r.useMemo)(()=>({prefixes:{...e},breakpoints:t,minBreakpoint:n,dir:a}),[e,t,n,a]);return(0,s.jsx)(c,{value:o,children:u})}}},function(e){e.O(0,[774,888,179],function(){return e(e.s=4036)}),_N_E=e.O()}]);