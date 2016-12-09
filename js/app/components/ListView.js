var ListView = {
    init: function(){

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
