import{r as d,j as e,y as n}from"./app-HWkxxKU5.js";import{P as l}from"./PrimaryButton-Bjy3hJVY.js";import{S as c}from"./SecondaryButton-CIvzJTjd.js";import{n as u}from"./index-CENE42Aw.js";function y({destroyRibbon:s,closeModal:t=()=>{}}){const[r,o]=d.useState(!1),a=i=>{o(!0),i.preventDefault(),n.delete(route("destroy-ribbon.destroy",s.id),{onSuccess:()=>{o(!1),t(),u.success("Destroy ribbon deleted successfully.",{position:"top-right",duration:3e3})}})};return e.jsxs("div",{className:"w-full bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6",children:[e.jsxs("h3",{className:"dark:text-gray-100 text-lg text-center mb-6",children:["Are you sure to delete this data"," ",e.jsx("strong",{children:s.destroyed_date}),"?"]}),e.jsx("form",{onSubmit:a,className:"space-y-6",children:e.jsxs("div",{className:"flex justify-center gap-4",children:[e.jsx(l,{disabled:r,children:"Yes, delete!"}),e.jsx(c,{disabled:r,onClick:t,children:"No, Cancel!"})]})})]})}export{y as default};