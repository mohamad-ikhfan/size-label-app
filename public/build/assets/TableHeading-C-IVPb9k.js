import{r,j as t}from"./app-CqdcC8ud.js";function c({title:a,titleId:e,...l},n){return r.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:n,"aria-labelledby":e},l),a?r.createElement("title",{id:e},a):null,r.createElement("path",{fillRule:"evenodd",d:"M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z",clipRule:"evenodd"}))}const i=r.forwardRef(c);function d({title:a,titleId:e,...l},n){return r.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:n,"aria-labelledby":e},l),a?r.createElement("title",{id:e},a):null,r.createElement("path",{fillRule:"evenodd",d:"M11.78 9.78a.75.75 0 0 1-1.06 0L8 7.06 5.28 9.78a.75.75 0 0 1-1.06-1.06l3.25-3.25a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06Z",clipRule:"evenodd"}))}const u=r.forwardRef(d);function f({sortable:a=!0,name:e,children:l,sort_field:n=null,sort_direction:s=null,sortChanged:o=()=>{}}){return t.jsx(t.Fragment,{children:a?t.jsx("th",{onClick:x=>o(e),children:t.jsxs("div",{className:"px-3 pt-2 flex items-center justify-between gap-1 cursor-pointer",children:[t.jsx("div",{children:l}),t.jsxs("div",{children:[t.jsx(u,{className:"w-4 -mb-1 "+(n===e&&s==="asc"?"text-gray-950 dark:text-white":"")}),t.jsx(i,{className:"w-4 -mt-1 "+(n===e&&s==="desc"?"text-gray-950 dark:text-white":"")})]})]})}):t.jsx("th",{className:"px-3 pt-2 cursor-default",children:l})})}export{f as T};
