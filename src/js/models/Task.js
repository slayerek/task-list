export class Task {
        
    addItem(task_to_do,time,done){
        
        let items = [];
        let index = 1;
        
       
        if( this.getLastElemtnId() ){
            index = this.getLastElemtnId() + 1; 
        }
        
        if( this.getItems() !== null ) items = this.getItems();
        
        items.push({index:index,task:task_to_do,time:time,done:done});
        
        this.setItems(items);
        
    }//addItem
    
    
    updateItem(task_to_do,time,done,id){
        
        let items = [];
        items = this.getItems();
        
        if(items){
        
            const idek = items.findIndex( (elem,ind,arr) => {
                return id == elem.index;
            });
            
            items[idek].task = task_to_do; 
            items[idek].time = time; 
            items[idek].done = done; 
            
            this.setItems(items);
        
        }
        
    }
    
    setItems(items){
        localStorage.setItem('taskItems', JSON.stringify(items));
    }
 
    
    getItems(){
       return JSON.parse(localStorage.getItem('taskItems')); 
   }   
    
    
    getItemsLength(){
        return this.getItems() !== null ? this.getItems().length : 0;
    }
    
   
    
    getLastElemtnId(){
        
        let items = [];
        let indexValues = [];
        
        if( this.getItems() ){
            
            items = this.getItems();
            
            indexValues = items.map( (elem) => {
               return elem.index;
            });

            return Math.max(...indexValues);
       
        }
        
        return false;
       
    }
    
    removeItem(id){
        
        let items = [];
        items = this.getItems();
        
        if(items){
        
            const idek = items.findIndex( (elem,ind,arr) => {
                return id == elem.index;
            });
            
            
            items.splice(idek,1);
            
            this.setItems(items);
        
        }
        
    }
    
    findIndex(id){
        
        let items = [];
        items = this.getItems();
        
        if(items){
        
            const idek = items.findIndex( (elem,ind,arr) => {
                return id == elem.index;
            });
            
            return idek;
            
        }    
        
    }
       
        
}