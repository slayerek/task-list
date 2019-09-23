import $ from "jquery";
import  'pc-bootstrap4-datetimepicker/build/js/bootstrap-datetimepicker.min.js';
import  'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.min.css';

const taskItem = (parent,type,task_to_do='',time='',done=false,id='') => {
    
    const renderItem = 
    `
        <tr id=${id} data-id="${id}" data-type="${type}" class="drag_elem" draggable="true">
            <th>${(id)}</th>
            <td>
                <input type="text" class="form-control task_to_do" value="${task_to_do}" placeholder="Task to do">
            </td>
            <td style="position:relative">
                <input id="datepicker${ type == 'update' ? id : '' }" width="276" type="text" value="${time}" class="form-control time">
            </td>
            <td>
                <input type="checkbox" class="done" ${done==true ? 'checked' : '' }>
            </td>
            <td>
                <button type="submit" class="btn btn-primary save-task" data-toggle="popover" data-placement="bottom" data-content="Fill task and time, please">
                    Save
                </button>
            </td>
            <td>
                ${ type == 'update' ? '<button type="submit" class="btn btn-danger remove-task" >Remove</button>' : '' }
            </td>
            <td>
                <i class="fa fa-arrows" aria-hidden="true" ></i>
            </td>
        </tr>
        
    `;
    
    parent.insertAdjacentHTML('beforeend', renderItem );
     
}

export const taskLista = (taskList,items) => {
    
    taskList.innerHTML = '';
    
    for(let item of items ){
        taskItem(taskList,'update',item.task,item.time,item.done,item.index);//show row
        $(`#datepicker${item.index}`).datetimepicker({ format : 'DD/MM/YYYY' });
    }
  
}

export const addRow = (taskList,type) => {
    taskItem(taskList,type);//show row
    $(`#datepicker`).datetimepicker({ format : 'DD/MM/YYYY' });
    
}
