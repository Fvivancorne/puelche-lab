'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { PORTFOLIO_PROJECTS, ProjectItem } from '@/data/portfolio';
import { MoveRight, Sparkles, Eye, ArrowUpRight } from 'lucide-react';

interface PuelcheJesperCarouselProps {
  className?: string;
}

// Shader GLSL embebido con la matemática de Jesper Landberg ajustada para Puelche Lab
const VERTEX_SHADER = `
  precision mediump float;
  attribute vec2 a_position;
  attribute vec2 a_uv;

  uniform vec2 u_resolution;
  uniform vec2 u_meshPos;
  uniform vec2 u_meshSize;
  uniform float u_velocity;

  varying vec2 v_uv;

  void main() {
    v_uv = a_uv;
    
    // Posición en pantalla (píxeles)
    vec2 pos = a_position * u_meshSize + u_meshPos;
    
    // Parabolic skew y curvatura elástica en Y proporcional a la velocidad
    float normX = (a_uv.x - 0.5) * 2.0;
    float normY = (a_uv.y - 0.5) * 2.0;
    
    // Arco elástico: mayor curvatura en el centro
    float curve = (1.0 - normX * normX) * u_velocity * 0.15;
    pos.y += curve * 30.0;
    
    // Inclinación lateral (skew) por arrastre
    pos.x += normY * u_velocity * 12.0;
    
    // Conversión a clip space (-1.0 a 1.0)
    vec2 zeroToOne = pos / u_resolution;
    vec2 zeroToTwo = zeroToOne * 2.0;
    vec2 clipSpace = zeroToTwo - 1.0;
    
    gl_Position = vec4(clipSpace * vec2(1.0, -1.0), 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;
  uniform sampler2D u_texture;
  uniform float u_velocity;
  uniform float u_opacity;
  
  varying vec2 v_uv;

  void main() {
    // Aberración cromática RGB proporcional a la aceleración
    float shift = clamp(u_velocity * 0.025, -0.04, 0.04);
    
    vec2 uvR = clamp(v_uv + vec2(shift, 0.0), 0.0, 1.0);
    vec2 uvG = v_uv;
    vec2 uvB = clamp(v_uv - vec2(shift, 0.0), 0.0, 1.0);
    
    float r = texture2D(u_texture, uvR).r;
    float g = texture2D(u_texture, uvG).g;
    float b = texture2D(u_texture, uvB).b;
    float a = texture2D(u_texture, v_uv).a;
    
    gl_FragColor = vec4(r, g, b, a * u_opacity);
  }
`;

