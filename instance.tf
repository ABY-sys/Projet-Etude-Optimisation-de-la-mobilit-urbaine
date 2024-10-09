resource "google_compute_instance" "terraform" {
  project      = "exo-cloud-storage"  # Remplacez par votre ID de projet
  name         = "terraform"
  machine_type = "e2-medium"
  zone         = "us-central1-a"      # Remplacez par la zone que vous souhaitez utiliser

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"
    }
  }

  network_interface {
    network = "default"
    access_config {
    }
  }
}
