var DatabaseUtils = {
    getAll: function(table){
        var str = this.getString(table);

        if( ! str){
            return [];
        }

        return JSON.parse(str);
    },
    find: function(table, where){
        return where? ArrayUtils.find(this.getAll(table), where): this.getAll(table);
    },
    findOne: function(table, where){
        return this.find(table, where)[0];
    },
    contains: function(table, entry){
        return this.find(table, {id: entry.id}).length != 0;
    },
    setString: function(table, str){
        localStorage.setItem(table, str);
    },
    getString: function(table){
        return localStorage.getItem(table);
    },
    get: function(key){
        return localStorage.getItem(key);
    },
    set: function(key, value){
        localStorage.setItem(key, value);
    },
    save: function(table, entry){
        var entries = this.getAll(table);

        entries.push(entry);

        this.setString(table, JSON.stringify(entries));
    },
    update: function(table, entry){

        var array = this.getAll(table);

        var pos = ArrayUtils.getPos(array, entry);

        if(pos != -1){
            array[pos] = entry;
        }

        this.setString(table, JSON.stringify(array));
    },
    remove: function(table, entries){

        entries = ArrayUtils.isArray(entries)? entries : [entries];

        var array = this.getAll(table);

        for (var i = 0; i < entries.length; i++){
            ArrayUtils.remove(array, entries[i]);
        }

        this.setString(table, JSON.stringify(array));
    },
    saveOrUpdate: function(table, entry){
        if(this.contains(table, entry)){
            this.update(table, entry);
        }else{
            this.save(table, entry);
        }
    }
}
