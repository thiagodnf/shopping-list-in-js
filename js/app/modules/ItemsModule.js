var ItemsModule = {
    init: function(){
        this.reload();
    },
    actions: [
        "done"
    ],
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

            if(value.pending == 0){
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
