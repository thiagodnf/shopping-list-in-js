var SnackbarUtils = {
    savedState: {},
    remove: function(undoCallback){
        $.snackbar({
            htmlAllowed: true,
            content: "The entries were removed <a id='snackbar-btn-undo' style='color: yellow;' class='pull-right'>UNDO</a>"
        });
    },
    add: function(undoCallback){
        $.snackbar({
            htmlAllowed: true,
            content: "The entries were updated <a id='snackbar-btn-undo' style='color: yellow;' class='pull-right'>UNDO</a>"
        });
    }
}
