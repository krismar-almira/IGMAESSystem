import './bootstrap';
import 'flowbite';
import $, { isEmptyObject } from 'jquery';
import { Modal } from 'flowbite';

('use strict');
$(document).on('DOMContentLoaded', function () {
  //#region global function
  function StartLoading() {
    $('#infinite_loading').removeClass('hidden');
  }
  function CloseLoading() {
    if (!$('#infinite_loading').hasClass('hidden'))
      $('#infinite_loading').addClass('hidden');
    //$('#infinite_loading').classList.includes('hidden');
    //$('#infinite_loading').classList.add('hidden');
  }

  $(document).on('click', '.toast_close', function () {
    $(this).parent().remove();
  });
  let ToastValue = [];
  function Toast(status, value) {
    if (ToastValue.length == 0) ToastValue.push({ id: 0, time: new Date() });
    else
      ToastValue.push({
        id: ToastValue[ToastValue.length - 1].id + 1,
        time: new Date(),
      });
    //console.log(ToastValue);
    let _success = `<div id="toast_${
      ToastValue[ToastValue.length - 1].id
    }" class="flex items-center w-full max-w-xs p-4 mb-1 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                        <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                            </svg>
                            <span class="sr-only">Check icon</span>
                        </div>
                        <div class="ms-3 text-sm font-normal">${value}.</div>
                        <button type="button" class="toast_close ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" aria-label="Close">
                            <span class="sr-only">Close</span>
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                        </button>
                    </div>`;
    let _error = `<div id="toast_${
      ToastValue[ToastValue.length - 1].id
    }" class="flex items-center w-full max-w-xs p-4 mb-1 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                      <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
                          </svg>
                          <span class="sr-only">Error icon</span>
                      </div>
                      <div class="ms-3 text-sm font-normal">${value}.</div>
                      <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
                          <span class="sr-only">Close</span>
                          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                          </svg>
                      </button>
                  </div>`;
    let _error2 = `<div id="toast_${
      ToastValue[ToastValue.length - 1].id
    }" class="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                      <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
                          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
                          </svg>
                          <span class="sr-only">Warning icon</span>
                      </div>
                      <div class="ms-3 text-sm font-normal">${value}.</div>
                      <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-warning" aria-label="Close">
                          <span class="sr-only">Close</span>
                          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                          </svg>
                      </button>
                  </div>`;
    if (status == 'success') {
      $('#toaster_id').append(_success);
    }
    if (status == 'error') {
      $('#toaster_id').append(_error);
    }
    if (status == 'error2') {
      $('#toaster_id').append(_error2);
    }
  }
  // toast remover
  setInterval(function () {
    if (ToastValue.length != 0) {
      ToastValue.forEach(function (val, index) {
        if (new Date() - val['time'] > 5000) {
          $(`#toast_${val.id}`).remove();
          ToastValue.splice(index, 1);
        }
      });
    }
  }, 500);

  //confirmation dialog
  const ConfirmaDailog = (action, message, callback) => {
    action = String(action).toUpperCase();
    let _confirm = false;
    $('#confirmation_dialog').html('');
    let content = `<div class="relative p-4 w-full max-w-md max-h-full mb-36">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div class="p-4 md:p-5 text-center">
                            <h2 id="confirm-crud" class="mb-3 font-mono font-semibold text-gray-600">${action}</h2>
                            <h3 id="confirm-content" class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">${message}</h3>
                            <button id="btn-diaglog-cancel"  type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                            <button id="btn-diaglog-confirm" type="button" class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                Yes, I'm sure
                            </button>
                        </div>
                    </div>
                  </div> `;
    $('#confirmation_dialog').html(content);
    $('#confirmation_dialog').removeClass('hidden');
    $(document).one('click', '#btn-diaglog-cancel', (element) => {
      $('#confirmation_dialog').addClass('hidden');
      callback(false);
    });
    $(document).one('click', '#btn-diaglog-confirm', () => {
      confirm = true;
      $('#confirmation_dialog').addClass('hidden');
      $('#confirmation_dialog').html('');
      callback(true);
    });
  };
  //#endregion global function

  //#region 'admin layout'
  let networkError = 'Network error!, Please check your connection';
  let currentLocation = String(window.location.pathname);
  $('a').each(function (i, obj) {
    if ($(obj).attr('href') == currentLocation) {
      obj.classList.replace('text-gray-900', 'text-white');
      obj.classList.replace('hover:bg-gray-100', 'hover:bg-green-100');
      obj.classList.add('bg-green-400');
    }
  });
  //#endregion

  //#region 'configure address page'

  let domIds = ['list_region', 'list_province', 'list_city'];
  if (document.title === 'Configure Address') {
    loadRegion();
    function ClearList(element_id) {
      //logic clearing below balow value if region value is selected province and city should be clear
      for (let i = domIds.indexOf(element_id); i < domIds.length; i++) {
        $(`#${domIds[i]}`)
          .children('li')
          .each(function (index, element) {
            if (element.className.includes('clearable')) {
              element.remove();
            }
          });
      }
    }
    function AddData(data, id) {
      let _toadd = '';
      data.forEach((element) => {
        _toadd += `<li class="clearable w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                      <div class="flex items-center ps-3">
                          <input id="${id}-${element.id}" type="radio" value="${element.id}" name="${id}" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                          <label for="${id}-${element.id}" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">${element.name}</label>
                      </div>
                  </li>`;
      });
      $(`#${id}`).html(_toadd + $(`#${id}`).html());
    }
    function ReloadEventListener() {
      //clear event listener first
      $('input[type=radio][name=list_region]').unbind('change');
      $('input[type=radio][name=list_province]').unbind('change');

      $('input[type=radio][name=list_region]').change(function () {
        console.log(`selected region id: ${this.value}`);
        loadAddressById('province', this.value, 'list_province');
      });
      $('input[type=radio][name=list_province]').change(function () {
        console.log(`selected province id: ${this.value}`);
        loadAddressById('city', this.value, 'list_city');
      });
    }
    function loadRegion() {
      StartLoading();
      $.get('/admin/address/regions', function (data, status) {
        if (status != 'success') {
          alert(networkError);
        } else {
          ClearList('list_region');
          AddData(data, 'list_region');
        }
        CloseLoading();
        ReloadEventListener();
      });
    }
    function loadAddressById(address, id, domId) {
      StartLoading();
      $.get(`/admin/address/${address}/${id}`, function (data, status) {
        if (status != 'success') {
          alert(networkError);
        } else {
          ClearList(domId);
          AddData(data, domId);
        }
        CloseLoading();
        ReloadEventListener();
      });
    }

    $(document).on('click', '.addNew', function () {
      //console.log($(`#input_${this.value}`).val());
      let fk;
      if (this.value == 'province') {
        //if province get fk of region
        fk = $('input[name="list_region"]:checked').val();
        if (fk == undefined) {
          Toast('error', 'Select value from province first!.');
          return;
        }
      }
      if (this.value == 'city') {
        //if city get fk of province
        fk = $('input[name="list_province"]:checked').val();
        if (fk == undefined) {
          Toast('error', 'Select value from region first!.');
          return;
        }
      }
      if ($(`#input_${this.value}`).val() == '') {
        Toast('error', 'Add data first!.');
        return;
      }
      let data = { name: $(`#input_${this.value}`).val(), fk: fk };
      ConfirmaDailog('add', 'Are you sure you want to add this?', (confirm) => {
        if (confirm) {
          addNewAddress(this.value, data);
        } else {
          Toast('error', 'Action canceled.');
        }
      });
      //addNewAddress(this.value, data);
    });
    function addNewAddress(address, data) {
      console.log('added');
      console.log($('meta[name="csrf-token"]').attr('content'));
      $.ajax({
        type: 'POST',
        url: `/admin/address/${address}/add`,
        data: data,
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
        },
        success: function (data) {
          console.log(data);
          addNewFetchData(address, data);
        },
        error: function (data) {
          console.log(data);
        },
      });
    }
    function addNewFetchData(address, data) {
      let idToUse;
      domIds.forEach((val, index) => {
        if (val.includes(address)) idToUse = val;
      });
      AddData([data], idToUse);
      ReloadEventListener();
    }
  }
  //#endregion

  //#region 'department'
  if (document.title === 'Department Settings') {
    // set the modal menu element
    let crud = 'add';
    let department = { id: 0, name: '' };
    const $targetEl = document.getElementById('crud-modal');
    //console.log($targetEl);

    function loadTable(){
      
    }
    
    // options with default values
    const options = {
      placement: 'top',
      backdrop: 'dynamic',
      backdropClasses: 'bg-gray-900/50 dark:bg-gray-900/80 fixed z-40',
      closable: true,
    };

    // instance options object
    const instanceOptions = {
      id: 'crud-modal',
      override: true,
    };
    const modal = new Modal($targetEl, options, instanceOptions);
    //modal.toggle();
    $(document).on('click', '#btn_add_new', () => {
      modal.toggle();
      console.log('btn add new');
      crud = 'add';
      Crud(crud);
    });
    $(document).on('click', '.btn_toggle', () => {
      modal.toggle();
      console.log('btn click');
    });
    $(document).on('click', '#btn_submit', () => {
      //modal.toggle();
      ConfirmaDailog('add', 'Are you sure you wan to add this?', (element) => {
        if (!element) {
          Toast('error', 'Action cancelled.');
        } else {
          Save((success) => {
            if (success) {
              Toast('success', 'Saved successfuly.');
            } else {
              Toast('error', 'Check your input.');
            }
          });
        }
      });
      console.log('btn click');
    });
    function Crud(crud) {
      if (crud === 'add') {
        $('#modal_title').html('New');
        console.log($('#modal_title'));
      } else if (crud === 'edit') {
        $('#modal_title').html('Edit');
      }
    }
    function Save(callback) {
      if (crud === 'add') {
        department['id'] = 0;
        department['name'] = $('#department_name').val();
        console.log(department);
        $.ajax({
          type: 'POST',
          url: `/admin/department/${crud}`,
          data: department,
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
          },
          success: function (data) {
            console.log(data);
            callback(true);
          },
          error: function (data) {
            console.log(data);
            callback(false);
          },
        });
      }
    }
  }
  //
});
