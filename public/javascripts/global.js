var serverURL = "http://pge-web.ungerboeck.com/Digital_Services_Pecho_Coast/";
var eventDetailsURL = "/event-details";

	//load handlebars template
function templateLoad(templateName, dataSource, htmlNode, callback) {
	var templateFile = 'partials/' + templateName + '.html';

	jQuery.get(templateFile, function(template) { 
		var renderedTemplate = Handlebars.compile(template);
		var result = renderedTemplate(dataSource);	

		//jQuery(htmlNode).replaceWith(result);
		jQuery(htmlNode).append(result);

		if(callback != null) { 
			callback();
		}
	});
}

jQuery(document).ready(function(){ 

		//load sidebar
	templateLoad('sidebar', null, '#sidebar-container', function(){
			//load nuggets options
		templateLoad('nuggetOptions', null, '#nugget-options', function(){
				//load drawing board
			templateLoad('drawingBoard', null, '#builder-container', function(){
				defineSidebarFunctionality(); //load sidebar and options functionalities
				createBuilder(); //load builder functionalities

				jQuery('#export-button').click(function(e){
					e.preventDefault();
					generateFile();
				})
			});	
		});
	});
		

	function createBuilder() {
		var drake = dragula({
			containers: [
				document.getElementById('builder-board'),
				document.getElementById('board-sidebar-header-draggable'),
				document.getElementById('board-sidebar-content-draggable'),
				document.getElementById('board-sidebar-footer-draggable')
			],
		    removeOnSpill: true,
		    copy: function (el, source) {
			   return (source === document.getElementById('board-sidebar-header-draggable') || 
			   		   source === document.getElementById('board-sidebar-content-draggable') ||
			   		   source === document.getElementById('board-sidebar-footer-draggable'));
			},
			accepts: function (el, target) {
			  return (target !== document.getElementById('board-sidebar-header-draggable') && 
			  		  target !== document.getElementById('board-sidebar-content-draggable') &&
			  		  target !== document.getElementById('board-sidebar-footer-draggable'));
			}
		});

		drake.on('drop', function(el, target, source, sibling){
				//remove item title
			jQuery('#builder-board .item-sample-label').remove();
			jQuery('#builder-board .item-sample-widget').remove();

				//remove handlebars script
			jQuery('#builder-board').find('script').remove();		

				//make sure sidebar always closes
			jQuery(".sidebar").removeClass("shown").addClass("hiding");	
		});

		drake.on('remove', function(el, target, source, sibling){
				//make sure sidebar always closes
			jQuery(".sidebar").removeClass("shown").addClass("hiding");		
		});

		jQuery('#builder-board a').click(function(e){
			e.preventDefault();
		});
	}

	function generateFile() {

		templateLoad('generator', null, '#export-container', function(){
				//clean up what we don't want to send to the file
			jQuery('#export-container div, #export-container label, #export-container a, #export-container input, #export-container span').attr('contenteditable', false);
			jQuery('#export-container div, #export-container label, #export-container a, #export-container input, #export-container span').removeClass('nugget');
			jQuery('#export-container div, #export-container label, #export-container a, #export-container input, #export-container span').removeClass('not-editable');
			jQuery('#export-container .ungerboeck-content-options').remove();

			var htmlToSend = jQuery('#export-container').html();

			$.ajax({
			    url: 'https://uskin.herokuapp.com/fileExport', 
			    type: 'POST', 
			    data: {
			    	html: htmlToSend
			    },
			    success: function(data) {
			    	swal("Success!", "Your webskin has been generated!", "success");
			    	jQuery('#export-container').html(''); //clear content
			    }, error: function(data) {
			    	swal("Error", "There was a problem generating your webskin. Please, contact the administrator.", "error");
			    	jQuery('#export-container').html(''); //clear content		    	
			    }
			});
		});	
	}
			
});

