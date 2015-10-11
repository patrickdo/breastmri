/*global document, $, console */
/*jshint globalstrict: true*/
/* enable strict mode */
"use strict";

var b = {
		lesions: {
			0: {
				data: [],
				text: ''
			}
		}
	};

$(document).ready(function() {

b.update = function() {
	b.getData();
	$('#textareaReport').html(b.lesions[0].text);
};

b.getData = function() {
	var lesionType = $('#lesion button.active').val();

	if (lesionType === 'focus') {
		//
	} else if (lesionType === 'mass') {
		b.lesions[0].text =
			'There is a T2-' + ($('#mt2 button.active').val() || '***') +
			' ' + ($('#shape button.active').val() || '***') +
			' mass with ' + ($('#margin button.active').val() || '***') +
			' margins and ' + ($('#menht button.active').val() || '***') +
			'. The mass exhibits ' + ($('#minitial button.active').val() || '***') +
			' enhancement ' + ($('#mdelayed button.active').val() || '***') + '.';
	} else if (lesionType === 'nme') {
		b.lesions[0].text =
			'There is non-mass enhancement in ' + ($('#dist button.active').val() || '***') +
			' that appears ' + ($('#nt2 button.active').val() || '***') +
			' on T2-weighted images, with ' + ($('#nenht button.active').val() || '***') +
			' enhancement and exhibiting ' + ($('#ninitial button.active').val() || '***') +
			' initial phase and ' + ($('#ndelayed button.active').val() || '***') +
			' delayed phase kinetics.';
	} else {
		return '';
	}
};

// show/hide buttons for each type of pathology
$('#lesion button').click(function() {
	$('#div'+this.id.substr(3,5)).show('slow')
		.siblings().hide('slow');
});

// manually replicating bootstrap radio functionality to avoid race condition
$('button').click(function() {
	$(this).addClass('active')
		.siblings().removeClass('active');
	$(this).blur();
	b.update();
});

$('#btnSelectAll').click(function() {
	document.getElementById('textareaReport').focus();
	document.execCommand('SelectAll');
});

$('#btnReset').click(function() {
	$('button').removeClass('active');
	b.lesions[0].text = '';
	b.update();
	$('#lesionSection > div').hide('slow');
});


// hover over first row labels to display reference image
$(".hover").hover(
	//hover() fn 1 = onmouseover
	function(e) {
		var imageFilenames =
			{
				"a segmental distribution":				"segmental",
				"diffusely":							"diffuse",
				"spiculated":							"spiculated",
				"irregular":							"irregshape",
				"Central disc protrusion":				"cdp",
				"Left central disc protrusion":			"lcdp",
				"Left subarticular disc protrusion":	"lsadp",
				"Left foraminal disc protrusion":		"lfdp"
			};

		$("body").append(
			"<p id='hoverImage'><img src='img/" +
			imageFilenames[this.value] +
			".jpg'/></p>");
		$("#hoverImage")
			.css("position", "absolute")
			.css("top", (e.pageY - 15) + "px")
			.css("left", (e.pageX - 50) + "px")
			.css("transform", "scale(0.75)")
			.fadeIn("fast");
	},
	// hover() fn 2 = onmouseout
	function() {
		$("#hoverImage").remove();
	});

// reference images follow mouse cursor
$(".hover").mousemove(function (e) {
	$("#hoverImage")
		.css("top", (e.pageY - 15) + "px")
		.css("left", (e.pageX - 20) + "px");
});



}); // END OF DOCUMENT.READY
