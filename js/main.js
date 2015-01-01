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
			' margins and ' + ($('#menht button.active').val() || '***') +
			'.';
	} else if (lesionType === 'nme') {
		b.lesions[0].text =
			'There is non-mass enhancement in ' + ($('#dist button.active').val() || '***') +
			' that appears ' + ($('#t2 button.active').val() || '***') +
			' on T2-weighted images, with ' + ($('#nenht button.active').val() || '***') +
			' internal enhancement and exhibiting ' + ($('#initial button.active').val() || '***') +
			' initial phase and ' + ($('#delayed button.active').val() || '***') +
			' delayed phase kinetics.';
	} else {
		return '';
	}
};




$('#btnMass').click(function() {
	$('#divFocus').hide('slow');
	$('#divMass').show('slow');
	$('#divNME').hide('slow');
});

$('#btnFocus').click(function() {
	$('#divFocus').show('slow');
	$('#divMass').hide('slow');
	$('#divNME').hide('slow');
});

$('#btnNME').click(function() {
	$('#divFocus').hide('slow');
	$('#divMass').hide('slow');
	$('#divNME').show('slow');
});

// manually replicating bootstrap functionality to avoid race condition
$('button').click(function() {
	$(this).addClass('active').siblings().removeClass('active');
	$(this).blur();
	b.update();
});



}); // END OF DOCUMENT.READY
