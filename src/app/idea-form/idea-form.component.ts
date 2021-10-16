import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IdeaService } from '../services/idea.service';

@Component({
  selector: 'app-idea-form',
  templateUrl: './idea-form.component.html',
  styleUrls: ['./idea-form.component.css']
})
export class IdeaFormComponent implements OnInit {
  
  constructor(private ideaService: IdeaService) { }

  ideaForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    tags: new FormControl('')
  });


  ngOnInit(): void {
  }

  onSubmit() {
    const ideaData = {...this.ideaForm.value};
    this.ideaService.addIdea(ideaData);
  }
}
