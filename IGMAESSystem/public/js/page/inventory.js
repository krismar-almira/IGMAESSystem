'use strict';

$(function () {
  let crudMode;
  let crudId;
  let firstrun = true;
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
        id: crudId,
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
    mapToModal: function (data) {
      $('input[name=qty]').val(data.quantity);
      addSelectedValue('.product_select', data.product.name, data.product.id);
      $('.product_select').val(data.product.id).trigger('change');
      $('input[name=employeeShare]').val(data.user_share);
      $('input[name=companyShare]').val(data.employer_share);
      $('input[name=expense]').val(data.expense);
      $('input[name=expiration_date]').val(data.expiration);
      $('.group_employee').val(null).trigger('change');

      data.group_worker.forEach((el) => {
        //console.log(el.user);
        addSelectedValue('.group_employee', el.user.name, el.user.id);
      });
      let userIds = data.group_worker.map(
        (group_worker) => group_worker.user.id
      );
      //console.log(userIds);
      $('.group_employee').val(userIds).trigger('change');
    },
  };
  function ShowEditButton() {
    $('#btn_edit_modal').removeClass('hidden');
    $('#btn_submit_modal').addClass('hidden');
    DisableInput(true);
  }
  function HideEditButton() {
    $('#btn_edit_modal').addClass('hidden');
    $('#btn_submit_modal').removeClass('hidden');
    DisableInput(false);
  }
  function DisableInput(val) {
    $('input[name=qty]').attr('disabled', val);
    $('.product_select').attr('disabled', val);
    $('input[name=employeeShare]').attr('disabled', val);
    $('input[name=companyShare]').attr('disabled', val);
    $('input[name=expense]').attr('disabled', val);
    $('input[name=expiration_date]').attr('disabled', val);
    $('.group_employee').attr('disabled', val);
  }
  function addSelectedValue(selector, text, value) {
    if ($(selector + " option[value='" + value + "']").length == 0) {
      var newOption = new Option(text, value, false, false);
      $(selector).append(newOption);
    }
  }
  async function Preview(id) {
    StartLoading();
    $('#modal_title').html('Preview');
    ShowEditButton();
    let data;
    try {
      data = await GetInventoryById(id);
    } catch (ex) {
      console.log(ex);
    } finally {
      CloseLoading();
    }
    crudMode = 'view';
    formData.mapToModal(data);
    openModal();
  }
  function GetInventoryById(id) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'get',
        url: '/admin/inventory/get',
        data: { id: id },
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
  $('#btn_edit_modal').on('click', () => {
    HideEditButton();
    crudMode = 'edit';
    $('#modal_title').html('Edit');
    $('#btn_submit_modal').html('Update');
  });
  $('#inventory_table tbody').on('click', 'tr', function () {
    let data = table.row(this).data();
    let id = data[0];
    crudId = id;
    Preview(id);
  });
  $('#btn_submit_modal').on('click', async function (e) {
    let data = formData.mapData();
    let errors = formData.validateData(data);
    if (errors.length > 0) {
      errors.forEach((e) => {
        Toast('error', e);
      });
      return;
    }
    ConfirmaDailog(
      crudMode,
      `Are you sure you want to ${crudMode} this item?`,
      async function (status) {
        if (status) {
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
            closeModal();
            table.ajax.reload();
          }
        } else Toast('error', 'Action cancelled.');
      }
    );
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
    let url;
    url =
      crudMode == 'add' ? '/admin/inventory/save' : '/admin/inventory/update';
    return new Promise(function (resolve, reject) {
      $.ajax({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
        },
        type: 'post',
        url: url,
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
      { visible: false, searchable: false },
      { visible: true, searchable: false },
      { visible: true, searchable: false },
      { visible: true, searchable: false },
      { visible: true, searchable: false },
      { visible: true, searchable: false },
    ],
  });
});
