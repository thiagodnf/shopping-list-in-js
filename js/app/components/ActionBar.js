var ActionBar = {
    init: function(){
        $("#actionbar-cancel").click(function(event){

            event.preventDefault();

            unselectedAll("sl-item");

            ActionBar.showActionBar(false)
        });
    },
    showActionBar: function(state){
        if(state){
            $("#actionbar").show();
        }else{
            $("#actionbar").hide();
        }
    },
    showButton: function(button, state){
        if(state){
            $(button).show();
        }else{
            $(button).hide();
        }
    },
    showEditButton: function(state){
        this.showButton("#actionbar-edit", state);
    },
    showRemoveButton: function(state){
        this.showButton("#actionbar-remove", state);
    },
    showDoneButton: function(state){
        this.showButton("#actionbar-done", state);
    },
    showAddButton: function(state){
        this.showButton("#actionbar-add", state);
    }
}
