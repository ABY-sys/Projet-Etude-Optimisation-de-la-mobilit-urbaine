provider "google" {
  project     = "# REPLACE WITH YOUR PROJECT ID"
  region      = "us-central1-a"
}

resource "google_storage_bucket" "test-bucket-for-state" {
  name        = "# REPLACE WITH YOUR PROJECT ID"
  location    = "US"
  uniform_bucket_level_access = true
}