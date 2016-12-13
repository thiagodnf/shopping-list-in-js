var SettingsModule  = {
    init: function(){
        var that = this;

        $("#settings-language").val(DatabaseUtils.get("language") || "en-US");
        $("#settings-currency-symbol").val(DatabaseUtils.get("currency-symbol") || "$");

        var lang = (DatabaseUtils.get("language") || "en-US").substring(0, 2);

        $.validate({ form:"#form-settings", onSuccess: function($form) {

            DatabaseUtils.set("language", $("#settings-language").val());
            DatabaseUtils.set("currency-symbol", $("#settings-currency-symbol").val());

            location.reload();

            return false;
        }});

        $("#btn-settings-clear-all").click(function(event){
            event.preventDefault();

            if(confirm("Are you sure?".toLocaleString())){
                localStorage.clear();
                location.reload();
            };

            return false;
        });

        $("#btn-settings-export").click(function(event){
            event.preventDefault();

            var keys = {}

            for (var key in localStorage){
               keys[key] = {};
            }

            for(var i in keys){
                keys[i] = localStorage.getItem(i);
            }

            var str = JSON.stringify(keys);

            var blob = new Blob([str], {type: "text/plain;charset=utf-8"});

    		var a = document.createElement("a");
    		document.body.appendChild(a);
        	a.style = "display: none";
    		a.href = window.URL.createObjectURL(blob);
    		a.download = "export.json";
    		a.click();

            return false;
    	});

        $.validate({ form:"#form-import",  lang : lang, onSuccess: function($form) {
            that.readFile();
        }});

        $("#dbtn-import").click(function(event){
            event.preventDefault();

            that.readFile();

            return false;
        });

        this.reload();
    },
    actions: [
        "done"
    ],
    readFile: function() {
        var that = this;

        var files = document.getElementById('files').files;

        if ( ! files.length) {
            alert('Please select a file!');
            return;
        }

        var file = files[0];

        var reader = new FileReader();

        // If we use onloadend, we need to check the readyState.
        reader.onloadend = function(evt) {
            if (evt.target.readyState == FileReader.DONE) { // DONE == 2
                that.importJSONString(evt.target.result);
            };
        }

        var blob = file.slice(0, file.size);
        reader.readAsBinaryString(blob);
    },
    importJSONString: function(str){
        var obj = JSON.parse(str);

        for(var i in obj){
            localStorage.setItem(i, obj[i]);
        }

        alert("Successfully Imported");

        location.reload();
    },
    reload: function(){
        $("a[href='#settings-tab-general']").text("General".toLocaleString());
        $("a[href='#settings-tab-advanced']").text("Advanced".toLocaleString());
        $("a[href='#settings-tab-about']").text("About".toLocaleString());

        $("label[for='settings-language']").text("Language".toLocaleString());
        $("label[for='settings-currency-symbol']").text("Currency Symbol".toLocaleString());
        $("p[for='settings-data']").text("Data".toLocaleString());
        $("p[for='settings-reset']").text("Reset Settings".toLocaleString());
        $("p[for='settings-reset-warning']").text("Warning! This cannot be undone!".toLocaleString());

        $("#btn-settings-save").text("Save".toLocaleString());
        $("#btn-settings-clear-all").text("Clear All".toLocaleString());
        $("#btn-settings-import").text("Import".toLocaleString());
        $("#btn-settings-export").text("Export".toLocaleString());
        $("#btn-import").text("Import".toLocaleString());
        $("#btn-cancel").text("Cancel".toLocaleString());
        $("#modal-import .modal-title").text("Import".toLocaleString());
    }
}
