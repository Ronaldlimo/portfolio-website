$http = [System.Net.HttpListener]::new()
$http.Prefixes.Add("http://localhost:8000/")
$http.Start()

$url = "http://localhost:8000/Ronald%20Portfolio.html"
Write-Host "---------------------------------------------------"
Write-Host "Server started!"
Write-Host "Opening $url in your default browser..."
Write-Host "---------------------------------------------------"
Write-Host "Press Ctrl+C to stop."

# Automatically open the browser to the correct address
try {
    Start-Process $url
}
catch {
    Write-Host "Could not auto-launch browser. Please open: $url"
}

try {
    while ($http.IsListening) {
        # Wait for a request
        $context = $http.GetContext()
        $response = $context.Response
        $resource = $context.Request.Url.LocalPath
        
        # Default to index.html or the specific portfolio file if root is requested
        if ($resource -eq "/") { $resource = "/Ronald Portfolio.html" }
        
        # Remove leading slash to get relative path
        $relativePath = $resource.TrimStart('/')
        $filePath = Join-Path $PSScriptRoot $relativePath
        
        Write-Host "Request: $resource"
        
        if ([System.IO.File]::Exists($filePath)) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $bytes.Length
            
            # Set correct content type
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            switch ($ext) {
                ".html" { $response.ContentType = "text/html" }
                ".css" { $response.ContentType = "text/css" }
                ".js" { $response.ContentType = "application/javascript" }
                ".jpg" { $response.ContentType = "image/jpeg" }
                ".jpeg" { $response.ContentType = "image/jpeg" }
                ".png" { $response.ContentType = "image/png" }
                ".gif" { $response.ContentType = "image/gif" }
                ".svg" { $response.ContentType = "image/svg+xml" }
            }

            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        }
        else {
            $response.StatusCode = 404
        }
        $response.Close()
    }
}
finally {
    $http.Stop()
}
