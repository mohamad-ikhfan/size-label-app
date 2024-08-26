import{r as o,j as e,Y as k,y as u}from"./app-CqdcC8ud.js";import{M as _}from"./Modal-UVItq_0S.js";import{F as v,a as C,P as M}from"./Pagination-D2Szu4zu.js";import{P as j}from"./PrimaryButton-CvU740dd.js";import{A as F}from"./AuthenticatedLayout-DC6XpDLc.js";import I from"./Create-hLeJmLUz.js";import D from"./Delete-BUK9g5wC.js";import A from"./Edit-BL1fGaMe.js";import E from"./Generate-XriOD3VB.js";import{S as R}from"./SecondaryButton-CQYeSItG.js";import{_ as T}from"./index-DaC9Tzu5.js";import{S as z}from"./SelectInput-D1teEjQ_.js";import{I as B}from"./InputLabel-CgN8oIGJ.js";import G from"./Printing-F6fi1eJY.js";import"./transition-BY_BE_2Q.js";import"./ApplicationLogo-D1noIanB.js";import"./InputError-Bz0KU23F.js";import"./TextInput-Pu_IN4Wz.js";function ae({auth:x,schedulePrints:d,users:h,queryParams:a=null}){a=a||{};const[f,r]=o.useState(!1),[s,l]=o.useState(""),[p,c]=o.useState({}),g=(t,i)=>{i?a[t]=i:delete a[t],u.get(route("schedule-print.index"),a)},y=t=>new Intl.NumberFormat("en-IN").format(t),N=()=>{r(!0),l("create")},b=()=>{r(!0),l("generate")},n=()=>{r(!1),l(""),c({})},[S,m]=o.useState(!1),w=t=>{m(!0),t.preventDefault(),confirm("Are you sure sync to printed?")?u.post(route("schedule-print.sync-to-printed"),[],{onSuccess:()=>{m(!1),T.success("Sync to printed successfully.",{position:"top-right",duration:3e3})}}):m(!1)};return e.jsxs(F,{user:x.user,header:e.jsx("h2",{className:"font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight",children:"Schedule prints"}),children:[e.jsx(k,{title:"Schedule Prints"}),e.jsxs("div",{className:"pb-12 pt-6",children:[e.jsxs("div",{className:"max-w-full mx-auto sm:px-4 lg:px-6",children:[e.jsxs("div",{className:"mb-6 flex justify-end gap-4",children:[e.jsx(R,{type:"button",disabled:S,onClick:t=>w(t),children:"Sync to printed"}),e.jsx(j,{type:"button",onClick:b,children:"Generate schedule print"}),e.jsx(j,{type:"button",onClick:N,children:"New schedule print"})]}),e.jsxs("div",{className:"bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg",children:[e.jsx("div",{className:"flex justify-end p-6",children:e.jsxs("div",{className:"flex gap-4",children:[e.jsx(B,{htmlFor:"status",value:"Status Filter"}),e.jsxs(z,{className:"w-full",defaultValue:a.status??"printing",onChange:t=>g("status",t.target.value),children:[e.jsx("option",{value:"printed",children:"printed"}),e.jsx("option",{value:"printing",children:"printing"})]})]})}),e.jsxs("div",{className:"w-full p-6 overflow-auto",children:[e.jsxs("table",{className:"w-full text-left text-gray-500 dark:text-gray-400",children:[e.jsx("thead",{className:"text-gray-700 bg-gray-50 dark:bg-slate-700 dark:text-gray-400 border-b-2 border-gray-500 uppercase",children:e.jsxs("tr",{className:"text-nowrap",children:[e.jsx("th",{className:"p-3",children:"line"}),e.jsx("th",{className:"p-3",children:"schedule"}),e.jsx("th",{className:"p-3",children:"release"}),e.jsx("th",{className:"p-3",children:"style number"}),e.jsx("th",{className:"p-3",children:"model name"}),e.jsx("th",{className:"p-3",children:"qty"}),e.jsx("th",{className:"p-3",children:"material type"}),e.jsx("th",{className:"p-3",children:"material size"}),e.jsx("th",{className:"p-3",children:"status"}),e.jsx("th",{className:"p-3",children:"printed by"}),e.jsx("th",{className:"p-3",children:"actions"})]})}),e.jsx("tbody",{children:d.data.length>0?d.data.map(t=>e.jsxs("tr",{className:"bg-white border-b dark:bg-gray-800 dark:border-gray-700",children:[e.jsx("td",{className:"px-3 py-2",children:t.line}),e.jsx("td",{className:"px-3 py-2",children:t.schedule_format}),e.jsx("td",{className:"px-3 py-2",children:t.release_format}),e.jsx("td",{className:"px-3 py-2",children:t.style_number}),e.jsx("td",{className:"px-3 py-2",children:t.model_name}),e.jsx("td",{className:"px-3 py-2",children:y(t.qty)}),e.jsx("td",{className:"px-3 py-2",children:t.model_for_material_type}),e.jsx("td",{className:"px-3 py-2",children:t.model_for_material_size}),e.jsx("td",{className:"px-3 py-2",children:t.status}),e.jsx("td",{className:"px-3 py-2",children:t.status_updated_by_name}),e.jsx("td",{children:e.jsxs("div",{className:"px-3 py-2 flex gap-1.5",children:[t.status===null&&e.jsx("span",{className:"cursor-pointer text-sm  text-blue-800",onClick:i=>{c(t),r(!0),l("printing")},children:"Printing"}),e.jsx(v,{className:"w-5 text-yellow-500 cursor-pointer",title:"edit",onClick:i=>{c(t),r(!0),l("edit")}}),e.jsx(C,{className:"w-5 text-red-500 cursor-pointer",title:"delete",onClick:i=>{c(t),r(!0),l("delete")}})]})})]},t.id)):e.jsx("tr",{className:"bg-white border-b dark:bg-gray-800 dark:border-gray-700",children:e.jsx("td",{colSpan:11,className:"text-center p-3",children:"No data found."})})})]}),d.data.length>0&&e.jsx(M,{links:d.meta.links})]})]})]}),e.jsxs(_,{show:f,maxWidth:s==="delete"||s==="generate"||s==="printing"?"sm":"6xl",children:[s==="create"&&e.jsx(I,{users:h,closeModal:n}),s==="edit"&&e.jsx(A,{users:h,schedulePrint:p,closeModal:n}),s==="delete"&&e.jsx(D,{schedulePrint:p,closeModal:n}),s==="generate"&&e.jsx(E,{closeModal:n}),s==="printing"&&e.jsx(G,{user:x.user,schedulePrint:p,closeModal:n})]})]})]})}export{ae as default};
