<!-- Actvar .venv -->

Para activar la ejecución de Scripts, ejecutar los siguientes comandos en la terminal de PowerShell con permisos elevados (Administrador)

* El siguiente comando obtiene la directiva de ejecución efectiva:
<!-- Get-ExecutionPolicy -->

* Para obtener todas las directivas de ejecución que afectan a la sesión actual y mostrarlas en orden de precedencia:
<!-- Get-ExecutionPolicy -List -->

* El resultado es similar al siguiente resultado de ejemplo:
<!-- Scope ExecutionPolicy
        ----- ---------------
MachinePolicy       Undefined
   UserPolicy       Undefined
      Process       Undefined
  CurrentUser    RemoteSigned
 LocalMachine       AllSigned -->

 * En este caso, la directiva de ejecución efectiva es RemoteSigned porque la directiva de ejecución del usuario actual tiene prioridad sobre la directiva de ejecución establecida para el equipo local.

Para obtener el conjunto de directivas de ejecución para un ámbito determinado, use el Scope parámetro de Get-ExecutionPolicy.

Por ejemplo, el siguiente comando obtiene la directiva de ejecución para el ámbito CurrentUser :
<!-- Get-ExecutionPolicy -Scope CurrentUser -->

* Para cambiar la directiva de ejecución:
<!-- Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -->

* Para establecer la directiva de ejecución en un ámbito determinado:
<!-- Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -->

* Para quitar la directiva de ejecución de un Scopeobjeto :
<!-- Set-ExecutionPolicy -ExecutionPolicy Undefined -Scope CurrentUser -->

Siguiendo estos pasos podran habilitar la ejecución de Scripts.

* Para activar el .venv ejecutar el siguiente comando:
<!-- .venv/Scripts/Activate.ps1 -->
