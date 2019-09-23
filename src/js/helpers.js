
export const closest = (selector,el) => {
                    
    if(!el.closest){

        const matches = el.matches ? el.matches(`.${selector}`) : el.msMatchesSelector(`.${selector}`);

        if ( matches ) return el;

        el = el.parentElement || el.parentNode;

        if(el.classList.contains(selector)){
           return el; 
        }

        return false;

    }//for IE    

    if(el.closest){

        if(el.closest(`.${selector}`)) return el.closest(`.${selector}`);

        return false;
    }

}//closest func

export const matches = (elem,klasa) => {
    
    const matches = elem.matches ? elem.matches(klasa) : elem.msMatchesSelector(klasa);
    
    if(matches) return true;
    
    return false;
    
    
}