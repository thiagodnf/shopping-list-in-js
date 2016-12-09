var PantryModule = {

    database: "products",
    actions: [
        "add",
        "edit",
        "remove"
    ],
    init: function(){
        $.validate({ form:"#form-product", onSuccess: function($form) {
            // Hide the modal once the information are corrected
             $("#modal-product").modal("hide");

             var product = {
                 id: $("#product-id").val(),
                 name: $("#product-name").val(),
                 category: $("#product-category").val(),
                 pending: "0"
             };

             DatabaseUtils.saveOrUpdate("products", product);

             ActionBar.showActionBar(false);

             PantryModule.reload();

             return false;
        }});

        $("#new-product").click(this.open);

        this.reload();
    },
    open: function(){
        $("#product-id").val(UUIDUtils.generate());
        $("#product-name").val("");

        var categories = DatabaseUtils.getAll("categories");

        $("#product-category").html("");

        $("#product-category").append('<option value="-1">Uncategorized</option>');

        $.each(categories, function(index, value){
            $("#product-category").append('<option value="'+value.id+'">'+value.name+'</option>')
        });

        $("#modal-product").modal("show");
    },
    edit: function(id){

        var product = DatabaseUtils.getById("products", id);

        if( ! product){
            return;
        }

        var categories = DatabaseUtils.getAll("categories");

        $("#product-category").html("");

        $("#product-category").append('<option value="-1">Uncategorized</option>');

        $.each(categories, function(index, value){
            $("#product-category").append('<option value="'+value.id+'">'+value.name+'</option>')
        });

        $("#product-id").val(product.id);
        $("#product-name").val(product.name);
        $("#product-category").val(product.category);

        $("#modal-product").modal("show");
    },
    reload: function(){

        var categories = DatabaseUtils.getAll("categories");
        var colors = ColorUtils.getColors();

        $(".panels").html("");

        $(".panels").append('<div class="panel panel-default"><div class="panel-heading">Uncategorized</div><div class="list-group" id="cat--1"></div></div>');

        $.each(categories, function(index, value){
            var color = ArrayUtils.getById(colors, value.color);

            $(".panels").append('<div class="panel panel-default"><div style="background-color: '+color.background+'" class="panel-heading">'+value.name+'</div><div class="list-group" id="cat-'+value.id+'"></div></div>');
        });

        var products = DatabaseUtils.getAll("products");


        // Clear all before addding new items
        $("#list-group-products").html("");

        var total = 0;

        $.each(products, function(index, value){
            var cat = "";

            if(value.pending == 1){
                return;
            }

            if(ArrayUtils.getPositionById(categories, value.category) == -1){
                cat = -1;
            }else{
                cat = value.category;
            }

            $("#cat-"+cat).append('<a href="#" class="list-group-item"> <input type="checkbox" name="sl-item" id="'+value.id+'">&nbsp '+value.name+'<button style="background-color: '+value.color+'" class="btn btn-xs pull-right">&nbsp&nbsp&nbsp</button></a>')

            total++;
        });

        $("#product-total").html('<strong>'+total+'</strong> products');
    }
}
