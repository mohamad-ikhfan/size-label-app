import{W as x,j as e}from"./app-BPfiMoID.js";import{I as r}from"./InputError-BUB9jcMo.js";import{I as m}from"./InputLabel-DcD9WwI1.js";import{P as p}from"./PrimaryButton-Bs1MwrJz.js";import{S as h}from"./SecondaryButton-BMEX_pKc.js";import{S as d}from"./SelectInput-oGijC9Em.js";import{T as j}from"./TextInput-c7cC8ozs.js";import{n as v}from"./index-CGpWB5Bp.js";function b({modelForMaterial:l,closeModal:o=()=>{}}){const{data:s,setData:t,put:u,errors:i,processing:n}=x({model_name:l.model_name,material_type:l.material_type,material_size:l.material_size,wide:l.wide}),c=a=>{a.preventDefault(),u(route("model-for-material.update",l.id),{onSuccess:()=>{o(),v.success("Model for material updated successfully.",{position:"top-right",duration:3e3})}})};return e.jsxs("div",{className:"w-full bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6",children:[e.jsx("h3",{className:"mb-4 text-lg dark:text-gray-100",children:"Edit Model For Material"}),e.jsxs("form",{onSubmit:c,className:"space-y-6",children:[e.jsxs("div",{className:"grid grid-cols-2 gap-6",children:[e.jsxs("div",{children:[e.jsx(m,{htmlFor:"model_name",value:"Model name"}),e.jsx(j,{id:"model_name",type:"text",className:"mt-1 block w-full",required:!0,defaultValue:s.model_name,onChange:a=>t("model_name",a.target.value)}),e.jsx(r,{className:"mt-2",message:i.model_name})]}),e.jsxs("div",{children:[e.jsx(m,{htmlFor:"material_type",value:"Material type"}),e.jsxs(d,{id:"material_type",className:"mt-1 block w-full",required:!0,defaultValue:s.material_type,onChange:a=>t("material_type",a.target.value),children:[e.jsx("option",{value:"",children:"Select material type"}),e.jsx("option",{value:"Heatseal",children:"Heatseal"}),e.jsx("option",{value:"Poliyester",children:"Poliyester"})]}),e.jsx(r,{className:"mt-2",message:i.material_type})]}),e.jsxs("div",{children:[e.jsx(m,{htmlFor:"material_size",value:"Material size"}),e.jsxs(d,{id:"material_size",className:"mt-1 block w-full",required:!0,defaultValue:s.material_size,onChange:a=>t("material_size",a.target.value),children:[e.jsx("option",{value:"",children:"Select material size"}),e.jsx("option",{value:"BIG (35x33)",children:"BIG (35x33)"}),e.jsx("option",{value:"SMALL (30x33)",children:"SMALL (30x33)"}),e.jsx("option",{value:"BIG (35x33) & SMALL (30x33)",children:"BIG (35x33) & SMALL (30x33)"}),e.jsx("option",{value:"SMALL (30x21)",children:"SMALL (30x21)"})]}),e.jsx(r,{className:"mt-2",message:i.material_size})]}),e.jsxs("div",{children:[e.jsx(m,{htmlFor:"wide",value:"Wide"}),e.jsxs(d,{id:"wide",className:"mt-1 block w-full",required:!0,defaultValue:s.wide,onChange:a=>t("wide",a.target.value),children:[e.jsx("option",{value:"1",children:"Yes"}),e.jsx("option",{value:"0",children:"No"})]}),e.jsx(r,{className:"mt-2",message:i.wide})]})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(p,{disabled:n,children:"Update"}),e.jsx(h,{disabled:n,onClick:o,children:"Cancel"})]})]})]})}export{b as default};