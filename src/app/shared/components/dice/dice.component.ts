import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss']
})
export class DiceComponent implements AfterViewInit {

  @ViewChild('canvas', { static: true })
  private canvasRef!: ElementRef<HTMLCanvasElement>;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private modelLoader!: GLTFLoader;
  private dice!: THREE.Object3D;

  private directionalLights:THREE.DirectionalLight[] = [];

  constructor() { }

  ngAfterViewInit(): void {
    this.init();
  }

  createDice() {
    this.modelLoader.load('/assets/d20/DADO DND.gltf', (gltf) => {
      this.dice = gltf.scene;
      //this.dice.scale.set(0.05,0.05,0.05);
      this.scene.add(this.dice);
      //this.dice.castShadow = true;
      //this.dice.receiveShadow = true;
      //this.spotLight.target = this.dice;

      this.directionalLights.forEach(light=>{
        light.target = this.dice.children[1];
        this.scene.add(light);
        console.log(this.dice)
        console.log(light)
      })
    }, 
    (xhr) => {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    }, 
    (error) => {
      console.error('An error happened', error);
    });
  }

  init() {
    this.scene = new THREE.Scene();
    this.modelLoader = new GLTFLoader();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0,0.5,1);
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvasRef.nativeElement });
    this.renderer.setSize(window.innerWidth, window.innerHeight);


    this.addLights();


    //this.scene.background = new THREE.Color(0xffffff);

    this.camera.position.z = 1;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.update();

    this.createDice();
    this.animate();
  }

  addLights(){
    const directionalLight = new THREE.DirectionalLight(0xffffff, 8);
    const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
    this.scene.add(directionalLightHelper);
    directionalLight.position.set(0, 10, 0);
    //this.scene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 12);
    const directionalLightHelper2 = new THREE.DirectionalLightHelper(directionalLight2);
    this.scene.add(directionalLightHelper2);
    directionalLight2.position.set(0, 1, 5);
    //this.scene.add(directionalLight2);

    const directionalLight3 = new THREE.DirectionalLight(0xffffff, 8);
    const directionalLightHelper3 = new THREE.DirectionalLightHelper(directionalLight3);
    this.scene.add(directionalLightHelper3);
    directionalLight3.position.set(0, -10, 0);
    //this.scene.add(directionalLight2);

    this.directionalLights.push(directionalLight);
    this.directionalLights.push(directionalLight2);
    this.directionalLights.push(directionalLight3);

    const ambientLight = new THREE.AmbientLight(0xffffff,1); // Intensidad 0.5
    this.scene.add(ambientLight);

    /*const hemisphereLight = new THREE.HemisphereLight(0xffffff,0xffffff,1);
    hemisphereLight.position.set(0,5,0);
    const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight,1,0xffffff);
    this.scene.add(hemisphereLight);
    this.scene.add(hemisphereLightHelper);*/

    // Luz puntual
    const pointLight = new THREE.PointLight(0xff0000,1, 100);
    pointLight.position.set(0, 5, 2);
    const pointLightHelper = new THREE.PointLightHelper(pointLight);
    this.scene.add(pointLightHelper);
    this.scene.add(pointLight);
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    if (this.dice) {
      //this.dice.rotation.x += 0.01;
      //this.dice.rotation.y += 0.01;
    }
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };
}
