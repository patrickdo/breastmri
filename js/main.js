/*global document, $, console */
/*jshint globalstrict: true*/
/* enable strict mode */
"use strict";

var b = {
		lesions: {
			1: {
				size: '',
				loc: '',
				type: '',
				values: [],
				text: ''
			}
		}
	},
	hints = {};

$(document).ready(function() {

b.generateText = function() {
	var i, j, report = '', numLesions;

	// CYCLE through lesions
	numLesions = Object.keys(b.lesions).length;
	for (i = 0; i < numLesions; i++) {
		//---MASS---
		if (b.lesions[i+1].type === 'Mass') {
		// if (b.lesions[i+1].type === 'btnMass' && b.lesions[i+1].values.length > 0) {
			var mT2='', mShape='', mMargin='', mIE='', mKI='', mKD='';

			// find T2
			for (j = 0; j < 3; j++) {
				if (b.lesions[i+1].values.indexOf(j) > -1) {
					mT2 = $('#mt2 button')[j].value;
				}
			}

			// find shape
			for (j = 0; j < 3; j++) {
				if (b.lesions[i+1].values.indexOf(j+3) > -1) {
					mShape = $('#shape button')[j].value;
				}
			}

			/// find margins
			for (j = 0; j < 3; j++) {
				if (b.lesions[i+1].values.indexOf(j+6) > -1) {
					mMargin = $('#margin button')[j].value;
				}
			}

			/// find internal enhancement
			for (j = 0; j < 4; j++) {
				if (b.lesions[i+1].values.indexOf(j+9) > -1) {
					mIE = $('#menht button')[j].value;
				}
			}

			/// find kinetics-initial
			for (j = 0; j < 3; j++) {
				if (b.lesions[i+1].values.indexOf(j+13) > -1) {
					mKI = $('#minitial button')[j].value;
				}
			}

			/// find kinetics-delayed
			for (j = 0; j < 3; j++) {
				if (b.lesions[i+1].values.indexOf(j+16) > -1) {
					mKD = $('#mdelayed button')[j].value;
				}
			}

			b.lesions[i+1].text =
				'There is a ' +
				(mT2 ? 'T2 ' + mT2 + ' ' : '') +
				(mShape + ' ' || '') +
				'mass' +
				((mMargin === '' && mIE === '') ? '' : ' with ') +
				((mMargin !== '' && mIE !== '') ? mMargin + ' and ' + mIE : (mMargin || '') + (mIE || '')) +
				'. ' +
				(
					(mKI === '' && mKD === '') ? '' : 'The mass exhibits ' +
					(mKI + ' ' || '') +
					'enhancement' +
					(' ' + mKD || '') +
					'.'
				);


		// ---NME---
		} else if (b.lesions[i+1].type === 'NME') {
		// } else if (b.lesions[i+1].type === 'btnNME' && b.lesions[i+1].values.length > 0) {
			var nT2='', nDist='', nIE='', nKI='', nKD='';

			// find T2
			for (j = 0; j < 3; j++) {
				if (b.lesions[i+1].values.indexOf(j) > -1) {
					nT2 = $('#nt2 button')[j].value;
				}
			}

			// find distribution
			for (j = 0; j < 6; j++) {
				if (b.lesions[i+1].values.indexOf(j+3) > -1) {
					nDist = $('#dist button')[j].value;
				}
			}

			/// find internal enhancement
			for (j = 0; j < 4; j++) {
				if (b.lesions[i+1].values.indexOf(j+9) > -1) {
					nIE = $('#nenht button')[j].value;
				}
			}

			/// find kinetics-initial
			for (j = 0; j < 3; j++) {
				if (b.lesions[i+1].values.indexOf(j+13) > -1) {
					nKI = $('#ninitial button')[j].value;
				}
			}

			/// find kinetics-initial
			for (j = 0; j < 3; j++) {
				if (b.lesions[i+1].values.indexOf(j+16) > -1) {
					nKD = $('#ndelayed button')[j].value;
				}
			}

			b.lesions[i+1].text =
				'There is ' + (nDist || '***') + ' non-mass enhancement  that appears ' +
				(nT2 || '***') + ' on T2-weighted images, with ' +
				(nIE || '***') + ' enhancement and exhibiting ' + (nKI || '***') +
				' initial phase and ' + (nKD || '***') + ' delayed phase kinetics.';

			b.lesions[i+1].text = b.lesions[i+1].text
				.replace(/is multiple/,'are multiple');

		} else {
			// return;
		}

		if (b.lesions[i+1].loc !== '') {
			b.lesions[i+1].text = b.lesions[i+1].text
				.replace(/(mass( enhancement)?)/, '$1 in the ' + b.lesions[i+1].loc);
		}

		if (b.lesions[i+1].size !== '') {
			b.lesions[i+1].text = b.lesions[i+1].text
				.replace(/(mass( enhancement)?)/, '$1 measuring ' + b.lesions[i+1].size);
		}

		report += (i+1) + ': ' + b.lesions[i+1].text + '<br>';
	} // END CYCLE

	for (i = 0; i < numLesions; i++) {
		// report += (i+1) + ': ' + b.lesions[i+1].text + '<br>';
	}

	$('#textareaReport').html(report);
};

b.clearButtons = function() {
	$('#lesionSection button, #lesionType button').removeClass('active');
	$('#divSizeLoc input').val('');
};

b.loadData = function() {
	b.clearButtons();
	var lesionNumber = $('#lesionList button.active').attr('id').substring(6);

	// show/hide lesionType button and corresponding set of descriptors
	if (b.lesions[lesionNumber].type !== '') {
		$('#btn' + b.lesions[lesionNumber].type).addClass('active').siblings().removeClass('active');
		$('#div' + b.lesions[lesionNumber].type).show().siblings().hide();
		// put lesion number before Mass/NME
		$('#lesionSection > div:visible legend span').text('Lesion ' + lesionNumber + ': ');
	} else {	// if there is no b.lesion.type saved, unselect lesionType button and hide corresponding set of descriptors
		$('#lesionType button').removeClass('active');
		$('#lesionSection > div').hide('slow');
	}

	// load size/loc
	if (b.lesions[lesionNumber].size !== '') {
		$('#inputSize').val(b.lesions[lesionNumber].size);
	}
	if (b.lesions[lesionNumber].loc !== '') {
		$('#inputLoc').val(b.lesions[lesionNumber].loc);
	}

	// cycle through each descriptor in the set and select the button if it matches the saved b.lesion.values
	$('#lesionSection div:visible button').each(function(index) {
		if (b.lesions[lesionNumber].values.indexOf(index) > -1) {
			$(this).addClass('active').siblings().removeClass('active');
		}
	});
};

b.saveData = function() {
	var lesionNumber = $('#lesionList button.active').attr('id').substring(6);

	// store lesion size/loc
	b.lesions[lesionNumber].size = $('#inputSize').val();
	b.lesions[lesionNumber].loc = $('#inputLoc').val();

	// store lesion type
	b.lesions[lesionNumber].type = $('#lesionType button.active').val();

	// store descriptor buttons
	b.lesions[lesionNumber].values = [];
	$('#lesionSection div:visible button').each(function(index) {
		if ($(this).hasClass('active')) {
			b.lesions[lesionNumber].values.push(index);
		}
	});
};

// on clicking a lesion button. need to use .on() for dynamically added elements
$('#lesionList').on('click', 'button', function() {
	$(this).addClass('active')
		.siblings().removeClass('active');
	$(this).blur();
	b.loadData();
	b.generateText();
});

// add lesion
$('#btnAddLesion').click(function() {
	$(this).blur();
	var lesionNumber = Object.keys(b.lesions).length + 1; // IE9+ only

	b.clearButtons();
	$('#lesionSection > div').hide('slow');

	// add object data
	b.lesions[lesionNumber] = {size: '', loc: '', type: '', values: [], text: ''};

	// add button
	$('#lesionList').append(
		'<button class="btn btn-default lesions" type="radio" id="lesion' +
		lesionNumber + '">#' + lesionNumber + '</button>'
	);

	// select the newly added button
	$('#lesionList button').last().addClass('active').siblings().removeClass('active');

	b.generateText();
});

// remove lesion
$('#btnRemLesion').click(function() {
	// remove the selected lesion's button and data
	if ($('#lesionList button').length > 1) {	// do not remove the only remaining lesion
		if ($('#lesionList button.active').length > 0) {
			delete b.lesions[$('#lesionList button.active').attr('id').substring(6)];
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
			}
		}
		$('#lesionList button').first().addClass('active').siblings().removeClass('active');
		b.loadData();
		b.generateText();
	} else {
		return;
	}
});

// on clicking a descriptor button
$('.btn-group button').click(function() {
	// manually replicating bootstrap radio functionality to avoid race condition
	$(this).addClass('active')
		.siblings().removeClass('active');
	$(this).blur();
	if ((this.id === 'btnMass') || (this.id === 'btnNME')) {
		$('#div'+this.id.substr(3,5)).show().siblings().hide();
		$('#nt2 button,#dist button').removeClass('active');
	}
	b.saveData();
	b.loadData();
	b.generateText();
});

// Select All
$('#btnSelectAll').click(function() {
	document.getElementById('textareaReport').focus();
	document.execCommand('SelectAll');
});

// Reset [?] fix for multiple lesions
$('#btnReset').click(function() {
	$('button').removeClass('active');
	$('#lesionSection > div').hide('slow');
});

// auto-update size/loc
$('body').on('keyup', 'input', function() {
	b.saveData();
	b.generateText();
});

// initialize hints
b.initHints = function () {
	$('#lesionSection div button').each(function(i) {
		// initialize popover for each button
		$(this).popover({
			container: 'body',
			placement: 'top',
			html: true,
			trigger: 'manual'
		});

		var	thisBtn = this,	// saving the element because 'this' will point to 'cases' in the lookup table
			po = $(this).data('bs.popover').options;

		// lookup table
		var cases = {
			'Round': function() {
				po.title = 'Shape: <b>Round</b>';
				po.content = 'Spherical, ball-shaped, circular, or globular';
			},
			'Oval': function() {
				po.title = 'Shape: <b>Oval</b>';
				po.content = 'Elliptical or egg-shaped (may include 2 or 3 undulations, i.e. "gently lobulated" or "macrolobulated")';
			},
			'Irregular': function() {
				if (thisBtn.closest('div').id === "shape") {
					po.title = 'Shape: <b>Irregular</b>';
					po.content = 'Neither round nor oval<br><img src="img/irregshape.jpg">';
				} else if (thisBtn.closest('div').id === "margin") {
					po.title = 'Margin: <b>Irregular</b>';
					po.content = 'Uneven margin can be round or jagged (not smooth or spiculated)';
				}
			},
			'Circumscribed': function() {
				po.title = 'Margin: <b>Circumscribed</b>';
				po.content = 'A margin that is well defined or sharp, with an abrupt transition between the lesion and surrounding tissue';
			},
			'Spiculated': function() {
				po.title = 'Margin: <b>Spiculated</b>';
				po.content = 'Margin is formed or characterized by sharp lines projecting from the mass<br><img src="img/spiculated.jpg" align="center">';
			},
			'Segmental': function() {
				po.title = 'Distribution: <b>Segmental</b>';
				po.content = '<img src="img/segmental.jpg">';
			},
			'Diffuse': function() {
				po.title = 'Distribution: <b>Diffuse</b>';
				po.content = '<img src="img/diffuse.jpg">';
			},
			'Homogeneous': function() {
				po.title = 'Internal Enhancement:<br><b>Homogeneous</b>';
				po.content = 'Confluent uniform enhancement';
			},
			'Heterogeneous': function() {
				po.title = 'Internal Enhancement:<br><b>Heterogeneous</b>';
				po.content = 'Nonuniform enhancement in a random pattern';
			},
			'Rim enhancement': function() {
				po.title = 'Internal Enhancement:<br><b>Rim enhancement</b>';
				po.content = 'Enhancement more pronounced at the periphery of mass';
			},
			'Dark internal septations': function() {
				po.title = 'Internal Enhancement:<br><b>Dark internal septations</b>';
				po.content = 'Dark nonenhancing lines within a mass';
			}
		};

		// run through lookup table
		if (cases[this.innerHTML]) {
			cases[this.innerHTML]();
		}

	});
};

// show popovers on hover
$('#lesionSection div button').hover(function() {
	if ($('#cbHints').is(':checked')) {
		$(this).popover('show');
	} else {
		return;
	}
}, function() {
	$(this).popover('hide');
});

b.initHints();
b.generateText();

}); // END OF DOCUMENT.READY
