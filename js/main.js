/*global document, $, console */
/*jshint globalstrict: true*/
/* enable strict mode */
"use strict";

var b = {
		lesions: {}
	};

b.lesions[1] = {
	size: ['', '', ''],
	loc: '',
	type: '',
	side: '',
	values: [],
	text: ''
};

$(document).ready(function() {

b.generateText = function() {
	var i, j, report = '', numLesions, tempSizes = [];
	var mT2='', mShape='', mMargin='', mIE='', mKI='', mKD='';
	var nT2='', nDist='', nIE='', nKI='', nKD='';

	// CYCLE through lesions
	numLesions = Object.keys(b.lesions).length;
	for (i = 0; i < numLesions; i++) {
		//---MASS---
		if (b.lesions[i+1].type === 'Mass') {
		// if (b.lesions[i+1].type === 'btnMass' && b.lesions[i+1].values.length > 0) {
			mT2 = mShape = mMargin = mIE = mKI = mKD='';

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
					(mKI === '' && mKD === '') ? '' : 'This mass exhibits ' +
					(mKI + ' ' || '') +
					'enhancement' +
					(' ' + mKD || '') +
					'.'
				);


		// ---NME---
		} else if (b.lesions[i+1].type === 'NME') {
		// } else if (b.lesions[i+1].type === 'btnNME' && b.lesions[i+1].values.length > 0) {
			nT2 = nDist = nIE = nKI = nKD='';

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
				'There is ' +
				(nDist + ' ' || '') +
				(nT2 ? 'T2 ' + nT2 + ' ' : '') +
				(nIE + ' ' || '') +
				'non-mass enhancement. ' +
				(
					(nKI === '' && nKD === '') ? '' : 'This non-mass enhancement exhibits ' +
					(nKI + ' ' || '') +
					'enhancement' +
					(' ' + nKD || '') +
					'.'
				);

			b.lesions[i+1].text = b.lesions[i+1].text
				.replace(/is multiple/,'are multiple');

		} else {
			// return;
		}


		// after mass/nme text has been generated
		var tempSzSdLoc = '';

		// add size
		if (b.lesions[i+1].size.toString() !== ',,') {
			tempSizes = [];

			for (j = 0; j < 3; j++) {
				if (b.lesions[i+1].size[j] !== '') {
					tempSizes.push(b.lesions[i+1].size[j]);
				}
			}
			tempSzSdLoc += ' measuring ' + tempSizes.join(' x ') + ' cm';
		}

		// add side/loc
		if (b.lesions[i+1].side !== '' || b.lesions[i+1].loc !== '') {
			tempSzSdLoc += ' in the';
		}
		if (b.lesions[i+1].side !== '') {
			tempSzSdLoc += ' ' + b.lesions[i+1].side + ' breast';
		}
		if (b.lesions[i+1].loc !== '') {
			tempSzSdLoc += ' ' + b.lesions[i+1].loc + ' o\'clock position';
		}

		b.lesions[i+1].text = b.lesions[i+1].text
			.replace(/(mass( enhancement)?)/, '$1' + tempSzSdLoc);

		// add lesion number, e.g. L1, R2
		if (b.lesions[i+1].side !== '') {
			report += ((b.lesions[i+1].side === 'left') ? 'L' : 'R');
		}
		report += (i+1) + '. ' + b.lesions[i+1].text + '<br>';

	} // END CYCLE

	$('#textareaReport').html(report);
};

b.clearButtons = function() {
	$('#lesionSection button, #lesionType button, #lesionSide button').removeClass('active');
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

	// load side/size/loc
	$('#lesionSide button').each(function() {
		if (this.value === b.lesions[lesionNumber].side) {
			$(this).addClass('active').siblings().removeClass('active');
		}
	});
	if (b.lesions[lesionNumber].size !== '') {
		$('#inputSize0').val(b.lesions[lesionNumber].size[0]);
		$('#inputSize1').val(b.lesions[lesionNumber].size[1]);
		$('#inputSize2').val(b.lesions[lesionNumber].size[2]);
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
	b.lesions[lesionNumber].size[0] = $('#inputSize0').val();
	b.lesions[lesionNumber].size[1] = $('#inputSize1').val();
	b.lesions[lesionNumber].size[2] = $('#inputSize2').val();
	b.lesions[lesionNumber].loc = $('#inputLoc').val();

	// store lesion type
	b.lesions[lesionNumber].type = $('#lesionType button.active').val();

	// store lesion side
	b.lesions[lesionNumber].side = $('#lesionSide button.active').val() || '';

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
	b.lesions[lesionNumber] = {size: ['','',''], side: '', loc: '', type: '', values: [], text: ''};

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
	} else {	// if there is only one lesion
		b.clearButtons();
		b.lesions[1].type = b.lesions[1].loc = b.lesions[1].text = '';
		b.lesions[1].size = ['','',''];
		b.lesions[1].values = [];
		b.generateText();
	}
});

