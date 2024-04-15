import { Component } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/js/controls/OrbitControls.js';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrl: './dice.component.scss'
})
export class DiceComponent {


  private scene!: THREE.Scene;
  private camera!:THREE.Camera;
  private renderer = new THREE.WebGLRenderer();
  private dice!:THREE.Mesh;
  private controls!:OrbitControls;

  constructor(){
    this.init();
    this.animate();
  }

  createDice() {

      var material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe:true });
      var geometry = new THREE.IcosahedronGeometry(1);

      this.dice = new THREE.Mesh(geometry, material);

      this.scene.add(this.dice);
  }


  init() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    this.camera.position.z = 5;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.update();
    }

    animate() {
      requestAnimationFrame(this.animate);
      if (this.dice) {
        this.dice.rotation.x += 0.01;
        this.dice.rotation.y += 0.01;
      }
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
   }


}
