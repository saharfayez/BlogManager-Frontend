import { Component } from '@angular/core';
import { HeaderComponent } from "../../home/header/header.component";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

}
