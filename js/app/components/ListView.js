var ListView = {
    callbacks: {},
    defaultName: "Uncategorized",
    on: function(event, callback){
        this.callbacks[event] = callback;
    },
    init: function(){
        var that = this;

        $(document).on('click','.list-group-item', function (event) {

            event.preventDefault();

            $(this).find("input").prop('checked', ! $(this).find("input").prop('checked'));

            if(that.thereAreSomeItemsSelected("sl-item")){
                ActionBar.showActionBar(true)
            }else{
                ActionBar.showActionBar(false)
            }

            var actions = LoadModule.getCurrentModule().actions;

            ActionBar.showEditButton(actions.indexOf("edit") > -1);
            ActionBar.showAddButton(actions.indexOf("add") > -1);
            ActionBar.showDoneButton(actions.indexOf("done") > -1);
            ActionBar.showRemoveButton(actions.indexOf("remove") > -1);

            if(that.getSelectedItems("sl-item").length != 1){
                ActionBar.showEditButton(false);
            }
        });
    },
    unselectedAll: function(name){
        $("input:checkbox[name="+name+"]").each(function(){
            $(this).prop('checked', false);
        });
    },
    getSelectedItems: function(name){
        var selectedItems = [];

        $("input:checkbox[name="+name+"]:checked").each(function(){
            selectedItems.push($(this).attr("id"));
        });

        return selectedItems;
    },
    thereAreSomeItemsSelected: function(name){
        return this.getSelectedItems(name).length > 0;
    },
    getPanel: function(id, name, color){
        var str = "";

        str += '<div class="panel panel-default">';
        str += '    <div class="panel-heading" style="background-color: '+color+'">'+name+'</div>';
        str += '    <div class="list-group" id="listview-panel-'+id+'"></div>';
        str += '</div>';

        return str;
    },
    getRow: function(item, id, name){
        var str = "";

        str += '<a href="#" class="list-group-item">';
        str += '    <input type="checkbox" name="sl-item" id="'+id+'">&nbsp ';
        str += this.callbacks['row.content.left']? this.callbacks['row.content.left'](item) : name;
        str += this.callbacks['row.content.right']? this.callbacks['row.content.right'](item) : "";
        str += '</a>';

        return str;
    },
    reload: function(categories, items, name){

        var that = this;

        $("#listview").html(this.getPanel(-1, name? name:this.defaultName.toLocaleString(), "#f5f5f5"));

        $.each(categories, function(index, category){
            $("#listview").append(that.getPanel(category.id, category.name, category.color));
        });

        $.each(items, function(index, item){
            var isValid = that.callbacks['row.isValid']? that.callbacks['row.isValid'](item) : true;

            if(isValid){
                if(that.callbacks['row.show']) that.callbacks['row.show'](item);

                $("#listview-panel-"+(item.categoryId || -1)).append(that.getRow(item, item.id, item.name));

                if(that.callbacks['row.shown']) that.callbacks['row.shown'](item);
            }
        });
    }
}