// on clicking a descriptor button
$('.btn-group button').click(function() {
	// manually replicating bootstrap radio functionality to avoid race condition

	if ($(this).hasClass('active')) {
		$(this).removeClass('active');
	} else {
		$(this).addClass('active')
			.siblings().removeClass('active');
	}

	$(this).blur();

	if ((this.id === 'btnMass') || (this.id === 'btnNME')) {
		$(this).addClass('active');	// re-adding, because class 'active' is removed if it was already present
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
	$('#lesionSection div button').each(function() {
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
				po.content = 'Spherical, ball-shaped, circular, or globular.';
			},
			'Oval': function() {
				po.title = 'Shape: <b>Oval</b> (includes lobulated)';
				po.content = 'Elliptical or egg-shaped (may include 2 or 3 undulations, i.e. "gently lobulated" or "macrolobulated").';
			},
			'Irregular': function() {
				if (thisBtn.closest('div').id === "shape") {
					po.title = 'Shape: <b>Irregular</b>';
					po.content = 'Neither round nor oval.<br><i>For MRI, use of this descriptor usually implies a suspicious finding.</i><br><img src="img/irregshape.jpg">';
				} else if (thisBtn.closest('div').id === "margin") {
					po.title = 'Margin: <b>Irregular</b>';
					po.content = 'Edges that are either uneven or jagged but not spiculated.<br><i>Use of this descriptor implies a suspicious finding.</i>';
				}
			},
			'Circumscribed': function() {
				po.title = 'Margin: <b>Circumscribed</b> (smooth)';
				po.content = 'Sharply demarcated with an abrupt transition between the lesion and the surrounding tissue. For MRI, the entire margin must be well defined. A mass for which any portion of the margin is not circumscribed should be clarified on the basis of the more suspicious finding.';
			},
			'Spiculated': function() {
				po.title = 'Margin: <b>Spiculated</b>';
				po.content = 'Characterized by lines radiating from the mass.<br><i>Use of this descriptor implies a suspicious finding.</i><br><img src="img/spiculated.jpg" align="center">';
			},
			'Focal': function() {
				po.title = 'Distribution:<br><b>Focal</b>';
				po.content = 'Enhancement in a confined area. Part of the definition of focal is that it occupies less than a breast quadrant volume and has fat or normal glandular tissue interspersed between the abnormally enhancing components (exception: focal homogeneous enhancement).';
			},
			'Linear': function() {
				po.title = 'Distribution:<br><b>Linear</b>';
				po.content = 'Enhancement arrayed in a line (not necessarily a straight line) or a line that branches.<br><i>This distribution may elevate suspicion for malignancy because it suggests enhancement within or around a duct.</i>';
			},
			'Segmental': function() {
				po.title = 'Distribution:<br><b>Segmental</b>';
				po.content = 'Enhancement that is triangular or cone shaped with the apex at the nipple.<br><i>Segmental distribution is of concern because it suggests enhancement within or around a duct or ducts and their branches, raising the possibility of extensive or multifocal breast cancer in a lobe or segment of the breast.</i><br><img src="img/segmental.jpg">';
			},
			'Regional': function() {
				po.title = 'Distribution:<br><b>Regional</b>';
				po.content = 'Enhancement that encompasses more than a single duct system. This descriptor is used for enhancement that occupies a large portion of breast tissue, at least a quadrant.';
			},
			'Multiple regions': function() {
				po.title = 'Distribution:<br><b>Multiple regions</b>';
				po.content = 'Enhancement in at least two large volumes of tissue, not conforming to a ductal distribution and separated by normal tissue; it involves many areas of geographic enhancement and is patchy in appearance.';
			},
			'Diffuse': function() {
				po.title = 'Distribution:<br><b>Diffuse</b>';
				po.content = 'Enhancement distributed randomly throughout the breast.<br><img src="img/diffuse.jpg">';
			},
			'Homogeneous': function() {
				po.title = 'Internal Enhancement:<br><b>Homogeneous</b>';
				po.content = 'Confluent, uniform enhancement.';
			},
			'Heterogeneous': function() {
				if (thisBtn.closest('div').id === "menht") {
					po.title = 'Internal Enhancement:<br><b>Heterogeneous</b>';
					po.content = 'Nonuniform enhancement with variable signal intensity.';
				} else if (thisBtn.closest('div').id === "nenht") {
					po.title = 'Internal Enhancement:<br><b>Heterogeneous</b>';
					po.content = 'Nonuniform enhancement in a random pattern, separated by areas of normal breast parenchyma or fat.';
				}
			},
			'Rim enhancement': function() {
				po.title = 'Internal Enhancement:<br><b>Rim enhancement</b>';
				po.content = 'Enhancement is more pronounced at the periphery of mass.';
			},
			'Dark internal septations': function() {
				po.title = 'Internal Enhancement:<br><b>Dark internal septations</b>';
				po.content = 'Dark, non-enhancing lines within a mass.<br><i>Non-enhancing dark internal septations are suggestive of fibroadenomas, if the other morphologic and kinetic characteristics support benignity.</i>';
			},
			'Clumped': function() {
				po.title = 'Internal Enhancement:<br><b>Clumped</b>';
				po.content = 'Cobblestone enhancement of varying shapes and sizes with occasional confluent areas; this pattern may look like grapes if in a focal area, or it may look beaded or like a string of pearls if in a line.<br><i>Use of this descriptor implies suspicion and the need for tissue sampling.</i>';
			},
			'Clustered ring': function() {
				po.title = 'Internal Enhancement:<br><b>Clustered ring</b>';
				po.content = 'Thin rings of enhancement clustered together around the ducts. Enhancement in the periductal stroma, best seen on high-resolution images, implies a suspicious finding.';
			},

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
