import 'bootstrap';//js
import 'bootstrap/dist/css/bootstrap.min.css';//css
import css from '../css/style.css';//moje css
//import axios from 'axios';//library to use promises , default fetch api in browsers does not work for IE
import 'font-awesome/css/font-awesome.min.css';

 
/*views*/
import { elements } from './views/elements';
import * as taskView from './views/taskView';
import * as validAlertsView from './views/validationAlertsView';
import * as pagView from './views/paginationView';

/*models*/
import { Task } from './models/Task';
import { ShowItems } from './models/ShowItems';
import { Sort } from './models/Sort';

/*helpers functions*/
import * as helpers from './helpers';


const state = {};

const ctrlTaskList = () => {
    
    const taskList = elements.tasklist.getElementsByTagName('tbody')[0];
    const alertMess = elements.validationMessages;
    state.task = new Task();
    state.addRow = elements.addtask;
    
    state.addRow.addEventListener('click', (evt) => {
        
        taskView.addRow(taskList,'add');
        state.addRow.style.display = 'none';//hide addTask button
        
    });
    
    
    taskList.addEventListener('click', (evt) => {//ADD NEW TASK AND UPDATE EXIST TASK
        
        if( helpers.matches(evt.target,'.save-task') ){
            
            const trRow = evt.target.parentElement.parentElement;
            const type = trRow.getAttribute('data-type');
            const task_to_do = trRow.getElementsByClassName("task_to_do")[0].value;
            const time = trRow.getElementsByClassName("time")[0].value;
            const done = trRow.getElementsByClassName("done")[0].checked === true ?  true : false;

            if(type=='add' && task_to_do != '' && time != ''){
                
                state.task.addItem(task_to_do,time,done);
                validAlertsView.validMessage(alertMess,'saveTask');
                  
            }else if(type=='add' && ( task_to_do == '' || time == '')){
                validAlertsView.validMessage(alertMess,'emptyTaskFields');
            }
            
            if(type=='update' && task_to_do != '' && time != ''){
                
                const id = trRow.getAttribute('data-id');
                state.task.updateItem(task_to_do,time,done,id);
                validAlertsView.validMessage(alertMess,'saveTask');
                
            }else if(type=='update' && ( task_to_do == '' || time == '' )){
                validAlertsView.validMessage(alertMess,'emptyTaskFields');
                
            }
            
        }
        
    });
    
     taskList.addEventListener('click', (evt) => {//REMOVE EXISTS TASK
        
        if( helpers.matches(evt.target,'.remove-task') ){
            
            const remove = confirm("Remove task?");
            const trRow = evt.target.parentElement.parentElement;
            const id = trRow.getAttribute('data-id');
            
            if (remove == true) {
                state.task.removeItem(id);
                validAlertsView.validMessage(alertMess,'removeTask');
            }
                
        }
        
    });
        
}//ctrlTaskList



const ctrlPag = () => {
    
    const pagNumLength = state.task.getItemsLength();
   
    if(pagNumLength){
        
        const parent = elements.pagination;
        const howManyShow = state.showItems.getItems() == null ? 3 : state.showItems.getItems();
        const startPage = 0;
        const taskList = elements.tasklist.getElementsByTagName('tbody')[0];
        const items = state.task.getItems();
        let newItems = items.slice(startPage*howManyShow,(startPage*howManyShow)+howManyShow);
        
        
        taskView.taskLista(taskList,newItems);
        pagView.renderList(parent,pagNumLength,startPage,howManyShow);
        
        parent.addEventListener('click',(evt)=>{
            
            const elem = helpers.closest('pagin',evt.target);
            
            if(elem){
            
                let pageNumber = elem.getAttribute('data-page')
                const type =  elem.getAttribute('data-type');
                
                if(type=='next') ++pageNumber;
                else if(type=='prev') --pageNumber;
                 
                newItems = items.slice(pageNumber*howManyShow,(pageNumber*howManyShow)+howManyShow);
                taskView.taskLista(taskList,newItems);
                pagView.renderList(parent,pagNumLength,pageNumber,howManyShow);

                state.addRow.style.display = 'block';
              
            }//if
       
        });
    
     }//if tasks exist
    
}

