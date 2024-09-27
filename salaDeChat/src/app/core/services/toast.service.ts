import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private tost;

  constructor() { 
    this.tost = Swal.mixin({
      toast: true,
      position: "bottom",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      width: "100%",
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }});
  }

  ShowError(errorCode : string)
  {
    switch(errorCode)
    {
      case "auth/invalid-email": 
      this.CreateTost("No tiene el formato email (ejemplo@gmail.com)","error","red");
      break;

      case "auth/email-already-in-use": 
        this.CreateTost("El mail ya existe","error","red");
      break;

      case "auth/weak-password": 
        this.CreateTost("La contraseña debe de tener mas de 6 caracteres","error","red");
      break;

      case "auth/missing-password": 
        this.CreateTost("Falta la contraseña","error","red");
      break;

      case "auth/invalid-credential":
      case "auth/invalid-login-credentials": 
        this.CreateTost("Contraseña o usuario incorrecto","error","red");
      break;
      case "auth/network-request-failed":
        this.CreateTost("Debes estar conectado a internet para ingresar","error","red");
      break;
      case "NV": 
        this.CreateTost("Tienes que verificar el email","error","red");
      break;

      case "AD": 
        this.CreateTost("Te debe  habilitar el administrador para ingresar","error","red")
      break
      case "CI": 
        this.CreateTost("Campos incompletos","error","red");
      break;
      default:
        this.CreateTost("Surgio un error","error","red");
        console.log(errorCode);
      break;
    }
  }
  
  CreateTost(texto : string, icono : SweetAlertIcon, color : string)
  {
    this.tost.fire({icon: icono,
    title: texto,
    background: color,
    color: "white"});
  }
}
