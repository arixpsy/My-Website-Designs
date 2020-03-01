let scene, camera, renderer, cube, light, particles;

function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1 , 1000 );

    renderer = new THREE.WebGLRenderer({ antialias: true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById('background').appendChild( renderer.domElement );
    geometry = new THREE.IcosahedronGeometry(200);
    material = new THREE.MeshLambertMaterial( { color: 0xffffff } );
    cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 500;

    light = new THREE.SpotLight( 0xFFFFFF, 1, 500);
    light.position.set( 0, 200, 500);
    scene.add( light );

    scene.background = new THREE.Color(0x454A4D);
    createParticles();
}

function createParticles(){
    particles = new THREE.Group();
    let doubleSideMaterial = new THREE.MeshLambertMaterial( { color: 0xffffff, side: THREE.DoubleSide} );
    for (let i = 0; i < 100; i ++) {
        let geom = new THREE.Geometry();
        let v1 = new THREE.Vector3(0,0,0);
        let v2 = new THREE.Vector3(Math.random() * 80,0,0);
        let v3 = new THREE.Vector3(Math.random() * 80, Math.random() * 80, 0);

        geom.vertices.push(v1);
        geom.vertices.push(v2);
        geom.vertices.push(v3);

        geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
        geom.computeFaceNormals();
        geom.center();

        let mesh= new THREE.Mesh( geom, doubleSideMaterial);
        mesh.position.set((Math.random() - 0.5) * 1000,
                      (Math.random() - 0.5) * 1000,
                      (Math.random() - 0.5) * 1000);
        particles.add(mesh);
    }
    
    scene.add(particles);
}

function rotateIndividualParticle(){
    for (let i = 0; i < particles.children.length; i ++) {
        particles.children[i].rotation.y -= 0.0001;
        particles.children[i].rotation.z += 0.005;
    }
}

function animate () {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.005;
    cube.rotation.y += 0.005;
    particles.rotation.x += 0.0006;
    particles.rotation.y -= 0.0001;
    rotateIndividualParticle();

    renderer.render( scene, camera);
};

init();
animate();

// Slide Animation

let currentSlide = 0;
let lastSlide = document.querySelectorAll(".slide").length - 1;
let scrolling = false;
let slideTransitionTime = 1000;
let slideDeck = document.querySelectorAll(".slide");
let paginationDeck = document.querySelectorAll(".pagination ul li");
let header = document.querySelector("header h1");

function showHeader(){
    if(currentSlide == 0){
        header.classList.add('header-hidden');
    }else{
        header.classList.remove('header-hidden');
    }
}
function nextSlide(){
    if(currentSlide != lastSlide){
        slideDeck[currentSlide].classList.add("slide-up");
        slideDeck[currentSlide + 1].classList.remove("slide-down");
        
        paginationDeck[currentSlide].classList.remove("active-pagination");
        paginationDeck[currentSlide + 1].classList.add("active-pagination");
        
        currentSlide++;
        showHeader();
    }
}

function previousSlide(){
    if(currentSlide != 0){
        slideDeck[currentSlide].classList.add("slide-down");
        slideDeck[currentSlide - 1].classList.remove("slide-up");
        
        paginationDeck[currentSlide].classList.remove("active-pagination");
        paginationDeck[currentSlide - 1].classList.add("active-pagination");

        currentSlide--;
        showHeader();
    }
}
function slideTransitionLock(){
    setTimeout(()=>{
        scrolling = false;
    }, slideTransitionTime);
}

window.addEventListener('resize', ()=>{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
});

window.addEventListener('wheel', (event)=>{
    let delta;
    if (event.wheelDelta){
        delta = event.wheelDelta;
    }else{
        delta = -1 *event.deltaY;
    }

    if (scrolling != true && !navToggle.checked){
        if (delta <= -50){
            scrolling = true;
            nextSlide();
            slideTransitionLock();
        }else if (delta >= 50){
            scrolling = true;
            previousSlide();
            slideTransitionLock();
        }
        
        
    }
});


// Card Animation
let totalCards = document.querySelectorAll(".fade-card").length;
let currentCard = 0;
let cardVisibleTime = 7000;
let containerHover = false;

function nextCard(){
    let cardDeck = document.querySelectorAll(".fade-card");

    if(currentCard == totalCards - 1){
        cardDeck[currentCard].classList.remove("fade-card-active");
        cardDeck[0].classList.add("fade-card-active");
        currentCard = 0;
    }else{
        cardDeck[currentCard].classList.remove("fade-card-active");
        cardDeck[currentCard + 1].classList.add("fade-card-active");
        currentCard++;
    }
    
}

document.querySelector(".card-container").addEventListener('mouseover', ()=>{
    containerHover = true;
});
document.querySelector(".card-container").addEventListener('mouseout', ()=>{
    containerHover = false;
});

setInterval(()=>{
    if(!containerHover){
        nextCard();
    }
}, cardVisibleTime);

// navbar Animation

let navToggle = document.querySelector("input[id=navToggle]");
let shadow = document.querySelector(".shadow");
let pagination = document.querySelector(".pagination");
let scrollTab = document.querySelector(".scroll-tab");
let navbar = document.querySelector(".navbar");

function toggleNavbar(){
    if(navToggle.checked) {
        shadow.classList.add("shadow-expand");
        for(let i = 0; i <= lastSlide; i++){
            slideDeck[i].classList.add("slide-hide");
        }
        pagination.classList.add("slide-hide");
        scrollTab.classList.add("slide-hide");
        header.classList.add("slide-hide");
        navbar.classList.add("navbar-show");
    } else {
        shadow.classList.remove("shadow-expand");
        for(let i = 0; i <= lastSlide; i++){
            slideDeck[i].classList.remove("slide-hide");
        }
        pagination.classList.remove("slide-hide");
        scrollTab.classList.remove("slide-hide");
        header.classList.remove("slide-hide");
        navbar.classList.remove("navbar-show");
    }
}

navToggle.addEventListener("change", toggleNavbar);

function goToSlide(index){
    navToggle.checked = false;
    toggleNavbar();
    
    if(currentSlide == index){
        return;
    }
    
    if (currentSlide > index){
        for(let i = 0; i < currentSlide - index; i++){
            setTimeout(()=>{
                previousSlide();
            }, 200 * i)
        }
    }else{
        for(let i = 0; i < index - currentSlide; i++){
            setTimeout(()=>{
                nextSlide();
            }, 200 * i)
        }
    }
}