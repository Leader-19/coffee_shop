<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie', 'login', 'register', 'logout'],

    'allowed_methods' => ['*'],

    'allowed_origins' => ['*'], // Temporarily allow all for testing

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false, // Set to false for API token auth
];