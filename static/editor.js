!function(e){function t(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){var i=n(1),r=n(2),s=n(3);$.fn.NamaEditor=function(e){if(toastr.options.closeButton=!0,void 0===e)var e={};var t=$.extend(!0,s,e);$(this).each(function(e,s){var o=s;if("textarea"===o.tagName.toLowerCase()){var a=document.createElement("div"),c=document.createElement("div");a.className="NamaEditor NEMenu",o.className="NamaEditor NETextarea",o.name=document.querySelector("textarea").name,c.className+=" NamaEditor NERoot",c.appendChild(a);var l=i(a),u=r(o),d={textProc:u,editorOptions:t,tempsaves:new(n(4))({get:function(e,t){return null===localStorage.getItem(e)?t:localStorage.getItem(e)},set:function(e,t){return localStorage.setItem(e,t)}})};t.decorationButtons&&n(5)(l,d),t.tempsaves&&n(6)(l,d),t.fastUpload&&t.uploadFunc&&n(7)(l,d,s),t.style&&s.setAttribute("style",t.style);var f=s.value;s.parentNode.insertBefore(c,s),c.appendChild(o),o.value=f}})}},function(e,t){function n(e){var t={};return t.button=function(t){var n=document.createElement("button");n.className="NamaEditor NEMenuButton",n.setAttribute("type","button"),n.innerHTML=t,e.appendChild(n);var i={click:function(e){return n.addEventListener("click",e),i},hoverMessage:function(e){return n.setAttribute("title",e),i},right:function(){return n.className+=" NEright",i},active:function(){return n.setAttribute("active","yes"),i},deactive:function(){return n.removeAttribute("active"),i},remove:function(){return n.parentNode.removeChild(n),i},use:function(){return e.appendChild(n),i}};return i},t.dropdown=function(t){var n=document.createElement("div"),i=document.createElement("div"),r=document.createElement("ul");n.innerHTML="<div class=\"NEDropdownButtonLabel NamaEditor\">"+t+"</div>",n.className="NamaEditor NEMenuButton",i.className="NamaEditor NEDropDown",i.appendChild(r),n.appendChild(i),e.appendChild(n);i.style.display="none",n.addEventListener("click",function(){for(var t=e.querySelectorAll(".NamaEditor.NEMenuButton > .NamaEditor.NEDropDown"),r=0;r<t.length;r++)t[r]!=i?(t[r].style.display="none",t[r].parentNode.removeAttribute("hover")):"none"==i.style.display.trim()?(i.style.display="",n.setAttribute("hover","yes")):(i.style.display="none",n.removeAttribute("hover"))});var s={button:function(e,t){var n=document.createElement("li");n.innerHTML="<span class=\"NEHeadIcon\">"+e+"</span><span class=\"NEDescText\">"+t+"</span>",n.addEventListener("click",function(){i.style.display=""}),r.appendChild(n);var s={icon:function(e){return n.querySelector(".NEHeadIcon").innerHTML=e,s},text:function(e){return n.querySElector(".NEDescText").innerHTML=e,s},hoverMessage:function(e){return n.setAttribute("title",e),s},click:function(e){return n.addEventListener("click",e),s},right:function(){return n.className+="NEright",s},remove:function(){return r.removeChild(n),s},insert:function(){return r.appendChild(n),s},backwalk:function(){return r.removeChild(ilTag),r.appendChild(ilTag),s}};return s},right:function(){return liTag.className+="NEright",s},hoverMessage:function(e){return n.setAttribute("title",e),s},clear:function(){return r.innerHTML="",s}};return s},t}e.exports=n},function(e,t){function n(e){var t={};return t.value=function(){if(0==arguments.length)return e.value;e.value=arguments[0]},t.selectionText=function(){if(0==arguments.length)return e.value.substring(e.selectionStart,e.selectionEnd);var t=e.selectionStart,n=e.value.substring(0,e.selectionStart);n+=arguments[0],n+=e.value.substring(e.selectionEnd),e.value=n,e.focus(),e.selectionStart=t,e.selectionEnd=t+arguments[0].length},t.selectionStart=function(){if(0==arguments.length)return e.selectionStart;e.selectionStart=arguments[0]},t.selectionTest=function(e){return-1!=this.selectionText().search(e)},t.valueTest=function(e){return-1!=this.value().search(e)},t.selectionEnd=function(){if(0==arguments.length)return e.selectionEnd;e.selectionEnd=arguments[0]},t.selectionLength=function(){if(0==arguments.length)return e.selectionEnd-e.selectionStart;e.selectionEnd=e.selectionStart+arguments[0]},t.select=function(t,n){e.focus(),e.selectionStart=t,void 0!==n&&(e.selectionEnd=n)},t.WrapSelection=function(e,t){if(1==arguments.length)var t=e;var n=this.selectionText();void 0!==n&&null!=n&&""!=n||(n="내용");var i=this.selectionStart();n=e+n+t,this.selectionText(n),this.select(i+e.length,i+n.length-t.length)},t.addText=function(t){e.value=e.value.slice(0,a.selectionEnd)+t+e.value.slice(e.selectionEnd,e.value.length)},t.ToggleWrapSelection=function(e,t){function n(n){return 0==n.indexOf(e)&&n.lastIndexOf(t)==n.length-t.length}if(1==arguments.length)var t=e;var i=this.selectionText(),r=this.value().substring(this.selectionStart()-e.length,this.selectionEnd()+t.length),s=n(i),o=n(r);if(s){var a=this.selectionStart();this.selectionText(i.substring(e.length,i.length-t.length)),this.select(a,a+i.length-e.length-t.length)}else if(o){var a=this.selectionStart()-e.length;this.selectionStart(a),this.selectionEnd(a+r.length),this.selectionText(r.substring(e.length,r.length-t.length)),this.select(a,a+r.length-e.length-t.length)}else this.WrapSelection(e,t)},t}e.exports=n},function(e,t){e.exports={decorationButtons:!0,tempsaves:!0,docName:"unnamed namaeditor document",style:null,section:null,fastUpload:!1,uploadFunc:function(e,t){for(var n=[],i=0;i<e.length;i++){var r=e[i];console.log("file name : "+r.name),console.log("file type : "+r.type),console.log("file size : "+r.size),n.push({filename:r.name,success:!1})}t(null,n)}}},function(e,t){function n(e){function t(){return JSON.parse(e.get("NamaEditor-tempsaves","{}"))}function n(t){e.set("NamaEditor-tempsaves",JSON.stringify(t))}this.getTempsavedDocs=function(){return Object.keys(t())},this.getTempsaves=function(e){var n=t();return n[e]?n[e]:[]},this.getTempsave=function(e,n){var i=t();return i[e]&&i[e].any(function(e){return e.timestamp===n})?i[e].filter(function(e){return e.timestamp===n})[0]:null},this.saveTempsave=function(e,i,r,s){if(void 0===s)var s=null;var o=t();o[e]?o[e].push({timestamp:i,value:r,section:s}):o[e]=[{timestamp:i,value:r,section:s}],n(o)},this.deleteTempsave=function(e,i){var r=t();r[e]&&(r[e]=r[e].filter(function(e){return e.timestamp!==i}),n(r))},this.deleteTempsaves=function(e){var i=t();i[e]&&(delete i[e],n(i))},this.deleteAllTempsaves=function(e){n({})}}e.exports=n},function(e,t){e.exports=function(e,t){var n=function(e){return function(){return this.textProc.ToggleWrapSelection(e)}.bind(t)},i=function(e){return function(){var t=/^\{\{\{\+([12345]) (.+?)\}\}\}$/;if(this.textProc.selectionTest(t)){var n=t.exec(this.textProc.selectionText()),i=parseInt(n[1]);e&&i<5?i++:!e&&i>1&&i--,this.textProc.selectionText("{{{+"+i+" "+n[2]+"}}}")}else e?this.textProc.selectionText("{{{+1 "+this.textProc.selectionText()+"}}}"):this.textProc.selectionText("{{{+5 "+this.textProc.selectionText()+"}}}")}.bind(t)};e.button("<i class=\"material-icons\">format_bold</i>").hoverMessage("굵게").click(n("'''")),e.button("<i class=\"material-icons\">format_italic</i>").hoverMessage("이텔릭").click(n("''")),e.button("<i class=\"material-icons\">format_underlined</i>").hoverMessage("밑줄").click(n("__")),e.button("<i class=\"material-icons\">strikethrough_s</i>").hoverMessage("취소선").click(n("--")),e.button("<i class=\"material-icons\">remove</i>").hoverMessage("글씨 작게").click(i(!1)),e.button("<i class=\"material-icons\">add</i>").hoverMessage("글씨 크게").click(i(!0)),e.button("<i class=\"material-icons\">filter_frames</i>").hoverMessage("틀").click(function(e){return function(){return this.textProc.addText(e)}.bind(t)}("[include(틀:)]"))}},function(e,t){e.exports=function(e,t){e.button("<i class=\"material-icons\">cloud_upload</i>").hoverMessage("임시저장").click(function(){return this.tempsaves.saveTempsave(this.editorOptions.docName,Date.now(),this.textProc.value(),this.editorOptions.section),toastr.success("임시저장 완료. <br>문단명 : "+this.editorOptions.docName+(this.editorOptions.section?"<br> 문단 번호 : "+this.editorOptions.section:""))}.bind(t)),e.button("<i class=\"material-icons\">cloud_download</i>").hoverMessage("불러오기").click(function(){var e=this.editorOptions.section,t=this.tempsaves.getTempsaves(this.editorOptions.docName).filter(function(t){return t.section===e});if(0===t.length)return toastr.error("해당 문서의 해당 문단에 대해 임시저장이 없습니다.");t=t.sort(function(e,t){return t.timestamp-e.timestamp}),this.textProc.value(t[0].value);var n=new Date(t[0].timestamp);return toastr.success("성공적으로 "+n.toString()+"에 저장된 임시저장을 반영했습니다.")}.bind(t))}},function(e,t){e.exports=function(e,t,n){function i(e,t){if(e)throw toastr.error("파일 업로드중 무언가 오류가 발생했습니다.<br>"+e.message),$(n).prop("disabled",!1),e;for(var i=0;i<t.length;i++){var s=t[i];s.success?(toastr.success("파일 업로드 성공<br>파일 이름 : "+s.filename+"<br>위키내 파일 문서 이름 : "+s.docName),r.selectionText(r.selectionText()+"[["+s.docName+"]]")):toastr.error("파일 업로드 실패<br>파일 이름 : "+s.filename)}$(n).prop("disabled",!1)}var r=t.textProc,s=t.editorOptions,o=n;o.addEventListener("drop",function(e){e.preventDefault();var t=e.dataTransfer,r=[];if(t.items){for(var o=0;o<t.items.length;o++)if("file"==t.items[o].kind){var a=t.items[o].getAsFile();r.push(a)}}else for(var o=0;o<t.files.length;o++)r.push(t.files[o]);0!==r.length&&($(n).prop("disabled",!0),s.uploadFunc(r,i))}),o.addEventListener("dragover",function(e){e.preventDefault()}),o.addEventListener("dragend",function(e){var t=e.dataTransfer;if(t.items)for(var n=0;n<t.items.length;n++)t.items.remove(n);else e.dataTransfer.clearData()}),e.button("<span class=\"fa fa-image\"></span>").hoverMessage("이미지 업로드").click(function(){var e=$("input#namaeditor-file").length>0?document.querySelector("input#namaeditor-file"):document.createElement("input");e.id="namaeditor-file",e.setAttribute("type","file"),e.setAttribute("multiple","1"),e.style.visibility="hidden",e.setAttribute("accept","image/*"),document.body.appendChild(e),e.addEventListener("change",function(e){0!==e.target.files.length&&($(n).prop("disabled",!0),s.uploadFunc(e.target.files,i))}),e.click()})}}])
