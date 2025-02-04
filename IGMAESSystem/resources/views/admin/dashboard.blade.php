<x-adminlayout title="Dashboard">
  @push('css')
  <link rel="stylesheet" href="/css/pages/dashboard.css" />
  @endpush

  <div class="dashboard_container">
    <div class="flex gap-5 mb-3">
      <div class="bg-orange-200 flex-1 rounded-lg px-5 py-3 text-xl shadow-md">
        <p class="font-mono">Pending</p>
        <p class="text-right font-mono font-semibold text-2xl">{{$pending}}</p>
      </div>
      <div class="bg-blue-200 flex-1 rounded-lg px-5 py-3 text-xl shadow-md">
        <p class="font-mono">Complete</p>
        <p class="text-right font-mono font-semibold text-2xl">{{$complete}}</p>

      </div>
      <div class="bg-gray-300 flex-1 rounded-lg px-5 py-3 text-xl shadow-md">
        <p class="font-mono">Total</p>
        <p class="text-right font-mono font-semibold text-2xl">{{$complete+$pending}}</p>

      </div>
    </div>
    <div class="container-1">
      <div class="cont-graph1 cont-graph">
        <h6 class="title text-gray-700 font-mono font-bold text-right">
          Top Selling
        </h6>
        <div class="sub_con">
          <ul
            id="list_top_selling"
            class="max-w-md divide-y divide-gray-200 dark:divide-gray-700"
          ></ul>
        </div>
      </div>
      <div class="cont-graph2 cont-graph">
        <h6 class="title text-gray-700 font-mono font-bold text-right">
          Top Producer
        </h6>
        <div class="sub_con">
          <ul
            id="list_top_producer"
            class="max-w-md divide-y divide-gray-200 dark:divide-gray-700"
          ></ul>
        </div>
      </div>
      <div class="cont-graph3 cont-graph">
        <h6 class="title text-gray-700 font-mono font-bold text-right">
          Top Client
        </h6>
        <div class="sub_con">
          <ul
            id="top_client_list"
            class="max-w-md divide-y divide-gray-200 dark:divide-gray-700"
          ></ul>
        </div>
      </div>
    </div>
    <div class="container-2">
      <canvas id="production_graph"></canvas>
    </div>
    <div class="container-3">
      <div class="absolute right-20">
        <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Filter <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
          </svg>
          </button>
          <div id="dropdown" class="z-10 p-2 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
            <label
              for=""
              class="block my-2 text-sm font-medium text-gray-900 dark:text-white"
              >Partner Store(User)</label
            >
            <select
              id='partner_store_select'
              class="w-40 "
            ></select>
          </div>
      </div>
      <canvas id="return_graph"></canvas>
    </div>

    <div class="container-3">
      <canvas id="purchase_graph"></canvas>
    </div>
    <div class="container-3">
      <div class="absolute right-20">
        <button data-dropdown-toggle="dropdown-daily" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Filter <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
          </svg>
          </button>
          <div id="dropdown-daily" class="z-10 p-2 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700">
            <label for="startDate">Filter Month</label>
            <input id='filter_daily' type="month" min="2023-03" />
          </div>
      </div>
      <canvas id="sales_daily"></canvas>
    </div>
    <div class="container-4">
      <canvas id="profit_graph"></canvas>
    </div>
  </div>
  @push('scripts')
  <script type="module" src="/js/page/dashboard.js"></script>
  @endpush
</x-adminlayout>
