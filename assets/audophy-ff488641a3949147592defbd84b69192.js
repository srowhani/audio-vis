"use strict";define("audophy/app",["exports","ember","audophy/resolver","ember-load-initializers","audophy/config/environment"],function(e,t,n,a,i){var r=void 0;t.default.MODEL_FACTORY_INJECTIONS=!0,r=t.default.Application.extend({modulePrefix:i.default.modulePrefix,podModulePrefix:i.default.podModulePrefix,Resolver:n.default}),(0,a.default)(r,i.default.modulePrefix),e.default=r}),define("audophy/components/audio-player",["exports","ember"],function(e,t){var n=t.default.Component;e.default=n.extend({tagName:"audio",src:null,controls:!0,attributeBindings:["src","controls"]})}),define("audophy/components/audio-visualizer",["exports","ember"],function(e,t){var n=t.default.Component,a=t.default.A,i=t.default.set,r=t.default.get,o=t.default.run.schedule,l=THREE,d=l.Scene,u=l.PerspectiveCamera,s=l.WebGLRenderer,p=l.CubeGeometry,f=l.AmbientLight,c=l.Mesh,m=l.MeshLambertMaterial,h=l.OrbitControls;e.default=n.extend({size:32,mPlayer:null,mScene:null,mCamera:null,mRenderer:null,mAnalyser:null,mFrequencies:null,mCubes:null,ctx:null,src:null,init:function(){this._super.apply(this,arguments),i(this,"mFrequencies",new Uint8Array(r(this,"size"))),i(this,"ctx",new AudioContext)},didInsertElement:function(){this._super.apply(this,arguments);var e=this.$("#player")[0],t=r(this,"ctx"),n=t.createMediaElementSource(e),l=t.createAnalyser(),y=$(window).width(),b=$(window).height();l.connect(t.destination),n.connect(l),i(this,"mAnalyser",l),i(this,"src",n);var v=new d;i(this,"mScene",v);var x=new u(50,y/b,20,1e3);x.position.z=100,i(this,"mCamera",x);var g=new s;g.setSize(y,b),i(this,"mRenderer",g),r(this,"element").appendChild(g.domElement);var w=a(),z=new f(9474192);v.add(z),r(this,"mFrequencies").forEach(function(e,t){var n=new p(1.5,1.5,1.5),a=new m({color:"#"+Math.floor(16777215*Math.random()).toString(16),ambient:2237128,transparent:!1,wireframe:!0,wireframeLinewidth:4}),i=new c(n,a);i.position.set(2*t,0,0),v.add(i),w.push(i)}),i(this,"mCubes",w),i(this,"mControls",new h(x)),window.addEventListener("resize",function(){o("sync",function(){var e=window.innerWidth,t=window.innerHeight;x.aspect=e/t,x.updateProjectionMatrix(),g.setSize(e,t)})},!1),this.draw()},draw:function(){var e=r(this,"mRenderer"),t=r(this,"mFrequencies");r(this,"mAnalyser").getByteFrequencyData(t),r(this,"mCubes").forEach(function(e,n){var a=t[n];e.scale.y=Math.max(a/5,1)}),e.render(r(this,"mScene"),r(this,"mCamera")),r(this,"mControls").update(),window.setTimeout(this.draw.bind(this),1e3/30)}})}),define("audophy/helpers/app-version",["exports","ember","audophy/config/environment"],function(e,t,n){function a(){return i}e.appVersion=a;var i=n.default.APP.version;e.default=t.default.Helper.helper(a)}),define("audophy/helpers/pluralize",["exports","ember-inflector/lib/helpers/pluralize"],function(e,t){e.default=t.default}),define("audophy/helpers/singularize",["exports","ember-inflector/lib/helpers/singularize"],function(e,t){e.default=t.default}),define("audophy/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","audophy/config/environment"],function(e,t,n){var a=n.default.APP,i=a.name,r=a.version;e.default={name:"App Version",initialize:(0,t.default)(i,r)}}),define("audophy/initializers/container-debug-adapter",["exports","ember-resolver/container-debug-adapter"],function(e,t){e.default={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0];e.register("container-debug-adapter:main",t.default),e.inject("container-debug-adapter:main","namespace","application:main")}}}),define("audophy/initializers/data-adapter",["exports","ember"],function(e,t){e.default={name:"data-adapter",before:"store",initialize:t.default.K}}),define("audophy/initializers/ember-data",["exports","ember-data/setup-container","ember-data/-private/core"],function(e,t,n){e.default={name:"ember-data",initialize:t.default}}),define("audophy/initializers/export-application-global",["exports","ember","audophy/config/environment"],function(e,t,n){function a(){var e=arguments[1]||arguments[0];if(n.default.exportApplicationGlobal!==!1){var a;if("undefined"!=typeof window)a=window;else if("undefined"!=typeof global)a=global;else{if("undefined"==typeof self)return;a=self}var i,r=n.default.exportApplicationGlobal;i="string"==typeof r?r:t.default.String.classify(n.default.modulePrefix),a[i]||(a[i]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete a[i]}}))}}e.initialize=a,e.default={name:"export-application-global",initialize:a}}),define("audophy/initializers/injectStore",["exports","ember"],function(e,t){e.default={name:"injectStore",before:"store",initialize:t.default.K}}),define("audophy/initializers/store",["exports","ember"],function(e,t){e.default={name:"store",after:"ember-data",initialize:t.default.K}}),define("audophy/initializers/transforms",["exports","ember"],function(e,t){e.default={name:"transforms",before:"store",initialize:t.default.K}}),define("audophy/instance-initializers/ember-data",["exports","ember-data/-private/instance-initializers/initialize-store-service"],function(e,t){e.default={name:"ember-data",initialize:t.default}}),define("audophy/resolver",["exports","ember-resolver"],function(e,t){e.default=t.default}),define("audophy/router",["exports","ember","audophy/config/environment"],function(e,t,n){var a=t.default.Router.extend({location:n.default.locationType,rootURL:n.default.rootURL});a.map(function(){}),e.default=a}),define("audophy/services/ajax",["exports","ember-ajax/services/ajax"],function(e,t){Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("audophy/templates/components/audio-visualizer",["exports"],function(e){e.default=Ember.HTMLBars.template(function(){return{meta:{revision:"Ember@2.9.1",loc:{source:null,start:{line:1,column:0},end:{line:3,column:0}},moduleName:"audophy/templates/components/audio-visualizer.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createComment("");e.appendChild(t,n);var n=e.createTextNode("\n");e.appendChild(t,n);var n=e.createComment("");e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=new Array(2);return a[0]=e.createMorphAt(t,0,0,n),a[1]=e.createMorphAt(t,2,2,n),e.insertBoundary(t,0),a},statements:[["inline","component",[["get","mPlayer",["loc",[null,[1,12],[1,19]]],0,0,0,0]],[],["loc",[null,[1,0],[1,21]]],0,0],["content","yield",["loc",[null,[2,0],[2,9]]],0,0,0,0]],locals:[],templates:[]}}())}),define("audophy/templates/index",["exports"],function(e){e.default=Ember.HTMLBars.template(function(){return{meta:{revision:"Ember@2.9.1",loc:{source:null,start:{line:1,column:0},end:{line:8,column:0}},moduleName:"audophy/templates/index.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createComment("");e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var a=new Array(1);return a[0]=e.createMorphAt(t,0,0,n),e.insertBoundary(t,0),a},statements:[["inline","audio-visualizer",[],["size",128,"mPlayer",["subexpr","component",["audio-player"],["id","player","src","sample.mp3"],["loc",[null,[3,13],[6,4]]],0,0]],["loc",[null,[1,0],[7,3]]],0,0]],locals:[],templates:[]}}())}),define("audophy/config/environment",["ember"],function(e){var t="audophy";try{var n=t+"/config/environment",a=document.querySelector('meta[name="'+n+'"]').getAttribute("content"),i=JSON.parse(unescape(a)),r={default:i};return Object.defineProperty(r,"__esModule",{value:!0}),r}catch(e){throw new Error('Could not read config from meta tag with name "'+n+'".')}}),runningTests||require("audophy/app").default.create({name:"audophy",version:"0.0.0+ba7ac851"});