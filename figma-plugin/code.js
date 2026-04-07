// Figma Plugin sandbox entry.
// Keep syntax conservative to maximize compatibility with older plugin runtimes.

var DEFAULT_UI_WIDTH = 360;
var DEFAULT_UI_HEIGHT = 420;

function openPluginUI() {
  figma.showUI(__html__, {
    width: DEFAULT_UI_WIDTH,
    height: DEFAULT_UI_HEIGHT,
    themeColors: true,
  });
}

openPluginUI();

figma.ui.onmessage = function (msg) {
  if (!msg || typeof msg !== 'object') return;

  if (msg.type === 'canvas-op') {
    handleCanvasOp(msg.op);
    return;
  }

  if (msg.type === 'get-selection') {
    figma.ui.postMessage({
      type: 'selection',
      nodes: figma.currentPage.selection.map(nodeInfo),
    });
    return;
  }

  if (msg.type === 'close') {
    figma.closePlugin();
    return;
  }

  if (msg.type === 'ui-resize') {
    resizePluginUI(msg.width, msg.height);
  }
};

var UI_MIN_WIDTH = 360;
var UI_MIN_HEIGHT = 420;
var UI_MAX_WIDTH = 1600;
var UI_MAX_HEIGHT = 2000;

function clampInt(value, min, max) {
  var n = Math.round(Number(value));
  if (!isFinite(n)) return min;
  if (n < min) return min;
  if (n > max) return max;
  return n;
}

function resizePluginUI(width, height) {
  try {
    var w = clampInt(width, UI_MIN_WIDTH, UI_MAX_WIDTH);
    var h = clampInt(height, UI_MIN_HEIGHT, UI_MAX_HEIGHT);
    figma.ui.resize(w, h);
  } catch (err) {
    console.warn('[plugin] resize failed:', err);
  }
}

function handleCanvasOp(op) {
  Promise.resolve()
    .then(function () {
      if (!op || !op.action) {
        return { error: 'Invalid operation' };
      }

      if (op.action === 'create-frame') return createFrame(op);
      if (op.action === 'create-text') return createText(op);
      if (op.action === 'set-fill') return setFill(op);
      if (op.action === 'get-nodes') {
        return { nodes: figma.currentPage.children.map(nodeInfo) };
      }

      return { error: 'Unknown action: ' + op.action };
    })
    .then(function (result) {
      var payload = { type: 'op-result', id: op && op.id };
      if (result && typeof result === 'object') {
        var keys = Object.keys(result);
        for (var i = 0; i < keys.length; i += 1) {
          payload[keys[i]] = result[keys[i]];
        }
      }
      figma.ui.postMessage(payload);
    })
    .catch(function (err) {
      var message = (err && err.message) ? err.message : String(err);
      figma.ui.postMessage({ type: 'op-result', id: op && op.id, error: message });
    });
}

function createFrame(op) {
  var frame = figma.createFrame();
  frame.resize(op.width !== undefined ? op.width : 375, op.height !== undefined ? op.height : 812);
  frame.name = op.name !== undefined ? op.name : 'Frame';
  if (op.x !== undefined) frame.x = op.x;
  if (op.y !== undefined) frame.y = op.y;
  figma.currentPage.appendChild(frame);
  figma.viewport.scrollAndZoomIntoView([frame]);
  return { nodeId: frame.id };
}

function createText(op) {
  return figma.loadFontAsync({ family: 'Inter', style: 'Regular' }).then(function () {
    var node = figma.createText();
    node.characters = op.text !== undefined ? op.text : 'Text';
    node.fontSize = op.fontSize !== undefined ? op.fontSize : 14;
    if (op.x !== undefined) node.x = op.x;
    if (op.y !== undefined) node.y = op.y;

    var parent = figma.currentPage;
    if (op.parentId) {
      parent = figma.getNodeById(op.parentId) || figma.currentPage;
    }
    if (parent && 'appendChild' in parent) {
      parent.appendChild(node);
    }

    return { nodeId: node.id };
  });
}

function setFill(op) {
  var node = figma.getNodeById(op.nodeId);
  if (!node) return { error: 'Node not found' };
  if (!('fills' in node)) return { error: 'Node has no fills' };

  var rgb = hexToRgb(op.color !== undefined ? op.color : '#ffffff');
  node.fills = [{
    type: 'SOLID',
    color: rgb,
    opacity: op.opacity !== undefined ? op.opacity : 1,
  }];
  return { nodeId: node.id };
}

function nodeInfo(node) {
  return { id: node.id, name: node.name, type: node.type };
}

function hexToRgb(hex) {
  var n = parseInt(String(hex).replace('#', ''), 16);
  return {
    r: ((n >> 16) & 255) / 255,
    g: ((n >> 8) & 255) / 255,
    b: (n & 255) / 255,
  };
}
