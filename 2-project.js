const insitslider = () => {
  const imagelist = document.querySelector('.slider-wrapper .image-list');
  const slidebutton = document.querySelectorAll('.slider-wrapper .slide-button');
  const sliderscrollbar = document.querySelector('.container .slider-scrollbar');
  const scrollbarthumb = sliderscrollbar.querySelector('.scrollbar-thumb');
  const maxscrollleft = imagelist.scrollWidth - imagelist.clientWidth;

  scrollbarthumb.addEventListener('mousedown', (e) => {
      const startx = e.clientX;
      const thumbposition = scrollbarthumb.offsetLeft;

      const handlemMouseMove = (e) => {
        const deltax = e.clientX - startx;
        const newthumbposition = thumbposition + deltax;
        const maxthumbposition = sliderscrollbar.getBoundingClientRect().width - scrollbarthumb.offsetWidth;
        
        const boundedposition = Math.max(0, Math.min(maxthumbposition, newthumbposition));
        const scrollposition = (boundedposition / maxthumbposition) * maxscrollleft;
        scrollbarthumb.style.left = `${boundedposition}px`;
        imagelist.scrollLeft = scrollposition;
      }

      const handlemMouseup = () => {
        document.removeEventListener('mousemove', handlemMouseMove);
        document.removeEventListener('mouseup', handlemMouseup);
      }

      document.addEventListener('mousemove', handlemMouseMove)
      document.addEventListener('mouseup', handlemMouseup)
  });


  slidebutton.forEach(button => {
    button.addEventListener("click", () => {
      const direction = button.id === "prev-slide" ? -1 : 1;
      const scrollamount = imagelist.clientWidth * direction;
      imagelist.scrollBy({left: scrollamount, behavior: "smooth" });
    })
  });

  const handleslidebutton = () => {
    slidebutton[0].style.display = imagelist.scrollLeft <= 0? "none" : "block";
    slidebutton[1].style.display = imagelist.scrollLeft >= maxscrollleft? "none" : "block";
  }

  const updateScrollThumbPosition = () => {
    const scrollposition = imagelist.scrollLeft;
    const thumbposition = (scrollposition / maxscrollleft) * (sliderscrollbar.clientWidth - scrollbarthumb.offsetWidth)
    scrollbarthumb.style.left =`${thumbposition}px`;
  }

  imagelist.addEventListener("scroll", () => {
    handleslidebutton();
    updateScrollThumbPosition();
  })
}

window.addEventListener("load", insitslider)