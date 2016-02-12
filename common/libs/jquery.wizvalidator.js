/* =========================================================
 * jquery.wizvlidator.js
 * Version: 1.01
 * last Modified: 2014/11/20
 * http://www.whizzy.co.jp
 * =========================================================
 * @author Whizzy Corporation
 * =========================================================
 */

$.fn.WizValidator = function(options){

	var obj = $(this);

	$(function(){

		initSettings = $.extend({
			errorClassName		: 'error',
			parentClassName		: 'parent',
			errorMsgClassName	: 'errorMsg',
			errorMsgTagName		: 'span',
			sysErrorAlert		: false,
			useParentError		: true,
			specialCharCheck	: true,
			useBoxy				: false,
			useCrossPlaceholder	: false,
			messageEmpty		: 'この項目は必須です。',
			messageNospace		: 'この項目にスペースは利用できません。',
			messageNonumber		: 'この項目に数字は利用できません。',
			messageNosymbol		: 'この項目に記号は利用できません。',
			messageZenkaku 		: 'この項目は全角で入力してください。',
			messageKana 		: 'この項目はひらがなもしくはカタカナで入力してください。',
			messageHiragana 	: 'この項目は全角かなで入力してください。',
			messageKatakana 	: 'この項目は全角カナで入力してください。',
			messageHankaku 		: 'この項目は半角で入力してください。',
			messageNumber  		: 'この項目は半角数字で入力してください。',
			messageAlphabet		: 'この項目は半角アルファベットで入力してください。',
			messageEmail		: 'メールアドレスが不正です。',
			messageUrl 			: 'URLが不正です。',
			messageUrl2 		: 'URLはhttp://もしくはhttps://から開始してください。',
			messageTel1			: '電話番号の形式が不正です。',
			messageTel2			: 'この項目はハイフンつきの電話番号で入力してください。',
			messageZip			: '郵便番号が不正です。',
			messageDate			: '日付の形式が不正です。',
			messageJancode 		: '商品コードが不正です。',
			messageCustom		: 'この項目は半角英数および[-][_][.]で入力してください。',
			messageRetype 		: '入力内容が一致しません。',
			messageLinknull 	: 'この項目は必須です。',
			messageRadionull 	: 'この項目は必須です。',
			messageChecknull 	: 'この項目は必須です。',
			messageCheckgroup 	: '少なくとも一つはチェックしてください。',
			messageHHMM		 	: '開始時間と終了時間が不正です。',
			messageLen1 		: '文字数は',
			messageLen2			: '文字です。',
			messageMax1 		: '文字数は',
			messageMax2			: '文字以下です。',
			messageMin1 		: '文字数は',
			messageMin2			: '文字以上です。',
			messageRange1 		: '文字数は',
			messageRange2		: '文字以上',
			messageRange3		: '文字以下です。'
		},options);

	});

	$(function(){

		if(obj.attr('data-validate') == "" || !obj.attr('data-validate')){
			return false;
		}

		var id = obj.attr('id');
		var domEl = obj.get(0);
		var element = domEl.tagName;
		var name;
		if (element.match(/input/i)){
			if(obj.attr('type') == 'radio'){
				name = obj.attr('name');
				var radioinput = "input[name=" + name + "]:checked";
				val = $(radioinput).val();
			}else if(obj.attr('type') == 'checkbox'){
				if(obj.prop("checked")){
					val = obj.val();
				}else{
					val = "";
				}
			}else{
				val = $.trim(obj.val());
				obj.val(val);
			}
		} else if (element.match(/textarea/i)){
			val = $.trim(obj.val());
			obj.val(val);
		} else if (element.match(/select/i)){
			val = obj.val();
		} else {
			return false;
		}

		var errorClassName		= initSettings.errorClassName;
		var parentClassName		= initSettings.parentClassName;
		var errorMsgClassName	= initSettings.errorMsgClassName;
		var errorMsgTagName		= initSettings.errorMsgTagName;
		var useParentError		= initSettings.useParentError;
		var sysErrorAlert		= initSettings.sysErrorAlert;
		var specialCharCheck	= initSettings.specialCharCheck;
		var useBoxy				= initSettings.useBoxy;
		var useCrossPlaceholder	= initSettings.useCrossPlaceholder;
		var errorClass			= '.' + errorClassName;
		var parentClass			= '.' + parentClassName;
		var errorMsgClass		= '.' + errorMsgClassName;
		if(errorMsgTagName != ""){
			var startErrorTag		= '<' + errorMsgTagName + '>';
			var endErrorTag			= '</' + errorMsgTagName + '>';
		}else{
			var startErrorTag		= '';
			var endErrorTag			= '';
		}

		var errMessage = {
			empty		:	startErrorTag + initSettings.messageEmpty + endErrorTag,
			nospace		:	startErrorTag + initSettings.messageNospace + endErrorTag,
			nonumber	:	startErrorTag + initSettings.messageNonumber + endErrorTag,
			nosymbol	:	startErrorTag + initSettings.messageNosymbol + endErrorTag,
			zenkaku 	:	startErrorTag + initSettings.messageZenkaku + endErrorTag,
			kana 		:	startErrorTag + initSettings.messageKana + endErrorTag,
			hiragana 	:	startErrorTag + initSettings.messageHiragana + endErrorTag,
			katakana 	:	startErrorTag + initSettings.messageKatakana + endErrorTag,
			hankaku 	:	startErrorTag + initSettings.messageHankaku + endErrorTag,
			number  	:	startErrorTag + initSettings.messageNumber + endErrorTag,
			alphabet	:	startErrorTag + initSettings.messageAlphabet + endErrorTag,
			email		:	startErrorTag + initSettings.messageEmail + endErrorTag,
			url 		:	startErrorTag + initSettings.messageUrl + endErrorTag,
			url2 		:	startErrorTag + initSettings.messageUrl2 + endErrorTag,
			tel1		:	startErrorTag + initSettings.messageTel1 + endErrorTag,
			tel2		:	startErrorTag + initSettings.messageTel2 + endErrorTag,
			zip			:	startErrorTag + initSettings.messageZip + endErrorTag,
			date		:	startErrorTag + initSettings.messageDate + endErrorTag,
			jancode 	:	startErrorTag + initSettings.messageJancode + endErrorTag,
			custom		:	startErrorTag + initSettings.messageCustom + endErrorTag,
			retype 		:	startErrorTag + initSettings.messageRetype + endErrorTag,
			linknull	:	startErrorTag + initSettings.messageLinknull + endErrorTag,
			radionull	:	startErrorTag + initSettings.messageRadionull + endErrorTag,
			checknull	:	startErrorTag + initSettings.messageChecknull + endErrorTag,
			checkgroup	:	startErrorTag + initSettings.messageCheckgroup + endErrorTag,
			hhmm		:	startErrorTag + initSettings.messageHHMM + endErrorTag,
			len1	 	:	startErrorTag + initSettings.messageLen1,
			len2		:	initSettings.messageLen2 + endErrorTag,
			max1		:	startErrorTag + initSettings.messageMax1,
			max2		:	initSettings.messageMax2 + endErrorTag,
			min1		:	startErrorTag + initSettings.messageMin1,
			min2		:	initSettings.messageMin2 + endErrorTag,
			range1		:	startErrorTag + initSettings.messageRange1,
			range2		:	initSettings.messageRange2,
			range3		:	initSettings.messageRange3 + endErrorTag
		};

		// Remove error class and message
		obj.closest(parentClass).find(errorMsgClass).html('');
		obj.closest(parentClass).find(".validate").each(function(){
			$(this).removeClass(errorClassName);
		});
		if(useParentError){
			obj.closest(parentClass).removeClass(errorClassName);
		}

		// cross browser placeholder check
		if(useCrossPlaceholder){
			if(!checkPlaceholder() && val == obj.attr('placeholder')){
				return false;
			}
		}

		// JIS水準外文字判定
		if(specialCharCheck){
			characterErrMsg = specialCharacter(val);
			if(characterErrMsg.length != ""){
				obj.closest(parentClass).find(errorMsgClass).html(characterErrMsg);
				return false;
			}
		}

		var type = [];
		var tmp = [];

		if(obj.attr('data-validate').match(/\s/)){
			type = (obj.attr('data-validate')).split(' ');
		}else{
			type[0] = obj.attr('data-validate');
		}

		for (i=0; i < type.length; i++){
			tmp = type[i];

			if (tmp.match(/^max-/)){
				type['max'] = tmp;
			} else if (tmp.match(/^min-/)){
				type['min'] = tmp;
			} else if (tmp.match(/^range-/)){
				type['range'] = tmp;
			} else if (tmp.match(/^date-/)){
				type['date'] = tmp;
			} else if (tmp.match(/^len-/)){
				type['len'] = tmp;
			} else if (tmp.match(/^group-/)){
				type['group'] = tmp;
			} else if (tmp.match(/^typebase-/)){
				type['typebase'] = tmp;
			} else if (tmp.match(/^retype-/)){
				type['retype'] = tmp;
			} else if (tmp.match(/^linkbase-/)){
				type['linkbase'] = tmp;
			} else if (tmp.match(/^linknull-/)){
				type['linknull'] = tmp;
			} else if (tmp.match(/^delete-/)){
				type['delete'] = tmp;
			} else if (tmp.match(/^radionull-/)){
				type['radionull'] = tmp;
			} else if (tmp.match(/^checknull-/)){
				type['checknull'] = tmp;
			} else if (tmp.match(/^checkgroup-/)){
				type['checkgroup'] = tmp;
			} else if (tmp.match(/^hhmm-/)){
				type['hhmm'] = tmp;
			} else {
				type[tmp] = tmp;
			}

			if(type['linkbase']){
				if(val == ""){
					tmp = [];
					tmp = type['linkbase'].split('-');
					tmp[1] = tmp[1] || "";
					if(tmp[1] == ""){
						callSystemError();
						return false;
					}
					var linkId = tmp[1];
					linkId = "#" + linkId;
					hideError($(linkId));
				}
			}
			if(type['delete']){
				tmp = [];
				tmp = type['delete'].split('-');
				tmp[1] = tmp[1] || "";
				if(tmp[1] == ""){
					callSystemError();
					return false;
				}

				var targetId = tmp[1];
				targetId = "#" + targetId;
				hideError($(targetId));
			}

			if(type['group']){
				var gType = obj.attr('data-validate-group');
				if(gType == ""){
					callSystemError();
					return false;
				}
				if(gType == "tel"){
					var val = "";
					var cnt = 0;
					obj.closest(parentClass).find(".validate[data-validate-group]").each(function(){
						if($(this).val() == "" || $(this).val() === "undefined"){
							cnt++;
						}
						val = val + $(this).val();
					});
					if(cnt == 0 && !val.match(/^\d{10,11}$/)){
						showGroupError(obj,errMessage['tel1']);
					}
				}
				if(gType == "date"){
					var val = "";
					var cnt = 0;
					obj.closest(parentClass).find(".validate[data-validate-group]").each(function(){
						if($(this).val() == "" || $(this).val() === "undefined"){
							cnt++;
						}
						val = val + $(this).val();
					});
					if(cnt == 0 && !val.match(/^\d{8}$/)){
						showGroupError(obj,errMessage['date']);
					}
				}
				if(gType == "zip"){
					var val = "";
					var cnt = 0;
					obj.closest(parentClass).find(".validate[data-validate-group]").each(function(){
						if($(this).val() == "" || $(this).val() === "undefined"){
							cnt++;
						}
						val = val + $(this).val();
					});
					if(cnt == 0 && !val.match(/^\d{7}$/)){
						showGroupError(obj,errMessage['zip']);
					}
				}
			}

			if (val == ""){
				if (type['empty']){
					showError(obj,errMessage['empty']);
				}
				if (type['linknull']){
					tmp = [];
					tmp = type['linknull'].split("-");
					tmp[1] = tmp[1] || "";
					if(tmp[1] == ""){
						callSystemError();
						return false;
					}
					var id = tmp[1];
					id = '#' + id;
					var orgVal = $(id).val();
					tmp[2] = tmp[2] || "";
					if(orgVal == ""){
						return false;
					}
					if(tmp[2] == ""){
						if(val == ""){
							showError(obj,errMessage['linknull']);
						}
					}else{
						if(orgVal == tmp[2] && val == ""){
							showError(obj,errMessage['linknull']);
						}
					}
				}
				if (type['radionull']){
					tmp = [];
					tmp = type['radionull'].split("-");
					tmp[1] = tmp[1] || "";
					tmp[2] = tmp[2] || "";
					if(tmp[1] == "" || tmp[2] == ""){
						callSystemError();
						return false;
					}
					var name = tmp[1];
					var value = tmp[2];
					var radio = $('input[name="' + name + '"]:checked').val();
					if(radio == value && val == ""){
						showError(obj,errMessage['radionull']);
					}
				}
				if (type['checknull']){
					tmp = [];
					tmp = type['checknull'].split("-");
					tmp[1] = tmp[1] || "";
					if(tmp[1] == ""){
						callSystemError();
						return false;
					}
					var id = tmp[1];
					id = '#' + id;
					if($(id).prop("checked") && val == ""){
						showError(obj,errMessage['checknull']);
					}
				}
				if(type['checkgroup']){
					tmp = [];
					tmp = type['checkgroup'].split("-");
					tmp[1] = tmp[1] || "";
					if(tmp[1] == ""){
						callSystemError();
						return false;
					}
					var group = "." + tmp[1];
					var checkcnt = 0;
					$(group).each(function(){
						if($(this).prop("checked")){
							checkcnt ++;
						}
					});
					if(checkcnt == 0){
						showError(obj,errMessage['checkgroup']);
					}
				}
			}else if(val != ""){
				if (type['nospace']){
					if(val.match(/[　\s]/)){
						showError(obj,errMessage['nospace']);
						return false;
					}
				}
				if (type['nonumber']){
					if(val.match(/[０-９0-9]/)){
						showError(obj,errMessage['nonumber']);
						return false;
					}
				}
				if (type['nosymbol']){
					if(val.match(/[！”＃＄％＆’（）＝～｜‘｛＋＊｝＜＞？＿－＾￥＠「；：」、。・!"#\$%&'\(\)=~\|`{\+\*}<>\?_\-\^\\@\[;:\],\.\/\^]/)){
						showError(obj,errMessage['nosymbol']);
						return false;
					}
				}
				if (type['zenkaku']){
					var valLength = val.length;
					var byteLength = getByteLength(val);
					if(valLength * 2 != byteLength){
						showError(obj,errMessage['zenkaku']);
						return false;
					}
				}
				if (type['kana']){
					if(!val.match(/^[ぁ-んーァ-ヾ０-９\s　！”＃＄％＆’（）＝～｜‘｛＋＊｝＜＞？＿－＾￥＠「；：」、。・]+$/)){
						showError(obj,errMessage['kana']);
						return false;
					}
				}
				if (type['hiragana']){
					if(!val.match(/^[ぁ-んー０-９－\s　！”＃＄％＆’（）＝～｜‘｛＋＊｝＜＞？＿－＾￥＠「；：」、。・]+$/)){
						showError(obj,errMessage['hiragana']);
						return false;
					}
				}
				if (type['katakana']){
					if(!val.match(/^[ァ-ヾ０-９－\s　！”＃＄％＆’（）＝～｜‘｛＋＊｝＜＞？＿－＾￥＠「；：」、。・]+$/)){
						showError(obj,errMessage['katakana']);
						return false;
					}
				}
				if (type['hankaku']){
					var valLength = val.length;
					var byteLength = getByteLength(val);
					if(valLength != byteLength){
						showError(obj,errMessage['hankaku']);
						return false;
					}
				}
				if (type['number']){
					if(!val.match(/^[0-9\s!"#\$%&'\(\)=~\|`{\+\*}<>\?_\-\^\\@\[;:\],\.\/\^]+$/)){
						showError(obj,errMessage['number']);
						return false;
					}
				}
				if (type['alphabet']){
					if(!val.match(/^[a-zA-Z\s!"#\$%&'\(\)=~\|`{\+\*}<>\?_\-\^\\@\[;:\],\.\/\^]+$/)){
						showError(obj,errMessage['alphabet']);
						return false;
					}
				}
				if (type['alnum']){
					if(!val.match(/^[0-9a-zA-Z\s!"#\$%&'\(\)=~\|`{\+\*}<>\?_\-\^\\@\[;:\],\.\/\^]+$/)){
						showError(obj,errMessage['alphabet']);
						return false;
					}
				}
				if (type['email']){
					if(!checkEmail(val)){
						showError(obj,errMessage['email']);
						return false;
					}
				}
				if (type['url']){
					if(!checkUrl(val)){
						if(val.match(/^(https?|ftp):/)){
							showError(obj,errMessage['url']);
						}else{
							showError(obj,errMessage['url2']);
						}
						return false;
					}
				}
				if (type['tel']){
					if(!val.match(/^\d{10,11}$/)){
						showError(obj,errMessage['tel1']);
						return false;
					}
				}
				if (type['tel2']){
					if(!val.match(/^\d+\-\d+\-\d+$/)){
						showError(obj,errMessage['tel2']);
						return false;
					}
				}
				if (type['zip']){
					if(!val.match(/^\d{3}-\d{4}$/)){
						showError(obj,errMessage['zip']);
						return false;
					}
				}
				if (type['date']){
					tmp = [];
					tmp.length = 0;
					tmp = type['date'].split("-");
					tmp[1] = tmp[1] || "";
					if(tmp[1] == ""){
						callSystemError();
						return false;
					}
					if(tmp[1] == 1){
						if(!val.match(/^\d{4}\/\d{2}\/\d{2}$/)){
							showError(obj,errMessage['date']);
							return false;
						}
					}else if(tmp[1] == 2){
						if(!val.match(/^\d{4}\/\d{1,2}\/\d{1,2}$/)){
							showError(obj,errMessage['date']);
							return false;
						}
					}else if(tmp[1] == 3){
						if(!val.match(/^\d{4}\-\d{2}\-\d{2}$/)){
							showError(obj,errMessage['date']);
							return false;
						}
					}else if(tmp[1] == 4){
						if(!val.match(/^\d{4}\-\d{1,2}\-\d{1,2}$/)){
							showError(obj,errMessage['date']);
							return false;
						}
					}else if(tmp[1] == 5){
						if(!val.match(/^\d{8}$/)){
							showError(obj,errMessage['date']);
							return false;
						}
					}
				}
				if (type['jancode']){
					if(!checkJancode(val)){
						showError(obj,errMessage['jancode']);
						return false;
					}
				}
				if (type['custom']){
					if(!val.match(/^[a-zA-Z0-9][a-zA-Z0-9_\-\.]+[a-zA-Z0-9]$/)){
						showError(obj,errMessage['custom']);
						return false;
					}
					if(val.length < 3 || val.length > 32){
						showError(obj,errMessage['custom']);
						return false;
					}
				}
				if (type['typebase']){
					tmp = [];
					tmp = type['typebase'].split("-");
					tmp[1] = tmp[1] || "";
					if(tmp[1] == ""){
						callSystemError();
						return false;
					}
					var retypeId = tmp[1];
					retypeId = "#" + retypeId;
					var retypeVal = $(retypeId).val();
					if(retypeVal != "" && val != retypeVal){
						showError($(retypeId),errMessage['retype']);
						return false;
					}else if(retypeVal != "" && val == retypeVal){
						hideError(obj);
						hideError($(retypeId));
					}
				}
				if (type['retype']){
					tmp = [];
					tmp = type['retype'].split("-");
					tmp[1] = tmp[1] || "";
					if(tmp[1] == ""){
						callSystemError();
						return false;
					}
					var baseId = tmp[1];
					baseId = "#" + baseId;
					var baseVal = $(baseId).val();
					if(val != baseVal){
						showError(obj,errMessage['retype']);
						return false;
					}
				}
				if (type['len']){
					tmp = [];
					tmp = type['len'].split("-");
					tmp[1] = tmp[1] || "";
					if(tmp[1] == ""){
						callSystemError();
						return false;
					}
					var length = tmp[1];
					if(val.length != length){
						showError(obj,errMessage['len1'] + length + errMessage['len2']);
						return false;
					}
				}
				if (type['max']){
					tmp = [];
					tmp = type['max'].split("-");
					tmp[1] = tmp[1] || "";
					if(tmp[1] == ""){
						callSystemError();
						return false;
					}
					var max = tmp[1];
					if(val.length > max){
						showError(obj,errMessage['max1'] + max + errMessage['max2']);
						return false;
					}
				}
				if (type['min']){
					tmp = [];
					tmp = type['min'].split("-");
					tmp[1] = tmp[1] || "";
					if(tmp[1] == ""){
						callSystemError();
						return false;
					}
					var min = tmp[1];
					if(val.length < min){
						showError(obj,errMessage['min1'] + min + errMessage['min2']);
						return false;
					}
				}
				if (type['range']){
					tmp = [];
					tmp = type['range'].split("-");
					tmp[2] = tmp[2] || "";
					if(tmp[1] == "" || tmp[2] == ""){
						callSystemError();
						return false;
					}
					var rmin = tmp[1];
					var rmax = tmp[2];
					if(val.length < rmin || val.length > rmax){
						showError(obj,errMessage['range1'] + rmin + errMessage['range2'] + rmax + errMessage['range3']);
						return false;
					}
				}
				if(type['hhmm']){
					tmp = [];
					tmp = type['hhmm'].split("-");
					tmp[1] = tmp[1] || "";
					if(tmp[1] == ""){
						callSystemError();
						return false;
					}
					var group = "." + tmp[1];
					var sh = '', sm = '', eh = '', em = '';
					$(group).each(function(){
						if($(this).hasClass('shour')){
							sh = $(this).val();
						}
						if($(this).hasClass('smin')){
							sm = $(this).val();
						}
						if($(this).hasClass('ehour')){
							eh = $(this).val();
						}
						if($(this).hasClass('emin')){
							em = $(this).val();
						}
					});
					if(sh == "" || sm == "" || eh == "" || em == ""){
						return false;
					}
					var start = '' + sh + sm;
					var end = '' + eh + em;
					if(start > end || start == end){
						showError(obj,errMessage['hhmm']);
					}else{
						var hhmmhhmm = sh + sm + '-' + eh + em;
						$(group).closest(parentClass).find('.hhmm-hhmm').val(hhmmhhmm);
					}
				}
			}
		}

		function showError(obj,message){
			obj.addClass(errorClassName);
			obj.closest(parentClass).find(errorMsgClass).html(message);
			if(useParentError){
				obj.closest(parentClass).addClass(errorClassName);
			}
		}

		function showGroupError(obj,message){
			obj.closest(parentClass).find(".validate[data-validate-group]").each(function(){
				$(this).addClass(errorClassName);
			});
			obj.closest(parentClass).find(errorMsgClass).html(message);
			if(useParentError){
				obj.closest(parentClass).addClass(errorClassName);
			}
		}

		function hideError(obj){
			obj.removeClass(errorClassName);
			obj.closest(parentClass).find(errorMsgClass).html("");
			if(useParentError){
				obj.closest(parentClass).removeClass(errorClassName);
			}
		}

		function callSystemError(){
			if(sysErrorMsg){
				if(useBoxy){
					Boxy.alert(sysErrorMsg, null, {title: 'システムエラー'});
				}else{
					alert(sysErrorMsg);
				}
			}
		}

		function specialCharacter(val){
			if(val === "undefined"){
				return false;
			}
			var c = '';
			var d = 0;
			var msg = '';
			for(var j=0; j<val.length; j++){
				var s = val.charAt(j);
				var e = j + 1;
				var pat;
				var regex = new RegExp(); // RegExpオブジェクト
				pat = "[｡｢｣､･ｦ-ﾝﾞﾟ①-⑳Ⅰ-Ⅹ㍉㌔㌢㍍㌘㌧㌃㌶㍑㍗㌍㌦㌣㌫㍊㌻㎜㎝㎞㎎㎏㏄㎡㍻〝〟№㏍℡㊤㊥㊦㊧㊨㈱㈲㈹㍾㍽㍼≒≡∫∮∑√⊥∠∟⊿∵∩∪纊褜鍈銈蓜俉炻昱棈鋹曻彅丨仡仼伀伃伹佖侒侊侚侔俍偀倢俿倞偆偰偂傔僴僘兊兤冝冾凬刕劜劦勀勛匀匇匤卲厓厲叝﨎咜咊咩哿喆坙坥垬埈埇﨏塚增墲夋奓奛奝奣妤妺孖寀甯寘寬尞岦岺峵崧嵓﨑嵂嵭嶸嶹巐弡弴彧德忞恝悅悊惞惕愠惲愑愷愰憘戓抦揵摠撝擎敎昀昕昻昉昮昞昤晥晗晙晴晳暙暠暲暿曺朎朗杦枻桒柀栁桄棏﨓楨﨔榘槢樰橫橆橳橾櫢櫤毖氿汜沆汯泚洄涇浯涖涬淏淸淲淼渹湜渧渼溿澈澵濵瀅瀇瀨炅炫焏焄煜煆煇凞燁燾犱犾猤猪獷玽珉珖珣珒琇珵琦琪琩琮瑢璉璟甁畯皂皜皞皛皦益睆劯砡硎硤硺礰礼神祥禔福禛竑竧靖竫箞精絈絜綷綠緖繒罇羡羽茁荢荿菇菶葈蒴蕓蕙蕫﨟薰蘒﨡蠇裵訒訷詹誧誾諟諸諶譓譿賰賴贒赶﨣軏﨤逸遧郞都鄕鄧釚釗釞釭釮釤釥鈆鈐鈊鈺鉀鈼鉎鉙鉑鈹鉧銧鉷鉸鋧鋗鋙鋐﨧鋕鋠鋓錥錡鋻﨨錞鋿錝錂鍰鍗鎤鏆鏞鏸鐱鑅鑈閒隆﨩隝隯霳霻靃靍靏靑靕顗顥飯飼餧館馞驎髙髜魵魲鮏鮱鮻鰀鵰鵫鶴鸙黑ⅰⅱⅲⅳⅴⅵⅶⅷⅸⅹ￢￤＇＂ⅰⅱⅲⅳⅴⅵⅶⅷⅸⅹⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩ￢￤＇＂㈱№℡∵纊褜鍈銈蓜俉炻昱棈鋹曻彅丨仡仼伀伃伹佖侒侊侚侔俍偀倢俿倞偆偰偂傔僴僘兊兤冝冾凬刕劜劦勀勛匀匇匤卲厓厲叝﨎咜咊咩哿喆坙坥垬埈埇﨏塚增墲夋奓奛奝奣妤妺孖寀甯寘寬尞岦岺峵崧嵓﨑嵂嵭嶸嶹巐弡弴彧德忞恝悅悊惞惕愠惲愑愷愰憘戓抦揵摠撝擎敎昀昕昻昉昮昞昤晥晗晙晴晳暙暠暲暿曺朎朗杦枻桒柀栁桄棏﨓楨﨔榘槢樰橫橆橳橾櫢櫤毖氿汜沆汯泚洄涇浯涖涬淏淸淲淼渹湜渧渼溿澈澵濵瀅瀇瀨炅炫焏焄煜煆煇凞燁燾犱犾猤猪獷玽珉珖珣珒琇珵琦琪琩琮瑢璉璟甁畯皂皜皞皛皦益睆劯砡硎硤硺礰礼神祥禔福禛竑竧靖竫箞精絈絜綷綠緖繒罇羡羽茁荢荿菇菶葈蒴蕓蕙蕫﨟薰蘒﨡蠇裵訒訷詹誧誾諟諸諶譓譿賰賴贒赶﨣軏﨤逸遧郞都鄕鄧釚釗釞釭釮釤釥鈆鈐鈊鈺鉀鈼鉎鉙鉑鈹鉧銧鉷鉸鋧鋗鋙鋐﨧鋕鋠鋓錥錡鋻﨨錞鋿錝錂鍰鍗鎤鏆鏞鏸鐱鑅鑈閒隆﨩隝隯霳霻靃靍靏靑靕顗顥飯飼餧館馞驎髙髜魵魲鮏鮱鮻鰀鵰鵫鶴鸙黑]";
				regex.compile(pat); // コンパイル
				if (s.match(regex)) {
					if (d == 0) {
						c = c + e;
						d = 1;
					} else {
						c = c + ',' + e;
					}
				}
			}
			if (d == 1){
				msg = c + '文字目に機種依存文字が使われています。（改行も1文字と数えます）';
			}
			return msg;
		}

		function getByteLength(val){
			byteCount = 0;
			for(var k=0;k<val.length;k++)(escape(val.charAt(k)).length< 4)?byteCount++:byteCount+=2;
			return byteCount;
		}

		function checkEmail(val){
			if (val.match(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i)){
				return true;
			}else{
				return false;
			}
		}

		function checkUrl(val){
			if (val.match(/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i)){
				return true;
			}else{
				return false;
			}
		}

		function checkJancode(val){
			if(val.length == 8 || val.length == 13){
				if(val.length == 13){
					var digit = val.charAt(12);
					var even = parseInt(val.charAt(1)) + parseInt(val.charAt(3)) + parseInt(val.charAt(5)) + parseInt(val.charAt(7)) + parseInt(val.charAt(9)) + parseInt(val.charAt(11));
					var odd = parseInt(val.charAt(0)) + parseInt(val.charAt(2)) + parseInt(val.charAt(4)) + parseInt(val.charAt(6)) + parseInt(val.charAt(8)) + parseInt(val.charAt(10));
					var total = even * 3 + odd;
					total = new String(total);
					var totalLen = total.length;
					var last = parseInt(total.charAt(totalLen-1));
					var rest;
					if (last == 0){
						rest = 0;
					}else{
						rest = 10 - last;
					}
				}else{
					var digit = val.charAt(7);
					var even = parseInt(val.charAt(0)) + parseInt(val.charAt(2)) + parseInt(val.charAt(4)) + parseInt(val.charAt(6));
					var odd = parseInt(val.charAt(1)) + parseInt(val.charAt(3)) + parseInt(val.charAt(5));
					var total = even * 3 + odd;
					total = new String(total);
					var totalLen = total.length;
					var last = parseInt(total.charAt(totalLen-1));
					var rest;
					if (last == 0){
						rest = 0;
					}else{
						rest = 10 - last;
					}
				}
				if(rest != digit){
					return false;
				}
				return true;
			}else{
				return false;
			}
		}

		// placeholder対応ブラウザかどうか
		function checkPlaceholder() {
			var attr = 'placeholder';
			var input = document.createElement('input');
			return attr in input;
		};


	});
}