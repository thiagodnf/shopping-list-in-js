var DatabaseUtils = {
    getAll: function(table){
        var str = localStorage.getItem(table);

        if( ! str){
            return [];
        }

        return JSON.parse(str);
    },
    removeById: function(table, id){

        if( ! this.contains(table, id)){
            return;
        }

        var registries = this.getAll(table);

        ArrayUtils.removeById(registries, id);

        localStorage.setItem(table, JSON.stringify(registries));
    },
    getPositionById: function(table, id){
        return ArrayUtils.getPositionById(this.getAll(table), id);
    },
    getById: function(table, id){
        var pos = this.getPositionById(table, id);

        if(pos == -1){
            return undefined;
        }

        return this.getAll(table)[pos];
    },
    contains: function(table, registry){
        return this.getPositionById(table, registry) != -1;
    },
    setString: function(table, str){
        localStorage.setItem(table, str);
    },
    getString: function(table){
        return localStorage.getItem(table);
    },
    save: function(table, registry){
        var registries = this.getAll(table);

        registries.push(registry);

        localStorage.setItem(table, JSON.stringify(registries));
    },
    update: function(table, registry){

        var registries = this.getAll(table);

        var pos = this.getPositionById(table, registry.id);

        if(pos != -1){
            registries[pos] = registry
        }

        localStorage.setItem(table, JSON.stringify(registries));
    },
    remove: function(table, registry){
        DatabaseUtils.removeById(table, registry.id);
    },
    saveOrUpdate: function(table, registry){

        if(this.contains(table, registry.id)){
            this.update(table, registry);
        }else{
            this.save(table, registry);
        }
    }
}
