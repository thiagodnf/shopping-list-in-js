var SnackbarUtils = {
    savedState: {},
    remove: function(undoCallback){
        $.snackbar({
            htmlAllowed: true,
            content: "The entries were removed".toLocaleString()+" <a id='snackbar-btn-undo' style='color: yellow;' class='pull-right'>UNDO</a>"
        });
    },
    add: function(undoCallback){
        $.snackbar({
            htmlAllowed: true,
            content: "The entries were added".toLocaleString()+" <a id='snackbar-btn-undo' style='color: yellow;' class='pull-right'>UNDO</a>"
        });
    },
    updated: function(text){
        var msg = text || "The entries were updated".toLocaleString()
        $.snackbar({
            content: msg
        });
    },
    saved: function(text){
        var msg = text || "The entries were saved".toLocaleString()
        $.snackbar({
            content: msg
        });
    }
}