const ctrlShowItems = () => {
    
    state.showItems = new ShowItems();
    const showItems = elements.showItems;
    const options = Array.from(showItems.children);
    let firstOption = showItems.children[0];
    let val;
    
    if( state.showItems.getItems() == null ) firstOption.setAttribute('selected','selected');
    else val = state.showItems.getItems();
    
    const index = state.showItems.findIndex(options,val);
    
    
    if(index > 0){
        firstOption.removeAttribute('selected');
        options[index].setAttribute('selected','selected');
    }
    
    showItems.addEventListener('change',(evt)=>{
        
        const elem = evt.target;    
        const val = (elem.value=='all') ? state.task.getItemsLength() : parseInt(elem.value);
        state.showItems.setItems(val);
        location.reload();
        
    });
    
}

const ctrlSortuj = () => {
    
    state.sort = new Sort();
    const sortuj = elements.sortuj;
    const options = Array.from(sortuj.children);
    let firstOption = sortuj.children[0];
    let val;
    
    state.sort.getActiveOpt() == null ? firstOption.setAttribute('selected','selected') : val = state.sort.getActiveOpt();
    
    const index = state.sort.findIndex(options,val);
    
    
    if(index > 0){
        firstOption.removeAttribute('selected');
        options[index].setAttribute('selected','selected');
    }
    
    sortuj.addEventListener('change',(evt)=>{
        
        const elem = evt.target;
        const val = elem.value;
        const items = state.task.getItems();
        const newItems = state.sort.sortElem(items,val);
        
        state.task.setItems(newItems);
        state.sort.saveActiveOpt(val);
        location.reload();
       
    });
    
    
}    


const ctrlDragDrop = () => {
    
    const taskList = elements.tasklist.getElementsByTagName('tbody')[0];
    
    taskList.addEventListener( 'dragstart' , (evt) => {
		
        const elem = evt.target;

        elem.classList.add('activeDrag');
        
        if( helpers.matches(elem,'.drag_elem') ){
            evt.dataTransfer.setData("text", JSON.stringify({ id: evt.target.id , offset : elem.offsetTop }));
        }

    });
    
    taskList.addEventListener('dragenter', (evt) => {
		
        const parent = evt.target.parentNode;

        if(!parent.classList.contains('activeDrag') && parent.nodeName == 'TR'){

                const tablica = Array.from(taskList.children);

                for( let tr of tablica ) tr.style.background = 'none';

                parent.style.background = 'grey';

        }

    });
 
 
    taskList.addEventListener( 'dragover' , (evt) => {
        evt.preventDefault();
    });
    
    taskList.addEventListener( 'drop' , (evt) => {
		
        evt.preventDefault();

        const elem = evt.target;
        
        if( helpers.matches(elem.parentNode,'.drag_elem') ){

            const data = JSON.parse(evt.dataTransfer.getData("text"));
            const tablica = taskList;
            const newEl = document.getElementById(data.id);
            const currEl = evt.target.parentNode;
            const oldOffset = data.offset;
            const newOffset = evt.target.offsetTop;

            ( oldOffset > newOffset ) ? tablica.insertBefore( newEl , currEl ) : tablica.insertBefore(newEl, currEl.nextSibling);

            currEl.style.background = 'none';

            let items = state.task.getItems();
            const currElId = state.task.findIndex(currEl.getAttribute('data-id'));
            const newElId = state.task.findIndex(newEl.getAttribute('data-id'));
            const currElFromArr = items[currElId];

            items.splice( currElId , 1 , items[newElId] );
            items.splice( newElId , 1 , currElFromArr );
            
            state.task.setItems(items);
            state.sort.saveActiveOpt('index_default');
            location.reload();
       
        }

    });
    
    
}




ctrlTaskList();

if(state.task.getItems()){
    ctrlShowItems();
    ctrlPag();
    ctrlSortuj();
    ctrlDragDrop();
}
 

 
 