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

  putTask(task: any){
    this.http.put("http://localhost:3500/todos",task)
    .subscribe((response)=>{
      console.log(response)
    })
  }

  addTask(): void{
    if(this.inputValue.trim() != ""){
      
      let task = {
        'taskDesc':this.inputValue,
        'isCompleted': false
    }

      this.tasksArray.push(task)
      this.inputValue = "";

      this.putTask(task)
    }
  }

  completeTask(id: number) :void{
    this.tasksArray[id].isCompleted = !this.tasksArray[id].isCompleted 
  }

  deleteTask(id: number){
    this.tasksArray = this.tasksArray.filter((el,index)=>{
      return id != index
    })
  }
}
