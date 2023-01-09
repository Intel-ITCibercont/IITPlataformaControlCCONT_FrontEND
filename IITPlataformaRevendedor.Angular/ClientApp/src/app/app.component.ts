import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import {Title} from "@angular/platform-browser";
import { MatIconCustomService } from './shared/services/mat-icon-custom.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css' ]
})
export class AppComponent implements OnInit {
  

  constructor(
    private iconService: MatIconCustomService,
    private titleService:Title
  ){
    this.titleService.setTitle("Cibercont");
  }



  ngOnInit(){

    setTimeout(function () {
        let viewheight = $(window).height();
        let viewwidth = $(window).width();
        let viewport = document.querySelector("meta[name=viewport]");
        viewport.setAttribute("content", "height=" + viewheight + "px, width=" + viewwidth + "px, initial-scale=1.0");
    }, 300);

    this.iconService.registerIcons();
  
  }

}
