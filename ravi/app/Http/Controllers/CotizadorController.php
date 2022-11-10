<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\User;

use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

use DB;

class CotizadorController extends Controller
{
    public function get_cotizador(Request $request) ## Se comprobo
    {

    

        $lista_cotizador=DB::select("
                                    select
                                    p.id_parametro,
                                    p.codigo,
                                    p.parametro,
                                    p.valor_parametro
                                    
                                        from coti.tparametro p
                               
                            ");

        $arrayParametros=[
            'lista_cotizador'=>$lista_cotizador
        ];

        return response()->json($arrayParametros);
    }

    public function eliminar_cotizador($id){ ##Revisamos

      
        db::update('delete from coti.tparametro where id_parametro = ?',[(int)$id]);

        $arrayParametros=[
          'mensaje'=>"ok"
        ];
        return $arrayParametros;
    }


    public function post_cotizador(Request $request){ ## Se comprobo

        $validacion = $this->validar_cotizador($request); 
        //$id_usuario = $request->user()->id;

        if($request->id_parametro==0){
            if((bool)$validacion["validacion"]==true){
                
                DB::insert('insert into coti.tparametro (codigo,parametro,valor_parametro)values(?,?,?)',[$request->codigo,$request->parametro,$request->valor_parametro]);
            }
        }
        else{
            if((bool)$validacion["validacion"]==true){
                DB::update('update coti.tparametro set codigo = ?, parametro =?, valor_parametro =? where id_parametro = ? ',
                [$request->codigo,$request->parametro,$request->valor_parametro,(int)$request->id_parametro]);                
            }
        }

        $arrayParametros=[
        'mensaje'=>$validacion["mensaje"],
        'validacion'=>$validacion["validacion"]
        ];

        return response()->json($arrayParametros);  
    }


    public function validar_cotizador($request){ ##Revisamos
        $mensaje=[];
        $validacion=true;


        $arrayParametros=[
        'mensaje'=>$mensaje,
        'validacion'=>$validacion
        ];

        return $arrayParametros;
    }


    public function enviar_correo(){ ##Revisamos

        $validacion = $this->validar_envio_correo(); 
        $bat_path = 'D:/etl_test.bat';
        exec('D:\pdi-ce-9.3\Kitchen.bat  -file="D:\test_job.kjb"', $output);
        //exec('D:\etl_test.bat 2>&1', $output);
        //print_r($output);
        
        //system ( 'D:\etl_test.bat' );
        //exec('c:\WINDOWS\system32\cmd.exe /c START D:\etl_test.bat');
        //echo exec('D:\etl_test.bat');
        // echo exec('start /B D:\etl_test.bat');
         //echo exec('cmd /c D:\etl_test.bat');
        
        $arrayParametros=[
            'mensaje'=>$validacion["mensaje"],
            'validacion'=>$validacion["validacion"],
            'salida' =>$output
            ];

        return $arrayParametros;
    }
    public function validar_envio_correo(){ ##Revisamos
        $mensaje=[];
        $validacion=true;


        $arrayParametros=[
        'mensaje'=>$mensaje,
        'validacion'=>$validacion
        ];

        return $arrayParametros;
    }



}