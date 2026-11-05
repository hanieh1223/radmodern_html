/* راد مدرن — حرکت‌های صفحه اصلی */
(function(){
  var d=document, reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ظاهر شدن تدریجی هنگام اسکرول (با تأخیر پله‌ای بین کارت‌های هم‌ردیف) */
  var items=d.querySelectorAll('.sec-title,.services .svc,.feat,.tech,.why-visual,.cta .wrap,.sc-frame');
  items.forEach(function(el){
    el.classList.add('reveal');
    el.style.setProperty('--i',Array.prototype.indexOf.call(el.parentNode.children,el));
  });
  if(reduce||!('IntersectionObserver' in window)){
    items.forEach(function(el){el.classList.add('is-in')});
  }else{
    var io=new IntersectionObserver(function(list){
      list.forEach(function(e){
        if(e.isIntersecting){e.target.classList.add('is-in');io.unobserve(e.target);}
      });
    },{threshold:.15,rootMargin:'0px 0px -40px 0px'});
    items.forEach(function(el){io.observe(el)});
  }

  /* نمونه‌کار: کارت عریض (دسکتاپ) و کارت‌های باریک (موبایل)؛ کلیک جای آن‌ها را عوض می‌کند */
  var sc=d.querySelector('.showcase');
  if(sc){
    var its=[].slice.call(sc.querySelectorAll('.sc-item')),dots=[].slice.call(sc.querySelectorAll('.sc-dots button')),
        hd=sc.querySelector('.sc-screen h3'),sb=sc.querySelector('.sc-screen p'),tab=sc.querySelector('.sc-tab b'),cur=0,t;
    function set(i){
      if(i===cur)return; cur=i;
      its.forEach(function(el,k){var on=k===i;el.classList.toggle('is-active',on);el.setAttribute('aria-expanded',on);dots[k].classList.toggle('is-on',on);});
      sc.classList.add('is-swap');clearTimeout(t);
      t=setTimeout(function(){hd.textContent=its[i].dataset.head;sb.textContent=its[i].dataset.sub;tab.textContent=its[i].dataset.name;sc.classList.remove('is-swap');},reduce?0:200);
    }
    its.forEach(function(el,k){
      el.addEventListener('click',function(e){if(!e.target.closest('a'))set(k);});
      el.addEventListener('keydown',function(e){if((e.key==='Enter'||e.key===' ')&&e.target===el){e.preventDefault();set(k);}});
    });
    dots.forEach(function(b,k){b.addEventListener('click',function(){set(k);});});
    sc.querySelector('.sc-swap').addEventListener('click',function(){set((cur+1)%its.length);});
  }
})();