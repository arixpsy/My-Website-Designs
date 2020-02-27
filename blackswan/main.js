let scene, camera, renderer, cube, light;

function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1 , 5 );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById('background').appendChild( renderer.domElement );
    geometry = new THREE.IcosahedronGeometry();
    material = new THREE.MeshLambertMaterial( { color: 0xFFFFFF } );
    cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 2.5;

    light = new THREE.SpotLight( 0xFFFFFF, 1, 58);
    light.position.set( 0, 20, 50);
    scene.add( light );

    scene.background = new THREE.Color(0x454A4D);

}

function animate () {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.005;
    cube.rotation.y += 0.005;

    renderer.render( scene, camera);
};

init();
animate();



let currentSlide = 0;
let lastSlide = document.querySelectorAll(".slide").length - 1;
let scrolling = false;
let slideTransitionTime = 1000;

function nextSlide(){
    if(currentSlide != lastSlide){
        let slideDeck = document.querySelectorAll(".slide");
        slideDeck[currentSlide].classList.add("slide-up");
        slideDeck[currentSlide + 1].classList.remove("slide-down");
        currentSlide++;
    }
}

function previousSlide(){
    if(currentSlide != 0){
        let slideDeck = document.querySelectorAll(".slide");
        slideDeck[currentSlide].classList.add("slide-down");
        slideDeck[currentSlide - 1].classList.remove("slide-up");
        currentSlide--;
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

    if (scrolling != true){
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