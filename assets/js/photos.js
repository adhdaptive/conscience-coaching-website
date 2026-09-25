const filters=document.querySelectorAll("[data-gallery-filter]");
const items=document.querySelectorAll("[data-gallery-category]");
filters.forEach(filter=>filter.addEventListener("click",()=>{
  const selected=filter.dataset.galleryFilter;
  filters.forEach(button=>button.setAttribute("aria-pressed",String(button===filter)));
  items.forEach(item=>{item.hidden=selected!=="all"&&item.dataset.galleryCategory!==selected});
}));

const dialog=document.querySelector(".gallery-dialog");
if(dialog){
  const dialogImage=dialog.querySelector("img");
  const dialogCaption=dialog.querySelector("p");
  document.querySelectorAll(".gallery-open").forEach(button=>button.addEventListener("click",()=>{
    const image=button.querySelector("img");
    dialogImage.src=image.src;
    dialogImage.alt=image.alt;
    dialogCaption.textContent=button.querySelector("span").textContent;
    dialog.showModal();
  }));
  dialog.querySelector(".gallery-close").addEventListener("click",()=>dialog.close());
  dialog.addEventListener("click",event=>{if(event.target===dialog)dialog.close()});
}
