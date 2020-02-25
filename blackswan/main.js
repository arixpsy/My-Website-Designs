var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.getElementById('background').appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshLambertMaterial( { color: 0xFFFFFF } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 2;

var light = new THREE.PointLight( 0xFFFFFF, 1, 100);
light.position.set( 0, 30, 0);
scene.add( light );

var light2 = new THREE.PointLight( 0xFFFFFF, 1, 100);
light2.position.set( 0, -30, 0);
scene.add( light2 );


var animate = function () {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.001;
    cube.rotation.y += 0.001;

    renderer.render( scene, camera);
};

animate();