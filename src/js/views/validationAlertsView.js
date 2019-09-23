import { elements } from '../views/elements';
import $ from "jquery";

export const validMessage = (parent,infoType) => {
    
    let messageText = '';
    let className = '';
    let refresh = false;
    
    switch(infoType){
        case 'emptyTaskFields' :
            messageText = 'Fill fields: task and time, please'; 
            className = 'danger';
        break;    
        case 'saveTask' :
            messageText = 'Task has been saved';  
            className = 'success';
            refresh = true;
        break;    
        case 'removeTask' :
            messageText = 'Task has been removed';   
            className = 'warning';
            refresh = true;
        break;       
    }
    
    const renderItem = `
        <div class="alert alert-${className}" role="alert">
             ${messageText}
        </div>
    `;
                
    parent.innerHTML = '';
    parent.insertAdjacentHTML('beforeend', renderItem );           
    $(`.alert-${className}`).delay(200).show('slow').delay(2000).hide('slow');            
    
    if(refresh) setTimeout( ()=>{ location.reload(); },2200);

}
