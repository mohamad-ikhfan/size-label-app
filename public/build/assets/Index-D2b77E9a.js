import{r as f,j as e,Y as w,y as g}from"./app-BPfiMoID.js";import{M}from"./Modal-CDJ3hgA-.js";import{F as k,a as y,P as v}from"./Pagination-DTpvpuhp.js";import{P as S}from"./PrimaryButton-Bs1MwrJz.js";import{T as r}from"./TableHeading-HA4cUrB4.js";import{T as m}from"./TextInput-c7cC8ozs.js";import{A as C}from"./AuthenticatedLayout-CrOOUyAK.js";import B from"./Create-LuiV3yGc.js";import E from"./Edit-sZKIpTnC.js";import F from"./Delete-Cm2JGug2.js";import"./transition-BCfBU8HU.js";import"./ApplicationLogo-Bd9uUIQY.js";import"./index-CGpWB5Bp.js";import"./InputError-BUB9jcMo.js";import"./InputLabel-DcD9WwI1.js";import"./SecondaryButton-BMEX_pKc.js";function Q({auth:N,materials:l,queryParams:s=null}){s=s||{};const i=(t,a)=>{a?s[t]=a:delete s[t],g.get(route("material.index"),s)},d=t=>{t===s.sort_field?s.sort_direction==="asc"?s.sort_direction="desc":s.sort_direction="asc":(s.sort_field=t,s.sort_direction="asc"),g.get(route("material.index"),s)},p=(t,a)=>{a.key==="Enter"&&i(t,a.target.value)},[b,c]=f.useState(!1),[o,n]=f.useState(""),[h,j]=f.useState({}),_=()=>{c(!0),n("create")},x=()=>{c(!1),n(""),j({})};return e.jsxs(C,{user:N.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight",children:"Materials"}),children:[e.jsx(w,{title:"Materials"}),e.jsxs("div",{className:"pb-12 pt-6",children:[e.jsxs("div",{className:"max-w-full mx-auto sm:px-4 lg:px-6",children:[e.jsx("div",{className:"mb-6 flex justify-end",children:e.jsx(S,{type:"button",onClick:_,children:"New Material"})}),e.jsx("div",{className:"bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg",children:e.jsxs("div",{className:"w-full p-6 overflow-auto",children:[e.jsxs("table",{className:"w-full text-left text-gray-500 dark:text-gray-400",children:[e.jsxs("thead",{className:"text-gray-700 bg-gray-50 dark:bg-slate-700 dark:text-gray-400 border-b-2 border-gray-500 uppercase",children:[e.jsxs("tr",{className:"text-nowrap",children:[e.jsx(r,{sortable:!1,children:"#"}),e.jsx(r,{name:"code",sort_field:s.sort_field,sort_direction:s.sort_direction,sortChanged:d,children:"code"}),e.jsx(r,{name:"name",sort_field:s.sort_field,sort_direction:s.sort_direction,sortChanged:d,children:"name"}),e.jsx(r,{name:"description",sort_field:s.sort_field,sort_direction:s.sort_direction,sortChanged:d,children:"description"}),e.jsx(r,{name:"created_at",sort_field:s.sort_field,sort_direction:s.sort_direction,sortChanged:d,children:"created at"}),e.jsx(r,{name:"updated_at",sort_field:s.sort_field,sort_direction:s.sort_direction,sortChanged:d,children:"updated at"}),e.jsx(r,{sortable:!1,children:"actions"})]}),l.data.length>0&&e.jsxs("tr",{className:"text-nowrap",children:[e.jsx("th",{className:"px-3 pb-2"}),e.jsx("th",{className:"px-3 pb-2",children:e.jsx(m,{className:"w-full",type:"search",defaultValue:s.code,placeholder:"search...",onBlur:t=>i("code",t.target.value),onKeyPress:t=>p("code",t)})}),e.jsx("th",{className:"px-3 pb-2",children:e.jsx(m,{className:"w-full",type:"search",defaultValue:s.name,placeholder:"search...",onBlur:t=>i("name",t.target.value),onKeyPress:t=>p("name",t)})}),e.jsx("th",{className:"px-3 pb-2",children:e.jsx(m,{className:"w-full",type:"search",defaultValue:s.description,placeholder:"search...",onBlur:t=>i("description",t.target.value),onKeyPress:t=>p("description",t)})}),e.jsx("th",{className:"px-3 pb-2"}),e.jsx("th",{className:"px-3 pb-2"}),e.jsx("th",{className:"px-3 pb-2"})]})]}),e.jsx("tbody",{children:l.data.length>0?l.data.map((t,a)=>e.jsxs("tr",{className:"bg-white border-b dark:bg-gray-800 dark:border-gray-700",children:[e.jsx("td",{className:"px-3 py-2",children:++a}),e.jsx("td",{className:"px-3 py-2",children:t.code}),e.jsx("td",{className:"px-3 py-2",children:t.name}),e.jsx("td",{className:"px-3 py-2",children:t.description}),e.jsx("td",{className:"px-3 py-2",children:t.created_at}),e.jsx("td",{className:"px-3 py-2",children:t.updated_at}),e.jsx("td",{children:e.jsxs("div",{className:"px-3 py-2 flex gap-1.5",children:[e.jsx(k,{className:"w-5 text-yellow-500 cursor-pointer",title:"edit",onClick:u=>{j(t),c(!0),n("edit")}}),e.jsx(y,{className:"w-5 text-red-500 cursor-pointer",title:"delete",onClick:u=>{j(t),c(!0),n("delete")}})]})})]},t.id)):e.jsx("tr",{className:"bg-white border-b dark:bg-gray-800 dark:border-gray-700",children:e.jsx("td",{colSpan:7,className:"text-center px-3 py-2",children:"No data found."})})})]}),l.data.length>0&&e.jsx(v,{links:l.meta.links})]})})]}),e.jsxs(M,{show:b,maxWidth:o==="delete"?"sm":"xl",children:[o==="create"&&e.jsx(B,{closeModal:x}),o==="show"&&e.jsx(MaterialShow,{user:h,closeModal:x}),o==="edit"&&e.jsx(E,{material:h,closeModal:x}),o==="delete"&&e.jsx(F,{material:h,closeModal:x})]})]})]})}export{Q as default};