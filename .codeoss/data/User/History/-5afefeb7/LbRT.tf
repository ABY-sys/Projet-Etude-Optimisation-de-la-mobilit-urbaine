provider "google" {
  project     = "cloud-terraform-438006"
  region      = "us-central1-a"
}

resource "google_storage_bucket" "test-bucket-for-state" {
  name        = "cloud-terraform-438006"
  location    = "US"
  uniform_bucket_level_access = true
}

terraform {
  backend "gcs" {
    bucket  = "cloud-terraform-438006"
    prefix  = "terraform/state"
  }
}