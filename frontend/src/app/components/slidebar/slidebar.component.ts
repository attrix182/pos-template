import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'os-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.scss']
})
export class SlidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
    AOS.refresh();
  }

}
