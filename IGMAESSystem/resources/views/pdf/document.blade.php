<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{ $title }}</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      .text-xs {
        font-size: 0.5rem;
        line-height: 0.5rem;
      }
      .text-sm {
        font-size: 0.4rem;
        line-height: 0.5rem;
      }
      .text-base {
        font-size: 0.8rem;
        line-height: 0.5rem;
      }
      .text-left {
        text-align: left;
      }
      .text-right {
        text-align: right;
      }
      .text-gray-500 {
        color: #6b7280;
      }
      .text-gray-700 {
        color: #374151;
      }
      .text-gray-900 {
        color: #111827;
      }
      .dark {
        /* Dark mode colors */
      }
      .bg-gray-100 {
        background-color: #f3f4f6;
      }
      .bg-gray-700 {
        background-color: #374151;
      }
      .bg-gray-800 {
        background-color: #1f2937;
      }
      .bg-white {
        background-color: #ffffff;
      }
      .uppercase {
        text-transform: uppercase;
      }
      .font-medium {
        font-weight: 500;
      }
      .font-semibold {
        font-weight: 600;
      }
      .whitespace-nowrap {
        white-space: nowrap;
      }
      .rounded-s-lg {
        border-top-left-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;
      }
      .rounded-e-lg {
        border-top-right-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
      }
      .px-6 {
        padding-left: 1.5rem;
        padding-right: 1.5rem;
      }
      .py-3 {
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
      }
      .relative {
        position: relative;
      }
      .overflow-x-auto {
        overflow-x: auto;
      }
      .w-full {
        width: 100%;
      }
      
    </style>
  </head>
  <body style="padding: 20px; align-items:end;">
    @foreach ($content->employee as $_content)
    <div style="page-break-after: always;">
    <div style="width: 100%; padding: 20px; display: flex; justify-content: space-between; font-family: 'Courier New', Courier, monospace;">
      <h2 style="display: inline-block" class="text-gray-700">{{ $title }}</h1>
      <h5 style="display: inline-block;" class="text-gray-700">Date: {{$content->start_date}} - {{$content->end_date}}</h5>
    </div>
  
    <h6>Employee: {{$_content->user->name}}</h6>
    <table>
      <div class="relative overflow-x-auto">
        <table
          class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          <thead
            {{-- class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400" --}}
          >
            {{-- <tr>
              <th scope="col" class="px-6 py-3">{{$_content->user->name}}</th>
            </tr> --}}
          </thead>
          <tbody>
            <tr class="bg-white dark:bg-gray-800">
              {{-- <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                
              </th> --}}
              <td class="px-6 py-4">
                <table class='absolute'>
                  <thead style="" class="text-gray-700 bg-gray-100 ">
                    <tr>
                      <th scope="col" class="px-6 py-3 rounded-s-lg ">
                        Product Name
                      </th>
                      <th scope="col" class="px-6 py-3">Date Purchase</th>
                      <th scope="col" class="px-6 py-3">Quantity Sold</th>
                      <th scope="col" class="px-6 py-3">Total Quantity</th>
                      <th scope="col" class="px-6 py-3">Employee Share / Inventory</th>
                      <th scope="col" class="px-6 py-3 rounded-e-lg">Share (Quantity Sold/Total Quantity)*Employee Share</th>
                    </tr>
                  </thead>
                  <tbody>
                    @foreach($actual as $_actual)
                    @if($_actual->name===$_content->user->name)
                    <tr>
                      <td style="text-align: center">{{$_actual->product}}</td>
                      <td style="text-align: center">{{$_actual->date_pruchase}}</td>
                      <td style="text-align: center">{{$_actual->sold}}</td>
                      <td style="text-align: center">{{$_actual->quantity}}</td>
                      <td style="text-align: center">{{$_actual->employee_share}}</td>
                      <td style="text-align: center">{{$_actual->salary}}</td>

                      {{-- <td style="display: flex; justify-content: end;">{{number_format((float)$_actual->employee_share, 2, '.', '')}}</td> --}}
                    </tr>
                    @endif @endforeach
                  </tbody>
                  <tfoot>
                    <tfoot>
                      <tr class="font-semibold text-gray-900 dark:text-white">
                        <th style="text-align: center">total</th>
                        <td></td>
                        <td ></td>
                        <td></td>
                        <td></td>
                        <td style="text-align: center">Php. {{$_content->amount}}</td>
          
                      </tr> 
                    </tfoot>
                  </tfoot>
                </table>
              </td>
              {{-- <td class="px-6 py-4">Php. {{$_content->amount}}</td> --}}
            </tr>           
          </tbody>
          {{-- <tfoot>
            <tr class="font-semibold text-gray-900 dark:text-white">
              <th scope="row" class="px-6 py-3 text-base">Total</th>
              <td class="px-6 py-3"></td>
              <td class="px-6 py-3"></td>
              <td class="px-6 py-4">Total Php. {{$_content->amount}}</td>

            </tr> 
          </tfoot> --}}
          
        </table>
        <div style="margin-top: 30px;">
          <div style="width: 100%; display: flex; justify-content: space-between;">
            <span class="text-base" style="display: flex; flex-direction: column;">
              Prepared by:
              <a style="margin-top: 30px;">
                {{$content->createbyuser->name}}
              </a>
            </span>
            <span class="text-base" style="display: flex; flex-direction: column; margin-right: 10px; margin-top: 30px;">
              Authorize Signature:
              <a style="margin-top: 30px;">
                _______________________
              </a>
            </span>
          </div>
        </div>
      </div>
    </table>
    </div>
   @endforeach

  </body>
</html>
