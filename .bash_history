gcloud auth list
gcloud config list project
gcloud auth application-default login
gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS
gcloud auth activate-service-account --key-file="$GOOGLE_APPLICATION_CREDENTIALS"
export GOOGLE_APPLICATION_CREDENTIALS="/Users/zekanedotcom/Desktop/Formation GCP/Security/exo-cloud-storage-fe7904f1dac4.json"
echo $GOOGLE_APPLICATION_CREDENTIALS
gcloud auth activate-service-account --key-file="$GOOGLE_APPLICATION_CREDENTIALS"
export GOOGLE_APPLICATION_CREDENTIALS="/Users/zekanedotcom/Desktop/FormationGCP/Security/exo-cloud-storage-fe7904f1dac4.json"
gcloud auth activate-service-account --key-file="$GOOGLE_APPLICATION_CREDENTIALS"
ls
export GOOGLE_APPLICATION_CREDENTIALS="/Users/zekanedotcom/Desktop/FormationGCP/Security/exo-cloud-storage-fe7904f1dac4.json"
gcloud auth activate-service-account --key-file="$GOOGLE_APPLICATION_CREDENTIALS"
export GOOGLE_APPLICATION_CREDENTIALS="/home/serignekane01/exo-cloud-storage-fe7904f1dac4.json"
gcloud auth activate-service-account --key-file="$GOOGLE_APPLICATION_CREDENTIALS"
gcloud auth application-default login --noauth_local_webserver
gcloud auth activate-service-account --key-file="/home/serignekane01/exo-cloud-storage-fe7904f1dac4.json"
python -m apache_beam.examples.wordcount --project exo-cloud-storage   --runner DataflowRunner   --staging_location gs://1er-exo-bucket/staging   --temp_location gs://1er-exo-bucket/temp   --output gs://1er-exo-bucket/results/output   --region us-central1   --noauth_local_webserver
bq mk taxirides
bq mk --time_partitioning_field timestamp --schema ride_id:string,point_idx:integer,latitude:float,longitude:float,timestamp:timestamp,meter_reading:float,meter_increment:float,ride_status:string,passenger_count:integer -t taxirides.realtime
gcloud dataflow jobs run iotflow     --gcs-location gs://dataflow-templates-"Region"/latest/PubSub_to_BigQuery     --region "Region"     --worker-machine-type e2-medium     --staging-location gs://"Bucket Name"/temp     --parameters inputTopic=projects/pubsub-public-data/topics/taxirides-realtime,outputTableSpec="Table Name":taxirides.realtime
gcloud dataflow jobs run iotflow     --gcs-location gs://dataflow-templates-us-central1/latest/PubSub_to_BigQuery     --region "us-central1"     --worker-machine-type e2-medium     --staging-location gs://1er-exo-bucket/temp     --parameters inputTopic=projects/pubsub-public-data/topics/taxirides-realtime,outputTableSpec="taxirides:taxirides.realtime"
gcloud dataflow jobs run iotflow     --gcs-location gs://dataflow-templates-us-central1/latest/PubSub_to_BigQuery     --region us-central1     --worker-machine-type e2-medium     --staging-location gs://1er-exo-bucket/temp     --parameters inputTopic=projects/pubsub-public-data/topics/taxirides-realtime,outputTableSpec="taxirides:taxirides.realtime"
gcloud dataflow jobs run iotflow     --gcs-location gs://dataflow-templates-us-central1/latest/PubSub_to_BigQuery     --region us-central1     --worker-machine-type e2-medium     --staging-location gs://1er-exo-bucket/temp     --parameters inputTopic=projects/pubsub-public-data/topics/taxirides-realtime,outputTableSpec="taxirides:taxirides.realtime"
gcloud services enable pubsub.googleapis.com --project exo-cloud-storage
gcloud dataflow jobs run iotflow     --gcs-location gs://dataflow-templates-us-central1/latest/PubSub_to_BigQuery     --region us-central1     --worker-machine-type e2-medium     --staging-location gs://1er-exo-bucket/temp     --parameters inputTopic=projects/pubsub-public-data/topics/taxirides-realtime,outputTableSpec="taxirides:taxirides.realtime"
terraform
clear
gcloud auth list
touch instance.tf
ls
terraform init
terraform plan
terraform plan-out
terraform plan -out
terraform apply
terraform show
gcloud auth list
gcloud config list project
touch main.tf
gcloud config list --format 'value(core.project)'
terraform init
terraform apply
terraform show
terraform init -migrate-state
terraform refresh
terraform show
terraform init
terraform init -migrate-state
terraform apply
terraform destroy
clear
gcloud auth list
gcloud config list project
gsutil -m cp -R gs://spls/gsp290/dataflow-python-examples .
export PROJECT=cloud-etl1
gcloud config set project $PROJECT
gsutil mb -c regional -l <REGION> gs://$PROJECT
gsutil mb -c regional -l us-central1 gs://$PROJECT
gsutil cp gs://spls/gsp290/data_files/usa_names.csv gs://$PROJECT/data_files/
gsutil cp gs://spls/gsp290/data_files/head_usa_names.csv gs://$PROJECT/data_files/
gcloud auth list
bq mk lake
export PROJECT=cloud-etl1
gsutil ls gs://cloud-etl1/
python dataflow_python_examples/data_ingestion.py   --project=$PROJECT   --region=us-central1   --runner=DataflowRunner   --machine_type=e2-standard-2   --staging_location=gs://$PROJECT/test   --temp_location=gs://$PROJECT/test   --input=gs://$PROJECT/data_files/head_usa_names.csv   --save_main_session
ls
gsutil -m cp -R gs://spls/gsp290/dataflow-python-examples .
ls
gsutil -m cp -R gs://spls/gsp290/dataflow-python-examples
gsutil -m cp -R gs://spls/gsp290/dataflow-python-examples .
ls
export PROJECT=cloud-etl1
ls
gcloud config set project $PROJECT
ls
gcloud services enable dataflow.googleapis.com
python dataflow_python_examples/data_ingestion.py   --project=$PROJECT   --region=us-central1   --runner=DataflowRunner   --machine_type=e2-standard-2   --staging_location=gs://cloud-etl1/test   --temp_location=gs://cloud-etl1/test   --input=gs://cloud-etl1/data_files/head_usa_names.csv   --save_main_session
ls
gsutil ls gs://cloud-etl1
gcloud compute config-ssh
ls ~/.ssh
cd /home/serignekane01/
git init
echo ".DS_Store" > .gitignore
echo "node_modules/" >> .gitignore  # Exemple si vous utilisez Node.js
