import{r as l,j as e,y as n}from"./app-CqdcC8ud.js";import{P as d}from"./PrimaryButton-CvU740dd.js";import{S as c}from"./SecondaryButton-CQYeSItG.js";import{n as m}from"./index-DaC9Tzu5.js";function h({material:s,closeModal:t=()=>{}}){const[r,a]=l.useState(!1),i=o=>{a(!0),o.preventDefault(),n.delete(route("material.destroy",s.id),{onSuccess:()=>{a(!1),t(),m.success("Material deleted successfully.",{position:"top-right",duration:3e3})}})};return e.jsxs("div",{className:"w-full bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6",children:[e.jsxs("h3",{className:"dark:text-gray-100 text-lg text-center mb-6",children:["Are you sure to delete this material"," ",e.jsx("strong",{children:s.name}),"?"]}),e.jsx("form",{onSubmit:i,className:"space-y-6",children:e.jsxs("div",{className:"flex justify-center gap-4",children:[e.jsx(d,{disabled:r,children:"Yes, delete!"}),e.jsx(c,{disabled:r,onClick:t,children:"No, Cancel!"})]})})]})}export{h as default};
