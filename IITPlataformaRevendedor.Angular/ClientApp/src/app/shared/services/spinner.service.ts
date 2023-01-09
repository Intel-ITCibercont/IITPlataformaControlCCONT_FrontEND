import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(
    private ngxSpinnerService: NgxSpinnerService
  ) {

  }

  showSquareFullScreen(name: string) {
    return this.ngxSpinnerService.show(name,
      {
        size: "large",
        color: "#008aca",
        bdColor: "rgba(0,0,0,0.7)",
        fullScreen: true,
        type: "custom"
      });
  }

  showLineScaleDialog(name?: string) {
    if (name === undefined) {
      return this.ngxSpinnerService.show(undefined,
        {
          type: 'line-scale',
          size: 'medium',
          bdColor: 'rgba(255,255,255,0.6)',
          color: '#008aca',
          fullScreen: false,
        });
    }
    else {
      return this.ngxSpinnerService.show(name,
        {
          type: 'line-scale',
          size: 'medium',
          bdColor: 'rgba(255,255,255,0.6)',
          color: '#008aca',
          fullScreen: false,
        });
    }
  }

  hide(name: string) {
    return this.ngxSpinnerService.hide(name);
  }

}
