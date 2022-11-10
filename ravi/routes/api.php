<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\LoginController;
use App\Http\Controllers\PersonaController;
use App\Http\Controllers\CotizadorController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('register', [LoginController::class, 'register']);
Route::post('login', [LoginController::class, 'login']);
Route::post('iniciar_sesion', [LoginController::class, 'iniciar_sesion']);

Route::group([
    'prefix' => 'auth'
], function () {
    
    Route::group([
      'middleware' => 'auth:api'
    ], function() {
        // Route::get('get_menu', [LoginController::class, 'get_menu']);
         Route::get('cerrar_sesion', [LoginController::class, 'cerrar_sesion']);
        Route::get('get_usuarios', [LoginController::class, 'get_usuarios']);
        // Route::get('get_usuario/{id}', [LoginController::class, 'get_usuario']);
        Route::post('post_usuario', [LoginController::class, 'post_usuario']);
        Route::get('eliminar_usuario/{id}', [LoginController::class, 'eliminar_usuario']);

    });
});

Route::group([
    'prefix' => 'persona'
], function () {
    
    Route::group([
      'middleware' => 'auth:api'
    ], function() {
        Route::get('get_personas', [PersonaController::class, 'get_personas']);
        Route::get('eliminar_persona/{id}', [PersonaController::class, 'eliminar_persona']);
        Route::post('post_persona', [PersonaController::class, 'post_persona']);

    });
});

Route::group([
    'prefix' => 'cotizador'
], function () {
    
    Route::group([
      'middleware' => 'auth:api'
    ], function() {
        Route::get('get_cotizador', [CotizadorController::class, 'get_cotizador']);
        Route::get('eliminar_cotizador/{id}', [CotizadorController::class, 'eliminar_cotizador']);
        Route::post('post_cotizador', [CotizadorController::class, 'post_cotizador']);
        Route::get('enviar_correo', [CotizadorController::class, 'enviar_correo']);

    });
});
