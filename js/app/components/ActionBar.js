var ActionBar = {
    init: function(){
        var str = "";

        // str += '<nav class="navbar navbar-default navbar-fixed-top" id="c-actionbar"  style="display:none" >';
        // str += '<div class="container">';
        // str += '<div class="row">';
        // str += '<div class="col-xs-4">';
        // str += '<div class="btn-group pull-left" role="group" aria-label="...">';
        // str += '<a href="#" class="btn" id="actionbar-cancel"><i class="glyphicon glyphicon-arrow-left"></i> Back</a>';
        // str += '</div>';
        // str += '</div>';
        // str += '<div class="col-xs-8">';
        // str += '<div class="btn-group pull-right" role="group" aria-label="...">';
        // str += '<a href="#" class="btn" id="actionbar-done"><i class="glyphicon glyphicon-ok"></i> Done</a>';
        // str += '<a href="#" class="btn" id="actionbar-add"><span class="glyphicon glyphicon-plus"></span> Add</a>';
        // str += '<a href="#" class="btn" id="actionbar-edit"><i class="glyphicon glyphicon-pencil"> Edit</i></a>';
        // str += '<a href="#" class="btn" id="actionbar-remove"><i class="glyphicon glyphicon-trash"> Remove</i></a>';
        // str += '</div>';
        // str += '</div>';
        // str += '</div>';
        // str += '</div>';
        // str += '</nav>';


        str += '<div class="container">';
        str += '    <div class="row">';
        str += '        <div class="col-xs-2">';
        str += '            <button type="button" id="actionbar-cancel" class="btn btn-transparent pull-left"><i class="glyphicon glyphicon-arrow-left"></i><span class="actionbar-btn-text">Back</span></button>';
        str += '        </div>';
        str += '        <div class="col-xs-10 actionbar-right-buttons">';
        str += '            <button type="button" id="actionbar-done" class="btn btn-transparent pull-right"><i class="glyphicon glyphicon-ok"></i><span class="actionbar-btn-text">Done</span></button>';
        str += '            <button type="button" id="actionbar-add" class="btn btn-transparent pull-right"><i class="glyphicon glyphicon-plus"></i><span class="actionbar-btn-text">Add</span></button>';
        str += '            <button type="button" id="actionbar-edit" class="btn btn-transparent pull-right"><i class="glyphicon glyphicon-pencil"></i><span class="actionbar-btn-text">Edit</span></button>';
        str += '            <button type="button" id="actionbar-remove" class="btn btn-transparent pull-right"><i class="glyphicon glyphicon-trash"></i><span class="actionbar-btn-text">Remove</span></button>';
        str += '        </div>';
        str += '    </div>';
        str += '</div>';

        str += '<nav class="navbar navbar-default navbar-fixed-top" id="c-actionbar"  style="display:none" >';
        str += '<div class="container">';
        str += '<div id="" class="">';
        str += '<form class="navbar-form navbar-left">';
        str += '    <button type="button" id="actionbar-cancel" class="btn btn-transparent"><i class="glyphicon glyphicon-arrow-left"></i> Back</button>';
        str += '</form>';
        str += '<form class="navbar-form navbar-right">';
        str += '    <button type="button" id="actionbar-done" class="btn btn-transparent"><i class="glyphicon glyphicon-ok"></i> Done</button>';
        str += '    <button type="button" id="actionbar-add" class="btn btn-transparent"><i class="glyphicon glyphicon-plus"></i> Add</button>';
        str += '    <button type="button" id="actionbar-edit" class="btn btn-transparent"><i class="glyphicon glyphicon-pencil"></i> Edit</button>';
        str += '    <button type="button" id="actionbar-remove" class="btn btn-transparent"><i class="glyphicon glyphicon-trash"></i> Remove</button>';
        str += '</form>';
        str += '</div>'
        str += '</div>';
        str += '</nav>';

        //$("#actionbar").html(str);

        $("#actionbar-cancel").click(function(event){

            event.preventDefault();

            unselectedAll("sl-item");

            ActionBar.showActionBar(false)
        });
    },
    showActionBar: function(state){
        this.showOrHideComponent("#actionbar", state);
        this.showOrHideComponent(".actionbar-btn-text", ! isMenuCollapsed());
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
