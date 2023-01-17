# PORTFOLIO PROJECT

# Infrastructure Tools 
For the implementation of the infrastructure the following tools were used.
## IaC tools
 - Kubernetes
 - Kustomize
 - Terraform
 - Helm
## Monitoring tools
 - Grafana, for dashboards.
 - Prometheus, to store metrics.
# Setting up the cluster
To set-up the cluster we used a micro-stack architecture using Terraform.
## Cluster provisioning
The cluster micro-stack will provision the AKS cluster with a node pool of two nodes. It will output the kube-config for the other stack to use.
```
terraform init
terraform plan
terraform apply
```
