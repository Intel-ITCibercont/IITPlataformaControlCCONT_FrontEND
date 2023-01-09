import { Component, Input, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-menu-sharedbuttons',
  templateUrl: './menu-sharedbuttons.component.html',
  styleUrls: ['./menu-sharedbuttons.component.css']
})
export class MenuSharedbuttonsComponent implements OnInit {

  @Input()sharelink: string = '';
  @Input()openPreview: boolean = true;

  constructor(public deviceDetectorService :DeviceDetectorService) { }

  ngOnInit(): void {
  }

}
