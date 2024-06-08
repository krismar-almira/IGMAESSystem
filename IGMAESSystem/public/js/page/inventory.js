'use strict';

$(function () {
  let crudMode;
  const openModal = () => {
    $('#crud_modal').removeClass('hidden1');
  };
  const closeModal = () => {
    $('#crud_modal').addClass('hidden1');
  };
  const addNew = () => {
    $('#modal_title').html('New');
    $('#btn_submit_modal').html('Save');
    $('#frm_modal')[0].reset();
    crudMode = 'add';
    openModal();
  };
  const formData = {
    mapData: function () {
      return {
        selectedEmployee: $('.group_employee').select2('data'),
        selectedProduct: $('.product_select').select2('data'),
        qty: $('input[name=qty]').val(),
        employeeShare: $('input[name=employeeShare]').val(),
        companyShare: $('input[name=companyShare]').val(),
        expense: $('input[name=expense]').val(),
        expirationDate: $('input[name=expiration_date]').val(),
      };
    },
    validateData: function (data) {
      let errors = [];
      if (!data.selectedEmployee) errors.push('Please select an employee.');
      if (!data.selectedProduct) errors.push('Please select a product.');
      if (!data.qty) errors.push('Please enter quantity.');
      if (!data.employeeShare) errors.push('Please enter employee share.');
      if (!data.companyShare) errors.push('Please enter company share.');
      if (!data.expense) errors.push('Please enter expense.');
      if (!data.expirationDate) errors.push('Please enter expiration date.');
      return errors;
    },
  };
  $('#btn_submit_modal').on('click', async function (e) {
    e.preventDefault();
    let data = formData.mapData();
    //console.log(data);
    let errors = formData.validateData(data);
    if (errors.length > 0) {
      errors.forEach((e) => {
        Toast('error', e);
      });
      return;
    }
    StartLoading();
    try {
      let status = await Save(data);
      console.log(status);
    } catch (e) {
      let errors = JSON.parse(e.responseText);
      errors.errors.forEach((e) => {
        Toast('error', e);
      });
      //console.log();
    } finally {
      CloseLoading();
    }
  });

  $('#btn_add_new').on('click', function () {
    addNew();
  });
  $('#btn_modal_close').on('click', () => {
    closeModal();
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
  $('.group_employee').select2({
    dropdownPosition: 'above',
    ajax: {
      method: 'get',
      url: '/admin/user/search/',
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
  function Save(_data) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
        },
        type: 'post',
        url: '/admin/inventory/save',
        data: JSON.stringify(_data),
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
  let table = $('#inventory_table').DataTable({
    processing: true,
    serverSide: true,
    ordering: false,
    scrollCollapse: true,
    scrollY: 'calc(100vh - 350px)',
    ajax: '/admin/inventory/table',
    initComplete: function (settings, json) {
      //alert('DataTables has finished its initialisation.');
      //DropDownListener();
    },
    columns: [
      { visible: true, searchable: false },
      { visible: true, searchable: false },
      { visible: true, searchable: false },
      { visible: true, searchable: false },
      { visible: true, searchable: false },
    ],
  });
});
