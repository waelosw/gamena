(function() {
  var themeName = window.TRAFFIC_JAM_THEME_NAME || 'tron-grid-test';
  function themePath(relPath) {
    return 'assets/themes/' + themeName + '/' + relPath;
  }

  var manifest = {
    vehicles: {
      primary_h2: 'https://rosebud.ai/assets/primary_h2.png?IFCq',
      car_h2: 'https://rosebud.ai/assets/car_h2.png?lXah',
      car_v2: 'https://rosebud.ai/assets/car_v2.png?HgtK',
      truck_h3: 'https://rosebud.ai/assets/truck_h3.png?RMFm',
      truck_v3: 'https://rosebud.ai/assets/truck_v3.png?iOlR'
    },
    ui: {}
  };

  var images = {};

  function getKey(category, key) {
    return category + ':' + key;
  }

  function ensureImage(category, key) {
    if (!manifest[category] || !manifest[category][key]) return null;
    var id = getKey(category, key);
    if (images[id]) return images[id];
    var img = new Image();
    img.decoding = 'async';
    img.src = manifest[category][key];
    images[id] = img;
    return img;
  }

  function drawSprite(ctx, category, key, x, y, w, h, options) {
    var img = ensureImage(category, key);
    if (!img || !img.complete || !img.naturalWidth) return false;
    var opts = options || {};
    ctx.save();
    if (opts.alpha !== undefined) ctx.globalAlpha = opts.alpha;
    if (opts.shadowColor) {
      ctx.shadowColor = opts.shadowColor;
      ctx.shadowBlur = opts.shadowBlur || 0;
      ctx.shadowOffsetX = opts.shadowOffsetX || 0;
      ctx.shadowOffsetY = opts.shadowOffsetY || 0;
    }
    ctx.drawImage(img, x, y, w, h);
    ctx.restore();
    return true;
  }

  window.TrafficJamTheme = {
    themeName: themeName,
    manifest: manifest,
    drawSprite: drawSprite,
    preload: function() {
      Object.keys(manifest).forEach(function(category) {
        Object.keys(manifest[category]).forEach(function(key) {
          ensureImage(category, key);
        });
      });
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      window.TrafficJamTheme.preload();
    }, { once: true });
  } else {
    window.TrafficJamTheme.preload();
  }
})();
