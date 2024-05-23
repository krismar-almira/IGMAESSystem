'use strict';

$(function () {
  let UserLevels;
  init();
  $('#selected_user_level').on('change', function () {
    ChangeHeader($(this).val());
  });
  $('#save').on('click', function (event) {
    event.preventDefault();
    let formData = MapData();

    ValidateFormData(formData, (result) => {
      if (!result) return;
      else {
        ConfirmaDailog(
          `ADD NEW ${
            UserLevels.find((el) => el.id == $('#selected_user_level').val())
              .name
          }`,
          'Confirm action',
          (result) => {
            if (!result) Toast('error', 'Action cancelled');
            else asyncSave(formData);
          }
        );
      }
    });
  });
  async function asyncSave(formdata) {
    StartLoading();
    console.log(await Save(formdata));
    CloseLoading();
  }
  function Save(formdata) {
    return new Promise((resolve, reject) => {
      $.ajax({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
        },
        type: 'POST',
        url: '/admin/user',
        data: formdata,
        processData: false,
        contentType: false,
        success: function (response) {
          resolve(response);
        },
        error: function (error) {
          reject(error); // Reject the promise if there's an error
        },
      });
    });
  }
  function ValidateFormData(formData, callback) {
    let result = true;
    if (formData.get('password') != formData.get('confirm_password')) {
      Toast('error', 'Password is not equal');
      result = false;
    }
    if (formData.get('name') == '') {
      Toast('error', 'Full Name is empty.');
      result = false;
    }
    if (String(formData.get('contact_number')).trim() == '') {
      Toast('error', 'Contact Number is empty.');
      result = false;
    }
    if (formData.get('address') == '') {
      Toast('error', 'Address is empty.');
      result = false;
    }
    if (formData.get('password') == '') {
      Toast('error', 'Password is empty.');
      result = false;
    }
    if (formData.get('confirm_password') == '') {
      Toast('error', 'Confirm password is empty.');
      result = false;
    }
    if (String(formData.get('designation')).trim() == '') {
      Toast('error', 'Designation is empty.');
      result = false;
    }
    callback(result);
  }
  function MapData() {
    let formData = new FormData();
    formData.append('name', $('#full_name').val());
    formData.append('image', $('#image')[0].files[0]);
    formData.append('contact_no', $('#contact_number').val());
    formData.append('address', $('#address').val());
    formData.append('password', $('#password').val());
    formData.append('email', $('#email').val());
    formData.append('username', $('#username').val());
    formData.append('confirm_password', $('#confirm_password').val());
    formData.append('user_level_id', $('#selected_user_level').val());
    formData.append('designation', $('#designation').val());
    return formData;
  }
  function ChangeHeader(userlevel_id) {
    console.log(userlevel_id);
    $('#header').html(
      `${UserLevels.find((el) => el.id == userlevel_id).name} Registration`
    );
  }
  async function init() {
    StartLoading();
    UserLevels = await getUserLevels();
    ChangeHeader($('#selected_user_level').val());
    CloseLoading();
  }
  function getUserLevels() {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'GET',
        url: '/admin/userlevel',
        dataType: 'json',
        success: function (response) {
          resolve(response);
        },
        error: function (error) {
          reject(error); // Reject the promise if there's an error
        },
      });
    });
  }
});
