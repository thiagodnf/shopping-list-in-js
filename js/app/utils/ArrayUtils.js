var ArrayUtils = {
    removeById: function(array, id){
        for (var i = 0; i < array.length; i++){
            if (array[i].id == id) {
                array.splice(i, 1);
                break;
            }
        }
    },
    getPositionById: function(array, id){
        for (var i = 0; i < array.length; i++){
            if (array[i].id == id) {
                return i;
            }
        }
        return -1;
    },
    getById: function(array, id){
        for (var i = 0; i < array.length; i++){
            if (array[i].id == id) {
                return array[i];
            }
        }

        return undefined;
    }
}
