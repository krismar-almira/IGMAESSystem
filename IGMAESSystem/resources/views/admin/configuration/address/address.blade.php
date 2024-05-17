<x-adminlayout title="Configure Address">
  

 

  <div class="p-3 flex rounded-md m-2 gap-2 flex-wrap">
    <span>
      <h3 class="mb-1 font-semibold inline-block text-gray-900 dark:text-white">Region</h3>
      <ul id='list_region' class="w-56 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
          <div class="flex items-center">
            <input type="text" placeholder="Add new region" id="input_region" class="m-2 mr-0 block w-full text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <button id='btn_add_new_region' type="button" value="region" class="addNew mx-1 text-gray-700 rounded-full hover:bg-gray-700 hover:text-white font-medium text-sm p-2 text-center inline-flex items-center dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:focus:ring-gray-800 dark:hover:bg-gray-500">
              <svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m16 14-4-4-4 4"/>
              </svg>
              <span class="sr-only">Icon description</span>
            </button>
          </div>
        </li>
      </ul>
    </span>
    <span>
      <h3 class="mb-1 font-semibold inline-block text-gray-900 dark:text-white">Province</h3>
      <ul id='list_province'  class="w-56 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
          <div class="flex items-center">
            <input type="text" placeholder="Add new province" id="input_province" class="m-2 mr-0 block w-full text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <button id='btn_add_new_region' type="button" value="province" class="addNew mx-1 text-gray-700 rounded-full hover:bg-gray-700 hover:text-white font-medium text-sm p-2 text-center inline-flex items-center dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:focus:ring-gray-800 dark:hover:bg-gray-500">
              <svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m16 14-4-4-4 4"/>
              </svg>
              <span class="sr-only">Icon description</span>
            </button>
          </div>
        </li>
      </ul>
    </span>
    <span>
      <h3 class="mb-1 font-semibold inline-block text-gray-900 dark:text-white">City</h3>
      <ul id='list_city' class="w-56 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
          <div class="flex items-center">
            <input type="text" placeholder="Add new city" id="input_city" class="m-2 mr-0 block w-full text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <button id='btn_add_new_region' type="button" value="city" class="addNew mx-1 text-gray-700 rounded-full hover:bg-gray-700 hover:text-white font-medium text-sm p-2 text-center inline-flex items-center dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:focus:ring-gray-800 dark:hover:bg-gray-500">
              <svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m16 14-4-4-4 4"/>
              </svg>
              <span class="sr-only">Icon description</span>
            </button>
          </div>
        </li>
      </ul>
    </span>
  </div>
  @push('scripts')
  <script>
    console.log('childload');
  </script>
  @endpush
</x-adminlayout>