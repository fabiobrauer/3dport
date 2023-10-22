import './style.css';
import * as THREE from 'three';




// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(0);
camera.position.setX(-1);

renderer.render(scene, camera);



// Lights

/* const pointLight = new THREE.PointLight(0xffffff); */

/* const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 ); */
/* light.position.set(-1,1-2); */

const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
/* const lightHelper = new THREE.DirectionalLightHelper(directionalLight) */

directionalLight.position.set(1,0,1);
scene.add( directionalLight);



// Helpers
/* const ambientLight = new THREE.AmbientLight(0xffffff); */
 
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addRocks() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0x876039 });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(300).fill().forEach(addRocks);

// Background

const spaceTexture = new THREE.TextureLoader().load('spacebackground.jpg');
scene.background = spaceTexture;






const earthTexture = new THREE.TextureLoader().load('mapMesh.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: normalTexture,
  })
);

scene.add(earth);

earth.position.z = -5;
earth.position.setX(-2);



// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  earth.rotation.x += 0.05;
  earth.rotation.y += 0.075;
  earth.rotation.z += 0.05;



  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);



  earth.rotation.x += 0.005;

  renderer.render(scene, camera);
}

animate();