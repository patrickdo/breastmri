/*global document, $, console */
/*jshint globalstrict: true*/
/* enable strict mode */
"use strict";

var b = {
		lesions: {
			1: {
				type: '',
				values: [],
				text: ''
			}
		}
	};

$(document).ready(function() {

b.generateText = function() {
	var i, j, report = '', numLesions;

	// CYCLE through lesions
	numLesions = Object.keys(b.lesions).length;
	for (i = 0; i < numLesions; i++) {
		//---MASS---
		if (b.lesions[i+1].type === 'btnMass' && b.lesions[i+1].values.length > 0) {
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
				'There is a T2 ' + (mT2 || '***') + ' ' + (mShape || '***') +
				' mass with ' + (mMargin || '***') + ' margins and ' +
				(mIE || '***') + ' . The mass exhibits ' + (mKI || '***') +
				' enhancement ' + (mKD || '***') + '.';
		// ---NME---
		} else if (b.lesions[i+1].type === 'btnNME' && b.lesions[i+1].values.length > 0) {
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
				'There is non-mass enhancement in ' + (nDist || '***') +
				' that appears ' + (nT2 || '***') + ' on T2-weighted images, with ' +
				(nIE || '***') + ' enhancement and exhibiting ' + (nKI || '***') +
				' initial phase and ' + (nKD || '***') + ' delayed phase kinetics.';

		} else {
			// return;
		}
		report += (i+1) + ': ' + b.lesions[i+1].text + '<br>';
	} // END CYCLE

	for (i = 0; i < numLesions; i++) {
		// report += (i+1) + ': ' + b.lesions[i+1].text + '<br>';
	}

	$('#textareaReport').html(report);

	// var lesionType = $('#lesionType button.active').val();

	// if (lesionType === 'mass') {
	// 	b.lesions[1].text =
	// 		'There is a T2-' + ($('#mt2 button.active').val() || '***') +
	// 		' ' + ($('#shape button.active').val() || '***') +
	// 		' mass with ' + ($('#margin button.active').val() || '***') +
	// 		' margins and ' + ($('#menht button.active').val() || '***') +
	// 		'. The mass exhibits ' + ($('#minitial button.active').val() || '***') +
	// 		' enhancement ' + ($('#mdelayed button.active').val() || '***') + '.';
	// } else if (lesionType === 'nme') {
	// 	b.lesions[1].text =
	// 		'There is non-mass enhancement in ' + ($('#dist button.active').val() || '***') +
	// 		' that appears ' + ($('#nt2 button.active').val() || '***') +
	// 		' on T2-weighted images, with ' + ($('#nenht button.active').val() || '***') +
	// 		' enhancement and exhibiting ' + ($('#ninitial button.active').val() || '***') +
	// 		' initial phase and ' + ($('#ndelayed button.active').val() || '***') +
	// 		' delayed phase kinetics.';
	// } else {
	// 	return '';
	// }
	// $('#textareaReport').html(b.lesions[1].text);
};

b.clearButtons = function() {
	$('.panel button').removeClass('active');
};

b.loadData = function() {
	b.clearButtons();
	var lesionNumber = $('#lesionList button.active').attr('id').substring(6);

	$('#' + b.lesions[lesionNumber].type).addClass('active').siblings().removeClass('active');
	$('#lesionSection div:visible button').each(function(index) {
		if (b.lesions[lesionNumber].values.indexOf(index) > -1) {
			$(this).addClass('active').siblings().removeClass('active');
		}
	});
};

b.saveData = function() {
	var lesionNumber = $('#lesionList button.active').attr('id').substring(6);
	b.lesions[lesionNumber].type = $('#lesionType button.active').attr('id');

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
	b.loadData();
	b.generateText();
});

// on clicking a descriptor button
$('.btn-group button').click(function() {
	// manually replicating bootstrap radio functionality to avoid race condition
	$(this).addClass('active')
		.siblings().removeClass('active');
	$(this).blur();
	if ((this.id === 'btnMass') || (this.id === 'btnNME')) {
		$('#div'+this.id.substr(3,5)).show('slow')
			.siblings().hide('slow');
		$('#nt2 button,#dist button').removeClass('active');
	}
	b.saveData();
	b.generateText();
});

// add lesion
$('#btnAddLesion').click(function() {
	$(this).blur();
	var lesionNumber = Object.keys(b.lesions).length + 1; // IE9+ only

	b.clearButtons();
	$('#lesionSection > div').hide('slow');

	b.lesions[lesionNumber] = {type: '', values: [], text: ''};

	$('#lesionList').append(
		'<button class="btn btn-primary lesions" type="radio" id="lesion' +
		lesionNumber + '">#' + lesionNumber + '</button>'
	);

	$('#lesionList button').last().addClass('active').siblings().removeClass('active');
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
