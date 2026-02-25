#!/usr/bin/bash
set -euo pipefail

# Default values
REGISTRY=""
TAG="latest"
DO_PUSH=false

usage() {
  cat <<'EOF'
use:
  buildDocker.sh [-r <registry>] [-t <tag>] [-p] IMAGE_NAME

Opcje:
  -r <registry>  opcjonal prefix registry, ex. "ghcr.io/org" .
                 If not specified, the image is built locally without a registry prefix.
  -t <tag>       Tag image (default: latest).
  -p             Performs a 'docker push' after building.

Arguments:
  IMAGE_NAME      Image name (without tag and registry), ex. "demoqa-tests".

examples:
  # local build: my-service:latest
  ./buildDocker.sh my-service

  # local build with tag: my-service:1.2.3
  ./buildDocker.sh -t 1.2.3 my-service

  # Build and push to registry: ghcr.io/acme/my-service:latest
  ./buildDocker.sh -r ghcr.io/acme -p my-service

  # Build and push with tag: registry.example.com/team/my-service:2.0.0
  ./buildDocker.sh -r registry.example.com/team -t 2.0.0 -p my-service
EOF
}

# Parsing options
while getopts ":r:t:ph" opt; do
  case "$opt" in
    r) REGISTRY="$OPTARG" ;;
    t) TAG="$OPTARG" ;;
    p) DO_PUSH=true ;;
    h)
      usage
      exit 0
      ;;
    \?)
      echo "Unknown option: -$OPTARG" >&2
      usage
      exit 2
      ;;
    :)
      echo "Option -$OPTARG requires value." >&2
      usage
      exit 2
      ;;
  esac
done
shift $((OPTIND - 1))

# Checking the IMAGE_NAME parameter
if [ $# -lt 1 ]; then
  echo "Missing required argument: IMAGE_NAME" >&2
  usage
  exit 2
fi
IMAGE_NAME="$1"

# Checking Docker availability
if ! command -v docker >/dev/null 2>&1; then
  echo "Error: 'docker' is not installed or not in the PATH." >&2
  exit 1
fi

# Build the full image name
# Removes any trailing '/' in REGISTRY
if [ -n "$REGISTRY" ]; then
  REGISTRY="${REGISTRY%/}"
  FULL_NAME="${REGISTRY}/${IMAGE_NAME}:${TAG}"
else
  FULL_NAME="${IMAGE_NAME}:${TAG}"
fi

echo "==> Built image: $FULL_NAME"
docker build -t "$FULL_NAME" -f Dockerfile .

# Optionally show the ID of the built image
IMAGE_ID="$(docker image inspect "$FULL_NAME" -f '{{.Id}}' 2>/dev/null || true)"
if [ -n "$IMAGE_ID" ]; then
  echo "==>Image built: $FULL_NAME"
  echo "    ID: $IMAGE_ID"
fi

# Push jeśli poproszono
if [ "$DO_PUSH" = true ]; then
  if [ -z "$REGISTRY" ]; then
    echo "Note: The -p flag is set, but -r (registry) is not specified. Pushing to a local registry is usually pointless."
    echo "If you want to push an image, specify -r, e.g., -r ghcr.io/your-org or -r registry.example.com/ns"
    echo "==> Push image: $FULL_NAME"
    docker push "$FULL_NAME"
    echo "==> Push completed."
fi

echo "DONE."