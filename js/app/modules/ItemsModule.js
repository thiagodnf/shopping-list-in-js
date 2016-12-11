var ItemsModule = {
    init: function(){
        this.reload();
    },
    actions: [
        "done"
    ],
    reload: function(){

        var categories = DatabaseUtils.getAll("categories");
        var products = DatabaseUtils.getAll("products");
        var numberOfItems = 0;
        var totalValue = 0;

        ListView.callbacks = {};

        ListView.on('row.content.right', function(item){
            return '<span class="text-success pull-right">'+(DatabaseUtils.get("currency-symbol") || "$")+" "+(item.amount*item.value)+'</span>';
        });

        ListView.on('row.content.left', function(item){
            return item.name + " ("+item.amount+" "+item.unit.capitalize().toLocaleString()+")";
        });

        ListView.on('row.isValid', function(item){
            return item.pending == 1;
        });

        ListView.on('row.shown', function(item){
            numberOfItems ++;
            totalValue += (item.amount*item.value);
        });

        ListView.reload(categories, products);

        ToolBar.on('content.left', function(){
            return '<p><strong>'+numberOfItems+'</strong> '+"products".toLocaleString()+'</p>';
        });

        ToolBar.on('content.right', function(){
            return '<p class="text-success pull-right">'+(DatabaseUtils.get("currency-symbol") || "$")+" "+totalValue;
        });

        ToolBar.init();
    }
}
