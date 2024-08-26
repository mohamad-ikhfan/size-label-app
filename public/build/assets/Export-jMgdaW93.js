import{W as b,j as e,b as f}from"./app-HWkxxKU5.js";import{I as l}from"./InputError-BTgG0eOk.js";import{I as i}from"./InputLabel-ZRf2dIRD.js";import{P as h}from"./PrimaryButton-Bjy3hJVY.js";import{S as y}from"./SecondaryButton-CIvzJTjd.js";import{T as m}from"./TextInput-BfYGk2LL.js";import{n as j}from"./index-CENE42Aw.js";function k({closeModal:a=()=>{}}){const{data:r,setData:s,post:c,errors:d,processing:n}=b({from_date:"",to_date:""}),u=t=>{t.preventDefault(),c(route("destroy-ribbon.export"),{onSuccess:async()=>{await f({url:route("destroy-ribbon.download"),method:"GET",responseType:"blob"}).then(p=>{const x=window.URL.createObjectURL(new Blob([p.data])),o=document.createElement("a");o.href=x,o.setAttribute("download","export_destroy_ribbon.xlsx"),document.body.appendChild(o),o.click()}).finally(()=>{a(),j.success("Export destroy ribbon created successfully.",{position:"top-right",duration:3e3})})}})};return e.jsxs("div",{className:"w-full bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6",children:[e.jsx("h3",{className:"mb-4 text-lg dark:text-gray-100",children:"Export Destroy Ribbon"}),e.jsxs("form",{onSubmit:u,className:"space-y-6",children:[e.jsxs("div",{children:[e.jsx(i,{htmlFor:"from_date",value:"From date"}),e.jsx(m,{id:"from_date",className:"mt-1 block w-full",defaultValue:r.from_date,onChange:t=>s("from_date",t.target.value),type:"date",onKeyDown:t=>t.preventDefault()}),e.jsx(l,{className:"mt-2",message:d.from_date})]}),e.jsxs("div",{children:[e.jsx(i,{htmlFor:"to_date",value:"To date"}),e.jsx(m,{id:"to_date",className:"mt-1 block w-full",defaultValue:r.to_date,onChange:t=>s("to_date",t.target.value),type:"date",onKeyDown:t=>t.preventDefault()}),e.jsx(l,{className:"mt-2",message:d.to_date})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(h,{disabled:n,children:"Export"}),e.jsx(y,{disabled:n,onClick:a,children:"Cancel"})]})]})]})}export{k as default};