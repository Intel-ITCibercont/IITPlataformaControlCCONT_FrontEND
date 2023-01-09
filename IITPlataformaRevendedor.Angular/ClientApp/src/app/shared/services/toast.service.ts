
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

interface GenericMessage {
    type: number;
    hasErrors: boolean;
    hasWarnings: boolean;
    messages: any[];
}
export enum GenericMessageType {
    Info = 1,
    Warning = 2,
    Error = 3,
}

@Injectable({
    providedIn: 'root',
})
export class ToastService {

    constructor(
        private snackBar: MatSnackBar
    ) {
    }

    success = (msg: any, closeLabel = 'Cerrar', config: MatSnackBarConfig = null!) => {
        this.snackBar.open(msg, closeLabel, { panelClass: 'success', duration: 2000, ...config });
    }

    warning = (msg: any, closeLabel = 'Cerrar', config: MatSnackBarConfig = null!) => {
        this.snackBar.open(msg, closeLabel, { panelClass: 'warning', duration: 1000, ...config });
    }

    error = (msg: any, closeLabel = 'Cerrar', config: MatSnackBarConfig = null!) => {
        this.snackBar.open(msg, closeLabel, { panelClass: 'error', duration: 2000, ...config });
    }

    info = (msg: any, closeLabel = 'Cerrar', config: MatSnackBarConfig = null!) => {
        this.snackBar.open(msg, closeLabel, { panelClass: 'info', duration: 1000, ...config });
    }

    dismiss = () => {
        this.snackBar.dismiss();
    }

    show = (resp: GenericMessage) => {
        if (resp.hasErrors) {
            this.snackBar.open(resp.messages.map(x => x.message).join(', '), 'Cerrar', { panelClass: 'error' });
        } else if (resp.hasWarnings) {
            this.snackBar.open(resp.messages.map(x => x.message).join(', '), 'Cerrar', { panelClass: 'warning' });
        } else {
            this.snackBar.open(resp.messages.map(x => x.message).join(', '), 'Cerrar', { panelClass: 'info' });
        }
    }

}
