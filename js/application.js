// initialize console for IE
if( typeof window.console === "undefined" ){window.console = {};}
if( typeof window.console.log !== "function" ){window.console.log = function(){};}

(function($) {
	$(function() {
		// For IE
		if (navigator.userAgent.indexOf('MSIE') > 0 || navigator.userAgent.indexOf('rv:11') > 0) {
			$('body').addClass('ie');
		};
		// For Firefox
		if (navigator.userAgent.indexOf('Firefox') > 0) {
			$('body').addClass('ff');
		};
		// For Windows
		if (navigator.userAgent.indexOf('Win') > 0) {
			$('body').addClass('win');
		};
		var userAgent = window.navigator.userAgent.toLowerCase();
		var appVersion = window.navigator.appVersion.toLowerCase();

		if (userAgent.indexOf('msie') != -1) {

			if (appVersion.indexOf("msie 6.") != -1) {
				$('body').addClass('ie6');
			} else if (appVersion.indexOf("msie 7.") != -1) {
				$('body').addClass('ie7');
			} else if (appVersion.indexOf("msie 8.") != -1) {
				$('body').addClass('ie8');
			} else if (appVersion.indexOf("msie 9.") != -1) {
				$('body').addClass('ie9');
			} else if (appVersion.indexOf("msie 10.") != -1) {
				$('body').addClass('ie10');
			}


		} else if (userAgent.indexOf('chrome') != -1) {
			$('body').addClass('chrome');
		} else if (userAgent.indexOf('safari') != -1) {
			$('body').addClass('safari');
		} else if (userAgent.indexOf('firefox') != -1) {
			$('body').addClass('ff');
		}

		/***********************************************************************
		 * realtime validation
		 **********************************************************************/
		var options = {
			errorClassName : 'error',
			parentClassName : 'form-group',
			errorMsgClassName : 'errorMsgBox',
			errorMsgTagName : 'span',
			specialCharCheck	: true,
			useCrossPlaceholder	: false,
			useParentError		: false
		};
		$(document).on('blur','.validate',function(){
			$(this).WizValidator(options);
		});

		/*
		 *  validation
		 */
		/* 食事記録　保存ボタン */
		$(document).on('click','#saveMealBtn',function(){
			alert('登録情報を保存します。');
			$(this).find('i').addClass('fa-spin');
			setTimeout(function(){
				$('i').removeClass('fa-spin');
			},3000);
		});
		/* 食事記録　最新ボタン */
		$(document).on('click','#refreshMealBtn',function(){
			alert('情報をリフレッシュします。');
			$(this).find('i').addClass('fa-spin');
			setTimeout(function(){
				$('i').removeClass('fa-spin');
			},3000);
		});
		/* バイタル 一括登録ボタン */
		$(document).on('click','#vitalAllSaveBtn',function(){
			alert('入力された入居者のみ新規登録処理をします。');
			$(this).find('i').addClass('fa-spin');
			setTimeout(function(){
				$('i').removeClass('fa-spin');
			},3000);
		});


		/* 連絡事項　一覧ボタン */
		$(document).on('click','#historyBtn',function(){
			alert('user_idを参照し、一覧画面に移動します。');
			location.href = 'contact_user.html';
		});
		/* バイタル　一覧ボタン */
		$(document).on('click','#vitalHistryBtn',function(){
			alert('user_idを参照し、一覧画面に移動します。');
			location.href = 'vital_user.html';
		});

		/* バイタル　デフォルト値　取得　*/
		$(document).on('click','.numberForm',function(){
			$(this).val('');
		});
		$(document).on('blur','.numberForm',function(){
			var checkNum = $(this).val();
			if(checkNum == ''){
				checkNum = '-';
			}else if(checkNum == 00 || checkNum == 000){
				checkNum = 0;
			}
			$(this).val(checkNum);
		});


		/* バイタル　酸素飽和度　バリデータ　*/
		$(document).on('change','.oxy .numberForm',function(){
			var checkNum = $(this).val();
			if(checkNum > 100){
				alert('0〜100までの数字を入力してください。');
				var valNum = $(this).attr('data-value');
				$(this).val(valNum);
			}
			if(checkNum == 00 || checkNum == 000){
				$(this).val(0);
			}
		});
		/* バイタル　体温デフォルト値　取得　*/
		$(document).on('focus','.numberForm_tem',function(){
			var valNum = $(this).val();
			$(this).attr('data-value',valNum);
		});
		/* バイタル　体温　バリデータ　*/
		$(document).on('change','.numberForm_tem',function(){
			var checkNum = $(this).val();
			if(checkNum > 99.9){
				alert('0〜99.9までの数字を入力してください。');
				var valNum = $(this).attr('data-value');
				$(this).val(valNum);
			}
			if(checkNum == 00 || checkNum == 000){
				$(this).val(0);
			}
		});


		$(document).on('click','#contactRegistBtn',function(){
			var category 	= $('[name=contact_category] option:selected').text();
			var startdate  = $('[name=start_date]').val();
			var starttime  = $('[name=start_time]').val();
			var enddate 	= $('[name=end_date]').val();
			var endtime 	= $('[name=end_time]').val();
			var contactcontents   = $('#contact_contents').val();
			var rep 		= $('[name=rep] option:selected').text();

			alert('登録処理を行います');

		});
		/*　連絡事項削除ボタン */
		$(document).on('click','.deleteBtn',function(){
			alert('対象のidを参照し、削除処理を行います。');
			$(this).closest('.tr').fadeOut();
			showToast('info', '削除しました。');

		});
		/*　連絡事項編集ボタン */
		$(document).on('click','.editModalBtn',function(){
			alert('対象の項目情報を取得し、モーダル内のformに反映します。');
		});
		$(document).on('click','.setPhrases',function(){
			alert('Ajax処理定型文情報を取得します。');
		});
		/* 連絡事項 ボタン　*/
		$(document).on('click','.contact a',function(){
			alert('連絡事項情報を取得します。');
		});

		/*　バイタル バリデータ */
		$(document).on('click','#vitalEditBtn',function(){
			var tem 	= $('#addvitalModal .temperature').val();
			var hbp 	= $('#addvitalModal .h_blood_pressure').val();
			var lbp 	= $('#addvitalModal .l_blood_pressure').val();
			var pul 	= $('#addvitalModal .pulse').val();
			var res 	= $('#addvitalModal .respiration').val();
			var oxy 	= $('#addvitalModal .oxy').val();

			var errorFlg = 0;

			if(tem == ""){
				tem = "-";
			}else if(!$.isNumeric(tem)){
				var errorText = '0〜99.9の数値を入力してください。';
				$('#addvitalModal .temperature').nextAll('.error').text(errorText);
				errorFlg = 1;
			}else if(tem < 0 || tem > 99.9){
				var errorText = '0〜99.9の数値を入力してください。';
				$('#addvitalModal .temperature').nextAll('.error').text(errorText);
				errorFlg = 1;
			}else if(tem.match(/^-?[0-9]+\.[0-9]+$/)){
				if(getDecimal(tem) != 1){
					var errorText = '小数点1桁までの数値を入力してください。';
					$('#addvitalModal .temperature').nextAll('.error').text(errorText);
					errorFlg = 1;
				}
			}else{
				$('#addvitalModal .temperature').nextAll('.error').text('');
			}

			if(hbp == ""){
				hbp = "-";
			}else if(!$.isNumeric(hbp)){
				var errorText = '0〜999の整数を入力してください。';
				$('#addvitalModal .h_blood_pressure').nextAll('.error').text(errorText);
				errorFlg = 1;
			}else if(hbp < 0 || hbp > 999){
				var errorText = '0〜999の整数を入力してください。';
				$('#addvitalModal .h_blood_pressure').nextAll('.error').text(errorText);
				errorFlg = 1;
			}else if(!hbp.match(/^-?[0-9]+$/)){
				var errorText = '0〜999の整数を入力してください。';
				$('#addvitalModal .h_blood_pressure').nextAll('.error').text(errorText);
				errorFlg = 1;
			}else{
				$('#addvitalModal .h_blood_pressure').nextAll('.error').text('');
			}

			if(lbp == ""){
				lbp = "-";
			}else if(!$.isNumeric(lbp)){
				var errorText = '0〜999の数値を入力してください。';
				$('#addvitalModal .l_blood_pressure').nextAll('.error').text(errorText);
				errorFlg = 1;
			}else if(lbp < 0 || lbp > 999){
				var errorText = '0〜999の数値を入力してください。';
				$('#addvitalModal .l_blood_pressure').nextAll('.error').text(errorText);
				errorFlg = 1;
			}else if(!lbp.match(/^-?[0-9]+$/)){
				var errorText = '0〜999の整数を入力してください。';
				$('#addvitalModal .l_blood_pressure').nextAll('.error').text(errorText);
				errorFlg = 1;
			}else{
				$('#addvitalModal .l_blood_pressure').nextAll('.error').text('');
			}

			if(pul == ""){
				pul = "-";
			}else if(!$.isNumeric(pul)){
				var errorText = '0〜999の数値を入力してください。';
				$('#addvitalModal .pulse').nextAll('.error').text(errorText);
				errorFlg = 1;
			}else if(pul < 0 || pul > 999){
				var errorText = '0〜999の数値を入力してください。';
				$('#addvitalModal .pulse').nextAll('.error').text(errorText);
				errorFlg = 1;
			}else if(!pul.match(/^-?[0-9]+$/)){
				var errorText = '0〜999の整数を入力してください。';
				$('#addvitalModal .pulse').nextAll('.error').text(errorText);
				errorFlg = 1;
			}else{
				$('#addvitalModal .pulse').nextAll('.error').text('');
			}

			if(res == ""){
				res = "-";
			}else if(!$.isNumeric(res)){
				var errorText = '0〜999の数値を入力してください。';
				$('#addvitalModal .respiration').nextAll('.error').text(errorText);
				errorFlg = 1;
			}else if(res < 0 || res > 999){
				var errorText = '0〜999の数値を入力してください。';
				$('#addvitalModal .respiration').nextAll('.error').text(errorText);
				errorFlg = 1;
			}else if(!res.match(/^-?[0-9]+$/)){
				var errorText = '0〜999の整数を入力してください。';
				$('#addvitalModal .respiration').nextAll('.error').text(errorText);
				errorFlg = 1;
			}else{
				$('#addvitalModal .respiration').nextAll('.error').text('');
			}

			if(oxy == ""){
				oxy = "-";
			}else if(!$.isNumeric(oxy)){
				var errorText = '0〜100の数値を入力してください。';
				$('#addvitalModal .oxy').nextAll('.error').text(errorText);
				errorFlg = 1;
			}else if(oxy < 0 || oxy > 100){
				var errorText = '0〜100の数値を入力してください。';
				$('#addvitalModal .oxy').nextAll('.error').text(errorText);
				errorFlg = 1;
			}else if(!oxy.match(/^-?[0-9]+$/)){
				var errorText = '0〜100の整数を入力してください。';
				$('#addvitalModal .oxy').nextAll('.error').text(errorText);
				errorFlg = 1;
			}else{
				$('#addvitalModal .oxy').nextAll('.error').text('');
			}

			if(errorFlg != 1){
				$('.error').text('');
				alert('情報を送信します。');
			}

		});

		$(document).on('click','#vitalRegistBtn',function(){
			var tem 	= $('#addUserModal .temperature').val();
			var hbp 	= $('#addUserModal .h_blood_pressure').val();
			var lbp 	= $('#addUserModal .l_blood_pressure').val();
			var pul 	= $('#addUserModal .pulse').val();
			var res 	= $('#addUserModal .respiration').val();
			var oxy 	= $('#addUserModal .oxy').val();

			var errorFlg = 0;

			if(tem == "" || tem =="-"){
				tem = "-";
			}else if(!$.isNumeric(tem)){
				var errorText = '0〜99.9の数値を入力してください。';
				$('#addUserModal .temperature').nextAll('.error').text(errorText);
				errorFlg = 1;
			}else if(tem < 0 || tem > 99.9){
				var errorText = '0〜99.9の数値を入力してください。';
				$('#addUserModal .temperature').nextAll('.error').text(errorText);
				errorFlg = 1;
			}else if(tem.match(/^-?[0-9]+\.[0-9]+$/)){
					//temが小数の場合の処理
				if(getDecimal(tem) != 1){
					var errorText = '小数点1桁までの数値を入力してください。';
					$('#addUserModal .temperature').nextAll('.error').text(errorText);
					errorFlg = 1;
				}
			}else{
				$('#addUserModal .temperature').nextAll('.error').text('');
			}

			if(hbp == "" || hbp =="-"){
				hbp = "-";
			}else if(!$.isNumeric(hbp)){
				var errorText = '0〜999の数値を入力してください。';
				$('#addUserModal .h_blood_pressure').nextAll('.error').text(errorText);
				errorFlg = 1;
			}else if(hbp < 0 || hbp > 999){
				var errorText = '0〜999の数値を入力してください。';
				$('#addUserModal .h_blood_pressure').nextAll('.error').text(errorText);
				errorFlg = 1;
			}else if(!hbp.match(/^-?[0-9]+$/)){
				var errorText = '0〜100の整数を入力してください。';
				$('#addUserModal .h_blood_pressure').nextAll('.error').text(errorText);
				errorFlg = 1;
			}else{
				$('#addUserModal .h_blood_pressure').nextAll('.error').text('');
			}

			if(lbp == "" || lbp =="-"){
				lbp = "-";
			}else if(!$.isNumeric(lbp)){
				var errorText = '0〜999の数値を入力してください。';
				$('#addUserModal .l_blood_pressure').nextAll('.error').text(errorText);
				errorFlg = 1;
			}else if(lbp < 0 || lbp > 999){
				var errorText = '0〜999の数値を入力してください。';
				$('#addUserModal .l_blood_pressure').nextAll('.error').text(errorText);
				errorFlg = 1;
			}else if(!lbp.match(/^-?[0-9]+$/)){
				var errorText = '0〜100の整数を入力してください。';
				$('#addUserModal .l_blood_pressure').nextAll('.error').text(errorText);
				errorFlg = 1;
			}else{
				$('#addUserModal .l_blood_pressure').nextAll('.error').text('');
			}

			if(pul == "" || pul =="-"){
				pul = "-";
			}else if(!$.isNumeric(pul)){
				var errorText = '0〜999の数値を入力してください。';
				$('#addUserModal .pulse').nextAll('.error').text(errorText);
				errorFlg = 1;
			}else if(pul < 0 || pul > 999){
				var errorText = '0〜999の数値を入力してください。';
				$('#addUserModal .pulse').nextAll('.error').text(errorText);
				errorFlg = 1;
			}else if(!pul.match(/^-?[0-9]+$/)){
				var errorText = '0〜100の整数を入力してください。';
				$('#addUserModal .pulse').nextAll('.error').text(errorText);
				errorFlg = 1;
			}else{
				$('#addUserModal .pulse').nextAll('.error').text('');
			}

			if(res == "" || res =="-"){
				res = "-";
			}else if(!$.isNumeric(res)){
				var errorText = '0〜999の数値を入力してください。';
				$('#addUserModal .respiration').nextAll('.error').text(errorText);
				errorFlg = 1;
			}else if(res < 0 || res > 999){
				var errorText = '0〜999の数値を入力してください。';
				$('#addUserModal .respiration').nextAll('.error').text(errorText);
				errorFlg = 1;
			}else if(!res.match(/^-?[0-9]+$/)){
				var errorText = '0〜100の整数を入力してください。';
				$('#addUserModal .respiration').nextAll('.error').text(errorText);
				errorFlg = 1;
			}else{
				$('#addUserModal .respiration').nextAll('.error').text('');
			}

			if(oxy == "" || oxy =="-"){
				oxy = "-";
			}else if(!$.isNumeric(oxy)){
				var errorText = '0〜100の数値を入力してください。';
				$('#addUserModal .oxy').nextAll('.error').text(errorText);
				errorFlg = 1;
			}else if(oxy < 0 || oxy > 100){
				var errorText = '0〜100の数値を入力してください。';
				$('#addUserModal .oxy').nextAll('.error').text(errorText);
				errorFlg = 1;
			}else if(!oxy.match(/^-?[0-9]+$/)){
				var errorText = '0〜100の整数を入力してください。';
				$('#addUserModal .oxy').nextAll('.error').text(errorText);
				errorFlg = 1;
			}else{
				$('#addUserModal .oxy').nextAll('.error').text('');
			}

			if(errorFlg != 1){
				$('.error').text('');
				alert('情報を送信します。');
			}

		});

		$('.temperature .numberForm').on('change',function(){
			var checkNum = $(this).val();
			if(checkNum == "" || checkNum == "-"){
				checkNum = "-";
			}else if(!$.isNumeric(checkNum)){
				alert('0〜99.9の数値を入力してください。');
				$(this).val('');
			}else if(checkNum < 0 || checkNum > 99.9){
				alert('0〜99.9の数値を入力してください。');
				$(this).val('');
			}else if(checkNum.match(/^-?[0-9]+\.[0-9]+$/)){
					//小数の場合の処理
				if(getDecimal(checkNum) != 1){
					alert('小数点1桁までの数値を入力してください。');
					$(this).val('');
				}
			}
		});

		$('.h_blood_pressure .numberForm').on('blur',function(){
			var checkNum = $(this).val();
			if(checkNum == "" || checkNum == "-"){
				checkNum = "-";
			}else if(!$.isNumeric(checkNum)){
				alert('0〜999の数値を入力してください。');
				$(this).val('');
			}else if(checkNum < 0 || checkNum > 999){
				alert('0〜999の数値を入力してください。');
				$(this).val('');
			}else if(!checkNum.match(/^-?[0-9]+$/)){
				alert('0〜999の整数を入力してください。');
				$(this).val('');
			}
		});
		$('.l_blood_pressure .numberForm').on('blur',function(){
			var checkNum = $(this).val();
			if(checkNum == "" || checkNum == "-"){
				checkNum = "-";
			}else if(!$.isNumeric(checkNum)){
				alert('0〜999の数値を入力してください。');
				$(this).val('');
			}else if(checkNum < 0 || checkNum > 999){
				alert('0〜999の数値を入力してください。');
				$(this).val('');
			}else if(!checkNum.match(/^-?[0-9]+$/)){
				alert('0〜999の整数を入力してください。');
				$(this).val('');
			}
		});
		$('.pulse .numberForm').on('blur',function(){
			var checkNum = $(this).val();
			if(checkNum == "" || checkNum == "-"){
				checkNum = "-";
			}else if(!$.isNumeric(checkNum)){
				alert('0〜999の数値を入力してください。');
				$(this).val('');
			}else if(checkNum < 0 || checkNum > 999){
				alert('0〜999の数値を入力してください。');
				$(this).val('');
			}else if(!checkNum.match(/^-?[0-9]+$/)){
				alert('0〜999の整数を入力してください。');
				$(this).val('');
			}
		});
		$('.respiration .numberForm').on('blur',function(){
			var checkNum = $(this).val();
			if(checkNum == "" || checkNum == "-"){
				checkNum = "-";
			}else if(!$.isNumeric(checkNum)){
				alert('0〜999の数値を入力してください。');
				$(this).val('');
			}else if(checkNum < 0 || checkNum > 999){
				alert('0〜999の数値を入力してください。');
				$(this).val('');
			}else if(!checkNum.match(/^-?[0-9]+$/)){
				alert('0〜999の整数を入力してください。');
				$(this).val('');
			}
		});

		$('.oxy .numberForm').on('blur',function(){
			var checkNum = $(this).val();
			if(checkNum == "" || checkNum == "-"){
				checkNum = "-";
			}else if(!$.isNumeric(checkNum)){
				alert('0〜100の数値を入力してください。');
				$(this).val('');
			}else if(checkNum < 0 || checkNum > 100){
				alert('0〜100の数値を入力してください。');
				$(this).val('');
			}else if(!checkNum.match(/^-?[0-9]+$/)){
				alert('0〜100の整数を入力してください。');
				$(this).val('');
			}
		});
		/*
		 * 記録設定　バリデータ
		 */
		$(document).on('click','#saveSettingBtn',function(){
			errorFlg = 0;

			// 主食　バリデータ
			$('.stapleSetting .newcol_form').each(function(){
				var checkVal = $(this).val();
				if(checkVal == ""){
					var errorText = '項目を入力してください。';
					$(this).nextAll('.error').text(errorText);
					errorFlg = 1;
				}else if($(this).val().length > 40){
					var errorText = '40文字以内で入力してください。';
					$(this).nextAll('.error').text(errorText);
					errorFlg = 1;
				}
			});
			// 副食　バリデータ
			$('.sideSetting .newcol_form').each(function(){
				var checkVal = $(this).val();
				if(checkVal == ""){
					var errorText = '項目を入力してください。';
					$(this).nextAll('.error').text(errorText);
					errorFlg = 1;
				}else if($(this).val().length > 40){
					var errorText = '40文字以内で入力してください。';
					$(this).nextAll('.error').text(errorText);
					errorFlg = 1;
				}
			});
			// 汁物　バリデータ
			$('.soupSetting .newcol_form').each(function(){
				var checkVal = $(this).val();
				if(checkVal == ""){
					var errorText = '項目を入力してください。';
					$(this).nextAll('.error').text(errorText);
					errorFlg = 1;
				}else if($(this).val().length > 40){
					var errorText = '40文字以内で入力してください。';
					$(this).nextAll('.error').text(errorText);
					errorFlg = 1;
				}
			});

			// 服薬　バリデータ
			$('.takingSetting .newcol_form').each(function(){
				var checkVal = $(this).val();
				if(checkVal == ""){
					var errorText = '項目を入力してください。';
					$(this).nextAll('.error').text(errorText);
					errorFlg = 1;
				}else if($(this).val().length > 40){
					var errorText = '40文字以内で入力してください。';
					$(this).nextAll('.error').text(errorText);
					errorFlg = 1;
				}
			});
			// 水分量　バリデータ
			$('.moistureSetting .newcol_form').each(function(){
				var checkVal = $(this).val();
				if(checkVal == ""){
					var errorText = '数値を入力してください。';
					$(this).nextAll('.error').text(errorText);
					errorFlg = 1;
				}else if(!$.isNumeric(checkVal)){
					var errorText ='0～9999の数値を入力してください。';
					$(this).nextAll('.error').text(errorText);
					errorFlg = 1;
				}else if(checkVal < 0 || checkVal > 9999){
					var errorText ='0～9999の数値を入力してください。';
					$(this).nextAll('.error').text(errorText);
					errorFlg = 1;
				}else if(!checkVal.match(/^-?[0-9]+$/)){
					var errorText ='0～9999の整数を入力してください。';
					$(this).nextAll('.error').text(errorText);
					errorFlg = 1;
				}
			});
			// 連絡事項　バリデータ
			$('#contact_item .newcol_form.contact_name').each(function(){
				var checkVal = $(this).val();
				if(checkVal == ""){
					var errorText = '申送種別を入力してください。';
					$(this).nextAll('.error').text(errorText);
					errorFlg = 1;
				}else if($(this).val().length > 2){
					var errorText = '2文字以内で入力してください。';
					$(this).nextAll('.error').text(errorText);
					errorFlg = 1;
				}
			});

			if(errorFlg == 1){
				showToast('error', '入力内容に誤りがあります。');
			}else{
				// テーブル並び替えによるid番号を整列させる
				$('.sortColums').each(function(){
					$(this).children('tr').each(function(i){
						$(this).find('.order').val(i + 1);
					});
				});
				showToast('info', '登録情報を送信しました。');
			//	$('#settingForm').submit(); //成功時の処理
			}
		});

		/***********************************************************************
		 * index action
		 **********************************************************************/

		// 初期テーブル読み込み
		$(document).ready(function(){
			displayTable();
			displayVitalTable();
			// 共通カレンダー　日付取得
			var now 	= new Date();
			var year 	= now.getFullYear();
			var month	= ('0' + (now.getMonth() + 1)).slice(-2);
			var day		= ('0' + now.getDate()).slice(-2);
			var hours	= ('0' + now.getHours()).slice(-2);
			$('.date .year').val(year);
			$('.date .month').val(month);
			$('.date .date').val(day);

			/* 設定画面　初期読み込み */
			if($('body').attr('id') == 'setting'){
				var checked = $('.link_office').val();
				if(checked == ''){
					$('.hiddenArea table').addClass('noactive');
					$("input[name='lunch_meal_link_type']").val(["00"]);
					$("input[name='lunch_drink_link_type']").val(["00"]);
					$("input[name='vital_link_type']").val(["00"]);
					$('.hiddenArea table :input').prop('disabled',true);

				}else{
					$('.hiddenArea table').removeClass('noactive');
					$("input[name='lunch_meal_link_type']").val(["01"]);
					$("input[name='lunch_drink_link_type']").val(["01"]);
					$("input[name='vital_link_type']").val(["01"]);
					$('.hiddenArea table :input').prop('disabled',false);
				}
			}

		});

		/*
		 *  共通日付 datepicker
		 */
		$('.datepicker2').datepicker({
			dateFormat : "yy/mm/dd"
			,dayNamesMin: ['日', '月', '火', '水', '木', '金', '土']
			,showOn: "button"
			,buttonImageOnly : true
			,buttonImage : "img/btn_calender.png"
			,beforeShow : function(input,inst){
				//開く前に日付を上書き
				var year = $(this).parent().find(".year").val();
				var month = $(this).parent().find(".month").val();
				var date = $(this).parent().find(".date").val();
				$(this).datepicker( "setDate" , year + "/" + month + "/" + date)
			},
			onSelect: function(dateText, inst){
				//カレンダー確定時にフォームに反映
				var dates = dateText.split('/');
				$(this).parent().find(".year").val(dates[0]);
				$(this).parent().find(".month").val(dates[1]);
				$(this).parent().find(".date").val(dates[2]);
				$('.datepickerBack').css({
					"position": "static",
					"top": "0",
					"left": "0",
					"width": "0",
					"height": "0",
					"padding-left": "18px",
					"padding-top": "20px",
					"display": "none"
				});
				$('#datepickerBody').css('display','none');
				$('#ui-datepicker-div').css('position','absolute');
				alert('日付データより情報を取得します。');
			}
		});

		$('.datepicker.allDate').datepicker({
			dateFormat : "yy/mm/dd"
			,dayNamesMin: ['日', '月', '火', '水', '木', '金', '土']
			,onSelect: function(dateText, inst){
				//カレンダー確定時にフォームに反映
				$('.datepicker').each(function(){
					if($(this).closest('.tr').attr('data-check') == 'ON'){
						$(this).val(dateText);
					}
				});
				$('.datepickerBack').css({
					"position": "static",
					"top": "0",
					"left": "0",
					"width": "0",
					"height": "0",
					"padding-left": "18px",
					"padding-top": "20px",
					"display": "none"
				});
				$('#datepickerBody').css('display','none');
				$('#ui-datepicker-div').css('position','absolute');

			}
		});


		$(document).on('click','.nextMonth',function(){
			var year	= parseInt($('.date .year').val());
			var month	= parseInt($('.date .month').val());
			var date	= parseInt($('.date .date').val());
			var getdate = computeMonth(year, month, date, +1);

			var getyear 	= getdate.getFullYear();
			var getmonth	= ('0' + (getdate.getMonth() + 1)).slice(-2);
			var getday		= ('0' + getdate.getDate()).slice(-2);

			$('.date .year').val(getyear);
			$('.date .month').val(getmonth);
			$('.date .date').val(getday);

			alert('日付データより情報を取得します。');
		});

		$(document).on('click','.prevMonth',function(){
			var year	= parseInt($('.date .year').val());
			var month	= parseInt($('.date .month').val());
			var date	= parseInt($('.date .date').val());
			var getdate = computeMonth(year, month, date, -1);

			var getyear 	= getdate.getFullYear();
			var tmpmonth	= getdate.getMonth() + 1;
			var getmonth	= ZeroFormat(tmpmonth, 2);
			var tmpdate		= getdate.getDate();
			var getday		= ZeroFormat(tmpdate, 2);

			$('.date .year').val(getyear);
			$('.date .month').val(getmonth);
			$('.date .date').val(getday);

			alert('日付データより情報を取得します。');

		});

		$(document).on('click','.nextDate',function(){
			var year	= parseInt($('.date .year').val());
			var month	= parseInt($('.date .month').val());
			var date	= parseInt($('.date .date').val());
			var getdate = computeDate(year, month, date, +1);

			var getyear 	= getdate.getFullYear();
			var getmonth	= ('0' + (getdate.getMonth() + 1)).slice(-2);
			var getday		= ('0' + getdate.getDate()).slice(-2);

			$('.date .year').val(getyear);
			$('.date .month').val(getmonth);
			$('.date .date').val(getday);
			alert('日付データより情報を取得します。');
		});

		$(document).on('click','.prevDate',function(){
			var year	= parseInt($('.date .year').val());
			var month	= parseInt($('.date .month').val());
			var date	= parseInt($('.date .date').val());
			var getdate = computeDate(year, month, date, -1);

			var getyear 	= getdate.getFullYear();
			var getmonth	= ('0' + (getdate.getMonth() + 1)).slice(-2);
			var getday		= ('0' + getdate.getDate()).slice(-2);

			$('.date .year').val(getyear);
			$('.date .month').val(getmonth);
			$('.date .date').val(getday);

			alert('日付データより情報を取得します。');
		});


		function computeDate(year, month, day, addDays) {
				var dt = new Date(year, month - 1, day);
				var baseSec = dt.getTime();
				var addSec = addDays * 86400000;//日数 * 1日のミリ秒数
				var targetSec = baseSec + addSec;
				dt.setTime(targetSec);
				return dt;
		}


		function computeMonth(year, month, day, addMonths) {
				month += addMonths;
				var endDay = getMonthEndDay(year, month);//ここで、前述した月末日を求める関数を使用します
				if(day > endDay) day = endDay;
				var dt = new Date(year, month - 1, day);
				return dt;
		}

		function getMonthEndDay(year, month) {
				//日付を0にすると前月の末日を指定したことになります
				//指定月の翌月の0日を取得して末日を求めます
				//そのため、ここでは month - 1 は行いません
				var dt = new Date(year, month, 0);
				return dt.getDate();
		}



		/*
		 * テーブルタブ選択可変機能
		 */
		$(document).on('click', '.day_cell div', function() {
			$('.table_meal').hide();
			if($(this).css('opacity') != 1.0){
				var hoverClass = $(this).attr('class');
				$('.' + hoverClass).css('opacity','1');
			}
			$('.day_cell div').each(function(){
				if($(this).hasClass('active')){
					$(this).removeClass('active');
				}
			});
			$('.number_cell div').each(function(){
				if($(this).hasClass('active')){
					$(this).removeClass('active');
				}
			});
			var activeClass = $(this).attr('data-trigger');
			var activeWidth = $(this).attr('data-width');
			$(this).addClass('active');
			$('.number_cell div').each(function(){
				if($(this).hasClass(activeClass + '_cell')){
					$(this).addClass('active');
				}
			});
			$('.number_cell div.' + activeClass + '_cell .'+ activeClass).each(function(){
				$(this).addClass('active');
			});
			displayTable();
		});

		function ZeroFormat(num, n){// ZeroFormat(1,3) => "001"
			var ret=""+num;
			while(ret.length < n){
			ret = "0" + ret;
			}
			return (ret);
			}



		/*
		 * 更新チェックボックス一括変更
		 */
		$('#all').change(function() {
			if($('#all:checked').prop('checked')){
				$('input[name=update]').prop('checked', true);
				$('.tbody .tr').attr('data-check','ON');
				$('.tbody .tr').addClass('check_on');
			}else{
				$('input[name=update]').prop('checked', false);
				$('.tbody .tr').attr('data-check','');
				$('.tbody .tr').removeClass('check_on');
			}
		});
		/*
		 * チェックボックス
		 */
		$('.info_cell .check').on('click',function(){
			if($(this).children('input[name=update]').is(':checked')){
				$(this).attr('data-chekck','').removeClass('chekck_on');
			}
		});
		$('[name=update]').change(function(){
			if($(this).is(':checked')) {
				$(this).closest('.tr').attr('data-check','ON').addClass('check_on');
			}else{
				$(this).closest('.tr').attr('data-check','').removeClass('check_on');
			}
		});
		/*
		 * Custom scrollbar
		 */
		$("#scroll_container").mCustomScrollbar({
			axis:"y",
			theme:"dark",
			scrollInertia: 100,
			mouseWheel: true,
			callbacks:{
				whileScrolling:function(){
					checkBottom(this.mcs.topPct);
				}
			}
		});
		/*
		 * table gradation
		 */
		function checkBottom(percent){
			if(percent > 90){
				$('#table_gradation').hide();
			}else{
				$('#table_gradation').show();
			}
		}



		/* テーブルタブ　hover */

		$('.day_cell div').hover(
			function(){
				if($(this).hasClass('active') == false){
					var hoverClass = $(this).attr('class');
					$('.' + hoverClass).css('opacity','0.6');
				}
			},
			function(){
				if($(this).hasClass('active') == false){
					var hoverClass = $(this).attr('class');
					$('.' + hoverClass).css('opacity','1.0');
				}
			}
		);

		/*
		 * 入力変更
		 */
		// 主食
		$(document).on('click','.staple.active',function(e){
			//初期化
			resetAllBtn();
			$('.popupClass').each(function(){
				if($(this).css('display') == 'block') {
					$(this).css('display','none');
					$('div').removeClass('active_popup');
			}
			});
					var x = $(this).offset().top;
					var y = $(this).offset().left;
					$(this).addClass('active_popup')
							.addClass('select_cell');
					$('#bg_popup').show();
					$('#staplePopup')
						.css('top',x - 50)
						.css('left',y + 50)
						.show();
					e.stopPropagation();
			});

		$(document).on('click','.thead .staple.active',function(e){
			//初期化
			resetAllBtn();
			var x = $(this).offset().top;
					var y = $(this).offset().left;
					var mealtime  = $(this).closest('.mealcell').attr('data-value');
					var category  = $(this).attr('data-category');
					$(this).addClass('active_popup');
					$('#bg_popup').show();
					$('#staplePopup')
						.addClass('active_all')
						.attr('data-value',mealtime)
						.attr('data-category',category)
						.css('top',x - 50)
						.css('left',y + 50)
						.show();
					e.stopPropagation();
			});

		$(document).on('click','#staplePopup li',function(e){
			if($(this).closest('div').hasClass('active_all')){
				var counter = 0;
				$('.tr').each(function(){
					if($(this).attr('data-check') == 'ON'){
						counter++;
					}
					});
				if(counter == 0){
					alert("変更対象が0件です。変更対象を選択してから変更してください。");
				}else if(confirm(counter + "件変更します。よろしいですか？")){
					var allData  = $(this).text();
					var mealtime = $(this).closest('div').attr('data-value');
					var category = $(this).closest('div').attr('data-category');

					$('.' + category).each(function(){
						if($(this).closest('.tr').attr('data-check') == 'ON' && $(this).hasClass(mealtime)){
							$(this).children('span').text(allData);
							$(this).children('input').val(allData);
						}
					});
				}
			}else{
				var selectDate = $(this).text();
				$('.active_popup').children('span').text(selectDate);
				$('.active_popup').children('input').val(selectDate);
			}
			// 初期化
			afterReset();
			$('#staplePopup').attr('data-value','').attr('data-category','').hide();
			e.stopPropagation();
		});

		//副食
		$(document).on('click','.side.active',function(e){
			// 初期化
			resetAllBtn();
			$('.popupClass').each(function(){
				if($(this).css('display') == 'block') {
					$(this).css('display','none');
					$('div').removeClass('active_popup');
			}
			});
					var x = $(this).offset().top;
					var y = $(this).offset().left;
					$(this).addClass('active_popup')
							.addClass('select_cell');
					$('#bg_popup').show();
					$('#sidePopup')
						.css('top',x - 50)
						.css('left',y + 50)
						.show();
					e.stopPropagation();

			});

		$(document).on('click','.thead .side.active',function(e){
			// 初期化
			resetAllBtn();
			var x = $(this).offset().top;
					var y = $(this).offset().left;
					var mealtime  = $(this).closest('.mealcell').attr('data-value');
					var category  = $(this).attr('data-category');
					$(this).addClass('active_popup');
					$('#bg_popup').show();
					$('#sidePopup')
						.addClass('active_all')
						.attr('data-value',mealtime)
						.attr('data-category',category)
						.css('top',x - 50)
						.css('left',y + 50)
						.show();
					e.stopPropagation();
			});

		$(document).on('click','#sidePopup li',function(e){
			if($(this).closest('div').hasClass('active_all')){
				var counter = 0;
				$('.tr').each(function(){
					if($(this).attr('data-check') == 'ON'){
						counter++;
					}
					});
				if(counter == 0){
					alert("変更対象が0件です。変更対象を選択してから変更してください。");
				}else if(confirm(counter + "件変更します。よろしいですか？")){
					var allData  = $(this).text();
					var mealtime = $(this).closest('div').attr('data-value');
					var category = $(this).closest('div').attr('data-category');

					$('.' + category).each(function(){
						if($(this).closest('.tr').attr('data-check') == 'ON' && $(this).hasClass(mealtime)){
							$(this).children('span').text(allData);
							$(this).children('input').val(allData);
						}
					});
				}
			}else{
				var selectDate = $(this).text();
				$('.active_popup').children('span').text(selectDate);
				$('.active_popup').children('input').val(selectDate);
			}
			// 初期化
			afterReset();
			$('#sidePopup').attr('data-value','').attr('data-category','').hide();
			e.stopPropagation();
		});
		//　汁物
		$(document).on('click','.sap.active',function(e){
			// 初期化
			resetAllBtn();
			$('.popupClass').each(function(){
				if($(this).css('display') == 'block') {
					$(this).css('display','none');
					$('div').removeClass('active_popup');
			}
			});
					var x = $(this).offset().top;
					var y = $(this).offset().left;
					$(this).addClass('active_popup')
							.addClass('select_cell');
					$('#bg_popup').show();
					$('#sapPopup')
						.css('top',x - 50)
						.css('left',y + 50)
						.show();
					e.stopPropagation();
			});

		$(document).on('click','.thead .sap.active',function(e){
			// 初期化
			resetAllBtn();
			var x = $(this).offset().top;
					var y = $(this).offset().left;
					var mealtime  = $(this).closest('.mealcell').attr('data-value');
					var category  = $(this).attr('data-category');
					$(this).addClass('active_popup');
					$('#bg_popup').show();
					$('#sapPopup')
						.addClass('active_all')
						.attr('data-value',mealtime)
						.attr('data-category',category)
						.css('top',x - 50)
						.css('left',y + 50)
						.show();
					e.stopPropagation();
			});

		$(document).on('click','#sapPopup li',function(e){
			if($(this).closest('div').hasClass('active_all')){
				var counter = 0;
				$('.tr').each(function(){
					if($(this).attr('data-check') == 'ON'){
						counter++;
					}
					});
				if(counter == 0){
					alert("変更対象が0件です。変更対象を選択してから変更してください。");
				}else if(confirm(counter + "件変更します。よろしいですか？")){
					var allData  = $(this).text();
					var mealtime = $(this).closest('div').attr('data-value');
					var category = $(this).closest('div').attr('data-category');

					$('.' + category).each(function(){
						if($(this).closest('.tr').attr('data-check') == 'ON' && $(this).hasClass(mealtime)){
							$(this).children('span').text(allData);
							$(this).children('input').val(allData);
						}
					});
				}
			}else{
				var selectDate = $(this).text();
				$('.active_popup').children('span').text(selectDate);
				$('.active_popup').children('input').val(selectDate);
			}
			// 初期化
			afterReset();
			$('#sapPopup').attr('data-value','').attr('data-category','').hide();
			e.stopPropagation();
		});
		// 水分
		$(document).on('click','.moisture.active',function(e){
			// 初期化
			resetAllBtn();
			$('.popupClass').each(function(){
				if($(this).css('display') == 'block') {
					$(this).css('display','none');
					$('div').removeClass('active_popup');
			}
			});
					var x = $(this).offset().top;
					var y = $(this).offset().left;
					$(this).addClass('active_popup')
								.addClass('select_cell');
					$('#bg_popup').show();
					$('#moisturePopup')
						.css('top',x - 50)
						.css('left',y + 50)
						.show();
					e.stopPropagation();
			});

		$(document).on('click','.thead .moisture.active',function(e){
			// 初期化
			resetAllBtn();
			var x = $(this).offset().top;
					var y = $(this).offset().left;
					var mealtime  = $(this).closest('.mealcell').attr('data-value');
					var category  = $(this).attr('data-category');
					$(this).addClass('active_popup');
					$('#bg_popup').show();
					$('#moisturePopup')
						.addClass('active_all')
						.attr('data-value',mealtime)
						.attr('data-category',category)
						.css('top',x - 50)
						.css('left',y + 50)
						.show();
					e.stopPropagation();
			});

		$(document).on('click','#moisturePopup li',function(e){
			if($(this).closest('div').hasClass('active_all')){
				var counter = 0;
				$('.tr').each(function(){
					if($(this).attr('data-check') == 'ON'){
						counter++;
					}
					});
				if(counter == 0){
					alert("変更対象が0件です。変更対象を選択してから変更してください。");
				}else if(confirm(counter + "件変更します。よろしいですか？")){
					var allData  = $(this).text();
					var mealtime = $(this).closest('div').attr('data-value');
					var category = $(this).closest('div').attr('data-category');

					$('.' + category).each(function(){
						if($(this).closest('.tr').attr('data-check') == 'ON' && $(this).hasClass(mealtime)){
							$(this).children('span').text(allData);
							$(this).children('input').val(allData.replace('ml',''));
						}
					});
				}
			}else{
				var selectDate = $(this).text();
				$('.active_popup').children('span').text(selectDate);
				$('.active_popup').children('input').val(selectDate.replace('ml',''));
			}
			// 初期化
			afterReset();
			$('#moisturePopup').attr('data-value','').attr('data-category','').hide();
			e.stopPropagation();
		});
		// 服薬
		$(document).on('click','.taking.active',function(e){
			// 初期化
			resetAllBtn();
			$('.popupClass').each(function(){
				if($(this).css('display') == 'block') {
					$(this).css('display','none');
					$('div').removeClass('active_popup');
			}
			});
					var x = $(this).offset().top;
					var y = $(this).offset().left;
					$(this).addClass('active_popup')
								.addClass('select_cell');
					$('#bg_popup').show();
					$('#takingPopup')
						.css('top',x - 50)
						.css('left',y + 50)
						.show();
					e.stopPropagation();
			});

		$(document).on('click','.thead .taking.active',function(e){
			// 初期化
			resetAllBtn();
			var x = $(this).offset().top;
					var y = $(this).offset().left;
					var mealtime  = $(this).closest('.mealcell').attr('data-value');
					var category  = $(this).attr('data-category');
					$(this).addClass('active_popup');
					$('#bg_popup').show();
					$('#takingPopup')
						.addClass('active_all')
						.attr('data-value',mealtime)
						.attr('data-category',category)
						.css('top',x - 50)
						.css('left',y + 50)
						.show();
					e.stopPropagation();
			});

		$(document).on('click','#takingPopup li',function(e){
			if($(this).closest('div').hasClass('active_all')){
				var counter = 0;
				$('.tr').each(function(){
					if($(this).attr('data-check') == 'ON'){
						counter++;
					}
					});
				if(counter == 0){
					alert("変更対象が0件です。変更対象を選択してから変更してください。");
				}else if(confirm(counter + "件変更します。よろしいですか？")){
					var allData  = $(this).text();
					var mealtime = $(this).closest('div').attr('data-value');
					var category = $(this).closest('div').attr('data-category');

					$('.' + category).each(function(){
						if($(this).closest('.tr').attr('data-check') == 'ON' && $(this).hasClass(mealtime)){
							$(this).children('span').text(allData);
							$(this).children('input').val(allData);
						}
					});
				}
			}else{
				var selectDate = $(this).text();
				$('.active_popup').children('span').text(selectDate);
				$('.active_popup').children('input').val(selectDate);
			}
			//初期化
			afterReset();
			$('#takingPopup').attr('data-value','').attr('data-category','').hide();
			e.stopPropagation();
		});

		/*
		 * 時間一括入力
		 */
		$(document).on('click','.thead .time.active .btn-all',function(){
			resetAllBtn();
			$(this).hide();
			if($(this).closest('div').hasClass('breakfast')){
				$('.thead .hour').val('07');
				$('.thead .min').val('00');
			}else if($(this).closest('div').hasClass('lunch')){
				$('.thead .hour').val('12');
				$('.thead .min').val('00');
			}else{
				$('.thead .hour').val('18');
				$('.thead .min').val('00');
			}
			$('.thead .time.active .form-group.allTime').show();
			$('.thead .time.active .form-group.allTime .hour').focus();
		});
		$(document).on('blur','.form-group.allTime .hour',function(){
			alert('分を入力してください。');
		});
		$(document).on('blur','.form-group.allTime .min',function(){
			var counter = 0;
			$('.tr').each(function(){
				if($(this).attr('data-check') == 'ON'){
					counter++;
				}
				});
			var checkHour = $('.form-group.allTime .hour').val();
			var checkMin = $('.form-group.allTime .min').val();
			if(checkHour == null || checkMin == null){
				alert("時間と分を入力してください");
				return;
			}
			if(counter == 0){
				alert("変更対象が0件です。変更対象を選択してから変更してください。");
				$(this).val('');
			}else if(confirm(counter + "件変更します。よろしいですか？")){
				var selectHour = $('.thead .time.active .form-group.allTime .hour').val();
				var selectMin = $('.thead .time.active .form-group.allTime .min').val();
				var mealtime  = $(this).closest('.mealcell').attr('data-value');
				$('.hour').each(function(){
					if($(this).closest('.tr').attr('data-check') == 'ON' && $(this).closest('.time').hasClass(mealtime)){
						$(this).val(selectHour);
					}
				});
				$('.min').each(function(){
					if($(this).closest('.tr').attr('data-check') == 'ON' && $(this).closest('.time').hasClass(mealtime)){
						$(this).val(selectMin);
					}
				});
			}
			$('.form-group.allTime .hour').val('');
			$('.form-group.allTime .min').val('');
			$('.form-group.allTime').hide();
			$('.active .btn-all').show();
		});


		// ポップアップのキャンセル処理
		$('#bg_popup').on('click',function(){
			$(this).hide();
			$('.popupClass').hide();
			$('div').removeClass('select_cell');
		});

		/*
		 * 担当者セレクトボックス一括変更
		 */
		$(document).on('click','.thead .rep.active .btn-all',function(){
			resetAllBtn();
			$(this).hide();
			$('.thead .rep.active .allStaff').show();
		});
		$('.allStaff').change(function(){
			var counter = 0;
			$('.tr').each(function(){
				if($(this).attr('data-check') == 'ON'){
					counter++;
				}
				});
			if(counter == 0){
				alert("変更対象が0件です。変更対象を選択してから変更してください。");
			}else if(confirm(counter + "件変更します。よろしいですか？")){
				var selectStaff = $(this).val();
				var mealtime  = $(this).closest('.mealcell').attr('data-value');
				$('.staff').each(function(){
					if($(this).closest('.tr').attr('data-check') == 'ON'  && $(this).closest('.rep').hasClass(mealtime)){
						$(this).val(selectStaff);
					}
				});
			}
			$('.allStaff').hide();
			$('.active .btn-all').show();

		});

		//　連携切り替え
		$(document).on('click','.tbody .link',function(){
			if($(this).children('i').hasClass('fa-times-circle')){
				$(this).children('i').removeClass('fa-times-circle').addClass('fa-check-circle active');
			}else if($(this).children('i').hasClass('fa-check-circle active')){
				$(this).children('i').addClass('fa-times-circle').removeClass('fa-check-circle active');
			}
		});


		/* smooth scroll */
		$('#sidemenu li a').smoothScroll();

		/* sort table */
		$('.sortColums').sortable({
			axis	: 'y',
			delay	: 1000
		}).disableSelection();

		/* scroll spy */
		$('body').scrollspy({ target: '.spy_menu' });

		/* 連携設定　表示　*/
		$('.link_office').on('change',function(){
			var checked = $('.link_office').val();
			if(checked == ''){
				$('.hiddenArea table').addClass('noactive');
				$("input[name='lunch_meal_link_type']").val(["00"]);
				$("input[name='lunch_drink_link_type']").val(["00"]);
				$("input[name='vital_link_type']").val(["00"]);
				$('.hiddenArea table :input').prop('disabled',true);

			}else{
				$('.hiddenArea table').removeClass('noactive');
				$("input[name='lunch_meal_link_type']").val(["01"]);
				$("input[name='lunch_drink_link_type']").val(["01"]);
				$("input[name='vital_link_type']").val(["01"]);
				$('.hiddenArea table :input').prop('disabled',false);
			}
		});

		/* newColum */
		$('tfoot').on('click','.newColum',function(){
			var culumNum = $(this).attr('data-culum');
			if(culumNum == 'moisture'){
				var formUnit = $(this).attr('data-unit');
				var newColum = '<tr>'
						+	'<td>'
						+	'<div class="form-group new_item"><label>'
						+	'<input type="text" name="new_name" class="form-control mr5 newcol_form" pattern="\d*"><span>'+ formUnit +'</span>'
						+	'<input type="hidden" name="order_no" value="">'
						+	'<div class="error"></div>'
						+	'</label></div>'
						+	'</td>'
						+	'<td class="deleteColum"><i class="fa fa-times"></i></td>'
						+	'</tr>';
			}else if(culumNum == 'normal'){
				var formUnit = $(this).attr('data-unit');
				var newColum = '<tr>'
						+	'<td>'
						+	'<div class="form-group  new_item"><label>'
						+	'<input type="text" name="new_name" class="form-control mr5 newcol_form"><span>'+ formUnit +'</span>'
						+	'<input type="hidden" name="order_no" value="">'
						+	'<div class="error"></div>'
						+	'</label></div>'
						+	'</td>'
						+	'<td class="deleteColum"><i class="fa fa-times"></i></td>'
						+	'</tr>';

			}else if(culumNum == 'contact'){
				var newColum = '<tr>'
							+	'<td>'
							+	'<div class="form-group  new_item"><label>'
							+	'<input type="text" name="new_contact_type" class="form-control newcol_form contact_name" placefolder="" />'
							+	'<input type="hidden" name="order_no" value="">'
							+	'<div class="error"></div>'
							+	'</label></div>'
							+	'</td>'
							+	'<td>'
							+	'<div class="form-group"><label>'
								+ 	'<select name="new_color" class="newcol_form color_select">'
									+	'<option value="primary" selected>青</option>'
									+	'<option value="yellow">黃</option>'
									+	'<option value="success">緑</option>'
									+	'<option value="warning">橙</option>'
									+	'<option value="pink">桃色</option>'
									+	'<option value="danger">赤</option>'
									+	'<option value="brown">茶</option>'
									+	'<option value="skyblue">水色</option>'
									+	'<option value="green">黄緑</option>'
									+	'<option value="purple">紫</option>'
									+	'</select>'
									+	'</label></div><!-- select -->'
									+	'</td>'
									+	'<td><a href="#setPhrasesModal" class="btn btn-primary btn-xs setPhrases" data-toggle="modal">定型文管理</a></td>'
							+	'<td class="deleteColum"><i class="fa fa-times"></i></td>'
							+	'</tr>';
			}
			$(this).closest('table').children('tbody').append(newColum);
			$('select.color_select').select2({
				formatResult: formatColor,
				formatSelection: formatColor,
				escapeMarkup: function(m){return m;}
			});
		});
		function formatColor (color) {
			if (!color.id) return color.text; // optgroup
			return "<span><img class='img-tag' src='img/" + color.id.toLowerCase() + ".png'/></span><span class='ml5'>" + color.text + '</span>';
		};

		$(document).on('click','tr td .new_item',function(){
			$(this).find('.newcol_form').focus() ;
		});

		/*
		 *  カラム削除
		 */
		$(document).on('click','.deleteColum',function(){
			$(this).closest('tr').remove();
		});

		// 連携凡例ツールチップ
		$('.thead .link').hover(
			function(){
				var x = $(this).offset().top;
						var y = $(this).offset().left;
						$('#legend').css({
							"top": x - 120,
							"left": y - 70,
							"display": "block"
						});
			},
			function(){
				$('#legend').css('display','none');
			}
		);
		$('.vital_wrap .thead .link').hover(
			function(){
				var x = $(this).offset().top;
				var y = $(this).offset().left;
				$('.vital_wrap #legend').css({
					"top": x - 120,
					"left": y - 10,
					"display": "block"
				});
			},
			function(){
				$('.vital_wrap #legend').css('display','none');
			}
		);

		/* 連絡事項　テーブル高さ調整　*/
		$('.table_contact .tbody .tr div').matchHeight();

		/* datepicker */
		var dates = $( '#datepickerFrom, #datepickerTo' ) . datepicker( {
			onSelect: function() {
								$('.datepickerBack').css({
						"position": "static",
						"top": "0",
						"left": "0",
						"width": "300px",
						"height": "260px",
						"padding-left": "18px",
						"padding-top": "20px",
						"display": "none"
					});
					$('#datepickerBody').css('display','none');
					$('#ui-datepicker-div').css('position','absolute');
						}
		});
			/* datepicker */
		var dates = $( '#datepickerFrom2, #datepickerTo2' ) . datepicker( {
			onSelect: function() {
								$('.datepickerBack').css({
						"position": "static",
						"top": "0",
						"left": "0",
						"width": "300px",
						"height": "260px",
						"padding-left": "18px",
						"padding-top": "20px",
						"display": "none"
					});
					$('#datepickerBody').css('display','none');
					$('#ui-datepicker-div').css('position','absolute');
						}
		});

		$( '.datepicker' ).datepicker('option', 'dateFormat', 'yy年 mm月 dd日');
		$( '.datepicker' ).datepicker('setDate', new Date());
		$( '.datepicker' ).datepicker({
			onSelect:function(){
				$('.datepickerBack').css({
						"position": "static",
						"top": "0",
						"left": "0",
						"width": "0",
						"height": "0",
						"padding-left": "18px",
						"padding-top": "20px",
						"display": "none"
					});
					$('#datepickerBody').css('display','none');
					$('#ui-datepicker-div').css('position','absolute');
			}
		});

		$('#contactAddForm .datepicker').datepicker('option', 'dateFormat', 'yy年 mm月 dd日');
		$('#contactAddForm .datepicker').datepicker('setDate', new Date());


		$('.table_vital_all .datepicker').datepicker('option', 'dateFormat', 'yy年 mm月 dd日');
		$('.table_vital_all .datepicker').datepicker('setDate', '--');



		/*
			* modal
			*/
		$('#contactModal').on('shown.bs.modal',function(event){
				var topScroll	= ($(document).scrollTop());
				$('.modal-open').css('position','fixed');
				$('.modal-open').css('top',-topScroll);
			});
		$('#contactModal').on('hide.bs.modal',function(event){
			var top			= $('.modal-open').css('top');
			var scroll  	=  (top.replace('-',''));
			var topScroll   =  (scroll.replace('px',''));
			$('.modal-open').css('position','');
			$('.modal-open').css('top','');

			window.scrollTo(0,topScroll);
		});
		$('#setPhrasesModal').on('shown.bs.modal',function(event){
			var topScroll	= ($(document).scrollTop());
			$('.modal-open').css('position','fixed');
			$('.modal-open').css('top',-topScroll);
		});
		$('#setPhrasesModal').on('hide.bs.modal',function(event){
			var top			= $('.modal-open').css('top');
			var scroll  	=  (top.replace('-',''));
			var topScroll   =  (scroll.replace('px',''));
			$('.modal-open').css('position','');
			$('.modal-open').css('top','');

			window.scrollTo(0,topScroll);
		});




		$('#addvitalModal').on('show.bs.modal',function(event){
			var button = $(event.relatedTarget);
			var user 	= button.data('user');
			var date 	= button.data('date');
			var time 	= button.data('time');
			var temp	= button.data('temperature');
			var hbp	= button.data('h_blood_pressure');
			var lbp	= button.data('l_blood_pressure');
			var pulse	= button.data('pulse');
			var res	= button.data('respiration');
			var oxy	= button.data('oxy');
			var staff	= button.data('staff');

/*-------- add 連携オプション 注釈　 start ----------*/
			var link		= button.data('link');
			$('.link_notice').html('');
			// 連携予定有り
			if(link == 1){
				$('#on').attr('checked',true);
				$('#off').attr('checked',false);
				$('.onBtn').addClass('active');
				$('.onBtn').removeClass('disabled');
				$('.offBtn').removeClass('active disabled');
				$('.link_notice').html('通所利用がある入居者様です。<br />カイポケタブレット(通)に同じ記録をする必要がない場合は、"連携しない"を選択して下さい。');
			}
			// 連携予定無し
			if(link == 2){
				$('#on').attr('checked',false);
				$('#off').attr('checked',true);
				$('.onBtn').removeClass('active disabled');
				$('.offBtn').addClass('active');
				$('.offBtn').removeClass('disabled');
				$('.link_notice').html('通所利用がない入居者様です。<br />カイポケタブレット(通)に同じ記録をする必要がある場合は、"連携する"を選択して下さい。');
			}
			// 連携済み
			if(link == 3){
				$('#on').attr('checked',true);
				$('#off').attr('checked',false);
				$('.onBtn').addClass('active disabled');
				$('.offBtn').removeClass('active');
				$('.offBtn').addClass('disabled');
				$('.link_notice').html('カイポケタブレット(通)に連携済の為、連携オプションは変更できません。');
			}
			// 所属なし
			if(link == 0){
				$('#on').attr('checked',false);
				$('#off').attr('checked',true);
				$('.onBtn').addClass('disabled');
				$('.onBtn').removeClass('active');
				$('.offBtn').addClass('active disabled');
				$('.link_notice').html('通所に所属していない入居者様の為、連携オプションは変更できません。');
			}
/*-------- add 連携オプション 注釈　 end ----------*/

			time = time.split(":");
			var modal = $(this);
			modal.find('.modal-title').text(user);
			modal.find('.modal-body .datepicker').val(date);
			modal.find('.modal-body .hour').val(time[0]);
			modal.find('.modal-body .min').val(time[1]);
			modal.find('.modal-body input.temperature').val(temp);
			modal.find('.modal-body input.h_blood_pressure').val(hbp);
			modal.find('.modal-body input.l_blood_pressure').val(lbp);
			modal.find('.modal-body input.pulse').val(pulse);
			modal.find('.modal-body input.respiration').val(res);
			modal.find('.modal-body input.oxy').val(oxy);
			modal.find('.modal-body .staff_modal').val(staff);
			if(link == 1){
				$('#on').attr('checked',false);
				$('#off').attr('checked',true);
				$('.onBtn').removeClass('active');
				$('.offBtn').addClass('active');
			}else{
				$('#off').attr('checked',false);
				$('#on').attr('checked',true);
				$('.offBtn').removeClass('active');
				$('.onBtn').addClass('active');
			}
		});
		$('#addvitalModal').on('shown.bs.modal',function(event){
				var topScroll	= ($(document).scrollTop());
				$('.modal-open').css('position','fixed');
				$('.modal-open').css('top',-topScroll);
			});
		$('#addvitalModal').on('hide.bs.modal',function(event){
			var top			= $('.modal-open').css('top');
			var scroll  	=  (top.replace('-',''));
			var topScroll   =  (scroll.replace('px',''));
			$('.modal-open').css('position','');
			$('.modal-open').css('top','');

			window.scrollTo(0,topScroll);
		});

		$('#addModal').on('show.bs.modal',function(event){
			var button = $(event.relatedTarget);
			var user 	= button.data('user');
			var d		= new Date();
				var hour	= d.getHours();
			var min		= d.getMinutes();
			if (hour < 10) {hour = "0" + hour;}
				if (min < 10) {min = "0" + min;}
			$('.hour').val(hour);
			$('.min').val(min);
			var modal = $(this);
				modal.find('.modal-title').text(user);
		});
		$('#addModal').on('shown.bs.modal',function(event){
			var topScroll	= ($(document).scrollTop());
			$('.modal-open').css('position','fixed');
			$('.modal-open').css('top',-topScroll);
		});
		$('#addModal').on('hide.bs.modal',function(event){
			var top			= $('.modal-open').css('top');
			var scroll  	=  (top.replace('-',''));
			var topScroll   =  (scroll.replace('px',''));
			$('.modal-open').css('position','');
			$('.modal-open').css('top','');

			window.scrollTo(0,topScroll);
		});

		$('#addUserModal').on('show.bs.modal',function(event){
			var button		= $(event.relatedTarget);
			var user		= button.data('user');
/*-------- add 連携オプション 注釈　 start ----------*/
			var link		= button.data('link');
			$('.link_notice').html('');
			// 連携予定有り
			if(link == 1){
				$('#on').attr('checked',true);
				$('#off').attr('checked',false);
				$('.onBtn').addClass('active');
				$('.onBtn').removeClass('disabled');
				$('.offBtn').removeClass('active disabled');
				$('.link_notice').html('通所利用がある入居者様です。<br />カイポケタブレット(通)に同じ記録をする必要がない場合は、"連携しない"を選択して下さい。');
			}
			// 連携予定無し
			if(link == 2){
				$('#on').attr('checked',false);
				$('#off').attr('checked',true);
				$('.onBtn').removeClass('active disabled');
				$('.offBtn').addClass('active');
				$('.offBtn').removeClass('disabled');
				$('.link_notice').html('通所利用がない入居者様です。<br />カイポケタブレット(通)に同じ記録をする必要がある場合は、"連携する"を選択して下さい。');
			}
			// 連携済み
			if(link == 3){
				$('#on').attr('checked',true);
				$('#off').attr('checked',false);
				$('.onBtn').addClass('active disabled');
				$('.offBtn').removeClass('active');
				$('.offBtn').addClass('disabled');
				$('.link_notice').html('カイポケタブレット(通)に連携済の為、連携オプションは変更できません。');
			}
			// 所属なし
			if(link == 0){
				$('#on').attr('checked',false);
				$('#off').attr('checked',true);
				$('.onBtn').addClass('disabled');
				$('.onBtn').removeClass('active');
				$('.offBtn').addClass('active disabled');
				$('.link_notice').html('通所に所属していない入居者様の為、連携オプションは変更できません。');
			}
/*-------- add 連携オプション 注釈　 end ----------*/

			var d		= new Date();
				var hour	= d.getHours();
			var min		= d.getMinutes();
			if (hour < 10) {hour = "0" + hour;}
				if (min < 10) {min = "0" + min;}
			$('.hour').val(hour);
			$('.min').val(min);
			var modal = $(this);
				modal.find('.modal-title').text(user);
		});
		$('#addUserModal').on('shown.bs.modal',function(event){
			var topScroll	= ($(document).scrollTop());
			$('.modal-open').css('position','fixed');
			$('.modal-open').css('top',-topScroll);
		});
		$('#addUserModal').on('hide.bs.modal',function(event){
			var top			= $('.modal-open').css('top');
			var scroll  	=  (top.replace('-',''));
			var topScroll   =  (scroll.replace('px',''));
			$('.modal-open').css('position','');
			$('.modal-open').css('top','');

			window.scrollTo(0,topScroll);
		});
		$('#editModal').on('show.bs.modal',function(event){
			var button = $(event.relatedTarget);
			var user 		= button.data('user');
			var contact		= button.data('contact');
			var start_date 	= button.data('start_date');
			var start_hour  = button.data('start_hour');
			var start_min   = button.data('start_min');
			var end_date 	= button.data('end_date');
			var end_hour	= button.data('end_hour');
			var end_min 	= button.data('end_min');
			var date_flg	= button.data('date_flg');
			var content		= button.data('content');
			var rep			= button.data('rep');

			var modal = $(this);
			modal.find('.modal-title').text(user);
			modal.find('.modal-body #contact_category').val(contact);
			modal.find('.modal-body #datepickerFrom').val(start_date);
			modal.find('.modal-body .startTime .hour').val(start_hour);
			modal.find('.modal-body .startTime .min').val(start_min);
			modal.find('.modal-body #datepickerTo').val(end_date);
			modal.find('.modal-body .endTime .hour').val(end_hour);
			modal.find('.modal-body .endTime .min').val(end_min);
			modal.find('.modal-body .contact_contents').val(content);
			modal.find('.modal-body .modal_rep').val(rep);
			if(date_flg == 1){
				$('#on2').attr('checked',false);
				$('#off2').attr('checked',true);
				$('#on2').removeClass('active');
				$('#off2').addClass('active');
				$('.startTime').show();
				$('.endTime').show();
			}else{
				$('#off2').attr('checked',false);
				$('#on2').attr('checked',true);
				$('#off2').removeClass('active');
				$('#on2').addClass('active');
			}
		});
		$('#editModal').on('shown.bs.modal',function(event){
			var topScroll	= ($(document).scrollTop());
			$('.modal-open').css('position','fixed');
			$('.modal-open').css('top',-topScroll);
		});
		$('#editModal').on('hide.bs.modal',function(event){
			var top			= $('.modal-open').css('top');
			var scroll  	=  (top.replace('-',''));
			var topScroll   =  (scroll.replace('px',''));
			$('.modal-open').css('position','');
			$('.modal-open').css('top','');

			window.scrollTo(0,topScroll);
		});
		/*
			* 定型文　セレクトボックス
		 */
		$('.select_template').change(function(){
			var selectTemplate = $("option:selected", this).text();
			if(selectTemplate != "定型文選択"){
				$(this).nextAll('.contact_contents').text(selectTemplate);
				$('.select_template').val("0");
			}
		});
		// 定型文　新規追加
		$(document).on('click','#registPhrases',function(){
			var newPhrasesForm =	'<div class="form-group">'
				+	'<input type="text" class="form-control" value="" placeholder="新規定型文を入力してください。">'
				+	'<div class="deletePhrases ml5">'
				+	'<a class="btn btn-danger btn-sm">削除</a>'
				+	'</div>'
				+	'</div>'
			;
			$('#phrases').append(newPhrasesForm);
		});
		// 定型文　削除
		$(document).on('click','.deletePhrases',function(){
			$(this).closest('.form-group').hide();
		});

		// 終日フラグ
		$('#allDayFlg #on').on('click',function(){
			$('.selectTime').css('display','none');
		});
		$('#allDayFlg #off').on('click',function(){
			$('.selectTime').css('display','block');
		});
		$('#allDayFlg2 #on').on('click',function(){
			$('.selectTime').css('display','none');
		});
		$('#allDayFlg2 #off').on('click',function(){
			$('.selectTime').css('display','block');
		});
		$('#allDayFlg3 #on').on('click',function(){
			$('.selectTime').css('display','none');
		});
		$('#allDayFlg3 #off').on('click',function(){
			$('.selectTime').css('display','block');
		});
		$('#allDayFlg3 #on2').on('click',function(){
			$('.selectTime').css('display','none');
		});
		$('#allDayFlg3 #off2').on('click',function(){
			$('.selectTime').css('display','block');
		});

		// バイタル一括　時間
		$(document).on('click','.recode_vital .alltime',function(){
			$(this).hide();
			var d		= new Date();
				var hour	= d.getHours();
			var min		= d.getMinutes();
			if (hour < 10) {hour = "0" + hour;}
				if (min < 10) {min = "0" + min;}
			$('.recode_vital_all .hour').val(hour);
			$('.recode_vital_all .min').val(min);
			$(this).next('.recode_vital_all').show();
			$(this).next('.recode_vital_all').children('.hour').focus();
		});
		$('.recode_vital_all .hour').on('blur',function(){
			alert('分を入力してください。');
		});
		$('.recode_vital_all .min').on('blur',function(){
			var counter = 0;
			$('.tr').each(function(){
				if($(this).attr('data-check') == 'ON'){
					counter++;
				}
				});
			if(counter == 0){
				alert("変更対象が0件です。変更対象を選択してから変更してください。");
				$(this).val('');
			}else if(confirm(counter + "件変更します。よろしいですか？")){
				var selectHour = $('.recode_vital_all .hour').val();
				var selectMin = $('.recode_vital_all .min').val();
				$('.hour').each(function(){
					if($(this).closest('.tr').attr('data-check') == 'ON'){
						$(this).val(selectHour);
					}
				});
				$('.min').each(function(){
					if($(this).closest('.tr').attr('data-check') == 'ON'){
						$(this).val(selectMin);
					}
				});
			}
			$('.recode_vital_all').hide();
			$('.recode_vital .alltime').show();
		});


		// バイタル一括　担当者
		$(document).on('click','.vital_rep .btn-all',function(){
			$('.allNumberForm').hide();
			$('.allNumberBtn').show();
			$(this).hide();
			$('.staff_vital_all').show();
		});
		$('.staff_vital_all').change(function(){
			var counter = 0;
			$('.tr').each(function(){
				if($(this).attr('data-check') == 'ON'){
					counter++;
				}
				});
			if(counter == 0){
				alert("変更対象が0件です。変更対象を選択してから変更してください。");
			}else if(confirm(counter + "件変更します。よろしいですか？")){
				var selectStaff = $(this).val();
				$('.staff_vital').each(function(){
					if($(this).closest('.tr').attr('data-check') == 'ON'){
						$(this).val(selectStaff);
					}
				});
			}
			$('.staff_vital_all').hide();
			$('.btn-all').show();
		});


		//　バイタル　ページ切り替え
		$( 'input[name="vital_link"]:radio' ).change( function() {
			var linkFlg = $( this ).attr('id');
			if(linkFlg == 'allregist'){
				location.href = 'vital_all.html';
			}else{
				location.href = 'vital.html';
			}
		});

		/* 連絡事項　スライド */
		$(document).on('click','.slide_next',function(){
			if(!$('.displaycontent').hasClass('last_contact')){
				$('ul.displaycontent').removeClass('displaycontent').next('ul').addClass('displaycontent');
				$('.slide_prev').addClass('active');
				$('.slide_next').addClass('active');
			}
			if($('.displaycontent').hasClass('last_contact')){
				$('.slide_next').removeClass('active');
			}
		});
		$(document).on('click','.slide_prev',function(){
			if(!$('.displaycontent').hasClass('first_contact')){
				$('ul.displaycontent').removeClass('displaycontent').prev('ul').addClass('displaycontent');
				$('.slide_prev').addClass('active');
				$('.slide_next').addClass('active');
			}
			if($('.displaycontent').hasClass('first_contact')){
				$('.slide_prev').removeClass('active');
			}
		});

		/* select2 */

		$('select.userSelect').select2();
		$('.select2-search__field').attr('placeholder','入居者名を入力してください。');

		/* datepicker */
		$('.ui-datepicker-trigger').on('click',function(){
			if(!$('div').hasClass('datepickerBack')){
				$('#ui-datepicker-div').wrap('<div class="datepickerBack"></div>');
			}
			var topCss 	= $(this).offset().top;
			var leftCss = $(this).offset().left;
			$('#ui-datepicker-div').css('position','static');
			$('.datepickerBack').css({
				"position": "absolute",
				"top": topCss + 30,
				"left": leftCss -100,
				"width": "300px",
				"height": "260px",
				"padding-left": "18px",
				"padding-top": "20px",
				"display": "block"
			});
			$('#datepickerBody').show();
		});

		$(document).on('click','.datepicker',function(){
			if(!$('div').hasClass('datepickerBack')){
				$('#ui-datepicker-div').wrap('<div class="datepickerBack"></div>');
			}
			var topCss 	= $(this).offset().top;
			var leftCss = $(this).offset().left;
			$('#ui-datepicker-div').css('position','static');
			$('.datepickerBack').css({
				"position": "absolute",
				"top": topCss + 30,
				"left": leftCss -60,
				"width": "300px",
				"height": "260px",
				"padding-left": "18px",
				"padding-top": "20px",
				"display": "block"
			});
			$('#datepickerBody').show();
		});

		$(document).on('click','#datepickerBody',function(){
			$('.datepickerBack').css({
				"position": "static",
				"top": "0",
				"left": "0",
				"width": "0",
				"height": "0",
				"padding-left": "18px",
				"padding-top": "20px",
				"display": "none"
			});
			$('#datepickerBody').css('display','none');
			$('#ui-datepicker-div').css('position','absolute');
		});
		$(document).on('click','.datepickerBack',function(){
			$(this).css({
				"position": "static",
				"top": "0",
				"left": "0",
				"width": "300px",
				"height": "260px",
				"padding-left": "18px",
				"padding-top": "20px",
				"display": "none"
			});
			$('#datepickerBody').css('display','none');
			$('#ui-datepicker-div').css('position','absolute');
		});
		$(document).on('touchstart','#datepickerBody',function(){
			$('.datepickerBack').css({
				"position": "static",
				"top": "0",
				"left": "0",
				"width": "300px",
				"height": "260px",
				"padding-left": "18px",
				"padding-top": "20px",
				"display": "none"
			});
			$('#datepickerBody').css('display','none');
			$('#ui-datepicker-div').css('position','absolute');
		});
		/*
		 * footer
		 */
		$("#footerDiv").height(28);
		$("#footerClick").click(function(){
			if("お問合せ" == $("#footer_arrow_name").text()){
				$("#footerDiv").animate({height:270}, 500 );
				$("#footer_arrow_name").text("閉じる");
				$("#footer_arrow")
					.attr("src","common/img/footer_arrow_btm.png")
					.css("top","-2px")
					.css("left","-25px");
			}else{
				$("#footerDiv").animate({height:28}, 500 );
				$("#footer_arrow_name").text("お問合せ");
				$("#footer_arrow")
					.attr("src","common/img/footer_arrow_top.png")
					.css("top","-1px")
					.css("left","-18px");
				}
		});
		/*
		 * 	for iPad
		 */
		var agent = navigator.userAgent;
		if(agent.search(/iPad/) == -1){
			$('.spy_menu .nav-tabs li a').addClass('ajustHover');
		}

		$.fn.modal.Constructor.prototype.enforceFocus = function () {};

		/* 食事一括ボタン リセット */
		function resetAllBtn(){
			$('div').removeClass('active_popup').removeClass('active_all');
			$('.thead .time.active .allTime').hide();
			$('.thead .rep.active .allStaff').hide();
			$('.thead .time.active .btn-all').show();
			$('.thead .rep.active .btn-all').show();
		}
		/* 食事一括ボタン 後処理 */
		function afterReset(){
			$('#bg_popup').hide();
			$('div').removeClass('active_popup').removeClass('active_all').removeClass('select_cell');
		}
		/*
		 * 　テーブル表示
		 */
		// 食事テーブル
		function displayTable(){
			$('.day_cell div').each(function(){
				if($(this).hasClass('active')){
					var setWidth = $(this).attr('data-width');
					$(this).css('width',setWidth);
					$(this).css('display','block');
				}else{
					var setWidth = $(this).attr('data-default');
					$(this).css('width',setWidth);
					if(setWidth == '0%'){
						$(this).css('display','none');
					}
				}
			});
			$('.number_cell').each(function(){
				if($(this).hasClass('active')){
					var setWidth = $(this).attr('data-width');
					$(this).css('width',setWidth);
					$(this).css('display','block');
				}else{
					var setWidth = $(this).attr('data-default');
					$(this).css('width',setWidth);
					if(setWidth == '0%'){
						$(this).css('display','none');
					}
				}
			});
			$('.number_cell div').each(function(){
				if($(this).hasClass('active')){
					var setWidth = $(this).attr('data-width');
					$(this).css('width',setWidth);
					$(this).css('display','block');
				}else{
					var setWidth = $(this).attr('data-default');
					$(this).css('width',setWidth);
					if(setWidth == '0%'){
						$(this).css('display','none');
					}
				}
			});
			$('.info_cell div').each(function(){
				var setWidth = $(this).attr('data-width');
				$(this).css('width',setWidth);
				$(this).css('display','block');
				if(setWidth == '0%'){
					$(this).css('display','none');
				}
			});
			$('.table_meal').fadeIn();
		}

		/* バイタルテーブル */
		function displayVitalTable(){
			$('.table_vital .tbody .tr div').matchHeight();
			$('.table_vital .tr div').each(function(){
				var setWidth = $(this).attr('data-width');
				$(this).css('width',setWidth);
				if(setWidth == '0%'){
					$(this).remove();
				}
			});
			$('.table_vital .tbody .tr div').matchHeight();

			$('.table_vital_all').fadeIn();
		}

		//小数点以下が桁数を返却する
		function getDecimal(num){
			var ans = null;
			var deci_keta = 0;
			if(num){
				ans = String(num).split(".")[1];
				if(ans){
					deci_keta = ans.length;
				}
			}
			return deci_keta;
		}

/* ---------- add バイタル変更 --------*/

		/* keyboard */
		/* バイタル 入力 */
		$('.numberForm').keyboard({
			lockInput: true,
			layout: 'custom',
			customLayout: {
				'default' : [
						'1 2 3',
						'4 5 6',
						'7 8 9',
						'{bksp} 0 {a}'
				]
			},
			maxLength: 3,
			restrictInput: true,
			preventPaste: true
			});
		$('.numberForm_tem').keyboard({
			lockInput: true,
			layout: 'custom',
			customLayout: {
				'default' : [
						'1 2 3',
						'4 5 6',
						'7 8 9',
						'{bksp} . 0 {a}'
				]
				},
				maxLength: 4,
				restrictInput: true,
				preventPaste: true
			});
		// 各一括　変更
		$('.keyboard_tem').click(function(){
				$(this).next('#keyboard_tem').data('keyboard').reveal();
				return false;
			});
		$('#keyboard_tem').keyboard({
			lockInput: true,
			layout: 'custom',
					customLayout: {
						'default' : [
						'1 2 3',
						'4 5 6',
						'7 8 9',
						'{bksp} . 0 {a}'
					]
				},
				maxLength : 4,
				position  : {
					of : $('.keyboard_tem'),
					my : 'center top'
			}
		});
		$('.keyboard_hb').click(function(){
				$(this).next('#keyboard_hb').data('keyboard').reveal();
				return false;
			});
		$('#keyboard_hb').keyboard({
			lockInput: true,
			layout: 'custom',
					customLayout: {
						'default' : [
					'1 2 3',
					'4 5 6',
					'7 8 9',
					'{bksp} 0 {a}'
					]
				},
				maxLength : 3,
				position  : {
					of : $('.keyboard_hb'),
					my : 'center top'
			}
		});

		$('.keyboard_lb').click(function(){
				$(this).next('#keyboard_lb').data('keyboard').reveal();
				return false;
			});
		$('#keyboard_lb').keyboard({
			lockInput: true,
			layout: 'custom',
					customLayout: {
						'default' : [
					'1 2 3',
					'4 5 6',
					'7 8 9',
					'{bksp} 0 {a}'
					]
				},
				maxLength : 3,
				position  : {
					of : $('.keyboard_lb'),
					my : 'center top'
			}
		});

		$('.keyboard_pul').click(function(){
				$(this).next('#keyboard_pul').data('keyboard').reveal();
				return false;
			});
		$('#keyboard_pul').keyboard({
			lockInput: true,
			layout: 'custom',
					customLayout: {
						'default' : [
					'1 2 3',
					'4 5 6',
					'7 8 9',
					'{bksp} 0 {a}'
					]
				},
				maxLength : 3,
				position  : {
					of : $('.keyboard_pul'),
					my : 'center top'
			}
		});

		$('.keyboard_res').click(function(){
				$(this).next('#keyboard_res').data('keyboard').reveal();
				return false;
			});
		$('#keyboard_res').keyboard({
			lockInput: true,
			layout: 'custom',
					customLayout: {
						'default' : [
					'1 2 3',
					'4 5 6',
					'7 8 9',
					'{bksp} 0 {a}'
					]
				},
				maxLength : 3,
				position  : {
					of : $('.keyboard_res'),
					my : 'center top'
			}
		});

		$('.keyboard_oxy').click(function(){
				$(this).next('#keyboard_oxy').data('keyboard').reveal();
				return false;
			});
		$('#keyboard_oxy').keyboard({
			lockInput: true,
			layout: 'custom',
					customLayout: {
						'default' : [
					'1 2 3',
					'4 5 6',
					'7 8 9',
					'{bksp} 0 {a}'
					]
				},
				maxLength : 3,
				position  : {
					of : $('.keyboard_oxy'),
					my : 'center top'
			}
		});

		$('.numberForm').change(function(){
			var selectNum = $(this).val();
				if(selectNum == ""){
					selectNum = "-";
					$(this).val(selectNum);
				}
		});

		$('.hiddenkeyboard').change(function(){
			var selectNum	= $(this).val();
			var myClass	= $(this).closest('div').attr('class');
			var errorFlg	= 0;
			if(myClass == 'temperature'){
				if(selectNum < 0 || selectNum > 99.9){
					alert('0〜99.9の数値を入力してください。');
					errorFlg = 1;
				}else if(selectNum.match(/^-?[0-9]+\.[0-9]+$/)){
					if(getDecimal(selectNum) != 1){
						alert('小数点1桁までの数値を入力してください。');
						errorFlg = 1;
					}
				}
			}else if(myClass == 'oxy'){
				if(selectNum < 0 || selectNum > 100){
					alert('0〜100の数値を入力してください。');
					errorFlg = 1;
				}else if(!selectNum.match(/^-?[0-9]+$/)){
					alert('0〜100の数値を入力してください。');
					errorFlg = 1;
				}
			}else{
				if(selectNum < 0 || selectNum > 999){
					alert('0〜999の整数を入力してください。');
					errorFlg = 1;
				}else if(!selectNum.match(/^-?[0-9]+$/)){
					alert('0〜999の整数を入力してください。');
					errorFlg = 1;
				}
			}

			if(errorFlg == 1){
				return;
			}

			var counter = 0;
			$('.tr').each(function(){
				if($(this).attr('data-check') == 'ON'){
					counter++;
				}
			});
			if(counter == 0){
				alert("変更対象が0件です。変更対象を選択してから変更してください。");
			}else if(confirm(counter + "件変更します。よろしいですか？")){
					if(selectNum == ""){
							selectNum = "-";
					}
					var changeClass  = $(this).closest('div').attr('class');
					$('.numberForm').each(function(){
						if($(this).closest('.tr').attr('data-check') == 'ON'  && $(this).closest('div').hasClass(changeClass)){
							$(this).val(selectNum);
						}
					});
			}
		});

		/*----------add iida -----------*/

		$('#scroll1').perfectScrollbar();
		$('#scroll2').perfectScrollbar();
		//excreta table
		$('.excreta_table_container .tr div').matchHeight();

		//左右のtableのscroll同期
		$('.table_excreta_left .tbody').scroll(function(){
			var leftTable = $('.table_excreta_left .tbody');
			var rightTable = $('.table_excreta_right .tbody');
			$(rightTable).scrollTop($(leftTable).scrollTop());
		});
		$('.table_excreta_right .tbody').scroll(function(){
			var leftTable = $('.table_excreta_left .tbody');
			var rightTable = $('.table_excreta_right .tbody');
			$(leftTable).scrollTop($(rightTable).scrollTop());
		});
		/*-----------------------------------------------
		* Modal
		-----------------------------------------------*/
		function excretaModalReset(){
			// console.log('modalを閉じました。');
			$('#excretaForm select').find(':selected').prop('selected',false);
			$('#selectItem').val('');
			$('.excretaInputBox, #personChargeBox').addClass('hide');
			$('#save').removeAttr('id','save');
			$('#excretaModal').modal('hide');
		}

		//modalの出し分け処理
		$('.time_cell').click(function(){
			var targetCell = $(this);
			console.log('modalの出し分け処理');
			var hours = $(this).attr('data-time');
			$(targetCell).attr('id','save');
			if($(targetCell).children('div').html() == ''){
				$('#excretaModal .hours').val(hours);
				$('#excretaModal').modal('show');//登録 modal
			} else {
				$('#excretaStatusModal .hours').val(hours);
				$('#excretaStatusModal').modal('show');//記録閲覧用 modalを立ち上げる
				if($('#addExcretaStatusBtn').click(function(){
					excretaModalReset();
					$('#excretaModal').modal('show');//登録 modal
					$(targetCell).attr('id','save');
				}));
			}
		});


		//記録一覧modalを呼び出す前の処理
		$('#excretaStatusModal').on('show.bs.modal',function (event) {
			console.log('記録一覧modalを呼び出す前に')
			var recodedMin = $('#save div').attr('data-record-min');
			var min = $('#excretaStatusModal .min');
			var voidedVol = $('#save .voidedBox').attr('data-voided-volume');
			var voidedStatus = $('#save .voidedBox').attr('data-voided-status');
			var defecationVol = $('#save .defecationBox').attr('data-defecation-volume');
			var defecationStatus = $('#save .defecationBox').attr('data-defecation-status');
			console.log(voidedVol);
			console.log(voidedStatus);
			console.log(defecationVol);
			console.log(defecationStatus);
			$(min).val(recodedMin);
			if(!$('#save .voidedBox').html() == ''){

			}
			/*
			if(!$('#save .voidedBox').html() == '' && !$('#save .defecationBox').html() == ''){
				$('.excreta_record').html('<span>排尿：' + voidedVol + ' / ' + voidedStatus + '</span><br><span>排便：' + defecationVol + ' / ' + defecationStatus + '</span><br>');
			} else if(!$('#save .defecationBox').html() == ''){
				$('.excreta_record').html('<span>排便：' + defecationVol + ' / ' + defecationStatus + '</span><br>');
			} else if(!$('#save .voidedBox, #save .defecationBox').html() == ''){
				$('.excreta_record').html('<span>排尿：' + voidedVol + ' / ' + voidedStatus + '</span><br>');
			}
			*/
		});

		//記録一覧modalを閉じた時に中身を初期化
		$('#excretaStatusModal').on('hidden.bs.modal',function (event) {
			$(this).find('.excreta_record').text('');
		});

		//編集modalから新規作成ボタンを押した時
		$('#addExcretaStatusBtn').click(function(){
			$('#excretaStatusModal').modal('hide');//記録閲覧用modal
			$('#excretaModal').modal('show');//登録 modal
		});

		//modalを閉じた時の処理
		$('#excretaModal, #excretaStatusModal').on('hidden.bs.modal',function () {
			excretaModalReset();
		});


		$('#voidedVolume').change(function(){
			if($('#voidedVolume option:selected').val() == ''){
				$('[name="voidedStatus"]').val('');
				$('#voidedStatus').attr('disabled','disabled');
			} else {
				$('#voidedStatus').removeAttr('disabled');
			}
		});

		$('#defecationVolume').change(function(){
			if($('#defecationVolume option:selected').val() == ''){
				$('[name="defecationStatus"]').val('');
				$('#defecationStatus').attr('disabled','disabled');
			} else {
				$('#defecationStatus').removeAttr('disabled');
			}
		});

		//排尿記録を画面に反映
		function recordVoidedWrite(){
			var recodeMin		 = $('#excretaModal .min').val();
			var voidedVolume 	 = $('#voidedVolume option:selected').attr('data-voided-volume');//排尿量
			var voidedStatus 	 = $('#voidedStatus option:selected').attr('data-voided-status');//排尿状態
			var person			 = $('#personInCharge option:selected').attr('data-person');// 担当者
			if($(voidedVolume) == ''){
				$('#save').append('<div class="voidedBox" data-record-min="'+ recodeMin
						+ '"data-voided-volume="' + voidedVolume
						+ '"data-voided-status="' + voidedStatus
						+ '"data-pserson="' + person
						+ '"><span>排尿：' + voidedVolume + '/'+ voidedStatus + '</span></div>'
					);
			}

		}

		//排便記録を画面に反映
		function recordDefecationWrite(){
			var recodeMin		 = $('#excretaModal .min').val();
			var defecationVolume = $('#defecationVolume option:selected').attr('defecation-volume');//排便量
			var defecationStatus = $('#defecationStatus option:selected').attr('data-defecation-status');//排便状態
			var person			 = $('#personInCharge option:selected').attr('data-person');// 担当者
			if($(defecationVolume) != ''){
				$('#save').append('<div class="defecationBox" data-record-min="' + recodeMin
						+ '"data-defecation-volume="' + defecationVolume
						+ '"data-defecation-status="' + defecationStatus
						+ '"data-pserson="' + person
						+ '"><span>排便：' + defecationVolume + '/' + defecationStatus + '</span></div>'
					);
			}

		}

		//保存ボタンを押した時の処理(仮処理)
		$('#excretaRegistBtn').click(function(){
			alert('Ajaxの処理で記録を保存します。\n処理完了後に記録内容を画面に反映します。');
			excretaModalReset();
		});

		/*
		$('#excretaRegistBtn').click(function(){
			console.log('保存するボタンを押しました');
			var recodeTime	= $('#save').attr('data-time');
			if($('#selectItem').val() == ''){
				alert('入力項目が選択されていません。\n入力項目を選択して下さい。');
				return;
			} else if($('#selectItem').val() == 'voided'){
				recordVoidedWrite();
				alert('排尿の記録が保存されました。');
			} else if($('#selectItem').val() == 'defecation'){
			 	recordDefecationWrite();
				alert('排便の記録が保存されました。');
			} else if($('#selectItem').val() == 'both'){
				recordVoidedWrite();
				recordDefecationWrite();
				alert('排尿/排便の記録が保存されました。');
			}
			excretaModalReset();
		});
		*/

		//編集ボタンを押した時の処理
		$('.excretaEditBtn').click(function(){
			alert('排泄記録を編集します。');
			$('#excretaStatusModal').modal('hide');
			$('#excretaModal').modal('show');
		});

		//削除ボタンを押した時の処理
		$('.excretaDeleteBtn').click(function(){
			if(!confirm('排泄記録を削除します。削除した項目は戻すことができません。\n よろしいですか？')){
				return false;
			}
			alert('Ajax処理で記録を削除します。処理完了後、画面に反映させます。');
			$('#excretaStatusModal').modal('hide');
		});

		/*----------add 連携オプション　注釈 -----------*/
		$(document).on('click','.onBtn',function(){
			$(this).closest('div').next('.link_notice').html('通所利用がある入居者様です。<br />カイポケタブレット(通)に同じ記録をする必要がない場合は、"連携しない"を選択して下さい。');
		});
		$(document).on('click','.offBtn',function(){
			$(this).closest('div').next('.link_notice').html('通所利用がない入居者様です。<br />カイポケタブレット(通)に同じ記録をする必要がある場合は、"連携する"を選択して下さい。');
		});

		$('#shiftCheck').click(function(){
			var status = $(this).attr('data-status');
			alert(status);
			if(status == 'active'){
				$(this).attr('data-status','');
				$('.noShift').show();
			}else{
				$(this).attr('data-status','active');
				$('.noShift').hide();
			}

		});

	});
})(jQuery);
