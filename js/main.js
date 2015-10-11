/*global document, $, console */
/*jshint globalstrict: true*/
/* enable strict mode */
"use strict";

var b = {
		lesions: {
			1: {
				data: [],
				text: ''
			}
		}
	};

$(document).ready(function() {

b.update = function() {
	b.getData();
	$('#textareaReport').html(b.lesions[1].text);
};

b.getData = function() {
	var lesionType = $('#lesionType button.active').val();

	if (lesionType === 'mass') {
		b.lesions[1].text =
			'There is a T2-' + ($('#mt2 button.active').val() || '***') +
			' ' + ($('#shape button.active').val() || '***') +
			' mass with ' + ($('#margin button.active').val() || '***') +
			' margins and ' + ($('#menht button.active').val() || '***') +
			'. The mass exhibits ' + ($('#minitial button.active').val() || '***') +
			' enhancement ' + ($('#mdelayed button.active').val() || '***') + '.';
	} else if (lesionType === 'nme') {
		b.lesions[1].text =
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
$('#lesionType button').click(function() {
	$('#div'+this.id.substr(3,5)).show('slow')
		.siblings().hide('slow');
});

// need to use .on() for dynamically added elements
$('#lesionList').on('click', 'button', function() {
	$(this).addClass('active')
		.siblings().removeClass('active');
});

// manually replicating bootstrap radio functionality to avoid race condition
$('.btn-group button').click(function() {
	$(this).addClass('active')
		.siblings().removeClass('active');
	$(this).blur();
	b.update();
});

$('#btnAddLesion').click(function() {
	$(this).blur();
	var lesionNumber = Object.keys(b.lesions).length + 1; // IE9+ only
	$('#lesionList').append(
		'<button class="btn btn-primary lesions" type="radio" id="lesion' +
		lesionNumber + '">#' + lesionNumber + '</button>'
	);
	b.lesions[lesionNumber] = {data: [], text: ''};
});

$('#btnRemLesion').click(function() {
	// remove the selected lesion's button and data
	if ($('#lesionList button.active').length > 0) {
		b.lesions[$('#lesionList button.active').attr('id').substring(6)] = undefined;
		$('#lesionList button.active').remove();
	}
	// re-order lesionList buttons and data object
	for (var i = 0; i < Object.keys(b.lesions).length; i++) {
		if (!b.lesions[i+1]) {
			// shift element
			b.lesions[i+1] = b.lesions[i+2];
			delete b.lesions[i+2];

			// shift button text and id
			$('#lesion'+(i+2)).text('#'+(i+1));
			$('#lesion'+(i+2)).attr('id','lesion'+(i+1));

			return;
		}
	}
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
