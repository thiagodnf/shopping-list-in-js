var PantryModule = {

    database: "products",
    actions: [
        "add",
        "edit",
        "remove"
    ],
    init: function(){
        var that = this;

        $.validate({ form:"#form-product", onSuccess: function($form) {
            // Hide the modal once the information are corrected
             $("#modal-product").modal("hide");

            var product = {
                id: $("#product-id").val(),
                name: $("#product-name").val(),
                categoryId: $("#product-category").val(),
                amount: $("#product-amount").val().replace(',', '.'),
                unit: $("#product-unit").val(),
                value: $("#product-value").val().replace(',', '.'),
                pending: "0"
            };

            DatabaseUtils.saveOrUpdate("products", product);

            ActionBar.showActionBar(false);

            that.reload();

            SnackbarUtils.updated();

            return false;
        }});

        this.reload();
    },
    open: function(product){

        var categories = DatabaseUtils.getAll("categories");

        $("#product-category").html('<option value="-1">'+"Uncategorized".toLocaleString()+'</option>');

        $.each(categories, function(index, category){
            $("#product-category").append('<option value="'+category.id+'">'+category.name+'</option>')
        });

        $("#product-id").val(product? product.id : UUIDUtils.generate());
        $("#product-name").val(product? product.name: "");
        $("#product-amount").val(product? product.amount: "1");
        $("#product-value").val(product? product.value: "0.0");
        $("#product-unit").val(product? product.unit: "unit");
        $("#product-category").val(product? product.categoryId: "-1");

        $("#modal-product").modal("show");
    },
    edit: function(id){
        this.open(DatabaseUtils.findOne("products", {id:id}));
    },
    reload: function(){

        var that = this;

        var products = DatabaseUtils.getAll("products");
        var categories = DatabaseUtils.getAll("categories");

        var numberOfItems = 0;

        ListView.callbacks = {};

        ListView.on('row.content.right', function(item){
            return '<span class="text-success pull-right">$'+(item.amount*item.value)+'</span>';
        });

        ListView.on('row.content.left', function(item){
            return item.name + " ("+item.amount+" "+item.unit.capitalize().toLocaleString()+")";
        });

        ListView.on('row.isValid', function(item){
            return item.pending == 0;
        });

        ListView.on('row.shown', function(item){
            numberOfItems++;
        });

        ListView.reload(categories, products);

        ToolBar.on('content.left', function(){
            return '<p><strong>'+numberOfItems+'</strong> '+"products".toLocaleString()+'</p>';
        });

        ToolBar.on('content.right', function(){
            return '<button class="btn pull-right btn-default" id="toolbar-btn-new">New Product</button>';
        });

        ToolBar.on('btn.new.onclick', function(){
            that.open();
        });

        ToolBar.init();

        $("#btn-save-product").text("Save".toLocaleString());
        $("#btn-cancel").text("Cancel".toLocaleString());
        $("#toolbar-btn-new").text("New Product".toLocaleString());

        $("label[for='product-name']").text("Name".toLocaleString());
        $("label[for='product-amount']").text("Amount".toLocaleString());
        $("label[for='product-unit']").text("Unit".toLocaleString());
        $("label[for='product-value']").text("Value".toLocaleString());
        $("label[for='product-category']").text("Category".toLocaleString());

        $("#modal-product .modal-title").text("Produto".toLocaleString());

        $("option[value='unit']").text("Unit".toLocaleString());
        $("option[value='box']").text("Box".toLocaleString());
        $("option[value='piece']").text("Piece".toLocaleString());
        $("option[value='package']").text("Package".toLocaleString());
        $("option[value='bottle']").text("Bottle".toLocaleString());
        $("option[value='sack']").text("Sack".toLocaleString());
        $("option[value='dozen']").text("Dozen".toLocaleString());
        $("option[value='liter']").text("Liter".toLocaleString());
    }
}
