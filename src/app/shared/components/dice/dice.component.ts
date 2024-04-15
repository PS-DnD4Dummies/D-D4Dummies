import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { threadId } from 'worker_threads';

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
  private dice!: THREE.Mesh;
  private controls!: OrbitControls;

  constructor() { }

  ngAfterViewInit(): void {
    this.init();
  }

  createDice() {

    const textures = [
      '/assets/textures/land.jpg',
      '/assets/textures/land.jpg',
      '/assets/textures/land.jpg',
      '/assets/textures/land.jpg',
      '/assets/textures/land.jpg',
      '/assets/textures/land.jpg',
      '/assets/textures/land.jpg',
      '/assets/textures/land.jpg',
      '/assets/textures/land.jpg',
      '/assets/textures/land.jpg',
      '/assets/textures/land.jpg',
      '/assets/textures/land.jpg',
      '/assets/textures/land.jpg',
      '/assets/textures/land.jpg',
      '/assets/textures/land.jpg',
      '/assets/textures/land.jpg',
      '/assets/textures/land.jpg',
      '/assets/textures/land.jpg',
      '/assets/textures/land.jpg',
      '/assets/textures/land.jpg',
    ];
    var materials = textures.map(texture => new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(texture) }));
    
    const geometry = new THREE.IcosahedronGeometry(5);
    //var material = new THREE.MeshBasicMaterial({color:0xffffff})
    this.dice = new THREE.Mesh(geometry, materials);
    this.scene.add(this.dice);
  }

  init() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvasRef.nativeElement });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.camera.position.z = 5;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.update();

    this.createDice();
    this.animate();
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    if (this.dice) {
      this.dice.rotation.x += 0.01;
      this.dice.rotation.y += 0.01;
    }
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };
}
