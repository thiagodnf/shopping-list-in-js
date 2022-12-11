function defineAsPending(ids, state){
    SnackbarUtils.savedState = {
        database: "products",
        value: DatabaseUtils.getString("products")
    };

    // Load entries for deleting
    $.each(ids, function(index, id){
        var entry = DatabaseUtils.findOne("products", {id: id});

        if(entry){
            entry.pending = state;
            DatabaseUtils.update("products", entry);
        }
    });

    LoadModule.getCurrentModule().reload();

    SnackbarUtils.add();
}

$(function(){

    document.addEventListener('contextmenu', function(evento){
        event.preventDefault()
    });

    String.locale = DatabaseUtils.get("language");

    if( ! String.locale){
        String.locale = "en-US";
    }

    console.log(String.locale)

    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        console.log("Great success! All the File APIs are supported.");
    } else {
        alert('The File APIs are not fully supported in this browser.');
    }

    $(".navbar-brand").text("Shopping List in JS".toLocaleString());
    document.title  = "Shopping List in JS".toLocaleString();

    ActionBar.init();

    NavBar.init();

    ListView.init();

    LoadModule.init();

    LoadModule.load(LoadModule.getModuleNameByURL());

    ActionBar.on('back', function(){
        ListView.unselectedAll("sl-item");
    });

    ActionBar.on('remove', function(ids){
        var database = LoadModule.getCurrentModule().database;

        SnackbarUtils.savedState = {
            database: database,
            value: DatabaseUtils.getString(database)
        };

        // Load entries for deleting
        $.each(ids, function(index, id){
            var entry = DatabaseUtils.findOne(database, {id: id});

            if(entry){
                DatabaseUtils.remove(database, entry);

                if(database == "categories"){
                    LoadModule.getCurrentModule().removeProducts(id);
                }
            }
        });

        LoadModule.getCurrentModule().reload();

        SnackbarUtils.remove();

        ActionBar.showActionBar(false);
    });

    ActionBar.on('add', function(ids){
        defineAsPending(ids, true);
    });

    ActionBar.on('done', function(ids){
        defineAsPending(ids, false);
    });

    ActionBar.on('edit', function(ids){
        if(ids.length > 1){
            alert("You can edit only a registry");
        }else{
            LoadModule.getCurrentModule().edit(ids[0]);
        }
    });

    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    $(document).on('click',"#snackbar-btn-undo", function(){
        DatabaseUtils.setString(SnackbarUtils.savedState.database, SnackbarUtils.savedState.value);

        LoadModule.getCurrentModule().reload();
    });
});
