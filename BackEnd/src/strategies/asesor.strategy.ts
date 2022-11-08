import { AuthenticationStrategy } from "@loopback/authentication";
import { service } from "@loopback/core";
import { Request, RedirectRoute, HttpErrors } from "@loopback/rest";
import { UserProfile } from "@loopback/security";
import { ParamsDictionary } from "express-serve-static-core";
import parseBearerToken from "parse-bearer-token";
import { ParsedQs } from "qs";
import { AutenticacionService } from "../services";

export class EstrategiaAsesor implements AuthenticationStrategy{
    name: string = 'asesor';

    constructor(
        @service(AutenticacionService)
        public servicioAutenticacion: AutenticacionService
    ){ }
    async authenticate(request: Request): Promise<UserProfile | undefined> {
        let token = parseBearerToken(request);
        if(token){
            let datos = this.servicioAutenticacion.ValidarTokenJWT(token)
            if(datos){
                if(datos.data.rol == "Asesor"){
                    let perfil: UserProfile = Object.assign({
                        nombre: datos.data.nombre,
                    });
                    return perfil;
                }else{
                    throw new HttpErrors[401]('Usted no es asesor')
                }
            }else{
                throw new HttpErrors[401]('El token no sirve')
            }
        }else{
            throw new HttpErrors[401]('No se encuentra token')
        }
    }
}