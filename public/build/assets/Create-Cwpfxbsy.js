import{W as b,j as e}from"./app-Co-jrZwb.js";import{I as l}from"./InputError-CMvzJ-sj.js";import{I as i}from"./InputLabel-DliwoM6Y.js";import{P as x}from"./PrimaryButton-6vJSF3v2.js";import{S as f}from"./SecondaryButton-yFgP5oKn.js";import{T as m}from"./TextInput-qkPPC6Xe.js";import{n as g}from"./index-CX2DJngn.js";function _({userId:u,closeModal:r=()=>{}}){var s=new Date;s.setDate(s.getDate());var c=s.toISOString().substring(0,10);const{data:a,setData:o,post:y,errors:d,processing:n}=b({destroyed_at:c,destroyed_by:u,qty:1}),p=t=>{t.preventDefault(),y(route("destroy-ribbon.store"),{onSuccess:()=>{r(),g.success("New destroy ribbon created successfully.",{position:"top-right",duration:3e3})}})};return e.jsxs("div",{className:"w-full bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6",children:[e.jsx("h3",{className:"mb-4 text-lg dark:text-gray-100",children:"New Destroy Ribbon"}),e.jsxs("form",{onSubmit:p,className:"space-y-6",children:[e.jsxs("div",{children:[e.jsx(i,{htmlFor:"destroyed_at",value:"Destroyed date"}),e.jsx(m,{id:"destroyed_at",className:"mt-1 block w-full",defaultValue:a.destroyed_at,onChange:t=>o("destroyed_at",t.target.value),type:"date",onKeyDown:t=>t.preventDefault()}),e.jsx(l,{className:"mt-2",message:d.destroyed_at})]}),e.jsxs("div",{children:[e.jsx(i,{htmlFor:"qty",value:"QTY"}),e.jsx(m,{id:"qty",type:"number",className:"mt-1 block w-full",defaultValue:a.qty,onChange:t=>o("qty",t.target.value)}),e.jsx(l,{className:"mt-2",message:d.qty})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(x,{disabled:n,children:"Save"}),e.jsx(f,{disabled:n,onClick:r,children:"Cancel"})]})]})]})}export{_ as default};
