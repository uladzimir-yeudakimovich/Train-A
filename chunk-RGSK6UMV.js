import{a as $,b as A,c as B}from"./chunk-RF2E4EZS.js";import{f as g}from"./chunk-S5T3GM4L.js";import{p as k,q as P,r as x}from"./chunk-MYLRT4VQ.js";import{K as C,a as I,b as O,da as M,ga as w,la as y,ma as E,u as b,ub as N,x as d,y as j}from"./chunk-XM6RWNSX.js";var D={headers:new k({"Content-Type":"application/json"})},H=(()=>{let e=class e{constructor(t){this.http=t,this.role=localStorage.getItem("userRole"),this.userRole=N(this.role==="manager"?"manager":"user")}getUserInformation(){return this.http.get("profile",D).pipe(M(t=>{this.userRole.set(t.role),localStorage.setItem("userRole",t.role)}),C(t=>b(()=>t)))}updateUserInformation(t){return this.http.put("profile",t,D).pipe(C(r=>b(()=>r)))}updateUserPassword(t){return this.http.put("profile/password",t,D).pipe(C(r=>b(()=>r)))}};e.\u0275fac=function(r){return new(r||e)(y(x))},e.\u0275prov=w({token:e,factory:e.\u0275fac,providedIn:"root"});let o=e;return o})();function F(o,e){if(!o||!e)return;let a=new Date(o),r=new Date(e).getTime()-a.getTime();return Math.floor(r/6e4)}function U(o){let e={};return o.length===0||Object.keys(o[0].price).forEach(t=>{let r=o.reduce((n,i)=>{let s=i.price[t];return n+s},0);e[t]=r}),e}function G(o){let e={};return o.forEach(a=>{let t=a.name,r=e[t];r?r.push(a):e[t]=[a]}),e}function J(o,e,a){let t=[],r=o.path.indexOf(e),n=o.path.indexOf(a);if(r===-1||n===-1)return[];for(let i=r;i<n;i+=1)t.push(o.schedule.segments[i]);return t}function V(o){let e=G(o),a={};return Object.entries(e).forEach(([t,r])=>{let n=r.reduce((i,s)=>i+s.seats.filter(p=>p.state!==$.Reserved).length,0);a[t]=n}),a}function v(o,e){let a=[],t=1;return(e||o.map(n=>n.name)).forEach(n=>{let i=o.find(s=>s.name===n);if(i){let s=t+i.seats.length-1;a.push({from:t,to:s}),t=s+1}}),a}function st(o,e,a,t){let r=t||o.map(s=>s.name);return v(o,r)[e].from+a-1}function Q(o){let e=o[0].time[0],a=o[o.length-1].time[1],t=new Date(e);return new Date(a).getTime()-t.getTime()}function X(o,e){return o.reduce((a,t)=>a+t.price[e],0)}function Y(o,e){let a=o.seatId,t=v(e,o.carriages);for(let r=0;r<o.carriages.length;r+=1){let{from:n,to:i}=t[r];if(a>=n&&a<=i)return{carType:o.carriages[r],carNumber:r+1,seatNumber:a-n+1}}return{carType:"",carNumber:0,seatNumber:0}}function ct(o,e,a){let t=J(e,e.stationStart,e.stationEnd),r=o[e.stationStart].city,n=t[0].time[0],i=o[e.stationEnd].city,s=t[t.length-1].time[1],p=Q(t),{carType:l,carNumber:u,seatNumber:S}=Y(e,a),c=X(t,l);return{id:e.id,status:e.status,startStation:r,startTime:n,endStation:i,endTime:s,tripDuration:p,carType:l,carNumber:u,seatNumber:S,price:c}}function pt(o,e){let a=[];return o.forEach((t,r)=>{let n=r>0?e[r-1].time[1]:"",i=r<e.length?e[r].time[0]:"",s=F(n,i);a.push({station:t,arrival:n,departure:i,dwellTime:s})}),a}var q=(o,e)=>e.getTime()-o.getTime(),Z=(o,e,a)=>{let t=[],r=o.map(c=>({time:c.time,price:c.price,occupiedSeats:c.occupiedSeats})),n=U(r),i=e.map((c,f)=>{let m=a.find(T=>T.name===c);return O(I({},m),{code:(f+1).toString()})}),s=v(i),p=r.flatMap(c=>c.occupiedSeats),l=i.map((c,f)=>{let{from:m,to:T}=s[f],R=p.filter(h=>h>=m&&h<=T).map(h=>h-m+1);return O(I({},c),{seats:A(c,R)})}),u=V(l);return Array.from(new Set(e)).forEach(c=>{let f=n[c],m=u[c];t.push({carType:c,price:f,availableSeats:m})}),t},_=(o,e)=>o.map((a,t)=>{let r={stationId:a};switch(!0){case t===0:{let[n]=e[t].time;r.startTime=new Date(n);break}case t===e.length:{let[,n]=e[t-1].time;r.startTime=new Date(n);break}default:{let[,n]=e[t-1].time,[i]=e[t].time;r.startTime=new Date(n),r.endTime=new Date(i),r.timeSpan=q(r.startTime,r.endTime)}}return r}),W=(o,e)=>{let{from:a,to:t,routes:r}=o;return r.flatMap(({path:n,schedule:i,carriages:s})=>{let p=n.findIndex(u=>u===a.stationId),l=n.findIndex(u=>u===t.stationId);return i.map(({rideId:u,segments:S})=>{let c=S.slice(p<0?0:p,l),f=new Date(c.at(0).time[0]),m=new Date(c.at(-1).time[1]),T=q(f,m),R=_(n,S),h=Z(c,s,e);return{rideId:u,rideRoute:R,rideTime:T,carTypeInfo:h,rideFrom:{id:a.stationId,city:a.city,time:f},rideTo:{id:t.stationId,city:t.city,time:m}}})})};var Ct=(()=>{let e=class e{constructor(t,r){this.http=t,this.profileService=r,this.carriageStore=E(B),this.carriageStore.getCarriages()}loadRide(t){return d(this.http.get(`${g.Search}/${t}`)).catch(()=>({}))}loadOrders(){let r=this.profileService.userRole()==="manager"?"?all=true":"";return d(this.http.get(`${g.Order}${r}`)).catch(n=>{throw n})}cancelOrder(t){return d(this.http.delete(`${g.Order}/${t}`)).catch(r=>{throw r})}postOrder(t,r,n,i){let s={rideId:t,seat:r,stationStart:n,stationEnd:i};return d(this.http.post(g.Order,s)).catch(p=>{throw p})}getAvailableRoutes(t){let r=new P({fromObject:I({},t)});return d(this.http.get(g.Search,{params:r}).pipe(j(n=>{let i=this.carriageStore.carriagesEntities();return W(n,i)})))}};e.\u0275fac=function(r){return new(r||e)(y(x),y(H))},e.\u0275prov=w({token:e,factory:e.\u0275fac,providedIn:"root"});let o=e;return o})();export{U as a,G as b,J as c,V as d,v as e,st as f,ct as g,pt as h,H as i,Ct as j};
