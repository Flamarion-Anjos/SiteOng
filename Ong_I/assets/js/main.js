
document.addEventListener('DOMContentLoaded', function(){
  // Year setter for any page
  var y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();

  // Lightbox advanced with thumbnails (operates if #lightbox and .galeria exist)
  var gallery = document.querySelectorAll('.galeria img');
  var lightbox = document.getElementById('lightbox');
  var lbImg = document.getElementById('lb-img');
  var lbCaption = document.getElementById('lb-caption');
  if(gallery && gallery.length && lightbox){
    // Build thumbnail row inside lightbox dynamically
    var content = lightbox.querySelector('.lb-content');
    var thumbRow = document.createElement('div');
    thumbRow.className = 'lb-thumb-row';
    gallery.forEach(function(img,i){
      img.setAttribute('data-index', i);
      var t = document.createElement('img');
      t.src = img.src; t.alt = img.alt; t.dataset.index = i;
      t.addEventListener('click', function(){ showImage(i); });
      thumbRow.appendChild(t);
    });
    content.appendChild(thumbRow);

    var closeBtn = lightbox.querySelector('.lb-close');
    var btnNext = lightbox.querySelector('.lb-next');
    var btnPrev = lightbox.querySelector('.lb-prev');
    var current = 0;
    function activateThumb(idx){
      var thumbs = thumbRow.querySelectorAll('img');
      thumbs.forEach(function(tt){ tt.classList.toggle('active', Number(tt.dataset.index)===idx); });
    }
    function showImage(i){
      current = i;
      lbImg.src = gallery[i].src;
      lbImg.alt = gallery[i].alt;
      if(lbCaption) lbCaption.textContent = gallery[i].alt || '';
      lightbox.setAttribute('aria-hidden','false');
      activateThumb(i);
    }
    gallery.forEach(function(img,i){ img.addEventListener('click', function(){ showImage(i); }); });
    if(closeBtn) closeBtn.addEventListener('click', function(){ lightbox.setAttribute('aria-hidden','true'); });
    if(btnNext) btnNext.addEventListener('click', function(){ showImage((current+1)%gallery.length); });
    if(btnPrev) btnPrev.addEventListener('click', function(){ showImage((current-1+gallery.length)%gallery.length); });
    lightbox.addEventListener('click', function(e){ if(e.target===lightbox) lightbox.setAttribute('aria-hidden','true'); });
    document.addEventListener('keydown', function(e){ if(lightbox.getAttribute('aria-hidden')==='false'){ if(e.key==='Escape') lightbox.setAttribute('aria-hidden','true'); else if(e.key==='ArrowRight') showImage((current+1)%gallery.length); else if(e.key==='ArrowLeft') showImage((current-1+gallery.length)%gallery.length); } });
  }
});
