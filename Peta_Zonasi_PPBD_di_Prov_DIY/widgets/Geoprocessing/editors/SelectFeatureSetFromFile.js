// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
require({cache:{"url:widgets/Geoprocessing/editors/SelectFeatureSetFromFile.html":'\x3cdiv\x3e\r\n  \x3cdiv data-dojo-attach-point\x3d"inputNode"\x3e\r\n    \x3cdiv class\x3d"jimu-r-row" style\x3d"margin-top: 10px;"\x3e\r\n      \x3cdiv class\x3d"col-1-2"\x3e\r\n        \x3cform data-dojo-attach-point\x3d"fileForm"\r\n            enctype\x3d"multipart/form-data"\r\n            method\x3d"POST" data-dojo-type\x3d"dijit/form/Form"\x3e\r\n          \x3cinput id\x3d"${uniqueID}_fs_file" type\x3d"file" multiple\x3d"false" name\x3d"file"\r\n            data-dojo-attach-point\x3d"fileInput" accept\x3d"application/zip"\r\n            data-dojo-attach-event\x3d"onChange: _onUpload" style\x3d"display:none"/\x3e\r\n          \x3cdiv class\x3d"jimu-btn jimu-leading-margin10 jimu-float-leading"\x3e\r\n            \x3clabel class\x3d"file-input-label" for\x3d"${uniqueID}_fs_file"\x3e\r\n              ${nls.addShapefile}\r\n            \x3c/label\x3e\r\n          \x3c/div\x3e\r\n          \x3cinput type\x3d"hidden" name\x3d"f" value\x3d"json"/\x3e\r\n        \x3c/form\x3e\r\n      \x3c/div\x3e\r\n      \x3cdiv class\x3d"col-1-2"\x3e\r\n        \x3cdiv data-dojo-attach-point\x3d"clearLink"\r\n          data-dojo-attach-event\x3d"onClick: _clear"\r\n          class\x3d"jimu-float-trailing shp-clear"\x3e${nls.clear}\x3c/div\x3e\r\n      \x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"jimu-r-row" style\x3d"margin-top: 10px;"\x3e\r\n      \x3cdiv data-dojo-attach-point\x3d"checkboxNode"/\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"jimu-r-row shp-info"\x3e\r\n      \x3cimg data-dojo-attach-point\x3d"uploadStatus" class\x3d"upload-status" src\x3d""/\x3e\r\n      \x3cspan data-dojo-attach-point\x3d"fileInfo"\x3e\x3c/span\x3e\r\n    \x3c/div\x3e\r\n  \x3c/div\x3e\r\n  \x3cdiv data-dojo-attach-point\x3d"featuresetNode"\x3e\r\n  \x3c/div\x3e\r\n\x3c/div\x3e'}});
define("dojo/_base/declare dojo/_base/lang dojo/dom-attr dojo/dom-style dojo/on dojo/json dojo/text!./SelectFeatureSetFromFile.html dijit/_TemplatedMixin dijit/_WidgetsInTemplateMixin esri/request esri/geometry/scaleUtils esri/InfoTemplate esri/layers/FeatureLayer esri/renderers/SimpleRenderer esri/tasks/FeatureSet jimu/dijit/Message jimu/dijit/CheckBox jimu/portalUrlUtils jimu/symbolUtils jimu/utils ./BaseFeatureSetEditor ../utils dijit/form/Form dijit/form/Select".split(" "),function(m,f,g,c,n,
p,q,r,t,u,l,v,w,x,y,h,z,A,k,B,C,D){return m([C,r,t],{baseClass:"jimu-gp-editor-base jimu-gp-editor-file",templateString:q,editorName:"SelectFeatureSetFromFile",layer:void 0,constructor:function(){this.uniqueID=D.uniqueId()},postCreate:function(){this.inherited(arguments);c.set(this.clearLink,"display","none");c.set(this.uploadStatus,"display","none");this.uploadStatus.src=require.toUrl("jimu")+"/images/loading_circle.gif";this.generalizeCheckbox=new z({checked:!0,label:this.nls.generalize});this.generalizeCheckbox.placeAt(this.checkboxNode)},
destroy:function(){this._clear()},getValue:function(){if(0===this.activeViewIndex){if(this.layer){var a=new y;a.features=this.layer.graphics;return a}return null}return this.getFeatureSet()},_onUpload:function(){if(g.get(this.fileInput,"value")){var a=g.get(this.fileInput,"value");a=a.replace(/\\/g,"/");a=a.substr(a.lastIndexOf("/")+1);this.fileInfo.innerHTML=B.sanitizeHTML(a);c.set(this.uploadStatus,"display","");a={name:a,targetSR:this.map.spatialReference,maxRecordCount:4E3,enforceInputFileSizeLimit:!0,
enforceOutputJsonSizeLimit:!0};var e;if(this.generalizeCheckbox.getValue()){var b=l.getExtentForScale(this.map,4E4);b=b.getWidth()/this.map.width;a.generalize=!0;a.maxAllowableOffset=b;b/=10}else b=l.getExtentForScale(this.map,400),b=b.getWidth()/this.map.width;for(e=0;1>b;)b*=10,e++;a.reducePrecision=!0;a.numberOfDigitsAfterDecimal=e;u({url:this._getPortalUrl()+"/sharing/rest/content/features/generate",content:{filetype:"shapefile",publishParameters:p.stringify(a),f:"json"},form:this.fileForm.domNode,
handleAs:"json",load:f.hitch(this,function(d){c.set(this.uploadStatus,"display","none");d.error?new h({message:d.error.message||d.error}):this.addToMap(d.featureCollection)}),error:f.hitch(this,function(){c.set(this.uploadStatus,"display","none");var d=this.nls.generateShapefileError+this._getPortalUrl()+"/sharing/rest/content/features/generate";new h({message:d})})})}else new h({message:this.nls.noFileSelected})},addToMap:function(a){this._clear();a=a.layers[0];var e=new v("Details","${*}");this.layer=
new w(a,{infoTemplate:e});this.own(n(this.layer,"click",f.hitch(this,function(b){this.map.infoWindow.setFeatures([b.graphic])})));this.changeRenderer();a=this.layer.fullExtent;this.map.addLayer(this.layer);this.map.setExtent(a.expand(1.25),!0);c.set(this.clearLink,"display","")},changeRenderer:function(){var a=null;switch(this.layer.geometryType){case "esriGeometryPoint":a=k.getDefaultMarkerSymbol();break;case "esriGeometryPolyline":a=k.getDefaultLineSymbol();break;case "esriGeometryPolygon":a=k.getDefaultFillSymbol()}a&&
this.layer.setRenderer(new x(a))},_getPortalUrl:function(){return A.getStandardPortalUrl(this.appConfig.portalUrl)},_clear:function(){this.layer&&(this.layer.clear(),this.map.removeLayer(this.layer),this.fileInfo.innerHTML="",g.set(this.fileInput,"value",""),c.set(this.clearLink,"display","none"))}})});