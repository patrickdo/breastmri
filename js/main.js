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
			'There is ' + ($('#shape button.active').val() || '***') +
			' mass with ' + ($('#margin button.active').val() || '***') +
			' margins. This mass is ' + ($('#mt2 button.active').val() || '***') +
			' on T2-weighted images, with ' + ($('#menht button.active').val() || '***') +
			' and exhibiting ' + ($('#minitial button.active').val() || '***') +
			' initial phase and ' + ($('#mdelayed button.active').val() || '***') +
			' delayed phase kinetics.';
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



}); // END OF DOCUMENT.READY
