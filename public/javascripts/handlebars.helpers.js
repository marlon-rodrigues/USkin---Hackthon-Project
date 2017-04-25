	//register standard helpers
Handlebars.registerHelper('if_compareDates', function(startDate, endDate, opts) {
	if (startDate == endDate) {
		return opts.fn(this);
	} else {
		return opts.inverse(this);
	}
});

Handlebars.registerHelper('times', function(n, block) {
    var accum = '';
    for(var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});


Handlebars.registerHelper('get_web_skin', function(skinName, opts) {
    return '/partials/' + skinName + '.html';
});

Handlebars.registerHelper('get_body_content', function(opts) {
    return jQuery('#builder-board').html();
});

Handlebars.registerHelper('get_ungerboeck_generated_css', function(opts) {
    var htmlStyles = '';

    var objStyle = {};
    	//array of Ungerboeck editable objects
    	//UNGERBOECK CLASS NAME / USKIN CLASS NAME
    var arrObjects = [    	
    	'ux-banner-user-navbar-container/ungerboeck-content-top', 
    	'ux-banner-navbar-welcome/usi-welcome-message', 
    	'ux-banner-user-signout/usi-sign-out', 

    	'ux-banner-event/ungerboeck-content-header', 
    	'ux-banner-heading-event-name/usi-event-title', 
    	'ux-banner-heading-event-venue/usi-event-location', 
    	'ux-banner-heading-event-datetime/usi-event-date-time', 

    	'ux-reg-progress-current/usi-step-current',
    	'ux-reg-reg-progress-unfinished/usi-step-next',
    	'ux-reg-reg-progress-completed/usi-step-completed',

    	'ux-section-heading/usi-body-header',

    	'control-label/usi-body-form-label',
    	'form-control/usi-body-form-field',

    	'ux-table-heading-rows/usi-table-background',
    	'panel-heading/usi-table-background',

    	//'ux-page-button/usi-body-button-item',
    	'ux-page-btn/usi-body-button-item',

    	'layoutContainer/builder-board'
    ]   
    
    	//get css colors
    jQuery.each(arrObjects, function(key, value) {
    	var objInfo = value.split('/');
    	var objUSI = objInfo[0];
    	var objSkin = objInfo[1];

    	objStyle[objUSI] = [];

    	if(objUSI == 'layoutContainer') {
		    objStyle[objUSI]['background-position'] =  jQuery('#' + objSkin).css('background-position');  	
		    objStyle[objUSI]['background-repeat'] =  jQuery('#' + objSkin).css('background-repeat');  	
		    objStyle[objUSI]['background-size'] =  jQuery('#' + objSkin).css('background-size');  	

		    if(jQuery('#' + objSkin).css('background-size') != '') {
		    	objStyle[objUSI]['background-image'] =  jQuery('#' + objSkin).css('background-image');  	
		    } else {
		    	objStyle[objUSI]['background-color'] =  jQuery('#' + objSkin).css('background-color');  	
		    }  
    	} else {
    		objStyle[objUSI]['color'] = jQuery('#builder-board .ungerboeck-content-options .' + objSkin).css('color');
	    	objStyle[objUSI]['background'] = jQuery('#builder-board .ungerboeck-content-options .' + objSkin).css('background');
	    	objStyle[objUSI]['background-color'] = jQuery('#builder-board .ungerboeck-content-options .' + objSkin).css('background-color');
	    	objStyle[objUSI]['border'] = jQuery('#builder-board .ungerboeck-content-options .' + objSkin).css('border');
	    	objStyle[objUSI]['border-radius'] = jQuery('#builder-board .ungerboeck-content-options .' + objSkin).css('border-radius');
	    	objStyle[objUSI]['font-family'] = jQuery('#builder-board .ungerboeck-content-options .' + objSkin).css('font-family');
	    	objStyle[objUSI]['font-weight'] = jQuery('#builder-board .ungerboeck-content-options .' + objSkin).css('font-weight');
	    	objStyle[objUSI]['text-transform'] = jQuery('#builder-board .ungerboeck-content-options .' + objSkin).css('text-transform');
    	}   
    });

    jQuery.each(objStyle, function(key, objs){
    	htmlStyles += '.' + key + ' {';
    	
    	for (var property in objs) {
    		htmlStyles += property + ': ' + objs[property] + ';';
    	}

    	htmlStyles += '}';
    });

    return htmlStyles;
});