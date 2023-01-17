terraform {
  required_version = "~>1.3.4"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>3.31.0"
    }
  }
  backend "azurerm" {
    resource_group_name = "DevOpsGl5ResourceGroup"
    container_name = "tf-backend"
    storage_account_name = "devopslabtfstate"
    key = "aks-stack"
}
}

provider "azurerm" {
  skip_provider_registration = true
  features {}
}

