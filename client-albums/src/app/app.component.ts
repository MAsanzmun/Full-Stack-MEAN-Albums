import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public title: string;
	public description: string;

	constructor(){
		this.title = "APP Albums";
		this.description = "Esta es la descripción de la App para la gestión de albums y fotos.";
	}
}
