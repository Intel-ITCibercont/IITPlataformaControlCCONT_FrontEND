import { Component, Input, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-list-share-buttons',
  templateUrl: './list-share-buttons.component.html',
  styleUrls: ['./list-share-buttons.component.css']
})
export class ListSharebuttonsComponent implements OnInit {

   @Input() shareLink : string = '';

  constructor( public deviceDetectorService : DeviceDetectorService) { }

  ngOnInit(): void {


  }

}
