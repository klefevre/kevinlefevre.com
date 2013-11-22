
var SCREEN_WIDTH = window.innerWidth,
    SCREEN_HEIGHT = window.innerHeight,
    SCREEN_WIDTH_HALF = SCREEN_WIDTH  / 2,
    SCREEN_HEIGHT_HALF = SCREEN_HEIGHT / 2;

var camera, scene, renderer, loader,
    logo,
    birds, bird;

var boid, boids;

init();
animate();

function init() {

    // Create a camera
    camera = new THREE.PerspectiveCamera(75, SCREEN_WIDTH/SCREEN_HEIGHT, 1, 10000);
    camera.position.set(0, 0, 450);

    // Create the scene
    scene = new THREE.Scene();

    // Load KL 3d logo
//    loader = new THREE.JSONLoader();
//    loader.load('assets/objects/logo.json', function(geometry) {
//        logo = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
//            color: 'black'
//        }));
//        logo.position.set(-155, 0, 100);
//        scene.add(logo);
//    });

    // Load birds
    birds = [];
    boids = [];
    for (var i = 0; i < 200; ++i) {
        boid = boids[ i ] = new Boid();
        boid.position.x = Math.random() * 400 - 200;
        boid.position.y = Math.random() * 400 - 200;
        boid.position.z = Math.random() * 400 - 200;
        boid.velocity.x = Math.random() * 2 - 1;
        boid.velocity.y = Math.random() * 2 - 1;
        boid.velocity.z = Math.random() * 2 - 1;
        boid.setAvoidWalls( true );
        boid.setWorldSize( 500, 500, 400 );

        bird = birds[i] = new THREE.Mesh(
            new Bird(),
            new THREE.MeshBasicMaterial({
                color: Math.random() * 0xffffff,
                side: THREE.DoubleSide
            }));
        bird.phase = Math.floor(Math.random() * 62.83);
        bird.position = boids[i].position;
        scene.add(bird);
    }

    // Create renderer
    renderer = new THREE.CanvasRenderer();
    renderer.autoClear = true;
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.getElementById('container').appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false );
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
    var vector = new THREE.Vector3( event.clientX - SCREEN_WIDTH_HALF, - event.clientY + SCREEN_HEIGHT_HALF, 0 );

    for (var i = 0, il = boids.length; i < il; ++i) {
        boid = boids[i];
        vector.z = boid.position.z;
        boid.repulse( vector );
    }
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    var time = Date.now() * 0.0005;

//    if (logo) {
//        logo.rotation.x -= 0.005;
//        logo.rotation.y -= 0.01;
//    }

    for (var i = 0, il = birds.length; i < il; i++) {
        boid = boids[i];
        boid.run( boids );

        bird = birds[i];

        color = bird.material.color;
        color.r = color.g = color.b = (500 - bird.position.z) / 1000;

        bird.rotation.y = Math.atan2(-boid.velocity.z, boid.velocity.x);
        bird.rotation.z = Math.asin(boid.velocity.y / boid.velocity.length());

        bird.phase = (bird.phase + (Math.max(0, bird.rotation.z) + 0.1)) % 62.83;
        bird.geometry.vertices[5].y = bird.geometry.vertices[4].y = Math.sin(bird.phase) * 5;
    }

    renderer.render(scene, camera);
}
