"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[627],{354:function(e,t,a){var s,c=a(7294);function r(){return(r=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var s in a)Object.prototype.hasOwnProperty.call(a,s)&&(e[s]=a[s])}return e}).apply(this,arguments)}t.Z=function(e){return c.createElement("svg",r({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 114 20"},e),s||(s=c.createElement("path",{d:"M10.5 15.143 3.012 20.3l3.237-7.844L0 7.577l7.255-.054L10.5.3l3.245 7.222L21 7.577l-6.249 4.88 3.237 7.844zm46.316-.301L49.328 20l3.237-7.844-6.25-4.88 7.256-.054L56.816 0l3.245 7.222 7.255.054-6.25 4.88L64.305 20zm23.007.451-7.488 5.158 3.237-7.844-6.249-4.88 7.255-.054L79.823.451l3.245 7.222 7.255.054-6.249 4.88 3.237 7.844zm23.76-.301-7.488 5.158 3.237-7.844-6.25-4.88 7.256-.054L103.583.15l3.245 7.222 7.255.054-6.25 4.88 3.238 7.844zm-69.323-.15L26.77 20l3.237-7.844-6.249-4.88 7.255-.054L34.26 0l3.245 7.222 7.255.054-6.249 4.88L41.747 20z"})))}},916:function(e,t,a){var s,c=a(7294);function r(){return(r=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var s in a)Object.prototype.hasOwnProperty.call(a,s)&&(e[s]=a[s])}return e}).apply(this,arguments)}t.Z=function(e){return c.createElement("svg",r({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 54 54"},e),s||(s=c.createElement("path",{d:"M27 0a27 27 0 1 0 27 27A27 27 0 0 0 27 0zm11.371 27.86a1.929 1.929 0 0 1-.866.866v.01L22.076 36.45a1.929 1.929 0 0 1-2.791-1.736V19.286a1.929 1.929 0 0 1 2.791-1.726L37.5 25.274a1.928 1.928 0 0 1 .871 2.586z"})))}},1785:function(e,t,a){var s=a(5893);let c=e=>(0,s.jsx)("picture",{className:"circle-badge position-absolute rounded-circle bg-primary d-flex p-1 ".concat(e.className),children:e.children});t.Z=c},627:function(e,t,a){a.d(t,{Z:function(){return p}});var s=a(5893),c=a(8499),r=a(2748),l=a(7294),n=a(6785),i=a(1947),o=a(1516),d=a(3294);a(354),a(1664);let m=e=>(0,s.jsxs)("div",{className:"".concat(e.item.classes," ").concat(e.item.addedClasses," ").concat(e.useCarousel?"carousel-item col-9 col-lg-3":"col-lg-4"," pack-card  ").concat(e.useCarousel&&e.activeIndex===e.item.index?"active ":""," ").concat(e.itemMovingNext?"carousel-item-next carousel-item-start ":""," ").concat(e.itemMovingPrev?"carousel-item-prev carousel-item-end ":""),children:[(0,s.jsxs)("picture",{children:[(0,s.jsx)("source",{srcSet:e.item.srcSet,media:"(min-width: 992px)"}),(0,s.jsx)("img",{className:"w-100",alt:"/",src:e.item.src})]}),(0,s.jsxs)("div",{className:"p-2 h-100 bg-primary-light",children:[(0,s.jsx)("p",{children:(0,s.jsx)("strong",{children:e.item.title})}),(0,s.jsx)("p",{children:e.item.body})]})]}),u=e=>{let t=2*e.slideNumber,[a,u]=(0,l.useState)(1),[p,x]=(0,l.useState)(!1),[h,g]=(0,l.useState)(!1),v=[],b=0;e.items.map((e,t)=>{v.push({...e,id:b,index:b}),b++}),e.packagingCard?e.items.map((e,t)=>{v.push({...e,addedClasses:"d-lg-none",id:b,index:b}),b++}):e.items.length<8&&e.items.map((e,t)=>{v.push({...e,id:b,index:b}),b++});let[j,N]=(0,l.useState)(v),f=()=>{let t=e.slideNumber?e.slideNumber:3,s=j[0],c=a>=2*t-1?0:a+1;j.push(...[s]),j.shift(),x(!0),setTimeout(()=>{console.log(c),u(c),x(!1)},600)},w=()=>{g(!0),setTimeout(()=>{u(a<=0?t-1:a-1),g(!1);let e=j.pop();j.unshift(e)},600)};return(0,s.jsxs)("div",{className:"position-relative ".concat(e.useRow?"row":""," ").concat(e.packagingCard?"carousel--packaging carousel--real-result":""," ").concat(e.resultCard?"carousel--real-result":""," ").concat(e.articleCard?"blog-carousel":""),children:[(0,s.jsx)("div",{id:"carouselLoopCentered".concat(e.id),className:"carousel--loop carousel--swipe carousel--centered ".concat(e.centered?"carousel--centered__custom":""," ").concat(e.centered?"":"carousel--centered__custom-nocenter-".concat(e.colLgGrid)," ").concat(e.useRow?"px-0":""," ").concat(e.productCard||e.resultCard||e.packagingCard||e.videoCard||e.articleCard?"":"pt-2"," ").concat(e.carouselClass?e.carouselClass:""),children:(0,s.jsxs)("div",{className:"carousel-inner d-flex flex-nowrap mx-0",children:[e.productCard&&e.slideNumber>0&&j.map((t,c)=>(0,s.jsx)(n.Z,{useCardTemplate:e.useCardTemplate,useCarousel:!0,className:e.className,activeIndex:a,product:t,itemMovingNext:p,itemMovingPrev:h},c)),e.packagingCard&&e.slideNumber>0&&j.map((e,t)=>(0,s.jsx)(m,{useCarousel:!0,item:e,activeIndex:a,itemMovingNext:p,itemMovingPrev:h},t)),e.resultCard&&e.slideNumber>0&&j.map((e,t)=>(0,s.jsx)(i.Z,{useCarousel:!0,item:e,activeIndex:a,itemMovingNext:p,itemMovingPrev:h},t)),e.videoCard&&e.slideNumber>0&&j.map((t,c)=>(0,s.jsx)(o.Z,{useCardTemplate:e.useCardTemplate,useCarousel:!0,className:e.className,activeIndex:a,item:t,itemMovingNext:p,itemMovingPrev:h},c)),e.articleCard&&e.slideNumber>0&&j.map((t,c)=>(0,s.jsx)(d.Z,{className:e.className,activeIndex:a,useCarousel:!0,item:t,colLg:6,itemMovingNext:p,itemMovingPrev:h},c)),e.imgLogo&&e.slideNumber>0&&j.map((e,t)=>(0,s.jsx)("div",{className:"carousel-item ".concat(e.className," ").concat(e.index===a?"active":""," ").concat(p?"carousel-item-next carousel-item-start ":""," ").concat(h?"carousel-item-prev carousel-item-end ":""),children:(0,s.jsx)("img",{className:"img-fluid",src:e.src,alt:"Slide ".concat(t)})},t))]})}),(0,s.jsxs)("button",{onClick:w,className:"carousel-control carousel-control-prev carousel-control--background ".concat(e.hideControls?"d-none":""," ").concat(e.roundedControl?"carousel-control--loop":"floating-out-start justify-content-start text-primary"," ").concat(e.packagingCard?"d-lg-none":""," w-auto"),children:[(0,s.jsx)("span",{className:"carousel-control-prev-icon d-flex justify-content-center align-items-center","aria-hidden":"true",children:(0,s.jsx)(c.Z,{className:"svg svg--current-color"})}),(0,s.jsx)("span",{className:"visually-hidden",children:"Previous"})]}),(0,s.jsxs)("button",{onClick:f,className:"carousel-control carousel-control-next carousel-control--background ".concat(e.hideControls?"d-none":""," ").concat(e.roundedControl?"carousel-control--loop":"floating-out-end justify-content-end text-primary"," ").concat(e.packagingCard?"d-lg-none":""," w-auto"),children:[(0,s.jsx)("span",{className:"carousel-control-next-icon d-flex justify-content-center align-items-center","aria-hidden":"true",children:(0,s.jsx)(r.Z,{className:"svg svg--current-color"})}),(0,s.jsx)("span",{className:"visually-hidden",children:"Next"})]})]})};var p=u},1516:function(e,t,a){var s=a(5893),c=a(916);let r=e=>e.useCardTemplate?(0,s.jsx)("div",{className:"".concat(e.className," carousel-item ").concat(e.activeIndex===e.item.index?"active ":""," ").concat(e.itemMovingNext?"carousel-item-next carousel-item-start ":""," ").concat(e.itemMovingPrev?"carousel-item-prev carousel-item-end ":""),children:(0,s.jsx)("img",{className:"img-fluid",src:"//via.placeholder.com/600x400?text=".concat(e.item.label),alt:"slide ".concat(e.item.index)})}):(0,s.jsxs)("figure",{className:"".concat(e.className," ").concat(e.useCarousel?"carousel-item":""," video-card text-center ").concat(e.useCarousel&&e.activeIndex===e.item.index?"active ":""," ").concat(e.itemMovingNext?"carousel-item-next carousel-item-start ":""," ").concat(e.itemMovingPrev?"carousel-item-prev carousel-item-end ":""),children:[(0,s.jsxs)("picture",{className:"d-block position-relative w-100",children:[(0,s.jsx)("source",{srcSet:e.item.srcSet,media:"(min-width: 992px)"}),(0,s.jsx)("img",{src:e.item.src,alt:"Placeholder",className:"d-block w-100"}),(0,s.jsx)(c.Z,{className:"svg"})]}),e.item.title&&(0,s.jsx)("figcaption",{className:"text-center mt-2",children:(0,s.jsx)("h2",{children:e.item.title})})]});t.Z=r},3294:function(e,t,a){var s=a(5893),c=a(1664),r=a.n(c);let l=e=>(0,s.jsx)("div",{className:"".concat(e.className," ").concat(e.useCarousel?"carousel-item":""," mb-4 mb-lg-3 ").concat(e.useCarousel&&e.activeIndex===e.item.index?"active ":""," ").concat(e.itemMovingNext?"carousel-item-next carousel-item-start ":""," ").concat(e.itemMovingPrev?"carousel-item-prev carousel-item-end ":""),as:"article",children:(0,s.jsxs)("figure",{className:"border border-secondary-light ".concat(e.useCarousel?"":"mb-2 no-gutters__in-container"),children:[(0,s.jsx)(r(),{href:"./templates/article","aria-label":e.item.title,children:(0,s.jsx)("img",{src:e.item.src,className:"w-100",alt:e.item.title})}),(0,s.jsxs)("figcaption",{className:"p-2",children:[e.item.tags.map(e=>(0,s.jsx)("span",{class:"badge badge--square badge-blog ".concat(e.class," fw-normal me-1"),children:e.label})),(0,s.jsx)("p",{className:"h2 mt-2",children:e.item.title}),e.item.desc&&(0,s.jsx)("p",{children:e.item.desc}),(0,s.jsx)(r(),{href:"#",className:"btn btn-outline-primary","aria-label":e.item.title,children:"read more"})]})]})});t.Z=l},6785:function(e,t,a){a.d(t,{Z:function(){return C}});var s,c=a(5893),r=a(1664),l=a.n(r),n=a(7294);function i(){return(i=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var s in a)Object.prototype.hasOwnProperty.call(a,s)&&(e[s]=a[s])}return e}).apply(this,arguments)}var o=function(e){return n.createElement("svg",i({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 447 207"},e),s||(s=n.createElement("text",{transform:"translate(0 155)",fill:"#fff",fontSize:207,fontFamily:"sofia-pro"},n.createElement("tspan",{x:0,y:0},"new!"))))};a(9032);var d=a(5697),m=a.n(d),u=a(3303),p=a(4710),x=a(8404);let h=e=>{let t=Math.floor(e.score),a=5-Math.ceil(e.score),s=5-t-a,r=[];for(let l=0;l<t;l+=1)r.push((0,c.jsx)(u.Z,{role:"presentation",className:"svg svg--current-color text-primary ".concat(0===r.length?"":"ms-25")},"full-".concat(l)));for(let n=0;n<s;n+=1)r.push((0,c.jsx)(p.Z,{role:"presentation",className:"svg svg--current-color text-primary ".concat(0===r.length?"":"ms-25")},"half-".concat(n)));for(let i=0;i<a;i+=1)r.push((0,c.jsx)(x.Z,{role:"presentation",className:"svg svg--current-color text-primary ".concat(0===r.length?"":"ms-25")},"line-".concat(i)));return(0,c.jsx)("div",{className:"d-flex",children:r})};h.propTypes={score:m().number.isRequired};let g=e=>{let[t,s]=(0,n.useState)(!1),[r,i]=(0,n.useState)(0),[o,d]=(0,n.useState)(0);return(0,n.useEffect)(()=>{fetch("https://api-cdn.yotpo.com/products/".concat(a.g.config.yotpoKey,"/").concat(e.productId,"/bottomline")).then(e=>e.json()).then(e=>{i(e.response.bottomline.average_score),d(e.response.bottomline.total_reviews),t||s(!0)})},[e.productId]),t?(0,c.jsxs)("div",{className:"d-flex ".concat(e.className),children:[(0,c.jsx)(h,{score:r}),e.showScore&&(0,c.jsx)("span",{className:"ms-25",children:"".concat(r.toFixed(1)," stars")}),e.showTotal&&(0,c.jsxs)("span",{className:"ms-25",children:["(",(0,c.jsx)(l(),{href:"".concat(e.productUrl,"#write-a-review"),className:"link-secondary text-underline",children:o}),")"]})]}):(0,c.jsx)("div",{})};g.propTypes={productId:m().number.isRequired,productUrl:m().string,showScore:m().bool,showTotal:m().bool,className:m().string},g.defaultProps={productUrl:"",showScore:!1,showTotal:!0,className:""};var v=a(1785),b=a(7977);let j=()=>(0,c.jsx)("button",{type:"button",className:"btn btn-lg btn-primary add-to-cart btn-block px-0 mb-1 w-100",children:"Add To Cart"}),N=e=>{let{price:t,comparePrice:a}=e;return(0,c.jsxs)("button",{type:"button",class:"btn btn-lg btn-primary btn-block px-0 btn-abtest mb-1 w-100",children:[(0,c.jsx)("span",{class:"btn-abtest__text",children:"Add to Cart"}),(0,c.jsxs)("span",{class:"btn-abtest__prices d-none border-0",children:[(0,c.jsx)("span",{class:"text-linethrough",children:a}),(0,c.jsx)("span",{class:"",children:t})]})]})},f=e=>(0,c.jsxs)(c.Fragment,{children:[!e.abtestBtn&&(0,c.jsx)("button",{type:"button",className:"w-100 btn btn-lg btn-primary btn-choose btn-block mb-1",children:e.swatch.label}),e.abtestBtn&&(0,c.jsxs)("button",{type:"button",class:"btn btn-choose btn-lg btn-primary btn-block px-0 btn-abtest mb-1 w-100",children:[(0,c.jsx)("span",{class:"btn-abtest__text",children:"Add to Cart"}),(0,c.jsxs)("span",{class:"btn-abtest__prices d-none border-0",children:[(0,c.jsx)("span",{class:"text-linethrough",children:e.comparePrice}),(0,c.jsx)("span",{class:"",children:e.price})]})]}),(0,c.jsxs)("div",{className:"swatch-overlay flex-column align-items-center justify-content-end w-100 pb-0 px-2 position-absolute",children:[(0,c.jsxs)("div",{className:"text-center w-100 py-2",children:[(0,c.jsxs)("label",{className:"mb-2",children:[e.swatch.style&&(0,c.jsx)("strong",{children:"Style: "}),e.swatch.shade&&(0,c.jsx)("strong",{children:"Shade: "}),(0,c.jsx)("span",{"data-swatch-label":!0,children:e.swatch.data[0].label})]}),(0,c.jsx)("ul",{className:"list-unstyled product-variant-swatch d-flex justify-content-center",children:e.swatch.data.length>0&&e.swatch.data.map((e,t)=>(0,c.jsx)("li",{className:"col-3 product-variant-swatch__item ".concat(e.available?"available":""," ").concat(0===t?"active":""),"data-available":e.available?"available":"",children:(0,c.jsx)("span",{"data-id":e.id,"data-val":e.label,className:"d-block variant-swatch mx-auto ".concat(0===t?"border-primary":""," ").concat(e.value," ").concat(e.available?"":"oos")})},e.id))})]}),e.abtestBtn?(0,c.jsx)(N,{price:e.price,comparePrice:e.comparePrice}):(0,c.jsx)(j,{})]})]}),w=e=>{let{abtestBtn:t}=e;return e.useCardTemplate?(0,c.jsx)("div",{className:"".concat(e.className," carousel-item ").concat(e.activeIndex===e.product.index?"active ":""," ").concat(e.itemMovingNext?"carousel-item-next carousel-item-start ":""," ").concat(e.itemMovingPrev?"carousel-item-prev carousel-item-end ":""),children:(0,c.jsx)("img",{className:"img-fluid",src:"//via.placeholder.com/600x400?text=".concat(e.product.label),alt:"slide ".concat(e.product.index)})}):(0,c.jsxs)("div",{className:"position-relative ".concat(e.className," ").concat(e.useCarousel?"carousel-item":""," ").concat(e.className?"":"col-9 col-md-3 product-card text-center"," ").concat(e.useCarousel&&e.activeIndex===e.product.index?"active ":""," ").concat(e.itemMovingNext?"carousel-item-next carousel-item-start ":""," ").concat(e.itemMovingPrev?"carousel-item-prev carousel-item-end ":""),children:[(0,c.jsxs)(l(),{href:"#",children:[(0,c.jsxs)("picture",{className:"d-block position-relative",children:[(0,c.jsx)("source",{srcSet:e.product.srcSet}),(0,c.jsx)("img",{src:e.product.src,className:"w-100",alt:"Image Alt",loading:"lazy"}),e.showTip&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("span",{class:"product-card__image-tip position-absolute text-white font-size-xs p-1 d-none d-lg-block",children:"\uD83D\uDC7B Get 3 for 2 with code: HALLOWEEN \uD83D\uDC7B"}),(0,c.jsx)("span",{class:"product-card__image-tip position-absolute text-white font-size-xs p-1 d-block d-lg-none rounded",children:"\uD83D\uDC7B 3 for 2"})]})]}),e.product.badgeImg&&(0,c.jsx)(v.Z,{className:"",children:(0,c.jsx)("img",{alt:"25% Off",className:"w-100",src:"../badge-25.svg"})})]}),e.icon&&(0,c.jsx)("div",{className:"circle-badge position-absolute rounded-circle bg-primary d-flex p-1",children:(0,c.jsx)(o,{className:"fw-bold"})}),e.product.badgeText&&(0,c.jsx)(b.Z,{bg:"white",className:"badge position-absolute fw-normal font-size-sm text-body",children:e.product.badgeText}),(0,c.jsxs)("div",{className:"product-card__content pt-2 pb-0 position-relative flex-grow-1 d-flex flex-column px-2",children:[(0,c.jsx)("div",{className:"d-flex justify-content-center mb-1",children:(0,c.jsx)(g,{productId:e.product.productId,showTotal:!1})}),(0,c.jsx)("p",{className:"product-card__title flex-grow-1 d-flex flex-column justify-content-center h4 h-100 fw-normal",children:(0,c.jsx)(l(),{href:"#",className:"text-dark",children:e.product.title})}),(0,c.jsxs)("p",{className:"text-center",children:[(0,c.jsx)("span",{className:"text-linethrough h4 m-1",children:e.product.comparePrice}),(0,c.jsx)("span",{className:"text-primary h4",children:e.product.price})]}),!e.product.swatch&&!t&&(0,c.jsx)(j,{}),!e.product.swatch&&t&&(0,c.jsx)(N,{price:e.product.price,comparePrice:e.product.comparePrice}),e.product.swatch&&(0,c.jsx)(f,{swatch:e.product.swatch,abtestBtn:t,price:e.product.price,comparePrice:e.product.comparePrice})]})]})};var C=w},1947:function(e,t,a){var s=a(5893),c=a(354),r=a(7977),l=a(1664),n=a.n(l);let i=e=>(0,s.jsxs)("div",{className:"".concat(e.useCarousel?"carousel-item col-9 col-lg-3":"col-lg-4"," result-card  ").concat(e.useCarousel&&e.activeIndex===e.item.index?"active ":""," ").concat(e.itemMovingNext?"carousel-item-next carousel-item-start ":""," ").concat(e.itemMovingPrev?"carousel-item-prev carousel-item-end ":""),children:[(0,s.jsxs)("picture",{children:[(0,s.jsx)("source",{srcSet:e.item.srcSet,media:"(min-width: 992px)"}),(0,s.jsx)("img",{className:"w-100",alt:"/",src:e.item.src})]}),(0,s.jsxs)("div",{className:"p-2 bg-white h-100",children:[(0,s.jsxs)("p",{className:"d-flex justify-content-between align-items-center mb-0",children:[(0,s.jsx)(c.Z,{className:"svg text-primary h4 mb-0"}),(0,s.jsx)(r.Z,{bg:e.item.badgeColor,className:"mb-1 mt-1",children:e.item.badge})]}),(0,s.jsxs)("p",{children:[(0,s.jsx)("strong",{children:"Product:\xa0"}),(0,s.jsx)(n(),{href:"#",title:e.item.title,tabIndex:"0",className:"text-underline",children:e.item.title})]}),(0,s.jsxs)("p",{children:['"',e.item.comment,'"']}),(0,s.jsx)("p",{className:"text-underline fw-bold",children:e.item.author})]})]});t.Z=i}}]);