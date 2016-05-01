/*!
 * JavaScript Custom Forms : File Module
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.2.2
 */
!function(e){e.addModule(function(e){"use strict";return{name:"File",selector:'input[type="file"]',options:{fakeStructure:'<span class="jcf-file"><span class="jcf-fake-input"></span><span class="jcf-upload-button"><span class="jcf-button-content"></span></span></span>',buttonText:"Choose file",placeholderText:"No file chosen",realElementClass:"jcf-real-element",extensionPrefixClass:"jcf-extension-",selectedFileBlock:".jcf-fake-input",buttonTextBlock:".jcf-button-content"},matchElement:function(e){return e.is('input[type="file"]')},init:function(){this.initStructure(),this.attachEvents(),this.refresh()},initStructure:function(){this.doc=e(document),this.realElement=e(this.options.element).addClass(this.options.realElementClass),this.fakeElement=e(this.options.fakeStructure).insertBefore(this.realElement),this.fileNameBlock=this.fakeElement.find(this.options.selectedFileBlock),this.buttonTextBlock=this.fakeElement.find(this.options.buttonTextBlock).text(this.options.buttonText),this.realElement.appendTo(this.fakeElement).css({position:"absolute",opacity:0})},attachEvents:function(){this.realElement.on({"jcf-pointerdown":this.onPress,change:this.onChange,focus:this.onFocus})},onChange:function(){this.refresh()},onFocus:function(){this.fakeElement.addClass(this.options.focusClass),this.realElement.on("blur",this.onBlur)},onBlur:function(){this.fakeElement.removeClass(this.options.focusClass),this.realElement.off("blur",this.onBlur)},onPress:function(){this.fakeElement.addClass(this.options.pressedClass),this.doc.on("jcf-pointerup",this.onRelease)},onRelease:function(){this.fakeElement.removeClass(this.options.pressedClass),this.doc.off("jcf-pointerup",this.onRelease)},getFileName:function(){var t="",s=this.realElement.prop("files");return s&&s.length?e.each(s,function(e,s){t+=(e>0?", ":"")+s.name}):t=this.realElement.val().replace(/^[\s\S]*(?:\\|\/)([\s\S^\\\/]*)$/g,"$1"),t},getFileExtension:function(){var e=this.realElement.val();return e.lastIndexOf(".")<0?"":e.substring(e.lastIndexOf(".")+1).toLowerCase()},updateExtensionClass:function(){var e=this.getFileExtension(),t=this.fakeElement.prop("className"),s=t.replace(new RegExp("(\\s|^)"+this.options.extensionPrefixClass+"[^ ]+","gi"),"");this.fakeElement.prop("className",s),e&&this.fakeElement.addClass(this.options.extensionPrefixClass+e)},refresh:function(){var e=this.getFileName()||this.options.placeholderText;this.fakeElement.toggleClass(this.options.disabledClass,this.realElement.is(":disabled")),this.fileNameBlock.text(e),this.updateExtensionClass()},destroy:function(){this.realElement.insertBefore(this.fakeElement).removeClass(this.options.realElementClass).css({position:"",opacity:""}),this.fakeElement.remove(),this.realElement.off({"jcf-pointerdown":this.onPress,change:this.onChange,focus:this.onFocus,blur:this.onBlur}),this.doc.off("jcf-pointerup",this.onRelease)}}})}(jcf);