/**
 * GLSL for the schematic cells. Written for three r186 ShaderMaterial (GLSL3 not required).
 * Colours are passed in linear space; output is converted with <colorspace_fragment>.
 */

// Ashima / Stefan Gustavson 3D simplex noise (MIT)
export const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+10.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.5-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 105.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`;

/* ------------------------------------------------------------------ */
/* Detailed cell (hero + focal pair)                                   */
/* ------------------------------------------------------------------ */

export const CELL_VERT = /* glsl */ `
uniform float uTime;
uniform float uAmp;
uniform float uFreq;
uniform float uSeed;
varying vec3 vWorldPos;
varying vec3 vNormalW;
varying vec3 vObj;
${NOISE}

vec3 displace(vec3 p){
  vec3 n = normalize(p);
  float d = snoise(n*uFreq + vec3(uSeed) + vec3(0.0, uTime*0.12, uTime*0.07)) * uAmp
          + snoise(n*uFreq*2.3 + vec3(uSeed*1.7) - vec3(uTime*0.09)) * uAmp * 0.18;
  return n * (1.0 + d);
}

void main(){
  vec3 n = normalize(position);
  vec3 t = normalize(cross(n, abs(n.y) < 0.99 ? vec3(0.0,1.0,0.0) : vec3(1.0,0.0,0.0)));
  vec3 b = cross(n, t);
  float e = 0.01;
  vec3 p0 = displace(n);
  vec3 p1 = displace(normalize(n + t*e));
  vec3 p2 = displace(normalize(n + b*e));
  vec3 nrm = normalize(cross(p1 - p0, p2 - p0));
  if (dot(nrm, n) < 0.0) nrm = -nrm;

  vObj = n;
  vec4 wp = modelMatrix * vec4(p0, 1.0);
  vWorldPos = wp.xyz;
  vNormalW = normalize(mat3(modelMatrix) * nrm);
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`;

export const CELL_FRAG = /* glsl */ `
uniform vec3 uColor;      // identity colour (linear)
uniform vec3 uDeep;       // body colour (linear)
uniform vec3 uPaper;
uniform float uKind;      // 0 = effector (receptor dots), 1 = target (fine ridges)
uniform vec3 uPartner;    // partner centre (world)
uniform float uPartnerR;  // partner radius (world)
uniform float uContact;   // 0..1 contact-zone emphasis
uniform float uOpacity;
uniform float uTime;
varying vec3 vWorldPos;
varying vec3 vNormalW;
varying vec3 vObj;
${NOISE}

void main(){
  vec3 N = normalize(vNormalW);
  vec3 V = normalize(cameraPosition - vWorldPos);
  vec3 L = normalize(vec3(-0.55, 0.75, 0.6));
  float ndl = max(dot(N, L), 0.0);
  float ndv = max(dot(N, V), 0.0);

  // body: dark, slightly translucent-looking core, lit edge
  float wrap = max((dot(N, L) + 0.3) / 1.3, 0.0);
  vec3 col = uDeep * (0.22 + 0.55 * wrap);
  col += uColor * 0.035 * (1.0 - ndv);                        // faint sub-surface tint
  col += uColor * 0.55 * pow(1.0 - ndv, 4.0);                 // controlled rim light
  col += uColor * 0.05 * pow(max(dot(reflect(-L, N), V), 0.0), 48.0); // restrained, tinted specular
  col *= mix(0.75, 1.0, pow(1.0 - ndv, 0.6));                 // deeper core

  // fine granular membrane texture
  float g = snoise(vObj * 22.0 + 3.1);
  col *= 0.9 + 0.1 * g;

  // identity texture (not colour-only)
  if (uKind < 0.5) {
    float dots = smoothstep(0.72, 0.8, snoise(vObj * 16.0 + 7.0));
    col = mix(col, uColor * 0.55, dots * 0.5);
  } else {
    float ridge = abs(sin(dot(vObj, normalize(vec3(0.3, 1.0, 0.2))) * 30.0 + snoise(vObj * 2.2) * 2.2));
    col = mix(col, uColor * 0.3, smoothstep(0.985, 1.0, ridge) * 0.3);
  }

  // contact zone: band where this membrane meets the partner, drawn as a hatch + light
  float dP = length(vWorldPos - uPartner) - uPartnerR;
  float band = 1.0 - smoothstep(0.0, 0.16, abs(dP));
  float inner = 1.0 - smoothstep(-0.25, 0.02, dP);
  float hatch = step(0.55, fract((vWorldPos.x + vWorldPos.y * 0.8 + vWorldPos.z * 0.3) * 26.0));
  float zone = max(band, inner * 0.7) * uContact;
  col = mix(col, uPaper * (0.25 + 0.5 * hatch), zone * 0.7);
  col += vec3(0.14, 0.77, 0.66) * 0.12 * zone;

  gl_FragColor = vec4(col, uOpacity);
  #include <colorspace_fragment>
}
`;

/* ------------------------------------------------------------------ */
/* Instanced small cells / data points                                 */
/* ------------------------------------------------------------------ */

export const DOT_VERT = /* glsl */ `
attribute float aKind;
attribute float aAlpha;
varying vec3 vNormalW;
varying vec3 vWorldPos;
varying float vKind;
varying float vAlpha;
void main(){
  mat4 m = modelMatrix * instanceMatrix;
  vec4 wp = m * vec4(position, 1.0);
  vWorldPos = wp.xyz;
  vNormalW = normalize(mat3(m) * normal);
  vKind = aKind;
  vAlpha = aAlpha;
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`;

export const DOT_FRAG = /* glsl */ `
uniform vec3 uEff;
uniform vec3 uTgt;
uniform vec3 uEffDeep;
uniform vec3 uTgtDeep;
uniform float uFlat;     // 0 = shaded cell, 1 = flat data point
uniform float uOpacity;
varying vec3 vNormalW;
varying vec3 vWorldPos;
varying float vKind;
varying float vAlpha;
void main(){
  vec3 N = normalize(vNormalW);
  vec3 V = normalize(cameraPosition - vWorldPos);
  vec3 L = normalize(vec3(-0.55, 0.75, 0.6));
  float ndv = max(dot(N, V), 0.0);
  vec3 idc = mix(uEff, uTgt, vKind);
  vec3 deep = mix(uEffDeep, uTgtDeep, vKind);
  float wrap = max((dot(N, L) + 0.35) / 1.35, 0.0);
  vec3 shaded = deep * (0.3 + 0.6 * wrap) + idc * 0.6 * pow(1.0 - ndv, 3.5);
  vec3 flatC = idc * (0.85 + 0.15 * ndv);
  vec3 col = mix(shaded, flatC, uFlat);
  float a = vAlpha * uOpacity;
  if (a < 0.01) discard;
  gl_FragColor = vec4(col, a);
  #include <colorspace_fragment>
}
`;
