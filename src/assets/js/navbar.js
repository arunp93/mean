$(document).ready(function(){
    $( "#toggle" ).hide("slide");
	$('#nav-icon1').click(function(){
        $(this).toggleClass('open');
        $( "#toggle" ).toggle("slide");
	});
});
