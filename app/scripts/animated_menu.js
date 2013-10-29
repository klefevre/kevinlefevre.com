$(document).ready(function(){

	//Fix Errors - http://www.learningjquery.com/2009/01/quick-tip-prevent-animation-queue-buildup/

	//Remove outline from links
	$("#menu a").click(function(){
		$(this).blur();
	});

	//When mouse rolls over
	$("#menu li").mouseover(function(){
		console.log("mouseover");
		$(this).stop().animate({height:'150px'},{queue:false, duration:600, easing: 'easeOutBounce'})
	});

	//When mouse is removed
	$("#menu li").mouseout(function(){
		$(this).stop().animate({height:'50px'},{queue:false, duration:600, easing: 'easeOutBounce'})
	});
});