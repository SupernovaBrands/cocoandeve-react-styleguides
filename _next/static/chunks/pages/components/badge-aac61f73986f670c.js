(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[899],{4184:function(e,t){var n;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/!function(){"use strict";var r={}.hasOwnProperty;function s(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var l=typeof n;if("string"===l||"number"===l)e.push(n);else if(Array.isArray(n)){if(n.length){var i=s.apply(null,n);i&&e.push(i)}}else if("object"===l){if(n.toString!==Object.prototype.toString&&!n.toString.toString().includes("[native code]")){e.push(n.toString());continue}for(var a in n)r.call(n,a)&&n[a]&&e.push(a)}}}return e.join(" ")}e.exports?(s.default=s,e.exports=s):void 0!==(n=(function(){return s}).apply(t,[]))&&(e.exports=n)}()},4036:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/badge",function(){return n(1949)}])},1949:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return p}});var r=n(5893),s=n(1785),l=n(682),i=n(4051),a=n(1555),o=n(4184),u=n.n(o),c=n(7294),f=n(6792);let d=c.forwardRef(({bsPrefix:e,bg:t,pill:n,text:s,className:l,as:i="span",...a},o)=>{let c=(0,f.vE)(e,"badge");return(0,r.jsx)(i,{ref:o,...a,className:u()(l,c,n&&"rounded-pill",s&&`text-${s}`,t&&`bg-${t}`)})});function p(){return(0,r.jsxs)(l.Z,{className:"mt-4",children:[(0,r.jsx)("h1",{children:"Badges"}),(0,r.jsxs)("div",{className:"d-flex flex-column align-items-start",children:[(0,r.jsx)(d,{bg:"sh-purple",className:"mb-1 mt-1",children:"Tan"}),(0,r.jsx)(d,{bg:"secondary",className:"mb-1 mt-1",children:"Hair"}),(0,r.jsx)(d,{bg:"bali-bod-blue",className:"mb-1 mt-1",children:"Body"})]}),(0,r.jsx)("p",{className:"my-4",children:"Circle Badge with svg"}),(0,r.jsx)(i.Z,{children:(0,r.jsx)(a.Z,{xs:9,lg:3,className:"pt-4 position-relative",children:(0,r.jsx)(s.Z,{children:(0,r.jsx)("img",{alt:"25% Off",className:"w-100",src:"../badge-25.svg"})})})})]})}d.displayName="Badge",d.defaultProps={bg:"primary",pill:!1}},1785:function(e,t,n){"use strict";var r=n(5893);let s=e=>(0,r.jsx)("picture",{className:"circle-badge position-absolute rounded-circle bg-primary d-flex p-1 ".concat(e.className),children:e.children});t.Z=s},1555:function(e,t,n){"use strict";var r=n(4184),s=n.n(r),l=n(7294),i=n(6792),a=n(5893);let o=l.forwardRef((e,t)=>{let[{className:n,...r},{as:l="div",bsPrefix:o,spans:u}]=function({as:e,bsPrefix:t,className:n,...r}){t=(0,i.vE)(t,"col");let l=(0,i.pi)(),a=(0,i.zG)(),o=[],u=[];return l.forEach(e=>{let n,s,l;let i=r[e];delete r[e],"object"==typeof i&&null!=i?{span:n,offset:s,order:l}=i:n=i;let c=e!==a?`-${e}`:"";n&&o.push(!0===n?`${t}${c}`:`${t}${c}-${n}`),null!=l&&u.push(`order${c}-${l}`),null!=s&&u.push(`offset${c}-${s}`)}),[{...r,className:s()(n,...o,...u)},{as:e,bsPrefix:t,spans:o}]}(e);return(0,a.jsx)(l,{...r,ref:t,className:s()(n,!u.length&&o)})});o.displayName="Col",t.Z=o},682:function(e,t,n){"use strict";var r=n(4184),s=n.n(r),l=n(7294),i=n(6792),a=n(5893);let o=l.forwardRef(({bsPrefix:e,fluid:t,as:n="div",className:r,...l},o)=>{let u=(0,i.vE)(e,"container"),c="string"==typeof t?`-${t}`:"-fluid";return(0,a.jsx)(n,{ref:o,...l,className:s()(r,t?`${u}${c}`:u)})});o.displayName="Container",o.defaultProps={fluid:!1},t.Z=o},4051:function(e,t,n){"use strict";var r=n(4184),s=n.n(r),l=n(7294),i=n(6792),a=n(5893);let o=l.forwardRef(({bsPrefix:e,className:t,as:n="div",...r},l)=>{let o=(0,i.vE)(e,"row"),u=(0,i.pi)(),c=(0,i.zG)(),f=`${o}-cols`,d=[];return u.forEach(e=>{let t;let n=r[e];delete r[e],null!=n&&"object"==typeof n?{cols:t}=n:t=n;let s=e!==c?`-${e}`:"";null!=t&&d.push(`${f}${s}-${t}`)}),(0,a.jsx)(n,{ref:l,...r,className:s()(t,o,...d)})});o.displayName="Row",t.Z=o},6792:function(e,t,n){"use strict";n.d(t,{SC:function(){return c},pi:function(){return o},vE:function(){return a},zG:function(){return u}});var r=n(7294);n(5893);let s=r.createContext({prefixes:{},breakpoints:["xxl","xl","lg","md","sm","xs"],minBreakpoint:"xs"}),{Consumer:l,Provider:i}=s;function a(e,t){let{prefixes:n}=(0,r.useContext)(s);return e||n[t]||t}function o(){let{breakpoints:e}=(0,r.useContext)(s);return e}function u(){let{minBreakpoint:e}=(0,r.useContext)(s);return e}function c(){let{dir:e}=(0,r.useContext)(s);return"rtl"===e}}},function(e){e.O(0,[774,888,179],function(){return e(e.s=4036)}),_N_E=e.O()}]);