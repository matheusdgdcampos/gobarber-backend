#!/bin/sh

echo "Starting Bucket config..."
echo "Creating bucket..."
# Create a bucket in the specified region
awslocal s3api create-bucket --bucket gobarber --acl public-read
echo "Bucket created!"

# Put bucket policy
echo "Setting bucket policy..."
awslocal s3api put-bucket-policy --bucket "gobarber" --policy "{ \
  \"Statement\": [ \
    { \
      \"Action\": [ \
        \"s3:GetObject\", \
        \"s3:PutObject\" \
      ], \
      \"Effect\": \"Allow\", \
      \"Resource\": \"arn:aws:s3:::gobarber/*\", \
      \"Principal\": \"*\" \
    } \
  ] \
}"
echo "Bucket policy set!"
echo "Bucket config finished!"

