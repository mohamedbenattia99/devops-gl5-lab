resource "azurerm_resource_group" "rg" {
  name     = "DevOpsGl5ResourceGroup"
  location = "northeurope"
}

resource "azurerm_kubernetes_cluster" "cluster" {
  name                = "devopsgl5cluster"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  dns_prefix          = "devopsgl5cluster"
  sku_tier            = "Free"

  default_node_pool {
    name       = "default"
    node_count = "1"
    vm_size    = "standard_ds2_v2"
  }

  identity {
    type = "SystemAssigned"
  }
  
 
}