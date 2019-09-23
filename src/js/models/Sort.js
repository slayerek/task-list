export class Sort {
    
    sortElem(items,val) {
        
        const concat = val.split('_');
        const name = concat[0];
        const dir = concat[1];
        
        const newItems = items.sort( (a, b) => {
            switch(name){
                case 'index' :    
                    return (dir =='asc') ? a[name]-b[name] : b[name]-a[name]; 
                break;
                case 'time' : 
                    let aTime = a[name].split('/');
                    let bTime = b[name].split('/');

                    if(dir=='asc')   return aTime[2] - bTime[2] || aTime[1] - bTime[1] || aTime[0] - bTime[0];
                    if(dir=='desc')   return bTime[2] - aTime[2] || bTime[1] - aTime[1] || bTime[0] - aTime[0];
                break;
            default :
                return a-b; 
            }
        });
        
        return newItems;
        
    }
    
    saveActiveOpt(val){
        localStorage.setItem('sortVal',val);
    }
    
    getActiveOpt(){
        return localStorage.getItem('sortVal');
    }
    
    findIndex(options,val){
        
        const index = options.findIndex(
            (elem,ind,array) => {
                return array[ind].value == val;
            }
        );

        return index;
        
    }
    
    
}