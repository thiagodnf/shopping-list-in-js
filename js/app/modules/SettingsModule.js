var SettingsModule  = {
    init: function(){
        var that = this;

        $("#settings-language").val(DatabaseUtils.get("language") || "en-US");

        $.validate({ form:"#form-settings", onSuccess: function($form) {

            DatabaseUtils.set("language", $("#settings-language").val());

            //that.reload();

            location.reload();

            SnackbarUtils.updated("Saved");

            return false;
        }});

        this.reload();
    },
    actions: [
        "done"
    ],
    reload: function(){
        String.locale = DatabaseUtils.get("language");

        $("a[href='#settings-tab-general']").text("General".toLocaleString());
        $("label[for='settings-language']").text("Language".toLocaleString());
        $("#btn-settings-save").text("Save".toLocaleString());

        $("option[value='en-US']").text("English".toLocaleString());
        $("option[value='pt-BR']").text("Portuguese".toLocaleString());
    }
}
