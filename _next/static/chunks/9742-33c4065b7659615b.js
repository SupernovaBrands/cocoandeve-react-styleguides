"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9742],{354:function(e,t,a){var s,n=a(7294);function r(){return(r=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var s in a)Object.prototype.hasOwnProperty.call(a,s)&&(e[s]=a[s])}return e}).apply(this,arguments)}t.Z=function(e){return n.createElement("svg",r({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 114 20"},e),s||(s=n.createElement("path",{d:"M10.5 15.143 3.012 20.3l3.237-7.844L0 7.577l7.255-.054L10.5.3l3.245 7.222L21 7.577l-6.249 4.88 3.237 7.844zm46.316-.301L49.328 20l3.237-7.844-6.25-4.88 7.256-.054L56.816 0l3.245 7.222 7.255.054-6.25 4.88L64.305 20zm23.007.451-7.488 5.158 3.237-7.844-6.249-4.88 7.255-.054L79.823.451l3.245 7.222 7.255.054-6.249 4.88 3.237 7.844zm23.76-.301-7.488 5.158 3.237-7.844-6.25-4.88 7.256-.054L103.583.15l3.245 7.222 7.255.054-6.25 4.88 3.238 7.844zm-69.323-.15L26.77 20l3.237-7.844-6.249-4.88 7.255-.054L34.26 0l3.245 7.222 7.255.054-6.249 4.88L41.747 20z"})))}},916:function(e,t,a){var s,n=a(7294);function r(){return(r=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var s in a)Object.prototype.hasOwnProperty.call(a,s)&&(e[s]=a[s])}return e}).apply(this,arguments)}t.Z=function(e){return n.createElement("svg",r({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 54 54"},e),s||(s=n.createElement("path",{d:"M27 0a27 27 0 1 0 27 27A27 27 0 0 0 27 0zm11.371 27.86a1.929 1.929 0 0 1-.866.866v.01L22.076 36.45a1.929 1.929 0 0 1-2.791-1.736V19.286a1.929 1.929 0 0 1 2.791-1.726L37.5 25.274a1.928 1.928 0 0 1 .871 2.586z"})))}},627:function(e,t,a){a.d(t,{Z:function(){return x}});var s=a(5893),n=a(8499),r=a(2748),c=a(7294),i=a(6785),l=a(1947),o=a(1516),d=a(3294);a(354),a(1664);let u=e=>(0,s.jsxs)("div",{className:"".concat(e.useCarousel?"carousel-item col-9 col-lg-4":"col-lg-4","  ").concat(e.useCarousel&&e.activeIndex===e.item.index?"active ":""," ").concat(e.itemMovingNext?"carousel-item-next carousel-item-start ":""," ").concat(e.itemMovingPrev?"carousel-item-prev carousel-item-end ":""),children:[(0,s.jsxs)("picture",{children:[(0,s.jsx)("source",{srcSet:e.item.srcSet,media:"(min-width: 992px)"}),(0,s.jsx)("img",{className:"w-100",alt:"/",src:e.item.src})]}),(0,s.jsxs)("div",{className:"p-2 bg-white h-100",children:[(0,s.jsx)("p",{children:(0,s.jsx)("strong",{children:e.item.title})}),(0,s.jsxs)("p",{children:['"',e.item.comment,'"']})]})]}),m=e=>{let t=2*e.slideNumber,[a,m]=(0,c.useState)(1),[x,p]=(0,c.useState)(!1),[v,f]=(0,c.useState)(!1),h=[],g=0;e.items.map((e,t)=>{h.push({...e,id:g,index:g}),g++}),e.items.map((e,t)=>{h.push({...e,id:g,index:g}),g++});let[N,j]=(0,c.useState)(h),b=()=>{let t=e.slideNumber?e.slideNumber:3,s=N[0],n=a>=2*t-1?0:a+1;N.push(...[s]),N.shift(),p(!0),setTimeout(()=>{m(n),p(!1)},600)},C=()=>{f(!0),setTimeout(()=>{m(a<=0?t-1:a-1),f(!1);let e=N.pop();N.unshift(e)},600)};return(0,s.jsxs)("div",{className:"position-relative ".concat(e.useRow?"row":""," ").concat(e.resultCard?"carousel--real-result":""," ").concat(e.articleCard?"blog-carousel":""),children:[(0,s.jsx)("div",{id:"carouselLoopCentered".concat(e.id),className:"carousel--loop carousel--swipe carousel--centered ".concat(e.centered?"carousel--centered__custom":""," ").concat(e.centered?"":"carousel--centered__custom-nocenter-".concat(e.colLgGrid)," ").concat(e.useRow?"px-0":""," ").concat(e.productCard||e.resultCard||e.videoCard||e.articleCard?"":"pt-2"," ").concat(e.carouselClass?e.carouselClass:""),children:(0,s.jsxs)("div",{className:"carousel-inner d-flex flex-nowrap mx-0",children:[e.productCard&&e.slideNumber>0&&N.map((t,n)=>(0,s.jsx)(i.Z,{useCardTemplate:e.useCardTemplate,useCarousel:!0,className:e.className,activeIndex:a,product:t,itemMovingNext:x,itemMovingPrev:v},n)),e.resultCard&&e.slideNumber>0&&N.map((e,t)=>(0,s.jsx)(l.Z,{useCarousel:!0,item:e,activeIndex:a,itemMovingNext:x,itemMovingPrev:v},t)),e.videoCard&&e.slideNumber>0&&N.map((t,n)=>(0,s.jsx)(o.Z,{useCardTemplate:e.useCardTemplate,useCarousel:!0,className:e.className,activeIndex:a,item:t,itemMovingNext:x,itemMovingPrev:v},n)),e.articleCard&&e.slideNumber>0&&N.map((t,n)=>(0,s.jsx)(d.Z,{className:e.className,activeIndex:a,useCarousel:!0,item:t,colLg:6,itemMovingNext:x,itemMovingPrev:v},n)),e.packaging&&e.slideNumber>0&&N.map((e,t)=>(0,s.jsx)(u,{useCarousel:!0,item:e,activeIndex:a,itemMovingNext:x,itemMovingPrev:v},t))]})}),(0,s.jsxs)("button",{onClick:C,className:"carousel-control carousel-control-prev carousel-control--background ".concat(e.hideControls?"d-none":""," ").concat(e.roundedControl?"carousel-control--loop":"floating-out-start justify-content-start text-primary"," w-auto"),children:[(0,s.jsx)("span",{className:"carousel-control-prev-icon d-flex justify-content-center align-items-center","aria-hidden":"true",children:(0,s.jsx)(n.Z,{className:"svg svg--current-color"})}),(0,s.jsx)("span",{className:"visually-hidden",children:"Previous"})]}),(0,s.jsxs)("button",{onClick:b,className:"carousel-control carousel-control-next carousel-control--background ".concat(e.hideControls?"d-none":""," ").concat(e.roundedControl?"carousel-control--loop":"floating-out-end justify-content-end text-primary"," w-auto"),children:[(0,s.jsx)("span",{className:"carousel-control-next-icon d-flex justify-content-center align-items-center","aria-hidden":"true",children:(0,s.jsx)(r.Z,{className:"svg svg--current-color"})}),(0,s.jsx)("span",{className:"visually-hidden",children:"Next"})]})]})};var x=m},1516:function(e,t,a){var s=a(5893),n=a(916);let r=e=>e.useCardTemplate?(0,s.jsx)("div",{className:"".concat(e.className," carousel-item ").concat(e.activeIndex===e.item.index?"active ":""," ").concat(e.itemMovingNext?"carousel-item-next carousel-item-start ":""," ").concat(e.itemMovingPrev?"carousel-item-prev carousel-item-end ":""),children:(0,s.jsx)("img",{className:"img-fluid",src:"//via.placeholder.com/600x400?text=".concat(e.item.label),alt:"slide ".concat(e.item.index)})}):(0,s.jsxs)("figure",{className:"".concat(e.className," ").concat(e.useCarousel?"carousel-item":""," video-card text-center ").concat(e.useCarousel&&e.activeIndex===e.item.index?"active ":""," ").concat(e.itemMovingNext?"carousel-item-next carousel-item-start ":""," ").concat(e.itemMovingPrev?"carousel-item-prev carousel-item-end ":""),children:[(0,s.jsxs)("picture",{className:"d-block position-relative w-100",children:[(0,s.jsx)("source",{srcSet:e.item.srcSet,media:"(min-width: 992px)"}),(0,s.jsx)("img",{src:e.item.src,alt:"Placeholder",className:"d-block w-100"}),(0,s.jsx)(n.Z,{className:"svg"})]}),e.item.title&&(0,s.jsx)("figcaption",{className:"text-center mt-2",children:(0,s.jsx)("h2",{children:e.item.title})})]});t.Z=r},3294:function(e,t,a){var s=a(5893),n=a(1664),r=a.n(n);let c=e=>(0,s.jsx)("div",{className:"".concat(e.className," ").concat(e.useCarousel?"carousel-item":""," mb-4 mb-lg-3 ").concat(e.useCarousel&&e.activeIndex===e.item.index?"active ":""," ").concat(e.itemMovingNext?"carousel-item-next carousel-item-start ":""," ").concat(e.itemMovingPrev?"carousel-item-prev carousel-item-end ":""),as:"article",children:(0,s.jsxs)("figure",{className:"border border-secondary-light ".concat(e.useCarousel?"":"mb-2 no-gutters__in-container"),children:[(0,s.jsx)(r(),{href:"./templates/article","aria-label":e.item.title,children:(0,s.jsx)("img",{src:e.item.src,className:"w-100",alt:e.item.title})}),(0,s.jsxs)("figcaption",{className:"p-2",children:[e.item.tags.map(e=>(0,s.jsx)("span",{class:"badge badge--square badge-blog ".concat(e.class," fw-normal me-1"),children:e.label})),(0,s.jsx)("p",{className:"h2 mt-2",children:e.item.title}),e.item.desc&&(0,s.jsx)("p",{children:e.item.desc}),(0,s.jsx)(r(),{href:"#",className:"btn btn-outline-primary","aria-label":e.item.title,children:"read more"})]})]})});t.Z=c},7399:function(e,t,a){var s=a(5893);let n=e=>(0,s.jsx)("a",{className:"me-1 py-1 px-2 text-decoration-none ".concat(e.active?"active":""),children:e.title});t.Z=n},1947:function(e,t,a){var s=a(5893),n=a(354),r=a(7977),c=a(1664),i=a.n(c);let l=e=>(0,s.jsxs)("div",{className:"".concat(e.useCarousel?"carousel-item col-9 col-lg-3":"col-lg-4"," result-card  ").concat(e.useCarousel&&e.activeIndex===e.item.index?"active ":""," ").concat(e.itemMovingNext?"carousel-item-next carousel-item-start ":""," ").concat(e.itemMovingPrev?"carousel-item-prev carousel-item-end ":""),children:[(0,s.jsxs)("picture",{children:[(0,s.jsx)("source",{srcSet:e.item.srcSet,media:"(min-width: 992px)"}),(0,s.jsx)("img",{className:"w-100",alt:"/",src:e.item.src})]}),(0,s.jsxs)("div",{className:"p-2 bg-white h-100",children:[(0,s.jsxs)("p",{className:"d-flex justify-content-between align-items-center mb-0",children:[(0,s.jsx)(n.Z,{className:"svg text-primary h4 mb-0"}),(0,s.jsx)(r.Z,{bg:e.item.badgeColor,className:"mb-1 mt-1",children:e.item.badge})]}),(0,s.jsxs)("p",{children:[(0,s.jsx)("strong",{children:"Product:\xa0"}),(0,s.jsx)(i(),{href:"#",title:e.item.title,tabIndex:"0",className:"text-underline",children:e.item.title})]}),(0,s.jsxs)("p",{children:['"',e.item.comment,'"']}),(0,s.jsx)("p",{className:"text-underline fw-bold",children:e.item.author})]})]});t.Z=l},4e3:function(e,t,a){a.d(t,{Z:function(){return h}});var s=a(4184),n=a.n(s),r=a(7294),c=a(5446),i=a(6792),l=a(4945),o=a(4496),d=a(5893);let u=r.forwardRef(({as:e="div",bsPrefix:t,className:a,onEnter:s,onEntering:c,onEntered:u,onExit:m,onExiting:x,onExited:p,...v},f)=>{t=(0,i.vE)(t,"accordion-body");let{eventKey:h}=(0,r.useContext)(o.Z);return(0,d.jsx)(l.Z,{eventKey:h,onEnter:s,onEntering:c,onEntered:u,onExit:m,onExiting:x,onExited:p,children:(0,d.jsx)(e,{ref:f,...v,className:n()(a,t)})})});u.displayName="AccordionBody";var m=a(3621),x=a(8792);let p=r.forwardRef(({as:e="h2",bsPrefix:t,className:a,children:s,onClick:r,...c},l)=>(t=(0,i.vE)(t,"accordion-header"),(0,d.jsx)(e,{ref:l,...c,className:n()(a,t),children:(0,d.jsx)(m.Z,{onClick:r,children:s})})));p.displayName="AccordionHeader";let v=r.forwardRef(({as:e="div",bsPrefix:t,className:a,eventKey:s,...c},l)=>{t=(0,i.vE)(t,"accordion-item");let u=(0,r.useMemo)(()=>({eventKey:s}),[s]);return(0,d.jsx)(o.Z.Provider,{value:u,children:(0,d.jsx)(e,{ref:l,...c,className:n()(a,t)})})});v.displayName="AccordionItem";let f=r.forwardRef((e,t)=>{let{as:a="div",activeKey:s,bsPrefix:l,className:o,onSelect:u,flush:m,alwaysOpen:p,...v}=(0,c.Ch)(e,{activeKey:"onSelect"}),f=(0,i.vE)(l,"accordion"),h=(0,r.useMemo)(()=>({activeEventKey:s,onSelect:u,alwaysOpen:p}),[s,u,p]);return(0,d.jsx)(x.Z.Provider,{value:h,children:(0,d.jsx)(a,{ref:t,...v,className:n()(o,f,m&&`${f}-flush`)})})});f.displayName="Accordion";var h=Object.assign(f,{Button:m.Z,Collapse:l.Z,Item:v,Header:p,Body:u})},3621:function(e,t,a){a.d(t,{k:function(){return d}});var s=a(7294),n=a(4184),r=a.n(n),c=a(8792),i=a(4496),l=a(6792),o=a(5893);function d(e,t){let{activeEventKey:a,onSelect:n,alwaysOpen:r}=(0,s.useContext)(c.Z);return s=>{let c=e===a?null:e;r&&(c=Array.isArray(a)?a.includes(e)?a.filter(t=>t!==e):[...a,e]:[e]),null==n||n(c,s),null==t||t(s)}}let u=s.forwardRef(({as:e="button",bsPrefix:t,className:a,onClick:n,...u},m)=>{t=(0,l.vE)(t,"accordion-button");let{eventKey:x}=(0,s.useContext)(i.Z),p=d(x,n),{activeEventKey:v}=(0,s.useContext)(c.Z);return"button"===e&&(u.type="button"),(0,o.jsx)(e,{ref:m,onClick:p,...u,"aria-expanded":Array.isArray(v)?v.includes(x):x===v,className:r()(a,t,!(0,c.T)(v,x)&&"collapsed")})});u.displayName="AccordionButton",t.Z=u},4945:function(e,t,a){var s=a(4184),n=a.n(s),r=a(7294),c=a(6792),i=a(9966),l=a(8792),o=a(5893);let d=r.forwardRef(({as:e="div",bsPrefix:t,className:a,children:s,eventKey:d,...u},m)=>{let{activeEventKey:x}=(0,r.useContext)(l.Z);return t=(0,c.vE)(t,"accordion-collapse"),(0,o.jsx)(i.Z,{ref:m,in:(0,l.T)(x,d),...u,className:n()(a,t),children:(0,o.jsx)(e,{children:r.Children.only(s)})})});d.displayName="AccordionCollapse",t.Z=d},8792:function(e,t,a){a.d(t,{T:function(){return n}});var s=a(7294);function n(e,t){return Array.isArray(e)?e.includes(t):e===t}let r=s.createContext({});r.displayName="AccordionContext",t.Z=r},4496:function(e,t,a){var s=a(7294);let n=s.createContext({eventKey:""});n.displayName="AccordionItemContext",t.Z=n},7977:function(e,t,a){var s=a(4184),n=a.n(s),r=a(7294),c=a(6792),i=a(5893);let l=r.forwardRef(({bsPrefix:e,bg:t,pill:a,text:s,className:r,as:l="span",...o},d)=>{let u=(0,c.vE)(e,"badge");return(0,i.jsx)(l,{ref:d,...o,className:n()(r,u,a&&"rounded-pill",s&&`text-${s}`,t&&`bg-${t}`)})});l.displayName="Badge",l.defaultProps={bg:"primary",pill:!1},t.Z=l},9966:function(e,t,a){var s=a(4184),n=a.n(s),r=a(1505),c=a(7294),i=a(4527),l=a(3825),o=a(6833),d=a(4509),u=a(9337),m=a(5893);let x={height:["marginTop","marginBottom"],width:["marginLeft","marginRight"]};function p(e,t){let a=`offset${e[0].toUpperCase()}${e.slice(1)}`,s=t[a],n=x[e];return s+parseInt((0,r.Z)(t,n[0]),10)+parseInt((0,r.Z)(t,n[1]),10)}let v={[i.Wj]:"collapse",[i.Ix]:"collapsing",[i.d0]:"collapsing",[i.cn]:"collapse show"},f=c.forwardRef(({onEnter:e,onEntering:t,onEntered:a,onExit:s,onExiting:r,className:i,children:x,dimension:f="height",getDimensionValue:h=p,...g},N)=>{let j="function"==typeof f?f():f,b=(0,c.useMemo)(()=>(0,o.Z)(e=>{e.style[j]="0"},e),[j,e]),C=(0,c.useMemo)(()=>(0,o.Z)(e=>{let t=`scroll${j[0].toUpperCase()}${j.slice(1)}`;e.style[j]=`${e[t]}px`},t),[j,t]),y=(0,c.useMemo)(()=>(0,o.Z)(e=>{e.style[j]=null},a),[j,a]),w=(0,c.useMemo)(()=>(0,o.Z)(e=>{e.style[j]=`${h(j,e)}px`,(0,d.Z)(e)},s),[s,h,j]),Z=(0,c.useMemo)(()=>(0,o.Z)(e=>{e.style[j]=null},r),[j,r]);return(0,m.jsx)(u.Z,{ref:N,addEndListener:l.Z,...g,"aria-expanded":g.role?g.in:null,onEnter:b,onEntering:C,onEntered:y,onExit:w,onExiting:Z,childRef:x.ref,children:(e,t)=>c.cloneElement(x,{...t,className:n()(i,x.props.className,v[e],"width"===j&&"collapse-horizontal")})})});f.defaultProps={in:!1,timeout:300,mountOnEnter:!1,unmountOnExit:!1,appear:!1,getDimensionValue:p},t.Z=f},682:function(e,t,a){var s=a(4184),n=a.n(s),r=a(7294),c=a(6792),i=a(5893);let l=r.forwardRef(({bsPrefix:e,fluid:t,as:a="div",className:s,...r},l)=>{let o=(0,c.vE)(e,"container"),d="string"==typeof t?`-${t}`:"-fluid";return(0,i.jsx)(a,{ref:l,...r,className:n()(s,t?`${o}${d}`:o)})});l.displayName="Container",l.defaultProps={fluid:!1},t.Z=l},6833:function(e,t){t.Z=function(...e){return e.filter(e=>null!=e).reduce((e,t)=>{if("function"!=typeof t)throw Error("Invalid Argument Type, must only provide functions, undefined, or null.");return null===e?t:function(...a){e.apply(this,a),t.apply(this,a)}},null)}}}]);