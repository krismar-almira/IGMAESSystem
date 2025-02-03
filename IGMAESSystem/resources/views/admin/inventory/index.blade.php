<x-adminlayout title="Inventory">
  @push('css')
  <link rel="stylesheet" href="/css/pages/inventory.css" />
  @endpush
  <div class="w-full h-full flex justify-center items-start">
    <div
      class="p-6 m-1 relative sm:m-5 w-full bg-gray-50 border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"
    >
      <button
        id="btn_add_new"
        class="block text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        type="button"
      >
        Add New
      </button>
      <div id="crud_modal" tabindex="-1" aria-hidden="true" class="hidden1">
        <div class="relative p-4 w-full max-w-md max-h-full">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div 
              class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
            >
              <h3
                id="modal_title"
                class="text-lg font-semibold text-gray-900 dark:text-white"
              ></h3>
              <button
                id="btn_modal_close"
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <!-- Modal body -->
            <form id="frm_modal" class="p-4 md:p-5">
              <div class="grid gap-4 mb-4 grid-cols-2">
                <div class="col-span-2">
                  <div id="parent" class="w-full h-auto">
                    <label
                      for=""
                      class="block my-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Product</label
                    >
                    <select
                      class="product_select w-full "
                    ></select>
                  </div>
                  <label
                    for="qty"
                    class="block my-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Quantity</label
                  >
                  <input
                    type="number"
                    name="qty"
                    id="qty"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder=""
                    required=""
                  />
                </div>
                <div class="col-span-2 sm:col-span-1">
                  <label
                    for="employeeShare"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Employee Share</label
                  >
                  <input
                    type="number"
                    name="employeeShare"
                    disabled
                    id="employeeShare"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="PHP"
                    required=""
                  />
                </div>
                <div class="col-span-2 sm:col-span-1">
                  <label
                    for="companyShare"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Company Share</label
                  >
                  <input
                    type="number"
                    name="companyShare"
                    disabled
                    id="companyShare"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder=""
                    required=""
                  />
                </div>
                <div class="col-span-2">
                  <label
                    for="expense"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Total Expense for raw material</label
                  >
                  <input
                    type="number"
                    name="expense"
                    id="expense"
                    type="number"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder=""
                    required=""
                  />
                </div>
                <div class="col-span-2">
                  <label
                    for="expiration_date"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Expiration Date</label
                  >
                  <input
                    id="expiration_date"
                    type="date"
                    name="expiration_date"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                  ></input>
                </div>
                <div class="col-span-2">
                  <label
                    for=""
                    class="block my-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Employee</label
                  >
                  <select multiple="multiple"
                    class="group_employee w-full js-states form-control"
                  ></select>
                </div>
              </div>
              <button
                type="button"
                id="btn_submit_modal"
                class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add new product
              </button>
              <button
                type="button"
                id="btn_edit_modal"
                class="text-white hidden inline-flex items-center bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                Edit
              </button>
            </form>
          </div>
        </div>
      </div>
      <div class="mt-2">
        <table id="inventory_table" class="p-2">
          <thead class="">
            <tr>
              <th scope='col' class="px-6 py-3 w-20">ID</th>
              <th scope='col' class="px-6 py-3 w-20">inventory ID</th>
              <th scope="col" class="px-6 py-3">Product</th>
              <th scope="col" class="px-6 py-3">Quantity</th>
              <th scope="col" class="px-6 py-3">Sold</th>
              <th scope="col" class="px-6 py-3">Quantity Expired</th>
              <th scope="col" class="px-6 py-3">Dispose</th>
              <th scope="col" class="px-6 py-3">Available</th>
              <th scope="col" class="px-6 py-3">Employee</th>
              <th scope="col" class="px-6 py-3">Date</th>
              <th scope="col" class="px-6 py-3">Expiration</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  </div>
  @push('scripts')
  <script type="module" src="/js/page/inventory.js"></script>
  @endpush
</x-adminlayout>
