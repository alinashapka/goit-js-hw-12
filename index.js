import{a as v,i as c,S as E}from"./assets/vendor-BjRz3xa9.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();async function p(t,o=1){const a="49456082-a9826f5e30a55e93368b2873a",s="https://pixabay.com/api/",r={key:a,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:o};try{const i=await v.get(`${s}`,{params:r});return{images:i.data.hits,totalHits:i.data.totalHits}}catch(i){throw console.error("Error fetching images",i),i}}let g;function m(t,o){if(t.length===0){c.error({position:"topRight",backgroundColor:" #ef4040",messageColor:"#ffffff",message:"Sorry, there are no images matching your search query. Please try again!"});return}const a=t.map(s=>`<li class="gallery-item">
        <a href="${s.largeImageURL}" class="gallery-link">
            <img src="${s.webformatURL}" alt="${s.tags}" />
          </a>
          <div class="image-info">
            <p><span class="label">Likes:</span>${s.likes}</p>
            <p><span class="label">Views:</span>${s.views}</p>
            <p><span class="label">Comments:</span>${s.comments}</p>
            <p><span class="label">Downloads:</span>${s.downloads}</p>
          </div>
        </li>
    `).join("");o.insertAdjacentHTML("beforeend",a),g?g.refresh():g=new E(".gallery-link",{captionsData:"alt",captionDelay:250})}const y=document.querySelector(".form"),h=document.querySelector(".gallery"),n=document.querySelector(".loader"),u=document.querySelector(".load-btn");let l=1,f=0,d="";const L=15;n.style.visibility="hidden";u.classList.add("visually-hidden");y.addEventListener("submit",w);u.addEventListener("click",P);function b(){const t=document.querySelector(".gallery-item");if(t){const{height:o}=t.getBoundingClientRect();window.scrollBy({top:o*2,behavior:"smooth"})}}async function w(t){if(t.preventDefault(),l=1,f=0,d=t.target.elements["search-text"].value.trim(),!d){c.error({title:"Error!",position:"topRight",backgroundColor:" #ef4040",messageColor:"#ffffff",message:"Please, enter a search query!"});return}n.style.visibility="visible";try{const{images:o,totalHits:a}=await p(d,l);m(o,h),n.style.visibility="hidden",f=Math.ceil(a/L),f>l&&u.classList.remove("visually-hidden"),b()}catch{c.error({title:"Error!",position:"topRight",backgroundColor:" #ef4040",messageColor:"#ffffff",message:"Error fetching images"}),n.style.visibility="hidden"}finally{y.reset()}}async function P(){l+=1;try{const{images:t}=await p(d,l);m(t,h),n.style.visibility="hidden",l>=f&&(u.classList.add("visually-hidden"),c.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."})),b()}catch{c.error({title:"Error!",position:"topRight",backgroundColor:" #ef4040",messageColor:"#ffffff",message:"Error fetching images"}),n.style.visibility="hidden"}}
//# sourceMappingURL=index.js.map
