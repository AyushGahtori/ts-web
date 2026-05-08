"use client";

import { useEffect, useRef } from "react";
import styles from "./brandFooter.module.css";

/* ── GLSL ────────────────────────────────────────────────────────────────── */

const VERT = /* glsl */ `
  attribute vec2 a_pos;
  void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = /* glsl */ `
  precision highp float;

  uniform vec2      u_res;
  uniform vec2      u_mouse;    /* fast-eased cursor, 0-1 */
  uniform vec2      u_trail;    /* slow-eased cursor      */
  uniform float     u_accDist;  /* accumulated travel     */
  uniform float     u_time;     /* wall clock             */
  uniform sampler2D u_mask;
  uniform float     u_mobile;

  /* ── HSV → RGB ─────────────────────────────────────────────────────────── */
  vec3 hsv(float h, float s, float v) {
    vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
    vec3 p = abs(fract(vec3(h) + K.xyz) * 6.0 - K.www);
    return v * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), s);
  }

  /* ── Gradient noise + rotating FBM ────────────────────────────────────── */
  vec2 rnd2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453);
  }
  float gnoise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f*f*f*(f*(f*6.0 - 15.0) + 10.0);
    return mix(
      mix(dot(rnd2(i),          f),           dot(rnd2(i+vec2(1,0)), f-vec2(1,0)), u.x),
      mix(dot(rnd2(i+vec2(0,1)),f-vec2(0,1)), dot(rnd2(i+vec2(1,1)), f-vec2(1,1)),u.x),
      u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    mat2  m = mat2(1.6, 1.2, -1.2, 1.6);
    for (int i = 0; i < 5; i++) { v += a * gnoise(p); p = m * p; a *= 0.5; }
    return v;
  }

  /* ── Smooth blob falloff ───────────────────────────────────────────────── */
  float blob(vec2 uv, vec2 c, float r) {
    float d = length(uv - c);
    float t = smoothstep(r, 0.0, d);
    return t * t * (3.0 - 2.0 * t);
  }

  /* ── Build a blob's color from hue + caustic + proximity ──────────────── */
  vec3 blobCol(float hue, float caus, float prox, float caH) {
    vec3 c;
    c.r = hsv(hue - caH, 0.98, 0.35 + 0.65 * caus).r;
    c.g = hsv(hue,       0.92, 0.25 + 0.75 * caus).g;
    c.b = hsv(hue + caH, 0.96, 0.45 + 0.55 * caus).b;
    c  += pow(caus, 2.5) * prox * vec3(0.5, 0.80, 1.0) * 0.9;
    c  *= 0.5 + 3.8 * prox;
    return clamp(c, 0.0, 1.0);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_res;
    uv.y = 1.0 - uv.y;

    /* Mask + chromatic edge fringe */
    float cs = 0.006;
    float mR = texture2D(u_mask, uv + vec2( cs, 0.0)).r;
    float mG = texture2D(u_mask, uv).r;
    float mB = texture2D(u_mask, uv - vec2( cs, 0.0)).r;
    if (mG < 0.02) { gl_FragColor = vec4(0.0); return; }

    /* ── FBM distortion field ─────────────────────────────────────────────── */
    float t    = u_time * 0.14 + u_accDist * 2.0;
    vec2  q    = vec2(fbm(uv*3.0 + t),              fbm(uv*3.0 + vec2(5.2, 1.3) + t));
    vec2  rr   = vec2(fbm(uv*2.5 + q + vec2(1.7, 9.2) + t*0.9),
                      fbm(uv*2.5 + q + vec2(8.3, 2.8) + t*0.9));
    float warp  = fbm(uv*1.8 + rr*0.9 - t*0.5);

    /* Caustic interference */
    vec2  cUV    = uv * 9.0 + rr * 2.5;
    float caustic = pow(abs(sin(cUV.x + warp*6.0) * cos(cUV.y + warp*6.0)), 1.4);

    /* ── Global pulse — sharp flare every ~4 s ───────────────────────────── */
    float pulse = pow(sin(u_time * 1.57) * 0.5 + 0.5, 3.0);

    /* ── Light positions ──────────────────────────────────────────────────── */
    vec2 cursor = u_mouse;

    /* Five blobs tethered to cursor at different orbit radii / speeds */
    vec2 L1 = cursor;
    vec2 L2 = cursor + vec2(sin(u_time*0.73 + 1.4)*0.28, cos(u_time*0.52 + 2.7)*0.16);
    vec2 L3 = cursor + vec2(cos(u_time*0.61 + 3.9)*0.22, sin(u_time*0.89 + 0.8)*0.20);
    vec2 L4 = cursor + vec2(sin(u_time*0.41 + 5.1)*0.32, cos(u_time*0.67 + 1.2)*0.24);
    vec2 L5 = cursor + vec2(cos(u_time*0.55 + 2.3)*0.20, sin(u_time*0.38 + 4.6)*0.30);

    /* Two fully autonomous wanderers — roam the full canvas independent of cursor */
    vec2 Lw1 = vec2(0.35 + sin(u_time*0.23 + 1.7)*0.35,
                    0.42 + cos(u_time*0.17 + 0.9)*0.28);
    vec2 Lw2 = vec2(0.65 + cos(u_time*0.19 + 3.2)*0.32,
                    0.58 + sin(u_time*0.28 + 2.1)*0.25);

    float p1  = blob(uv, L1,  0.32);
    float p2  = blob(uv, L2,  0.26);
    float p3  = blob(uv, L3,  0.22);
    float p4  = blob(uv, L4,  0.20);
    float p5  = blob(uv, L5,  0.18);
    float pw1 = blob(uv, Lw1, 0.28);
    float pw2 = blob(uv, Lw2, 0.24);

    float pMax = max(max(max(p1, p2), max(p3, p4)), max(p5, max(pw1, pw2)));

    /* ── Ambient: rich shimmer that fills all letters ─────────────────────── */
    float ambT    = u_time * 0.08;
    float ambWarp = fbm(uv * 2.0 + ambT);
    float ambHue  = ambWarp * 0.5 + uv.x * 0.20 + u_time * 0.04 + 0.50;
    float ambCaus = pow(abs(sin(uv.x*6.0 + ambWarp*4.5) *
                            cos(uv.y*6.0 + ambWarp*4.5)), 1.6);
    vec3  ambCol  = hsv(ambHue, 0.95, ambCaus * 0.70 + 0.15);
    /* Ambient is always 22-75 %, plus a pulse spike */
    float ambIntn = 0.22 + 0.28 * ambCaus + pulse * 0.25;

    /* ── Per-blob hues (each shifts independently over time) ──────────────── */
    float baseHue = warp * 0.45 + uv.x * 0.12;
    float caH     = 0.11 + 0.09 * pMax;

    float h1  = baseHue + 0.52;
    float h2  = baseHue + u_time * 0.040 + 0.73;
    float h3  = baseHue + u_time * 0.025 + 0.08;
    float h4  = baseHue + u_time * 0.035 + 0.28;
    float h5  = baseHue + u_time * 0.030 + 0.63;
    float hw1 = baseHue + u_time * 0.045 + 0.15;
    float hw2 = baseHue + u_time * 0.038 + 0.85;

    vec3 bc1  = blobCol(h1,  caustic, p1,  caH);
    vec3 bc2  = blobCol(h2,  caustic, p2,  caH);
    vec3 bc3  = blobCol(h3,  caustic, p3,  caH);
    vec3 bc4  = blobCol(h4,  caustic, p4,  caH);
    vec3 bc5  = blobCol(h5,  caustic, p5,  caH);
    vec3 bcw1 = blobCol(hw1, caustic, pw1, caH);
    vec3 bcw2 = blobCol(hw2, caustic, pw2, caH);

    float pSum     = p1 + p2 + p3 + p4 + p5 + pw1 + pw2 + 0.001;
    vec3 blobFinal = (bc1*p1 + bc2*p2 + bc3*p3 + bc4*p4 + bc5*p5
                      + bcw1*pw1 + bcw2*pw2) / pSum;
    blobFinal.r += (mR - mG) * 3.5 * pMax;
    blobFinal.b += (mG - mB) * 3.5 * pMax;
    blobFinal    = clamp(blobFinal, 0.0, 1.0);

    /* ── Kelvin wake on cursor movement ──────────────────────────────────── */
    vec2  smear    = cursor - u_trail;
    float vel      = length(smear);
    float velIntn  = smoothstep(0.0, 0.04, vel);

    vec2  dir      = normalize(smear + vec2(0.0001));
    vec2  perp     = vec2(-dir.y, dir.x);
    vec2  delta    = uv - cursor;
    float wakeD    = -dot(delta, dir);
    float wakeS    =  dot(delta, perp);

    float coneHW   = wakeD * 0.90 + 0.002;
    float coneMask = smoothstep(coneHW + 0.03, coneHW * 0.4, abs(wakeS))
                   * smoothstep(-0.01, 0.0, wakeD);
    float wakeLen   = 0.20 + vel * 2.5;
    float depthFade = smoothstep(-wakeLen, -wakeLen * 0.15, -wakeD);

    float tW  = u_accDist * 3.5 + u_time * 0.4;
    float wx1 = fbm(vec2(wakeD, wakeS) * 3.0 + tW * 0.3);
    float wD  = wakeD + wx1 * 0.05;
    float wS  = wakeS + fbm(vec2(wakeS, wakeD)*3.0 + tW*0.3 + 5.7) * 0.05;
    float wR  = length(vec2(wD, wS));

    float wav = (sin(wD*26.0 - tW*2.2)   * 0.28
               + sin(wR*20.0 - tW*1.7)   * 0.28
               + sin(wS*24.0 + wD*5.5)   * 0.22
               + (fbm(vec2(wD,wS)*5.0 + tW*0.2)*0.5+0.5) * 0.22);
    float waveField = clamp(pow(wav * 0.5 + 0.5, 1.6), 0.0, 1.0);

    float armD    = abs(abs(wakeS) - coneHW);
    float armCusp = smoothstep(0.04, 0.0, armD) * smoothstep(-0.01, 0.0, wakeD);
    waveField = max(waveField, armCusp * (sin(wR*32.0 - tW*2.6)*0.5+0.5) * 0.9);

    float wakeIntn = coneMask * depthFade * velIntn;

    float hwake  = waveField * 0.42 + warp * 0.25 + uv.x * 0.12 + 0.48;
    float caHW   = 0.12 + 0.12 * velIntn;
    vec3 wakeCol;
    wakeCol.r = hsv(hwake - caHW, 0.98, 0.28 + 0.72*waveField).r;
    wakeCol.g = hsv(hwake,        0.93, 0.18 + 0.82*waveField).g;
    wakeCol.b = hsv(hwake + caHW, 0.96, 0.38 + 0.62*waveField).b;
    wakeCol  += pow(clamp(waveField*wakeIntn, 0.0, 1.0), 2.0) * vec3(0.6,0.8,1.0) * 0.8;
    wakeCol.r += (mR-mG)*3.2*wakeIntn;
    wakeCol.b += (mG-mB)*3.2*wakeIntn;
    wakeCol = clamp(wakeCol * (0.5 + 2.8*wakeIntn*waveField), 0.0, 1.0);

    /* ── Combine all layers ──────────────────────────────────────────────── */
    float totalIntn = max(max(pMax, wakeIntn * waveField), ambIntn);
    if (totalIntn < 0.004) { gl_FragColor = vec4(0.0); return; }

    /* Layer: ambient → blobs → wake */
    vec3 finalCol = ambCol;
    finalCol = mix(finalCol, blobFinal,
                   smoothstep(0.0, 0.10, pMax - ambIntn * 0.5));
    finalCol = mix(finalCol, wakeCol,
                   smoothstep(0.0, 0.06, wakeIntn * waveField - pMax * 0.5));

    /* Pulse adds a brief white shimmer across all letters */
    finalCol = mix(finalCol, vec3(1.0), pulse * 0.18 * (ambCaus * 0.6 + 0.4));

    float alpha = mG * clamp(
      ambIntn + pMax * 0.95 + waveField * wakeIntn * 0.80,
      0.0, 1.0);

    gl_FragColor = vec4(finalCol, alpha);
  }
