import{j as e,r as c,W as g}from"./app-HWkxxKU5.js";import{I as h}from"./InputError-BTgG0eOk.js";import{I as w}from"./InputLabel-ZRf2dIRD.js";import{M as j}from"./Modal-BYB44Cga.js";import{S as N}from"./SecondaryButton-CIvzJTjd.js";import{T as b}from"./TextInput-BfYGk2LL.js";import"./transition-CMtolyNB.js";function d({className:o="",disabled:s,children:t,...r}){return e.jsx("button",{...r,className:`inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150 ${s&&"opacity-25"} `+o,disabled:s,children:t})}function A({className:o=""}){const[s,t]=c.useState(!1),r=c.useRef(),{data:i,setData:u,delete:m,processing:p,reset:l,errors:f}=g({password:""}),x=()=>{t(!0)},y=n=>{n.preventDefault(),m(route("profile.destroy"),{preserveScroll:!0,onSuccess:()=>a(),onError:()=>r.current.focus(),onFinish:()=>l()})},a=()=>{t(!1),l()};return e.jsxs("section",{className:`space-y-6 ${o}`,children:[e.jsxs("header",{children:[e.jsx("h2",{className:"text-lg font-medium text-gray-900 dark:text-gray-100",children:"Delete Account"}),e.jsx("p",{className:"mt-1 text-sm text-gray-600 dark:text-gray-400",children:"Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain."})]}),e.jsx(d,{onClick:x,children:"Delete Account"}),e.jsx(j,{show:s,onClose:a,children:e.jsxs("form",{onSubmit:y,className:"p-6",children:[e.jsx("h2",{className:"text-lg font-medium text-gray-900 dark:text-gray-100",children:"Are you sure you want to delete your account?"}),e.jsx("p",{className:"mt-1 text-sm text-gray-600 dark:text-gray-400",children:"Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account."}),e.jsxs("div",{className:"mt-6",children:[e.jsx(w,{htmlFor:"password",value:"Password",className:"sr-only"}),e.jsx(b,{id:"password",type:"password",name:"password",ref:r,value:i.password,onChange:n=>u("password",n.target.value),className:"mt-1 block w-3/4",isFocused:!0,placeholder:"Password"}),e.jsx(h,{message:f.password,className:"mt-2"})]}),e.jsxs("div",{className:"mt-6 flex justify-end",children:[e.jsx(N,{onClick:a,children:"Cancel"}),e.jsx(d,{className:"ms-3",disabled:p,children:"Delete Account"})]})]})})]})}export{A as default};