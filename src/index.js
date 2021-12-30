


if(document.readyState === "complete" || document.readyState === "interactive") {
	setTimeout(main, 1);
}else{
    document.addEventListener("DOMContentLoaded", main);
}

async function main(){
	const captchaElem = document.getElementsByClassName("fs-form-captcha-field")[0];
	const refreshBn = document.getElementsByClassName("js-refresh-captcha")[0];
	var model = null;
	Promise.all([
		load_js("https://docs.opencv.org/4.2.0/opencv.js"),
		load_js("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@2.0.0/dist/tf.min.js")
	]).then(() => {
		model = build_model();
		loadWeights(model, WEIGHTS);
		
		document.getElementsByClassName("js-captcha")[0].onload = function(){
			refreshCaptcha();
		}
		
		setTimeout(refreshCaptcha, 1000);
	});
	
	async function refreshCaptcha(){
		tf.engine().startScope();
		try{
			captchaElem.value = predict(model, document.getElementsByClassName("js-captcha")[0]);
		}catch(e){
			console.error(e);
			setTimeout(refreshCaptcha, 500);
		}
		tf.engine().endScope();
	}
}



