<x-adminlayout title="Dashboard">
  @push('css')
  <link rel="stylesheet" href="/css/pages/dashboard.css" />
  @endpush

  <div class="dashboard_container">
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
      <canvas id="purchase_graph"></canvas>
    </div>
    <div class="container-4">
      <canvas id="profit_graph"></canvas>
    </div>
  </div>
  @push('scripts')
  <script type="module" src="/js/page/dashboard.js"></script>
  @endpush
</x-adminlayout>
