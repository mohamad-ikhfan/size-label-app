import{r,j as e,Y as w,y as u}from"./app-HWkxxKU5.js";import{M as k}from"./Modal-BYB44Cga.js";import{F as v,a as y,P as M}from"./Pagination-zVFsw3Z9.js";import{P as U}from"./PrimaryButton-Bjy3hJVY.js";import{S as C}from"./SelectInput-BHi968BA.js";import{T as a}from"./TableHeading-C3e8glMq.js";import{T as g}from"./TextInput-BfYGk2LL.js";import{A as E}from"./AuthenticatedLayout-Cyblz5e0.js";import S from"./Create-DVjzvqIp.js";import R from"./Delete-DWkuUpEX.js";import B from"./Edit-DHrsrWk1.js";import F from"./Show-Bzmlc_gb.js";import"./transition-CMtolyNB.js";import"./ApplicationLogo-BM1mhOMZ.js";import"./index-CENE42Aw.js";import"./InputError-BTgG0eOk.js";import"./InputLabel-ZRf2dIRD.js";import"./SecondaryButton-CIvzJTjd.js";function K({title:h,titleId:l,...s},d){return r.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:d,"aria-labelledby":l},s),h?r.createElement("title",{id:l},h):null,r.createElement("path",{d:"M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"}),r.createElement("path",{fillRule:"evenodd",d:"M1.38 8.28a.87.87 0 0 1 0-.566 7.003 7.003 0 0 1 13.238.006.87.87 0 0 1 0 .566A7.003 7.003 0 0 1 1.379 8.28ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",clipRule:"evenodd"}))}const T=r.forwardRef(K);function ee({auth:h,users:l,queryParams:s=null}){s=s||{};const d=(t,o)=>{o?s[t]=o:delete s[t],u.get(route("user.index"),s)},i=t=>{t===s.sort_field?s.sort_direction==="asc"?s.sort_direction="desc":s.sort_direction="asc":(s.sort_field=t,s.sort_direction="asc"),u.get(route("user.index"),s)},f=(t,o)=>{o.key==="Enter"&&d(t,o.target.value)},[_,c]=r.useState(!1),[n,x]=r.useState(""),[j,p]=r.useState({}),N=()=>{c(!0),x("create")},m=()=>{c(!1),x(""),p({})};return e.jsxs(E,{user:h.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight",children:"Users"}),children:[e.jsx(w,{title:"Users"}),e.jsxs("div",{className:"pb-12 pt-6",children:[e.jsxs("div",{className:"max-w-full mx-auto sm:px-4 lg:px-6",children:[e.jsx("div",{className:"mb-6 flex justify-end",children:e.jsx(U,{type:"button",onClick:N,children:"New User"})}),e.jsx("div",{className:"bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg",children:e.jsxs("div",{className:"w-full p-6 overflow-auto",children:[e.jsxs("table",{className:"w-full text-left text-gray-500 dark:text-gray-400",children:[e.jsxs("thead",{className:"text-gray-700 bg-gray-50 dark:bg-slate-700 dark:text-gray-400 border-b-2 border-gray-500 uppercase",children:[e.jsxs("tr",{className:"text-nowrap",children:[e.jsx(a,{sortable:!1,children:"#"}),e.jsx(a,{name:"full_name",sort_field:s.sort_field,sort_direction:s.sort_direction,sortChanged:i,children:"full name"}),e.jsx(a,{name:"name",sort_field:s.sort_field,sort_direction:s.sort_direction,sortChanged:i,children:"name"}),e.jsx(a,{name:"email",sort_field:s.sort_field,sort_direction:s.sort_direction,sortChanged:i,children:"email"}),e.jsx(a,{name:"blocked",sort_field:s.sort_field,sort_direction:s.sort_direction,sortChanged:i,children:"blocked"}),e.jsx(a,{name:"created_at",sort_field:s.sort_field,sort_direction:s.sort_direction,sortChanged:i,children:"created at"}),e.jsx(a,{name:"updated_at",sort_field:s.sort_field,sort_direction:s.sort_direction,sortChanged:i,children:"updated at"}),e.jsx(a,{sortable:!1,children:"actions"})]}),l.data.length>0&&e.jsxs("tr",{className:"text-nowrap",children:[e.jsx("th",{className:"px-3 pb-2"}),e.jsx("th",{className:"px-3 pb-2",children:e.jsx(g,{className:"w-full",type:"search",defaultValue:s.full_name,placeholder:"search...",onBlur:t=>d("full_name",t.target.value),onKeyPress:t=>f("full_name",t)})}),e.jsx("th",{className:"px-3 pb-2",children:e.jsx(g,{className:"w-full",type:"search",defaultValue:s.name,placeholder:"search...",onBlur:t=>d("name",t.target.value),onKeyPress:t=>f("name",t)})}),e.jsx("th",{className:"px-3 pb-2",children:e.jsx(g,{className:"w-full",type:"search",defaultValue:s.email,placeholder:"search...",onBlur:t=>d("email",t.target.value),onKeyPress:t=>f("email",t)})}),e.jsx("th",{className:"px-3 pb-2",children:e.jsxs(C,{className:"w-full",defaultValue:s.blocked,onChange:t=>d("blocked",t.target.value),children:[e.jsx("option",{value:"",children:"show all"}),e.jsx("option",{value:!0,children:"Blocked"}),e.jsx("option",{value:!1,children:"Unblocked"})]})}),e.jsx("th",{className:"px-3 pb-2"}),e.jsx("th",{className:"px-3 pb-2"}),e.jsx("th",{className:"px-3 pb-2"})]})]}),e.jsx("tbody",{children:l.data.length>0?l.data.map((t,o)=>e.jsxs("tr",{className:"bg-white border-b dark:bg-gray-800 dark:border-gray-700",children:[e.jsx("td",{className:"px-3 py-2",children:++o}),e.jsx("td",{className:"px-3 py-2",children:t.full_name}),e.jsx("td",{className:"px-3 py-2",children:t.name}),e.jsx("td",{className:"px-3 py-2",children:t.email}),e.jsx("td",{className:"px-3 py-2",children:t.blocked}),e.jsx("td",{className:"px-3 py-2",children:t.created_at}),e.jsx("td",{className:"px-3 py-2",children:t.updated_at}),e.jsx("td",{children:e.jsxs("div",{className:"px-3 py-2 flex gap-1.5",children:[e.jsx(T,{className:"w-5 text-gray-500 cursor-pointer",title:"show",onClick:b=>{p(t),c(!0),x("show")}}),e.jsx(v,{className:"w-5 text-yellow-500 cursor-pointer",title:"edit",onClick:b=>{p(t),c(!0),x("edit")}}),e.jsx(y,{className:"w-5 text-red-500 cursor-pointer",title:"delete",onClick:b=>{p(t),c(!0),x("delete")}})]})})]},t.id)):e.jsx("tr",{className:"bg-white border-b dark:bg-gray-800 dark:border-gray-700",children:e.jsx("td",{colSpan:7,className:"text-center px-3 py-2",children:"No data found."})})})]}),l.data.length>0&&e.jsx(M,{links:l.meta.links})]})})]}),e.jsxs(k,{show:_,maxWidth:n==="delete"?"sm":"xl",children:[n==="create"&&e.jsx(S,{closeModal:m}),n==="show"&&e.jsx(F,{user:j,closeModal:m}),n==="edit"&&e.jsx(B,{user:j,closeModal:m}),n==="delete"&&e.jsx(R,{user:j,closeModal:m})]})]})]})}export{ee as default};