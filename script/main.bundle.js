(()=>{"use strict";class t{constructor(t,e){this.modelInstance=t,this.viewInstance=e,this.bind()}getModelInstance(){return this.modelInstance}getViewInstance(){return this.viewInstance}bind(){this.modelInstance.subscribe("OPTIONS_CHANGED",(t=>{this.viewInstance.updateOptions(t)})),this.viewInstance.subscribe("UPDATE_VALUE",(t=>{this.modelInstance.updateValue(t)})),this.modelInstance.subscribe("VALUE_UPDATED",(t=>{this.viewInstance.updateValue(t)}))}}const e=(t,e,s,n)=>{if(s<=t)return t;if(s>=e)return e;const i=Math.abs(t-s),l=t+n*Math.round(i/n);return Math.round(100*l)/100},s=(t,e,s)=>(t-e)/(s-e)*100;class n{constructor(){this.observers={}}getObservers(){return this.observers}subscribe(t,e){this.observers[t]?this.observers[t].push(e):this.observers[t]=[e]}notify(t,e){return!!this.observers[t]&&(this.observers[t].forEach((t=>t(e))),!0)}}const i={min:0,max:10,step:1,scaleCounts:11,values:[5,6],vertical:!0,scale:!0,tooltip:!0,progress:!0};class l extends n{constructor(t){super(),this.options=Object.assign(Object.assign({},i),t),this.init()}getOptions(){const{options:t}=this;return JSON.parse(JSON.stringify(t))}updateValue({value:t,index:e}){const{values:s}=this.options,n=[...s];n[e]=t,this.setNewOptions({values:n}),this.notify("VALUE_UPDATED",{value:t,index:e})}setNewOptions(t){const e=JSON.parse(JSON.stringify(this.options));this.options=Object.assign(Object.assign({},e),t)}updateOptions(t){this.setNewOptions(t),this.normalizeOptions(),this.notify("OPTIONS_CHANGED",this.options)}init(){this.normalizeOptions()}normalizeOptions(){const t=this.normalizeMax(),e=this.normalizeStep(),s={max:t,scaleCounts:this.normalizeScaleCounts(),step:e,values:this.normalizeValues()};this.setNewOptions(s)}normalizeScaleCounts(){const{min:t,max:e,step:s,scaleCounts:n}=this.options;if(n<=0)return 1;const i=Math.abs(e-t)/s+1;return Math.round(i<n?i:n)}normalizeMax(){const{min:t,max:e,step:s}=this.options;return t>e||t===e?t+s:e}normalizeValues(){const{min:t,max:s,step:n,values:i}=this.options;return i.map((i=>e(t,s,i,n))).sort(((t,e)=>t-e))}normalizeStep(){const{step:t,min:e,max:s}=this.options,n=Math.abs(s-e);return t<=0?1:t>n?n:t}}class a{constructor({element:t,isVertical:e,handleTrackClick:s}){this.trackElement=document.createElement("div"),this.element=t,this.handleTrackClick=s,this.isVertical=e,this.render()}getElement(){return this.trackElement}toggleVerticalClass(){this.trackElement.classList.toggle("js-track--vertical")}destroy(){this.trackElement.remove()}render(){const{trackElement:t,element:e}=this;t.classList.add("js-track"),t.addEventListener("pointerdown",this.handleTrackClick),this.isVertical&&this.toggleVerticalClass(),e.append(t)}}class o{constructor({rootElement:t,values:e,min:s,max:n,range:i,vertical:l}){this.progressEl=document.createElement("div"),this.rootElement=t,this.values=e,this.min=s,this.max=n,this.range=i,this.vertical=l,this.init()}updateValues(t){this.values=t,this.updateProgressLength(),this.updatePosition()}destroy(){this.progressEl.remove()}getElement(){return this.progressEl}updateProgressLength(){const{progressEl:t,values:e,min:n,max:i,range:l,vertical:a}=this;let o;if(l){const t=Math.min(...e),l=Math.max(...e),a=s(t,n,i);o=s(l,n,i)-a}else o=s(e[0],n,i);a?t.style.height=`${o}%`:t.style.width=`${o}%`}toggleVerticalClass(){const{progressEl:t,vertical:e}=this;e?t.classList.add("js-progress--vertical"):t.classList.remove("js-progress--vertical")}updatePosition(){const{min:t,max:e,values:n,progressEl:i,range:l,vertical:a}=this;if(l){const l=Math.min(...n),o=s(l,t,e);a?i.style.bottom=`${o}%`:i.style.left=`${o}%`}else a?i.style.bottom="0%":i.style.left="0%"}init(){const{progressEl:t}=this;t.classList.add("js-progress"),this.updateProgressLength(),this.updatePosition(),this.rootElement.append(t),this.toggleVerticalClass()}}class r{constructor({rootDom:t,min:e,max:s,step:n,scaleCounts:i,vertical:l,handleScaleClick:a}){this.scaleEl=document.createElement("div"),this.rootDom=t,this.min=e,this.max=s,this.step=n,this.vertical=l,this.scaleCounts=i,this.handleScaleClick=a,this.render()}destroy(){this.scaleEl.remove()}getElement(){return this.scaleEl}createScalePoint(t){const{min:e,max:n,vertical:i}=this,l=document.createElement("div");l.classList.add("js-scale__point"),l.innerHTML=String(t);const a=s(t,e,n);return i?(l.classList.add("js-scale__point--vertical"),l.style.bottom=`${a}%`):l.style.left=`${a}%`,l}getScaleValues(){const{min:t,max:s,scaleCounts:n,step:i}=this,l=[],a=n-1,o=(s-t)/a;for(let n=0;n<=a;n+=1){let r;r=n===a?s:e(t,s,t+o*n,i),l.push(r)}return l}deleteScalePointsWhenPointOverlap(){const{scaleEl:t}=this,e=[...t.children];e.forEach(((s,n)=>{const i=s.getBoundingClientRect();for(let s=n+1;s<e.length;s+=1){const n=e[s],l=n.getBoundingClientRect();!(i.top>l.bottom||i.right<l.left||i.bottom<l.top||i.left>l.right)&&t.contains(n)&&t.removeChild(n)}}))}render(){const{rootDom:t,scaleEl:e,scaleCounts:s,vertical:n}=this;e.classList.add("js-scale"),n&&e.classList.add("js-scale--vertical");const i=this.getScaleValues(),l=[];for(let t=0;t<s;t+=1){const e=this.createScalePoint(i[t]);l.push(e)}e.append(...l),e.addEventListener("click",this.handleScaleClick),t.append(e),this.deleteScalePointsWhenPointOverlap()}}class c{constructor({rootElement:t,value:e,isVertical:s}){this.tooltipEl=document.createElement("div"),this.rootElement=t,this.value=e,this.isVertical=s,this.render()}destroy(){this.tooltipEl.remove()}getElement(){return this.tooltipEl}updateValue(t){this.value=t,this.updateInnerText()}toggleVerticalClass(){this.tooltipEl.classList.toggle("js-tooltip--vertical")}updateInnerText(){this.tooltipEl.textContent=String(this.value)}render(){const{tooltipEl:t}=this;t.classList.add("js-tooltip"),t.textContent=String(this.value),this.isVertical&&this.toggleVerticalClass(),this.rootElement.append(t)}}class h{constructor({rootElement:t,value:e,min:s,max:n,handleThumbPointerDown:i,index:l,isVertical:a,enableTooltip:o}){this.thumbEl=document.createElement("div"),this.tooltipInstance=null,this.rootElement=t,this.value=e,this.min=s,this.max=n,this.handleThumbPointerDown=i,this.index=l,this.enableTooltip=o,this.isVertical=a,this.enableTooltip&&(this.tooltipInstance=new c({rootElement:this.thumbEl,value:e,isVertical:a})),this.render()}getElement(){return this.thumbEl}destroy(){this.thumbEl.remove()}getValue(){return this.value}updateValue(t){this.value=t,this.tooltipInstance&&this.tooltipInstance.updateValue(t),this.updatePosition()}updatePosition(t){const{value:e,min:n,max:i,isVertical:l,thumbEl:a}=this;void 0===t?l?a.style.bottom=`${s(e,n,i)}%`:a.style.left=`${s(e,n,i)}%`:l?a.style.bottom=`${s(t,n,i)}%`:a.style.left=`${s(t,n,i)}%`}addActiveClass(){this.thumbEl.classList.add("js-thumb--active")}removeActiveClass(){this.thumbEl.classList.remove("js-thumb--active")}toggleVerticalClass(){this.thumbEl.classList.toggle("js-thumb--vertical")}render(){const{rootElement:t,thumbEl:e,handleThumbPointerDown:s,index:n,isVertical:i}=this;e.classList.add("js-thumb"),i&&this.toggleVerticalClass(),this.updatePosition(),e.addEventListener("pointerdown",(t=>s(t,n))),t.append(e)}}class u extends n{constructor(t,e){super(),this.sliderElement=document.createElement("div"),this.track=null,this.thumbsInstance=[],this.progressInstance=null,this.scaleInstance=null,this.thumbWithMaxValueIndex=-1,this.lastClickedThumbIndex=null,this.sliderElement.classList.add("js-custom-slider"),t.append(this.sliderElement),this.options=JSON.parse(JSON.stringify(e)),this.render()}getAllInstance(){return{track:this.track,thumbs:this.thumbsInstance,progress:this.progressInstance,scale:this.scaleInstance}}updateValue({value:t,index:e}){this.options.values[e]=t,this.thumbsInstance[e].updateValue(t),this.progressInstance&&this.progressInstance.updateValues(this.options.values),this.toggleActiveThumb(e)}updateOptions(t){this.options=t,this.destroyAllInstances(),this.render()}getOptions(){return this.options}getSliderElement(){return this.sliderElement}getCurrentValueFromCoords(t,e){const{min:s,max:n,vertical:i}=this.options,l=i?e:t,a=i?this.sliderElement.getBoundingClientRect().bottom:this.sliderElement.getBoundingClientRect().left,o=i?this.sliderElement.offsetHeight:this.sliderElement.offsetWidth;let r=i?a-l:l-a;return r<0&&(r=0),r>o&&(r=o),r/(o/100)*(n-s)/100+s}destroyAllInstances(){var t,e,s,n;null===(t=this.track)||void 0===t||t.destroy(),null===(e=this.progressInstance)||void 0===e||e.destroy(),this.thumbsInstance.forEach((t=>t.destroy())),null===(s=this.scaleInstance)||void 0===s||s.destroy(),null===(n=this.progressInstance)||void 0===n||n.destroy()}handleThumbPointerDown(t,e){t.stopPropagation(),t.preventDefault();const s=t=>{var s,n;const{min:i,max:l,values:a}=this.options,o=null!==(s=a[e-1])&&void 0!==s?s:i,r=null!==(n=a[e+1])&&void 0!==n?n:l;return t<o?o:t>r?r:t},n=({clientX:t,clientY:n})=>{const i=this.getCurrentValueFromCoords(t,n),l=s(i);this.thumbsInstance[e].updatePosition(l)},i=({clientX:t,clientY:l})=>{const{min:a,max:o,step:r,values:c}=this.options,h=((t,e,s,n,i)=>{if(s<=t)return t;if(s>=e)return e;const l=Math.abs(t-s),a=t+i*(n<s?Math.floor(l/i):Math.ceil(l/i));return Math.round(100*a)/100})(a,o,this.getCurrentValueFromCoords(t,l),c[e],r),u=s(h);this.notify("UPDATE_VALUE",{value:u,index:e}),document.removeEventListener("pointerup",i),document.removeEventListener("pointermove",n)};document.addEventListener("pointermove",n),document.addEventListener("pointerup",i);const{target:l}=t;l&&(l.ondragstart=()=>!1)}handleTrackClick(t){const{clientX:s,clientY:n}=t,{min:i,max:l,step:a}=this.options,o=this.getCurrentValueFromCoords(s,n),r=e(i,l,o,a);this.updateClickedValue(r)}handleScaleClick(t){const{target:e}=t;if(e.classList.contains("js-scale__point")){const t=Number(e.textContent);this.updateClickedValue(t)}}updateClickedValue(t){const{values:e}=this.options;let s=0;e.length>1&&(s=((t,e)=>{if(0===t.length)return-1;const s=t.reduce(((t,s)=>Math.abs(s-e)<Math.abs(t-e)?s:t)),n=t.reduce(((t,e,n)=>e===s?(t.push(n),t):t),[]);return 1===n.length?n[0]:e>s?n.length-1:0})(e,t)),this.notify("UPDATE_VALUE",{value:t,index:s})}toggleActiveThumb(t=null){const{values:e,max:s}=this.options,{thumbWithMaxValueIndex:n}=this;(()=>{var t,i;const l=e.findIndex((t=>t===s));-1===l?(null===(t=this.thumbsInstance[n])||void 0===t||t.removeActiveClass(),this.thumbWithMaxValueIndex=l):(null===(i=this.thumbsInstance[n])||void 0===i||i.removeActiveClass(),this.thumbsInstance[l].addActiveClass(),this.thumbWithMaxValueIndex=l)})(),(()=>{null!==t&&(null!==this.lastClickedThumbIndex&&this.thumbsInstance[this.lastClickedThumbIndex].removeActiveClass(),this.thumbsInstance[t].addActiveClass(),this.lastClickedThumbIndex=t)})()}render(){const{min:t,max:e,step:s,values:n,scaleCounts:i,vertical:l,tooltip:c,scale:u,progress:d}=this.options,p=n.length>1;this.track=new a({element:this.sliderElement,isVertical:l,handleTrackClick:this.handleTrackClick.bind(this)});const m=this.track.getElement();d&&(this.progressInstance=new o({rootElement:m,values:n,min:t,max:e,range:p,vertical:l})),u&&(this.scaleInstance=new r({rootDom:this.sliderElement,min:t,max:e,step:s,scaleCounts:i,vertical:l,handleScaleClick:this.handleScaleClick.bind(this)})),this.thumbsInstance=n.map(((s,n)=>new h({rootElement:m,value:s,min:t,max:e,handleThumbPointerDown:this.handleThumbPointerDown.bind(this),index:n,isVertical:l,enableTooltip:c}))),this.toggleActiveThumb()}}class d{constructor(e,s={}){this.modelInstance=new l(s);const n=this.modelInstance.getOptions();this.viewInstance=new u(e,n),this.presenterInstance=new t(this.modelInstance,this.viewInstance)}updateOptions(t){this.modelInstance.updateOptions(t)}onChangeOptions(t){const e=()=>{t(this.getOptions())};this.modelInstance.subscribe("OPTIONS_CHANGED",e),this.modelInstance.subscribe("VALUE_UPDATED",e)}getOptions(){return this.modelInstance.getOptions()}}!function(t){t.fn.rangeSlider=function(e={}){const s=t(this).get(0);if(s)return new d(s,e)}}(jQuery);class p{constructor(t,e){this.panelEl=t,this.slider=e,this.options=e.getOptions(),this.slider.onChangeOptions(this.onChangeOptions.bind(this)),this.findElements(),this.bindListeners()}findElements(){const{panelEl:t}=this,e=t.querySelector(".js-panel__min-field").querySelector("input"),s=t.querySelector(".js-panel__max-field").querySelector("input"),n=t.querySelector(".js-panel__step-field").querySelector("input"),i=t.querySelector(".js-panel__scale-counts-field").querySelector("input"),l=t.querySelector(".js-panel__thumbs-values").querySelectorAll("input"),a=t.querySelector(".js-panel__toggle-vertical-field").querySelector("input"),o=t.querySelector(".js-panel__toggle-scale-field").querySelector("input"),r=t.querySelector(".js-panel__toggle-tooltip-field").querySelector("input"),c=t.querySelector(".js-panel__toggle-progress-field").querySelector("input");this.panelElements={minInput:e,maxInput:s,stepInput:n,scaleCountsInput:i,scaleToggleInput:o,verticalToggleInput:a,tooltipToggleInput:r,progressToggleInput:c,valuesInputs:l}}handlerItemInputBlur(t,e){const s=t.target,{value:n}=s;this.slider.updateOptions({[e]:Number(n)})}handlerThumbInputBlur(t,e){const s=t.target,{value:n}=s;this.options.values[e]=Number(n),this.slider.updateOptions({values:this.options.values})}handlerToggleInputClick(t,e){const{options:s}=this;this.slider.updateOptions({[e]:!s[e]})}onChangeOptions(t){this.options=t,this.updateInputFieldsValues()}updateInputFieldsValues(){const{panelElements:t}=this,{minInput:e,maxInput:s,stepInput:n,scaleCountsInput:i,valuesInputs:l,scaleToggleInput:a,tooltipToggleInput:o,progressToggleInput:r,verticalToggleInput:c}=t;Object.entries(this.options).forEach((([t,h])=>{switch(t){case"min":e.value=String(h);break;case"max":s.value=String(h);break;case"step":n.value=String(h);break;case"scaleCounts":i.value=String(h);break;case"vertical":c.checked=h;break;case"progress":r.checked=h;break;case"tooltip":o.checked=h;break;case"scale":a.checked=h;break;case"values":h.forEach(((t,e)=>{l[e].value=String(t)}));break;default:throw new Error(`unexpected options key: ${t}`)}}))}bindListeners(){const{panelElements:t}=this,{minInput:e,maxInput:s,stepInput:n,scaleCountsInput:i,valuesInputs:l,scaleToggleInput:a,tooltipToggleInput:o,progressToggleInput:r,verticalToggleInput:c}=t;Object.keys(this.options).forEach((t=>{switch(t){case"min":e.addEventListener("blur",(e=>this.handlerItemInputBlur(e,t)));break;case"max":s.addEventListener("blur",(e=>this.handlerItemInputBlur(e,t)));break;case"step":n.addEventListener("blur",(e=>this.handlerItemInputBlur(e,t)));break;case"scaleCounts":i.addEventListener("blur",(e=>this.handlerItemInputBlur(e,t)));break;case"vertical":c.addEventListener("click",(e=>this.handlerToggleInputClick(e,t)));break;case"progress":r.addEventListener("click",(e=>this.handlerToggleInputClick(e,t)));break;case"tooltip":o.addEventListener("click",(e=>this.handlerToggleInputClick(e,t)));break;case"scale":a.addEventListener("click",(e=>this.handlerToggleInputClick(e,t)));break;case"values":this.options[t].forEach(((t,e)=>{l[e].addEventListener("blur",(t=>this.handlerThumbInputBlur(t,e)))}));break;default:throw new Error(`unexpected options key: ${t}`)}}))}}const m=document.querySelectorAll(".demo"),g=[{tooltip:!1,progress:!1,scale:!1,vertical:!1},{min:-100,max:30,step:10,values:[10]},{min:-100,max:-10,step:.33,vertical:!1,scaleCounts:2,progress:!1,values:[-33.01,-55.12]},{min:-1e3,max:1e4,step:.33,scaleCounts:5,tooltip:!1,vertical:!1,scale:!0,values:[33,5e3,3e3,6534,4043]},{values:[1]}];m.forEach(((t,e)=>{const s=t.querySelector(".slider"),n=t.querySelector(".panel"),i=$(s).rangeSlider(g[e]);new p(n,i)}))})();
//# sourceMappingURL=main.bundle.js.map