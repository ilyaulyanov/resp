/*
	Twenty by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel.init({
		reset: 'full',
		breakpoints: {
			global:		{ range: '*', href: 'css/style.css', containers: 1400, grid: { gutters: 50 } },
			wide:		{ range: '-1680', href: 'css/style-wide.css', containers: 1200, grid: { gutters: 40 } },
			normal:		{ range: '-1280', href: 'css/style-normal.css', containers: 960, viewport: { scalable: false } },
			narrow:		{ range: '-980', href: 'css/style-narrow.css', containers: '95%', grid: { gutters: 30 } },
			narrower:	{ range: '-840', href: 'css/style-narrower.css', containers: '95%!' },
			mobile:		{ range: '-736', href: 'css/style-mobile.css', containers: '100%!' }
		},
		plugins: {
			layers: {
				config: {
					mode: function() { return (skel.vars.isMobile ? 'transform' : 'position'); }
				},
				topPanel: {
					states: '/global/wide/normal/narrow/narrower/mobile',
					position: 'top-center',
					side: 'top',
					hidden: true,
					animation: 'pushY',
					width: '100%',
					height: 275,
					html: '<nav data-action="navList" data-args="nav"></nav>',
					clickToHide: true,
					swipeToHide: false,
					orientation: 'vertical'
				},
				topButton: {
					states: '/global/wide/normal/narrow/narrower/mobile',
					position: 'top-center',
					width: 120,
					height: 50,
					html: '<span class="toggle" data-action="toggleLayer" data-args="topPanel"></span>'
				},
				sidePanel: {
					states: '/global/wide/normal/narrow/narrower',
					position: 'top-left',
					side: 'left',
					hidden: true,
					animation: 'revealX',
					width: 250,
					height: '100%',
					html: '<nav data-action="navList" data-args="nav"></nav>',
					clickToHide: true,
					orientation: 'vertical'
				},
				sideButton: {
					states: '/global/wide/normal/narrow/narrower',
					position: 'top-left',
					width: 100,
					height: 60,
					html: '<span class="toggle" data-action="toggleLayer" data-args="sidePanel"></span>'
				}
			}
		}
	});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$header = $('#header'),
			$banner = $('#banner');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				$body.removeClass('is-loading');
			});

		// CSS polyfills (IE<9).
			if (skel.vars.IEVersion < 9)
				$(':last-child').addClass('last-child');

		// Forms (IE<10).
			var $form = $('form');
			if ($form.length > 0) {

				if (skel.vars.IEVersion < 10) {
					$.fn.n33_formerize=function(){var _fakes=new Array(),_form = $(this);_form.find('input[type=text],textarea').each(function() { var e = $(this); if (e.val() == '' || e.val() == e.attr('placeholder')) { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).blur(function() { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).focus(function() { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); _form.find('input[type=password]').each(function() { var e = $(this); var x = $($('<div>').append(e.clone()).remove().html().replace(/type="password"/i, 'type="text"').replace(/type=password/i, 'type=text')); if (e.attr('id') != '') x.attr('id', e.attr('id') + '_fakeformerizefield'); if (e.attr('name') != '') x.attr('name', e.attr('name') + '_fakeformerizefield'); x.addClass('formerize-placeholder').val(x.attr('placeholder')).insertAfter(e); if (e.val() == '') e.hide(); else x.hide(); e.blur(function(event) { event.preventDefault(); var e = $(this); var x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } }); x.focus(function(event) { event.preventDefault(); var x = $(this); var e = x.parent().find('input[name=' + x.attr('name').replace('_fakeformerizefield', '') + ']'); x.hide(); e.show().focus(); }); x.keypress(function(event) { event.preventDefault(); x.val(''); }); });  _form.submit(function() { $(this).find('input[type=text],input[type=password],textarea').each(function(event) { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) e.attr('name', ''); if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); }).bind("reset", function(event) { event.preventDefault(); $(this).find('select').val($('option:first').val()); $(this).find('input,textarea').each(function() { var e = $(this); var x; e.removeClass('formerize-placeholder'); switch (this.type) { case 'submit': case 'reset': break; case 'password': e.val(e.attr('defaultValue')); x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } else { e.show(); x.hide(); } break; case 'checkbox': case 'radio': e.attr('checked', e.attr('defaultValue')); break; case 'text': case 'textarea': e.val(e.attr('defaultValue')); if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } break; default: e.val(e.attr('defaultValue')); break; } }); window.setTimeout(function() { for (x in _fakes) _fakes[x].trigger('formerize_sync'); }, 10); }); return _form; };
					$form.n33_formerize();
				}

			}

		// Scrolly links.
			$('.scrolly').scrolly(1000, 60);

		// Dropdowns.
			$('#nav > ul').dropotron({
				mode: 'fade',
				noOpenerFade: true,
				expandMode: (skel.vars.isTouch ? 'click' : 'hover')
			});

		// Header.
		// If the header is using "alt" styling and #banner is present, use scrollwatch
		// to revert it back to normal styling once the user scrolls past the banner.
		// Note: This is disabled on mobile devices.
			if (!skel.vars.isMobile
			&&	$header.hasClass('alt')
			&&	$banner.length > 0) {

				$window.on('load', function() {

					$banner.scrollwatch({
						delay:		0,
						range:		1,
						anchor:		'top',
						on:			function() { $header.addClass('alt reveal'); },
						off:		function() { $header.removeClass('alt'); }
					});

				});

			}
		

		
		
	});

})(jQuery);


//calculator
$(document).ready(function(){
	var ctx = document.getElementById("myChart").getContext("2d");
	var ageBonus = [15, 15, 15, 15, 15, 13.5, 12, 10.5, 9, 7.5, 6, 4.5, 3, 1.5];
	var myChart;
	
		//var myLineChart = new Chart(ctx).Line(data, {
		//    responsive: true
		//});
		Chart.defaults.global.responsive = true;
		var properties = {
				age: 0,
				studyAge: 18,
				famRevenue: 50000,
				province: 'QC',
				monthlyDeposit: 150,
				invRate: 1.08,
				incomeGroup: 50

			};

		$('.calc-input').change(function(e){
			var up = parseInt($(e.target).val());
			var upm = $(e.target).attr('name');
			properties[upm] = up;
			if(checkFields()){checkProperties();}
		})

		$('.calc-select').change(function(e){
			var up = $(e.target).val();
			properties.province = up;
			if(checkFields()){checkProperties();}
		})
		$('.calc-radio').change(function(e){
			console.log(e.target);
			var up = $(e.target).data('ig');
			properties.incomeGroup = parseInt(up);
			if(checkFields()){checkProperties();}
		})

		function checkFields(){
			var isChecked = false;
			if($('input:radio:checked').length > 0){
				isChecked = true;
			 }else{
			    return false;
			 }

			if(!isChecked){return false;}else{
				var inputs = $('.form-canvas .calc-input');
				for(var i=0; i<inputs.length; i++){
					if($.trim($(inputs[i]).val()).length == 0){
						return false;
						console.log('empty');
					}
				}
			}	
			
			if($.trim($('.form-canvas select').val()).length == 0){
				return false;
			}
		   	return true;
		}
		function checkProperties(){
			//run some data checks here
			//console.log(properties);

			// 1. Yearly deposit ( Y )
			var yearlyDeposit = properties.monthlyDeposit * 12;			

			// 2. Government subsidy ( G )
			var yearlySubsidy = yearlyDeposit * 0.2;
			var maxYearlySubsidy = 500;
			yearlySubsidy = Math.min(yearlySubsidy,maxYearlySubsidy);

			var provinceBonus = 0;

			//3. Low income grant ( G1 )
			var lowIncomeGrant = properties.incomeGroup;

			//4. Province bonus subsidy ( P )
			switch(properties.province){
				case "AB":
					 provinceBonus = 800;
					break;

				case "SK":
					var maxBonus = 250;
					 provinceBonus = Math.min(yearlyDeposit*0.1,maxBonus);
				break;

				case "QC":
					var maxBonus = 250;
					provinceBonus = Math.min(yearlyDeposit*0.1, maxBonus);
				break;
			}

			// 5. Total yearly deposit 
			// S = Y + G + G1 + P
			var totalYearlyDeposit = yearlyDeposit + yearlySubsidy + lowIncomeGrant + provinceBonus;

			// 6. Calculating total deposit over years ( N )
			var payoutAge = 18;
			var numberOfPayingYears = payoutAge - properties.age;

			// 7. principal ( vklad = Y * N )
			var totalDeposit = yearlyDeposit * numberOfPayingYears;

			// 8. total payment ( R = S * (1.08 ^ N) )
			var tempVal = Math.pow(properties.invRate,numberOfPayingYears);
			var totalPayment = totalYearlyDeposit * tempVal; 

			// 9. Insurance company bonus
			// IAP = ( % / 100) * vklad
			var insBonus = (ageBonus[properties.age] / 100) * totalDeposit;
			//console.log(ageBonus[properties.age]);
			//console.log(insBonus);

			// R + IAP
			var overallPayout = totalPayment + insBonus;

			// 10. Taxable income for the child
			// R + IAP - vklad
			var taxableIncome = overallPayout - totalPayment;


			//Things to show on a chart
			// Y, G, G1, P, IAP

			var chartYearlyData = [
			{
				value: yearlyDeposit,
		        color:"#F7464A",
		        highlight: "#FF5A5E",
		        label: 'Yearly Deposit'
			},
			{
				value: yearlySubsidy,
		        color:"#46BFBD",
		        highlight: "#5AD3D1",
		        label: 'Yearly Government Grant'
			},
			{
				value: lowIncomeGrant,
		        color:"#FDB45C",
		        highlight: "#FFC870",
		        label: 'Additional Income Grant'
			},
			{
				value: provinceBonus,
		        color:"#87D37C",
		        highlight: "#2ECC71",
		        label: 'Province Bonus Grant'
			}
			]
			//console.log(chartYearlyData);
			redrawChart(chartYearlyData);
			

			var cashData = {
				yearlyDeposit : yearlyDeposit,
				yearlySubsidy : yearlySubsidy,
				bonus : provinceBonus,
				lowIncomeGrant : lowIncomeGrant,
				totalYearlyDeposit : totalYearlyDeposit,
				numberOfPayingYears : numberOfPayingYears,
				totalDeposit : totalDeposit,
				totalPayment : totalPayment,
				overallPayout : overallPayout,
				taxableIncome : taxableIncome

			}
			//console.log(cashData);
		}

		function redrawChart(arr){
			var icon = document.getElementById('chart-desc-icon');
			icon.style.display = 'none';
			if(myChart){myChart.destroy();}
			myChart = new Chart(ctx).Doughnut(arr,{
				responsive:true,
				name: 'RESP breakdown for 1 year',
				animationSteps: 60,
				animationEasing : "easeInOutQuart",
				legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span class=\"legend-color\" style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><span class=\"legend-label\"><%=segments[i].label%><%}%></span><%if(segments[i].value==''){%><span class=\"legend-value\">N/A<%}%></span><%if(segments[i].value){%><span class=\"legend-value\">$<%=segments[i].value%><%}%></span></li><%}%></ul>"
			});
			var legend = myChart.generateLegend();

			var leg_el = document.getElementById('chart-legend');
			leg_el.innerHTML = legend;
		}
})