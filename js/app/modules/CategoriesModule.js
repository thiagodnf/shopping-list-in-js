var CategoriesModule = {

    database: "categories",
    actions: [
        "edit",
        "remove"
    ],
    init: function(){
        $.validate({ form:"#form-category", onSuccess: function($form) {
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

             return false;
        }});

        var colors = ColorUtils.getColors();

        $.each(colors, function(index, value){

            var str = "";

            str += '<label style="background-color: '+value.background+'" class="btn btn-sm">';
			str += '<input type="radio" name="colorpicker" value="'+value.id+'" " autocomplete="off">';
			str += '<span class="glyphicon glyphicon-ok"></span>';
			str += '</label>';

            $("#category-color-options").append(str);
        });

        $("#new-category").click(this.open);

        this.reload();
    },
    open: function(){
        $("#category-id").val(UUIDUtils.generate());
        $("#category-name").val("");
        $('input:radio[name=colorpicker][value=0]').click();

        $("#modal-category").modal("show");
    },
    edit: function(id){

        var category = DatabaseUtils.getById("categories", id);

        if( ! category){
            return;
        }

        $("#category-id").val(category.id);
        $("#category-name").val(category.name);
        $('input:radio[name=colorpicker][value='+category.color+']').click();

        $("#modal-category").modal("show");
    },
    reload: function(){

        var categories = DatabaseUtils.getAll("categories");

        $("#category-total").html('<strong>'+categories.length+'</strong> categories');

        // Clear all before addding new items
        $("#list-group-categories").html("");

        var colors = ColorUtils.getColors();

        $.each(categories, function(index, value){
            var color = ArrayUtils.getById(colors, value.color);
            $("#list-group-categories").append('<a href="#" class="list-group-item"> <input type="checkbox" name="sl-item" id="'+value.id+'">&nbsp '+value.name+'<button style="background-color: '+color.background+'" class="btn btn-xs pull-right">&nbsp&nbsp&nbsp</button></a>')
        });
    }
}
