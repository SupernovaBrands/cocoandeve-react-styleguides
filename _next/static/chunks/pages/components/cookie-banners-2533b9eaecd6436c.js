(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2897],{9905:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/cookie-banners",function(){return n(1102)}])},1102:function(e,t,n){"use strict";n.r(t);var o=n(5893),c=n(5418),s=n(7294);let l=()=>{let[e,t]=(0,s.useState)(!1),n=e=>{t(e)};return(0,o.jsx)(o.Fragment,{children:!e&&(0,o.jsx)(c.Z,{onAcceptCookie:n,text:"Up to 25% off + Free Gift worth $25.40"})})};t.default=l},5418:function(e,t,n){"use strict";n.d(t,{Z:function(){return p}});var o=n(5893),c=n(7294),s=n(9966),l=n(5697),i=n.n(l);let a=function(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"/",c=arguments.length>4?arguments[4]:void 0,s="";if(n){let l=new Date;l.setTime(l.getTime()+864e5*n),s="; expires=".concat(l.toUTCString())}document.cookie="".concat(e,"=").concat(t||"").concat(s,"; path=").concat(o).concat(c?";domain=".concat(c):"")},r=e=>{let t="".concat(e,"="),n=document.cookie.split(";");for(let o=0;o<n.length;o+=1){let c=n[o];for(;" "===c.charAt(0);)c=c.substring(1,c.length);if(0===c.indexOf(t))return c.substring(t.length,c.length)}return null},u=e=>{a(e,null)},d=e=>{let[t,n]=(0,c.useState)(!1),[l,i]=(0,c.useState)(!1),[a,d]=(0,c.useState)(!0),[p,h]=(0,c.useState)(!0),m="functional",f="performance",g=()=>{if("off"===r("performance")){let e="".split(";");if(e.length>0)for(let t=0;t<=e.length-1;t+=1)u(e[t],"/",".cocoandeve.com")}if("off"===r("ads")){let n="".split(";");if(n.length>0)for(let o=0;o<=n.length-1;o+=1)u(n[o],"/",".cocoandeve.com")}},x=()=>{let t=new Date,n=t.getTime();n+=31536e6,t.setTime(n);let o="functional=".concat(l?"on":"off","; expires=").concat(t.toUTCString(),"; path=/");document.cookie=o;let c="performance=".concat(a?"on":"off","; expires=").concat(t.toUTCString(),"; path=/");document.cookie=c;let s="ads=".concat(p?"on":"off","; expires=").concat(t.toUTCString(),"; path=/");document.cookie=s,g(),e.onAcceptCookie(!0)},k=e=>{console.log(e.target.id),"functional"===e.target.id&&i(e.target.checked),"performance"===e.target.id&&d(e.target.checked),"ads"===e.target.id&&h(e.target.checked)};return(0,o.jsx)("section",{className:"cookies-banner bg-white",children:(0,o.jsxs)("div",{className:"container py-2 font-size-xs",children:[(0,o.jsxs)("p",{className:"text-center",children:["We use cookies to enhance your browsing experience, analyse traffic and serve tailored advertisements.",(0,o.jsx)("a",{href:"/pages/privacy-policy",className:"text-dark text-underline",children:"Find out more."})]}),(0,o.jsx)(s.Z,{in:t,children:(0,o.jsx)("div",{children:(0,o.jsxs)("ul",{className:"list-unstyled",children:[(0,o.jsx)("li",{className:"pb-2 pt-0 pb-lg-0",children:(0,o.jsxs)("div",{className:"custom-control custom-switch",children:[(0,o.jsx)("input",{type:"checkbox",className:"custom-control-input",checked:l,id:m,disabled:!0,onChange:k}),(0,o.jsxs)("label",{className:"custom-control-label pt-0 pt-lg-1 pl-1",htmlFor:m,children:[(0,o.jsx)("strong",{children:"Functional:"})," These cookies are required for basic site functionality and are therefore always enabled."]})]})}),(0,o.jsx)("li",{className:"py-2 pt-lg-1 pb-lg-1",children:(0,o.jsxs)("div",{className:"custom-control custom-switch",children:[(0,o.jsx)("input",{type:"checkbox",className:"custom-control-input",checked:a,id:f,onChange:k}),(0,o.jsxs)("label",{className:"custom-control-label pt-0 pt-lg-1 pl-1",htmlFor:f,children:[(0,o.jsx)("strong",{children:"Performance:"})," These cookies allow us to improve the site's functionality by tracking usage on this website."]})]})}),(0,o.jsx)("li",{className:"py-2 pt-lg-0 pb-lg-1",children:(0,o.jsxs)("div",{className:"custom-control custom-switch",children:[(0,o.jsx)("input",{type:"checkbox",className:"custom-control-input",checked:p,id:"ads",onChange:k}),(0,o.jsxs)("label",{className:"custom-control-label pt-0 pt-lg-1 pl-1",htmlFor:"ads",children:[(0,o.jsx)("strong",{children:"Social Media and Advertising:"})," These cookies allow us to improve the site's functionality by tracking usage on this website."]})]})})]})})}),(0,o.jsxs)("div",{className:"text-center",children:[t?(0,o.jsx)("a",{className:"text-underline text-dark use-default d-none mr-1 btn px-0",onClick:x,children:"Use Default"}):(0,o.jsx)("a",{className:"text-underline text-dark mr-1 btn px-0 me-1",onClick:()=>n(!t),children:"Change"}),(0,o.jsx)("button",{className:"btn btn-outline-dark rounded-0 accept-cookie",type:"button",onClick:x,children:"OK"})]})]})})};d.propTypes={onAcceptCookie:i().func};var p=d},9966:function(e,t,n){"use strict";var o=n(4184),c=n.n(o),s=n(1505),l=n(7294),i=n(4527),a=n(3825),r=n(6833),u=n(4509),d=n(9337),p=n(5893);let h={height:["marginTop","marginBottom"],width:["marginLeft","marginRight"]};function m(e,t){let n=`offset${e[0].toUpperCase()}${e.slice(1)}`,o=t[n],c=h[e];return o+parseInt((0,s.Z)(t,c[0]),10)+parseInt((0,s.Z)(t,c[1]),10)}let f={[i.Wj]:"collapse",[i.Ix]:"collapsing",[i.d0]:"collapsing",[i.cn]:"collapse show"},g=l.forwardRef(({onEnter:e,onEntering:t,onEntered:n,onExit:o,onExiting:s,className:i,children:h,dimension:g="height",getDimensionValue:x=m,...k},b)=>{let j="function"==typeof g?g():g,y=(0,l.useMemo)(()=>(0,r.Z)(e=>{e.style[j]="0"},e),[j,e]),N=(0,l.useMemo)(()=>(0,r.Z)(e=>{let t=`scroll${j[0].toUpperCase()}${j.slice(1)}`;e.style[j]=`${e[t]}px`},t),[j,t]),w=(0,l.useMemo)(()=>(0,r.Z)(e=>{e.style[j]=null},n),[j,n]),v=(0,l.useMemo)(()=>(0,r.Z)(e=>{e.style[j]=`${x(j,e)}px`,(0,u.Z)(e)},o),[o,x,j]),C=(0,l.useMemo)(()=>(0,r.Z)(e=>{e.style[j]=null},s),[j,s]);return(0,p.jsx)(d.Z,{ref:b,addEndListener:a.Z,...k,"aria-expanded":k.role?k.in:null,onEnter:y,onEntering:N,onEntered:w,onExit:v,onExiting:C,childRef:h.ref,children:(e,t)=>l.cloneElement(h,{...t,className:c()(i,h.props.className,f[e],"width"===j&&"collapse-horizontal")})})});g.defaultProps={in:!1,timeout:300,mountOnEnter:!1,unmountOnExit:!1,appear:!1,getDimensionValue:m},t.Z=g},6833:function(e,t){"use strict";t.Z=function(...e){return e.filter(e=>null!=e).reduce((e,t)=>{if("function"!=typeof t)throw Error("Invalid Argument Type, must only provide functions, undefined, or null.");return null===e?t:function(...n){e.apply(this,n),t.apply(this,n)}},null)}}},function(e){e.O(0,[2868,9774,2888,179],function(){return e(e.s=9905)}),_N_E=e.O()}]);