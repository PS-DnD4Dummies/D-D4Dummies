import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as dat from 'dat.gui';
import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DiceControls } from '@data/interfaces';
import { dicePositions } from '@data/constanst/dicePositions';

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
  private orbitControls!: OrbitControls;
  private modelLoader!: GLTFLoader;
  private dice!: THREE.Group;
  private tween!: TWEEN.Tween<DiceControls>;
  private randomTween!: TWEEN.Tween<DiceControls>
  private time = 0;

  private directionalLights:THREE.DirectionalLight[] = [];

  private controls:DiceControls = {
    rotationX:0,
    rotationY:0,
    rotationZ:0,
  };
  
  //private gui = new dat.GUI();


  constructor() { }

  ngAfterViewInit(): void {
    this.init();
  }

  createDice() {
    this.modelLoader.load('/assets/d20/DADO DND.gltf', (gltf) => {

      this.dice = new THREE.Group(); 
      this.dice.add(gltf.scene); 
  
      const boundingBox = new THREE.Box3().setFromObject(gltf.scene);
      const center = new THREE.Vector3();
      boundingBox.getCenter(center);
      gltf.scene.position.sub(center);
  
      this.scene.add(this.dice);

      this.directionalLights.forEach(light=>{
        light.target = this.dice.children[0];
        this.scene.add(light);
        console.log(this.dice)
        console.log(light)
      })

      this.initTween();
      this.animate(this.time);
      
    }, 
    (xhr) => {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      
    }, 
    (error) => {
      console.error('An error happened', error);
    });
  }


  /*createGUI(){
    this.gui.add(this.controls,"rotationX",-1,1,0.01);
    this.gui.add(this.controls,"rotationY",-1,1,0.01);
    this.gui.add(this.controls,"rotationZ",-1,1,0.01);
  }*/

  init() {
    this.scene = new THREE.Scene();
    this.modelLoader = new GLTFLoader();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0,0,0.6);
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvasRef.nativeElement });
    this.renderer.setSize(window.innerWidth, window.innerHeight);


    this.addLights();


    this.scene.background = new THREE.Color(0x333333);

    //this.camera.position.z = 1;

    //this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
    //this.orbitControls.update();

    this.createDice();


    //this.createGUI();
  }

  initTween(){

    this.randomTween = new TWEEN.Tween(this.controls,false)
      .to({
        rotationX:1,
        rotationY:3,
        rotationZ:3,
      },1000)
      .easing(TWEEN.Easing.Quadratic.InOut);

      this.tween = new TWEEN.Tween(this.controls,false);
  }

  rollDice(face:number){
    if(face>20 || face<=0){
      console.log("Face not found");
      return;
    }
    this.tween = new TWEEN.Tween(this.controls,false)
      .to(dicePositions[face],2000)
      .easing(TWEEN.Easing.Quadratic.InOut);

    this.randomTween.chain(this.tween).start(undefined,true);

  }

  //todo
  animationAllFaces(){
    for(var i=1; i<=20; i++){
      this.tween = new TWEEN.Tween(this.controls,false)
        .to(dicePositions[i],2000)
        .delay(i*2000)
        .start();
    }
    
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

  animate = (time: number) => {

    


    this.tween.update(time);
    this.randomTween.update(time);

    requestAnimationFrame(this.animate);


    if (this.dice) {
      this.dice.rotation.x = Math.PI * this.controls.rotationX;
      this.dice.rotation.y = Math.PI * this.controls.rotationY;
      this.dice.rotation.z = Math.PI * this.controls.rotationZ;
    }
    //this.orbitControls.update();
    this.renderer.render(this.scene, this.camera);
  };
}
