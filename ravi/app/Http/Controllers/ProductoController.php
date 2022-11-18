<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\User;

use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

use DB;

class ProductoController extends Controller
{
    public function get_producto(Request $request) ## Se comprobo
    {

    

        $lista_producto=DB::select("
        with recursive  agrupador as (
            select

                p.id_producto,
                p.id_producto_padre,
                p.codigo_simec,
                p.codigo_delta,
                p.nombre_producto,
                p.id_producto::text as orden,
                0 as lvl,
                p.es_agrupador
            from alm.tproducto p
            where p.id_producto_padre is null

            union all

            select
                p.id_producto,
                p.id_producto_padre,
                p.codigo_simec,
                p.codigo_delta,
                p.nombre_producto,
                a.orden||'->'||p.id_producto as orden,
                a.lvl+1 as lvl,
                p.es_agrupador
            from alm.tproducto p
            join agrupador a on a.id_producto = p.id_producto_padre

            ), max_lvl as (
                  select max(p.lvl) as nivel_max
                  from agrupador p
            )
            select
                a.id_producto,
                a.id_producto_padre,
                a.codigo_simec,
                a.codigo_delta,
                a.nombre_producto,
                a.orden,
                a.lvl,
                l.nivel_max,
                a.es_agrupador

             from agrupador a
             left join max_lvl l on 1=1
            order by a.orden asc                           
                            ");

        $arrayParametros=[
            'lista_producto'=>$lista_producto
        ];

        return response()->json($arrayParametros);
    }




}