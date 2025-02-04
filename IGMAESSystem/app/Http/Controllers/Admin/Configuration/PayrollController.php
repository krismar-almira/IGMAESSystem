<?php

namespace App\Http\Controllers\Admin\Configuration;

use stdClass;
use App\Models\User;
use App\Models\Payroll;
use PDF;
use Illuminate\Http\Request;
use App\Models\PayrollEmployee;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Dompdf\Dompdf;
use Psy\CodeCleaner\ReturnTypePass;

class PayrollController extends Controller
{
  function index(){
    return view('admin.payroll.index');
  }
  function save(Request $request){
    $validator = Validator::make($request->all(),[
      'start_date'=>'required|date',
      'end_date'=>'required|date',
      'employees.*.user_id' => 'required',
      'employees.*.salary' => 'required'
    ]);
    if($validator->fails()){
      return response()->json($validator->errors(),401);
    }
    
    $validated_data = $validator->validated();
    $payroll = Payroll::create(['start_date'=>$validated_data['start_date'],
                                'end_date'=>$validated_data['end_date'],
                                 'created_user_id'=>Auth::user()->id]);
    $payrollEmployee = [];
    foreach ($validated_data['employees'] as $employee) {
      $_payrollEmployee=PayrollEmployee::create(['user_id'=>$employee['user_id'],
                              'amount'=>$employee['salary'],
                              'payroll_id'=>$payroll->id]);
      array_push($payrollEmployee, $_payrollEmployee);
    }
    $payroll->payrollEmployee=$payrollEmployee;
    return response()->json($payroll);
  }
  function table(Request $request){
    $datas='';
    $recordsFiltered='';
    $recordsTotal='';
    $arrays=[];
    if($request['search']['value']!=null){
      // $datas = DB::table('products')
      // ->select('products.id','products.location','products.name', 'products.type', DB::raw('SUM(inventories.quantity) as quantity'), 'products.price')
      // ->leftJoin('inventories', 'inventories.product_id','products.id')
      // ->where(function($query) use($request) {
      //     $query->where('products.name', 'like','%'.$request['search']['value'].'%')
      //     ->orWhere('products.type', 'like','%'.$request['search']['value'].'%');
      // })
      // ->where('products.isActive', '<>', 'false')
      // ->offset($request['start'])->limit($request['length'])
      // ->groupBy('products.id')
      // ->get();
      // $recordsFiltered =DB::table('products')
      // ->select('products.name', 'products.type', DB::raw('0 as quantity'), 'products.price')
      // ->where(function($query) use($request) {
      //     $query->where('products.name', 'like','%'.$request['search']['value'].'%')
      //     ->orWhere('products.type', 'like','%'.$request['search']['value'].'%');
      // })
      // ->where('products.isActive', '<>', 'false')
      // ->count();
    }
    else{
      $datas = DB::table('payrolls')
      ->select('payrolls.id','payrolls.start_date','payrolls.end_date', 'users.name as preparedBy')
      ->leftJoin('users','payrolls.created_user_id', 'users.id')
      ->offset($request['start'])->limit($request['length'])
      ->get();
      $recordsTotal = $datas->count();
      $recordsFiltered =$recordsTotal;
    }
    foreach ($datas as $data) {
      $_qrydata = PayrollEmployee::where('payroll_id',$data->id)->get();
      $data->employees = $_qrydata;
    }
    foreach ($datas as $data) {
      $salaryTotal=0;
      foreach($data->employees as $employee){
        $salaryTotal+=$employee->amount;
      }
      array_push($arrays,[$data->id,$data->start_date.' to '.$data->end_date,count($data->employees),$salaryTotal,$data->preparedBy]);
    }
    $val = new stdClass();
    $val->draw = $request['draw']+1;
    $val->recordsTotal = $recordsTotal;
    $val->recordsFiltered = $recordsFiltered;
    $val->data= $arrays;
    return response()->json($val);
    return response()->json($datas);
  }
  function getbyid(Request $request){
    $payroll= Payroll::where('id','=',$request->id)->with('employee.user')->first();
    return response()->json($payroll);
  }
  function report($id){
    $payroll= Payroll::where('id', $id)->with('employee.user', 'createbyuser')->first();
    // $individualpayroll= DB::select(
    //                       'SELECT users.`name`, _i.amount as individual_employee_share, _i.total_employee as number_worker,
    //                           _i.total_employee * _i.amount as total_employee_share, _i.product_name, _i.date_entry
                              
    //                       FROM (
    //                         SELECT 		i.id, i.employer_share/COUNT(gw.inventory_id) as amount, COUNT(gw.inventory_id) as total_employee,
    //                                   i.date_entry, products.`name` as product_name
    //                         from 			inventories i
    //                         LEFT JOIN group_workers gw on i.id = gw.inventory_id
    //                         LEFT JOIN products on products.id = i.product_id
    //                         GROUP BY 	i.id	
    //                         ORDER BY 	i.id) _i	
                            
    //                       LEFT JOIN group_workers gw on gw.inventory_id = _i.id
    //                       LEFT JOIN users on users.id = gw.user_id where _i.date_entry>=? AND  _i.date_entry<=?'
    //                       ,[$payroll->start_date, $payroll->end_date]
    //                     );
    $individualpayroll= DB::select(
                          'SELECT users.id, users.name, products.`name` as product, purchases.date_approve as date_pruchase, purchase_details.count as sold, inventories.quantity, group_workers.employee_share , (purchase_details.count/inventories.quantity) * group_workers.employee_share as salary
                            FROM group_workers
                            LEFT JOIN users ON users.id = group_workers.user_id
                            LEFT JOIN inventories on inventories.id = group_workers.inventory_id
                            LEFT JOIN purchase_details ON group_workers.inventory_id = purchase_details.inventory_id
                            LEFT JOIN purchases ON purchases.id = purchase_details.purchase_id
                            LEFT JOIN products ON inventories.product_id = products.id
                            WHERE purchases.date_approve >= ? AND purchases.date_approve <=?'
                          ,[$payroll->start_date, $payroll->end_date]
                        );
    $data = [
        'title' => 'Payroll',
        'content' => $payroll,
        'actual'=> $individualpayroll
    ];
    //return view('pdf.document', $data);
    // $html = view('pdf.document', $data)->render();
    // $dompdf = new Dompdf();
    // $dompdf->loadHtml($html);
    // $dompdf->setPaper('A4', 'portrait');
    // $dompdf->render();
    // return $dompdf->stream('document.pdf');
    //return $data;
    //return $data;
    // /return view('pdf.document', $data);
    $pdf = PDF::loadView('pdf.document', $data);
       
    return $pdf->download('payroll.pdf');
  }
  function GetInitial(Request $request){
    $validator = Validator::make($request->all(), [
        'startDate' => 'required|date',
        'endDate' => 'required|date',
    ]);
    if($validator->fails()){
      return response()->json('invalid date', 402);
    }
    $users = DB::select(
        'SELECT users.id, users.name, SUM((purchase_details.count/inventories.quantity) * group_workers.employee_share) as salary
          FROM group_workers
          LEFT JOIN users ON users.id = group_workers.user_id
          LEFT JOIN inventories on inventories.id = group_workers.inventory_id
          LEFT JOIN purchase_details ON group_workers.inventory_id = purchase_details.inventory_id
          LEFT JOIN purchases ON purchases.id = purchase_details.purchase_id
          WHERE purchases.date_approve >=? AND purchases.date_approve<=?
          GROUP BY users.`name`, users.id

        '
      ,[$request->startDate, $request->endDate]
    );
    //previous code
    // $users = DB::select(
    //             'SELECT users.id, users.`name`, SUM(_i.amount) as salary
    //                   FROM (
    //                   SELECT 		i.id, i.employer_share/COUNT(gw.inventory_id) as amount, COUNT(gw.inventory_id) as total_employee,
    //                             i.date_entry, products.`name` as product_name
    //                   from 			inventories i
    //                   LEFT JOIN group_workers gw on i.id = gw.inventory_id
    //                   LEFT JOIN products on products.id = i.product_id
    //                   GROUP BY 	i.id	
    //                   ORDER BY 	i.id) _i	
    //             LEFT JOIN group_workers gw on gw.inventory_id = _i.id
    //             LEFT JOIN users on users.id = gw.user_id
    //             where _i.date_entry>=? AND  _i.date_entry<=? and users.name is not null
    //             GROUP BY users.id'
    //           ,[$request->startDate, $request->endDate]
    //         );
    return response()->json($users);
  }
}
