

import { Component, ElementRef, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { AmbientLight, DirectionalLight, LinearSRGBColorSpace, Mesh, MeshPhongMaterial, PerspectiveCamera, Scene, SphereGeometry, WebGLRenderer, Vector2, UniformsUtils } from 'three';
// import { throttle } from 'lodash';
// import fragmentShader from './displacement-sphere-fragment.glsl';
// import vertexShader from './displacement-sphere-vertex.glsl';

@Component({
  selector: 'app-displacement-sphere',
  templateUrl: './displacement-sphere.component.html',
  styleUrls: ['./displacement-sphere.component.css']
})
export class DisplacementSphereComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  renderer!: WebGLRenderer;
  scene!: Scene;
  camera!: PerspectiveCamera;
  material!: MeshPhongMaterial;
  geometry!: SphereGeometry;
  sphere!: Mesh;
  uniforms!: any;
  mouse = new Vector2(0.8, 0.5);
  start = Date.now();
  animationId!: number;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initThreeJS();
    this.animate();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
    this.cleanUp();
  }

  initThreeJS(): void {
    const canvas = this.canvasRef.nativeElement;
    this.renderer = new WebGLRenderer({
      canvas: canvas,
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance',
      failIfMajorPerformanceCaveat: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(1);
    this.renderer.outputColorSpace = LinearSRGBColorSpace;

    this.camera = new PerspectiveCamera(54, window.innerWidth / window.innerHeight, 0.1, 100);
    this.camera.position.z = 52;

    this.scene = new Scene();

    this.material = new MeshPhongMaterial();
    this.material.onBeforeCompile = shader => {
      this.uniforms = UniformsUtils.merge([
        shader.uniforms,
        { time: { value: 0 } },
      ]);
      shader.uniforms = this.uniforms;
      // shader.vertexShader = vertexShader;
      // shader.fragmentShader = fragmentShader;
    };

    this.geometry = new SphereGeometry(32, 128, 128);
    this.sphere = new Mesh(this.geometry, this.material);
    this.sphere.position.z = 0;
    // this.sphere.modifier = Math.random();
    this.scene.add(this.sphere);

    this.addLights();
  }

  addLights(): void {
    const dirLight = new DirectionalLight(0xffffff, 1.8);
    const ambientLight = new AmbientLight(0xffffff, 2.7);

    dirLight.position.z = 200;
    dirLight.position.x = 100;
    dirLight.position.y = 100;

    this.scene.add(dirLight);
    this.scene.add(ambientLight);
  }

  animate(): void {
    this.animationId = requestAnimationFrame(() => this.animate());

    if (this.uniforms) {
      this.uniforms.time.value = 0.00005 * (Date.now() - this.start);
    }

    this.sphere.rotation.z += 0.001;
    this.renderer.render(this.scene, this.camera);
  }

  cleanUp(): void {
    if (this.renderer) {
      this.renderer.dispose();
    }
    if (this.scene) {
      this.scene.clear();
    }
  }
}