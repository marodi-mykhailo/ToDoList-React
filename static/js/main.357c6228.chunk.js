(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{110:function(e,t,a){e.exports=a(139)},115:function(e,t,a){},116:function(e,t,a){},139:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(9),c=a.n(r);a(115),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(116);var i,l,s=a(180),u=a(181),d=a(182),m=a(177),f=a(183),b=a(184),g=a(68),p=a.n(g),E=a(14),O=a(7),T=a(63),v=a(86),h=a.n(v).a.create(Object(O.a)({baseURL:"https://social-network.samuraijs.com/api/1.1/"},{withCredentials:!0,headers:{"API-KEY":"1a3237fe-e721-4f8c-aaca-8ad848347a2d"}})),j=function(){return h.get("todo-lists")},k=function(e){return h.post("todo-lists",{title:e})},S=function(e){return h.delete("todo-lists/".concat(e))},I=function(e,t){return h.put("todo-lists/".concat(e),{title:t})},C=function(e){return h.get("todo-lists/".concat(e,"/tasks"))},y=function(e,t){return h.delete("todo-lists/".concat(e,"/tasks/").concat(t))},w=function(e,t){return h.post("todo-lists/".concat(e,"/tasks"),{title:t})},L=function(e,t,a){return h.put("todo-lists/".concat(e,"/tasks/").concat(t),a)};!function(e){e[e.New=0]="New",e[e.InProgress=1]="InProgress",e[e.Completed=2]="Completed",e[e.Draft=3]="Draft"}(i||(i={})),function(e){e[e.Low=0]="Low",e[e.Middle=1]="Middle",e[e.Hi=2]="Hi",e[e.Urgently=3]="Urgently",e[e.Later=4]="Later"}(l||(l={}));var A=function(e){return h.post("/auth/login",e)},D=function(){return h.get("/auth/me")},_=function(){return h.delete("/auth/login")},N=function(e,t){e.messages.length?t(G(e.messages[0])):t(G("Some error occurred")),t(U("failed"))},P=function(e,t){t(G(e.message?e.message:"Some error occurred")),t(U("failed"))},x={isLoggedIn:!1},R=function(e){return{type:"login/SET-IS-LOGGED-IN",value:e}},F={status:"idle",error:null,isInitialized:!1},G=function(e){return{type:"APP/SET-ERROR",error:e}},U=function(e){return{type:"APP/SET-STATUS",status:e}},H=[],K=a(36),M={},V=function(e,t,a){return function(n,o){var r=o().tasks[a].find((function(t){return t.id===e}));if(r){var c=Object(O.a)({deadline:r.deadline,description:r.description,priority:r.priority,startDate:r.startDate,title:r.title,status:r.status},t);L(a,e,c).then((function(o){if(0===o.data.resultCode){var r=function(e,t,a){return{type:"UPDATE-TASK",model:t,todolistId:a,taskId:e}}(e,t,a);n(r)}else N(o.data,n)})).catch((function(e){P(e,n)}))}else console.warn("task not found in the state")}},W=a(178),Z=a(140),z=a(45),B=a(185),J=a(174),q=a(175),Y=o.a.memo((function(e){var t=e.addItem,a=e.disabled,r=void 0!==a&&a;console.log("AddItemForm called");var c=Object(n.useState)(""),i=Object(z.a)(c,2),l=i[0],s=i[1],u=Object(n.useState)(null),d=Object(z.a)(u,2),m=d[0],f=d[1],b=function(){""!==l.trim()?(t(l),s("")):f("Title is required")};return o.a.createElement("div",null,o.a.createElement(B.a,{variant:"outlined",disabled:r,error:!!m,value:l,onChange:function(e){s(e.currentTarget.value)},onKeyPress:function(e){null!==m&&f(null),13===e.charCode&&b()},label:"Title",helperText:m}),o.a.createElement(J.a,{color:"primary",onClick:b,disabled:r},o.a.createElement(q.a,null)))})),$=a(98),Q=o.a.memo((function(e){console.log("EditableSpan called");var t=Object(n.useState)(!1),a=Object(z.a)(t,2),r=a[0],c=a[1],i=Object(n.useState)(e.value),l=Object(z.a)(i,2),s=l[0],u=l[1];return r?o.a.createElement(B.a,{value:s,onChange:function(e){u(e.currentTarget.value)},autoFocus:!0,onBlur:function(){c(!1),e.onChange(s)}}):o.a.createElement("span",{onDoubleClick:function(){c(!0),u(e.value)}},e.value)})),X=a(176),ee=a(187),te=o.a.memo((function(e){var t=Object(n.useCallback)((function(){return e.removeTask(e.task.id,e.todolistId)}),[e.task.id,e.todolistId]),a=Object(n.useCallback)((function(t){var a=t.currentTarget.checked;e.changeTaskStatus(e.task.id,a?i.Completed:i.New,e.todolistId)}),[e.task.id,e.todolistId]),r=Object(n.useCallback)((function(t){e.changeTaskTitle(e.task.id,t,e.todolistId)}),[e.task.id,e.todolistId]);return o.a.createElement("div",{key:e.task.id,className:e.task.status===i.Completed?"is-done":""},o.a.createElement(ee.a,{checked:e.task.status===i.Completed,color:"primary",onChange:a}),o.a.createElement(Q,{value:e.task.title,onChange:r}),o.a.createElement(J.a,{onClick:t},o.a.createElement(X.a,null)))})),ae=o.a.memo((function(e){var t=e.demo,a=void 0!==t&&t,r=Object($.a)(e,["demo"]);console.log("Todolist called");var c=Object(E.b)();Object(n.useEffect)((function(){if(!a){var e,t=(e=r.todolist.id,function(t){t(U("loading")),C(e).then((function(a){var n=a.data.items;t(function(e,t){return{type:"SET-TASKS",tasks:e,todolistId:t}}(n,e)),t(U("succeeded"))}))});c(t)}}),[]);var l=Object(n.useCallback)((function(e){r.addTask(e,r.todolist.id)}),[r.addTask,r.todolist.id]),s=Object(n.useCallback)((function(e){r.changeTodolistTitle(r.todolist.id,e)}),[r.todolist.id,r.changeTodolistTitle]),u=Object(n.useCallback)((function(){return r.changeFilter("all",r.todolist.id)}),[r.todolist.id,r.changeFilter]),d=Object(n.useCallback)((function(){return r.changeFilter("active",r.todolist.id)}),[r.todolist.id,r.changeFilter]),f=Object(n.useCallback)((function(){return r.changeFilter("completed",r.todolist.id)}),[r.todolist.id,r.changeFilter]),b=r.tasks;return"active"===r.todolist.filter&&(b=r.tasks.filter((function(e){return e.status===i.New}))),"completed"===r.todolist.filter&&(b=r.tasks.filter((function(e){return e.status===i.Completed}))),o.a.createElement("div",null,o.a.createElement("h3",null,o.a.createElement(Q,{value:r.todolist.title,onChange:s}),o.a.createElement(J.a,{onClick:function(){r.removeTodolist(r.todolist.id)},disabled:"loading"===r.todolist.entityStatus},o.a.createElement(X.a,null))),o.a.createElement(Y,{addItem:l,disabled:"loading"===r.todolist.entityStatus}),o.a.createElement("div",null,b.map((function(e){return o.a.createElement(te,{key:e.id,task:e,todolistId:r.todolist.id,removeTask:r.removeTask,changeTaskTitle:r.changeTaskTitle,changeTaskStatus:r.changeTaskStatus})}))),o.a.createElement("div",{style:{paddingTop:"10px"}},o.a.createElement(m.a,{variant:"all"===r.todolist.filter?"outlined":"text",onClick:u,color:"default"},"All"),o.a.createElement(m.a,{variant:"active"===r.todolist.filter?"outlined":"text",onClick:d,color:"primary"},"Active"),o.a.createElement(m.a,{variant:"completed"===r.todolist.filter?"outlined":"text",onClick:f,color:"secondary"},"Completed")))})),ne=a(15),oe=a(90),re=a.n(oe),ce=function(e){var t=e.demo,a=void 0!==t&&t,r=Object(E.c)((function(e){return e.todolists})),c=Object(E.c)((function(e){return e.tasks})),i=Object(E.c)((function(e){return e.auth.isLoggedIn})),l=Object(E.b)();Object(n.useEffect)((function(){if(!a&&i){var e=function(e){e(U("loading")),j().then((function(t){e({type:"SET-TODOLISTS",todolists:t.data}),e(U("succeeded"))}))};l(e)}}),[]);var s=Object(n.useCallback)((function(e,t){var a=function(e,t){return function(a){y(t,e).then((function(n){var o=function(e,t){return{type:"REMOVE-TASK",taskId:e,todolistId:t}}(e,t);a(o)}))}}(e,t);l(a)}),[]),u=Object(n.useCallback)((function(e,t){var a=function(e,t){return function(a){a(U("loading")),w(t,e).then((function(e){if(0===e.data.resultCode){var t=function(e){return{type:"ADD-TASK",task:e}}(e.data.data.item);a(t),a(U("succeeded"))}else N(e.data,a)})).catch((function(e){P(e,a)}))}}(e,t);l(a)}),[]),d=Object(n.useCallback)((function(e,t,a){var n=V(e,{status:t},a);l(n)}),[]),m=Object(n.useCallback)((function(e,t,a){var n=V(e,{title:t},a);l(n)}),[]),f=Object(n.useCallback)((function(e,t){var a={type:"CHANGE-TODOLIST-FILTER",id:t,filter:e};l(a)}),[]),b=Object(n.useCallback)((function(e){var t,a=(t=e,function(e){e(U("loading")),e({type:"CHANGE-TODOLIST-ENTITY-STATUS",id:t,status:"loading"}),S(t).then((function(a){e(function(e){return{type:"REMOVE-TODOLIST",id:e}}(t)),e(U("succeeded"))}))});l(a)}),[]),g=Object(n.useCallback)((function(e,t){var a=function(e,t){return function(a){I(e,t).then((function(n){a(function(e,t){return{type:"CHANGE-TODOLIST-TITLE",id:e,title:t}}(e,t))}))}}(e,t);l(a)}),[]),O=Object(n.useCallback)((function(e){var t=function(e){return function(t){t(U("loading")),k(e).then((function(e){t({type:"ADD-TODOLIST",todolist:e.data.data.item}),t(U("succeeded"))}))}}(e);l(t)}),[l]);return i?o.a.createElement(o.a.Fragment,null,o.a.createElement(W.a,{container:!0,style:{padding:"20px"}},o.a.createElement(Y,{addItem:O})),o.a.createElement("img",{className:p.a.img,src:re.a,alt:""}),o.a.createElement("div",{className:p.a.wrapp},o.a.createElement(W.a,{container:!0,spacing:3},r.map((function(e){var t=c[e.id];return o.a.createElement(W.a,{item:!0,key:e.id},o.a.createElement(Z.a,{elevation:5,style:{padding:"10px"}},o.a.createElement(ae,{todolist:e,tasks:t,removeTask:s,changeFilter:f,addTask:u,changeTaskStatus:d,removeTodolist:b,changeTaskTitle:m,changeTodolistTitle:g,demo:a})))}))))):o.a.createElement(ne.a,{to:"/startPage"})},ie=a(189),le=a(186);function se(e){return o.a.createElement(le.a,Object.assign({elevation:6,variant:"filled"},e))}function ue(){var e=Object(E.c)((function(e){return e.app.error})),t=Object(E.b)(),a=function(e,a){"clickaway"!==a&&t(G(null))},n=null!==e;return o.a.createElement(ie.a,{open:n,autoHideDuration:6e3,onClose:a},o.a.createElement(se,{onClose:a,severity:"error"},e))}var de=a(190),me=a(173),fe=a(179),be=a(191),ge=a(97),pe=a(46),Ee=a.n(pe),Oe=a(93),Te=a.n(Oe),ve=function(){var e=Object(E.b)(),t=Object(E.c)((function(e){return e.auth.isLoggedIn})),a=Object(ge.a)({initialValues:{email:"",password:"",rememberMe:!1},validate:function(e){var t={};return e.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.email)||(t.email="Invalid email address"):t.email="Required",e.password?e.password.length<3&&(t.password="Password must be at least 3 symbols"):t.password="Password is Required",t},onSubmit:function(t){var a;e((a=t,function(e){e(U("loading")),A(a).then((function(t){0===t.data.resultCode?(e(R(!0)),e(U("succeeded"))):N(t.data,e)})).catch((function(t){P(t,e)}))}))}});return t?o.a.createElement(ne.a,{to:"/"}):o.a.createElement("div",{className:Ee.a.wrapp},o.a.createElement("div",{className:Ee.a.left},o.a.createElement("img",{src:Te.a,alt:"",className:Ee.a.img})),o.a.createElement("div",{className:Ee.a.right},o.a.createElement("div",{className:Ee.a.formWrapp},o.a.createElement("form",{onSubmit:a.handleSubmit},o.a.createElement(de.a,null,o.a.createElement(me.a,null,o.a.createElement("p",null,"To log in get registered",o.a.createElement("a",{href:"https://social-network.samuraijs.com/",target:"_blank"},"here")),o.a.createElement("p",null,"or use common test account credentials:"),o.a.createElement("p",null,"Email: free@samuraijs.com"),o.a.createElement("p",null,"Password: free")),o.a.createElement(fe.a,null,o.a.createElement(B.a,Object.assign({label:"Email",margin:"normal"},a.getFieldProps("email"))),a.errors.email?o.a.createElement("div",{style:{color:"red"}},a.errors.email):null,o.a.createElement(B.a,Object.assign({type:"password",label:"Password",margin:"normal"},a.getFieldProps("password"))),a.errors.password?o.a.createElement("div",{style:{color:"red"}},a.errors.password):null,o.a.createElement(be.a,{label:"Remember me",control:o.a.createElement(ee.a,a.getFieldProps("rememberMe"))}),o.a.createElement(m.a,{type:"submit",variant:"contained",color:"primary"},"Login")))))))},he=a(29),je=a(94),ke=a.n(je),Se=a(47),Ie=a.n(Se),Ce=a(95),ye=a.n(Ce),we=function(){return Object(E.c)((function(e){return e.auth.isLoggedIn}))?o.a.createElement(ne.a,{to:"/"}):o.a.createElement("section",{className:Ie.a.section},o.a.createElement("h1",{className:Ie.a.h1},"Organize it all with ",o.a.createElement("span",null,"Any.do")),o.a.createElement("img",{className:Ie.a.img,src:ye.a,alt:""}),o.a.createElement(he.b,{className:Ie.a.link,to:"/login"},o.a.createElement("button",{className:Ie.a.btn},"Start")))};var Le=function(e){var t=e.demo,a=void 0!==t&&t,r=Object(E.c)((function(e){return e.app.status})),c=Object(E.c)((function(e){return e.app.isInitialized})),i=Object(E.c)((function(e){return e.auth.isLoggedIn})),l=Object(E.b)();Object(n.useEffect)((function(){l((function(e){D().then((function(t){e({type:"APP/SET-IS-INITIALIZED",status:!0}),0===t.data.resultCode&&e(R(!0))}))}))}),[]);var g=Object(n.useCallback)((function(){l((function(e){e(U("loading")),_().then((function(t){0===t.data.resultCode?(e(R(!1)),e(U("succeeded"))):N(t.data,e)})).catch((function(t){P(t,e)}))}))}),[]);return c?o.a.createElement("div",{className:"App"},o.a.createElement(ue,null),o.a.createElement(u.a,{position:"static"},o.a.createElement(d.a,{className:"wrapp"},o.a.createElement("img",{className:"img",src:ke.a,alt:""}),i&&o.a.createElement(m.a,{color:"inherit",onClick:g},"Log out"),i||o.a.createElement(m.a,{color:"inherit"},o.a.createElement(he.b,{className:"link",to:"/login"},"Log In"))),"loading"===r&&o.a.createElement(f.a,null)),o.a.createElement(b.a,{className:"container",fixed:!0},o.a.createElement("img",{className:"logo",src:"https://techcrunch.com/wp-content/uploads/2011/11/any-do-logo-name.png?w=730&crop=1",alt:""}),o.a.createElement(ne.d,null,o.a.createElement(ne.b,{path:"/startPage",render:function(){return o.a.createElement(we,null)}}),o.a.createElement(ne.b,{exact:!0,path:"/",render:function(){return o.a.createElement(ce,{demo:a})}}),o.a.createElement(ne.b,{path:"/login",render:function(){return o.a.createElement(ve,null)}}),o.a.createElement(ne.b,{path:"/404",render:function(){return o.a.createElement("h1",null,"404 Page not found")}}),o.a.createElement(ne.a,{from:"*",to:"/404"})))):o.a.createElement("div",{style:{position:"fixed",top:"30%",textAlign:"center",width:"100%"}},o.a.createElement(s.a,null))},Ae=a(42),De=a(96),_e=Object(Ae.c)({tasks:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:M,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REMOVE-TASK":return Object(O.a)(Object(O.a)({},e),{},Object(K.a)({},t.todolistId,e[t.todolistId].filter((function(e){return e.id!=t.taskId}))));case"ADD-TASK":return Object(O.a)(Object(O.a)({},e),{},Object(K.a)({},t.task.todoListId,[t.task].concat(Object(T.a)(e[t.task.todoListId]))));case"UPDATE-TASK":return Object(O.a)(Object(O.a)({},e),{},Object(K.a)({},t.todolistId,e[t.todolistId].map((function(e){return e.id===t.taskId?Object(O.a)(Object(O.a)({},e),t.model):e}))));case"ADD-TODOLIST":return Object(O.a)(Object(O.a)({},e),{},Object(K.a)({},t.todolist.id,[]));case"REMOVE-TODOLIST":var a=Object(O.a)({},e);return delete a[t.id],a;case"SET-TODOLISTS":var n=Object(O.a)({},e);return t.todolists.forEach((function(e){n[e.id]=[]})),n;case"SET-TASKS":return Object(O.a)(Object(O.a)({},e),{},Object(K.a)({},t.todolistId,t.tasks));default:return e}},todolists:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:H,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REMOVE-TODOLIST":return e.filter((function(e){return e.id!=t.id}));case"ADD-TODOLIST":return[Object(O.a)(Object(O.a)({},t.todolist),{},{filter:"all",entityStatus:"idle"})].concat(Object(T.a)(e));case"CHANGE-TODOLIST-TITLE":return e.map((function(e){return e.id===t.id?Object(O.a)(Object(O.a)({},e),{},{title:t.title}):e}));case"CHANGE-TODOLIST-FILTER":return e.map((function(e){return e.id===t.id?Object(O.a)(Object(O.a)({},e),{},{filter:t.filter}):e}));case"CHANGE-TODOLIST-ENTITY-STATUS":return e.map((function(e){return e.id===t.id?Object(O.a)(Object(O.a)({},e),{},{entityStatus:t.status}):e}));case"SET-TODOLISTS":return t.todolists.map((function(e){return Object(O.a)(Object(O.a)({},e),{},{filter:"all",entityStatus:"idle"})}));default:return e}},app:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:F,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"APP/SET-STATUS":return Object(O.a)(Object(O.a)({},e),{},{status:t.status});case"APP/SET-ERROR":return Object(O.a)(Object(O.a)({},e),{},{error:t.error});case"APP/SET-IS-INITIALIZED":return Object(O.a)(Object(O.a)({},e),{},{isInitialized:t.status});default:return Object(O.a)({},e)}},auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:x,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"login/SET-IS-LOGGED-IN":return Object(O.a)(Object(O.a)({},e),{},{isLoggedIn:t.value});default:return e}}}),Ne=Object(Ae.d)(_e,Object(Ae.a)(De.a));window.store=Ne,c.a.render(o.a.createElement(E.a,{store:Ne},o.a.createElement(he.a,null,o.a.createElement(Le,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},46:function(e,t,a){e.exports={wrapp:"Login_wrapp__RgL7y",left:"Login_left__d9Jma",img:"Login_img__3ANCm",right:"Login_right__1HSC7",formWrapp:"Login_formWrapp__1VIAV"}},47:function(e,t,a){e.exports={h1:"StartPage_h1__29U-U",section:"StartPage_section__1Ba8d",img:"StartPage_img__D4W2g",btn:"StartPage_btn__3olVI",link:"StartPage_link__18WbO"}},68:function(e,t,a){e.exports={wrapp:"TodoList_wrapp__13ojv",img:"TodoList_img__3GJx2"}},90:function(e,t,a){e.exports=a.p+"static/media/tdl.a16cb5ed.png"},93:function(e,t,a){e.exports=a.p+"static/media/welcome.2409ca6b.svg"},94:function(e,t,a){e.exports=a.p+"static/media/logo.7a3f22b8.png"},95:function(e,t,a){e.exports=a.p+"static/media/todo.e9278ccc.png"}},[[110,1,2]]]);
//# sourceMappingURL=main.357c6228.chunk.js.map