import { Component, Input, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  standalone: true,
})
export class SpinnerComponent  implements OnInit {

  @Input() isLoading! : boolean;

  constructor() { }

  ngOnInit() {}

}
