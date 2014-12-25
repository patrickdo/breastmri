/*global document, $, console */
/*jshint globalstrict: true*/
/* enable strict mode */
"use strict";

var b = {
	lesions: ['focus', 'mass', 'nme']
};

$(document).ready(function() {







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

});
