@props(['title' => 'Default Title', 'csspath' => 'css/default.css'])

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"/>
        <link rel="stylesheet" href="{{ asset($csspath) }}">
        <title>AzNajhi's {{ $title }}</title>
    </head>
    <body>
        <div class="app-title">
            <h1>{{ $title }}</h1>
            <h6>by AzNajhi</h6>
        </div>

        <div>
            <!-- CONTENT HERE -->
            {{ $slot }}
        </div>
        <script src="{{ asset('js\script.js') }}"></script>
    </body>
</html>