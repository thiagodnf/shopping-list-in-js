var CategoriesModule = {

    database: "categories",
    actions: [
        "edit",
        "remove"
    ],
    init: function(){
        var that = this;

        var lang = (DatabaseUtils.get("language") || "en-US").substring(0, 2);;

        $.validate({ form:"#form-category",  lang : lang, onSuccess: function($form) {

            // Hide the modal once the information are corrected
             $("#modal-category").modal("hide");

             var category = {
                 id: $("#category-id").val(),
                 name: $("#category-name").val(),
                 color: $('input[name=colorpicker]:checked').val()
             };

             DatabaseUtils.saveOrUpdate("categories", category);

             ActionBar.showActionBar(false);

             CategoriesModule.reload();

             SnackbarUtils.updated();

             return false;
        }});

        var colors = ColorUtils.getColors();

        $.each(colors, function(index, value){

            var str = "";

            str += '<label style="background-color: '+value.background+'" class="btn btn-sm">';
			str += '<input type="radio" name="colorpicker" value="'+value.background+'" " autocomplete="off">';
			str += '<span class="glyphicon glyphicon-ok"></span>';
			str += '</label>';

            $("#category-color-options").append(str);
        });

        this.reload();
    },
    open: function(category){
        $("#category-id").val(category? category.id: UUIDUtils.generate());
        $("#category-name").val(category? category.name: "");
        $('input:radio[name=colorpicker][value="'+(category? category.color: "#7cb5ec") +'"]').click();

        $("#modal-category").modal("show");
    },
    edit: function(id){
        this.open(DatabaseUtils.findOne("categories", {id:id}));
    },
    removeProducts: function(id){

        var products = DatabaseUtils.find("products",{categoryId: id});

        $.each(products, function(index, product){
            product.categoryId = -1;
            DatabaseUtils.update("products", product);
        });
    },
    reload: function(){

        var that = this;

        var categories = DatabaseUtils.getAll("categories");
        var numberOfItems = 0.0;

        ListView.callbacks = {};

        ListView.on('row.content.right', function(item){
            return '<button style="background-color: '+item.color+'" class="btn btn-xs pull-right">&nbsp&nbsp&nbsp</button>';
        });

        ListView.on('row.isValid', function(item){
            return true;
        });

        ListView.on('row.shown', function(item){
            numberOfItems++;
        });

        ListView.reload([], categories, "Name".toLocaleString());

        ToolBar.on('content.left', function(){
            return '<p><strong>'+numberOfItems+'</strong> '+"categories".toLocaleString()+'</p>';
        });

        ToolBar.on('content.right', function(){
            return '<button class="btn pull-right btn-default btn-purple" id="toolbar-btn-new">New Category</button>';
        });

        ToolBar.on('btn.new.onclick', function(){
            that.open();
        });

        ToolBar.init();

        $("#btn-save-category").text("Save".toLocaleString());
        $("#btn-cancel").text("Cancel".toLocaleString());
        $("#toolbar-btn-new").text("New Category".toLocaleString());

        $("label[for='category-name']").text("Name".toLocaleString());
        $("label[for='category-color']").text("Color".toLocaleString());

        $("#modal-category .modal-title").text("Category".toLocaleString());

    }
}
