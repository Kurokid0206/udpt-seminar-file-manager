import boto3
import os


def uploadFile2S3(file, pre_key):

    aws_credentials = {
        'aws_access_key_id': os.environ.get('AWS_ACCESS_KEY_ID', ''),
        'aws_secret_access_key': os.environ.get('AWS_SECRET_ACCESS_KEY', '')
    }

    file_key = f'{pre_key}/{file.name}'
    s3 = boto3.resource('s3', **aws_credentials)
    s3_uploaded_url = s3.Bucket('ti-pt-demo').put_object(Key=file_key,
                                                         Body=file, ContentType=file.content_type)
    print(f'done: {file.name} :D')
    return s3_uploaded_url
