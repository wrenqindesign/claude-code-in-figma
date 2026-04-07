#!/usr/bin/env bash
set -euo pipefail

REPO="wrenqindesign/claude-code-in-figma"
VERSION="0.1.0"
APP_NAME="Claude Code in Figma.app"
INSTALL_DIR="${INSTALL_DIR:-${HOME}/Applications}"
OPEN_AFTER_INSTALL="${OPEN_AFTER_INSTALL:-1}"

if [[ "$(uname -s)" != "Darwin" ]]; then
  echo "This installer only supports macOS." >&2
  exit 1
fi

ARCH="$(uname -m)"
case "${ARCH}" in
  arm64)
    ASSET_NAME="Claude-Code-in-Figma-0.1.0-arm64.zip"
    ASSET_SHA256="818dd5bbcfc5ee4eb5e3133cf593d909b39fd0b65834afef735ec1ea18b3507e"
    ;;
  x86_64)
    ASSET_NAME="Claude-Code-in-Figma-0.1.0-x64.zip"
    ASSET_SHA256="5aaaac44be503c455e5c091ad2db8d31e211a366f4365a44c4d24ac1d050734c"
    ;;
  *)
    echo "Unsupported macOS architecture: ${ARCH}" >&2
    exit 1
    ;;
esac

DOWNLOAD_URL="https://github.com/${REPO}/releases/download/v${VERSION}/${ASSET_NAME}"

if ! command -v curl >/dev/null 2>&1; then
  echo "curl is required but not installed." >&2
  exit 1
fi

if ! command -v shasum >/dev/null 2>&1; then
  echo "shasum is required but not installed." >&2
  exit 1
fi

TMP_DIR="$(mktemp -d)"
cleanup() {
  rm -rf "${TMP_DIR}"
}
trap cleanup EXIT

ZIP_PATH="${TMP_DIR}/${ASSET_NAME}"

echo "Downloading ${ASSET_NAME}..."
curl -fL --progress-bar "${DOWNLOAD_URL}" -o "${ZIP_PATH}"

ACTUAL_SHA256="$(shasum -a 256 "${ZIP_PATH}" | awk '{print $1}')"
if [[ "${ACTUAL_SHA256}" != "${ASSET_SHA256}" ]]; then
  echo "Checksum mismatch." >&2
  echo "Expected: ${ASSET_SHA256}" >&2
  echo "Actual:   ${ACTUAL_SHA256}" >&2
  exit 1
fi

echo "Extracting app..."
ditto -x -k "${ZIP_PATH}" "${TMP_DIR}/expanded"

mkdir -p "${INSTALL_DIR}"
rm -rf "${INSTALL_DIR}/${APP_NAME}"
cp -R "${TMP_DIR}/expanded/${APP_NAME}" "${INSTALL_DIR}/${APP_NAME}"
xattr -dr com.apple.quarantine "${INSTALL_DIR}/${APP_NAME}" || true

echo "Installed to ${INSTALL_DIR}/${APP_NAME}"
echo
echo "To open it again later:"
echo "  open \"${INSTALL_DIR}/${APP_NAME}\""
echo
echo "Then in Figma run:"
echo "  Plugins -> Development -> Claude Code in Figma"

if ! command -v claude >/dev/null 2>&1; then
  cat <<'EOF'

Claude Code CLI is not installed yet.
Install it with:
  npm install -g @anthropic-ai/claude-code
  claude
EOF
fi

if [[ "${OPEN_AFTER_INSTALL}" == "1" ]]; then
  open "${INSTALL_DIR}/${APP_NAME}"
fi
