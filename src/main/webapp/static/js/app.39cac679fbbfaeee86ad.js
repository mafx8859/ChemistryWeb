webpackJsonp([1],{"/LPs":function(t,s){},"9gsU":function(t,s){},NHnr:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var n=e("7+uW"),a=(e("Q0/0"),{render:function(){var t=this.$createElement,s=this._self._c||t;return s("div",{attrs:{id:"app"}},[s("router-view")],1)},staticRenderFns:[]});var o=e("VU/8")({name:"App"},a,!1,function(t){e("9gsU")},null,null).exports,i=e("/ocq"),r=e("mw3O"),c=e.n(r),u={name:"Loginin",data:function(){return{username:"",password:""}},methods:{submit:function(){var t=this;this.axios.post("/loginReginster/login",this.$qs.stringify({username:this.username,password:this.password})).then(function(s){console.log(s.data),console.log(s.data.level),0==s.data.level&&t.$router.push("/selectCourse")},function(t){console.log(t.data.status)})}}},l={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"container"},[e("h2",[t._v("东北师范大学化学学院答题系统")]),t._v(" "),e("form",{staticClass:"form-signin"},[e("h4",{staticClass:"form-signin-heading"},[t._v("请登录")]),t._v(" "),e("label",{staticClass:"sr-only",attrs:{for:"inputStuno"}},[t._v("学号")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],staticClass:"form-control",attrs:{type:"text",id:"inputStuno",placeholder:"学号",required:"",autofocus:""},domProps:{value:t.username},on:{input:function(s){s.target.composing||(t.username=s.target.value)}}}),t._v(" "),e("label",{staticClass:"sr-only",attrs:{for:"inputPassword"}},[t._v("密码")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"form-control",attrs:{type:"password",id:"inputPassword",placeholder:"密码",required:""},domProps:{value:t.password},on:{input:function(s){s.target.composing||(t.password=s.target.value)}}}),t._v(" "),e("button",{staticClass:"btn btn-lg btn-primary btn-block",attrs:{type:"button"},on:{click:t.submit}},[t._v("登录")])])])},staticRenderFns:[]},d=e("VU/8")(u,l,!1,null,null,null).exports,p={name:"choice",data:function(){return{Exercise:[]}},mounted:function(){this.getOpenQues()},methods:{getOpenQues:function(){var t=this;this.axios.get("/course/getAllCourse").then(function(s){console.log(s),t.Exercise=s.data},function(t){console.log(t)})}}},m={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"container"},[e("form",{staticClass:"form-choice"},t._l(t.Exercise,function(s,n){return e("div",{staticClass:"choiceBlock"},[0==s.type?[e("p",{staticClass:"choiceQuestion"},[e("em",[t._v(t._s(s.choiceQuesId)+".")]),t._v(" "+t._s(s.quesDescription))]),t._v(" "),e("label",{staticClass:"option"},[e("input",{staticClass:"radio-hidden",attrs:{type:"radio",name:"`item[${index}].choiceQuesId`",value:"A"}}),e("span",{staticClass:"radio-show"}),t._v("A."+t._s(s.optionA))]),t._v(" "),e("label",{staticClass:"option"},[e("input",{staticClass:"radio-hidden",attrs:{type:"radio",name:"`item[${index}].choiceQuesId`",value:"B"}}),e("span",{staticClass:"radio-show"}),t._v("B."+t._s(s.optionB))]),t._v(" "),e("label",{staticClass:"option"},[e("input",{staticClass:"radio-hidden",attrs:{type:"radio",name:"`item[${index}].choiceQuesId`",value:"C"}}),e("span",{staticClass:"radio-show"}),t._v("C."+t._s(s.optionC))]),t._v(" "),e("label",{staticClass:"option"},[e("input",{staticClass:"radio-hidden",attrs:{type:"radio",name:"`item[${index}].choiceQuesId`",value:"D"}}),e("span",{staticClass:"radio-show"}),t._v("D."+t._s(s.optionD))])]:1==s.type?[e("p",{staticClass:"choiceQuestion"},[e("em",[t._v(t._s(s.judgmentQuesId)+".")]),t._v(" "+t._s(s.judgQuesDescription))]),t._v(" "),t._m(0,!0),t._v(" "),t._m(1,!0)]:t._e()],2)}))])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("label",{staticClass:"option"},[s("input",{staticClass:"radio-hidden",attrs:{type:"radio",name:"`item[${index}].judgmentQuesId`",value:"对"}}),s("span",{staticClass:"radio-show"}),this._v("对")])},function(){var t=this.$createElement,s=this._self._c||t;return s("label",{staticClass:"option"},[s("input",{staticClass:"radio-hidden",attrs:{type:"radio",name:"`item[${index}].judgmentQuesId`",value:"错"}}),s("span",{staticClass:"radio-show"}),this._v("错")])}]};var v=e("VU/8")(p,m,!1,function(t){e("aEPf")},"data-v-1ca03c70",null).exports,h={name:"selectCourse",data:function(){return{courseList:[]}},mounted:function(){this.getCourseList()},methods:{getCourseList:function(){var t=this;this.axios.get("/course/getAllCourse").then(function(s){console.log(s),t.courseList=s.data},function(t){console.log(t)})},chooseCourse:function(t){var s=this;console.log(t),this.axios.post("/loginReginster/selectCourse",this.$qs.stringify({courseId:t})).then(function(t){console.log(t.data),console.log(t.data.status),1==t.data.status&&s.$router.push("/choice")},function(t){console.log(t.data.status)})}}},f={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"container"},t._l(t.courseList,function(s){return e("button",{staticClass:"btn btn-primary btn-lg btn-block",on:{click:function(e){t.chooseCourse(s.courseId)}}},[t._v(t._s(s.courseName))])}))},staticRenderFns:[]};var _=e("VU/8")(h,f,!1,function(t){e("/LPs")},"data-v-0fef713a",null).exports;n.a.use(i.a);var C=new i.a({routes:[{path:"/",name:"Loginin",component:d},{path:"/choice",name:"choice",component:v},{path:"/selectCourse",name:"selectCourse",component:_}]}),g=(e("qb6w"),e("mtWM")),b=e.n(g),w=e("Rf8U"),x=e.n(w);n.a.prototype.$qs=c.a,n.a.use(x.a,b.a),n.a.config.productionTip=!1,new n.a({el:"#app",router:C,components:{App:o},template:"<App/>"})},"Q0/0":function(t,s){},aEPf:function(t,s){},qb6w:function(t,s){}},["NHnr"]);
//# sourceMappingURL=app.39cac679fbbfaeee86ad.js.map