export const PuelcheJesperCarousel: React.FC<PuelcheJesperCarouselProps> = ({
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  // Filtrar proyectos destacados con imagen válida
  const projects = PORTFOLIO_PROJECTS.filter((p) => p.featured && p.image).slice(0, 8);

  const cardWidth = 440;
  const gap = 44;
  const stride = cardWidth + gap;
  const totalWidth = projects.length * stride;

  // Física matemática Lerp
  const scrollRef = useRef({
    current: 0,
    target: 0,
    last: 0,
    velocity: 0,
    isDown: false,
    startX: 0,
    scrollLeft: 0,
  });

  const texturesRef = useRef<Map<string, WebGLTexture>>(new Map());
  const glRef = useRef<{
    gl: WebGLRenderingContext;
    program: WebGLProgram;
    uniforms: Record<string, WebGLUniformLocation>;
    buffer: WebGLBuffer;
  } | null>(null);

  // 1. Inicialización de WebGL
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: true, antialias: true, premultipliedAlpha: false });
    if (!gl) return;

    const createShader = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Quad unitario
    const positions = new Float32Array([
      0, 0,  0, 0,
      1, 0,  1, 0,
      0, 1,  0, 1,
      0, 1,  0, 1,
      1, 0,  1, 0,
      1, 1,  1, 1,
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(program, 'a_position');
    const aUv = gl.getAttribLocation(program, 'a_uv');

    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 16, 0);

    gl.enableVertexAttribArray(aUv);
    gl.vertexAttribPointer(aUv, 2, gl.FLOAT, false, 16, 8);

    const uniforms = {
      u_resolution: gl.getUniformLocation(program, 'u_resolution')!,
      u_meshPos: gl.getUniformLocation(program, 'u_meshPos')!,
      u_meshSize: gl.getUniformLocation(program, 'u_meshSize')!,
      u_velocity: gl.getUniformLocation(program, 'u_velocity')!,
      u_opacity: gl.getUniformLocation(program, 'u_opacity')!,
      u_texture: gl.getUniformLocation(program, 'u_texture')!,
    };

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    glRef.current = { gl, program, uniforms, buffer: buffer! };

    // Carga de Texturas
    projects.forEach((proj) => {
      const img = new Image();
      img.src = proj.image;
      img.onload = () => {
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        if (texture) texturesRef.current.set(proj.id, texture);
      };
    });

    return () => {
      texturesRef.current.forEach((t) => gl.deleteTexture(t));
      if (buffer) gl.deleteBuffer(buffer);
      if (program) gl.deleteProgram(program);
    };
  }, [projects]);

  // 2. Loop de Render y Animación Lerp
  useEffect(() => {
    let animId: number;

    const render = () => {
      const state = scrollRef.current;
      const canvas = canvasRef.current;
      const container = containerRef.current;
      const glState = glRef.current;

      if (!canvas || !container || !glState) {
        animId = requestAnimationFrame(render);
        return;
      }

      const { gl, program, uniforms } = glState;
      const width = container.clientWidth;
      const height = container.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }

      // Damping elástico Lerp (0.08)
      state.current += (state.target - state.current) * 0.08;
      state.velocity = (state.current - state.last) * 0.12;
      state.last = state.current;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.uniform2f(uniforms.u_resolution, width, height);
      gl.uniform1f(uniforms.u_velocity, state.velocity);

      // Render de tarjetas con wrapping infinito
      projects.forEach((proj, index) => {
        const itemBaseX = index * stride;
        let offset = ((itemBaseX - state.current) % totalWidth + totalWidth) % totalWidth;
        let posX = offset - (cardWidth / 2);

        if (posX > width) {
          posX -= totalWidth;
        }

        const cardHeight = cardWidth * 1.25;
        const posY = (height - cardHeight) / 2;

        // Frustum culling
        if (posX + cardWidth < -150 || posX > width + 150) return;

        const texture = texturesRef.current.get(proj.id);
        if (texture) {
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, texture);

          gl.uniform2f(uniforms.u_meshPos, posX, posY);
          gl.uniform2f(uniforms.u_meshSize, cardWidth, cardHeight);
          gl.uniform1f(uniforms.u_opacity, 1.0);
          gl.uniform1i(uniforms.u_texture, 0);

          gl.drawArrays(gl.TRIANGLES, 0, 6);
        }
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [projects, stride, totalWidth, cardWidth]);

  // 3. Controladores de Arrastre Táctil
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsGrabbing(true);
    scrollRef.current.isDown = true;
    scrollRef.current.startX = e.clientX;
    scrollRef.current.scrollLeft = scrollRef.current.target;
    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!scrollRef.current.isDown) return;
    const deltaX = (e.clientX - scrollRef.current.startX) * 1.5;
    scrollRef.current.target = scrollRef.current.scrollLeft - deltaX;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsGrabbing(false);
    scrollRef.current.isDown = false;
    if (containerRef.current && containerRef.current.hasPointerCapture(e.pointerId)) {
      containerRef.current.releasePointerCapture(e.pointerId);
    }
  };

  const handleWheel = useCallback((e: React.WheelEvent) => {
    scrollRef.current.target += (e.deltaY || e.deltaX) * 0.8;
  }, []);

  return (
    <section className={`relative w-full py-20 bg-[#111215] border-t border-b border-white/10 overflow-hidden ${className}`}>
      {/* Header Editorial de la Sección */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 text-white">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#59BFD6] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Muestra Tridimensional Awwwards</span>
          </div>
          <h2 className="font-condensed text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight">
            Cinta Infinita de Obras
          </h2>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-white/50" data-gl-shield="true">
          <span>Arrastra horizontalmente para deformar en 3D</span>
          <MoveRight className="w-4 h-4 text-[#59BFD6] animate-pulse" />
        </div>
      </div>

      {/* Contenedor del Carrusel WebGL */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
        data-cursor="drag"
        className={`relative w-full h-[65vh] min-h-[520px] select-none cursor-grab active:cursor-grabbing overflow-hidden`}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none z-10 block"
        />

        {/* HUD de Control Táctil */}
        <div className="absolute inset-x-0 bottom-6 z-20 flex justify-between items-center px-6 md:px-16 pointer-events-none text-white/60 font-mono text-xs">
          <span>WebGL 2.0 &bull; Damping Lerp: 0.08</span>
          <span className="hidden sm:inline">Desliza o usa la rueda</span>
          <span>8 Obras de Autor</span>
        </div>
      </div>
    </section>
  );
};

export default PuelcheJesperCarousel;
