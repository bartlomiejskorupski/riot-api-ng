import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  @Input() size = 48;
  @Input() thickness = 5;
  @Input() color = '#FFF';

  constructor() { }

  ngOnInit(): void {
  }

}
