provider "google" {
  project     = "cloud-terraform-438006"
  region      = "us-central1-a"
 force_destroy = true
}

resource "google_storage_bucket" "test-bucket-for-state" {
  name        = "cloud-terraform-438006"
  location    = "US"
  uniform_bucket_level_access = true
}

terraform {
  backend "local" {
    path = "/home/serignekane01/terraform/state/terraform.tfstate"
  }
}
