<x-adminlayout title="Purchase Request">
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
          New Request
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
                    <div id="partner_store_select_cont" class="w-full h-auto">
                      <label
                        for=""
                        class="block my-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Partner Store(User)</label
                      >
                      <select
                        id='partner_store_select'
                        class=" w-full "
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
                  <div class="col-span-2">
                    <div>
                      <div class="flex items-center space-x-4 rtl:space-x-reverse">
                          <div class="flex-shrink-0">
                          </div>
                          <div class="flex-1 min-w-0">
                          </div>
                          <div class="inline-flex text-gray-500 items-center text-base font-semibold dark:text-white">
                            Total
                          </div>
                          <div class="inline-flex text-gray-500 items-center text-base font-semibold dark:text-white">
                            Sold
                          </div>
                          <div class="inline-flex text-orange-500 items-center text-base font-semibold dark:text-white">
                            Pending
                          </div>
                          <div class="inline-flex text-green-500 items-center text-base font-semibold dark:text-white">
                            Available
                          </div>
                      </div>
                    </div>
                    <ul id='inventoryAvailable' class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                    </ul>
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
                <p class="inline-block">Available:</p>
                <p class="total-available inline-block">0</p>
              </form>
            </div>
          </div>
        </div>
        <div id="modal_preview" tabindex="-1" aria-hidden="true" class="hidden1">
          <div class="relative p-4 w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div 
                class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
              >
                <h3
                  class="text-lg font-semibold text-gray-900 dark:text-white"
                >Preview</h3>
                <button
                  id="btn_modal_close_preview"
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
                      <input
                        disabled
                        type="text"
                        id="product_name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder=""
                        required=""
                      />
                    </div>
                    <label
                      for="qty"
                      class="block my-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Quantity</label
                    >
                    <input
                      disabled
                      type="number"
                      id='prv_qty'
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder=""
                      required=""
                    />
                  </div>
                  <div class="col-span-2" id="inventory-container">
                    <div>
                      <div class="flex items-center space-x-4 rtl:space-x-reverse">
                          <div class="flex-shrink-0">
                          </div>
                          <div class="flex-1 min-w-0">
                          </div>
                          <div class="inline-flex text-green-500 items-center text-base font-semibold dark:text-white">
                            qty
                          </div>
                          <div class="inline-flex text-green-500 items-center text-base font-semibold dark:text-white">
                            price/unit
                          </div>
                          <div class="inline-flex text-green-500 items-center text-base font-semibold dark:text-white">
                            subtotal
                          </div>
                      </div>
                    </div>
                    <ul id='inventoryItems' class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                    </ul>
                  </div>
                </div>
                
                <p class="inline-block">Total Amount:</p>
                <p class="total-amount inline-block">0</p>
              </form>
            </div>
          </div>
        </div>
        <div class="mt-2">
          <table id="purchase_table" class="p-2">
            <thead class="">
              <tr>
                <th scope='col' class="px-6 py-3 w-20">ID</th>
                <th scope="col" class="px-6 py-3">Product</th>
                <th scope="col" class="px-6 py-3">Qunatity</th>
                <th scope="col" class="px-6 py-3">User</th>
                <th scope="col" class="px-6 py-3">Status</th>
                <th scope="col" class="px-6 py-3 w-52">Action</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
    @push('scripts')
    <script type="module" src="/js/page/purchaseRequest.js"></script>
    @endpush
  </x-adminlayout>
  