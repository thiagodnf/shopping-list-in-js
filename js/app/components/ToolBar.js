var ToolBar = {
    callbacks: {},
    init: function(){
        var that = this;

        var str = "";

        str += '<div class="row">';
        str += '    <div class="col-xs-6">';
        str += this.callbacks['content.left']? this.callbacks['content.left']() : "";
        str += '    </div>';
        str += '    <div class=" col-xs-6">';
        str += this.callbacks['content.right']? this.callbacks['content.right']() : "";
        str += '    </div>';
        str += '</div>';

        $("#toolbar").html(str);

        $("#toolbar-btn-new").click(function(event){
            event.preventDefault();

            if(that.callbacks['btn.new.onclick']) that.callbacks['btn.new.onclick']();

            return false;
        });
    },
    on: function(event, callback){
        this.callbacks[event] = callback;
    },
}
