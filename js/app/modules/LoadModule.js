var LoadModule = {
    urls: {
        "#items": "pages/items.html",
        "#pantry": "pages/pantry.html",
        "#categories": "pages/categories.html"
    },
    names: {
        "#items": "Items",
        "#pantry": "Pantry",
        "#categories": "Categories"
    },
    modules: {
        "#items": ItemsModule,
        "#pantry": PantryModule,
        "#categories": CategoriesModule
    },
    getDefaultModule: function(){
        return "#items";
    },
    load: function(module){

        if( ! module || ! this.urls[module]){
            module = this.getDefaultModule();
        }

        console.log("Openning "+module+" module");

        $.get(this.urls[module], function(data, textStatus, request) {
    		$("#content").html(data);
    	});

    	$(".active").removeClass("active");

    	$(".menu-item[href='" + module + "']").each(function(){
    		$(this).parent().addClass("active");
    	});

        if($(window).width() <= 752){
            $(".navbar-brand").text(this.names[module]);
        }

        location.hash = module;
    },
    getModuleNameByURL: function(){
        var name = "";

        if( ! location.hash ||  location.hash == "#"){
    		name = this.getDefaultModule();
    	}else{
            name = location.hash;
        }

        return name;
    },
    getCurrentModule: function(){
        return this.modules[this.getModuleNameByURL()];
    }
}
