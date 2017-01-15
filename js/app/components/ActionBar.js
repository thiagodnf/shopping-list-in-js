var ActionBar = {
    callbacks: {},
    init: function(){
        var that = this;

        var str = "";

        str += '<div class="container">';
        str += '    <div class="row">';
        str += '        <div class="col-xs-2">';
        str += '            <button type="button" id="actionbar-cancel" class="btn btn-transparent pull-left"><i class="glyphicon glyphicon-arrow-left"></i><span class="actionbar-btn-text">'+"Back".toLocaleString()+'</span></button>';
        str += '        </div>';
        str += '        <div class="col-xs-10 actionbar-right-buttons">';
        str += '            <button type="button" id="actionbar-remove" class="btn btn-transparent pull-right"><i class="glyphicon glyphicon-trash"></i><span class="actionbar-btn-text">'+"Remove".toLocaleString()+'</span></button>';
        str += '            <button type="button" id="actionbar-edit" class="btn btn-transparent pull-right"><i class="glyphicon glyphicon-pencil"></i><span class="actionbar-btn-text">'+"Edit".toLocaleString()+'</span></button>';
        str += '            <button type="button" id="actionbar-add" class="btn btn-transparent pull-right"><i class="glyphicon glyphicon-plus"></i><span class="actionbar-btn-text">'+"Add".toLocaleString()+'</span></button>';
        str += '            <button type="button" id="actionbar-done" class="btn btn-transparent pull-right"><i class="glyphicon glyphicon-ok"></i><span class="actionbar-btn-text">'+"Done".toLocaleString()+'</span></button>';
        str += '        </div>';
        str += '    </div>';
        str += '</div>';

        $("#actionbar").html(str);

        $("#actionbar-remove").click(function(event){

            event.preventDefault();

            if(that.callbacks) that.callbacks['remove'](ListView.getSelectedItems("sl-item"));

            return false;
        });

        $("#actionbar-add").click(function(event){

            event.preventDefault();

            if(that.callbacks) that.callbacks['add'](ListView.getSelectedItems("sl-item"));

            ActionBar.showActionBar(false);

            return false;
        });

        $("#actionbar-done").click(function(event){

            event.preventDefault();

            if(that.callbacks) that.callbacks['done'](ListView.getSelectedItems("sl-item"));

            ActionBar.showActionBar(false);

            return false;
        });

        $("#actionbar-edit").click(function(event){

            event.preventDefault();

            if(that.callbacks) that.callbacks['edit'](ListView.getSelectedItems("sl-item"));

            return false;
        });

        $("#actionbar-cancel").click(function(event){

            event.preventDefault();

            if(that.callbacks) that.callbacks['back']();

            that.showActionBar(false);

            return false;
        });
    },
    on: function(event, callback){
        this.callbacks[event] = callback;
    },
    showActionBar: function(state){
        this.showOrHideComponent("#actionbar", state);
        this.showOrHideComponent(".actionbar-btn-text", ! NavBar.isMenuCollapsed());
    },
    showOrHideComponent: function(button, state){
        if(state){
            $(button).show();
        }else{
            $(button).hide();
        }
    },
    showEditButton: function(state){
        this.showOrHideComponent("#actionbar-edit", state);
    },
    showRemoveButton: function(state){
        this.showOrHideComponent("#actionbar-remove", state);
    },
    showDoneButton: function(state){
        this.showOrHideComponent("#actionbar-done", state);
    },
    showAddButton: function(state){
        this.showOrHideComponent("#actionbar-add", state);
    }
}
