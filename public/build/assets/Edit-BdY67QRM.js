import{W as x,j as e}from"./app-HWkxxKU5.js";import{I as r}from"./InputError-BTgG0eOk.js";import{I as m}from"./InputLabel-ZRf2dIRD.js";import{P as p}from"./PrimaryButton-Bjy3hJVY.js";import{S as h}from"./SecondaryButton-CIvzJTjd.js";import{S as o}from"./SelectInput-BHi968BA.js";import{T as j}from"./TextInput-BfYGk2LL.js";import{n as v}from"./index-CENE42Aw.js";function b({modelForMaterial:l,closeModal:d=()=>{}}){const{data:s,setData:t,put:c,errors:i,processing:n}=x({model_name:l.model_name,material_type:l.material_type,material_size:l.material_size,wide:l.wide}),u=a=>{a.preventDefault(),c(route("model-for-material.update",l.id),{onSuccess:()=>{d(),v.success("Model for material updated successfully.",{position:"top-right",duration:3e3})}})};return e.jsxs("div",{className:"w-full bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6",children:[e.jsx("h3",{className:"mb-4 text-lg dark:text-gray-100",children:"Edit Model For Material"}),e.jsxs("form",{onSubmit:u,className:"space-y-6",children:[e.jsxs("div",{className:"grid grid-cols-2 gap-6",children:[e.jsxs("div",{children:[e.jsx(m,{htmlFor:"model_name",value:"Model name"}),e.jsx(j,{id:"model_name",type:"text",className:"mt-1 block w-full",defaultValue:s.model_name,onChange:a=>t("model_name",a.target.value)}),e.jsx(r,{className:"mt-2",message:i.model_name})]}),e.jsxs("div",{children:[e.jsx(m,{htmlFor:"material_type",value:"Material type"}),e.jsxs(o,{id:"material_type",className:"mt-1 block w-full",defaultValue:s.material_type,onChange:a=>t("material_type",a.target.value),children:[e.jsx("option",{value:"",children:"Select material type"}),e.jsx("option",{value:"Heatseal",children:"Heatseal"}),e.jsx("option",{value:"Poliyester",children:"Poliyester"})]}),e.jsx(r,{className:"mt-2",message:i.material_type})]}),e.jsxs("div",{children:[e.jsx(m,{htmlFor:"material_size",value:"Material size"}),e.jsxs(o,{id:"material_size",className:"mt-1 block w-full",defaultValue:s.material_size,onChange:a=>t("material_size",a.target.value),children:[e.jsx("option",{value:"",children:"Select material size"}),e.jsx("option",{value:"BIG (35x33)",children:"BIG (35x33)"}),e.jsx("option",{value:"SMALL (30x33)",children:"SMALL (30x33)"}),e.jsx("option",{value:"BIG (35x33) & SMALL (30x33)",children:"BIG (35x33) & SMALL (30x33)"}),e.jsx("option",{value:"SMALL (30x21)",children:"SMALL (30x21)"})]}),e.jsx(r,{className:"mt-2",message:i.material_size})]}),e.jsxs("div",{children:[e.jsx(m,{htmlFor:"wide",value:"Wide"}),e.jsxs(o,{id:"wide",className:"mt-1 block w-full",defaultValue:s.wide,onChange:a=>t("wide",a.target.value),children:[e.jsx("option",{value:"1",children:"Yes"}),e.jsx("option",{value:"0",children:"No"})]}),e.jsx(r,{className:"mt-2",message:i.wide})]})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(p,{disabled:n,children:"Update"}),e.jsx(h,{disabled:n,onClick:d,children:"Cancel"})]})]})]})}export{b as default};