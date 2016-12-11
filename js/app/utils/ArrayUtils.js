var ArrayUtils = {
    find: function(array, where){

        var result = [];

        for (var i = 0; i < array.length; i++){
            for (var prop in where) {
                if(array[i][prop] == where[prop]){
                    result.push(array[i]);
                }
            }
        }

        return result;
    },
    isArray: function(object){
        if (Array.isArray){
            return Array.isArray(object);
        }

        return object instanceof Array;
    },
    remove: function(array, entry){
        for (var i = 0; i < array.length; i++){
            if (array[i].id == entry.id) {
                array.splice(i, 1);
                break;
            }
        }
    },
    getPos: function(array, entry, prop){

        prop = prop || "id";

        for (var i = 0; i < array.length; i++){
            if (array[i][prop] == entry[prop]) {
                return i;
            }
        }
        return -1;
    }
}
