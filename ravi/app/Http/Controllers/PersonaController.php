<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\User;

use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

use DB;

class PersonaController extends Controller
{
    public function get_personas(Request $request) ## Se comprobo
    {

         if($this->es_admin($request->user()->id)==true){
             $ids=" 0=0 ";
         }else{
             $ids=" us.id in (".$request->user()->id.")";
         }

        $lista_personas=DB::select("
                                select
                                    p.id_persona,
                                    p.nombre,
                                    p.apellido_paterno,
                                    p.apellido_materno,
                                    p.ci,
                                    p.celular,
                                    p.estado
                                from segu.tpersona p
                                left join users us on us.id_persona = p.id_persona

                                 where  ".$ids." and p.estado = ?
                               
                            ",["activo"]);

        $arrayParametros=[
            'lista_personas'=>$lista_personas
        ];

        return response()->json($arrayParametros);
    }

    public function eliminar_persona($id){ ##Revisamos
        db::update('update segu.tpersona set estado=?, fecha_mod = now() where id_persona=? ',["inactivo",$id]);

        $arrayParametros=[
          'mensaje'=>"ok"
        ];
        return $arrayParametros;
    }


    public function post_persona(Request $request){ ## Se comprobo

        $validacion = $this->validar_persona($request); 
        $id_usuario = $request->user()->id;

        if($request->id_persona==0){
            if((bool)$validacion["validacion"]==true){
                
                DB::insert('insert into segu.tpersona (nombre,apellido_paterno,apellido_materno,ci,estado,fecha_reg,id_usuario_reg,celular)  values (?,?,?,?,?,now(),?,?)',[$request->nombre,$request->apellido_paterno,$request->apellido_materno,$request->ci,"activo",$id_usuario,$request->celular]);
            }
        }
        else{
            if((bool)$validacion["validacion"]==true){
                DB::update('update segu.tpersona set nombre=?,apellido_paterno=?,apellido_materno=?,ci=?,fecha_mod=now(),id_usuario_mod=?,celular=? where id_persona=? ',
                [$request->nombre,$request->apellido_paterno,$request->apellido_materno,$request->ci,$id_usuario,$request->celular,$request->id_persona]);                
            }
        }

        $arrayParametros=[
        'mensaje'=>$validacion["mensaje"],
        'validacion'=>$validacion["validacion"]
        ];

        return response()->json($arrayParametros);  
    }


    public function validar_persona($request){ ##Revisamos
        $mensaje=[];
        $validacion=true;

        if($request->id_persona!=0){

            $duplicado_ci=DB::select('select 
                                      count(*) as cantidad  
                                      from segu.tpersona p 
                                      where  TRIM(upper(p.ci))=TRIM(upper(?)) and p.id_persona != ? and p.estado=? ',[$request->ci,$request->id_persona,"activo"]);
            if((int)($duplicado_ci[0]->cantidad)>0){
                array_push($mensaje,'El campo Cedula de Identidad ya esta registrado');
                $validacion=false;
            }

           
        }
        else{

            $duplicado_ci=DB::select('select 
                                      count(*) as cantidad  
                                      from segu.tpersona p
                                      where  TRIM(upper(p.ci))=TRIM(upper(?))  and p.estado=? ',[$request->ci,"activo"]);

            if((int)($duplicado_ci[0]->cantidad)>0){
                array_push($mensaje,'El campo Cedula de Identidad ya esta registrado');
                $validacion=false;
            }

           

        }


        $arrayParametros=[
        'mensaje'=>$mensaje,
        'validacion'=>$validacion
        ];

        return $arrayParametros;
    }


}