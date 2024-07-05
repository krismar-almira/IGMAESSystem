<x-adminlayout title="Dashboard">
  @push('css')
  <link rel="stylesheet" href="/css/pages/dashboard.css" />
  @endpush

  <div class="dashboard_container">
    <div class="container-1">
      <div class="cont-graph1 cont-graph">
        <span
          class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400"
          >table 1</span
        >
        <canvas id="myChart"></canvas>
      </div>
      <div class="cont-graph2 cont-graph">
        <span
          class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400"
          >table 2</span
        >
        <canvas id="myChart1"></canvas>
      </div>
      <div class="cont-graph3 cont-graph">
        <span
          class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400"
          >table 3</span
        >
        <canvas id="myChart2"></canvas>
      </div>
    </div>
    <div class="container-2">
      <canvas id="production_graph"></canvas>
    </div>
  </div>
  @push('scripts')
  <script src="/js/page/dashboard.js"></script>
  @endpush
</x-adminlayout>
