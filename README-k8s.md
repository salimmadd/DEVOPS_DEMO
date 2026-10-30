# Kubernetes deployment for the TP

This project can be deployed on a local Kubernetes cluster such as Docker Desktop Kubernetes or Minikube.

## 1) Build the Docker images

From the project root:

```powershell
cd "c:\Users\Salim\Documents\Dev\test-main"
docker build -t demo-backend ./springboot/app
docker build -t demo-frontend ./angular-app
```

## 2) For Docker Desktop Kubernetes

Make sure Kubernetes is enabled in Docker Desktop.

Then apply the manifests:

```powershell
kubectl apply -f .\kubernetes\app-k8s.yaml
```

## 3) Check the resources

```powershell
kubectl get pods -n tp-demo
kubectl get svc -n tp-demo
```

## 4) Access the app

The frontend is exposed through a NodePort on port 30080:

```text
http://localhost:30080
```

The backend is exposed through a NodePort on port 30081:

```text
http://localhost:30081/user/all
```

## 5) Useful commands

```powershell
kubectl get all -n tp-demo
kubectl logs deploy/backend -n tp-demo
kubectl logs deploy/frontend -n tp-demo
kubectl logs deploy/mysql -n tp-demo
kubectl delete -f .\kubernetes\app-k8s.yaml
```
