"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7734],{5111:function(e,n,t){t.d(n,{Z:function(){return l}});var r=t(7294),u=t(8146);function l(e,n,t,l){void 0===l&&(l=!1);var a=(0,u.Z)(t);(0,r.useEffect)(function(){var t="function"==typeof e?e():e;return t.addEventListener(n,a,l),function(){return t.removeEventListener(n,a,l)}},[e])}},4044:function(e,n,t){t.d(n,{Z:function(){return a}});var r=t(7294),u=t(6454),l=t(6852);function a(){var e=(0,u.Z)(),n=(0,r.useRef)();return(0,l.Z)(function(){return clearTimeout(n.current)}),(0,r.useMemo)(function(){var t=function(){return clearTimeout(n.current)};return{set:function(r,u){void 0===u&&(u=0),e()&&(t(),u<=2147483647?n.current=setTimeout(r,u):function e(n,t,r){var u=r-Date.now();n.current=u<=2147483647?setTimeout(t,u):setTimeout(function(){return e(n,t,r)},2147483647)}(n,r,Date.now()+u))},clear:t}},[])}},3551:function(e,n,t){t.d(n,{Z:function(){return s}});var r=t(7294);t(2092),t(2029);var u=t(8146);t(5111),t(6454),t(8833),t(9585),new WeakMap;var l=t(861),a=t(5893);let i=["onKeyDown"],o=r.forwardRef((e,n)=>{var t;let{onKeyDown:r}=e,o=function(e,n){if(null==e)return{};var t,r,u={},l=Object.keys(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||(u[t]=e[t]);return u}(e,i),[s]=(0,l.FT)(Object.assign({tagName:"a"},o)),c=(0,u.Z)(e=>{s.onKeyDown(e),null==r||r(e)});return(t=o.href)&&"#"!==t.trim()&&"button"!==o.role?(0,a.jsx)("a",Object.assign({ref:n},o,{onKeyDown:r})):(0,a.jsx)("a",Object.assign({ref:n},o,s,{onKeyDown:c}))});o.displayName="Anchor";var s=o},861:function(e,n,t){t.d(n,{FT:function(){return a}});var r=t(7294),u=t(5893);let l=["as","disabled"];function a({tagName:e,disabled:n,href:t,target:r,rel:u,role:l,onClick:a,tabIndex:i=0,type:o}){e||(e=null!=t||null!=r||null!=u?"a":"button");let s={tagName:e};if("button"===e)return[{type:o||"button",disabled:n},s];let c=r=>{var u;if(!n&&("a"!==e||(u=t)&&"#"!==u.trim())||r.preventDefault(),n){r.stopPropagation();return}null==a||a(r)},d=e=>{" "===e.key&&(e.preventDefault(),c(e))};return"a"===e&&(t||(t="#"),n&&(t=void 0)),[{role:null!=l?l:"button",disabled:void 0,tabIndex:n?void 0:i,href:t,target:"a"===e?r:void 0,"aria-disabled":n||void 0,rel:"a"===e?u:void 0,onClick:c,onKeyDown:d},s]}let i=r.forwardRef((e,n)=>{let{as:t,disabled:r}=e,i=function(e,n){if(null==e)return{};var t,r,u={},l=Object.keys(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||(u[t]=e[t]);return u}(e,l),[o,{tagName:s}]=a(Object.assign({tagName:t,disabled:r},i));return(0,u.jsx)(s,Object.assign({},i,o,{ref:n}))});i.displayName="Button",n.ZP=i},7734:function(e,n,t){t.d(n,{Z:function(){return g}});var r=t(8146),u=t(7294),l=function(e,n){var t=(0,u.useRef)(!0);(0,u.useEffect)(function(){if(t.current){t.current=!1;return}return e()},n)},a=t(2029),i=t(4044),o=t(3551),s=t(4184),c=t.n(s),d=t(5446),f=(0,t(6611).Z)("carousel-caption"),v=t(1322),m=t(3439),h=t(6792),p=t(3825),b=t(4509),x=t(9337),y=t(5893);let N=u.forwardRef(({defaultActiveIndex:e=0,...n},t)=>{let s;let{as:f="div",bsPrefix:v,slide:N=!0,fade:g=!1,controls:C=!0,indicators:j=!0,indicatorLabels:E=[],activeIndex:k,onSelect:Z,onSlide:w,onSlid:D,interval:O=5e3,keyboard:R=!0,onKeyDown:$,pause:S="hover",onMouseOver:I,onMouseOut:T,wrap:M=!0,touch:K=!0,onTouchStart:A,onTouchMove:L,onTouchEnd:_,prevIcon:F=(0,y.jsx)("span",{"aria-hidden":"true",className:"carousel-control-prev-icon"}),prevLabel:P="Previous",nextIcon:U=(0,y.jsx)("span",{"aria-hidden":"true",className:"carousel-control-next-icon"}),nextLabel:V="Next",variant:X,className:W,children:B,...H}=(0,d.Ch)({defaultActiveIndex:e,...n},{activeIndex:"onSelect"}),q=(0,h.vE)(v,"carousel"),z=(0,h.SC)(),G=(0,u.useRef)(null),[J,Q]=(0,u.useState)("next"),[Y,ee]=(0,u.useState)(!1),[en,et]=(0,u.useState)(!1),[er,eu]=(0,u.useState)(k||0);(0,u.useEffect)(()=>{en||k===er||(G.current?Q(G.current):Q((k||0)>er?"next":"prev"),N&&et(!0),eu(k||0))},[k,en,er,N]),(0,u.useEffect)(()=>{G.current&&(G.current=null)});let el=0;(0,m.Ed)(B,(e,n)=>{++el,n===k&&(s=e.props.interval)});let ea=(0,a.Z)(s),ei=(0,u.useCallback)(e=>{if(en)return;let n=er-1;if(n<0){if(!M)return;n=el-1}G.current="prev",null==Z||Z(n,e)},[en,er,Z,M,el]),eo=(0,r.Z)(e=>{if(en)return;let n=er+1;if(n>=el){if(!M)return;n=0}G.current="next",null==Z||Z(n,e)}),es=(0,u.useRef)();(0,u.useImperativeHandle)(t,()=>({element:es.current,prev:ei,next:eo}));let ec=(0,r.Z)(()=>{!document.hidden&&function(e){if(!e||!e.style||!e.parentNode||!e.parentNode.style)return!1;let n=getComputedStyle(e);return"none"!==n.display&&"hidden"!==n.visibility&&"none"!==getComputedStyle(e.parentNode).display}(es.current)&&(z?ei():eo())}),ed="next"===J?"start":"end";l(()=>{N||(null==w||w(er,ed),null==D||D(er,ed))},[er]);let ef=`${q}-item-${J}`,ev=`${q}-item-${ed}`,em=(0,u.useCallback)(e=>{(0,b.Z)(e),null==w||w(er,ed)},[w,er,ed]),eh=(0,u.useCallback)(()=>{et(!1),null==D||D(er,ed)},[D,er,ed]),ep=(0,u.useCallback)(e=>{if(R&&!/input|textarea/i.test(e.target.tagName))switch(e.key){case"ArrowLeft":e.preventDefault(),z?eo(e):ei(e);return;case"ArrowRight":e.preventDefault(),z?ei(e):eo(e);return}null==$||$(e)},[R,$,ei,eo,z]),eb=(0,u.useCallback)(e=>{"hover"===S&&ee(!0),null==I||I(e)},[S,I]),ex=(0,u.useCallback)(e=>{ee(!1),null==T||T(e)},[T]),ey=(0,u.useRef)(0),eN=(0,u.useRef)(0),eg=(0,i.Z)(),eC=(0,u.useCallback)(e=>{ey.current=e.touches[0].clientX,eN.current=0,"hover"===S&&ee(!0),null==A||A(e)},[S,A]),ej=(0,u.useCallback)(e=>{e.touches&&e.touches.length>1?eN.current=0:eN.current=e.touches[0].clientX-ey.current,null==L||L(e)},[L]),eE=(0,u.useCallback)(e=>{if(K){let n=eN.current;Math.abs(n)>40&&(n>0?ei(e):eo(e))}"hover"===S&&eg.set(()=>{ee(!1)},O||void 0),null==_||_(e)},[K,S,ei,eo,eg,O,_]),ek=null!=O&&!Y&&!en,eZ=(0,u.useRef)();(0,u.useEffect)(()=>{var e,n;if(ek)return eZ.current=window.setInterval(document.visibilityState?ec:z?ei:eo,null!=(e=null!=(n=ea.current)?n:O)?e:void 0),()=>{null!==eZ.current&&clearInterval(eZ.current)}},[ek,ei,eo,ea,O,ec,z]);let ew=(0,u.useMemo)(()=>j&&Array.from({length:el},(e,n)=>e=>{null==Z||Z(n,e)}),[j,el,Z]);return(0,y.jsxs)(f,{ref:es,...H,onKeyDown:ep,onMouseOver:eb,onMouseOut:ex,onTouchStart:eC,onTouchMove:ej,onTouchEnd:eE,className:c()(W,q,N&&"slide",g&&`${q}-fade`,X&&`${q}-${X}`),children:[j&&(0,y.jsx)("div",{className:`${q}-indicators`,children:(0,m.UI)(B,(e,n)=>(0,y.jsx)("button",{type:"button","data-bs-target":"","aria-label":null!=E&&E.length?E[n]:`Slide ${n+1}`,className:n===er?"active":void 0,onClick:ew?ew[n]:void 0,"aria-current":n===er},n))}),(0,y.jsx)("div",{className:`${q}-inner`,children:(0,m.UI)(B,(e,n)=>{let t=n===er;return N?(0,y.jsx)(x.Z,{in:t,onEnter:t?em:void 0,onEntered:t?eh:void 0,addEndListener:p.Z,children:(n,r)=>u.cloneElement(e,{...r,className:c()(e.props.className,t&&"entered"!==n&&ef,("entered"===n||"exiting"===n)&&"active",("entering"===n||"exiting"===n)&&ev)})}):u.cloneElement(e,{className:c()(e.props.className,t&&"active")})})}),C&&(0,y.jsxs)(y.Fragment,{children:[(M||0!==k)&&(0,y.jsxs)(o.Z,{className:`${q}-control-prev`,onClick:ei,children:[F,P&&(0,y.jsx)("span",{className:"visually-hidden",children:P})]}),(M||k!==el-1)&&(0,y.jsxs)(o.Z,{className:`${q}-control-next`,onClick:eo,children:[U,V&&(0,y.jsx)("span",{className:"visually-hidden",children:V})]})]})]})});N.displayName="Carousel";var g=Object.assign(N,{Caption:f,Item:v.Z})},1322:function(e,n,t){var r=t(4184),u=t.n(r),l=t(7294),a=t(6792),i=t(5893);let o=l.forwardRef(({as:e="div",bsPrefix:n,className:t,...r},l)=>{let o=u()(t,(0,a.vE)(n,"carousel-item"));return(0,i.jsx)(e,{ref:l,...r,className:o})});o.displayName="CarouselItem",n.Z=o},3439:function(e,n,t){t.d(n,{Ed:function(){return l},UI:function(){return u},XW:function(){return a}});var r=t(7294);function u(e,n){let t=0;return r.Children.map(e,e=>r.isValidElement(e)?n(e,t++):e)}function l(e,n){let t=0;r.Children.forEach(e,e=>{r.isValidElement(e)&&n(e,t++)})}function a(e,n){return r.Children.toArray(e).some(e=>r.isValidElement(e)&&e.type===n)}}}]);