# game-monitor
How to deploy:
1. Login to AWS ECR.
```
aws ecr get-login-password --profile ctw-sre | docker login --username AWS --password-stdin 083250277353.dkr.ecr.ap-northeast-1.amazonaws.com
```

2. Build container image.
```
docker buildx build ./ -t game-monitor --platform linux/amd64 --load
```

3. Tag the image.
```
docker tag game-monitor:latest 083250277353.dkr.ecr.ap-northeast-1.amazonaws.com/game-monitor:v$(cat VERSION)
```

4. Push the image to ECR.
```
docker push 083250277353.dkr.ecr.ap-northeast-1.amazonaws.com/game-monitor:v$(cat VERSION)
```

5. Update `deploy/deploy.yaml` to use the version and apply to k8s cluster.
```
kubectl apply -f deploy/deploy.yaml
```

# ChangeLog
## v1.0.7
- remove game_server_capacity metric
- remove http/express instrumentation
## v1.0.6
- add config for iseleve.
- wraper metrics parser to try-and-pass the exceptios.
## v1.0.5
- implement `build.sh` to wrap building and deployment steps.
## v1.0.4
- add metrics `game_server_paid_user`
## v1.0.3
- add configuration for ginei and yamato
## v1.0.2
- Send traces and metrics via OpenTelemetry protocol (OTPL)
