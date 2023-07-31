import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as lil_gui from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import gsap from 'gsap'

THREE.ColorManagement.enabled = false

/**
 * Base
 */
// Debug
// const gui = new lil_gui.GUI()
// const cameraPosition = gui.addFolder('Camera Position')
// const text = gui.addFolder('Text')

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Axes helper
// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

const particleGeometry = new THREE.SphereGeometry(0.05, 32, 32)

const particleMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })

for (let i = 0; i < 1000; i++) {
    const particle = new THREE.Mesh(particleGeometry, particleMaterial)
    
    particle.position.x = (Math.random() - 0.5) * 20;
    particle.position.y = (Math.random() - 0.5) * 20;
    particle.position.z = (Math.random() - 0.5) * 20;

    const scale = Math.random() * 0.5
    particle.scale.set(scale, scale, scale)

    scene.add(particle);
}

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

// const matcapTextureShape = textureLoader.load('/textures/matcaps/3.png')
// const matcapTextureText = textureLoader.load('/textures/matcaps/3.png')

/**
 * Fonts
 */
const fontLoader = new FontLoader()

fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',

    (font) => {
        const myNameGeometry = new TextGeometry(
            'i\'m raul',
            {
                
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,                    
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4
            }
        )

        const developerIntroductionGeometry = new TextGeometry(
            'a creative developer', 
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4
            }
        )

        const hobbyIntroductionGeometry = new TextGeometry(
            'and an avid rock climber',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4
            }
        )

        // textGeometry.computeBoundingBox()
        // textGeometry.translate(
        //     -(textGeometry.boundingBox.max.x - 0.02) * 0.5,
        //     -(textGeometry.boundingBox.max.y - 0.02) * 0.5,
        //     -(textGeometry.boundingBox.max.z - 0.03) * 0.5
        // )

        myNameGeometry.center()
        developerIntroductionGeometry.center()
        hobbyIntroductionGeometry.center()
        const textMaterial = new THREE.MeshNormalMaterial()
        // const textMaterial = new THREE.MeshMatcapMaterial()
        // textMaterial.matcap = matcapTextureText
        const myNameText = new THREE.Mesh(myNameGeometry, textMaterial)
        const developerIntroductionText = new THREE.Mesh(developerIntroductionGeometry, textMaterial)
        const hobbyIntroductionText = new THREE.Mesh(hobbyIntroductionGeometry, textMaterial)
        developerIntroductionText.position.y = -1
        hobbyIntroductionText.position.y = -2
        scene.add(myNameText, developerIntroductionText, hobbyIntroductionText)
        
        // Debug text position
        // text.add(myNameText.position, 'x')
        //     .min(-10)
        //     .max(10)
        //     .step(0.01)
        //     .name('My Name X')
        
        // text.add(myNameText.position, 'y')
        //     .min(-10)
        //     .max(10)
        //     .step(0.01)
        //     .name('My Name Y')

        // text.add(myNameText.position, 'z')
        //     .min(-10)
        //     .max(10)
        //     .step(0.01)
        //     .name('My Name Z')
        
        // text.add(developerIntroductionText.position, 'x')
        //     .min(-10)
        //     .max(10)
        //     .step(0.01)
        //     .name('Developer Introduction X')

        // text.add(developerIntroductionText.position, 'y')
        //     .min(-10)
        //     .max(10)
        //     .step(0.01)
        //     .name('Developer Introduction Y')

        // text.add(developerIntroductionText.position, 'z')
        //     .min(-10)
        //     .max(10)
        //     .step(0.01)
        //     .name('Developer Introduction Z')

        // text.add(hobbyIntroductionText.position, 'x')
        //     .min(-10)
        //     .max(10)
        //     .step(0.01)
        //     .name('Hobby Introduction X')

        // text.add(hobbyIntroductionText.position, 'y')
        //     .min(-10)
        //     .max(10)
        //     .step(0.01)
        //     .name('Hobby Introduction Y')

        // text.add(hobbyIntroductionText.position, 'z')
        //     .min(-10)
        //     .max(10)
        //     .step(0.01)
        //     .name('Hobby Introduction Z')

        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
        const shapeMaterial = new THREE.MeshNormalMaterial()
        // const shapeMaterial = new THREE.MeshMatcapMaterial()
        // shapeMaterial.matcap = matcapTextureShape

        for (let i = 0; i < 50; i++) {
            const donut = new THREE.Mesh(donutGeometry, shapeMaterial)

            donut.position.x = (Math.random() - 0.5) * 25
            donut.position.y = (Math.random() - 0.5) * 25
            donut.position.z = (Math.random() - 0.5) * 25

            donut.rotation.x = Math.random() * Math.PI
            donut.rotation.y = Math.random() * Math.PI

            const scale = Math.random() - 0.5
            donut.scale.set(scale, scale, scale)

            scene.add(donut)
        }

        const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
        
        for (let i = 0; i < 50; i++) {
            const cube = new THREE.Mesh(cubeGeometry, shapeMaterial)

            cube.position.x = (Math.random() - 0.5) * 25
            cube.position.y = (Math.random() - 0.5) * 25
            cube.position.z = (Math.random() - 0.5) * 25

            cube.rotation.x = Math.random() * Math.PI
            cube.rotation.y = Math.random() * Math.PI

            const scale = Math.random()
            cube.scale.set(scale, scale, scale)

            scene.add(cube)
        }
    }
)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(4.84, -0.08, 4.84)
scene.add(camera)

// Debug camera position
// cameraPosition.add(camera.position, 'x')
//     .min(-10)
//     .max(10)
//     .step(0.01)
//     .name('Camera X')

// cameraPosition.add(camera.position, 'y')
//     .min(-10)
//     .max(10)
//     .step(0.01)
//     .name('Camera Y')

// cameraPosition.add(camera.position, 'z')
//     .min(-10)
//     .max(10)
//     .step(0.01)
//     .name('Camera Z')

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableZoom = false
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.outputColorSpace = THREE.LinearSRGBColorSpace
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
camera.position.set(0, 15, 15)
camera.lookAt(scene.position)
camera.updateProjectionMatrix()

const newTargetPosition = { 
    x: 0, 
    y: 0, 
    z: 5 
}

gsap.to(camera.position, {
    duration: 3,
    x: newTargetPosition.x, 
    y: newTargetPosition.y, 
    z: newTargetPosition.z,
    onUpdate: () => camera.updateProjectionMatrix(),
    onComplete: () => {
        controls.enabled = true; 
    }
})

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()