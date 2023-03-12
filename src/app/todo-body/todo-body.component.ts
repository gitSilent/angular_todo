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
  inputFileValue: string = "";
  chosenFile: any = "";
  imgSrc: string = "";
  tasksArray: {
    '_id': string,
    'taskDesc': string,
    'isCompleted': boolean,
    'image': string
  }[] = []

  chooseFile(e: any){
    let fileType = e.target.files[0].name.split('.')[e.target.files[0].name.split('.').length -1];
    if(fileType != 'jpg' && fileType != 'jpeg' && fileType != 'png'){
      alert('Неверный тип файла')
      this.inputFileValue = ""
      return
    }else{
      this.chosenFile = e.target.files[0];
      console.log(this.chosenFile)
    }
  }
  getTodos(){
    this.http.get("http://localhost:3500/todos")
    .subscribe((response:any)=>{
      console.log(response)
      this.tasksArray = response;

      // let prefix = `data:image/${response.image['imgName'].split(".")[1]};base64`;
      // // document.getElementById('img').src = `${prefix},${el.data}`;
      // let src = `${prefix},${response.image['src'].data}`

      // this.imgSrc = response.image
    })
  }

  addTask(): void{

    if(this.inputValue.trim() != ""){

      console.log(this.chosenFile)

      let formData = new FormData()
      formData.append('taskDesc', this.inputValue)
      formData.append('isCompleted', 'false')
      formData.append('file', this.chosenFile)

      this.http.post(
        "http://localhost:3500/todos",
        formData
        ).subscribe((res)=>{
          console.log(res)
          
        // if(this.chosenFile){
          
        // }
        //   let task = {
        //         '_id':res['insertedId'],
        //         'taskDesc':this.inputValue,
        //         'isCompleted': false,
        //         'image': ""
        //     }
        
        //       this.tasksArray.push(task)
              this.inputValue = "";
              this.inputFileValue = "";
              this.chosenFile = "";


        this.getTodos()
          
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
