import{W as p,j as e}from"./app-DZ-gaT6x.js";import{I as l}from"./InputError-Bk9hHI97.js";import{I as m}from"./InputLabel-BCqzx3Zs.js";import{P as y}from"./PrimaryButton-BpQ8qfkY.js";import{S as x}from"./SecondaryButton-CYrCM_Sf.js";import{T as u}from"./TextInput-DrPUnK-m.js";import{n as f}from"./index-BlFDnZGx.js";function _({destroyRibbon:s,closeModal:r=()=>{}}){const{data:a,setData:d,put:n,errors:o,processing:i}=p({destroyed_at:s.destroyed_at,qty:s.qty}),c=t=>{t.preventDefault(),n(route("destroy-ribbon.update",s.id),{onSuccess:()=>{r(),f.success("Destroy ribbon updated successfully.",{position:"top-right",duration:3e3})}})};return e.jsxs("div",{className:"w-full bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6",children:[e.jsx("h3",{className:"mb-4 text-lg dark:text-gray-100",children:"Edit Destroy Ribbon"}),e.jsxs("form",{onSubmit:c,className:"space-y-6",children:[e.jsxs("div",{children:[e.jsx(m,{htmlFor:"destroyed_at",value:"Destroyed date"}),e.jsx(u,{id:"destroyed_at",className:"mt-1 block w-full",required:!0,defaultValue:a.destroyed_at,onChange:t=>d("destroyed_at",t.target.value),isFocused:!0,type:"date"}),e.jsx(l,{className:"mt-2",message:o.destroyed_at})]}),e.jsxs("div",{children:[e.jsx(m,{htmlFor:"qty",value:"QTY"}),e.jsx(u,{id:"qty",type:"number",className:"mt-1 block w-full",required:!0,defaultValue:a.qty,onChange:t=>d("qty",t.target.value)}),e.jsx(l,{className:"mt-2",message:o.qty})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(y,{disabled:i,children:"Update"}),e.jsx(x,{disabled:i,onClick:r,children:"Cancel"})]})]})]})}export{_ as default};
