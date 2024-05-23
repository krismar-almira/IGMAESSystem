<x-layout title="IGMAES Login">
<div class="w-full h-lvh bg-gradient bg-opacity-20 justify-center flex items-center">
  <div class="w-full max-w-sm bg-clip bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-20">
    <h1 class="mb-5 mt-5 text-center text-gray-500 tracking-widest font-mono font-semibold text-2xl">IGMAES</h1>
    <form action="/login" class="px-5" method="POST">
      @csrf
      <div class="relative z-0 w-full group mb-5">
        <input type="text" name="username" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
        <label for="username" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
      </div>
      <div class="relative z-0 w-full group">
        <input type="password" name="password" id="floating_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
        <label for="password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
      </div>
      <div class="flex justify-end">
        <button type="submit" class="text-white mt-4 w-full sm:w-auto bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-sm px-3 py-2 me-2 mb-2 dark:bg-green-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-green-700">Login</button>
      </div>
    </form>
    <div class="w-full overflow-hidden bg-gray-600 rounded-b-lg rounded-br-lg bg-clip-padding">
      <p class="text-center text-xs text-gray-200 p-0.5">Copyright 2024</p>
    </div>
  </div>
</div>
</x-layout>