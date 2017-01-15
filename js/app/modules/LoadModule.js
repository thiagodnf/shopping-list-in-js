var LoadModule = {
    urls: {
        "#pending": "pages/items.html",
        "#pantry": "pages/pantry.html",
        "#categories": "pages/categories.html",
        "#settings": "pages/settings.html"
    },
    names: {
        "#pending": "Pending",
        "#pantry": "Pantry",
        "#categories": "Categories",
        "#settings": "Settings",
    },
    modules: {
        "#pending": ItemsModule,
        "#pantry": PantryModule,
        "#categories": CategoriesModule,
        "#settings": SettingsModule
    },
    init: function(){
        for(var prop in this.names){
            $(".menu-item[href='" + prop + "']").text(this.names[prop].toLocaleString());
        };
    },
    getDefaultModule: function(){
        return "#pending";
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

        if(NavBar.isMenuCollapsed()){
            $(".navbar-brand").text(this.names[module].toLocaleString());
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
