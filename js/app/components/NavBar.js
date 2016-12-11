var NavBar = {
    init: function(){

        var that = this;

        $(".menu-item").click(function(event){

            event.preventDefault();

            LoadModule.load($(this).attr("href"));

            return false;
    	});

        if(that.isMenuCollapsed()){
            $(".navbar-btn-text").show();
        }else{
            $(".navbar-btn-text").hide();
        }

    	$('.nav .menu-item').on('click', function(event){

            event.preventDefault();

            if(that.isMenuCollapsed()){
        	    $('.btn-navbar').click(); //bootstrap 2.x
        	    $('.navbar-toggle').click() //bootstrap 3.x by Richard
            }

            return false;
    	});
    },
    isMenuCollapsed: function(){
        return $(window).width() <= 752;
    }
}
