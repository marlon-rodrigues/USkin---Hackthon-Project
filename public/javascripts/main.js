function defineSidebarFunctionality() {
	
	//Toggle the main steps when clicked (1 ELEMENTS, 2 FONTS, 3 TABLES etc)
	$(".step h3").on("click", function(event) {
		event.preventDefault();
		var $this = $(this);
		if($this.next(".details").is(":visible")) {
			//Already visible, do nothing.
			console.log("Already visible");
		}
		else {
			$this.parent().siblings(".step").removeClass("active").children(".details").slideUp();
			$this.next(".details").slideToggle().parent().addClass("active");
		}
	});

	//Toggle sidebar into and out of view 
	$("aside, .gear").hover(function() {
		$(".sidebar").toggleClass("shown hiding");
	}, function() {
		$(".sidebar").toggleClass("shown hiding");
		//In case a drawer is open, close it.
		$(".drawer").removeClass("shown").addClass("hiding");
	});

	//When main item is clicked, show the drawer (ie when header is clicked
	//show header options)
	$(".atom").on('click', function(event) {
		event.preventDefault();
		var $this = $(this);
		var drawerId = $this.data("usi-drawer");
		//Hide all other drawers
		$(".drawer").not(drawerId).removeClass("shown").addClass("hiding");
		//Show just the drawer that was clicked
		$(drawerId).toggleClass("hiding shown");
	});

	//Make all nuggets content editable 
	$(".nugget").attr("contenteditable", true);
	//Make some nuggets not editable
	$(".nugget.not-editable").attr("contenteditable", false);

	//Apply an "editing" class when a .nugget item is clicked.
    $(document).on('dblclick','.nugget', function(event) { ////MARLON EDITS
        var $this = $(this);
        //Remove editing class from other elements.
        $(".nugget").removeClass("editing");
        //Now add it to the clicked item.
        $this.addClass("editing");

        //Now show the editing box.
        $("#nugget-options").removeClass("hiding").addClass("showing");

        //Rememeber, when the edit box is closed, we remove all editing classes
        //so we start fresh.
    });

    //Close edit box, remove editing classes from all nuggets 
    $("#nugget-options i, #nugget-options a.cancel").on('click', function(event) {
    	event.preventDefault();
    	var $this = $(this);
    	$this.parent().removeClass("showing").addClass("hiding");
    	$("*").removeClass("editing");
    	return false;
    });

    //Apply nugget classes
    $("#nugget-options .apply").on('click', function(event) {
    	event.preventDefault();
    	var nugColor = $("form.colors input[type='radio']:checked").data("nugget-class");
    	var nugFont = $("form.fonts input[type='radio']:checked").data("nugget-font");

    	//Apply color if selected and !undefined 
    	if(nugColor != null) {
    		$(".nugget.editing").addClass(nugColor);
    	}
    	//Apply font family if selected and !undefined
    	if(nugFont != null) {
    		$(".nugget.editing").addClass(nugFont);
    	}
    	$("*").removeClass("editing");
    	$("#nugget-options").removeClass("showing").addClass("hiding");
    });

    //When background option is clicked, open the option editor //MARLON EDITS
    $('#builder-board').click(function(){
    	 var $this = $(this);
        //Remove editing class from other elements.
        $(".nugget").removeClass("editing");
        //Now add it to the clicked item.
        $this.addClass("editing");

        //Now show the editing box. //MARLON EDITS
        $("#nugget-options").removeClass("hiding").addClass("showing");
    });

    $('.sidebar-background-selector').click(function(){ //MARLON EDITS
        var $this = $(this);

        if($this.attr('bck-image') != '') {
            $('#builder-board').css('cssText', 'background-image: url("https://uskin.herokuapp.com/images/backgrounds/' + $this.attr('bck-image') + '.png")');
        } else if ($this.attr('bck-color')) {
            $('#builder-board').css('cssText', 'background-color: ' + $this.attr('bck-color'));
        }
    });

}

	

