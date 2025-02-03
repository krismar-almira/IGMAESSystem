'use strict';

import { getInventoryId, isInvalidValue } from "../common/helper.js";
$(function () {
  let crudMode;
  let crudId;
  let firstrun = true;
  let maxQuantityPurchase=0;
  let currentData = 0;
  const userlevel =  $('#user_level').html();
  let selectedData = {};
  init();
  function init(){
    if(userlevel=='Admin'||userlevel=='SA') return;
    
    
  }
  const openModal = () => {
    $('#crud_modal').removeClass('hidden1');
  };
  const closeModal = () => {
    $('#crud_modal').addClass('hidden1');
  };
  const openReturnReq = () => {
    $('#modal_request_return').removeClass('hidden1');
  };
  const closeReturnReq = () => {
    $('#modal_request_return').addClass('hidden1');
  };
  const openModalPreview = () => {
    $('#modal_preview').removeClass('hidden1');
  };
  const closeModalPreview = () => {
    $('#modal_preview').addClass('hidden1');
  };
  $('#btn_modal_close_return_req').on('click',()=>{closeReturnReq()})
  $('#btn_request_return').on('click',()=>{openReturnReq()});
  const addNew = () => {
    $('#modal_title').html('New');
    $('#btn_submit_modal').html('Save');
    $('#frm_modal')[0].reset();
    crudMode = 'add';
    $('.product_select').val(null).trigger('change');
    openModal();
  };
  const formData = {
    
  };
  $('#btn_add_new').on('click', function () {
    addNew();
  });
  $('#btn_modal_close').on('click', () => {
    closeModal();
  });
  $('#btn_modal_close_preview').on('click', ()=>{
    closeModalPreview();
  });
  //initalize select2
  $('.product_select').select2({
    //tags: true,
    dropdownPosition: 'below',
    ajax: {
      method: 'get',
      url: '/admin/product/getbynamesearch/',
      dataType: 'json',
      processResults: function (data) {
        return {
          results: $.map(data, function (item) {
            return {
              text: item.name,
              id: item.id,
            };
          }),
        };
      },
    },
  });
  
  $('#partner_store_select').select2({
    //tags: true,
    dropdownPosition: 'below',
    ajax: {
      method: 'get',
      url: '/admin/user/getUserSearch/',
      dataType: 'json',
      processResults: function (data) {
        return {
          results: $.map(data, function (item) {
            return {
              text: item.name,
              id: item.id,
            };
          }),
        };
      },
    },
  });
  const selectElem = $('.product_select').on('select2:selecting',function(e){
    StartLoading();
    const id = e.params.args.data.id;
    $.get('/admin/purchase/inventoryavail/'+id, function(res){
      loadInventory(res);
      currentData = res;
      CloseLoading();
    });
  });
  function loadInventory(__data){
    console.log(__data)
    let htmlToAdd = '';
    console.table(__data);
    $('#inventoryAvailable').html(htmlToAdd);
    __data.forEach(x=>{
      htmlToAdd+=`<li class="pb-3 sm:pb-4">
                    <div class="flex items-center space-x-4 rtl:space-x-reverse">
                        <div class="flex-shrink-0">
                          <img class="w-8 h-8 rounded-full" src="/${x.location}">
                        </div>
                        <div class="flex-1 min-w-0">
                          <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                              ${x.name}
                          </p>
                          <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                              ${getInventoryId(x.id)}
                          </p>
                        </div>
                        <div class="inline-flex text-gray-500 items-center text-base font-semibold dark:text-white">
                          ${x.quantity}
                        </div>
                        <div class="inline-flex text-gray-500 items-center text-base font-semibold dark:text-white">
                          ${x.sold}
                        </div>
                        <div class="inline-flex text-orange-500 items-center text-base font-semibold dark:text-white">
                          ${x.pending}
                        </div>
                        <div data-id=${x.id} class="product-avail inline-flex text-green-500 items-center text-base font-semibold dark:text-white">
                          ${x.available}
                        </div>
                    </div>
                  </li>`
    });
    $('#inventoryAvailable').html(htmlToAdd);
    let totalAvail = 0;
    $('.product-avail').each(function(){
      totalAvail += parseInt($(this).html());
    });
    console.log(totalAvail);
    $('.total-available').html(totalAvail);
  }
  
  
  // var dropdownParentEl = $('#addModal > .modal-dialog > .modal-content');
  // selectBoxElem.select2({
  //   dropdownParent: dropdownParentEl,
  // });
  let table = $('#purchase_table').DataTable({
    processing: true,
    serverSide: false,
    ordering: false,
    scrollCollapse: true,
    scrollY: 'calc(100vh - 350px)',
    ajax: {
      url: '/admin/return/table',
      type: 'GET',

    },
    initComplete: function (settings, json) {
    },
    columns: [
      {data:'id', visible: false, searchable: false},
      
      {data:'ordered_date', visible: true, type:'string', searchable: false,render:(row)=>{
        return new Date(row).toLocaleDateString('en-CA'); 
      } },

      {data:'product', visible: true, searchable: false },
      {data:'quantity', visible: true, searchable: false },
      {data:'returnqty', visible: true, searchable: false },
      {data:'user', visible: true, searchable: false },
      
      { 
          data: null, // Use `null` for rendering custom content
          orderable: false, // Disable sorting for this column
          searchable: false, // Disable searching for this column
          render: function(data, type, row) {
              return `
                  <button class="btn-danger m-0 btn-preview" data-date_approve=${row.date_approve} data-id=${row.id} style='margin:0'>Return</button>
              `;
          }
      }
    ],
  });
  
  $(document).on('click','.btn-preview', async function(){
    if($(this).data().date_approve!=null){
      Toast('error', 'The sale has already been marked for payroll and cannot be returned.')
      return;
    }
    openModalPreview();
    StartLoading();
    let res = await pullPreviewData($(this).data('id'));
    selectedData  = res;
    CloseLoading();
    console.log(res)
    loadDataToPreview(res);
  });
  function loadDataToPreview(data){
    $('#product_name').val(data.product);
    $('#prv_qty').val(parseInt(data.quantity));
    $("#inventoryItems tr:not(:first)").remove();

    if(isInvalidValue(data.items))return;
    let htmlToAdd='';
    data.items.forEach(x=>{
      htmlToAdd+=`<tr>
                      <td >
                        ${getInventoryId(x.inventory_id)}
                      </td>
                      <td >
                        ${x.count}
                      </td>
                      <td>
                        ${x.count}
                      </td>
                      <td>
                        ${x.price*x.count}
                      </td>
                      <td>
                        <input type="number" data-id='${x.id}' data-price='${x.count}' data-count='${x.count}'  class="block input_return w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      </td>
                      <td>
                        <input type="checkbox" value="" data-id='${x.id}' class="w-4 h-4 chk-dispose text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                      </td>
                </tr>`
    });
    $(document).on('keyup', '.input_return', function(){
      if($(this).data().count<$(this).val()){
        console.log('invalid');
        Toast('error', 'Invalid Value')
        $(this).val(0);
      }
    })
    $('#inventoryItems').append(htmlToAdd);
    let TotalAmount=0;
    try {
      data.items.forEach(val=>{
        TotalAmount+=val.count*val.price;
      })
      $('.total-amount').html(TotalAmount);

    } catch (error) {
      
    }
  }
  $('#btn_submit_return').on('click',async ()=>{
    let values = [];
    $('.input_return').each(function(){
      const _id = $(this).data().id;
      values.push(
        {
          id: _id,
          value: $(this).val(),
          dispose:$('input[type="checkbox"]').filter(`[data-id="${_id}"]`).prop('checked')
        }
      );
    });
    StartLoading();
    $(this).attr('disabled', true);
    await Save(values);
    CloseLoading();
    closeModalPreview();
    table.ajax.reload();
    console.log(values);
  });
  
  function Save(_data) {

    return new Promise(function (resolve, reject) {
      $.ajax({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
        },
        type: 'post',
        url: '/admin/return/savereturn',
        data: JSON.stringify(_data),
        contentType : "application/json", 
        dataType: 'json',
        success: function (response) {
          resolve(response);
        },
        error: function (response) {
          reject(response);
        },
      });
    });
  }
  function pullPreviewData(id){
    return new Promise((resolve, reject)=>{
      $.ajax({
          url: `/admin/purchase/preview/${id}`, 
          type: 'GET',
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
          },
          // data:JSON.stringify( { 
          //     id:id,
          //     status: newValue 
          // }),
          contentType: 'application/json', 
          headers: {
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') // Laravel CSRF token
          },
          success: function(response) {
            resolve(response);
          },
          error: function(xhr, status, error) {
            reject('error');
              Toast('error', 'Encounter error while loading preview');
          },
          complete:function(){
          }
      });
    })
    
  }
  

  $(document).on('change', '.status-dropdown', function() {
      const id = $(this).data('id'); // Get the row ID from data-id
      const newValue = $(this).val(); // Get the selected value
      console.log(`Row ID: ${id}, New Value: ${newValue}`);
      $.ajax({
          url: `/admin/purchase/request/status`, 
          type: 'PUT',
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
          },
          data:JSON.stringify( { 
              id:id,
              status: newValue 
          }),
          contentType: 'application/json', 
          headers: {
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') // Laravel CSRF token
          },
          success: function(response) {
              console.log('Status updated successfully:', response);
              Toast('success', 'Status changed');
          },
          error: function(xhr, status, error) {
              Toast('error', 'Error change status');
          },
          complete:function(){
            table.ajax.reload();
          }
      });
  });
});


