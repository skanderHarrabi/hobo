<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Chatrip</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">


        <link rel='shortcut icon' type='image/x-icon' href='favicon.ico'>
        <link rel="icon" href="{{ URL::asset('/css/fvic.png') }}" type="image/x-icon"/>
        <link href='https://fonts.googleapis.com/css?family=Press+Start+2P&display=swap' rel='stylesheet'>
        <link href='https://fonts.googleapis.com/icon?family=Material+Icons'
              rel='stylesheet'>
        <!-- Styles -->
    </head>
    <body>
        <div id="root">

        </div>
        <script src="{{mix("js/index.js")}}"></script>
    </body>
</html>
