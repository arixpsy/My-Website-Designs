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
    // particles = new THREE.Group();
    
    // scene.add(particles);
    var geom = new THREE.Geometry();
    var v1 = new THREE.Vector3(0,0,0);
    var v2 = new THREE.Vector3(15,0,0);
    var v3 = new THREE.Vector3(15,15,0);

    geom.vertices.push(v1);
    geom.vertices.push(v2);
    geom.vertices.push(v3);

    geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
    geom.computeFaceNormals();

    var mesh= new THREE.Mesh( geom, new THREE.MeshNormalMaterial() );
    mesh.position.z = 300;
    scene.add( mesh);
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
        
        let paginationDeck = document.querySelectorAll(".pagination ul li");
        paginationDeck[currentSlide].classList.remove("active-pagination");
        paginationDeck[currentSlide + 1].classList.add("active-pagination");
        
        currentSlide++;
    }
}

function previousSlide(){
    if(currentSlide != 0){
        let slideDeck = document.querySelectorAll(".slide");
        slideDeck[currentSlide].classList.add("slide-down");
        slideDeck[currentSlide - 1].classList.remove("slide-up");

        let paginationDeck = document.querySelectorAll(".pagination ul li");
        paginationDeck[currentSlide].classList.remove("active-pagination");
        paginationDeck[currentSlide - 1].classList.add("active-pagination");

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