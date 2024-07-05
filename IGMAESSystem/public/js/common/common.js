const delay = (ms) => new Promise((res) => setTimeout(res, ms));
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

function objectifyForm(formArray) {
  //serialize data function
  var returnArray = {};
  for (var i = 0; i < formArray.length; i++) {
    returnArray[formArray[i]['name']] = formArray[i]['value'];
  }
  return returnArray;
}

const ConfirmaDailog = (action, message, callback) => {
  action = String(action).toUpperCase();
  let _confirm = false;
  $('#confirmation_dialog').html('');
  let content = `<div style='z-index:100;' class="relative p-4 w-full max-w-md max-h-full mb-36">
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
function getMonth(x) {
  const months = [
    'Jan.',
    'Feb.',
    'Mar.',
    'April',
    'May',
    'June',
    'July',
    'Aug.',
    'Sept.',
    'Oct.',
    'Nov.',
    'Dec.',
  ];
  return months[x - 1];
}
function formatDate(dateString) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Split the input date string
  const [year, month, day] = dateString.split('-');

  // Create a new date object
  const date = new Date(year, month - 1, day);

  // Get the month name from the months array
  const monthName = months[date.getMonth()];

  // Construct the formatted date string
  return `${monthName} ${day}, ${year}`;
}
