<x-adminlayout title="Dashboard">
    @push('css')
    <link rel="stylesheet" href="/css/pages/dashboard.css" />
    @endpush
  
    <div class="dashboard_container">
      <div class="container-1">
        
      </div>
      <div class="container-2">
        <canvas id="production_graph"></canvas>
      </div>
      {{-- <div class="container-3">
        <canvas id="purchase_graph"></canvas>
      </div> --}}
      <div class="container-4">
        <canvas id="salary_graph"></canvas>
      </div>
    </div>
    @push('scripts')
    <script type="module" src="/js/page/dashboard-employee.js"></script>
    @endpush
  </x-adminlayout>
  