`;

/* ── WebGL helpers ───────────────────────────────────────────────────────── */

function makeShader(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error("[TechsnitchShader]", gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

function makeProgram(gl: WebGLRenderingContext, vs: WebGLShader, fs: WebGLShader) {
  const p = gl.createProgram()!;
  gl.attachShader(p, vs);
  gl.attachShader(p, fs);
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    console.error("[TechsnitchShader]", gl.getProgramInfoLog(p));
    return null;
  }
  return p;
}

/* ── Component ───────────────────────────────────────────────────────────── */

export function TechsnitchShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isMobile = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const dpr      = Math.min(window.devicePixelRatio || 1, 2);

    const gl = canvas.getContext("webgl", {
      alpha:              true,
      premultipliedAlpha: false,
      antialias:          false,
      powerPreference:    "default",
    }) as WebGLRenderingContext | null;
    if (!gl) return;

    const vs = makeShader(gl, gl.VERTEX_SHADER,   VERT);
    const fs = makeShader(gl, gl.FRAGMENT_SHADER,  FRAG);
    if (!vs || !fs) return;
    const prog = makeProgram(gl, vs, fs);
    if (!prog) return;

    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes     = gl.getUniformLocation(prog, "u_res");
    const uMouse   = gl.getUniformLocation(prog, "u_mouse");
    const uTrail   = gl.getUniformLocation(prog, "u_trail");
    const uAccDist = gl.getUniformLocation(prog, "u_accDist");
    const uTime    = gl.getUniformLocation(prog, "u_time");
    const uMask    = gl.getUniformLocation(prog, "u_mask");
    const uMob     = gl.getUniformLocation(prog, "u_mobile");

    /* ── Mask texture ────────────────────────────────────────────────────── */
    const tex = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    let maskReady = false;

    const buildMask = () => {
      const container = canvas.parentElement;
      if (!container) return;
      const cw = container.clientWidth;
      const ch = container.clientHeight;
      if (cw <= 0 || ch <= 0) return;

      const pw = Math.round(cw * dpr);
      const ph = Math.round(ch * dpr);
      canvas.width        = pw;
      canvas.height       = ph;
      canvas.style.width  = `${cw}px`;
      canvas.style.height = `${ch}px`;

      const mc  = document.createElement("canvas");
      mc.width  = pw;
      mc.height = ph;
      const ctx = mc.getContext("2d")!;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, pw, ph);

      const fsPx = Math.min(Math.max(80, window.innerWidth * 0.135), 200) * dpr;
      ctx.font         = `800 ${fsPx}px Inter, ui-sans-serif, system-ui, sans-serif`;
      ctx.textAlign    = "center";
      ctx.textBaseline = "middle";
      const ext = ctx as unknown as { letterSpacing?: string };
      if (ext.letterSpacing !== undefined) {
        ext.letterSpacing = `${Math.round(fsPx * -0.06)}px`;
      }
      ctx.fillStyle = "#fff";
      ctx.fillText("TECHSNITCH", pw / 2, ph / 2);

      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, mc);
      gl.viewport(0, 0, pw, ph);
      maskReady = true;
    };

    document.fonts.ready.then(buildMask);
    const ro = new ResizeObserver(() => document.fonts.ready.then(buildMask));
    ro.observe(canvas.parentElement!);

    /* ── Cursor tracking ─────────────────────────────────────────────────── */
    const mouse  = { x: 0.5, y: 0.5 };
    const trail  = { x: 0.5, y: 0.5 };
    const target = { x: 0.5, y: 0.5 };
    let   accDist = 0;

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx   = (e.clientX - rect.left)  / rect.width;
      const ny   = (e.clientY - rect.top)   / rect.height;
      const dx   = nx - target.x;
      const dy   = ny - target.y;
      accDist   += Math.sqrt(dx * dx + dy * dy) * 10;
      target.x   = nx;
      target.y   = ny;
    };
    document.addEventListener("mousemove", onMove, { passive: true });

    /* ── Visibility pause ────────────────────────────────────────────────── */
    let visible = true;
    const io = new IntersectionObserver(
      ([e]) => { visible = e.isIntersecting; },
      { threshold: 0 }
    );
    io.observe(canvas);

    /* ── Render loop ─────────────────────────────────────────────────────── */
    let   raf = 0;
    const t0  = performance.now();

    const render = () => {
      raf = requestAnimationFrame(render);
      if (!maskReady || !visible) return;

      mouse.x += (target.x - mouse.x) * 0.09;
      mouse.y += (target.y - mouse.y) * 0.09;
      trail.x += (target.x - trail.x) * 0.028;
      trail.y += (target.y - trail.y) * 0.028;

      const wallT = (performance.now() - t0) / 1000;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      gl.useProgram(prog);
      gl.uniform2f(uRes,     canvas.width,  canvas.height);
      gl.uniform2f(uMouse,   mouse.x,       1.0 - mouse.y);
      gl.uniform2f(uTrail,   trail.x,       1.0 - trail.y);
      gl.uniform1f(uAccDist, accDist);
      gl.uniform1f(uTime,    wallT);
      gl.uniform1i(uMask,    0);
      gl.uniform1f(uMob,     isMobile ? 1.0 : 0.0);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("mousemove", onMove);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
      gl.deleteTexture(tex);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={styles.shaderCanvas}
      aria-hidden="true"
    />
  );
}
