Add-Type -AssemblyName System.Drawing

$root = "F:\Projects\Burnrate"
$out = "$root\store-assets"
$bg = [System.Drawing.Color]::FromArgb(255, 9, 9, 11)  # #09090B, matches app --background

function New-Canvas($w, $h) {
    $bmp = New-Object System.Drawing.Bitmap($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.Clear($bg)
    return @{ Bmp = $bmp; G = $g }
}

function Save-Png($bmp, $path) {
    $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
}

# 1. App icon: 1024x1024 -> 512x512 (simple downscale, no alpha)
$src = [System.Drawing.Image]::FromFile("$root\icon.png")
$canvas = New-Canvas 512 512
$canvas.G.DrawImage($src, 0, 0, 512, 512)
Save-Png $canvas.Bmp "$out\icon-512.png"
$canvas.G.Dispose(); $canvas.Bmp.Dispose(); $src.Dispose()
Write-Output "icon-512.png written"

# 2. Feature graphic: 5760x2560 -> center-crop to 1024x500 aspect, then resize
$src = [System.Drawing.Image]::FromFile("$root\banner.png")
$targetRatio = 1024.0 / 500.0
$srcRatio = $src.Width / [double]$src.Height
if ($srcRatio -gt $targetRatio) {
    # source is wider than target: crop left/right
    $cropWidth = [int]($src.Height * $targetRatio)
    $cropX = [int](($src.Width - $cropWidth) / 2)
    $srcRect = New-Object System.Drawing.Rectangle($cropX, 0, $cropWidth, $src.Height)
} else {
    # source is taller than target: crop top/bottom
    $cropHeight = [int]($src.Width / $targetRatio)
    $cropY = [int](($src.Height - $cropHeight) / 2)
    $srcRect = New-Object System.Drawing.Rectangle(0, $cropY, $src.Width, $cropHeight)
}
$canvas = New-Canvas 1024 500
$destRect = New-Object System.Drawing.Rectangle(0, 0, 1024, 500)
$canvas.G.DrawImage($src, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
Save-Png $canvas.Bmp "$out\feature-graphic-1024x500.png"
$canvas.G.Dispose(); $canvas.Bmp.Dispose(); $src.Dispose()
Write-Output "feature-graphic-1024x500.png written"

# 3. Screenshots: pad width (letterbox) so height:width <= 2:1, preserving full image
$shots = @("ReceiptView.png", "SetupView.png", "calculating.png")
foreach ($name in $shots) {
    $src = [System.Drawing.Image]::FromFile("$root\$name")
    $h = $src.Height
    $minWidth = [Math]::Ceiling($h / 2.0)
    $newW = [Math]::Max($src.Width, [int]$minWidth)
    $canvas = New-Canvas $newW $h
    $x = [int](($newW - $src.Width) / 2)
    $canvas.G.DrawImage($src, $x, 0, $src.Width, $h)
    $baseName = [System.IO.Path]::GetFileNameWithoutExtension($name)
    Save-Png $canvas.Bmp "$out\$baseName-padded.png"
    Write-Output "$baseName-padded.png written ($newW x $h, ratio $([Math]::Round($h/$newW,2)):1)"
    $canvas.G.Dispose(); $canvas.Bmp.Dispose(); $src.Dispose()
}
