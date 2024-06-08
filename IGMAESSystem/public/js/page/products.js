'use strict';
$(function () {
  let crud, crud_id;
  console.log('dom ready');
  const $targetEl = document.getElementById('crud-modal');
  // options with default values
  const options = {
    placement: 'center-center',
    backdrop: 'dynamic',
    backdropClasses: 'bg-gray-900/50 dark:bg-gray-900/80 fixed z-10 hidden',
    closable: true,
    onHide: () => {
      console.log('modal is hidden');
    },
    onShow: () => {
      console.log('modal is shown');
    },
    onToggle: () => {
      console.log('modal has been toggled');
    },
  };

  // instance options object
  const instanceOptions = {
    id: 'crud-modal',
    override: true,
  };
  const modal = new Modal($targetEl, options, instanceOptions);
  $('#btn_add_new').on('click', function () {
    InitModal('add', 0);
  });
  $('#btn_modal_close').on('click', function () {
    modal.hide();
  });
  async function InitModal(m, id) {
    crud = m;
    crud_id = id;
    if (m == 'add') {
      $('#frm_modal')[0].reset();
      $('#modal_title').html('Add new product');
      $('#btn_submit_modal').html('Add');
      modal.show();
    } else if (m == 'edit') {
      $('#modal_title').html('Edit product');
      $('#btn_submit_modal').html('Update');
      StartLoading();
      let data;
      try {
        data = await GetProductDetail(id);
        mapValuesToModal(data);
      } catch (e) {
        Toast('error2', 'Error while retrieving the data');
      }
      CloseLoading();
      if (data) modal.show();
    }
  }
  async function GetProductDetail(id) {
    return new Promise(function (resolve, reject) {
      $.get(`/admin/product/id/${id}`)
        .done(function (response, status) {
          resolve(response);
        })
        .fail(function (xhr, status, error) {
          reject(error);
        });
    });
  }
  function mapValuesToModal(data) {
    $('#name').val(data['name']);
    $('#price').val(data['price']);
    $('#type').val(data['type']);
    $('#unit_of_measure').val(data['unit_measure']);
    $('#description').val(data['description']);
  }
  $(':submit').one('click', function (e) {
    e.preventDefault();
    ConfirmaDailog(
      'Add',
      `Are you sure you want to ${crud} this product?`,
      function (result) {
        if (result) SaveProduct();
        else Toast('error2', 'Action cancelled.');
      }
    );
  });
  function SaveProduct() {
    let formData = mapValues();
    ValidateFormData(formData, function (status) {
      if (status) asyncSave(formData);
    });
  }
  async function asyncSave(formdata) {
    StartLoading();
    try {
      await Save(formdata);
      Toast('success', 'Successfully saved!');
      //InitNewProduct();
      modal.hide();
      table.ajax.reload();
    } catch {
      Toast('error2', 'error encountered while saving!');
    }
    CloseLoading();
  }
  function Save(formdata) {
    return new Promise((resolve, reject) => {
      let _url;
      if (crud == 'add') _url = '/admin/product';
      if (crud == 'edit') _url = '/admin/product/update';
      $.ajax({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
        },
        type: 'POST',
        url: _url,
        data: formdata,
        processData: false,
        contentType: false,
        success: function (response) {
          resolve(response);
        },
        error: function (error) {
          reject(error);
        },
      });
    });
  }
  function mapValues() {
    let formData = new FormData();
    formData.append('id', crud_id);
    formData.append('name', $('#name').val());
    formData.append('image', $('#image')[0].files[0]);
    formData.append('price', $('#price').val());
    formData.append('type', $('#type').val());
    formData.append('unit_measure', $('#unit_of_measure').val());
    formData.append('description', $('#description').val());

    return formData;
  }
  function ValidateFormData(formData, callback) {
    let status = true;
    if (formData.get('name') == '') {
      Toast('error', 'Name is empty.');
      status = false;
    }
    if (formData.get('price') == '') {
      Toast('error', 'Price is empty.');
      status = false;
    }
    if (formData.get('type') == '') {
      Toast('error', 'Type is empty.');
      status = false;
    }
    if (formData.get('unit_measure') == '') {
      Toast('error', 'Unit of measure is empty.');
      status = false;
    }
    if (formData.get('description') == '') {
      Toast('error', 'Description is empty.');
      status = false;
    }
    callback(status);
  }

  let table = $('#producttable').DataTable({
    processing: true,
    serverSide: true,
    ordering: false,
    scrollCollapse: true,
    scrollY: 'calc(100vh - 350px)',
    ajax: '/admin/product',
    initComplete: function (settings, json) {
      //alert('DataTables has finished its initialisation.');
      DropDownListener();
    },
    columns: [
      { visible: true, searchable: false },
      { visible: true, searchable: false },
      { visible: true, searchable: false },
      { visible: true, searchable: false },
      { visible: true, searchable: false },
      { visible: true, searchable: false },
    ],
  });
  async function DropDownListener() {
    await delay(2000);
  }
  $(document).on('click', '[data-dropdown-toggle]', function (what) {
    what.preventDefault();
    var dropdownId = $(this).attr('data-dropdown-toggle'); // Get the dropdown ID
    var dropdownMenu = $('#' + dropdownId);
    if (dropdownMenu.hasClass('hidden')) {
      // Hide all other dropdown menus before showing this one
      $('.dropdown-menu').addClass('hidden');
      dropdownMenu.removeClass('hidden');
    } else {
      dropdownMenu.addClass('hidden');
    }
  });
  $(document).on('click', '.btn_delete', function (e) {
    console.log(this.value);
    DeleteProduct(this.value);
  });
  async function DeleteProduct(id) {
    ConfirmaDailog(
      'Delete',
      'Are you want to delete this product?',
      async function (confirm) {
        if (confirm) {
          StartLoading();
          try {
            await Delete(id);
            Toast('success', 'Succefully deleted.');
            table.ajax.reload();
          } catch (e) {
            Toast('error2', 'Encountered error while deleting');
          }
          CloseLoading();
        } else {
          Toast('error', 'Action cancelled.');
        }
      }
    );
  }
  function Delete(id) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
        },
        type: 'delete',
        url: '/admin/product/' + id,
        success: function (response) {
          resolve(response);
        },
        error: function (xhr, textStatus, errorThrown) {
          reject(textStatus);
        },
      });
    });
  }
  $(document).on('click', function (event) {
    // var dropdownMenus = $('.dropdown-menu');
    // dropdownMenus.each(function () {
    //   if (!$(this).is(event.target) && $(this).has(event.target).length === 0) {
    //     $(this).addClass('hidden');
    //   }
    // });
  });
  $(document).on('click', '.btn_edit', function (e) {
    InitModal('edit', this.value);
  });
});
