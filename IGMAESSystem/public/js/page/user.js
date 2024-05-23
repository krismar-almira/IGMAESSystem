'use strict';
$(function () {
  //let table = new DataTable('#usertable');
  $('#usertable').DataTable({
    processing: true,
    serverSide: true,
    ordering: false,
    ajax: '/admin/user',
  });
});
