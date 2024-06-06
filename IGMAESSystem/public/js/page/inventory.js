'use strict';

$(function () {
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
    openModal();
  };
  console.log('dom is ready');
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
  // var dropdownParentEl = $('#addModal > .modal-dialog > .modal-content');
  // selectBoxElem.select2({
  //   dropdownParent: dropdownParentEl,
  // });
});
