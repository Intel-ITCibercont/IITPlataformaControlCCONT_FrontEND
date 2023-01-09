import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from "@angular/material/stepper";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from "@angular/material/slider";
import { ClipboardModule } from "@angular/cdk/clipboard";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
// import { MatTooltipModule } from '@angular/material/tooltip';
// import { MatChipsModule } from "@angular/material/chips";
// import { MatTreeModule } from "@angular/material/tree";

const MaterialComponents = [
    MatDialogModule, //*modales
    MatFormFieldModule, //*formfields
    MatInputModule, //*inputs
    MatSelectModule, //*selects para los formularios
    MatDatepickerModule, //*datepickers
    MatDividerModule, //*dividers (usados en el navbar)
    MatButtonModule, //*botones
    MatIconModule, //*iconos
    MatTabsModule, //*tabs
    MatSidenavModule, //*menu lateral
    MatCardModule, //*cards
    MatBadgeModule, //*numeritos para notificaciones
    MatToolbarModule, //*menu superior
    MatMenuModule, //*menu de usuario
    MatSnackBarModule, //*snackbar para mensajes en la parte inferior
    MatCheckboxModule, //*checkbox
    MatButtonToggleModule, //*botones toggle
    MatTableModule, //*tablas
    MatPaginatorModule, //*paginator para tablas
    MatStepperModule, //*pasitos para operacion
    DragDropModule, //*drag and drop sirve para mover los dialogs
    MatNativeDateModule, //*Esto es necesario para el uso del datepicker?
    MatSlideToggleModule, //*checkbox en forma de slide
    MatExpansionModule, //*planeles expandibles
    MatProgressBarModule, //*barra de progreso
    MatAutocompleteModule, //*autocompletes
    MatRadioModule, //*radiobutton
    MatSliderModule, //*slider para escoger numero
    ClipboardModule,
    MatInputModule,
    MatTooltipModule,
    MatListModule, //*tooltips
    // MatChipsModule, //*chips pequeños en forma de pastillas
    MatInputModule, //*listas comunes y corrientes
    // MatPseudoCheckboxModule, //???
    // MatTreeModule, //*listas en forma de arboles
];


@NgModule({
    declarations: [],
    imports: [
        HttpClientModule,
        MaterialComponents
    ],
    exports: [
        MaterialComponents
    ],
    entryComponents: []
})
export class AngularMaterialModule { }
