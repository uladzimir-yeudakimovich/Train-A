import{a as me}from"./chunk-5BRKJRO7.js";import{b as ae,c as oe}from"./chunk-4W2HTQRK.js";import{a as re,b as ie,g as ne}from"./chunk-QETYXY27.js";import{c as L}from"./chunk-DHDEGNBN.js";import{a as I}from"./chunk-VZ4HLSKR.js";import{a as B}from"./chunk-E3YR2YRX.js";import"./chunk-YW5HVEMI.js";import{a as ce}from"./chunk-53VXDIFN.js";import{b as te,c as k}from"./chunk-YINHOYAG.js";import{a as S}from"./chunk-7T747AWH.js";import{a as ee}from"./chunk-AXXYKBND.js";import"./chunk-WTT3E6IK.js";import{f as G,h as C,j as A,k as z,o as H,p as J,q as K,s as Q,t as W,u as X,w as Y,y as Z}from"./chunk-JHSZ4YJF.js";import"./chunk-Y6UWJUYI.js";import{Ba as f,Ca as h,Db as g,Fb as _,Ia as j,Ka as T,Kb as d,Nb as U,Oa as q,Ob as $,Pb as a,Qb as n,Rb as p,Vb as O,_b as u,a as b,ac as s,b as R,ib as l,jb as D,ma as E,mc as c,oc as V,ra as x,ub as F,yc as P}from"./chunk-XM6RWNSX.js";function ge(e,t){e&1&&(a(0,"mat-error"),c(1,"Carriage name is required"),n())}function de(e,t){e&1&&(a(0,"mat-error"),c(1,"Invalid number of rows"),n())}function pe(e,t){e&1&&(a(0,"mat-error"),c(1,"Number of left seats must be between 1 and 5"),n())}function Ce(e,t){e&1&&(a(0,"mat-error"),c(1,"Number of right seats must be between 1 and 5"),n())}function ue(e,t){if(e&1&&p(0,"app-train-car",7),e&2){let m=s();_("carriage",m.prototypeCarriage())}}var N=(()=>{let t=class t{constructor(i,r){this.fb=i,this.destroyRef=r,this.carriage=null,this.addCarriage=new T,this.updateCarriage=new T,this.closeForm=new T,this.prototypeCarriage=F({name:"",rows:0,leftSeats:0,rightSeats:0,code:"",seats:[]}),this.carriageForm=this.fb.group({name:["",C.required],rows:[0,[C.required,C.min(1),C.max(50)]],leftSeats:[0,[C.required,C.min(1),C.max(5)]],rightSeats:[0,[C.required,C.min(1),C.max(5)]]})}ngOnInit(){this.carriage&&(this.carriageForm.patchValue(this.carriage),this.prototypeCarriage.set(this.carriage)),this.carriageForm.valueChanges.pipe(me(this.destroyRef)).subscribe(i=>{this.carriageForm.valid&&this.prototypeCarriage.update(r=>R(b(b({},r),i),{seats:te(b(b({},r),i))}))})}onSave(){if(this.carriageForm.valid&&!this.carriageForm.pristine){let i=b({code:this.carriage?this.carriage.code:""},this.carriageForm.value);this.carriage?this.updateCarriage.emit(i):this.addCarriage.emit(i)}}onReset(){this.carriageForm.reset()}onClose(){this.closeForm.emit()}isUpdateDisabled(){return this.carriageForm.pristine||!this.carriageForm.valid}};t.\u0275fac=function(r){return new(r||t)(D(Y),D(j))},t.\u0275cmp=x({type:t,selectors:[["app-carriage-form"]],inputs:{carriage:"carriage"},outputs:{addCarriage:"addCarriage",updateCarriage:"updateCarriage",closeForm:"closeForm"},standalone:!0,features:[P],decls:31,vars:8,consts:[[1,"carriage-card"],[1,"carriage-form",3,"ngSubmit","formGroup"],["appearance","fill",1,"form-field-container"],["matInput","","formControlName","name","placeholder","Enter carriage name"],["matInput","","type","number","formControlName","rows","min","1","max","50","placeholder","Enter number of rows"],["matInput","","type","number","formControlName","leftSeats","min","1","max","5","placeholder","Enter number of left seats"],["matInput","","type","number","formControlName","rightSeats","min","1","max","5","placeholder","Enter number of right seats"],[3,"carriage"],[1,"form-actions"],["mat-flat-button","","type","button",1,"btn","cancel-button",3,"click"],["mat-flat-button","","type","button",1,"btn","reset-button",3,"click"],["mat-flat-button","","type","submit",1,"btn",3,"disabled"]],template:function(r,o){if(r&1&&(a(0,"mat-card",0)(1,"form",1),u("ngSubmit",function(){return o.onSave()}),a(2,"mat-form-field",2)(3,"mat-label"),c(4,"Carriage Name"),n(),p(5,"input",3),g(6,ge,2,0,"mat-error"),n(),a(7,"mat-form-field",2)(8,"mat-label"),c(9,"Rows"),n(),p(10,"input",4),g(11,de,2,0,"mat-error"),n(),a(12,"mat-form-field",2)(13,"mat-label"),c(14,"Left Seats"),n(),p(15,"input",5),g(16,pe,2,0,"mat-error"),n(),a(17,"mat-form-field",2)(18,"mat-label"),c(19,"Right Seats"),n(),p(20,"input",6),g(21,Ce,2,0,"mat-error"),n(),a(22,"div"),g(23,ue,1,1,"app-train-car",7),n(),a(24,"div",8)(25,"button",9),u("click",function(){return o.onClose()}),c(26," Cancel "),n(),a(27,"button",10),u("click",function(){return o.onReset()}),c(28," Reset "),n(),a(29,"button",11),c(30),n()()()()),r&2){let M,v,w,y;l(),_("formGroup",o.carriageForm),l(5),d((M=o.carriageForm.get("name"))!=null&&M.invalid&&((M=o.carriageForm.get("name"))!=null&&M.touched)?6:-1),l(5),d((v=o.carriageForm.get("rows"))!=null&&v.invalid&&((v=o.carriageForm.get("rows"))!=null&&v.touched)?11:-1),l(5),d((w=o.carriageForm.get("leftSeats"))!=null&&w.invalid&&((w=o.carriageForm.get("leftSeats"))!=null&&w.touched)?16:-1),l(5),d((y=o.carriageForm.get("rightSeats"))!=null&&y.invalid&&((y=o.carriageForm.get("rightSeats"))!=null&&y.touched)?21:-1),l(2),d(o.prototypeCarriage().seats.length?23:-1),l(6),_("disabled",o.isUpdateDisabled()),l(),V(" ",o.carriage?"Update":"Save"," ")}},dependencies:[ne,oe,ae,re,ie,S,Z,H,G,J,A,z,X,W,K,Q,L,I],styles:["[_nghost-%COMP%]   .carriage-card[_ngcontent-%COMP%]{padding:15px;background-color:#f2f2f2}[_nghost-%COMP%]   .carriage-card[_ngcontent-%COMP%]   .carriage-form[_ngcontent-%COMP%]{margin:0 auto}[_nghost-%COMP%]   .carriage-card[_ngcontent-%COMP%]   .carriage-form[_ngcontent-%COMP%]   .form-field-container[_ngcontent-%COMP%]:not(:nth-child(4)){position:relative;padding-right:1rem}[_nghost-%COMP%]   .carriage-card[_ngcontent-%COMP%]   .carriage-form[_ngcontent-%COMP%]   .form-actions[_ngcontent-%COMP%]{margin:1rem auto 0;display:flex;justify-content:space-around;max-width:500px}[_nghost-%COMP%]   .carriage-card[_ngcontent-%COMP%]   .carriage-form[_ngcontent-%COMP%]   .form-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{min-width:25%}[_nghost-%COMP%]   .carriage-card[_ngcontent-%COMP%]   .carriage-form[_ngcontent-%COMP%]   .form-actions[_ngcontent-%COMP%]   .cancel-button[_ngcontent-%COMP%]{background-color:#fad099}[_nghost-%COMP%]   .carriage-card[_ngcontent-%COMP%]   .carriage-form[_ngcontent-%COMP%]   .form-actions[_ngcontent-%COMP%]   .reset-button[_ngcontent-%COMP%]{background-color:#afafaf}"]});let e=t;return e})();var _e=(e,t)=>t.code;function fe(e,t){if(e&1){let m=O();a(0,"h6",2),c(1),n(),a(2,"app-carriage-form",3),u("updateCarriage",function(r){f(m);let o=s(2);return h(o.updateCarriage(r))})("closeForm",function(){f(m);let r=s(2);return h(r.closeForm())}),n()}if(e&2){let m=s().$implicit;l(),V("Update ",m.name,""),l(),_("carriage",m)}}function he(e,t){if(e&1){let m=O();a(0,"button",4),u("click",function(){f(m);let r=s().$implicit,o=s();return h(o.toggleForm(r.code))}),a(1,"mat-icon",5),c(2,"edit_square"),n(),a(3,"label",6),c(4,"Update"),n()(),p(5,"app-train-car",7)}if(e&2){let m=s().$implicit;l(5),_("carriage",m)}}function Me(e,t){if(e&1&&(a(0,"mat-card",1),g(1,fe,3,2)(2,he,6,1),n()),e&2){let m=t.$implicit,i=s();l(),d(i.selectedCarriageCode()===m.code?1:2)}}var se=(()=>{let t=class t{constructor(){this.carriages=q.required(),this.selectedCarriageCode=F(null),this.store=E(k)}toggleForm(i){let r=this.selectedCarriageCode();this.selectedCarriageCode.set(r===i?null:i)}updateCarriage(i){this.store.updateCarriage(i),this.selectedCarriageCode.set(null)}closeForm(){this.selectedCarriageCode.set(null)}};t.\u0275fac=function(r){return new(r||t)},t.\u0275cmp=x({type:t,selectors:[["app-carriage-list"]],inputs:{carriages:[1,"carriages"]},standalone:!0,features:[P],decls:3,vars:0,consts:[[1,"list"],[1,"card"],[1,"text-center"],[3,"updateCarriage","closeForm","carriage"],["mat-raised-button","",1,"update-button",3,"click"],["id","update","aria-hidden","false","aria-label","Update route"],["for","edit"],[3,"carriage"]],template:function(r,o){r&1&&(a(0,"mat-list",0),U(1,Me,3,1,"mat-card",1,_e),n()),r&2&&(l(),$(o.carriages()))},dependencies:[ee,S,L,N,I,B],styles:["[_nghost-%COMP%]{display:block;width:100%}[_nghost-%COMP%]   .list[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;justify-content:space-between;gap:2rem}[_nghost-%COMP%]   .list[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]{padding:15px;background-color:#f2f2f2;width:100%}[_nghost-%COMP%]   .list[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .text-center[_ngcontent-%COMP%]{text-align:center}[_nghost-%COMP%]   .list[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .update-button[_ngcontent-%COMP%]{position:absolute;right:1rem}[_nghost-%COMP%]   .list[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .update-button[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{margin:0}"]});let e=t;return e})();function be(e,t){e&1&&(a(0,"div",0),p(1,"mat-spinner",1),a(2,"div",2),c(3,"Loading the carriages"),n()())}function xe(e,t){if(e&1){let m=O();a(0,"button",6),u("click",function(){f(m);let r=s(2);return h(r.isShowForm())}),c(1," Create new carriage "),n()}}function Fe(e,t){if(e&1){let m=O();a(0,"app-carriage-form",7),u("addCarriage",function(r){f(m);let o=s(2);return h(o.addCarriage(r))})("closeForm",function(){f(m);let r=s(2);return h(r.isShowForm())}),n()}}function Oe(e,t){if(e&1&&(a(0,"div",3),g(1,xe,2,0,"button",4)(2,Fe,1,0,"app-carriage-form"),n(),p(3,"app-carriage-list",5)),e&2){let m=s();l(),d(m.formVisible()?2:1),l(2),_("carriages",m.carriages())}}var mt=(()=>{let t=class t{constructor(){this.formVisible=F(!1),this.carriageStore=E(k)}ngOnInit(){this.carriageStore.getCarriages(),this.carriages=this.carriageStore.carriagesEntities}isShowForm(){this.formVisible.update(i=>!i)}addCarriage(i){this.formVisible.set(!1),this.carriageStore.addCarriage(i)}};t.\u0275fac=function(r){return new(r||t)},t.\u0275cmp=x({type:t,selectors:[["app-carriages"]],standalone:!0,features:[P],decls:2,vars:1,consts:[[1,"spinner-container"],[1,"spinner"],[1,"label"],[1,"carriage-form"],["mat-flat-button","",1,"button-center"],[3,"carriages"],["mat-flat-button","",1,"button-center",3,"click"],[3,"addCarriage","closeForm"]],template:function(r,o){r&1&&g(0,be,4,0,"div",0)(1,Oe,4,2),r&2&&d(o.carriages().length?1:0)},dependencies:[S,N,se,ce],styles:["[_nghost-%COMP%]{display:flex;flex-wrap:wrap;justify-content:center;width:85%;margin:0 auto}[_nghost-%COMP%]   .carriage-form[_ngcontent-%COMP%]{margin:1rem}[_nghost-%COMP%]   .carriage-form[_ngcontent-%COMP%]   .button-center[_ngcontent-%COMP%]{margin:0 auto}[_nghost-%COMP%]   .spinner-container[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;width:100%;height:100%;position:fixed;top:0;left:0}[_nghost-%COMP%]   .spinner-container[_ngcontent-%COMP%]   .spinner[_ngcontent-%COMP%]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}[_nghost-%COMP%]   .spinner-container[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%]{position:absolute;font-size:1.5rem;top:calc(50% - 6rem);left:50%;transform:translate(-50%)}"]});let e=t;return e})();export{mt as CarriagesComponent};
