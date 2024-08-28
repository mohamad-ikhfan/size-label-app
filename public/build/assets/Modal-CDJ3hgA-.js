import{r as s,G as m,c as ze,j as N}from"./app-BPfiMoID.js";import{s as re,W as y,H as x,o as w,y as P,n as D,a as oe,u as V,b as q,t as le,T as Ze,l as ae,p as Je,f as ye,M as pe,c as xe,i as B,m as Qe,d as et,X as $e,I as Y}from"./transition-BCfBU8HU.js";function K(e){return re.isServer?null:e instanceof Node?e.ownerDocument:e!=null&&e.hasOwnProperty("current")&&e.current instanceof Node?e.current.ownerDocument:document}let tt=s.createContext(void 0);function nt(){return s.useContext(tt)}let rt="span";var G=(e=>(e[e.None=1]="None",e[e.Focusable=2]="Focusable",e[e.Hidden=4]="Hidden",e))(G||{});function ot(e,t){var n;let{features:r=1,...o}=e,a={ref:t,"aria-hidden":(r&2)===2?!0:(n=o["aria-hidden"])!=null?n:void 0,hidden:(r&4)===4?!0:void 0,style:{position:"fixed",top:1,left:1,width:1,height:0,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",borderWidth:"0",...(r&4)===4&&(r&2)!==2&&{display:"none"}}};return x({ourProps:a,theirProps:o,slot:{},defaultTag:rt,name:"Hidden"})}let Q=y(ot),ue=s.createContext(null);ue.displayName="DescriptionContext";function Te(){let e=s.useContext(ue);if(e===null){let t=new Error("You used a <Description /> component, but it is not inside a relevant parent.");throw Error.captureStackTrace&&Error.captureStackTrace(t,Te),t}return e}function lt(){let[e,t]=s.useState([]);return[e.length>0?e.join(" "):void 0,s.useMemo(()=>function(n){let r=w(a=>(t(u=>[...u,a]),()=>t(u=>{let i=u.slice(),l=i.indexOf(a);return l!==-1&&i.splice(l,1),i}))),o=s.useMemo(()=>({register:r,slot:n.slot,name:n.name,props:n.props,value:n.value}),[r,n.slot,n.name,n.props,n.value]);return m.createElement(ue.Provider,{value:o},n.children)},[t])]}let at="p";function ut(e,t){let n=s.useId(),r=nt(),{id:o=`headlessui-description-${n}`,...a}=e,u=Te(),i=P(t);D(()=>u.register(o),[o,u.register]);let l=r||!1,d=s.useMemo(()=>({...u.slot,disabled:l}),[u.slot,l]),c={ref:i,...u.props,id:o};return x({ourProps:c,theirProps:a,slot:d,defaultTag:at,name:u.name||"Description"})}let it=y(ut),st=Object.assign(it,{});var Fe=(e=>(e.Space=" ",e.Enter="Enter",e.Escape="Escape",e.Backspace="Backspace",e.Delete="Delete",e.ArrowLeft="ArrowLeft",e.ArrowUp="ArrowUp",e.ArrowRight="ArrowRight",e.ArrowDown="ArrowDown",e.Home="Home",e.End="End",e.PageUp="PageUp",e.PageDown="PageDown",e.Tab="Tab",e))(Fe||{});let ct=s.createContext(()=>{});function dt({value:e,children:t}){return m.createElement(ct.Provider,{value:e},t)}let ft=class extends Map{constructor(t){super(),this.factory=t}get(t){let n=super.get(t);return n===void 0&&(n=this.factory(t),this.set(t,n)),n}};function Pe(e,t){let n=e(),r=new Set;return{getSnapshot(){return n},subscribe(o){return r.add(o),()=>r.delete(o)},dispatch(o,...a){let u=t[o].call(n,...a);u&&(n=u,r.forEach(i=>i()))}}}function Le(e){return s.useSyncExternalStore(e.subscribe,e.getSnapshot,e.getSnapshot)}let mt=new ft(()=>Pe(()=>[],{ADD(e){return this.includes(e)?this:[...this,e]},REMOVE(e){let t=this.indexOf(e);if(t===-1)return this;let n=this.slice();return n.splice(t,1),n}}));function O(e,t){let n=mt.get(t),r=s.useId(),o=Le(n);if(D(()=>{if(e)return n.dispatch("ADD",r),()=>n.dispatch("REMOVE",r)},[n,e]),!e)return!1;let a=o.indexOf(r),u=o.length;return a===-1&&(a=u,u+=1),a===u-1}let ee=new Map,_=new Map;function ve(e){var t;let n=(t=_.get(e))!=null?t:0;return _.set(e,n+1),n!==0?()=>he(e):(ee.set(e,{"aria-hidden":e.getAttribute("aria-hidden"),inert:e.inert}),e.setAttribute("aria-hidden","true"),e.inert=!0,()=>he(e))}function he(e){var t;let n=(t=_.get(e))!=null?t:1;if(n===1?_.delete(e):_.set(e,n-1),n!==1)return;let r=ee.get(e);r&&(r["aria-hidden"]===null?e.removeAttribute("aria-hidden"):e.setAttribute("aria-hidden",r["aria-hidden"]),e.inert=r.inert,ee.delete(e))}function pt(e,{allowed:t,disallowed:n}={}){let r=O(e,"inert-others");D(()=>{var o,a;if(!r)return;let u=oe();for(let l of(o=n==null?void 0:n())!=null?o:[])l&&u.add(ve(l));let i=(a=t==null?void 0:t())!=null?a:[];for(let l of i){if(!l)continue;let d=K(l);if(!d)continue;let c=l.parentElement;for(;c&&c!==d.body;){for(let v of c.children)i.some(p=>v.contains(p))||u.add(ve(v));c=c.parentElement}}return u.dispose},[r,t,n])}let X=["[contentEditable=true]","[tabindex]","a[href]","area[href]","button:not([disabled])","iframe","input:not([disabled])","select:not([disabled])","textarea:not([disabled])"].map(e=>`${e}:not([tabindex='-1'])`).join(","),vt=["[data-autofocus]"].map(e=>`${e}:not([tabindex='-1'])`).join(",");var $=(e=>(e[e.First=1]="First",e[e.Previous=2]="Previous",e[e.Next=4]="Next",e[e.Last=8]="Last",e[e.WrapAround=16]="WrapAround",e[e.NoScroll=32]="NoScroll",e[e.AutoFocus=64]="AutoFocus",e))($||{}),te=(e=>(e[e.Error=0]="Error",e[e.Overflow=1]="Overflow",e[e.Success=2]="Success",e[e.Underflow=3]="Underflow",e))(te||{}),ht=(e=>(e[e.Previous=-1]="Previous",e[e.Next=1]="Next",e))(ht||{});function Et(e=document.body){return e==null?[]:Array.from(e.querySelectorAll(X)).sort((t,n)=>Math.sign((t.tabIndex||Number.MAX_SAFE_INTEGER)-(n.tabIndex||Number.MAX_SAFE_INTEGER)))}function gt(e=document.body){return e==null?[]:Array.from(e.querySelectorAll(vt)).sort((t,n)=>Math.sign((t.tabIndex||Number.MAX_SAFE_INTEGER)-(n.tabIndex||Number.MAX_SAFE_INTEGER)))}var Me=(e=>(e[e.Strict=0]="Strict",e[e.Loose=1]="Loose",e))(Me||{});function wt(e,t=0){var n;return e===((n=K(e))==null?void 0:n.body)?!1:V(t,{0(){return e.matches(X)},1(){let r=e;for(;r!==null;){if(r.matches(X))return!0;r=r.parentElement}return!1}})}var bt=(e=>(e[e.Keyboard=0]="Keyboard",e[e.Mouse=1]="Mouse",e))(bt||{});typeof window<"u"&&typeof document<"u"&&(document.addEventListener("keydown",e=>{e.metaKey||e.altKey||e.ctrlKey||(document.documentElement.dataset.headlessuiFocusVisible="")},!0),document.addEventListener("click",e=>{e.detail===1?delete document.documentElement.dataset.headlessuiFocusVisible:e.detail===0&&(document.documentElement.dataset.headlessuiFocusVisible="")},!0));function T(e){e==null||e.focus({preventScroll:!0})}let yt=["textarea","input"].join(",");function xt(e){var t,n;return(n=(t=e==null?void 0:e.matches)==null?void 0:t.call(e,yt))!=null?n:!1}function $t(e,t=n=>n){return e.slice().sort((n,r)=>{let o=t(n),a=t(r);if(o===null||a===null)return 0;let u=o.compareDocumentPosition(a);return u&Node.DOCUMENT_POSITION_FOLLOWING?-1:u&Node.DOCUMENT_POSITION_PRECEDING?1:0})}function j(e,t,{sorted:n=!0,relativeTo:r=null,skipElements:o=[]}={}){let a=Array.isArray(e)?e.length>0?e[0].ownerDocument:document:e.ownerDocument,u=Array.isArray(e)?n?$t(e):e:t&64?gt(e):Et(e);o.length>0&&u.length>1&&(u=u.filter(f=>!o.some(E=>E!=null&&"current"in E?(E==null?void 0:E.current)===f:E===f))),r=r??a.activeElement;let i=(()=>{if(t&5)return 1;if(t&10)return-1;throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")})(),l=(()=>{if(t&1)return 0;if(t&2)return Math.max(0,u.indexOf(r))-1;if(t&4)return Math.max(0,u.indexOf(r))+1;if(t&8)return u.length-1;throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")})(),d=t&32?{preventScroll:!0}:{},c=0,v=u.length,p;do{if(c>=v||c+v<=0)return 0;let f=l+c;if(t&16)f=(f+v)%v;else{if(f<0)return 3;if(f>=v)return 1}p=u[f],p==null||p.focus(d),c+=i}while(p!==a.activeElement);return t&6&&xt(p)&&p.select(),2}function Se(){return/iPhone/gi.test(window.navigator.platform)||/Mac/gi.test(window.navigator.platform)&&window.navigator.maxTouchPoints>0}function Tt(){return/Android/gi.test(window.navigator.userAgent)}function Ft(){return Se()||Tt()}function H(e,t,n,r){let o=q(n);s.useEffect(()=>{if(!e)return;function a(u){o.current(u)}return document.addEventListener(t,a,r),()=>document.removeEventListener(t,a,r)},[e,t,r])}function De(e,t,n,r){let o=q(n);s.useEffect(()=>{if(!e)return;function a(u){o.current(u)}return window.addEventListener(t,a,r),()=>window.removeEventListener(t,a,r)},[e,t,r])}const Ee=30;function Pt(e,t,n){let r=O(e,"outside-click"),o=q(n),a=s.useCallback(function(l,d){if(l.defaultPrevented)return;let c=d(l);if(c===null||!c.getRootNode().contains(c)||!c.isConnected)return;let v=function p(f){return typeof f=="function"?p(f()):Array.isArray(f)||f instanceof Set?f:[f]}(t);for(let p of v){if(p===null)continue;let f=p instanceof HTMLElement?p:p.current;if(f!=null&&f.contains(c)||l.composed&&l.composedPath().includes(f))return}return!wt(c,Me.Loose)&&c.tabIndex!==-1&&l.preventDefault(),o.current(l,c)},[o]),u=s.useRef(null);H(r,"pointerdown",l=>{var d,c;u.current=((c=(d=l.composedPath)==null?void 0:d.call(l))==null?void 0:c[0])||l.target},!0),H(r,"mousedown",l=>{var d,c;u.current=((c=(d=l.composedPath)==null?void 0:d.call(l))==null?void 0:c[0])||l.target},!0),H(r,"click",l=>{Ft()||u.current&&(a(l,()=>u.current),u.current=null)},!0);let i=s.useRef({x:0,y:0});H(r,"touchstart",l=>{i.current.x=l.touches[0].clientX,i.current.y=l.touches[0].clientY},!0),H(r,"touchend",l=>{let d={x:l.changedTouches[0].clientX,y:l.changedTouches[0].clientY};if(!(Math.abs(d.x-i.current.x)>=Ee||Math.abs(d.y-i.current.y)>=Ee))return a(l,()=>l.target instanceof HTMLElement?l.target:null)},!0),De(r,"blur",l=>a(l,()=>window.document.activeElement instanceof HTMLIFrameElement?window.document.activeElement:null),!0)}function U(...e){return s.useMemo(()=>K(...e),[...e])}function Ce(e,t,n,r){let o=q(n);s.useEffect(()=>{e=e??window;function a(u){o.current(u)}return e.addEventListener(t,a,r),()=>e.removeEventListener(t,a,r)},[e,t,r])}function Lt(){let e;return{before({doc:t}){var n;let r=t.documentElement,o=(n=t.defaultView)!=null?n:window;e=Math.max(0,o.innerWidth-r.clientWidth)},after({doc:t,d:n}){let r=t.documentElement,o=Math.max(0,r.clientWidth-r.offsetWidth),a=Math.max(0,e-o);n.style(r,"paddingRight",`${a}px`)}}}function Mt(){return Se()?{before({doc:e,d:t,meta:n}){function r(o){return n.containers.flatMap(a=>a()).some(a=>a.contains(o))}t.microTask(()=>{var o;if(window.getComputedStyle(e.documentElement).scrollBehavior!=="auto"){let i=oe();i.style(e.documentElement,"scrollBehavior","auto"),t.add(()=>t.microTask(()=>i.dispose()))}let a=(o=window.scrollY)!=null?o:window.pageYOffset,u=null;t.addEventListener(e,"click",i=>{if(i.target instanceof HTMLElement)try{let l=i.target.closest("a");if(!l)return;let{hash:d}=new URL(l.href),c=e.querySelector(d);c&&!r(c)&&(u=c)}catch{}},!0),t.addEventListener(e,"touchstart",i=>{if(i.target instanceof HTMLElement)if(r(i.target)){let l=i.target;for(;l.parentElement&&r(l.parentElement);)l=l.parentElement;t.style(l,"overscrollBehavior","contain")}else t.style(i.target,"touchAction","none")}),t.addEventListener(e,"touchmove",i=>{if(i.target instanceof HTMLElement){if(i.target.tagName==="INPUT")return;if(r(i.target)){let l=i.target;for(;l.parentElement&&l.dataset.headlessuiPortal!==""&&!(l.scrollHeight>l.clientHeight||l.scrollWidth>l.clientWidth);)l=l.parentElement;l.dataset.headlessuiPortal===""&&i.preventDefault()}else i.preventDefault()}},{passive:!1}),t.add(()=>{var i;let l=(i=window.scrollY)!=null?i:window.pageYOffset;a!==l&&window.scrollTo(0,a),u&&u.isConnected&&(u.scrollIntoView({block:"nearest"}),u=null)})})}}:{}}function St(){return{before({doc:e,d:t}){t.style(e.documentElement,"overflow","hidden")}}}function Dt(e){let t={};for(let n of e)Object.assign(t,n(t));return t}let S=Pe(()=>new Map,{PUSH(e,t){var n;let r=(n=this.get(e))!=null?n:{doc:e,count:0,d:oe(),meta:new Set};return r.count++,r.meta.add(t),this.set(e,r),this},POP(e,t){let n=this.get(e);return n&&(n.count--,n.meta.delete(t)),this},SCROLL_PREVENT({doc:e,d:t,meta:n}){let r={doc:e,d:t,meta:Dt(n)},o=[Mt(),Lt(),St()];o.forEach(({before:a})=>a==null?void 0:a(r)),o.forEach(({after:a})=>a==null?void 0:a(r))},SCROLL_ALLOW({d:e}){e.dispose()},TEARDOWN({doc:e}){this.delete(e)}});S.subscribe(()=>{let e=S.getSnapshot(),t=new Map;for(let[n]of e)t.set(n,n.documentElement.style.overflow);for(let n of e.values()){let r=t.get(n.doc)==="hidden",o=n.count!==0;(o&&!r||!o&&r)&&S.dispatch(n.count>0?"SCROLL_PREVENT":"SCROLL_ALLOW",n),n.count===0&&S.dispatch("TEARDOWN",n)}});function Ct(e,t,n=()=>({containers:[]})){let r=Le(S),o=t?r.get(t):void 0,a=o?o.count>0:!1;return D(()=>{if(!(!t||!e))return S.dispatch("PUSH",t,n),()=>S.dispatch("POP",t,n)},[e,t]),a}function At(e,t,n=()=>[document.body]){let r=O(e,"scroll-lock");Ct(r,t,o=>{var a;return{containers:[...(a=o.containers)!=null?a:[],n]}})}function ie(e,t){let n=s.useRef([]),r=w(e);s.useEffect(()=>{let o=[...n.current];for(let[a,u]of t.entries())if(n.current[a]!==u){let i=r(t,o);return n.current=t,i}},[r,...t])}function Nt(e){function t(){document.readyState!=="loading"&&(e(),document.removeEventListener("DOMContentLoaded",t))}typeof window<"u"&&typeof document<"u"&&(document.addEventListener("DOMContentLoaded",t),t())}let F=[];Nt(()=>{function e(t){if(!(t.target instanceof HTMLElement)||t.target===document.body||F[0]===t.target)return;let n=t.target;n=n.closest(X),F.unshift(n??t.target),F=F.filter(r=>r!=null&&r.isConnected),F.splice(10)}window.addEventListener("click",e,{capture:!0}),window.addEventListener("mousedown",e,{capture:!0}),window.addEventListener("focus",e,{capture:!0}),document.body.addEventListener("click",e,{capture:!0}),document.body.addEventListener("mousedown",e,{capture:!0}),document.body.addEventListener("focus",e,{capture:!0})});function Ae(e){let t=w(e),n=s.useRef(!1);s.useEffect(()=>(n.current=!1,()=>{n.current=!0,le(()=>{n.current&&t()})}),[t])}let Ne=s.createContext(!1);function Ot(){return s.useContext(Ne)}function ge(e){return m.createElement(Ne.Provider,{value:e.force},e.children)}function kt(e){let t=Ot(),n=s.useContext(ke),r=U(e),[o,a]=s.useState(()=>{var u;if(!t&&n!==null)return(u=n.current)!=null?u:null;if(re.isServer)return null;let i=r==null?void 0:r.getElementById("headlessui-portal-root");if(i)return i;if(r===null)return null;let l=r.createElement("div");return l.setAttribute("id","headlessui-portal-root"),r.body.appendChild(l)});return s.useEffect(()=>{o!==null&&(r!=null&&r.body.contains(o)||r==null||r.body.appendChild(o))},[o,r]),s.useEffect(()=>{t||n!==null&&a(n.current)},[n,a,t]),o}let Oe=s.Fragment,Rt=y(function(e,t){let n=e,r=s.useRef(null),o=P(Ze(c=>{r.current=c}),t),a=U(r),u=kt(r),[i]=s.useState(()=>{var c;return re.isServer?null:(c=a==null?void 0:a.createElement("div"))!=null?c:null}),l=s.useContext(ne),d=ae();return D(()=>{!u||!i||u.contains(i)||(i.setAttribute("data-headlessui-portal",""),u.appendChild(i))},[u,i]),D(()=>{if(i&&l)return l.register(i)},[l,i]),Ae(()=>{var c;!u||!i||(i instanceof Node&&u.contains(i)&&u.removeChild(i),u.childNodes.length<=0&&((c=u.parentElement)==null||c.removeChild(u)))}),d?!u||!i?null:ze.createPortal(x({ourProps:{ref:o},theirProps:n,slot:{},defaultTag:Oe,name:"Portal"}),i):null});function It(e,t){let n=P(t),{enabled:r=!0,...o}=e;return r?m.createElement(Rt,{...o,ref:n}):x({ourProps:{ref:n},theirProps:o,slot:{},defaultTag:Oe,name:"Portal"})}let Ht=s.Fragment,ke=s.createContext(null);function Wt(e,t){let{target:n,...r}=e,o={ref:P(t)};return m.createElement(ke.Provider,{value:n},x({ourProps:o,theirProps:r,defaultTag:Ht,name:"Popover.Group"}))}let ne=s.createContext(null);function _t(){let e=s.useContext(ne),t=s.useRef([]),n=w(a=>(t.current.push(a),e&&e.register(a),()=>r(a))),r=w(a=>{let u=t.current.indexOf(a);u!==-1&&t.current.splice(u,1),e&&e.unregister(a)}),o=s.useMemo(()=>({register:n,unregister:r,portals:t}),[n,r,t]);return[t,s.useMemo(()=>function({children:a}){return m.createElement(ne.Provider,{value:o},a)},[o])]}let jt=y(It),Re=y(Wt),Ut=Object.assign(jt,{Group:Re});function Bt(e,t=typeof document<"u"?document.defaultView:null,n){let r=O(e,"escape");Ce(t,"keydown",o=>{r&&(o.defaultPrevented||o.key===Fe.Escape&&n(o))})}function Vt(){var e;let[t]=s.useState(()=>typeof window<"u"&&typeof window.matchMedia=="function"?window.matchMedia("(pointer: coarse)"):null),[n,r]=s.useState((e=t==null?void 0:t.matches)!=null?e:!1);return D(()=>{if(!t)return;function o(a){r(a.matches)}return t.addEventListener("change",o),()=>t.removeEventListener("change",o)},[t]),n}function Yt({defaultContainers:e=[],portals:t,mainTreeNode:n}={}){let r=U(n),o=w(()=>{var a,u;let i=[];for(let l of e)l!==null&&(l instanceof HTMLElement?i.push(l):"current"in l&&l.current instanceof HTMLElement&&i.push(l.current));if(t!=null&&t.current)for(let l of t.current)i.push(l);for(let l of(a=r==null?void 0:r.querySelectorAll("html > *, body > *"))!=null?a:[])l!==document.body&&l!==document.head&&l instanceof HTMLElement&&l.id!=="headlessui-portal-root"&&(n&&(l.contains(n)||l.contains((u=n==null?void 0:n.getRootNode())==null?void 0:u.host))||i.some(d=>l.contains(d))||i.push(l));return i});return{resolveContainers:o,contains:w(a=>o().some(u=>u.contains(a)))}}let Ie=s.createContext(null);function we({children:e,node:t}){let[n,r]=s.useState(null),o=He(t??n);return m.createElement(Ie.Provider,{value:o},e,o===null&&m.createElement(Q,{features:G.Hidden,ref:a=>{var u,i;if(a){for(let l of(i=(u=K(a))==null?void 0:u.querySelectorAll("html > *, body > *"))!=null?i:[])if(l!==document.body&&l!==document.head&&l instanceof HTMLElement&&l!=null&&l.contains(a)){r(l);break}}}}))}function He(e=null){var t;return(t=s.useContext(Ie))!=null?t:e}var W=(e=>(e[e.Forwards=0]="Forwards",e[e.Backwards=1]="Backwards",e))(W||{});function Gt(){let e=s.useRef(0);return De(!0,"keydown",t=>{t.key==="Tab"&&(e.current=t.shiftKey?1:0)},!0),e}function We(e){if(!e)return new Set;if(typeof e=="function")return new Set(e());let t=new Set;for(let n of e.current)n.current instanceof HTMLElement&&t.add(n.current);return t}let Xt="div";var M=(e=>(e[e.None=0]="None",e[e.InitialFocus=1]="InitialFocus",e[e.TabLock=2]="TabLock",e[e.FocusLock=4]="FocusLock",e[e.RestoreFocus=8]="RestoreFocus",e[e.AutoFocus=16]="AutoFocus",e))(M||{});function qt(e,t){let n=s.useRef(null),r=P(n,t),{initialFocus:o,initialFocusFallback:a,containers:u,features:i=15,...l}=e;ae()||(i=0);let d=U(n);Jt(i,{ownerDocument:d});let c=Qt(i,{ownerDocument:d,container:n,initialFocus:o,initialFocusFallback:a});en(i,{ownerDocument:d,container:n,containers:u,previousActiveElement:c});let v=Gt(),p=w(h=>{let b=n.current;b&&(L=>L())(()=>{V(v.current,{[W.Forwards]:()=>{j(b,$.First,{skipElements:[h.relatedTarget,a]})},[W.Backwards]:()=>{j(b,$.Last,{skipElements:[h.relatedTarget,a]})}})})}),f=O(!!(i&2),"focus-trap#tab-lock"),E=Je(),k=s.useRef(!1),R={ref:r,onKeyDown(h){h.key=="Tab"&&(k.current=!0,E.requestAnimationFrame(()=>{k.current=!1}))},onBlur(h){if(!(i&4))return;let b=We(u);n.current instanceof HTMLElement&&b.add(n.current);let L=h.relatedTarget;L instanceof HTMLElement&&L.dataset.headlessuiFocusGuard!=="true"&&(_e(b,L)||(k.current?j(n.current,V(v.current,{[W.Forwards]:()=>$.Next,[W.Backwards]:()=>$.Previous})|$.WrapAround,{relativeTo:h.target}):h.target instanceof HTMLElement&&T(h.target)))}};return m.createElement(m.Fragment,null,f&&m.createElement(Q,{as:"button",type:"button","data-headlessui-focus-guard":!0,onFocus:p,features:G.Focusable}),x({ourProps:R,theirProps:l,defaultTag:Xt,name:"FocusTrap"}),f&&m.createElement(Q,{as:"button",type:"button","data-headlessui-focus-guard":!0,onFocus:p,features:G.Focusable}))}let Kt=y(qt),zt=Object.assign(Kt,{features:M});function Zt(e=!0){let t=s.useRef(F.slice());return ie(([n],[r])=>{r===!0&&n===!1&&le(()=>{t.current.splice(0)}),r===!1&&n===!0&&(t.current=F.slice())},[e,F,t]),w(()=>{var n;return(n=t.current.find(r=>r!=null&&r.isConnected))!=null?n:null})}function Jt(e,{ownerDocument:t}){let n=!!(e&8),r=Zt(n);ie(()=>{n||(t==null?void 0:t.activeElement)===(t==null?void 0:t.body)&&T(r())},[n]),Ae(()=>{n&&T(r())})}function Qt(e,{ownerDocument:t,container:n,initialFocus:r,initialFocusFallback:o}){let a=s.useRef(null),u=O(!!(e&1),"focus-trap#initial-focus"),i=ye();return ie(()=>{if(e===0)return;if(!u){o!=null&&o.current&&T(o.current);return}let l=n.current;l&&le(()=>{if(!i.current)return;let d=t==null?void 0:t.activeElement;if(r!=null&&r.current){if((r==null?void 0:r.current)===d){a.current=d;return}}else if(l.contains(d)){a.current=d;return}if(r!=null&&r.current)T(r.current);else{if(e&16){if(j(l,$.First|$.AutoFocus)!==te.Error)return}else if(j(l,$.First)!==te.Error)return;if(o!=null&&o.current&&(T(o.current),(t==null?void 0:t.activeElement)===o.current))return;console.warn("There are no focusable elements inside the <FocusTrap />")}a.current=t==null?void 0:t.activeElement})},[o,u,e]),a}function en(e,{ownerDocument:t,container:n,containers:r,previousActiveElement:o}){let a=ye(),u=!!(e&4);Ce(t==null?void 0:t.defaultView,"focus",i=>{if(!u||!a.current)return;let l=We(r);n.current instanceof HTMLElement&&l.add(n.current);let d=o.current;if(!d)return;let c=i.target;c&&c instanceof HTMLElement?_e(l,c)?(o.current=c,T(c)):(i.preventDefault(),i.stopPropagation(),T(d)):T(o.current)},!0)}function _e(e,t){for(let n of e)if(n.contains(t))return!0;return!1}var tn=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(tn||{}),nn=(e=>(e[e.SetTitleId=0]="SetTitleId",e))(nn||{});let rn={0(e,t){return e.titleId===t.id?e:{...e,titleId:t.id}}},se=s.createContext(null);se.displayName="DialogContext";function z(e){let t=s.useContext(se);if(t===null){let n=new Error(`<${e} /> is missing a parent <Dialog /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(n,z),n}return t}function on(e,t){return V(t.type,rn,e,t)}let be=y(function(e,t){let n=s.useId(),{id:r=`headlessui-dialog-${n}`,open:o,onClose:a,initialFocus:u,role:i="dialog",autoFocus:l=!0,__demoMode:d=!1,unmount:c=!1,...v}=e,p=s.useRef(!1);i=function(){return i==="dialog"||i==="alertdialog"?i:(p.current||(p.current=!0,console.warn(`Invalid role [${i}] passed to <Dialog />. Only \`dialog\` and and \`alertdialog\` are supported. Using \`dialog\` instead.`)),"dialog")}();let f=xe();o===void 0&&f!==null&&(o=(f&B.Open)===B.Open);let E=s.useRef(null),k=P(E,t),R=U(E),h=o?0:1,[b,L]=s.useReducer(on,{titleId:null,descriptionId:null,panelRef:s.createRef()}),C=w(()=>a(!1)),ce=w(g=>L({type:0,id:g})),A=ae()?h===0:!1,[Ue,Be]=_t(),Ve={get current(){var g;return(g=b.panelRef.current)!=null?g:E.current}},Z=He(),{resolveContainers:J}=Yt({mainTreeNode:Z,portals:Ue,defaultContainers:[Ve]}),de=f!==null?(f&B.Closing)===B.Closing:!1;pt(d||de?!1:A,{allowed:w(()=>{var g,me;return[(me=(g=E.current)==null?void 0:g.closest("[data-headlessui-portal]"))!=null?me:null]}),disallowed:w(()=>{var g;return[(g=Z==null?void 0:Z.closest("body > *:not(#headlessui-portal-root)"))!=null?g:null]})}),Pt(A,J,g=>{g.preventDefault(),C()}),Bt(A,R==null?void 0:R.defaultView,g=>{g.preventDefault(),g.stopPropagation(),document.activeElement&&"blur"in document.activeElement&&typeof document.activeElement.blur=="function"&&document.activeElement.blur(),C()}),At(d||de?!1:A,R,J),Qe(A,E,C);let[Ye,Ge]=lt(),Xe=s.useMemo(()=>[{dialogState:h,close:C,setTitleId:ce,unmount:c},b],[h,b,C,ce,c]),fe=s.useMemo(()=>({open:h===0}),[h]),qe={ref:k,id:r,role:i,tabIndex:-1,"aria-modal":d?void 0:h===0?!0:void 0,"aria-labelledby":b.titleId,"aria-describedby":Ye,unmount:c},Ke=!Vt(),I=M.None;return A&&!d&&(I|=M.RestoreFocus,I|=M.TabLock,l&&(I|=M.AutoFocus),Ke&&(I|=M.InitialFocus)),m.createElement(et,null,m.createElement(ge,{force:!0},m.createElement(Ut,null,m.createElement(se.Provider,{value:Xe},m.createElement(Re,{target:E},m.createElement(ge,{force:!1},m.createElement(Ge,{slot:fe},m.createElement(Be,null,m.createElement(zt,{initialFocus:u,initialFocusFallback:E,containers:J,features:I},m.createElement(dt,{value:C},x({ourProps:qe,theirProps:v,slot:fe,defaultTag:ln,features:an,visible:h===0,name:"Dialog"})))))))))))}),ln="div",an=pe.RenderStrategy|pe.Static;function un(e,t){let{transition:n=!1,open:r,...o}=e,a=xe(),u=e.hasOwnProperty("open")||a!==null,i=e.hasOwnProperty("onClose");if(!u&&!i)throw new Error("You have to provide an `open` and an `onClose` prop to the `Dialog` component.");if(!u)throw new Error("You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.");if(!i)throw new Error("You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.");if(!a&&typeof e.open!="boolean")throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${e.open}`);if(typeof e.onClose!="function")throw new Error(`You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${e.onClose}`);return(r!==void 0||n)&&!o.static?m.createElement(we,null,m.createElement($e,{show:r,transition:n,unmount:o.unmount},m.createElement(be,{ref:t,...o}))):m.createElement(we,null,m.createElement(be,{ref:t,open:r,...o}))}let sn="div";function cn(e,t){let n=s.useId(),{id:r=`headlessui-dialog-panel-${n}`,transition:o=!1,...a}=e,[{dialogState:u,unmount:i},l]=z("Dialog.Panel"),d=P(t,l.panelRef),c=s.useMemo(()=>({open:u===0}),[u]),v=w(f=>{f.stopPropagation()}),p={ref:d,id:r,onClick:v};return m.createElement(o?Y:s.Fragment,{...o?{unmount:i}:{}},x({ourProps:p,theirProps:a,slot:c,defaultTag:sn,name:"Dialog.Panel"}))}let dn="div";function fn(e,t){let{transition:n=!1,...r}=e,[{dialogState:o,unmount:a}]=z("Dialog.Backdrop"),u=s.useMemo(()=>({open:o===0}),[o]),i={ref:t,"aria-hidden":!0};return m.createElement(n?Y:s.Fragment,{...n?{unmount:a}:{}},x({ourProps:i,theirProps:r,slot:u,defaultTag:dn,name:"Dialog.Backdrop"}))}let mn="h2";function pn(e,t){let n=s.useId(),{id:r=`headlessui-dialog-title-${n}`,...o}=e,[{dialogState:a,setTitleId:u}]=z("Dialog.Title"),i=P(t);s.useEffect(()=>(u(r),()=>u(null)),[r,u]);let l=s.useMemo(()=>({open:a===0}),[a]);return x({ourProps:{ref:i,id:r},theirProps:o,slot:l,defaultTag:mn,name:"Dialog.Title"})}let vn=y(un),je=y(cn);y(fn);let hn=y(pn),En=Object.assign(vn,{Panel:je,Title:hn,Description:st});function yn({children:e,show:t=!1,maxWidth:n="2xl",closeable:r=!0,onClose:o=()=>{}}){const a=()=>{r&&o()},u={sm:"sm:max-w-sm",md:"sm:max-w-md",lg:"sm:max-w-lg",xl:"sm:max-w-xl","2xl":"sm:max-w-2xl","4xl":"sm:max-w-4xl","6xl":"sm:max-w-6xl","8xl":"sm:max-w-8xl"}[n];return N.jsx($e,{show:t,leave:"duration-200",children:N.jsxs(En,{as:"div",id:"modal",className:"fixed inset-0 flex overflow-y-auto px-4 py-6 sm:px-0 items-center z-50 transform transition-all",onClose:a,children:[N.jsx(Y,{enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:N.jsx("div",{className:"absolute inset-0 bg-gray-500/75 dark:bg-gray-900/75"})}),N.jsx(Y,{enter:"ease-out duration-300",enterFrom:"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",enterTo:"opacity-100 translate-y-0 sm:scale-100",leave:"ease-in duration-200",leaveFrom:"opacity-100 translate-y-0 sm:scale-100",leaveTo:"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",children:N.jsx(je,{className:`mb-6 bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-xl transform transition-all w-full sm:mx-auto ${u}`,children:e})})]})})}export{yn as M};