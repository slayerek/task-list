export class ShowItems {
    
    setItems(val){
        localStorage.setItem('showItems', val);
    }//set number of items
    
    getItems(){
        return localStorage.getItem('showItems'); 
    }//get number of items
    
    findIndex(options,val){
        
        const index = options.findIndex(
            (elem,ind,array) => {
                return array[ind].value == val;
            }
        );

        return index;
        
    }
    
}


