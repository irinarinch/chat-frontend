(()=>{"use strict";var e={};e.p="";const s=async function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{method:undefined,url:undefined,data:undefined,callback:undefined};const s=new XMLHttpRequest;s.responseType="json",s.onload=()=>{e.callback(s.response)},s.onerror=()=>{e.callback(s.error)},s.open(e.method,e.url),s.send(JSON.stringify(e.data))};class t{constructor(){this.url="https://chat-backend-ner9.onrender.com/new-user"}create(e,t){s({method:"POST",url:this.url,data:e,callback:t})}}class n extends t{getUser(e){this.user=e.user}}const r=e.p+"d15ccb23dba4de11f095.png";const a=document.getElementById("root"),i=new class{constructor(e){this.container=e,this.api=new n,this.websocket=null,this.connected=!1}init(){document.addEventListener("submit",(e=>{this.loginHandler(e),this.onEnterChatHandler(e)})),this.loginInput=document.querySelector(".login-input"),this.errorMessage=document.querySelector(".error-msg"),this.loginInput.oninput=()=>{this.errorMessage.textContent=""}}loginHandler(e){if(e.preventDefault(),!e.target.closest(".modal"))return;const s=this.loginInput.value.trim();""!==s?this.api.create({name:s},(e=>{"error"!==e.status?(this.api.getUser(e),document.querySelector(".modal").classList.add("hidden"),document.querySelector(".container").style.display="flex",this.subscribeOnEvents()):this.errorMessage.textContent=e.message})):this.errorMessage.textContent="Не может быть пустым"}subscribeOnEvents(){this.websocket=new WebSocket("wss://chat-backend-ner9.onrender.com/"),this.websocket.addEventListener("open",(()=>{this.connected=!0})),this.websocket.addEventListener("message",(e=>{const s=JSON.parse(e.data);Array.isArray(s)?this.renderMembers(s):this.renderMessage(s)})),window.onunload=()=>{this.sendMessage("exit"),this.websocket.close()}}onEnterChatHandler(e){if(!e.target.closest(".chat__messages-input"))return;e.preventDefault();const s=document.querySelector(".form__input");""!==s.value&&this.sendMessage("send",s.value),s.value=""}sendMessage(e,s){const t={user:this.api.user,type:e,message:s};this.websocket.send(JSON.stringify(t))}renderMessage(e){const s=document.querySelector(".chat__messages-container"),t=function(){const e=new Date,s=e.toLocaleDateString();return`${e.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})} ${s}`}();e.user.name===this.api.user.name?s.innerHTML+=`\n        <div class="message__container-yourself">\n          <div class="message__header">You, ${t}</div>\n          <div class="message">${e.message}</div>\n        </div> \n      `:s.innerHTML+=`\n        <div class="message__container-interlocutor">\n          <div class="message__header">${e.user.name}, ${t}</div>\n          <div class="message">${e.message}</div>\n        </div> \n      `,s.scrollTo(0,s.scrollHeight)}renderMembers(e){this.connectedMembers=document.querySelector(".chat__connect"),this.connectedMembers.innerHTML="",e.forEach((e=>{this.connectedMembers.innerHTML+=`\n        <div class="member">\n          <img src=${r} class="avatar">\n          <span class="member-name">${e.name}</span>\n        </div>\n      `}))}}(a);i.init()})();