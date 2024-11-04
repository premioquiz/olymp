(function(n,i){typeof exports=="object"&&typeof module<"u"?module.exports=i():typeof define=="function"&&define.amd?define(i):(n=typeof globalThis<"u"?globalThis:n||self,n.EhWebglSlideShow=i())})(this,function(){"use strict";var g=Object.defineProperty;var v=(n,i,a)=>i in n?g(n,i,{enumerable:!0,configurable:!0,writable:!0,value:a}):n[i]=a;var o=(n,i,a)=>(v(n,typeof i!="symbol"?i+"":i,a),a);class n{constructor(){this.events={}}on(t,e){this.events[t]||(this.events[t]=[]),this.events[t].push(e)}removeListener(t,e){if(!this.events[t]){console.warn(`Unable to remove listener ${e}, event with name ${t} not found`);return}this.events[t].filter(s=>s!==e)}emit(t,e){if(!this.events[t])return;const s=r=>{r(e)};this.events[t].forEach(s)}}class i extends n{constructor(e){super();o(this,"createTexture",e=>{const s=this.gl.createTexture();return this.gl.bindTexture(this.gl.TEXTURE_2D,s),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.LINEAR),this.gl.texParameteri(this.gl.TEXTURE_2D,this.extensions.EXT_texture_filter_anisotropic.TEXTURE_MAX_ANISOTROPY_EXT,4),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,e),this.gl.bindTexture(this.gl.TEXTURE_2D,null),s});o(this,"onResize",()=>{this.setCanvasSize()});o(this,"destroy",()=>{window.removeEventListener("resize",this.onResize.bind(this)),this.gl.deleteVertexArray(this.vao),this.gl.deleteProgram(this.program),this.gl=null,this.canvas=null});this.options=e,this.parent=e.parent,this.canvas=e.canvas,this.vertexSource=e.vertexSource,this.fragmentSource=e.fragmentSource,this.isExtension=e.isExtension||!1,this.dpr=Math.min(window.devicePixelRatio,2),this.time=0,this.uniforms={},this.setCanvasSize(),this.createContext(),this.getExtensions(),this.createShaders(),this.createProgram(),this.createVAO(),this.setBaseUniforms(),this.initEvents()}init(){this.setCanvasSize(),this.createContext(),this.getExtensions(),this.createShaders(),this.createProgram(),this.createVAO(),this.setBaseUniforms()}createContext(){this.gl=this.canvas.getContext("webgl2",{alpha:!0,antialias:!0,depth:!1,stencil:!1,premultipliedAlpha:!1,preserveDrawingBuffer:!1,powerPreference:"default"}),this.gl||console.error("Unable to create a webgl2 context"),this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!0)}getExtensions(){this.extensions=[],this.extensions.WEBGL_lose_context=this.gl.getExtension("WEBGL_lose_context"),this.extensions.EXT_texture_filter_anisotropic=this.gl.getExtension("EXT_texture_filter_anisotropic")}createShader(e,s){const r=this.gl.createShader(e);if(this.gl.shaderSource(r,s),this.gl.compileShader(r),this.gl.getShaderParameter(r,this.gl.COMPILE_STATUS))return r;console.error(`Error compiling shader ${this.gl.getShaderInfoLog(r)}`),this.gl.deleteShader(r)}createShaders(){this.vertexShader=this.createShader(this.gl.VERTEX_SHADER,this.vertexSource),this.fragmentShader=this.createShader(this.gl.FRAGMENT_SHADER,this.fragmentSource)}createProgram(){this.program=this.gl.createProgram(),this.gl.attachShader(this.program,this.vertexShader),this.gl.attachShader(this.program,this.fragmentShader),this.gl.linkProgram(this.program),this.gl.getProgramParameter(this.program,this.gl.LINK_STATUS)?this.gl.useProgram(this.program):(console.error(`Error linking Program ${this.gl.getProgramInfoLog(this.program)}`),this.gl.deleteProgram(this.program))}createQuad(){this.quad={position:[-1,-1,1,-1,1,1,-1,1],positionLocation:this.gl.getAttribLocation(this.program,"position"),positionBuffer:this.gl.createBuffer(),indices:new Uint16Array([1,2,0,0,2,3]),indicesBuffer:this.gl.createBuffer(),uv:[0,0,1,0,1,1,0,1],uvLocation:this.gl.getAttribLocation(this.program,"uv"),uvBuffer:this.gl.createBuffer()}}createVAO(){this.vao=this.gl.createVertexArray(),this.gl.bindVertexArray(this.vao),this.quad||this.createQuad(),this.gl.enableVertexAttribArray(this.quad.positionLocation),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.quad.positionBuffer),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array(this.quad.position),this.gl.STATIC_DRAW),this.gl.vertexAttribPointer(this.quad.positionLocation,2,this.gl.FLOAT,!1,0,0),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.quad.indicesBuffer),this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER,this.quad.indices,this.gl.STATIC_DRAW),this.gl.enableVertexAttribArray(this.quad.uvLocation),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.quad.uvBuffer),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array(this.quad.uv),this.gl.STATIC_DRAW),this.gl.vertexAttribPointer(this.quad.uvLocation,2,this.gl.FLOAT,!1,0,0)}setBaseUniforms(){this.addUniform(this.createUniform("uResolution","uniform2f",[this.canvas.width,this.canvas.height])),this.addUniform(this.createUniform("uTime","uniform1f",this.time,!0))}addUniform(e){this.uniforms[e.name]={...e.type,...e.value,...e.needsUpdate,...e.location}}createUniform(e,s,r,f){const h={};return h.name=e,h.type=s,h.value=r,h.needsUpdate=f||!1,h.location=this.gl.getUniformLocation(this.program,e),this.updateUniform(h),h}updateUniform(e){switch(e.type){case"uniform1f":case"uniform1i":this.gl[e.type](e.location,e.value);break;case"uniform2f":this.gl[e.type](e.location,e.value[0],e.value[1]);break}}updateUniforms(){for(let e in this.uniforms)this.uniforms[e].needsUpdate&&this.updateUniform(this.uniforms[e])}draw(){this.gl.drawElements(this.gl.TRIANGLES,this.quad.indices.length,this.gl.UNSIGNED_SHORT,0)}preUpdate(){this.gl.viewport(0,0,this.canvas.width,this.canvas.height),this.gl.clearColor(1,0,0,1),this.gl.clear(this.gl.COLOR_BUFFER_BIT)}update(){this.time+=1e-4,this.uniforms.uTime.value=this.time,this.updateUniform(this.uniforms.uTime)}setCanvasSize(){this.canvas.width=this.isExtension?window.innerWidth*this.dpr:this.parent.clientWidth*this.dpr,this.canvas.height=this.isExtension&&this.parent.clientHeight>window.innerHeight?window.innerHeight*this.dpr:this.parent.clientHeight*this.dpr,this.canvas.height==0&&(this.canvas.height=720*this.dpr)}onIntersection(e,s){this.shouldRender=e[0].isIntersecting,this.emit("intersection",this.shouldRender)}initIntersectionObserver(){const e={root:null,rootMargin:"0px",threshold:.001};this.observer=new IntersectionObserver(this.onIntersection.bind(this),e),this.observer.observe(this.parent)}initEvents(){this.initIntersectionObserver(),window.addEventListener("resize",this.onResize.bind(this))}}const a="KGZ1bmN0aW9uKCl7InVzZSBzdHJpY3QiO3NlbGYub25tZXNzYWdlPWFzeW5jIGZ1bmN0aW9uKGUpe2NvbnN0IHQ9ZS5kYXRhLGE9W107dHJ5e2NvbnN0IHM9dC5tYXAoYXN5bmMobyxuKT0+e2NvbnN0IGk9YXdhaXQoYXdhaXQgZmV0Y2gobykpLmJsb2IoKSxyPWF3YWl0IGNyZWF0ZUltYWdlQml0bWFwKGkse2ltYWdlT3JpZW50YXRpb246ImZsaXBZIn0pO2Fbbl09cn0pO2F3YWl0IFByb21pc2UuYWxsKHMpLnRoZW4oKCk9PntzZWxmLnBvc3RNZXNzYWdlKGEpfSl9Y2F0Y2gocyl7Y29uc29sZS5lcnJvcigiRXJyb3IgbG9hZGluZyBpbWFnZXM6IixzKX19fSkoKTsK",c=typeof window<"u"&&window.Blob&&new Blob([atob(a)],{type:"text/javascript;charset=utf-8"});function l(){const u=c&&(window.URL||window.webkitURL).createObjectURL(c);try{return u?new Worker(u):new Worker("data:application/javascript;base64,"+a)}finally{u&&(window.URL||window.webkitURL).revokeObjectURL(u)}}class d{constructor(t){o(this,"animate",()=>{this.isAnimating=!0,this.startTime=Date.now(),this.requestId=requestAnimationFrame(this.playTransition)});o(this,"playTransition",()=>{let t=Date.now()-this.startTime;this.progress=this.outSine(t,0,1,this.duration),t<this.duration?(this.isAnimating=!0,this.requestId=requestAnimationFrame(this.playTransition)):this.endTransition()});o(this,"onResize",()=>{this.quadGL||this.onResize.bind(this),this.quadGL.onResize()});o(this,"destroy",()=>new Promise(t=>{this.isDestroyed=!0,this.cancelRenderLoop(),this.quadGL.destroy(),this.textures=null,this.canvas=null,this.quadGL=null,t()}));this.options=t,this.parent=t.parent,this.canvas=t.canvas,this.isCover=t.isCover,this.duration=t.duration,this.interval=t.interval,this.images=t.images,this.effect=t.effect,this.direction=t.direction,this.invert=t.invert,this.blurLevel=t.blurLevel,this.scale=t.scale,this.textures=[],this.uniforms={},this.textureResolution={width:0,height:0},this.progress=0,this.nextTextureIndex=1,this.requestId=0,this.startTime=0,this.isInitialized=!1,this.shouldRender=!1,this.getShadersSource(),this.quadGL=new i({vertexSource:this.vertexSource,fragmentSource:this.fragmentSource,...t}),this.worker=new l,this.worker.postMessage(this.images),this.worker.onmessage=e=>{this.loadedImages=e.data,this.createTextures(),this.initState(),this.initEvents(),this.preRender(),requestAnimationFrame(this.render.bind(this)),this.isInitialized=!0,this.shouldRender=this.quadGL.shouldRender,this.shouldRender&&(this.intervalId=setInterval(this.animate.bind(this),this.interval))}}getFragmentDiff(){let t=null;switch(this.effect){case"blobs":t=`
					vec4 currentTexture = texture2D(uCurrentTexture, uv);
					vec4 nextTexture = texture2D(uNextTexture, uv);

					float noise = noise(uv * uScale);
					float progress = mix(-uBlur, 1.0 + uBlur, uProgress);
					float lower = progress - uBlur;
					float higher = progress + uBlur;

					float alpha = smoothstep(lower, higher, noise);

					gl_FragColor = mix(currentTexture, nextTexture, 1.0 - alpha);
				`;break;case"circular-mask":t=`
				vec4 currentTexture = texture2D(uCurrentTexture, uv);
					vec4 nextTexture = texture2D(uNextTexture, uv);
					float effect = 0.;

					switch (uDirection) {
						case 0:
							if (uInvert == 1.) {
								effect = uInvert - distance(uv, vec2(0.5));
							} else {
								effect = distance(uv, vec2(0.5));
							}
							break;
						case 1:
							if (uInvert == 1.) {
								effect = cos( distance( uv, vec2(1., .5)  ) );
							} else {
								effect = sin( distance( uv, vec2(1., .5)  ) );
							}
							break;
						case 2:
							if (uInvert == 1.) {
								effect = cos( distance( uv, vec2(.0, .5)  ) );
							} else {
								effect = sin( distance( uv, vec2(.0, .5)  ) );
							}
							break;
						case 3:
							if (uInvert == 1.) {
								effect = cos( distance( uv, vec2(.5, .0)  ) );
							} else {
								effect = sin( distance( uv, vec2(.5, .0)  ) );
							}
							break;
						case 4:
							if (uInvert == 1.) {
								effect = cos( distance( uv, vec2(.5, 1.)  ) );
							} else {
								effect = sin( distance( uv, vec2(.5, 1.)  ) );
							}
							break;
						case 5:
							if (uInvert == 1.) {
								effect = cos( distance( uv, vec2(1.,0.)  ) );
							} else {
								effect = sin( distance( uv, vec2(1.,0.)  ) );
							}
							break;
						case 6:
							if (uInvert == 1.) {
								effect = cos( distance( uv, vec2(0.)  ) );
							} else {
								effect = sin( distance( uv, vec2(0.)  ) );
							}
							break;
						case 7:
							if (uInvert == 1.) {
								effect = cos( distance( uv, vec2(0.,1.)  ) );
							} else {
								effect = sin( distance( uv, vec2(0.,1.)  ) );
							}
							break;
						case 8:
							if (uInvert == 1.) {
								effect = cos( distance( uv, vec2(1.)  ) );
							} else {
								effect = sin( distance( uv, vec2(1.)  ) );
							}
							break;
					}

					float progress = step(effect, uProgress);
					gl_FragColor = mix(currentTexture, nextTexture, progress );
				`;break;case"color-mix":t=`
					vec4 currentTexture = texture2D(uCurrentTexture, uv);
					vec4 nextTexture = texture2D(uNextTexture, uv);

					float colorDistance = distance(currentTexture, nextTexture) * .5;
					float progressStep = step(colorDistance, uProgress);

					gl_FragColor = mix(
						mix(currentTexture, nextTexture, progressStep),
						nextTexture,
						uProgress);
				`;break;case"blend-wave":default:t=`
					float rise = 1.;
					switch (uDirection) {
						case 0:
							vec2 center = vec2(0.5);
							float width = 0.35;
							float radius = 0.9;
							float dist = distance(center, uv);
							float circle = 1.0 - smoothstep(-width, 0.0, radius * dist - uProgress * ( 1.0 + width));
							rise = pow(abs(circle), 1.0);
							break;

						case 1:
							rise = pow(abs(smoothstep(0., 1., ( uProgress * 2.0 + uv.x - 0.5))), 10.);
							break;
						case 2:
							rise = pow(abs(smoothstep(0., 1., ( uProgress * 2.0 - uv.x + 0.5))), 10.);
							break;
						case 3:
							rise = pow(abs(smoothstep(0., 1., ( uProgress * 2.0 - uv.y + 0.5))), 10.);
							break;
						case 4:
							rise = pow(abs(smoothstep(0., 1., ( uProgress * 2.0 + uv.y - 0.5))), 10.);
							break;
						case 5:
							rise = pow(abs(smoothstep(0., 1., ( uProgress * 2.5 + (uv.x - uv.y - .5)))), 10.);
							break;
						case 6:
							rise = pow(abs(smoothstep(0., 1., ( uProgress * 2.5 - (uv.y + uv.x - .5)))), 10.);
							break;
						case 7:
							rise = pow(abs(smoothstep(0., 1., ( uProgress * 2.5 + (uv.y - uv.x - .5)))), 10.);
							break;
						case 8:
							rise = pow(abs(smoothstep(0., 1., ( uProgress * 2.5 + (uv.y + uv.x - 1.5)))), 10.);
							break;
					}

					vec4 currentTexture = texture2D(uCurrentTexture, ( uv - 0.5) * (1.0 - rise) + 0.5);
					vec4 nextTexture = texture2D(uNextTexture, ( uv - 0.5 ) * rise + 0.5);

					gl_FragColor = mix(currentTexture, nextTexture, rise);
				`;break}return t}getShadersSource(){this.vertexSource=`#version 300 es

		#define attribute in
		#define varying out

		attribute vec4 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			gl_Position = position;

			vUv = uv;
		}
	  `,this.fragmentSource=`#version 300 es
	  #define varying in
	  #define texture2D texture
	  precision highp float;

	  out highp vec4 pc_fragColor;
	  #define gl_FragColor pc_fragColor

	  varying vec2 vUv;

	  uniform sampler2D uCurrentTexture;
	  uniform sampler2D uNextTexture;
	  uniform vec2 uResolution;
	  uniform vec2 uTextureResolution;
	  uniform float uProgress;
	  uniform float uCover;
	  uniform int uDirection;
	  uniform float uInvert;
	  uniform float uBlur;
	  uniform float uScale;



	  vec2 backgroundCover(vec2 uv, vec2 resolution, vec2 texResolution) {
		  vec2 s = resolution; // Screen
		  vec2 i = texResolution; // Image
		  float rs = s.x / s.y;
		  float ri = i.x / i.y;
		  vec2 new = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x);
		  vec2 offset = (rs < ri ? vec2((new.x - s.x) / 2.0, 0.0) : vec2(0.0, (new.y - s.y) / 2.0)) / new;
		  return uv * s / new + offset;
	  }

	  float rand(vec2 n) {
		  return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
	  }

	  float noise(vec2 p){
		  vec2 ip = floor(p);
		  vec2 u = fract(p);
		  u = u*u*(3.0-2.0*u);

		  float res = mix(
			  mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
			  mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
		  return res*res;
	  }

	  void main() {

		  vec2 uv = vUv;

			  uv = backgroundCover(vUv, uResolution, uTextureResolution);


		  ${this.getFragmentDiff()}
	  }
	`}createTextures(){var t,e;this.textures=this.loadedImages.map(this.quadGL.createTexture),this.textureResolution.width=(t=this.loadedImages[0])==null?void 0:t.width,this.textureResolution.height=(e=this.loadedImages[0])==null?void 0:e.height}initState(){this.currentTexture=this.textures[0],this.nextTexture=this.textures[1],this.setActiveTextures(),this.setUniforms()}setActiveTextures(){this.quadGL.gl.activeTexture(this.quadGL.gl.TEXTURE0),this.quadGL.gl.bindTexture(this.quadGL.gl.TEXTURE_2D,this.currentTexture),this.quadGL.gl.activeTexture(this.quadGL.gl.TEXTURE1),this.quadGL.gl.bindTexture(this.quadGL.gl.TEXTURE_2D,this.nextTexture)}setUniforms(){switch(this.uniforms.uTextureResolution=this.quadGL.createUniform("uTextureResolution","uniform2f",[this.textureResolution.width,this.textureResolution.height]),this.uniforms.uProgress=this.quadGL.createUniform("uProgress","uniform1f",this.progress,!0),this.uniforms.uCover=this.quadGL.createUniform("uCover","uniform1f",this.isCover),this.uniforms.uTexture1=this.quadGL.createUniform("uCurrentTexture","uniform1i",0),this.uniforms.uTexture2=this.quadGL.createUniform("uNextTexture","uniform1i",1),this.quadGL.addUniform(this.uniforms.uTextureResolution),this.quadGL.addUniform(this.uniforms.uProgress),this.quadGL.addUniform(this.uniforms.uCover),this.quadGL.addUniform(this.uniforms.uTexture1),this.quadGL.addUniform(this.uniforms.uTexture2),this.effect){case"blend-wave":this.uniforms.uDirection=this.quadGL.createUniform("uDirection","uniform1i",this.direction),this.quadGL.addUniform(this.uniforms.uDirection);break;case"blobs":this.uniforms.uBlur=this.quadGL.createUniform("uBlur","uniform1f",this.blurLevel),this.uniforms.uScale=this.quadGL.createUniform("uScale","uniform1f",this.scale),this.quadGL.addUniform(this.uniforms.uScale),this.quadGL.addUniform(this.uniforms.uBlur);break;case"circular-mask":this.uniforms.uDirection=this.quadGL.createUniform("uDirection","uniform1i",this.direction),this.uniforms.uInvert=this.quadGL.createUniform("uInvert","uniform1f",this.invert),this.quadGL.addUniform(this.uniforms.uDirection),this.quadGL.addUniform(this.uniforms.uInvert);break}}outSine(t,e,s,r){return s*Math.sin(t/r*(Math.PI/2))+e}endTransition(){this.progress=0,this.currentTexture=this.textures[this.nextTextureIndex],this.nextTextureIndex==this.textures.length-1?this.nextTextureIndex=0:this.nextTextureIndex++,this.nextTexture=this.textures[this.nextTextureIndex],this.setActiveTextures(),cancelAnimationFrame(this.requestId),this.isAnimating=!1}initEvents(){this.quadGL.on("intersection",t=>{this.shouldRender=t,this.shouldRender?this.intervalId=setInterval(this.animate.bind(this),this.interval):(this.isAnimating&&this.endTransition(),this.cancelRenderLoop())})}preRender(){this.quadGL.preUpdate(),this.quadGL.update(),this.quadGL.draw()}render(){requestAnimationFrame(this.render.bind(this)),!(this.isDestroyed||!this.shouldRender||!this.isAnimating)&&(this.quadGL.preUpdate(),this.uniforms.uProgress.value=this.progress,this.quadGL.updateUniform(this.uniforms.uProgress),this.quadGL.update(),this.quadGL.draw())}cancelRenderLoop(){clearInterval(this.intervalId),cancelAnimationFrame(this.requestId)}}return d});
