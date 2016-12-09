function unselectedAll(name){
    $("input:checkbox[name="+name+"]").each(function(){
        $(this).prop('checked', false);
    });
}
function getSelectedItems(name){
    var selectedItems = [];

    $("input:checkbox[name="+name+"]:checked").each(function(){
        selectedItems.push($(this).attr("id"));
    });

    return selectedItems;
}

function thereAreSomeItemsSelected(name){
    return getSelectedItems(name).length > 0;
}

function isMenuCollapsed(){
    return $(window).width() <= 752;
}

function defineAsPending(ids, state){
    SnackbarUtils.savedState = {
        database: "products",
        value: DatabaseUtils.getString("products")
    };

    // Load entries for deleting
    $.each(ids, function(index, id){
        var entry = DatabaseUtils.getById("products", id);

        if(entry){
            entry.pending = state;
            DatabaseUtils.update("products", entry);
        }
    });

    LoadModule.getCurrentModule().reload();

    SnackbarUtils.add();

    ActionBar.showActionBar(false);
}

$(function(){

    console.log("Loading app...");

    ActionBar.init();

    LoadModule.load(LoadModule.getModuleNameByURL());

    $(".menu-item").click(function(event){
        event.preventDefault();

        LoadModule.load($(this).attr("href"));
	});

	$('.nav .menu-item').on('click', function(event){
        event.preventDefault();

        if(isMenuCollapsed()){
    	    $('.btn-navbar').click(); //bootstrap 2.x
    	    $('.navbar-toggle').click() //bootstrap 3.x by Richard
        }
	});

    $(document).on('click','.list-group-item', function (event) {

        event.preventDefault();

        $(this).find("input").prop('checked', ! $(this).find("input").prop('checked'));

        if(thereAreSomeItemsSelected("sl-item")){
            ActionBar.showActionBar(true)
        }else{
            ActionBar.showActionBar(false)
        }

        var actions = LoadModule.getCurrentModule().actions;

        ActionBar.showAddButton(actions.indexOf("add") > -1);
        ActionBar.showRemoveButton(actions.indexOf("remove") > -1);
        ActionBar.showDoneButton(actions.indexOf("done") > -1);
        ActionBar.showEditButton(actions.indexOf("edit") > -1);

        if(getSelectedItems("sl-item").length != 1){
            ActionBar.showEditButton(false);
        }
    });

    $("#actionbar-add").click(function(event){

        event.preventDefault();

        var ids = getSelectedItems("sl-item");

        defineAsPending(ids, true);

        return false;
    });

    $("#actionbar-done").click(function(event){

        event.preventDefault();

        var ids = getSelectedItems("sl-item");

        defineAsPending(ids, false);

        return false;
    });

    $("#actionbar-edit").click(function(event){

        event.preventDefault();

        var selectedItems = getSelectedItems("sl-item");

        if(selectedItems.length > 1){
            alert("You can edit only a registry");
        }else{
            LoadModule.getCurrentModule().edit(selectedItems[0]);
        }

        return false;
    });

    $("#actionbar-remove").click(function(event){

        event.preventDefault();

        var database = LoadModule.getCurrentModule().database;

        var ids = getSelectedItems("sl-item");

        SnackbarUtils.savedState = {
            database: database,
            value: DatabaseUtils.getString(database)
        };

        // Load entries for deleting
        $.each(ids, function(index, id){
            var entry = DatabaseUtils.getById(database, id);

            if(entry){
                DatabaseUtils.remove(database, entry);
            }
        });

        LoadModule.getCurrentModule().reload();

        SnackbarUtils.remove();

        ActionBar.showActionBar(false);

        return false;
    });

    $(document).on('click',"#snackbar-btn-undo", function(){
        DatabaseUtils.setString(SnackbarUtils.savedState.database, SnackbarUtils.savedState.value);

        LoadModule.getCurrentModule().reload();
    })
});
