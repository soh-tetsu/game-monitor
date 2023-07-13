#! /bin/bash

set -e
aws ecr get-login-password --profile ctw-sre | docker login --username AWS --password-stdin 083250277353.dkr.ecr.ap-northeast-1.amazonaws.com

export VERSION=$(cat VERSION)

echo "docker buildx build --cache-from=type=local,src=/tmp/game-monitor --cache-to=type=local,dest=/tmp/game-monitor ./ -t game-monitor --platform linux/amd64 --load"
docker buildx build --cache-from=type=local,src=/tmp/game-monitor --cache-to=type=local,dest=/tmp/game-monitor ./ -t game-monitor --platform linux/amd64 --load

echo "docker tag game-monitor:latest 083250277353.dkr.ecr.ap-northeast-1.amazonaws.com/game-monitor:v${VERSION}"
docker tag game-monitor:latest 083250277353.dkr.ecr.ap-northeast-1.amazonaws.com/game-monitor:v${VERSION}

echo "docker push 083250277353.dkr.ecr.ap-northeast-1.amazonaws.com/game-monitor:v${VERSION}"
docker push 083250277353.dkr.ecr.ap-northeast-1.amazonaws.com/game-monitor:v${VERSION}

echo "change to sre cluster"
kubectl ctx ctw-sre-k8s

echo "change to grafana namespace"
kubectl ns grafana

echo "envsubst < deploy/deploy.yaml | kubectl apply -f -"
envsubst < deploy/deploy.yaml | kubectl apply -f -

