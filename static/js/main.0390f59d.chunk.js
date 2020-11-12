(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{103:function(e,t,a){e.exports=a(132)},108:function(e,t,a){},109:function(e,t,a){},132:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(9),i=a.n(r);a(108),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(109);var c,l,s=a(175),u=a(176),d=a(177),m=a(168),f=a(134),b=a(171),O=a(179),E=a(180),T=a(178),g=a(17),p=a(7),v=a(61),j=a(83),h=a.n(j).a.create(Object(p.a)({baseURL:"https://social-network.samuraijs.com/api/1.1/"},{withCredentials:!0,headers:{"API-KEY":"1a3237fe-e721-4f8c-aaca-8ad848347a2d"}})),k=function(){return h.get("todo-lists")},I=function(e){return h.post("todo-lists",{title:e})},S=function(e){return h.delete("todo-lists/".concat(e))},C=function(e,t){return h.put("todo-lists/".concat(e),{title:t})},y=function(e){return h.get("todo-lists/".concat(e,"/tasks"))},A=function(e,t){return h.delete("todo-lists/".concat(e,"/tasks/").concat(t))},w=function(e,t){return h.post("todo-lists/".concat(e,"/tasks"),{title:t})},D=function(e,t,a){return h.put("todo-lists/".concat(e,"/tasks/").concat(t),a)};!function(e){e[e.New=0]="New",e[e.InProgress=1]="InProgress",e[e.Completed=2]="Completed",e[e.Draft=3]="Draft"}(c||(c={})),function(e){e[e.Low=0]="Low",e[e.Middle=1]="Middle",e[e.Hi=2]="Hi",e[e.Urgently=3]="Urgently",e[e.Later=4]="Later"}(l||(l={}));var L=function(e){return h.post("/auth/login",e)},P=function(){return h.get("/auth/me")},N=function(){return h.delete("/auth/login")},R=function(e,t){e.messages.length?t(H(e.messages[0])):t(H("Some error occurred")),t(M("failed"))},F=function(e,t){t(H(e.message?e.message:"Some error occurred")),t(M("failed"))},x={isLoggedIn:!1},G=function(e){return{type:"login/SET-IS-LOGGED-IN",value:e}},K={status:"idle",error:null,isInitialized:!1},H=function(e){return{type:"APP/SET-ERROR",error:e}},M=function(e){return{type:"APP/SET-STATUS",status:e}},U=[],V=a(35),Z={},q=function(e,t,a){return function(n,o){var r=o().tasks[a].find((function(t){return t.id===e}));if(r){var i=Object(p.a)({deadline:r.deadline,description:r.description,priority:r.priority,startDate:r.startDate,title:r.title,status:r.status},t);D(a,e,i).then((function(o){if(0===o.data.resultCode){var r=function(e,t,a){return{type:"UPDATE-TASK",model:t,todolistId:a,taskId:e}}(e,t,a);n(r)}else R(o.data,n)})).catch((function(e){F(e,n)}))}else console.warn("task not found in the state")}},z=a(172),B=a(133),Y=a(45),J=a(181),W=a(169),$=o.a.memo((function(e){var t=e.addItem,a=e.disabled,r=void 0!==a&&a;console.log("AddItemForm called");var i=Object(n.useState)(""),c=Object(Y.a)(i,2),l=c[0],s=c[1],u=Object(n.useState)(null),d=Object(Y.a)(u,2),f=d[0],b=d[1],O=function(){""!==l.trim()?(t(l),s("")):b("Title is required")};return o.a.createElement("div",null,o.a.createElement(J.a,{variant:"outlined",disabled:r,error:!!f,value:l,onChange:function(e){s(e.currentTarget.value)},onKeyPress:function(e){null!==f&&b(null),13===e.charCode&&O()},label:"Title",helperText:f}),o.a.createElement(m.a,{color:"primary",onClick:O,disabled:r},o.a.createElement(W.a,null)))})),_=a(91),Q=o.a.memo((function(e){console.log("EditableSpan called");var t=Object(n.useState)(!1),a=Object(Y.a)(t,2),r=a[0],i=a[1],c=Object(n.useState)(e.value),l=Object(Y.a)(c,2),s=l[0],u=l[1];return r?o.a.createElement(J.a,{value:s,onChange:function(e){u(e.currentTarget.value)},autoFocus:!0,onBlur:function(){i(!1),e.onChange(s)}}):o.a.createElement("span",{onDoubleClick:function(){i(!0),u(e.value)}},e.value)})),X=a(170),ee=a(183),te=o.a.memo((function(e){var t=Object(n.useCallback)((function(){return e.removeTask(e.task.id,e.todolistId)}),[e.task.id,e.todolistId]),a=Object(n.useCallback)((function(t){var a=t.currentTarget.checked;e.changeTaskStatus(e.task.id,a?c.Completed:c.New,e.todolistId)}),[e.task.id,e.todolistId]),r=Object(n.useCallback)((function(t){e.changeTaskTitle(e.task.id,t,e.todolistId)}),[e.task.id,e.todolistId]);return o.a.createElement("div",{key:e.task.id,className:e.task.status===c.Completed?"is-done":""},o.a.createElement(ee.a,{checked:e.task.status===c.Completed,color:"primary",onChange:a}),o.a.createElement(Q,{value:e.task.title,onChange:r}),o.a.createElement(m.a,{onClick:t},o.a.createElement(X.a,null)))})),ae=o.a.memo((function(e){var t=e.demo,a=void 0!==t&&t,r=Object(_.a)(e,["demo"]);console.log("Todolist called");var i=Object(g.b)();Object(n.useEffect)((function(){if(!a){var e,t=(e=r.todolist.id,function(t){t(M("loading")),y(e).then((function(a){var n=a.data.items;t(function(e,t){return{type:"SET-TASKS",tasks:e,todolistId:t}}(n,e)),t(M("succeeded"))}))});i(t)}}),[]);var l=Object(n.useCallback)((function(e){r.addTask(e,r.todolist.id)}),[r.addTask,r.todolist.id]),s=Object(n.useCallback)((function(e){r.changeTodolistTitle(r.todolist.id,e)}),[r.todolist.id,r.changeTodolistTitle]),u=Object(n.useCallback)((function(){return r.changeFilter("all",r.todolist.id)}),[r.todolist.id,r.changeFilter]),d=Object(n.useCallback)((function(){return r.changeFilter("active",r.todolist.id)}),[r.todolist.id,r.changeFilter]),f=Object(n.useCallback)((function(){return r.changeFilter("completed",r.todolist.id)}),[r.todolist.id,r.changeFilter]),O=r.tasks;return"active"===r.todolist.filter&&(O=r.tasks.filter((function(e){return e.status===c.New}))),"completed"===r.todolist.filter&&(O=r.tasks.filter((function(e){return e.status===c.Completed}))),o.a.createElement("div",null,o.a.createElement("h3",null,o.a.createElement(Q,{value:r.todolist.title,onChange:s}),o.a.createElement(m.a,{onClick:function(){r.removeTodolist(r.todolist.id)},disabled:"loading"===r.todolist.entityStatus},o.a.createElement(X.a,null))),o.a.createElement($,{addItem:l,disabled:"loading"===r.todolist.entityStatus}),o.a.createElement("div",null,O.map((function(e){return o.a.createElement(te,{key:e.id,task:e,todolistId:r.todolist.id,removeTask:r.removeTask,changeTaskTitle:r.changeTaskTitle,changeTaskStatus:r.changeTaskStatus})}))),o.a.createElement("div",{style:{paddingTop:"10px"}},o.a.createElement(b.a,{variant:"all"===r.todolist.filter?"outlined":"text",onClick:u,color:"default"},"All"),o.a.createElement(b.a,{variant:"active"===r.todolist.filter?"outlined":"text",onClick:d,color:"primary"},"Active"),o.a.createElement(b.a,{variant:"completed"===r.todolist.filter?"outlined":"text",onClick:f,color:"secondary"},"Completed")))})),ne=a(14),oe=function(e){var t=e.demo,a=void 0!==t&&t,r=Object(g.c)((function(e){return e.todolists})),i=Object(g.c)((function(e){return e.tasks})),c=Object(g.c)((function(e){return e.auth.isLoggedIn})),l=Object(g.b)();Object(n.useEffect)((function(){if(!a&&c){var e=function(e){e(M("loading")),k().then((function(t){e({type:"SET-TODOLISTS",todolists:t.data}),e(M("succeeded"))}))};l(e)}}),[]);var s=Object(n.useCallback)((function(e,t){var a=function(e,t){return function(a){A(t,e).then((function(n){var o=function(e,t){return{type:"REMOVE-TASK",taskId:e,todolistId:t}}(e,t);a(o)}))}}(e,t);l(a)}),[]),u=Object(n.useCallback)((function(e,t){var a=function(e,t){return function(a){a(M("loading")),w(t,e).then((function(e){if(0===e.data.resultCode){var t=function(e){return{type:"ADD-TASK",task:e}}(e.data.data.item);a(t),a(M("succeeded"))}else R(e.data,a)})).catch((function(e){F(e,a)}))}}(e,t);l(a)}),[]),d=Object(n.useCallback)((function(e,t,a){var n=q(e,{status:t},a);l(n)}),[]),m=Object(n.useCallback)((function(e,t,a){var n=q(e,{title:t},a);l(n)}),[]),f=Object(n.useCallback)((function(e,t){var a={type:"CHANGE-TODOLIST-FILTER",id:t,filter:e};l(a)}),[]),b=Object(n.useCallback)((function(e){var t,a=(t=e,function(e){e(M("loading")),e({type:"CHANGE-TODOLIST-ENTITY-STATUS",id:t,status:"loading"}),S(t).then((function(a){e(function(e){return{type:"REMOVE-TODOLIST",id:e}}(t)),e(M("succeeded"))}))});l(a)}),[]),O=Object(n.useCallback)((function(e,t){var a=function(e,t){return function(a){C(e,t).then((function(n){a(function(e,t){return{type:"CHANGE-TODOLIST-TITLE",id:e,title:t}}(e,t))}))}}(e,t);l(a)}),[]),E=Object(n.useCallback)((function(e){var t=function(e){return function(t){t(M("loading")),I(e).then((function(e){t({type:"ADD-TODOLIST",todolist:e.data.data.item}),t(M("succeeded"))}))}}(e);l(t)}),[l]);return c?o.a.createElement(o.a.Fragment,null,o.a.createElement(z.a,{container:!0,style:{padding:"20px"}},o.a.createElement($,{addItem:E})),o.a.createElement(z.a,{container:!0,spacing:3},r.map((function(e){var t=i[e.id];return o.a.createElement(z.a,{item:!0,key:e.id},o.a.createElement(B.a,{style:{padding:"10px"}},o.a.createElement(ae,{todolist:e,tasks:t,removeTask:s,changeFilter:f,addTask:u,changeTaskStatus:d,removeTodolist:b,changeTaskTitle:m,changeTodolistTitle:O,demo:a})))})))):o.a.createElement(ne.a,{to:"/login"})},re=a(185),ie=a(182);function ce(e){return o.a.createElement(ie.a,Object.assign({elevation:6,variant:"filled"},e))}function le(){var e=Object(g.c)((function(e){return e.app.error})),t=Object(g.b)(),a=function(e,a){"clickaway"!==a&&t(H(null))},n=null!==e;return o.a.createElement(re.a,{open:n,autoHideDuration:6e3,onClose:a},o.a.createElement(ce,{onClose:a,severity:"error"},e))}var se=a(186),ue=a(167),de=a(173),me=a(174),fe=a(90),be=function(){var e=Object(g.b)(),t=Object(g.c)((function(e){return e.auth.isLoggedIn})),a=Object(fe.a)({initialValues:{email:"",password:"",rememberMe:!1},validate:function(e){var t={};return e.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.email)||(t.email="Invalid email address"):t.email="Required",e.password?e.password.length<3&&(t.password="Password must be at least 3 symbols"):t.password="Password is Required",t},onSubmit:function(t){var a;e((a=t,function(e){e(M("loading")),L(a).then((function(t){0===t.data.resultCode?(e(G(!0)),e(M("succeeded"))):R(t.data,e)})).catch((function(t){F(t,e)}))}))}});return t?o.a.createElement(ne.a,{to:"/"}):o.a.createElement(z.a,{container:!0,justify:"center"},o.a.createElement(z.a,{item:!0,xs:4},o.a.createElement("form",{onSubmit:a.handleSubmit},o.a.createElement(se.a,null,o.a.createElement(ue.a,null,o.a.createElement("p",null,"To log in get registered",o.a.createElement("a",{href:"https://social-network.samuraijs.com/",target:"_blank"},"here")),o.a.createElement("p",null,"or use common test account credentials:"),o.a.createElement("p",null,"Email: free@samuraijs.com"),o.a.createElement("p",null,"Password: free")),o.a.createElement(de.a,null,o.a.createElement(J.a,Object.assign({label:"Email",margin:"normal"},a.getFieldProps("email"))),a.errors.email?o.a.createElement("div",{style:{color:"red"}},a.errors.email):null,o.a.createElement(J.a,Object.assign({type:"password",label:"Password",margin:"normal"},a.getFieldProps("password"))),a.errors.password?o.a.createElement("div",{style:{color:"red"}},a.errors.password):null,o.a.createElement(me.a,{label:"Remember me",control:o.a.createElement(ee.a,a.getFieldProps("rememberMe"))}),o.a.createElement(b.a,{type:"submit",variant:"contained",color:"primary"},"Login"))))))};var Oe=function(e){var t=e.demo,a=void 0!==t&&t,r=Object(g.c)((function(e){return e.app.status})),i=Object(g.c)((function(e){return e.app.isInitialized})),c=Object(g.c)((function(e){return e.auth.isLoggedIn})),l=Object(g.b)();Object(n.useEffect)((function(){l((function(e){P().then((function(t){e({type:"APP/SET-IS-INITIALIZED",status:!0}),0===t.data.resultCode&&e(G(!0))}))}))}),[]);var p=Object(n.useCallback)((function(){l((function(e){e(M("loading")),N().then((function(t){0===t.data.resultCode?(e(G(!1)),e(M("succeeded"))):R(t.data,e)})).catch((function(t){F(t,e)}))}))}),[]);return i?o.a.createElement("div",{className:"App"},o.a.createElement(le,null),o.a.createElement(u.a,{position:"static"},o.a.createElement(d.a,null,o.a.createElement(m.a,{edge:"start",color:"inherit","aria-label":"menu"},o.a.createElement(T.a,null)),o.a.createElement(f.a,{variant:"h6"},"News"),c&&o.a.createElement(b.a,{color:"inherit",onClick:p},"Log out")),"loading"===r&&o.a.createElement(O.a,null)),o.a.createElement(E.a,{fixed:!0},o.a.createElement(ne.d,null,o.a.createElement(ne.b,{exact:!0,path:"/",render:function(){return o.a.createElement(oe,{demo:a})}}),o.a.createElement(ne.b,{path:"/login",render:function(){return o.a.createElement(be,null)}}),o.a.createElement(ne.b,{path:"/404",render:function(){return o.a.createElement("h1",null,"404 Page not found")}}),o.a.createElement(ne.a,{from:"*",to:"/404"})))):o.a.createElement("div",{style:{position:"fixed",top:"30%",textAlign:"center",width:"100%"}},o.a.createElement(s.a,null))},Ee=a(42),Te=a(89),ge=Object(Ee.c)({tasks:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Z,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REMOVE-TASK":return Object(p.a)(Object(p.a)({},e),{},Object(V.a)({},t.todolistId,e[t.todolistId].filter((function(e){return e.id!=t.taskId}))));case"ADD-TASK":return Object(p.a)(Object(p.a)({},e),{},Object(V.a)({},t.task.todoListId,[t.task].concat(Object(v.a)(e[t.task.todoListId]))));case"UPDATE-TASK":return Object(p.a)(Object(p.a)({},e),{},Object(V.a)({},t.todolistId,e[t.todolistId].map((function(e){return e.id===t.taskId?Object(p.a)(Object(p.a)({},e),t.model):e}))));case"ADD-TODOLIST":return Object(p.a)(Object(p.a)({},e),{},Object(V.a)({},t.todolist.id,[]));case"REMOVE-TODOLIST":var a=Object(p.a)({},e);return delete a[t.id],a;case"SET-TODOLISTS":var n=Object(p.a)({},e);return t.todolists.forEach((function(e){n[e.id]=[]})),n;case"SET-TASKS":return Object(p.a)(Object(p.a)({},e),{},Object(V.a)({},t.todolistId,t.tasks));default:return e}},todolists:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:U,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REMOVE-TODOLIST":return e.filter((function(e){return e.id!=t.id}));case"ADD-TODOLIST":return[Object(p.a)(Object(p.a)({},t.todolist),{},{filter:"all",entityStatus:"idle"})].concat(Object(v.a)(e));case"CHANGE-TODOLIST-TITLE":return e.map((function(e){return e.id===t.id?Object(p.a)(Object(p.a)({},e),{},{title:t.title}):e}));case"CHANGE-TODOLIST-FILTER":return e.map((function(e){return e.id===t.id?Object(p.a)(Object(p.a)({},e),{},{filter:t.filter}):e}));case"CHANGE-TODOLIST-ENTITY-STATUS":return e.map((function(e){return e.id===t.id?Object(p.a)(Object(p.a)({},e),{},{entityStatus:t.status}):e}));case"SET-TODOLISTS":return t.todolists.map((function(e){return Object(p.a)(Object(p.a)({},e),{},{filter:"all",entityStatus:"idle"})}));default:return e}},app:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:K,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"APP/SET-STATUS":return Object(p.a)(Object(p.a)({},e),{},{status:t.status});case"APP/SET-ERROR":return Object(p.a)(Object(p.a)({},e),{},{error:t.error});case"APP/SET-IS-INITIALIZED":return Object(p.a)(Object(p.a)({},e),{},{isInitialized:t.status});default:return Object(p.a)({},e)}},auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:x,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"login/SET-IS-LOGGED-IN":return Object(p.a)(Object(p.a)({},e),{},{isLoggedIn:t.value});default:return e}}}),pe=Object(Ee.d)(ge,Object(Ee.a)(Te.a));window.store=pe;var ve=a(47);i.a.render(o.a.createElement(g.a,{store:pe},o.a.createElement(ve.a,null,o.a.createElement(Oe,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[103,1,2]]]);
//# sourceMappingURL=main.0390f59d.chunk.js.map