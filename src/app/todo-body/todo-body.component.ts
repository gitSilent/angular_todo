import { Component } from '@angular/core';

@Component({
  selector: 'todo-body',
  templateUrl: './todo-body.component.html',
  styleUrls: ['./todo-body.component.css']
})
export class TodoBody {
  inputValue: string = "";
  tasksArray: {
    'taskDesc': string,
    'isCompleted': boolean
  }[] = []

  addTask(): void{
    this.tasksArray.push(
      {
        'taskDesc':this.inputValue,
        'isCompleted': false
    }
      )
    console.log(this.tasksArray)
  }

  completeTask(id: number): void{
    this.tasksArray[id].isCompleted = !this.tasksArray[id].isCompleted 
  }

  deleteTask(id: number){
    this.tasksArray = this.tasksArray.filter((el,index)=>{
      return id != index
    })
  }
}
