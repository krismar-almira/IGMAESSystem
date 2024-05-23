<x-adminlayout title="User list">


<div class="relative overflow-x-auto shadow-md sm:rounded-lg m-2 p-3">
    <table id="usertable" class="p-2">
        <thead class="">
            <tr>
              <th scope="col" class="px-6 py-3">
                  Name
              </th>
              <th scope="col" class="px-6 py-3">
                  Address
              </th>
              <th scope="col" class="px-6 py-3">
                  Designation
              </th>
              <th scope="col" class="px-6 py-3">
                  Userlevel
              </th>
            </tr>
        </thead>
        <tbody>
            <tr class="">
                <th scope="row" class="">
                    Apple MacBook Pro 17"
                </th>
                <td class="px-6 py-4">
                    Silver
                </td>
                <td class="px-6 py-4">
                    Laptop
                </td>
                <td class="px-6 py-4">
                    $2999
                </td>
            </tr>
            
        </tbody>
    </table>
</div>
@push('scripts')
<script src="/js/page/user.js"></script>
@endpush
</x-adminlayout>>