import { NgModule } from "@angular/core";
import { DxDataGridModule } from "devextreme-angular/ui/data-grid";


const DevExtremeComponents = [
    DxDataGridModule,
    // DxChartModule,
];

@NgModule({
    declarations: [],
    imports: [...DevExtremeComponents],
    exports: [...DevExtremeComponents]
})
export class AngularDevExtremeModule { }
