import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'todo-body',
  templateUrl: './todo-body.component.html',
  styleUrls: ['./todo-body.component.css']
})
export class TodoBody implements OnInit {
  constructor(private http:HttpClient){
  }
  ngOnInit(){
    this.getTodos()
  }

  inputValue: string = "";
  tasksArray: {
    '_id': string,
    'taskDesc': string,
    'isCompleted': boolean
  }[] = []

  getTodos(){
    this.http.get("http://localhost:3500/todos")
    .subscribe((response:any)=>{
      console.log(response)
      this.tasksArray = response;
    })
  }

  addTask(): void{

    if(this.inputValue.trim() != ""){
      this.http.post(
        "http://localhost:3500/todos",
        {
          'taskDesc':this.inputValue,
          'isCompleted': false
        }
        ).subscribe((res)=>{
          console.log(res)

          let task = {
                '_id':res['insertedId'],
                'taskDesc':this.inputValue,
                'isCompleted': false
            }
        
              this.tasksArray.push(task)
              this.inputValue = "";
          
        })
    }
  }

  completeTask(id: string) :void{
    for(let el of this.tasksArray){
      if(el['_id'] === id){
        this.http.put(
          "http://localhost:3500/todos",
          {
            "todoId" : el['_id'],
            "changeTo" : !el['isCompleted']
          }
          ).subscribe( (data)=>{
            el['isCompleted'] = !el['isCompleted']
          }
          )
          
        break;    
      }
    }
  }

  deleteTask(id: string){
    this.tasksArray = this.tasksArray.filter((el,index)=>{
      if(id == el["_id"]){

        this.http.request('delete',
        "http://localhost:3500/todos",
        { 
          body: { 
            "todoId" : el['_id']
          }
        }).subscribe( (data)=>{
            console.log(data)
          }
          )

        return false
      }
      return true
    })
    

  }

  updateTask(id: string){

  }
}
