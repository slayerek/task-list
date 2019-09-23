

const prevItem = (page) => {
    
    const item = `
        <li class="page-item" >
            <a class="page-link pagin" href="#" aria-label="Previous" data-page="${page}" data-type="prev" >
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
            </a>
        </li>
    `;
    
    return item;
    
}

const nextItem = (page) => {
    
    const item = `
         <li class="page-item">
            <a class="page-link pagin" href="#" aria-label="Next" data-page="${page}"  data-type="next" >
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
            </a>
        </li>
    `;
    
    return item;
    
}


const pagItem = (pagNum,startPage) => {
    
    const item = `
        <li class="page-item ${ pagNum == startPage ? 'active' : '' }" >
            <a class="page-link pagin" href="#" data-page="${pagNum}">
                ${(pagNum+1)}
            </a>
        </li>
    `;
    
    return item;
    
}

export const renderList = (parent,numberOfItems,startPage,howManyShow) => {
    
    let items = '';
    let next = '';
    let prev = '';
    let html = '';
    const howManyPages = Math.ceil(numberOfItems / howManyShow);
    
    if(howManyPages>1) for(let i=0;i<howManyPages;i++) items += pagItem(i,startPage); 
    if(startPage >= 0 && startPage < (howManyPages-1) ) next = nextItem(startPage); 
    if( startPage > 0 && startPage <= (howManyPages-1)) prev = prevItem(startPage); 
  
    html = prev + items + next;
    
    parent.innerHTML = '';
    parent.insertAdjacentHTML('beforeend', html ); 
    
}