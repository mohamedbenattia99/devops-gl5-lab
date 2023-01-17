data "terraform_remote_state" "aks" {
  backend = "azurerm"

  config = {
    resource_group_name  = "DevOpsGl5ResourceGroup"
    container_name = "tf-backend"
    storage_account_name = "devopslabtfstate"
    key = "aks-stack"
  }
}
resource "helm_release" "kube_prometheus" {
  name       = "kube-prometheus-stack"
  repository = "https://prometheus-community.github.io/helm-charts"
  chart      = "kube-prometheus-stack"
  namespace  = var.namespace

  values = [
    "${file("./values.yaml")}"
  ]
}

