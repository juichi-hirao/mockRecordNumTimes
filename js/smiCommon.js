
/** angularjs用のajaxポストヘッダ */
ANGULARJS_AJAX_POST_HEADER = { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' };


/**
 * toastを表示する。
 */
function showToast(type,text){
	var bgcolor = "";
	if("warning"==type){
		bgcolor = "#FF8B00";
	}else if("error"==type){
		bgcolor = "#FA5858";
	}else if("info"==type){
		bgcolor = "#5B9DB5";
	}

	$.toast({ 
		text : text, 
		icon: type,
		showHideTransition : 'fade',  
		bgColor : bgcolor,  
		textColor : '#fff',
		allowToastClose : true, 
		hideAfter : 2000,
		stack : false,  
		textAlign : 'left',  
		position : 'mid-center'
	});
}


/**
 * テキストを選択できないようにする。
 */
function notSelection(selection){
	if(true==selection){
		$(document).unbind();
	}else{
		$(document).on('cut copy paste contextmenu selectstart', function(){
			return false;
		});
	}
}


/**
 * oldStrをnewStrに全置換する。
 * @param oldStr
 * @param newStr
 * @returns
 */
function replaceAll(str,oldStr,newStr){
	return str.split(oldStr).join(newStr);
}


/**
 * null、空白文字をチェックする。
 */

function isEmpty (val) {
	if (null == val) {
		return true;
	}
	if (undefined === val) {
		return true;
	}
	if ("" == val) {
		return true;
	}
	return false;
}

