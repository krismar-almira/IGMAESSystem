'use strict';
$(function () {
  // set the modal menu element
  let employees,
    isModalInitialize = false;
  let currentPayroll;
  let crudMode = 'add';
  const $targetEl = document.getElementById('NewPayrollModal');

  // options with default values
  const options = {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses: 'bg-gray-900/50 dark:bg-gray-900/80 fixed z-10 hidden',
    closable: true,
    onHide: () => {
      //CloseLoading();
    },
    onShow: () => {
      //initializeModal();
      crudMode === 'view'
        ? $('#btn_downdload').removeClass('hidden')
        : $('#btn_downdload').addClass('hidden');
    },
    onToggle: () => {
      //console.log('modal has been toggled');
    },
  };
  $('#fromDate').on('change', () => {
    LoadEmployeeList($('#fromDate').val(), $('#endDate').val());
  });
  $('#endDate').on('change', () => {
    LoadEmployeeList($('#fromDate').val(), $('#endDate').val());
  });
  $('#btn_downdload').on('click', function (e) {
    e.preventDefault();
    window.open('payroll/report/' + currentPayroll.id);
  });
  function initializeModal() {
    if (!isModalInitialize) {
      InitializeDate();
      LoadEmployeeList($('#fromDate').val(), $('#endDate').val());
      isModalInitialize = true;
    }
  }
  // instance options object
  const instanceOptions = {
    id: 'NewPayrollModal',
    override: true,
  };
  const modal = new Modal($targetEl, options, instanceOptions);
  $('.btnToggleModal').on('click', function () {
    modal.toggle();
  });
  $('#btn_new_payroll').on('click', function () {
    crudMode = 'add';
    OpenModal('add', null);
  });
  $('#checkbox_all_search').on('click', function () {
    let isCheck = $(this).is(':checked');
    $(document)
      .find('#modal_table tbody tr input[type="checkbox"]')
      .each(function () {
        $(this).prop('checked', isCheck);
      });
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
  function InitializeDate() {
    var now = new Date();
    var day = ('0' + now.getDate()).slice(-2);
    var month = ('0' + (now.getMonth() + 1)).slice(-2);
    var startDate = now.getFullYear() + '-' + month + '-' + '01';
    $('#fromDate').val(startDate);
    $('#endDate').val(new Date().toISOString().split('T')[0]);
  }
  function LoadEmployeeList(startDate, endDate) {
    StartLoading();
    $.ajax({
      type: 'get',
      url: '/admin/payroll/getinitial',
      data: { startDate: startDate, endDate: endDate },
      dataType: 'json',
      success: function (data) {
        employees = data;
        LoadModalTable(data);
      },
    }).done(function () {
      CloseLoading();
    });

    // $.get('/admin/user/getallemployee', function (data) {
    //   employees = data;
    //   LoadModalTable(data);
    // }).then(function () {
    //   CloseLoading();
    // });
  }
  function LoadModalTable(_data) {
    let _doc = $(document).find('#modal_table tbody');
    _doc.html('');
    let _html;
    _data.forEach((el) => {
      _html += `<tr
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td class="w-4 p-4">
                    <div class="flex items-center">
                      <input
                        type="checkbox"
                        value="${el.id}"
                        class="emp_checkbox w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        for="checkbox-table-search-1"
                        class="sr-only"
                        >checkbox</label
                      >
                    </div>
                  </td>
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    ${el.name}
                  </th>
                  <td class="px-6 py-4 salary">${el.salary}</td>
                </tr>`;
    });
    _doc.html(_html);
    if (crudMode === 'view') {
      $('.emp_checkbox').prop('checked', true);
      $('.emp_checkbox').prop('disabled', 'disabled');
      $('#fromDate , #endDate').prop('disabled', 'disabled');
      loadTotal();
    } else {
      $('.emp_checkbox').prop('disabled', '');
      $('#fromDate , #endDate').prop('disabled', '');
    }
  }
  $(document).on('click', '.emp_checkbox', function () {
    loadTotal();
  });
  function loadTotal() {
    let _doc = $(document).find('#modal_table tbody tr');
    let sum = 0;
    _doc.each(function () {
      if ($(this).find(':first-child').is(':checked')) {
        sum += parseInt($(this).find('.salary').text(), 10);
      }
    });
    $('#dp_sum').html(`Total: ${sum}`);
  }
  const DataMapping = {
    employee: [],
    startDate: '',
    endDate: '',
    validate: function () {
      if (this.employee.length == 0) {
        Toast('error', 'Please select from employee');
        return false;
      }
      if (this.startDate == '' || !this.startDate) {
        Toast('error', 'Please set start date.');
        return false;
      }
      if (this.endDate == '' || !this.endDate) {
        Toast('error', 'Please set end date.');
        return false;
      }
      return true;
    },
    mapData: function () {
      this.startDate = $('#fromDate').val();
      this.endDate = $('#endDate').val();
      let payroll = [];
      let _doc = $(document).find('#modal_table tbody tr');
      _doc.each(function () {
        let em_payroll;
        let checkbox = $(this).find('.emp_checkbox');
        if (checkbox.is(':checked')) {
          em_payroll = {
            user_id: checkbox.val(),
            salary: parseInt($(this).find('.salary').text(), 10),
          };
          payroll.push(em_payroll);
        }
      });
      this.employee = payroll;
      return true;
    },
    mapDataFrom: function (data) {
      crudMode === 'view'
        ? $('#modal_title').html('View')
        : $('#modal_title').html('New Payroll');
      console.log(data);
      $('#fromDate').val(data['start_date']);
      $('#endDate').val(data['end_date']);
      let _modData = data['employee'].map((x) => ({
        id: x.id,
        name: x.user.name,
        salary: x.amount,
      }));
      LoadModalTable(_modData);
      return true;
    },
  };
  $('#btn_save').on('click', async function (e) {
    e.preventDefault();
    StartLoading();
    try {
      await Save();
      Toast('success', 'Successfully saved!');
      table.ajax.reload();
    } catch (error) {
      Toast('error', 'Encountered error while saving.');
    }
    modal.hide();
    CloseLoading();
  });
  function Save() {
    return new Promise((resolve, reject) => {
      DataMapping.mapData();
      if (DataMapping.validate()) {
        console.log(DataMapping);
      }
      $.ajax({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
        },
        type: 'post',
        url: '/admin/payroll/save',
        data: {
          start_date: DataMapping.startDate,
          end_date: DataMapping.endDate,
          employees: DataMapping.employee,
        },
        dataType: 'json',
        success: function (response) {
          resolve(true);
        },
        error: function (ex) {
          reject(ex);
        },
      });
    });
  }
  let table = $('#payroll_table').DataTable({
    processing: true,
    serverSide: true,
    ordering: false,
    scrollCollapse: true,
    scrollY: 'calc(100vh - 350px)',
    ajax: '/admin/payroll/table',
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
    ],
  });
  $('#payroll_table tbody').on('click', 'tr', async function () {
    //console.log(table.row(this).data());
    try {
      StartLoading();
      currentPayroll = await LoadSelectedData(table.row(this).data());
      //console.log(table.row(this).data());
      crudMode = 'view';
      //console.table(currentPayroll);
      OpenModal(crudMode, currentPayroll);
      console.log(currentPayroll);
      CloseLoading();
    } catch (ex) {
      console.log(ex);
    }
  });
  function LoadSelectedData(_data) {
    console.log(_data);
    return new Promise((resolve, error) => {
      StartLoading();
      $.ajax({
        type: 'get',
        url: '/admin/payroll/id',
        data: { id: _data[0] },
        dataType: 'json',
        success: function (response) {
          resolve(response);
        },
        error: function (ex) {
          error(ex);
        },
      });
    });
  }
  function OpenModal(crud, data) {
    if (crud === 'view') {
      DataMapping.mapDataFrom(data);
    } else if (crud === 'add') {
      initializeModal();
    }
    modal.show();
  }
});
