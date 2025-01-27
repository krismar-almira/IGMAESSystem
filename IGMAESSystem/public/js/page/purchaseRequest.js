'use strict';

import { getInventoryId, isInvalidValue } from "../common/helper.js";
$(function () {
  let crudMode;
  let crudId;
  let firstrun = true;
  let maxQuantityPurchase=0;
  let currentData = 0;
  const userlevel =  $('#user_level').html();
  init();
  function init(){
    if(userlevel=='Admin'||userlevel=='SA') return;
    
    $('#partner_store_select_cont').addClass('hidden');
    $('#inventory-container').addClass('hidden');
    
  }
  const openModal = () => {
    $('#crud_modal').removeClass('hidden1');
  };
  const closeModal = () => {
    $('#crud_modal').addClass('hidden1');
  };
  const openModalPreview = () => {
    $('#modal_preview').removeClass('hidden1');
  };
  const closeModalPreview = () => {
    $('#modal_preview').addClass('hidden1');
  };
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
  $('#btn_submit_modal').on('click', ()=>{
    
    let qty_total = $("#qty").val();
    const _data = {quantity:$('#qty').val(), product_id:$(".product_select").val(),store_id:$("#partner_store_select").val(), inventories:[]};
    console.table(currentData);
    $('.product-avail').each(function(){
      const _inventory_id = $(this).data('id');
      const _inventory_count = parseInt($(this).html());
      const to_add = qty_total - _inventory_count;
      console.log(qty_total + '-' +_inventory_count +'=' +to_add);

      if(to_add<=0){
        _data.inventories.push({id:_inventory_id,count:parseInt(qty_total)});
        return false;
      }else{
        _data.inventories.push({id:_inventory_id,count:_inventory_count});
        qty_total -=_inventory_count;
      }
      // 991-990=1
      // 991-10=981
    });
    console.log(_data);
    if(!validate(_data))return;
    StartLoading();

    Save(_data);
    closeModal();
    table.ajax.reload();
    CloseLoading();
  });
  function Save(_data) {
    let url;
    url =
      crudMode == 'add' ? '/admin/purchase/request' : '/admin/inventory/update';
    return new Promise(function (resolve, reject) {
      $.ajax({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
        },
        type: 'post',
        url: url,
        data: _data,
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
      url: '/admin/purchase/table',
      type: 'GET',

    },
    initComplete: function (settings, json) {
    },
    columns: [
      {data:'id', visible: false, searchable: false },
      {data:'product', visible: true, searchable: false },
      {data:'quantity', visible: true, searchable: false },
      {data:'user', visible: true, searchable: false },
      { 
          data: 'status', 
          visible: true, 
          searchable: false,
          render: function(data, type, row) {
              // Render a dropdown with the current status selected
              if(userlevel == 'Partner Store')
              {
                return data;
              }
              return `
                  <select class="form-select status-dropdown" data-id="${row.id}">
                      <option disabled value="1" ${data === 'For Approval' ? 'selected' : ''}>For Approval</option>
                      <option value="2" ${data === 'For Delivery' ? 'selected' : ''}>For Delivery</option>
                      <option value="3" ${data === 'Delivered' ? 'selected' : ''}>Delivered</option>
                  </select>
              `;
          }
      },
      { 
          data: null, // Use `null` for rendering custom content
          orderable: false, // Disable sorting for this column
          searchable: false, // Disable searching for this column
          render: function(data, type, row) {
              return `
                  <button class="btn-default m-0 btn-preview" data-id=${row.id} style='margin:0'>View</button>
                  <button ${row.status=='For Approval'?'':'disabled'} class="btn  ${row.status=='For Approval'?'btn-danger':'hidden'}  btn-sm btn-delete" style='margin:0' data-id=${row.id}>Delete</button>
              `;
          }
      }
    ],
  });
  $(document).on('click','.btn-preview', async function(){
    openModalPreview();
    StartLoading();
    let res = await pullPreviewData($(this).data('id'));
    CloseLoading();
    console.log(res)
    loadDataToPreview(res);
  });
  function loadDataToPreview(data){
    $('#product_name').val(data.product);
    $('#prv_qty').val(parseInt(data.quantity));
    if(isInvalidValue(data.items))return;
    let htmlToAdd='';
    data.items.forEach(x=>{
      htmlToAdd+=`<li class="pb-3 sm:pb-4">
                    <div class="flex items-center space-x-4 rtl:space-x-reverse">
                        <div class="flex-1 min-w-0">
                          <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                              ${data.product}
                          </p>
                          <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                              ${getInventoryId(x.inventory_id)}
                          </p>
                        </div>
                        <div class="inline-flex text-gray-500 items-center text-base font-semibold dark:text-white">
                          ${x.count}
                        </div>
                        <div class="inline-flex text-gray-500 items-center text-base font-semibold dark:text-white">
                          ${x.price}
                        </div>
                        <div class="inline-flex total_price text-gray-500 items-center text-base font-semibold dark:text-white">
                          ${x.price*x.count}
                        </div>
                        
                    </div>
                  </li>`
    });
    $('#inventoryItems').html(htmlToAdd);
    let TotalAmount=0;
    try {
      data.items.forEach(val=>{
        TotalAmount+=val.count*val.price;
      })
      $('.total-amount').html(TotalAmount);

    } catch (error) {
      
    }
    
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
  $(document).on('click','.btn-delete', function(){
    const id = $(this).data('id')
    $.ajax({
        url: `/admin/purchase/request/${id}`, 
        type: 'delete',
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
            Toast('success', 'Deleted successfully');
        },
        error: function(xhr, status, error) {
            Toast('error', 'Encountere error while deleting');
        },
        complete:function(){
          table.ajax.reload();
        }
    });
  });
  function validate(_data){
    console.log(_data.count);
    if(isInvalidValue(_data.product_id)) Toast('error','Select product');
    if(isInvalidValue(_data.quantity)) Toast('error','Enter desire quantity');
    if(_data.quantity>parseInt($('.total-available').html())) Toast('error','Stock is not enough');
    if(isInvalidValue(_data.quantity)||isInvalidValue(_data.product_id)||_data.quantity>parseInt($('.total-available').html()))return false;
    return true;
    
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


