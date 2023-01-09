import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CryptoService } from "src/app/core/services/crypto.service";
import { LocalStorageService } from "src/app/core/services/local-storage.service";
import { RepositoryService } from "src/app/core/services/repository.service";
import { ToastService } from "src/app/shared/services/toast.service";
import { CambiarPassword } from "../models/cambio-password.model";
import { Usuario } from "../models/usuario.model";
import { VerificarContrasenhaAdmin } from "../models/verificar-contrasenha-admin.model";



@Injectable()

export class UsuarioService {

    private readonly KEYLISTAUSUARIOS: string = "LISTA_USUARIOS"

    private listaUsuariosSubject$ = new BehaviorSubject<Usuario[]>([]);
    public listaUsuariosChanged$ = this.listaUsuariosSubject$.asObservable();

    private cargando_listaSubject$ = new BehaviorSubject<boolean>(false);
    public cargando_listaChanged$ = this.cargando_listaSubject$.asObservable();

    constructor(
        private repository: RepositoryService,
        private localStorageService: LocalStorageService,
        private toastService: ToastService,
        private cryptoService: CryptoService
    ) { }


    private construirRuta(ruta: string): string {
        return `api/usuario/${ruta}`;
    }

    obtenerKeyListaUsuarios() {
        return this.KEYLISTAUSUARIOS;
    }

    public obtenerUsuarios () {

        return this.repository.getData(this.construirRuta(`listarTodoSinContrasenha`))

    }
    public listarTodo(recargar: Boolean = false) {
        if (recargar) {
            this.ejecutar_listarTodo();
        } else {
            if (this.localStorageService.validarExistencia(this.obtenerKeyListaUsuarios())) {
                if (this.localStorageService.get(this.obtenerKeyListaUsuarios()) != null) {
                    let lista = this.localStorageService.get<Usuario[]>(this.obtenerKeyListaUsuarios())
                    if (lista.length === 0) {
                        this.ejecutar_listarTodo();
                    } else {
                        this.listaUsuariosSubject$.next(lista);
                    }
                } else {
                    this.ejecutar_listarTodo();
                }
            } else {
                this.ejecutar_listarTodo();
            }
        }
    }

    private ejecutar_listarTodo() {
        this.cargando_listaSubject$.next(true);
        this.repository.getData(this.construirRuta(`listarTodoSinContrasenha`)).subscribe(
            (resultado: any) => {
                //console.log("ejecutar_listarTodo", resultado);
                this.localStorageService.set(this.obtenerKeyListaUsuarios(), resultado.value.valorObjeto);
                this.listaUsuariosSubject$.next(resultado.value.valorObjeto);
                this.cargando_listaSubject$.next(false);
            }, (error: any) => {
                this.asignarListaVaciaALS();
                this.cargando_listaSubject$.next(false);
                this.toastService.error('Error al cargar la lista de usuarios. Intente recargar la página.', '⚠️');
            }
        );
    }

    private asignarListaVaciaALS() {
        this.localStorageService.set(this.obtenerKeyListaUsuarios(), []);
    }

    public guardarCambios(usuario: Usuario) {
        //  console.log("servicio guardarCambios");
        return this.repository.create(this.construirRuta('guardarCambios'), usuario);
    }

    public cambiarContrasenha(cambiarPasswordRecibido: CambiarPassword) {
        // console.log("servicio cambiarPassword");
        let cambiarPassCrypto: CambiarPassword = {
            
            contrasenhaActual: this.cryptoService.encriptarParaBack(cambiarPasswordRecibido.contrasenhaActual),
            contrasenhaNueva: this.cryptoService.encriptarParaBack(cambiarPasswordRecibido.contrasenhaNueva),
        }
        return this.repository.create(this.construirRuta('CambiarContrasenha'), cambiarPassCrypto);
    }

    public verificarContraseñaDeAdministrador( contrasenha : string) {

        let verificarContrasenhaAdmin: VerificarContrasenhaAdmin = {
        
            contrasenha: this.cryptoService.encriptarParaBack(contrasenha),
           
        }
        return this.repository.create(this.construirRuta('verificarContraseñaDeAdministrador'), verificarContrasenhaAdmin);

    }
    public eliminar(codigo: string) {
        //  console.log("servicio eliminar");
        let parametros = new HttpParams().append('codigo', codigo);
        return this.repository.delete(this.construirRuta(`eliminar`), parametros);
    }

}