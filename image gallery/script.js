const gallery = document.getElementById("gallery");
const upload = document.getElementById("upload");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let images = [];
let currentIndex = 0;

function refreshGallery(){

    images = document.querySelectorAll(".gallery img");

    images.forEach((img,index)=>{

        img.onclick = ()=>{

            currentIndex=index;
            showImage();
            lightbox.style.display="flex";

        }

    });

    document.querySelectorAll(".delete-btn").forEach(btn=>{

        btn.onclick=()=>{

            btn.parentElement.remove();
            refreshGallery();

        }

    });

}

function showImage(){

    lightboxImg.src=images[currentIndex].src;

}

nextBtn.onclick=()=>{

    currentIndex++;

    if(currentIndex>=images.length){

        currentIndex=0;

    }

    showImage();

}

prevBtn.onclick=()=>{

    currentIndex--;

    if(currentIndex<0){

        currentIndex=images.length-1;

    }

    showImage();

}

closeBtn.onclick=()=>{

    lightbox.style.display="none";

}

lightbox.onclick=(e)=>{

    if(e.target===lightbox){

        lightbox.style.display="none";

    }

}

document.addEventListener("keydown",(e)=>{

    if(lightbox.style.display==="flex"){

        if(e.key==="ArrowRight"){

            nextBtn.click();

        }

        if(e.key==="ArrowLeft"){

            prevBtn.click();

        }

        if(e.key==="Escape"){

            lightbox.style.display="none";

        }

    }

});

upload.addEventListener("change",function(){

    [...this.files].forEach(file=>{

        const reader=new FileReader();

        reader.onload=function(e){

            const container=document.createElement("div");

            container.className="image-container";

            container.innerHTML=`

                <img src="${e.target.result}">
                <button class="delete-btn">Delete</button>

            `;

            gallery.appendChild(container);

            refreshGallery();

        }

        reader.readAsDataURL(file);

    });

});

refreshGallery();